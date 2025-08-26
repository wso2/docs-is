The `@asgardeo/nextjs` SDK provides a convenient way to access protected APIs in your Next.js application. The `asgardeo` module from the SDK allows you to access utility functions that will expose the access token and other session details needed to make authenticated API calls.

## Obtaining the Access Token from the Server

Let's see how we can call the {{product_name}} `scim2/Me` endpoint to fetch user details. This endpoint is secured and requires an access token for authentication.

```javascript title="app/actions.ts"
'use server';

import { asgardeo } from "@asgardeo/nextjs/server";

export default async function getUserProfile() {
  const client = await asgardeo();
  const sessionId = await client.getSessionId();
  const accessToken = await client.getAccessToken(sessionId);

  try {
    const response = await fetch(
      '{{content.sdkconfig.baseUrl}}/scim2/Me',
      {
        method: 'GET',
        headers: {
          Accept: 'application/scim+json',
          'Content-Type': 'application/scim+json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch protected data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching protected data:', error);
    throw error;
  }
}
```

In the above code, we first import the `asgardeo` module from the `@asgardeo/nextjs/server` package. We then create an asynchronous function `getUserProfile` that retrieves the session ID and access token using the Asgardeo client. Finally, we make a fetch request to the `scim2/Me` endpoint, passing the access token in the Authorization header.
