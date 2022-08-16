# SCIM2 Bulk Operations
 
Follow the topics given below to understand how **Bulk** operations can be used when you manage resources in the [SCIM2 API](scim2-rest-apis.md).
 
The SCIM2 API allows you to send multiple resource operations in a single request. That is, you can add new records (POST data), replace an existing record (PUT data), update elements of an existing record (PATCH data), and delete records (DELETE data) in bulk. These bulk operations are supported for managing users and groups with the SCIM API in WSO2 Identity Server.
 
## Manage users in bulk
 
You can use the **bulk** operations to add, remove, update, and replace users in bulk.

!!! Info
    The examples given below show individual resource operations (POST, PATCH, PUT, or DELETE) handled in a single request. However, note that a single request can execute a combination of operation types simultaneously.
 
### Add users
 
Given below is an example request payload to manage users in bulk. This request includes an array of operations that adds multiple new users.
 
```json
{
   "failOnErrors":1,
   "schemas": ["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
   "Operations": [
       {
           "method": "POST",
           "path": "/Users",
           "bulkId": "qwerty",
           "data": {
               "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
               "userName": "Kim",
               "password":"kim123",
               "name": {
                   "givenName": "Kim",
                   "familyName": "Berry"
               }
           }
       },
       {
           "method": "POST",
           "path": "/Users",
           "bulkId": "ytrewq",
           "data": {
               "schemas": [
                   "urn:ietf:params:scim:schemas:core:2.0:User",
                   "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
                   ],
               "name": {
                   "givenName": "Smith",
                   "familyName": "Berry"
               },
               "userName": "smith",
               "password": "smith123",
               "emails": [
                   {
                       "type": "home",
                       "value": "smith@gmail.com",
                       "primary": true
                   },
                   {
                       "type": "work",
                       "value": "smith@wso2.com"
                   }
               ],
               "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                   "employeeNumber": "1234A",
                   "manager": {
                       "value": "Taylor"
                   }
               }
           }
       }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To add multiple new users, add an array of POST operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br>
               <b>Possible value</b>:<code>POST</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify that a new user is being added.</br>
               <b>Possible value</b>:<code>/Users</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Required</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the details of the new user that should be added. The parameters that can be used for this “data” object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>
               Specify the list of SCIM2 user schemas to which the new user should be linked.</br>
               <b>Possible values:</b>
               <ul>
                   <li><code>urn:ietf:params:scim:schemas:core:2.0:User</code></li>
                   <li><code>urn:ietf:params:scim:schemas:enterprise:2.0:User</code></li>
                   <li><code>urn:scim:wso2:schema</code></li>
               </ul>  
           </td>
       </tr>
       <tr>
           <td><code>{attribute_name}</code></td>
           <td>Required</td>
           <td>
               The name of the attribute that will be updated.</br>
               <b>Possible values:</b> User attributes as per the SCIM protocol.
           </td>
       </tr>
    </table>
 
### Update users
 
Given below is an example request payload to update users in bulk. This request includes an array of operations that updates multiple details of multiple users.
 
```json
{
   "failOnErrors":1,
   "schemas":[
      "urn:ietf:params:scim:api:messages:2.0:BulkRequest"
   ],
   "Operations":[
      {
         "method":"PATCH",
         "path":"/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5",
         "data":{
            "Operations":[
               {
                  "op":"replace",
                  "path":"name",
                  "value":{
                     "givenName":"john",
                     "familyName":"Anderson"
                  }
               },
               {
                  "op":"add",
                  "path":"nickName",
                  "value":"shaggy"
               }
            ]
         }
      },
      {
         "method":"PATCH",
         "path":"/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487",
         "data":{
            "Operations":[
               {
                  "op":"remove",
                  "path":"emails[type eq home]"
               }
            ]
         }
      }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br></br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To update multiple users, add an array of PATCH operations. You can include any number of operations in one bulk request.</br></br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br></br>
               <b>Possible Value</b>:<code>PATCH</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required if <code>op</code> is <code>remove</code>.</br>
           Optional if <code>op</code> is <code>add</code> or <code>replace</code>.
           </td>
           <td>
               Add this path to specify the new user that is being updated.</br></br>
               <b>Possible Value</b>:<code>/Users/{user_id}</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Optional</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible Value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the details of the new user that should be updated. The parameters that can be used for this “data” object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>op</code></td>
           <td>Required</td>
           <td>
               The operation that should be applied to the existing user’s data.</br>
               <b>Possible Values:</b>
               <ul>
                   <li><code>add</code></li>
                   <li><code>replace</code></li>
                   <li><code>remove</code></li>
               </ul>
               See <a href="/develop/scim2-patch-operations/#patch-users">SCIM2 Patch Operations</a> for details on how to define patch operations. 
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required if <code>op</code> is <code>remove</code>.</br>
                Optional if <code>op</code> is <code>add</code> or <code>replace</code>
            </td>
           <td>
               The path to the resource (user attribute) that should be updated.</br>
               For example, if the name of the user is to be updated, the path should be “name”.
           </td>
       </tr>
       <tr>
           <td><code>value</code></td>
           <td>Required if <code>op</code> is <code>remove</code>.</br>
                Optional if <code>op</code> is <code>add</code> or <code>replace</code>.
           </td>
           <td>
               The value of the parameter specified by the <code>path</code>.
               <p>For example, if the path is “name”, the value should be the actual name.</p>
               See <a href="/develop/scim2-patch-operations/#patch-users">SCIM2 Patch Operations</a> for details on how to define values for the patch operations.
           </td>
       </tr>
    </table>
 
### Replace users
 
Given below is an example request payload to replace existing users in bulk. This request includes an array of operations that replace multiple users.
 
```json
{
   "failOnErrors":1,
   "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
   "Operations":[
       {
           "method": "PUT",
           "path": "/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5",
           "bulkId": "qwerty",
           "data":{
               "schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],
               "userName": "Kim",
               "name": {
                   "givenName": "John",
                   "familyName": "Berry"
               },
               "emails": [
                   {
                       "type": "home",
                       "value": "john@gmail.com"
                   }
               ]
           }
       },
       {
           "method": "PUT",
           "path": "/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487",
           "bulkId":"ytrewq",
           "data":{
               "schemas":[
               "urn:ietf:params:scim:schemas:core:2.0:User",
               "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
               ],
               "userName":"smith",
               "name": {
                   "givenName": "Smith",
                   "familyName": "Berry"
               },
               "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{
                   "employeeNumber": "12345"
               }
           }
       }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To replace multiple users, add an array of PUT operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br>
               <b>Possible value</b>:<code>PUT</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify the existing user that should be replaced by the new user information that is added.</br>
               <b>Possible value</b>:<code>/Users/{user_id}</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Optional</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the new user details that should be used to replace the existing user specified in the path. The parameters that can be used for this “data" object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>
               Specify the list of SCIM2 user schemas where the new user details should replace the existing user specified by the path.</br>
               <b>Possible values:</b>
               <ul>
                   <li><code>urn:ietf:params:scim:schemas:core:2.0:User</code></li>
                   <li><code>urn:ietf:params:scim:schemas:enterprise:2.0:User</code></li>
                   <li><code>urn:scim:wso2:schema</code></li>
               </ul>  
           </td>
       </tr>
       <tr>
           <td><code>{attribute_name}</code></td>
           <td>Required</td>
           <td>
               The name of the attribute that will be replaced.</br>
               <b>Possible values:</b> User attributes as per the SCIM protocol.
           </td>
       </tr>
    </table>
 
### Delete users
 
Given below is an example request payload to delete existing users in bulk. This request includes an array of operations that delete multiple users.
 
```json
{
   "failOnErrors":1,
   "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
   "Operations":[
       {
           "method": "DELETE",
           "path": "/Users/e67906fb-308f-4b15-89bd-0ab6e3d996e5" 
       },
       {
           "method": "DELETE",
           "path": "/Users/b1781d25-bde5-460a-a58a-8fe8dbfd8487"
       }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of  operations. To delete multiple users, add an array of DELETE operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br>
               <b>Possible value</b>:<code>DELETE</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify the existing user that should be deleted.</br>
               <b>Possible value</b>:<code>/Users/{user_id}</code>.
           </td>
       </tr>
    </table>
 
## Manage user groups in bulk
 
You can use **bulk** operations to add, update, replace, and delete user groups in bulk.

!!! Info
    The examples given below show individual resource operations (POST, PATCH, PUT, or DELETE) handled in a single request. However, note that a single request can execute a combination of operation types simultaneously.
 
### Add user groups
 
Given below is an example request payload to add user groups in bulk. This request includes an array of operations that adds multiple new user groups.
 
```json
{
   "schemas": ["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
   "Operations": [
      {
           "method": "POST",
           "path": "/Groups",
           "bulkId": "ytrewq",
           "data": {
               "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
               "displayName": "TourGuides",
               "members": [
                   {
                     "type": "User",
                     "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                   }
               ]
           }
       },
              {
           "method": "POST",
           "path": "/Groups",
           "bulkId": "ytrewq",
           "data": {
               "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
               "displayName": "SLTourGuides",
               "members": [
                   {
                     "type": "User",
                     "value": "3633c988-69bf-48fc-978a-83dfde12695f"
                   },
                   {
                     "type": "User",
                     "value": "40390b19-54c9-4e77-b223-fe31d55e59e0"
                   }
               ]
           }
       }
    ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br></br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To add multiple new user groups, add an array of POST operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br></br>
               <b>Possible Value</b>:<code>POST</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify that a new user group that should be added.</br>
               <b>Possible Value</b>:<code>/Group</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Optional</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible Value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the details of the new user group that should be added. The parameters that can be used for this “data” object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>displayName</code></td>
           <td>Required</td>
           <td>
               The display name of the user group.</br>
           </td>
       </tr>
       <tr>
           <td><code>members</code></td>
           <td>Optional</td>
           <td>
               An array of member users.</br>
           </td>
       </tr>
       <tr>
           <td><code>display</code></td>
           <td>Required if <code>members</code> is used.</td>
           <td>
               The display name of a user assigned to the group.</br>
               <b>Possible values:</b> The username.
           </td>
       </tr>
       <tr>
           <td><code>value</code></td>
           <td>Required if <code>members</code> is used.</td>
           <td>
               The ID of the user.</br>
               <b>Possible values:</b> The user ID.
           </td>
       </tr>
    </table>
 
### Update groups
 
Given below is an example request payload to update user groups in bulk. This request includes an array of operations that update multiple details in multiple user groups.
 
```json
{
   "schemas":[
      "urn:ietf:params:scim:api:messages:2.0:BulkRequest"
   ],
   "Operations":[
      {
         "method":"PATCH",
         "path":"/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0",
         "data":{
            "Operations":[
               {
                  "op":"replace",
                  "path":"members",
                  "value":[
                     {
                        "display":"smith",
                        "value":"ba1db5ff-8062-415b-bc78-5f79738d00ea"
                     }
                  ]
               }
            ]
         }
      },
      {
         "method":"PATCH",
         "path":"/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42",
         "data":{
            "Operations":[
               {
                  "op":"add",
                  "path":"members",
                  "value":[
                     {
                        "display":"smith",
                        "value":"ba1db5ff-8062-415b-bc78-5f79738d00ea"
                     }
                  ]
               },
               {
                  "op":"remove",
                  "path":"members[value eq \"3633c988-69bf-48fc-978a-83dfde12695f\"]"
               }
            ]
         }
      }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br></br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To update multiple user groups, add an array of PATCH operations. You can include any number of operations in one bulk request.</br></br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br></br>
               <b>Possible Value</b>:<code>PATCH</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify the user group that should be updated.</br>
               <b>Possible Value</b>:<code>/Group/{group_id}</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Optional</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible Value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the details that should be updated for the user group specified in the path. The parameters that can be used for this “data” object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>op</code></td>
           <td>Required</td>
           <td>
               The operation that should be applied to the existing user group.</br>
               <b>Possible values:</b>
               <ul>
                   <li><code>add</code></li>
                   <li><code>replace</code></li>
                   <li><code>remove</code></li>
               </ul> 
               See <a href="/develop/scim2-patch-operations/#patch-user-groups">SCIM2 Patch Operations</a> for details on how to define patch operations.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required if <code>op</code> is <code>remove</code>.</br>
               Optional if <code>op</code> is <code>add</code> or <code>replace</code>.
            </td>
           <td>
               Specify “members” as the path.</br>
               <b>Possible values:</b> <code>members</code>
           </td>
       </tr>
       <tr>
           <td><code>value</code></td>
           <td>Required if <code>op</code> is <code>add</code> or <code>replace</code>.</td>
           <td>
               An array of users that belong to the group.
           </td>
       </tr>
    </table>

-   Data operation value parameters

    <table>
        <tr>
           <td><code>display</code></td>
           <td>Required if <code>path</path> is set to <code>members</code>.</td>
           <td>
               The display name of the user, who is a member.</br>
               <b>Possible values</b>: The username.
           </td>
       </tr>
       <tr>
           <td><code>value</code></td>
           <td>Required if <code>path</path> is set to <code>members</code>.</td>
           <td>
               The user ID of the member user.</br>
               <b>Possible values:</b> The user ID.
           </td>
       </tr>
    </table>
 
### Replace groups
 
Given below is an example request payload to replace existing user groups in bulk. This request includes an array of operations that replace multiple user groups.
 
```json
{
   "failOnErrors":1,
   "schemas":[
      "urn:ietf:params:scim:api:messages:2.0:BulkRequest"
   ],
   "Operations":[
      {
         "method":"PUT",
         "path":"/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0",
         "data":{
            "displayName":"TourGuides",
            "members":[
               {
                  "display":"Alice",
                  "value":"3633c988-69bf-48fc-978a-83dfde12695f"
               }
            ]
         }
      },
      {
         "method":"PUT",
         "path":"/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42",
         "data":{
            "displayName":"SLTourGuides",
            "members":[
               {
                  "display":"Alice",
                  "value":"3633c988-69bf-48fc-978a-83dfde12695f"
               }
            ]
         }
      }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of operations. To replace multiple user groups, add an array of PUT operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br>
               <b>Possible value</b>:<code>PUT</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify the existing user group that should be replaced by the new information that is added.</br>
               <b>Possible value</b>:<code>/Groups/{group_id}</code>.
           </td>
       </tr>
       <tr>
           <td><code>bulkid</code></td>
           <td>Optional</td>
           <td>
               A unique identifier for the bulk operation. The bulkid is required for POST operations.</br></br>
               <b>Possible value</b>: An integer value.
           </td>
       </tr>
       <tr>
           <td><code>data</code></td>
           <td>Required</td>
           <td>
               Specify the new group details that should be used to replace the existing user group specified in the path. The parameters that can be used for this “data" object are explained below.
           </td>
       </tr>
    </table>
 
-   Data parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>displayName</code></td>
           <td>Required</td>
           <td>
               The display name of the user group.</br>
           </td>
       </tr>
       <tr>
           <td><code>members</code></td>
           <td>Required</td>
           <td>
               Array of member users.</br>
           </td>
       </tr>
       <tr>
           <td><code>display</code></td>
           <td>Required</td>
           <td>
               The display name of a user assigned to the group.</br>
               <b>Possible values:</b> The username.
           </td>
       </tr>
       <tr>
           <td><code>value</code></td>
           <td>Required</td>
           <td>
               The ID of the user.</br>
               <b>Possible values:</b> The user ID.
           </td>
       </tr>
    </table>
 
### Delete users
 
Given below is an example request payload to delete existing user groups in bulk. This request includes an array of operations that delete multiple user groups.
 
```json
{
   "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],
   "Operations":[
       {
           "method": "DELETE",
           "path": "/Groups/46887262-2ba1-4cee-b3ef-64549423e0b0" 
       },
       {
           "method": "DELETE",
           "path": "/Groups/18d04a36-0894-4f71-bdc4-2610fcc6ae42"
       }
   ]
}
```
 
The parameters in the request body are explained below.
 
-   Main parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>failOnErrors</code></td>
           <td>Optional</td>
           <td>The number of errors that will be accepted by WSO2 IS before returning the response.</br>
               <b>Possible values</b>: An integer.
           </td>
       </tr>
       <tr>
           <td><code>schemas</code></td>
           <td>Required</td>
           <td>This is the schema that is required for sending bulk requests:</br>
           <code>urn:ietf:params:scim:api:messages:2.0:BulkRequest</code>.
           </td>
       </tr>
       <tr>
           <td><code>operations</code></td>
           <td>Required</td>
           <td>Array of  operations. To delete multiple user groups, add an array of PUT operations. You can include any number of operations in one bulk request.</br>
           The parameters that can be used for the operation are explained below.
           </td>
       </tr>
    </table>
 
-   Operation parameters
 
    <table>
       <tr>
           <th>Parameter</th>
           <th>Required/Optional</th>
           <th>Description</th>
       </tr>
       <tr>
           <td><code>method</code></td>
           <td>Required</td>
           <td>
               The method that should be used in the operation.</br>
               <b>Possible value</b>:<code>DELETE</code>.
           </td>
       </tr>
       <tr>
           <td><code>path</code></td>
           <td>Required</td>
           <td>
               Add this path to specify the existing user group that should be deleted.</br>
               <b>Possible value</b>:<code>/Groups/{group_id}</code>.
           </td>
       </tr>
    </table>