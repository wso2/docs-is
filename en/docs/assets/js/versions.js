/*!
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var request = new XMLHttpRequest();

request.open('GET', window.location.origin + '/assets/versions.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {

      var data = JSON.parse(request.responseText);
      var previousVersions = [];
      
      Object.keys(data.all).forEach(function(key, index){
          if ((key !== data.current) && (key !== data['pre-release'])) {
              var docLinkType = data.all[key].doc.split(':')[0];
              var target = '_self';

              if ((docLinkType == 'https') || (docLinkType == 'http')) {
                  target = '_blank'
              }

              previousVersions.push('<tr>' +
                '<th>' + key + '</th>' +
                    '<td>' +
                        '<a href="' + data.all[key].doc + '" target="' + 
                            target + '">Documentation</a>' +
                    '</td>' +
                    '<td>' +
                        '<a href="' + data.all[key].notes + '" target="' + 
                            target + '">Release Notes</a>' +
                    '</td>' +
                '</tr>');
          }
      });
      
      // Past releases update
      document.getElementById('previous-versions').innerHTML = 
              previousVersions.join(' ');
      
      // Current released version update
      document.getElementById('current-version-number').innerHTML = 
              data.current;
      document.getElementById('current-version-documentation-link')
              .setAttribute('href', data.all[data.current].doc);
      document.getElementById('current-version-release-notes-link')
              .setAttribute('href', data.all[data.current].notes);
      
      // Pre-release version update
      document.getElementById('pre-release-version-number').innerHTML = 
              data['pre-release'];
      document.getElementById('pre-release-version-documentation-link')
          .setAttribute('href', data.all[data['pre-release']].doc);
      
  } else {
      console.error("We reached our target server, but it returned an error");
  }
};

request.onerror = function() {
    console.error("There was a connection error of some sort");
};

request.send();
