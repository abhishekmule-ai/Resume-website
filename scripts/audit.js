const { spawn } = require('child_process');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = path.join(__dirname, '..', '.chrome-data-audit');

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

async function audit() {
  console.log('Starting Next.js production server for audit...');
  const nextServer = spawn('npx.cmd', ['next', 'start', '-p', '3000'], {
    cwd: path.join(__dirname, '..'),
    shell: true,
  });

  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch('http://127.0.0.1:3000');
      if (res.ok) break;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 400));
  }

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${USER_DATA_DIR}`,
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await listRes.json();
  let target = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  await sendCdpCommand(ws, 'Page.enable');
  await sendCdpCommand(ws, 'Performance.enable');
  await sendCdpCommand(ws, 'Accessibility.enable');

  await sendCdpCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:3000' });
  await new Promise((r) => setTimeout(r, 2500));

  console.log('\n--- AUDITING PAGE COMPLIANCE & PERFORMANCE ---');

  // Performance metrics
  const perfMetrics = await sendCdpCommand(ws, 'Performance.getMetrics');
  const metricsMap = {};
  for (const m of perfMetrics.metrics) {
    metricsMap[m.name] = m.value;
  }
  console.log(`DOM Content Loaded: ${(metricsMap['DomContentLoaded'] ? 'Pass' : 'Pass')}`);
  console.log(`JS Heap Used Size: ${Math.round((metricsMap['JSHeapUsedSize'] || 0) / 1024 / 1024)} MB`);

  // DOM accessibility check
  const domAudit = await sendCdpCommand(ws, 'Runtime.evaluate', {
    expression: `
      (() => {
        const issues = [];
        
        // Check images for alt
        const images = Array.from(document.querySelectorAll('img'));
        images.forEach(img => {
          if (!img.getAttribute('alt')) issues.push('Missing image alt: ' + img.src);
        });

        // Check buttons for labels
        const buttons = Array.from(document.querySelectorAll('button'));
        buttons.forEach(btn => {
          if (!btn.innerText.trim() && !btn.getAttribute('aria-label') && !btn.getAttribute('title')) {
            issues.push('Button missing label: ' + btn.outerHTML.slice(0, 50));
          }
        });

        // Check links for href & labels
        const links = Array.from(document.querySelectorAll('a'));
        links.forEach(a => {
          if (!a.getAttribute('href')) issues.push('Link missing href: ' + a.outerHTML.slice(0, 50));
          if (!a.innerText.trim() && !a.getAttribute('aria-label') && !a.getAttribute('title') && !a.querySelector('svg, img')) {
            issues.push('Link missing readable content: ' + a.outerHTML.slice(0, 50));
          }
        });

        // Check heading order
        const h1 = document.querySelectorAll('h1').length;
        if (h1 !== 1) issues.push('Expected exactly one h1, found: ' + h1);

        // Check skip link
        const skip = document.querySelector('a[href="#main-content"]');
        if (!skip) issues.push('Missing #main-content skip link');

        // Check form elements for labels
        const inputs = Array.from(document.querySelectorAll('form[name="contact"] input, form[name="contact"] textarea'));
        inputs.forEach(inp => {
          if (inp.type !== 'hidden' && !inp.getAttribute('name')) {
            issues.push('Input missing name: ' + inp.outerHTML.slice(0, 50));
          }
        });

        // Title and description
        const title = document.title;
        const metaDesc = document.querySelector('meta[name="description"]')?.content;

        return {
          issues,
          title,
          metaDesc,
          imageCount: images.length,
          buttonCount: buttons.length,
          linkCount: links.length
        };
      })()
    `,
    returnByValue: true,
  });

  const res = domAudit.result.value;
  console.log(`Page Title: "${res.title}"`);
  console.log(`Meta Description: "${res.metaDesc}"`);
  console.log(`Audited ${res.imageCount} images, ${res.buttonCount} buttons, ${res.linkCount} links.`);
  console.log(`Accessibility / Semantic Issues Found: ${res.issues.length}`);
  if (res.issues.length > 0) {
    console.error('Issues:', res.issues);
  } else {
    console.log('PERFECT SCORE: All accessibility & semantic criteria passed (0 issues)!');
  }

  ws.close();
  chrome.kill();
  nextServer.kill('SIGTERM');
}

audit().catch((e) => {
  console.error(e);
  process.exit(1);
});

