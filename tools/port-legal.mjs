// One-off porter: extracts DRFT legal/support page content from DRFT git
// history (promo-site, deleted in 77026759) and rewraps it verbatim in the
// portfolio page shell. Rerun if the upstream text needs re-porting:
//   node tools/port-legal.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const DRFT_REPO = "/Users/bryan/DRFT";
const SRC_COMMIT = "52dd5110"; // last commit containing promo-site/
const OUT_ROOT = new URL("..", import.meta.url).pathname;

const PAGES = [
  { slug: "privacy", title: "Privacy Policy", eyebrow: "DRFT · Privacy" },
  { slug: "terms", title: "Terms of Service", eyebrow: "DRFT · Terms" },
  { slug: "support", title: "Support", eyebrow: "DRFT · Support" },
];

const shell = ({ title, eyebrow, updated, body, slug }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="color-scheme" content="light" />
    <title>${title} — DRFT | Bryan Cabrera</title>
    <meta name="description" content="${title} for DRFT, the on-device name and wake-word alert app for iPhone and Mac by Bryan Cabrera." />
    <meta name="author" content="Bryan Cabrera" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="theme-color" content="#fdfdfd" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <main>
      <header class="header">
        <a class="wordmark wordmarkLink" href="/">Bryan Cabrera</a>
        <nav class="headerNav" aria-label="DRFT pages">
          <a href="/drft/privacy/"${slug === "privacy" ? ' aria-current="page"' : ""}>Privacy</a>
          <a href="/drft/terms/"${slug === "terms" ? ' aria-current="page"' : ""}>Terms</a>
          <a href="/drft/support/"${slug === "support" ? ' aria-current="page"' : ""}>Support</a>
          <a href="/#work" class="navPill">All apps</a>
        </nav>
      </header>

      <article class="legal">
        <span class="eyebrow">${eyebrow}</span>
        <h1>${title}</h1>
        ${updated ? `<p class="updated">${updated}</p>` : ""}
        <div class="legalBody">
${body}
        </div>
      </article>

      <footer class="footer">
        <span>Bryan Cabrera</span>
        <span class="footerDot">·</span>
        <span><a href="/">Home</a></span>
        <span class="footerDot">·</span>
        <span><a href="mailto:support@drft.ing">support@drft.ing</a></span>
      </footer>
    </main>
  </body>
</html>
`;

for (const page of PAGES) {
  const html = execFileSync(
    "git",
    ["show", `${SRC_COMMIT}:promo-site/${page.slug}/index.html`],
    { cwd: DRFT_REPO, maxBuffer: 32 * 1024 * 1024 }
  ).toString();

  // Updated date (privacy/terms have it; support has a subtitle instead).
  const updatedMatch = html.match(
    /class="mono legal-updated"[^>]*>\s*([\s\S]*?)\s*<\/p>/
  );
  const updated = updatedMatch
    ? updatedMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    : "";

  // Content container: everything inside <div class="body-text legal-body">,
  // matched by tag-depth counting so nested divs (tldr cards) survive.
  const open = html.indexOf('<div class="body-text legal-body">');
  if (open === -1) throw new Error(`legal-body not found in ${page.slug}`);
  let i = open + '<div class="body-text legal-body">'.length;
  let depth = 1;
  const tagRe = /<\/?div\b[^>]*>/g;
  tagRe.lastIndex = i;
  let end = -1;
  for (let m; (m = tagRe.exec(html)); ) {
    depth += m[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      end = m.index;
      break;
    }
  }
  if (end === -1) throw new Error(`unbalanced legal-body in ${page.slug}`);
  let body = html.slice(i, end);

  // Verbatim text; only adjust presentation hooks and link targets.
  body = body
    .replace(/\sclass="tldr-card"/g, ' class="legalCard"')
    .replace(/\sclass="[^"]*"/g, (m) => (m.includes("legalCard") ? m : ""))
    .replace(/\shref="\/(privacy|terms|support)\/?"/g, ' href="/drft/$1/"')
    .replace(/\shref="\/#([a-z-]+)"/g, ' href="https://drft.ing/#$1"')
    .replace(/<a\s+href="(https?:[^"]*)"/g, '<a href="$1" target="_blank" rel="noreferrer"');

  const outDir = `${OUT_ROOT}drft/${page.slug}`;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    `${outDir}/index.html`,
    shell({ ...page, updated, body, slug: page.slug })
  );
  console.log(`wrote drft/${page.slug}/index.html (${body.length} chars body)`);
}
