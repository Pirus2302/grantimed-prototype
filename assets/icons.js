/* Линейные иконки направлений. Строим через DOM, без innerHTML. */
window.GMICONS = (function () {
  var NS = 'http://www.w3.org/2000/svg';

  var SHAPES = {
    eye: [
      ['path', 'M1.8 12S6 5.2 12 5.2 22.2 12 22.2 12 18 18.8 12 18.8 1.8 12 1.8 12Z'],
      ['circle', null, { cx: 12, cy: 12, r: 3.3 }]
    ],
    ear: [
      ['path', 'M7 9.2a5 5 0 0 1 10 0c0 3.4-3 4.3-3.6 6.7-.5 2-.6 4.1-2.7 4.1-1.8 0-2.7-1.3-2.7-2.9'],
      ['path', 'M10.6 9.6a1.6 1.6 0 0 1 3.1.4c0 1.6-1.8 2-2.2 3.4']
    ],
    heart: [
      ['path', 'M12 20.8S4.3 16 2.4 11.7A5.3 5.3 0 0 1 12 6.6a5.3 5.3 0 0 1 9.6 5.1C19.7 16 12 20.8 12 20.8Z'],
      ['path', 'M3.6 13h4l1.6-2.6L11 15l1.8-4 1.3 2h6.3']
    ],
    gyn: [
      ['circle', null, { cx: 12, cy: 8.4, r: 5.2 }],
      ['path', 'M12 13.6v7.2M8.9 18.1h6.2']
    ],
    uro: [
      ['circle', null, { cx: 10.2, cy: 13.8, r: 5.2 }],
      ['path', 'M14.4 10.1 20 4.5M15.6 4.4H20v4.4']
    ],
    uzi: [
      ['path', 'M3 13.2a9 9 0 0 1 18 0'],
      ['path', 'M6.6 13.2a5.4 5.4 0 0 1 10.8 0'],
      ['path', 'M10.1 13.2a1.9 1.9 0 0 1 3.8 0'],
      ['path', 'M12 17.4v3.4']
    ],
    pulse: [
      ['path', 'M2.2 12.4h4.2l2.4-6.6 3.6 13 2.5-6.4h6.9']
    ],
    sleep: [
      ['path', 'M20.8 13.6A8.6 8.6 0 1 1 10.4 3.2a6.8 6.8 0 0 0 10.4 10.4Z'],
      ['path', 'M14.6 4.6h3.6l-3.6 4h3.6']
    ]
  };

  function make(name) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    (SHAPES[name] || SHAPES.pulse).forEach(function (s) {
      var node = document.createElementNS(NS, s[0]);
      if (s[1]) node.setAttribute('d', s[1]);
      if (s[2]) Object.keys(s[2]).forEach(function (k) { node.setAttribute(k, s[2][k]); });
      svg.appendChild(node);
    });
    return svg;
  }

  return { make: make };
})();
