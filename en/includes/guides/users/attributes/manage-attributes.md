# Manage attributes

An attribute is a piece of information about a particular user. It can be anything associated with the user, such as name, group, preferences, etc.

User attributes represent information directly related to the user, such as the street address, username, email, first name, and more.

You need user attributes to maintain the required user information in an organization. You can select the user information for your applications by using these attributes. Also, the user information displayed in user profiles is managed using attributes.

See the information given below to manage attributes in your organization.

## View attributes
To view the attributes available for your organization:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** again under the **Manage Attributes** section.

   ![View attributes]({{base_path}}/assets/img/guides/organization/attributes/view-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

You can now see the complete list of attributes along with **Attribute Display Name** and **Attribute** name.

## Add custom attributes

To add a custom attribute:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **New Attribute** and enter values for the following properties:

    ![Custom attribute]({{base_path}}/assets/img/guides/organization/attributes/new-custom-attribute.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    <table>
       <tbody>
          <tr>
             <td><b>Attribute Name</b></td>
             <td>The name that will be shared with applications.</td>
          </tr>
          <tr>
              <td><b>Protocol Mappings</b></td>
              <td>Mappings are auto-generated for the protocols. You can customize them here. </td>
         </tr>
         <tr>
             <td><b>Attribute Display Name</b></td>
             <td>The name that will be used in a user's profile.</td>
         </tr>
       </tbody>
    </table>

4. Click **Finish**

## Update attributes
To update the properties of a user attribute:

1. On the {{ product_name }} Console, go to {{ attribute_path }} > **Attributes**.
2. Click **Attributes** to see the list of attributes.
3. Click **Edit** for the attribute you want to update.

    ![Edit attributes]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        The **Attribute** field specifies the unique identifier of the attribute. It always starts with `http://wso2.org/claims`. This cannot be edited.

4. Update the following values.

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

6. Click **Update**.