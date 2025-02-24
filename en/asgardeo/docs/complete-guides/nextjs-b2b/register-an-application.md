---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First, unless you already have done that, you need to create an organization in {{product_name}} and register your application.

1. Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
2. Sign into {{product_name}} console and navigate to **Applications > New Application.**
3. Select **Traditional Web Application**

    ![Select Traditional Page Application]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image3.png){: width="700" style="display: block; margin: 0;"}  

4. Select OpenID Connect (OIDC) as the protocol and provide a suitable name and an authorized redirect URL

    !!! Example
        Name: Next App
        
        Authorized redirect URL: `http://localhost:3000/api/auth/callback/asgardeo`

    ![Register a new application]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image4.png){: width="700" style="display: block; margin: 0;"}

    !!! Info

        The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use `http://localhost:3000/api/auth/callback/asgardeo`, as the sample application will be accessible at this URL

5. Allow sharing the application with organizations and click "Create".

    !!! Note
        You can also do this from the “Advanced” tab of the created application.

    ![Allow sharing app]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image5.png){: width="700" style="display: block; margin: 0;"}

6. Once you create the application, you will be directed to the Quick Start tab of the created application which will guide you to integrate login to your application in several technologies like Next.js, Node.js and .NET.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them to configure  Asgardeo provider for Auth.js.

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **`Issuer`** from from the **Info** tab.
- **`Logout`** from from the **Info** tab.

## Allow required grant types

To ensure seamless authentication and authorization in your B2B application, Teamspace, you must allow the necessary OAuth2 grant types in {{product_name}}. These grant types allow your app to authenticate users, retrieve access tokens, and interact with {{product_name}}’s APIs securely.

### Required Grant Types for Your B2B App

Based on the features we are expecting to implement, the following grant types are enabled:

- Authorization Code Grant – Used for user authentication and obtaining access tokens interactively.
- Client Credentials Grant – Allows the app to make API calls on behalf of the organization (used for retrieving a root organization token).
- Organization Switch Grant – Enables switching between organizations in a B2B multi-tenanted setup.

### How to Enable Grant Types

1. Navigate to your application in the {{product_name}} console.
2. Click on "Protocols" tab
3. Allow the above grant types and update

![App Grants]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}  

!!! Info
    Read more on [OAuth2 grant types]({{base_path}}/references/grant-types/)


In this step, we have registered our Next.js app as an application in the {{product_name}} console, generated the required metadata and allowed the necessary grant types.
