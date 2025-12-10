# Localization in {{ product_name }}

{{ product_name }} lets you pick the language for the following interfaces exposed to business users.

- User registration, sign-up, login and the account recovery flows.
- **My Account** (self-care portal).

The **default language** on these interfaces is configured as explained in the [language settings](#configure-language-settings) section.

!!! note "Important"

    In the user **sign-up** and **attribute consent** screens, {{product_name}} only translates the default user attributes.

These interfaces support i18n, allowing {{product_name}} to load text content from i18n resource files. This ensures that your business users can experience these use cases in their preferred language.

## Supported languages

{{product_name}} provides i18n-supported user interfaces in the following languages.

<table>
    <tr>
        <th>
            Language
        </th>
        <th>
            Code
        </th>
    </tr>
    <tr>
        <td>
            English
        </td>
        <td>
            <code>en_US</code>
        </td>
    </tr>
    <tr>
        <td>
            French
        </td>
        <td>
            <code>fr_FR</code>
        </td>
    </tr>
    <tr>
        <td>
            Spanish
        </td>
        <td>
            <code>es_ES</code>
        </td>
    </tr>
    <tr>
        <td>
            Portuguese - Portugal
        </td>
        <td>
            <code>pt_PT</code>
        </td>
    </tr>
    <tr>
        <td>
            Portuguese - Brazil
        </td>
        <td>
            <code>pt_BR</code>
        </td>
    </tr>
    <tr>
        <td>
            German
        </td>
        <td>
            <code>de_DE</code>
        </td>
    </tr>
    <tr>
        <td>
            Chinese
        </td>
        <td>
            <code>zh-CN</code>
        </td>
    </tr>
    <tr>
        <td>
            Japanese
        </td>
        <td>
            <code>ja-JP</code>
        </td>
    </tr>
    <tr>
        <td>
            Sinhalese
        </td>
        <td>
            <code>si-LK</code>
        </td>
    </tr>
</table>

## Configure language settings

You can use the following language settings to configure the {{product_name}} interfaces exposed to the business user.

### Language switcher

Users can use the language switcher available at the footer of the i18n-supported {{ product_name }} interfaces to select the preferred language.

!!! note

    {{ product_name }} remembers this setting and applies it to all i18n-supported interfaces.

### Browser-level settings

{{product_name}} automatically adapts to each user's browser language preference as long as it's a  supported language. Users can still manually change the language using the [language switcher](#language-switcher).

### Application-level settings

You can configure the application to send the `ui_locales` parameter in the sign-in or authorization request when a user signs in to the application.

It works as follows,

- You provide a list of strings, separated by a space, to define the locales.

- {{ product_name }} searches through the list until it finds a supported locale.

- If found, {{product_name}} sets that language as the default locale. If not, it uses the [browser-level](#browser-level-settings) setting.

!!! note "Important"

    The `ui_locale` parameter works only with OIDC flows and not with SAML flows.

Consider the following examples:

- If the `ui_locales` set to `fr_FR`, {{product_name}} sets **French**  as the default locale.
- If the `ui_locales` set to `fr_FR en_US`, {{product_name}} sets **French** as the default locale since it's the first language in the list that {{ product_name }} supports.
- If the `ui_locales` set to `it_IT en_US`, {{product_name}} sets **English (en_US)** as the default locale as it doesn't support `it_IT`.

The following examples show how to set the `ui_locales` parameter in your application.

- **Example 1:** Using the SDK.

    The following sample illustrates how to set the `ui_locales` parameter in the `signIn` request using the JS/React SDK.
  
    !!! note
        Learn more about [setting the signIn request](https://github.com/asgardeo/asgardeo-auth-spa-sdk#signin){:target="_blank"} using the {{ product_name }} SDKs.

    ``` Js
        <SecureApp
            fallback={<div>Loading</div>}
            overrideSignIn={async () => {
                await signIn({
                    'ui_locales': 'fr_FR en_US'
                });
            }}
        >
            <AppContent/>
        </SecureApp>
    ```

- **Example 2:** Directly in the authorization request.

    You can append the `ui_locales` directly in the authorization request as a query parameter as shown below.

    ``` 
    {{ product_url_format }}/oauth2/userinfo?scope={scope}\
    &response_type=code\
    &redirect_uri={redirect_uri}\
    &client_id={client_id}\
    &ui_locales={ locales list }
    ```

!!! note "Translation of privacy policy and terms of conditions"
    {{product_name}} attaches the `ui_locales={ locales list }` parameter to the privacy policy and terms of condition URLs set in the [branding configurations]({{base_path}}/guides/branding/configure-ui-branding/#advanced-preferences). This allows you to show users the translated content.
