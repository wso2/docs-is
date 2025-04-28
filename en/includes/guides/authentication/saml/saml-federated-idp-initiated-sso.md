# Configure SAML federated IdP-Initiated Single Sign-On (SSO)

Single Sign On (SSO) is an authentication process which allows users to log in once and gain access to an organization's applications without having to authenticate to each individual application.

Federated IdP-initiated SSO extends this capability and enables a user belonging to an external organization to seamlessly access applications within your organization. In this scenario, your organization's Identity Provider (IdP) and the external organization's IdP establish a trust relationship. Therefore, external users can conveniently log in to their own IdP and access applications in another organization without having to create accounts in that organization.

This guide explains how you can implement federated IdP-initiated SSO using {{product_name}}.

## Scenario

The steps below implement the following example scenario.

- Two instances of {{product_name}} running on two different ports (e.g. 9443 and 9444), represent the internal and external IdPs respectively.
- The first instance (internal IdP) has an application called `travelocity`.
- A user belonging to the second instance (external IdP) should be able to access `travelocity` without creating an account in the internal IdP.

## Prerequisites

Before you begin, be sure to set up the following:

1. Set up two instances of {{product_name}}.

2. Set a port offset for the external IdP so that it runs on port 9444.

    !!! info

        Learn how to [set an offset]({{base_path}}/references/default-ports/#change-the-offset-for-default-ports).

3. Since there can be cookie issues when the same hostname is configured for both {{product_name}} instances, it is recommended that you configure different hostnames for the servers.

    !!! info
        Learn how to [change the hostname]({{base_path}}/deploy/change-the-hostname) for a {{product_name}} instance. In this guide, the hostname of the external IdP is changed to `localhost.com`.

## Create the application

The `travelocity.com` application should reside in the internal IdP. Follow the steps below in the internal IdP to register it as an application.

1. On the {{product_name}} (which is running on 9443 port) Console, go to **Applications**.

2. Click on **New Application** and select **Standard-Based Application**.

3. Configure the following:

    === "SAML application"

        <table>
            <tr>
                <td>Name</td>
                <td>travelocity.com</td>
            </tr>
            <tr>
                <td>Protocol</td>
                <td>SAML</td>
            </tr>
            <tr>
                <td>Issuer</td>
                <td>travelocity.com</td>
            </tr>
            <tr>
                <td>Assertion consumer service URLs</td>
                <td>http://localhost:8080/travelocity.com/home.jsp</td>
            </tr>
        </table>

    === "OIDC application"

        <table>
            <tr>
                <td>Name</td>
                <td>travelocity.com</td>
            </tr>
            <tr>
                <td>Protocol</td>
                <td>OIDC</td>
            </tr>
            <tr>
                <td>Allowed Grant Types</td>
                <td>Code</td>
            </tr>
            <tr>
                <td>Authorized redirect URLs</td>
                <td>http://localhost:8080/travelocity.com/home.jsp</td>
            </tr>
        </table>

4. Click **Create**.

5. Go to the **Protocol** tab of the created application and under **Single Sign-On Profile**, select the **Enable IdP initiated SSO** checkbox.

6. Click **Update** to save the changes.

## Configure the identity providers

When performing federated IdP-initiated SSO, the two {{product_name}} instances exhibit different behaviors as explained below.

- The `external IdP` performs the actual user authentication since the user's account resides in it. Therefore, the external IdP acts as the identity provider and sends the SAML assertion of the authenticated user to the internal IdP.

- The `internal IdP` delegates the authentication to the external IdP. Therefore, the internal IdP acts as a service provider and consumes the SAML assertion sent by the external IdP.

To establish this connection, we need to register the `external IdP` as an identity provider (connector) in the internal IdP and register the `internal IdP` as a service provider (application) in the external IdP.

### Register the external IdP as a connector

The external IdP needs to be registered as a connector in the internal IdP. This enables the external IdP to act as an identity provider and be used as a login option for the `travelocity.com` application.

To do so, follow the steps below in the internal IdP.

1. On the {{product_name}} (which is running on 9443 port) Console, go to **Connections**.

2. Click **New Connection** > **Standard-Based IdP**

3. Provide `External` as the name and select **SAML** as the protocol.

4. Click **Next** and enter the following details:

    <table>
        <thead>
            <th>Parameter</th>
            <th>Description</th>
            <th>Value</th>
        </thead>
        <tr>
            <td>Service Provider Entity ID</td>
            <td>The ID of the application that will consume the SAML assertion sent by this connector. This value should match the <code>Issuer</code> you configure when registering the internal IdP as an application (steps in the section below).</td>
            <td>Internal</td>
        </tr>
        <tr>
            <td>Mode of configuration</td>
            <td>You may either configure settings manually or use file/url-based configurations.</td>
            <td>Manual Configuration</td>
        </tr>
        <tr>
            <td>Identity Provider Single Sign-On URL</td>
            <td>The URL of the identity provider used for performing SSO.</td>
            <td>https://localhost:9444/samlsso</td>
        </tr>
        <tr>
            <td>Identity Provider entity ID</td>
            <td>The ID of the identity provider. In this instance, the external IdP is an instance of {{product_name}}. Therefore, the ID defaults to <code>localhost</code>.</td>
            <td>localhost</td>
        </tr>
    </table>

5. Click **Next** and upload the external IdP certificate.

6. Click **Finish** to create the connection.

7. On the {{product_name}} Console, return to **Applications** and select the `travelocity.com` application you registered in step 1.

8. Go to the application's **Login Flow** tab, click **Add Sign In Option** for the first step of authentication and add the configured connection as a sign in option.

    ![Add external IdP as a sign-in option]({{base_path}}/assets/img/guides/applications/saml-app/add-federated-sso-sign-in-option.png){: width="500" style="border: 0.3px solid lightgrey;"}

9. Click **Update** to save the changes.

### Register the internal IdP as an application

The internal IdP needs to be registered as an application in the external IdP. This enables the internal IdP to consume the SAML assertion sent by the external IdP after user authentication.

To do so, follow the steps below in the external IdP.

1. On the {{product_name}} (which is running on 9444 port) Console, go to **Applications**.

2. Click on **New Application** and select **Standard-Based Application**.

3. Configure the following:

    === "SAML Application"

        <table>
            <tr>
                <td>Name</td>
                <td>Internal</td>
            </tr>
            <tr>
                <td>Protocol</td>
                <td>SAML</td>
            </tr>
            <tr>
                <td>Issuer</td>
                <td>Internal</td>
            </tr>
            <tr>
                <td>Assertion consumer service URLs</td>
                <td>
                    https://localhost:9443/samlsso?spEntityID=travelocity.com <br/>
                </td>
            </tr>
            <tr>
                <td>Default Assertion Consumer URL</td>
                <td>https://localhost:9443/samlsso?spEntityID=travelocity.com</td>
            </tr>
        </table>

    === "OIDC Application"

        <table>
            <tr>
                <td>Name</td>
                <td>Internal</td>
            </tr>
            <tr>
                <td>Protocol</td>
                <td>SAML</td>
            </tr>
            <tr>
                <td>Issuer</td>
                <td>Internal</td>
            </tr>
            <tr>
                <td>Assertion consumer service URLs</td>
                <td>https://localhost:9443/oauth2/authorize?response_type=code&client_id=<client_id>&scope=openid&redirect_uri=<redirect_url></td>
            </tr>
            <tr>
                <td>Default Assertion Consumer URL</td>
                <td>https://localhost:9443/oauth2/authorize?response_type=code&client_id=<client_id>&scope=openid&redirect_uri=<redirect_url></td>
            </tr>
        </table>

    !!! note
        Add `https://localhost:9443/commonauth` endpoint to Assertion consumer service URLs support the SP initiated SSO flow as well.

4. Click **Create**.

5. Go to the **Protocol** tab of the created application and under **Single Sign-On Profile**, select the **Enable IdP initiated SSO** checkbox.

6. Click **Update** to save the changes.

## Try it out

You have now made the application in your internal IdP accessible to the users belonging to the external IdP. Follow the steps below to try out logging into the internal application as an external user.

### Deploy the application

Follow the steps below to download and run the `travelocity.com` application:

!!! note "Before you begin"

    - Make sure you have [Apache Tomcat 8.x.x](https://tomcat.apache.org/download-80.cgi). The  `webapps` directory in the Tomcat installation will be referred to as `<WEBAPPS>`.

    - It is recommended to change the hostname to something other than `localhost` to avoid browser errors. Modify your machine's `/etc/hosts` entry to reflect this.

1. Download the [sample application](https://github.com/wso2/samples-is/releases/download/v4.6.2/travelocity.war){: target="_blank"}

2. Copy the `travelocity.war` file into `<WEBAPPS>`.

    !!! note

        === "SAML Application"

            In order to be consistent with the configurations above,

            - Rename the `travelocity.war` file as `travelocity.com.war`.

            - Change the following configs in the `<WEBAPPS>/travelocity.com/WEB-INF/classes/travelocity.properties`.
            ```properties
            SAML2.EnableSLO=false
            SAML2.EnableResponseSigning=false
            ```

        === "OIDC Application"

            In order to be consistent with the configurations above,

            - Rename the `travelocity.war` file as `travelocity.com.war`.

            - Change the following configs in the `<WEBAPPS>/travelocity.com/WEB-INF/classes/travelocity.properties`.
            ```properties
            SAML2.EnableSLO=false
            SAML2.EnableResponseSigning=false
            OAuth2.ClientId=<client_id>
            OAuth2.ClientSecret=<client_secret>
            ```

3. Restart the Tomcat server.

### Sign in with the Federated IdP-initiated flow

!!! note "Before your begin"

    Make sure you have created a user in the external IdP. Refer to [manage users]({{base_path}}/guides/users/manage-users/) to learn more.

1. Initiate IdP-initiated SSO using the following command. You will be redirected to the login screen of the `travelocity.com` application.

    === "URL format"

        ```bash
        https://localhost:9444/samlsso?spEntityID=<service_provider_entity_ID>
        ```
    
    === "Example"

        ```bash
        https://localhost:9444/samlsso?spEntityID=Internal
        ```

2. Click **Login with External**. You will be redirected to the login screen of the external IdP.

3. Enter the user's credentials to login. You will be redirected to the home page of `travelocity.com`

    !!! note
        If you already have a user session in your browser, you will be redirected right into the application as an authenticated user.
