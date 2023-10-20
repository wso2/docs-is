# Enable Login for a WS-Federation Web Application

This page guides you through enabling login for a WS-Federation-based web application.

!!! info
    WSO2 Identity Server's passive security token service (Passive STS) is used as the WS-Federation implementation.
    The Passive STS is capable of issuing SAML 1.1 and 2.0 security tokens. To request a SAML 2.0 security token, the Request Security Token (RST) should be sent to the passive STS endpoint with the TokenType `SAMLV2.0` when sending the token request. If no RST is specified, WSO2 Identity Server will issue a SAML 1.1 token by default.
---

{!./includes/deploying-sample-apps.md!}

- Download the [PassiveSTSSample application](https://github.com/wso2/samples-is/releases/download/v4.5.2/PassiveSTSSampleApp.war) from the latest release assets.

### Deploy the sample app

To deploy the sample web app on a web container:

1. Copy the application's downloaded `.war` file into the `webapps` directory of the Tomcat folder.

2. Start the Tomcat server.

### Configure sample properties

To configure additional properties for the sample application:

1. Add the following configurations to the `web.xml` file in `<TOMCAT_HOME>/apache-tomcat-<version>/webapps/PassiveSTSSampleApp/WEB-INF`.
    - Specify `idpUrl` as the Identity Server's Passive STS URL.
        ``` xml
        <init-param>
                <param-name>idpUrl</param-name>
                <param-value>https://localhost:9443/passivests</param-value>
        </init-param> 
        ```

    - Specify the `replyURL` as the URL of the web app.
        ``` xml
        <init-param>
                <param-name>replyUrl</param-name>
                <param-value>http://localhost:8080/PassiveSTSSampleApp/index.jsp</param-value>
        </init-param>
        ```

    - Specify the ` realm ` as a unique identifier for the web app.
        ``` xml
        <init-param>
                <param-name>realm</param-name>
                <param-value>PassiveSTSSampleApp</param-value>
        </init-param> 
        ```

    - Specify the ` tenantDomain ` for tenant user logins.
        ``` xml
        <init-param>
                <param-name>requestParams</param-name>
                <param-value>tenantDomain=tenant4.com</param-value>
        </init-param>
        ```

2. Restart the tomcat server.

## Configure the service provider

1. On the Management Console, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Enter `PassiveSTSSampleApp` as the **Service Provider Name**, and click **Register**.

3. Expand the **Inbound Authentication Configuration > WS-Federation (Passive) Configuration** section, and enter the following values in the fields mentioned.

    | Field name | Value | Description  |
    |------------|-------|--------------|
    | **Passive STS Realm** | `PassiveSTSSampleApp`  | This should be a unique identifier for the web app. Provide the same realm name given to the web app you are configuring WS-Federation for. |
    | **Assertion Consumer URL**    | `http://localhost:8080/PassiveSTSSampleApp/index.jsp`    | Provide the URL of the web app you are configuring WS-Federation for. This endpoint URL will handle the token response. |

4. Expand **Claim Configuration** and click **Add Claim URI** next to **Requested Claims**, and add the following claims:

    - `http://wso2.org/claims/username`
    - `http://wso2.org/claims/emailaddress`

5. Select `http://wso2.org/claims/emailaddress` as the **Subject Claim URI**.

6. Click **Update** to save your configurations.

!!! tip
    Currently, the signing algorithm used for passive STS by default is `rsa-sha1`, and the digest algorithm used is `sha1`. 
    To change the default algorithms, add the following configuration in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.
    The example given below sets the signing algorithm to `rsa-sha256` and the digest algorithm to `sha256`.

    ```toml
    [sts]
    signature_algorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"
    digest_algorithm = "http://www.w3.org/2001/04/xmlenc#sha256"
    ```

## Try it out

!!! info
    When redirecting your users to WSO2 IS Passive STS endpoint, the following (optional) parameters are sent in the request from the sample application.

	- **wa=wsignin1.0**: specifies whether WSO2 IS should issue a token for the relying party (this is the default action).
    - **wa=wsignout1.0**: specifies whether WSO2 IS should log the user out.
    - **wreply={replyUrl}**: specifies where the response should be sent.

	Using a Network tracer such as a SAML tracer is recommended to analyze the HTTP request and responses in this scenario. With a tracer, you will be able to view the parameters mentioned above and also see the SAML token that is issued from WSO2 IS.

1. Access one of the following links on your browser and click **Login**.
    - To get a SAML 1.1 token: <http://localhost:8080/PassiveSTSSampleApp/index.jsp>
    - To get a SAML 2.0 token: <http://localhost:8080/PassiveSTSSampleApp?samlv=2-0>

2. Login using your credentials.

3. Provide the required consent. You will be redirected to the WSO2 IS Passive STS Service and then redirected back to the configured `replyUrl`.

You will see the passive STS response with the requested claims on the screen.

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
    - [Concept: WS-Federation]({{base_path}}/references/concepts/authentication/intro-ws-federation)