# Query SAML2 Assertions

This page guides you through querying dynamic or existing SAML2 assertions using standard request messages via WSO2 Identity Server. 

Due to some reason if you can not pass a SAML Assertion to the backend, then you can pass an identifier with the request to query and obtain the assertion from the backend instead.

## Register a service provider

1.  Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`). 

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter `travelocity.com` in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configurations as follows:

        1.  **Issuer** : `travelocity.com`

        2.  **Assertion Consumer URL** : `http://wso2is.local:8080/travelocity.com/home.jsp`  
            Click Yes, in the message that appears.

    2.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Signature Validation in Authentication Requests and Logout Requests**

        3.  **Enable Single Logout**

        4.  **Enable Attribute Profile**

        5.  **Include Attributes in the Response Always**
    
    !!! tip
        For more information on other advanced configurations, refer [Advanced SAML Configurations](../../guides/login/saml-app-config-advanced/).

5.  Click **Register** to save the changes.  

Now you are sent back to the Service Providers page.

----

## Enable querying SAML 2.0 assertions

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
     
2. Enter the **Assertion Consumer URL** and click **Add**.
    
    !!! info
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.

4. Select **Enable Assertion Query Request Profile** to enable saml assertions. 

5. Click **Register**.
    
!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced). 


## Persist assertions to the database

Optionally, you can use a custom assertion builder that enables persisting assertions in the database for this profile. 

1.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.

2.  Add the following configuration.

    ``` toml
    [saml.extensions] 
    assertion_builder= "org.wso2.carbon.identity.sso.saml.builders.assertion.ExtendedDefaultAssertionBuilder"
    ```

3. Restart the server.
    
-----

## Try it

### Set up the sample

-   Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      

-   It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

-   Download the sample from GitHub.

    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
    2. Download the `travelocity.com.war` file from the latest release assets.


### Configure CORS

{!fragments/cors-config.md!}

### Deploy the sample

Deploy this sample web app on a web container.

1.  Copy the `travelocity.com.war`file into the `webapps` folder. For
    example, ` <TOMCAT_HOME>/apache-tomcat-<version>/webapps`
    
2.  Open a terminal window and add the following entry to the
    `/etc/hosts` file of your machine to configure
    the hostname.

    ``` bash
    127.0.0.1   wso2is.local
    127.0.0.1   localhost.com
    ```

    !!!info "Why is this step needed?"
		Some browsers do not allow you to create cookies for a naked
		hostname, such as `            localhost           `. Cookies are
		required when working with SSO . Therefore, to ensure that the SSO
		capabilities work as expected in this tutorial, you need to
		configure the `            etc/host           ` file as explained in
		this step.

		The `            etc/host           ` file is a read-only file.
		Therefore, you won't be able to edit it by opening the file via a
		text editor. Instead, edit the file using the terminal commands.  
		For example, use the following command if you are working on a
		Mac/Linux environment.

		``` java
		sudo nano /etc/hosts
		```
		
3.  Open the `travelocity.properties` file found in the `
    <TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes ` directory
    and configure the following property with the hostname ( `
    wso2is.local ` ) that you configured above.

    ``` text
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```
    
4.  Restart the Tomcat server.

To check the sample application, navigate to
`http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp`
on your browser.

For example,
`http://wso2is.local:8080/travelocity.com/index.jsp`

!!! tip
    
    If you wish to change properties like the issuer ID, consumer
    URL, and IdP URL, you can edit the **travelocity.properties** file found
    in the `         travelocity.com/WEB-INF/classes        ` directory.
    Also if the service provider is configured in a tenant you can use
    "QueryParams" property to send the tenant domain.For example,
    "QueryParams=tenantDomain=wso2.com".
    
    This sample uses the following default values.
    
    | Properties                                                                                                                                                                          | Description                                                        |
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
    | `             SAML2.SPEntityId=travelocity.com                         `                                                                                                            | A unique identifier for this SAML 2.0 Service Provider application |
    | `              SAML2.AssertionConsumerURL=                                             http://wso2is.local:8080/travelocity.com/home.jsp                                          ` | The URL of the SAML 2.0 Assertion Consumer                         |
    | `              SAML2.IdPURL=                                             https://localhost:9443/samlsso                                          `                                  | The URL of the SAML 2.0 Identity Provider                          |
    | `             SAML2.IsPassiveAuthn=true                         `                                                                                                                   | Set this to send SAML2 passive authentication requests             |
    
    If you edit the `travelocity.properties` file, restart the
    Apache Tomcat server for the changes to take effect.

### Query SAML2 assertions

{!fragments/saml-query-assertion-client-app.md!}

1. Access the Travelocity application via `http://wso2is.local:8080/travelocity.com/index.jsp`

2.  Start the SAML Tracer.

    !!! tip
        If you do not have a SAML tracer already, install a SAML Tracer (plugin/application/browser extension) that enables searching assertions.

3.  Log in using administrator credentials (admin:admin).

    When a user logs in, the created assertion will be persisted in the SAML Tracer.

4. Copy the attribute **ID** value that is located inside the tag, `<saml2:Assertion>` of the created assertion. You can use this ID to query the assertion using an `AssertionIDRequest`.

5. Navigate to the `<CLIENT_HOME>/src/main/java/org/wso2/carbon/identity/saml/query/profile/test` directory.

6. Open the `SAMLAssertionIDRequestClient.java` class and assign the `AssertionID` that you copied from the assertion to the `ASSERTION_ID` variable.

7. Run the `main()` method of the class. Note that a request and response get generated similar to the following.

    !!! abstract ""
        **Request**
        ``` xml
        <?xml version="1.0" encoding="UTF-8" ?>
        <saml2p:AssertionIDRequest xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" ID="_1c785f98-4e41-4a4d-a496-5e7432e700fa" IssueInstant="2016-09-12T03:18:24.762Z" Version="2.0">
            <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">travelocity.com</saml2:Issuer>
            <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:SignedInfo>
                    <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                    <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
                    <ds:Reference URI="#_1c785f98-4e41-4a4d-a496-5e7432e700fa">
                        <ds:Transforms>
                            <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                            <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                        </ds:Transforms>
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                        <ds:DigestValue>TFH3NQVv2N41PnPh3G2dKDgg0mw=</ds:DigestValue>
                    </ds:Reference>
                </ds:SignedInfo>
                <ds:SignatureValue>a1wabcJTMDUv0KYTU3ftukKDR7e2zgd9Q6OFMDJmee7HcKb896spUprQIjMuvoMie9fxnm2+7346 q/zi5fe5Vdjid9MMAN7ls4iNbrIYnlHTdJzYX7ulQpNQ76GJevZw4N65qf/oaamc4HOOFw3TZYtv jYX0osmGqW5MjR9b748lQJ4kKgtgxzvT92s8Yn9OndJ+970pRuPdgZO57/LueSvUjHLfA7AuGGbH 5WDYuK4BJ6WnrhqzJ2Zc/OpilOO3uoP/RW4kJEtbMFpH6xWnb552uRYdS121qJasZM9aqzfKa0NH sWrZpmqwz0inXmZliqFShuhRKkIOF+2CmdZgXg==
                </ds:SignatureValue>
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIIDezCCAmOgAwIBAgIEa4wPCDANBgkqhkiG9w0BAQsFADBuMQswCQYDVQQGEwJMSzEQMA4GA1UE CBMHd2VzdGVybjEQMA4GA1UEBxMHY29sb21ibzEUMBIGA1UEChMLc29hc2VjdXJpdHkxETAPBgNV BAsTCHNlY3VyaXR5MRIwEAYDVQQDEwlsb2NhbGhvc3QwHhcNMTYwNzEzMTczMDQ5WhcNMTYxMDEx MTczMDQ5WjBuMQswCQYDVQQGEwJMSzEQMA4GA1UECBMHd2VzdGVybjEQMA4GA1UEBxMHY29sb21i bzEUMBIGA1UEChMLc29hc2VjdXJpdHkxETAPBgNVBAsTCHNlY3VyaXR5MRIwEAYDVQQDEwlsb2Nh bGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCRo50ubPqW09rzptxmKIaeSjFP UbkmsMUn1jQvrH5vyumRjBKDY//uXQwcCAcmTw4Bb5RVdZVOiJPxQixQghBGgaVv3UobuilYtNuS /qEVZvnX4RBNkADOXXp+inf5a8OQYjVV7aac1bcSFx/4DgvcWT6mPLpm4dMVMhBWYye0gfPHKMIR 1W1BR/+dJuZePJVa0xFzJ33CBA38vrqg6OuEsZY0fMMfFasyxepUlIECTkKq7ie5PP+31gqw9cAu bIfeO9HtXcQBC7GPgcCgRV7+azJS1MgxbpvlDHJnVxcTcX3IdMCrclCC87DJIMVpbDeK6oGSqbhu Kn69sqnq6e9PAgMBAAGjITAfMB0GA1UdDgQWBBRRWwyTdsm/QxyObtcHBKtH0EMQ2zANBgkqhkiG 9w0BAQsFAAOCAQEANy3xYK8wD9EuKyXbAeEJs5jvoL/2cI4EOZfP1VKAa3SHv+AYPzxqmuyMpD2f 6Tx9yyOP+0QNNynHMC6RPjz8Ib5GzSbvUfbJKXAU7GPc/7riKMJzv52NI8KqFdQ1Y7YiKAMs5dpJ QAhiLlRU9yuhljWqXQ5h8eVJ+vO+9+VPSctDuNpHrhbIZbwAd5Cf+Avp7VDdaU2UIG3Xg7AJkXRF Oa0pEVPW+brkq9uLYTA4bMcr+ROH9REUA0f1AuWfi4aVDFptfVwULCqT9PPliqoZxJEzqccGjWgf Q0NktrBaTVRQo5BPpfRja5l7ajYAPKL7vS3OGCF1Ycocq6Wa6WMj7g==
                        </ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </ds:Signature>
            <saml2:AssertionIDRef xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">_f013b1db55d7bdea33102b4d72159011</saml2:AssertionIDRef>
        </saml2p:AssertionIDRequest>
        ```
        ---
        **Response**
        ``` xml
        <?xml version="1.0" encoding="UTF-8" ?>
        <saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" ID="_714cddb7f1c42d64376f0e6bd9d2f310" IssueInstant="2016-09-12T03:18:31.233Z" Version="2.0">
            <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">localhost</saml2:Issuer>
            <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                <ds:SignedInfo>
                    <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                    <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
                    <ds:Reference URI="#_714cddb7f1c42d64376f0e6bd9d2f310">
                        <ds:Transforms>
                            <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                            <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                        </ds:Transforms>
                        <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                        <ds:DigestValue>+ghoomfq6hsNvVqr3+SKcGowIu0=</ds:DigestValue>
                    </ds:Reference>
                </ds:SignedInfo>
                <ds:SignatureValue>YofQrnFqtF2bDrq7w1CsKQKI/E3GdimZ4INryN27hX4bSXa3EP4gHsGr0MH+Hhk6g9xYHbVBuCQR ht+/j8EBBmBnqHIxPrg43Xn+zNg9FmKtwqa8rXJeu5pELq0dhx/X6tSVzXAuDmLoOlyO/YwEYmuJ wnUZce4MfIlNt7UdyqM=
                </ds:SignatureValue>
                <ds:KeyInfo>
                    <ds:X509Data>
                        <ds:X509Certificate>MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UE CAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxv Y2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQsw CQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UE AwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTou sMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5 HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQID AQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44i QlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJR O4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=
                        </ds:X509Certificate>
                    </ds:X509Data>
                </ds:KeyInfo>
            </ds:Signature>
            <saml2p:Status>
                <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
            </saml2p:Status>
            <saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="_f013b1db55d7bdea33102b4d72159011" IssueInstant="2016-09-11T10:51:06.563Z" Version="2.0">
                <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">localhost</saml2:Issuer>
                <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
                    <ds:SignedInfo>
                        <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                        <ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
                        <ds:Reference URI="#_f013b1db55d7bdea33102b4d72159011">
                            <ds:Transforms>
                                <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
                                <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
                            </ds:Transforms>
                            <ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
                            <ds:DigestValue>4Ga5N4FTMUTAdkxiiuj9OeGTf3c=</ds:DigestValue>
                        </ds:Reference>
                    </ds:SignedInfo>
                    <ds:SignatureValue>LRh6u1wTb7h7NgY+UoWtlgxhXRFyceYGxI7Q+ava2r+MhXl/N/uL5PgW6Bad5UwhqivINGuSrYJd L++taWxyaOVFQPNp2nEMRn+BhMgR2lWpyU/aaXgDIPyZGG5MrF0VI3r1s1NNBc1n0tREOeqxTSFZ eDLW/J2xCRYIZm8HKSU=
                    </ds:SignatureValue>
                    <ds:KeyInfo>
                        <ds:X509Data>
                            <ds:X509Certificate>MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UE CAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxv Y2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQsw CQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UE AwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTou sMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5 HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQID AQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44i QlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJR O4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=
                            </ds:X509Certificate>
                        </ds:X509Data>
                    </ds:KeyInfo>
                </ds:Signature>
                <saml2:Subject>
                    <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">admin</saml2:NameID>
                    <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                        <saml2:SubjectConfirmationData NotOnOrAfter="2016-09-11T10:56:06.467Z" Recipient="http://travelocity.com" />
                    </saml2:SubjectConfirmation>
                </saml2:Subject>
                <saml2:Conditions NotBefore="2016-09-11T10:51:06.563Z" NotOnOrAfter="2016-09-11T10:56:06.467Z">
                    <saml2:AudienceRestriction>
                        <saml2:Audience>travelocity.com</saml2:Audience>
                    </saml2:AudienceRestriction>
                </saml2:Conditions>
                <saml2:AuthnStatement AuthnInstant="2016-09-11T10:51:06.580Z" SessionIndex="d1e12225-6c86-49f7-9d13-b07793caecc4">
                    <saml2:AuthnContext>
                        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</saml2:AuthnContextClassRef>
                    </saml2:AuthnContext>
                </saml2:AuthnStatement>
            </saml2:Assertion>
        </saml2p:Response>
        ```

You have successfully queried an assertion with an `AssertionIDRequest` using the sample application. 

-----

!!! info "Related topics"
    - [Concept: SAML](../../../references/concepts/authentication/intro-saml/)    
