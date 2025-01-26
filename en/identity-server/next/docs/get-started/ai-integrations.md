# Try out  our AI features

The following guide explains how you can quickly test AI features provided by Identity Server.
To try out the AI features, you need to create an account in the WSO2 AI Subscription portal. Below are the steps to create an account and try out the AI features.

## Step 1 - Sign up for the AI Subscription portal

1. Navigate to the AI Subscription Portal using the following URL: [https://ai-subscriptions.wso2.com](https://ai-subscriptions.wso2.com/)
2. Register for an Account.
![WSO2 AI subscription portal landing page]({{base_path}}/assets/img/get-started/ai-subscription-portal-landing-page.png)

3. Click Register. 
4. Enter a valid email address and click Register. 
5. Check your email inbox and click Complete Account Creation. 
6. Provide your organization name (make a note of this, as it will be required for every login) and create a secure password.
7. Once you have completed the registration, you will be directed to the AI Subscription portal. 
8. Click Sign In and enter your organization name. 
9. Click Sign In and enter your organization name. 
10. Enter your email address and password.

## Step 2 - Create a subscription key

1. Once you have signed in to the subscription portal, click on the **New Subscription** button.
   ![WSO2 AI subscription portal homepage]({{base_path}}/assets/img/get-started/ai-subscription-portal-home-page.png)
2. Enter a name for the subscription key and select **wso2is** as the product. 
3. Click **Create** to create the subscription key.
   ![WSO2 AI subscription portal subscription creation]({{base_path}}/assets/img/get-started/ai-subscription-portal-create-subscription.png)
4. Once the subscription key is created, you can copy the subscription key and use it to configure the AI features in Identity Server.
   ![WSO2 AI subscription creation completed]({{base_path}}/assets/img/get-started/ai-subscription-portal-subscription-completed.png)

??? Warning
    Users can revoke and regenerate keys for any subscription, as well as delete subscriptions. Please perform these actions with caution, as they will immediately invalidate any existing keys in use.

## Step 3 - Configure the AI Key in Identity Server
The following configurations need to be done in the Identity Server to enable AI features.

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
2. Add the following configurations to the file.
```toml
[ai_services]
key="<AI_SUBSCRIPTION_KEY>"
```
3. Replace `<AI_SUBSCRIPTION_KEY>` with the subscription key you created in the AI Subscription portal.
4. Save the file and restart the Identity Server.

??? Warning
    All data in the AI Subscription portal is stored in the US region.

## Step 4 - Try out the AI features

1. [LoginFlowAI]({{base_path}}/guides/authentication/ai-loginflow)
2. [BrandingAI]({{base_path}}/guides/branding/ai-branding)