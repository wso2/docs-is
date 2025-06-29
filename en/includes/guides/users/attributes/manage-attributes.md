# Manage attributes

An attribute encapsulates a single, identifiable characteristic of a user. They may range from basic identifiers such as first name, last name, home address to dynamic properties like membership status.

Attributes play a crucial role in managing user information within an organization and enables applications to access the required data seamlessly. Additionally, attributes are used to manage and display user information in user profiles.

The following guides explain how you may manage attributes of an organization.

## View attributes

To view attributes available for your organization:

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.

2. Under **Manage Attributes**, click **Attributes**.

    ![Attributes]({{base_path}}/assets/img/guides/organization/attributes/local-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    This page displays all the attributes available in your organization.

    ![View attributes]({{base_path}}/assets/img/guides/organization/attributes/view-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Add custom attributes

Apart from the default attributes, you may define your own custom attributes by following the steps below:

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes
3. Click **New Attribute** and enter values for the following properties:

    ![Custom attribute]({{base_path}}/assets/img/guides/organization/attributes/new-custom-attribute.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
       <tbody>
          <tr>
             <td><b>Attribute Name</b></td>
             <td>The name that will be shared with applications.</td>
          </tr>
          <tr>
              <td><b>Protocol Mappings</b></td>
              <td>Mappings for each protocol are generated automatically based on the attribute name. You may also customize them here. </td>
         </tr>
         <tr>
             <td><b>Attribute Display Name</b></td>
             <td>The name of the attribute that will be displayed in users' profiles.</td>
         </tr>
         <tr>
             <td><b>Regular expression</b></td>
             <td>The value of the attribute will be validated against the regex pattern specified here.</td>
         </tr>
       </tbody>
    </table>

4. Click **Finish**.

## Configure attributes

To configure properties of user attributes:

{% if product_name == "WSO2 Identity Server" and is_version < "7.1.0" %}

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
                <td><b>Data Type</b></td>
                <td>Refers to the kind of value it holds, such as a string, boolean or date-time.</td>
            </tr>
            <tr>
                <td><b>Multi Valued</b></td>
                <td>Specify whether the attribute supports multiple values.</td>
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

5. Attribute Data Types.

    An attribute can be of one of the following data types:

    - **Text** A plain string value.
    - **Options** A pre-defined list of selectable values.
    - **Integer** Whole numbers (for example `1`, `42`, `-7`).
    - **Decimal** Numbers that include decimals (for example `3.14`, `-0.5`).
    - **Boolean** A true or false value.
    - **DateTime** A date and time value.
    - **Object** A structured object that can include multiple sub-attributes.

    Options Data Type

    The **Options** data type allows you to define selectable values for an attribute using Label–Value pairs, where:

    - **Label** is what the user sees in the UI.
    - **Value** is what's stored internally.

    ![Options for attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-options.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    Object Data Type

    If an attribute needs to hold a structured object, use the **Object** data type and configure its **sub-attributes**.

    ![SubAttributes for attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-addtribute-sub-attributes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The following constraints apply if there is a mapped SCIM claim for the attribute:

        1. Each sub-attribute SCIM claim must start with the main attribute name followed by a dot (`.`) 
            and a descriptive sub-attribute name.

        2. You can't assign another attribute of type **Object** as a sub-attribute.

6. **Attribute Input Formats**

    The input format determines how attributes appear in the user interface. The available formats depend on the data type:

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/configure-attribute-input-format.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tbody>
            <tr>
                <td><b>Data Type</b></td>
                <td><b>Available Input Formats</b></td>
            </tr>
            <tr>
                <td><b>Boolean</b></td>
                <td>Checkbox, Toggle</td>
            </tr>
            <tr>
                <td><b>Options (Single)</b></td>
                <td>Dropdown, Radio Group</td>
            </tr>
            <tr>
                <td><b>Options (Multiple)</b></td>
                <td>Multi-select Dropdown, Checkbox Group</td>
            </tr>
            <tr>
                <td><b>Integer</b></td>
                <td>Text Input, Number Picker</td>
            </tr>
            <tr>
                <td><b>DateTime</b></td>
                <td>Text Input, Date Picker</td>
            </tr>
        </tbody>
    </table>

7. Under **Attribute Configurations**, use the table to configure how attributes are handled for each entity.

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

    !!! note
        Using the attribute configurations, you can also configure which attributes are displayed in the user creation form when
        [onboarding users]({{base_path}}/guides/users/manage-users/#onboard-a-single-user) in the console.

    To display an attribute in the user creation form, select the **both** **Display** and **Required** checkboxes for the **Administrator Console** entity.

8. Go to the **Attribute Mappings** tab and enter the attribute from each user store that you need to map.

    ![Edit attribute mappings]({{base_path}}/assets/img/guides/organization/attributes/edit-attribute-mappings.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "WSO2 Identity Server" and is_version >= "7.2.0" %}

Optionally, you may use the **Additional Properties** tab to add additional properties that can be used when writing an extension.

![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

## Delete attributes

!!! warning "Before you proceed"

    Attributes can't be deleted if it has any associations with external schema. If you have attribute mappings, make sure you delete these associations before attempting to delete an attribute.

    Refer to [Delete an OpenID Connect attribute]({{base_path}}/guides/users/attributes/manage-oidc-attribute-mappings/#delete-an-openid-connect-attribute) and [Delete a SCIM2 attribute]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings/#delete-a-scim-20-custom-schema-attribute) to delete any existing associations.

To delete an attribute:

1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Select the attribute you wish to delete.
4. Click **Delete attribute** within the **Danger Zone**.
5. Select the checkbox to confirm your action.
6. Click **Confirm**.

!!! note

    Only custom attributes can be deleted.

{% if product_name == "WSO2 Identity Server" %}

## Manage identity attributes

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

## Assign multiple email addresses and mobile numbers to a user

{{ product_name }} allows users to associate multiple email addresses and mobile numbers with their profiles. For users with multiple values, they may also select a primary email address and a primary mobile number.

The following attributes are used for this purpose:

- Email Addresses
- Verified Email Addresses
- Mobile Numbers
- Verified Mobile Numbers

### Enable/Disable multiple emails and mobile numbers feature

{% if product_name == "Asgardeo" %}
Unless you have configured remote user stores, the email address/mobile number-related attributes are already enabled to new and existing organizations.
{% endif %}
To manually enable or disable this feature, **you must update all related attributes** by following these steps:

1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** next to the corresponding attribute.
4. Enable/Disable the **Display this attribute on the user's profile** checkbox.
5. Click **Update** to save the changes.

### Exclude these attributes from a user store

For non-JDBC {{ 'secondary' if product_name == 'WSO2 Identity Server' else 'remote' }} user stores, you must ensure proper mapping of these attributes in the user store. If mapping is not feasible, you can disable support for these attributes in that user store by following the steps below.

   1. On the {{ product_name }} Console, navigate to **User Attributes and Stores** > **Attributes**.
   2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
   3. Click **Edit** for the attribute you wish to modify.
   4. Go to the **Attribute Mappings** tab.
   5. Find the corresponding user store and uncheck the **Enable for this user store** checkbox.
   6. Click **Update** to save the changes

   ![Enable for user store]({{base_path}}/assets/img/guides/organization/attributes/enable-for-user-store.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
