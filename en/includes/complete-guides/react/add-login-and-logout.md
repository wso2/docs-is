

Next, let’s implement login and logout for our React app. React hooks are a special type of functions that let you access state and other React features in React functional components. Asgardeo provides one such hook, `useAuthContext()`, to conveniently access user authentication data such as the logged in user’s information, etc and utility functions, such as a function to validate user’s authentication status, and retrieve access tokens.

`useAuthContext` hook also provides us access with two key functions to perform sign in and sign out in your React application, `signIn` and `signOut` respectively. You can directly invoke the respective functions in our React application to trigger sign-in and sign-out requests as follows.

Update the `App.jsx` with the following code.

```javascript
import { useAuthContext } from "@asgardeo/auth-react";
import './App.css';

const App = () => {
const { state, signIn, signOut } = useAuthContext();

return (
    <>
    {
        state.isAuthenticated
        ? <button onClick={() => signOut()}>Logout</button>
        : <button onClick={() => signIn()}>Login</button>
    }
    </>
)
};

export default App;
```

Let’s look into the underlying details of what’s happening here.

The `authConfig` object holds the configuration necessary for connecting the app to {{product_name}}. It includes properties like `signInRedirectURL` and `signOutRedirectURL`, which determine where users are redirected after signing in or out. The `clientID` identifies the application, and `baseUrl` specifies the Asgardeo API endpoint specific to your organization. The scope array lists the OAuth 2.0 permissions the app requires, such as `openid` and `profile`. The scops are used to indicate what user attributes are expected by our React app.

The App component leverages the `useAuthContext` hook to access the authentication state (`state`) and actions (`signIn` and `signOut`). Inside the `AuthProvider`, the app conditionally renders a login or logout button based on whether the user is authenticated. If `state.isAuthenticated` is true, a "Logout" button is shown that triggers the `signOut` function. Otherwise, a "Login" button appears, which initiates the signIn process.

Save the changes and re-run the application in development mode if it is not running already.

```bash
npm run dev
```

Once the application is started, you will see the homepage of the application with the changes we made.

![Login screen]({{base_path}}/assets/img//complete-guides/react/image14.png){: width="800" style="display: block; margin: 0;"}

Initiate Sign In
Clicking on the login button will initiate an OIDC request. You will be able to observe the authorize request in the browser devtools as follows. To see this, right click on the application and click inspect and switch to the network tab. In the filter input, type “authorize”, and click on the sign in button.

![OIDC request]({{base_path}}/assets/img//complete-guides/react/image15.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    The OpenID Connect specification offers several functions, known as grant types, to obtain an access token in exchange for user credentials. This example uses the authorization code grant type. In this process, the app first requests a unique code from the authentication server, which can later be used to obtain an access token.

Asgardeo will receive this authorization request and respond by redirecting the user to a login page to enter their credentials.

![OIDC request]({{base_path}}/assets/img//complete-guides/react//image16.png){: width="800" style="display: block; margin: 0;"}

At this stage, you should have already created a test user in {{product_name}}, as outlined in the [prerequisites]({{ base_path }}/complete-guides/react/prerequisites) section. Now can enter the username and password of the test user to the login screen.

If the login is successful, you should be able to see the application as shown below.

![Login flow]({{base_path}}/assets/img//complete-guides/react/image17.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    **PKCE (Proof Key for Code Exchange)**  is an addition to the OAuth2 specification to make the authorization code more immune to replay attacks. It is enabled by default for public clients such as our single page React application. 
    
    If you want to disable PKCE for some reason, you can do so via following the steps below. **However, disabling PKCE for public clients such as our single page React app is highly discouraged.**  

    1. Log in to the {{product_name}} console and select the application you created.
    2. Switch to the Protocol tab.
    3. Uncheck the Mandatory checkbox under PKCE section.

In this section, we have added login and logout features to our React app. In the next step, we will look into how to access the user attributes of the logged in user.
