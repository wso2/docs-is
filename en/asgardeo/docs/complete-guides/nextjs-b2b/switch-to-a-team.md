---
template: templates/complete-guide.html
heading: Switch to a team
read_time: 2 min
---

In this step, we implement team switching functionality using Asgardeo's Organization Switch grant type. This allows users to switch between different teams they have access to, updating their session with the appropriate tokens and permissions.

![Switch team app]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image13.png){: width="700" style="display: block; margin: 0;"}

## Create API route

Create a new API route at `app/api/switch-org/route.ts` to handle team switching:

```javascript title="app/api/switch-org/route.ts"
import { NextResponse } from "next/server"
import { Session } from "@auth/core/types"
import { auth } from "@/app/auth"

export async function POST(req: Request) {
    // Implementation
}
```

## Implementation

Now that you have created your API route, follow the steps below to implement the team switching functionality. The POST method handler will manage token exchange and session updates when switching between teams:

1. Validate Request Parameters

    First, extract and validate the organization ID from the request body:

    ```javascript title="app/api/switch-org/route.ts"
    try {
        const { orgId } = await req.json()

        if (!orgId) {
            return NextResponse.json(
                { error: "Missing organization ID" }, 
                { status: 400 }
            )
        }

        const accessToken = session?.user?.access_token
    ```

2. Prepare Token Exchange

    Set up the authentication headers and parameters for the organization switch:

    ```javascript title="app/api/switch-org/route.ts"
    // Create Basic Auth header
    const authHeader = Buffer.from(
        `${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ID}:${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_SECRET}`
    ).toString("base64")

    // Prepare token exchange parameters
    const params = new URLSearchParams()
    params.append("grant_type", "organization_switch")
    params.append("switching_organization", orgId)
    params.append("token", accessToken!)
    params.append("scope", process.env.NEXT_PUBLIC_AUTH_SCOPE!)
    ```

3. Exchange Tokens

    Make the request to exchange tokens for the new organization:

    ```javascript title="app/api/switch-org/route.ts"
    // Request new tokens
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ISSUER}`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${authHeader}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    )

    if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.status}`)
    }
    ```

4. Return New Tokens

    Validate and return the new tokens:

    ```javascript title="app/api/switch-org/route.ts"
    const data = await response.json()

    // Validate token response
    if (!data.access_token || !data.id_token) {
        throw new Error("Invalid token response")
    }

    return NextResponse.json({
        accessToken: data.access_token,
        id_token: data.id_token,
    })
    ```

This organization switching endpoint uses the Organization Switch grant type to obtain new tokens scoped to the target organization. These tokens will have the appropriate permissions and context for the selected team.

!!! note
    Refer to Step 4 of the GitHub [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app) for the complete implementation.
