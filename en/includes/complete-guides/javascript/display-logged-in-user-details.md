
At this point, we’ve successfully implemented login and logout capabilities using the {{product_name}} Browser SDK. The next step is to explore how to access and display logged-in user details within the app.

The SDK provides a `getUser` method that returns the authenticated user's basic information, such as `username`, taken from the ID token. The code example in the following section demonstrates this and can be adapted to fit your application with any necessary customizations.

Replace the existing code of the `main.js` file with the following code. Alternatively, you can add the highlighted lines into your existing code of the `main.js` file.

```javascript title="src/main.js" hl_lines="24 26 36"
import { AsgardeoSPAClient, hasAuthParamsInUrl } from "@asgardeo/browser";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  afterSignInUrl: "http://localhost:5173",
  afterSignOutUrl: "http://localhost:5173",
  clientId: "<your-app-client-id>",
  baseUrl: "{{content.sdkconfig.baseUrl}}"
});

(async () => {
  if (hasAuthParamsInUrl()) {
    // Complete the sign-in when {{ product_name }} redirects back with an authorization code.
    await auth.signIn({ callOnlyOnRedirect: true });
  } else if (!(await auth.isSignedIn())) {
    // Sign in silently if the user already has a session with {{ product_name }}.
    await auth.signInSilently();
  }

  if (await auth.isSignedIn()) {
    document.getElementById("authenticated-view").style.display = "block";
    document.getElementById("unauthenticated-view").style.display = "none";
    const user = await auth.getUser();

    document.getElementById("username").textContent = "Welcome " + user.username;
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

In the above code snippet, the app uses the `auth` instance to access the authentication state and methods such as `getUser`, `signIn`, and `signOut`. If the user is authenticated, the app displays a welcome message with the username and a button to log out. If the user is not authenticated, it shows a login button that triggers the sign-in process.

If your JavaScript app is already running in the development mode, the home page will be reloaded and you will see the updated user interface.

![Logout screen]({{base_path}}/assets/img/complete-guides/javascript/image18.png){: width="800" style="display: block; margin: 0;"}

Similarly, you can access the other user attributes that `getUser` returns, such as the organization the user signed in to.

```javascript
const user = await auth.getUser();

console.log(user.username);
console.log(user.org_name);
```

## Getting additional user attributes

Other than the attributes returned by `getUser`, the SDK provides the `getDecodedIdToken` method to access any other user attributes in the ID token. This method decodes the ID token in browser storage and returns its payload as a JSON object.

To get additional user attributes in the ID token, the application should be configured to request the specific user attributes at the time of login. For example, if you want to retrieve a user's mobile number as an attribute, you need to configure the application to request the user’s mobile number as an attribute in the ID token.

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab.
3. Select the **phone** scope.
4. Expand the scope, and you will see that all attributes under this scope (e.g., `mobile_number`) are selected.
5. Click Update to save the changes.

The app must also request the `phone` scope. Add it to the `scopes` option, together with the scopes the SDK requests by default:

```javascript
await auth.initialize({
  // other configs
  scopes: ["openid", "profile", "internal_login", "phone"]
});
```

Then read the claim from the decoded ID token:

```javascript
const decodedIdToken = await auth.getDecodedIdToken();

console.log(decodedIdToken);

// Get claims from the decoded ID token
const phone = decodedIdToken.phone_number;

console.log(phone);
```

In the above code snippet, we call the `getDecodedIdToken` method once the user is authenticated, and print the output to the browser console. The decoded ID token response will be printed to the browser console as follows.

![ID token]({{base_path}}/assets/img/complete-guides/javascript/image19.png){: width="800" style="display: block; margin: 0;"}

In this step, we further improved our JavaScript app to display the user attributes. As the next step, we will try to call a protected API from the app.
