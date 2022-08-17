{!./includes/deploying-sample-apps.md!}

- Download the [SAML pickup dispatch application](https://github.com/wso2/samples-is/releases/download/v4.5.0/saml2-web-app-pickup-dispatch.com.war) from the latest release assets.

---

### Deploy the sample web app

To deploy the sample web app on a web container:

1. Copy the downloaded `.war` file of the SAML application into the `webapps` directory of the Tomcat folder.

2. Start the Tomcat server.

---

### Add CORS configuration

{!./includes/cors-config.md!}

---

### Register a service provider

1. On the Management Console, go to **Main** > **Identity** > **Service Providers** and click **Add**.

3. Enter `saml2-web-app-pickup-dispatch` as the **Service Provider Name**, and click **Register**.

4. Expand the **Inbound Authentication Configuration > SAML2 Web SSO Configuration** section and, click **Configure**.

5. Enter the following values in the fields mentioned.

    | Field name | Value |
    |-----------|-------|
    | **Issuer** | `saml2-web-app-pickup-dispatch.com`  |
    | **Assertion Consumer URL**    | `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp`    |

    !!! info
        Click **Yes** on the dialog that appears after you add the **Assertion Consumer URL**. This dialog appears when you add an `http` URL.

6. Enable the following by selecting the corresponding checkboxes:
    - **Enable Response Signing**
    - **Enable Signature Validation in Authentication Requests and Logout Requests**
    - **Enable Single Logout**
    - **Enable Attribute Profile**
        - **Include Attributes in the Response Always**  

    !!! tip
        For more information on the advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced).

7. Click **Register** to add the service provider and save the configurations.  