

In this section, we will focus on how to call a secure API from your Node.js app using the other token—the access token.

For simplicity, let's assume that the APIs we’re calling are secured by the same Identity Provider (IdP) and use the same issuer— in this case, the same {{product_name}} organization. This is typical when Node.js apps are interacting with internal APIs within the same organization.

!!! tip "Tip"

    If your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide.

In the following example we'll see how to call a protected API endpoint, such as [scim2/Me](https://wso2.com/asgardeo/docs/apis/scim2-me/) (to get the user profile details after signing in). In this case, the SCIM 2 endpoint is secured by the same {{product_name}} organization. {{product_name}} provides a SCIM 2 API for managing users within your organization. While user management with SCIM 2 is a topic for a different guide, we will use the API as part of our current guide.

If you observe the `routes/auth.js` file, you can see that the {{product_name}} strategy loads the access token in the `accessToken` parameter of the `verify` callback. This access token can be used to call the protected API.

Let's return the access token from the callback and serialize it to the session. 

You will notice that the {{product_name}} documentation lists the scopes required to access the SCIM 2 API. In this case, the `internal_login` scope is required to access the `/scim2/Me` endpoint.

We will add the `internal_login` scope as well to the `scope` parameter in the {{product_name}} strategy configuration.

```javascript hl_lines="23 38 51"
var passport = require("passport");
var AsgardeoStrategy = require("@asgardeo/passport-asgardeo");
const ASGARDEO_BASE_URL = "https://api.asgardeo.io/t/";

passport.use(
  new AsgardeoStrategy(
    {
      issuer:
        ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/token",
      authorizationURL:
        ASGARDEO_BASE_URL +
        process.env.ASGARDEO_ORGANISATION +
        "/oauth2/authorize",
      tokenURL:
        ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/token",
      userInfoURL:
        ASGARDEO_BASE_URL +
        process.env.ASGARDEO_ORGANISATION +
        "/oauth2/userinfo",
      clientID: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect",
      scope: ["profile internal_login"],
    },
    function verify(
      issuer,
      uiProfile,
      idProfile,
      context,
      idToken,
      accessToken,
      refreshToken,
      params,
      verified
    ) {
      return verified(null, {
        uiProfile: uiProfile,
        accessToken: accessToken,
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user?.uiProfile?.id,
      username: user?.uiProfile?._json?.username,
      givenName: user?.uiProfile?.name?.givenName,
      familyName: user?.uiProfile?.name?.familyName,
      accessToken: user?.accessToken,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
...
```

Now we can use the access token to call the protected API. Let's modify the `routes/users.js` to try out the SCIM 2 API call.

```javascript hl_lines="4 8-35"
var express = require("express");
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var router = express.Router();
const ASGARDEO_BASE_URL = "https://api.asgardeo.io/t/";

var ensureLoggedIn = ensureLogIn();
/* GET users listing. */
router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    console.log("Calling scim2/Me endpoint");
    const response = await fetch(
      ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/scim2/Me",
      {
        method: "GET",
        headers: {
          Accept: "application/scim+json",
          "Content-Type": "application/scim+json",
          Authorization: `Bearer ${req?.user?.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Response: " + JSON.stringify(await response.json(), null, 2)
      );
    }

    console.log(
      "Protected data fetched. Response: " +
        JSON.stringify(await response.json(), null, 2)
    );
  } catch (error) {
    console.error("Failed to fetch protected data: ", error);
  }

  res.send("This is a protected resource");
});

module.exports = router;
```

When you login to the application and navigate to the `/users` route, you will see that the SCIM 2 API is called and the protected data is fetched successfully. The response will be logged in the terminal.

![Accessing protected API]({{base_path}}/assets/img/complete-guides/nodejs/image16.png){: width="800" style="display: block; margin: 0;"}

In this step, we have successfully called a protected API from our Node.js app using the access token. This is a common requirement in many applications. Next you can look into additional features that {{product_name}} offers to make the authentication flow more diverse and secure.