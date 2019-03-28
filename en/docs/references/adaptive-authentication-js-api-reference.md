# Adaptive Authentication JS API Reference

With adaptive authentication, it is possible to configure dynamic
sequences based on runtime parameters such as the user’s IP address,
user role, etc. WSO2 Identity Server allows you to define a dynamic
authentication sequence using authentication scripts written in
JavaScript.

For more information on adaptive authentication, see [Adaptive
Authentication](tutorials/adaptive-authentication-overview.md)

The following sections present the core API reference for the
JavaScript-based conditional authentication functions and fields.

!!! tip
    
    As the authentication script is designed as a loosely typed, functional
    language similar to JavaScript, common knowledge on JavaScript may help
    you to compose effective authentication scripts.

### Core functions

##### onLoginRequest(context)

This function is called when the initial authentication request is
received by the framework. It includes the following parameters.

| Parameter | Description                                                                           |
|-----------|---------------------------------------------------------------------------------------|
| context   | The authentication context, which contains the context information about the request. |

##### executeStep(stepId, options, eventCallbacks)

This function is called to execute an authentication step.
Authentication steps need to be configured prior to using this function.
This method accepts an object as a parameter and should include the
following.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>stepId</td>
<td>The step number (mandatory)</td>
</tr>
<tr class="even">
<td>options</td>
<td>An optional map that can configure step execution. Authentication option filtering is supported.<br />
For more information, see <a href="#AdaptiveAuthenticationJSAPIReference-Authenticationstepf">authentication step filtering</a> .</td>
</tr>
<tr class="odd">
<td>eventCallbacks</td>
<td>The object that contains the callback functions that are to be called based on the result of the step execution.<br />
Supported results are “ <code>             onSuccess            </code> ” and “ <code>             onFail            </code> ”, which can have their own optional callbacks as anonymous functions (optional).</td>
</tr>
</tbody>
</table>

The API can be called in either of the following ways:

-   With only the `           stepId          ` . Example:

    ``` java
    executeStep(1)
    ```

-   With only the `           stepId          ` and
    `           eventCallbacks          ` . Example:

    ``` java
        executeStep(1, {
            onSuccess: function(context) {
                //Do something on success
            }
        });
    ```

-   With the `           stepId          ` ,
    `           options          ` , and an empty
    `           eventCallbacks          ` array. Example:

    ``` java
        executeStep(1,{
            authenticationOptions:[{
                authenticator: 'totp'
            }]},
        });
    ```

      
    !!! note
    
        The API cannot be called with only the `           stepId          `
        and `           options          ` .
    

**  
Authentication step filtering**

Filters out some of the authentication options of a step based on some
condition. This can be achieved by specifying an array named ‘
`         authenticationOptions        ` ’ to the
`         options        ` map. Each array item will require an '
**`          idp'         `** for federated IdPs or an '
**`          authenticator'         `** for local authenticators.

**Example code**

``` java
executeStep(1,{
  authenticationOptions:[{authenticator:'basic'},{idp:'google'}]
   } ,{
       onSuccess: function (context) {
           // Do something on success
};
```

### Utility functions

The implementation of utility functions can be found in the [WSO2
extensions code
repository](https://github.com/wso2-extensions/identity-conditional-auth-functions)
.

##### hasRole(user, role)

This function returns true if the specified ‘
**`          user         `** ’ belongs to the specified ‘
**`          role         `** ', and returns false if the user does
not. It includes the following parameters.

| Parameter | Description                                  |
|-----------|----------------------------------------------|
| user      | A user object representing the user details. |
| role      | A string representing the role name.         |

**Example code**

``` java
var user = context.steps[1].subject;
var isAdmin = hasRole(user, 'admin');
Log.info('--------------- Has Admin ' + isAdmin);
if (isAdmin) {
    executeStep(2);
}
```

##### assignUserRoles(user, assigningRoles)

This function assigns each of the roles specified in the ‘
`                   assigningRoles                 ` ’ parameter to the
specified ‘ `                   user                 ` ’ object. It
returns true if all the roles are successfully assigned and returns
false if not.  It includes the following parameters.

| Parameter      | Description                                                                                  |
|----------------|----------------------------------------------------------------------------------------------|
| user           | An object representing the user details.                                                     |
| assigningRoles | A list of strings containing roles that are to be assigned where each string is a role name. |

``` java
executeStep(1, {
    onSuccess: function (context) {
        // Extracting authenticated subject from the first step.
        let user = context.currentKnownSubject;
        assignUserRoles(user, ['exampleRole1', 'exampleRole2']);
    }
});
```

##### removeUserRoles(user, removingRoles)

This function r emoves each of the roles specified in the ‘
`                   removingRoles                 ` ’ parameter to the
given ‘ `                   user                 ` ’ object. It returns
true if all the roles are successfully removed and returns false if
not. It includes the following parameters.

| Parameter     | Description                                                                                      |
|---------------|--------------------------------------------------------------------------------------------------|
| user          | An object representing the user details.                                                         |
| removingRoles | A list of strings that containing roles that are to be removed where each string is a role name. |

``` java
executeStep(1, {
    onSuccess: function (context) {
        // Extracting authenticated subject from the first step.
        let user = context.currentKnownSubject;
        removeUserRoles(user, ['exampleRole1', 'exampleRole2']);
    }
});
```

  

##### sendEmail(user, templateId, placeholderParameters)

This function sends an email to the specified user. It includes the
following parameters.

| Parameter             | Description                                                                                            |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| user                  | An object representing the user details.                                                               |
| templateId            | Identifier of the email template. The email template specifies the body of the email that is sent out. |
| placeholderParameters | Used to replace any placeholders in the template.                                                      |

**Example code**

``` java
var user = context.steps[1].subject;
var firstName = user.localClaims['http://wso2.org/claims/givenname'];
sendEmail(user, 'myTemplate', {'firstName':firstName});
```

##### sendError(url,parameters)

This function redirects the user to an error page. It includes the
following parameters.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>url</td>
<td>The URL of the error page that the user is redirected to. If the value is null, the user is redirected by default to the ' <strong>retry.do'</strong> error page.<br />
Note that any relative URL is assumed as the relative to host’s root.</td>
</tr>
<tr class="even">
<td>parameters</td>
<td>Key value map passed as parameters. These are converted to query parameters in the URL.</td>
</tr>
</tbody>
</table>

**Example code**

``` java
var user = context.steps[1].subject;
var isAdmin = hasRole(user, 'admin');
if (!isAdmin) {
    sendError('http://www.example.com/error',{'errorcode':'000403','errorMsg':'You are not allowed to login to this app.'});
}
```

!!! tip
    
    **Tip** : When passing error messages to the error page, it is
    recommended to use the i18n key so that it can be internationalized
    easily at the page.
    

##### setCookie(response, name, value, properties)

This functions sets a new cookie. It includes the following parameters.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>name</td>
<td>Name of the cookie.</td>
</tr>
<tr class="even">
<td>value</td>
<td>Value of the cookie.</td>
</tr>
<tr class="odd">
<td>properties</td>
<td><p>A map that may contain optional attributes of the cookie with two other custom attributes ‘ <code>                             encrypt                           </code> ’ and ‘ <code>                             sign                           </code> ’.</p>
<ul>
<li>The default value of ' <code>                               sign                             </code> ' is false. If it is set to true, the value will be signed.</li>
<li>The default value of ' <code>                               encrypt                             </code> ' is false. If it is set to true, value will be encrypted.</li>
</ul></td>
</tr>
</tbody>
</table>

!!! tip
    
    The size of the value has to be less than the RSA key pair length if '
    `                   encrypt                 ` ' is enabled (set to
    true).
    

``` java
setCookie(context.response, "name", "test", {"max-age" : 4000,
                                            "path" : "/",
                                            "domain" : "localhost",
                                            "httpOnly" : true,
                                            "secure" : true,
                                            "version" : 1,
                                            "comment" : "some comments",
                                            "encrypt" : true,
                                            "sign" : true})
```

##### getCookieValue(request, name, properties)

This function gets the plain-text cookie value for the cookie ‘
`                   name                 ` ’ if present.  It includes
the following parameters.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>name</td>
<td>Name of the cookie.</td>
</tr>
<tr class="even">
<td>value</td>
<td>Value of the cookie.</td>
</tr>
<tr class="odd">
<td>properties</td>
<td><p>A map that may contain optional attributes of the cookie ‘ <code>                             de                           </code> <code>                             crypt                           </code> <strong>validateSignature</strong></p>
<ul>
<li>The default value of ' <code>                               decrypt                             </code> ' is false.  If it is set to true, the value will be decrypted.</li>
<li>The default value of ' <code>                               validateSignature                             </code> ' is false.  If it is set to true, the signature will be validated before returning a response.</li>
</ul></td>
</tr>
</tbody>
</table>

``` java
getCookieValue(context.request,"name", {"decrypt" : true,"validateSignature" : true })
```

##### callAnalytics( metadata, payloadData, eventHandlers )

This function calls the analytics engine (i.e., WSO2 Stream Processor)
to get a decision. It includes the following parameters.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>metadata</td>
<td><p>A JSON object that contain the following attributes:</p>
<ul>
<li><p><code>                 Application:                </code> Siddhi application name (mandatory)</p></li>
<li><p><code>                 InputStream:                </code> Input stream name (mandatory)</p></li>
</ul></td>
</tr>
<tr class="even">
<td>payloadData</td>
<td>The data that needs to be sent to the analytics engine.</td>
</tr>
<tr class="odd">
<td>eventHandlers</td>
<td>The callback event handlers.</td>
</tr>
</tbody>
</table>

##### publishToAnalytics( metadata, payloadData )

This function publishes data to the analytics engine (WSO2 Stream
Processor). It includes the following parameters.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>metadata</td>
<td><p>A JSON object that contain the following attributes:</p>
<ul>
<li><p><code>                 Application:                </code> Siddhi application name (mandatory)</p></li>
<li><p><code>                 InputStream:                </code> Input stream name (mandatory)</p></li>
</ul></td>
</tr>
<tr class="even">
<td>payloadData</td>
<td>The data that needs to be sent to the analytics engine.</td>
</tr>
</tbody>
</table>

##### prompt(templateId, data, eventHandlers)

This function prompts for user input. It includes the following
parameters.

| Parameter     | Description                                           |
|---------------|-------------------------------------------------------|
| templateId    | Identifier of the template that needs to be prompted. |
| data          | The data to send to the prompt.                       |
| eventHandlers | The callback event handlers.                          |

``` java
function onLoginRequest(context) {
   executeStep(1, {
       onSuccess: function (context) {
           var username = context.steps[1].subject.username;
           prompt("genericForm", {"username":username, "inputs":[{"id":fname,"label":"First Name"},{"id":lname,"label":"Last Name"}]}, {
             onSuccess : function(context) {
                var fname = context.request.params.fname[0];
                var lname = context.request.params.lname[0];
                Log.info(fname);
                Log.info(lname);
             }
           });
       }
   });
}
```

### Object Reference

##### context Object

Contains the authentication context information. The information can be
accessed as follows.

-   `           context.steps[<n>]          ` :  Access the
    authentication step information, where &lt;n&gt; is the step number
    (1-based). See [step
    Object](#AdaptiveAuthenticationJSAPIReference-stepObject) for more
    information.

    !!! note
    
        **Note** : The step number is the one configured at the step
        configuration, not the actual order in which they get executed.
    

-   `          context.request         ` :  Access the HTTP
    authentication request information. See [request
    Object](#AdaptiveAuthenticationJSAPIReference-requestObject) for
    more information.
-   `          context.response         ` :  Access the HTTP response
    which will be sent back to the client. See [response
    Object](#AdaptiveAuthenticationJSAPIReference-responseObject) for
    more information.
-   `          context.serviceProviderName         ` :  Get the
    application name.

##### step Object

Contains the authentication step information. May be null or invalid
step number.

-   `          step.subject         ` :  Contains the authenticated
    user’s information from this step. May be null if the step is not
    yet executed. See [user
    Object](#AdaptiveAuthenticationJSAPIReference-userObject) for more
    information.
-   `          step.idp         ` :  Gives the Idp name which was used
    to authenticate this user.

##### user Object

-   `          user.username         ` : The user’s username.
-   `          user.tenantDomain         ` : The user’s tenant domain
    (only for local users; federated users will have this as
    `          carbon.super         ` ).
-   `          user.userStoreDomain         ` : The user’s user store
    domain (only for local users).
-   `          user.roles         ` : List of user’s roles.
-   `          user.localClaims[“<local_claim_url>”]         ` :
    (Read/Write) User’s attribute (claim) value for the given
    “local\_claim\_url”. If the user is a federated user, this will be
    the value of the mapped remote claim from the IdP.
-   `          user.remoteClaims[“<remote_claim_url”]         ` :
    (Read/Write) User’s attribute (claim) as returned by IdP for the
    given “remote\_claim\_url”. Applicable only for federated users.

##### request Object

-   `          request.headers[“<header_name>”]         ` : Request’s
    header value for the given header name by &lt;header\_name&gt;
-   `          request.params[“<param_name>”]         ` : Request’s
    parameter value for the given parameter name by
    &lt;parameter\_name&gt;
-   `          request.cookies[“<cookie_name”]         ` : Request’s
    cookie value for the given cookie name by &lt;cookie\_name&gt;
-   `          request.ip         ` : The client IP address of the user
    who initiated the request. If there are any load balancers (eg.
    Nginx) with connection termination, the ip is retrieved from the
    headers set by the load balancer.

##### response Object

-   `          request.headers[“<header_name>”]         ` : (Write)
    Response header value for the given header name by
    &lt;header\_name&gt;
