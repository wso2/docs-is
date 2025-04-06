# Secure app-native authentication flows

In App-Native Authentication, users input their credentials directly into the application. Hence, malicious applications mimicking the legitimate application may be able to capture user credentials. You can implement the following mechanisms to secure authentication requests.

!!! note "Before you begin"
    [Add app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) to your application.

!!! tip
    While these mechanisms are only applicable for the initial authentication request, all subsequent requests are bound to it via a unique identifier (flowId), which prevents alterations during the process.

### Using client attestation
If the application is hosted either in the Apple App Store or the Google Play Store, follow the steps below to leverage 
the attestation services provided by these platforms to verify the legitimacy of the client.

1. On the {{product_name}} Console, go to **Applications**.
2. Go to the **Advanced** tab of your application and under **Client Attestation** section, select **Enable client attestation**.
3. For **Android** applications, provide the service account credentials.
  
	![Enable client attestation]({{base_path}}/assets/img/references/enable-client-attestation.png){: width="600" style="display: block; margin: 0;"}
        
    !!! note
            Learn more about [service account credentials](https://cloud.google.com/iam/docs/service-account-creds){target="_blank"}.


5. Provide the platform-specific application details under **Platform Settings**. 

    ![Platform settings]({{base_path}}/assets/img/references/platform-settings.png){: width="600" style="display: block; margin: 0;"}

    a. **For android**:

    !!! tip
        By leveraging the Google Play Integrity API, {{product_name}} ensures a heightened level of security for Application Native Authentication. It actively detects and responds to potential threats, thereby safeguarding against attacks and mitigating the risk of abuse.
        Learn more about the [Play Integrity API](https://developer.android.com/google/play/integrity/overview).

    - Provide the package name of the application which takes the format of the reverse domain format (e.g. com.example.myapp)
	
    b. **For apple**:

    !!! tip
        By leveraging DCAppAttestService, {{product_name}} adds an extra layer of security to Application Native Authentication for iOS apps. It actively detects and responds to potential threats, safeguarding against unauthorized access and malicious activities.
        Learn more about [Apple's DeviceCheck Attest Service](https://developer.apple.com/documentation/devicecheck/dcappattestservice)

    - Provide the app ID of your application which consists of the Team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

6. Click **Update** to save the changes.

!!! tip "Using client attestation in the request"
    The client application should retrieve the attestation object (for iOS) or the integrity token (for Android) from the respective platform and pass it to {{product_name}} via the x-client-attestation header in the initial authentication request.

    === "Sample request"

        ```bash
        curl --location '{{api_base_path}}'
        --header 'x-client-attestation: <attestation_object>'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=<client_id>'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=<redirect_uri>'
        --data-urlencode 'scope=<scope>'
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location '{{api_example_base_path}}'
        --header 'x-client-attestation: eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0.O1miRMXle8A4hLH46VkxHgdU9i1-ow...'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example.com/home'
        --data-urlencode 'scope=openid profile'
        --data-urlencode 'response_mode=direct'
        ```

### Using client authentication
Confidential clients that are able to securely store a secret can make use of client authentication to secure authentication requests.

The initial authentication request is an OAuth 2.0 authorization request. Therefore,  any [supported authentication mechanism]({{base_path}}/references/app-settings/oidc-settings-for-app/#client-authentication)
for an OAuth confidential client can be used to secure this request. There are no additional configurations required to enable client authentication. The application can also initiate the request as a [Pushed Authorization Request (PAR)]({{base_path}}/guides/authentication/oidc/implement-login-with-par/).

!!! tip "Using client authentication in the request"
    The following is a sample request using client secret based authentication.

    === "Sample request"

        ```bash
        curl --location '{{api_base_path}}'
        --header 'Authorization: Basic <base64encoded(client_id:client_secret)>'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=<client_id>'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=<redirect_uri>'
        --data-urlencode 'scope=<scope>'
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location '{{api_example_base_path}}'
        --header 'Authorization: Basic WFd4N0RlVGlSNU13SGRYUk9HaUprYTpmVDlCN0RJTGZ3MWZVUmpQRVpHOG9fWFA4Q20ySFFQOEhBclJFhNYQ=='
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example.com/home'
        --data-urlencode 'scope=openid profile'
        --data-urlencode 'response_mode=direct'
        ```



