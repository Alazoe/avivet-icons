/* AviVet Icons — buscador y previsualización. Sin dependencias. */
(function () {
  'use strict';

  var data = window.AVIVET_ICONS || { icons: [], categories: {}, version: '1.0' };
  var icons = data.icons;
  var gallery = document.getElementById('gallery');
  var input = document.getElementById('q');
  var toast = document.getElementById('toast');
  var state = { query: '', category: 'all' };

  document.getElementById('ver').textContent = 'v' + data.version;
  document.getElementById('count').textContent = icons.length;

  /* Normaliza para que "vacuna" encuentre "vacunación" y "nutricion" encuentre "nutrición". */
  function norm(s) {
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function svgMarkup(icon) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"' +
      ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"' +
      ' stroke-linejoin="round">' +
      icon.body +
      '</svg>'
    );
  }

  /* ---------- Filtros de categoría ---------- */
  var cats = document.getElementById('cats');
  var used = ['all'].concat(
    Object.keys(data.categories).filter(function (c) {
      return icons.some(function (i) {
        return i.category === c;
      });
    }),
  );
  cats.innerHTML = used
    .map(function (c) {
      var label = c === 'all' ? 'Todas' : data.categories[c].name_es;
      return (
        '<button class="chip" data-cat="' +
        c +
        '"' +
        (c === 'all' ? ' aria-pressed="true"' : '') +
        '>' +
        label +
        '</button>'
      );
    })
    .join('');

  cats.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    state.category = btn.dataset.cat;
    cats.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    render();
  });

  /* ---------- Búsqueda ---------- */
  input.addEventListener('input', function () {
    state.query = norm(input.value.trim());
    render();
  });

  /* ---------- Tamaño y retícula ---------- */
  document.querySelector('.sizes').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-size]');
    if (!btn) return;
    document.documentElement.style.setProperty('--preview', btn.dataset.size + 'px');
    this.querySelectorAll('.chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
  });

  var gridToggle = document.getElementById('gridToggle');
  gridToggle.addEventListener('click', function () {
    var on = gridToggle.getAttribute('aria-pressed') !== 'true';
    gridToggle.setAttribute('aria-pressed', String(on));
    gallery.classList.toggle('grid-on', on);
  });

  /* ---------- Copiar al portapapeles ---------- */
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(say.t);
    say.t = setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }

  gallery.addEventListener('click', function (e) {
    var cell = e.target.closest('[data-id]');
    if (!cell) return;
    var icon = icons.find(function (i) {
      return i.id === cell.dataset.id;
    });
    var markup = svgMarkup(icon);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(markup).then(
        function () {
          say('SVG de ' + icon.id + ' copiado');
        },
        function () {
          say('No se pudo copiar: revisa los permisos del navegador');
        },
      );
    } else {
      say('Este navegador no permite copiar; abre src/' + icon.category + '/' + icon.id + '.svg');
    }
  });

  /* ---------- Render ---------- */
  function match(icon) {
    if (state.category !== 'all' && icon.category !== state.category) return false;
    if (!state.query) return true;
    var haystack = norm([icon.id, icon.name, icon.name_es, icon.keywords.join(' ')].join(' '));
    return state.query.split(/\s+/).every(function (term) {
      return haystack.indexOf(term) !== -1;
    });
  }

  function render() {
    var list = icons.filter(match);
    document.getElementById('shown').textContent =
      list.length === icons.length ? '' : '· ' + list.length + ' de ' + icons.length;

    gallery.innerHTML = list.length
      ? list
          .map(function (i) {
            return (
              '<button class="cell" data-id="' +
              i.id +
              '" title="Copiar SVG de ' +
              i.id +
              '">' +
              '<span class="frame">' +
              svgMarkup(i) +
              '</span>' +
              '<b>' +
              i.name_es +
              '</b><code>' +
              i.id +
              '</code></button>'
            );
          })
          .join('')
      : '<p class="empty">Sin resultados para «' +
        input.value +
        '».' +
        ' Prueba con <code>agua</code>, <code>ave</code> o <code>registro</code>.</p>';
  }

  /* ---------- Prueba de legibilidad ---------- */
  var ruler = document.getElementById('ruler');
  ['hen', 'rooster', 'chick', 'nest'].forEach(function (id) {
    var icon = icons.find(function (i) {
      return i.id === id;
    });
    if (!icon) return;
    var row = [16, 24, 48, 128]
      .map(function (px) {
        return (
          '<span style="width:' +
          px +
          'px;height:' +
          px +
          'px;display:inline-block">' +
          svgMarkup(icon).replace('width="64" height="64"', 'width="100%" height="100%"') +
          '</span>'
        );
      })
      .join('');
    ruler.insertAdjacentHTML(
      'beforeend',
      '<figure><span class="row">' +
        row +
        '</span>' +
        '<figcaption>' +
        id +
        ' · 16 / 24 / 48 / 128 px</figcaption></figure>',
    );
  });

  render();
})();
