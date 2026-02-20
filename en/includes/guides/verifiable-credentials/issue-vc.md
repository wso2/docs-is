# Issue verifiable credentials to a digital wallet

This guide walks you through configuring {{ product_name }} to issue a verifiable credential (VC) to an OID4VCI-compatible digital wallet. Any wallet that supports the [OID4VCI specification](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html){:target="_blank"} can receive credentials from {{ product_name }}.

## Prerequisites

Before you begin, ensure the following:

- {{ product_name }} is running and accessible.
- An OID4VCI-compatible digital wallet is installed on your device.
- A user account exists in {{ product_name }} whose attributes you want to include in the credential.

## Step 1: Configure VC attribute mappings

{{ product_name }} maps user profile attributes to verifiable credential claims using the **Verifiable Credentials** attribute dialect. Default mappings are pre-loaded for common claims such as `given_name`, `family_name`, and `email`.

To view or update the attribute mappings:

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.

2. Under **Manage Attribute Dialects**, click **View** on the **Verifiable Credentials** dialect.

    ![VC attribute dialect page]({{base_path}}/assets/img/guides/verifiable-credentials/vc-attribute-dialect.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Review the available claim mappings. Each mapped claim corresponds to a local claim URI (e.g., `http://wso2.org/claims/givenname`) that is resolved from the user's profile at issuance time.

!!! note
    You can add custom claim mappings if you need to include additional user attributes in your credentials.

## Step 2: Create a credential template

A **credential template** defines the structure, format, and included attributes of a verifiable credential. Each template is identified by a unique scope name that wallets use to request the credential.

To create a credential template:

1. On the {{ product_name }} Console, go to **Verifiable Credentials**.

2. Click **+ New Credential Template**.

    ![Create Credential Template dialog]({{base_path}}/assets/img/guides/verifiable-credentials/create-credential-template.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Fill in the credential template details:

    | Field | Description | Example |
    | :---- | :---------- | :------ |
    | **Identifier** | A unique name that becomes the credential scope. Use lowercase with underscores. | `work_id` |
    | **Display Name** | A human-readable name shown in the wallet. | `Work ID` |
    | **User Attributes** | The attributes from the VC dialect to include in the credential. | `given_name`, `family_name`, `email` |

4. Click **Create** to save the template.

    ![Work ID credential template detail page]({{base_path}}/assets/img/guides/verifiable-credentials/credential-template-detail.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Step 3: Register a VC client application

A **VC Client Application** represents the digital wallet in {{ product_name }}. It holds the OAuth 2.0 client configuration that the wallet uses to exchange authorization codes for access tokens.

To register a VC client application:

1. On the {{ product_name }} Console, go to **Applications** and click **+ New Application**.

2. Select **VC Client Application** from the application type list.

    ![Application type selection highlighting VC Client Application]({{base_path}}/assets/img/guides/verifiable-credentials/vc-client-app-type.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Fill in the application details:

    | Field | Description |
    | :---- | :---------- |
    | **Name** | A descriptive name for the wallet application (e.g., `Lissi Wallet`). |
    | **Authorized Redirect URL** | The wallet's OID4VCI callback URL. See your wallet's documentation for this value. |

4. Click **Create**.

    ![VC Client Application creation dialog]({{base_path}}/assets/img/guides/verifiable-credentials/vc-client-app-create.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! tip
    Refer to the [tested wallets](#tested-wallets) section below for the redirect URLs of Lissi, Heidi, and Inji wallets.

## Step 4: Authorize the credential to the application

Once the VC client application is created, you must authorize it to issue a specific credential template.

1. In the newly created application, click **Authorize Verifiable Credential**.

    ![Authorize Verifiable Credential dialog]({{base_path}}/assets/img/guides/verifiable-credentials/authorize-vc-dialog.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Fill in the authorization details:

    | Field | Description | Example |
    | :---- | :---------- | :------ |
    | **Verifiable Credential** | The credential template to authorize for this application. | `work_id` |
    | **Authorization Policy** | The access policy to enforce. Select **No Authorization Policy** or **Role Based Access Control (RBAC)** to apply authorization policy. | `No Authorization Policy` |

3. Click **Finish**.

The application is now authorized to request and receive the `work_id` credential scope on behalf of an authenticated user.

## Step 5: Retrieve the credential offer URI

The **credential offer URI** is a link the wallet follows to begin the issuance flow.

To retrieve the offer URI:

1. On the {{ product_name }} Console, go to **Verifiable Credentials** and select your credential template (e.g., **Work ID**).

2. Locate the **Credential Offer** section and copy the URI. It appears in the format:

    ```
    openid-credential-offer://?credential_offer_uri=https://localhost:9443/oauth2/credential-offer/<offer-id>
    ```

!!! note
    The {{ product_name }} Console does not generate a QR code. To share the offer with a mobile wallet, paste the URI into an external QR code generator and present the resulting QR code for the wallet to scan.

## Tested wallets

{{ product_name }} has been tested with the following OID4VCI-compatible wallets. Select a tab to see the wallet-specific configuration and steps for claiming the credential.

!!! note
    The wallets listed below have been verified for compatibility with {{ product_name }}. Any digital wallet that implements the [OID4VCI specification](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html){:target="_blank"} should be able to receive credentials — you are not limited to these wallets.

=== "Lissi"

    **Redirect URL:** `https://oob.lissi.io/vci-cb`

    Use this URL in [Step 3](#step-3-register-a-vc-client-application) when registering the VC client application.

    **Claiming the credential:**

    1. Open the **Lissi wallet** on your mobile device.

    2. Tap **Scan QR code** or use the **Receive Credential** option, then scan the QR code displayed in the {{ product_name }} Console or paste the credential offer URI.

        ![Lissi wallet showing credential offer received]({{base_path}}/assets/img/guides/verifiable-credentials/lissi-offer-received.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. The Lissi wallet redirects you to the {{ product_name }} login page. Authenticate with the user account whose attributes you want in the credential.

    4. Review and approve the consent screen if prompted.

    5. The Lissi wallet exchanges the authorization code for an access token and calls the credential endpoint. The signed credential appears in your Lissi wallet.

        ![Lissi wallet displaying the issued credential]({{base_path}}/assets/img/guides/verifiable-credentials/lissi-credential-issued.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

=== "Heidi"

    **Redirect URL:** Refer to the [Heidi wallet documentation](https://www.heidi-wallet.com/){:target="_blank"} for the OID4VCI callback URL, and use it in [Step 3](#step-3-register-a-vc-client-application).

    **Claiming the credential:**

    1. Open the **Heidi wallet** on your mobile device.

    2. Use the wallet's credential receive or QR scan feature, then scan the QR code or paste the credential offer URI from the {{ product_name }} Console.

    3. Authenticate with your {{ product_name }} credentials when prompted.

    4. The signed credential appears in your Heidi wallet after the wallet exchanges the authorization code and calls the credential endpoint.

=== "Inji"

    **Redirect URL:** Refer to the [Inji wallet documentation](https://docs.mosip.io/inji/){:target="_blank"} for the OID4VCI callback URL, and use it in [Step 3](#step-3-register-a-vc-client-application).

    **Claiming the credential:**

    1. Open the **Inji wallet** on your mobile device.

    2. Use the wallet's **Download via URI** or QR scan feature, then scan the QR code or paste the credential offer URI from the {{ product_name }} Console.

    3. Authenticate with your {{ product_name }} credentials when prompted.

    4. The signed credential appears in your Inji wallet after the wallet completes the OID4VCI flow.

## What's next

- **Understand the protocol**: Learn the technical details of the issuance flow in the [OID4VCI concept page]({{base_path}}/references/concepts/oid4vci/).
- **Manage VC attributes**: Customize the claims included in your credentials via [VC attribute mappings]({{base_path}}/guides/users/attributes/).
