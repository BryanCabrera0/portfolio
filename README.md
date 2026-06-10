# portfolio

Personal portfolio site for Bryan Cabrera — iOS & macOS engineer in Miami, FL.

Static HTML/CSS/JS, no build step. Design language: Nunito, paper white, ink,
hairline borders, pill buttons, scroll reveals (after [gotcha.jurre.me](https://gotcha.jurre.me)).

## Structure

```text
index.html    Single-page portfolio: hero, projects, experience, toolbox, contact
styles.css    Design system (CSS variables in :root)
script.js     IntersectionObserver scroll reveals (content visible without JS)
404.html      Not-found page
assets/       Project art (DRFT app icon)
vercel.json   Clean URLs + immutable asset caching
```

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
