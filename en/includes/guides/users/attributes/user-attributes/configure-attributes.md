# Configure attributes

This guide walks you through the available configuration options for default and custom attributes.

To configure attributes,

{% if product_name == "WSO2 Identity Server" and is_version < "7.1.0" %}

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** for the attribute you want to update.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims`. This can't be edited.

4. In the **General** tab, update the following values and click **Update** to save the changes.

    <table>
       <tbody>
            <tr>
                <td><b>Attribute Display Name</b></td>
                <td>Update the display name of the attribute that will show in user profiles.</td>
            </tr>
            <tr>
                <td><b>Description</b></td>
                <td>Update the description for the attribute.</td>
            </tr>
            <tr>
                <td><b>Display this attribute on the user's profile</b></td>
                <td>If you select this checkbox, the attribute appears in user profiles.</td>
            </tr>
            <tr>
                <td><b>Regular expression</b></td>
                <td>The value of the attribute will be validated against the regex pattern specified here.</td>
            </tr>
            <tr>
                <td><b>Make this attribute required on user's profile</b></td>
                <td>If this checkbox is selected, users are required to specify a value for this attribute on their profile.</td>
            </tr>
            <tr>
                <td><b>Make this attribute read-only on user's profile</b></td>
                <td>If this checkbox is selected, the value for this attribute will be read-only in user profiles.</td>
            </tr>
     </tbody>
    </table>

5. Go to the **Attribute Mappings** tab and enter the attribute from each user store that you need to map.

    ![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Optionally, you may use the **Additional Properties** tab to add additional properties that can be used when writing an extension.

    ![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% elif product_name == "WSO2 Identity Server" and is_version == "7.1.0" %}

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** for the attribute you want to update.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims`. This can't be edited.

4. In the **General** tab, update the following values.

    <table>
       <tbody>
            <tr>
                <td><b>Attribute Display Name</b></td>
                <td>Update the display name of the attribute that will show in user profiles.</td>
            </tr>
            <tr>
                <td><b>Description</b></td>
                <td>Update the description for the attribute.</td>
            </tr>
            <tr>
                <td><b>Regular expression</b></td>
                <td>The attribute value will be validated against the regex pattern specified here.</td>
            </tr>
            <tr>
                <td><b>Select Source for Attribute Value of Shared Users</b></td>
                <td>When a user's profile is shared across multiple organizations, the value of this attribute will be taken from the selected source.</br>
                <ul>
                    <li><b>From Origin:</b> The attribute  value is inherited from the original organization which manages the user's profile.</li>
                    <li><b>From Shared Profile:</b>  The attribute value is taken from the shared user profile in the respective organization.</li>
                    <li><b>From First Found in Hierarchy:</b> The attribute value is retrieved from the first organization in the hierarchy that has assigned a non-null value to the attribute. </li>
                </ul>
                At the moment, you can only configure this option for custom attributes.
            </tr>
            <tr>
                <td><b>Uniqueness Validation</b></td>
                <td>Select one of the following scopes to validate attribute uniqueness:
                    <ul>
                        <li><b>None:</b> No validation is applied. Users can have duplicate values for the selected attribute.</li>
                        <li><b>Within User Store:</b> Users within the same user store can't have duplicate values for the selected attribute. However, users in other user stores may have duplicates.</li>
                        <li><b>Across User Stores:</b> Attribute values are unique across all user stores preventing duplicates throughout the organization.</li>
                    </ul>
                </td>
            </tr>
     </tbody>
    </table>

5. Under **Attribute Configurations**, use the table to configure how attributes are handled for each entity.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-profiles.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    The table contains the following entities:

    - Administrator Console: User profiles as seen from the administrator's Console.
    - End-User Profile: User profiles as seen from the users' My Account portal.
    - Self-Registration: The form presented to users during self-registration.

    For each of these entities, you can configure the following properties:

    <table>
        <tbody>
            <tr>
                <td><b>Display</b></td>
                <td>If selected, the entity displays the attribute.</td>
            </tr>
            <tr>
                <td><b>Required</b></td>
                <td>If selected, the entity must contain a value for this attribute.</td>
            </tr>
            <tr>
                <td><b>Read-only</b></td>
                <td>If selected, the value will be read-only for the entity and can't be modified.</td>
        </tr>
        </tbody>
    </table>

    !!! Danger "Warning"
        These settings only control how the attributes behave in WSO2-managed UIs (Administrator Console, End-User Profile (i.e. My Account), Self-Registration). They **do not** affect backend or API validation.

    If you create a custom end-user profile UI, you can reference these configurations to apply the same rules (Display, Required, Read-only) in your own forms.

    !!! note
        Using the attribute configurations, you can also configure which attributes are displayed in the user creation form when
        [onboarding users]({{base_path}}/guides/users/manage-users/#onboard-a-single-user) in the console.

    To display an attribute in the user creation form, select the **both** **Display** and **Required** checkboxes for the **Administrator Console** entity.

6. Go to the **Attribute Mappings** tab and enter the attribute from each user store that you need to map.

    ![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Optionally, you may use the **Additional Properties** tab to add additional properties that can be used when writing an extension.

    ![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** for the attribute you want to update.

 ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## General properties

Use the following basic properties to change details and behavior of an attribute. To configure them, go to the **General** tab of the attribute.

!!! note

    The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims` and not editable.

<table>
   <tbody>
        <tr>
            <td><b>Attribute Display Name</b></td>
            <td>Update the display name of the attribute that will show in user profiles.</td>
        </tr>
        <tr>
            <td><b>Description</b></td>
            <td>Update the description for the attribute.</td>
        </tr>
        <tr>
            <td><b>Data Type</b></td>
            <td>Refers to the kind of value it holds. Refer to <a href="{{base_path}}/guides/users/attributes/user-attributes/attribute-configurations-reference/">Data types and input formats</a> for more details.</td>
        </tr>
        <tr>
            <td><b>Allow multiple values for this attribute</b></td>
            <td>Specify whether to support multiple values for this attribute.</td>
        </tr>
        <tr>
            <td><b>Input Format</b></td>
            <td>Specify the kind of input it supports. Refer to <a href="{{base_path}}/guides/users/attributes/user-attributes/attribute-configurations-reference/">Data types and input formats</a> for more details.</td>
        </tr>
        <tr>
            <td><b>Regular expression</b></td>
            <td>The attribute value will be validated against the regex pattern specified here.</td>
        </tr>
        <tr>
                <td><b>Select Source for Attribute Value of Shared Users</b></td>
                <td>When a user's profile is shared across multiple organizations, the value of this attribute will be taken from the selected source.</br>
                <ul>
                    <li><b>From Origin:</b> The attribute  value is inherited from the original organization which manages the user's profile.</li>
                    <li><b>From Shared Profile:</b>  The attribute value is taken from the shared user profile in the respective organization.</li>
                    <li><b>From First Found in Hierarchy:</b> The attribute value is retrieved from the first organization in the hierarchy that has assigned a non-null value to the attribute. </li>
                </ul>
                You can only configure this option for custom attributes.
            </tr>
        <tr>
            <td><b>Uniqueness Validation</b></td>
            <td>Select one of the following scopes to validate attribute uniqueness:
                <ul>
                    <li><b>None:</b> No validation is applied. Users can have duplicate values for the selected attribute.</li>
                    <li><b>Within User Store:</b> Users within the same user store can't have duplicate values for the selectedattribute. However, users in other user stores may have duplicates.</li>
                        <li><b>Across User Stores:</b> Attribute values are unique across all user stores preventing duplicates throughout the organization.</li>
                    </ul>
            </td>
        </tr>
    </tbody>
</table>

## Display properties

These properties control where an attribute appears in the {{product_name}} Console, and whether the attribute is required or read-only.

!!! Danger "Warning"

    These settings only control how the attributes behave in WSO2-managed user interfaces. They **do not** affect backend or API validation.

To update these settings, open the **General** tab of your attribute and use the table in the **Attribute Configurations** section.

![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-profiles.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

The table manages these settings across the following user interfaces:

- Administrator Console: User profiles as seen from the administrator's Console.
- End-User Profile: User profiles as seen from the users' My Account portal.
- Self-Registration: The form presented to users during self-registration.

<table>
    <tbody>
        <tr>
            <td><b>Display</b></td>
            <td>If selected, the attribute is displayed in the entity.</td>
        </tr>
        <tr>
            <td><b>Required</b></td>
            <td>If selected, the entity must contain a value for this attribute.</td>
        </tr>
        <tr>
            <td><b>Read-only</b></td>
            <td>If selected, the value will be read-only for the entity and can't be modified.</td>
    </tr>
    </tbody>
</table>

If you create a custom end-user profile UI, you can reference these configurations to apply the same rules (Display, Required, Read-only) in your own forms.

!!! note

    Using the attribute configurations, you can also configure which attributes are displayed in the user creation form when
        [onboarding users]({{base_path}}/guides/users/manage-users/#onboard-a-single-user) in the console.

## Display attributes in the user creation form

To display an attribute in the user creation form, select the **both** **Display** and **Required** checkboxes for the **Administrator Console** entity.

1. Go to the **Attribute Mappings** tab and enter the attribute from each user store that you need to map.

    ![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version >= "7.2.0" %}

Optionally, you may use the **Additional Properties** tab to add additional properties that can be used when writing an extension.

![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "WSO2 Identity Server" %}

## Configure the storage location of identity attributes

5. **Manage in User Store**

    The **Manage in User Store** option determines where the attribute values are stored and managed.

    ![Managed in User Store]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-managed-in-user-store.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - **Checked**: The attribute values are managed in the user store.
    - **Unchecked**: The attribute values are managed internally by the system.

    When the Manage in User Store option is selected, you can further refine this behavior in the Attribute Mappings tab. 
    There, you can exclude specific user stores by clearing the Manage in User Store checkbox for those stores. 
    The attribute values for the excluded user stores will then be managed internally by the system.

    ![Selective Manage in User Store]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-excluded-user-store.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! Danger "Warning"
        Changing the attribute storage location may cause any existing attribute values stored in the user store or 
        managed internally to become inaccessible. Ensure that you understand the impact before making this change.

        If you have configured a **Read-Only User Store** and enable **Manage in User Store** for an identity attribute, 
        the attribute will not be editable in the user profile. Consequently, certain internal functions that rely on 
        updating these attributes may not work as expected.

By default, identity claim values are stored in the JDBC datasource configured in the `deployment.toml` file. If required, you can configure WSO2 Identity Server to store the claim values in another user store as well.

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configuration to change the `identity_datastore.datastore_type` property. The `IdentityDataStoreService` OSGi service uses this value to determine which data store implementation to access.

    ```toml
    [identity_datastore]
    datastore_type = "<Name of the identityDataStore class>"
    ```

    !!! Note
        The class name configuration for the identity data store is now separate from the listener configurations. If you're using a custom data store class, it's crucial to update your `deployment.toml` file to reflect this choice. This update ensures that your custom class will override the default configuration.

        To either maintain the previous behavior or use your custom data store, simply follow these steps and update your deployment.toml:

        By making this configuration adjustment, you can ensure that your system aligns with your preferred data store class, whether it's the previous default or a custom class you've implemented. This helps you tailor the system to your specific needs.

2. Map the identity claims mentioned below to attributes in the underlying user store.

    !!! info
        Learn more about [adding claim mapping]({{base_path}}/guides/dialects/add-claim-mapping).

    - `http://wso2.org/claims/identity/accountLocked`: This claim is
        used to store the status of the user's account, that is, if it's
        locked or not.

    - `http://wso2.org/claims/identity/unlockTime`: This is used to
        store the timestamp that the user's account is unlocked.

    - `http://wso2.org/claims/identity/failedLoginAttempts`: This is
        used to track the number of consecutive failed login attempts.
        It's based on this that the account is locked.
{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

WSO2 Identity Server includes hidden identity attributes that support internal functionality but don't appear in the Console UI by default. These attributes typically don't require mapping with Service Providers (SPs) or Identity Providers (IdPs).

You can customize the set of hidden identity attributes by adding the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[identity_mgt.claims]
hidden_claims = [
    "<attribute_uri_1>",
    "<attribute_uri_2>",
    ...
]
```

To add new attributes to the hidden list, include their URIs in the hidden_claims array.

To unhide default hidden attributes, override the configuration with an empty list or remove the relevant URIs.

{% endif %}