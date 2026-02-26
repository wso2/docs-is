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

Default attributes and custom attributes come with a range of properties that you can configure to meet your requirements. To discover these properties,

1. On the WSO2 Identity Server Console, go to User **Attributes & Stores** > **Attributes**.

2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes.
   
3. Click **Edit** for the attribute you want to update.

For a comprehensive guide on configuring attributes, refer to the [configure attributes]({{base_path}}/guides/users/attributes/user-attributes/configure-attributes/) documentation.

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
