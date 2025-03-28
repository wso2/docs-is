---
template: templates/complete-guide.html
heading: Securing Routes within the app
read_time: 2 min
---

In a Vue app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, let’s look at how we can secure routes using Asgardeo Vue SDK.

The Asgardeo SDK provides multiple approaches to secure routes in your application. Here we will demonstrate how to secure routes in a single-page Vue app using [Vue Router](https://router.vuejs.org/){:target="\_blank"}, the official routing library for Vue.

## Securing Routes with `beforeEnter`

You can secure routes using the `beforeEnter` navigation guard, ensuring that only authenticated users can access specific routes.

### Example Implementation

Below is an example of securing routes using `beforeEnter` with Asgardeo Vue SDK:

```typescript
import { useAsgardeo, type AuthStateInterface } from "@asgardeo/vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext,
  type Router,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandingView from "@/views/LandingView.vue";
import { watch } from "vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: LandingView,
      name: "landing",
      path: "/",
    },
    {
      beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        const { state, isAuthenticated, signIn } = useAsgardeo();

        // Wait for loading to complete if still in progress
        if (state.isLoading) {
          await waitForAsgardeoLoaded(state);
        }

        try {
          const auth = await isAuthenticated();
          if (!auth) {
            await signIn();
            return false; // Prevent navigation until sign-in completes
          }
          return true;
        } catch {
          return false; // Prevent navigation on error
        }
      },
      component: HomeView,
      name: "home",
      path: "/home",
    },
  ],
});

/**
 * Wait for Asgardeo loading state to complete before proceeding
 * @param state - The Asgardeo state containing isLoading property
 * @returns A promise that resolves when loading is complete
 */
async function waitForAsgardeoLoaded(state: AuthStateInterface) {
  return new Promise<void>((resolve) => {
    // If already not loading, resolve immediately
    if (!state.isLoading) {
      resolve();
      return;
    }

    // Watch for changes in loading state
    const unwatch = watch(
      () => state.isLoading,
      (isLoading) => {
        if (!isLoading) {
          unwatch();
          resolve();
        }
      },
    );
  });
}

export default router;
```

## How it Works

1. `beforeEnter` is used as a navigation guard on protected routes.
2. It checks the Asgardeo authentication state before allowing access.
3. If the user is not authenticated, they are redirected to the login flow.
4. The `waitForAsgardeoLoaded` function ensures that authentication state is checked only after Asgardeo has completed loading.

This method provides a flexible and robust way to protect routes while leveraging Asgardeo Vue SDK’s capabilities.

Next, we will explore how to access a protected API from our Vue app, a common requirement for SPAs.

