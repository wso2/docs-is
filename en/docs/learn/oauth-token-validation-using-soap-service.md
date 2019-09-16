# OAuth Token Validation Using SOAP Service

WSO2 Identity Server provides a SOAP service to validate the OAuth2
token it has issued, which can be used by the resource server. This
section guides you through calling the SOAP service using the SOAP UI.

The relevant code segment in the sample webapp [WSO2
playground2](../../learn/downloading-a-sample) for OAuth2 can be found
[here](https://github.com/wso2/product-is/blob/5.x.x/modules/samples/oauth2/playground2/src/main/org/wso2/sample/identity/oauth2/OAuth2ServiceClient.java)
.

1.  Add the following configuration property to the `deployment.toml` file in the ` <IS_HOME>/repository/conf`
    folder and set the `           <HideAdminServiceWSDLs>          `
    property to true.

    !!! note "Note"
        This step is just to make the admin services WSDL
        accessible. Once the service WSDL is taken, set the property to **false**
        hide admin service WSDLs.

        

    ``` java
    <!-- If this parameter is set, the ?wsdl on an admin service will not give the admin service wsdl. --> 
    <HideAdminServiceWSDLs>true</HideAdminServiceWSDLs>
    [admin_service.wsdl] 
    enable = true
    ```

2.  Restart the server to make the changes effective.

3.  Go to the SOAP UI and give the WSDL location.
    1.  **Service Name:** OAuth2TokenValidationService

    2.  **WSDL location:** https://localhost:9443/services/OAuth2TokenValidationService?wsdl

4.  Provide the following parameters to call the validate method as seen
    below. ![oauth-token-validation-request]( ../../assets/img/using-wso2-identity-server/oauth-token-validation-request.png)

    1.  Since this validation service is an admin service, a valid user
        name and password needs to be provided in order to consume the
        service.
    2.  Identifier value is the token to be validated.
    3.  If the user claims are also required while validating the access
        token, a list of claim URIs can be provided as well.
    4.  The response will contain details on the authorized user for the
        token, whether the token is valid and how many more seconds for
        which the token is valid. If an error occurred while validating
        the token, it can be sent as the error message.

!!! info "Related Topics"
    In order to get the user claims of the authorized user as a JWT token
    with the validation response, see [JWT Token
    Generation](../../learn/jwt-token-generation).
