
At this point, we’ve successfully implemented login and logout capabilities using the Passport {{product_name}} strategy. The next step is to explore how to access and display logged-in user details within the app. 

If you observe the `routes/auth.js` file, you can see that the {{product_name}} strategy loads the basic user attribute details in the id token, and these attributes are accessible through the `uiProfile` object in the `verify` callback.

```javascript
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
  });
}
```

In the `serializeUser` method, we are serializing the user information to the session. This information can be accessed from the `req.user` object in the routes.

```javascript
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user?.uiProfile?.id,
      username: user?.uiProfile?._json?.username,
      givenName: user?.uiProfile?.name?.givenName,
      familyName: user?.uiProfile?.name?.familyName,
    });
  });
});
```

To return the user object to the index view, let's modify the `routes/index.js` file as shown below.

```javascript hl_lines="7"
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Express", user: req.user });
  } else {
    res.render("login", { title: "Express" });
  }
});

module.exports = router;
```

Now, let's modify the `views/index.ejs` file to display the user details.

```html hl_lines="12-28"
<!DOCTYPE html>
<html>

<head>
  <title>
    <%= title %>
  </title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
  <h1>
    User Profile
  </h1>
  <div>
    <p>
      <strong>Username:</strong>
      <%= user.username%>
    </p>
    <p>
      <strong>First Name:</strong>
      <%= user.givenName%>
    </p>
    <p>
      <strong>Last Name:</strong>
      <%= user.familyName%>
    </p>
  </div>
  <div>
    <form action="/logout" method="post">
      <button type="submit">Log Out</button>
    </form>
  </div>
</body>

</html>
```

Now, when you log in to the application, you will see that the user's first name and last name are not displayed even though the username is displayed. This is because the {{product_name}} strategy does not return the first name and last name in the id token by default. 

![Display user details]({{base_path}}/assets/img/complete-guides/nodejs/image12.png){: width="800" style="display: block; margin: 0;"}

To get the first name and last name, we need to configure the {{product_name}} application to include these attributes in the id token when we request the profile scope.

Let's login to the {{product_name}} console and go to the application settings of the application you created. Then go to the User Attributes tab and update the application after checking the **First Name (given_name)** and **Last Name (family_name)** under the **Profile** scope. This will tell {{product_name}} to send the checked attributes under the profile OIDC scope.

![Configure user attributes]({{base_path}}/assets/img/complete-guides/nodejs/image13.png){: width="800" style="display: block; margin: 0;"}

Now, when you log in to the application again, you will see that the first name and last name are displayed along with the username.

![Display user details]({{base_path}}/assets/img/complete-guides/nodejs/image14.png){: width="800" style="display: block; margin: 0;"}

In the next section, we will explore how to secure routes in the application using {{product_name}} authentication.
