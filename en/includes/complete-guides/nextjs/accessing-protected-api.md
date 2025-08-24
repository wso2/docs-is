
In this section, we will focus on how to call a secure API from your Next.js app.

We’ve already covered the key steps for adding user login and managing authentication in your Next.js app.
Moving on to accessing protected APIs, an access token is typically used when your application needs to interact with a secure backend API. This token contains the necessary permissions (or "scopes") for making API requests on behalf of the authenticated user. In this section, we’ll explore how to use this token to make authenticated API calls from your Next.js app.

For simplicity, let's assume that the APIs you're calling are secured by the same Identity Provider (IdP) and share the same issuer. This setup is common when your Next.js app is interacting with internal APIs that belong to the same organization. However, if your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide.

## Access scim2/Me endpoint

In {{product_name}}, `scim2/` REST API implements the SCIM 2.0 Protocol according to the [SCIM 2.0 specification](https://datatracker.ietf.org/doc/html/rfc7644). The scim2/Me endpoint will return the user details of the currently authenticated user. To access this endpoint, we’ll define this endpoint in our .env file as follows.

```bash title=".env"
NEXT_PUBLIC_AUTH_ASGARDEO_ME_ENDPOINT="{{content.sdkconfig.baseUrl}}/scim2/Me"
```

Use the following snippet to access the scim2/Me endpoint.

```javascript
'use server';

import { asgardeo } from "@asgardeo/nextjs/server";
import { SignOutButton } from "@asgardeo/nextjs";
import { redirect } from "next/navigation";

interface UserDetails {
    emails: string[];
    name: {
        givenName: string;
        familyName: string;
    };
}

export const goToHome = async () => {
    "use server";
    redirect("/");
};

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
    const client = await asgardeo();
    const sessionId = await client.getSessionId();
    const accessToken = await client.getAccessToken(sessionId as string);

    if (!sessionId || !accessToken) {
        return;
    }

    let userDetails: UserDetails;

    try {
        userDetails = await fetchUserDetails(accessToken);
    } catch {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <h1>Failed to fetch user details</h1>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h1 className="mb-5">Profile Page</h1>
            <p>Email: {userDetails.emails?.[0]}</p>
            <p>First Name: {userDetails.name?.givenName}</p>
            <p>Last Name: {userDetails.name?.familyName}</p>
            <form action={goToHome}>
                <button
                    type="submit"
                    className="rounded-full border border-solid flex items-center justify-center text-sm h-10 px-4 mt-3"
                >
                    Go to Home page
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

By following the above steps we can access protected APIs.
