
Asgardeo SDK provides `SignInButton`, `SignOutButton` components to handle user sign-in and sign-out. You can use these components along side `SignedIn` and `SignedOut` components to conditionally render content based on the user's logged in state.

Replace the existing content of the `app/page.tsx` file with following content.

```javascript title="app/page.tsx"  hl_lines="1 6-11"
import {SignInButton, SignedIn, SignOutButton, SignedOut} from '@asgardeo/nextjs';

export default function Home() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </header>
  );
}
```

This code snippet adds a login button in the application that triggers the signIn function from @asgardeo/nextjs when the user clicks the "Sign in" button. The form uses an asynchronous action to securely initiate the login process with {{product_name}}. When the user submits the form, the `signIn("asgardeo")` method redirects them to the {{product_name}} login page, and once logged in, they are returned to the app with their session established. 

Once the user has successfully logged in, it's essential to verify the validity of their session to ensure that they have appropriate access to your application. In Next.js, you can easily check if a user session is active using the `auth()` function in the server-side.


Save the changes and re-run the application in development mode if it is not running already.

```bash
npm run dev
```

Once the application is started, you will see the homepage of the application with the changes we made.

![Login screen]({{base_path}}/assets/img/complete-guides/nextjs/image5.png){: width="800" style="display: block; margin: 0;"}


## Initiate Sign In

Clicking on the login button will initiate an OIDC request. You will be able to observe the authorize request in the browser devtools as follows. To see this, right click on the application and click inspect and switch to the network tab. In the filter input, type “authorize”, and click on the sign in button.

![OIDC request]({{base_path}}/assets/img/complete-guides/nextjs/image6.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    The OpenID Connect specification offers several functions, known as grant types, to obtain an access token in exchange for user credentials. This example uses the authorization code grant type. In this process, the app first requests a unique code from the authentication server, which can later be used to obtain an access token. 
    
{{product_name}} will receive this authorization request and respond by redirecting the user to a login page to enter their credentials.

![OIDC request]({{base_path}}/assets/img/complete-guides/nextjs/image7.png){: width="800" style="display: block; margin: 0;"}

At this stage, you should have already created a test user in {{product_name}}, as outlined in the [prerequisite]({{ base_path }}/complete-guides/nextjs/prerequisite) section. Now can enter the username and password of the test user to the login screen.

!!! tip "Tip"

    **PKCE (Proof Key for Code Exchange)**  is an addition to the OAuth2 specification to make the authorization code more immune to replay attacks. 
    
    If you want to disable PKCE for some reason, you can do so via following the steps below. **However, disabling PKCE for public clients such as our single page React app is highly discouraged.**  

    1. Log in to the {{product_name}} console and select the application you created.
    2. Switch to the Protocol tab.
    3. Uncheck the Mandatory checkbox under PKCE section.
