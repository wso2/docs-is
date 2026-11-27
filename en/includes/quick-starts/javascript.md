# JavaScript Quickstart

Welcome to the JavaScript Quickstart guide! In this document, you will learn to build a single-page JavaScript app, add user login and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application**.
- Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    **name:** {{ product }}-javascript

    **Authorized redirect URL:** http://localhost:5173

Note down the following values from the **Protocol** tab of the registered application. You will need them to configure the {{ product_name }} Browser SDK.

- **`client-id`** from the **Protocol** tab.
- **The name of your {{ product_name }} organization**

!!! Info

    The authorized redirect URL determines where {{ product_name }} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:5173`, as the sample app will be accessible at this URL.

## Create a JavaScript app using Vite

Create (a.k.a scaffold) your new JavaScript app using Vite.

=== "npm"

    ```bash
    npm create vite@latest {{ product }}-javascript -- --template vanilla

    cd {{ product }}-javascript

    npm install

    npm run dev
    ```

=== "yarn"

    ```bash
    yarn create vite@latest {{ product }}-javascript -- --template vanilla

    cd {{ product }}-javascript

    yarn install

    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm create vite@latest {{ product }}-javascript -- --template vanilla

    cd {{ product }}-javascript

    pnpm install

    pnpm dev
    ```

## Install @asgardeo/browser

The {{ product_name }} Browser SDK (`@asgardeo/browser`) provides everything you need to integrate {{ product_name }} into a single-page app. To get started, add it to the project. Make sure to stop the dev server started in the previous step.

=== "npm"

    ```bash
    npm install @asgardeo/browser
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/browser
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/browser
    ```

## Initialize @asgardeo/browser

Replace the existing code of the `src/main.js` file with the following code to initialize the `AsgardeoSPAClient`.

!!! Important

    Replace below placeholders with your registered organization name in {{ product_name }} and the generated `client-id` from the app you registered in {{ product_name }}.

    - `<your-app-client-id>`
    - `{{content.sdkconfig.baseUrl}}`

```javascript title="src/main.js"
import { AsgardeoSPAClient } from "@asgardeo/browser";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  afterSignInUrl: "http://localhost:5173",
  afterSignOutUrl: "http://localhost:5173",
  clientId: "<your-app-client-id>",
  baseUrl: "{{content.sdkconfig.baseUrl}}"
});
```

## Add login and logout link to your app

The `AsgardeoSPAClient` provides `signIn` and `signOut` methods, and `isSignedIn` to check the authentication state. Add the following code to the `main.js` file to conditionally render a login or logout button based on whether the user is authenticated.

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

Visit your app's homepage at [http://localhost:5173](http://localhost:5173){:target="_blank"}.

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Modify the code as below to see logged in user details.

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

[//] STEPS_END
