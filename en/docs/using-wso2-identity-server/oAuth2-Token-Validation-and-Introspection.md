# OAuth2 Token Validation and Introspection

WSO2 Identity Server provides a SOAP service to validate the OAuth2
token it has issued, which can be used by the resource server.

-   [Invoke the OAuth Introspection
    Endpoint](_Invoke_the_OAuth_Introspection_Endpoint_)
-   [OAuth Token Validation Using SOAP
    Service](_OAuth_Token_Validation_Using_SOAP_Service_)
-   [OAuth Transaction Logs](_OAuth_Transaction_Logs_)

**However from these 2 methods, the recommended approach is to use the
REST API given above.**

If subject identifier in the token validation response needs to adhere
to the " Use tenant domain in local subject identifier" and " Use user
store domain in local subject identifier" configurations in service
provider, uncomment below configuration in
\<IS\_HOME\>/repository/conf/identity/identity.xml .

``` xml
<BuildSubjectIdentifierFromSPConfig>true</BuildSubjectIdentifierFromSPConfig>
```

-   Default value of this property is false.
-   I f the value is false, subject identifier will be set as the fully
    qualified username.
