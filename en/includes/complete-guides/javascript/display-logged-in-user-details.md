

At this point, we’ve successfully implemented login and logout capabilities using the Asgardeo Javascript SDK. The next step is to explore how to access and display logged-in user details within the app. The Asgardeo Javascript SDK loads the basic user attribute details, so that you can directly access those from a variable(such as `user.username`) and use them in the application.

There may be instances where you’d need to retrieve user attributes outside Javascript components. Asgardeo Javascript SDK provides a [getBasicUserInfo](https://github.com/asgardeo/asgardeo-auth-spa-sdk?tab=readme-ov-file#getbasicuserinfo){:target="_blank"} method, which allows you to retrieve the authenticated user’s basic information. The code example in the following section demonstrates this process and can be adapted to fit your application with any necessary customizations.

Replace the existing code of `main.js` file with the following given code. Alternatively, you can add highlighted two lines into your existing code of `main.js`  file. 

```javascript title="src/main.js" hl_lines="26 36"

import { AsgardeoSPAClient, SPAUtils } from "@asgardeo/auth-spa";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "<your-app-client-id>",
  baseUrl: "https://api.asgardeo.io/t/sagaraorg",
  scope: ["openid", "profile"]
});

(async () => {
  let user = undefined;

  if (SPAUtils.hasAuthSearchParamsInURL()) {
    user = await auth.signIn({ callOnlyOnRedirect: true });
  } else {
    user = await auth.trySignInSilently();
  }

  if (user) {
    document.getElementById("authenticated-view").style.display = "block";
    document.getElementById("unauthenticated-view").style.display = "none";
    document.getElementById("username").innerHTML = "Welcome " + user.username;
  } else {
    document.getElementById("authenticated-view").style.display = "none";
    document.getElementById("unauthenticated-view").style.display = "block";
  }
})();

document.querySelector('#app').innerHTML = `
  <div>
    <div id="authenticated-view" style="display: none">
      <p id="username"></p>
      <button id="logout">Log Out</button>
    </div>
    <div id="unauthenticated-view" style="display: none">
      <button id="login">Log In</button>
    </div>
  </div>
`;

document.getElementById("login").addEventListener("click", async () => {
  auth.signIn();
});

document.getElementById("logout").addEventListener("click", async () => {
  auth.signOut();
});


```
In the above code snippet, the app utilizes the app instance to access authentication state and methods such as `getBasicUserInfo`, `signIn`, and `signOut`. If the user is authenticated, the app displays a welcome message with the username and a button to log out. If the user is not authenticated, it shows a login button that triggers the sign-in process, and the errors during user info retrieval are handled by logging them to the console.

If your JavaScript app is already running in the development mode, the home page will be reloaded and you will see the updated user interface.

![Logout screen]({{base_path}}/assets/img/complete-guides/javascript/image18.png){: width="800" style="display: block; margin: 0;"}


Similarly, you can access the other user attributes, such as email, display name, allowed scopes, etc as well. The following code snippet shows you how you can access them in your app.  Asgardeo Javascript SDK is responsible for processing the ID token and decoding these attributes. 

```javascript
    document.getElementById("scope").innerHTML = user.allowedScopes;
    document.getElementById("session").innerHTML = user.sessionState;
    document.getElementById("orgName").innerHTML = user.orgName;

```

## Getting additional user attributes

Other than the above attributes decoded and available to you by default, Asgardeo Javascript SDK provides [getDecodedIDToken](https://github.com/asgardeo/asgardeo-auth-spa-sdk?tab=readme-ov-file#getdecodedidtoken){:target="_blank"}  method to access any other user attributes that are not exposed by `getBasicUserInfo`. This method will decode the ID token in browser storage and return the output as a JSON object.

To get additional user attributes to the ID token, the application should be configured to request the specific user attributes at the time of login. For example, if you want to retrieve a user's mobile number as an attribute, you need to configure the application to request the user’s mobile number as an attribute in the ID token.

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab.
3. Select the **phone** scope.
4. Expand the scope, and you will see that all attributes under this scope (e.g., `mobile_number`) are selected.
5. Click Update to save the changes.

```javascript

auth.getDecodedIDToken().then((idToken) => {
 var decodedIdToken = idToken;
 console.log(decodedIdToken);

 // Get claims from the decoded idtoken
 var phone = decodedIdToken.phone_number;
 console.log(phone);
});


```

In the above code snippet, we run the `getDecodedIDToken` method if the user is authenticated, and print the output to the browser console. The decoded ID token response will be printed to the browser console as follows.

![ID token]({{base_path}}/assets/img/complete-guides/javascript/image19.png){: width="800" style="display: block; margin: 0;"}

In this step, we further improved our JavaScript app to display the user attributes. As the next step, we will try to secure routes within the app.
