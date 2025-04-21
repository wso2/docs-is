---
template: templates/complete-guide.html
heading: Add login and logout to your app
read_time: 2 min
---

Next, let's implement login and logout for our Vue app. Asgardeo provides a composable, `useAsgardeo()`, to conveniently access user authentication data and utility functions.

`useAsgardeo` composable gives you access to two key functions to perform sign in and sign out in your Vue application, `signIn` and `signOut` respectively. You can directly invoke these functions to trigger sign-in and sign-out requests.

Update your component with the following code:

```vue
<script setup lang="ts">
import { useAsgardeo } from "@asgardeo/vue";

const { signIn, signOut, state } = useAsgardeo();
</script>

<template>
  <div>
    <div v-if="state.isAuthenticated">
      <button @click="signOut">Logout</button>
    </div>
    <div v-else>
      <button @click="signIn">Login</button>
    </div>
  </div>
</template>
```

Let's look into the underlying details of what's happening here.

The `authConfig` object holds the configuration necessary for connecting the app to {{product_name}}. It includes properties like `signInRedirectURL` and `signOutRedirectURL`, which determine where users are redirected after signing in or out. The `clientID` identifies the application, and `baseUrl` specifies the Asgardeo API endpoint specific to your organization. The scope array lists the OAuth 2.0 permissions the app requires, such as `openid` and `profile`.

The component leverages the `useAsgardeo` composable to access the authentication state (`state`) and actions (`signIn` and `signOut`). The template conditionally renders login or logout buttons based on whether the user is authenticated.

Save the changes and re-run the application in development mode if it is not running already.

```bash
npm run dev
```

Once the application is started, you will see the homepage of the application with the changes we made.

![Login screen]({{base_path}}/complete-guides/vue/assets/img/image6.png){: width="800" style="display: block; margin: 0;"}

Initiate Sign In
Clicking on the login button will initiate an OIDC request. You will be able to observe the authorize request in the browser devtools as follows. To see this, right click on the application and click inspect and switch to the network tab. In the filter input, type "authorize", and click on the sign in button.

![OIDC request]({{base_path}}/complete-guides/vue/assets/img/image10.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    The OpenID Connect specification offers several functions, known as grant types, to obtain an access token in exchange for user credentials. This example uses the authorization code grant type. In this process, the app first requests a unique code from the authentication server, which can later be used to obtain an access token. For more details on the authorization code grant type, please refer to the [Asgardeo documentation.](https://wso2.com/asgardeo/docs/guides/authentication/oidc/implement-auth-code-with-pkce/){:target="_blank"}

Asgardeo will receive this authorization request and respond by redirecting the user to a login page to enter their credentials.

![OIDC request]({{base_path}}/complete-guides/vue/assets/img/image16.png){: width="800" style="display: block; margin: 0;"}

At this stage, **you need to create a [test user in Asgardeo](https://wso2.com/asgardeo/docs/guides/users/manage-users/#onboard-users){:target="\_blank"} to try out the application.** Once you create a test user, you can enter the username and password of the test user to the login screen.

If the login is successful, you should be able to see the application as shown below.

![Login flow]({{base_path}}/complete-guides/vue/assets/img/image1.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    **PKCE (Proof Key for Code Exchange)**  is an addition to the OAuth2 specification to make the authorization code more immune to replay attacks. It is enabled by default for public clients such as our single page Vue application.

    If you want to disable PKCE for some reason, you can do so via following the steps below. **However, disabling PKCE for public clients such as our single page Vue app is highly discouraged.**

    1. Log in to the {{product_name}} console and select the application you created.
    2. Switch to the Protocol tab.
    3. Uncheck the Mandatory checkbox under PKCE section.

In this section, we have added login and logout features to our Vue app. In the next step, we will look into how to access the user attributes of the logged in user.
