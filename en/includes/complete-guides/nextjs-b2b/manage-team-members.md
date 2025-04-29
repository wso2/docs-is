

In this step, we implement team member management functionality into Teamspace using Asgardeo's SCIM APIs. This includes inviting new members to teams and adding existing team members.

## Invite members

This invite-member flow handles both new and existing users. The flow is efficient in checking whether a user exists and proceeding accordingly. You can easily extend this flow by adding more properties or integrating additional business logic depending on your requirements.

!!! note
    Read more on [inviting users from parent organization.]({{base_path}}/guides/organization-management/invite-parent-organization-users/){:target="\_blank"}

The implementation in the app handles two scenarios:

- Inviting new users (Ask Password flow)
- Inviting existing users (Guest invitation)

![Members flow]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image14.png){: width="350" style="display: block; margin: auto;"}

### Create API route

Create a new API route at `app/api/invite-member/route.ts` to handle inviting members to teams:

```javascript title="app/api/invite-member/route.ts"
import { auth } from "@/app/auth"
import { Session } from "@auth/core/types"

export async function POST(req: Request) {
    // Implementation
}
```

### Implementation

1. Extract User Input

    First, we extract the invited user’s details (email, role) from the request body. If any required field is missing, we return a 400 Bad Request error.

    ```javascript title="app/api/invite-member/route.ts"
    const { email, selectedRoleId } = await req.json();
    if (!email || !selectedRoleId) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    ```

2. Check if user exists

    We send a GET request to check whether the user already exists.

    ```javascript title="app/api/invite-member/route.ts"
    const checkUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/scim2/Users?filter=emails eq "${email}"`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.rootOrgToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    ```

3. User invitation for new users

    If the user does not exist, you invite them using the Ask Password Flow:

    ```javascript title="app/api/invite-member/route.ts"
    const inviteUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/scim2/Users`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.rootOrgToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emails: [{ primary: true, value: email }],
                "urn:scim:wso2:schema": { askPassword: "true" },
                userName: `DEFAULT/${email}`,
            }),
        }
    );
    ```

    If the invitation request is successful, the user will be invited to set the password for their created account via email.

4. User invitation for existing users

    If the user already exists, you invite them using a different API endpoint designed for existing users.

    ```javascript title="app/api/invite-member/route.ts"
    const inviteUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/o/api/server/v1/guests/invite`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usernames: [email],
                roles: [selectedRoleId],
                properties: [
                    {
                        key: "manageNotificationsInternally",
                        value: "true",
                    },
                ],
            }),
        }
    );
    ```

    After successfully sending the invitation to either a new or existing user, you return a success message with the data of the invitation which can be accessed in the client-side components.

    ```javascript title="app/api/invite-member/route.ts"
    return Response.json(
        { message: "User invited successfully!", data: inviteUserData },
        { status: 200 }
    );
    ```

    Once the user is invited, they should get an invitation to join the team as follows.

    ![Member invite]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image15.png){: width="550" style="display: block; margin: 0;"}

### Get roles

#### Create API route

Create a new API route at `app/api/get-roles/route.ts` to fetch the roles we created in **step 4**

```javascript title="app/api/get-roles/route.ts"
import { auth } from "@/app/auth"
import { Session } from "@auth/core/types"

export async function POST(req: Request) {
    // Implementation
}
```

#### Implementation

The implementation involves two main steps: first retrieving your application ID, then using that ID to fetch the roles associated with your application.

1. Get the application ID

    Before fetching roles, you need to retrieve your application ID using the application name:

    ```javascript

    // Get Application ID
    const getAppResponse = await fetch(
    `${process.env.ASGARDEO_BASE_URL}/o/api/server/v1/applications?filter=name%20eq%20${process.env.APP_NAME}`,
    {
        method: "GET",
        headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        },
    }
    );

    if (!getAppResponse.ok) {
    throw new Error(`HTTP error! Status: ${getAppResponse.status}`);
    }

    const data = await getAppResponse.json();
    const appId = data?.applications[0]?.id;

    ```

2. Fetch roles

    The SCIM2 Roles API endpoint (`/scim2/v2/Roles`) allows you to query roles based on various filters. In this case, we're filtering by `audience.value` to get only the roles associated with our specific application.

    Use the application ID as the audience value and fetch the roles as follows:

    ```javascript

    // Fetch roles
    const getRolesResponse = await fetch(
    `${process.env.ASGARDEO_BASE_URL}/o/scim2/v2/Roles?filter=audience.value%20eq%20${appId}`,
    {
        method: "GET",
        headers: {
        Authorization: `Bearer ${session.user.access_token}`,
        "Content-Type": "application/json",
        },
    }
    );

    if (!getRolesResponse.ok) {
    throw new Error(`HTTP error! Status: ${getRolesResponse.status}`);
    }

    const rolesData = await getRolesResponse.json();
    ```

    Finally, return the roles data to the client:

    ```javascript
    return Response.json({ roles: rolesData.Resources || [] }, { status: 200 });
    ```

The roles returned by this endpoint include all the information needed for role assignment, including the role ID, display name, and other attributes. This data can be used in your invite member form to allow users to select which role to assign to new team members.

### Component implementation

To implement the team member invitation functionality in your application's UI, you'll need to create a component that allows users to invite new members by email and select their role. Below is an implementation of the `InviteMemberForm` component:

```javascript title="InviteMemberForm"
"use client";

export default function InviteMemberForm() {

//Fetch roles
useEffect(() => {
  async function fetchRoles() {
    // Call the API endpoint we created to fetch roles.
    const response = await fetch("/api/get-roles");

    if (response.ok) {
      // set roles.
    }
  }

  fetchRoles();
}, []);

// Handle form submission to invite a team member
async function handleSubmit(event) {

  event.preventDefault();
  const formData = new FormData(event.target);
  // Set form data...
  
  // Call the API route to invite the member
  const response = await fetch("/api/invite-member", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, selectedRoleId: roleId }),
  });

  if (response.ok) {
    // Handle success
  }
}

  return (
    <div>
      <h2>Invite Team Member</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
          />
        </div>
        
        <div>
          <label htmlFor="roleId">Role</label>
          <select id="roleId" name="roleId" required>
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.displayName}
                </option>
              ))
          </select>
        </div>
        
        <button type="submit">Invite</button>
      </form>
    </div>
  );
}
```

## Get the list of users in your team

Let's look at how to fetch all users that belong to a switched team.

### Create API route

Create a new API route at `app/api/app/api/get-users/route.ts` to fetch team members:

```javascript title="app/api/get-users/route.ts"
import { auth } from "@/app/auth"
import { Session } from "@auth/core/types"

export async function GET() {
    // Implementation
}
```

### Implementation

We can use the SCIM2 users API endpoint to fetch all users that belong to a team.

```javascript title="app/api/get-users/route.ts"
export async function GET() {
    const session: Session | null = await auth();

    try {
        const getUsersResponse = await fetch(
            `${process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL}/o/scim2/Users`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session?.user?.access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!getUsersResponse.ok) {
            throw new Error(`HTTP error! Status: ${getUsersResponse.status}`);
        }

        const userData = await getUsersResponse.json();
        return Response.json({ users: userData.Resources || [] }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return Response.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
```

### Component implementation

To display the current team members, you can create a `TeamMembers` component that fetches and displays the list of members in the current team:

```javascript title="TeamMembers.tsx"
"use client";

export default function TeamMembers() {

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/get-users");
        const data = await response.json();
        
        if (response.ok) {
          // Set members
        }
    }

    fetchMembers();
  }, []);

  return (
    <div className="team-members">
      <h2>Team Members</h2>
      
      {members.length === 0 ? (
        <p>No members in this team yet.</p>
      ) : (
        <ul className="member-list">
          {members.map((member) => (
            <li key={member.id} className="member-item">
              <div className="member-info">
                <h3>{member.userName}</h3>
              </div>
              <div className="member-role">
                {member.roles?.[0]?.display || "No Role"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

!!! note
    Refer to Step 5 of the GitHub [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app){:target="\_blank"} for the complete implementation.

With this guide, you've learnt to built a Next.js team management app with Asgardeo for authentication, team management, and team switching. Enhance it further by adding [branding]({{base_path}}/guides/branding/configure-ui-branding/){:target="\_blank"} or integrating more Asgardeo features to fit your needs. 🚀
