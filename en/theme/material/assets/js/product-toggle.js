/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

(function () {
  var toggle = document.querySelector('[data-wso2-product-toggle]');
  if (!toggle) {
    return;
  }

  var targetUrl = toggle.getAttribute('data-target-url');
  if (!targetUrl) {
    return;
  }

  function withTrailingSlash(url) {
    return url.charAt(url.length - 1) === '/' ? url : url + '/';
  }

  var targetBase = withTrailingSlash(targetUrl);
  var MANIFEST_GLOBAL = '__WSO2_DOCS_MANIFEST__';
  var manifestPromise;

  function loadManifest() {
    if (manifestPromise) {
      return manifestPromise;
    }
    // A classic script can load across the two product origins and follow
    // the SaaS redirect without requiring CORS headers on the static host.
    manifestPromise = new Promise(function (resolve) {
      var script = document.createElement('script');
      var settled = false;
      var timeout = window.setTimeout(function () { finish(null); }, 8000);
      function finish(manifest) {
        if (settled) {
          return;
        }
        settled = true;
        window.clearTimeout(timeout);
        script.onload = script.onerror = null;
        script.remove();
        resolve(manifest);
      }
      window[MANIFEST_GLOBAL] = undefined;
      script.onload = function () {
        var manifest = window[MANIFEST_GLOBAL];
        finish(Array.isArray(manifest) ? manifest : null);
      };
      script.onerror = function () { finish(null); };
      script.src = targetBase + 'page-manifest.js';
      script.async = true;
      document.head.appendChild(script);
    }).then(function (manifest) {
      // Let a later click retry a failed preload.
      if (manifest === null) {
        manifestPromise = null;
      }
      return manifest;
    });
    return manifestPromise;
  }

  loadManifest();

  function currentRelativePath() {
    // MkDocs already knows the page's path within this documentation site.
    // It stays the same under /asgardeo/docs/, /identity-platform/docs/,
    // version aliases such as /en/latest/, and local preview mount points.
    // Static templates such as 404 have no documentation page to preserve.
    var pageUrl = toggle.getAttribute('data-page-url') || '';
    return pageUrl === './' ? '' : pageUrl;
  }

  function navigate(attempt) {
    var relPath = currentRelativePath();
    if (!relPath) {
      window.location.href = targetBase;
      return Promise.resolve(true);
    }

    // An unfinished or failed request does not mean the page is absent.
    return loadManifest().then(function (manifest) {
      if (attempt !== switchAttempt) {
        return false;
      }
      if (manifest === null) {
        return false;
      }
      var hasPage = manifest.indexOf(relPath) !== -1;
      var destination = targetBase + (hasPage ? relPath : '');
      // Keep section links on matching pages.
      window.location.href = destination + (hasPage ? window.location.hash : '');
      return true;
    });
  }

  var SWITCH_ANIMATION_DELAY = 220;
  var thumb = toggle.querySelector('.wso2-product-switch-thumb');
  var status = toggle.querySelector('.wso2-product-switch-status');
  var pageChoice = toggle.getAttribute('data-active');
  var switching = false;
  var switchAttempt = 0;
  var switchTimer;

  function setActiveChoice(choice) {
    toggle.setAttribute('data-active', choice);
    toggle.querySelectorAll('[data-choice]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-choice') === choice ? 'true' : 'false');
    });
    updateThumb();
  }

  function resetSwitch() {
    // Back/Forward can restore the DOM and JS heap exactly as they were
    // during navigation. Restore this page's product and discard old work.
    switchAttempt++;
    window.clearTimeout(switchTimer);
    switching = false;
    toggle.removeAttribute('aria-busy');
    if (thumb) {
      thumb.classList.remove('wso2-product-switch-thumb--animate');
    }
    if (status) {
      status.hidden = true;
      status.textContent = '';
    }
    setActiveChoice(pageChoice);
  }

  window.addEventListener('pagehide', resetSwitch);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      resetSwitch();
    }
  });

  // Position the thumb from the active button's actual rendered box rather
  // than assuming a 50/50 split — the two labels ("SaaS" vs "Self-Managed")
  // are different lengths, so a fixed-percentage thumb would either leave
  // a gap or overlap the longer label depending on viewport width.
  function updateThumb() {
    if (!thumb) {
      return;
    }
    var activeChoice = toggle.getAttribute('data-active');
    var activeButton = toggle.querySelector('[data-choice="' + activeChoice + '"]');
    if (!activeButton) {
      return;
    }
    thumb.style.left = activeButton.offsetLeft + 'px';
    thumb.style.width = activeButton.offsetWidth + 'px';
  }

  updateThumb();
  window.addEventListener('resize', updateThumb);

  // Fonts can finish loading after the initial measurement, changing both
  // the active button's width and its offset without a window resize.
  // Observe both options so the thumb also follows responsive layout changes
  // and is measured again when the switch becomes visible after search.
  if (window.ResizeObserver) {
    var optionResizeObserver = new ResizeObserver(updateThumb);
    toggle.querySelectorAll('[data-choice]').forEach(function (button) {
      optionResizeObserver.observe(button);
    });
  }
  if (document.fonts) {
    document.fonts.ready.then(updateThumb);
  }

  toggle.querySelectorAll('[data-choice]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (switching || button.getAttribute('aria-pressed') === 'true') {
        return;
      }
      var choice = button.getAttribute('data-choice');
      var previousChoice = toggle.getAttribute('data-active');
      var attempt = ++switchAttempt;
      switching = true;
      toggle.setAttribute('aria-busy', 'true');
      if (status) {
        status.hidden = true;
        status.textContent = '';
      }

      // Let the thumb visibly slide to its new position before the page
      // navigates away, so the switch reads as a switch rather than a jump-cut.
      // The animation class is only added here, right before an actual click,
      // so ordinary page loads position the thumb instantly with no transition.
      if (thumb) {
        thumb.classList.add('wso2-product-switch-thumb--animate');
      }
      setActiveChoice(choice);

      switchTimer = window.setTimeout(function () {
        navigate(attempt).then(function (navigated) {
          if (!navigated && attempt === switchAttempt) {
            switching = false;
            toggle.removeAttribute('aria-busy');
            setActiveChoice(previousChoice);
            if (status) {
              status.hidden = false;
              status.textContent = 'Unable to switch documentation. Please try again.';
            }
          }
        });
      }, SWITCH_ANIMATION_DELAY);
    });
  });
})();
