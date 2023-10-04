# Federated IdP-initiated SSO

Identity Provider initiated Single Sign On (IdP-initiated SSO) is an authentication process which allows users to log in once and gain access to the organization's applications without having to authenticate to each application.

Federated IdP-initiated SSO extends this process so that a user belonging to an external organization is also able to access applications in your organization.

In this scenario, your organization's IdP and the external organization's IdP establish a trust relationship. Therefore, external users can conveniently log in to their organization IdP and access applications in your organization without creating accounts in your organization's IdP.

This guide explains how you can implement federated IdP-initiated SSO using the WSO2 Identity Server (WSO2 IS).

## Scenario

Let's consider the following scenario.

- Two instances of WSO2 IS are running on two different ports, 9443 and 9444, to represent the internal and external IdPs respectively.
- The internal IdP has an application called travelocity.com.
- A user belonging to the external IdP should be able to access travelocity.com without creating an account in the internal IdP.

Follow the steps below to implement this scenario.

## Prerequisites

1. Set up two instances of WSO2 IS.

2. Set a port offset for the external IdP so that it runs on port 9444.

    !!! info

        Learn how to [set an offset]({{base_path}}/references/default-ports-of-wso2-products/#change-the-offset-for-default-ports).

3. Since there can be cookie issues when the same hostname is configured for both WSO2 IS instances, it is recommended that you configure different hostnames for the servers.

    !!! info
        Learn how to [change the hostname]({{base_path}}/deploy/change-the-hostname) for a WSO2 IS instance. In this guide, the hostname of the external IdP is changed to `localhost.com`.

Let's get started!


## Configure the Service Provider

Follow the steps below to register the travelocity.com app in the internal IdP.

1. On the WSO2 IS Management Console of the internal IdP, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Enter `travelocity.com` as the **Service Provider Name** and click **Register**.

3. Expand the **Inbound Authentication Configuration** > **SAML2 Web SSO Configuration** and click **Configure**.

4. Enter the following values in the following fields.

    | Field name | Value |
    |-----------|-------|
    | **Issuer** | `travelocity.com`  |
    | **Assertion Consumer URL**    | `http://localhost.com:8080/travelocity.com/home.jsp`  |

    !!! info
        A prompt appears when you try to add an http URL. Click **Yes** to proceed.

5. Enable the following options.

    - **Enable Response Signing**

    - **Enable Signature Validation in Authentication Requests and Logout Requests**

    - **Enable Single Logout**

    - **Enable Attribute Profile** and **Include Attributes in the Response Always**

    - **Enable IdP Initiated SSO**

6. Click **Register** and click **Update**.

## Register the External IdP in the Internal IdP

Follow the steps below to register the external IdP as an identity provider in the internal IdP.

1. On the WSO2 IS Management Console of the internal IdP, go to **Main** > **Identity** > **Identity Providers** and click **Add**.

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


## Register the Internal IdP in the External IdP

Follow the steps below to register the internal IdP as a service provider in the external IdP.

1. On the WSO2 IS Management Console of the external IdP, go to **Main** > **Identity** > **Service Providers** and click **Add**.

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






