# Access Token Attributes

Access token attributes allow you to include specific user attributes in access tokens. This feature provides control over which user attributes are included in access tokens, enhancing security and flexibility.

!!! note
    This feature is only available for OIDC applications that use JWT access token type.

## Configuring Access Token Attributes

You can specify access token attributes for an application. When a user requests an access token, these selected user attributes will be added to it.

Follow the steps given below to configure the access token attributes: from the {{ product_name }} console.

1. In the {{ product_name }} console, navigate to "Applications".
2. Select your application and go to its Protocol tab. Then scroll to the Access Token section.
4. Select user attributes from the dropdown menu.
    ![Access-Token-Attributes]({{base_path}}/assets/img/guides/authorization/access-token/access-token-attributes.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
5. Click "Update" to save your changes.

When the [application calls the token endpoint]({{base_path}}/guides/authentication/oidc/implement-auth-code/#get-tokens), {{ product_name }} will include the selected user attributes as claims in the JWT access token response.

All user attributes defined in the application will be returned as claims in the JWT access token.

