
In a React app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, let's look at how we can secure routes using Asgardeo React SDK.

The Asgardeo SDK provides multiple approaches to secure routes in your application. Here we will demonstrate how to secure routes in a single-page React app using official Asgardeo router integrations for popular routing libraries:

- [React Router](#react-router) - Integration with [React Router v6](https://reactrouter.com/en/main){:target="_blank"}
- [TanStack Router](#tanstack-router) - Integration with [TanStack Router](https://tanstack.com/router/latest){:target="_blank"}

## React Router

@asgardeo/react-router is a supplementary package that provides seamless integration between {{product_name}} authentication and React Router. It offers components to easily protect routes and handle authentication flows in your React applications.

As the first step, run the following command to install the react-router integration.
=== "npm"

    ```bash
    npm install @asgardeo/react-router
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/react-router
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/react-router
    ```
Now to use this, the following steps can be followed.

### 1. Basic Setup with ProtectedRoute

```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/react-router';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SignIn from './components/SignIn';

function App() {
  return (
    <AsgardeoProvider
      baseUrl="https://api.asgardeo.io/t/your-org"
      clientId="your-client-id"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Public Home Page</div>} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute redirectTo="/signin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute redirectTo="/signin">
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AsgardeoProvider>
  );
}

export default App;
```

### 2. Custom Fallback and Loading States

```tsx
import { ProtectedRoute } from '@asgardeo/react-router';

// Redirect to custom login page
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute redirectTo="/login">
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Custom fallback component
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute fallback={
      <div className="auth-required">
        <h2>Please sign in</h2>
        <p>You need to be signed in to access this page.</p>
      </div>
    }>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Custom loading state
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute 
      redirectTo="/signin"
      loader={<div className="spinner">Loading...</div>}
    >
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### 3. Integration with Layouts

```tsx
import { ProtectedRoute } from '@asgardeo/react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        
        {/* Protected routes with layout */}
        <Route path="/app" element={<AppLayout />}>
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute redirectTo="/signin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute redirectTo="/signin">
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="settings" 
            element={
              <ProtectedRoute redirectTo="/signin">
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## TanStack Router

@asgardeo/tanstack-router is a supplementary package that provides seamless integration between {{product_name}} authentication and TanStack Router. It offers components to easily protect routes and handle authentication flows in your React applications using TanStack Router.

As the first step, run the following command to install the tanstack-router integration.
=== "npm"

    ```bash
    npm install @asgardeo/tanstack-router
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/tanstack-router
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/tanstack-router
    ```

Now to use this, the following steps can be followed.

### 1. Basic Setup with ProtectedRoute

```tsx
import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/tanstack-router';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SignIn from './components/SignIn';

const rootRoute = createRootRoute({
  component: () => <div>Root Layout</div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Public Home Page</div>,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Dashboard />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Profile />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signinRoute,
  dashboardRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <AsgardeoProvider
      baseUrl="https://api.asgardeo.io/t/your-org"
      clientId="your-client-id"
    >
      <RouterProvider router={router} />
    </AsgardeoProvider>
  );
}

export default App;
```

### 2. Custom Fallback and Loading States

```tsx
import { ProtectedRoute } from '@asgardeo/tanstack-router';

// Redirect to custom login page
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/login">
      <Dashboard />
    </ProtectedRoute>
  ),
});

// Custom fallback component
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute fallback={
      <div className="auth-required">
        <h2>Please sign in</h2>
        <p>You need to be signed in to access this page.</p>
      </div>
    }>
      <Dashboard />
    </ProtectedRoute>
  ),
});

// Custom loading state
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute
      redirectTo="/signin"
      loader={<div className="spinner">Loading...</div>}
    >
      <Dashboard />
    </ProtectedRoute>
  ),
});
```

### 3. Integration with Layouts

```tsx
import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/tanstack-router';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import AppLayout from './components/AppLayout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';

const rootRoute = createRootRoute({
  component: () => <div>Root Layout</div>,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignIn,
});

// Protected routes with layout
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: AppLayout,
});

const appDashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Dashboard />
    </ProtectedRoute>
  ),
});

const appProfileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Profile />
    </ProtectedRoute>
  ),
});

const appSettingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/settings',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Settings />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  signinRoute,
  appLayoutRoute.addChildren([
    appDashboardRoute,
    appProfileRoute,
    appSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

function App() {
  return (
    <AsgardeoProvider
      baseUrl="https://api.asgardeo.io/t/your-org"
      clientId="your-client-id"
    >
      <RouterProvider router={router} />
    </AsgardeoProvider>
  );
}

export default App;
```

## Bring your own implementation

If you prefer to have full control over how the app routes should be secured—for example, if you want to run custom application logic before enabling or disabling a route—you can also build a completely custom logic using the primitives provided by the Asgardeo React SDK out of the box.

```javascript

const App = () => {

   const ProtectedRoute = ({ children }: { children: ReactNode }) => {


       const { isSignedIn } = useAsgardeo();


       if (!isSignedIn) {
           return <Unauthenticated />;
       }


       return children;
   };


   return (
       <Routes>
           <Route
               path="/contact"
               element={
                   <ProtectedRoute>
                       <Contact />
                   </ProtectedRoute>
               }
           />
           <Route path="/" element={<Home />} />
           <Route path="*" element={<PageNotFound />} />
       </Routes>
   )
};


```

In this step, we looked into how to secure component routes within a React app. Next, we will try to access a protected API from our React app, which is a common requirement for SPAs.
