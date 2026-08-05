/* ═══════════════════════════════════════════════════════════════════
   lab.js — учебный стенд. РЕДАКТИРОВАТЬ НЕ НУЖНО.

   Здесь лежит имитация сервера и приборная панель, которая считает
   ваши запросы. Ваш код живёт в script.js.

   Что стенд даёт вам наружу:

     searchOnServer(query, callback)
         «Отправляет запрос на сервер». Ответ приходит не сразу,
         а через 300–700 мс — как в жизни. Когда ответ придёт,
         стенд вызовет ваш callback и передаст в него массив
         найденных элементов.

     ui.renderResults(results)   показать массив результатов на странице
     ui.clearResults()           убрать список
     ui.showStatus(text)         строка состояния под полем ('' — очистить)
   ═══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Справочник, по которому «ищет сервер» ───────────────────── */

  var DATA = [
    { kind: 'Таймер',        title: 'setTimeout',        note: 'Выполнить функцию один раз через задержку' },
    { kind: 'Таймер',        title: 'clearTimeout',      note: 'Отменить отложенный вызов, если он ещё не сработал' },
    { kind: 'Таймер',        title: 'setInterval',       note: 'Повторять функцию через равные промежутки времени' },
    { kind: 'Таймер',        title: 'clearInterval',     note: 'Остановить повторяющийся таймер' },
    { kind: 'Асинхронность', title: 'callback',          note: 'Функция, которую передают, чтобы её вызвали позже' },
    { kind: 'Асинхронность', title: 'Promise',           note: 'Объект-обещание: результат операции, который придёт потом' },
    { kind: 'Асинхронность', title: 'async / await',     note: 'Синтаксис, чтобы писать асинхронный код как обычный' },
    { kind: 'Асинхронность', title: 'fetch',             note: 'Запрос к серверу за данными' },
    { kind: 'Асинхронность', title: 'debounce',          note: 'Отложить действие до паузы в потоке событий' },
    { kind: 'Асинхронность', title: 'throttle',          note: 'Выполнять действие не чаще одного раза в N мс' },
    { kind: 'Массив',        title: 'forEach',           note: 'Перебрать элементы массива по очереди' },
    { kind: 'Массив',        title: 'map',               note: 'Создать новый массив, преобразовав каждый элемент' },
    { kind: 'Массив',        title: 'filter',            note: 'Оставить только те элементы, что подошли по условию' },
    { kind: 'Массив',        title: 'find',              note: 'Найти первый подходящий элемент' },
    { kind: 'Массив',        title: 'reduce',            note: 'Свернуть массив в одно значение' },
    { kind: 'Массив',        title: 'push / pop',        note: 'Добавить в конец массива или забрать с конца' },
    { kind: 'Массив',        title: 'slice',             note: 'Скопировать часть массива, не меняя исходный' },
    { kind: 'Массив',        title: 'sort',              note: 'Отсортировать массив на месте' },
    { kind: 'Массив',        title: 'includes',          note: 'Проверить, есть ли значение в массиве' },
    { kind: 'Строка',        title: 'toLowerCase',       note: 'Привести строку к нижнему регистру' },
    { kind: 'Строка',        title: 'trim',              note: 'Убрать пробелы по краям строки' },
    { kind: 'Строка',        title: 'split',             note: 'Разбить строку на массив по разделителю' },
    { kind: 'Строка',        title: 'replace',           note: 'Заменить часть строки на другую' },
    { kind: 'Строка',        title: 'template literals', note: 'Строки в обратных кавычках со вставками ${…}' },
    { kind: 'Объект',        title: 'Object.keys',       note: 'Получить массив имён свойств объекта' },
    { kind: 'Объект',        title: 'JSON.stringify',    note: 'Превратить объект в строку' },
    { kind: 'Объект',        title: 'JSON.parse',        note: 'Разобрать строку обратно в объект' },
    { kind: 'DOM',          title: 'querySelector',     note: 'Найти элемент на странице по CSS-селектору' },
    { kind: 'DOM',          title: 'addEventListener',   note: 'Подписаться на событие элемента' },
    { kind: 'DOM',          title: 'textContent',        note: 'Прочитать или заменить текст внутри элемента' },
    { kind: 'DOM',          title: 'classList',          note: 'Добавить, убрать или переключить CSS-класс' },
    { kind: 'DOM',          title: 'createElement',      note: 'Создать новый элемент, чтобы вставить на страницу' },
    { kind: 'Хранилище',     title: 'localStorage',      note: 'Данные, которые остаются после закрытия вкладки' },
    { kind: 'Хранилище',     title: 'sessionStorage',    note: 'Данные, живущие до конца сессии вкладки' },
    { kind: 'Функция',       title: 'стрелочная функция', note: 'Короткая запись: (a) => a * 2' },
    { kind: 'Функция',       title: 'замыкание',         note: 'Функция помнит переменные, среди которых родилась' },
    { kind: 'Число',         title: 'Math.random',       note: 'Случайное число от 0 до 1' },
    { kind: 'Число',         title: 'parseInt',          note: 'Вытащить целое число из строки' }
  ];

  /* ── Элементы страницы ──────────────────────────────────────── */

  var elInput   = document.getElementById('search-input');
  var elResults = document.getElementById('results');
  var elStatus  = document.getElementById('status');
  var elKeys    = document.getElementById('key-count');
  var elReqs    = document.getElementById('req-count');
  var elSaved   = document.getElementById('saved');
  var elLog     = document.getElementById('log');
  var elReset   = document.getElementById('reset');
  var canvas    = document.getElementById('timeline');
  var ctx       = canvas.getContext('2d');

  var keystrokes = 0;
  var requests   = 0;
  var events     = [];          // { t, type: 'key' | 'req' }
  var lastAnswered = '';        // для подсветки совпадений
  var WINDOW_MS  = 12000;

  /* ── Счётчики ───────────────────────────────────────────────── */

  function updateStats() {
    elKeys.textContent = keystrokes;
    elReqs.textContent = requests;

    if (keystrokes === 0) {
      elSaved.textContent = '—';
    } else {
      var saved = Math.max(0, keystrokes - requests);
      elSaved.textContent = Math.round((saved / keystrokes) * 100) + '%';
    }
  }

  /* ── Журнал ─────────────────────────────────────────────────── */

  function log(text, cssClass) {
    var empty = elLog.querySelector('.log__empty');
    if (empty) { empty.remove(); }

    var li = document.createElement('li');
    li.className = cssClass || '';
    li.textContent = text;
    elLog.prepend(li);

    while (elLog.children.length > 60) {
      elLog.lastElementChild.remove();
    }
  }

  /* ── Имитация сервера ───────────────────────────────────────── */

  window.searchOnServer = function (query, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('searchOnServer: вторым аргументом нужен callback — функция БЕЗ скобок при передаче');
    }

    var text  = String(query == null ? '' : query);
    var delay = 300 + Math.round(Math.random() * 400);

    requests++;
    events.push({ t: performance.now(), type: 'req' });
    updateStats();
    log('→ запрос «' + text + '» · ответ через ' + delay + ' мс', 'log__req');

    setTimeout(function () {
      var q = text.trim().toLowerCase();
      var found = [];

      if (q !== '') {
        found = DATA.filter(function (item) {
          return (item.title + ' ' + item.note + ' ' + item.kind).toLowerCase().indexOf(q) !== -1;
        });
      }

      lastAnswered = q;
      log('← ответ «' + text + '» · найдено: ' + found.length, 'log__res');
      callback(found);
    }, delay);
  };

  /* ── Вывод на страницу ──────────────────────────────────────── */

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function highlight(str) {
    var safe = escapeHtml(str);
    if (!lastAnswered) { return safe; }

    var at = safe.toLowerCase().indexOf(lastAnswered);
    if (at === -1) { return safe; }

    return safe.slice(0, at) +
           '<mark>' + safe.slice(at, at + lastAnswered.length) + '</mark>' +
           safe.slice(at + lastAnswered.length);
  }

  window.ui = {
    renderResults: function (results) {
      if (!Array.isArray(results)) {
        throw new TypeError('ui.renderResults ждёт массив — тот, что стенд передал в ваш callback');
      }

      elResults.innerHTML = '';

      results.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'result';
        li.innerHTML =
          '<span class="result__kind">' + escapeHtml(item.kind) + '</span>' +
          '<h3 class="result__title">' + highlight(item.title) + '</h3>' +
          '<p class="result__note">' + highlight(item.note) + '</p>';
        elResults.append(li);
      });
    },

    clearResults: function () {
      elResults.innerHTML = '';
    },

    showStatus: function (text) {
      elStatus.textContent = text == null ? '' : String(text);
    }
  };

  /* Стенд сам сообщает в журнал о пропущенных запросах — вызывать не нужно */
  window.labNote = function (text) { log('· ' + text, 'log__skip'); };

  /* ── Счёт нажатий ───────────────────────────────────────────── */

  elInput.addEventListener('input', function () {
    keystrokes++;
    events.push({ t: performance.now(), type: 'key' });
    updateStats();
  });

  /* ── Сброс ──────────────────────────────────────────────────── */

  elReset.addEventListener('click', function () {
    keystrokes = 0;
    requests = 0;
    events.length = 0;
    updateStats();
    elLog.innerHTML = '<li class="log__empty">Начните печатать в поле поиска.</li>';
    elInput.value = '';
    elInput.focus();
    ui.clearResults();
    ui.showStatus('');
  });

  /* ── Лента событий ──────────────────────────────────────────── */

  function resizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || 800;
    var h = 52;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas);

  function draw() {
    var w = canvas.clientWidth || 800;
    var h = 52;
    var now = performance.now();

    ctx.clearRect(0, 0, w, h);

    /* секундная сетка */
    ctx.strokeStyle = '#E1E6EA';
    ctx.lineWidth = 1;
    for (var s = 0; s <= 12; s++) {
      var gx = Math.round(w - (s * 1000 / WINDOW_MS) * w) + 0.5;
      ctx.beginPath();
      ctx.moveTo(gx, 4);
      ctx.lineTo(gx, h - 4);
      ctx.stroke();
    }

    /* базовые линии дорожек */
    ctx.strokeStyle = '#CFD6DC';
    [24.5, 47.5].forEach(function (y) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    });

    /* события */
    for (var i = 0; i < events.length; i++) {
      var age = now - events[i].t;
      if (age > WINDOW_MS) { continue; }

      var x = w - (age / WINDOW_MS) * w;

      if (events[i].type === 'key') {
        ctx.fillStyle = '#2F6BA8';
        ctx.fillRect(Math.round(x), 11, 2, 13);
      } else {
        ctx.fillStyle = '#A81138';
        ctx.fillRect(Math.round(x) - 4, 33, 9, 14);
      }
    }

    /* подрезаем старое, чтобы массив не рос бесконечно */
    if (events.length > 400) {
      events = events.filter(function (e) { return now - e.t <= WINDOW_MS; });
    }

    requestAnimationFrame(draw);
  }

  resizeCanvas();
  updateStats();
  requestAnimationFrame(draw);
  elInput.focus();
})();