
Next, let’s add some code to implement login and logout links for our JavaScript app. The `AsgardeoSPAClient` provides `signIn` and `signOut` methods, and `isSignedIn` to check the authentication state.

```javascript title="src/main.js" hl_lines="1 12-28 30-39 41-47"
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
  } else {
    document.getElementById("authenticated-view").style.display = "none";
    document.getElementById("unauthenticated-view").style.display = "block";
  }
})();

document.querySelector('#app').innerHTML = `
  <div>
    <div id="authenticated-view" style="display: none">
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

Let’s look into the underlying details of what’s happening here.

The `auth.initialize` call holds the configuration necessary for connecting the app to {{product_name}}. It includes properties like `afterSignInUrl` and `afterSignOutUrl`, which determine where users are redirected after signing in or out. The `clientId` identifies the application, and `baseUrl` specifies the {{product_name}} API endpoint specific to your organization.

When the page loads, the app first checks whether {{product_name}} has just redirected the user back with an authorization code (`hasAuthParamsInUrl()`). If so, `signIn({ callOnlyOnRedirect: true })` exchanges the code for tokens. Otherwise, if the user isn't signed in yet, `signInSilently()` checks whether they already have a session with {{product_name}} and signs them in without a redirect.

The app then uses `isSignedIn()` to decide which view to render in `main.js`. If the user is authenticated, a "Log Out" button is shown that triggers the `signOut` function. Otherwise, a "Log In" button appears, which initiates the `signIn` process.

Save the changes and re-run the application in development mode if it is not running already.

```bash
npm run dev
```

Once the application is started, you will see the homepage of the application with the changes we made.

![Login screen]({{base_path}}/assets/img/complete-guides/javascript/image14.png){: width="800" style="display: block; margin: 0;"}

Clicking on the login button will initiate an OIDC request. You will be able to observe the authorize request in the browser devtools as follows. To see this, right click on the application and click inspect and switch to the network tab. In the filter input, type “authorize”, and click on the sign in button.

![OIDC request]({{base_path}}/assets/img/complete-guides/javascript/image15.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    The OpenID Connect specification offers several functions, known as grant types, to obtain an access token in exchange for user credentials. This example uses the authorization code grant type. In this process, the app first requests a unique code from the authentication server, which can later be used to obtain an access token. For more details on the authorization code grant type, please refer to the [{{product_name}} documentation.]({{ base_path }}/guides/authentication/oidc/implement-auth-code-with-pkce/){:target="_blank"}

{{product_name}} will receive this authorization request and respond by redirecting the user to a login page to enter their credentials.

At this stage, you should have already created a test user in {{product_name}}, as outlined in the [prerequisite]({{ base_path }}/complete-guides/javascript/prerequisite) section. Now you can enter the username and password of the test user to the login screen.

If the login is successful, you should be able to see the application as shown below.

![Login flow]({{base_path}}/assets/img/complete-guides/javascript/image17.png){: width="800" style="display: block; margin: 0;"}
