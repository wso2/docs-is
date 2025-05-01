

## Implement log in

Now, let's implement log in functionality to the app. We'll use Auth.js's `signIn` method to initiate the authentication flow with Asgardeo and the `useSession` hook to manage the user's session state in the client-side. The `useSession` hook provides access to the logged-in user's session data and allows us to check the authentication status.

Create or update your home component (or the component where you want to add the sign-in button) at `app/home.tsx` to handle user authentication:

```javascript title="components/Home.tsx"
"use client"

import { signIn, useSession } from "next-auth/react";

export default function Home() {
 //Get session data
 const { data: session } = useSession();

 // Render sign-in button if no active session
 return (
    { !session ? (
      <Box mt={3} textAlign="center">
         <Button
            variant="contained"
            color="primary"
            onClick={() => signIn("asgardeo")}
         >
            Sign in
         </Button>
         <Box mt={2}>
            <SignUp />
         </Box>
      </Box>
    )}
 )
}
```

## Access logged user's information

To access and display logged-in user details in the app using auth.js, use the JWT callback function. This function is triggered whenever a JWT is created or updated (e.g. at sign-in), allowing you to retrieve and manipulate user information from the ID token provided by Asgardeo.

Update the `auth.ts` file as below.

```javascript title="auth.ts" hl_lines="8-23"
import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
     issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
     async jwt({ token, profile }) {
        if (profile) {
          token.email = profile.username;
        }

        return token;
     },
     async session({ session, token }) {            
        if (token) {
          session.user.email = token.email as string;
        }

        return session;
     }
  }
})
```

Then, update your Home component as follows to display the username of logged in user.

```javascript hl_lines="3" title="components/Home.tsx"
<>
  <p> You are now signed in!</p>
  <p> hello {session.user?.email}</p>
</>
```

!!! Info
     Read more on [getting user attributes in your app]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/).

## Access logged user's permissions

User permissions (scopes) are retrieved using OAuth2 token introspection for opaque tokens and stored in the session. If a JWT is used instead, the scopes can be extracted by decoding the token directly.

!!! Note
     To check the access token type Teamspace is using, go to the Asgardeo Console > Select your Teamspace application > Go to the “Protocol” tab and scroll down to check the Access Token type.

     ![Token type]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image12.png){: width="700" style="display: block; margin: 0;"}

In Teamspace, during session creation, introspectToken function is called to verify the token and fetch its associated scopes.

The retrieved scopes are stored in `session.scopes`.

```javascript title="auth.ts" hl_lines="9-16"
async session({ session, token }) {
    if (token?.access_token) {
         session.user.email = token.email;
         session.user.access_token = token.access_token as string;
         session.id_token = token.id_token as string;
         session.user.firstName = parseJwt(session.id_token)["given_name"];
         session.user.lastName = parseJwt(session.id_token)["family_name"];

         // Call OAuth2 introspection to get scopes
         try {
                const introspectionResponse = await introspectToken(token?.access_token as string);
                session.scopes = introspectionResponse.scope || null;
         } catch (error) {
                console.error("Error in token introspection:", error);
         }
    }

    return session;
}
```

Introspect token sample method:


```javascript title="app/auth-utils"
// Helper function to introspect the token
export async function introspectToken(accessToken: string) {
    const clientId = process.env.AUTH_ASGARDEO_ID;
    const clientSecret = process.env.AUTH_ASGARDEO_SECRET;

    if (!clientId || !clientSecret) {
         throw new Error("Missing required environment variables for introspection");
    }

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
         "base64"
    );

    const response = await fetch(
         `${process.env.ASGARDEO_BASE_URL}/oauth2/introspect`,
         {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${authHeader}`,
                },
                body: new URLSearchParams({ token: accessToken }),
         }
    );

    if (!response.ok) {
         throw new Error(`Failed to introspect token: ${response.statusText}`);
    }

    return await response.json();
}
```

!!! Note
     Read more on [token introspection.]({{base_path}}/guides/authentication/oidc/token-validation-resource-server/#validate-opaque-tokens){:target="\_blank"}

## Implement log out

In this step, we implement secure log out functionality using Asgardeo's logout endpoint. This ensures proper termination of both the local session and the Asgardeo session.

### Create API route

Create a new API route at `app/api/auth/sign-out/route.ts` to handle the sign-out process:

```javascript title="app/api/auth/sign-out/route.ts"
import { auth } from "@app/auth";
import { NextResponse } from "next/server";

export async function POST() {
    // Implementation
}
```

Asgardeo’s logout endpoint is used to terminate the user session at Asgardeo and to log the user out. When a user is successfully logged out, the user is redirected to the `post_logout_redirect_uri` sent in the logout request.

Logout endpoint with sample request:

```bash
curl -X POST "https://api.asgardeo.io/t/{ORG_NAME}/oidc/logout" \
--data-urlencode "client_id=<CLIENT_ID>" \
--data-urlencode "post_logout_redirect_uri=<REDIRECT_URI>" \
--data-urlencode "state=<STATE>"
```

### Implementation

In Next.js API routes, the logout process can be handled as follows:

```javascript title="app/api/auth/sign-out/route.ts"
  try {
    // Get the current session using Auth.js
     const session = await auth();

     if (session) {
        // Construct the Asgardeo logout URL with required parameters:
        // - id_token_hint: Required for OIDC back-channel logout
        // - post_logout_redirect_uri: Where to redirect after logout
        const logoutUrl = `${process.env.ASGARDEO_LOGOUT_URL}?id_token_hint=${session.id_token}&post_logout_redirect_uri=${process.env.HOSTED_URL}`;

        // Return the logout URL to be used by the client
        return NextResponse.json({ logoutUrl });
     } else {
        return new NextResponse("No active session found", { status: 400 });
     }
  } catch (error) {
     console.error(error);
     return new NextResponse("Error logging out", { status: 500 });
  }
```

We can create a logout trigger in the client-side component (e.g., Navbar.tsx) as follows:

```javascript title="components/Navbar.tsx"
const handleSignOut = async () => {
  try {
     const res = await fetch("/api/auth/sign-out", {
        method: "POST",
     });
     const data = await res.json();

     if (data.logoutUrl) {
        await signOut({ redirect: false });
        window.location.href = data.logoutUrl;
     } else {
        console.error("Logout URL not found.");
     }
  } catch (error) {
     console.error("Error during sign out:", error);
  }
};
```

!!! Info
     Read more on [adding logout to an application.]({{base_path}}/guides/authentication/oidc/add-logout/){:target="\_blank"}

!!! Note
     Refer to Step 2 of the Github [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app){:target="\_blank"} for the complete implementation.
