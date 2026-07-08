/* Checkbox progress for the onboarding guide.
 *
 * Docsify renders GitHub-style task lists (- [ ]) as disabled checkboxes.
 * This plugin enables them and persists their state in the browser's
 * localStorage, keyed by page path + position on the page.
 *
 * Limits (documented in README.md):
 *  - Progress is per-browser only. Clearing browser data clears progress.
 *  - Keys are positional: reordering or inserting checkboxes on a page
 *    shifts which saved state applies to which box on that page.
 */
(function () {
  var STORAGE_KEY = 'rtv-onboarding-progress';

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function doneCount() {
    return Object.keys(loadState()).length;
  }

  function updateCounters() {
    var n = doneCount();
    var text = n === 1 ? '1 task done' : n + ' tasks done';
    var els = document.querySelectorAll('.rtv-progress-count');
    for (var i = 0; i < els.length; i++) els[i].textContent = text;
  }

  function plugin(hook, vm) {
    hook.mounted(function () {
      var sidebar = document.querySelector('.sidebar');
      if (sidebar && !sidebar.querySelector('.rtv-progress-footer')) {
        var footer = document.createElement('div');
        footer.className = 'rtv-progress-footer';
        footer.innerHTML = '<span class="rtv-progress-count">0 tasks done</span>';
        sidebar.appendChild(footer);
      }
      updateCounters();
    });

    hook.doneEach(function () {
      var state = loadState();
      var boxes = document.querySelectorAll('.markdown-section li input[type="checkbox"]');
      Array.prototype.forEach.call(boxes, function (box, i) {
        var id = vm.route.path + '#' + i;
        box.disabled = false;
        box.checked = Object.prototype.hasOwnProperty.call(state, id);
        box.addEventListener('change', function () {
          var s = loadState();
          if (box.checked) {
            s[id] = true;
          } else {
            delete s[id];
          }
          saveState(s);
          updateCounters();
        });
      });
      updateCounters();
    });
  }

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin);
})();
