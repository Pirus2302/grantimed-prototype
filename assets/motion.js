/* Общий слой движения для вариантов 1 и 2.

   Правила, по которым он собран (аудитория 50+, район Каменной Горки):
   – ничего не двигается само по себе и ничего не всплывает поверх контента;
   – блок появляется один раз и остаётся на месте, повторных проигрываний нет;
   – смещение маленькое (14 px) и короткое (420 мс) — глаз успевает за текстом;
   – при prefers-reduced-motion всё показывается сразу, без единой анимации;
   – без IntersectionObserver (старый браузер) страница тоже полностью видна.

   Скрипт сам добавляет нужный CSS и сам размечает блоки, поэтому вёрстку
   вариантов трогать не нужно — подключается одной строкой перед </body>. */
(function () {
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Группы появления. Внутри каждой — своя лесенка задержек, поэтому карточки
     в сетке проявляются по очереди, а не всей плитой сразу. */
  var GROUPS = [
    '.hero h1, .hero p, .hero-cta, .hero-img, .hero-media',
    '.hero-facts .fact, .chips .chip',
    'section > .wrap > h2, section > .wrap > .lead, .band > .wrap > div',
    '.dir, .dcol',
    '.doc, .soon',
    '.somno .wrap > div > *, .somno .wrap > img',
    '.ptabs, .ptable, .pnote',
    '.waylist li, .map',
    '.q',
    '.form-sec .wrap > *'
  ];

  var STEP = 60;   /* мс между соседями в группе */
  var MAX = 5;     /* дальше лесенка не растёт: ждать восьмую карточку незачем */

  function injectCss() {
    var css = [
      '.gm-rv{opacity:0;transform:translateY(14px);',
      'transition:opacity .42s ease-out,transform .42s ease-out}',
      '.gm-rv.gm-in{opacity:1;transform:none}',
      /* Плавная прокрутка по якорям — это единственное движение, которое
         запускает сам человек, поэтому оно уместно даже здесь. */
      'html{scroll-behavior:smooth}',
      '@media (prefers-reduced-motion: reduce){',
      '.gm-rv{opacity:1;transform:none;transition:none}',
      'html{scroll-behavior:auto}}'
    ].join('');
    var tag = document.createElement('style');
    tag.setAttribute('data-gm', 'motion');
    tag.appendChild(document.createTextNode(css));
    document.head.appendChild(tag);
  }

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  function mark() {
    var all = [];
    GROUPS.forEach(function (sel) {
      each(document.querySelectorAll(sel), function (n, i) {
        if (n.classList.contains('gm-rv')) return;
        n.classList.add('gm-rv');
        n.setAttribute('data-gm-delay', Math.min(i, MAX) * STEP);
        all.push(n);
      });
    });
    return all;
  }

  var DUR_IN = 420;

  function show(n) {
    var d = parseInt(n.getAttribute('data-gm-delay'), 10) || 0;
    n.style.transitionDelay = d + 'ms';
    n.classList.add('gm-in');
    /* Задержку обязательно снять после появления: она живёт на элементе и
       иначе тормозила бы наведение на карточку на те же полсекунды. */
    setTimeout(function () {
      n.style.transitionDelay = '';
      n.removeAttribute('data-gm-delay');
    }, d + DUR_IN + 60);
  }

  function reveal(nodes) {
    if (reduce || !('IntersectionObserver' in window)) {
      each(nodes, function (n) { n.classList.add('gm-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        show(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    each(nodes, function (n) { io.observe(n); });
  }

  /* Числа в цифрах добираются до своего значения за полсекунды. Текстовые
     значения («Без очередей», «В день обращения») остаются как есть — считать
     там нечего, а подмена текста на ходу читалась бы как сбой. */
  var NUM = /^(\d+)(\D*)$/;

  function countUp() {
    if (reduce || !('IntersectionObserver' in window)) return;
    var targets = [];
    each(document.querySelectorAll('.fact b, .chip b, .stat b'), function (n) {
      var m = n.textContent.trim().match(NUM);
      if (!m) return;
      targets.push({ node: n, to: parseInt(m[1], 10), tail: m[2] });
    });
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var t = targets.filter(function (x) { return x.node === e.target; })[0];
        if (!t) return;
        var started = null;
        var DUR = 520;
        var step = function (now) {
          if (started === null) started = now;
          var p = Math.min((now - started) / DUR, 1);
          /* ease-out: число притормаживает у цели, а не щёлкает счётчиком */
          var v = Math.round(t.to * (1 - Math.pow(1 - p, 3)));
          t.node.textContent = v + t.tail;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });

    targets.forEach(function (t) {
      t.node.textContent = '0' + t.tail;
      io.observe(t.node);
    });
  }

  /* Фотография первого экрана уезжает медленнее страницы. Коэффициент 0.12 —
     заметно, что экран «живой», но текст рядом не начинает плыть. */
  function parallax() {
    if (reduce) return;
    var img = document.querySelector('.hero-img img, .hero-media > img');
    if (!img) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.pageYOffset, 900);
        img.style.transform = 'translate3d(0,' + (y * 0.12) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Шапка прижимается к странице после первого экрана: тень появляется только
     тогда, когда под ней действительно что-то проехало. */
  function header() {
    var head = document.querySelector('header');
    if (!head) return;
    var css = document.createElement('style');
    css.appendChild(document.createTextNode(
      'header{transition:box-shadow .25s ease-out}' +
      'header.gm-stuck{box-shadow:0 6px 24px rgba(43,35,32,.10)}'
    ));
    document.head.appendChild(css);
    var ticking = false;
    function apply() {
      head.classList.toggle('gm-stuck', window.pageYOffset > 40);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }, { passive: true });
    apply();
  }

  function start() {
    injectCss();
    /* render.js собирает карточки уже после DOMContentLoaded, поэтому разметка
       ждёт следующего кадра — иначе половина сетки осталась бы без анимации. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        reveal(mark());
        countUp();
      });
    });
    parallax();
    header();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
