# Evolution of Identity Federation Standards

Identity and access management requirements are rapidly evolving over
the years. Organizations cannot survive with authentication and
authorization mechanisms that only span a single boundary of trust.
Hence, these organizations often provide and consume services across
trust boundaries, which may include partners, subsidiaries, customers or
suppliers and may span across multiple buildings, cities, states,
countries and even continents. Identity federation and Single Sign On
(SSO) come into the picture to provide and consume these services across
trust boundaries.

Identity federation and SSO have similarities as well as key
differences. Identity federation enables users to access multiple
applications using the same access credentials. This makes access easy,
as users do not have to remember a different set of credentials for
every application they use. However, the users have to provide their
credentials to each one of the applications separately although the
credentials used are the same. On the other hand, SSO enables users to
provide their credentials once and obtain access to multiple
applications. In SSO, the users are not prompted for their credentials
when accessing each application until their session is terminated.

This topic expands on Federated Identity and Single-Sign-On concepts.

---

## SAML2-based SSO

One of the key features in WSO2 Identity Server is SAML2-based
Single-Sign-On (SSO) feature. This implementation complies with the
[SAML2 Web Browser SSO profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf)
and the [Single Logout Profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf).

Single Sign On (SSO) systems have become very popular since it is a very
secure and convenient authentication mechanism. Google Apps can be taken
as the best example for a Single Sign On system where users can
automatically login to multiple web applications once they are
authenticated at a one place using a single credential.

Security Assertion Markup Language (SAML) version 2.0 Profiles
Specification defines a web browser based single sign on system. This
article briefly explains the SAML 2.0 web browser-based SSO profile and
guides you to build your own SAML 2.0 Assertions Consumer using the
OpenSAML 2.2.3 Java library. This section helps you to understand how
SAML 2.0 based SSO systems work and how to use WSO2 Identity Server as
the Identity Provider in a SSO system.

The following sections expand on SAML2 based SSO:

---

## About SSO

In a single sign on system there are two roles; Service Providers and
Identity Providers (IP). The important characteristic of a single sign
on system is the pre-defined trust relationship between the service
providers and the identity providers. Service providers trust the
assertions issued by the identity providers and the identity providers
issue assertions based on the results of authentication and
authorization of principles which access services on the service
provider's side.

The following are some of the advantages you can have with SSO:

-   Users need only a single username/password pair to access multiple
    services. Thus they do not have the issue of remembering multiple
    username/password pairs.
-   Users are authenticated only once at the identity provider and then
    they are automatically logged into all services within that
    "trust-domain". This process is more convenient to users since they
    do not have to provide their username/password at every service
    provider.
-   Service providers do not have the overhead of managing user
    identities, which is more convenient for them.
-   User identities are managed at a central point. This is more secure,
    less complex and easily manageable.

For more information on SSO, see [here](../../concepts/single-sign-on).

With the release of WSO2 Identity Server 3.0, it supports the SAML 2.0
web browser based SSO profile. WSO2 Identity Server can act as the
identity provider of a single sign on system with minimal
configurations. This section provides information on how to configure
the identity server and how your applications can be deployed in a SAML
2.0 web browser based SSO system.

---

## SSO in reality

Single Sign On is widely used in web technologies. Google is one of the
best examples.

Try this simple exercise,

1.  Visit [www.google.com](http://www.google.com/) from your web
    browser.
2.  Click on the **SIGN IN** button on the top right of the page.
3.  Once you sign in, you are redirected to
    [www.google.com/accounts/ServiceLogin](http://www.google.com/accounts/ServiceLogin)
. There you are requested to enter your Username and Password. Enter
    your Google credentials there.
4.  Once you enter your Username and Password, you are directed back to
    [www.google.com](http://www.google.com/) where you started.
5.  Next visit [www.gmail.com](http://www.gmail.com/), the Google mail
    server.
6.  Notice that you are automatically signed in and you directly access
    your Gmail Inbox. You did not have to enter your Username and
    Password at Gmail.
7.  In addition to that; now try
    [www.youtube.com](http://www.youtube.com/).
8.  Click on the “ **Sign In** ” button on the top right of the YouTube
    home page.
9.  You are automatically signed in. You do not have to enter your
    username and password at YouTube.

    !!! info 
		Notice the URL of the web browser. Each time you access an
		application, you see that you are being redirected to
		[www.google.com/accounts/ServiceLogin](http://www.google.com/accounts/ServiceLogin)
		and return immediately back to the website.

Single Sign On (SSO) allows you to sign in only once but provides access
to multiple resources without having to re-enter your username and
password.

---

## SAML 2.0 web browser-based SSO profile

SAML 2.0 Web Browser based SSO profile is defined under the SAML 2.0
Profiles specification. SAML 2.0 provides five main specifications:

-   [Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
-   [Binding](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)
-   [Profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf)
-   [Metadata](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf)
-   [Conformance](https://docs.oasis-open.org/security/saml/v2.0/saml-conformance-2.0-os.pdf)

In a web browser based SSO system, the flow can be started by the user
either by attempting to access a service at the service provider or by
directly accessing the identity provider itself.

**If the user accesses a service at a service provider:**

1.  The service provider determines which identity provider to use (this
    is the case when there are multiple identity providers. SAML
    identity provider discovery profile may be used).
2.  The service provider generates a SAML message and then redirects the
    web browser to the identity provider along with the message.
3.  Identity provider authenticates the user.
4.  The identity provider generates a SAML message and then redirects
    the web browser back to the service provider.
5.  The service provider processes the SAML message and decides to grant
    or deny access to the user.

If the user accesses the identity provider directly, then only the steps
3, 4 and 5 are in the flow.

The message MUST contain an element which uniquely identifies the
service provider who created the message. Optionally the message may
contain elements such as, etc. More information regarding the message
can be found in [SAML Core
Specification](http://www.oasis-open.org/committees/download.php/35711/sstc-saml-core-errata-2.0-wd-06-diff.pdf).

The following diagram illustrates the scenario:
![](../../assets/img/references/sso-profile.png)

---

## SAML 2.0 SSO assertion consumers

Service providers act as SAML assertion consumers. They have two basic
functions:

1.  Create messages and redirect users to the identity provider with the
    created message.
2.  Process messages from the identity provider and make decisions based
    on them.

The following code is a sketch of a sample service provider servlet in a
SAML 2.0 Web-Browser based SSO system.

``` java
public class Resource extends HttpServlet 
{             
     private static SamlConsumer consumer = new SamlConsumer();           
     public void doGet(HttpServletRequest request, HttpServletResponse response) 
     { 
             requestMessage = consumer.buildRequestMessage();
             response.sendRedirect(requestMessage);
     }            
     public void doPost(HttpServletRequest request, HttpServletResponse response) 
     { 
             responseMessage = request.getParameter("SAMLResponse").toString();  
             result = consumer.processResponseMessage(responseMessage);
     }
}
```

When a web user attempts to access the above servlet, its **doGet()**
method is called. Inside the **doGet()** method, it generates an message
and then redirects the user to the Identity Provider.

After authentication is completed by the Identity Provider, it does a
POST call back to the above servlet with a message. Then the
**doPost()** method of the servlet gets called and inside the
**doPost()** method, it retrieves the message from the request and then
the message is passed to the **SamlConsumer** instance for processing.

The complete source code can be checked out
[here](http://svn.wso2.org/repos/wso2/carbon/platform/branches/turing/products/is/4.6.0/modules/samples/sso/)
.

---

## <AuthnRequest> message

To create an `         <AuthnRequest>        ` message using the
OpenSAML library:

1.  Add the OpenSAML library to the build path of the project. You can
    download the open SAML JAR file from
    [here](http://code.google.com/p/saml2-consumer-module/downloads/detail?name=opensaml2-2.0.0.alpha1-wso2v1.jar)
.
2.  A sample <AuthnRequest> message can be found
    [here](http://wso2.org/files/AuthRequest.xml).

3.  According to SAML 2.0 specifications, the message must contain an
    element. Create the **Issuer** element first.

    ``` java
	// the issuerUrl is the url of the service provider who generates the  message
	String issuerUrl = "http://localhost:8080/saml2.demo/consumer";
	IssuerBuilder issuerBuilder = new IssuerBuilder();
	Issuer issuer = issuerBuilder.buildObject("urn:oasis:names:tc:SAML:2.0:assertion", "Issuer", "samlp");
	issuer.setValue(issuerUrl);
    ```

4.  Create the `           <AuthnRequest>          ` next.

    ``` java
	DateTime issueInstant = new DateTime();
	AuthnRequestBuilder authnRequestBuilder = new AuthnRequestBuilder();
	AuthnRequest authnRequest = authnRequestBuilder.buildObject("urn:oasis:names:tc:SAML:2.0:protocol", "AuthnRequest", "samlp");
	authnRequest.setForceAuthn(new Boolean(false));
	authnRequest.setIsPassive(new Boolean(false));
	authnRequest.setIssueInstant(issueInstant);
	authnRequest.setProtocolBinding("urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST");
	authnRequest.setAssertionConsumerServiceURL(issuerUrl);
	authnRequest.setIssuer(issuer);
	authnRequest.setID(aRandomId);
	authnRequest.setVersion(SAMLVersion.VERSION_20); 
    ```

    The message may contain many other elements like, etc. those
    elements can be created and added to the message in the same way.

5.  Next encode the message.

    ``` java
	Marshaller marshaller = Configuration.getMarshallerFactory().getMarshaller(authnRequest);
	Element authDOM = marshaller.marshall(authnRequest);


	StringWriter rspWrt = new StringWriter();
	XMLHelper.writeNode(authDOM, rspWrt);
	String requestMessage = rspWrt.toString();
			 
	Deflater deflater = new Deflater(Deflater.DEFLATED, true);
	ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
	DeflaterOutputStream deflaterOutputStream = new DeflaterOutputStream(byteArrayOutputStream, deflater);
	deflaterOutputStream.write(requestMessage.getBytes());
	deflaterOutputStream.close();
			 
	/* Encoding the compressed message */
	String encodedRequestMessage = Base64.encodeBytes(byteArrayOutputStream.toByteArray(), Base64.DONT_BREAK_LINES);
	String encodedAuthnRequest = URLEncoder.encode(encodedRequestMessage,"UTF-8").trim();
    ```

6.  Construct the redirection URL.

	``` java
    redirectionUrl = identitypProviderUrl+ "?SAMLRequest=" +
    encodedRequestMessage;
	```

7.  Redirect the user to the identity provider.

	``` java
    response.sendRedirect(redirectionUrl);
	```
---

## <Response> message

To read the `         <Response>        ` message issued by the WSO2 Identity Server:

1.  A sample \<Response\> message can be found [here](http://wso2.org/files/Response.xml).

2.  The response message must be fetched from the request.

    ``` java
	responseMessage = request.getParameter("SAMLResponse").toString();
	```

3.  The fetched “ **responseMessage** ” is unmarshaled and the SAML
    message is retrieved.

    ``` java
	DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
	documentBuilderFactory.setNamespaceAware(true);
	DocumentBuilder docBuilder = documentBuilderFactory.newDocumentBuilder();
	Document document = docBuilder.parse(new ByteArrayInputStream(authnReqStr.trim().getBytes()));
	Element element = document.getDocumentElement();
	UnmarshallerFactory unmarshallerFactory = Configuration.getUnmarshallerFactory();
	Unmarshaller unmarshaller = unmarshallerFactory.getUnmarshaller(element);
	Response response = (Response) unmarshaller.unmarshall(element);
    ```

4.  The retrieved SAML 2.0 Response message can be easily processed. For
    example, lets takes the User Name or the Subject's Name Id.

    ``` java
	String subject = response.getAssertions().get(0).getSubject()
.getNameID().getValue();
	```

5.  Alternatively, you can retrieve the certificate.

	``` java
    String certificate = response.getSignature().getKeyInfo().getX509Datas().get(0).getX509Certificates().get(0).getValue();
	```

Likewise the message from the WSO2 Identity Server can be read easily.

---
## Identity provider initiated SSO

To initiate IdP Initiated SSO you need to perform a HTTP GET/POST to the
following URL (assume the registered service provider issuer ID is
foo.com)

<https://localhost:9443/samlsso?spEntityID=foo.com>

This request will authenticate and redirect the user to the registered
Assertion Consumer URL. You can use `acs` query parameter in the request
to specify the Assertion Consumer URL that the browser should be redirected
to after the authentication is successful. 

-   If the `acs` query parameter is not present in the request, the Identity
    Server sends the response to default ACS URL of the service provider.
-   If the `acs` parameter is present and the value of that parameter matches
    with any of the registered ACS URLs of the service provider, then the
    Identity Server sends the response to the matched one.
    
<https://localhost:9443/samlsso?spEntityID=foo.com&acs=http://localhost:8080/foo.com/my-home.jsp>
 
Optionally, you can send a `RelayState` parameter as follows:

<https://localhost:9443/samlsso?spEntityID=foo.com&RelayState=http://localhost:8080/foo.com/my-home.jsp>

This request will authenticate and redirect the user to the URL in the
RelayState parameter itself.

!!! info 
	Either you could have SP Initiated SSO only, or SP Initiated SSO and IdP
	Initiated SSO. You can't have IdP initiated SSO only. By design, SP
	Initiated SSO is more restrictive and secure. If a service provider is
	allowed to do IdP Initiated SSO, it would automatically imply that this
	service provider is allowed to do SP initiated SSO as well.
