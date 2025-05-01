

In this step, we implement team management functionality including adding and listing teams.

## Adding a team

In Teamspace, adding a new team means creating an organization within Asgardeo. This implementation follows Asgardeo's **self-service approach**, which empowers users to create and manage their own organizations.

This approach allows users in the root organization to create teams and onboard team administrators without requiring intervention from the root organization's administrators. This is facilitated through Teamspace, which acts as a self-service portal built using Asgardeo APIs. This reduces administrative overhead and improves scalability by allowing teams to be managed independently.

In this step, let's see how to make Teamspace a self-service portal and implement the functionality to create new teams and assign the creator as the team administrator.

!!! Info
    Read more on the [self-service approach]({{base_path}}/guides/organization-management/onboard-org-admins/self-service-approach/#self-service-approach){:target="\_blank"} and [maintaining admins in root organization]({{base_path}}/guides/organization-management/onboard-org-admins/self-service-approach/#maintain-admins-in-the-root-organization){:target="\_blank"} in the Asgardeo documentation.

### Create API route

Create a new file, `app/api/add-organization/route.ts` to handle team creation operations.

```javascript title="app/api/add-organization/route.ts"
export async function POST(req: Request) {
    // Implementation for creating teams
}
```

### Implementation

1. Extract user input

    First, we extract team details (team name, description) from the request body. If any required field is missing, we return a 400 Bad Request error.

    ```javascript title="app/api/add-organization/route.ts"
    const { teamName, description } = await req.json();

    if (!teamName) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    ```

2. Get an access token from the root organization (refer user sign up in **step 7**)

    !!! Note
        In the app, this token is retrieved and stored in the session as `session.rootOrgToken`.

    ```javascript title="app/api/add-organization/route.ts"
    const accessToken = session?.rootOrgToken as string;
    ```

3. Check if the team exists

    Before creating a new team, verify whether a team with the desired name already exists to prevent duplicates.

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

4. Create the team if it doesn’t exist

    If the team does not exist, proceed to create it. Ensure to include relevant attributes, such as the creator's ID and username. If the team exists use the organization ID from the `checkOrgResponse` as follows.

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

5. Switch to the new team context

    After creating the team, get an access token for the created team by exchanging the access token obtained for the root organization. Use credentials of the shared OAuth2 application to execute the command.

    ```javascript title="app/api/add-organization/route.ts"
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

6. A shadow user account is created in the new organization for the organization creator. Get the shadow account's user id as follows:

    ```javascript title="app/api/add-organization/route.ts"
    const response = await fetch(
        `${
        process.env.ASGARDEO_BASE_URL
        }/o/scim2/Users?filter=userName%20eq%20${encodeURIComponent(session.user.email)}`,
        {
        method: "GET",
        headers: {
            Authorization: `Bearer ${orgAccessToken}`,
            "Content-Type": "application/json",
        },
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const shadowUserId = data.Resources[0]?.id;

    ```

7. Assign administrator role to the shadow account's user id or the team creator. 

    To grant the user administrative privileges in the newly created team, you need to retrieve the administrator role (TEAM_ADMIN) ID for Teamspace and then update the users of the role to include the creator/user.

    This process involves first, querying for the role ID using the application ID and role name, then updating the role's membership.

    ```javascript title="app/api/add-organization/route.ts"
    // Retrieve the application ID
    const getAppResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/o/api/server/v1/applications?filter=name%20eq%20${process.env.APP_NAME}`,
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
        `${process.env.NEXT_PUBLIC_ASGARDEO_ORG_URL}/o/scim2/v2/Roles?filter=displayName%20eq%20${encodeURIComponent(process.env.ADMIN_ROLE_NAME)}%20and%20audience.value%20eq%20${appId}`,
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
                        value: [{ value: shadowUserId }],
                    },
                ],
            }),
        }
    );

    if (!assignRoleResponse.ok) {
        throw new Error(`Failed to assign role: ${assignRoleResponse.statusText}`);
    }
    ```

!!! Note
    You can move the functions as helper functions to a different folder and simplify your route file as we did in user sign up in **step 7**.

### Implement team creation form component

To interact with the team creation API routes we created, we need client-side components that allow users to create teams. Below is a sample component with the usage of our API routes:

```javascript title="components/AddTeam.tsx"
"use client";

export default function CreateTeamForm() {
    async function handleCreateTeam(formData: FormData) {
        try {
            // Call the API route we created at app/api/add-organization/route.ts
            const response = await fetch("/api/add-organization", {
                method: "POST",
                body: formData,
            });

            // Handle response
            if (response.ok) {
                console.log("Team created successfully!");
            } else {
                // Handle errors
                const errorData = await response.json();
                console.error("Error:", errorData.error);
            }
        } catch (error) {
            console.error("Error creating team:", error);
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleCreateTeam(formData);
            }}
        >
            {/* Team creation form content */}
            <input type="text" name="Name" placeholder="Name" required />
            <input type="text" name="Description" placeholder="Description" />
            <button type="submit">Add Team</button>
        </form>
    );
}
```

## View created teams

### Create API route

Create a new file, `app/api/get-organizations/route.ts` for fetching teams.

```javascript title="app/api/get-organization/route.ts"
export async function GET() {
    // Implementation
}
```

### Implementation

We can use the organizations API endpoint to retrieve all organizations a user has access to.

```javascript title="app/api/get-organization/route.ts"
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

### Implement team listing in component

To interact with the team listing API routes we created, we need client-side components that allow users to view created teams. Below is a sample component with the usage of our API routes:

```javascript title="components/TeamList.tsx"
"use client";

export default function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch teams when component mounts
    async function fetchTeams() {
      // Call the API route we created at app/api/get-organizations/route.ts
      const response = await fetch("/api/get-organizations");
      const data = await response.json();
      
      // Update state with fetched teams
      setTeams(data.organizations || []);
    }
    
    fetchTeams();
  }, []);

  return (
    <div className="team-list">
      <h2>Your Teams</h2>
      
      {teams.length === 0 ? (
        <p>No teams found. Create your first team!</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <h3>{team.name}</h3>
              {team.description && <p>{team.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

!!! Note
    Refer to Step 3 of the Github [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app){:target="\_blank"} for the complete implementation.
