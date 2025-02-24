---
template: templates/complete-guide.html
heading: Manage teams
read_time: 2 min
---

In this step, we implement team management functionality using Asgardeo's Organization Management APIs. Teams in this application are represented as sub-organizations within Asgardeo's organizational hierarchy, allowing for structured access control and resource management.

## Adding a team

In the Teamspace application, adding a new team involves creating a sub-organization within the existing organizational hierarchy. This process is facilitated through Asgardeo's Organization Management APIs, enabling dynamic management of organizational structures.

### Create API route

Create a new file, `app/api/add-organization/route.ts` to handle team creation operations.

```javascript title="app/api/add-organization/route.ts"
export async function POST(req: Request) {
    // Implementation for creating teams
}
```

### Implementation

1. Get an Access Token from the root organization (refer user sign up section)

    In the sample app, this token is retrieved and stored in the session as `session.rootOrgToken`.

    ```javascript title="app/api/add-organization/route.ts"
     const accessToken = session?.rootOrgToken as string;
     ```

2. Check if the Organization (Team) Exists

    Before creating a new team, verify whether an organization with the desired name already exists to prevent duplicates.

    ```javascript title="app/api/add-organization/route.ts"
    const checkOrgResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/api/server/v1/organizations/check-name`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: teamName }),
        }
    );
    ```

3. Create the team if it doesn’t exist

    If the team does not exist, proceed to create it. Ensure to include relevant attributes, such as the creator's ID and username. If the team exists use the organization ID from the checkOrgResponse as follows.

    ```javascript title="app/api/add-organization/route.ts"
    let orgId;

    if (!orgExists) {
        // Create a new organization
        const createOrgResponse = await fetch(
            `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/api/server/v1/organizations`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: teamName,
                    description: teamDescription,
                    attributes: [
                        {
                            key: "creator.id",
                            value: userId,
                        },
                        {
                            key: "creator.username",
                            value: session?.user?.email,
                        },
                    ],
                }),
            }
        );

        if (!createOrgResponse.ok) {
            throw new Error("Failed to create organization");
        }

        const responseData = await createOrgResponse.json();
        orgId = responseData.id;
    } else {
        orgId = checkOrgData?.data?.id;
    }
    ```

4. Switch to the New Organization Context

    After creating the organization, switch the context to the new organization to perform further actions, such as assigning roles. This involves obtaining an access token scoped to the new organization using the Organization Switch grant type.

    !!! Info
        Read more on [accessing organization APIs]({{base_path}}/apis/organization-apis/authentication/).

    ```javascript title="app/api/add-organization/route.ts"
    // Switch to the new organization's context
    const authHeader = Buffer.from(
        `${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_ID}:${process.env.NEXT_PUBLIC_AUTH_ASGARDEO_SECRET}`
    ).toString("base64");

    const params = new URLSearchParams();
    params.append("grant_type", "organization_switch");
    params.append("switching_organization", orgId);
    params.append("token", accessToken);
    params.append("scope", process.env.NEXT_PUBLIC_CREATE_ADMIN_SCOPE);

    const orgTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_ORGANIZATION_URL}/oauth2/token`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${authHeader}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        }
    );

    if (!orgTokenResponse.ok) {
        throw new Error(`Error fetching organization access token: ${orgTokenResponse.statusText}`);
    }

    const orgTokenData = await orgTokenResponse.json();
    const orgAccessToken = orgTokenData.access_token;
    ```

5. Assign roles to the user in the new organization

    To grant the user administrative privileges in the new team, assign the appropriate roles. This involves retrieving the role ID and updating the user's roles accordingly.

    ```javascript title="app/api/add-organization/route.ts"
    // Retrieve the application ID
    const getAppResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/o/api/server/v1/applications?filter=name%20eq%20${process.env.NEXT_PUBLIC_APP_NAME}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${orgAccessToken}`,
            },
        }
    );

    if (!getAppResponse.ok) {
        throw new Error(`HTTP error! Status: ${getAppResponse.status}`);
    }

    const appData = await getAppResponse.json();
    const appId = appData?.applications[0]?.id;

    // Retrieve the role ID
    const getRolesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/o/scim2/v2/Roles?filter=displayName%20eq%20${encodeURIComponent(process.env.NEXT_PUBLIC_B2B_ADMIN_ROLE_NAME)}%20and%20audience.value%20eq%20${appId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${orgAccessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!getRolesResponse.ok) {
        throw new Error(`HTTP error! Status: ${getRolesResponse.status}`);
    }

    const rolesData = await getRolesResponse.json();

    if (!rolesData?.Resources || rolesData.Resources.length === 0) {
        throw new Error("Role not found");
    }

    const roleId = rolesData?.Resources[0]?.id;
    ```

    Once we have the role ID, we need to update the user’s role membership. This is done using the SCIM API in Asgardeo.

    ```javascript title="app/api/add-organization/route.ts"
    // Assign role to the user
    const assignRoleResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/o/scim2/v2/Roles/${roleId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${orgAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Operations: [
                    {
                        op: "add",
                        path: "members",
                        value: [{ value: userId }],
                    },
                ],
            }),
        }
    );

    if (!assignRoleResponse.ok) {
        throw new Error(`Failed to assign role: ${assignRoleResponse.statusText}`);
    }
    ```

## View created teams

### Create API route

Create a new file, `app/api/organization/route.ts` for fetching teams.

```javascript title="app/api/organization/route.ts"
export async function GET() {
    // Implementation
}
```

### Implementation

We can use the organizations API endpoint to retrieve all organizations a user has access to.

```javascript title="app/api/organizations/route.ts"
import { auth } from "@/app/auth"
import { Session } from "@auth/core/types"

export async function GET() {
    const session: Session | null = await auth()

    // Check for valid session and access token
    if (!session?.user?.access_token) {
        return new Response(
            JSON.stringify({ error: "Unauthorized" }), 
            { status: 401 }
        )
    }

    // Call Asgardeo Organizations API
    const apiUrl = `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/o/api/users/v1/me/organizations`

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${session.user.access_token}`,
            },
        })

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return new Response(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.error("Error fetching organizations:", error)
        return new Response(
            JSON.stringify({ error: "Failed to fetch organizations" }), 
            { status: 500 }
        )
    }
}
```

!!! Note
    Refer to Step 3 of the Github [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app) for the complete implementation.
