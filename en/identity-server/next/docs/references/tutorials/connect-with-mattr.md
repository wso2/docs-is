# Connect {{ product_name }} as an OIDC attribute provider for verifiable credentials (VC) with MATTR

Verifiable credentials are a digitalized representation of paper-based credentials and can be stored in a digital wallet. These credentials can be cryptographically verified, making them more tamper-evident (i.e., it provides clear evidence if the credential has been tampered with) and more secure than their physical forms.

It allows the holder to own, control, and manage the credentials and to address several issues in traditional verification systems like paper-based verification, physical inspections, etc.

If you or your organization are already managing user accounts in an OpenID Connect (OIDC) attribute provider (such as {{ product_name }}), you can use OIDC login to share user attributes to offer verifiable credentials.

#### Issuing verifiable credentials
![issue verifiable credentials diagram]({{base_path}}/assets/img/tutorials/oidc-attribute-provider-mattr/issue-verifiable-credentials-diagram.png){: width="900" style="display: block; margin: 0;"}

#### Verifying credentials
![verify credentials]({{base_path}}/assets/img/tutorials/oidc-attribute-provider-mattr/verify-credentials-diagram.png){: width="880" style="display: block; margin: 0;"}

This tutorial explains how this is done using MATTR and {{ product_name }}, where MATTR acts as a decentralized identity management platform for issuing verifiable credentials, management, and verification, while {{ product_name }} acts as the OIDC identity provider. Given below are the high-level steps you will follow:

1. Configuring MATTR to connect to {{ product_name }} with OpenID Connect.
2. Issuing verifiable credentials to the MATTR Wallet.
3. Verifying credentials presented by the Wallet holder.

## Step 1: Connect MATTR to {{ product_name }} with OIDC

Follow the instructions below to begin.

### Step 1.1: Register an application in {{ product_name }}

To register your application in {{ product_name }}:

1. Go to the [{{ product_name }} Console](https://localhost:9443/console).
2. To create an OIDC application, go to **Applications**, click **+New Application**, and select **Traditional Web Application**.
    1. Give a name for the application, select the **OpenID Connect** protocol, provide an authorized redirect URL, and click **Register** to complete the registration.

        !!! note
            For now, let's give a dummy value as the **Authorized redirect URL**. You'll update this later when you configure MATTR and create a credential issuer.

    2. Take note of the client ID and client secret.

        !!! note
            You will need them to configure the MATTR credential issuer later.

3. Go to the **Info** tab and take note of the **Token URL**.
4. Go to the **User Attributes** tab, select the mandatory user attributes that you need to offer with the verifiable credential (for example, Email, First Name, Last Name, and Date of Birth.), and click **Update** to save the changes.

### Step 1.2: Create a user account in {{ product_name }}

If you currently do not have any users in the {{ product_name }}, follow the instructions below to create a new user account.

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click **+ Add User** and provide the required details.

Later, this user will log in to {{ product_name }} to get verifiable credentials to the MATTR Wallet.

### Step 1.3: Configure MATTR and create a credential issuer

Follow the steps given below.

1. Go to `https://mattr.global/`, create a MATTR account, and take note of your client ID, client secret, and tenant domain.

    !!! note
        From now on, let's refer to the MATTR client id as `<MATTR_CLIENT_ID>`, its client secret as `<MATTR_CLIENT_SECRET>`, and its tenant domain as `{tenant-subdomain}` or `<TENENT_DOMAIN>`.

2. Get an access token for the MATTR tenant by sending the following request:

    !!! note
        We are using a cURL command to send the request in this example.

    ```bash
    curl -i -X POST "https://auth.mattr.global/oauth/token" \
    -H "Content-Type: application/json" \
    -d '{ 
        "client_id": "<MATTR_CLIENT_ID>",
        "client_secret": "<MATTR_CLIENT_SECRET>",
        "audience": "https://vii.mattr.global", 
        "grant_type": "client_credentials" 
    }'
    ```

    !!! note
        From now on, let's refer to the value of the `access_token` parameter in the response as `<BEARER_TOKEN>`.

3. Create a MATTR  decentralized ID (DID) with a BLS key type, which supports BBS+ signatures.

    ```bash
    curl -i -X POST "https://{tenant-subdomain}.vii.mattr.global/core/v1/dids" \
    -H "Authorization: Bearer <BEARER_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{ 
        "method": "key",
        "options": {
        "keyType": "bls12381g2"
        }
    }'
    ```

    !!! note
        From now on, let's refer to the value of the DID parameter in the response body as `<DID_ID>`.

4. Create a MATTR credential issuer using the following cURL command:

    ```bash
    curl -i -X POST "https://{tenant-subdomain}.vii.mattr.global/ext/oidc/v1/issuers" \
    -H "Authorization: Bearer <BEARER_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
        "credential": {
        "issuerDid": "<DID_ID>",
        "name": "<ISSUER_NAME>",
        "context": [
            "https://schema.org"
        ],
        "type": [
            "VerifiableCredential",
            "<CREDENTIAL_TYPE>"
        ]
        },
        "federatedProvider": {
        "url": "<TOKEN_ENDPOINT_URL>",
        "scope": [
            "openid",
            "profile",
            "email"
        ],
        "clientId": "<OIDC_APP_CLIENT_ID>",
        "clientSecret": "<OIDC_APP_CLIENT_SECRET>"
        },
        "claimMappings": [
        {
            "oidcClaim": "email",
            "jsonLdTerm": "email"
        },
        {
            "oidcClaim": "given_name",
            "jsonLdTerm": "given_name"
        },
        {
            "oidcClaim": "birthdate",
            "jsonLdTerm": "birthdate"
        },
        {
            "oidcClaim": "family_name",
            "jsonLdTerm": "familyName"
        }
        ]
    }'
    ```

    Update the values in the above request as follows:

    - `<ISSUER_NAME>` and `<CREDENTIAL_TYPE>`: Provide meaningful values.
    - `<TOKEN_ENDPOINT_URL>`: Provide the {{ product_name }} token endpoint URL.
    - `<OIDC_APP_CLIENT_ID>`: Provide the OIDC application ID.
    - `<OIDC_APP_CLIENT_SECRET>`: Provide the OIDC application secret that you created when configuring the application in {{ product_name }}.
    - `claimMappings`: Configure the claims that you need to offer with the verifiable credential to the wallet holder by adding them in the `claimMappings` parameter in the request payload. See the [MATTR-supported credential claim mappings](https://learn.mattr.global/tutorials/web-credentials/issue/oidc-bridge/common-mappings).

    !!! note
        In the step that displays the QR code, we'll refer to the `id` parameter in the response as `{issuer-id}`.

5. On the {{ product_name }} Console, go to the **Protocol** tab under **Applications**, select your OIDC application, and do the following updates:

    1. Use the `callbackUrl` parameter under `federatedProvider` in the above response body as the authorized redirect URL for the OIDC application.
    2. Enable CORS by adding the MATTR  origin into the **Allowed origins** field, and then click **Update**.

## Step 2: Issue verifiable credentials to a MATTR Wallet

Follow the steps given below.

### Step 2.1: Display the QR code

Get a QR code that can be scanned to get verifiable credentials from the MATTR Wallet. Given below is an example from `https://goqr.me/api/`.

```bash
https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=openid://discovery?issuer=https://{tenant-subdomain}.vii.mattr.global/ext/oidc/v1/issuers/{issuer-id}
```

### Step 2.2: Get verifiable credentials with MATTR Wallet

Follow the steps given below.

1. Download the MATTR mobile wallet app to your mobile phone.

    !!! note
        See [this documentation](https://learn.mattr.global/tutorials/wallets/mattr-wallet) for details.

2. Go to the MATTR mobile wallet app and scan the QR code.
3. Click **Proceed** and log in to your account in {{ product_name }}.

    ![get verifiable credentials]({{base_path}}/assets/img/tutorials/oidc-attribute-provider-mattr/get-verifiable-credentials.png){: width="700" style="display: block; margin: 0;"}

Now, you can view your credentials in your MATTR Wallet.

### Step 2.3: Verify credentials

Let's use a sample MATTR application to perform the credential verification. For the steps below, use the previously created MATTR tenant or a new tenant. If you are using a new MATTR tenant, you need a new access token.

!!! note
    The presentation request does not support DID with a BLS key type, which we created earlier. Hence, you may need to create a new DID by removing `keyType` in the options of the credential issuer creation request body.

1. Create a credential presentation template with MATTR.

    Replace the `<TEMPLATE_NAME>` with a meaningful value and `<CREDENTIAL_TYPE>` with the same value used in the issuer-creation step.

    ```bash
    curl -i -X POST "https://{tenant-subdomain}.vii.mattr.global/core/v1/presentations/templates" \
    -H "Authorization: Bearer <BEARER_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
        "domain":"<TENENT_DOMAIN>.vii.mattr.global",
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

    ![verifiable credentials]({{base_path}}/assets/img/tutorials/oidc-attribute-provider-mattr/verifiable-credentials.png){: width="500" style="display: block; margin: 0;"}

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

Now you know how to issue verifiable credentials for wallet holders and how to verify them with MATTR using {{ product_name }}. You can continue to harness the full capabilities that {{ product_name }} provides by customizing the sign-in flow, enhancing application security, etc.