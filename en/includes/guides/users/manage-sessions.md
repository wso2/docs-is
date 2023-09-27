# Manage active sessions

A session corresponds to the time a user spends on an application from one user agent (e.g., browser) instance. We can consider one session as the time interval between a user's login and logout.

{{ product_name }} maintains user sessions based on session cookies. Active sessions in {{ product_name }} are terminated in the following instances:

- User closes the browser
- User tries to terminate the sessions via the {{ product_name }} Console and My Account
- User logs out of an application
- User resets the password

Active sessions can be terminated explicitly by using the session management APIs as well.

An administrator or an owner can view and terminate the active session(s) of users via the {{ product_name }} Console.

## View active sessions of users

To view all active sessions of a user:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Select a user and click **Edit**.
3. Go to **Active Sessions** to view details.

    ![view-active-sessions]({{base_path}}/assets/img/guides/users/view-active-sessions.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Terminate active sessions

You can terminate a specific user session or terminate all active sessions for the user.

To terminate a specific active session of a user:

1. On the Asgardeo Console, go to **User Management** > **Users**.
2. Select a user and click **Edit**.
3. Go to **Active Sessions** and expand the required session.
4. Click  **Terminate** to terminate the respective session only.
5. Select the checkbox to confirm your action and click **Confirm**.

To terminate all active sessions of a user:

1. On the Asgardeo Console, go to **User Management** > **Users**.
2. Select a user and click **Edit**.
3. Go to **Active Sessions** and click **Terminate All**. This will terminate all the sessions of that user.
4. Select the checkbox to confirm your action and click **Confirm**.

