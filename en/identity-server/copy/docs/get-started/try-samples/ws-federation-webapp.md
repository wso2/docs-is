# Sample WS-Federation web app

By following this guide, you will be able to deploy a WS-Federation-based web application and enable login for it using the Passive Security Token Service (Passive STS) of {{product_name}}.

!!! info
    {{product_name}} uses its passive security token service (Passive STS) as its WS-Federation implementation.
    Passive STS is capable of issuing SAML 1.1 and 2.0 security tokens. To request a SAML 2.0 security token, the Request Security Token (RST) should be sent to the passive STS endpoint with the token type, `SAMLV2.0`. If no RST is specified, {{product_name}} issued a SAML 1.1 token by default.
---

### Prerequisites

- Download [Apache Tomcat 8.x](https://tomcat.apache.org/download-80.cgi) and install it. Tomcat server installation location will later be referred to as `<TOMCAT_HOME>` in this guide.

- It is recommended that you use a hostname that is not `localhost` to avoid browser errors. Modify your machine's `/etc/hosts` entry to reflect this.

    !!! info
        Note that `wso2is.local` is used in this documentation as an example, but you must modify this when configuring the authenticators or connectors with this sample application.

- Download the [Passive STS Sample application](https://github.com/wso2/samples-is/releases/download/v4.5.2/PassiveSTSSampleApp.war) from the latest release assets.

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

2. Restart the tomcat server.

## Configure the service provider

1. On the WSO2 Identity Server Console, go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Enter the following details:

    ![Create a new Passice STS app]({{base_path}}/assets/img/guides/applications/create-new-ws-federation-app.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <td>Name</td>
            <td>
                Give a unique name to identify your application.
                <p>e.g.:<code>PassiveSTSSampleApp</code></p>
            </td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <b>WS-Federation</b>.</td>
        </tr>
        <tr>
            <td>Realm</td>
            <td>
                This should be a unique identifier for the web app. Provide the same realm name given to the web app you are configuring WS-Federation for.
                <p>e.g.:<code>PassiveSTSSampleApp</code></p>
            </td>
        </tr>
        <tr>
            <td>Reply URL</td>
            <td>
                Provide the URL of the web app you are configuring WS-Federation for. This endpoint URL will handle the token response.
                <p><code>http://localhost:8080/PassiveSTSSampleApp/index.jsp</code></p>
            </td>
        </tr>
    </table>

4. Click **Register** to complete the registration.

5. Go to the **User Attributes** tab and click **Add User Attribute**, and add the following attributes:

    - `http://wso2.org/claims/username`
    - `http://wso2.org/claims/emailaddress`

5. Select `http://wso2.org/claims/emailaddress` as the **Subject attribute**.

6. Click **Update** to save your configurations.

!!! tip
    Currently, the signing algorithm used for WS-Federation by default is `rsa-sha1`, and the digest algorithm used is `sha1`. 
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

3. Provide the required consent. You will be redirected to the WSO2 IS WS-Federation Service and then redirected back to the configured `replyUrl`.

You will see the WS-Federation response with the requested claims on the screen.
