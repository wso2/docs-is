# Connect Asgardeo as an OIDC attribute provider for verifiable credentials (VC) with MATTR

Verifiable credentials are a digitalized representation of paper-based credentials and can be stored in a digital wallet. These credentials can be cryptographically verified, making them more tamper-evident (i.e., it provides clear evidence if the credential has been tampered with) and more secure than their physical forms.

It allows the holder to own, control, and manage the credentials and to address several issues in traditional verification systems like paper-based verification, physical inspections, etc.

If you or your organization are already managing user accounts in an OpenID Connect (OIDC) attribute provider (such as Asgardeo), you can use OIDC login to share user attributes to offer verifiable credentials.

This tutorial explains how this is done using MATTR and Asgardeo, where MATTR acts as a decentralized identity management platform for issuing verifiable credentials, management, and verification, while Asgardeo acts as the OIDC identity provider. Given below are the high-level steps you will follow:

1. Configuring MATTR to connect to Asgardeo with OpenID Connect.
2. Issuing verifiable credentials to the MATTR Wallet.
3. Verifying credentials presented by the Wallet holder.

## Step 1: Connect MATTR to Asgardeo with OIDC

Follow the instructions below to begin.

### Step 1.1: Register an application in Asgardeo

To register your application in Asgardeo:

1. Go to your organization from the [Asgardeo Console](https://console.asgardeo.io/).

2. Create an OIDC application by navigating to **Applications**, clicking **+New Application**, and selecting **Traditional Web Application**.

3. Provide a name for the application and select the **OpenID Connect** protocol.

4. Add a placeholder value for the **Authorized redirect URL**.

    !!! note
        You will update this later when you configure MATTR and create a credential issuer.

5. Click **Register** to complete the registration.

6. Take note of the **client ID** and **client secret** from the application details.

    !!! note
        You will need these credentials to configure the MATTR credential issuer later.

7. Navigate to the **Info** tab and take note of the **Token URL**.

8. Navigate to the **User Attributes** tab.

9. Select the mandatory user attributes you need to offer with the verifiable credential (for example, Email, First Name, Last Name, and Date of Birth).

10. Click **Update** to save the changes.

### Step 1.2: Create a user account in Asgardeo

If you currently do not have any users in your Asgardeo organization, follow the instructions below to create a new user account.

1. On the Asgardeo Console, navigate to **User Management** > **Users**.

2. Click **+ Add User** and provide the required details.

This user will log in to Asgardeo to obtain verifiable credentials for the MATTR Wallet.

### Step 1.3: Set up MATTR account

Follow the steps given below.

1. Navigate to `https://mattr.global/` and create a MATTR account.

2. Take note of your **client ID**, **client secret**, **tenant URL**, **auth URL**, and **audience**.

    !!! note
        From now on, let's refer to the MATTR client ID as `<MATTR_CLIENT_ID>`, its client secret as `<MATTR_CLIENT_SECRET>`, its auth URL as `<MATTR_AUTH_URL>`, its audience as `<MATTR_AUDIENCE>`, and its tenant URL as `<TENANT_URL>`.

### Step 1.4: Get an access token for MATTR

Obtain an access token for the MATTR tenant by sending the following request:

!!! note
    This example uses a cURL command to send the request.

```bash
curl -i -X POST "<MATTR_AUTH_URL>/oauth/token" \
-H "Content-Type: application/json" \
-d '{ 
    "client_id": "<MATTR_CLIENT_ID>",
    "client_secret": "<MATTR_CLIENT_SECRET>",
    "audience": "<MATTR_AUDIENCE>", 
    "grant_type": "client_credentials" 
}'
```

!!! note
    From now on, let's refer to the value of the `access_token` parameter in the response as `<BEARER_TOKEN>`.

### Step 1.5: Configure MATTR authentication provider

Set up a MATTR VII Authentication provider to connect with Asgardeo:

```bash
curl -i -X POST "<TENANT_URL>/v1/users/authentication-providers" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
    "url": "<ASGARDEO_TOKEN_URL>",
    "scope": ["openid", "profile", "email"],
    "clientId": "<ASGARDEO_CLIENT_ID>",
    "clientSecret": "<ASGARDEO_CLIENT_SECRET>",
    "tokenEndpointAuthMethod": "client_secret_post",
    "staticRequestParameters": {
        "prompt": "login",
        "maxAge": 10000
    }
}'
```

Replace the placeholders with your actual values:

- `<ASGARDEO_TOKEN_URL>`: The token endpoint from your Asgardeo application.
- `<ASGARDEO_CLIENT_ID>`: The client ID from your Asgardeo application.
- `<ASGARDEO_CLIENT_SECRET>`: The client secret from your Asgardeo application.

### Step 1.6: Create issuer certificates

Create the necessary certificates for issuing mobile credentials.

#### Create an IACA (Issuer Authority Certificate Authority)

```bash
curl -i -X POST '<TENANT_URL>/v2/credentials/mobile/iacas' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-H 'Content-Type: application/json' \
-d ''
```

!!! note
    From now on, let's refer to the `id` parameter in the response as `<IACA_ID>`.

#### Activate the IACA

```bash
curl -i -X PUT '<TENANT_URL>/v2/credentials/mobile/iacas/<IACA_ID>' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-d '{
    "active": true
}'
```

Replace `<IACA_ID>` with the actual IACA ID from the previous step.

This activates the IACA certificate, making it ready for issuing mobile credentials.

### Step 1.7: Create mDocs credential configuration

Set up the credential configuration for mobile documents:

```bash
curl -i -X POST '<TENANT_URL>/v2/credentials/mobile/configurations' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-d '{
    "type": "<CREDENTIAL_TYPE>",
    "expiresIn": {
        "months": 1
    },
    "claimMappings": {
        "<NAMESPACE>": {
            "name": {
                "mapFrom": "claims.name",
                "type": "string"
            },
            "email": {
                "mapFrom": "claims.email",
                "type": "string"
            }
        }
    },
    "branding": {
        "name": "<CREDENTIAL_NAME>",
        "description": "<CREDENTIAL_DESCRIPTION>",
        "backgroundColor": "#2d46d8"
    },
    "includeStatus": true
}'
```

Update the values in the above request as follows:

- `<CREDENTIAL_TYPE>`: Provide a unique identifier for your credential type.
- `<NAMESPACE>`: Define a namespace for your claims.
- `<CREDENTIAL_NAME>`: Provide a user-friendly name for the credential.
- `<CREDENTIAL_DESCRIPTION>`: Add a meaningful description for the credential.
- `claimMappings`: Configure how user claims from Asgardeo map to the mobile credential fields.

!!! note
    From now on, let's refer to the `id` parameter in the response as `<MOBILE_CONFIG_ID>`.

### Step 1.8: Generate credential offer URI

Create a credential offer URI that wallets can use to claim credentials:

```bash
curl -i -X POST '<TENANT_URL>/v1/openid/offers' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-d '{
    "credentials": ["<MOBILE_CONFIG_ID>"]
}'
```

This request generates an OpenID credential offer URI for issuing the mobile credential to users.

The API response includes a `uri` field that digital wallets use to initiate the credential issuance flow.

You can convert this URI into a QR code for easy scanning by users. Here are some recommended QR code generators (select the **Plain text** option where available):

- [QR Code Generator](https://www.the-qrcode-generator.com/)
- [QR Server API](http://goqr.me/api/)
- [QR Code Creator](https://www.qr-code-generator.com/)

### Step 1.9: Update Asgardeo application configuration

Complete the integration by updating your Asgardeo OIDC application settings:

1. Navigate to the **Protocol** tab under **Applications** in the Asgardeo Console.

2. Select your OIDC application.

3. Add the MATTR callback URL as an authorized redirect URL.

4. Enable CORS by adding the MATTR origin to the **Allowed origins** field.

5. Click **Update** to save the changes.

## Step 2: Issue verifiable credentials to a MATTR Wallet

Follow the steps given below.

### Step 2.1: Download the MATTR GO Hold wallet

Download the MATTR GO Hold mobile wallet application to test credential issuance:

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=global.mattr.wallet&hl=en)
- **iOS**: [Apple App Store](https://apps.apple.com/cr/app/mattr-go-hold/id1518660243)

### Step 2.2: Claim your mobile credential

1. Open the MATTR GO Hold application on your mobile device.
2. Select the **Scan** option from the main menu.
3. Scan the QR code generated from step 6 of the previous section.
4. Review the credential offer details and select **Accept**.
5. Follow the authentication prompts to complete the credential claim process.

### Step 2.3: Verify credentials

Use MATTR GO Verify to perform in-person verification of digital credentials. This ready-to-use mobile application enables organizations to verify credentials securely and confidently.

#### Download the MATTR GO Verify app

Download the MATTR GO Verify example app to your mobile device from:

- **iOS devices**: [The App Store](https://apps.apple.com/us/app/mattr-go-verify/id6670461328)
- **Android devices**: [Google Play](https://play.google.com/store/apps/details?id=global.mattr.mobile.verifier)

#### Verify mDocs

Follow the steps below to verify mDocs credentials:

1. Use a different device to download the MATTR GO Hold example app.

2. Use the GO Hold example app to claim an mDoc credential. (Scan the QR code generated from step 6 of the previous section.)

3. In the GO Hold example app, select the **Share** button and then select **Share Credential**.

4. Select the **Connection QR** tab.

    This displays a QR code on the screen.

5. Open the GO Verify app.

6. Select the **Scan** button.

7. Scan the QR code displayed in the GO Hold example app.

    !!! note
        You may need to allow the GO Verify app to access your camera.

8. Follow the on-screen instructions to complete the proximity verification workflow.

You now know how to issue verifiable credentials for wallet holders and verify them with MATTR using Asgardeo. Continue to harness the full capabilities that Asgardeo provides by customizing the sign-in flow, enhancing application security, and exploring additional features.

## Learn more

Explore additional MATTR integration options and credential formats: [MATTR Documentation](https://learn.mattr.global/)

