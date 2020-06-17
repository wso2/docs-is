## Authenticate to Android Sample Application

< Intro - to the Sample >

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Setup Sample


## Register Application

 < Description on sample android mobile app specific config >

{!fragments/oauth-app-config-basic.md!}


    | Field                 | Value         | 
    | --------------------- | ------------- | 
    | Service Provider Name | sample-app  |
    | Description           | This is a mobile application  | 
    | Call Back Url         | wso2sample://oauth2  | 

5. Enable following properties:
- PKCE Mandatory
- Allow authentication without the client secret

## Configure the Android SDK

To Build the SDK locally:

1. Clone this project: https://github.com/wso2-extensions/identity-sdks-android.git
    `git clone https://github.com/wso2-extensions/identity-sdks-android.git`

2. Build the library in your local maven. Run the following commands. Now the library artifact will be
 available in your local .m2 cache. 
    - `./gradlew clean assembleRelease`
    - `./gradlew publishToMavenLocal `

## Configure the sample

Clone the sample from this [sample repository](https://github.com/wso2-extensions/identity-samples-android.git)

`git clone https://github.com/wso2-extensions/identity-samples-android.git`

#### Configuration


Add the relevant configs in oidc_config.json file located in `res/raw` folder of the sample. 

- Add the client-id of the application.
- Update the {HOST_NAME}:{PORT} with the IS server's hostname and port respectively

```json
{
 "client_id": {client-id},
 "redirect_uri": "wso2sample://oauth2",
 "authorization_scope": "openid",
 "discovery_uri": "https://{HOST_NAME}:{PORT}/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```

Example:

```json
"client_id": "rs5ww91iychg9JN0DJGLMaxG2gha",
 "redirect_uri": "wso2sample://oauth2",
 "authorization_scope": "openid",
 "discovery_uri": "https://stgcloud.kubesb.com/t/example/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```


## Run Sample

### Running in an Android Emulator

1. Create a suitable Android Virtual Device in the Android Studio.

    !!! Tip 
        1. If the WSO2 IS is hosted in the local machine and if it is running in localhost domain, change the domain of the
        endpoints in the “app/res/raw/oidc_config.json” file to “10.0.2.2”. 
        Refer the documentation on [emulator-networking](https://developer.android.com/studio/run/emulator-networking)

        2. By default IS uses a self-signed certificate. If you are using the default pack without
            changing to a CA signed certificate, follow this [android guide] (https://developer.android.com
            /training/articles/security-config) to get rid of SSL issues.

        3. Change the hostname of IS as 10.0.2.2.
            - Change the hostname specified under “hostname” config
            in the “<IS_HOME>/repository/conf/deployment.toml” to 10.0.2.2
            - Create a new keystore with CN as localhost and SAN as 10.0.2.2
            ```shellscript
            keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:10.0.2.2
            ```
            - Export the public certificate (name it as wso2carbon.pem)to add into the truststore.
            ```shellscript
            keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
            ```
            - Import the certificate in the client-truststore.jks file located in <IS_HOME>/repository
            /resources/security/
            ```shellscript
            keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks
            -storepass wso2carbon
            ```
            - Now copy this public certificate (wso2carbon.pem) into the res/raw folder

2. Run the application.

3. Select the Virtual Device and test the application. 

### Running in an Android Device
1. Enable USB Debugging in the Developer Options in the Android Device. Refer documentation on [Run you App](https://developer.android.com/training/basics/firstapp/running-app).

2. If the WSO2 IS is hosted in the local machine, change the domain of the endpoints in the “app
/res/raw/oidc_config.json” file and the hostname specified under “hostname” config
 in the “<IS_HOME>/repository/conf/deployment.toml” file to the IP Address of local machine. Make sure that both the
  Android Device and the local machine is connected to the same WIFI network.

3. Connect the Android Device to the machine through a USB cable.

4. Run the application.

5. Select the Android Device as the Deployment Target.

6. Test the application.



## Login to Sample

Login with your credentials

!!! Tip "What's Next?"

    - [Enable single sign-on with another mobile application]()
    - [Enable single logout with the other mobile application]()
