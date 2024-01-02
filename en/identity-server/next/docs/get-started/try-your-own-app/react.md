# Integrate with your React SPA

Follow the steps given below to authenticate users to your React SPA with OpenID Connect using the [React SDK](https://github.com/asgardeo/asgardeo-auth-react-sdk#readme).

<div class="border-text">
  <img src="{{base_path}}/assets/img/logo/react-logo.svg" alt="React" width=50><br>
  <a href="{{base_path}}/get-started/try-samples/qsg-spa-react">Try out the sample app</a>
</div>

## Prerequisites
- [Install npm and node](https://www.npmjs.com/get-npm){:target="_blank"} in your local environment.
- [Register an application]({{base_path}}/guides/applications/register-single-page-app/) in the {{ product_name }}.

!!! note
    In the tutorial,

    - your organization name is referred to as `{org_name}`.
    - `{client_id}` refers to the client credential that you obtain once you register your application in the {{ product_name }}.

## Install the SDK

Run the following command to install the React SDK and the necessary dependencies from the npm registry.

```bash
npm install @asgardeo/auth-react react-router-dom --save
```

!!! note
    The `react-router-dom` package is a peer-dependency of the SDK and it is required for the SDK to work. We are working on making it optional.

## Configure the SDK

SDK uses the [React Context API](https://react.dev/learn/passing-data-deeply-with-context) under the hood to share the data between components.
You can easily integrate the {{ product_name }} in your application by using `AuthProvider` as the wrapper element to inject configurations.

`AuthProvider` will provide the session state which contains information such as the authenticated user's display name, email address etc. as well as the methods required to implement authentication in the React app.

```js
import { AuthProvider } from "@asgardeo/auth-react";
```
`AuthProvider` takes a config object as a [prop](https://react.dev/learn/passing-props-to-a-component) which is used to initialize the SDK instance. Copy and use the following code within your root component to configure `AuthProvider` for your application.

!!! note
    Typically, the root component of a react app is defined in the `index.*` file.

``` js
import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
     signInRedirectURL: "https://localhost:3000/sign-in",
     signOutRedirectURL: "https://localhost:3000/sign-out",
     clientID: "{client_id}",
     baseUrl: "https://localhost:9443",
     scope: [ "openid","profile" ]
};

export const MyApp = (): ReactElement => {
    return (
        <AuthProvider config={ config }>
            <App />
        </AuthProvider>
    )
}
```
Details of the parameters are given below.

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>clientID</code></td>
    <td>This is the Client ID of your OIDC app. See <a href="{{base_path}}/guides/applications/register-single-page-app/#get-the-client-id">how to obtain client ID</a>.</td>
  </tr>
  <tr>
    <td><code>baseUrl</code></td>
    <td>This is the {{ product_name }}'s URL in the form <code>https://{host}:{port}</code>.</td>
  </tr>
  <tr>
    <td><code>signInRedirectURL</code></td>
    <td>This is the URL the app redirects to after user login. See <a href="{{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls">Authorized redirect URLs</a></td>
  </tr>
  <tr>
    <td><code>signOutRedirectURL</code></td>
    <td>This is the URL the app redirects to after user logout. See <a href="{{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls">Authorized redirect URLs</a></td>
  </tr>
  <tr>
    <td><code>scope</code></td>
    <td>The list of OIDC scopes that are used for requesting user information. The <code>openid</code> scope is mandatory to get the ID token. You can add other OIDC scopes such as <code>profile</code> and <code>email</code>.</td>
  </tr>
</table>

## Access the session state

The ```useAuthContext()``` hook provided by the SDK could be used to access the session state that contains information such as the email address of the authenticated user and to access the methods that are required for implementing authentication.

!!! note
    Once the root component is wrapped with `AuthProvider`, `useAuthContext()` hook can be used anywhere within the application.

Use the below code segment to import the ```useAuthContext()``` hook from ```@asgardeo/auth-react```.

```js 
import { useAuthContext } from "@asgardeo/auth-react";
```
And then inside your components, you can access the context as follows.  

```js 
const { state, signIn, signOut } = useAuthContext();
```
Few common methods that you can access with `useAuthContext()` are listed below. These will be helpful when implementing authentication capabilities in your application.

- `state` object - This will contain attributes such as whether a user is currently logged in, the username of the currently logged-in user etc.

- `signIn` - Initiate a login request to the {{ product_name }}, process the response to obtain authentication response.

- `signOut` - Logout the user from the {{ product_name }} and clear any authentication data from the SDK storage.

- `isAuthenticated` - Check whether there is an authenticated user session. Based on the result you can decide to change the application view/behaviour.

- `getBasicUserInfo` - Get authenticated user's basic information from the authentication response.

- `getDecodedIDToken` - Get the decoded `id_token` obtained in the authentication response. From there you can derive more information such as additional user-attributes.

- `getIDToken` - Get the `id_token` (JWT) obtained in the authentication response.

- `getAccessToken` - Get the `access_token` obtained in the authentication response.

- `refreshAccessToken` - Get the `refresh_token` obtained in the authentication response.

!!! note
    Methods related to the token such as `getIDToken`, `getDecodedIDToken`, `getAccessToken` and `refreshAccessToken` are only available if the storage mechanism is set to `sessionStorage` or `localStorage` in the SDK configuration.
    If it is set to `webWorker`, an error is thrown since the token is stored inside the web worker and cannot be accessed by outside party.

## Use the API

You can now start using the SDK's API to implement the required authentication logic. Follow the instructions given below to implement each use case.

### Access the `state` object
The `state` object contains attributes of a user. Its structure is as follows.

``` js
{
    "allowedScopes": "openid profile",
    "displayName": "alica",
    "isAuthenticated": true,
    "isLoading": false,
    "sub": "d33ab8c0-1234-4567-7890-b5c3619cb356",
    "username": "alica@bifrost.com",
    "isSigningOut": false
}
```
!!! note
    The `isAuthenticated` attribute checks whether a user is currently logged in via the {{ product_name }} or not.

### Add login to your application
You can use the `useAuthContext` hook from the React SDK to easily authenticate your React application.

Implement a login button as follows using the `signIn()` function in the `useAuthContext` hook.

```js 
<button onClick={ () => signIn() }>Login</button>
```
Clicking on the **Login** button will take the user to the the {{ product_name }} login page. Once `signIn()` succeeds, the user will be redirected to the app (based on the `signInRedirectURL` specified in the [AuthProvider configuration](#configure-the-sdk)) and the `state.isAuthenticated` will be set to `true`.

### Get access token

Once the user is logged in, the application can get the access token issued by the {{ product_name }} .

See the [SDK reference](https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md#getaccesstoken) for more information.

``` js
const { getAccessToken } = useAuthContext();

useEffect(() => {
    getAccessToken().then((accessToken) => {
        //console.log(accessToken);
    }).catch((error) => {
        //console.log(error);
    });
}, []);
```

Sample access token is given below:

``` 
61985b0e-26c3-38b7-acff-b18ad934eafc
```

### Get user information

In addition to implementing login and logout, you can also use the SDK to get user information.

There are two ways for you to get user information:
- Get user information from a [decoded ID token](#get-decoded-id-token).
- Use the `getBasicUserInfo()` API and get basic user information.

`getBasicUserInfo()` can be used as follows.

``` ts
const { getBasicUserInfo } = useAuthContext();
  
getBasicUserInfo().then((basicUserDetails) => {
    console.log(basicUserDetails);
}).catch((error) => {
    // Handle the error
})
```

`basicUserDetails` object will have a structure similar to below:

```json 
{
    "allowedScopes": "openid",
    "sessionState": "eb0e12f9a113f49ffef887a464c7980d84bb5b11dfeb1774309aee9b88c83c21.8-LXzzHCUSOOa2GeH-LFfA",
    "username": "alica@bifrost.com",
    "country": "Sri Lanka",
    "email": "alica@bifrost.com"
}
```

You can get additional information from the user by [requesting user information using scopes]({{base_path}}/guides/users/attributes/manage-scopes/#use-scopes-to-request-attributes)

### Get decoded ID token

Once the user is logged in, the application can get the ID token issued by the {{ product_name }}.

The SDK provides the `getDecodedIDToken()` API to get the decoded token. You can use this decoded token to obtain user claims as below.

``` ts
const { getDecodedIDToken } = useAuthContext();

getDecodedIDToken().then((decodedIDToken) => {
    console.log(decodedIDToken);
}).catch((error) => {
    // Handle the error
})
```

**Sample decoded ID token** object is given below:

```json 
{
    "isk": "329d5bf5732791509edabb093d78a4a2665dbc65d99119f45f1d4db1a2459cf1",
    "at_hash": "TN1HIyOnt_8shS2DalrdfQ",
    "sub": "alica@bifrost.com",
    "country": "Sri Lanka",
    "amr": [
        "BasicAuthenticator"
    ],
    "iss": "https://localhost:9443/oauth2/token",
    "sid": "81a61d37-9a6d-487a-8f5f-c7a313c44c31",
    "aud": "SmLpPiRube64JmkAf4nhZVD_6V8a",
    "c_hash": "1pWTMQ7ZTxCWSapucJF-bw",
    "nbf": 1627966715,
    "azp": "SmLpPiRube64JmkAf4nhZVD_6V8a",
    "exp": 1627970315,
    "iat": 1627966715,
    "email": "alica@bifrost.com"
}
```

From the decoded ID Token(`decodedIDToken`) object, you can get the following information:

<table>
   <tbody>
      <tr>
         <td><b>sub</b></td>
         <td><code>decodedIDToken.sub</code></td>
      </tr>
      <tr>
           <td><b>email</b></td>
           <td><code>decodedIDToken.email</code></td>
      </tr>
      <tr>
         <td><b>country</b></td>
         <td><code>decodedIDToken.country</code></td>
    </tr>
   </tbody>
</table>  

You can loop through the `decodedIDToken` object and get the other claims as well.

### Add logout to your application
We can use the `signOut()` method from `useAuthContext()` hook to implement a logout button.

```js 
<button onClick={ () => signOut() }>Logout</button>
```
Clicking on the **Logout** button will sign out the user. The user will then be redirected to the `signOutRedirectURL` (specified in the [AuthProvider configuration](#configure-the-sdk)) and the `state.isAuthenticated` will be set to `false`.

!!! tip
    You can use the `state.isAuthenticated` attribute to check the authentication status of the user.

### Add Routing
If your application needs routing, the SDK provides a component called ``SecureRoute``, which is implemented with ``react-router-dom``. This component allows you to easily secure your routes with the {{ product_name }}. You can learn more about routing [here](https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md#securing-routes-with-asgardeo).


## More Information
If you want to learn in-depth about the React SDK, you can refer to the [React SDK documentation](https://github.com/asgardeo/asgardeo-auth-react-sdk#readme).
