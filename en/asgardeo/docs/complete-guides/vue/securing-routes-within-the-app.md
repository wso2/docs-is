---
template: templates/complete-guide.html
heading: Securing Routes within the app
read_time: 2 min
---

In a Vue app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, let’s look at how we can secure routes using Asgardeo Vue SDK.

The Asgardeo SDK provides multiple approaches to secure routes in your application. Here we will demonstrate how to secure routes in a single-page Vue app using [Vue Router](https://router.vuejs.org/){:target="\_blank"}, the most popular routing library for Vue.

## Using `authGuard`

The Asgardeo Vue SDK provides a built-in `authGuard` function that ensures only authenticated users can access certain routes. This eliminates the need for developers to manually create authentication guards.

### Example Implementation

Simply use `authGuard` in your Vue Router configuration:

```javascript
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@asgardeo/vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authGuard, // Protect this route
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

## How it Works

1. `authGuard` is provided by the Asgardeo Vue SDK and handles authentication checks.
2. If the user is authenticated, navigation proceeds.
3. If the user is not authenticated, they are redirected to the login page (`/login`).

This approach simplifies route protection in your Vue application while leveraging Asgardeo Vue SDK’s built-in capabilities.

Next, we will explore how to access a protected API from our Vue app, a common requirement for SPAs.

