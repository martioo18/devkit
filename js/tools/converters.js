/* ===== Color Converter ===== */
function initColor() {
  const hexInput = document.getElementById('color-hex');
  const rgbInput = document.getElementById('color-rgb');
  const hslInput = document.getElementById('color-hsl');
  const swatch = document.getElementById('color-swatch');

  function updateSwatch(hex) {
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      swatch.style.background = hex;
    }
  }

  document.getElementById('color-from-hex').addEventListener('click', () => {
    let hex = hexInput.value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) { rgbInput.value = 'Invalid HEX'; return; }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    rgbInput.value = `rgb(${r}, ${g}, ${b})`;
    hslInput.value = rgbToHsl(r, g, b);
    updateSwatch(hex);
  });

  document.getElementById('color-from-rgb').addEventListener('click', () => {
    const match = rgbInput.value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!match) { hexInput.value = 'Invalid RGB'; return; }
    const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
    const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
    hexInput.value = hex;
    hslInput.value = rgbToHsl(r, g, b);
    updateSwatch(hex);
  });

  document.getElementById('color-from-hsl').addEventListener('click', () => {
    const match = hslInput.value.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
    if (!match) { hexInput.value = 'Invalid HSL'; return; }
    const h = parseInt(match[1]), s = parseInt(match[2]), l = parseInt(match[3]);
    const rgb = hslToRgb(h, s, l);
    const hex = '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
    hexInput.value = hex;
    rgbInput.value = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    updateSwatch(hex);
  });
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/* ===== Unix Timestamp Converter ===== */
function initTimestamp() {
  const tsInput = document.getElementById('ts-input');
  const dateInput = document.getElementById('ts-date');
  const output = document.getElementById('ts-output');

  // Set current timestamp
  tsInput.value = Math.floor(Date.now() / 1000);
  dateInput.value = new Date().toISOString().slice(0, 19);

  document.getElementById('ts-to-date').addEventListener('click', () => {
    const ts = parseInt(tsInput.value);
    if (isNaN(ts)) { output.textContent = 'Invalid timestamp'; return; }
    // Auto-detect seconds vs milliseconds
    const d = ts > 9999999999 ? new Date(ts) : new Date(ts * 1000);
    output.textContent =
      `UTC:   ${d.toUTCString()}\n` +
      `Local: ${d.toLocaleString()}\n` +
      `ISO:   ${d.toISOString()}\n` +
      `Unix:  ${Math.floor(d.getTime() / 1000)} (seconds)\n` +
      `Unix:  ${d.getTime()} (milliseconds)`;
  });

  document.getElementById('ts-to-unix').addEventListener('click', () => {
    const d = new Date(dateInput.value);
    if (isNaN(d.getTime())) { output.textContent = 'Invalid date'; return; }
    output.textContent =
      `Unix (seconds):      ${Math.floor(d.getTime() / 1000)}\n` +
      `Unix (milliseconds): ${d.getTime()}\n` +
      `ISO:                 ${d.toISOString()}\n` +
      `UTC:                 ${d.toUTCString()}`;
  });

  document.getElementById('ts-now').addEventListener('click', () => {
    const now = new Date();
    tsInput.value = Math.floor(now.getTime() / 1000);
    dateInput.value = now.toISOString().slice(0, 19);
    output.textContent = `Current Unix timestamp: ${Math.floor(now.getTime() / 1000)}`;
  });
}

/* ===== Number Base Converter ===== */
function initBaseConverter() {
  const input = document.getElementById('base-input');
  const fromBase = document.getElementById('base-from');
  const output = document.getElementById('base-output');

  document.getElementById('base-convert').addEventListener('click', () => {
    const val = input.value.trim();
    const from = parseInt(fromBase.value);

    try {
      const decimal = parseInt(val, from);
      if (isNaN(decimal)) throw new Error('Invalid number for base ' + from);

      output.textContent =
        `Binary (2):    ${decimal.toString(2)}\n` +
        `Octal (8):     ${decimal.toString(8)}\n` +
        `Decimal (10):  ${decimal.toString(10)}\n` +
        `Hex (16):      ${decimal.toString(16).toUpperCase()}`;
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
    }
  });
}
