# Configure Microprofile JWT 1.0 

This page guides you through configuring [microprofile JWT (MP-JWT) 1.0](insertlink) support for WSO2 Identity Server to provide role-based access control for microservices. 

To generate a MP-JWT-compatible token, all you need to do is set up the service provider to request the following claims.

- http://wso2.org/claims/userprincipal
- http://wso2.org/claims/role 

----

This guide assumes you have your own application. If you wish to try out this flow with a sample application and a sample authenticator, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/microprofile-jwt-sample"   rel="nofollow noopener">Try it with the sample</a>

----

{!fragments/register-a-service-provider.md!}

4. Expand **Claim Configuration**.

5. Add the following requested claims. 
    - http://wso2.org/claims/userprincipal
    - http://wso2.org/claims/role 

----

{!fragments/oauth-app-config-basic.md!}

Now the generated ID token using this client is compatible with the MP-JWT specification.

----

## Generate JWT

Run the following curl command using the generated client ID and client secret. 

```tab="Request Format"
curl --user <client_key>:<client_secret>  -k -d "grant_type=password&username=<username>&password=<password>&scope=openid" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

```tab="Sample Request"
curl --user N_nhS_UXctKHofSyLju1rbt_Cbwa:AOkWrH42XKRSsFongXpUnR6mpHYa   -k -d "grant_type=password&username=admin&password=admin&scope=openid" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You can also send the above command with an authorization header instead of the clientID and client secret. To do this encode the `clientid:clientsecret` combination using base64 encoding and send the request as seen below. 

```
curl -H "Authorization: Basic <BASE64 ENCODED COMBINED CLIENT ID:CLIENT SECRET>" -H "Content-Type: application/x-www-form-urlencoded" -k -d "grant_type=password&username=admin&password=admin&scope=openid" https://localhost:9443/oauth2/token
```

You will recieve a response with the JWT token. 

```tab="Response"
{"access_token":"ac4d1b89-9f8a-3bbd-87d5-735ecb10eccb","refresh_token":"dac0e46b-4038-34d1-9c74-ee3fa6d6f3ee","scope":"openid","id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoibDlVMXZ4dzV3VDJlV3VVS3VWY2lEQSIsImF1ZCI6IllteEQwakRPSWZpQmtEOFRQTFlPZnhOU0lnNGEiLCJzdWIiOiJhZG1pbiIsInVwbiI6ImFkbWluIiwibmJmIjoxNTg3NDU4NDUxLCJhenAiOiJZbXhEMGpET0lmaUJrRDhUUExZT2Z4TlNJZzRhIiwiYW1yIjpbInBhc3N3b3JkIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImdyb3VwcyI6WyJBcHBsaWNhdGlvblwvVXNlciBQb3J0YWwiLCJBcHBsaWNhdGlvblwvcGlja3VwLWRpc3BhdGNoIiwiSW50ZXJuYWxcL2V2ZXJ5b25lIiwiQXBwbGljYXRpb25cL3BpY2t1cC1tYW5hZ2VyIiwiYWRtaW4iLCJBcHBsaWNhdGlvblwvbXAtand0Il0sImV4cCI6MTU4NzQ2MjA1MSwiaWF0IjoxNTg3NDU4NDUxfQ.BT0lEaHYgulsxm0lDFyahuZqD2y_pZxPbeS2qKytIQy8ObOm0GlVwMmP2FHM4PgKqf3FaQAMcdx-MYWF4cfV3hf7D8iTz62IQaCBgPQ0SdkqiuhRgnKm5wRh1neKsOozmFKaizJtr6kX2NohUFmt6dyQgIenFLD4KGDBzfutBLyTOjfWcot8sT2P-cHQv1gvsVBZLD00QDQ612WjM70moqS6Vc7KSZ1pUd0K87VUwY8oAvNd4ZB2oX6oGG4krFPdKGhi570qeZEqvwXpxF5x0KzhKFoEjyhrux6Ot7MTX1llPgwvRRnebNemNGMyVcytDXHKNoZVTvFx47XU7C1Tow","token_type":"Bearer","expires_in":3600}
```

The decoded ID token is shown below. 

``` tab="Decoded ID token"
{
  "x5t": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
  "kid": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ",
  "alg": "RS256"
}
{
  "at_hash": "tHprFxQtkt1tRosDj3pQWw",
  "sub": "cameron",
  "aud": [
    "yqDQ2TSnK_nIeRmf0Q6iryULAOIa"
  ],
  "upn": "cameron",
  "azp": "yqDQ2TSnK_nIeRmf0Q6iryULAOIa",
  "amr": [
    "password"
  ],
  "iss": "https://localhost:9443/oauth2/token",
  "groups": [
    "Debtor",
    "Internal/everyone"
  ],
  "exp": 1525758418,
  "iat": 1525754818
}
```

As you can see in the decoded response, the `upn` and `groups` claims which map to the username and the role list respectively are added to the issued JWT token.

