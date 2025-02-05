## Use passkeys with app-native authentication

!!! tip "What is app-native authentication?"

    App-native authentication is an API-based mechanism that provides users with a seamless login experience right within the application. This eliminates the need to redirect users to an external web browser for authentication. Follow the guide to learn more about [app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/).

Passkeys support app-native authentication. This is especially useful for mobile applications to provide a seamless, passwordless login experience. Since users enter their passkeys directly within the application, iOS and Android platforms enforce mandatory validation processes to verify an application's association with the identity provider's domain. These validations ensure the authenticity of the authentication requests and help protect against credential theft by malicious actors.

{% if product_name == "WSO2 Identity Server"%}

{% if is_version == "7.0.0"%}

To successfully validate authentication requests, iOS and Android platforms require specific application details to be hosted on your domain at the following publicly accessible URLs:

- For Android - `<your_domain>/.well-known/assetlinks.json`
- For iOS - `<your_domain>/.well-known/apple-app-site-association`

When using passkeys with app-native authentication, make sure you host the required files on your domain and structure the data according to the formats expected by [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"}.

{% else %}

The validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="blank"} require specific application details to be hosted at the following publicly accessible URLs:

- For Android - `<your_domain>/.well-known/assetlinks.json`
- For iOS - `<your_domain>/.well-known/apple-app-site-association`

To facilitate this, {{product_name}} provides you with the option to publish details at the following local endpoints. 

- For Android - `<base_url>/.well-known/trusted-apps/android`

- For iOS - `<base_url>/.well-known/trusted-apps/ios`

Follow the guide below to implement this. Once implemented, ensure that these local endpoints map to the relevant publicly accessible URLs of your domain.

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. In its **Advanced** tab, under **Trusted App Settings**, select **Add as a FIDO trusted app**.

3. Under **Platform Settings**, enter the following platform-specific details.
    
    - For an Android app:

        - Provide the package name of the application which takes the reverse domain format (e.g. com.example.myapp)

        - Provide key hashes, which are SHA256 fingerprints of the app's signing certificate.
    
    - For an iOS app:

        - Provide the app ID of your application which consists of the team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

4. Click **Update** to save the changes.

{% endif %}

{% elif product_name == "Asgardeo" %}

To learn how to implement this, follow the guide that is relevant to you based on whether you are a user of Asgardeo domains or custom domains.

### For Asgardeo domains

Validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"} require details about applications to be available in the following publicly accessible URLs.

- For Android - `{{base_url}}/.well-known/assetlinks.json`

- For iOS - `{{base_url}}/.well-known/apple-app-site-association`

As an Asgardeo domain user, follow the guide below to publish details about your app.

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. In its **Advanced** tab, under **Trusted App Settings**, select **Add as a FIDO trusted app**.

3. Under **Platform Settings**, enter the following platform-specific details.
    
    - For an Android app:

        - Provide the package name of the application which takes the reverse domain format (e.g. com.example.myapp)

        - Provide key hashes, which are SHA256 fingerprints of the app's signing certificate.
    
    - For an iOS app:

        - Provide the app ID of your application which consists of the team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

4. Click **Update** to save the changes.

!!! warning "Third-party data exposure"
    
    Asgardeo publishes app details to URLs which are common to all organizations. This means your app details will reside together with the app details of other organizations. While this is not a security concern, it is important to note that other organization users may learn details about your applications through these URLs.

    If this is not desirable for your use case, you may use [custom domains]({{base_path}}/guides/branding/configure-custom-domains/) for your organization and publish app details to [custom endpoints](#for-custom-domains).

### For custom domains

Validation services of [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"} require details about applications to be available in the following publicly accessible URLs.

- For Android - `{custom_domain}/.well-known/assetlinks.json`

- For iOS - `{custom_domain}/.well-known/apple-app-site-association`

As a custom domain user, make sure you implement this by hosting details about your mobile applications according to the format expected by [iOS](https://developer.apple.com/documentation/xcode/supporting-associated-domains){target="_blank"} and [Android](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal){target="_blank"}.

{% endif %}


