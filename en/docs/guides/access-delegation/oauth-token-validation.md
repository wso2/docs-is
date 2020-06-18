# OAuth Token Validation Using SOAP Service

WSO2 Identity Server provides a SOAP service to validate the OAuth2 token it has issued, which can be used by the resource server. This
page guides you through calling the SOAP service using [SOAP UI](../../https://www.soapui.org/downloads/latest-release.html).

1.  Add the following configuration property to the `deployment.toml` file in the ` <IS_HOME>/repository/conf` folder to enable admin service WSDLs.

    !!! note 
        This step is to make the admin services WSDL accessible. Once the service WSDL is accessible, set this property to false.


    ``` toml
    [admin_service.wsdl] 
    enable = true
    ```

2.  Restart the server to make the changes effective.

3.  Open [SOAP UI](../../https://www.soapui.org/downloads/latest-release.html) and give the WSDL location.

    1.  **Service Name:** OAuth2TokenValidationService

    2.  **WSDL location:** https://localhost:9443/services/OAuth2TokenValidationService?wsdl

4.  Provide the following parameters to call the `validate` method as seen
    below. 

    <img name='oauth-token-validation-request' src='../../../assets/img/guides/oauth-token-validation-request.png' class='img-zoomable'/>

    !!! Tip 
        You can obtain an oauth token by following the tutorial,
        [OAuth 2.0 with WSO2 Playground](insertlink)
        
    1.  Since this validation service is an admin service, a valid username and password needs to be provided in order to consume the
        service.

    2.  The `Identifier` value is the token that is to be validated.

    3.  If the user claims are also required while validating the access token, a list of claim URIs can be provided.

    4.  The response will contain details regarding the authorized user of the token - whether the token is valid, and for how much longer the token is valid (in seconds).
    
        If an error occurrs while validating the token, an error message can be sent with the response.

----

To get the user claims of the authorized user as a JWT token with the validation response, see [Get User Claims as a JWT](../get-user-claims-as-a-jwt).
