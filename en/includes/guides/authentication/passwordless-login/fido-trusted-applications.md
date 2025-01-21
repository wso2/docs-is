## Make application a FIDO trusted app

If you wish to integrate passkeys into a mobile application using [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/), you must validate your application through the validation services provided by the respective platform (iOS or Android). This validation involves associating your application with the identity provider's domain. This association verifies that the authentication requests originate from a legitimate application, protecting against malicious attempts to steal credentials.

{% if product_name == "WSO2 Identity Server" %}

By following this guide, you enable {{product_name}} to host details about your applications in the following endpoints:

- For Android - `{{base_url}}/.well-known/trusted-apps/android`

- For iOS - `{{base_url}}/.well-known/trusted-apps/ios`

The validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="blank"} require application details to be available at the following URLs on your domain,

- For Android - `{your_domain}/.well-known/assetlinks.json`
- For iOS - `{your_domain}/.well-known/apple-app-site-association`

Therefore, make sure these paths of your domain are mapped to the corresponding local endpoints of {{product_name}}.

!!! note

    While not a security concern, it is still important to note that details about your applications are publicly accessible through the endpoints.

    Due to this behavior, you may configure {{product_name}} to display a consent screen for administrators who are attempting to make an application a FIDO trusted app. To do so, add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory.
    
    ```bash
    [application_mgt]
    trusted_app_consent_required=true
    ```
    Once configured, a confirmation popup will appear when enabling the feature and this consent will be recorded and published as an audit log.

To publish app details to the endpoints,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. In its **Advanced** tab, under **Trusted App Settings**, select **Add as a FIDO trusted app**.

3. Under **Platform Settings**, enter the following platform-specific details.
    
    - For an Android app:

        - Provide the package name of the application which takes the reverse domain format (e.g. com.example.myapp)

        - Provide key hashes, which are SHA256 fingerprints of the app's signing certificate.
    
    - For an iOS app:

        - Provide the app ID of your application which consists of the team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

4. Click **Update** to save the changes.


{% elif product_name == "Asgardeo" %}
To learn how to implement this, follow the relevant guide based on whether you use Asgardeo domains or custom domains in your organization 

### For Asgardeo domains

It is required by the validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"} to have details about the application exposed in a public URL. As an Asgardeo domain user, this guide explains how you may publish details about your app to one of the following endpoints of Asgardeo based on the platform.

- For Android - `{{base_url}}/.well-known/assetlinks.json`

- For iOS - `{{base_url}}/.well-known/apple-app-site-association`

!!! warning "Third-party data exposure"
    
    Asgardeo publishes app details to URLs which are common to all organizations. This means your app details will reside together with the app details of other organizations. While this is not a security concern, it is important to note that other organization users may learn details about your applications through these URLs.

    If this is not desirable for your use case, you may use [custom domains]({{base_path}}/guides/branding/configure-custom-domains/) for your organization and publish app details to [custom endpoints](#for-custom-domains).

To publish app details to an Asgardeo endpoint,

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. In its **Advanced** tab, under **Trusted App Settings**, select **Add as a FIDO trusted app**.

3. Under **Platform Settings**, enter the following platform-specific details.
    
    - For an Android app:

        - Provide the package name of the application which takes the reverse domain format (e.g. com.example.myapp)

        - Provide key hashes, which are SHA256 fingerprints of the app's signing certificate.
    
    - For an iOS app:

        - Provide the app ID of your application which consists of the team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

4. Click **Update** to save the changes.

### For custom domains

It is required by the validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"} to have details about the application exposed in a public URL. As a custom domain user, you are required to facilitate this by hosting details about your mobile applications in the following endpoints.

- For Android - `{custom_domain}/.well-known/assetlinks.json`

- For iOS - `{custom_domain}/.well-known/apple-app-site-association`

Make sure the data is in the format expected by the validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"}. 
{% endif %}
