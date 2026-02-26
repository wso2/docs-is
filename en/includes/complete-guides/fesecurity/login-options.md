

## In-app vs IdP-based login

Before we move further, let’s briefly look at two main options available for you to  implement user login in your frontend app:

1. **Build In-app login:** This approach involves creating your own login mechanism, typically requiring you to store usernames and passwords in a database. While this may seem simple at first, adding features like multi-factor authentication (MFA), conditional logic, and account recovery can significantly increase complexity. Over time, you might find yourself building an entire Identity Provider (IdP), which can divert your focus from the core business requirements of your app.

![In-app login]({{base_path}}/assets/img/complete-guides/fesecurity/image1.png){: width="550" style="display: block; margin: 0;"}

2. **Integrate with an Identity Provider (IdP):** This option involves integrating your frontend app with an IdP, which can be deployed on your infrastructure or accessed as a cloud service. By using open standards like SAML 2.0 and OpenID Connect (OIDC), you can delegate authentication and authorization responsibilities to the IDP, thereby improving the scalability and flexibility of your authentication flow.

![In-app login]({{base_path}}/assets/img/complete-guides/fesecurity/image2.png){: width="800" style="display: block; margin: 0;"}

In this guide, we assume you have integrated your frontend app with an IdP using the OIDC protocol for user login.  You can use a cloud IdP such as {{product_name}} as the IdP or any OIDC-supported IdP such as WSO2 Identity Server. Integrating your frontend app with an IdP typically involves two main steps:

1. Add the OIDC SDK as a dependency to your app to simplify handling OIDC request-response flows and tokens. While you could implement OIDC flows on your own, using the SDK saves time and ensures you’re following the best practices. Although the security implications and solutions are common across all frontend technologies, this guide presents examples from [Asgardeo React SDK](https://wso2.com/identity-and-access-management/react/){:target="_blank"}.

2. Register your app with an Identity Provider (IdP) as a Relying Party (RP) and obtain the necessary credentials to integrate your app with the IdP. In {{product_name}} you can achieve this by creating an application in the console.


For this guide, we'll use a sample application, [asgardeo-react-b2c-sample-app](https://github.com/wso2/asgardeo-react-b2c-sample-app?tab=readme-ov-file){:target="_blank"}. With {{product_name}} successfully integrated, you should now have working login functionality within your application.

Now, let's discuss the security concerns present in the application and explore how to effectively mitigate them.

