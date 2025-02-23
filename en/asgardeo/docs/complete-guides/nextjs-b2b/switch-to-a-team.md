---
template: templates/complete-guide.html
heading: Switch to a team
read_time: 2 min
---

Once a user creates teams, they should be able to switch into a team space.

![Switch team app]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image13.png){: width="700" style="display: block; margin: 0;"}

The organization switching endpoint handles the token exchange for switching between organizations.

```javascript title="app/api/switch-org/route.ts"
import { NextResponse } from "next/server"
import { Session } from "@auth/core/types"
import { auth } from "@/app/auth"

export async function POST(req: Request) {
    const session: Session | null = await auth()

    try {
        const { orgId } = await req.json()

        // Validate required parameters
        if (!orgId) {
            return NextResponse.json(
                { error: "Missing organization ID" }, 
                { status: 400 }
            )
        }

        const accessToken = session?.user?.access_token

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

        const data = await response.json()

        // Validate token response
        if (!data.access_token || !data.id_token) {
            throw new Error("Invalid token response")
        }

        return NextResponse.json({
            accessToken: data.access_token,
            id_token: data.id_token,
        })
    } catch (error) {
        console.error("Error switching organization:", error)
        return NextResponse.json(
            { error: "Failed to switch organization" }, 
            { status: 500 }
        )
    }
}
```

!!! note
    Refer to Step 4 of the GitHub [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app) for the complete implementation.
