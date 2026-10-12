# Verify credentials from a Digital Wallet

This guide walks you through configuring {{ product_name }} to act as a verifier in an OpenID4VP flow. Users can present credentials stored in an OID4VP-compatible digital wallet to authenticate or register with your application. Any wallet that supports the [OID4VP specification](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html){:target="_blank"} and the `dc+sd-jwt` credential format can present credentials to {{ product_name }}.

## Prerequisites

Before you begin, ensure the following:

- An OID4VP-compatible digital wallet that supports the `dc+sd-jwt` credential format is installed on your device.
- The wallet contains at least one verifiable credential issued by a trusted issuer.

## Step 1: Create a presentation definition

A **presentation definition** describes the type and format of credentials that {{ product_name }} will request from a wallet, along with the specific claims that must be present.

To create a presentation definition:

1. On the {{ product_name }} Console, go to **Verifiable Credentials** and select **Presentation Definitions**.

2. Click **+ New Presentation Definition**.

3. Fill in the presentation definition details:

    | Field | Description | Example |
    | :---- | :---------- | :------ |
    | **Display Name** | A human-readable name. | `Employee ID` |
    | **Identifier** | A unique, URL-safe identifier for this definition. | `employee-id` |
    | **Description** | A brief description of what this presentation definition is used for. | `Presentation definition for verifying employee ID credentials` |
    | **Credential Type** | The type of credential to request from the wallet. | `employee-identity` |
    | **Format** | The credential format the wallet must present. | `dc+sd-jwt` |

    ![Create Presentation Definition dialog filled in for Employee ID]({{base_path}}/assets/img/guides/verifiable-credentials/create-presentation-definition.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Create**.

5. Open the **Attributes** tab and click **Add Attribute** to specify which claims to request. For each attribute, provide the **Claim Name** (the claim key as it appears inside the credential) and mark whether it is **Required**. If a required claim is absent, the credential cannot satisfy the request.

    For example, add the `email` claim as shown below:

    ![Add Attribute dialog]({{base_path}}/assets/img/guides/verifiable-credentials/pd-add-attribute.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    Repeat this for each of the following claims from the `employee-identity`:

    | Claim Name | Required |
    | :--------- | :------- |
    | `email` | Yes |
    | `given_name` | Yes |
    | `family_name` | Yes |

6. Click **Save**.

## Step 2: Configure trusted issuers

{{ product_name }} verifies that the presented credential was signed by an issuer you trust. You must configure at least one trusted issuer before the presentation definition can be used.

1. On the presentation definition, go to the **Trusted Issuers** tab and click **Add Trusted Issuer**. This opens a dialog where you select a trust method.

    !!! note
        Three trust methods are supported: **JWKS Endpoint** (recommended for remote issuers), **PEM** (for issuers that share a public key directly), and **x5c** (for certificate chain validation). Select the method that matches how your credential issuer publishes its signing keys.

2. Select **JWKS Endpoint**, then fill in the issuer details:

    | Field | Description | Example |
    | :---- | :---------- | :------ |
    | **Issuer URL** | The `iss` claim value in credentials issued by this issuer. | `https://issuer.example.com/oid4vci` |
    | **JWKS URI** | URL of the issuer's JSON Web Key Set. | `https://issuer.example.com/.well-known/jwks.json` |

    ![Add Trusted Issuer dialog]({{base_path}}/assets/img/guides/verifiable-credentials/pd-add-trusted-issuer.png){: width="550" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Add**.

With the presentation definition and trusted issuers in place, you can now use it in one of the following scenarios.

## Use case 1: Authenticate with a Digital Wallet

In this scenario, users log in to your application by presenting a credential from their digital wallet instead of entering a username and password. {{ product_name }} verifies the presented credential and uses the verified claims to authenticate the user.

### Create a Digital Wallet connection

A **Digital Wallet connection** links the presentation definition to an authenticator that can be offered as a sign-in option.

1. On the {{ product_name }} Console, go to **Connections** and click **New Connection**.

2. Select **Digital Wallet** from the connection type list.

3. Fill in the connection details:

    | Field | Description | Example |
    | :---- | :---------- | :------ |
    | **Name** | A descriptive name for the connection. | `Employee Wallet` |
    | **Presentation Definition** | The presentation definition that defines what credentials to request. | `Employee ID` |

    ![Digital Wallet connection details filled in for Employee Wallet]({{base_path}}/assets/img/guides/verifiable-credentials/vp-connection-details.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Create**.

### Configure attribute mappings

Map the credential claims to the corresponding local claims in {{ product_name }} so they can be used during authentication.

1. Open the connection and go to the **Attributes** tab.

2. Under **Credential Attribute Mappings**, click **Add Attribute Mapping**.

3. Add mappings for the claims in your credential:

    | Credential Claim | Local Claim URI |
    | :--------------- | :-------------- |
    | `email` | `http://wso2.org/claims/emailaddress` |
    | `given_name` | `http://wso2.org/claims/givenname` |
    | `family_name` | `http://wso2.org/claims/lastname` |

    ![Credential Attribute Mappings showing all three mapped claims]({{base_path}}/assets/img/guides/verifiable-credentials/vp-attribute-mappings.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Save**.

### Configure the subject attribute

The **subject attribute** tells {{ product_name }} which claim to use to look up the authenticated user.

1. Under **Subject**, open the **Subject Attribute** dropdown.
2. Select `email` as the subject attribute. {{ product_name }} uses this claim to look up the user's account during authentication.
3. Click **Update**.

!!! note
    If no subject attribute is configured, {{ product_name }} falls back to the `cnf` (confirmation) claim from the credential. This claim holds the public key that the credential is cryptographically bound to, and {{ product_name }} uses it to identify the user instead of a regular profile attribute.

### Add the connection to your application

1. On the {{ product_name }} Console, go to **Applications** and open your application.

2. Go to the **Login Flow** tab.

3. In the login flow canvas, click **Add Sign-in Option**.

4. Select the Digital Wallet connection you created (e.g., **Employee Wallet**).

5. Click **Add**, then click **Update** to save the login flow.

    ![Login flow with Digital Wallet sign-in option added]({{base_path}}/assets/img/guides/verifiable-credentials/vp-login-flow.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Users can now select the wallet sign-in option on your application's login page. When selected, {{ product_name }} generates a QR code. The user scans it with their wallet, reviews the requested claims, consents to sharing them, and {{ product_name }} verifies the presentation and authenticates the user.

## Use case 2: Self-registration with a Digital Wallet

In this scenario, new users create an account by presenting a credential from their digital wallet instead of filling in a registration form. {{ product_name }} verifies the credential and uses the disclosed claims to populate the user's profile during registration.

!!! note
    The Digital Wallet connection and its attribute mappings configured in [Use case 1](#use-case-1-authenticate-with-a-digital-wallet) are reused for this flow. Complete that setup before continuing.

### Configure the registration flow

1. On the {{ product_name }} Console, go to **Flows** and select **Registration**.

2. Go to **Starter Templates** and locate the **Basic + Wallet** template.

3. Click **+** to apply the template. The registration flow now includes a **Digital Wallet** step.

4. Click the **gear icon** on the **Digital Wallet** step and select your Digital Wallet connection (e.g., **Employee Wallet**) from the **Connection** dropdown.

    ![Digital Wallet step configured with the Employee Wallet connection]({{base_path}}/assets/img/guides/verifiable-credentials/vp-registration-wallet-step.png){: width="320" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Optionally, in the **Flow Completion Properties** panel, enable **Auto Login** to sign the user in immediately after registration.

6. Click **Publish** to activate the registration flow.

Users can now register by selecting **Register with Digital Wallet** on the registration page, scanning the QR code with their wallet, and consenting to share the requested claims. {{ product_name }} verifies the presentation and creates the user account using the disclosed attributes.

## Tested wallets

{{ product_name }} has been tested with the following OID4VP-compatible wallets:

| Wallet App | Platforms |
| :--------- | :-------- |
| Heidi | iOS, Android |
| Lissi | iOS, Android |

!!! note
    Any digital wallet that implements the [OID4VP specification](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html){:target="_blank"} and supports the `dc+sd-jwt` format should be able to present credentials. {{ product_name }} currently supports verifying credentials in this format only.

**Presenting a credential:**

1. On the application's login or registration page, select the wallet sign-in option. A QR code is displayed.

2. Open the wallet app on your mobile device and use its QR scan feature to scan the code.

3. The wallet displays the claims that the verifier is requesting.

    ![Heidi Wallet showing the presentation request]({{base_path}}/assets/img/guides/verifiable-credentials/heidi-wallet-vp.png){: width="300px" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Review the requested information and confirm sharing the credential (for example, by tapping **SHARE INFOS** in Heidi).

5. {{ product_name }} verifies the presentation and completes the flow.

