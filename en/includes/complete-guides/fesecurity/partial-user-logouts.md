
When a user logs out from a frontend application, it’s important to revoke the access token as soon as possible in addition to clearing the current user context at the frontend. The reason is that if the access token remains valid after logout, it could potentially be misused if intercepted, leading to unauthorized access. Additionally, the session identifier should not be reused after logout to prevent session hijacking, especially on shared devices.


{{product_name}} offers various types of [Token Binding]({{base_path}}/references/app-settings/oidc-settings-for-app/#token-binding-type){:target="_blank"}, each designed to serve a specific purpose. For example, the "SSO-session" token binding ensures that tokens are linked to a particular session, preventing them from being misused in other contexts. For a more detailed explanation, you can refer to the OIDC Token Configurations.

When you create a Single-Page Application in {{product_name}}, the token binding type is set to SSO-session by default. This means that the access token is automatically revoked when the user logs out. You can verify and adjust this setting through the application configurations in the {{product_name}} Console.

Additionally, {{product_name}} doesn’t reuse session identifiers; instead, it generates a new session identifier for each new session, enhancing security.
