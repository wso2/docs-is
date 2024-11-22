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
2. Under **Manage Attributes**, click **Attributes** to view the list of all attributes
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

6. Go to the **Additional Properties** tab and add additional properties that can be used when writing an extension.

    ![Edit additional properties]({{base_path}}/assets/img/guides/organization/attributes/edit-attributes-additional-properties.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

## Managing multiple email addresses and mobile numbers

{{ product_name }} allows users to associate multiple email addresses and mobile numbers with their profiles. User can 
select one email address and one mobile number as the primary email address and mobile number respectively from the 
list of email addresses and mobile numbers associated with their profile.

The following attributes are used to manage multiple email addresses and mobile numbers:

- **Email Addresses**
- **Verified Email Addresses**
- **Mobile Numbers**
- **Verified Mobile Numbers**

### Enabling multiple email addresses and mobile numbers

This feature is enabled by default for new organizations and existing organizations if there are no secondary user 
stores configured. To manually enable this feature, follow the below steps and enable 
"Display this attribute on the user's profile" for  **Email Addresses**, **Verified Email Addresses**,
 **Mobile Numbers**, **Verified Mobile Numbers**.

1. On the {{ product_name }} Console, navigate to {{ attribute_path }} > Attributes.
2. Click **Attributes** to display the list of attributes.
3. Click **Edit** next to the attribute.
4. Enable **Display this attribute on the user's profile**.
5. Click **Update**.

### User store compatibility

#### Non-JDBC secondary user stores

If you are using non-JDBC secondary user stores, you need to properly map how these attributes are stored in your user 
store. If mapping is not possible, you can either disable support for multiple email addresses and mobile numbers for 
the unsupported user store or disable the support for the entire organization:

**Exclude the user stores**

To disable multiple email and mobile support for specific unsupported user stores, follow these steps for  
**Email Addresses**, **Verified Email Addresses**, **Mobile Numbers**, **Verified Mobile Numbers**:

   1. On the {{ product_name }} Console, navigate to {{ attribute_path }} > Attributes.
   2. Click **Attributes** to see the list of attributes.
   3. Click **Edit** for the attribute you wish to modify.
   4. Go to the **Attribute Mappings** tab.
   4. Uncheck the **Enable for this user store** check box under user store you want to disable.
   5. Click **Update**.

   ![Enable for user store]({{base_path}}/assets/img/guides/organization/attributes/enable-for-user-store.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**Disable the Feature Organization-Wide**

To disable the multiple email addresses and mobile numbers support for the organization follow these steps for  **Email Addresses**, **Verified Email Addresses**, **Mobile Numbers**, **Verified Mobile Numbers**.

   1. On the {{ product_name }} Console, navigate to {{ attribute_path }} > Attributes.
   2. Click **Attributes** to see the list of attributes.
   3. Click **Edit** for the attribute you wish to modify.
   4. Uncheck **Display this attribute on the user's profile** to disable this attribute.
   5. Click **Update**.
