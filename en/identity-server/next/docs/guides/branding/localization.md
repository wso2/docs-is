{% set product_url_format = "https://localhost:9443" %}
{% include "../../../../../includes/guides/branding/localization.md" %}

## Add/Remove locales

You can add or remove language support to customize the user interface for different regions and languages.

### My Account

Configure localization for the My Account application.

#### Add a locale to My Account

To add a new language (e.g., Arabic - `ar-SA`) to My Account:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/myaccount/extensions/i18n/`.

2. Create a `meta.json` file with the following content:

    ```json
    {
        "ar-SA": {
            "enabled": true,
            "code": "ar-SA",
            "flag": "sa",
            "name": "Arabic (Saudi Arabia)",
            "namespaces": [
                "common",
                "myAccount",
                "extensions"
            ],
            "paths": {
                "common": "extensions/i18n/ar-SA/portals/common.json",
                "myAccount": "extensions/i18n/ar-SA/portals/myAccount.json",
                "extensions": "extensions/i18n/ar-SA/portals/extensions.json"
            }
        }
    }
    ```

3. Copy the `en-US` bundle from `<IS_HOME>/repository/deployment/server/webapps/myaccount/resources/i18n/`.

4. Rename the copied bundle to `ar-SA` and place it inside `<IS_HOME>/repository/deployment/server/webapps/myaccount/extensions/i18n/`.

5. Translate the content in the JSON files within the new language bundle.

6. The new language will now appear in the language switcher.

#### Remove a locale from My Account

You can remove language support using different options based on your requirements.

##### Remove from all places in My Account

To remove a language from language switcher, branding, email templates, and all other places:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/myaccount/extensions/i18n/`.

2. Create or update the `meta.json` file with the following content:

    ```json
    {
        "pt-PT": {
            "enabled": false
        }
    }
    ```

##### Remove from language switcher only in My Account

To hide a language from the language switcher while keeping it available in other places:

1. Update the `meta.json` file with the following content:

    ```json
    {
        "pt-PT": {
            "enabled": true,
            "showOnLanguageSwitcher": false
        }
    }
    ```

### Console

Configure localization for the Console application.

#### Add a locale to Console

To add a new language (e.g., Arabic - `ar-SA`) to Console:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/console/extensions/i18n/`.

2. Create a `meta.json` file with the following content:

    ```json
    {
        "ar-SA": {
            "enabled": true,
            "code": "ar-SA",
            "flag": "sa",
            "name": "Arabic (Saudi Arabia)",
            "namespaces": [
                "common",
                "console",
                "extensions"
            ],
            "paths": {
                "common": "extensions/i18n/ar-SA/portals/common.json",
                "console": "extensions/i18n/ar-SA/portals/console.json",
                "extensions": "extensions/i18n/ar-SA/portals/extensions.json"
            }
        }
    }
    ```

3. Copy the `en-US` bundle from `<IS_HOME>/repository/deployment/server/webapps/console/resources/i18n/`.

4. Rename the copied bundle to `ar-SA` and place it inside `<IS_HOME>/repository/deployment/server/webapps/console/extensions/i18n/`.

5. Translate the content in the JSON files within the new language bundle.

6. The new language will now appear in the language switcher.

#### Remove a locale from Console

You can remove language support using different options based on your requirements.

##### Remove from all places in Console

To remove a language from language switcher, branding, email templates, and all other places:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/console/extensions/i18n/`.

2. Create or update the `meta.json` file with the following content:

    ```json
    {
        "pt-PT": {
            "enabled": false
        }
    }
    ```

##### Remove from language switcher only in Console

To hide a language from the language switcher while keeping it available in other places:

1. Update the `meta.json` file with the following content:

    ```json
    {
        "pt-PT": {
            "enabled": true,
            "showOnLanguageSwitcher": false
        }
    }
    ```

### Authentication & Recovery endpoints

The authentication and recovery endpoints use traditional properties files for localization.

#### Add a locale to endpoints

Follow these steps to add a new language to your authentication and recovery endpoints:

##### Step 1: Create locale-specific resource files

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

##### Step 2: Configure language options

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/`.

2. Open the `LanguageOptions.properties` file.

3. Add information about the new language in the following format:

    ```properties
    <language switcher name>=<language code>,<language name>,<text direction>
    ```

    !!! note

        The `<text direction>` parameter is optional. The default text direction is "ltr" (Left-to-Right).

4. Save the file.

##### Step 3: Test the configuration

1. Go to your browser settings and add the language you configured above to your preferred languages list.

2. Restart the WSO2 Identity Server.

3. Open a browser and navigate to the My Account portal URL.

   - For localhost: [https://localhost:9443/myaccount/](https://localhost:9443/myaccount/)

4. You should see the login screen displaying content in the configured language.

#### Remove a locale from endpoints

To remove a language from your endpoints:

1. Delete the corresponding `Resources_<locale>.properties` files from both authentication and recovery endpoint directories.

2. Remove the language entry from the `LanguageOptions.properties` file.

3. Restart the server for changes to take effect.

## Configure RTL & LTR support

WSO2 Identity Server supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions for authentication and recovery endpoints.

### LTR (Left-to-Right)

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

### RTL (Right-to-Left)

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
