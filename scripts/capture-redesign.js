const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, '..', '.chrome-data-redesign');
const OUT_DIR = path.join(__dirname, '..', 'redesign-screenshots');

function sendCdpCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      } catch (e) {}
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function waitForEvent(ws, eventName, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      ws.removeEventListener('message', handler);
      resolve(null);
    }, timeoutMs);

    const handler = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.method === eventName) {
          clearTimeout(timer);
          ws.removeEventListener('message', handler);
          resolve(msg.params);
        }
      } catch (e) {}
    };
    ws.addEventListener('message', handler);
  });
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Starting Next.js production server on port 3000...');
  const nextServer = spawn('npx.cmd', ['next', 'start', '-p', '3000'], {
    cwd: path.join(__dirname, '..'),
    shell: true,
  });

  nextServer.stderr.on('data', (d) => {
    // console.error('Next err:', d.toString());
  });

  // Wait for Next.js server
  let serverReady = false;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch('http://127.0.0.1:3000');
      if (res.ok) {
        serverReady = true;
        break;
      }
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 400));
  }

  if (!serverReady) {
    nextServer.kill();
    throw new Error('Next.js server failed to respond on port 3000.');
  }
  console.log('Next.js server ready at http://127.0.0.1:3000');

  console.log('Starting Chrome...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${USER_DATA_DIR}`,
  ]);

  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 300));
  }

  if (!versionData) {
    chrome.kill();
    nextServer.kill();
    throw new Error('Chrome failed to start.');
  }

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  let target = targets.find((t) => t.type === 'page');
  if (!target) {
    const putRes = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
    target = await putRes.json();
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  const consoleErrors = [];
  ws.addEventListener('message', (evt) => {
    try {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map((a) => a.value || a.description).join(' '));
      }
      if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
        consoleErrors.push(msg.params.entry.text);
      }
    } catch (e) {}
  });

  await sendCdpCommand(ws, 'Page.enable');
  await sendCdpCommand(ws, 'DOM.enable');
  await sendCdpCommand(ws, 'Runtime.enable');
  await sendCdpCommand(ws, 'Log.enable');

  console.log('Navigating to http://127.0.0.1:3000 ...');
  await sendCdpCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:3000' });
  await waitForEvent(ws, 'Page.loadEventFired', 8000);
  await new Promise((r) => setTimeout(r, 2000));

  const viewports = [
    { name: '375', width: 375, height: 812, mobile: true },
    { name: '768', width: 768, height: 1024, mobile: false },
    { name: '1440', width: 1440, height: 900, mobile: false },
  ];

  const themes = ['dark', 'light'];

  for (const theme of themes) {
    console.log(`\n--- Switching to ${theme.toUpperCase()} theme ---`);
    await sendCdpCommand(ws, 'Runtime.evaluate', {
      expression: `
        localStorage.setItem('theme', '${theme}');
        if ('${theme}' === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        } else {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        }
      `,
    });
    await new Promise((r) => setTimeout(r, 600));

    // Full page captures at 375, 768, 1440
    for (const vp of viewports) {
      console.log(`Capturing full page: ${theme} @ ${vp.name}px...`);
      await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await new Promise((r) => setTimeout(r, 600));

      const shot = await sendCdpCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      const fileName = `redesign-${theme}-${vp.name}.png`;
      const filePath = path.join(OUT_DIR, fileName);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${filePath}`);
    }

    // Section by section captures at 1440px
    console.log(`Capturing individual sections for ${theme} @ 1440px...`);
    await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 400));

    const sections = [
      { id: 'hero', name: '01-hero' },
      { id: 'about', name: '02-about' },
      { id: 'projects', name: '03-projects' },
      { id: 'skills', name: '04-skills' },
      { id: 'experience', name: '05-experience' },
      { id: 'education', name: '06-education' },
      { id: 'certifications', name: '07-certifications' },
      { id: 'contact', name: '08-contact' },
    ];

    const doc = await sendCdpCommand(ws, 'DOM.getDocument');

    for (const sec of sections) {
      try {
        const query = await sendCdpCommand(ws, 'DOM.querySelector', {
          nodeId: doc.root.nodeId,
          selector: `#${sec.id}`,
        });

        if (query.nodeId) {
          const box = await sendCdpCommand(ws, 'DOM.getBoxModel', {
            nodeId: query.nodeId,
          });

          if (box && box.model) {
            const quad = box.model.border;
            const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
            const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
            const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x;
            const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y;

            const secShot = await sendCdpCommand(ws, 'Page.captureScreenshot', {
              format: 'png',
              clip: { x, y, width, height, scale: 1 },
              captureBeyondViewport: true,
            });

            const secFileName = `section-${theme}-${sec.name}.png`;
            const secFilePath = path.join(OUT_DIR, secFileName);
            fs.writeFileSync(secFilePath, Buffer.from(secShot.data, 'base64'));
            console.log(`Saved section: ${secFileName}`);
          }
        }
      } catch (err) {
        console.warn(`Could not clip section ${sec.name}:`, err.message);
      }
    }
  }

  ws.close();
  chrome.kill();
  try {
    process.kill(-nextServer.pid);
  } catch (e) {
    nextServer.kill('SIGTERM');
  }

  console.log('\n=== VERIFICATION RESULTS ===');
  console.log(`Console errors detected: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  } else {
    console.log('SUCCESS: 0 console errors detected!');
  }
}

run().catch((err) => {
  console.error('Capture runner failed:', err);
  process.exit(1);
});

