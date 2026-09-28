# Rijak Arora — Portfolio

An immersive, elegant single-page portfolio. Plain HTML, CSS and JavaScript — no build step, no dependencies.

**Features:** drifting aurora background with dot grid and film grain, cursor spotlight, preloader, floating glass navigation, rotating hero headline, neon avatar ring, scrolling tech marquee, glassmorphism cards, 3D-tilt glowing project cards, count-up stats, blur-in scroll reveals, scroll progress bar, animated form fields, and a sun/moon light–dark switch (follows the system by default). Motion is disabled automatically for visitors who prefer reduced motion.

**UI components** are adapted from [Uiverse.io](https://uiverse.io) (MIT) — see [CREDITS.md](CREDITS.md).

## Files

| File | What it is |
| --- | --- |
| `index.html` | All page content — every spot to personalise is marked `<!-- EDIT: ... -->` |
| `styles.css` | Layout, backdrop and theme colours (tokens at the top of the file) |
| `uiverse.css` | UI components adapted from Uiverse.io (buttons, switch, cards, inputs, loader) |
| `script.js` | Theme switch, menu, animations, contact form settings |
| `CREDITS.md` | Uiverse component authors and license |
| `assets/` | Favicon; put your `resume.pdf`, `profile.jpg` and project screenshots here |

## Personalise it

1. **Content** — open `index.html` and search for `EDIT:`. Update the headline (the rotating words are in `data-words`), about text, stats, skills, marquee, experience, projects, and social links (LinkedIn is a placeholder).
2. **Résumé** — add `assets/resume.pdf` (the "Download résumé" button points there).
3. **Photo (optional)** — add `assets/profile.jpg` and replace `<span>RA</span>` inside `.avatar` with `<img src="assets/profile.jpg" alt="">`.
4. **Project images (optional)** — in `styles.css`, change `.thumb-1` / `.thumb-2` / `.thumb-3` to `background-image: url("assets/project-1.png");`.
5. **Contact form** — in `script.js` set `CONTACT_EMAIL`. By default the form opens the visitor's email app. To receive messages directly, create a free form at [formspree.io](https://formspree.io) and paste its URL into `FORM_ENDPOINT`.
6. **Colours** — change `--violet`, `--indigo`, `--cyan` and `--pink` at the top of `styles.css`; `--accent` sets link/label colour for each theme.

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
