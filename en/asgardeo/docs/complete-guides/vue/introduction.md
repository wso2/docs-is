---
template: templates/complete-guide.html
heading: Introduction
read_time: 2 mins
---
Vue.js is a progressive JavaScript framework designed for building modern single-page applications (SPAs). It enables developers to create dynamic user interfaces by breaking down complex UIs into reusable components. Unlike traditional UI technologies, Vue uses a virtual DOM to efficiently update only the necessary parts of the page without requiring a full re-render. This makes Vue a powerful choice for developing SPAs.

Implementing login functionality in your Vue app is essential for managing user access, personalizing user experiences, and securing the app. It enhances user experience, protects user data, boosts engagement, and ensures regulatory compliance.


## Learning objectives 

This guide will walk you through everything you need to know about securing Vue apps, including implementing user login in your Vue app, integrating it with an Identity Provider (IdP) to make the login process simple and secure, and general guidelines to protect your end users. It also covers how to make secure API calls to an OAuth2-protected API within your Vue app.

In this guide, you will:

* Register an application in {{product_name}}
* Create a Vue app
* Install Asgardeo Vue SDK
* Add login and logout to your app
* Display logged-in user details
* Secure routes within the app
* Access a protected API from your Vue app
* Manage tokens in your Vue app


!!! tip "Tip"
    
    This guide takes approximately 60 minutes to complete and covers everything required to add user login and secure your Vue apps. If you’re looking for a shorter guide, try the [Vue Quick Start guide](https://is.docs.wso2.com/en/latest/quick-starts/vue/){:target="_blank"}, which takes around 15 minutes to complete.


!!! tip "Tip"
    
    If you are already familiar with the concepts discussed in the guide, you can use the Asgardeo Vue template to bootstrap your application by running the following command.  

    ```bash
    npx tmplr --dir my-vite-vue-app asgardeo/asgardeo-vite-vue-template
    ```
    The Asgardeo Vue template generates a ready-made Vue sample app with pre-configured login and logout capabilities, helping you kick-start your project in just 2 minutes. 

    All you need is a `client_id`, which you can obtain by registering a **Single Page Application** in {{product_name}}.