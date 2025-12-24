const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async () => {
  try {
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

    // Wait for DOMContentLoaded
    await new Promise((res, rej) => {
      dom.window.document.addEventListener('DOMContentLoaded', () => res());
      setTimeout(() => rej(new Error('timed out waiting for DOMContentLoaded')), 2000);
    });

    // If external scripts did not load automatically, load and run them manually
    try {
      const scriptPath = path.join(__dirname, '..', 'scripts', 'main.js');
      const scriptSource = fs.readFileSync(scriptPath, 'utf8');
      const vm = require('vm');
      vm.runInContext(scriptSource, dom.getInternalVMContext());
    } catch (e) {
      console.warn('Could not run external script manually:', e.message);
    }

    console.log('DOM loaded — checking globals...');
    // Check some expected effects
    const year = dom.window.document.getElementById('y').textContent;
    console.log('year:', JSON.stringify(year));

    const lanes = dom.window.document.querySelectorAll('.lane');
    console.log('lane count:', lanes.length);
    process.exit(0);
  } catch (err) {
    console.error('Error during headless run:', err);
    process.exit(2);
  }
})();