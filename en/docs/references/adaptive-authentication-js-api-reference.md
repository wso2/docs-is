# Adaptive Authentication JS API Reference

With adaptive authentication, it is possible to configure dynamic
sequences based on runtime parameters such as the user’s IP address,
user role, etc. WSO2 Identity Server allows you to define a dynamic
authentication sequence using authentication scripts written in
JavaScript.

For more information on adaptive authentication, see [Adaptive Authentication]({{base_path}}/references/concepts/authentication/adaptive-authentication/).

The following sections present the core API reference for the
JavaScript-based conditional authentication functions and fields.

!!! tip
    As the authentication script is designed as a loosely typed, functional
    language similar to JavaScript, common knowledge on JavaScript may help
    you to compose effective authentication scripts.

---

## Core functions

#### onLoginRequest(context)

This function is called when the initial authentication request is
received by the framework. It includes the following parameters.

| Parameter | Description                                                                           |
|-----------|---------------------------------------------------------------------------------------|
| context   | The authentication context, which contains the context information about the request. |

#### executeStep(stepId, options, eventCallbacks)

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
For more information, see <a href="#step-filtering">authentication step filtering</a>.</td>
</tr>
<tr class="odd">
<td>eventCallbacks</td>
<td>The object that contains the callback functions that are to be called based on the result of the step execution.<br />
Supported results are <code>onSuccess</code> and <code>onFail</code>, which can have their own optional callbacks as anonymous functions (optional).</td>
</tr>
</tbody>
</table>

The API can be called in either of the following ways:

-   With only the `           stepId          ` .

    ``` java
    executeStep(1)
    ```

-   With only the `           stepId          ` and
    `           eventCallbacks          ` .

    ``` java
    executeStep(1, {
        onSuccess: function(context) {
            //Do something on success
        }
    });
    ```

-   With the `           stepId          `,
    `           options          `, and an empty
    `           eventCallbacks          ` array.  Different properties can be defined in the `           options          ` object such as `           authenticationOptions          `, `           authenticatorParams          `. See the following two examples:

    ``` java
    executeStep(1,{
        authenticationOptions:[{
            authenticator: 'totp'
        }]},
    });
    ```
    ``` java
    executeStep(1, {
        authenticatorParams: {
            local: {
                SessionExecutor: {
                    MaxSessionCount: '1'
                }
                totp: {
                enableRetryFromAuthenticator: 'true'
                }
            }
        }
    });
    ```
      
    !!! note
    
        The API cannot be called with only the `           stepId          `
        and `           options          ` .
    

<a name = "step-filtering"></a>
**Authentication step filtering**

Filters out some of the authentication options of a step based on a condition. This can be achieved by specifying an array named `authenticationOptions` to the `options` map. You can have `idp` as an array item for federated IDPs, and `authenticator` as an array item for local authenticators as shown below.

**Example code**

``` java
executeStep(1, {
    authenticationOptions: [{authenticator:'BasicAuthenticator'},{idp:'google'}]
},{
    onSuccess: function (context) {
        // Do something on success
    }
});
```

You can find the available local authenticators in the table below.
<table>
<tbody>
    <tr>
        <th>Display Name</th>
        <th>Authenticator</th>
    </tr>
    <tr>
        <td>Backup Code</td><td><code>backup-code-authenticator</code></td>
    </tr>
    <tr>
        <td>Basic Auth</td><td><code>BasicAuthRequestPathAuthenticator</code></td>
    </tr>
    <tr>
        <td>Identifier First</td><td><code>IdentifierExecutor</code></td>
    </tr>
    <tr>
        <td>JWT Basic</td><td><code>JWTBasicAuthenticator</code></td>
    </tr>
    <tr>
        <td>Magic Link</td><td><code>MagicLinkAuthenticator</code></td>
    </tr>
    <tr>
        <td>OAuth Bearer</td><td><code>OAuthRequestPathAuthenticator</code></td>
    </tr>
    <tr>
        <td>Security Key/Biometrics</td><td><code>FIDOAuthenticator</code></td>
    </tr>
    <tr>
        <td>TOTP</td><td><code>totp</code></td>
    </tr>
    <tr>
        <td>Username & Password</td><td><code>BasicAuthenticator</code></td>
    </tr>
    <tr>
        <td>X509 Certificate</td><td><code>x509CertificateAuthenticator</code></td>
    </tr>
    <tr>
        <td>Active Sessions Limit</td><td><code>SessionExecutor</code></td>
    </tr>
</tbody>
</table>

---

## Utility functions

The implementation of utility functions can be found in the [WSO2 extensions code repository](https://github.com/wso2-extensions/identity-conditional-auth-functions).

#### hasRole(user, role)

This function returns `true` if the specified 
`          user         ` belongs to the specified 
`          role         `, and returns `false` if the user does
not. It includes the following parameters.

| Parameter | Description                                  |
|-----------|----------------------------------------------|
| user      | A user object representing the user details. |
| role      | A string representing the role name.         |

``` java
var user = context.steps[1].subject;
var isAdmin = hasRole(user, 'admin');
Log.info('--------------- Has Admin ' + isAdmin);
if (isAdmin) {
    executeStep(2);
}
```

#### assignUserRoles(user, assigningRoles)

This function assigns each of the roles specified in the 
`                   assigningRoles                 ` parameter to the
specified `                   user                 ` object. It
returns `true` if all the roles are successfully assigned and returns
`false` if not.  It includes the following parameters.

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

#### removeUserRoles(user, removingRoles)

This function removes each of the roles specified in the 
`                   removingRoles                 ` parameter to the
given `                   user                 ` object. It returns
`true` if all the roles are successfully removed and returns `false` if
not. It includes the following parameters.

| Parameter     | Description                                                                                      |
|---------------|--------------------------------------------------------------------------------------------------|
| user          | An object representing the user details.                                                         |
| removingRoles | A list of strings that contains roles that are to be removed where each string is a role name. |

``` java
executeStep(1, {
    onSuccess: function (context) {
        // Extracting authenticated subject from the first step.
        let user = context.currentKnownSubject;
        removeUserRoles(user, ['exampleRole1', 'exampleRole2']);
    }
});
```

#### sendEmail(user, templateId, placeholderParameters)

This function sends an email to the specified user. It includes the
following parameters.

| Parameter             | Description                                                                                            |
|-----------------------|--------------------------------------------------------------------------------------------------------|
| user                  | An object representing the user details.                                                               |
| templateId            | Identifier of the email template. The email template specifies the body of the email that is sent out. |
| placeholderParameters | Used to replace any placeholders in the template.                                                      |

``` java
var user = context.steps[1].subject;
var firstName = user.localClaims['http://wso2.org/claims/givenname'];
sendEmail(user, 'myTemplate', {'firstName':firstName});
```

#### sendError(url,parameters)

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
<td>This is the URL of the error page that the user is redirected to. If the value is null, the user is redirected by default to the <strong>retry.do</strong> error page.<br />
Note that any relative URL is assumed as the relative to host’s root.</td>
</tr>
<tr class="even">
<td>parameters</td>
<td>Key value map passed as parameters. These are converted to query parameters in the URL.</td>
</tr>
</tbody>
</table>

``` java
var user = context.steps[1].subject;
var isAdmin = hasRole(user, 'admin');
if (!isAdmin) {
    sendError('http://www.example.com/error',{'errorcode':'000403','errorMsg':'You are not allowed to login to this app.'});
}
```

!!! tip
    When passing error messages to the error page, it is
    recommended to use the i18n key so that it can be internationalized
    easily at the page.

#### fail()

This function redirects the user to the redirect URI provided in the authorization request failing the authorization flow. 

This function takes a map as an optional parameter. When a map is provided as the parameter, the redirect URL will be appended with following properties which should be contained in the map, otherwise the default parameters will be passed. All the properties passed in the map are also optional.

<table>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>errorCode </td>
<td>error code to be appended in the redirect URL</td>
</tr>
<tr class="even">
<td>errorMessage </td>
<td>error message to be appended in the redirect URL</td>
</tr>
<tr class="odd">
<td>errorURI </td>
<td>URI of a web page that includes additional information about the error</td>
</tr>
</tbody>
</table>

``` java
var parameterMap = {'errorCode': 'access_denied', 'errorMessage': 'login could not be completed', "errorURI":'http://www.example.com/error'};
if (!isAuthenticated) {
    fail(parameterMap);
}
```

#### setCookie(response, name, value, properties)

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
<td>response</td>
<td>HTTP response.</td>
</tr>
<tr class="even">
<td>name</td>
<td>Name of the cookie.</td>
</tr>
<tr class="odd">
<td>value</td>
<td>Value of the cookie.</td>
</tr>
<tr class="even">
<td>properties</td>
<td>A map that may contain optional attributes of the cookie with two other custom attributes <code>encrypt</code> and <code>sign</code>.
<ul>
<li>The default value of <code>sign</code> is <code>false</code>. If it is set to <code>true</code>, the value will be signed.</li>
<li>The default value of <code>encrypt</code> is <code>false</code>. If it is set to <code>true</code>, the value will be encrypted.</li>
</ul></td>
</tr>
</tbody>
</table>

!!! tip
    The size of the value has to be less than the RSA key pair length if 
    `                   encrypt                 ` is enabled (set to
    `true`).
    

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

#### getCookieValue(request, name, properties)

This function gets the plain-text cookie value for the cookie 
`                   name                 ` if present.  It includes
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
<td>Request</td>
<td>HTTP authentication request.</td>
</tr>
<tr class="even">
<td>name</td>
<td>Name of the cookie.</td>
</tr>
<tr class="odd">
<td>properties</td>
<td>A map that may contain optional attributes of the cookie <code>decrypt</code> and <code>validateSignature</code>.
<ul>
<li>The default value of <code>decrypt</code> is <code>false</code>.  If it is set to <code>true</code>, the value will be decrypted.</li>
<li>The default value of <code>validateSignature</code> is <code>false</code>.  If it is set to <code>true</code>, the signature will be validated before returning a response.</li>
</ul></td>
</tr>
</tbody>
</table>

``` java
getCookieValue(context.request,"name", {"decrypt" : true,"validateSignature" : true })
```

#### callAnalytics(metadata, payloadData, eventHandlers)

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
<td>A JSON object that contain the following attributes:
<ul>
<li><p><code>Application:</code> Siddhi application name (mandatory)</p></li>
<li><p><code>InputStream:</code> Input stream name (mandatory)</p></li>
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

#### publishToAnalytics(metadata, payloadData)

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
<td>A JSON object that contain the following attributes:
<ul>
<li><p><code>Application:</code> Siddhi application name (mandatory)</p></li>
<li><p><code>InputStream:</code> Input stream name (mandatory)</p></li>
</ul></td>
</tr>
<tr class="even">
<td>payloadData</td>
<td>The data that needs to be sent to the analytics engine.</td>
</tr>
</tbody>
</table>

#### prompt(templateId, data, eventHandlers)

This function prompts for user input. It includes the following
parameters.

| Parameter     | Description                                           |
|---------------|-------------------------------------------------------|
| templateId    | Identifier of the template that needs to be prompted. |
| data          | The data to send to the prompt.                       |
| eventHandlers | The callback event handlers.                          |

``` java
var onLoginRequest = function(context) {
   executeStep(1, {
       onSuccess: function (context) {
           var username = context.steps[1].subject.username;
           prompt("genericForm", {"username":username, "inputs":[{"id":"fname","label":"First Name"},{"id":"lname","label":"Last Name"}]}, {
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

#### getUserSessions(user)

This function returns a session object  (i.e. all the active user sessions of the specified user and returns an empty array if there are no sessions). It includes the following parameters.

| Parameter     | Description                                             |
|---------------|---------------------------------------------------------|
| user          | This is a user object that represents the user details. |

``` java
var user = context.currentKnownSubject;
var sessions = getUserSessions(user);
for (var key in sessions) {
    Log.info(“Session ID: ” + sessions[key].id);
}
```

#### terminateUserSession(user, sessionId)

This function returns a session object  (i.e. all the active user sessions of the specified user and returns an empty array if there are no sessions). It includes the following parameters.

| Parameter     | Description                                                                |
|---------------|----------------------------------------------------------------------------|
| user          | This is a user object that represents the user details.                    |
| sessionId     | This is the `sessionId` string of the session that needs to be terminated. |

``` java
var user = context.currentKnownSubject;
var sessions = getUserSessions(user);
if (sessions.length > 0) {
    var result = terminateUserSession(user, sessions[0]);
    Log.info(“Terminate Operation Successful?: ” + result);
}

```

#### getValueFromDecodedAssertion(jwt, parameterName, isParameterInPayload)

This function returns a string which contains the value of the parameter in a decoded JWT. 
It includes the following parameters:


| Parameter            | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| jwt                  | The jwt to be decoded.                                                       |
| parameterName        | The name of the parameter in the jwt for which the value should be retrieved.|
| isParameterInPayload | Indicates whether the parameter to be retrieved is in the jwt header or body.<br> Value should be `true` if the parameter to be retrieved is in the body.      |                                                   
 
 The following example shows how to obtain a parameter from the request object, which is a signed jwt. 
``` java
var state = getValueFromDecodedAssertion(context.request.params.request[0],"state",true);
```

#### getUniqueUserWithClaimValues(claimMap, context, profile)

The utility function will search on the underlying user stores and return a unique user with the claim values. The claim map will consist of the claim and value. The function will get the first key from the map and get all users with the claim and add to the list. Then remove the users from that list not having the other claims. So the order of the map will decide the performance of this function.
The first claim in this must have a low number of users.

| Parameter            | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| claimMap  | A map contains the claim URI and claim value.    |
| context   | The authentication context, which contains the context information about the request.    |
| parameterName | Profile of the user. (Optional, the default value is 'default')      |

``` java
var claimMap = {};
claimMap[MAPPED_FEDERATED_USER_NAME_CLAIM] = federatedUserName;
claimMap[MAPPED_FEDERATED_IDP_NAME_CLAIM] = idpName;
var mappedUsername = getUniqueUserWithClaimValues(claimMap, context);
```

#### getAssociatedLocalUser(federatedUser)
This function prompts user input. It includes the following parameters.

| Parameter            | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| federatedUser  | The federated user object.    |

#### doAssociationWithLocalUser(fedUser, localUsername, tenantDomain, userStoreDomain)
This function prompts user input. It includes the following parameters.

| Parameter            | Description                                                                  |
|----------------------|------------------------------------------------------------------------------|
| fedUser  | Federated user object.    |
| localUsername  | The username of the local user to be associated.    |
| tenantDomain| The tenant domain of the local user.      |
| userStoreDomain | The user store domain of the local user.      |

---

## Object Reference

#### context object

Contains the authentication context information. The information can be
accessed as follows.

-   `           context.steps[<n>]          ` :  Access the
    authentication step information, where &lt;n&gt; is the step number
    (1-based). See [step
    object](#step-object) for more
    information.

    !!! note
        The step number is the one configured at the step
        configuration, not the actual order in which they get executed.
    

-   `          context.request         ` :  Access the HTTP
    authentication request information. See [request
    object](#request-object) for
    more information.
-   `          context.response         ` :  Access the HTTP response
    which will be sent back to the client. See [response
    object](#response-object) for
    more information.
-   `          context.serviceProviderName         ` :  Get the
    application name.

#### step object

Contains the authentication step information. May be null or invalid
step number.

-   `          step.subject         ` :  Contains the authenticated
    user’s information from this step. May be null if the step is not
    yet executed. See [user
    object](#user-object) for more
    information.
-   `          step.idp         ` :  Gives the identity provider name which was used
    to authenticate this user.

#### user object

- `user.username` : (Read/Write) The user’s username.
- `user.tenantDomain` : (Read/Write) The user’s tenant domain (only for local users; federated users will have this as `carbon.super` ).
- `user.userStoreDomain` : (Read/Write) The user’s user store domain (only for local users).
- `user.roles` : (Read/Write) List of user’s roles.
- `user.localClaims[“<local_claim_url>”]` : (Read/Write) User’s attribute (claim) value for the given “local\_claim\_url”. If the user is a federated user, this will be the value of the mapped remote claim from the identity provider.
- `user.claims[“<local_claim_url>”]`: (Read/Write) Sets a temporary claim value for the session.

    !!! note
        Note that `user.localClaims[“<local_claim_url>”]` updates the claim value in the user store as well. `user.claims[“<local_claim_url>”]` is an alternative to set a claim for temporary basis.

- `user.remoteClaims[“<remote_claim_url”]` : (Read/Write) User’s attribute (claim) as returned by the identity provider for the given “remote\_claim\_url”. Applicable only for federated users.

#### request object

- `request.headers[“<header_name>”]` : Request’s
    header value for the given header name by &lt;header\_name&gt;
- `request.params.param_name[0]` : Request’s
    parameter value for the given parameter name by the
    &lt;param\_name&gt; index (`param_name` is an array). 
- `request.cookies[“<cookie_name”]` : Request’s
    cookie value for the given cookie name by &lt;cookie\_name&gt;
- `request.ip` : The client IP address of the user
    who initiated the request. If there are any load balancers (eg.
    Nginx) with connection termination, the ip is retrieved from the
    headers set by the load balancer.

#### response object

-   `          response.headers[“<header_name>”]         ` : (Write)
    Response header value for the given header name by
    &lt;header\_name&gt;

#### session object

-   `          session.userAgent         ` :  This is `userAgent` object of the user session.. See [userAgent
    object](#useragent-object) for more
    information.
-   `          session.ip         ` :  This is the session’s IP address.
-   `          session.loginTime         ` :  This is the session’s last login time.
-   `          session.lastAccessTime         ` :  This is the session’s last accessed time.
-   `          session.id         ` :  This is the session’s id.
-   `          session.applications         ` :  This is the list of application objects in the session. See [application
    object](#application-object) for more
    information.

#### application object

-   `          application.subject         ` :  This is the subject of the application.
-   `          application.appName         ` :  This is the name of the application.
-   `          application.appId         ` :  This is the id of the application.
    
#### userAgent object

-   `          userAgent.raw         ` :  This is the raw user agent string.
-   `          userAgent.browser         ` :  This is the web browser property that is extracted from the raw user agent string.
-   `          userAgent.platform         ` :  This is the operating system property that is extracted from the raw user agent string.
-   `          userAgent.device         ` :  This is the device property that is extracted from the raw user agent string.    
