(function () {
  'use strict';

  function applyFilters(task, query) {
    var q = query.trim().toLowerCase();
    var sections = document.querySelectorAll('.mb-config-section');

    sections.forEach(function (section) {
      // --- Task filter ---
      var taskVisible = true;
      if (task) {
        var sectionTasks = (section.getAttribute('data-tasks') || '').split(' ');
        taskVisible = sectionTasks.indexOf(task) !== -1;
      }

      if (!taskVisible) {
        section.setAttribute('hidden', '');
        section.classList.remove('mb-search-hidden', 'mb-search-section-match');
        section.querySelectorAll('.param').forEach(function (p) {
          p.classList.remove('mb-search-hidden', 'mb-search-highlight');
        });
        return;
      }

      section.removeAttribute('hidden');

      // --- Search filter (only runs on task-visible sections) ---
      var params = section.querySelectorAll('.param');

      if (!q) {
        params.forEach(function (p) {
          p.classList.remove('mb-search-hidden', 'mb-search-highlight');
        });
        section.classList.remove('mb-search-hidden', 'mb-search-section-match');
        return;
      }

      // Strip surrounding brackets so both "server" and "[server]" match
      var qNorm = q.replace(/^\[|\]$/g, '');

      var sectionId    = (section.getAttribute('data-id')    || '').toLowerCase();
      var sectionTitle = (section.getAttribute('data-title') || '').toLowerCase();
      var sectionMatches = sectionId.indexOf(qNorm) !== -1 || sectionTitle.indexOf(qNorm) !== -1;

      if (sectionMatches) {
        section.classList.remove('mb-search-hidden');
        section.classList.add('mb-search-section-match');
        params.forEach(function (p) {
          p.classList.remove('mb-search-hidden', 'mb-search-highlight');
        });
        return;
      }

      section.classList.remove('mb-search-section-match');

      var anyVisible = false;
      params.forEach(function (p) {
        var key = (p.getAttribute('data-key') || '').toLowerCase();
        if (key.indexOf(qNorm) !== -1) {
          p.classList.add('mb-search-highlight');
          p.classList.remove('mb-search-hidden');
          anyVisible = true;
        } else {
          p.classList.remove('mb-search-hidden', 'mb-search-highlight');
        }
      });

      if (anyVisible) {
        section.classList.remove('mb-search-hidden');
      } else {
        section.classList.add('mb-search-hidden');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var wrapper     = document.getElementById('mbTaskSelectWrapper');
    var trigger     = document.getElementById('mbTaskSelectTrigger');
    var valueLabel  = document.getElementById('mbTaskSelectValue');
    var clearBtn    = document.getElementById('mbTaskClear');
    var searchInput = document.getElementById('mbConfigSearch');
    if (!wrapper) return;

    function getCurrentValue() {
      return wrapper.getAttribute('data-value') || '';
    }

    function refresh() {
      applyFilters(getCurrentValue(), searchInput ? searchInput.value : '');
    }

    var menu     = document.getElementById('mbTaskSelectMenu');
    var backdrop = document.getElementById('mbTaskSelectBackdrop');

    function setOpen(open) {
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        menu.classList.add('is-open');
        backdrop.classList.add('active');
      } else {
        menu.classList.remove('is-open');
        backdrop.classList.remove('active');
      }
    }

    /* Toggle open/close */
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(trigger.getAttribute('aria-expanded') !== 'true');
    });

    /* Backdrop closes menu */
    backdrop.addEventListener('click', function () { setOpen(false); });

    /* Option selection */
    menu.addEventListener('click', function (e) {
      var option = e.target.closest('.mb-custom-select__option');
      if (!option) return;

      menu.querySelectorAll('.mb-custom-select__option').forEach(function (o) {
        o.classList.remove('is-selected');
      });
      option.classList.add('is-selected');

      wrapper.setAttribute('data-value', option.getAttribute('data-value'));
      valueLabel.textContent = option.textContent.trim();

      setOpen(false);
      refresh();
    });

    if (searchInput) {
      searchInput.addEventListener('input', refresh);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        var menu = document.getElementById('mbTaskSelectMenu');
        var firstOption = menu ? menu.querySelector('.mb-custom-select__option') : null;
        if (menu) {
          menu.querySelectorAll('.mb-custom-select__option').forEach(function (o) {
            o.classList.remove('is-selected');
          });
        }
        if (firstOption) {
          firstOption.classList.add('is-selected');
          wrapper.setAttribute('data-value', firstOption.getAttribute('data-value'));
          valueLabel.textContent = firstOption.textContent.trim();
        }
        if (searchInput) searchInput.value = '';
        applyFilters('', '');
      });
    }
  });
})();
