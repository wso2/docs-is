---
template: templates/complete-guide.html
heading: Register an application in Asgardeo
read_time: 2 min
---

First unless you already have done that, you need to create an organization in {{product_name}} and register your application as a single page application.

* Sign up for a [free {{product_name}} account](https://wso2.com/asgardeo/docs/get-started/create-asgardeo-account/){:target="_blank"}
* Sign into {{product_name}} console and navigate to **Applications > New Application.**
* Select **Traditional Web Application** (*Make sure that the protocol remains set to OpenID Connect (OIDC)*)

![Select Traditional Page Application]({{base_path}}/complete-guides/nextjs/assets/img/image1.png){: width="600" style="display: block; margin: 0;"}  
  
Next, complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    name: asgardeo-nextjs
    
    Authorized redirect URL: http://localhost:3000/api/auth/callback/asgardeo

![Register a new application]({{base_path}}/complete-guides/nextjs/assets/img/image2.png){: width="600" style="display: block; margin: 0;"}

!!! Info

    The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use http://localhost:3000/api/auth/callback/asgardeo, as the sample application will be accessible at this URL

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them to configure  Asgardeo provider for Auth.js.

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **`issuer`** from from the **Info** tab.
    
In this step, we have ve registered our Next.js app as an application in the {{product_name}} console and generated the required metadata. Next, we will create a Next.js app.
