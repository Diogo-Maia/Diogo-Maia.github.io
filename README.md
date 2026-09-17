# diogo-maia.github.io

Personal website of **Diogo Maia** — Lead Software Engineer (.NET & C#, microservices, DDD, backend systems).

Live at <https://diogo-maia.github.io>

## Stack

Static HTML, CSS and a small amount of vanilla JavaScript — no frameworks, no build step,
no dependencies. It is served directly by GitHub Pages from the default branch.

```
index.html          single-page site
404.html            not-found page
assets/css/style.css
assets/js/main.js   theme toggle, mobile nav, scroll reveal, section highlighting
assets/img/         favicon, social preview, earlier-work thumbnails
assets/files/       CV (PDF)
```

## Running locally

Any static server works, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing

All content lives in `index.html` — the sections are marked with comment banners
(`HEADER`, `HERO`, `ABOUT`, `EXPERIENCE`, `SKILLS`, `DOMAINS`, `EDUCATION`, `CONTACT`).
Colours, spacing and typography are CSS custom properties at the top of `assets/css/style.css`;
the light theme overrides them under `[data-theme="light"]`.
