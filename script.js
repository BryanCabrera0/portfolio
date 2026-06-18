// Reveal-on-scroll. Native CSS scroll-driven animations (animation-timeline)
// own this when supported — see the @supports block in styles.css. This
// IntersectionObserver is the fallback for engines without animation-timeline
// (e.g. Safari, 2026). Content is always present without JS via html.noJs.
document.documentElement.classList.remove("noJs");

const supportsSDA =
  typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: view()");

if (!supportsSDA) {
  const targets = document.querySelectorAll(".scrollReveal");

  if ("IntersectionObserver" in window) {
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
  } else {
    targets.forEach((el) => el.classList.add("in"));
  }
}
