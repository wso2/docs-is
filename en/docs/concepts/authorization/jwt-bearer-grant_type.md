# JWT Grant Type

## Recommended Use

OAuth 2.0 Authorization Server can accept JWT assertions from OAuth 2.0 clients as a means of
resource owner authentication and authorization. Additionally, it can exchange it with OAuth 2.0 access tokens in order 
to access protected resources on behalf of the resource owner.

## How does it work ?

When an entity initiates a request to gain access to an application:

1. The client application sends an access request to the identity provider or a JWT issuer.

2. The identity provider or the JWT issuer creates a `JWT assertion` with the corresponding claims and sends it back to 
   the service provider.

3. The service provider forwards the access request to the token endpoint of the **authorization server**.


The diagram below illustrates the jwt bearer grant flow.

![jwt-grant](../../assets/img/concepts/jwt_bearer_grant_type.png)

Following cURL commands can be used to try this grant type.

``` java
curl -i -X POST -u (Base64encoded<client_id>:<client_secret>) -k -d 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<jwt_token>' -H 'Content-Type: application/x-www-form-urlencoded' <token_endpoint>
```