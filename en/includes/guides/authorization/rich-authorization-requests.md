# Rich Authorization Requests

Rich Authorization Requests (RAR) (RFC 9396) enhance authorization mechanisms by allowing clients to specify fine-grained authorization details in a structured format. 
This guide outlines how to configure your application for RAR, authorize API resources, customize authorization validation, and obtain tokens with authorization details.

## Configuring your application for RAR
You can go through the following steps to prepare your application for rich authorization requests.

### Step 1: Register a new authorization details type

Before using RAR, you need to define the authorization details types that your application supports. 
This involves registering an authorization details types using the [API Resource Management Rest API]({{base_path}}/apis/api-resource-management-rest-api/).
(The `authorizationDetailsTypes` field in the request payload follows the JSON Schema Draft 2020-12 standard.)

The following request registers a new authorization details types named `payment_initiation` for a Payments API 
and the response contains details of the newly registered API resource and its authorization details types.

Sample request

```curl
curl --location 'https://<serverUrl>/api/server/v1/api-resources' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data '{"name":"Payments API","identifier":"payments_api","description":"Payments API representation","requiresAuthorization":true,"authorizationDetailsTypes":[{"type":"payment_initiation","name":"Payment Initiations Type","description":"Payment initiation authorization details type","schema":{"type":"object","required":["type","actions","locations","instructedAmount"],"properties":{"locations":{"type":"array","items":{"type":"string","format":"uri"}},"instructedAmount":{"type":"object","properties":{"currency":{"type":"string","minLength":3},"amount":{"type":"string"}}},"type":{"type":"string","enum":["payment_initiation"]},"creditorName":{"type":"string"},"actions":{"type":"array","items":{"type":"string","enum":["initiate","status","cancel"]}},"creditorAccount":{"type":"object"}}}}]}'
```
Sample response

```json
{"id":"ae1c234f-6497-42f5-8bbd-b4a7e2237807","name":"Payments API","identifier":"payments_api","description":"Payments API representation","requiresAuthorization":true,"type":"BUSINESS","authorizationDetailsTypes":[{"id":"e2134d3b-9efc-454c-8fcc-985c414bf6cb","type":"payment_initiation","name":"Payment Initiations Type","description":"Payment initiation authorization details type","schema":{"type":"object","required":["type","actions","locations","instructedAmount"],"properties":{"locations":{"type":"array","items":{"type":"string","format":"uri"}},"instructedAmount":{"type":"object","properties":{"currency":{"type":"string","minLength":3},"amount":{"type":"string"}}},"type":{"type":"string","enum":["payment_initiation"]},"creditorName":{"type":"string"},"actions":{"type":"array","items":{"type":"string","enum":["initiate","status","cancel"]}},"creditorAccount":{"type":"object"}}}}],"properties":[]}
```

Once registered, to retrieve the supported authorization details types, invoke the discovery endpoint of {{product_name}}. 
The response confirms that the `payment_initiation` authorization details type is registered and available for use.

Sample request

```curl
curl --location 'https://<serverUrl>/oauth2/token/.well-known/openid-configuration'
```

Sample response

```json
{
    "introspection_endpoint" : "https://localhost:9443/oauth2/introspect",
    "end_session_endpoint" : "https://localhost:9443/oidc/logout",
    "registration_endpoint" : "https://localhost:9443/api/identity/oauth2/dcr/v1.0/register",
    "token_endpoint" : "https://localhost:9443/oauth2/token",
    "jwks_uri" : "https://localhost:9443/oauth2/jwks",
    "revocation_endpoint" : "https://localhost:9443/oauth2/revoke",
    "authorization_endpoint" : "https://localhost:9443/oauth2/authorize",
    "issuer" : "https://localhost:9443/oauth2/token",
    "authorization_details_types_supported": ["payment_initiation"]
}
```

### Step 2: Authorize an API resource for an application

To allow an application to use an API resource with a specific authorization details type, you need to explicitly authorize the resource for that application.

- You need to have an application registered in {{product_name}}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).
- You need to set the role audience for the created application. [Set the role audience for apps]({{base_path}}/guides/authorization/api-authorization/api-authorization/#set-the-role-audience-for-apps)
- You can use [Authorized APIs]({{base_path}}/apis/application-rest-api/#tag/Authorized-APIs) to authorize the previously created api resource to the application with authorization details types as shown below.

Sample request

This request associates the `payment_initiation` authorization details type with the specified application.

```curl
curl --location 'https://<serverUrl>/api/server/v1/applications/<applicationID>/authorized-apis' \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data '{"id":"<apiResourceID>","policyIdentifier":"RBAC","authorizationDetailsTypes":["payment_initiation"]}'
```

### Step 3: Customize authorization details validation

By default, {{product_name}} validates authorization details against the registered authorization details type schema. 
However, if additional validation is required, you can extend the `org.wso2.carbon.identity.oauth2.rar.core.AuthorizationDetailsProcessor` 
Java interface and provide mechanisms to validate, enrich, and identify authorization details specific to your type.
To execute your custom validation, create a JAR file with your implementation and place it in `<IS_HOME>/repository/components/lib` directory and restart the server.

The interface contains four methods:

```java
ValidationResult validate(AuthorizationDetailsContext authorizationDetailsContext) throws AuthorizationDetailsProcessingException, IdentityOAuth2ServerException;
```
`validate` method is invoked once a new Rich Authorization Request is received to ensure that the
authorization details are valid and meet the required criteria. The validation logic should
be specific to the type of authorization details handled by the implementing class.

```java
String getType();
```
`getType` method used to retrieve the type of authorization details handled by this processor. Each implementation should return a unique type identifier that represents the kind of
authorization details it processes

```java
boolean isEqualOrSubset(AuthorizationDetail requestedAuthorizationDetail, AuthorizationDetails existingAuthorizationDetails);
```
`isEqualOrSubset` method Checks if the requested authorization detail is equal to or a subset of the existing authorization details. This method verifies if the provided {@code requestedAuthorizationDetail} is either exactly the same as or
a subset of the existingAuthorizationDetails that have been previously accepted by the resource owner

```java
AuthorizationDetail enrich(AuthorizationDetailsContext authorizationDetailsContext);
```
`enrich` method is invoked prior to presenting the consent UI to the user. Its purpose is to enhance or augment the authorization details, 
providing additional context or information that may be necessary for informed consent. This may include adding more descriptive
information, default values, or other relevant details that are crucial for the user to understand the authorization request fully.

## Get tokens with authorization details

Once authorization details are configured, an application can request an access token containing the required details.

### Sample client credentials grant flow

This request includes the url-encoded `payment_initiation` authorization details type and the response includes an 
access token with the requested authorization details.

Sample request

```curl
curl --location 'https://<serverUrl>/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic PGNsaWVudElEPjo8Y2xpZW50U2VjcmV0Pg==' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'authorization_details=%5B%7B%22type%22%3A%22payment_initiation%22%2C%22actions%22%3A%5B%22initiate%22%5D%2C%22locations%22%3A%5B%22https%3A%2F%2Fexample.com%2Fpayments1%22%5D%2C%22instructedAmount%22%3A%7B%22currency%22%3A%22USD%22%2C%22amount%22%3A%223000.00%22%7D%2C%22creditorName%22%3A%22Merchant%20A%22%2C%22creditorAccount%22%3A%7B%22iban%22%3A%22%22%7D%7D%5D'
```

Sample response

```json
{"access_token":"9d1e9829-c4f3-3f39-b02c-84298ace1710","authorization_details":[{"locations":["https://example.com/payments1"],"instructedAmount":{"currency":"USD","amount":"3000.00"},"type":"payment_initiation","creditorName":"Merchant A","actions":["initiate"],"creditorAccount":{"iban":"c6142dc9-588c-49ec-8341-1b157c441d02"}}],"token_type":"Bearer","expires_in":3600}
```

### validate the access token

To verify if an access token is valid and check its associated authorization details, invoke the token introspection endpoint.
If the token is active, the response will include its associated authorization details.

```curl
curl --location 'https://<serverUrl>/oauth2/introspect' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic YWRtaW46YWRtaW4=' \
--data-urlencode 'token=9d1e9829-c4f3-3f39-b02c-84298ace1710'
```

Sample response

```json
{"aut":"APPLICATION_USER","aud":"gSrJzfo6HGdrmWMBEXUzzy14TQQa","nbf":1737884044,"authorization_details":[{"locations":["https://example.com/payments1"],"instructedAmount":{"currency":"USD","amount":"3000.00"},"type":"payment_initiation","creditorName":"Merchant A","actions":["initiate"],"creditorAccount":{"iban":"c6142dc9-588c-49ec-8341-1b157c441d02"}}],"active":true,"token_type":"Bearer","exp":1737887644,"iat":1737884044,"client_id":"gSrJzfo6HGdrmWMBEXUzzy14TQQa"}
```
