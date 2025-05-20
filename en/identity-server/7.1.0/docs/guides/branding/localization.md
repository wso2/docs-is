{% set product_url_format = "https://localhost:9443" %}
{% include "../../../../../includes/guides/branding/localization.md" %}

## Configuring localization for authentication endpoints

WSO2 Identity Server provides internationalization support for its web applications (such as the authentication endpoint located in the `<IS_HOME>/repository/deployment/server/webapps/` directory). The following steps describe how you can configure this:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`

2. Duplicate the `Resources.properties` file in the same location and rename it with the required locale suffix as follows:
    - For British English: `Resources_en_GB.properties`
    - For French (Standard): `Resources_fr.properties`

    !!! note

        Refer to [Web browser language identification codes](https://www.localeplanet.com/icu/){target="_blank"} for more information on locale suffixes.

3. Update the values for each key as follows:
   ```
   login=<Value in the required locale>
   ``` 

4. Save the file.

5. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/` and open the `LanguageOptions.properties` file.

6. Add information about the new language in the following format & save the file.
   ```
   <language switcher name>=<language code>,<language name>,<text direction>`
   ```

    !!! note

        - `<text direction>` is optional.
        - The default text direction is set to "ltr" (Left-to-Right). To enable support for Right-to-Left (RTL) languages, refer to the documentation on [Right-to-Left (RTL) Language Support]({{base_path}}/guides/branding/localization/#right-to-left-rtl-language-support) for detailed instructions.

7. Go to the browser settings and add the language you configured above.

8. Restart the server. To try out, do the following:
    1. Open up a browser.
    2. Type the My Account portal URL. (If you are running the server in your localhost, the URL is: [https://localhost:9443/myaccount/](https://localhost:9443/myaccount/)). You will see the login screen having the contents in the configured language.

## Configuring localization for recovery endpoints

You can enable localization for `accountrecoveryendpoint` by applying the same steps 1 through 8 in the previous [section](#configuring-localization-for-authentication-endpoints), for the following location:

`<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`.

Update the LanguageOptions.properties file located at: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/LanguageOptions.properties` to include the new language options.

## Right-to-Left (RTL) Language Support

{{product_name}} supports Right-to-Left (RTL) languages like Arabic, Hebrew, and Persian, ensuring login and recovery screens dynamically adjust their layout and text direction for a seamless user experience. When an RTL language is selected, the interface, including text alignment and content flow, automatically mirrors to follow RTL formatting conventions.

If you need to enable Right-to-Left (RTL) support for a language in authentication and recovery endpoints, follow these steps:

1. Navigate to the following directory based on the endpoint you want to configure:

    - Authentication endpoint: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/`
    - Recovery endpoint: `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/`

2. Open the `LanguageOptions.properties` file.

3. Add the ,rtl suffix to the language entry in the file. For example, to enable RTL for Arabic, update the entry as follows:

    ```text
    lang.switch.ar_AE=ar,Arabic - العربية,rtl
    ```

4. Save the file and restart the server for the changes to take effect.

This will apply RTL formatting for the specified language across authentication and recovery endpoints.
