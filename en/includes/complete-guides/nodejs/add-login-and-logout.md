

## Modify Index page

Let's create a simple login page for our app.

```bash
touch views/login.ejs
```

Open `views/login.ejs` and add the following code:

```html
<!DOCTYPE html>
<html>

<head>
  <title>
    <%= title %>
  </title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>

<body>
  <div>
    <form action="/login">
      <button type="submit">Login with Asgardeo</button>
    </form>
  </div>
</body>

</html>
```

Next, we will modify the `routes/index.js` file to show the login page when the user is not authenticated.

```javascript hl_lines="6-10"
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Express" });
  } else {
    res.render("login", { title: "Express" });
  }
});

module.exports = router;
```

## Add routes

When the user clicks the "Login with Asgardeo" button, they will be redirected to our app's login page, which is hosted by {{product_name}}. Once on that page, the user will log in by providing their credentials. After they've logged in, the user will be redirected back to our app.

Open `routes/auth.js` and add the following code at the end of the file, which creates two routes. The first will redirect the user to the sigin page. The second will process the authentication result when the user is redirected back.

```javascript
var express = require("express");
var qs = require("querystring");
var router = express.Router();

router.get("/login", passport.authenticate("asgardeo"));

router.get(
  "/oauth2/redirect",
  passport.authenticate("asgardeo", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
```
Next, we need to add these routes to our app. Open `app.js` and modify the file as shown below to require the new auth router and add it to the app.

```javascript hl_lines="11 27"
require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

The routes have been added to the app. Next we need to maintain state when redirecting to {{product_name}}.

## Maintaining the session

When a user signs in to our app via our app's {{product_name}}-hosted sign in page, they are redirected to {{product_name}}. {{product_name}} takes care of authenticating the user and then redirects them back to our app.

For security, state needs to be maintained between these two redirects. Passport does this automatically, but the app first needs session support. Let's add that now.

Begin by installing the necessary dependencies:

```bash
npm install express-session
```

Open `app.js` and modify the file as shown below to add passport authentication with session support.

```javascript hl_lines="8 9 26-33"
require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require("passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require("./routes/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```



Next we need to configure Passport to manage the login session by adding serializeUser and deserializeUser functions. Open `routes/auth.js` and add the following code lines after the AsgardeoStrategy configuration.

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

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
```

Now, let's try signing in.

Start the server:

```bash
npm start
```

Open `http://localhost:3000` and click the "Login with Asgardeo" button. You will be redirected to the {{product_name}} login page. Enter the user credentials and click "Sign In". You will be redirected back to the index page.

![Login page]({{base_path}}/assets/img/complete-guides/nodejs/image10.png){: width="800" style="display: block; margin: 0;"}

## Log Out

Now that users can sign in to the application, they'll need a way to sign out.

Open `routes/auth.js` file and add the following route below the `/oauth2/redirect` route configuration:

```javascript
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    var params = {
      post_logout_redirect_uri: "http://localhost:3000",
      client_id: process.env.ASGARDEO_CLIENT_ID,
    };
    res.redirect(
      ASGARDEO_BASE_URL +
        process.env.ASGARDEO_ORGANISATION +
        "/oidc/logout?" +
        qs.stringify(params)
    );
  });
});
```

We need to modify the `views/index.ejs` file as shown and add a logout button.

```html hl_lines="17-21"
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
    <%= title %>
  </h1>
  <p>Welcome to <%= title %>
  </p>
  <div>
    <form action="/logout" method="post">
      <button type="submit">Log Out</button>
    </form>
  </div>
</body>

</html>
```

![Logout page]({{base_path}}/assets/img/complete-guides/nodejs/image11.png){: width="800" style="display: block; margin: 0;"}

Return to the app, where you should already be signed in, and click "Log out."

We've now got a working app where users can sign in and sign out!

