# Manage remote user stores in Asgardeo
This guide walks you through the process of managing your remote user stores via the Asgardeo Console.

## Update attribute mappings

To update attribute mappings via the Asgardeo Console:

1. On the Asgardeo Console, go to **User Management** > **User Stores**.
2. Select your user store from the **User stores** list.
3. Go to the **Attribute Mappings** tab and update the required information.

    !!! note

        - Update **Custom Attributes** and **Local Attributes** mapped to your user store.
        - Map Asgardeo attributes with the corresponding on-premise user store attributes.

4. Click **Update** to save the configurations.

## Disconnect a user store agent

To disconnect a user store agent:

1. On the Asgardeo Console, go to **User Management** > **User Stores**.
2. Select your user store from the **User stores** list.
3. In the **User Store Agent Connection(s)** section, click **Disconnect** on the user store agent that you wish to disconnect.
4. Select the checkbox to confirm your action and click **Confirm**.

## Regenerate an installation token

An installation token is used to run a user store agent. Once generated, an installation token is displayed only once.

In case you forget or lose this installation token, you can regenerate it.

!!! warning
    - If you regenerate a token without disconnecting the user store agent, the agent will be disconnected forcefully. You will need to re-run the user store agent with the new installation token.

    - If the token is compromised, it is essential to regenerate an installation token.

To regenerate an installation token:

1. On the Asgardeo Console, go to **User Management** > **User Stores**.
2. Select your user store from the **User Stores** list and go to the **General** tab.
3. In the **User Store Agent Connection(s)** section, click **Regenerate Token** on the user store agent that you wish to regenerate the token for.


## Disable a user store

!!! warning
    If you disable a user store, its users will lose access to Asgardeo applications and administrators can no longer view users or groups of that user store in the Asgardeo Console.

To disable a user store:

1. On the Asgardeo Console, go to **User Management** > **User Stores** and select your user store.
2. Turn on the **Disable User Store** toggle at the bottom of the page to disable the user store.

    ![Disable a user store]({{base_path}}/assets/img/guides/user-stores/disable-user-store.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        You can re-enable a disabled user store by switching off the toggle.

## Delete a remote user store

A user store can be deleted by an administrator. Once a user store is deleted, the action is irreversible.

!!! note
    Once you delete the remote user store the user store agents associated with this user store will be forcefully disconnected.

To delete a user store:

1. On the Asgardeo Console, go to **User Management** > **User Stores** and select your user store.
2. Click **Delete User Store** at the bottom of the page.

    ![Disable a user store]({{base_path}}/assets/img/guides/user-stores/delete-user-store.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. On the pop-up window, type the user store name and click **Confirm** to delete the user store.
