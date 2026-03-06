/* ===== DevKit — Main App Logic ===== */

const TOOLS = [
  { id: 'base64',         icon: '{ }',  name: 'Base64 Encode/Decode',   init: initBase64 },
  { id: 'url-encode',     icon: '%',     name: 'URL Encode/Decode',      init: initUrlEncode },
  { id: 'jwt',            icon: 'JWT',   name: 'JWT Decoder',            init: initJwt },
  { id: 'uuid',           icon: '#',     name: 'UUID Generator',         init: initUuid },
  { id: 'hash',           icon: '##',    name: 'Hash Generator',         init: initHash },
  { id: 'json',           icon: '{ }',   name: 'JSON Formatter',         init: initJson },
  { id: 'lorem',          icon: 'Aa',    name: 'Lorem Ipsum Generator',  init: initLorem },
  { id: 'color',          icon: '\u25CF', name: 'Color Converter',       init: initColor },
  { id: 'regex',          icon: '.*',    name: 'Regex Tester',           init: initRegex },
  { id: 'timestamp',      icon: '\u23F0', name: 'Timestamp Converter',   init: initTimestamp },
  { id: 'html-entity',    icon: '&;',    name: 'HTML Entity Enc/Dec',    init: initHtmlEntity },
  { id: 'markdown',       icon: 'MD',    name: 'Markdown Preview',       init: initMarkdown },
  { id: 'password',       icon: '\u26BF', name: 'Password Generator',   init: initPassword },
  { id: 'case-converter', icon: 'Aa',    name: 'Text Case Converter',    init: initCaseConverter },
  { id: 'word-counter',   icon: '123',   name: 'Word/Char Counter',      init: initWordCounter },
  { id: 'qrcode',         icon: 'QR',    name: 'QR Code Generator',      init: initQrCode },
  { id: 'diff',           icon: '\u00B1', name: 'Diff Checker',          init: initDiff },
  { id: 'base-converter', icon: '0x',    name: 'Number Base Converter',  init: initBaseConverter },
  { id: 'css-minifier',   icon: '{ }',   name: 'CSS Minifier',           init: initCssMinifier },
  { id: 'sql-formatter',  icon: 'SQL',   name: 'SQL Formatter',          init: initSqlFormatter }
];

const initialized = new Set();

document.addEventListener('DOMContentLoaded', () => {
  const toolList = document.getElementById('tool-list');
  const searchInput = document.getElementById('search-input');
  const mainContent = document.getElementById('main-content');
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  // Build sidebar items
  TOOLS.forEach(tool => {
    const item = document.createElement('div');
    item.className = 'tool-item';
    item.dataset.id = tool.id;
    item.innerHTML = `<span class="icon">${tool.icon}</span><span class="label">${tool.name}</span>`;
    item.addEventListener('click', () => selectTool(tool.id));
    toolList.appendChild(item);
  });

  // Search filter
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.tool-item').forEach(item => {
      const name = item.querySelector('.label').textContent.toLowerCase();
      item.classList.toggle('hidden', !name.includes(q));
    });
  });

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });

  // Tool selection
  function selectTool(id) {
    // Close mobile sidebar
    sidebar.classList.remove('open');
    overlay.classList.remove('show');

    // Update active states
    document.querySelectorAll('.tool-item').forEach(item => {
      item.classList.toggle('active', item.dataset.id === id);
    });

    document.querySelectorAll('.tool-view').forEach(view => {
      view.classList.toggle('active', view.id === 'tool-' + id);
    });

    // Hide welcome
    const welcome = document.getElementById('welcome');
    if (welcome) welcome.style.display = 'none';

    // Initialize tool if first time
    if (!initialized.has(id)) {
      const tool = TOOLS.find(t => t.id === id);
      if (tool && tool.init) {
        tool.init();
        initialized.add(id);
      }
    }

    // Update URL hash
    history.replaceState(null, '', '#' + id);
  }

  // Handle initial hash
  const hash = location.hash.slice(1);
  if (hash && TOOLS.find(t => t.id === hash)) {
    selectTool(hash);
  }

  // Copy button delegation
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
      const btn = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const text = targetEl.textContent || targetEl.value;
        navigator.clipboard.writeText(text).then(() => {
          showToast('Copied to clipboard!');
        }).catch(() => {
          showToast('Failed to copy.');
        });
      }
    }
  });
});

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
