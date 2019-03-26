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

var dropdowns = document.getElementsByClassName('md-tabs__dropdown-link');
var dropdownItems = document.getElementsByClassName('mb-tabs__dropdown-item');

function indexInParent(node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i=0; i < children.length; i++) {
         if (children[i]==node) return num;
         if (children[i].nodeType==1) num++;
    }
    return -1;
}

for (var i = 0; i < dropdowns.length; i++) {
    var el = dropdowns[i];
    var openClass = 'open';

    el.onclick = function () {
        if (this.parentElement.classList) {
            this.parentElement.classList.toggle(openClass);
        } else {
            var classes = this.parentElement.className.split(' ');
            var existingIndex = classes.indexOf(openClass);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(openClass);

            this.parentElement.className = classes.join(' ');
        }
    };
};
