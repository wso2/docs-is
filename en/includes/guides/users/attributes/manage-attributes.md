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

## Update attributes
To update the properties of a user attribute:

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes**.
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
3. Click **Edit** for the attribute you want to update.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-general.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims`. This cannot be edited.

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
              <td>If this checkbox is selected, the attribute is displayed in user profiles.</ td>
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

{% if product_name == "WSO2 Identity Server" %}

6. Optionally, you may use the **Additional Properties** tab to add additional properties that can be used when writing an extension.

    ![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

## Delete attributes

!!! warning "Before you proceed"

    Attributes cannot be deleted if it has any associations with external schema. If you have attribute mappings, make sure you delete these associations before attempting to delete an attribute.
    
    Refer to [Delete an OpenID Connect attribute]({{base_path}}/guides/users/attributes/manage-oidc-attribute-mappings/#delete-an-openid-connect-attribute) and [Delete a SCIM2 attribute]({{base_path}}/guides/users/attributes/manage-scim2-attribute-mappings/#delete-a-scim-20-custom-schema-attribute) to delete any existing associations.


To delete an attribute:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Select the attribute you wish to delete.
4. Click **Delete attribute** within the **Danger Zone**.
5. Select the checkbox to confirm your action.
6. Click **Confirm**.

!!! note

    Only custom attributes can be deleted.


## Assign multiple email addresses and mobile numbers to a user

{{ product_name }} allows users to associate multiple email addresses and mobile numbers with their profiles. For users with multiple values, they may also select a primary email address and a primary mobile number.

The following attributes are used for this purpose:

- Email Addresses
- Verified Email Addresses
- Mobile Numbers
- Verified Mobile Numbers

### Enable/Disable these attributes for users

Unless you have configured {{ 'secondary' if product_name == 'WSO2 Identity Server' else 'remote' }} user stores, the email address/mobile number-related attributes are already enabled to new and existing organizations. To manually enable/disable these attributes, follow the steps below:

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
   4. Find the corresponding user store and uncheck the **Enable for this user store** checkbox.
   5. Click **Update** to save the changes

   ![Enable for user store]({{base_path}}/assets/img/guides/organization/attributes/enable-for-user-store.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

