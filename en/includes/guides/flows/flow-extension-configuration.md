# Flow extension configuration

This guide walks you through registering an external service as a flow extension, creating the attributes it returns, configuring attribute access, and adding the extension to a flow.

## Sample use case

Imagine an organization that runs a loyalty program in an external CRM. When a new customer self-registers, the organization wants to:

- Validate the customer's email address against the CRM to confirm they are a recognized member.
- Pull the customer's existing **loyalty tier** (for example, Silver, Gold, or Platinum) from the CRM and store it on their new account, so downstream applications can offer tier-based benefits immediately.

A flow extension makes this possible:

1. The customer enters their email and other details in the **Self Registration** flow.
2. {{product_name}} invokes the loyalty service endpoint, **exposing** the customer's email address and the application ID.
3. The CRM looks up the customer and responds with their member identifier and loyalty tier.
4. {{product_name}} writes these values back into the flow as `identifier` and `tier` claims.
5. The account is created with the loyalty tier already populated, ready for use by connected applications.

This enriches the user's profile with trusted data from a system of record at the moment of registration, with no manual data entry required.

## Build the flow

To use a flow extension, you first register it as a connection and then invoke it from a flow.

### Step 1 – Create a new flow extension

To register your external service as a flow extension:

1. On the {{product_name}} Console, go to **Connections**.

2. Click **New Connection** and select **Create Flow Extension**.

3. Provide the basic details for the extension:

    - **Name** (required): A unique name to identify this flow extension.
    - **Description**: A short description of what the extension does.
    - **Icon URL**: A URL pointing to an icon that represents this flow extension.

4. Click **Next**.

5. In the **Endpoint** field (required), enter the URL of the external endpoint to integrate with this extension.

6. Under **Authentication**, select the **Authentication Scheme** (required) that {{product_name}} uses to authenticate to your endpoint, and provide the required credentials. The supported schemes are **None**, **Basic**, **Bearer**, **API Key**, and **Client Credential**.

7. (Optional) Under **Encryption Certificate**, upload a certificate to encrypt field values exchanged with the extension endpoint. {{product_name}} uses this certificate to encrypt the values it sends to your endpoint. To learn how encryption works, see [configure field encryption](#step-4-configure-field-encryption).

<video autoplay loop muted playsinline width="auto" style="display: block; margin: 0; max-width: 100%; border: 0.3px solid lightgrey;">
    <source src="{{base_path}}/assets/img/guides/flows/flow-extension-encryption-certificate.mp4" type="video/mp4">
    Your browser does not support this content.
</video>

### Step 2 – Create the attributes returned by your endpoint

The flow extension writes the values returned by your endpoint into the flow as user attributes (claims). Before you can map these values, the corresponding attributes must exist in {{product_name}}.

In the loyalty example, the endpoint returns a member **identifier** and a **tier**. The `email` attribute already exists as a default attribute, but `identifier` and `tier` are not available by default, so you need to add them as custom attributes.

For each value your endpoint returns that doesn't already exist as an attribute:

1. On the {{product_name}} Console, go to **User Attributes & Stores** > **Attributes**.

2. Add a new custom attribute (for example, `identifier` and `tier`).

For detailed steps, see [Add custom attributes]({{base_path}}/guides/users/attributes/user-attributes/manage-attributes/#add-custom-attributes).

### Step 3 – Configure the flow extension

Once the extension and its attributes exist, configure which attributes {{product_name}} exposes to your endpoint and which attributes it writes back from the response.

1. On the {{product_name}} Console, go to **Connections** and select the flow extension you created.

2. Click **Set Up** and go to the **Access Configuration** tab.

3. Under **Claims**, click **+ Add Entry** to add each attribute the extension uses, and set its access level. Use **Read** for attributes sent to your endpoint and **Write** for attributes it returns. For the loyalty example, mark `email` and `applicationId` as **Read**, and `identifier` and `tier` as **Write**.

4. Click **Update** to save the configuration.

![Configure a flow extension]({{base_path}}/assets/img/guides/flows/flow-extension-configure.gif){: width="auto" style="display: block; margin: 0;"}

The flow extension is now ready to be invoked from the **Self Registration** flow.

### Step 4 – Configure field encryption

For sensitive attributes, you can encrypt the values exchanged with your endpoint on a per field basis.

- **Read (sent to your endpoint):** {{product_name}} encrypts the values it sends using an encryption certificate. If you didn't upload one when creating the extension, see [manage the encryption certificate](#manage-the-encryption-certificate).
- **Write (returned by your endpoint):** your endpoint encrypts the values it returns and {{product_name}} decrypts them. No certificate is required.

For the wire format your endpoint must handle, see [work with encrypted values]({{base_path}}/guides/flows/flow-extension-external-service/#work-with-encrypted-values).

To mark a field as encrypted:

1. On the **Access Configuration** tab, select the field you want to encrypt. The **Field Configuration** panel opens.

2. Under **Encryption**, turn on the toggles you need:

    - **Read encrypted**: {{product_name}} sends this field to your endpoint encrypted. Available once the field is marked as **Read**.
    - **Write encrypted**: Your endpoint returns this field's value encrypted. Available once the field is marked as **Write**.

3. Click **Update** to save the configuration.

Fields marked as encrypted show a lock icon on their **Read** and **Write** indicators.

<!-- TODO: capture image - Field Configuration panel showing the Read encrypted and Write encrypted toggles with the lock icon in the tree -->
![Configure field encryption]({{base_path}}/assets/img/guides/flows/flow-extension-encryption-toggles.png){: width="auto" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    If you remove a field's **Read** or **Write** access, its corresponding encryption setting clears automatically.

### Step 5 – Add the flow extension to the flow

Add the extension to the Self Registration flow so that {{product_name}} invokes it while a user registers.

1. On the {{product_name}} Console, go to **Flows**, and click the **Self Registration** card. Click the Basic Details template to add it to the canvas.

2. From the **Steps** panel, drag and drop a **Flow Extension View** onto the canvas, then wire it into the flow:

    - Delete the existing connection from the Email OTP view to the green **End** node.
    - Draw a new connection from the **Continue** button of the Email OTP view to the Flow Extension View.
    - Draw a final connection from the Flow Extension View to the **End** node.

3. With the Flow Extension View selected, click the gear icon (⚙️) to open the execution properties, and select the flow extension you created from the **Connection** dropdown.

4. Click **Save Draft** to save all changes, then turn the toggle on the top right corner of the Flow Builder **ON** to publish the flow.

![Add a flow extension to the flow]({{base_path}}/assets/img/guides/flows/flow-extension-add-to-flow.gif){: width="auto" style="display: block; margin: 0;"}

New users who self-register now pass through the flow extension, and the values returned by your endpoint are written to their account before the account is created.

## Manage the encryption certificate

You can add, replace, or remove the encryption certificate of an existing flow extension:

1. On the {{product_name}} Console, go to **Connections** and select the flow extension.

2. Click **Set Up** and go to the **Settings** tab.

3. Under **Encryption Certificate**:

    - If no certificate is configured, upload one using the certificate form.
    - If a certificate is already configured, click **Clear** to remove it. To replace it, upload a new certificate after clearing the existing one.

4. Click **Update** to save the changes.

<!-- TODO: capture image - Settings tab showing the configured Encryption Certificate with the Clear action -->
![Manage the encryption certificate]({{base_path}}/assets/img/guides/flows/flow-extension-encryption-settings.png){: width="auto" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note

    For security reasons, {{product_name}} never displays a certificate after you upload it. The Console only indicates whether a certificate is configured.
