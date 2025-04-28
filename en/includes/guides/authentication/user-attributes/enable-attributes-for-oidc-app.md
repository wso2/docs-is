# Enable user attributes for OpenID Connect apps

User attributes are pieces of information about the identity of a user such as an email address, birth date or the user's country etc.. Applications may request user attributes from the identity provider to personalize the experience of the logged in user.

The following guides explain how you can configure OpenID Connect applications to request attributes from {{product_name}}.

## Configure user attributes

Follow the steps given below to configure the user attributes from the {{ product_name }} Console and share them with the application.

### Select user attributes

You can specify the necessary user attributes for an application. This ensures that when a user logs in, the application is only granted access to the user information associated with these attributes.

The user attributes are grouped by their specific scopes to ease the user attribute configuration process. You can add user attributes individually or all the attributes in the scope at once.

To add user attributes to the app:

1. On the {{ product_name }} console, go to **Applications**.
2. Select your application and go to its **User Attributes** tab. The most common user attributes are listed according to the relevant scope.

    ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attributes-list-grouped-user-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. You can select user attributes using the following methods:

    - Add all user attributes for a given scope by selecting the checkbox in front of that scope.

        ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attribute-select-scope.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - Add user attributes by expanding a scope and selecting only the necessary user attributes.

        ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attribute-select-user-attribute.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** once you are done.

### Select an alternate subject attribute

The subject attribute is used for exchanging information about the user. The subject is represented by the **subject** attribute in the ID token. By default, Asgardeo shares **User ID** as the subject. You can define any user attribute as the subject.

To define a different attribute as the subject:

1. In the **Subject** section of the **User Attributes** tab, enable **Assign alternate subject identifier**.

    !!! note
        According to the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes){target="_blank"}, is not recommended to change the default subject identifier.

    ![Select subject attribute in Asgardeo]({{base_path}}/assets/img/guides/applications/attributes/oidc/select-sub-attribute.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Select an attribute as the subject from the **Subject attribute** list.

3. Click **Update**.

!!! warning "Deprecated `sub` attribute behavior in application access tokens"

    Application access tokens are tokens generated to represent the application rather than an individual user. Such tokens are generated during grant types such as [client_credential]({{base_path}}/references/grant-types/#client-credentials-grant).
    
    Previously, the `sub` attribute of application access tokens contained the `userid` of the application owner. With the latest updates, the `sub` value will contain the `client_id` of the application. If your application's access tokens still return the `userid` in the `sub` attribute, it is likely that your application is out-of-date. If so, update your application through the {{product_name}} Console by navigating to the relevant application under the **Applications** section.

    Once updated, the `sub` attribute will return the `client_id`. Therefore, before updating, ensure that your application does not rely on the `sub` attribute and remove any such dependencies.

### Define mandatory user attributes

{% include "../../fragments/manage-app/manage-user-attributes/select-mandatory-attributes.md" %}

    ![Add madatory user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-mandatory-user-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{{ configure_subject_identifier }}

## How it works

The following diagram depicts the process {{ product_name }} implements when a user tries to log in to an application.

![Provides consent for attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/how-it-works.png){: width="800" style="display: block; margin: 0;"}

### Application requests attributes

When the user logs in to the app, a request is sent to {{ product_name }} with the relevant **scopes**.

Applications can use scopes to request access to a group of user attributes.

!!! note
    Learn more about [managing scopes]({{base_path}}/guides/users/attributes/manage-scopes/) in {{ product_name }}.

### {{ product_name }} checks for mandatory attributes

{{ product_name }} verifies whether the user's profile has values for all the [mandatory attributes](#define-mandatory-user-attributes) that are requested by the application. If there are missing values, {{ product_name }} will prompt the user to enter the missing values.

### Requests user consent

By default, {{ product_name }} requests the user's consent to share the user attributes with the application.

!!! note
    Learn more about [managing user consent]({{base_path}}/guides/authentication/manage-consent-for-attributes/).

### Shares attributes with the app

If the user consents to share attributes with the application, {{ product_name }} returns the requested user attributes as well as the **subject** attribute to the application in the **ID token**.

#### Subject Attribute
  
The subject attribute is the unique identifier for a user. The application receives this value via the `sub` parameter in the [ID token](#id-token). In {{ product_name }}, the user ID is used as the subject attribute.

#### ID token

Once the application calls the [token endpoint]({{base_path}}/guides/authentication/oidc/implement-auth-code/#get-tokens), {{ product_name }} sends the ID token in the response.

All the user attributes that are requested by scopes are returned as claims in the ID token. The application can decode the ID token to view the claims.

_A sample ID token is given below:_

``` json
{
  "isk": "69b37037a2349763dc48e2a30a62c3feebf0b5823cf869e149352737ddc0ca63",
  "at_hash": "7qgloEmkz3kGBTtH7RI4qw",
  "sub": "e46ffa67-100d-4329-9460-b8251d446518",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "{{ product_url_sample }}/oauth2/token",
  "given_name": "alice",
  "sid": "5580be2b-a12d-43a4-823a-9d1352b88269",
  "aud": "UEP40cZTZfxJfGdDWFmTrwqluxoa",
  "c_hash": "VlKxb3UhuYtFEG_VftAa0g",
  "nbf": 1625557031,
  "azp": "UEP40cZTZfxJfGdDWFmTrwqluxoa",
  "nickname": "nick",
  "exp": 1625560631,
  "iat": 1625557031,
  "family_name": "john"
}
```
  
#### Userinfo response

In addition to getting attributes from the ID token, the application can invoke the [userinfo endpoint]({{base_path}}/guides/authentication/oidc/request-user-info/) and get user attributes along with the subject attribute.

_A sample userinfo response is given below:_

```json
{
"sub": "e46ffa67-100d-4329-9460-b8251d446518",
"nickname": "nick",
"given_name": "alice",
"family_name": "john"
}
```

## Prioritize sharing local attributes

In a scenario where a user with a local account in {{product_name}}, logs in using [federated authentication]({{base_path}}/guides/authentication/federated-login/), you may want to prioritize sharing local user attributes with the application over those provided by the external identity provider. Follow the steps below to set this priority for sharing user attributes.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application and go to its **User Attributes** tab.
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
3. Scroll down and under **Linked Accounts**, select **Prioritize local account attributes**.
{% else %}
3. Scroll down and under **Linked Accounts**, select **Validate linked local account**.
{% endif %}
    ![Prioritize local account attributes]({{base_path}}/assets/img/guides/applications/attributes/oidc/prioritize-local-account-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

When enabled, {{product_name}} looks for a linked local user account based on the subject claim provided by the external identity provider. If a local user account is found, the local attributes will be shared with the application. If a local account is not found, user attributes obtained from the external identity provider will be shared with the application.

!!! note
    When [JIT provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/) is enabled for the external identity provider, {{ product_name }} ensures that the attributes of the associated local account synchronize with the external identity provider upon each federated login.

    If you want to preserve attribute values set in the local user account, you need to disable JIT provisioning