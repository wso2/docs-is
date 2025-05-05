
In a React app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, let’s look at how we can secure routes using Asgardeo React SDK

The Asgardeo SDK provides multiple approaches to secure routes in your application. Here we will demonstrate how to secure routes in a single-page React app using [React Router v6](https://reactrouter.com/en/main){:target="_blank"} , the most popular routing library for React. The same approach can be applied to other routing libraries such as [TanStack Router](https://tanstack.com/router/latest){:target="_blank"}  and [Wouter](https://github.com/molefrog/wouter){:target="_blank"}, etc.

## Using `<SecureApp/>`

Asgardeo React SDK provides the  `SecureApp` component, using which you can wrap the whole app or a part of the app that needs to have secure access. Then all the views wrapped with the SecureApp component are not accessible to an unauthenticated user.

```javascript

<AuthProvider config={authConfig}>
     <SecureApp
       fallback={ <Loader /> }
       onSignIn={ onSignInFunction }
       overrideSignIn={ overrideSignInFunction }
     >
     <AppContent />
    </SecureApp>
</AuthProvider>

```

In the above example, the `SecureApp` component wraps the entire App component, restricting all unauthorized users from accessing any part of our React application. It displays a fallback UI component while the authentication status is being resolved, and accepts a callback function to trigger after the sign in is successful.

## Using `<AuthenticatedComponent/>`

`AuthenticatedComponent` is another component provided by the Asgardeo React SDK to conditionally display UI elements based on the user's authentication status. You can use this to implement secure routes with react router in our app.

```javascript

import { AuthProvider } from '@asgardeo/auth-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPrompt from './components/login-prompt'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import './App.css'

const config = {
 signInRedirectURL: "http://localhost:5173",
 signOutRedirectURL: "http://localhost:5173",
 clientID: "0Fo7kLavZtHAVtXRr1zzpjwzeBMa",
 baseUrl: "https://api.asgardeo.io/t/pavindu119",
 scope: [ "openid","profile" ]
}

function App() {

 return (
   <AuthProvider config={ config } fallback={<p>Initializing...</p>}>
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route
           path="/dashboard"
           element={
             <AuthenticatedComponent fallbackComponent={ LoginPrompt }>
               <Dashboard />
             </AuthenticatedComponent>
           }
         />
       </Routes>
     </Router>
   </AuthProvider>
 )
}

export default App

```

This code snippet defines a route in a React application using the Route component from react-router-dom. It specifies that when the user navigates to the /dashboard path, the AuthenticatedComponent should be rendered. Let’s break down the code to understand what’s going on behind the scenes.

- `path="/dashboard"`: This sets the URL path for this route. When the user visits `/dashboard`, the specified component will be rendered.

- `element={...}`: defines the component(s) that will be rendered for this route. In this case, it’s the Dashboard UI view wrapped with AuthenticatedComponent.

- `AuthenticatedComponent`: This is a React component provided by the Asgardeo React SDK that checks if the user is authenticated. It wraps around the Dashboard component to secure it.

- `fallbackComponent={LoginPrompt}`: If the user is not authenticated, the AuthenticatedComponent will render the LoginPrompt component instead of the Dashboard component, prompting the user to log in.

- `<Dashboard />`: This is the main component that will be rendered if the user is authenticated and has access to the /dashboard route.

## Bring your own implementation

If you prefer to have full control over how the app routes should be secured—for example, if you want to run custom application logic before enabling or disabling a route—you can also build a completely custom logic using the primitives provided by the Asgardeo React SDK out of the box.

```javascript

const App = () => {

   const ProtectedRoute = ({ children }: { children: ReactNode }) => {


       const { state } = useAuthContext();


       if (!state.isAuthenticated) {
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
