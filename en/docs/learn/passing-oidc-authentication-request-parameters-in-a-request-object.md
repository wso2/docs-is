# Passing OIDC Authentication Request Parameters in a Request Object

WSO2 Identity Server (WSO2 IS) supports passing OIDC authentication
request parameters in a self contained JWT, instead of passing plain
request parameters. For more information on OIDC request object support
in WSO2 IS, see [Request Object Support in WSO2 Identity
Server](../../learn/request-object-support).

!!! tip
    A JWT that contains a set of request parameters as its claims is known
    as a request object.
    

This tutorial includes the following sections that walk you through the
procedure you need to follow to pass OIDC authentication request
parameters in a request object via WSO2 IS:

### Prerequisites

-   Download and install WSO2 Identity Server. For detailed information
    on how to install WSO2 IS, see [Installing the
    Product](../../setup/installing-the-product).
-   Download and install [Apache Tomcat
    7.x](https://tomcat.apache.org/download-70.cgi).

### Procedure

1.  Set up the playground sample. For instructions on how to set up the
    playground sample, see [Basic Client Profile with
    Playground](../../learn/basic-client-profile-with-playground).
2.  Follow the steps below to configure a public certificate for the
    service provider:  
    1.  Execute the following command from the
        `             <IS_HOME>/repository/resources/security            `
        directory to create a new keystore:

        ``` java
        keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
        ```

    2.  Execute the following command to export the public key of the
        new keystore to a file, named with the client-id of the OAuth
        application.

        ``` java
        keytool -export -alias wso2carbon -file testPublicCert.crt -keystore testkeystore.jks
        ```

        This prompts for the keystore password.

    3.  Enter `             wso2carbon            ` as the password.

    4.  Execute the following command to retrieve the certificate in
        X509 format:

        ``` java
        keytool -printcert -rfc -file testPublicCert.crt
        ```

        You will see the public certificate in X509 format on the
        terminal.

    5.  Copy the content of the certificate.

    6.  On the Management Console, go to **Service Providers** -\>
        **List**, and **Edit** the service provider that you created
        when setting up the playground sample.
    7.  Paste the certificate content that you copied as the
        **Application Certificate** of the service provider.  
        ![app-certificate](../assets/img/tutorials/app-certificate.png)
        
        !!! note
            Instead of uploading the service provider certificate as shown
            above, you can choose to use the JWKS enpoint as shown below and
            add the relevant JWKS URI.

			![jwks-uri.png](../assets/img/tutorials/jwks-uri.png)

    8.  Click **Update**.

3.  Follow the steps below to configure claims:
    1.  Add two new external claims as follows for the
        `             http://wso2.org/oidc/claim            ` dialect.
        For detailed instructions on how to add a new claim mapping to a
        claim dialect, see [Adding Claim Mapping](../../learn/adding-claim-mapping).  
        ![external-claim-1](../assets/img/tutorials/external-claim-1.png)
        ![external-claim-2](../assets/img/tutorials/external-claim-2.png)

    !!! note
        Here, `             customClaim1            ` and
        `             customClaim2            ` are selected as claim
        URIs because those are not configured as requested claims in the
        OIDC scope. For the purpose of testing, these claims are mapped
        to existing <http://wso2.org/claims/challengeQuestion1> and
        <http://wso2.org/claims/challengeQuestion2> local claims. If
        necessary you can create two new local claims for this purpose.

    2.  When you add the claims, be sure to select **Support by
        default** if you want the the claims to prompt during user
        registration. Follow the steps below to set **challenge
        Question1** and **challenge Question2** to prompt during user
        registration:
        1.  On the management console, click **List** under **Claims**,
            This displays the Claims screen with the **Available claim
            dialects**.
        2.  Click
            `                             http://wso2.org/claims                           `
            under **Available claim dialects**.
        3.  Edit `              challengeQuestion1             `
            , select **Support by default**. and then click **Update**
            .
        4.  Edit `              challengeQuestion2             ` ,
            select **Support by default**. and then click **Update**.
    3.  Edit the service provider that you created above, expand **Claim
        Configuration**, and add the following as **Requested Claims**
        :  

        -   `              http://wso2.org/claims/challengeQuestion1             `
        -   `              http://wso2.org/claims/challengeQuestion2             `
        -   `              http://wso2.org/claims/country             `
        -   `                             http://wso2.org/claims/emailaddress                                         `

        
        !!! tip
        	If a user has already consented once to the requested
        	claims that are configured on the service provider, any further
        	changes/additions to the requested claims will not apply. If you
        	are facing this issue, do one of the following.
        	-   Mark the claims given above as **Mandatory Claims**. This
        		will ensure that the user will be prompted once again to
        		provide consent for the newly added/changed claims.
        	-   Log in to the **My Account**, revoke the consent reciept
        		for the application, and then attempt to log in to the
        		application again. Now you will be prompted to provide
        		consent for all requested claims, including the newly
        		added/changed claims. For more information on
        		revoking/accepting user consent, see [Consent management](../learn/my-account.md#consent-management).

    4.  Click **Update**.

4.  Create a new user with the name `         Alex        ` , and enter
    values for the **email**, **country**, **challenge Question1** as
    well as **challenge Question 2** in the user profile. For detailed
    instructions on creating a user and customizing a user's profile,
    see [Configuring Users](../../learn/configuring-users).
5.  <a name="passingoidc"> </a> Create a JWT with the following payload and sign(RSA256) it with the
    private key of the keystore created in step 2. (You can use
    <https://jwt.io/> for this)

    ``` java
    {
      "client_id": "<client-id>",
      "sub": "<client-id>",
      "aud": [
        "https://localhost:9443/oauth2/token"
      ],
      "claims": {
        "userinfo": {
          "given_name": {
            "essential": true
          },
          "nickname": null,
          "email": {
            "essential": true
          },
          "customClaim2": {
            "essential": true
          }
        },
        "id_token": {
          "gender": null,
          "birthdate": {
            "essential": true
          },
          "customClaim1": {
            "essential": true
          }
        }
      },
      "iss": "<client-id>",
      "exp": 1516786878,
      "iat": 1516783278,
      "jti": "1003"
    }
    ```

    This creates a signed request object.

### Testing the flow

-   To test the flow without a signed request object, specify the
    `          authorization_code         ` grant type for the user, and
    use the OIDC scope from the playground application to obtain an
    `          id_token         ` . Then retrieve user information using
    the access token.

<!-- -->

-   To test the flow with a signed request object, use the
    `           authorization_code          ` grant for the user, and
    specify the authentication endpoint as
    `           https://localhost:9443/oauth2/authorize?request=<JWT>          `
    . Next, obtain the `           id_token          ` and retrieve user
    information.

    !!! note
        The JWT used here is the signed JWT created in [step
        5](#passingoidc)
        of the procedure given above.
    

### Analyzing the response

When you analyze the responses of the two tests, you will observe that
together with `         customClaim2        ` retrieved in the userinfo
response, an additional claim `         customClaim1        ` is
retrieved via the `         id_token        ` when you configure the
authorization code flow with a signed request object.  
  

!!! note "Where to go next"
	Now that you understand how to pass OIDC authentication request
	parameters in a signed request object via WSO2 IS, you can configure a
	service provider to only accept signed request objects. For a tutorial
	on how to enforce signature validation for request objects, See
	[Enforcing Signature Validation for Request
	Objects](../../learn/enforcing-signature-validation-for-request-objects).

  

  
