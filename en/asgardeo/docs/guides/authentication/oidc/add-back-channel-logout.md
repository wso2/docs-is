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
