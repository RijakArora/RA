# Rijak Arora — Portfolio

A fast, responsive, single-page portfolio website. Plain HTML, CSS and JavaScript — no build step, no dependencies.

**Features:** light/dark mode (follows system, with a toggle), mobile menu, scroll-spy navigation, reveal animations (respecting reduced-motion), accessible markup, and a working contact form.

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content — every spot to personalise is marked `<!-- EDIT: ... -->` |
| `styles.css` | Styling and theme colours (tokens at the top of the file) |
| `script.js` | Theme toggle, menu, animations, contact form settings |
| `assets/` | Favicon; put your `resume.pdf`, `profile.jpg` and project screenshots here |

## Personalise it

1. **Content** — open `index.html` and search for `EDIT:`. Update the headline, about text, stats, skills, experience, projects, and social links (LinkedIn is a placeholder).
2. **Résumé** — add `assets/resume.pdf` (the "Download résumé" button points there).
3. **Photo (optional)** — add `assets/profile.jpg` and replace `<span>RA</span>` inside `.avatar` with `<img src="assets/profile.jpg" alt="Rijak Arora">`.
4. **Project images (optional)** — in `styles.css`, change `.thumb-1` / `.thumb-2` / `.thumb-3` to `background-image: url("assets/project-1.png");`.
5. **Contact form** — in `script.js` set `CONTACT_EMAIL`. By default the form opens the visitor's email app. To receive messages directly, create a free form at [formspree.io](https://formspree.io) and paste its URL into `FORM_ENDPOINT`.
6. **Colours** — change `--accent` and `--accent-2` at the top of `styles.css` (both the light and dark blocks).

## Preview locally

Open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish free on GitHub Pages

1. Merge this branch into your default branch (`main`).
2. On GitHub go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

Tip: name the repository `<your-username>.github.io` to get the shorter URL `https://<your-username>.github.io/`.
