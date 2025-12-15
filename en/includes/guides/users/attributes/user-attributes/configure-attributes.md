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

## General settings

Use the following settings to change details and behavior of an attribute. To configure them, go to the **General** tab of the attribute.

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
            <td>Refers to the kind of value it holds. Refer to <a href="{{base_path}}/guides/users/attributes/user-attributes/attribute-configurations-reference/">reference</a> for more details.</td>
        </tr>
        <tr>
            <td><b>Allow multiple values for this attribute</b></td>
            <td>Specify whether to support multiple values for this attribute.</td>
        </tr>
        {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
        <tr>
            <td><b>Input Format</b></td>
            <td>Specify the kind of input it supports. Refer to <a href="{{base_path}}/guides/users/attributes/user-attributes/attribute-configurations-reference/">reference</a> for more details.</td>
        </tr>
        {% endif %}
        <tr>
            <td><b>Regular expression</b></td>
            <td>The attribute value will be validated against the regex pattern specified here.</td>
        </tr>
        {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0") %}
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
        {% endif %}
    </tbody>
</table>

## Display settings

These settings control where an attribute appears in the {{product_name}} Console, and whether the attribute is required or read-only.

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

!!! Danger "Only for display purposes"

    These settings only control how the attributes behave in WSO2-managed user interfaces. They **do not** affect backend or API validation.

!!! tip "Refer these settings from your own end-user UI"

    If you create a custom end-user profile UI, you can reference these configurations to apply the same rules (Display, Required, Read-only) in your own forms.

!!! tip "Display attributes in the user creation form"

    You can control whether to display this attribute when [onboarding users]({{base_path}}/guides/users/manage-users/#onboard-a-single-user) from the Console. To do so, select both  **Display** and **Required** for **Administrator Console**.

## Additional settings

Apart from the properties in the **General** tab, you can configure the following additional settings for an attributes.

### Attribute mappings

The **Attribute Mappings** tab lets you map attributes from each connected user store to the user attribute in {{product_name}}. This makes sure the attribute is stored and updated in the correct user store field.

![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version >= "7.2.0" %}

### Addition properties

You can use the **Additional Properties** tab to add any extra properties you need when writing an extension.

![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "WSO2 Identity Server" %}

## Configure the storage location of attributes

{{product_name}} gives you freedom to choose in what databases each attribute gets stored. You can divide attributes into two broad categories and {{product_name}} manages each of them differently as explained in the following sections.

- **User attributes** - Personal information that identifies a user, such as their name, email, or phone number.

- **Identity attributes** - Information that describes the state or status of a user account rather than personal details. Unlike user store attributes, identity attributes focus on account-related properties, such as whether the account is verified, locked, active, or disabled.

### Change the default identity attribute store

By default, {{product_name}} stores identity attributes internally in the user store configured in the `<IS_HOME>/repository/conf/deployment.toml` file. To change this,

1. Add the following configuration to the `deployment.toml` file. The `IdentityDataStoreService` OSGi service uses this value to determine which data store implementation to access.

    ```toml
    [identity_datastore]
    datastore_type = "<Name of the identityDataStore class>"
    ```

    !!! Note

        The class name configuration for the identity data store is now separate from the listener configurations. If you're using a custom data store class, it's crucial to update your `deployment.toml` file to reflect this choice. This update ensures that your custom class will override the default configuration.

        To either maintain the previous behavior or use your custom data store, simply follow these steps and update your deployment.toml:

        By making this configuration adjustment, you can ensure that your system aligns with your preferred data store class, whether it's the previous default or a custom class you've implemented. This helps you tailor the system to your specific needs.

2. For each attribute below, open its **Attribute Mappings** tab and map it to the corresponding attribute in the connected store.

    - `http://wso2.org/claims/identity/accountLocked`: Stores the locked status of the user's account.

    - `http://wso2.org/claims/identity/unlockTime`: Time at which the user’s account gets unlocked.

    - `http://wso2.org/claims/identity/failedLoginAttempts`: Tracks the number of consecutive failed login attempts. Account locking happens based on this value.
{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version >= "7.1.0") %}
### Select storage location for selected attributes

{% if product_name == "WSO2 Identity Server" and is_version in ["7.1.0", "7.2.0"] %}
!!! note
    {% if is_version == "7.1.0" %}
    The selective configuration of storage location for attributes is available in WSO2 IS 7.1.0 from update level 42 onwards.
    {% else %}
    The selective configuration of storage location for attributes is available in WSO2 IS 7.2.0 from update level 5 onwards.
    {% endif %} See how to [Upgrade the WSO2 Identity Server]({{base_path}}/deploy/upgrade/upgrade-wso2-is).
{% endif %}

{{product_name}}, by default, stores identity attributes internally and user attributes in the connected user stores. If you want to store and manage an identity attribute in your user stores or a user attribute in the identity store, you can do so by following the steps below.

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.

2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.

3. Click **Edit** for the attribute you want to update.

4. In the **General** tab, check/uncheck the **Manage in User store** checkbox. If,

    - **checked**: The attribute values for all user stores will be managed in the user store.

    - **unchecked**: The attribute values for all user stores will be managed internally by the system.

    !!! note

        This checkbox is, by default,

        - checked for user attributes.
        - unchecked for identity attributes.

    ![Managed in User Store]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-managed-in-user-store.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Go to the **Attribute Mappings** tab and further customize the storage behavior. To do so,

    1. Against each connected user store, check/uncheck the **Manage in user store** checkbox. If,

        - **checked**: The attribute values for this user store will be managed in the user store.

        - **unchecked**: The attribute values for this user store will be managed internally by the system.

    2. Map the attribute from each user store that corresponds to the specific attribute.

    ![Selective Manage in User Store]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-excluded-user-store.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! Danger "Warning"

        Changing the attribute storage location may cause any existing attribute values stored in the user store or 
        managed internally to become inaccessible. Ensure that you understand the impact before making this change.

        If you have configured a **Read-Only User Store** and enable **Manage in User Store** for an identity attribute, 
        the attribute will not be editable in the user profile. Consequently, certain internal functions that rely on 
        updating these attributes may not work as expected.

6. Click **Update** to save the changes.
{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}

## Configure hidden attributes

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

- To add new attributes to the hidden list, include their URIs in the hidden_claims array.

- To unhide default hidden attributes, override the configuration with an empty list or remove the relevant URIs.

{% endif %}