# Conditional authentication - API reference

{{ product_name }} provides a set of defined functions and objects to write your conditional authentication script. They are grouped as follows:

- [Core functions](#core-functions): These are the basic functions used in the script. These are used to identify the user who initiated the login flow, execute a step in the login flow, handle login failures, etc. Listed below are the core functions that can be used in conditional authentication scripts.
  
    - [`onLoginRequest()`](#initial-login-request)
    - [`executeStep()`](#execute-a-step)
    - [`fail()`](#fail-the-login-flow)
    - [`sendError()`](#redirect-to-error-code)

- [Utility functions](#utility-functions): These utility functions are used for specific scenarios. For example, checking whether the login user belongs to a specific user group. Listed below are the utility functions that can be used in conditional authentication scripts.
  
    - [`isMemberOfAnyOfGroups()`](#check-group-membership)
    - [`setCookie()`](#set-cookie)
    - [`getCookieValue()`](#get-cookie-value)
    - [`prompt()`](#prompt)
    - [`getUserSessions()`](#get-user-sessions)
    - [`terminateUserSession()`](#terminate-user-session)
    - [`sendEmail()`](#send-email)
    - [`callChoreo`](#call-a-choreo-api)
    - [`getValueFromDecodedAssertion()`](#get-parameter-value-from-jwt)
    - [`getUniqueUserWithClaimValues()`](#get-unique-user)
    - [`getAssociatedLocalUser()`](#get-associated-user)
    - [`getMaskedValue()`](#get-masked-value)
    - [`httpGet()`](#http-get)
    - [`httpPost()`](#http-post)
    - [`resolveMultiAttributeLoginIdentifier()`](#resolve-multi-attribute-login-identifier)
    - [`updateUserPassword()`](#update-user-password)

- [Object references](#object-reference): You can use objects to capture user behaviors and set attributes. For example, you can use the **user** and **request** objects and write the login conditions accordingly. Listed below are the object references that can be used in conditional authentication scripts.
  
    - [`context`](#context)
    - [`step`](#step)
    - [`user`](#user)
    - [`request`](#request)
    - [`response`](#response)
    - [`session`](#session)
    - [`application`](#application)
    - [`userAgent`](#user-agent)
    - [`connectionMetadata`](#connectionmetadata)
    - [`authConfig`](#authconfig)

---

## Core functions

These are the basic functions that are required for defining the application login flow using an authentication script.

### Initial login request

`onLoginRequest()`

This function is called when {{ product_name }} receives the initial login request. It includes the parameters given below.

- **Parameters**

    <table>
        <tr>
          <td><code>context</code></td>
          <td>The authentication context, which contains the context information about the request.</td>
        </tr>
    </table>

- **Example**

    ```bash 
    onLoginRequest = function(context)
    ```


### Execute a step

`executeStep()`

This function is called to execute an authentication step in the login flow. You need to [define your application's login flow]({{base_path}}/guides/authentication/#design-the-login-flow) before using this function.

This method accepts an object as a parameter and should include the details listed below.

<table>
  <tr>
    <td><code>&ltstepId&gt</code></td>
    <td>(Mandatory) The step number in the login flow.</td>
  </tr>
  <tr>
    <td><code>&ltoptions&gt</code></td>
    <td>(Optional) A map that can configure step execution. Authentication option filtering is supported.<br /> For more information, see the example on <b>filtering connections in a step</b> given below.</td>
  </tr>
  <tr>
    <td><code>&lteventCallbacks&gt</code></td>
    <td>(optional) The object that contains the callback functions, which are to be called based on the result of the step execution.<br />
    Supported results are <code>onSuccess</code> and <code>onFail</code> which can
              have their own optional callbacks as anonymous functions. For these callbacks, the [context](#context) and [data](#data) parameters are passed.
    </td>
  </tr>
</table>

The following sample template shows how the above categorization can be used in a script.

```js
executeStep(<stepId>, 
{
  <options>:[
    //The objects of the option
  ]
},
{
  <eventCallback>: function()> {
    //eventCallback can be `onSuccess` or `onFail` 
    //Define what should be done
  }
});
```

#### Parameters
This section describes the **options** you can use to configure the `executeStep()` function, and the values you can use as **local authenticators** and **federated IdPs** in the function.

- <b>Options</b>

    You can use these options when executing an authentication step through the script. See the [examples](#examples) given below for details.

    <table>
      <tr>
        <td><code>authenticationOptions</code></td>
        <td>List the authentication methods that will be prompted for this step.</td>
      </tr>
      <tr>
        <td><code>authenticationOptions.authenticator</code></td>
        <td>The name of the local authenticator used.</td>
      </tr>
      <tr>
        <td><code>authenticationOptions.idp</code></td>
        <td>The name of the federated identity provider used.</td>
      </tr>
      <tr>
        <td><code>authenticatorParams</code></td>
        <td>Pass the configuration for the step authenticators or identity providers.</td>
      </tr>
      <tr>
        <td><code>authenticatorParams.common</code></td>
        <td>Specify the common configurations for both local authenticators and federated identity providers.</td>
      </tr>
      <tr>
        <td><code>authenticatorParams.local.{authenticator-name}</code></td>
        <td>The name of the local authenticator used in the application. The configurations passed here will be available for that specific authenticator.</td>
      </tr>
      <tr>
        <td><code>authenticatorParams.local.{federated-identity-provider}</code></td>
        <td>The name of the federated identity provider used in the application. The configurations passed here will be available for that federated identity provider.</td>
      </tr>
    </table>

- <b> Connections: Local authenticators and federated IdPs </b>

    When you want to access your configured [connections]({{base_path}}/guides/authentication/#manage-connections) in an authentication step, you can use the following values through the **options** explained above.

    See the example on **filtering connections in a step** given below for details.

    The **local authenticators** are represented by the `authenticator` parameter. The table shows the connection names (as displayed on the {{ product_name }} Console) and the corresponding authenticator name you can use in the scripts.

    <table id="authenticatorNames">
      <tbody>
        <tr>
          <th>Connection Name</th>
          <th>Authenticator</th>
        </tr>
        <tr>
          <td>Email OTP</td><td>email-otp-authenticator</td>
        </tr>
        <tr>
          <td>Identifier First</td><td>IdentifierExecutor</td>
        </tr>
        <tr>
          <td>Magic Link</td><td>MagicLinkAuthenticator</td>
        </tr>
        <tr>
          <td>Security Key/Biometrics</td><td>FIDOAuthenticator</td>
        </tr>
        <tr>
          <td>SMS OTP</td><td>sms-otp-authenticator</td>
        </tr>
        <tr>
          <td>TOTP</td><td>totp</td>
        </tr>
        <tr>
          <td>Username & Password</td><td>BasicAuthenticator</td>
        </tr>
      </tbody>
    </table>


    The **external identity providers** are represented by the `idp` parameter. The federated connection names are generated based on the name you assign to the connection at registration.

    !!! tip "Example"
        If you add a [federated google connection]({{base_path}}/guides/authentication/social-login/add-google-login/) with the name **bifrost google**, the value you can use in your authentication scripts is `bifrost_google`.

#### Examples
Shown below are ways to define a login flow using the core functions.

- <b>Example 1: Use <code>stepId</code></b>
  
    This example uses only the `stepId`.
    ``` js 
    executeStep(1)
    ```

- <b>Example 2: Use <code>stepId</code> and <code>eventCallbacks</code></b>
  
    This example uses only the `stepId` and `eventCallbacks`.
    ``` js
    executeStep(1, {
        onSuccess: function(context) {
            //Do something on success
        }
    });
    ```

- <b>Example 3: Use all parameters</b>

    This example uses the `stepId`, `options`, and an empty `eventCallbacks` object. Different properties can be defined by the `options` object, such as `authenticationOptions` and `authenticatorParams`. However, you cannot write a script with only the `stepId` and `options`. See the following two examples:

    ``` js
    executeStep(1, {
        authenticationOptions:[{
            authenticator: 'totp'
        }]}, {}
    );
    ```
    ``` js
    executeStep(1, {
        authenticatorParams: {
            local: {
                email-otp-authenticator: {
                      enableRetryFromAuthenticator: 'true'
                }
            }
        }, {}
    );
    ```

- <b>Example 4: Filter connections in a step</b>
  
    The `authenticationOptions` array filters out connections (local authenticators and federated identity providers) of a step based on a condition.

    This can be achieved by specifying an array named `authenticationOptions` to the `options` map.  You can have `idp` as an array item for federated connections and `authenticator` as an array item for local connections, as shown below.

      ``` js
      executeStep(1,{
        authenticationOptions:[{authenticator:'BasicAuthenticator'},{idp:'google'}]
        },{
            onSuccess: function (context) {
                // Do something on success
      };
      ```


### Fail the login flow

`fail()`  

This function redirects the user to the redirect URI provided in the authorization request when the login flow fails.

This function takes a map as an optional parameter. When a map is provided as the parameter, the redirect URL will be
appended with the following properties (which should be contained in the map). Otherwise, the default parameters are
passed. All the properties passed in the map are also optional.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>errorCode</code></td>
          <td>The error code to be appended in the redirect URL.</td>
        </tr>
        <tr>
          <td><code>errorMessage</code></td>
          <td>The error message to be appended in the redirect URL.</td>
        </tr>
        <tr>
          <td><code>errorURI</code></td>
          <td>The URI of a web page that includes additional information about the error.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var parameterMap = {'errorCode': 'access_denied', 'errorMessage': 'login could not be completed', "errorURI":'http://www.example.com/error'};
    if (!isAuthenticated) {
        fail(parameterMap);
    }
    ```

### Redirect to error code

`sendError()`

This function redirects the user to an error page.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>url</code></td>
          <td>The URL of the error page that the user is redirected to. If the value is null, the user is redirected by default to the <strong>retry.do</strong> error page.<br />
          Note that any relative URL is assumed to be relative to the host's root.</td>
        </tr>
        <tr>
          <td><code>parameters</code></td>
          <td>Key value map passed as parameters. These are converted to query parameters in the URL.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    It is recommended to use an i18n key to describe the error messages so that they can be internationalized easily on the error page.

    ```js
    var user = context.steps[1].subject;
    var isAdmin = hasRole(user, 'admin');
    if (!isAdmin) {
        sendError('http://www.example.com/error',{'status':'000403','statusMsg':'You are not allowed to login to this app.', 'i18nkey':'not.allowed.error'});
    }
    ```

## Utility functions

The implementation of utility functions can be found in the [WSO2 extensions code repository](https://github.com/wso2-extensions/identity-conditional-auth-functions){:target="_blank"}.

### Check group membership

`isMemberOfAnyOfGroups()`

This function returns `true` if the specified user belongs to at least one of the given groups, and returns `false` if the user does not.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>user</code></td>
          <td>A user object representing the user details.</td>
        </tr>
          <tr>
          <td><code>groups</code></td>
          <td>A list of strings that contain the groups. Each string is a group name.</td>
        </tr>
      </tbody>  
    </table>

- **Example**

    ``` js
    var groups = ['admin', 'manager'];
    var user = context.steps[1].subject;
    var isMember = isMemberOfAnyOfGroups(user, groups);
    if (isMember) {
        executeStep(2);
    }
    ```


### Set cookie

`setCookie(response, name, value, properties)`

This function sets a new cookie.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>response</code></td>
          <td>The HTTP response.</td>
        </tr>
        <tr>
          <td><code>name</code></td>
          <td>Name of the cookie.</td>
        </tr>
        <tr>
          <td><code>value</code></td>
          <td>Value of the cookie.</td>
        </tr>
        <tr>
          <td><code>properties</code></td>
          <td><p>A map that may contain optional attributes of the cookie with the two custom attributes given below.</p>
            <ul>
              <li><code>sign</code>: The default value is <code>false</code>. If it is set to true, the value will be signed.</li>
              <li><code>encrypt</code>: The default value is <code>false</code>. If it is set to true, the value will be encrypted.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

- **Example**

    The size of the value has to be less than the RSA key pair length if '`encrypt`' is enabled (set to true).

    ```js
    setCookie(context.response, "name", "test", {"max-age" : 4000,
                                                "path" : "/",
                                                "domain" : "localhost",
                                                "httpOnly" : true,
                                                "secure" : true,
                                                'sameSite': 'LAX',
                                                "version" : 1,
                                                "comment" : "some comments",
                                                "encrypt" : true,
                                                "sign" : true})
    ```

### Get cookie value

`getCookieValue(request, name, properties)`

This function gets the plain-text cookie value for the cookie name if it is present.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>request</code></td>
          <td>HTTP authentication request.</td>
        </tr>
        <tr>
          <td><code>name</code></td>
          <td>Name of the cookie.</td>
        </tr>
        <tr>
          <td><code>properties</code></td>
          <td><p>A map that may contain optional attributes of the cookie:</p>
            <ul>
              <li><code>decrypt</code>: The default value is <code>false</code>. If it is set to <code>true</code>, the value will be decrypted.</li>
              <li><code>validateSignature</code>: The default value is <code>false</code>. If it is set to <code>true</code>, the signature will be validated before returning a response.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js 
    getCookieValue(context.request,"name", {"decrypt" : true,"validateSignature" : true })
    ```

### Prompt

`prompt(templateId, data, eventHandlers)`

This function prompts the user for different interactions.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>templateId</code></td>
          <td>Identifier of the template that needs to be prompted.</td>
        </tr>
        <tr>
          <td><code>data</code></td>
          <td>The data associated with the template to be sent in the prompt.</td>
        </tr>
        <tr>
          <td><code>eventHandlers</code></td>
          <td>The callback event handlers.</td>
        </tr>
      </tbody>
    </table>
        
    The following table contains the supported templates and the associated data.
        <table>
          <thead>
            <tr>
                <th>Template Id</th>
                <th>Description</th>
                <th>Data</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>genericForm</td>
              <td>Prompt for generic user input.</td>
              <td>
                <ul>
                <li><code>username</code>: Username that will be used in a greeting</li>
                <li><code>inputs</code>: A list of input field objects in the form. For example: <code>{id: “”, label: “”}</code></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>externalRedirect</td>
              <td>Redirect users to an external static page.</td>
              <td>
                <ul>
                <li><code>redirectURL</code>: The external URL to redirect the user.</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>internalWait</td>
              <td>Keep a user waiting for a predefined fixed time or until a status is completed.</td>
              <td>
                <ul>
                <li><code>waitingType</code>: Waiting method. Can be one of <code>FIXED_DELAY</code> or <code>POLLING</code>. Default waitingType is <code>FIXED_DELAY</code>.</li>
                <li><code>waitingConfigs</code>: Waiting page configurations.
                  <ul>
                    <li><code>greeting</code>: An optional greeting. Default text is <code>Just a moment...</code></li>
                    <li><code>message</code>: An optional message. Default text is <code>We are setting things up for you.</code>.</li>
                    <li><code>timeout</code>: Optional timeout period in seconds. Default timeout is 10 seconds and max timeout is 20 seconds.</li>
                    If your <code>waitingType</code> is <code>POLLING</code>, the following configs also apply:
                      <ul>
                        <li><code>pollingEndpoint</code>: REST endpoint to poll a status.</li>
                        <li><code>pollingInterval</code>: Time internal in seconds to poll the polling endpoint. Default value is `2` seconds.</li>
                        <li><code>requestMethod</code>: Polling request method. Can be one of <code>GET</code> or <code>POST</code>. Default value is <code>GET</code>.</li>
                        <li><code>contentType</code>: Content type of the polling request. Default value is <code>application/x-www-form-urlencoded</code>.</li>
                        <li><code>requestData</code>: Data to be sent to the polling endpoint. Can specify a string or an object. If the HTTP method is <code>GET</code>, the data will be appended to the URL.</li>
                      </ul>
                  </ul>
                </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

- **Examples**

=== "genericForm"

    ``` js
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

=== "externalRedirect"

    ``` js
    var onLoginRequest = function(context) {
      executeStep(1, {
        onSuccess: function (context) {
          prompt("externalRedirect", {
          "redirectURL": "{EXTERNAL_URL}"}, {
            onSuccess : function(context) {
              Log.info("Successfully redirected back from the external page");
              },
            onFail: function(context, data) {
              Log.info("Error occurred during the prompt.");
            } 
          });
         }
      });
    }
    ```

=== "internalWait"

    ``` js
    var onLoginRequest = function(context) {
      executeStep(1, {
        onSuccess: function (context) {
          prompt("internalWait", {
            "waitingType": "POLLING",
            "waitingConfigs": {
              "pollingEndpoint": "<POLLING_ENDPOINT>",
              "requestData": "contextId=1234",
              "pollingInterval": "2",
              "timeout": "10"
            }
          }, {
            onSuccess: function (context) {
              Log.info("Successfully redirected back from waiting page.");
            },
            onFail: function (context, data) {
              Log.info("Error occurred during the prompt.");
            }
          });
        }
      });
    }
    ```

### Get user sessions

`getUserSessions()`

This function returns a session object  (i.e., all the active user sessions of the specified user or an empty
array if there are no sessions).

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>user</code></td>
          <td>This is a user object that represents the user details.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var user = context.currentKnownSubject;
    var sessions = getUserSessions(user);
    for (var key in sessions) {
        Log.info("Session ID: " + sessions[key].id);
    }
    ```

### Terminate user session

`terminateUserSession()`

This function returns a session object (i.e., all the active user sessions of the specified user or an empty
array if there are no sessions).

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>user</code></td>
          <td>This is a user object that represents the user details.</td>
        </tr>
        <tr>
          <td><code>sessionId</code></td>
          <td>This is the <code>sessionId</code> string of the session that needs to be terminated.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var user = context.currentKnownSubject;
    var sessions = getUserSessions(user);
    if (sessions.length > 0) {
        var result = terminateUserSession(user, sessions[0]);
        Log.info("Terminate Operation Successful?: " + result);
    }
    ```

### Send email

`sendEmail()`

This function sends an email to the specified user.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>user</code></td>
          <td>An object representing the user details.</td>
        </tr>
        <tr>
          <td><code>templateId</code></td>
          <td>Identifier of the email template. The email template specifies the body of the email that is sent out.</td>
        </tr>
        <tr>
          <td><code>placeholderParameters</code></td>
          <td>Used to replace any placeholders in the template.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var user = context.steps[1].subject;
    var firstName = user.localClaims['http://wso2.org/claims/givenname'];
    sendEmail(user, 'myTemplate', {'firstName':firstName});
    ```

### Call a Choreo API

This function invokes an API hosted in [Choreo](https://wso2.com/choreo/){:target="_blank"}.

!!! note "Important"
    Note that to use the `callChoreo` function, the API should,

    - contain an endpoint that accepts `POST` requests.
    - return a status code of `2xx`.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>connectionMetadata</code></td>
          <td>An object containing the necessary metadata to invoke the API. . See [ConnectionMetadata](#connectionmetadata) for more information.</td>
        </tr>
        <tr>
          <td><code>payloadData</code></td>
          <td>An object representing the payload that needs to be sent in the API request body.</td>
        </tr>
        <tr>
          <td><code>eventHandlers</code></td>
          <td>An object that contains the callback functions, which are to be called based on the result of API invocation. <br> Supported results are <code>onSuccess</code>, <code>onFail</code>, and <code>onTimeout</code>.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var connectionMetadata = {
    "url": "<Choreo API URL>",
    "consumerKey": "<Consumer key of the Choreo Application>",
    "consumerSecret": "<Consumer secret of the Choreo Application>"
    };
    
    var requestPayload = {"example-key": "example-value"};
    
    callChoreo(connectionMetadata, requestPayload, {
      onSuccess: function(context, data) {
          Log.info("Successfully invoked the Choreo API.");
      },
      onFail: function(context, data) {
          Log.info("Error occurred while invoking the Choreo API.");
      },
      onTimeout: function(context, data) {
          Log.info("Invoking Choreo API timed out.");
      }
    });
    ```

    ??? note "Using {{ product_name }} as the key manager"
        If you are using {{ product_name }} as the key manager in your Choreo organization, append  the `asgardeoTokenEndpoint` parameter to the `connectionMetadata` variable as follows:
            ``` js
            var connectionMetadata = {
              "asgardeoTokenEndpoint": "{{ product_url_format }}/oauth2/token"
            };
            ```


### Get parameter value from JWT

`getValueFromDecodedAssertion(jwt, parameterName, isParameterInPayload)`

This function returns a string containing the parameter's value in a decoded Json Web Token (JWT). It includes the following parameters:

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>jwt</code></td>
          <td>The JWT to be decoded.</td>
        </tr>
        <tr>
          <td><code>parameterName</code></td>
          <td>The name of the parameter in the JWT for which the value should be retrieved.</td>
        </tr>
        <tr>
          <td><code>isParameterInPayload</code></td>
          <td>Indicates whether the parameter to be retrieved is in the JWT header or body. <br> Value should be <code>true</code> if the parameter to be retrieved is in the body.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var state = getValueFromDecodedAssertion(context.request.params.request[0],"state",true);
    ```

### Get unique user

`getUniqueUserWithClaimValues(claimMap, context)`

The utility function will search the underlying user stores and return a unique user with the claim values. The claim map consists of the claim and value.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>claimMap</code></td>
          <td>A map that contains the claim URI and claim value.</td>
        </tr>
        <tr>
          <td><code>context</code></td>
          <td>The authentication context, which contains the context information about the request.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ``` js
    var claimMap = {};
    claimMap[MAPPED_FEDERATED_USER_NAME_CLAIM] = federatedUserName;
    claimMap[MAPPED_FEDERATED_IDP_NAME_CLAIM] = idpName;
    var mappedUsername = getUniqueUserWithClaimValues(claimMap, context);
    ```

### Get associated user

`getAssociatedLocalUser(federatedUser)`

This function returns the local user associated with the federate username given as input.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>federatedUser</code></td>
          <td>The federated user object.</td>
        </tr>
      </tbody>
    </table>

### Get masked value

`getMaskedValue(value)`

This utility function returns a masked value for the given input value. It can be used to mask sensitive content in logs.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>value</code></td>
          <td>Value needs to be masked.</td>
        </tr>
      </tbody>
    </table>

- **Example**

  If there is a requirement to add logs containing sensitive information (such as PII), those can be masked using this function as follows.

  ``` js
  var email = context.currentKnownSubject.username;
  Log.info("Email of the logged user : " + getMaskedValue(email));
  ```

### HTTP GET

`httpGet(url, headers, authConfig, eventHandlers)`

The HTTP GET function enables sending HTTP GET requests to specified endpoints as part of the adaptive authentication scripts in Asgardeo. It's commonly used to interact with external systems or APIs to retrieve necessary data for authentication decisions.

- **Parameters**
  
    <table>
      <tbody>
        <tr>
          <td style="white-space: nowrap;"><code>url</code></td>
          <td>The URL of the endpoint to which the HTTP GET request should be sent.</td>
        </tr>
        <tr>
          <td style="white-space: nowrap;"><code>headers</code></td>
          <td>HTTP request headers to be included in the GET request (optional).</td>
        </tr>
        <tr>
          <td style="white-space: nowrap;"><code>authConfig</code></td>
          <td>An object containing the necessary authentication metadata to invoke the API. See [AuthConfig](#authconfig) for information.</td>
          </tr>
        <tr>
          <td style="white-space: nowrap;"><code>eventHandlers</code></td>
          <td>The object that contains the callback functions, which are to be called based on the result of the GET request.<br />
              Supported results are <code>onSuccess</code> and <code>onFail</code>, which can have their own optional callbacks as anonymous functions.
          </td>
        </tr>
      </tbody>
    </table>
  
- **Example**

    ```
    var authConfig = {
        type: "basic",
        properties: {
            username: "admin",
            password: "adminPassword"
        }
    };

    var onLoginRequest = function(context) {
        httpGet('https://example.com/resource', {
            "Accept": "application/json"
        }, authConfig, {
            onSuccess: function(context, data) {
                Log.info("Successfully invoked the external API.");
                context.selectedAcr = data.status;
                executeStep(1);
            },
            onFail: function(context, data) {
                Log.info("Error occurred while invoking the external API.");
                context.selectedAcr = 'FAILED';
                executeStep(2);
            },
            onTimeout: function(context, data) {
                Log.info("Invoking external API timed out.");
                executeStep(2);
            }
        });
    }
    ```

### HTTP POST

`httpPost(url, body, headers, authConfig, eventHandlers)`

The HTTP POST function enables sending HTTP POST requests to specified endpoints as part of the adaptive authentication scripts in Asgardeo. It's commonly used to interact with external systems or APIs to retrieve necessary data for authentication decisions.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td style="white-space: nowrap;"><code>url</code></td>
          <td>The URL of the endpoint to which the HTTP POST request should be sent.</td>
        </tr>
        <tr>
          <td style="white-space: nowrap;"><code>body</code></td>
          <td>HTTP request body to be included in the POST request.</td>
        </tr>
        <tr>
          <td style="white-space: nowrap;"><code>headers</code></td>
          <td>HTTP request headers to be included in the POST request (optional).</td>
        </tr>
        <tr>
          <td style="white-space: nowrap;"><code>authConfig</code></td>
          <td>An object containing the necessary authentication metadata to invoke the API. See [AuthConfig](#authconfig) for more information.</td>
          </tr>
        <tr>
          <td style="white-space: nowrap;"><code>eventHandlers</code></td>
          <td>The object that contains the callback functions, which are to be called based on the result of the GET request.<br />
              Supported results are <code>onSuccess</code>, <code>onFail</code> and <code>onTimeout</code> which can
              have their own optional callbacks as anonymous functions. For these callbacks, the [context](#context) and [data](#data) parameters are passed.
          </td>
        </tr>
      </tbody>
    </table>
  
- **Example**

    ```
    var authConfig = {
        type: "clientcredential",
        properties: {
            consumerKey: "clientId",
            consumerSecret: "clientSecret",
            tokenEndpoint: "https://token-endpoint.com/token"
        }
    };

    var onLoginRequest = function(context) {
        httpPost('https://example.com/resource', {
            "email": "test@wso2.com"
        }, {
            "Authorization": "Bearer token",
            "Accept": "application/json"
        }, authConfig, {
            onSuccess: function(context, data) {
                Log.info("Successfully invoked the external API.");
                context.selectedAcr = data.status;
                executeStep(1);
            },
            onFail: function(context, data) {
                Log.info("Error occurred while invoking the external API.");
                context.selectedAcr = 'FAILED';
                executeStep(2);
            },
            onTimeout: function(context, data) {
                Log.info("Invoking external API timed out.");
                executeStep(2);
            }
        });
    }
    ```

### Resolve multi attribute login identifier

`resolveMultiAttributeLoginIdentifier(loginIdentifier, tenantDomain)`

If [alternative login identifiers]({{base_path}}/guides/user-accounts/account-login/configure-login-identifiers/) are enabled, this function resolves the username from the provided login identifier.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>loginIdentifier</code></td>
          <td>User provided login identifier.</td>
        </tr>
        <tr>
          <td><code>organization</code></td>
          <td>Organization name.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ```
    var loginIdentifier = context.request.params.username[0];
    var tenantDomain = context.tenantDomain;

    var username = resolveMultiAttributeLoginIdentifier(loginIdentifier, tenantDomain);
    ```

### Update user password

`updateUserPassword(user, newPassword, eventHandlers)`

This function updates the user password.

- **Parameters**

    <table>
      <tbody>
        <tr>
          <td><code>user</code></td>
          <td>The user object.</td>
        </tr>
        <tr>
          <td><code>newPassword</code></td>
          <td>New user password.</td>
        </tr>
        <tr>
          <td><code>eventHandlers</code></td>
          <td>Optional callback event handlers.</td>
        </tr>
      </tbody>
    </table>

- **Example**

    ```
    updateUserPassword(user, "newPassword");

    updateUserPassword(user, "newPassword", {
      onSuccess: function(context) {
        Log.info("Password updated successfully.");
      },
      onFail: function(context) {
        Log.info("Password update failed.");
      }
    });
    ```


## Object reference

### Context

Contains the authentication context information. The information can be accessed as follows:

<table>
  <tr>
    <td><code>context.steps[n]</code></td>
    <td>Access the authentication step information, where 'n' is the step number (1-based). See <a href="#step">step</a> for more information.</td>
  </tr>
</table>

The step number is the one configured at the step configuration, not the actual order in which they get executed.

<table>
  <tr>
    <td><code>context.request</code></td>
    <td>Access the HTTP authentication request information. See <a href="#request">request</a> for more information.</td>
  </tr>
  <tr>
    <td><code>context.response</code></td>
    <td>Access the HTTP response, which will be sent back to the client. See <a href="#response">response</a> for more information.</td>
  </tr>
  <tr>
    <td><code>context.serviceProviderName</code></td>
    <td>Get the application name.</td>
  </tr>
</table>



### Step

Contains the authentication step information. It may be a null or invalid step number.

<table>
  <tr>
    <td><code>step.subject</code></td>
    <td>Contains the authenticated user's information from this step. It may be null if the step is not yet executed. See <a href="#user">user</a> for more information.</td>
  </tr>
  <tr>
    <td><code>step.idp</code></td>
    <td>Gives the name of the federated connection that is used to authenticate the user.</td>
  </tr>
  <tr>
    <td><code>step.authenticator</code></td>
    <td>Give the name of the authenticator that is used for authenticating te user. You can find the authenticator names from the <a href="#authenticatorNames">connection names table</a>.</td>
  </tr>
</table>

### User

<table>
  <tr>
    <td><code>user.uniqueId</code></td>
    <td>The unique identifier of the user.</td>
  </tr>
  <tr>
    <td><code>user.username</code></td>
    <td>The user's username.</td>
  </tr>
  <tr>
    <td><code>user.userStoreDomain</code></td>
    <td><code>(Read/Write)</code> <br>The user store domain of the local user.</td>
  </tr>
  <tr>
    <td><code>user.localClaims["local_claim_url"]</code></td>
    <td><code>(Read/Write)</code> <br> User's attribute (claim) value for the given "local_claim_url". If the user is a federated user, this will be the value of the mapped remote claim from the identity provider.</td>
  </tr>
  <tr>
    <td><code>user.claims["local_claim_url"]</code></td>
    <td><code>(Read/Write)</code> <br> Sets a temporary claim value for the session.</td>
  </tr>
  <tr>
    <td><code>user.localClaims["local_claim_url"]</code></td>
    <td>Updates the claim value in the user store as well. The <code>user.claims["local_claim_url"]</code> parameter is an alternative to setting a temporary claim.</td>
  </tr>
  <tr>
    <td><code>user.remoteClaims["remote_claim_url"]</code></td>
    <td><code>(Read/Write)</code> <br> User's attribute (claim) as returned by the identity provider for the given <code>remote_claim_url</code>. Applicable only for federated users.</td>
  </tr>
</table>

### Request

<table>
  <tr>
    <td><code>request.headers["header_name"]</code></td>
    <td>The request's header value for the given header name.</td>
  </tr>
  <tr>
    <td><code>request.params.param_name[0]</code></td>
    <td>The request's parameter value for the given parameter name by the <code>param_name</code> index (<code>param_name</code> is an array).</td>
  </tr>
  <tr>
    <td><code>request.cookies["cookie_name"]</code></td>
    <td>The request's cookie value for the given cookie name.</td>
  </tr>
  <tr>
    <td><code>request.ip</code></td>
    <td>The client IP address of the user who initiated the request. If there are any load balancers (eg. Nginx) with connection termination, the IP is retrieved from the headers set by the load balancer.</td>
  </tr>
</table>

### Response

  <table>
    <tr>
      <td><code>response.headers["header_name"]</code></td>
      <td>(Write) The response header value for the given header name.</td>
    </tr>
  </table>

### Session

  <table>
    <tr>
    <td><code>session.userAgent</code></td>
    <td>The user agent object of the user session. See <a href="#user-agent">userAgent</a> for more information.</td>
    </tr>
    <tr>
      <td><code>session.ip</code></td>
      <td>The session's IP address.</td>
    </tr>
    <tr>
      <td><code>session.loginTime</code></td>
      <td>The session's last login time.</td>
    </tr>
    <tr>
      <td><code>session.lastAccessTime</code></td>
      <td>The session's last accessed time.</td>
    </tr>
    <tr>
      <td><code>session.id</code></td>
      <td>The session's id.</td>
    </tr>
    <tr>
      <td><code>session.applications</code></td>
      <td>The list of application objects in the session. See <a href="#application">application</a> for more information.</td>
    </tr>
  </table>

### Application

  <table>
    <tr>
      <td><code>application.subject</code></td>
      <td>This is the subject of the application.</td>
    </tr>
    <tr>
      <td><code>application.appName</code></td>
      <td>This is the name of the application.</td>
    </tr>
    <tr>
      <td><code>application.appId</code></td>
      <td>This is the ID of the application.</td>
    </tr>
  </table>

### User agent

  <table>
    <tr>
      <td><code>userAgent.rawString</code></td>
      <td>This is the raw userAgent string.</td>
    </tr>
    <tr>
      <td><code>userAgent.browser</code></td>
      <td>This is the web browser property that is extracted from the raw userAgent string.</td>
    </tr>
    <tr>
      <td><code>userAgent.platform</code></td>
      <td>This is the operating system property that is extracted from the raw userAgent string.</td>
    </tr>
    <tr>
      <td><code>userAgent.device</code></td>
      <td>This is the device property that is extracted from the raw userAgent string.</td>
    </tr>
  </table>


### ConnectionMetadata

It contains the necessary metadata for invoking the API when calling the callChoreo function.

<table>
  <tr>
    <td><code>connectionMetadata.url</code></td>
    <td>URL of the Choreo hosted API.</td>
  </tr>
  <tr>
    <td><code>connectionMetadata.consumerKey</code></td>
    <td>The consumer key of the Choreo application.</td>
  </tr>
  <tr>
    <td><code>connectionMetadata.consumerSecret</code></td>
    <td>The consumer secret of the Choreo application.</td>
  </tr>
</table>

You can securely store consumer keys and secrets as **secrets** in conditional authentication scripts and refer to
them in your conditional authentication scripts using the `secrets.{secret name}` syntax. For example, to retrieve a secret value, you may use:
```angular2html
var consumerSecret = secrets.clientSecret;
```
For more information on adding secrets, refer to the [Add a secret to the script]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/#add-a-secret-to-the-script) section in the 
documentation.

??? note "Change in behavior from 30th September 2024"
    Starting from 30th September 2024, you are no longer required to set the aliases for consumer keys and consumer secrets when calling the callChoreo command. Instead, you may directly reference them using the `secrets.secretName` notation.
    However, if you prefer, you may continue using the previous method as follows.
      <table>
          <tr>
            <td><code>connectionMetadata.consumerKeyAlias</code></td>
            <td>The name of the secret that stores the consumer key.</td>
          </tr>
          <tr>
            <td><code>connectionMetadata.consumerSecretAlias</code></td>
            <td>The name of the secret that stores the consumer secret.</td>
          </tr>
      </table>

### AuthConfig

When using httpGet or httpPost functions in Asgardeo adaptive authentication scripts, the table summarizes each
authentication type and its required properties:

<table>
    <thead>
        <tr>
            <th>Authentication Type</th>
            <th>Properties</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>basic</td>
            <td>username, password</td>
            <td>Uses user credentials.</td>
        </tr>
        <tr>
            <td>apikey</td>
            <td>apiKey, headerName</td>
            <td>Uses an API key sent as a header.</td>
        </tr>
        <tr>
            <td>clientcredential</td>
            <td>consumerKey, consumerSecret, tokenEndpoint, scope (optional, a space separated list of scopes)</td>
            <td>Uses client credentials to obtain an access token.</td>
        </tr>
        <tr>
            <td>bearer</td>
            <td>token</td>
            <td>Uses a bearer token for authentication.</td>
        </tr>
    </tbody>
</table>

You can securely store sensitive values of properties like username, password, consumerKey, consumerSecret as secrets in conditional authentication scripts and refer to them in your conditional authentication scripts using the `secrets.{secret name}` syntax. For example, to retrieve a secret value, you can use:
```angular2html
var consumerSecret = secrets.clientSecret;
```

For more information on adding secrets, refer to the [Add a secret to the script]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/#add-a-secret-to-the-script) section in the documentation.

### Data

<table>
  <tr>
    <td><code>data</code></td>
    <td>The response data is a JSON object that contains the response data from the API call.</td>
  </tr>
</table>
