## Configure Text Direction (RTL & LTR)

WSO2 Identity Server supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions. **LTR serves as the default text direction** for most languages and doesn't require explicit configuration. RTL languages like Arabic, Hebrew, and Persian automatically adjust the interface layout and content flow when configured.

!!! Note

    The text direction is not currently configurable for the **Console**.

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

!!! note "Important: Adding language resource files"

    Updating the `LanguageOptions.properties` file alone does not enable language support for JSP portals. You must also add the corresponding language resource files to the following directory:

    `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/org/wso2/carbon/identity/application/authentication/endpoint/i18n/`

    Without the language resource files, the selected language will not be functional even if configured in `LanguageOptions.properties`.

!!! tip

    The RTL/LTR configuration applies to all three endpoints (authentication, recovery, and accounts) since they share the same `LanguageOptions.properties` file.

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
