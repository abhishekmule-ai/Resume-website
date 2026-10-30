const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, '..', '.chrome-data');

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
      } catch (e) {
        // ignore other messages
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function waitForEvent(ws, eventName, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      ws.removeEventListener('message', handler);
      resolve(null); // resolve anyway on timeout
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

async function capture() {
  const targetUrl = process.argv[2] || 'https://abhishekresume02.netlify.app/';
  const outDir = process.argv[3] || path.join(__dirname, '..', 'baseline-screenshots');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Starting Chrome for target: ${targetUrl}`);
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${USER_DATA_DIR}`,
  ]);

  // Wait for Chrome port 9222
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
    throw new Error('Chrome failed to start or open debugging port 9222.');
  }

  console.log('Connected to Chrome. Getting target list...');
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  console.log(`Found ${targets.length} targets`);
  let target = targets.find(t => t.type === 'page');
  if (!target) {
    const putRes = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
    target = await putRes.json();
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  await new Promise((resolve) => ws.addEventListener('open', resolve));

  await sendCdpCommand(ws, 'Page.enable');
  await sendCdpCommand(ws, 'DOM.enable');
  await sendCdpCommand(ws, 'CSS.enable');
  await sendCdpCommand(ws, 'Runtime.enable');

  console.log(`Navigating to ${targetUrl}...`);
  await sendCdpCommand(ws, 'Page.navigate', { url: targetUrl });
  await waitForEvent(ws, 'Page.loadEventFired', 8000);
  await new Promise((r) => setTimeout(r, 2000)); // wait for animations / hydration

  const viewports = [
    { name: '375', width: 375, height: 812, mobile: true },
    { name: '768', width: 768, height: 1024, mobile: false },
    { name: '1440', width: 1440, height: 900, mobile: false },
  ];

  const themes = ['dark', 'light'];

  for (const theme of themes) {
    console.log(`Setting theme to ${theme}...`);
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
    await new Promise((r) => setTimeout(r, 500));

    for (const vp of viewports) {
      console.log(`Capturing ${theme} @ ${vp.name}px...`);
      await sendCdpCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile,
      });
      await new Promise((r) => setTimeout(r, 500));

      // Get page layout metrics for full screenshot
      const metrics = await sendCdpCommand(ws, 'Page.getLayoutMetrics');
      const contentHeight = Math.ceil(metrics.contentSize.height);

      const shot = await sendCdpCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
      });

      const fileName = `baseline-${theme}-${vp.name}.png`;
      const filePath = path.join(outDir, fileName);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${filePath}`);
    }
  }

  ws.close();
  chrome.kill();
  console.log('Baseline captures complete.');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
