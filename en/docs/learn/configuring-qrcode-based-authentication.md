# Configuring QR Code Based Authentication

With the advancement of technology and the increasing focus on the quality of user experience, some businesses tend to make a web version for their application, along with the mobile app. In these kinds of applications, a user’s mobile phone (with an active data connection) can act as a helper device to authenticate the user to access the web application by scanning the QR code displayed in the web login screen by using the scanner in the mobile app. Therefore this QR code authentication will balance the usability and security without affecting user privacy.

## Scenario

- To access a specific web application, the user is provided with the "Sign in with QR code" login option, which redirects the user to a QR code scan page provided by the Identity Server.
- To proceed with this authentication method, the user should be already logged into the mobile app of the same application, which provides a QR code scan option.
- After scanning, the user is prompted to provide biometrics for verification.
- The user is then redirected from the QR code scan page to the web application with an authenticated session.

## Set up

- [Getting Started](#getting-started)
    - [Configuring the Identity Server for Sample Mobile App](#configuring-the-identity-server-for-sample-mobile-app)
    - [Configuring the Identity Server for Sample Web App](#configuring-the-identity-server-for-sample-web-app)
    - [Configuring the Sample Mobile App](#configuring-the-sample-mobile-app)
    - [Running the Sample Mobile App](#running-the-sample-mobile-app)
        - [Running in an Android Emulator](#running-in-an-android-emulator)
        - [Running in an Android Device](#running-in-an-android-device)
    - [Configuring the Sample Web App](#configuring-the-sample-web-app)
    - [Running the Sample Web App](#running-the-sample-web-app)

## Getting Started

- Start the WSO2 Identity server. If you haven't downloaded yet, please visit https://wso2.com/identity-server/ and download the latest version of the Identity server.

- Create a service provider/ application in WSO2 IS and configure it following one of the procedures mentioned below.

### Configuring the Identity Server for Sample Mobile App

#### Adding New Service Provider

1.  Login to WSO2 IS management console from https://localhost:9443/carbon/ and navigate to the **Service Providers** tab listed under the **Identity** section.

    ![Management Console](https://user-images.githubusercontent.com/15249242/91068131-6fc2d380-e651-11ea-9d0a-d58c825bbb68.png)

2. Click **Add** to add a new service provider.

3. Provide a name for the Service Provider (ex:- sampleRN-app) and click **Register**. Now you will be redirected to the **Edit Service Provider** page.

#### Inbound Authentication Configuration

1. Expand the **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.

2. Under Allowed **Grant Types** uncheck everything except `Code` and `Refresh Token`.

3. Enter Callback URL(s) as for the following values.

   Callback Url: `wso2sample://oauth2`

> Alternatively if you're running in an emulator, you can use `http://10.0.2.2:8081` as the callback url.
4. Check **Allow authentication without the client secret**.

5. Click **Add** button to add the OAuth configurations.

6. Once the configurations are added, you will be redirected to the **Service Provider Details** page. Here, expand the **Inbound Authentication Configuration** section and click on the **OAuth/OpenID Connect Configuration**. Copy the value of `OAuth Client Key` shown here.

   ![OAuth Client Credentials](https://user-images.githubusercontent.com/15249242/91567068-27155e00-e962-11ea-8eab-b3bdd790bfd4.png)


### Configuring the Identity Server for Sample Web App

#### Adding New Service Provider

1.  Login to WSO2 IS management console from https://localhost:9443/carbon/ and navigate to the **Service Providers** tab listed under the **Identity** section.

    ![Management Console](https://user-images.githubusercontent.com/15249242/91068131-6fc2d380-e651-11ea-9d0a-d58c825bbb68.png)

2. Click **Add** to add a new service provider.

3. Provide a name for the Service Provider (ex:- sample-web-app) and click **Register**. Now you will be redirected to the **Edit Service Provider** page.

#### Inbound Authentication Configuration

1. Expand the **Inbound Authentication Configuration** section and click **Configure** under the **OAuth/OpenID Connect Configuration** section.

2. Under Allowed **Grant Types** uncheck everything except `Code` and `Refresh Token`.

3. Enter Callback URL(s) as `https://localhost:5000` (or whichever the URL your app is hosted on).

4. Check **Allow authentication without the client secret**.

5. Click **Add** button to add the OAuth configurations.

6. Once the configurations are added, you will be redirected to the **Service Provider Details** page. Here, expand the **Inbound Authentication Configuration** section and click on the **OAuth/OpenID Connect Configuration**. Copy the value of `OAuth Client Key` shown here.

#### Local and Outbound Authentication Configuration

1. Navigate to the `Local and Outbound Authentication Configuration` section of the registered Service Provider.

<img width="621" alt="Outbound auth config" src="https://user-images.githubusercontent.com/19253380/124005909-42744e00-d9f7-11eb-92ae-48b8c300410a.png">

2. Go to `Advanced Configuration` and set up the authentication flow as below.

3. Once the configuration is done, make sure to click the `Update` button to save the changes.


### Configuring the Sample Mobile App

1. Install the dependencies and generate the tar file for `asgardeo-react-native-oidc-sdk` by running the following command inside the `lib/` directory.

   ```
   npm pack
   ```

2. Add the relevant configurations to the **LoginScreen** file located at `sample/screen/LoginScreen` folder.

    - Replace the value of `clientID` with the value of `OAuth Client Key` or `Client ID` which you copied in the previous section of the documentation ([configuring the Identity Server](#configuring-the-identity-server)).

       ```TypeScript
       const config = {
          serverOrigin: 'https://{hostname}:9443',
          signInRedirectURL: 'http://{hostname}:{port}',
          clientID: 'ClientID',
          SignOutURL: "http://{hostname}:{port}"  // (Optional)
       };
       ```

      Example:

       ```TypeScript
       const config = {
          serverOrigin: 'https://10.0.2.2:9443',
          signInRedirectURL: 'wso2sample://oauth2',
          clientID: 'iMc7TiIaIFafkd5hA5xf7kGiAWUa',
          SignOutURL: "http://10.0.2.2:8081"  // (Optional)
       };
       ```

3. Install the required dependencies by running the following command inside the `sample/` directory.

   ```
   npm install
   ```

### Running the Sample Mobile App

This application can be run either in an emulator or an actual device. Some configurations may differ depending on the OS.

#### Android Setup

1. If the WSO2 IS is hosted in the local machine, you have to change the domain of the endpoints defined in `config` object at `screen/LoginScreen` file to `10.0.2.2`. Refer the documentation on [emulator-networking](https://developer.android.com/studio/run/emulator-networking). Next change the hostname of Identity server as `10.0.2.2` in the `<IS_HOME>/repository/conf/deployment.toml` file.

2. By default IS uses a self-signed certificate. If you ended up in SSL issues and are using the default pack without changing to a CA signed certificate, follow this [guide](https://developer.android.com/training/articles/security-config) to get rid of SSL issues.

3. Sometimes you may get `SSLHandshakeException` in android application since WSO2 IS is using a self-signed certificate. To fix this exception, you need to add the public certificate of IS to the sample application.

   i. Create a new keystore with CN as localhost and SAN as `10.0.2.2`.

   ```
   keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN=IP:10.0.2.2
   ```

   ii. Export the public certificate (ex: `wso2carbon.pem`) to add into the truststore.

   ```
   keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
   ```

   iii. Import the certificate in the client-truststore.jks file located in `<IS_HOME>/repository/resources/security/`.

   ```
   keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks -storepass wso2carbon
   ```

   iv. Now copy this public certificate (`wso2carbon.pem`) to the `app/src/main/res/raw` folder.

   v. Create a new file named `network_security_config.xml` in `sample/android/app/src/main/res/xml` folder and copy the below content to it. Make sure to replace `wso2carbon` with the certificate name you added.

   ```xml
   <?xml version="1.0" encoding="utf-8"?>
      <network-security-config>
         <domain-config cleartextTrafficPermitted="true">
            <domain includeSubdomains="true">localhost</domain>
            <domain includeSubdomains="true">10.0.2.2</domain>
               <trust-anchors>
                     <certificates src="@raw/wso2carbon"/>
               </trust-anchors>
            <domain includeSubdomains="true">192.168.43.29</domain>
            <base-config cleartextTrafficPermitted="true"/>
         </domain-config>
      </network-security-config>
   ```

   vi. Then add the following config to the `sample/android/app/src/main/AndroidManifest.xml` file under `application` section.

   ```xml
   android:networkSecurityConfig="@xml/network_security_config"
   ```

   Now the `AndroidManifest.xml` file should look like below.
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
      <manifest ... >
         <application
           android:networkSecurityConfig="@xml/network_security_config"
           ...
         >
            ...
         </application>
      </manifest>
   ```

#### Running in an Android Emulator

1. Create a suitable Android virtual device using the **Android virtual device manager (AVD Manager)** and launch it.

2. Build and deploy the apps by running the following command at the root directory.

   ```bash
   react-native run-android
   ```

#### Running in an Android Device

1. Enable **Debugging over USB** and plug in your device via USB.

2. Build and deploy the apps by running the following command at the root directory.

   ```bash
   react-native run-android
   ```

> If you're running in a development or debugging mode, start the Metro by running the following command.
```bash
react-native start
```

### Configuring the Sample Web App

1. Install the auth-react library from the npm registry.

```
npm install --save @asgardeo/auth-react
```

2. Update configuration file `src/config.json` with your registered app details.

**Note:** You will only have to paste in the `clientID`(**OAuth Client Key**) generated for the application you registered.

```json
{
    "clientID": "uq3OFqKaJeU5BFjCWIaBkz6Vv4ca",
    "serverOrigin": "https://192.168.1.4:9443",
    "signInRedirectURL": "https://localhost:5000",
    "signOutRedirectURL": "https://localhost:5000"
}
```

3. Build and deploy the apps by running the following command at the root directory.

```bash
npm install && npm start
```

### Running the Sample Web App

Navigate to [`https://localhost:5000`](https://localhost:5000) (or whichever the URL you have hosted the sample app).


