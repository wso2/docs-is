
Next, let's implement login and logout functionality using the auth.js library in your Next.js app. In Next.js, we’ll use the `auth()` hook to access authentication data such as the logged-in user's information and utility methods for managing authentication status. Auth.js provides convenient methods to handle login (signIn) and logout (signOut), which can be directly invoked in your components to manage user sessions.
Let’s update the page.tsx file so that we can call the signIn() method using a button. You can find a reference in auth.js documentation [here](https://authjs.dev/getting-started/session-management/login){:target="_blank"}. 


Replace the existing content of the `page.tsx` file with following code. 

```javascript title="page.tsx"
import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth();

  return (
    <div className="justify-items-center">
      {
        !session ? (
          <form
            action={async () => {
              "use server"
              await signIn("asgardeo")
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        ) : (
          <>
            <p> You are now signed in!</p>

            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </>
        )
      }
    </div>
  );
}
```

This code snippet creates a login form in Next.js that triggers the signIn function from auth.js when the user clicks the "Sign in" button. The form uses an asynchronous action to securely initiate the login process with {{product_name}}. When the user submits the form, the `signIn("asgardeo")` method redirects them to the {{product_name}} login page, and once logged in, they are returned to the app with their session established. 

Once the user has successfully logged in, it's essential to verify the validity of their session to ensure that they have appropriate access to your application. In Next.js, you can easily check if a user session is active using the `auth()` function in the server-side.


Save the changes and re-run the application in development mode if it is not running already.

```bash
npm run dev
```

Once the application is started, you will see the homepage of the application with the changes we made.

![Login screen]({{base_path}}/assets/img/complete-guides/nextjs/image5.png){: width="800" style="display: block; margin: 0;"}


## Initiate Sign In

Clicking on the login button will initiate an OIDC request. You will be able to observe the authorize request in the browser devtools as follows. To see this, right click on the application and click inspect and switch to the network tab. In the filter input, type “authorize”, and click on the sign in button.

![OIDC request]({{base_path}}/assets/img/complete-guides/nextjs/mage6.png){: width="800" style="display: block; margin: 0;"}

!!! tip "Tip"

    The OpenID Connect specification offers several functions, known as grant types, to obtain an access token in exchange for user credentials. This example uses the authorization code grant type. In this process, the app first requests a unique code from the authentication server, which can later be used to obtain an access token. 
    
{{product_name}} will receive this authorization request and respond by redirecting the user to a login page to enter their credentials.

![OIDC request]({{base_path}}/assets/img/complete-guides/nextjs/image7.png){: width="800" style="display: block; margin: 0;"}

At this stage, you should have already created a test user in {{product_name}}, as outlined in the [prerequisites]({{ base_path }}/complete-guides/react/prerequisites) section. Now can enter the username and password of the test user to the login screen.



!!! tip "Tip"

    **PKCE (Proof Key for Code Exchange)**  is an addition to the OAuth2 specification to make the authorization code more immune to replay attacks. 
    
    If you want to disable PKCE for some reason, you can do so via following the steps below. **However, disabling PKCE for public clients such as our single page React app is highly discouraged.**  

    1. Log in to the {{product_name}} console and select the application you created.
    2. Switch to the Protocol tab.
    3. Uncheck the Mandatory checkbox under PKCE section.

