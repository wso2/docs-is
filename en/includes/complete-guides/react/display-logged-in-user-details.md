
At this point, we’ve successfully implemented login and logout capabilities using the Asgardeo React SDK. The next step is to explore how to access and display logged-in user details within the app.

The React SDK has components that can be used to display user information. You can use the `User`, `UserProfile`, or `UserDropdown` components to access and display user profile information in a declarative way.

- `User`: The `User` component provides a render prop pattern to access user profile information:
- `UserProfile`: The `UserProfile` component provides a declarative way to display and update user profile information.
- `UserDropdown`: The `UserDropdown` component provides a dropdown menu with built-in user information and sign-out functionality.

First let's use the `User` Component to display the username as below.

```javascript title="src/App.jsx" hl_lines="1 18-24"
import { SignedIn, SignedOut, SignInButton, SignOutButton, User } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <SignedIn>
          <UserDropdown />
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      <main>
        <SignedIn>
          <User>
            {(user) => (
              <div>
                <p>Welcome back, {user.userName || user.username || user.sub}</p>
              </div>
            )}
          </User>
        </SignedIn>
      </main>
    </>
  )
}

export default App;
```

Now let's use the `UserProfile` component to display and update user profile information.

```javascript title="src/App.jsx" hl_lines="1 24"
import { SignedIn, SignedOut, SignInButton, SignOutButton, User, UserProfile } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      <main>
        <SignedIn>
          <User>
            {(user) => (
              <div>
                <p>Welcome back, {user.userName || user.username || user.sub}</p>
              </div>
            )}
          </User>
          <UserProfile />
        </SignedIn>
      </main>
    </>
  )
}

export default App;
```

Finally we can use the `UserDropdown` component to provide a dropdown menu with built-in user information and sign-out functionality.

```javascript title="src/App.jsx" hl_lines="1 9"
import { SignedIn, SignedOut, SignInButton, SignOutButton, User, UserDropdown, UserProfile } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <SignedIn>
          <UserDropdown />
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>
      <main>
        <SignedIn>
          <User>
            {(user) => (
              <div>
                <p>Welcome back, {user.userName || user.username || user.sub}</p>
              </div>
            )}
          </User>
          <UserProfile />
        </SignedIn>
      </main>
    </>
  )
}

export default App;
```

Alternatively the Asgardeo React SDK webhook which is useAsgardeo() can be used to fetch user information, so that you can directly access those from the state (such as `user.username`) and use them in the application. First, let’s try to display the username using user.username. Replace the code in app.jsx with the following.

```javascript
import { useAsgardeo } from '@asgardeo/react';
import './App.css'

const AuthenticatedApp = () => {
  const {
    isSignedIn,
    signIn,
    signOut,
    user
  } = useAsgardeo();

  return (
    <div>
      {isSignedIn && user ? (
        <>
          <p>Welcome {user.userName || user.username || user.sub}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default AuthenticatedApp;
```

If your React application is already running in the development mode, the home page will be reloaded and you will see the updated user interface.

![Logout screen]({{base_path}}/assets/img/complete-guides/react/image18.png){: width="800" style="display: block; margin: 0;"}

<!-- There may be instances where you’d need to retrieve user attributes outside React components. Asgardeo React SDK provides a [getBasicUserInfo](https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md#getbasicuserinfo){:target="_blank"}  function, which allows you to retrieve the authenticated user’s basic information. The code example in the following section demonstrates this process and can be adapted to fit your application with any necessary customizations.

Again, replace the code in `app.jsx` with the following.

```javascript
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import './App.css';

const App = () => {

  const { state, getBasicUserInfo, signIn, signOut } = useAuthContext();
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    getBasicUserInfo().then((response) => {
      setUserInfo(response)
    }).catch((error) => {
      console.error(error);
    });
  }, [state]);

  return (
    <>
      {
        state.isAuthenticated
          ? <>
            <p>Welcome, {userInfo?.username}</p>
            <button onClick={() => signOut()}>Logout</button>
          </>
          : <button onClick={() => signIn()}>Login</button>
      }
    </>
  )
};

export default App;
```

The above code snippet, the app utilizes the `useAuthContext` hook to access authentication state and methods such as `getBasicUserInfo`, `signIn`, and `signOut`. It also uses React's `useState` to store basic user information and `useEffect` to fetch this information whenever the authentication state changes. If the user is authenticated, the app displays a welcome message with the username and a button to log out. If the user is not authenticated, it shows a login button that triggers the sign-in process, and the errors during user info retrieval are handled by logging them to the console.

Similarly, you can access the other user attributes, such as email, display name, allowed scopes, etc as well. The following code snippet shows you how you can access them in your app.  Asgardeo React SDK is responsible for processing the ID token and decoding these attributes.  

```javascript
 <p>Your email: { userInfo?.email }</p>
 <p>Display name: { userInfo?.displayName }</p>
 <p>Allowed scopes: { userInfo?.allowedScopes }</p>
 <p>Tenant domain: { userInfo?.tenantDomain }</p>
 <p>Session state: { userInfo?.sessionState }</p>
```

## Getting additional user attributes

Other than the above attributes decoded  and available to you by default, Asgardeo React SDK provides [getDecodedIDToken](https://github.com/asgardeo/asgardeo-auth-react-sdk/blob/main/API.md#getdecodedidtoken){:target="_blank"}  method to access any other user attributes that are not exposed by `getBasicUserInfo`. This method will decode the ID token in browser storage and return the output as a JSON object.

To get additional user attributes to the ID token, the application should be configured to request the specific user attributes at the time of login. For example, if you want to retrieve a user's mobile number as an attribute, you need to configure the application to request the user’s mobile number as an attribute in the ID token.

1. Log in to the {{product_name}} console and select the application you created.
2. Go to the **User Attributes** tab.
3. Select the **phone** scope.
4. Expand the scope, and you will see that all attributes under this scope (e.g., `mobile_number`) are selected.
5. Click Update to save the changes.

```javascript

const { state, signIn, signOut, getDecodedIDToken } = useAuthContext();

const [mobileNumber, setMobileNumber] = useState("")

useEffect(() => {
  if (state.isAuthenticated) {
    getDecodedIDToken().then((decodedIdToken) => {
      console.log(decodedIdToken);
      setMobileNumber(decodedIdToken.phone_number)
    }).catch((error) => {
        console.log(error);
    })
  }
}, [ state.isAuthenticated ]);

return (
   <>
    <p>Your mobile number: {mobileNumber}</p>
   </>
)

```

In the above code snippet, we run the `getDecodedIDToken` method if the user is authenticated, and print the output to the browser console. The decoded ID token response will be printed to the browser console as follows.

![ID token]({{base_path}}/assets/img//complete-guides/react/image19.png){: width="800" style="display: block; margin: 0;"} -->

In this step, we further improved our React app to display the user attributes. As the next step, we will try to secure routes within the app.
