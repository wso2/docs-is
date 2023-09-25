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

1. On the {{ product_name }} Console, select **Users**.
2. Select a user and click **Edit**.
3. Go to **Active Sessions** to view details.

    ![view-active-sessions](../../assets/img/guides/users/view-active-sessions.png)


## Terminate active session/sessions

4. Click  **Termination Sessions** under the selected session. This terminates the respective session only.
5. Click **Termination All**. This will terminate all the sessions of that user.
