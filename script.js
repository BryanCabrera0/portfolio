// Reveal-on-scroll: a single gentle fade-up the first time each block enters
// the viewport. Content is always present without JS (html.noJs), and the
// reduced-motion block in styles.css shows everything statically.
document.documentElement.classList.remove("noJs");

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasIO = "IntersectionObserver" in window;
const reveals = document.querySelectorAll(".scrollReveal, .revealGroup");

if (reduce || !hasIO) {
  reveals.forEach((el) => el.classList.add("in"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  reveals.forEach((el) => revealObserver.observe(el));
}

// Scroll-spy: highlight the nav link for the section currently centered in the
// viewport (cf. Apple product sub-nav). This is state, not motion, so it runs
// regardless of prefers-reduced-motion; it only needs IntersectionObserver.
if (hasIO) {
  const links = [
    ...document.querySelectorAll('.headerNav a[href^="#"]'),
  ].filter((a) => !a.classList.contains("navPill"));

  const linkFor = new Map();
  for (const a of links) {
    const section = document.getElementById(a.getAttribute("href").slice(1));
    if (section) linkFor.set(section, a);
  }

  if (linkFor.size) {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const active = linkFor.get(entry.target);
            links.forEach((a) => a.classList.toggle("active", a === active));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    linkFor.forEach((_, section) => spy.observe(section));
    // Observe the hero too: it maps to no link, so centering it clears the
    // active state instead of leaving a stale highlight at the top.
    const hero = document.getElementById("top");
    if (hero) spy.observe(hero);
  }
}
