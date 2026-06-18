// Reveal-on-scroll: a single gentle fade-up the first time each block enters
// the viewport. Content is always present without JS (html.noJs), and the
// reduced-motion block in styles.css shows everything statically.
document.documentElement.classList.remove("noJs");

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".scrollReveal");

if (reduce || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  targets.forEach((el) => observer.observe(el));
}
