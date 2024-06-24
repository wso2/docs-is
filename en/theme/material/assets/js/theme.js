/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

const dropdown = document.querySelector('.md-header__version-select-dropdown');

(function() {
  function enforceTrailingSlash(url) {
      // Append a trailing slash if the URL doesn't end with one
      if (!url.endsWith('/') && !url.includes('.')) {
          return url + '/';
      }
      return url;
  }

  // Check and redirect if needed on page load
  function checkAndRedirect() {
      var currentUrl = window.location.href;
      var correctUrl = enforceTrailingSlash(currentUrl);
      
      // Redirect only if the current URL is different from the corrected URL
      if (currentUrl !== correctUrl) {
          window.location.replace(correctUrl);
      } else {
          // Ensure correct base URL for relative paths if already on the correct URL
          if (currentUrl.endsWith('/')) {
              var basePath = currentUrl;

              // Update href attributes of CSS files
              var links = document.getElementsByTagName('link');
              for (var i = 0; i < links.length; i++) {
                  var href = links[i].getAttribute('href');
                  if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('/')) {
                      links[i].setAttribute('href', basePath + href);
                  }
              }

              // Update src attributes of scripts
              var scripts = document.getElementsByTagName('script');
              for (var j = 0; j < scripts.length; j++) {
                  var src = scripts[j].getAttribute('src');
                  if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('/')) {
                      scripts[j].setAttribute('src', basePath + src);
                  }
              }
          }
      }
  }

  // Ensure correct URL format on initial load
  checkAndRedirect();

  // Handle back/forward navigation
  window.addEventListener('popstate', function() {
      checkAndRedirect();
  });
})();

// Add a click event listener to the document
document.addEventListener('click', function(event) {
  // Check if the click event target is outside of the dropdown
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('open'); // Hide the dropdown
  }
});

// Add a click event listener to the dropdown link
const dropdownLink = dropdown.querySelector('.dropdown-link');

dropdownLink.addEventListener('click', function(event) {
  event.preventDefault();
  event.stopPropagation(); // Prevent the event from propagating to the document
  dropdown.classList.toggle('open'); // Toggle the "open" class
});


