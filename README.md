# 🧰 DevKit — Developer Utility Toolbox

[![Stars](https://img.shields.io/github/stars/Senzo13/devkit?style=flat-square)](https://github.com/Senzo13/devkit/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)]()

**A collection of 20+ essential developer utilities in a single, fast web app.**
Free, open-source, no ads, no tracking. Works offline — just open `index.html` in your browser.

---

## ✨ Features

- 🌑 **Dark mode** — easy on the eyes, built for developers
- ⚡ **Instant** — no build step, no framework, pure vanilla JS
- 📱 **Responsive** — works on desktop, tablet, and mobile
- 🔒 **Private** — everything runs client-side, nothing leaves your browser
- 🔍 **Searchable** — quickly filter tools from the sidebar
- 📋 **Copy to clipboard** — one-click copy on every output

---

## 🛠️ Tools Included

| # | Tool | Description |
|---|------|-------------|
| 1 | 🔐 **Base64 Encode/Decode** | Encode text to Base64 or decode Base64 back to text |
| 2 | 🔗 **URL Encode/Decode** | Percent-encode/decode URL components |
| 3 | 🎫 **JWT Decoder** | Decode JWT header + payload, show expiry status |
| 4 | 🆔 **UUID Generator** | Generate cryptographically random UUIDs (v4) |
| 5 | #️⃣ **Hash Generator** | MD5, SHA-1, SHA-256 hashing via Web Crypto API |
| 6 | 📄 **JSON Formatter** | Pretty-print, minify, and validate JSON |
| 7 | 📝 **Lorem Ipsum Generator** | Generate placeholder text (words, sentences, paragraphs) |
| 8 | 🎨 **Color Converter** | Convert between HEX, RGB, and HSL color formats |
| 9 | 🔎 **Regex Tester** | Test regex patterns with live match highlighting |
| 10 | ⏰ **Timestamp Converter** | Convert Unix timestamps to/from human-readable dates |
| 11 | 🏷️ **HTML Entity Encode/Decode** | Encode/decode HTML special characters |
| 12 | 📖 **Markdown Preview** | Write Markdown, see live rendered HTML preview |
| 13 | 🔑 **Password Generator** | Generate strong passwords with configurable options |
| 14 | 🔤 **Text Case Converter** | UPPER, lower, camelCase, snake_case, kebab-case, and more |
| 15 | 📊 **Word/Character Counter** | Count words, chars, sentences, paragraphs, reading time |
| 16 | 📱 **QR Code Generator** | Generate QR codes from any text or URL |
| 17 | ⚖️ **Diff Checker** | Compare two texts line-by-line with highlighted differences |
| 18 | 🔢 **Number Base Converter** | Convert between binary, octal, decimal, and hex |
| 19 | 🗜️ **CSS Minifier** | Minify CSS by removing whitespace, comments, and redundancy |
| 20 | 🗃️ **SQL Formatter** | Format or minify SQL queries for readability |

---

## 📸 Screenshots

> _Screenshots coming soon — contributions welcome!_

---

## 🚀 Getting Started

No build step required. Just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/Senzo13/devkit.git

# Open in your browser
open devkit/index.html
# or on Windows:
start devkit/index.html
```

### Using a local server (optional)

```bash
# Python
cd devkit && python -m http.server 8080

# Node.js
npx serve devkit

# Then open http://localhost:8080
```

---

## 📁 Project Structure

```
devkit/
├── index.html          # Main single-page app
├── css/
│   └── style.css       # Dark theme, responsive layout
├── js/
│   ├── app.js          # Tool switching, search, routing
│   └── tools/
│       ├── encoding.js # Base64, URL, HTML entity, JWT
│       ├── generators.js # UUID, password, lorem ipsum, QR code
│       ├── crypto.js   # Hash generator (MD5, SHA-1, SHA-256)
│       ├── formatters.js # JSON, CSS minifier, SQL formatter, Markdown
│       ├── converters.js # Color, timestamp, number base
│       └── text.js     # Regex, case converter, word counter, diff
├── README.md
└── LICENSE
```

---

## 🤝 Contributing

Contributions are welcome! To add a new tool:

1. **Fork** the repository
2. Create a new function in the appropriate `js/tools/*.js` file (or create a new one)
3. Add the HTML view in `index.html` inside the `<!-- TOOL VIEWS -->` section
4. Register the tool in the `TOOLS` array in `js/app.js`
5. Submit a **Pull Request**

### Tool template

Each tool needs:
- An `init` function that sets up event listeners
- An HTML section with `id="tool-{your-id}"` and class `tool-view`
- An entry in the `TOOLS` array: `{ id: 'your-id', icon: '...', name: 'Tool Name', init: initYourTool }`

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with vanilla HTML, CSS, and JavaScript. No frameworks, no bloat, just tools.**
