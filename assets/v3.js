/* Вариант 3: появление блоков, лёгкий параллакс и подбор врача в три шага. */
(function () {
  var D = window.GM;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- появление при скролле ---- */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (n) { n.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .08 });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
  }

  /* ---- параллакс первого экрана ---- */
  var heroImg = document.getElementById('heroImg');
  if (heroImg && !reduce) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = Math.min(window.pageYOffset, 900);
        heroImg.style.transform = 'translate3d(0,' + (y * 0.16) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---- подбор врача в три шага ---- */
  var SYMPTOMS = [
    { t: 'Плохо вижу, устают глаза', s: 'Очки, глазное дно, покраснение', dir: 'oftalmologiya' },
    { t: 'Ухо, горло или нос', s: 'Заложенность, боль, серные пробки', dir: 'lor' },
    { t: 'Храплю, не высыпаюсь', s: 'Остановки дыхания во сне, дневная сонливость', dir: 'somnologiya' },
    { t: 'Давление, сердце, одышка', s: 'Перебои в сердце, высокое давление', dir: 'kardiologiya' },
    { t: 'Женское здоровье', s: 'Профосмотр, боли, планирование', dir: 'ginekologiya' },
    { t: 'Мужское здоровье', s: 'Простата, анализы, профосмотр', dir: 'urologiya' },
    { t: 'Нужно УЗИ', s: 'Живот, щитовидка, сосуды, сердце', dir: 'uzi' },
    { t: 'Нужна ЭКГ или Холтер', s: 'Функциональная диагностика', dir: 'diagnostika' },
    { t: 'Просто профилактический осмотр', s: 'Не знаю, с чего начать', dir: 'oftalmologiya' }
  ];

  /* к каким врачам ведём, если в направлении нет своих карточек */
  var FALLBACK = { somnologiya: 'lor', uzi: null, diagnostika: 'kardiologiya' };

  var box = document.getElementById('pbox');
  var stepChips = document.querySelectorAll('.step-n');
  if (!box) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function setStep(i) {
    Array.prototype.forEach.call(stepChips, function (c, k) {
      c.classList.toggle('on', k === i - 1);
    });
  }

  function step1() {
    setStep(1);
    clear(box);
    var grid = el('div', 'pgrid');
    SYMPTOMS.forEach(function (s) {
      var b = el('button', 'popt');
      b.setAttribute('type', 'button');
      b.appendChild(document.createTextNode(s.t));
      b.appendChild(el('span', null, s.s));
      b.addEventListener('click', function () { step2(s.dir); });
      grid.appendChild(b);
    });
    box.appendChild(grid);
  }

  function findDir(id) {
    for (var i = 0; i < D.directions.length; i++) if (D.directions[i].id === id) return D.directions[i];
    return D.directions[0];
  }

  function step2(dirId) {
    setStep(2);
    clear(box);
    var dir = findDir(dirId);
    var back = el('button', 'pback', 'другая жалоба');
    back.setAttribute('type', 'button');
    back.addEventListener('click', step1);
    box.appendChild(back);

    var res = el('div', 'presult');
    res.appendChild(el('h3', null, dir.name));
    res.appendChild(el('div', 'sub', dir.short + '. Консультация от ' + dir.from + ' BYN'));
    var grid = el('div', 'pgrid');
    dir.list.forEach(function (svc) {
      var b = el('button', 'popt');
      b.setAttribute('type', 'button');
      b.appendChild(document.createTextNode(svc));
      b.addEventListener('click', function () { step3(dir); });
      grid.appendChild(b);
    });
    res.appendChild(grid);
    box.appendChild(res);
  }

  function step3(dir) {
    setStep(3);
    clear(box);
    var back = el('button', 'pback', 'другое направление');
    back.setAttribute('type', 'button');
    back.addEventListener('click', function () { step2(dir.id); });
    box.appendChild(back);

    var lookIn = FALLBACK.hasOwnProperty(dir.id) ? FALLBACK[dir.id] : dir.id;
    var list = lookIn ? D.doctors.filter(function (d) { return d.dir === lookIn; }) : [];

    var res = el('div', 'presult');
    res.appendChild(el('h3', null, list.length ? 'Эти врачи принимают по вашему вопросу' : 'Подберём специалиста'));
    res.appendChild(el('div', 'sub', list.length
      ? 'Нажмите на врача, чтобы открыть его страницу, или оставьте заявку — администратор подберёт время'
      : 'По этому направлению приём ведёт диагностическая служба. Оставьте заявку, администратор подберёт время и специалиста'));

    if (list.length) {
      var grid = el('div', 'pdocs');
      list.forEach(function (doc) {
        var a = el('a', 'pdoc');
        a.setAttribute('href', 'vrach.html?v=3&id=' + doc.id);
        var img = el('img');
        img.setAttribute('src', doc.photo);
        img.setAttribute('alt', doc.name);
        a.appendChild(img);
        var t = el('div');
        t.appendChild(el('b', null, doc.short));
        t.appendChild(el('span', null, doc.spec + ' · от ' + doc.price + ' BYN'));
        a.appendChild(t);
        grid.appendChild(a);
      });
      res.appendChild(grid);
    }

    var cta = el('a', 'btn btn-light', 'Оставить заявку');
    cta.setAttribute('href', '#form');
    cta.style.marginTop = '22px';
    res.appendChild(cta);
    box.appendChild(res);

    var sel = document.querySelector('[data-gm="dirselect"]');
    if (sel) sel.value = dir.id;
  }

  step1();
})();
