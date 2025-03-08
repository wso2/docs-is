# Connect a remote user store

Asgardeo allows you to connect a remote user store and onboard users and groups from it. The user store connection can either be with read-only or read/write permissions. Administrators can then start managing access to business applications in Asgardeo for these users and groups. This guide explains how you can set up a remote user store for your Asgardeo organization.

## User store connections

Asgardeo supports the following user store connections.

### Optimized user store connection (recommended)

Asgardeo has introduced **optimized user store connections**, designed for high scalability and performance. At the moment, it supports **read-only** user stores and can be used to authenticate users and retrieve attributes. This connection is continuously evolving and will support a wide range of use cases in the future.

If this connection's capabilities meet your organization's requirements, we highly recommend that you use the optimized connection instead of the classic connection.

### Classic user store connection

The optimized user store connection is the recommended choice, though its capabilities are limited at the moment. If your organization's requirements exceed the capabilities offered by the optimized connection, you can use the **classic user store connection**. The classic connection supports both **read/write** and **read-only** user stores, and offers full management capabilities. While the classic connection offers more capabilities, it may not be as performant as the optimized connection.

!!! note "Switch connections from classic to optimized"

    If you have already connected a classic user store and would like to explore the new connection,

    1. Delete the existing remote user store.
    2. [Register a remote user store](#register-a-remote-user-store) again.
    3. [Set up the remote user store](#set-up-the-remote-user-store) with the new user store agent.

!!! note "Switch classic connections from read-only to read/write"
    
    If you have connected a classic user store before 7th February 2023, you will only have **read-only** access for the user store. If you need **read/write** access for your user store in Asgardeo,

    1. Delete the existing remote user store.
    2. [Register a classic user store](#register-a-remote-user-store) again with Read/Write access type. Make sure to select the classic user store path.
    3. [Set up the remote user store](#set-up-the-remote-user-store) with the latest user store agent.

## Register and configure a user store in Asgardeo

The following guides explain how you can register and set up a remote user store for your Asgardeo organization.

### Prerequisites

Ensure your system has the following before you proceed.

- An on-premise user store. Currently, Asgardeo supports:

    - Lightweight Directory Access Protocol (LDAP)
    - Active Directory (AD)

- If using a classic user store, to run the user store agent:
   
    - Install JAVA 8 or JAVA 11.
    - Configure `JAVA_HOME`.

??? note "System requirements"
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
                <td>443</td>
            </tr>
        </table>

### Register a remote user store

To configure a remote user store for your organization:

1. On the Asgardeo Console, go to **User Attributes & Stores** > **User Stores**.

2. Click **Connect userstore** to open the following:

    ![Register remote user store to Asgardeo]({{base_path}}/assets/img/guides/user-stores/register-user-store-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. If the [optimized connection](#optimized-user-store-connection) supports your use case, this is the recommended choice. If not, click **Classic User Store Connection** instead.

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
            <td>Select your user store type.</td>
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
            <td><b>Read groups</b> <br>(Not required for classic user stores)</td>
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

        - Map the **Username** and **User Id** attributes correctly for successful user authentication. If you have enabled **Read groups**, make sure to correctly map the **Group name** and **Group Id** attributes.
        {% if multi_valued_attributes %}
        - Additionally, to allow multiple email addresses and mobile numbers attributes for users, follow instructions in [Assign multiple email addresses and mobile numbers to 
        a user]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user).
        {% endif %}

6. Click **Finish** to complete the registration.

### Set up the remote user store

After registering the user store, you'll be redirected to the **Setup Guide** of the user store agent. To assemble and configure the user store agent bundle, follow the steps below for the appropriate agent.

=== "Optimized Agent"

    1. Download the user store agent according to your operating system.

        ??? note "(Optional) Verify the integrity of the downloaded file"

            === "Linux/Unix"

                Copy the displayed hash value and run the following command in the same directory where you downloaded the zip file.

                ```bash
                echo "<hash_value>  remoteagent_linux.zip" | sha256sum -c
                ```
        
            === "Windows"

                Run the following command in a command prompt in the same directory where you downloaded the zip file and compare the output hash value with the one displayed in the console.

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
            group_id_attribute = "uid"
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

            The installation token can be encrypted using the provided cipher tool. See how to [configure secrets in the agent configuration file]({{base_path}}/guides/users/user-stores/advanced-configurations-for-the-agent/#configuring-secrets-in-the-agent-configuration-file).

        2. Configure the token as an environment variable

            For containerized or cloud-native environments like Kubernetes, the installation token can be stored as an environment variable, typically configured through Kubernetes secrets. You can define the installation token with the following environment variable.

            ```bash
            export ACCESS_TOKEN = "<token>"
            ```
        
        !!! warning

            - Copy the installation token and save it in a safe location. You won't be able to see it again!
            - Your token is your responsibility. Choose the right method that fits your deployment and securely store the token.
            - This token has no expiry time, but in case you lose or forget it, you can [regenerate the token]({{base_path}}/guides/users/user-stores/update-user-stores/#regenerate-an-installation-token).
    
    5. To start the user store agent, navigate to its root directory and run one of the following commands based on your operating system:

        === "Linux/Unix"

            ```bash
            ./remoteagent
            ```
        
        === "Windows"

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

        === "Linux/Unix"

            ```bash
            sh wso2agent.sh
            ```

        === "Windows"

            ```bash
            wso2agent.bat -- run
            ```

        Enter the installation token generated in the previous step when prompted.

    ??? note "(Optional) Run the user store agent as a background process"
        1. Create a file named `accessToken` in the root directory of the agent.
        2. Add the installation token obtained from the previous step.
        3. Run the user store agent.

            === "Linux/Unix"

                ``` bash
                sh wso2agent.sh start
                ```
            
            === "Windows"

                ``` bash
                wso2agent.bat start
                ```

## What's Next

- [Configure high availability for a remote user store]({{base_path}}/guides/users/user-stores/configure-high-availability/)
- [Manage remote user stores in Asgardeo]({{base_path}}/guides/users/user-stores/update-user-stores/)
- [Deployment best practices for the remote agent]({{base_path}}/guides/users/user-stores/deployment-best-practices/)
- [Advanced configuration for the remote agent]({{base_path}}/guides/users/user-stores/advanced-configurations-for-the-agent/)
