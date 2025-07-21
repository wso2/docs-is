Using the Next Asgardeo SDK you can also secure routes. For example if you have a page you need to show only when the user is logged in, you can follow the below steps.

Add the following to the middleware.ts file

```javascript title="middleware.ts"
import {asgardeoMiddleware, createRouteMatcher} from '@asgardeo/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard',
  '/dashboard/(.*)',
]);

export default asgardeoMiddleware(async (asgardeo, req) => {
  if (isProtectedRoute(req)) {
    const protectionResult = await asgardeo.protectRoute();

    if (protectionResult) {
      return protectionResult;
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

Here you need to create the relevant `/dashboard` page in your app accordingly.

Now verify that you cannot access `http://localhost:3000/dashboard` URL when you are not logged in. You will be redirected to `http://localhost:3000` if you do not have a valid user logged in.

In this step, we looked into how to secure component routes within a Next.js app. Next, we will try to access a protected API from our Next.js app, which is a common requirement.
