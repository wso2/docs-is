# Connect a remote user store

!!! tip

    Asgardeo now offers an optimized remote user store connection designed for high scalability and performance. Currently this version only allows connecting a read-only user store with the remote user authentication.

    The new connection is continuously evolving to support more use cases in the future. For extended capabilities like read-write user stores, the classic remote user store remains available.

    If you have already connected a classic user store and would like to explore the new connection,

    1. Delete the existing remote user store.
    2. [Register a remote user store](#register-a-remote-user-store) again.
    3. [Set up the remote user store](#set-up-the-remote-user-store) with the new user store agent.

!!! note
    If you have connected a classic user store before 7th February 2023, you will have Read-Only access for the user store.
    If you need Read-Write access for your user store on Asgardeo,

    1. Delete the existing remote user store.
    2. [Register a classic user store](#register-a-remote-user-store) again with Read/Write access type. Make sure to select the classic user store path.
    3. [Set up the remote user store](#set-up-the-remote-user-store) with the latest user store agent.

You can connect your on-premise user store to Asgardeo and onboard users and groups from it. You can connect a user store to Asgardeo with read-only or read/write privileges.

Administrators can manage access to business applications and manage users and groups based on the access type of the user store.

Follow the guide below to set up a remote user store in Asgardeo.

## Prerequisites

- An on-premise user store. Currently, Asgardeo supports:

    - Lightweight Directory Access Protocol (LDAP)
    - Active Directory (AD)

- If using a classic user store, to run the user store agent, you need to have:
   
    - JAVA 8 or JAVA 11 installed locally
    - JAVA_HOME configured correctly

??? note "Requirements"
    - Recommended hardware requirements
        <table>
            <tr>
                <td><b>CPU cores</b></td>
                <td><code>2</code></td>
            </tr>
            <tr>
                <td><b>Storage</b></td>
                <td><code>500 MB</code> of free space on disk.</td>
            </tr>
            <tr>
                <td><b>Operating system</b></td>
                <td>The connector can run on Windows or Linux.</td>
            </tr>
            <tr>
                <td><b>RAM</b></td>
                <td><code>1 GB</code></td>
            </tr>
        </table>

    - Connectivity methods
        <table>
            <tr>
                <td></td>
                <td><b>Classic</b></td>
                <td><b>Optimized</b></td>
            </tr>
            <tr>
                <td><b>Protocol</b></td>
                <td>Web socket</td>
                <td>gRPC</td>
            </tr>
            <tr>
                <td><b>Port</b></td>
                <td>443</td>
                <td>9005</td>
            </tr>
        </table>

## Register a remote user store
To configure a remote user store for your organization:

1. On the Asgardeo Console, go to **User Attributes & Stores** > **User Stores**.

2. Click **Connect userstore** to open the following:

    ![Register remote user store to Asgardeo]({{base_path}}/assets/img/guides/user-stores/register-user-store-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. If your use case doesn't align with the optimized user store connection, click **Classic User Store Connection** text.

4. Enter the following details about the user store.
    <table>
        <tr>
            <td><b>User store name</b></td>
            <td>A unique name to identify your user store.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>A description for the user store.</td>
        </tr>
        <tr>
            <td><b>Remote user store type</b></td>
            <td>Select your user store type</td>
        </tr>
        <tr>
            <td><b>Access type</b><br>(Only for classic user stores)</td>
            <td>
            Select the access type of the user store. It can be any one of the following: 
            <br> - Read-only
            <br> - Read/Write
            <br><br><b>Note:</b> The access type of the user store cannot be modified after creation.
        </td>
        </tr>
    </table>

5. Click **Next** and under **Configurations**, provide the properties of your user store.

    ![Configure remote user store properties]({{base_path}}/assets/img/guides/user-stores/register-user-store-configurations.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <td colspan="2" style="text-align: center;"><b>User attributes</b></td>
        </tr>
        <tr>
            <td><b>Username</b></td>
            <td>This attribute is used as the user identifier. Provide an attribute that identifies users in your on-premise user store. 
            <br>For the best experience, use a username that satisfies validation rules in the [Username validation]({{base_path}}/guides/user-accounts/account-login/username-validation/) section.</td>
        </tr>
        <tr>
            <td><b>User Id</b></td>
            <td>This attribute is used to uniquely identify a user entry. Provide an attribute that uniquely identifies a user entry in your user store.</td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center;"><b>Group attributes</b></td>
        </tr>
        <tr>
            <td><b>Read groups</b></td>
            <td>Enable to retrieve groups from the user store.</td>
        </tr>
        <tr>
            <td><b>Group name</b> <br>(Not required for classic user stores)</td>
            <td>This attribute is used as the group identifier. Provide an attribute that identifies groups in your on-premise user store.</td>
        </tr>
        <tr>
            <td><b>Group Id</b> <br>(Not required for classic user stores)</td>
            <td>This attribute is used to uniquely identify a group. Provide an attribute that uniquely identifies a group in your user store.</td>
        </tr>
    </table>

    !!! warning

        - **Username** and **User Id** attributes need to be mapped correctly for proper authentication. **Group name** and **Group Id** attributes require to be mapped correctly when the **Read groups** is enabled.
        {% if multi_valued_attributes %}
        - Additionally, for Non-JDBC user stores, ensure that multiple email addresses and mobile numbers attributes are properly configured by following the instructions in the [Assign multiple email addresses and mobile numbers to 
        a user]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user) section.
        {% endif %}

6. Click **Finish** to complete the registration.

5. Click **Finish** to complete the registration.

## Set up the remote user store

After registering the user store, you'll be redirected to the **Setup Guide** of the user store agent.

To assemble and configure the user store agent bundle:

=== "Optimized Agent"

    1. Download the user store agent according to your Operating System.

    2. Optionally verify the integrity of the downloaded file with the following steps.

        - **Linux/Unix:**

            Copy the displayed hash value and run the following command in the same directory where the zip file is downloaded.

            ```bash
            echo "<hash_value>  remoteagent_linux.zip" | sha256sum -c
            ```
        
        - **Windows:**

            Run the following command in a Command prompt in the same directory where the zip file is downloaded and compare the output hash value with the displayed one in the console.

            ```bash
            CertUtil -hashfile remoteagent_windows.zip SHA256
            ```
    
    3. Configure the properties and connection details of the on-premise user store by following these steps:

        1. Unzip the downloaded user store agent.

        2. Go to the root directory of the user store agent and open the `deployment.toml` file.

        3. Update the configurations according to your requirements and user store settings. A sample configuration is given below for the reference.

            ```conf
            [system]
            idle_connections = 10
            connection_retry_count = 5
            connection_retry_interval = 5

            [user_store]
            type = "ldap"
            connection_url = "ldap://localhost:1389"
            connection_name = "cn=admin,dc=example,dc=org"
            connection_password = "adminpassword"
            connection_timeout = 5000
            connection_retry_count = -1

            [user_store.properties]
            user_search_base = "ou=Users,dc=example,dc=org"
            user_entry_object_class = "inetOrgperson"
            user_id_attribute = "uid"
            user_name_attribute = "cn"
            user_search_filter = "(&(objectClass=inetOrgperson)(?=?))"
            user_list_filter = "(objectClass=inetOrgperson)"
            read_groups = "true"
            group_search_base = "ou=Groups,dc=example,dc=org"
            group_entry_object_class = "groupOfNames"
            group_search_filter = "(&(objectClass=groupOfNames)(?=?))"
            group_list_filter = "(objectClass=groupOfNames)"
            group_name_attribute = "cn"
            membership_attribute = "member"
            ```

            !!! note

                Refer [remote agent properties]({{base_path}}/references/remote-user-store/remote-user-store-properties/) for the complete list of agent configurations.

    4. Return to the Asgardeo Console and click **Generate Token** to create an installation token. The installation token is essential to run the user store agent. The token can be configured in one of the following ways.

        1. Configure the token in the configuration file

            Add the following configurations to the `deployment.toml` file to configure the installation token.
            
            ```conf
            [security]
            token = "<token>"
            ```

            The installation token can be encrypted using the provided cipher tool. See how to [configure secrets in the agent configuration file]({{base_path}}/references/remote-user-store/advanced-configurations#configure-secrets-in-agent-configuration-file/).

        2. Configure the token as an environment variable

            For containerized or cloud-native environments like Kubernetes, the installation token can be stored as an environment variable, typically configured through Kubernetes secrets. You can define the installation token with the following environment variable.

            ```bash
            export ACCESS_TOKEN = "<token>"
            ```
        
        !!! warning

            - Copy the installation token and save it in a safe location. You won't be able to see it again!
            - Your token is your responsibility. Choose the right method that fits your deployment and securely store the token.
            - This token has no expiry time, but in case you lose or forget it, you can [regenerate the token]({{base_path}}/guides/users/user-stores/update-user-stores/#regenerate-the-installation-token).
    
    5. To start the user store agent, navigate to its root directory and run one of the following commands based on your operating system:

        - **Linux/Unix:**

            ```bash
            ./remoteagent
            ```
        
        - **Windows:**

            ```bash
            remoteagent
            ```

=== "Classic Agent"

    1. Download the user store agent.

    2. Configure the properties and connection details of the on-premise user store by following these steps:

        1. Unzip the downloaded user store agent.

        2. Go to the root directory of the user store agent and open the `deployment.toml` file.

        3. Update the configurations according to your user store settings. A sample configuration is given below for the reference.

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

                Refer [remote agent properties]({{base_path}}/references/remote-user-store/remote-user-store-properties/) for the complete list of agent configurations.

    3. Return to the Asgardeo Console and, click **Generate Token** to create an installation token. The installation token is essential to run the user store agent.

        !!! warning
            - Copy the installation token and save it in a safe location. You won't be able to see it again!
            - This token has no expiry time, but in case you lose or forget it, you can [regenerate an installation token]({{base_path}}/guides/users/user-stores/update-user-stores/#regenerate-the-installation-token).

    4. To start the user store agent, navigate to its root directory and run one of the following commands based on your operating system:

        - **Linux/Unix:**

            ```bash
            sh wso2agent.sh
            ```

        - **Windows:**

            ```bash
            wso2agent.bat -- run
            ```

        Enter the installation token generated in the previous step when prompted.

        ??? note "(Optional) Run the user store agent as a background process"
            1. Create a file named `accessToken` in the root directory of the agent.
            2. Add the installation token obtained from the previous step.
            3. Run the user store agent.

                - **Linux/Unix:**

                    ``` bash
                    sh wso2agent.sh start
                    ```
                
                - **Windows:**

                    ``` bash
                    wso2agent.bat start
                    ```

## Deployment best practices

- **Secure the installation token**: Store the installation token securely and avoid sharing it with unauthorized users. Select the most suitable method to store the token based on your deployment environment. If you're using a containerized secured environment, you can go ahead with the environment variable method. For other instances such as virtual machines, store the token in the agent configuration file and encrypt it using the provided cipher tool.
- **Encrypt sensitive information**: Encrypt sensitive information such as user store credentials in the agent configuration file. Use the provided cipher tool to encrypt the secrets and configure them in the agent configuration file.
- **Deploy in a local network**: Deploy the agent in a local network where the actual user store resides and allow only the outbound traffic to the Asgardeo server. If required, you can also configure secure communication between the agent and the user store by configuring ldap over ssl (i.e. ldaps).
- **Monitor the agent**: Monitor the agent to ensure that it is running without any issues. You can configure a monitoring job by utilizing the Asgardeo remote user store API to check the status of the agent. Following is a sample curl command to check the status of the agent.

    === "Optimized Agent"

        ```bash
        curl --location 'https://api.asgardeo.io/t/{organization-name}/api/remote-userstore/v1/connection/{user-store-id}' \
        --header 'Accept: application/json' \
        --header 'Authorization: Bearer {bearer_token}'
        ```

    === "Classic Agent"

        ```bash
        curl --location 'https://api.asgardeo.io/t/{organization-name}/api/onprem-userstore/v1/connection/{user-store-id}' \
        --header 'Accept: application/json' \
        --header 'Authorization: Bearer {bearer_token}'
        ```

## What's Next

- [Configure high availability for a remote user store]({{base_path}}/guides/users/user-stores/configure-high-availability/)
- [Manage remote user stores in Asgardeo]({{base_path}}/guides/users/user-stores/update-user-stores/)
- [Advanced configuration for the remote agent]({{base_path}}/guides/users/user-stores/advanced-configurations-for-the-agent/)
