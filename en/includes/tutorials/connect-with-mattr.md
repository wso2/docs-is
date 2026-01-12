# Connect {{ product_name }} as an OIDC attribute provider for verifiable credentials (VC) with MATTR

Verifiable credentials are digital versions of paper-based credentials that you can securely store in a digital wallet. These credentials can be cryptographically verified, making them tamper-evident (provides clear evidence if credentials were tampered) and more secure than their physical counterparts.

If you or your organization already manage user accounts with an OpenID Connect (OIDC) provider (like {{ product_name }}), you can use OIDC login to share user attributes and issue verifiable credentials.

This tutorial explains how to connect {{ product_name }} as an OpenID Connect (OIDC) attribute provider to issue verifiable credentials using [MATTR](https://mattr.global/){:target="_blank"}, a platform for decentralized identity management.

The high-level steps include,

1. Configuring MATTR to connect to {{ product_name }} with OpenID Connect.
2. Issuing verifiable credentials to the MATTR Wallet.
3. Verifying credentials presented by the Wallet holder.

## Step 1: Set up your {{ product_name }} organization

The steps in this section configures your {{ product_name }} organization to connect with MATTR.

### Step 1.1: Register an OIDC application in {{ product_name }}

To register your application in {{ product_name }}:

1. On the {{ product_name }} Console, go to **Applications** > **New Application** and select **Traditional Web Application**.

2. Create an application by providing the following details:

    - Provide a name for the application.
    - Select the **OpenID Connect** protocol.
    - Add a placeholder value for the **Authorized redirect URL**.

        !!! note
            You can update this later once you configure MATTR.

3. Click **Register** to complete the registration.

4. Take note of the following from the registered application, which you will need later when configuring MATTR:

    - From the **Protocol** tab, the **client ID** and **client secret**.
    - From the **Info** tab, the **Token** URL.

    !!! note
        The sections below refers to these values as `<PRODUCT_CLIENT_ID>`, `<PRODUCT_CLIENT_SECRET>`, and `<PRODUCT_TOKEN_URL>` respectively.

### Step 1.2: Share user attributes with the application

To issue verifiable credentials, your application needs access to user attributes. The following steps configure {{ product_name }} to share these attributes with your application.

1. On the {{ product_name }} Console, go to **Applications** and select the created OIDC application.

2. Navigate to its **User Attributes** tab, expand a specific scope and select the required user attributes (for example, `email`, `given_name`, `family_name`, and `birthdate`) as **Mandatory**.

    !!! note
        The attributes you want to receive from {{ product_name }} during OIDC authentication must belong to a scope. If you want to receive custom attributes, make sure to add them to a scope. Learn more about OIDC scopes in the {{ product_name }} documentation.

3. Click **Update** to save the changes.

### Step 1.3: Create a user account in {{ product_name }}

You need a {{ product_name }} user account to log in to the application. If you don't have one, create it by following the steps below:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.

2. Click **Add User** > **Single User**.

3. Complete the wizard to create a new user.

This user will log in to {{ product_name }} to receive verifiable credentials from MATTR.

## Step 2: Set up your MATTR environment

The steps in this section configures your MATTR environment to connect with {{ product_name }}.

### Step 2.1: Create a MATTR account

To create an account,

1. Navigate to [MATTR](https://mattr.global/){: target="_blank"} and sign up.

2. Take note of your **client ID**, **client secret**, **tenant URL**, **auth URL**, and **audience**.

    !!! note
        The sections below refers to these values as `<MATTR_CLIENT_ID>`, `<MATTR_CLIENT_SECRET>`, `<MATTR_TENANT_URL>`, `<MATTR_AUTH_URL>` and `<MATTR_AUDIENCE>` respectively.

### Step 2.2: Get an access token for MATTR

Obtain an access token for the MATTR tenant by sending the following request:

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
    The sections below refers to the received access token as `<MATTR_BEARER_TOKEN>`.

### Step 2.3: Configure MATTR authentication provider

Set up a authentication provider in MATTR VII to connect with {{ product_name }}. See the MATTR documentation on [authentication providers](https://learn.mattr.global/docs/issuance/authorization-code/authentication-provider/overview){: target="_blank"} for more details.

```bash
curl -i -X POST "<MATTR_TENANT_URL>/v1/users/authentication-providers" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
    "url": "<PRODUCT_TOKEN_URL>",
    "scope": ["openid", "profile", "email"],
    "clientId": "<PRODUCT_CLIENT_ID>",
    "clientSecret": "<PRODUCT_CLIENT_SECRET>",
    "tokenEndpointAuthMethod": "client_secret_post",
    "staticRequestParameters": {
        "prompt": "login",
        "maxAge": 10000
    }
}'
```

Replace the placeholders with your actual values:

- `<PRODUCT_TOKEN_URL>`: The token endpoint from your {{ product_name }} application.
- `<PRODUCT_CLIENT_ID>`: The client ID from your {{ product_name }} application.
- `<PRODUCT_CLIENT_SECRET>`: The client secret from your {{ product_name }} application.

### Step 2.4: Create issuer certificates

These certificates let MATTR securely sign verifiable credentials. Any credential issued using these certificates can be trusted by users' mobile wallets.

1. Create issuer certificates to securely sign verifiable credentials that users can store and use in mobile wallets

#### Create an IACA (Issuer Authority Certificate Authority)

The IACA acts as the root authority for your issuer. You'll use it to sign all credentials. To create an IACA, run the following command:

```bash
curl -i -X POST '<MATTR_TENANT_URL>/v2/credentials/mobile/iacas' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-H 'Content-Type: application/json' \
-d ''
```

!!! note
    The section below refers to the `id` parameter in the response as `<IACA_ID>`.

#### Activate the IACA

To activate the IACA created in the previous step, run the following command:

```bash
curl -i -X PUT '<MATTR_TENANT_URL>/v2/credentials/mobile/iacas/<IACA_ID>' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <BEARER_TOKEN>' \
-d '{
    "active": true
}'
```

Replace `<IACA_ID>` with the actual IACA ID from the previous step.

The IACA certificate can now issue mobile credentials.

### Step 2.5: Create mDoc credential configuration

mDocs are ISO/IEC-compliant digital identity documents designed for secure storage, verification, and use on mobile wallets. The following command creates a mobile credential configuration that acts as a template for the mDoc credentials you want to issue.

You can decide what data the credential contains, how it maps from your user attributes, and how it will appear in the mobile wallet.

!!! note
    Learn more about mDoc credential configurations in the [MATTR documentation](https://learn.mattr.global/docs/issuance/credential-configuration/api-reference/mdocs){: target="_blank"}.

```bash
curl -i -X POST '<MATTR_TENANT_URL>/v2/credentials/mobile/configurations' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <MATTR_BEARER_TOKEN>' \
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
- `claimMappings`: Configure how user claims from {{ product_name }} map to the mobile credential fields.

!!! note
    The section below refers to the `id` parameter of the response as `<MOBILE_CONFIG_ID>`.

### Step 2.6: Generate credential offer URI

The following command generates a credential offer URI that users' mobile wallets can use to claim the credential defined in the mobile configuration.

```bash
curl -i -X POST '<MATTR_TENANT_URL>/v1/openid/offers' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <MATTR_BEARER_TOKEN>' \
-d '{
    "credentials": ["<MOBILE_CONFIG_ID>"]
}'
```

The API response includes a `uri` field that digital wallets use to initiate the credential issuance flow.

!!! tip "Share URI"
    You can either share the resulting `uri` directly, or convert this URI into a QR code for users to easily scan it. Some recommended QR code generators include,
    
    - [QR Code Generator](https://www.the-qrcode-generator.com/){: target="_blank"}
    - [QR Server API](http://goqr.me/api/){: target="_blank"}
    - [QR Code Creator](https://www.qr-code-generator.com/){:target="_blank"}
    
    Make sure to select the plain text option when generating the QR code.

## Step 3: Update your application's callback URL in {{ product_name }}

Now that you have set up MATTR, you need to update the callback URL of your application registered in {{ product_name }} to complete the integration. To do so,

1. On the {{ product_name }} Console, go to **Applications** and select your application.

2. In the application's **Protocol** tab, update the **Authorized redirect URL** with the MATTR callback URL that takes the form:

    ```bash
    <MATTR_TENANT_URL>/core/v1/oauth/authentication/callback
    ```

3. Allow CORS for this URL by adding the MATTR origin to the **Allowed origins** field.

4. Click **Update** to save the changes.

## Step 4: Claim a credential in your mobile wallet and verify It

Follow the steps given below to test the integration in action by issuing verifiable credentials to a MATTR Wallet.

### Step 4.1: Download the MATTR GO Hold wallet

Download the MATTR GO Hold mobile wallet application for your device.

- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=global.mattr.wallet&hl=en){: target="_blank"}
- **iOS**: [Apple App Store](https://apps.apple.com/cr/app/mattr-go-hold/id1518660243){: target="_blank"}

### Step 4.2: Claim your mobile credential

To claim the created mobile credential,

1. Open the MATTR GO Hold application on your mobile device.

2. Select the **Scan** option from the main menu.

3. Scan the QR code generated in step 2.6.

4. Review the credential offer details and select **Accept**.

5. Follow the authentication prompts to complete the credential claim process.

### Step 4.3: Download the MATTR Go Verify app

From a different device, download the MATTR GO Verify app. This app allows you to perform in-person verification of digital credentials stored in the MATTR GO Hold wallet.

- **iOS devices**: [The App Store](https://apps.apple.com/us/app/mattr-go-verify/id6670461328){: target="_blank"}
- **Android devices**: [Google Play](https://play.google.com/store/apps/details?id=global.mattr.mobile.verifier){: target="_blank"}

### Step 4.4 Verify credentials

Follow the steps below to verify the mDocs credentials:

1. From the device with the GO Hold app,

    1. Open the app, select the **Share** button and then select **Share Credential**.

    2. Select the **Connection QR** tab. This displays a QR code on the screen.

2. From the device with the GO Verify app,

    1. Select the **Scan** button.

    2. Scan the QR code displayed in the GO Hold app in the other device.

        !!! note
            You may need to allow the GO Verify app to access your camera.

    3. Follow the on-screen instructions to complete the proximity verification workflow.

You have now successfully issued verifiable credentials using {{ product_name }} as the OIDC attribute provider and verified them with MATTR.

## Learn more

Explore additional MATTR integration options and credential formats in the [MATTR Documentation](https://learn.mattr.global/){: target="_blank"}.

