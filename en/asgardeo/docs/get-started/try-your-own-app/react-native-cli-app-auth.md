# Integrate Asgardeo with your React Native App CLI

The following guide walks you through integrating Asgardeo with your React Native mobile application using the React Native CLI. With {{product_name}}, your app can securely authorize and authenticate users via OAuth 2.0 and OpenID Connect.

This integration uses the [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth){:target="_blank"} library, a production-ready library that handles OAuth 2.0 and OpenID Connect for React Native applications and provides:

- Secure token management.
- Protected routes.
- Type-safe development with TypeScript.

## Prerequisites

Make sure to install the required tools and set up your development environment:

=== "Android"

    - [Node.js v20+](https://nodejs.org/en/download/package-manager){:target="_blank"} installed in your local environment.

    - React Native development environment. Follow the guide to set it up for [Android](https://reactnative.dev/docs/environment-setup?platform=android){:target="_blank"}.

    - Android Studio with Android SDK.

=== "iOS"

    - [Node.js v20+](https://nodejs.org/en/download/package-manager){:target="_blank"} installed in your local environment.

    - React Native development environment. Follow the guide to set it up for [iOS](https://reactnative.dev/docs/environment-setup?platform=ios){:target="_blank"}.

    - Xcode 12.5 or newer.

## Step 1: Set up your Asgardeo environment

Before integrating Asgardeo with your React Native app, set up the following in your Asgardeo organization:

- **Register a mobile application** - Your application must have app-specific credentials to interact with Asgardeo. You can get these credentials by registering an application on the {{product_name}} Console. Follow the guide and [register a mobile application in Asgardeo]({{base_path}}/guides/applications/register-mobile-app/).

- **Create a user** - You also need a user in your Asgardeo organization to log into your application. Follow the guide and [onboard a user]({{base_path}}/guides/users/manage-users/#onboard-users) to your {{product_name}} organization.

## Step 2: Create a React Native application

Use the React Native CLI and create a new React Native project:

```bash
npx @react-native-community/cli@latest init AsgardeoReactNativeApp
cd AsgardeoReactNativeApp
```

!!! tip "Correctly name your React Native project"

    When creating a React Native app using the React Native CLI, make sure your project name contains **only alphabetical characters** (no numbers, hyphens, underscores, or any special characters).
    
    - **Valid** <span style="color:green;">&#10004;</span> : AsgardeoReactNativeApp, ReactNativeAuthApp (PascalCase recommended)
    - **Invalid** <span style="color:red;">&#10006;</span>: reactnative-app-auth-cli, reactnative_app_auth, reactnative123

    React Native CLI uses the project name as a module identifier in native code (Java/Kotlin for Android and Objective-C/Swift for iOS), which requires valid programming language identifiers that start with a letter.

## Step 3: Install dependencies

Inside your React Native project directory, install the necessary libraries for authentication, secure storage, and navigation.

- Install the npm packages:

    ```bash
    npm install react-native-app-auth rn-secure-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context buffer
    ```

    ??? note "Details on installed dependencies"

        <table>
           <thead>
              <tr>
                 <th style="width: 35%">Dependency</th>
                 <th style="width: 65%">Description</th>
              </tr>
           </thead>
           <tbody>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/react-native-app-auth" target="_blank">react-native-app-auth</a></td>
                 <td>A production-ready library that implements OAuth 2.0 and OpenID Connect authentication flows for React Native applications. It wraps the native AppAuth-iOS and AppAuth-Android SDKs to provide secure, standards-compliant authentication.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/rn-secure-storage" target="_blank">rn-secure-storage</a></td>
                 <td>Provides secure storage capabilities for sensitive data such as access tokens, ID tokens, and refresh tokens. It uses platform-specific secure storage features (iOS Keychain on iOS and EncryptedSharedPreferences on Android) to ensure safe storage of credentials on the device.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/@react-navigation/native" target="_blank">@react-navigation/native</a></td>
                 <td>A navigation library for React Native that enables seamless navigation between screens in your app. It supports gestures, animations, and extensive customization. Required to implement navigation in your mobile app.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/@react-navigation/native-stack" target="_blank">@react-navigation/native-stack</a></td>
                 <td>Provides native stack navigation with smooth transitions and platform-specific animations. It uses native navigation primitives for optimal performance on both iOS and Android.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/react-native-screens" target="_blank">react-native-screens</a></td>
                 <td>Improves screen rendering performance by using native screen containers. Required for native stack navigation.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/react-native-safe-area-context" target="_blank">react-native-safe-area-context</a></td>
                 <td>Provides safe area insets information for handling device-specific screen layouts such as notches, rounded corners, and system UI elements. This ensures your app content displays correctly on all devices.</td>
              </tr>
              <tr>
                 <td style="white-space: nowrap"><a href="https://www.npmjs.com/package/buffer" target="_blank">buffer</a></td>
                 <td>A Node.js Buffer implementation for React Native. Required for decoding Base64-encoded JWT tokens (ID tokens) to extract user information in the mobile environment.</td>
              </tr>
          </tbody>
        </table>

- (iOS only) Install CocoaPods dependencies

    ```bash
    cd ios
    bundle install
    bundle exec pod install
    cd ..
    ```

## Step 4: Configure deep linking

Deep linking allows your app to handle custom URLs, which is required for OAuth 2.0 flows. After a user completes authentication in the browser, {{product_name}} redirects them back to the app using a deep link (e.g. `myapp://oauth2`).

To ensure users are redirected correctly, configure deep linking for both Android and iOS platforms.

=== "Android"

    Open the `android/app/build.gradle` file and add the following inside the `android` block:

    ```gradle
    android {
        defaultConfig {
            applicationId "com.asgardeoreactnativeapp"
            minSdkVersion 24  // Required for rn-secure-storage v3
            targetSdkVersion 34

            // Configure OAuth redirect scheme
            manifestPlaceholders = [
                appAuthRedirectScheme: 'myapp'
            ]
        }
    }
    ```  

=== "iOS"

    - Open the `ios/AsgardeoReactNativeApp/Info.plist` file and add the following inside the `<dict>` tag to configure deep linking:

        ```xml
        <key>CFBundleURLTypes</key>
        <array>
            <dict>
                <key>CFBundleURLSchemes</key>
                <array>
                    <string>myapp</string>
                </array>
            </dict>
        </array>
        ```

    - After adding this, reinstall iOS pods:
     
        ```bash
        cd ios && bundle exec pod install && cd ..
        ```

!!! note

    The `myapp` URL scheme must match what you configured in the {{product_name}} Console as the authorized redirect URL (e.g., `myapp://oauth2`).

## Step 5: Create a configuration file

Your React Native app needs to know your Asgardeo organization details to interact with it. Follow the steps below to create a configuration file in your React Native project.

1. Create the `src/config.ts` file to store configurations and add the following: (You will define the actual values as environment variables in the next step.)

    ```typescript
    import { ASGARDEO_ISSUER, ASGARDEO_CLIENT_ID, ASGARDEO_REDIRECT_URL, ASGARDEO_POST_LOGOUT_REDIRECT_URL } from '@env';

    export const config = {
      issuer: ASGARDEO_ISSUER,
      clientId: ASGARDEO_CLIENT_ID,
      redirectUrl: ASGARDEO_REDIRECT_URL,
      scopes: ['openid', 'profile'],
      postLogoutRedirectUrl: ASGARDEO_POST_LOGOUT_REDIRECT_URL,
    };
    ```

    - **issuer** - API endpoint that issues tokens upon request.
    - **clientId** - The Client ID of your application.
    - **redirectUrl** - After successful login, Asgardeo redirects the user to the redirect URL of your app.
    - **scopes** - Scopes needed for requesting user information. The `openid` scope is mandatory to get the ID token. You can add other OIDC scopes such as `profile` and `email`.
    - **postLogoutRedirectUrl** - After logout, Asgardeo redirects the user to the postLogoutRedirectUrl of your app.

2. Create a `.env` file in your project root and enter the actual details of your Asgardeo environment:

    ```bash
    ASGARDEO_ISSUER=https://api.asgardeo.io/t/<organization-name>/oauth2/token
    ASGARDEO_CLIENT_ID=<clientID>
    ASGARDEO_REDIRECT_URL=myapp://oauth2
    ASGARDEO_POST_LOGOUT_REDIRECT_URL=myapp://oauth2
    ```

    - Replace `<organization-name>` with your {{product_name}} organization name and `<clientID>` with the Client ID of your registered application.
    - Replace the redirect URLs with the ones you configured in the {{product_name}} Console.

## Step 6: Develop the application

This section explains how to create the authentication context, login screen, and dashboard screen for your React Native app.

### Step 6.1: Authentication context

To manage the user’s authentication state across your app, create a dedicated authentication context. This context provides a central place to track whether the user is logged in and to update the login state throughout the app.

To do so, create the `src/contexts/UserContext.tsx` file and add the following:

```typescript
import { createContext, Dispatch, SetStateAction } from 'react';

export const UserContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: (_isSignedIn: SetStateAction<boolean>) => null,
});
```

### Step 6.2: Login screen

The login screen allows users to authenticate with {{product_name}} using OAuth 2.0. This section shows how to start the authorization flow, handle the response securely, and update the app’s authentication state when the user successfully signs in.

To do so, create the `src/views/HomeScreen.tsx` file and add the following:

```typescript
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { authorize } from 'react-native-app-auth';
import RNSecureStorage from 'rn-secure-storage';
import { config } from '../config';
import { UserContext } from '../contexts/UserContext';

export const HomeScreen = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      
      // Initiate OAuth 2.0 authorization flow
      const result = await authorize(config);
      
      // Securely store tokens
      await RNSecureStorage.setItem(
        'authorizeResponse', 
        JSON.stringify(result), 
        { accessible: 'AccessibleWhenUnlocked' }
      );
      
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Authentication failed:', error);
      Alert.alert('Authentication Failed', 'Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Your return code
  );
};
```

### Step 6.3: Dashboard screen

The dashboard screen displays user information retrieved from the authentication response. It also provides a way to securely log out, clearing stored tokens and ending the user session with {{product_name}}.

To do so, create the `src/views/DashboardScreen.tsx` file and add the following:

```typescript
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { logout } from 'react-native-app-auth';
import RNSecureStorage from 'rn-secure-storage';
import { config } from '../config';
import { UserContext } from '../contexts/UserContext';
import { Buffer } from 'buffer';

export const DashboardScreen = () => {
  const { setIsLoggedIn } = useContext(UserContext);
  const [authResponse, setAuthResponse] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Retrieve stored authentication response
    RNSecureStorage.getItem('authorizeResponse')
      .then((res: any) => {
        if (res) {
          const response = JSON.parse(res);
          setAuthResponse(response);
          
          // Decode JWT ID token
          if (response?.idToken) {
            const base64Url = response.idToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
            setUserInfo(JSON.parse(jsonPayload));
          }
        }
      })
      .catch((err: any) => console.error('Error retrieving auth response:', err));
  }, []);

  const signOut = async () => {
    if (!authResponse?.idToken) {
      setIsLoggedIn(false);
      return;
    }

    try {
      await logout(config, {
        idToken: authResponse.idToken,
        postLogoutRedirectUrl: config.postLogoutRedirectUrl,
      });

      await RNSecureStorage.removeItem('authorizeResponse');
      setIsLoggedIn(false);
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Logout Failed', 'Unable to sign out.');
    }
  };

  return (
    // Your return code
  );
};
```

### Step 6.4: App component

The main App.tsx component sets up navigation between the login (Home) and dashboard screens based on the user’s authentication state. Using React Context and React Navigation, the app can dynamically switch screens when the user logs in or out.

To do so, update the `App.tsx` file as follows:

{% raw %}

```typescript
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './src/contexts/UserContext';
import { DashboardScreen } from './src/views/DashboardScreen';
import { HomeScreen } from './src/views/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
```

{% endraw %}

## Step 7: Run the application

Now that you have developed the React Native app and integrated it with Asgardeo, you can run it by following the steps below:

1. In React Native projects, the Metro Bundler compiles your JavaScript code and serves it to the app. It also watches for file changes and enables hot reloading during development. Start it with:

    ``` bash
    npm start
    ```

2. In a separate terminal, run the app:

    === "Android"

        ```bash
        npm run android
        ```

    === "iOS"

        ```bash
        npm run ios
        ```

## Step 8: Try it out

Once the app is running on your device or emulator, follow the steps below to test the authentication flow:

1. Launch the app on your device or emulator.
![Launch the app]({{base_path}}/assets/img/get-started/hero-page.png){: width="250" style="display: block; margin: 0;"}

2. Tap the **Sign In** button.

    <div style="display: flex; gap: 20px; align-items: center; justify-content: flex-start; flex-wrap: wrap;">
        <img src="{{base_path}}/assets/img/get-started/sign-in.png" alt="Sign In page" width="250" style="display: block;">
        <img src="{{base_path}}/assets/img/get-started/example-sign-in.png" alt="Enter the credentials" width="250" style="display: block;">
    </div>

3. The device browser opens showing the {{product_name}} login page. Enter your credentials and sign in

4. The app redirects to the dashboard showing your user information.
![Dashboard page]({{base_path}}/assets/img/get-started/dashboard-page.png){: width="250" style="display: block; margin: 0;"}

5. Tap **Sign Out** to return to the login screen.
