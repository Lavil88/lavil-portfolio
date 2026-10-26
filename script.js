// Progressive enhancement only: the page reads fine without this file.
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (!("IntersectionObserver" in window) || reduce) return;
  root.classList.add("js");

  // Fade sections in, and grow the F1 bars, as they scroll into view.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll(".bars").forEach((b) => b.classList.add("in"));
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Count the hero stats up from zero once.
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      statIo.unobserve(entry.target);
    });
  });
  document.querySelectorAll("[data-count]").forEach((el) => statIo.observe(el));
})();
