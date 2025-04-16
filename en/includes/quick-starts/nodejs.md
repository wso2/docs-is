# Node.js Quickstart

Welcome to the Node.js Quickstart guide! In this document, you will learn to build a Node.js app, add user login and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application.**
- Select **Traditional Web Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL. (*Ensure that the protocol remains set to OpenID Connect (OIDC).)* 

!!! Example
    Name : {{ product }}-nodejs

    Authorized redirect URL: http://localhost:3000/oauth2/redirect, http://localhost:3000/

 

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:3000/oauth2/redirect` and http://localhost:3000 as the authorized redirect URL. The http://localhost:3000/ URL is used to redirect the user after logging out. 
  


Make a note of the following values from the **Protocol** tab of the registered application. You will need them during the **Step 4**

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **The name of your {{ product_name }} organization**


## Create a Node.js app 

Create your new Node.js app using npx `express-generator` command.

=== "npm"

    ```bash
    npx express-generator {{ product }}-nodejs --view=ejs

    cd {{ product }}-nodejs

    npm install

    npm start
    ```

=== "yarn"

    ```bash
    yarn dlx express-generator {{ product }}-nodejs --view=ejs

    cd {{ product }}-nodejs

    yarn install

    yarn start
    ```

=== "pnpm"

    ```bash
    pnpm dlx express-generator {{ product }}-nodejs --view=ejs

    cd {{ product }}-nodejs

    pnpm install

    pnpm start
    ```

Navigate to [http://localhost:3000](http://localhost:3000){:target="_blank"} and you should see the sample app working in the browser. 

## Install @asgardeo/passport-asgardeo

Passport Asgardeo strategy is a Passport strategy that allows you to authenticate  using {{product_name}}. To get started, simply add the Passport Asgardeo strategy to the project together with the other required dependencies. Make sure to stop the dev server started in the previous step. 

=== "npm"

    ```bash
    npm install passport express-session dotenv @asgardeo/passport-asgardeo 

    ``` 

=== "yarn"

    ```bash
    yarn add passport express-session dotenv @asgardeo/passport-asgardeo 

    ```

=== "pnpm"

    ```bash
    pnpm add passport express-session dotenv @asgardeo/passport-asgardeo 

    ```

## Configure Passport Asgardeo

Create `.env` environment properties file, and add the following  variables:

```bash
ASGARDEO_ORGANISATION=<YOUR_ORGANISATION_NAME>
ASGARDEO_CLIENT_ID=<YOUR_CLIENT_ID>
ASGARDEO_CLIENT_SECRET=<YOUR_CLIENT_SECRET>


```

!!! Important

    Replace below placeholders with your registered organization name in {{product_name}} and the generated`client-id` from the app you registered in {{product_name}}.

    - `<YOUR_CLIENT_ID>`
    - `<YOUR_CLIENT_SECRET>`
    - `<YOUR_ORGANISATION_NAME>`


Then, Add the following line to the start of the `app.js` file to load the environment variables from the `.env` file.

```javascript title="app.js"  hl_lines="1"
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
```


Next, create `routes/auth.js` file and add the following code to configure the app with the {{product_name}} configuration parameters. 


```javascript title="routes/auth.js" 

var passport = require("passport");
var AsgardeoStrategy = require("@asgardeo/passport-asgardeo");
const ASGARDEO_BASE_URL = "https://api.asgardeo.io/t/";

passport.use(
    new AsgardeoStrategy(
        {
            issuer:
                ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/token",
            authorizationURL:
                ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/authorize",
            tokenURL:
                ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/token",
            userInfoURL:
                ASGARDEO_BASE_URL + process.env.ASGARDEO_ORGANISATION + "/oauth2/userinfo",
            clientID:
                process.env.ASGARDEO_CLIENT_ID,
            clientSecret:
                process.env.ASGARDEO_CLIENT_SECRET,
            callbackURL:
                "/oauth2/redirect",
            scope:
                ["profile"],
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
            });
        }
    )
);

```

## Add login and logout link to your app

Modify the `views/index.ejs` file with the following code to show the login and logout buttons. 

```html title="views/index.ejs" hl_lines="10-22"

<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <% if (locals.user) { %>
      <div>
        <form action="/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </div>
    <% } else { %>
      <div>
        <form action="/login">
          <button type="submit">Login</button>
        </form>
      </div>
    <% } %>
  </body>
</html>

```

Next, modify the `routes/index.js` file to pass the user object to the view. 

```javascript title="routes/index.js" hl_lines="6"

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

module.exports = router;

```

Update the `routes/auth.js` file by adding following code at the end. This code creates two routes to handle login and request and response, and also configure Passport to manage the login session by adding serializeUser and deserializeUser functions. 

```javascript title="routes/auth.js" 

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user?.uiProfile?.id,
            username: user?.uiProfile?._json?.username,
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});



var express = require("express");
var qs = require("querystring");
var router = express.Router();

router.get("/login", passport.authenticate("asgardeo"));

router.get(
    "/oauth2/redirect",
    passport.authenticate("asgardeo", {
        successRedirect: "/",
        failureRedirect: "/",
    })
);

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        var params = {
            post_logout_redirect_uri: "http://localhost:3000/",
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

module.exports = router;

```


Finally, add these routes to our app by modifying the `app.js` file with the following highlighted code. This code defines a new auth router and add it to the app, and also configure session support for the app. 

```javascript title="app.js"  hl_lines="7 8 12 25-32 36"

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


Visit your app's homepage at [http://localhost:3000](http://localhost:3000){:target="_blank"} 

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Modify the code as below to see logged in user details.

```html title="views/index.ejs" hl_lines="11"

<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <% if (locals.user) { %>
      <p>Hello <%= user.username %></p>
      <div>
        <form action="/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </div>
    <% } else { %>
      <div>
        <form action="/login">
          <button type="submit">Login</button>
        </form>
      </div>
    <% } %>
  </body>
</html>

```

[//] STEPS_END
