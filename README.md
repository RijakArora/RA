# Rijak Arora — Portfolio

A clean, single-page portfolio laid out like a résumé: a fixed profile panel on the left (name, role, section links, résumé and contact) and scrolling content on the right — About, Projects, Skills, Education, Certifications, Achievements, Leadership and Contact.

Plain HTML, CSS and JavaScript. No build step, no dependencies. Light and dark themes (follows the system, with a toggle).

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content, one `<section>` per résumé section |
| `styles.css` | Layout and theme colours (tokens at the top of the file) |
| `script.js` | Theme toggle, active-section highlighting, copy-email button |
| `assets/` | Favicon and `Rijak_Arora_Resume.pdf` (opened by the Résumé button) |

## Updating it

1. **Content** — edit `index.html`. Each project is one `<article class="project">`, each dated item (education, leadership) one `<article class="entry">`, and skills, certifications and achievements are label/value rows in a `<dl class="rows">`. Copy or delete blocks as needed.
2. **Résumé** — replace `assets/Rijak_Arora_Resume.pdf` with a newer version (keep the file name, or update the link in `index.html`).
3. **Colours** — change `--accent` and `--accent-soft` at the top of `styles.css` (light and dark blocks).

## Preview locally

Open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish free on GitHub Pages

1. On GitHub go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch that holds this site and `/ (root)`, then **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
