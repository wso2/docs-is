---
template: templates/quick-start.html
heading: LoginFlow AI
description: Welcome to the Quickstart Guide for <b>LoginFlow AI</b>! In this guide, you’ll learn how to use Asgardeo LoginFlow AI to generate login flows for your applications, including passwordless login, Multi-Factor Authentication (MFA), social logins, and adaptive authentication logic that’s automatically generated. 

what_you_will_learn:
  - Use Login Flow AI to generate simple login 
  - Use Login Flow AI to generate MFA login 
  - Use Login Flow AI to generate Passwordless login 
  - Use Login Flow AI to generate risk-based adaptive login 
prerequisites:
  - About 15 minutes
  - <a href="{{ base_path }}/get-started/create-asgardeo-account/">Asgardeo account</a>


whats_next:
  - Try out <a href="{{ base_path }}/quick-starts/branding-ai/" target="_blank"> Branding AI Quickstart </a>
  - Read <a href="{{ base_path }}/guides/authentication/login-flow-ai/" target="_blank"> product documentation </a>
  - Add <a href="{{ base_path }}/guides/authentication/mfa/" target="_blank"> MFA login </a>
  - Add <a href="{{ base_path }}/guides/authentication/passwordless-login/" target="_blank"> Passwordles login </a>
  - Add <a href="{{ base_path }}/guides/authentication/conditional-auth/" target="_blank"> Adaptive Authentication</a>
---
## Configure Connections in {{ product_name }}

MFA, passwordless and social providers are configured in {{product_name}} as **connections**. To start, set up the following **connections** in the {{product_name}} console. 

- To configure **username and password** login, no additional steps are required. {{product_name}} is pre-configured to use **username and password** as the default login option for your application. 

- {{product_name}} pre-configured with **Magic Link** and **Email OTP** as connections, so you can follow this guide without needing to modify the default settings. 

- Configure **Github** as a **social login provider** by creating a connection in {{product_name}} console.  
    1. Register a Github OAuth App or a GitHub App by following the [***Register Asgardeo on Github*** step in this guide]({{ base_path }}/guides/authentication/social-login/add-github-login/#register-asgardeo-on-github){:target="_blank"}. Once the Github app is registered you need to copy **`Client ID`** and **`Client secret`** for the next step. 
    
    2. Register Github connection in  {{product_name}} console by following the [***Register the Github IdP*** step in this guide]({{ base_path }}/guides/authentication/social-login/add-github-login/#register-the-github-idp){:target="_blank"}. 

## Create and configure a sample app

You can either use the Asgardeo [Try-It]({{ base_path }}/get-started/try-it-application/){:target="_blank"} hosted app without setting up a local app or create & run a sample app locally using the Asgardeo React template. 




=== "Using Asgardeo Try-It hosted app"

    1. On the  {{product_name}} Console, go to **Home** and click **Try login with the Try It app**.
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

## Open the  **Login Flow AI** prompt 

1.  On the {{product_name}} Console, go to **Applications**, and select the **Try It** application *(or select Asgardeo-react app in case if you have created and running an app locally in the previous step)*.

2.  Go to the **Login Flow** tab of the application and click the **Try Login Flow AI** button to open the Login Flow AI prompt. 

![Login Flow]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image1.png){: width="800" style="display: block; margin: 0;"}


## **Try out Login Flow AI** - Password or MagicLink 

Enter the following given natural language instruction and click the run button. 

```text 

Password or MagicLink 

```

The following login flow with username & password and Magic Link should be generated in the Login Flow designer. 

![username & password and Magic Link]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image2.png){: width="800" style="display: block; margin: 0;"}


Click the **Update** button to save the above login flow configuration. 


Next, click **Try Login** button in the top right corner of your screen. This will open the Try-It application in a new tab. 


Now you can try logging to the **Try It** application using either username & password or Magic Link.   

![username & password and Magic Link login]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image3.png){: width="800" style="display: block; margin: 0;"}


!!! Tip

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features. Also, make sure you have entered a valid email address in the user profile of the test user to the receive Magic Link login code. 


## **Try out Login Flow AI** - Password or Github 

Enter the following given natural language instruction and click the run button. 

```text 

Password or Github 

```

The following login flow with username & password and Github should be generated in the Login Flow designer. 

![username & password and Github]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image4.png){: width="800" style="display: block; margin: 0;"}


Click the **Update** button to save the above login flow configuration. 

Next, click the **Try Login** button in the top right corner of your screen. This is open the Try-It application in a new tab. 


Now you can try logging to the **Try It** application using either username & password or Github.   

![username & password and Github login]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image5.png){: width="800" style="display: block; margin: 0;"}

!!! Important

    When testing with a GitHub user, ensure that the **public email** setting in the **public GitHub profile** is configured to return an email address. For guidance, refer to this [GitHub guide](https://docs.github.com/en/rest/users/emails?apiVersion=2022-11-28#list-email-addresses-for-the-authenticated-user){:target="_blank"} 



!!! Tip

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features. Also, make sure you have a valid Github account to login using Github. 


## **Try out Login Flow AI** - Password or Github with Email OTP 

Enter the following given natural language instruction and click the run button. 

```text 

Password or Github then Email OTP 

```

The following login flow with username & password and Github should be generated in the Login Flow designer. 

![username & password and Github]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image4.png){: width="800" style="display: block; margin: 0;"}


Click the **Update** button to save the above login flow configuration. 

Next, click the **Try Login** button in the top right corner of your screen. This is open the Try-It application in a new tab. 


First the **Try It** application prompt you to login using either username & password or Github.   

![username & password and Github login]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image5.png){: width="800" style="display: block; margin: 0;"}

If that successful, the application will ask you to enter the Email OTP that has sent to the email address of the current user. 

![Email OTP]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image6.png){: width="800" style="display: block; margin: 0;"}

!!! Tip

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features. Also, make sure you have entered a valid email address in the user profile of the test user to receive the Magic Link login code.  TODO - Github


<!-- This step is commented due to a product issue -->
<!-- ## **Try out Login Flow AI** - Password or Github with conditional Email OTP 

Enter the following given natural language instruction and click the run button. 

```text 

Password or Github then Email OTP if the user has manager role

```

You should see the same login flow design as in the previous scenario. Additionally, Login Flow AI will automatically generate adaptive authentication logic for you this time. This logic makes the Email OTP prompt for two-factor authentication (2FA) conditional based on the user's role. If the logged-in user has the **manager** role, they will be prompted to provide an Email OTP. Otherwise, the user can log in using either their username & password or GitHub credentials only. 

![adaptive authentication logic]({{base_path}}/quick-starts/assets/login-and-branding-ai/img/image7.png){: width="800" style="display: block; margin: 0;"}


Click the **Update** button to save the above login flow configuration. 


Next, click the **Try Login** button in the top right corner of your screen. This is open the Try-It application in a new tab. 


First the **Try It** application prompt you to login using either username & password or Github.   


If successful, the application won’t prompt you for the Email OTP. Instead, you can simply log in using either your username & password or GitHub.

 
Next, Let's add our test user to the **manager role**. 

1. On the Asgardeo Console, go to **User Management > Roles**.
2. Click **New Role** > button. 
3. In the New Role creation wizard, enter *manager* as the **Role Name** and select **Organization** as the role **audience**, then click next. 
4. Skip the Permission Selection screen by clicking next. 
5. Click finish button. 
6. Go to the **Users** tab of the manager role you just created and click the ** Assign Users" button. 
7. Select your test user from the drop-down list and click **Update** button to complete the role assignment. 

 


!!! Tip

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features. Also, make sure you have entered a valid email address in the user profile of the test user to receive the Magic Link login code.  TODO - Github -->








