# Authenticate to Android Sample Application

## Overview
This android sample currently supports:

- [OpenID Connect with Authorization Code grant](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowSteps) 
using the [PKCE extension](https://tools.ietf.org/html/rfc7636)

## Setup the sample

1. Download the [android sample](https://github.com/wso2-extensions/identity-samples-android/archive/master.zip) and
 Unzip it.
 
2. Open the sample in Android Studio IDE.


### Configuration

You need to add application configuration in your android project in order to authenticate with WSO2 Identity server
 using OAuth/OpenID Connect protocol.
 
Open the  `oidc_config.json` file located in `res/raw` folder of the sample. 

Add the **client-id**  of the application. To get the client-id
  - Click **Access** and Open **OIDC**.
  - Copy **Client ID**

Update the {HOST_NAME} and {tenant-domain} with your the hostname and tenantdomain. You can find that at the
 developer-portal's url

```json
{
 "client_id": "{client-id}",
 "redirect_uri": "wso2sample://oauth2",
 "authorization_scope": "openid",
 "discovery_uri": "https://{HOST_NAME}/t/{tenant-domain}/oauth2/oidcdiscovery/.well-known/openid-configuration"
}
```

## Run Sample

### Running in an Android Emulator
1. Create a suitable Android Virtual Device in the Android Studio.

2. Run the application.


### Running in an Android Device
1. Enable USB Debugging in the Developer Options in the Android Device. Refer documentation on [Run your App](https://developer.android.com/training/basics/firstapp/running-app).

2. Connect the Android Device to the machine through a USB cable.

3. Run the application.

4. Select the Android Device as the Deployment Target.

5. Test the application.
