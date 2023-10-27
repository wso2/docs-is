# Configure high availability for a remote user store

It is recommended to maintain high availability for your remote user store in Asgardeo as it includes user information that must be available at all times.

To maintain high availability for the remote user store, you need to connect a second user store agent.

## Prerequisites

[Configure and connect a remote user store]({{base_path}}/guides/users/user-stores/configure-a-user-store/) in Asgardeo.

## Connect a second user store agent

To connect a second user store agent:

1. On the Asgardeo Console, go to **User Management** > **User Stores**.
2. Select your user store from the **User stores** list.
3. In the **General** tab, a second user store agent is listed under **User Store Agent Connection(s)**.
4. Click **Generate token** on the second user store agent.

    ![Generate isatallation token for second user store agent.]({{base_path}}/assets/img/guides/user-stores/generate-second-token.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        An installation token can only be used to connect to one user store agent. You cannot use the same installation token to run a second agent.

5. Run a second user store agent by navigating to its root directory and by using one of the following commands based on your operating system:

    === "Linux/OSx"
        ``` json 
        sh wso2agent.sh
        ```

    === "Windows"
        ``` json 
        wso2agent.bat
        ```

    Enter the second installation token generated in the previous step when prompted.
