
Next, let’s add some code to implement login and logout links for our Javascript app. The `AsgardeoSPAClient` provides `signIn` and `signOut` methods and access to the authentication state. 

```javascript title="src/main.js" hl_lines="1 14-30 32-41 43-49"

import { AsgardeoSPAClient, SPAUtils } from "@asgardeo/auth-spa";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "RNCTsWN50MyqiQpFuWFjifJdIcIa",
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

The `auth.initialize` holds the configuration necessary for connecting the app to {{product_name}}. It includes properties like `signInRedirectURL` and `signOutRedirectURL`, which determine where users are redirected after signing in or out. The `clientID` identifies the application, and `baseUrl` specifies the {{product_name}} API endpoint specific to your organization. The scope array lists the OAuth 2.0 permissions the app requires, such as `openid` and `profile`. 

The application uses the auth Asgardeo SPA Client instance to access the authentication state  and methods (`signIn` and `signOut`). Inside the index.html, the app conditionally renders a login or logout button based on whether the user is authenticated. If the user is authenticated, a "Logout" button is shown that triggers the signOut function. Otherwise, a "Login" button appears, which initiates the signIn process.

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

At this stage, you should have already created a test user in {{product_name}}, as outlined in the [prerequisites]({{ base_path }}/complete-guides/react/prerequisites) section. Now can enter the username and password of the test user to the login screen.


If the login is successful, you should be able to see the application as shown below.

![Login flow]({{base_path}}/assets/img/complete-guides/javascript/image17.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    **PKCE (Proof Key for Code Exchange)**  is an addition to the OAuth2 specification to make the authorization code more immune to replay attacks. It is enabled by default for public clients such as our single page JavaScript application. 
    
    If you want to disable PKCE for some reason, you can do so via following the steps below. **However, disabling PKCE for public clients such as our single page JavaScript app is highly discouraged.**  

    1. Log in to the {{product_name}} console and select the application you created.
    2. Switch to the Protocol tab.
    3. Uncheck the Mandatory checkbox under PKCE section.

In this section, we have added login and logout features to our JavaScript app. In the next step, we will look into how to access the user attributes of the logged in user.
