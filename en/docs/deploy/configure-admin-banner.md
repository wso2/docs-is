# Admin Advisory Banner

WSO2 IS can be configured to display an advisory banner for admin login pages. Once enabled, a banner will be displayed in the Management Console login and Console Application login pages with the configured administrative message. The super tenant banner will be applicable for all tenants.

By requiring a warning banner to be displayed before granting access to sensitive parts of the system, the application is helping to ensure that administrators are aware of the potential risks associated with accessing or administering certain parts of the system, and to provide them with a warning message that emphasizes the importance of taking appropriate precautions to protect the system and its data.

## Configuring the advisory banner

Follow the steps given below to configure the advisory banner using the Management Console.

1. Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials. 
2. Navigate to **Configure** > **Admin Advisory**.
3. Check the **Enable Banner** checkbox
4. Enter the administrative message in the **Banner Content** section.
5. Click **Update** to save the changes.

![configuring-admin-advisory-banner]({{base_path}}/assets/img/deploy/configure-admin-banner.png) 

You have now configured the admin advisory banner successfully.

## Try it out

To check the banner, sign out of the Management Console. The configured message will be displayed in the login page.

![admin-banner-mgt-console-login]({{base_path}}/assets/img/deploy/admin-banner-mgt-console.png) 

Access the Console Application (`https://<IS_HOST>:<PORT>/console`) to check the banner in its login page.

![admin-banner-console-app-login]({{base_path}}/assets/img/deploy/admin-banner-console-app.png)
