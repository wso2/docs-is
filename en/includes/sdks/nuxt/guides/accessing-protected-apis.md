The {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) keeps the user's tokens in a signed, HTTP-only session cookie on the server. To call an API that requires an access token, call it from a Nuxt server route with `getValidAccessToken()`, or get the token in the browser with `useAsgardeo().getAccessToken()`.

## Call the API from a server route

This is the recommended approach, because the access token never reaches the browser. Your page calls your own server route, and the server route calls the protected API.

The following server route calls the {{product_name}} SCIM2 `/Me` endpoint, which requires an access token.

```ts title="server/api/me.get.ts"
import { getValidAccessToken } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const accessToken = await getValidAccessToken(event);

  return $fetch('{{content.sdkconfig.baseUrl}}/scim2/Me', {
    headers: {
      Accept: 'application/scim+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
});
```

`getValidAccessToken()` reads the access token from the session. If the token expires within 60 seconds, it refreshes the token and updates the session cookie. If there's no valid session, or the token can't be refreshed, it throws a `401` error. See [Server utilities]({{base_path}}/sdks/nuxt/server/server-utilities/).

Then call the server route from a page.

{% raw %}

```vue title="pages/me.vue"
<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { data: me, error } = await useFetch('/api/me');
</script>

<template>
  <p v-if="error">Couldn't load your profile.</p>
  <pre v-else>{{ me }}</pre>
</template>
```

{% endraw %}

When `useFetch()` runs during server-side rendering, Nuxt forwards the browser's cookies to the server route, so the route can read the session.

!!! tip
    The access token includes only the scopes that the user granted. The SDK requests `openid`, `profile`, and `internal_login` by default. Add the scopes that your API needs with the `scopes` module option. See [Module configuration]({{base_path}}/sdks/nuxt/configuration/module-configuration/#scopes).

## Get the access token in the browser

If you need to call an API directly from the browser, get the access token with `useAsgardeo().getAccessToken()`. It fetches the token from the SDK's `GET /api/auth/token` route, which refreshes the token when it's about to expire.

```vue title="components/OrdersButton.vue"
<script setup lang="ts">
const { getAccessToken } = useAsgardeo();

const loadOrders = async () => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    // Not signed in, or the token couldn't be refreshed.
    return;
  }

  const orders = await $fetch('https://api.example.com/orders', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log(orders);
};
</script>

<template>
  <button @click="loadOrders">Load orders</button>
</template>
```

!!! note
    This approach exposes the access token to JavaScript in the browser. Prefer calling APIs from server routes when you can.
