---
template: templates/complete-guide.html
heading: Accessing protected API from your React app
read_time: 2 min
---

In this section, we will focus on how to call a secure API from your Next.js app.

We’ve already covered the key steps for adding user login and managing authentication in your Next.js app. To recap, during user login, the auth.js library provides both an ID token and an access token. So far, we've been using the ID token to establish the logged-in user's context and enable secure access to protected routes. Now, let's shift our focus to the access token, which is crucial for calling secure APIs from your Next.js app.
The access token is typically used when your application needs to interact with a secure backend API. This token contains the necessary permissions (or "scopes") for making API requests on behalf of the authenticated user. In this section, we’ll explore how to use this token to make authenticated API calls from your Next.js app.

For simplicity, let's assume that the APIs you're calling are secured by the same Identity Provider (IdP) and share the same issuer—in this case, the same Asgardeo organization. This setup is common when your Next.js app is interacting with internal APIs that belong to the same organization. However, if your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide. 

## Expose Access Token to the application

To use the access token in the application, we need to retrieve the access token from Auth.js. This is similar to how we have obtained the ID token using callbacks. Particularly using the **jwt** callback, we can pass the `access_token` from `account` object to the `session` object in the **session** callback as follows.

```javascript title="src/auth.ts"
import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

declare module "next-auth" {
  interface User {
    given_name?: string;
    family_name?: string;
    id_token?: string;
    access_token?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile, account }) {
      
      if (profile) {
        token.username = profile.username;
        token.given_name = profile.given_name;
        token.family_name = profile.family_name;
      }

      if (account) {
        token.id_token = account.id_token;        
        token.access_token = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {            
      if (token) {
        session.user.email = token.username as string;
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
        session.user.id_token = token.id_token as string;
        session.user.access_token = token.access_token as string;
      }

      return session;
    }
  }
})
```

## Access scim2/me endpoint

In Asgargeo, `scim2/` REST API implements the SCIM 2.0 Protocol according to the [SCIM 2.0 specification](https://datatracker.ietf.org/doc/html/rfc7644). The scim2/Me endpoint will return the user details of the currently authenticated user. To access this endpoint, we’ll define this endpoint in our .env.local file as follows.

```env
NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT="https://api.asgardeo.io/t/{org_name}/scim2/Me"
```

### Request Required Scopes from Asgardeo

If we refer to the [scim2/Me API docs](https://wso2.com/asgardeo/docs/apis/scim2-me/) in Asgardeo, we can see that the `internal_login` scope is required for this API to work. Now let’s see what are the current scope we are requesting upon login. This can be checked by analyzing the scope parameter in the request payload of the initial **authorize request** during login.

![/authorize request payload]({{base_path}}/complete-guides/nextjs/assets/img/image24.png){: width="800" style="display: block; margin: 0;"}

We can see the scopes we are requesting does not contain the `internal_login` scope. So we need to add the `internal_login` scope for the **authorize request**. This can be done by adding the scope as an authorization parameter to the `Asgardeo()` function in the providers array in `/src/auth.ts` file.

```javascript title="src/auth.ts"
...
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER,
    authorization: {
      params: {
        scope: "openid profile email internal_login"
      }
    }
  })],
  ...
})

```
Now let’s re-login (as we have to get the newly requested scope) and see if the `scim2/Me` endpoint is working as expected.

### Access the API from Server-Side

This component is fully server-side rendered and will fetch the user details from the Asgardeo server using `scim2/Me` endpoint. The `fetchUserDetails` function is used to fetch the user details from the Asgardeo server using the access token. The `ServerProfile` component will display the user details if the user is logged in. If the user is not logged in, the component will display an error message.

```javascript title="/src/app/server-profile/page.tsx"
import { auth } from "@/auth";
import { SignOutButton } from "@/components/sign-out-button";
import { redirect } from "next/navigation";
interface UserDetails {
    emails: string[];
    name: {
        givenName: string;
        familyName: string;
    };
}
const fetchUserDetails = async (accessToken: string): Promise<UserDetails> => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT as string, {
            method: "GET",
            headers: {
                Accept: "application/scim+json",
                "Content-Type": "application/scim+json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch protected data");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching protected data:", error);
        throw error;
    }
};
const ServerProfile = async () => {
    const session = await auth();
    if (!session || !session.user || !session.user.access_token) {
        return;
    }
    let userDetails: UserDetails;
    try {
        userDetails = await fetchUserDetails(session.user.access_token);
    } catch {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1>Failed to fetch user details</h1>
            </div>
        );
    }
    const goToIndex = async () => {
        "use server";
        redirect("/");
    };
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email: {userDetails.emails?.[0]}</p>
            <p>First Name: {userDetails.name?.givenName}</p>
            <p>Last Name: {userDetails.name?.familyName}</p>
            <form action={goToIndex}>
                <button
                    type="submit"
                    className="rounded-full border border-solid flex items-center justify-center text-sm h-10 px-4 mt-3"
                >
                    Go to index page
                </button>
            </form>
            <div className="mt-5">
                <SignOutButton />
            </div>
        </div>
    );
};
export default ServerProfile;
```

### Access the API from Client-Side

To access this endpoint, we are using the built-in `fetch` API in JavaScript. We also need to attach the access token of the currently logged in user. That is why we had to expose the access token to the application in the previous step. The updated code for the `<Profile/>` component will be as follows.

```javascript title="src/app/client-profile/page.tsx"
"use client";

import { SignOutButton } from "@/components/sign-out-button";
import { withProtectedRoute } from "@/components/with-protected-route";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDetails {
    emails: string[];
    name: {
        givenName: string;
        familyName: string;
    };
}

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);

    useEffect(() => {
        fetchProtectedData();
    }, []);

    const fetchProtectedData = async () => {
        if (!session?.user?.access_token) {
            console.error('Access token not found');
            return;
        }
        
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT as string, {
                method: 'GET',
                headers: {
                    "Accept": "application/scim+json",
                    "Content-Type": "application/scim+json",
                    "Authorization": `Bearer ${session?.user?.access_token}`,
                },
            });            

            if (!response.ok) {
                throw new Error('Failed to fetch protected data');
            }

            const data = await response.json();
            setUserDetails(data);
            
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    };

    if (!session || !userDetails) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1>You need to sign in to view this page</h1>
            </div>
        );
    }    

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email : { userDetails?.emails && userDetails?.emails[0] }</p>
            <p>First Name : { userDetails?.name?.givenName }</p>
            <p>Last Name : { userDetails?.name?.familyName }</p>
            <button
                className="rounded-full border border-solid flex items-center justify-center text-sm h-10 px-4 mt-3"
                onClick={() => router.push('/')}
            >
                Go to index page
            </button>
            <div className="mt-5">
                <SignOutButton />
            </div>
        </div>
    );
}

export default withProtectedRoute(Profile);
```

As you can see, now the endpoint is working and you should be able to access user details of the currently logged in user.
