---
template: templates/complete-guide.html
heading: Introduction
read_time: 2 mins
---
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
    
    If you want to quickly build a React app and user login, try the [React Quick Start guide.](https://is.docs.wso2.com/en/latest/quick-starts/react/){:target="_blank"} It takes around 15 minutes.

!!! note

    Asgardeo-branded SDKs can be used to build apps to work with the all [WSO2 identity suite](https://wso2.com/identity-and-access-management/){:target="_blank"} of products that includes [WSO2 Identity Server (WSO2 IS)](https://wso2.com/identity-server/){:target="_blank"}, WSO2 [Private Identity Cloud (WSO2 PIC)](https://wso2.com/private-identity-cloud/){:target="_blank"} and [Asgardeo](https://wso2.com/asgardeo/){:target="_blank"}. 


