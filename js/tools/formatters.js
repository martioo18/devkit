/* ===== JSON Formatter/Validator ===== */
function initJson() {
  const input = document.getElementById('json-input');
  const output = document.getElementById('json-output');

  document.getElementById('json-format').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed, null, 2);
      output.style.color = '';
    } catch (e) {
      output.textContent = 'Invalid JSON: ' + e.message;
      output.style.color = 'var(--danger)';
    }
  });

  document.getElementById('json-minify').addEventListener('click', () => {
    try {
      const parsed = JSON.parse(input.value);
      output.textContent = JSON.stringify(parsed);
      output.style.color = '';
    } catch (e) {
      output.textContent = 'Invalid JSON: ' + e.message;
      output.style.color = 'var(--danger)';
    }
  });

  document.getElementById('json-validate').addEventListener('click', () => {
    try {
      JSON.parse(input.value);
      output.textContent = 'Valid JSON';
      output.style.color = 'var(--success)';
    } catch (e) {
      output.textContent = 'Invalid JSON: ' + e.message;
      output.style.color = 'var(--danger)';
    }
  });
}

/* ===== CSS Minifier ===== */
function initCssMinifier() {
  const input = document.getElementById('css-min-input');
  const output = document.getElementById('css-min-output');

  document.getElementById('css-minify-btn').addEventListener('click', () => {
    let css = input.value;
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove newlines and extra whitespace
    css = css.replace(/\s+/g, ' ');
    // Remove spaces around selectors and braces
    css = css.replace(/\s*{\s*/g, '{');
    css = css.replace(/\s*}\s*/g, '}');
    css = css.replace(/\s*;\s*/g, ';');
    css = css.replace(/\s*:\s*/g, ':');
    css = css.replace(/\s*,\s*/g, ',');
    // Remove last semicolon before closing brace
    css = css.replace(/;}/g, '}');
    css = css.trim();

    output.textContent = css;

    const originalSize = new Blob([input.value]).size;
    const minifiedSize = new Blob([css]).size;
    const saved = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;
    document.getElementById('css-min-stats').textContent = `Original: ${originalSize}B | Minified: ${minifiedSize}B | Saved: ${saved}%`;
  });
}

/* ===== SQL Formatter ===== */
function initSqlFormatter() {
  const input = document.getElementById('sql-input');
  const output = document.getElementById('sql-output');

  document.getElementById('sql-format-btn').addEventListener('click', () => {
    output.textContent = formatSQL(input.value);
  });

  document.getElementById('sql-minify-btn').addEventListener('click', () => {
    let sql = input.value.replace(/\s+/g, ' ').trim();
    output.textContent = sql;
  });
}

function formatSQL(sql) {
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
    'DROP TABLE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'FULL JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT',
    'OFFSET', 'UNION', 'UNION ALL', 'AS', 'IN', 'NOT', 'NULL',
    'IS', 'LIKE', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN',
    'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'INTO', 'IF'
  ];

  // Normalize whitespace
  let formatted = sql.replace(/\s+/g, ' ').trim();

  // Add newlines before major keywords
  const majorKeywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY',
    'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INSERT INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'JOIN', 'INNER JOIN',
    'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'ON'
  ];

  majorKeywords.sort((a, b) => b.length - a.length);

  majorKeywords.forEach(kw => {
    const regex = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi');
    formatted = formatted.replace(regex, '\n' + kw);
  });

  // Indent sub-keywords
  const indentKeywords = ['AND', 'OR', 'ON', 'SET'];
  const lines = formatted.split('\n').filter(l => l.trim());
  const result = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const upper = trimmed.toUpperCase();
    if (indentKeywords.some(kw => upper.startsWith(kw + ' ') || upper === kw)) {
      result.push('  ' + trimmed);
    } else {
      result.push(trimmed);
    }
  }

  return result.join('\n');
}

/* ===== Markdown Preview ===== */
function initMarkdown() {
  const input = document.getElementById('md-input');
  const preview = document.getElementById('md-preview');

  function render() {
    if (typeof marked !== 'undefined') {
      preview.innerHTML = marked.parse(input.value);
    } else {
      // Fallback simple markdown parser
      let html = input.value;
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // Headers
      html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
      html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
      html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
      // Bold & italic
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Code
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      // Links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      // Line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      html = '<p>' + html + '</p>';
      preview.innerHTML = html;
    }
  }

  input.addEventListener('input', render);
  document.getElementById('md-render-btn').addEventListener('click', render);
  render();
}
