# Integrate with your JavaScript SPA

Follow the steps given below to authenticate users to your JavaScript SPA with OpenID Connect using the [JavaScript SDK](https://github.com/asgardeo/asgardeo-auth-spa-sdk#readme).

<div class="border-text">
    <img src="{{base_path}}/assets/img/logo/javascript-logo.svg" alt="JavaScript" width=50><br>
    <a href="{{base_path}}//get-started/try-samples/qsg-spa-javascript">Try out the sample app</a>
  </div>

## Prerequisites
- [Install npm and node](https://www.npmjs.com/get-npm) in your local environment.
- <a href="{{base_path}}/guides/applications/register-single-page-app">Register an application</a> in the {{ product_name }}.

## Install the SDK

There are two ways to integrate the `@asgardeo/auth-spa` SDK into your JavaScript application.

### Load from a CDN

You can pull down the ``@asgardeo/auth-spa`` SDK from the ``unpkg`` content delivery network (CDN) by adding the following script to the `index.html` file in your application.

```html
<script src="https://unpkg.com/@asgardeo/auth-spa@latest/dist/asgardeo-spa.production.min.js"></script>
```
### Install using package manager

You can also install the ``@asgardeo/auth-spa package`` from ``npm`` or ``yarn`` package manager.

```bash
npm install @asgardeo/auth-spa --save
```

## Configure `AsgardeoSPAClient`

You can use the following code within your root component to initialize `AsgardeoSPAClient` for your application.

To initialize the SDK, use the `getInstance()` function in the SDK and provide the following values to the `auth.initialize()` function to get the SDK to work with your application:
<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>clientID</code></td>
    <td>This is the Client ID of your OIDC app. See <a href="{{base_path}}/guides/authentication/oidc/discover-oidc-configs/#obtain-client-id-of-the-app">how to obtain client ID</a>.</td>
  </tr>
  <tr>
    <td><code>baseUrl</code></td>
    <td>This is the {{ product_name }}'s URL in the form <code>https://{host}:{port}</code>.</td>
  </tr>
  <tr>
    <td><code>signInRedirectURL</code></td>
    <td>This is the URL the app redirects to after user login. See <a href="{{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls">Authorized redirect URLs</a>.</td>
  </tr>
  <tr>
    <td><code>signOutRedirectURL</code></td>
    <td>This is the URL the app redirects to after user logout. See <a href="{{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls">Authorized redirect URLs</a>.</td>
  </tr>
  <tr>
    <td><code>scope</code></td>
    <td>The list of OIDC scopes that are used for requesting user information. The <code>openid</code> scope is mandatory to get the ID token. You can add other OIDC scopes such as <code>profile</code> and <code>email</code>.</td>
  </tr>
</table>

```js
<script>
// This client is a class and can be instantiated as follows.
var auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

// Once instantiated, the  client can be initialized by passing the relevant parameters such as the server origin, redirect URL, client ID, etc.
auth.initialize({
   signInRedirectURL: "https://localhost:3000",
   signOutRedirectURL: "https://localhost:3000",
   clientID: "{clientId}",
   baseUrl: "https://localhost:9443",
   scope: [ "openid","profile" ]
});
</script>
```

## Use the API
You can now start using the SDK's API to implement the required authentication logic. Follow the instructions given below to implement each use case.

The created instance of the SDK could be used to access the session state that contains information such as the email address of the authenticated user and the methods that are required for implementing authentication.

### Add login

The `sign-in` hook is used to fire a callback function after successful sign-in.

To sign in, simply call the `signIn()` function using the created instance.

This method is used to authenticate the users and to get the authorization code and access token.

```html
   <button onClick="auth.signIn()">Log In</button>
```

### Get access token

Add the following script to the html file and call it from a button. This is used to get the access token from the SDK.

See the [SDK reference](https://github.com/asgardeo/asgardeo-auth-js-sdk#getAccessToken) for more information.

```js
<script>

async function getToken() {
   const accessToken = await auth.getAccessToken();
   console.log(accessToken);
}

</script>
```

!!! note "Sample access token"
    61985b0e-26c3-38b7-acff-b18ad934eafc


### Get decoded ID token

To get the decoded token, call `getDecodedIdToken()` from a button click as shown below. Decoded ID token is useful to get the user attributes in the form of claims.

See the [SDK reference](https://github.com/asgardeo/asgardeo-auth-spa-sdk#getdecodedidtoken) for details.

```js
<script>
// Use this function in a button to simply get decoded ID token.
function getDecodedIdToken(){

   auth.getDecodedIDToken().then((idToken) => {
           var decodedIdToken = idToken;
           // Get claims from the decoded idtoken
           var email = decodedIdToken.email;
       })
}
</script>
```

**Sample decoded ID Token** object is given below:

```json
{
 "isk": "3af75bf6579a88cfb37ee85bd96c34524899857a91989be722e4ba53d392e3f7",
 "at_hash": "3gTKEUwxlPyxc1FPDmlxMw",
 "sub": "alica@bifrost.com",
 "country": "Sri Lanka",
 "amr": [
   "BasicAuthenticator"
 ],
 "iss": "https://localhost:9443/oauth2/token",
 "sid": "dd1621a7-bb3e-48cf-adae-861e261410e1",
 "aud": "SmLpPiRube64JmkAf4nhZVD_6V8a",
 "c_hash": "b15Dl_wI3rkoK0vukXYJew",
 "nbf": 1625805110,
 "azp": "SmLpPiRube64JmkAf4nhZVD_6V8a",
 "exp": 1625808710,
 "iat": 1625805110,
 "email": "alica@bifrost.com"
}
```

You can loop through the  decoded ID token, and get the following values:

<table>
   <tbody>
      <tr>
         <td><b>sub</b></td>
         <td><code>decodedIdToken.sub</code></td>
      </tr>
      <tr>
           <td><b>email</b></td>
           <td><code>decodedIdToken.email</code></td>
      </tr>
      <tr>
         <td><b>country</b></td>
         <td><code>decodedIdToken.country</code></td>
      </tr>
   </tbody>
</table></br>

### Get user information

In addition to implementing login and logout, your application can also use the SDK to get user information.

There are two ways for you to get user information:

- Get user information from the [decoded ID token](#get-decoded-id-token).

- Use the `getBasicUserInfo()` API and get basic user information.

To get the basic user information from the SDK, copy the following script and call the `getBasicUserInfo()` from a button.
See the [SDK reference](https://github.com/asgardeo/asgardeo-auth-spa-sdk#getBasicUserInfo) for details.

```js
<script>
// Use this function in a button to simply get user info.
function getBasicUserInfo(){
   auth.getBasicUserInfo().then((userinfoResponse) => {
       console.log(userinfoResponse); // check userinfo response
       console.log(userinfoResponse.email);  // check email

   }).catch((error) => {
       console.error(error);
   });
}
</script>
```

**Sample user info response**(`userinfoResponse`) object is below:

```json
{
 "allowedScopes": "openid",
 "sessionState": "f143343efdd6bcb57fe3d6215d9b740d2b1714df4bee0f506e31a7d75e1c2a8d.sI-dfLfA0yRDiKFvsG89LA",
 "username": "alica@bifrost.com",
 "country": "Sri Lanka",
 "email": "alica@bifrost.com"
}
```

You can loop through the user info response(`userinfoResponse`), and get the following values:

<table>
   <tbody>
      <tr>
           <td><b>email</b></td>
           <td><code>userinfoResponse.email</code></td>
      </tr>
      <tr>
         <td><b>country</b></td>
         <td><code>userinfoResponse.country</code></td>
    </tr>
   </tbody>
</table></br>

### Add logout

In the previous steps, you implemented login for your app and enabled your app to get some information about the user that is logged in. Now you need a way to log users out of your application and remove the user sessions from {{ product_name }}.

See the [signOut API reference](https://github.com/asgardeo/asgardeo-auth-spa-sdk#signout) for advanced usages.

```html
<button onClick="auth.signOut()">Log Out</button>
```

### Sample code
The following code snippet demonstrates the process of accessing the authenticated user's information together with other functions from the SDK.

```js
   <div>
      <!-- Authenticated View --->
      <div id="authenticated-view" style="display: none;">
         <ul>
               <li id="username"></li>
         </ul>
         <button onClick="auth.signOut()">Log Out</button>
      </div>
      <!-- Un-Authenticated View --->
      <div id="unauthenticated-view" style="display: none;">
         <button onClick="auth.signIn()">Log In</button>
      </div>
   </div>

   <script>
      (async () => {
         let user = undefined;

         // If there are auth search params i.e code, session_state, automatically trigger login.
         // Else, try to see if there's a session.
         if (AsgardeoAuth.SPAUtils.hasAuthSearchParamsInURL()) {
               user = await auth.signIn({ callOnlyOnRedirect: true });
         } else {
               user = await auth.trySignInSilently();
         }

         // Update the UI accordingly.
         if (user) {
               document.getElementById("authenticated-view").style.display = "block";
               document.getElementById("unauthenticated-view").style.display = "none";
               document.getElementById("username").innerHTML = user.username;
         } else {
               document.getElementById("authenticated-view").style.display = "none";
               document.getElementById("unauthenticated-view").style.display = "block";
         }
      })();
   </script>
```
