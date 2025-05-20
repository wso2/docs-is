

In our app, routes define the paths within the application that users can navigate to, linking URLs to specific components. Securing routes is essential to protect sensitive data, prevent unauthorized access, and ensure that only authenticated users can access certain parts of the application. In this section, let’s look at how we can secure routes using {{product_name}} authentication.

You may have noticed that we have a /users route created by default from the Express generator (`users.js` file). Let’s log out from the application and try to access this route at [http://localhost:3000/users](http://localhost:3000/users). You will see that the route is accessible even when you are not logged in.

Let's assume that this route contains protected information that should only be accessible to authenticated users. To secure this route, we need to add a middleware function that checks if the user is authenticated before allowing access to the route.

To achieve this requirement easily, we can use the [connect-ensure-login](https://www.npmjs.com/package/connect-ensure-login) npm package. This package provides middleware that ensures a user is logged in before allowing access to a route and it integrates with Passport.js seamlessly.

First, install the package by running the following command:

```bash
npm install connect-ensure-login
```

Next, import the package in the `routes/users.js` file and modify the file as shown below:

```javascript hl_lines="2 5 7 8"
var express = require("express");
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
var router = express.Router();

var ensureLoggedIn = ensureLogIn();
/* GET users listing. */
router.get("/", ensureLoggedIn, function (req, res, next) {
  res.send("This is a protected resource");
});

module.exports = router;
```

Now when you try to access the `/users` route without logging in, you will be redirected to the login page. After logging in, you will be able to access the protected route at [http://localhost:3000/users](http://localhost:3000/users).

![Securing routes]({{base_path}}/assets/img/complete-guides/nodejs/image15.png){: width="800" style="display: block; margin: 0;"}

In this step, we looked into how to secure component routes within a Node.js app. Next, we will try to access a protected API from our Node.js app, which is a common requirement in many applications.