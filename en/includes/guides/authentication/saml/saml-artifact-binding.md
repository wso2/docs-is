# SAML artifact binding

This guide explains SAML artifact binding and how to enable it in {{product_name}}.

## Overview

During SAML authentication, messages such as authentication requests and responses typically travel between the Service Provider (SP) and Identity Provider (IdP) using HTTP POST or HTTP Redirect bindings. Fo some systems, SAML Artifact Binding can be a more secure and efficient way to send these messages.

When an SP requests authentication from an IdP using SAML artifact binding, the IdP responds with a small artifact that works as a pointer to the actual SAML response. The SP uses this reference and retrieves the full SAML message from the IdP using a SOAP-based back-channel, ensuring secure and reliable delivery.

This binding prevents sensitive information from passing through the user’s browser, reducing the risk of interception or tampering. But it adds complexity by requiring additional back-channel communication between the SP and IdP.

![SAML artifact binding]({{base_path}}/assets/img/guides/authentication/saml/saml-artifact-binding.png)

The process goes as follows:

1. User tries to access a protected resource. The user opens your application and the application sees that the user needs to log in.

2. The application creates a SAML AuthnRequest and sends a 302 Redirect to the browser. The redirect contains the AuthnRequest in the query parameters.

3. The Identity provider (IdP) receives the AuthnRequest. After authenticating the user (login page etc.), the IdP generates a SAML Artifact (a short reference pointer). The IdP sends a 302 Redirect back to the browser containing:

    ```bash
    SAMLart=<artifact>
    ```

    So the browser only carries the artifact, not the SAML response.

4. The browser follows the redirect and sends:

    ```bash
    GET https://your-app.com?SAMLart=xxx
    ```

5. The application now receives only the artifact, not the SAML Response. The application extracts:

    ```bash
    SAMLart = "ABCDEF123456..."
    ```

6. The SP must now resolve the artifact into a full SAML Response. It does this via a back-channel SOAP call to the IdP:

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

    Follow the guide and register your [SAML application in {{product_name}}]({{base_path}}/guides/applications/register-saml-web-app/).

### Enable SAML artifact binding

To enable SAML artifact binding for your application,

1. On the {{product_name}} Console, go to **Applications** and select your registered SAML application.

2. In the **Protocol** tab of your application, under **Single Sign-On Profile**, select **Artifact**.

3. Optionally select the **Enable signature validation for artifact binding** to validate the artifact resolve request signature against the application certificate.

4. If you selected the option in Step 3, provide a certificate under **Certificate** for {{product_name}} to validate the request.

    !!! note

        Learn more about [SAML 2.0 application configurations]({{base_path}}/references/app-settings/saml-settings-for-app/).

5. Click **Update** to save the changes.

### Configure artifact expiration time

The [SAML 2.0 Binding specification](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf){: target="_blank"} specifies that the artifacts require a time of expiration. {{product_name}} resolves artifacts only when they fall within the defined expiration period. Expired artifacts are rejected.

The default time limit is set for 4 minutes. To change it, set a custom time (in seconds) for the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

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
