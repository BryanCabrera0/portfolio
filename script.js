// Scroll-triggered reveals via IntersectionObserver, mirroring the hero's
// load-time reveal animation. Content stays visible without JS (html.noJs).
document.documentElement.classList.remove("noJs");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".scrollReveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
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
