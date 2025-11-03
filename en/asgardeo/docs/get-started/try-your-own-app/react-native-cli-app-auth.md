# Integrate Asgardeo with your React Native App CLI

A comprehensive React Native application demonstrating OAuth 2.0 and OpenID Connect authentication implementation using [Asgardeo](https://wso2.com/asgardeo/){:target="_blank"}. Features include secure token management, protected routes, and TypeScript support.

Follow the steps given below to authenticate users to your React Native mobile application with OpenID Connect using [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth){:target="_blank"}, a production-ready library that implements OAuth 2.0 and OpenID Connect authentication flows for React Native apps.

## Prerequisites

- [Node.js v20+](https://nodejs.org/en/download/package-manager){:target="_blank"} installed in your local environment.
- React Native development environment set up for [iOS](https://reactnative.dev/docs/environment-setup?platform=ios){:target="_blank"} and/or [Android](https://reactnative.dev/docs/environment-setup?platform=android){:target="_blank"}.
- Android Studio with Android SDK (for Android development).
- Xcode 12.5 or newer (for iOS development on macOS).

!!! note
    This guide uses React Native CLI (not Expo) as native modules are required for secure authentication.

!!! warning "Project naming convention when using React Native CLI"
    When creating a React Native app using the React Native CLI, the framework enforces strict naming conventions for project identifiers. Project names must contain **only alphabetical characters** (no numbers, hyphens, underscores, or any special characters). If you use a name like `reactnative-app-auth-cli`, `reactnative_app_auth`, or `reactnative123`, you will encounter an error: **"is not a valid name for a project. Please use a valid identifier name (alphanumeric)"**. This is because React Native CLI uses the project name as a module identifier in native code (Java/Kotlin for Android and Objective-C/Swift for iOS), which requires valid programming language identifiers that start with a letter. Use names like `AsgardeoReactNativeApp` or `ReactNativeAuthApp` instead (using PascalCase is recommended).

## Create an Asgardeo application and a user

To integrate Asgardeo with your mobile app, you first need to create an application on the Asgardeo console and obtain app-specific credentials. Follow the comprehensive guide in the [Asgardeo documentation to create an application]({{base_path}}/guides/applications/register-mobile-app/){:target="_blank"}.

You also need to have a user in your organization to log into your app using Asgardeo. Create a user in your Asgardeo organization by following [these steps]({{base_path}}/guides/users/manage-users/#onboard-users){:target="_blank"}.

## Create a React Native application

Create a new React Native project using the React Native CLI:

```bash
npx @react-native-community/cli@latest init AsgardeoReactNativeApp
cd AsgardeoReactNativeApp
```

## Install dependencies

Install the required libraries for authentication, navigation, and secure storage:

```bash
npm install react-native-app-auth rn-secure-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context buffer
```

The following table describes the purpose of each dependency:

<table>
   <thead>
      <tr>
         <th style="width: 35%">Dependency</th>
         <th style="width: 65%">Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td style="white-space: nowrap"><code>react-native-app-auth</code></td>
         <td>A production-ready library that implements OAuth 2.0 and OpenID Connect authentication flows for React Native applications. It wraps the native AppAuth-iOS and AppAuth-Android SDKs to provide secure, standards-compliant authentication.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>rn-secure-storage</code></td>
         <td>Provides secure storage capabilities for sensitive data such as access tokens, ID tokens, and refresh tokens. It uses platform-specific secure storage features (iOS Keychain on iOS and EncryptedSharedPreferences on Android) to ensure credentials are stored safely on the device.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>@react-navigation/native</code></td>
         <td>A navigation library for React Native that enables seamless navigation between screens in your app. It supports gestures, animations, and extensive customization. This is the core package required for implementing navigation in your mobile app.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>@react-navigation/native-stack</code></td>
         <td>Provides native stack navigation with smooth transitions and platform-specific animations. It uses native navigation primitives for optimal performance on both iOS and Android.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>react-native-screens</code></td>
         <td>Optimizes screen rendering performance by using native screen containers. This is required for native stack navigation to function correctly.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>react-native-safe-area-context</code></td>
         <td>Provides safe area insets information for handling device-specific screen layouts such as notches, rounded corners, and system UI elements. This ensures your app content is displayed correctly on all devices.</td>
      </tr>
      <tr>
         <td style="white-space: nowrap"><code>buffer</code></td>
         <td>A Node.js Buffer implementation for React Native. Required for decoding Base64-encoded JWT tokens (ID tokens) to extract user information in the mobile environment.</td>
      </tr>
   </tbody>
</table>

For iOS, install CocoaPods dependencies:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

## Configure deep linking

Deep linking allows your mobile app to handle custom URL schemes, which is essential for OAuth 2.0 authentication flows. When users complete authentication in the browser, {{product_name}} redirects them back to your app using a deep link (e.g., `myapp://oauth2`). Without proper deep linking configuration, the OAuth flow cannot complete, and users will remain stuck in the browser after authentication. Configure platform-specific deep linking to enable this redirect mechanism.

### Android configuration

Edit `android/app/build.gradle`:

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

### iOS configuration

Edit `ios/AsgardeoReactNativeApp/Info.plist` and add URL scheme configuration:

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

After adding this, reinstall iOS pods:

```bash
cd ios && bundle exec pod install && cd ..
```

!!! note
    The URL scheme `myapp` must match what you configured in the {{product_name}} console as the authorized redirect URL (e.g., `myapp://oauth2`).

## Create configuration file

Create `src/config.ts` to store your {{product_name}} credentials:

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

Here is a short description of each config value:

- **issuer** - API endpoint that issues tokens upon request.
- **clientId** - The Client ID of your {{product_name}} app.
- **redirectUrl** - The URL to which the app redirects to after user login.
- **scopes** - The list of OIDC scopes that are used for requesting user information. The `openid` scope is mandatory to get the ID token. You can add other OIDC scopes such as `profile` and `email`.
- **postLogoutRedirectUrl** - The URL which the app redirects to after user is logged out.

Create a `.env` file in your project root with your {{product_name}} credentials:

```bash
ASGARDEO_ISSUER=https://api.asgardeo.io/t/<your-organization-name>/oauth2/token
ASGARDEO_CLIENT_ID=<your-client-id>
ASGARDEO_REDIRECT_URL=myapp://oauth2
ASGARDEO_POST_LOGOUT_REDIRECT_URL=myapp://oauth2
```

Replace `<your-organization-name>` with your {{product_name}} organization name and `<your-client-id>` with the Client ID from your registered application.

## Create authentication context

Create `src/contexts/UserContext.tsx` to manage authentication state:

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

## Implement login screen

Create `src/views/HomeScreen.tsx`:

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

## Implement dashboard screen

Create `src/views/DashboardScreen.tsx` to display user information:

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

## Update main App component

Update `App.tsx` to implement navigation:

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

## Run the application

Start the Metro bundler:

```bash
npm start
```

The Metro bundler is React Native's JavaScript bundler that compiles your code and serves it to your app. It runs as a persistent process that watches for file changes and provides hot reloading during development.

In a separate terminal, run the app:

**For Android:**

```bash
npm run android
```

**For iOS:**

```bash
npm run ios
```

## Test authentication

1. Launch the app on your device or emulator
2. Tap the **Sign In** button
3. The device browser opens showing the {{product_name}} login page
4. Enter your credentials and sign in
5. The app redirects to the dashboard showing your user information
6. Tap **Sign Out** to return to the login screen
