/* ===== Base64 Encode/Decode ===== */
function initBase64() {
  const input = document.getElementById('base64-input');
  const output = document.getElementById('base64-output');

  document.getElementById('base64-encode').addEventListener('click', () => {
    try {
      output.textContent = btoa(unescape(encodeURIComponent(input.value)));
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
    }
  });

  document.getElementById('base64-decode').addEventListener('click', () => {
    try {
      output.textContent = decodeURIComponent(escape(atob(input.value.trim())));
    } catch (e) {
      output.textContent = 'Error: Invalid Base64 string';
    }
  });
}

/* ===== URL Encode/Decode ===== */
function initUrlEncode() {
  const input = document.getElementById('url-input');
  const output = document.getElementById('url-output');

  document.getElementById('url-encode').addEventListener('click', () => {
    output.textContent = encodeURIComponent(input.value);
  });

  document.getElementById('url-decode').addEventListener('click', () => {
    try {
      output.textContent = decodeURIComponent(input.value);
    } catch (e) {
      output.textContent = 'Error: Invalid encoded string';
    }
  });
}

/* ===== HTML Entity Encode/Decode ===== */
function initHtmlEntity() {
  const input = document.getElementById('html-entity-input');
  const output = document.getElementById('html-entity-output');

  document.getElementById('html-entity-encode').addEventListener('click', () => {
    const div = document.createElement('div');
    div.textContent = input.value;
    output.textContent = div.innerHTML;
  });

  document.getElementById('html-entity-decode').addEventListener('click', () => {
    const div = document.createElement('div');
    div.innerHTML = input.value;
    output.textContent = div.textContent;
  });
}

/* ===== JWT Decoder ===== */
function initJwt() {
  const input = document.getElementById('jwt-input');
  const output = document.getElementById('jwt-output');

  document.getElementById('jwt-decode-btn').addEventListener('click', () => {
    const token = input.value.trim();
    if (!token) { output.innerHTML = 'Enter a JWT token above.'; return; }

    const parts = token.split('.');
    if (parts.length !== 3) { output.innerHTML = '<span style="color:var(--danger)">Invalid JWT: expected 3 parts, got ' + parts.length + '</span>'; return; }

    try {
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      let html = '<div class="jwt-section"><h4>Header</h4><div class="output-area">' + escapeHtml(JSON.stringify(header, null, 2)) + '</div></div>';
      html += '<div class="jwt-section"><h4>Payload</h4><div class="output-area">' + escapeHtml(JSON.stringify(payload, null, 2)) + '</div></div>';

      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const isExpired = expDate < new Date();
        const color = isExpired ? 'var(--danger)' : 'var(--success)';
        const label = isExpired ? 'EXPIRED' : 'Valid';
        html += '<div class="jwt-section"><h4>Expiry</h4><p style="color:' + color + '">' + label + ' — ' + expDate.toUTCString() + '</p></div>';
      }

      if (payload.iat) {
        html += '<div class="jwt-section"><h4>Issued At</h4><p>' + new Date(payload.iat * 1000).toUTCString() + '</p></div>';
      }

      output.innerHTML = html;
    } catch (e) {
      output.innerHTML = '<span style="color:var(--danger)">Error decoding JWT: ' + escapeHtml(e.message) + '</span>';
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
