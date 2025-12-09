
## Persist user sessions

For improved user experience, let's persist user sessions in our app using a SQLite in-memory database.

Begin by installing the necessary dependency:

```bash
npm install connect-sqlite3
```

Open `app.js` and modify the file as shown below to add session persistence.

```javascript hl_lines="10 32"
require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require("passport");
var SQLiteStore = require("connect-sqlite3")(session);

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
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
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

Run the following command to create the SQLite database location:

```bash
mkdir -p ./var/db
```

Now, when the user logs in, the user session will be stored in the SQLite database.

We've now got session persistence set up in our app.