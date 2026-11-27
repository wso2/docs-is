With the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`), you can protect pages so that only signed-in users can open them, and protect your server API routes so that only signed-in users can call them. Protect both: page protection controls navigation, while server route protection controls access to data.

## Protect a page

Add the SDK's named [`auth` middleware]({{base_path}}/sdks/nuxt/middleware/auth/) to the page with `definePageMeta()`.

{% raw %}

```vue title="pages/dashboard.vue"
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <h1>Dashboard</h1>
  <AsgardeoUser>
    <template #default="{ user }">
      <p>Signed in as {{ user.displayName }}</p>
    </template>
  </AsgardeoUser>
</template>
```

{% endraw %}

Open `http://localhost:3000/dashboard` while signed out. The middleware redirects you to the {{product_name}} sign-in page. After you sign in, you return to `/dashboard`.

## Protect a group of pages

To protect every page under a path, create a global middleware that runs the SDK's middleware for matching paths.

```ts title="middleware/protect-dashboard.global.ts"
const protect = defineAsgardeoMiddleware();

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/dashboard' || to.path.startsWith('/dashboard/')) {
    return protect(to, from);
  }
});
```

To send signed-out users to your own sign-in page instead, pass `redirectTo`. See [`defineAsgardeoMiddleware()`]({{base_path}}/sdks/nuxt/middleware/define-asgardeo-middleware/).

## Show content only to signed-in users

Use [`<AsgardeoSignedIn>`]({{base_path}}/sdks/nuxt/components/control-components/signed-in/) and [`<AsgardeoSignedOut>`]({{base_path}}/sdks/nuxt/components/control-components/signed-out/) to show different content on the same page.

```vue title="components/AppHeader.vue"
<template>
  <AsgardeoSignedOut>
    <AsgardeoSignInButton />
  </AsgardeoSignedOut>
  <AsgardeoSignedIn>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    <AsgardeoUserDropdown />
  </AsgardeoSignedIn>
</template>
```

These components only hide content. Anyone can still request the page's data from your server, so protect your server routes too.

## Protect a server API route

Call `requireServerSession()` from `@asgardeo/nuxt/server` at the start of the route. It returns the session, or responds with `401` if the request has no valid session.

```ts title="server/api/reports.get.ts"
import { requireServerSession } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const session = await requireServerSession(event);

  return getReportsForUser(session.sub);
});
```

### Check scopes and organizations

The session contains the granted scopes and the organization the user is acting in. Check them on the server to authorize the request.

```ts title="server/api/admin/users.get.ts"
import { requireServerSession } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const session = await requireServerSession(event);
  const scopes = session.scopes.split(' ');

  if (!session.organizationId || !scopes.includes('internal_org_user_mgt_view')) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  return listUsers(session.organizationId);
});
```

See [Server utilities]({{base_path}}/sdks/nuxt/server/server-utilities/) for all session helpers.
