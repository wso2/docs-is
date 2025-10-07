# API security

The business APIs you deploy, whether used by your internal applications or external partners, must be properly secured and managed. Implementing robust API security is crucial for several reasons. It safeguards sensitive data transmitted via APIs, preventing unauthorized access while ensuring legitimate users have the correct level of access. Moreover, strong API security is vital for maintaining a business’s reputation and customer trust. A single data breach can significantly harm your brand name and erode customer confidence, so preventing cybersecurity incidents not only helps avoid negative media attention but also shows a commitment to protecting user data and privacy. Furthermore, API security ensures compliance with industry-specific regulations such as HIPAA and FAPI.

{{product_name}} can secure your APIs and make sure only authorized applications and  authorized users can access the APIs. {{product_name}} can be integrated with your APIs in two approaches:

- **{{product_name}} as OAuth2 Token Service with Access control** - In this approach, {{product_name}} handles both authentication and authorization. {{product_name}} issues access tokens with enforced access control policies (for example scopes issued are based on role-based access control). Your APIs validate the token and trust the access control decisions already made by {{product_name}}.

  Suitable when,

  - You don't use a dedicated API management platform.
  - You want {{product_name}} to enforce access policies.

- **{{product_name}} as OAuth2 Token Service only** - Use this approach when you integrate {{product_name}} as the Identity Provider (IdP) for an API management platform (WSO2 API Manager, Choreo, etc.). {{product_name}} issues tokens, but the API management platform enforces authorization for the token.

  Suitable when,

  - You already have an API gateway or management platform handling access policies.
  - You want centralized identity management via {{product_name}} across different applications and APIs.

## Define and secure API resources  

[Define your APIs]({{base_path}}/guides/authorization/api-authorization/api-authorization/#register-a-business-api) and associated permissions as scopes in {{product_name}} using the console or API, and attach the authorization policies.

!!! note

    Learn more about [supported Authorization policies for APIs and apps]({{base_path}}/references/authorization-policies-for-apps/)

<!-- [Diagram - An API and scope] -->

## Authorize applications to use APIs

[Authorize applications to consume API resources]({{base_path}}/guides/authorization/api-authorization/api-authorization/#authorize-apps-to-consume-api-resources) and define their access level by assigning a set of scopes.

!!! tip

    If your application needs FAPI compliance for API access, {{product_name}} simplifies the process with a one-click, FAPI-compliant option. This feature ensures that all necessary security configurations for FAPI compliance are automatically applied to your app. Learn more about [FAPI-compliant apps]({{base_path}}/guides/applications/register-a-fapi-compliant-app/).

Define application level roles as per your business requirements and assign selected scopes from the previous step. You can create both application-level roles and organizational-level roles. These roles can be assigned to users and user groups so that their access to the API is restricted based on roles.

[Define application-level roles]({{base_path}}/guides/authorization/api-authorization/api-authorization/#create-roles-and-assign-users) based on your business needs, and assign relevant scopes that you selected in the previous step. You can create both application-specific roles and organization-wide roles, which can be applied to users or user groups to ensure access to APIs is restricted and managed according to roles.

## Simplify token generation and verification  

Use {{product_name}} SDKs for your preferred web application framework to request access tokens while also managing user sign-ins. {{product_name}} SDKs allow you to request specific scopes, representing different access levels within the APIs. {{product_name}} applies authorization policies to each token request, ensuring that applications only receive the scopes authorized for the current user and app. The SDKs also handle token verification complexities, so you won’t need to write additional code for token processing and verification.
Explore the full range of SDKs supported by {{product_name}}.

Alternatively, you can use any OAuth2/OIDC framework to create token requests and manage tokens on your own.

You can use one of the following methods to verify tokens during the token verification process, typically done at the API gateway level or within the API implementation if no gateway is used:

- **Signature Verification** - Verify the token's signature and validity directly. {{product_name}} provides a JWKS (JSON Web Key Set) endpoint, allowing you to retrieve the public key associated with the private key used for signing. This method doesn't require additional network calls to {{product_name}}, ensuring optimal performance.
- **Token Introspection** - Verify the token's validity and gain additional token details by calling {{product_name}}'s introspection endpoint. While this approach involves extra network calls, it offers additional security, such as checking whether the token has been revoked.

If you are using an API management solution that provides API authorization along with other management capabilities, you can easily integrate {{product_name}} as an identity provider for token generation. This is a common approach when you want to leverage {{product_name}} as the customer or workforce identity provider across applications and APIs.

- [Integrate {{product_name}} with WSO2 APK](https://apk.docs.wso2.com/en/latest/setup/identity-platform/idp/asgardeo-idp/){: target="_blank"}
- [Choreo API Management](https://wso2.com/choreo/docs/administer/configure-an-external-idp/configure-asgardeo-as-an-external-idp/){: target="_blank"}
