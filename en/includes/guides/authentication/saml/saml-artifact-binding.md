# SAML artifact binding

This guide explains SAML artifact binding and how to enable it in {{product_name}}.

## Overview

SAML artifact binding eliminates the need to exchange sensitive user information through the user's browser during authentication.

When a Service Provider (SP) requests authentication from an Identity Provider (IdP) using SAML artifact binding, the IdP responds with a small artifact that works as a pointer to the actual SAML response. The SP uses this reference and retrieves the full SAML message from the IdP using a SOAP-based back-channel, ensuring secure and reliable delivery.

This approach minimizes the risk of interception or tampering but introduces additional complexity due to the required back-channel communication between the SP and IdP.

![SAML artifact binding]({{base_path}}/assets/img/guides/authentication/saml/saml-artifact-binding.png)

The process goes as follows:

1. User tries to access a protected resource and the application sees that the user needs to log in.

2. The application creates a SAML AuthnRequest and sends a 302 Redirect to the browser which contains the AuthnRequest in the query parameters.

3. The IdP receives the AuthnRequest, authenticates the user and generates a SAML Artifact (a short reference pointer). The IdP sends a 302 Redirect back to the browser containing:

    ```bash
    SAMLart=<artifact>
    ```

4. The browser follows the redirect and sends:

    ```bash
    GET https://your-app.com?SAMLart=xxx
    ```

5. The application extracts the artifact:

    ```bash
    SAMLart = "ABCDEF123456..."
    ```

6. The SP must now resolve the artifact into a full SAML Response. For this, it sends a back-channel SOAP call to the IdP:

    ```saml
    <ArtifactResolve>
       <Artifact>ABCDEF123456...</Artifact>
    </ArtifactResolve>
    ```

7. The IdP receives the artifact, looks up the stored SAML Response corresponding to that artifact and returns the full signed SAML response

    ```saml
    <ArtifactResponse>
    <SAMLResponse>....</SAMLResponse>
    </ArtifactResponse>
    ```

    The application verifies the signature, extracts attributes, creates a session, and logs the user in.

## Implement artifact binding

{{product_name}} supports SAML artifact binding as specified in the [SAML 2.0 Binding specification](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf){: target="_blank"} specification. The following guides explain how you can set it up for your application.

!!! note "Before you begin"

    Follow the guide and [register your SAML application in {{product_name}}]({{base_path}}/guides/applications/register-saml-web-app/).

### Enable SAML artifact binding

To enable SAML artifact binding for your application,

1. On the {{product_name}} Console, go to **Applications** and select your registered SAML application.

2. In the **Protocol** tab of your application, under **Single Sign-On Profile**, select **Artifact**.

3. Optionally select the **Enable signature validation for artifact binding** to validate the artifact resolve request signature against the application certificate.

4. If you selected the option in Step 3, provide the application's certificate under **Certificate** for {{product_name}} to validate the request.

    !!! note

        Learn more about [SAML 2.0 application configurations]({{base_path}}/references/app-settings/saml-settings-for-app/).

5. Click **Update** to save the changes.

### Configure artifact expiration time

The [SAML 2.0 Binding specification](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf){: target="_blank"} specifies that the artifacts require a time of expiration. {{product_name}} resolves artifacts only when artifacts expiration period. Expired artifacts are rejected.

The default time limit is set for 4 minutes. To change it, set a custom time (in minutes) for the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

```
[saml.artifact] 
validity= 4
```

### Resolve artifacts with {{product_name}}

Your application can resolve artifacts issued by {{product_name}} by sending a back-channel SOAP request to the following endpoint.

```
https://<IS_HOST>:<IS_PORT>/samlartresolve
```

Your application should send an `<ArtifactResolve>` message wrapped in a SOAP envelope to the {{product_name}} artifact resolution endpoint as shown below:

!!! note

    If you enabled signature validation for artifact binding, the application should sign the request with its private key. 

```saml
POST /samlartresolve HTTP/1.1
Host: wso2is.com
Content-Type: text/xml
Content-Length: nnn
SOAPAction: http://www.oasis-open.org/committees/security
<SOAP-ENV:Envelope
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Body>
        <samlp:ArtifactResolve
            xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
            xmlns="urn:oasis:names:tc:SAML:2.0:assertion"
            ID="_6c3a4f8b9c2d" Version="2.0"
            IssueInstant="2004-01-21T19:00:49Z">
            <Issuer>https://ServiceProvider.com/SAML</Issuer>
            <Artifact>
                AAQAADWNEw5VT47wcO4zX/iEzMmFQvGknDfws2ZtqSGdkNSbsW1cmVR0bzU=
            </Artifact>
        </samlp:ArtifactResolve>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

The response will look as follows:

```saml
HTTP/1.1 200 OK
Date: 21 Jan 2004 07:00:49 GMT
Content-Type: text/xml
Content-Length: nnnn

<SOAP-ENV:Envelope
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Body>
        <samlp:ArtifactResponse
            xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
            xmlns="urn:oasis:names:tc:SAML:2.0:assertion"
            ID="_FQvGknDfws2Z" Version="2.0"
            InResponseTo="_6c3a4f8b9c2d"
            IssueInstant="2004-01-21T19:00:49Z">
            <Issuer>https://wso2is.com</Issuer>
            <samlp:Status>
                <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
            </samlp:Status>
            <samlp:Response ID="d2b7c388cec36fa7c39c28fd298644a8"
                IssueInstant="2004-01-21T19:00:49Z"
                Version="2.0">
                ...
            </samlp:Response>
        </samlp:ArtifactResponse>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Try it out

The following guide walks you through setting up a sample application to see SAML artifact binding in action.

### Set up the sample

1. Download and install [Apache Tomcat version 8.X](https://tomcat.apache.org/tomcat-8.5-doc/building.html){: target="_blank"}.

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.6.2/saml2-web-app-pickup-dispatch.com.war) the sample application.

3. Copy the `saml2-web-app-pickup-dispatch.com.war` file into the `/webapps` folder of your Tomcat installation.

4. Start the Tomcat server.

!!! note

    Learn more about the /webapps directory location and Tomcat commands in the [Tomcat documentation](https://tomcat.apache.org/tomcat-8.0-doc/deployer-howto.html){: target="_blank"}.

### Configure Cross Origin Cross-Origin Resource Sharing (CORS)

SAML2 POST Binding sends the SAML response via browser POST, creating a cross-origin request when the SP and {{product_name}} use different domains. To Configure {{product_name}} to allow requests from the SP’s domain,

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configurations.

    ```toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "http://localhost:8080" 
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

    !!! note

        If your are using a different URL, add that as an allowed origin.

2. Restart {{product_name}}.

### Integrate application with {{product_name}}

To integrate the sample application,

1. [Register your SAML application in {{product_name}}]({{base_path}}/guides/applications/register-saml-web-app/) with the following information.

    - **Issuer** - saml2-web-app-pickup-dispatch.com
    - **Assertion Consumer URL** - http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp

2. On the **Protocol** tab of the created application, do the following:

    - Under **Response Singing** enable **Sign SAML responses**.
    - Under **Single Sign-On Profile**, select **Artifact** and select **Enable signature validation for artifact binding**.
    - Under **Certificate**, select **Provide certificate** and upload the application certificate you extracted earlier.

3. Click **Update** to save the changes.

!!! note

    - The sample applications have request and response signing enabled by default. If you want to try the flow without dealing with certificates, open the `<APP_HOME>/WEB-INF/classes/sso.properties` file and set all signing-related properties to false:

        ```bash
        SAML2.EnableResponseSigning=false
        SAML2.EnableAssertionSigning=false
        SAML2.EnableRequestSigning=false
        SAML2.EnableArtifactResolveSigning=false
        ```

    - If you prefer to keep the default signing behavior, extract each application's public certificate from `<APP_HOME>/WEB-INF/classes/wso2carbon.p12`, and upload it to {{product_name}} under the **Certificate** section of your registered application's **Protocol** tab.

    - If you enable response signing, make sure that in {{product_name}} Console, you go to your registered application's **Protocol** section and under **Response Signing**, enable **Sign SAML responses**. Also from the **Info** tab of your registered application, download the IdP certificate and add it to your installed application as a trusted certificate.

### Try artifact binding

Now that you have set the sample application, follow the steps to try out artifact binding.

1. Log into the sample application.

    ```bash
    http://localhost:8080/saml2-web-app-pickup-dispatch.com
    ```

2. You will be redirected to the login page of {{product_name}}. Enter your credentials and provide the necessary consent. You will be redirected to the Pickup Dispatch application home page.

3. You can use a SAML tracer add-on with your browser to view the SAML2 response artifact for the SSO authentication request. The code block below shows an example response.

    ```saml
    HTTP/1.1 302 Object Moved
    Date: 21 Jan 2004 07:00:49 GMT
    Location: https://application.com/ACS/URL?
    SAMLart=AAQAADWNEw5VT47wcO4zX%2FiEzMmFQvGknDfws2ZtqSGdkNSbsW1cmVR0bzU%3D&RelayState=0043bfc1bc45110dae17004005b13a2b
    Content-Type: text/html; charset=iso-8859-1
    ```
