Once the user signs in, call APIs that require their access token in one of two ways. Both use [`useAsgardeo()`]({{base_path}}/sdks/vue/composables/use-asgardeo/), so call them from components rendered inside `<AsgardeoProvider>`.

## Use the SDK's HTTP client

`http.request()` sends a request with the user's access token in the `Authorization` header. The following component reads the user's profile from the {{product_name}} SCIM 2.0 `/scim2/Me` endpoint once the user is signed in.

{% raw %}

```vue title="src/components/MyProfile.vue"
<script setup>
import { ref, watch } from 'vue'
import { useAsgardeo } from '@asgardeo/vue'

const { http, isSignedIn, baseUrl } = useAsgardeo()
const profile = ref(null)

watch(isSignedIn, async (signedIn) => {
  if (!signedIn) return

  const response = await http.request({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json'
    },
    method: 'GET',
    url: `${baseUrl}/scim2/Me`
  })

  profile.value = response.data
}, { immediate: true })
</script>

<template>
  <pre v-if="profile">{{ JSON.stringify(profile, null, 2) }}</pre>
</template>
```

{% endraw %}

To send several requests in parallel, pass an array of request configurations to `http.requestAll()`. It resolves to an array of responses, in the same order, when all of them complete.

```javascript
const [applications, me] = await http.requestAll([
  { method: 'GET', url: `${baseUrl}/api/users/v1/me/applications` },
  { method: 'GET', url: `${baseUrl}/scim2/Me` }
])
```

!!! note
    If you set `storage` to `webWorker` on `<AsgardeoProvider>`, the access token stays inside the web worker and `http.request()` is the only way to call protected APIs. In that mode, the SDK only sends requests to `baseUrl`.

## Use your own HTTP client

With any other storage option, read the access token with `getAccessToken()` and add it to your requests.

```vue title="src/components/Orders.vue"
<script setup>
import { useAsgardeo } from '@asgardeo/vue'

const { getAccessToken } = useAsgardeo()

const loadOrders = async () => {
  const accessToken = await getAccessToken()

  const response = await fetch('https://api.example.com/orders', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  console.log(await response.json())
}
</script>

<template>
  <button @click="loadOrders">Load orders</button>
</template>
```

!!! tip
    To call {{product_name}} APIs such as `/scim2/Me`, the access token needs the `internal_login` scope. The SDK requests it by default. If you set `scopes` yourself, include it.
