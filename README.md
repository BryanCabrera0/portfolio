# portfolio

Personal portfolio site for Bryan Cabrera — iOS & macOS engineer in Miami, FL.
Also hosts app legal pages (privacy, terms, support), one folder per app.

Static HTML/CSS/JS, no build step.

## Structure

```text
index.html    Single-page portfolio
styles.css    Design system + legal page styles
script.js     Scroll reveals (content visible without JS)
404.html      Not-found page
assets/       Photos and app assets
drft/         DRFT legal pages: privacy/, terms/, support/
vercel.json   Clean URLs + asset caching
```

## Develop

```bash
python3 -m http.server 8000
```

## Deploy

```bash
npx vercel
```
