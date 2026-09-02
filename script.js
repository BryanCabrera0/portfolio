// Scroll-spy: underline the nav link for the section currently centered in the
// viewport (cf. Apple product sub-nav). State only — no motion.
const links = [...document.querySelectorAll('.headerNav a[href^="#"]:not(.navPill)')];
const linkFor = new Map();
for (const a of links) {
  const section = document.querySelector(a.hash);
  if (section) linkFor.set(section, a);
}

if (linkFor.size && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const active = linkFor.get(entry.target);
        for (const a of links) a.classList.toggle("active", a === active);
      }
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  linkFor.forEach((_, section) => spy.observe(section));
  // The hero maps to no link; centering it clears the highlight instead of
  // leaving a stale one at the top.
  const hero = document.getElementById("top");
  if (hero) spy.observe(hero);
}
