

In this step, we implement user sign up using SCIM APIs and OAuth 2.0 Client Credentials Flow. The implementation includes user creation, role assignment, and error handling.

Key steps of the sign up flow:

![Sign up]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image16.png){: width="400" style="display: block; margin: auto;"}

## Create API route

You can create a new API route at `app/api/signup/route.ts` to handle user registration and create helper functions to manage user creation, role assignment, and API interactions with Asgardeo. This route handles the complete sign-up flow, from validating user input to creating new users or updating existing ones with appropriate roles. The implementation should be placed in the `POST` method of this route file.

```javascript title="app/api/sign-up/route.ts"
// Add imports (e.g., helper functions)

export async function POST(req: Request) {
    // implementation
}
```

## Implementation

Now that you have created your API route, follow the steps below to implement the sign-up functionality in the `POST` method handler. After implementing the main flow, we'll create the helper functions needed for managing user creation, role assignment, and API interactions with Asgardeo:

1. Extract user input

    First, we extract user details (email, password, firstName, and lastName) from the request body. If any required field is missing, we return a 400 Bad Request error.

    ```javascript title="app/api/signup/route.ts"
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    ```

2. Get an access token from the root organization

    To interact with Asgardeo's SCIM API, we need an OAuth 2.0 access token. We obtain this using the Client Credentials grant type.

    ```javascript title="app/api/sign-up/route.ts"
    const tokenResponse = await fetch(
        process.env.AUTH_ASGARDEO_ISSUER,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: process.env.AUTH_ASGARDEO_ID!,
                client_secret: process.env.AUTH_ASGARDEO_SECRET!,
                scope: process.env.AUTH_SCOPE!,
            }).toString(),
        }
    );
    ```

    If the token request fails, we return an error.

    ```javascript title="app/api/sign-up/route.ts"
    if (!tokenResponse.ok) {
        throw new Error(
            `HTTP error! status: ${tokenResponse.status}`
        );
    }
    ```

    Once successful, we extract the access token:

    ```javascript title="app/api/sign-up/route.ts"
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData?.access_token;
    ```

3. Retrieve Application ID

    To assign the user to a role, we first need the Application ID. We fetch it using the application name.

    ```javascript title="app/api/sign-up/route.ts"
    const appId = await getAppId(accessToken);
    if (!appId) {
        return Response.json(
            { error: "Failed to fetch application details" },
            { status: 500 }
        );
    }
    ```

4. Retrieve Role ID

    Using the App ID, we fetch the Role ID associated with the application.

    ```javascript title="app/api/sign-up/route.ts"
    const roleId = await getRoleId(accessToken, appId);
    if (!roleId) {
        return Response.json(
            { error: "Failed to fetch role details" },
            { status: 500 }
        );
    }
    ```

5. Check Existing User

    Before creating a new user, we check if the user already exists.

    ```javascript title="app/api/sign-up/route.ts"
    const existingUser = await getUser(accessToken, email);
    if (existingUser) {
        const isAdmin = existingUser?.roles?.includes(
            process.env.ADMIN_ROLE_NAME!
        );
        
        if (isAdmin) {
            return Response.json(
                { error: "User already exists and has admin role" },
                { status: 400 }
            );
        }
    }
    ```

6. Create User or Assign Role

    If the user doesn't exist, create them. Otherwise, assign the role to the existing user.

    ```javascript title="app/api/sign-up/route.ts"
    if (!existingUser) {
        // Create new user
        const userId = await createUser(
            accessToken,
            email,
            firstName,
            lastName,
            password
        );
        
        if (!userId) {
            return Response.json(
                { error: "User creation failed" },
                { status: 500 }
            );
        }

        // Assign role to new user
        if (await assignUserRole(accessToken, roleId, userId)) {
            return Response.json(
                { message: "User registered successfully!" },
                { status: 200 }
            );
        }
    } else {
        // Assign role to existing user
        if (await assignUserRole(accessToken, roleId, existingUser.id)) {
            return Response.json(
                { message: "User role assigned successfully!" },
                { status: 200 }
            );
        }
    }
    ```

**Helper functions required for the above implementation:**

You can create these functions inside `app/api/services/` path.

```javascript title="app/api/services/appService.ts"
// Get Application ID
async function getAppId(accessToken: string): Promise<string | null> {
    const response = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/api/server/v1/applications?filter=name%20eq%20${process.env.APP_NAME}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data?.applications[0]?.id || null;
}
```

```javascript title="app/api/services/roleService.ts"
// Get Role ID
async function getRoleId(accessToken: string, appId: string): Promise<string | null> {
    const response = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/scim2/v2/Roles?filter=displayName%20eq%20${encodeURIComponent(process.env.ADMIN_ROLE_NAME!)}%20and%20audience.value%20eq%20${appId}`,
        {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json" 
            },
        }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data?.Resources?.[0]?.id || null;
}
```

```javascript title="app/api/services/userService.ts"
// Check if user exists
async function getUser(accessToken: string, email: string): Promise<any | null> {
    const response = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/scim2/Users?filter=emails eq "${email}"`,
        {
            method: "GET",
            headers: { 
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json" 
            },
        }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data?.totalResults > 0 ? data?.Resources[0] : null;
}


// Create user
export async function createUser(
  accessToken: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<string | null> {
  const response = await fetch(`${process.env.ASGARDEO_BASE_URL}/scim2/Users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emails: [{ primary: true, value: email }],
      name: { familyName: lastName, givenName: firstName },
      password: password,
      userName: `DEFAULT/${email}`,
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data?.id || null;
}
```

```javascript title="app/api/services/roleService.ts"
// Assign role to user
export async function assignRole(accessToken: string, roleId: string, userId: string) {
    const response = await fetch(
      `${process.env.ASGARDEO_BASE_URL}/o/scim2/v2/Roles/${roleId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Operations: [{ op: "add", path: "users", value: [{ value: userId }] }],
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
}
```

Finally, if all steps succeed, we return a success message and use that in the sign up form component.

## Implement sign up form component

To complete the sign-up flow, we need to create a sign-up form component that will call the API route we created at `app/api/signup/route.ts`. Below is an example implementation of the `SignUpForm` client-side component:

```javascript title="components/SignUpForm.tsx"
"use client";

export default function SignUpForm() {
    async function handleSignUp(formData: FormData) {
        // Call API route using fetch
        const res = await fetch("/api/signup", {
            method: "POST",
            body: formData,
        });
        // Handle response
        if (res.ok) {
            // Handle successful sign-up
            console.log("User registered successfully!");
        } else {
            // Handle errors
            const errorData = await res.json();
            console.error("Error:", errorData.error);
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSignUp(formData);
        }}>
            {/* Sign up form content */}
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="text" name="firstName" placeholder="First Name" required />
            <input type="text" name="lastName" placeholder="Last Name" required />
            <button type="submit">Sign Up</button>
        </form>
    );
}
```

This component includes a form with fields for email, password, first name, and last name. When the form is submitted, it calls the `handleSignUp` function, which sends the form data to the API route for processing.

!!! Info
    Read more on:
    - [Managing Users with SCIM]({{base_path}}/guides/users/manage-users/){:target="\_blank"}
    - [OAuth 2.0 Client Credentials Grant]({{base_path}}/references/grant-types/#client-credentials-grant){:target="\_blank"}

!!! Note
    Refer to Step 1 of the Github [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app){:target="\_blank"} for the complete implementation.
