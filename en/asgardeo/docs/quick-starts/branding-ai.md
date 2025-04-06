---
template: templates/quick-start.html
heading: Branding AI Quickstart
description: Welcome to the Quickstart Guide for <b>Branding AI</b>! In this guide, you’ll learn how to use Branding AI to effortlessly customize login UIs to align with your organization’s branding. 

what_you_will_learn:
  - Use Branding AI to adjust the color schemes to match your brand 
  - Use Branding AI to choose alternative fonts that reflect your brand
  - Use Branding AI to modify UI element styles to align with your brand
  

prerequisites:
  - About 15 minutes
  - <a href="{{ base_path }}/get-started/create-asgardeo-account/">Asgardeo account</a>


whats_next:
  - Try out <a href="{{ base_path }}/quick-starts/loginflow-ai/" target="_blank"> Login Flow AI Quickstart </a>
  - Read <a href="{{ base_path }}/guides/branding/branding-ai" target="_blank"> product documentation </a>
---


## Create and configure a sample app

You can either use the Asgardeo [Try-It]({{ base_path }}/get-started/try-it-application/){:target="_blank"} hosted app without setting up a local app or create and run a sample app locally using the Asgardeo React template. 




=== "Using Asgardeo Try-It hosted app"

    1. On the  {{product_name}} Console, navigate to **Home** and click **Try login with the Try It app**.
    2. A dialog box appears prompting you to create a user account. Create a user account or if you already have one, click Continue to proceed.

    !!! note "Note"
        {{product_name}} provides a hosted sample app called [Try-It]({{ base_path }}/get-started/try-it-application/){:target="_blank"} , which allows you to explore features like passwordless login, Multi-Factor Authentication (MFA), social logins, adaptive authentication, and user provisioning without the need to create or run a local app. Once you enable the {{product_name}} Try-It app, it will automatically register and configure an application in the {{product_name}} console, making it ready for you to use.

    

=== "Using  Asgardeo React template "

    - Sign into Asgardeo console and navigate to **Applications > New Application**.

    - Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

    !!! Example
        **name:** asgardeo-react
    
        **Authorized redirect URL:** http://localhost:5173

    -  Note down the following values from the Protocol tab of the registered application. You will need them to configure Asgardeo React SDK.
        - **`client-id`** from the **Protocol** tab.
        - The **name** of your Asgardeo organization


    - Use the Asgardeo React template to bootstrap your application by running the following command.  

      ```bash

      npx tmplr --dir my-vite-react-app asgardeo/asgardeo-vite-react-template

      ```
      The Asgardeo React template generates a ready-made React sample app with pre-configured login and logout capabilities, helping you kick-start your project in just 2 minutes. 


## **Try out Branding AI** 

1.  On the {{product_name}} Console, go to **Applications**, then go to **Branding** 

2.  Go to the **Style & Text** tab of the application and click the **Try Branding AI** button to open the Branding AI prompt. 

![Login Flow]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image8.png){: width="800" style="display: block; margin: 0;"}


First, let's try to rebrand our login UIs as per the branding of [https://choreo.dev/](https://choreo.dev/){:target="_blank"}.  


In the **Branding AI** prompt, enter the following URL. 

```html

https://choreo.dev

```

the **Branding AI** extracts branding information from [https://choreo.dev/](https://choreo.dev/){:target="_blank"} and apply to the login flow Uis such as login, SMS and Email OTP, TOTP and sign-up pages. 



Make sure to click **Save and Publish** save the generated branding design and apply it. 


![Branding]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image9.png){: width="800" style="display: block; margin: 0;"}


When you revisit the **Try It** application, you will notice that the login and user sign-up screens have been updated with [https://choreo.dev/](https://choreo.dev/){:target="_blank"} branding. Try entering your organization's website URL to see how accurately Branding AI can generate the branding for you.



![Branding options]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image10.png){: width="800" style="display: block; margin: 0;"}






