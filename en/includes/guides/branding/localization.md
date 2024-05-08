# Localization in {{ product_name }}

{{ product_name }} enables a language picker on the following interfaces exposed to business users, allowing business users to select their preferred language.

- Interfaces related to the business user registration/sign-up flow, login flows (including MFA), and the account recovery flow.
- Interfaces of the self-care portal (My Account)

The **default language** on these interfaces is configured as explained in the [language settings](#language-settings) section.

!!! note "Important"
    When [user attributes]({{base_path}}/guides/users/attributes/manage-attributes/) configured on {{ product_name }} are displayed to users (during user sign-up and consent management flows), only the default user attributes get translated.

These interfaces are i18n-supported, which allows {{ product_name }} to update the text content from i18n resource files. This feature allows your business users to experience these use cases in their preferred language. The languages that {{ product_name }} currently supports are listed below.

## Supported languages

Below are the languages currently available for the i18n-supported user interfaces of {{ product_name }}.

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

## Language settings

The following methods can set the language used by {{ product_name }} interfaces exposed to business users.

### Language switcher

The language switcher is available at the footer of the (i18n-supported) {{ product_name }} interfaces, which allows business users to select the preferred language for {{ product_name }}.

Note that {{ product_name }} will remember the language selected from this switcher, and it will be applied to all i18n-supported interfaces.

### Browser-level settings

{{ product_name }} interfaces automatically adapt to the language preference set in the user's browser, as long as the language is supported by {{ product_name }}. However, the user can still change the language on the {{ product_name }} interfaces by using the [language switcher](#language-switcher).

### Application-level settings

As an application developer, you can configure the application to send the `ui_locales` parameter in the sign-in request or authorization request when the user signs in to the application.

!!! note "Important"
    The `ui_locale` parameter is only available for OIDC flows and not for SAML flows.

You can provide a list of strings, separated by a space, to define the locales. {{ product_name }} will search through the list until an {{ product_name }}-supported locale is found, and the first {{ product_name }}-supported locale in the list will be used as the default locale. If a supported locale is not found, {{ product_name }} will use the [browser-level locale](#browser-level-settings).

Consider the following examples:

- If the `ui_locales` is sent as `fr_FR`, **French** is used as the default locale.
- If the `ui_locales` is sent as `fr_FR en_US`, **French** will be the default locale since it's the first {{ product_name }}-support locale in the list.
- If the `ui_locales` is sent as `it_IT en_US`, **English (en_US)** will be used as the default locale because the first given locale (`it_IT`) is not supported.

The following examples demonstrate how to set the `ui_locales` parameter in your application.

- **Example 1:** Setting the default locale from the `signIn` request.

    You can send the `ui_locales` in the signIn request as a parameter.
  
    !!! note
        Learn more about [setting the signIn request](https://github.com/asgardeo/asgardeo-auth-spa-sdk#signin){:target="_blank"} using the {{ product_name }} SDKs.

    The following sample illustrates the `signIn` request using the JS/React SDK.

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

- **Example 2:** Setting the default locale from the authorization request.

   If you are sending the locale in the authorization request directly, you can append the `ui_locales` query parameter with the list of locales as shown below.

``` 
{{ product_url_format }}/oauth2/userinfo?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id={client_id}&ui_locales={ locales list }
```

!!! note "Privacy policy and Terms of conditions URLs"
    The privacy policy and terms of conditions URLs are specified in your [branding configurations]({{base_path}}/guides/branding/configure-ui-branding/#advanced-preferences). The `ui_locales={ locales list }` parameter is appended to these URLs, which allows you to show the translated content for the user from your end.