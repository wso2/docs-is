# Implement back-channel logout

Back-channel logout allows users to be logged out from a client application through direct communication of logout requests between the client application and the authorization server.

## How it works

The underlying message flow of OpenID Connect (OIDC) back-channel logout is as follows:

1. A user logout is initiated by either the client application or the authorization server.
2. The authorization server identifies all client applications associated with the user's session.
3. The authorization server generates a logout token, a special JWT containing specific claims, and sends it with a logout request to the logout endpoints of the identified client applications.
4. Upon receiving the logout token, each client application validates it and then invalidates the corresponding user session.

## Configure back-channel logout

1. On the Asgardeo Console, go to **Applications** and select your OIDC application.

2. Go to the **Protocol** tab and scroll down to **Logout URLs**. Enter the the **Back channel logout URL**.

    ![Enable login attempts security]({{base_path}}/assets/img/guides/authentication/add-back-channel-logout.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update** to save your configurations.

## Validate the OIDC back-channel logout token

The following is an example OIDC back-channel logout token.

``` json
{
"iss": "https://api.asgardeo.io/t/<org_name>/oauth2/token",
"sub": "aa21e449-****-****-****-****a6a3961f",
"aud": "w_Hwp05dF****_****9SNwpflAa",
"iat": 1609911868,
"exp": 1609911988,
"jti": "16159e3e-****-****-****-b0782ab33d58",
"sid": "15043ffc-****-****-****-9b107f7da38c",
"events": {
   "http://schemas.openid.net/event/backchannel-logout": {}
   }
}
```

Logout token validation is done according to the [OIDC back-channel logout specification](https://openid.net/specs/openid-connect-backchannel-1_0.html#Validation) for the token signature and the `iss`, `aud`, `iat`, `sub`, `sid`, `events`, and `nonce` claims.
