# Connect a remote user store

You can connect your on-premise user store to WSO2 Identity Server and onboard users and groups from it. Depending on your requirement, you can provide the user store connection either read-only or read/write privilges.

Follow the guide below to connect a remote user store to WSO2 Identity Server.

## Register a remote user store
To configure a remote user store for your organization:

1. On the WSO2 Identity Server Console, go to **User Attributes & Stores** > **User Stores**.
2. Click **New User Store** to open the following:

    ![Register remote user store to WSO2 Identity Server]({{base_path}}/assets/img/guides/user-stores/register-user-store.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Enter the following details about the user store.
    <table>
        <tr>
            <td>Name</td>
            <td>A unique name to identify your user store.</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>A description for the user store.</td>
        </tr>
        <tr>
            <td>Remote user store type</td>
            <td>Select your user store type</td>
        </tr>
        <tr>
            <td>Access Type</td>
            <td>
            Select the access type of the user store. It can be any one of the following: <br> - Read-only
            <br> - Read/Write <br> Note : The access type of the user store cannot be modified after creation.
        </td>
        </tr>
    </table>

4. Click **Next** and under **Map Attributes**, map **Username** and **User ID** attributes to that of your user store.

    !!! warning
        These two attributes need to be mapped correctly for proper authentication.

        - `Username` - This attribute is used as the user identifier. Provide an attribute that identifies your user in your on-premise user store. For the best experience, use a username that satisfies validation rules in [Username Validation]({{base_path}}/guides/user-accounts/account-login/username-validation/) section.
        - `User ID` - This attribute is used to uniquely identify a user entry. Provide an attribute that uniquely identifies a user entry in your user store.

5. Click **Finish** to complete the registration.

## Set up the remote user store

After registering the user store, you'll be redirected to the **Setup Guide** of the user store agent.

To assemble and configure the user store agent bundle:

1. Download the user store agent.

2. Configure the properties and connection details of the local user store by following these steps:

    1. Unzip the downloaded user store agent.
    2. Go to the root directory of the user store agent and open the `deployment.toml` file.
    3. Update the configurations of the `deployment.toml` file according to your user store settings. A sample configuration is given below for reference.

        ```conf 
        [user_store]
        type = "ldap"
        base_dn = "dc=wso2,dc=org"
        connection_url = "ldap://localhost:10391"
        connection_name = "cn=admin,dc=example,dc=org"
        connection_password = "adminpassword"
        user_id_search_filter = "(&amp;(objectClass=inetOrgperson)(uid=?))"
        user_name_list_filter = "(objectClass=inetOrgperson)"
        user_id_attribute = "uid"
        user_name_attribute = "cn"
        user_name_search_filter = "(&amp;(objectClass=inetOrgperson)(cn=?))"
        password_hash_method = "PLAIN_TEXT"
        group_search_base = "ou=Groups,dc=example,dc=org"
        group_name_attribute = "cn"
        group_name_search_filter = "(&amp;(objectClass=groupOfNames)(cn=?))"
        group_name_list_filter = "(objectClass=groupOfNames)"
        group_id_attribute = "gid"
        membership_attribute = "member"
        ```

        !!! note
            Refer [remote user store properties]({{base_path}}/references/remote-user-store/remote-user-store-properties/) for the complete list of user store configurations.

3. Return to the WSO2 Identity Server Console and, click **Generate Token** to create an installation token. The installation token is essential to run the user store agent.

    !!! warning
        - Copy the installation token and save it in a safe location. You won't be able to see it again!
        - This token has no expiry time, but in case you lose or forget it, you can [regenerate an installation token]({{base_path}}/guides/users/user-stores/update-user-stores/#regenerate-the-installation-token).

4. To start the user store agent, navigate to its root directory and run one of the following commands based on your operating system:

    === "Linux/OSx"
        ``` json 
        sh wso2agent.sh
        ```

    === "Windows"
        ``` json 
        wso2agent.bat -- run
        ```

    Enter the installation token generated in the previous step when prompted.


    ??? note "(Optional) Run the user store agent as a background process"
        1. Create a file named `accessToken` in the root directory of the agent.
        2. Add the installation token obtained from the previous step.
        3. Run the user store agent.

            === "Linux/OSx"
                ``` json
                sh wso2agent.sh start
                ```
            === "Windows"
                ``` json
                wso2agent.bat start
                ```

## What's Next

- [Configure high availability for a remote user store]({{base_path}}/guides/users/user-stores/configure-high-availability/)
- [Manage remote user stores in WSO2 Identity Server]({{base_path}}/guides/users/user-stores/update-user-stores/)
