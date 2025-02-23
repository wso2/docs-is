---
template: templates/complete-guide.html
heading: Manage team members
read_time: 2 min
---

## Invite members

This invite-member flow integrates seamlessly with Asgardeo B2B to handle both new and existing users. The flow is efficient in checking whether a user exists and proceeding accordingly. You can easily extend this flow by adding more properties or integrating additional business logic depending on your requirements.

!!! note
    Read more on [inviting users from parent organization.]({{base_path}}/guides/organization-management/invite-parent-organization-users/)

The implementation in the app handles two scenarios:

- Inviting new users (Ask Password flow)
- Inviting existing users (Guest invitation)

![Members flow]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image14.png){: width="350" style="display: block; margin: auto;"}

1. Extract User Input

    First, we extract the invited user’s details (email, role) from the request body. If any required field is missing, we return a 400 Bad Request error.

    ```javascript
    const { email, selectedRoleId } = await req.json();
    if (!email || !selectedRoleId) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    ```

2. Check if User Exists

    We send a GET request to check whether the user already exists.

    ```javascript
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

3. User Invitation for New Users

    If the user does not exist, you invite them using the Ask Password Flow:

    ```javascript
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

4. User Invitation for Existing Users

    If the user already exists, you invite them using a different API endpoint designed for existing users.

    ```javascript
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

    ```javascript
    return Response.json(
        { message: "User invited successfully!", data: inviteUserData },
        { status: 200 }
    );
    ```

    Once the user is invited, they should get an invitation to join the team as follows.

![Member invite]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image15.png){: width="550" style="display: block; margin: 0;"}

## Get the list of users in your team

We can use the SCIM2 users API endpoint to fetch all users that belong to a team.

Use the following server-side code to retrieve the users:

```javascript title="app/api/get-users/route.ts"
import { Session } from "@auth/core/types";
import { auth } from "@/app/auth";

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

!!! note
    Refer to Step 5 of the GitHub [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app) for the complete implementation.

With this guide, you've learnt to build a B2B application in Next.js that integrates with Asgardeo for authentication, team management, and organization switching. 

By following these steps, your app now supports secure user sign-up, login, and seamless team transitions. You can further enhance it by adding [branding]({{base_path}}/guides/branding/configure-ui-branding/) to the UI, or integrating additional Asgardeo features to match your business needs. 🚀
