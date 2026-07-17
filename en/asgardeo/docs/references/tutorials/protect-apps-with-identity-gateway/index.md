# Use {{product_name}} with identity gateways

An identity gateway sits in front of your application and enforces authentication and authorization before requests reach your application.

Identity gateways protect your application by,

- intercepting incoming traffic.

- verifying the user’s identity (using protocols like OAuth2 or OpenID Connect).

- enforcing fine-grained access rules.

- forwarding the request to the application only if it meets the security requirements.

By connecting {{product_name}} with identity gateways, you can centralize user management and apply consistent access control across your entire application ecosystem.

![Identity gateway architecture showing the flow between client, identity gateway, {{product_name}}, and protected applications]({{base_path}}/assets/img/tutorials/protect-apps-with-identity-gateway/identity_gateway_architecture.png)

This section explains how to connect {{product_name}} with the following identity gateways.

- [OAuth2 Proxy]({{base_path}}/references/tutorials/protect-apps-with-identity-gateway/protect-apps-with-oauth2proxy/)

- [Oathkeeper]({{base_path}}/references/tutorials/protect-apps-with-identity-gateway/protect-apps-with-oathkeeper/)

- [Mod Auth OpenIDC]({{base_path}}/references/tutorials/protect-apps-with-identity-gateway/protect-apps-with-mod-auth-openidc/)
