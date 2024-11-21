---
template: templates/complete-guide.html
heading: Introduction
read_time: 2 mins
---

Node.js is a popular JavaScript runtime environment that allows developers to build scalable and high-performance applications. It is widely used for building server-side applications, command-line tools, and desktop applications. Node.js is built on the V8 JavaScript engine, which is the same engine that powers Google Chrome. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

Implementing login functionality in your Node.js app is essential for managing user access, personalizing user experiences, and securing the app. It enhances user experience, protects user data, boosts engagement, and helps ensure regulatory compliance.


## Learning objectives 

This guide will walk you through everything you need to know about securing Node.js apps, including implementing user login in your Node.js app, integrating it with an Identity Provider (IdP) to make the login process simple and secure, and general guidelines to protect your end users. It also covers how to make secure API calls to an OAuth2-protected API within your Node.js app.

In this guide, you will:

* Register an application in {{product_name}}
* Create a Node.js app from the template
* Install passport.js and other dependencies
* Add login and logout to your app
* Display logged in user detail
* Securing routes within the app
* Accessing protected API from your Node.js app
* Managing tokens in your Node.js app


!!! tip "Tip"
    
    This guide takes approximately 60 minutes to complete and covers everything required to add user login and secure your Node.js apps. If you’re looking for a shorter guide, try the [Node.js Quick Start guide](https://is.docs.wso2.com/en/latest/quick-starts/Node.js/){:target="_blank"}, which takes around 15 minutes to complete.


!!! tip "Tip"
    
    If you are already familiar with the concepts discussed in the guide, you can clone the sample Node.js application configured with Asgardeo from the [repository](https://github.com/dinzie95/passport-asgardeo-tutorial). All you need to do is registering a **Single Page Application** in {{product_name}} and updating the environment variables in the `.env` file as explained in the **README.md** file.