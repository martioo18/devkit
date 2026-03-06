/* ===== UUID Generator ===== */
function initUuid() {
  const output = document.getElementById('uuid-output');
  const countInput = document.getElementById('uuid-count');

  document.getElementById('uuid-generate').addEventListener('click', () => {
    const count = Math.min(Math.max(parseInt(countInput.value) || 1, 1), 100);
    const uuids = [];
    for (let i = 0; i < count; i++) {
      uuids.push(generateUUIDv4());
    }
    output.textContent = uuids.join('\n');
  });

  // Generate one on load
  output.textContent = generateUUIDv4();
}

function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0x0f);
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* ===== Password Generator ===== */
function initPassword() {
  const output = document.getElementById('password-output');
  const lengthInput = document.getElementById('password-length');
  const uppercaseCheck = document.getElementById('password-uppercase');
  const lowercaseCheck = document.getElementById('password-lowercase');
  const numbersCheck = document.getElementById('password-numbers');
  const symbolsCheck = document.getElementById('password-symbols');

  document.getElementById('password-generate').addEventListener('click', generatePassword);
  generatePassword();

  function generatePassword() {
    const length = Math.min(Math.max(parseInt(lengthInput.value) || 16, 4), 256);
    let chars = '';
    if (uppercaseCheck.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercaseCheck.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbersCheck.checked) chars += '0123456789';
    if (symbolsCheck.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) { output.textContent = 'Select at least one character set.'; return; }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[array[i] % chars.length];
    }
    output.textContent = password;
  }
}

/* ===== Lorem Ipsum Generator ===== */
function initLorem() {
  const output = document.getElementById('lorem-output');
  const countInput = document.getElementById('lorem-count');
  const typeSelect = document.getElementById('lorem-type');

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
    'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
    'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
    'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
    'explicabo', 'nemo', 'ipsam', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit'
  ];

  document.getElementById('lorem-generate').addEventListener('click', () => {
    const count = Math.min(Math.max(parseInt(countInput.value) || 3, 1), 50);
    const type = typeSelect.value;

    if (type === 'words') {
      const result = [];
      for (let i = 0; i < count; i++) result.push(words[Math.floor(Math.random() * words.length)]);
      output.textContent = result.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        const len = 8 + Math.floor(Math.random() * 12);
        const s = [];
        for (let j = 0; j < len; j++) s.push(words[Math.floor(Math.random() * words.length)]);
        s[0] = s[0].charAt(0).toUpperCase() + s[0].slice(1);
        sentences.push(s.join(' ') + '.');
      }
      output.textContent = sentences.join(' ');
    } else {
      const paragraphs = [];
      for (let p = 0; p < count; p++) {
        const numSentences = 4 + Math.floor(Math.random() * 4);
        const sentences = [];
        for (let i = 0; i < numSentences; i++) {
          const len = 8 + Math.floor(Math.random() * 12);
          const s = [];
          for (let j = 0; j < len; j++) s.push(words[Math.floor(Math.random() * words.length)]);
          s[0] = s[0].charAt(0).toUpperCase() + s[0].slice(1);
          sentences.push(s.join(' ') + '.');
        }
        paragraphs.push(sentences.join(' '));
      }
      output.textContent = paragraphs.join('\n\n');
    }
  });
}

/* ===== QR Code Generator ===== */
function initQrCode() {
  const input = document.getElementById('qr-input');
  const container = document.getElementById('qr-output');

  document.getElementById('qr-generate').addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) { container.innerHTML = '<p style="color:var(--text-muted)">Enter text or URL above.</p>'; return; }

    container.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(container, {
        text: text,
        width: 200,
        height: 200,
        colorDark: '#e6edf3',
        colorLight: '#0d1117',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      container.innerHTML = '<p style="color:var(--danger)">QR code library failed to load.</p>';
    }
  });
}
