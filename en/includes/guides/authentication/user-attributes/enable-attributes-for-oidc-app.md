# Enable user attributes for OpenID Connect apps

{{ product_name }} can share user attributes with applications. This guide explains how you share user attributes with OpenID Connect applications.

## Configure user attributes to share
Follow the steps below to configure the user attributes from the {{ product_name }} Console and share them with the application.

### Select user attributes

You need to first specify the user attributes required for an application. This ensures that when a user logs in, the application can only get access to the user information exposed through these attributes.

The user attributes are grouped by their specific scopes to ease the user attribute configuration process. You can add user attributes individually or all the attributes in the scope at once.

To add user attributes to the app:

1. On the {{ product_name }}, go to **Applications**.
2. Select your application and go to its **User Attributes** tab. Here, the user attributes are listed under their relevant scopes.

   ![Add user attributes in {{ product_name }}](../../../assets/img/guides/applications/attributes/oidc/add-user-attributes-list-grouped-user-attributes.png){: width="600"}

3. You can add user attributes using the following methods:

   - Add a group of user attributes by selecting the checkbox in front of the required scope. This will add all the user attributes grouped under the selected scope.

      ![Add user attributes in {{ product_name }}](../../../assets/img/guides/applications/attributes/oidc/add-user-attribute-select-scope.png){: width="600"}

   - Add a single user attribute by expanding the required scope and selecting the user attribute you need from the expanded list.

      ![Add user attributes in {{ product_name }}](../../../assets/img/guides/applications/attributes/oidc/add-user-attribute-select-user-attribute.png){: width="600"}

4. Click **Update** once you are done.

### Define mandatory user attributes

{% include "../../fragments/manage-app/manage-user-attributes/select-mandatory-attributes.md" %}

![Add madatory user attributes in {{ product_name }}](../../../assets/img/guides/applications/attributes/oidc/add-mandatory-user-attributes.png){: width="600"}

## How it works

Let's see how this flow works in {{ product_name }}.

Once you have configured the user attributes that are required for your application, {{ product_name }} implements the following process when a user tries to log in to your app.

![Provides consent for attributes in {{ product_name }}](../../../assets/img/guides/applications/attributes/oidc/how-it-works.png){: width="800"}

### Application requests attributes

When the user logs in to the app, a request is sent to {{ product_name }} with the relevant **scopes**.

Applications can use scopes to request access to a group of user attributes.

!!! note
      Learn more about [managing scopes](../../guides/users/attributes/manage-scopes/) in {{ product_name }}.

### {{ product_name }} checks for mandatory attributes

{{ product_name }} verifies whether the user's profile has values for all the [mandatory attributes](#define-mandatory-user-attributes) that are requested by the application. If there are missing values, {{ product_name }} will prompt the user to enter the missing values.

### Requests user consent

By default, {{ product_name }} requests the user's consent to share the user attributes with the application.

!!! note
      Learn more about [managing user consent](../../guides/authentication/manage-consent-for-attributes/).

### Shares attributes with the app

If the user consents to share attributes with the application, {{ product_name }} returns the requested user attributes as well as the **subject** attribute to the application in the **ID token**.

#### Subject Attribute
  
The subject attribute is the unique identifer for a user. The application receives this value via the [subject attribute](#subject-attribute) parameter in the [ID token](#id-token). In {{ product_name }}, the user ID is used as the subject attribute.

#### ID token

Once the [application calls the token endpoint](../../guides/authentication/oidc/implement-auth-code/#get-tokens), {{ product_name }} sends the ID token in the response.

All the user attributes that are requested by scopes are returned as claims in the ID token. The application can decode the ID token to view the claims.

_A sample ID token is given below:_

``` json
{
  "isk": "69b37037a2349763dc48e2a30a62c3feebf0b5823cf869e149352737ddc0ca63",
  "at_hash": "7qgloEmkz3kGBTtH7RI4qw",
  "sub": "user@sample.com",
  "amr": [
    "BasicAuthenticator"
  ],
  "iss": "https://api.asgardeo.io/t/bitfrost/oauth2/token",
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

In addition to getting attributes from the ID token, the application can [invoke the userinfo endpoint](../../guides/authentication/oidc/implement-auth-code/#retrieve-user-details) and get user attributes along with the subject attribute.

_A sample userinfo response is given below:_

```json
{
"sub": "user@sample.com",
"nickname": "nick",
"given_name": "alice",
"family_name": "john"
}
```