# Add login

As an application developer, you need to pay special attention to the following when adding login for your application:

- **Enhanced User Experience** -  A great user experience sets your application apart from the competition and helps you meet your business goals. User logins enable you to provide personalized and engaging experiences that your users will appreciate. By enabling users to customize features to their preferences, you can offer benefits like personalized suggestions, product recommendations, reminders of past or restocked items, wishlists, and targeted discount notifications based on their preferences. You can also enhance your business efficiency by offering self-service capabilities.    

- **Control user access** - You need to ensure that business data and features of your application are accessible only to the intended users, and that each user’s access is limited to their intended access level. User logins allow you to uniquely identify and verify each user, helping you make decisions about their access to data and features. User logins play a key role in protecting data, maintaining secure access, and safeguarding user privacy.  

- **Privacy and compliance** - With the rise of global privacy regulations and industry standards, it's important to ensure your application complies with privacy laws and compliance requirements. User login ensures that only authorized users can access personal data, while allowing users to review and update their information such as consent preferences. Beyond meeting regulations, this is a valuable opportunity to show your commitment to safeguarding the privacy and data of your loyal customers, building trust and enhancing your reputation.

In addition to implementing user login for your applications, you also need to consider adding user account management capabilities for your application. With the growing number of applications users have to interact with on a daily basis, users often forget their usernames, passwords, or both. To address this, you should have account recovery mechanisms to help users regain access to their accounts.

You also need to consider enabling sign-up and sign-in options through popular social platforms like Google, Facebook, or Microsoft, which requires you to integrate user provisioning and federated login capabilities into your application. For enhanced security, it's a best practice to implement multi-factor authentication (MFA). MFA options can range from simple methods like SMS or email to more complex solutions such as biometrics. As passwords become less prevalent, it’s the right time for you to explore passwordless authentication methods, such as Passkeys or Magic Links, to streamline the user experience.


## Add user login 

Add user login to your application by simply integrating the right {{product_name}} SDK as per your application development technology. {{product_name}} SDKs provide you with the necessary components and utilities to easily add user login into your application, manage tokens and maintain authentication state. 

Behind the scenes, {{product_name}} SDKs use the OpenID Connect protocol to handle login requests with {{product_name}}. When a user attempts to log in, they are redirected to {{product_name}} for login. Once the user is authenticated, the application receives an OpenID Connect ID token, which includes the user's information and metadata. {{product_name}} SDKs simplify the complexities of OpenID request-response flows and token processing, and enable security best practices such as token validation and the PKCE extension by default.

![Asgardeo SDK]({{base_path}}/assets/img/concepts/asgardeo-sdk.png){: width="700"}

Explore all the supported application development technologies, SDKs and quick start guides in the [documentation]({{base_path}}/integrations/).

!!! tip
    
    - By default, {{product_name}} SDKs redirect users to {{product_name}} using HTTP redirects. However, if you prefer to create your own login screen within the application, you can still integrate {{product_name}} for user login using the {{product_name}} Login API.

    - In addition to OpenID Connect, you can also use SAML 2.0 to integrate your application with {{product_name}} for user login.


{{product_name}} automatically configures a default login flow for you to get started. You can design your desired login flow by adding social providers or MFA options using {{product_name}}'s visual login flow designer, where you can drag and drop the required elements.

![Add login flow]({{base_path}}/assets/img/concepts/login-flow.png)

Alternatively, you can use the Login Flow AI feature to generate the desired login flow based on your plain text instructions.

![Add login flow AI]({{base_path}}/assets/img/concepts/login-flow-ai.png)


## On-board users 

Allow users to self-onboard to your application, either directly or via social and partner platforms. You can utilize customizable user onboarding portal components from {{product_name}}, or use {{product_name}}'s user onboarding APIs. Additionally, connect existing on-premise AD and LDAP user directories using the remote user store agent.


![Onboard users]({{base_path}}/assets/img/concepts/asgardeo-user-stores.png)

{{product_name}} offers a user self-onboarding portal component that can be seamlessly integrated with your applications and allows you to customize the onboarding experience and branding. For greater flexibility and control, you can use the {{product_name}} user onboarding API to integrate with your application's specific onboarding workflows.  


## Add self-care account management features  

Let your users self-manage their profiles, protect their accounts, and handle recovery on their own. {{product_name}} offers all the required self-management features for your application out-of-the-box. Your application can be integrated with {{product_name}} user self-care portal components with your own branding. Alternatively, you can integrate {{product_name}}’s self-management capabilities using the self-care user API to offer app-native experience.  

Add self-manage features for your application users to: 

- update their user profiles
- update their passwords 
- recover forgotten password 
- login with multiple login identifies 
- associate social accounts 
- enable MFA 
- enroll passkeys 
- review consents 
- export their user profile 


Protect your application, data and users by enabling security controllers offered by {{product_name}}:

- conditionally enforcing MFA
- enabling password policies 
- password expiration policies 
- preventing previously used passwords 
- configuring login attempts retry 
- automatic account locking policy 
- Protect the application from bots   
- Login and security event insights 














