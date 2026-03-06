/* ===== Regex Tester ===== */
function initRegex() {
  const patternInput = document.getElementById('regex-pattern');
  const flagsInput = document.getElementById('regex-flags');
  const testInput = document.getElementById('regex-test');
  const output = document.getElementById('regex-output');
  const matchCount = document.getElementById('regex-match-count');

  function runRegex() {
    const pattern = patternInput.value;
    const flags = flagsInput.value;
    const text = testInput.value;

    if (!pattern) {
      output.innerHTML = escapeHtml(text);
      matchCount.textContent = '';
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      let count = 0;

      if (flags.includes('g')) {
        const highlighted = text.replace(regex, (match) => {
          count++;
          return '<mark>' + escapeHtml(match) + '</mark>';
        });
        output.innerHTML = highlighted || escapeHtml(text);
      } else {
        const match = text.match(regex);
        if (match) {
          count = 1;
          const idx = match.index;
          const before = escapeHtml(text.slice(0, idx));
          const matched = '<mark>' + escapeHtml(match[0]) + '</mark>';
          const after = escapeHtml(text.slice(idx + match[0].length));
          output.innerHTML = before + matched + after;
        } else {
          output.innerHTML = escapeHtml(text);
        }
      }

      matchCount.textContent = count + ' match' + (count !== 1 ? 'es' : '');
      matchCount.style.color = count > 0 ? 'var(--success)' : 'var(--danger)';
    } catch (e) {
      output.innerHTML = escapeHtml(text);
      matchCount.textContent = 'Invalid regex: ' + e.message;
      matchCount.style.color = 'var(--danger)';
    }
  }

  patternInput.addEventListener('input', runRegex);
  flagsInput.addEventListener('input', runRegex);
  testInput.addEventListener('input', runRegex);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== Text Case Converter ===== */
function initCaseConverter() {
  const input = document.getElementById('case-input');
  const output = document.getElementById('case-output');

  const converters = {
    'case-upper': (s) => s.toUpperCase(),
    'case-lower': (s) => s.toLowerCase(),
    'case-title': (s) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()),
    'case-sentence': (s) => s.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase()),
    'case-camel': (s) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase()),
    'case-pascal': (s) => s.toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (m, p1, c) => c.toUpperCase()),
    'case-snake': (s) => s.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s\-]+/g, '_').toLowerCase(),
    'case-kebab': (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase(),
    'case-constant': (s) => s.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s\-]+/g, '_').toUpperCase(),
    'case-dot': (s) => s.replace(/([a-z])([A-Z])/g, '$1.$2').replace(/[\s_\-]+/g, '.').toLowerCase(),
    'case-reverse': (s) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
  };

  Object.keys(converters).forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      output.textContent = converters[id](input.value);
    });
  });
}

/* ===== Word/Character Counter ===== */
function initWordCounter() {
  const input = document.getElementById('counter-input');
  const statsEl = document.getElementById('counter-stats');

  function update() {
    const text = input.value;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+\s*/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const readTime = Math.ceil(words / 200);

    statsEl.innerHTML =
      `<div class="stat-grid">
        <div><strong>${chars.toLocaleString()}</strong><span>Characters</span></div>
        <div><strong>${charsNoSpaces.toLocaleString()}</strong><span>No Spaces</span></div>
        <div><strong>${words.toLocaleString()}</strong><span>Words</span></div>
        <div><strong>${sentences}</strong><span>Sentences</span></div>
        <div><strong>${paragraphs}</strong><span>Paragraphs</span></div>
        <div><strong>${lines}</strong><span>Lines</span></div>
        <div><strong>~${readTime} min</strong><span>Read Time</span></div>
      </div>`;
  }

  input.addEventListener('input', update);
  update();
}

/* ===== Diff Checker ===== */
function initDiff() {
  const input1 = document.getElementById('diff-input1');
  const input2 = document.getElementById('diff-input2');
  const output = document.getElementById('diff-output');

  document.getElementById('diff-compare').addEventListener('click', () => {
    const lines1 = input1.value.split('\n');
    const lines2 = input2.value.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    let html = '';

    for (let i = 0; i < maxLen; i++) {
      const l1 = i < lines1.length ? lines1[i] : undefined;
      const l2 = i < lines2.length ? lines2[i] : undefined;

      if (l1 === l2) {
        html += `<div class="diff-line diff-same">  ${escapeHtml(l1)}</div>`;
      } else {
        if (l1 !== undefined) {
          html += `<div class="diff-line diff-remove">- ${escapeHtml(l1)}</div>`;
        }
        if (l2 !== undefined) {
          html += `<div class="diff-line diff-add">+ ${escapeHtml(l2)}</div>`;
        }
      }
    }

    if (!html) html = '<div class="diff-line diff-same">No differences found.</div>';
    output.innerHTML = html;
  });

  document.getElementById('diff-clear').addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    output.innerHTML = '';
  });
}
