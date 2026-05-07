Before the push authenticator app can send or receive notifications, three external systems must be configured: the push delivery service (Firebase or APNs), the Apple Developer account (for iOS), and the {{product_name}} push provider.

## Firebase Cloud Messaging (FCM)

FCM is required for Android push notifications and optionally for iOS.

### Step 1: Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**.
2. Follow the setup wizard to create or select a project.

### Step 2: Add your Android and iOS apps

In **Project Settings > General**, add an Android app and an iOS app. Note the package name / bundle ID — these must match the values in your Flutter project.

### Step 3: Generate configuration files

Choose one of the following methods to generate your Firebase configuration files.

#### Option A (recommended) — FlutterFire CLI

The FlutterFire CLI registers your apps, downloads `google-services.json` and `GoogleService-Info.plist`, and generates `firebase_options.dart` in a single command.

```bash
npm install -g firebase-tools
firebase login

dart pub global activate flutterfire_cli
flutterfire configure
```

!!! tip
    Official guide: [FlutterFire CLI](https://firebase.flutter.dev/docs/cli)

#### Option B — Manual

1. Download `google-services.json` from Firebase Console and place it in `android/app/`.
2. Download `GoogleService-Info.plist` and add it to your Xcode project:
    1. Place the file in `ios/Runner/`.
    2. Open `ios/Runner.xcworkspace` in Xcode.
    3. Right-click **Runner** → **Add Files to "Runner"...**, select the plist file, and ensure the Runner target is checked.
3. Copy the example options file and fill in your project values:

   ```bash
   cp lib/firebase_options.dart.example lib/firebase_options.dart
   ```

### Step 4: Upload your APNs authentication key to Firebase (iOS only)

For FCM to deliver push notifications to iOS devices, it needs your APNs authentication key.

!!! note
    Complete the [Apple Developer Account](#apple-developer-account-ios) section first to generate your `.p8` APNs key, Key ID, and Team ID.

1. In Firebase Console, go to **Project Settings > Cloud Messaging**.
2. Under **Apple app configuration**, upload your `.p8` APNs key file.
3. Enter the **Key ID** and your **Team ID**.

!!! tip
    Official guide: [Set up APNs with FCM](https://firebase.google.com/docs/cloud-messaging/ios/certs)

---

## Apple Developer Account (iOS)

iOS push notifications require a registered App ID with the Push Notifications capability, a provisioning profile, and an APNs authentication key.

!!! important
    End-to-end push notification testing on iOS requires a **physical device**, though UI testing can be simulated.

### Step 1: Create an App ID with Push Notifications

1. Sign in to the [Apple Developer Portal](https://developer.apple.com/account/).
2. Go to **Certificates, Identifiers & Profiles > Identifiers > +**.
3. Select **App IDs**, then **App**.
4. Enter a description and your **Bundle ID** (must match your Flutter project and Firebase configuration).
5. Under **Capabilities**, check **Push Notifications**.
6. Click **Continue > Register**.

### Step 2: Register your test device

1. Go to **Devices > +**.
2. Enter the device name and UDID.
   - To find the UDID: connect the device, open Finder, click the device, then click the serial number to reveal the UDID.

### Step 3: Create a provisioning profile

1. Go to **Profiles > +**.
2. Select **iOS App Development > Continue**.
3. Select your **App ID**, **Certificate**, and **Devices**.
4. Download and install the `.mobileprovision` file (double-click or drag into Xcode).

### Step 4: Generate an APNs authentication key

1. Go to **Keys > +**.
2. Enter a key name and check **Apple Push Notifications service (APNs)**.
3. Click **Continue > Register**, then **Download** the `.p8` file.
4. Note the **Key ID** and your **Team ID** — you will need these for Firebase (Step 4 above) or for configuring Amazon SNS.

!!! important
    You can only download the `.p8` file once. Store it securely.

---

## Server-side Push Provider Configuration

The {{product_name}} server must be configured with a push notification provider before it can deliver notifications to your app.

Refer to the official guide for step-by-step instructions: [Configure Push Provider]({{base_path}}/guides/notification-channels/configure-push-provider/).
