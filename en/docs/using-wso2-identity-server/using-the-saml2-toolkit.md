# Using the SAML2 Toolkit

The SAML2 Toolkit is useful when configuring SAML2-based Web SSO. This
enables you to identify what you have missed or did wrong in either in
the Identity Provider (IdP) side or Service Provider (SP) side.

This toolkit consists of two modules:

-   **SAML2 Request Validator** - Admin can use this tool to validate
    the incoming SAML2 AuthnRequest with the configured SAML2 service
    provider in the Identity Server. After the validation, it will
    provide required information to correct the SAML2 AuthnRequest to
    match with service provider configuration.
-   **SAML2 Response Builder** - Admin can use this tool to generate a
    sample SAML2 response for a selected SAML2 Web SSO configuration for
    testing purposes.

##### To access the SAML2 Toolkit

1.  Log in to the WSO2 Identity Server and access the management
    console.
2.  In the management console, you can find the **SAML** section under
    the **Tools** menu.  
    ![SAML menu-item](../../assets/img/using-wso2-identity-server/saml-menu-item.png)

    

### Working with the SAML request validator

1.  Once you click the **SAML Request Validator** link, the following
    screen appears:  
    ![Validate SAML request](../../assets/img/using-wso2-identity-server/validate-saml-request.png)  
    -   Before starting the validation, it is required to specify the
        request binding which the service provider has initiated. This
        may be either `            HTTP POST           ` or
        `            HTTP Redirect           ` . You can specify this in
        your SP side configuration.
    -   You must also provide the SAML2 Request. For
        `            HTTP POST           ` binding, you can extract the
        request using a Mozilla Firefox add-on like [SAML
        Tracer](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/)
        or using in-built developer tools in most of the web browsers.
        In both cases you can find the SAML Request as "
        `            SAMLRequest=IZfhfReBEadHHLl....           ` "
        inside the form data. Copy and paste only the encoded request
        without " `            SAMLRequest=           ` " to the given
        text area. If the request binding used is
        `            HTTP Redirect           `, you can also get the
        SAML Request from the developer tools. However, in this instance
        you have to copy the URL instead of the encoded request. This is
        required because parameters like "
        `            SigAlg           ` " and "
        `            Signature           ` " which are used in the
        validation are also included in the URL. The URL should have a
        similar format to "
        `                         https://localhost:9443/samlsso?SAMLRequest=jZLRjqowEIZfhfReBEXRR                        ...           `
        ".
    -   As the Issuer can be extracted from the SAML request there is no
        need to specify SAML Web SSO configuration which is required to
        do the validation. The toolkit will automatically select the
        appropriate configuration using the issuer value.
2.  Finally use " **Validate** " button to get the validation results.
    The results are displayed as steps indicating whether the request
    has passed or failed that specific step. Using this information, the
    user can identify the exact area of the configuration that requires
    attention and fix it using the expected value.

### Working with the SAML response builder

1.  Once you click the " **SAML Response Builder** " link, the following
    screen appears:  
    ![Build SAML response](../../assets/img/using-wso2-identity-server/build-saml-response.png)  
    -   This feature allows you to build a valid response against a
        selected SAML2 Web SSO configuration.
    -   All the issuers available in configurations are listed here in
        the **Issuer** drop down. So you can select the required
        configuration by selecting the **Issuer**.
    -   The **User Name** is also required to get the user profile which
        will be used during the response generation.
2.  Click the " **Generate** " button, the response builder will
    generate the response using provided data and display it in both XML
    and in encoded format as follows.  
    ![SAML responses](../../assets/img/using-wso2-identity-server/saml-responses.png)   
    The user can verify the configuration from the returned response, by
    looking at the XML. Also, some web sites like
    [Salesforce](http://www.salesforce.com/) provides the facility to
    validate the encoded response against the service provider's
    configuration. So you can use the returned encoded response there to
    identify the issues in configuration. By using the information
    provided by this tool, the user can modify the configuration in the
    identity provider's side or service provider's side accordingly to
    get the desired result.

  
