## Cursor Cloud specific instructions

This is a static HTML/CSS/JS website (originally exported from Zoho Sites) for the "Ethnicity & Criminal Justice" research project. There is no build step, no package manager, and no runtime dependencies.

### Running the dev server

Serve the workspace root with any HTTP server. The site uses absolute paths (`/css/…`, `/js/…`, `/images/…`) so opening HTML files directly in a browser will break asset loading.

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

### Pages

| Page | File |
|------|------|
| About (home) | `index.html` |
| Publications | `publications.html` |
| News & Events | `events.html` |
| Contact | `contact.html` |

### Notes

- Some CSS/JS references external Zoho CDN domains (`zohostratus.eu`, `zohostatic.eu`, `webfonts.zoho.eu`). Without internet access, the site still renders but falls back to system fonts and loses some non-essential widgets.
- There is no linter, test suite, or build command configured for this project.
