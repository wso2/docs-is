# Configure high availability

Remote user stores must be highly available to ensure continuous access to critical user information. To maintain high availability, we highly recommend you to follow this guide and connect a second user store agent.

## Prerequisites

[Configure and connect a remote user store]({{base_path}}/guides/users/user-stores/configure-a-user-store/) in Asgardeo.

## Connect a second user store agent

To connect a second user store agent:

1. On the Asgardeo Console, go to **User Attributes & Stores** > **User Stores**.
2. Select your user store from the **User stores** list.
3. In the **General** tab, a second user store agent is listed under **User Store Agent Connection(s)**.
4. Click **Generate token** on the second user store agent.

    ![Generate isatallation token for second user store agent.]({{base_path}}/assets/img/guides/user-stores/generate-second-token.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        An installation token can only be used to connect to one user store agent. You cannot use the same installation token to run a second agent.

5. Run a second user store agent by navigating to its root directory. Use one of the commands below.

    === "Optimized Agent"

        Run the command corresponding to your operating system. Make sure to configure the installation token similarly to the primary agent.

        === "Linux/Unix"

            ```bash
            ./remoteagent
            ```
        
        === "Windows"

            ```bash
            remoteagent
            ```
        
        

    === "Classic Agent"

        Run the command corresponding to your operating system. When prompted, enter the second installation token generated in the previous step.

        === "Linux/Unix"

            ```bash
            sh wso2agent.sh
            ```

        === "Windows"

            ```bash
            wso2agent.bat
            ```

        
