# Rijak Arora — Portfolio

A clean, single-page portfolio laid out like a résumé: a fixed profile panel on the left (name, role, section links, résumé and contact) and scrolling content on the right — About, Experience, Projects, Education, Skills and Contact.

Plain HTML, CSS and JavaScript. No build step, no dependencies. Light and dark themes (follows the system, with a toggle).

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content — every spot to personalise is marked `<!-- EDIT: ... -->` |
| `styles.css` | Layout and theme colours (tokens at the top of the file) |
| `script.js` | Theme toggle, active-section highlighting, copy-email button |
| `assets/` | Favicon; put your `resume.pdf` here |

## Personalise it

1. **Content** — open `index.html` and search for `EDIT:`. Each role, project and degree is one `<article class="entry">` block; copy or delete blocks as needed.
2. **Résumé** — add `assets/resume.pdf` (the "Résumé (PDF)" button opens it).
3. **Email** — replace `you@example.com` in `index.html` (three places: the profile icon, the contact link and the copy button).
4. **Colours** — change `--accent` and `--accent-soft` at the top of `styles.css` (light and dark blocks).

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
