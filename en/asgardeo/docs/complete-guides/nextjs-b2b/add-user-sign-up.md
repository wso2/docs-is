---
template: templates/complete-guide.html
heading: Add user sign up to your app
read_time: 2 min
---

In this step, we implement user sign-up in Asgardeo using SCIM APIs and OAuth 2.0 Client Credentials Flow. The implementation consists of the following key steps:

1. Extract User Input

    First, we extract user details (email, password, firstName, and lastName) from the request body. If any required field is missing, we return a 400 Bad Request error.

    ```javascript
    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password || !firstName || !lastName) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    ```

2. Get an Access Token from the root organization

    To interact with Asgardeo's SCIM API, we need an OAuth 2.0 access token. We obtain this using the Client Credentials grant type.

    ```javascript
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

    ```javascript
    if (!tokenResponse.ok) {
        throw new Error(
            `HTTP error! status: ${tokenResponse.status}`
        );
    }
    ```

    Once successful, we extract the access token:

    ```javascript
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData?.access_token;
    ```

3. Create User in Root Organization

    Using the obtained access token, we make a SCIM API request to create the user in the root organization where the application is created.

    ```javascript
    const userResponse = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/scim2/Users`,
        {
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
        }
    );
    ```

    Extract the user ID to retrieve the application ID.

4. Retrieve Application ID

    To assign the user to a role, we first need the Application ID. We fetch it using the application name.

    ```javascript
    const getAppResponse = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/api/server/v1/applications?filter=name%20eq%20${process.env.APP_NAME}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    ```

    If successful, we extract the application ID.

5. Retrieve Role ID

    Now, we fetch the Role ID associated with the application.

    ```javascript
    const getRolesResponse = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/scim2/v2/Roles?filter=displayName%20eq%20${encodeURIComponent(process.env.B2B_ADMIN_ROLE_NAME!)}%20and%20audience.value%20eq%20${appId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    ```

    If successful, extract the role ID.

6. Assign Role to User

    We now assign the retrieved role to the newly created user via a PATCH request.

    ```javascript
    const assignRoleResponse = await fetch(
        `${process.env.ASGARDEO_BASE_URL}/scim2/v2/Roles/${roleId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Operations: [
                    {
                        op: "add",
                        path: "users",
                        value: [{ value: userId }],
                    },
                ],
            }),
        }
    );
    ```

    Finally, if all steps succeed, we return a success message and use that in the client side.

    !!! Info
        - SCIM API Documentation: Refer to the Asgardeo SCIM API documentation for more details: [Managing Users with SCIM]({{base_path}}/guides/users/manage-users/)
        - OAuth 2.0 Token Generation: Read more on OAuth 2.0 Client Credentials Grant in Asgardeo: [Obtaining Tokens]({{base_path}}/references/grant-types/#client-credentials-grant)
        - Role Management: Learn about assigning roles using Asgardeo: [Managing Roles]({{base_path}}/guides/users/manage-roles/)

    !!! Note
        Refer to Step 1 of the Github [sample app repository](https://github.com/savindi7/asgardeo-next-b2b-sample-app) for the complete implementation.
