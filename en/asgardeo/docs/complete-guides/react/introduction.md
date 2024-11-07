---
template: templates/complete-guide.html
heading: Introduction
read_time: 2 mins
---

## Why do you need user login 

React is a widely used JavaScript library designed for creating dynamic single-page applications (SPAs). It enables developers to build responsive interfaces by breaking down complex UIs into reusable components. Unlike traditional UI technologies, React updates specific parts of the page without re-rendering the entire page, thanks to its virtual DOM. This capability makes React popular for developing SPAs.

Implementing login functionality in your React app is essential for managing user access, personalizing user experiences, and securing the app. It enhances user experience, protects user data, boosts engagement, and helps ensure regulatory compliance.

![Should I worry about adding user login?]({{base_path}}/complete-guides/react/assets/img/image4.png){: width="600" style="display: block; margin: 0;"}


## D.I.Y or use an Identity Provider (IdP) 

It’s perfectly okay to implement login for your React app by yourself. As a starting step, you may add a login page and store usernames and passwords in a database . However, this approach will not be scalable in the long run because:

1. User login becomes complex over time with the need for features like multi-factor authentication (MFA), adaptive authentication, passwordless login, social login, and Single Sign-On (SSO).
2. Account management becomes complex with requirements like password policies, password resets, forgotten usernames, and onboarding from social platforms.

![How should I add user login?]({{base_path}}/complete-guides/react/assets/img/image3.png){: width="600" style="display: block; margin: 0;"}

Fortunately, there are production-grade authentication providers and login SDKs available to simplify these tasks for you. Integrating your app with an identity provider simplifies user login and ensures secure access to resources, offloading complex tasks like credential management and session handling. In this guide, you'll be using Asgardeo as the IdP. If you don’t have Asgardeo you can instantly sign-up for a free account from [here]. Asgardeo offers a generous free tire account that is more than enough during the app development phase.   

## Build secure apps using SDKs 

If you are going down the path of integrating with an Identity Provider (IdP), again you have two options:

1. **Do it yourself (D.I.Y):** You can implement OIDC request-response flows and token processing yourself using a combination of React features and JavaScript. This approach gives you full control over the authentication process but requires a deeper understanding of OIDC protocols and a significant investment of time to ensure secure and reliable implementation.
2. **Using a React SDK:** Alternatively, you can integrate a production-ready React SDK into your app. This approach simplifies the implementation of login by providing pre-built methods for handling sign-ins, token management, and session control. The SDK manages complex and sensitive processes like token validation and renewal, enhancing security while reducing development time. 

![How should integrate wiuth an IdP?]({{base_path}}/complete-guides/react/assets/img/image2.png){: width="600" style="display: block; margin: 0;"}

This guide will walk you through everything you need to know about securing React applications, including implementing user login in your React app, integrating it with an Identity Provider (IdP) to make the login process simple and secure, and general guidelines to protect your end users. 

Here is the order you are going to follow throughout this guide:

* Register an application in Asgardeo/IS
* Create a React application
* Install Asgardeo React SDK
* Add login and logout  to your app
* Display logged in user detail
* Securing routes within the app
* Accessing protected API from your React app
* Token management in React app
