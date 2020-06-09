## Configure artifact expiration time

According to the [SAML 2.0 Binding
Specification](http://www.oasis-open.org/committees/download.php/35387/sstc-saml-bindings-errata-2.0-wd-05-diff.pdf), issued SAML Artifacts should have an expiration time. WSO2 Identity Server does not resolve the artifacts that have passed this time limit.

You can configure this restriction by adding the following property to the `<IS_HOME>/repository/conf/deployment.toml` file.

``` java
[saml.artifact] 
validity= 4
```

!!! tip
    The default time limit is 4 minutes. In a practical scenario, this time limit should be lesser than the SAML response validity
    period.
    
----

## Resolve artifacts with WSO2 IS

According to the SAML Specification, issued SAML artifacts should be resolved, or exchanged to an actual SAML response, via a backchannel call to the issuer. 

WSO2 Identity Server supports SOAP Binding to resolve SAML artifacts according to Section 3.6 of the [SAML 2.0 Binding
Specification](http://www.oasis-open.org/committees/download.php/35387/sstc-saml-bindings-errata-2.0-wd-05-diff.pdf).

!!! tip
    WSO2 IS Artifact Resolution Endpoint: https://wso2.is.com:9443/samlartresolve

The application should send an `<ArtifactResolve>` message wrapped in a SOAP envelope to the WSO2 Identity Server artifact resolution endpoint. The following example shows a SAML artifact resolve request.

``` java
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

If signature validation for artifact resolve is enabled, the application has to sign this request with its private key. WSO2 IS validates the request and if it is valid, an `<ArtifactResponse>` message is sent with the actual SAML response set as the message element. The code block below shows an example of an `<ArtifactResponse>` message.

``` java
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
