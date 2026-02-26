---
template: templates/complete-guide.html
heading: Weak Multi-factor authentication
read_time: 4 min
---

Multi-factor authentication (MFA) is essential in any application to enhance security by requiring multiple forms of verification from the user, reducing the risk of unauthorized access.


If you're using OIDC with PKCE and the Asgardeo SDK for login, you can easily add the necessary [multi-factor authentication]({{ base_path }}/guides/authentication/mfa/) steps within the application configuration in {{product_name}}. You can also implement [conditional authentication]({{ base_path }}/guides/authentication/conditional-auth/) logic to tailor the login process based on risk factors, without requiring any changes to the SDK—simply configure it in the {{product_name}} console.

![Sample Authentication Step Configurations in Asgardeo]({{base_path}}/assets/img/complete-guides/fesecurity/image10.png){: width="800" style="display: block; margin: 0;"}



Additionally, {{product_name}} offers [App-Native authentication]({{ base_path }}/guides/authentication/app-native-authentication/){:target="_blank"}, allowing you to create your own user interfaces while handling authentication via REST APIs. In this case, you must follow the [API specifications]({{ base_path }}/references/app-native-authentication/){:target="_blank"} and incorporate all required MFA steps to complete the authentication process. If the authentication flow involves a federated IdP, you'll also need to manage IdP redirection accordingly.


