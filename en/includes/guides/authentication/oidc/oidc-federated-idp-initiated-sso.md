# Configure federated IdP-Initiated Single Sign-On (SSO)

Single Sign On (SSO) is an authentication process which allows users to log in once and gain access to an organization's applications without having to authenticate to each individual application.

Federated IdP-initiated SSO extends this capability and enables a user belonging to an external organization to seamlessly access applications within your organization. In this scenario, your organization's Identity Provider (IdP) and the external organization's IdP establish a trust relationship. Therefore, external users can conveniently log in to their own IdP and access applications in another organization without having to create accounts in that organization.

This guide explains how you can implement federated IdP-initiated SSO using {{product_name}}.

## Scenario

The steps below implement the following example scenario.

- Two instances of {{product_name}} running on two different ports (e.g. 9443 and 9444), represent the internal and external IdPs respectively.
- The first instance (internal IdP) has an application called `travelocity.com`.
- A user belonging to the second instance (external IdP) should be able to access `travelocity.com` without creating an account in the internal IdP.

## Prerequisites

Before you begin, be sure to set up the following:

1. Set up two instances of {{product_name}}.

2. Set a port offset for the external IdP so that it runs on port 9444.

    !!! info

        Learn how to [set an offset]({{base_path}}/references/default-ports/#change-the-offset-for-default-ports).

3. Since there can be cookie issues when the same hostname is configured for both {{product_name}} instances, it is recommended that you configure different hostnames for the servers.

    !!! info
        Learn how to [change the hostname]({{base_path}}/deploy/change-the-hostname) for a {{product_name}} instance. In this guide, the hostname of the external IdP is changed to `localhost.com`.

## Step 1: Create the application

Follow the steps below in the internal IdP to register `travelocity.com` as an application.

1. On the {{product_name}} Console, go to **Applications**.

2. Click on **New Application** and select **Standard-Based Application**.

3. Configure the following:

    <table>
        <tr>
            <td>Name</td>
            <td><code>travelocity.com</code></td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>SAML</td>
        </tr>
        <tr>
            <td>Issuer</td>
            <td><code>travelocity.com</code></td>
        </tr>
        <tr>
            <td>Assertion consumer service URLs</td>
            <td><code>http://localhost.com:8080/travelocity.com/home.jsp</code></td>
        </tr>
    </table>

4. Click **Create**.

5. Go to the **Protocol** tab of the created application and do the following:

    - Under **Response Signing**, enable **Sign SAML responses**.
    - Under **Certificate**, click **Provide certificate** and upload the external IdP certificate.
    - Under **Request Validation**, select the **Enable request signature validation** checkbox.
    - Under **Single Logout Profile**, select the **Enable SLO** checkbox.
    - Under **Attribute Profile**, select the **Enable attribute profile** checkbox.
    - Under **Single Sign-On Profile**, select the **Enable IdP initiated SSO** checkbox.

6. Click **Update** to save the changes.

## Step 2: Register the external IdP as a connector

Follow the steps below in the internal IdP to register the external IdP as a connector.

1. On the {{product_name}} Console, go to **Connections**.

2. Click **New Connection** > **Standard-Based IdP**

3. Provide `External` as the name and select **SAML** as the protocol.

4. Click **Next** and enter the following details:

    <table>
        <tr>
            <td>Service Provider Entity ID</td>
            <td><code>Internal</code></td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>SAML</td>
        </tr>
        <tr>
            <td>Issuer</td>
            <td><code>travelocity.com</code></td>
        </tr>
        <tr>
            <td>Assertion consumer service URLs</td>
            <td><code>http://localhost.com:8080/travelocity.com/home.jsp</code></td>
        </tr>
    </table>


2. Provide an **Identity Provider Name**. For this scenario, let's name it `External`.

3. Expand the **Federated Authenticators** > **SAML2 Web SSO Configuration** section, enable **Enable SAML2 Web SSO** and enter the following values.

    | Field name | Value |
    |-----------|-------|
    | **Service Provider Entity ID** | `Internal`  |
    | **Identity Provider Entity ID**    | `External`  |
    | **SSO URL**    | `https://localhost:9444/samlsso`  |
    | **ACS URL**    | `https://localhost:9443/samlsso?spEntityID=travelocity.com`  |

    !!! note
    ACS URL takes the structure of `.../samlsso?spEntityID={Entity Id of the service provider in the internal IdP}`

4. Click **Register**.

5. Return to the service provider that you registered in the above section by navigating to **Main** > **Identity** > **Service Providers** > **List** and clicking **Edit** next to your application.

6. Expand **Local and Outbound Authentication Configuration**.

7. Select the **Authentication Type** as **Federated Authentication**, and from the dropdown list next to it, select the external identity provider that you configured.

7. Click **Update**.


## Step 3: Register the internal IdP in the external IdP

Follow the steps below to register the internal IdP as a service provider in the external IdP.

1. On the {{product_name}} Management Console of the external IdP, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Provide a **Service Provider Name**. For this scenario, let's name it `Internal`.

3. Click **Register**.

4. Expand the **Inbound Authentication Configuration** > **SAML2 Web SSO Configuration** and click **Configure**.

5. Enter the following values in the following fields.

    | Field name | Value |
    |-----------|-------|
    | **Issuer** | `Internal` |
    | **Assertion Consumer URL**    | `https://localhost:9443/samlsso?spEntityID=travelocity.com`  |

    !!! note
        - Issuer should be the same as the **Service Provider Entity ID** you configured in the section above.
        - Assertion Consumer URL takes the structure of `.../samlsso?spEntityID={Entity Id of the service provider in the internal IdP}`

6. Enable **Enable IdP Initiated SSO**.

7. Click **Register** and click **Update**.

## Try it out

You have now made the application in your internal IdP accessible to the users belonging to the external IdP. Follow the steps below to log in to the application as an external user.

1. Create a user in your external IdP.

1. Run the travelocity.com application. Learn how to do so in the [documentation]({{base_path}}/deploy/configure-an-sp-and-idp-using-configuration-files/#run-the-travelocity-application).

2. Enter the following URL in the browser to initiate a SAML SSO request from the external IdP.
        ```URL
        https://localhost:9444/samlsso?spEntityID=Internal
        ```

3. You will be prompted to log in. Once logged in, You will be redirected to the `travelocity.com` application as the logged in user.

    !!! note
        If you already have a user session in your browser you will be redirected straight to the application.