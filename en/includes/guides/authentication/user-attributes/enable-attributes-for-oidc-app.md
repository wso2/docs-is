# Enable user attributes for OpenID Connect apps

User attributes are pieces of information about the identity of a user such as an email address, birth date or the user's country etc.. Applications may request user attributes from the identity provider to personalize the experience of the logged in user.

The following guides explain how you can configure OpenID Connect applications to request attributes from {{product_name}}.

## Select user attributes

You can specify the necessary user attributes for an application. This ensures that when a user logs in, the application is only granted access to the user information associated with these attributes.

To request user attributes from an application:

1. On the {{ product_name }} console, go to **Applications**.
2. Select your application and go to its **User Attributes** tab. The most common user attributes are listed according to the relevant scope.

    ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attributes-list-grouped-user-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. You can select user attributes using the following methods:

    - Add all user attributes for a given scope by selecting the checkbox in front of that scope.

        ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attribute-select-scope.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    - Add user attributes by expanding a scope and selecting only the necessary user attributes.

        ![Add user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-user-attribute-select-user-attribute.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** once you are done.

## Select mandatory user attributes

{% include "../../fragments/manage-app/manage-user-attributes/select-mandatory-attributes.md" %}

![Add madatory user attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/add-mandatory-user-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Configure the subject identifier

{{product_name}} uses a subject attribute to uniquely identify users logging into OIDC applications. This is set to be the **user ID** of the user which can be found in the user's profile in **User Management** > **Users**.

However, having a single subject identifier for multiple applications may enable external entities to track the activity of a user across applications based on a single attribute.

You can opt for a pairwise subject identifier to mitigate this issue. With a pairwise subject identifier, {{product_name}} generates a unique pseudonymous ID for each user-application pair protecting the user's identity when accessing multiple applications.

Follow the steps below to configure the subject identifier type:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application and go to its **User Attributes** tab.

3. Under **Subject type**, select **Pairwise**.

4. Enter a **Sector Identifier URI**.

    !!! info
        The sector identifier URI is used to group clients belonging to the same security domain so that the same pairwise identifier is used for a given user accessing these clients.

    ![Enter a suctor identifier for pairwise subject identifier]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-subject-identifier.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## How it works

The following diagram depicts the process {{ product_name }} implements when a user tries to log in to an application.

![Provides consent for attributes in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/oidc/how-it-works.png){: width="800" style="display: block; margin: 0 auto;"}

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
  
The subject attribute is the unique identifer for a user. The application receives this value via the [subject attribute](#subject-attribute) parameter in the [ID token](#id-token). In {{ product_name }}, the user ID is used as the subject attribute.

#### ID token

Once the [application calls the token endpoint]({{base_path}}/guides/authentication/oidc/implement-auth-code/#get-tokens), {{ product_name }} sends the ID token in the response.

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

In addition to getting attributes from the ID token, the application can [invoke the userinfo endpoint]({{base_path}}/guides/authentication/oidc/implement-auth-code/#retrieve-user-details) and get user attributes along with the subject attribute.

_A sample userinfo response is given below:_

```json
{
"sub": "user@sample.com",
"nickname": "nick",
"given_name": "alice",
"family_name": "john"
}
```