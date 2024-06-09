{% set product_url_format = "https://localhost:9443" %}
{% include "../../../../../includes/guides/branding/localization.md" %}

## Configuring Localization for Authentication Endpoints

WSO2 Identity Server provides internationalization support for the web apps (such as the authentication endpoint which is in `<IS_HOME>/repository/deployment/server/webapps/` directory). The following steps describe how you can configure this:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`

2. Take a copy of the `Resources.properties` file to the same location, rename it with the required locale suffix as follows:
    - For British English: `Resources_en_GB.properties`
    - For French (Standard): `Resources_fr.properties`

    Refer to [Web browser language identification codes](https://www.localeplanet.com/icu/) for more information on required locale suffixes.

3. Update values while keeping the keys as follows:
   ```
   login=<Value in the required locale>
   ``` 

4. Save the file.

5. Next, navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/` and open the `LanguageOptions.properties` file.

6. Add the new language in the following format & save the file.
   ```
   <language switcher name>=<language code>,<language name>`
   ```

7. Go to the browser setting and add the language you configured above.

8. Restart the server. To try out, do the following:
    1. Open up a browser.
    2. Type the My Account portal URL. (If you are running the server in your localhost, the URL is: [https://localhost:9443/myaccount/](https://localhost:9443/myaccount/)). You will see the login screen having the contents in the configured language.

## Configuring Localization for Recovery Endpoints

Similarly, you can enable localization for `accountrecoveryendpoint` by applying the same steps 1 through 8 in the previous section, starting with the following location:

`<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`.

Additionally, update the LanguageOptions.properties file located at: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/LanguageOptions.properties` file to include the new language options.
