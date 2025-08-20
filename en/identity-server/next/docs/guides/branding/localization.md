{% set product_url_format = "https://localhost:9443" %}
{% include "../../../../../includes/guides/branding/localization.md" %}

## Add/Remove locales

You can add or remove language support to customize the user interface for different regions and languages.

### Add a new locale

Follow these steps to add a new language to your authentication and recovery endpoints:

#### Step 1: Create locale-specific resource files

1. Navigate to the following directories based on the endpoint you want to configure:

    - **Authentication endpoint**: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`
    - **Recovery endpoint**: `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`

2. Duplicate the `Resources.properties` file in the same location.

3. Rename the duplicated file with the required locale suffix:
    - For British English: `Resources_en_GB.properties`
    - For French (Standard): `Resources_fr.properties`

    !!! note

        Refer to [Web browser language identification codes](https://www.localeplanet.com/icu/){target="_blank"} for more information on locale suffixes.

4. Update the values for each key in the new file:

    ```properties
    login=<Value in the required locale>
    ```

5. Save the file.

#### Step 2: Configure language options

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/`.

2. Open the `LanguageOptions.properties` file.

3. Add information about the new language in the following format:

    ```properties
    <language switcher name>=<language code>,<language name>,<text direction>
    ```

    !!! note

        The `<text direction>` parameter is optional. The default text direction is "ltr" (Left-to-Right).

4. Save the file.

#### Step 3: Enable the locale in your browser

1. Go to your browser settings.

2. Add the language you configured above to your preferred languages list.

#### Step 4: Test the configuration

1. Restart the WSO2 Identity Server.

2. Open a browser and navigate to the My Account portal URL.

   - For localhost: [https://localhost:9443/myaccount/](https://localhost:9443/myaccount/)

3. You should see the login screen displaying content in the configured language.

### Remove a locale

To remove a language from your endpoints:

1. Delete the corresponding `Resources_<locale>.properties` files from both authentication and recovery endpoint directories.

2. Remove the language entry from the `LanguageOptions.properties` file.

3. Restart the server for changes to take effect.

## RTL & LTR support

WSO2 Identity Server supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions. This ensures that languages like Arabic, Hebrew, and Persian display correctly with proper layout and content flow.

### Configure LTR support

LTR (Left-to-Right) is the **default text direction** for most languages. You don't need to explicitly configure LTR support.

To ensure a language uses LTR direction:

1. Open the `LanguageOptions.properties` file.

2. Add the language entry without the `rtl` suffix, or explicitly specify `ltr`:

    ```properties
    lang.switch.en_US=en,English,ltr
    ```

    or simply:

    ```properties
    lang.switch.en_US=en,English
    ```

3. Save the file and restart the server.

### Configure RTL support

When you select an RTL language, the interface automatically adjusts text alignment and content flow to follow RTL formatting conventions.

To enable RTL support for a specific language:

1. Navigate to the following directory based on the endpoint you want to configure:

    - **Authentication endpoint**: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/`
    - **Recovery endpoint**: `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/`

2. Open the `LanguageOptions.properties` file.

3. Add the `,rtl` suffix to the language entry. For example, to enable RTL for Arabic:

    ```properties
    lang.switch.ar_AE=ar,Arabic - العربية,rtl
    ```

4. Save the file and restart the server for the changes to take effect.

!!! tip

    The RTL/LTR configuration applies to both authentication and recovery endpoints when you update the `LanguageOptions.properties` file in the authentication endpoint directory.
