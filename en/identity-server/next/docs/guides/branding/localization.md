{% set product_url_format = "https://localhost:9443" %}
{% include "../../../../../includes/guides/branding/localization.md" %}

## Add/Remove locales

You can add or remove language support to customize the user interface for different regions and languages.

{% raw %}

### My Account {#add-remove-locales-in-myaccount}

{% endraw %}

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

{% raw %}

### Console {#add-remove-locales-in-console}

{% endraw %}

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
                "applications",
                "users",
                ...rest of the namespaces
            ],
            "paths": {
                "applications": "extensions/i18n/ar-SA/portals/applications.json",
                "users": "extensions/i18n/ar-SA/portals/users.json",
                ...rest of the paths
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

{% raw %}

### Authentication, Recovery & Accounts endpoints {#add-remove-locales-in-authentication-recovery-accounts-endpoints}

{% endraw %}

Configure localization for authentication, recovery, and accounts endpoints using traditional properties files.

#### Add a locale to endpoints

Follow these steps to add a new language to your authentication, recovery, and accounts endpoints:

##### Step 1: Create locale-specific resource files

1. Navigate to the following directories based on the endpoint you want to configure:

    - **Authentication endpoint**: `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`
    - **Recovery endpoint**: `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/org/wso2/carbon/identity/mgt/recovery/endpoint/i18n/`
    - **Accounts endpoint**: `<IS_HOME>/repository/deployment/server/webapps/accounts/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`

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

3. Open a browser and navigate to test the endpoints:

   - **Authentication**: [https://localhost:9443/myaccount/](https://localhost:9443/myaccount/) (triggers login screen)
   - **Recovery**: [https://localhost:9443/accountrecovery/](https://localhost:9443/accountrecovery/)
   - **Accounts**: [https://localhost:9443/accounts/](https://localhost:9443/accounts/)

4. You should see the screens displaying content in the configured language.

#### Remove a locale from endpoints

To remove a language from your authentication, recovery, and accounts endpoints:

1. Delete the corresponding `Resources_<locale>.properties` files from authentication, recovery, and accounts endpoint directories.

2. Remove the language entry from the `LanguageOptions.properties` file.

3. Restart the server for changes to take effect.

## Configure Text Direction (RTL & LTR)

WSO2 Identity Server supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions. **LTR is the default text direction** for most languages and doesn't require explicit configuration. RTL languages like Arabic, Hebrew, and Persian automatically adjust the interface layout and content flow when configured properly.

{% raw %}

### My Account {#configure-text-direction-in-myaccount}

{% endraw %}

To configure text direction for languages in My Account:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/myaccount/extensions/i18n/`.

2. Update your `meta.json` file to include the `direction` property:

    **For LTR languages (default):**

    ```json
    {
        "en-US": {
            "enabled": true,
            "code": "en-US",
            "flag": "us",
            "name": "English (United States)",
            "direction": "ltr",
            "namespaces": [
                "common",
                "myAccount",
                "extensions"
            ],
            "paths": {
                "common": "extensions/i18n/en-US/portals/common.json",
                "myAccount": "extensions/i18n/en-US/portals/myAccount.json",
                "extensions": "extensions/i18n/en-US/portals/extensions.json"
            }
        }
    }
    ```

    **For RTL languages:**

    ```json
    {
        "ar-SA": {
            "enabled": true,
            "code": "ar-SA",
            "flag": "sa",
            "name": "Arabic (Saudi Arabia)",
            "direction": "rtl",
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

3. Save the file and restart the server for changes to take effect.

{% raw %}

### Console {#configure-text-direction-in-console}

{% endraw %}

To configure text direction for languages in Console:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/console/extensions/i18n/`.

2. Update your `meta.json` file to include the `direction` property:

    **For LTR languages (default):**

    ```json
    {
        "en-US": {
            "enabled": true,
            "code": "en-US",
            "flag": "us",
            "name": "English (United States)",
            "direction": "ltr",
            "namespaces": [
                "applications",
                "users",
                ...rest of the namespaces
            ],
            "paths": {
                "applications": "extensions/i18n/ar-SA/portals/applications.json",
                "users": "extensions/i18n/ar-SA/portals/users.json",
                ...rest of the paths
            }
        }
    }
    ```

    **For RTL languages:**

    ```json
    {
        "ar-SA": {
            "enabled": true,
            "code": "ar-SA",
            "flag": "sa",
            "name": "Arabic (Saudi Arabia)",
            "direction": "rtl",
            "namespaces": [
                "applications",
                "users",
                ...rest of the namespaces
            ],
            "paths": {
                "applications": "extensions/i18n/ar-SA/portals/applications.json",
                "users": "extensions/i18n/ar-SA/portals/users.json",
                ...rest of the paths
            }
        }
    }
    ```

3. Save the file and restart the server for changes to take effect.

{% raw %}

### Authentication, Recovery & Accounts endpoints {#configure-text-direction-in-authentication-recovery-accounts-endpoints}

{% endraw %}

To configure text direction for authentication, recovery, and accounts endpoints:

1. Navigate to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/`.

2. Open the `LanguageOptions.properties` file.

3. Configure the language entry based on text direction:

    **For LTR languages (default):**

    ```properties
    lang.switch.en_US=en,English,ltr
    ```
    
    or simply (LTR is assumed if not specified):

    ```properties
    lang.switch.en_US=en,English
    ```

    **For RTL languages:**

    ```properties
    lang.switch.ar_AE=ar,Arabic - العربية,rtl
    ```

4. Save the file and restart the server for changes to take effect.

!!! tip

    The RTL/LTR configuration applies to all three endpoints (authentication, recovery, and accounts) since they share the same `LanguageOptions.properties` file.
