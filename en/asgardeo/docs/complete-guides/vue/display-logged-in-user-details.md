---
template: templates/complete-guide.html
heading: Display logged-in user details
read_time: 3 min
---

At this point, we've successfully implemented login and logout capabilities using the Asgardeo Vue SDK. The next step is to explore how to access and display logged-in user details within the app. The Asgardeo Vue SDK loads the basic user attribute details into the authentication state so that you can directly access those from the state (such as `state.username`) and use them in the application. First, let's try to display the username using `state.username`. Replace the code in your component with the following:

```javascript
{% raw %}
<script setup lang="ts">
import { useAsgardeo } from "@asgardeo/vue";

const auth = useAsgardeo();
const { signIn, signOut, state } = auth;
</script>

<template>
  <div>
    <div v-if="state.isAuthenticated">
      <p>Welcome, {{ state.username }}</p>
      <button @click="signOut">Logout</button>
    </div>
    <div v-else>
      <button @click="signIn">Login</button>
    </div>
  </div>
</template>
{% endraw %}
```

If your Vue application is already running in development mode, the home page will be reloaded, and you will see the updated user interface.

![Logout screen]({{base_path}}/complete-guides/vue/assets/img/image1.png){: width="800" style="display: block; margin: 0;"}

There may be instances where you'd need to retrieve user attributes outside Vue components. The Asgardeo Vue SDK provides a `getBasicUserInfo` function, which allows you to retrieve the authenticated user's basic information. The code example in the following section demonstrates this process and can be adapted to fit your application with any necessary customizations.

Again, replace the code in your component with the following:

```javascript
{% raw %}
<script setup lang="ts">
import { useAsgardeo } from "@asgardeo/vue";
import { ref, watch } from "vue";

const auth = useAsgardeo();
const { signIn, signOut, state, getBasicUserInfo } = auth;
const userInfo = ref(null);

watch(
  () => state.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      try {
        userInfo.value = await getBasicUserInfo();
      } catch (error) {
        console.error(error);
      }
    }
  },
  { immediate: true }
);
</script>

<template>  
  <div>
    <div v-if="state.isAuthenticated">
      <p>Welcome, {{ userInfo?.username }}</p>
      <button @click="signOut">Logout</button>
    </div>
    <div v-else>
      <button @click="signIn">Login</button>
    </div>
  </div>
</template>
{% endraw %}
```

In the above code snippet, the app utilizes the `useAsgardeo` composable to access the authentication state and methods such as `getBasicUserInfo`, `signIn`, and `signOut`. It also uses Vue's `ref` to store basic user information and `watch` to fetch this information whenever the authentication state changes. If the user is authenticated, the app displays a welcome message with the username and a button to log out. If the user is not authenticated, it shows a login button that triggers the sign-in process. Errors during user info retrieval are handled by logging them to the console.

Similarly, you can access other user attributes, such as email, display name, allowed scopes, etc. The following code snippet shows how you can access them in your app. The Asgardeo Vue SDK is responsible for processing the ID token and decoding these attributes.

```javascript
{% raw %}
<p>Your email: {{ userInfo?.email }}</p>
<p>Display name: {{ userInfo?.displayName }}</p>
<p>Allowed scopes: {{ userInfo?.allowedScopes }}</p>
<p>Tenant domain: {{ userInfo?.tenantDomain }}</p>
<p>Session state: {{ userInfo?.sessionState }}</p>
{% endraw %}
```

## Getting additional user attributes

Other than the above attributes decoded and available to you by default, the Asgardeo Vue SDK provides the `getDecodedIDToken` method to access any other user attributes that are not exposed by `getBasicUserInfo`. This method will decode the ID token in browser storage and return the output as a JSON object.

To get additional user attributes in the ID token, the application should be configured to request specific user attributes at the time of login. For example, if you want to retrieve a user's mobile number as an attribute, you need to configure the application to request the user's mobile number as an attribute in the ID token.

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab.
3. Select the **phone** scope.
4. Expand the scope, and you will see that all attributes under this scope (e.g., `mobile_number`) are selected.
5. Click **Update** to save the changes.

```javascript
{% raw %}
<script setup lang="ts">
import { useAsgardeo } from "@asgardeo/vue";
import { ref, watch } from "vue";

const auth = useAsgardeo();
const { signIn, signOut, state, getDecodedIDToken } = auth;

const mobileNumber = ref("");

watch(
  () => state.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      try {
        const decodedIdToken = await getDecodedIDToken();
        console.log(decodedIdToken);
        mobileNumber.value = decodedIdToken.phone_number;
      } catch (error) {
        console.error(error);
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <p>Your mobile number: {{ mobileNumber }}</p>
  </div>
</template>
{% endraw %}
```

In the above code snippet, we run the `getDecodedIDToken` method if the user is authenticated and print the output to the browser console. The decoded ID token response will be printed to the browser console as follows:

![ID token]({{base_path}}/complete-guides/vue/assets/img/image7.png){: width="800" style="display: block; margin: 0;"}

In this step, we further improved our Vue app to display the user attributes. As the next step, we will try to secure routes within the app.
