Use `createAsgardeoGuard()` to keep signed-out users away from pages of your Vue Router app. It returns a Vue Router navigation guard that lets signed-in users through and redirects everyone else.

## Protect a route

Add the guard to the `beforeEnter` option of the routes you want to protect.

```javascript title="src/router.js"
import { createRouter, createWebHistory } from 'vue-router'
import { createAsgardeoGuard } from '@asgardeo/vue'
import Home from './pages/Home.vue'
import Dashboard from './pages/Dashboard.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: createAsgardeoGuard({ redirectTo: '/' }),
    },
  ],
})
```

To protect every route, register the guard globally with `router.beforeEach(createAsgardeoGuard({ redirectTo: '/' }))`, and make sure the `redirectTo` page doesn't redirect back to itself.

The guard reads the authentication state of the mounted `<AsgardeoProvider>`, so render your `<router-view>` inside the provider. The first navigation can run before the provider mounts and the SDK finishes initializing. By default, the guard waits for that before it decides.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `redirectTo` | `string` | `'/'` | Where to send users who aren't signed in. |
| `waitForInit` | `boolean` | `true` | Wait for the provider to mount and the SDK to initialize before checking the user. When `false`, the guard redirects if the SDK isn't ready yet. |
| `initTimeout` | `number` | `10000` | How long to wait, in milliseconds, before redirecting when the SDK isn't ready. |

## Send signed-out users to sign-in

To start sign-in instead of showing a page, redirect to a page that calls `signIn()` from [`useAsgardeo()`]({{base_path}}/sdks/vue/composables/use-asgardeo/), or that renders [`SignInButton`]({{base_path}}/sdks/vue/components/action-components/sign-in-button/).

!!! note
    The guard only controls navigation in the browser. Protect the data itself on your server, for example by validating the access token in your API.
