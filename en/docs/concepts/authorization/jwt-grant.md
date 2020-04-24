# JWT Grant Type

### Recommended Use

OAuth 2.0 Authorization Server can accept JWT assertions from OAuth 2.0 clients as a means of
resource owner authentication and authorization. Additionally, it can exchange it with OAuth 2.0 access tokens in order 
to access protected resources on behalf of the resource owner.

### How does it work ?

When an entity initiates a request to gain access to an application:

1. The client application sends an access request to the identity provider.

2. The identity provider creates a `JWT assertion` with the corresponding claims and sends it back to the service provider.

3. The service provider forwards the access request to the token endpoint of the **authorization server**.
 

The diagram below illustrates the refresh token grant flow.

![password-grant](../../assets/img/concepts/refresh-token-grant-flow.png)

Following cURL commands can be used to try this grant type.

``` java
curl -k -d "grant_type=refresh_token&refresh_token=<refresh_token>" -H "Authorization: Basic <Base64Encoded(Client_Id:Client_Secret)>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```
