# Admin Advisory Banner

WSO2 Identity Server can be configured to display an advisory banner for admin login pages. Once enabled, a banner will be displayed on the login page of the Management Console login with the configured administrative message. The super tenant banner will be applied to all tenants.

By requiring a warning banner to be displayed before granting access to sensitive parts of the system, the application is helping to ensure that administrators are aware of the potential risks associated with accessing or administering certain parts of the system, and to provide them with a warning message that emphasizes the importance of taking appropriate precautions to protect the system and its data.

## Configuring the advisory banner

Follow the steps given below to configure the advisory banner using the Management Console.

1. Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using your administrator credentials. 
2. Go to **Configure** > **Admin Advisory** and check the **Enable Banner** checkbox.
3. Enter your administrative message in the **Banner Content**.
4. Click **Update** to save the changes.

![configuring-admin-advisory-banner]({{base_path}}/assets/img/deploy/configure-admin-banner.png) 

You have now configured the admin advisory banner successfully.

## Try it out

To check the banner, sign out of the Management Console. The configured message will be displayed in the login page.

![admin-banner-mgt-console-login]({{base_path}}/assets/img/deploy/admin-banner-mgt-console.png) 
