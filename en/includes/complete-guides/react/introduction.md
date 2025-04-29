
React is a widely used JavaScript library designed for creating dynamic single-page apps (SPAs). It enables developers to build responsive interfaces by breaking down complex UIs into reusable components. Unlike traditional UI technologies, React updates specific parts of the page without re-rendering the entire page, thanks to its virtual DOM. This capability makes React popular for developing SPAs.

Implementing login functionality in your React app is essential for managing user access, personalizing user experiences, and securing the app. It enhances user experience, protects user data, boosts engagement, and helps ensure regulatory compliance.


## Learning objectives 

This guide will walk you through everything you need to know about securing React apps, including implementing user login in your React app, integrating it with an Identity Provider (IdP) to make the login process simple and secure, and general guidelines to protect your end users. It also covers how to make secure API calls to an OAuth2-protected API within your React app.

In this guide, you will:

* Register an application in {{product_name}}
* Create a React app
* Install Asgardeo React SDK
* Add login and logout  to your app
* Display logged in user detail
* Securing routes within the app
* Accessing protected API from your React app
* Managing tokens in your React app


!!! tip "Tip"
    
    This guide takes approximately 60 minutes to complete and covers everything required to add user login and secure your React apps. If you’re looking for a shorter guide, try the [React Quick Start guide](https://is.docs.wso2.com/en/latest/quick-starts/react/){:target="_blank"}, which takes around 15 minutes to complete.


!!! tip "Tip"
    
    If you are already familiar with the concepts discussed in the guide, you can use the Asgardeo React template to bootstrap your application by running the following command.  

    ```bash

    npx tmplr --dir my-vite-react-app asgardeo/asgardeo-vite-react-template

    ```
    The Asgardeo React template generates a ready-made React sample app with pre-configured login and logout capabilities, helping you kick-start your project in just 2 minutes. 

    All you need is a `client_id`, which you can obtain by registering a **Single Page Application** in {{product_name}}.
