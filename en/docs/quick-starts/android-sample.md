# Authenticate an Android Sample Application

## Overview
This android sample currently supports [OpenID Connect with Authorization Code grant](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowSteps) 
using the [PKCE extension](https://tools.ietf.org/html/rfc7636)

---

## Register Application

{!fragments/register-mobile-application.md!}

---

## Set up the sample

Clone the sample from this [sample repository](https://github.com/asgardeo/asgardeo-android-oidc-sdk).

```
git clone https://github.com/asgardeo/asgardeo-android-oidc-sdk
```

### Add configurations

You need to add application configuration in your android project in order to authenticate with WSO2 Identity server using the OAuth/OpenID Connect protocol.
 
1.  Open the android application in Android Studio IDE.

2.  Open the  `oidc_config.json` file located in `res/raw` folder of the sample. 

3.  Add the client-id of the [application](#register-application).
4.  Update the {HOST_NAME}:{PORT} with the IS server's hostname and port respectively.

    ```json
    {
    "client_id": "{client-id}",
    "redirect_uri": "wso2sample://oauth2",
    "authorization_scope": "openid",
    "discovery_uri": "https://{HOST_NAME}:{PORT}/oauth2/oidcdiscovery/.well-known/openid-configuration"
    }
    ```

    Example:

    ```json
    {
    "client_id": "rs5ww91iychg9JN0DJGLMaxG2gha",
    "redirect_uri": "wso2sample://oauth2",
    "authorization_scope": "openid",
    "discovery_uri": "https://stgcloud.kubesb.com/t/example/oauth2/oidcdiscovery/.well-known/openid-configuration"
    }
    ```

---

## Run the sample

### Run in an Android emulator

1. Create a suitable Android Virtual Device in the Android Studio.

    1. If WSO2 IS is hosted in the local machine and if it is running in the `localhost` domain, change the domain of the
    endpoints in the `app/res/raw/oidc_config.json` file to 10.0.2.2. 
    For more information, see [emulator-networking](https://developer.android.com/studio/run/emulator-networking).
    
    2. By default, IS uses a self-signed certificate. If you are using the default pack without
        changing to a CA-signed certificate, follow this [android guide] (https://developer.android.com/training/articles/security-config) to get rid of SSL issues.
    
    3. Change the hostname of WSO2 IS as 10.0.2.2.
        1.  Change the hostname specified under `hostname` config in the `<IS_HOME>/repository/conf/deployment.toml` to 10.0.2.2.
        2.  Create a new keystore with CN as localhost and SAN as 10.0.2.2.
            ```shellscript
            keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:10.0.2.2
            ```
        3.  Export the public certificate (name it as wso2carbon.pem)to add into the truststore.
            ```shellscript
            keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
            ```
        4.  Import the certificate in the client-truststore.jks file located in `<IS_HOME>/repository
        /resources/security/`.
            ```shellscript
            keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks
            -storepass wso2carbon
            ```
        5.  Now copy this public certificate (wso2carbon.pem) into the  `res/raw` folder.

2. Run the application.

3. Select the virtual device and test the application. 

### Run in an Android device

1. Enable USB Debugging in the Developer Options in the Android Device. Refer documentation on [Run your App](https://developer.android.com/training/basics/firstapp/running-app).

2. If the WSO2 IS is hosted in the local machine, change the domain of the endpoints in the `app/res/raw/oidc_config.json` file and the hostname specified under `hostname` config
 in the `<IS_HOME>/repository/conf/deployment.toml` file to the IP Address of local machine. Make sure that both the
  Android Device and the local machine is connected to the same WIFI network.

3. Connect the Android Device to the machine through a USB cable.

4. Run the application.

5. Select the Android Device as the Deployment Target.

6. Test the application.

!!! info 

    To try out the sdk, follow the instructions in the .readme file in [this repository](https://github.com/asgardeo/asgardeo-android-oidc-sdk).
