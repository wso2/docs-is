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
2. To create an OIDC application, go to **Applications**, click **+New Application**, and select **Traditional Web Application**.
    1. Give a name for the application, select the **OpenID Connect** protocol, provide an authorized redirect URL, and click **Register** to complete the registration.

        !!! note
            For now, let's give a dummy value as the **Authorized redirect URL**. You'll update this later when you configure MATTR and create a credential issuer.

    2. Take note of the client ID and client secret.

        !!! note
            You will need them to configure the MATTR credential issuer later.

3. Go to the **Info** tab and take note of the **Token URL**.
4. Go to the **User Attributes** tab, select the mandatory user attributes that you need to offer with the verifiable credential (for example, Email, First Name, Last Name, and Date of Birth.), and click **Update** to save the changes.

### Step 1.2: Create a user account in Asgardeo

If you currently do not have any users in your Asgardeo organization, follow the instructions below to create a new user account.

1. On the Asgardeo Console, go to **User Management** > **Users**.
2. Click **+ Add User** and provide the required details.

Later, this user will log in to Asgardeo to get verifiable credentials to the MATTR Wallet.

### Step 1.3: Configure MATTR and create a credential issuer

Follow the steps given below.

1. Go to `https://mattr.global/`, create a MATTR account, and take note of your client ID, client secret, tenant url, auth url and  audience.

    !!! note
        From now on, let's refer to the MATTR client id as `<MATTR_CLIENT_ID>`, its client secret as `<MATTR_CLIENT_SECRET>`, its auth url as `<MATTR_AUTH_URL>`, its audience as `<MATTR_AUDIENCE>` and its tenant url as `<TENANT_URL>`.

2. Get an access token for the MATTR tenant by sending the following request:

    !!! note
        We are using a cURL command to send the request in this example.

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

3. Configure a MATTR VII Authentication provider

    ```bash
    curl -i -X POST "<TENANT_URL>/v1/users/authentication-providers" \
    -H "Authorization: Bearer <BEARER_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
        "url": "<ASGARDEO-APPLICATION-TOKEN-URL>",
        "scope": ["openid", "profile", "email"],
        "clientId": "<ASGARDEO-APPLICATION-Client-ID>",
        "clientSecret": "<ASGARDEO-APPLICATION-Client-Secrect>",
        "tokenEndpointAuthMethod": "client_secret_post",
        "staticRequestParameters": {
            "prompt": "login",
            "maxAge": 10000
        }
    }'
    ```

    !!! note
        Replace `<ASGARDEO-APPLICATION-Client-ID>` and `<ASGARDEO-APPLICATION-Client-Secrect>` with your actual Asgardeo application credentials, `<TENANT_URL>` and  `<ASGARDEO-APPLICATION-TOKEN-URL>` with the Asgardeo application token endpoint.

4. Create issuer certificates

### Step 4.1: Create an IACA (Issuer Authority Certificate Authority)

    ```bash
    curl -i -X POST '<TENANT_URL>/v2/credentials/mobile/iacas' \
    -H 'Authorization: Bearer <BEARER_TOKEN>' \
    -H 'Content-Type: application/json' \
    -d ''
    ```

    !!! note
        From now on, let's refer to the `id` parameter in the response as `<IACA_ID>`.

### Step 4.2: Activate the IACA

    ```bash
    curl -i -X PUT '<TENANT_URL>/v2/credentials/mobile/iacas/<IACA_ID>' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <BEARER_TOKEN>' \
    -d '{
        "active": true
    }'
    ```

    !!! note
        Replace `<IACA_ID>` with the actual IACA ID from step 4.1. This activates the IACA certificate, making it ready for issuing mobile credentials.

5. Create a MATTR VII mDocs credential configuration

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

6. Get the credential offer URI

    ```bash
    curl -i -X POST '<TENANT_URL>/v1/openid/offers' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <BEARER_TOKEN>' \
    -d '{
        "credentials": ["<MOBILE_CONFIG_ID>"]
    }'
    ```

    This request generates an OpenID credential offer URI that can be used to issue the mobile credential to users.

    The API response includes a `uri` field that digital wallets use to initiate the credential issuance flow. You can convert this URI into a QR code for easy scanning by users. Here are some recommended QR code generators (select the **Plain text** option where available):

    - [QR Code Generator](https://www.the-qrcode-generator.com/)
    - [QR Server API](http://goqr.me/api/)
    - [QR Code Creator](https://www.qr-code-generator.com/)

7. Configure the Asgardeo OIDC application:

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

Let's use a sample MATTR application to perform the credential verification. For the steps below, use the previously created MATTR tenant or a new tenant. If you are using a new MATTR tenant, you need a new access token.

!!! note
    For verification, you'll need to create a presentation template that matches your credential configuration.

1. Create a credential presentation template with MATTR.

    Replace the `<TEMPLATE_NAME>` with a meaningful value and `<CREDENTIAL_TYPE>` with the same value used in the issuer-creation step.

    ```bash
    curl -i -X POST "<TENENT_URL>/v1/credentials/web-semantic/presentations/templates" \
    -H "Authorization: Bearer <BEARER_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
        "domain":"<TENENT_URL>",
        "name":"<TEMPLATE_NAME>",
        "query": [{
        "type":"QueryByFrame",
        "credentialQuery":[
            {
            "reason": "Please provide your educational award and surname from your Certificate",
            "frame":{
                "@context":[
                "https://www.w3.org/2018/credentials/v1",
                "https://w3id.org/security/bbs/v1",
                "https://mattr.global/contexts/vc-extensions/v1",
                "https://schema.org",
                "https://w3id.org/vc-revocation-list-2020/v1"
                ],
            "type": ["VerifiableCredential", "<CREDENTIAL_TYPE>"],
            "credentialSubject":{
                "@explicit":true,
                "given_name":{}
            }
            },
            "trustedIssuer":[
            {
                "issuer":"<DID>",
                "required":true
            }
            ],
            "required":true
            }
        ]
        }]
    }'
    ```

2. Download and configure the MATTR sample application by visiting the GitHub repository below.

    ```bash
    https://github.com/mattrglobal/sample-apps/tree/master/verify-callback-express
    ```

    Update the environment variables in the `.env` file according to your setup. Specifically, for the `TEMPLATEID` variable, use the ID value you received from the response to the previous request.

3. Run the sample application and start an **Ngrok** tunnel to your localhost.

    !!! tip
            If everything is set up correctly, the running terminal shows you a QR code.

4. Scan the QR code with the MATTR Wallet and click **Send**.

    ![verifiable credentials]({{base_path}}/assets/img/tutorials/oidc-attribute-provider-mattr/verifiable-credentials.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        Once sent by the wallet holder, the callback endpoint defined in the presentation request receives the verification response and requested credentials. In this case, the sample MATTR application receives the response and prints it to the running terminal.

    ```js
    {
    presentationType: 'QueryByFrame',
    challengeId: 'GW8FGpP6jhFrl37yQZIM6w',
    claims: {
        id: 'did:key:z6MkisTmUeMWzqbwxTad2jrhoAXrLZN1BggiYUNsVBR7FUYW',
        'http://schema.org/birthdate': '1996-09-05'
        'http://schema.org/given_name': 'john'
    },
    verified: true,
    holder: 'did:key:z6MkisTmUeMWzqbwxTad2jrhoAXrLZN1BggiYUNsVBR7FUYW'
    }
    ```

Now you know how to issue verifiable credentials for wallet holders and how to verify them with MATTR using Asgardeo. You can continue to harness the full capabilities that Asgardeo provides by customizing the sign-in flow, enhancing application security, etc.
