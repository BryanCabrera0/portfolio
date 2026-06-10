# portfolio

Personal portfolio site for Bryan Cabrera — iOS & macOS engineer in Miami, FL.
Also the one-stop home for app legal pages (privacy, terms, support), one
folder per app.

Static HTML/CSS/JS, no build step. Design language: Nunito, paper white, ink,
hairline borders, pill buttons, scroll reveals (after [gotcha.jurre.me](https://gotcha.jurre.me)).

## Structure

```text
index.html    Single-page portfolio: hero, projects, experience, about, contact
styles.css    Design system (CSS variables in :root) + legal page styles
script.js     IntersectionObserver scroll reveals (content visible without JS)
404.html      Not-found page
assets/       Photos, DRFT app icon, and DRFT screenshots
drft/         DRFT legal pages: privacy/, terms/, support/
tools/        port-legal.mjs — one-off porter for the DRFT legal content
vercel.json   Clean URLs + immutable asset caching
```

Future apps (Shelf, Bounty) get their own folder with the same three pages.

## Develop

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

Any static host works. For Vercel:

```bash
npx vercel
```
