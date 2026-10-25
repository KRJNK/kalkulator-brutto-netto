// Brutto-netto UoP (uproszczony, parametry edytowalne). Wynik ORIENTACYJNY.
(function () {
  'use strict';
  var ids = ['brutto', 'p-em', 'p-re', 'p-ch', 'p-zd', 'p-kup', 'p-pit'];
  var els = {};
  ids.forEach(function (id) { els[id] = document.getElementById(id); });
  function fmt(n) {
    return (Math.round(n * 100) / 100).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function render() {
    var b = +els.brutto.value || 0;
    var zus = b * ((+els['p-em'].value || 0) + (+els['p-re'].value || 0) + (+els['p-ch'].value || 0)) / 100;
    var zdrowa = (b - zus) * (+els['p-zd'].value || 0) / 100;
    var podst = Math.max(0, b - zus - (+els['p-kup'].value || 0));
    var roczna = podst * 12;
    var pitR = roczna <= 120000 ? roczna * 0.12 : 120000 * 0.12 + (roczna - 120000) * 0.32;
    var pit = Math.max(0, pitR / 12 - (+els['p-pit'].value || 0));
    var netto = b - zus - zdrowa - pit;
    document.getElementById('out').textContent = b > 0 ? fmt(netto) + ' zł netto' : '—';
    document.getElementById('detail').textContent = b > 0 ?
      'ZUS: ' + fmt(zus) + ' zł · zdrowotna: ' + fmt(zdrowa) + ' zł · PIT: ' + fmt(pit) +
      ' zł. Uproszczone, bez PPK/ulg — sprawdź pasek płacowy.' : '';
  }
  ids.forEach(function (id) { els[id].addEventListener('input', render); });
  render();
})();
