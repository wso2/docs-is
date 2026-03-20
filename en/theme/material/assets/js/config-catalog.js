(function () {
  'use strict';

  // Sync .sample-open class on the section so the h2 label can reflect checked state
  function initSampleToggles() {
    document.querySelectorAll('.toggle-checkbox').forEach(function (cb) {
      var section = cb.closest('.mb-config-section');
      if (!section) return;
      cb.addEventListener('change', function () {
        section.classList.toggle('sample-open', cb.checked);
      });
    });
  }

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
        // Whole section matches — show all params, no individual highlighting
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
          p.classList.remove('mb-search-hidden');
          p.classList.add('mb-search-highlight');
          anyVisible = true;
        } else {
          p.classList.add('mb-search-hidden');
          p.classList.remove('mb-search-highlight');
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
    var select      = document.getElementById('mbTaskSelect');
    var clearBtn    = document.getElementById('mbTaskClear');
    var searchInput = document.getElementById('mbConfigSearch');
    if (!select) return;

    initSampleToggles();

    function refresh() {
      applyFilters(select.value, searchInput ? searchInput.value : '');
    }

    select.addEventListener('change', refresh);

    if (searchInput) {
      searchInput.addEventListener('input', refresh);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        select.value = '';
        if (searchInput) searchInput.value = '';
        applyFilters('', '');
      });
    }
  });
})();
