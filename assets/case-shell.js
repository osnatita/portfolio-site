/* Case page: scroll-spy for the sticky section nav + reveal-on-scroll */
(function () {
  var links = [].slice.call(document.querySelectorAll('.case-nav a[href^="#"]'));
  var secs = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function onScroll() {
    var y = window.scrollY + 160;
    var cur = secs[0];
    secs.forEach(function (s) { if (s.offsetTop <= y) cur = s; });
    links.forEach(function (a) {
      a.classList.toggle('active', cur && a.getAttribute('href') === '#' + cur.id);
    });
  }
  if (secs.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  var els = document.querySelectorAll('.case-sec, .case-cover');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
