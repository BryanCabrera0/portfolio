/* App-icon 3D tilt (App Store-style parallax) — progressive enhancement, gated
   on a real pointer with motion allowed. Not required for content or
   navigation. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  if (!fine || reduce) return;

  document.body.classList.add("pointer-fine");

  const max = 15; // degrees
  document.querySelectorAll(".appIcon").forEach((card) => {
    const img = card.querySelector("img");
    if (!img) return;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 2 * max;
      const rx = (0.5 - py) * 2 * max;
      img.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      img.style.transform = "";
    });
  });
})();
