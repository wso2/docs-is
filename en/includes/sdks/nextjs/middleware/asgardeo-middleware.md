`asgardeoMiddleware` is a Next.js middleware utility that provides authentication context and helpers for server-side route protection. It can be used for simple session validation or advanced logic by passing a handler function. It supports redirecting unauthenticated users, checking session status, and accessing session details.

## Usage

The `asgardeoMiddleware` function is designed to be used in Next.js middleware files (e.g., `middleware.ts`). It provides a way to manage authentication state and protect routes based on user sessions.

### Basic Usage

Simply import and use the middleware in your Next.js `middleware.ts` file:

```javascript title="middleware.ts"
import { asgardeoMiddleware } from '@asgardeo/nextjs';

export default asgardeoMiddleware();
```

### With Route Protection

Protect specific routes using `createRouteMatcher`:

```javascript title="middleware.ts"
import { asgardeoMiddleware, createRouteMatcher } from '@asgardeo/nextjs';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)']);

export default asgardeoMiddleware(async (asgardeo, req) => {
  if (isProtectedRoute(req)) {
    await asgardeo.protectRoute();
  }
});
```

### Advanced Usage

Customize authentication logic and redirects:

```javascript title="middleware.ts"
import { asgardeoMiddleware, createRouteMatcher } from '@asgardeo/nextjs';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up']);

export default asgardeoMiddleware(async (asgardeo, req) => {
  if (isAuthRoute(req)) return;

  if (isProtectedRoute(req)) {
    await asgardeo.protectRoute({ redirect: '/sign-in' });
  }

  if (asgardeo.isSignedIn()) {
    console.log('User session:', asgardeo.getSessionId());
  }
}, {
  defaultRedirect: '/sign-in'
});
```

!!! info "Note"
    The middleware must be used in a Next.js API or page route. It relies on Next.js middleware conventions.

## API

The handler receives an `asgardeo` context object with the following properties and methods:

<!-- markdownlint-disable MD056 -->
| Property         | Type                                         | Description                                                      |
|------------------|----------------------------------------------|------------------------------------------------------------------|
| `protectRoute`   | `(options?: {redirect?: string}) => Promise<NextResponse | void>` | Redirects unauthenticated users to a sign-in page                |
| `isSignedIn`     | `() => boolean`                              | Returns `true` if the request has a valid session                |
| `getSessionId`   | `() => string | undefined`                  | Gets the session ID from the request                             |
| `getSession`     | `() => Promise<SessionTokenPayload | undefined>` | Gets the session payload from the request                        |
<!-- markdownlint-enable MD056 -->

## Error Handling

- If no valid session is found, `protectRoute` redirects to the sign-in page or a custom URL.
- If used outside a Next.js middleware context, it may not function as expected.

## Notes

- Use this middleware to protect routes and access authentication state in Next.js server-side code.
- Combine with `createRouteMatcher` for flexible route protection.
- Supports both JWT and legacy session formats.
