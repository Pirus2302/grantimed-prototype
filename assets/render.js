/* Сборка общих блоков прототипа. Всё строится через DOM, без innerHTML. */
(function () {
  var D = window.GM;
  var V = document.body.getAttribute('data-variant') || '1';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function q(name) { return document.querySelector('[data-gm="' + name + '"]'); }
  function qa(name) { return Array.prototype.slice.call(document.querySelectorAll('[data-gm="' + name + '"]')); }

  var hoursLine = D.contacts.hoursWeek + ' · ' + D.contacts.hoursWeekend;

  /* ---- простые текстовые слоты ---- */
  qa('addr').forEach(function (n) { n.textContent = D.contacts.address; });
  qa('metro').forEach(function (n) { n.textContent = D.contacts.metro; });
  qa('hours').forEach(function (n) { n.textContent = hoursLine; });
  qa('hours2').forEach(function (n) {
    n.appendChild(el('span', null, 'Приём по записи'));
    n.appendChild(document.createElement('br'));
    n.appendChild(el('span', null, D.contacts.hoursWeek));
    n.appendChild(document.createElement('br'));
    n.appendChild(el('span', null, D.contacts.hoursWeekend));
  });
  qa('phone1').forEach(function (n) {
    n.textContent = D.contacts.phones[0].num;
    n.setAttribute('href', 'tel:' + D.contacts.phones[0].tel);
  });
  qa('call').forEach(function (n) {
    n.setAttribute('href', 'tel:' + D.contacts.phones[0].tel);
    if (!n.textContent.trim()) n.textContent = D.contacts.phones[0].num;
  });
  qa('email').forEach(function (n) {
    n.textContent = D.contacts.email;
    n.setAttribute('href', 'mailto:' + D.contacts.email);
  });

  /* ---- направления ---- */
  var dirsBox = q('dirs');
  if (dirsBox) {
    if (V === '2') {
      D.directions.forEach(function (d) {
        var a = el('a', 'dcol' + (d.flag ? ' flag' : ''));
        a.setAttribute('href', '#form');
        var head = el('div', 'dcol-h');
        head.appendChild(GMICONS.make(d.icon));
        var ht = el('div');
        ht.appendChild(el('h3', null, d.name));
        ht.appendChild(el('span', 'from', 'от ' + d.from + ' BYN'));
        head.appendChild(ht);
        a.appendChild(head);
        var ul = el('ul');
        d.list.forEach(function (s) { ul.appendChild(el('li', null, s)); });
        a.appendChild(ul);
        dirsBox.appendChild(a);
      });
    } else {
      D.directions.forEach(function (d) {
        var a = el('a', 'dir' + (d.flag ? ' flag' : ''));
        a.setAttribute('href', '#form');
        if (d.flag) a.appendChild(el('span', 'badge', 'Наша редкая услуга'));
        a.appendChild(GMICONS.make(d.icon));
        a.appendChild(el('h3', null, d.name));
        a.appendChild(el('p', null, d.short));
        a.appendChild(el('span', 'from', 'от ' + d.from + ' BYN'));
        dirsBox.appendChild(a);
      });
    }
  }

  /* ---- врачи ---- */
  var docsBox = q('docs');
  if (docsBox) {
    D.doctors.forEach(function (doc) {
      var a = el('a', 'doc');
      a.setAttribute('href', 'vrach.html?v=' + V + '&id=' + doc.id);
      var ph = el('div', 'doc-ph');
      var img = el('img');
      img.setAttribute('src', doc.photo);
      img.setAttribute('alt', doc.name);
      img.setAttribute('loading', 'lazy');
      ph.appendChild(img);
      a.appendChild(ph);
      var b = el('div', 'doc-b');
      b.appendChild(el('h3', null, doc.short));
      b.appendChild(el('div', 'sp', doc.spec));
      b.appendChild(el('div', 'ct', doc.cat.charAt(0).toUpperCase() + doc.cat.slice(1) + '. ' + doc.patients));
      b.appendChild(el('span', 'more', 'Подробнее →'));
      a.appendChild(b);
      docsBox.appendChild(a);
    });
    var soon = el('div', 'soon', 'Здесь появятся ещё 10 врачей — место под расширение состава уже заложено в сетку');
    docsBox.appendChild(soon);
  }

  /* ---- цены с переключателем групп ---- */
  var tabsBox = q('ptabs'), tableBox = q('ptable');
  if (tabsBox && tableBox) {
    var draw = function (gi) {
      while (tableBox.firstChild) tableBox.removeChild(tableBox.firstChild);
      D.prices[gi].items.forEach(function (it) {
        var row = el('div', 'prow');
        row.appendChild(el('span', null, it[0]));
        row.appendChild(el('b', null, it[1] + ' BYN'));
        tableBox.appendChild(row);
      });
      Array.prototype.forEach.call(tabsBox.children, function (b, i) {
        b.setAttribute('aria-selected', i === gi ? 'true' : 'false');
      });
    };
    D.prices.forEach(function (grp, i) {
      var b = el('button', 'ptab', grp.g);
      b.setAttribute('type', 'button');
      b.addEventListener('click', function () { draw(i); });
      tabsBox.appendChild(b);
    });
    draw(0);
  }

  /* ---- как добраться ---- */
  var wayBox = q('way');
  if (wayBox) {
    [
      ['Адрес', D.contacts.address],
      ['Метро', D.contacts.metro],
      ['Парковка', 'Бесплатная парковка у дома'],
      ['Режим работы', hoursLine],
      ['Почта', D.contacts.email]
    ].forEach(function (p) {
      var li = el('li');
      li.appendChild(el('span', 'k', p[0]));
      li.appendChild(el('span', 'v', p[1]));
      wayBox.appendChild(li);
    });
  }

  /* ---- телефоны ---- */
  qa('phones').forEach(function (box) {
    D.contacts.phones.forEach(function (p) {
      var a = el('a', 'phone-row');
      a.setAttribute('href', 'tel:' + p.tel);
      a.appendChild(document.createTextNode(p.num));
      a.appendChild(el('span', null, p.label));
      box.appendChild(a);
    });
  });
  qa('fphones').forEach(function (box) {
    D.contacts.phones.forEach(function (p) {
      var li = el('li');
      var a = el('a', null, p.num);
      a.setAttribute('href', 'tel:' + p.tel);
      li.appendChild(a);
      box.appendChild(li);
    });
  });
  qa('fdirs').forEach(function (box) {
    D.directions.forEach(function (d) {
      var li = el('li');
      var a = el('a', null, d.name);
      a.setAttribute('href', '#dirs');
      li.appendChild(a);
      box.appendChild(li);
    });
  });

  /* ---- FAQ ---- */
  var faqBox = q('faq');
  if (faqBox) {
    D.faq.forEach(function (pair, i) {
      var d = el('details', 'q');
      if (i === 0) d.setAttribute('open', '');
      d.appendChild(el('summary', null, pair[0]));
      d.appendChild(el('div', 'a', pair[1]));
      faqBox.appendChild(d);
    });
  }

  /* ---- селект направлений в форме ---- */
  qa('dirselect').forEach(function (sel) {
    var o0 = el('option', null, 'Выберите направление');
    o0.value = '';
    sel.appendChild(o0);
    D.directions.forEach(function (d) {
      var o = el('option', null, d.name);
      o.value = d.id;
      sel.appendChild(o);
    });
  });

  /* ---- отправка формы ---- */
  qa('form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      while (f.firstChild) f.removeChild(f.firstChild);
      var h = el('h3', 'ok-h', 'Спасибо, заявка принята');
      h.style.fontSize = '22px';
      h.style.marginBottom = '10px';
      var p = el('p', null, 'Это прототип — заявка никуда не ушла. На рабочем сайте отсюда уходит уведомление администратору.');
      p.style.margin = '0';
      p.style.opacity = '.75';
      f.appendChild(h);
      f.appendChild(p);
    });
  });
})();
