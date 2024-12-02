# Manage Root Organizations (Tenants)

!!! Note
    **Tenants** will now be referred to as **Root Organizations**.

    This change is to ensure consistency across our documentation and to better reflect the hierarchical structure of organizations.

{{ product_name }}, by default, is configured with a single root organization named `carbon.super`. If you have the required permissions, you can configure more root organizations and maintain multiple isolated user bases on a single server/cluster at the same time.

!!! Info
    Learn more about [multi-tenancy]({{base_path}}/guides/multitenancy/).

!!! note "Use REST APIs to manage root organizations"

    {{product_name}} also offers REST APIs to conveniently manage root organizations. To try out the Tenant Management REST API, refer [here]({{base_path}}/apis/tenant-management-rest-api/).

## Add a root organization

Follow the steps given below to add a new root organization from the {{ product_name }} Console.

1.  Sign in to the Console of the `carbon.super` root organization.

    !!! info 
        To add and manage tenants using the {{ product_name }} Console, you need to be signed in as a super admin user. You can access the {{ product_name }} Console using the following URL: </br>
        `https://<IS_HOST>:<PORT>/console`.


2.  Open the **Root Organization** dropdown from the top left corner and click **Manage Root Organizations**.

    ![Root Organizations Dropdown]({{base_path}}/assets/img/guides/multitenancy/root-organizations-dropdown.png)

3.  On the **Root Organizations** page, click on the **New Root Organization** button.

    !!! info
        If you have already created root organizations, this page will be populated with them and the button will appear on the top right corner of the page.

    ![New Root Organization]({{base_path}}/assets/img/guides/multitenancy/new-root-organization.png)

4.  On the modal that opens up, enter the root organization details and click **Create**.

    ![Create Root Organization]({{base_path}}/assets/img/guides/multitenancy/create-root-organization-modal.png)
    
    <table>
      <thead>
        <tr>
          <th>Parameter Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Domain</code></td>
          <td>The domain name (e.g., abc.com) is used as a unique identifier for your organization. The URL for the new root organization's Console will be `https://<IS_HOST>:<PORT>/t/<DOMAIN>/console` URL.</td>
        </tr>
        <tr>
          <td><code>First Name</code></td>
          <td>The first name of the root organization admin.</td>
        </tr>
        <tr>
          <td><code>Last Name</code></td>
          <td>The last name of the root organization admin.</td>
        </tr>
        <tr>
          <td><code>Username</code></td>
          <td>The username of the root organization admin that will be used for signing in.</td>
        </tr>
        <tr>
          <td><code>Email</code></td>
          <td>The email address of the admin.</td>
        </tr>
        <tr>
          <td><code>Password</code></td>
          <td>The password used when singing in with the username specified above.</td>
        </tr>
      </tbody>
    </table>

5. Once a new root organization is created, it will be listed in the the **Root Organization** listing page as shown below.

    ![Root Organization Listing]({{base_path}}/assets/img/guides/multitenancy/root-organizaiton-listing.png)

## View root organization details

To view the details of the root organization, follow the steps given below.

1. Sign in to the `carbon.super` root organization on the {{ product_name }} Console.
2. Open the **Root Organizations** dropdown from the left top corner and click **Manage Root Organizations**.

    !!! info
        You will see information of all the root organizations that currently exist in the system. 

3. Several actions can be performed on the root organization from the **Root Organizations** listing page itself.

    ![Root Organization Actions]({{base_path}}/assets/img/guides/multitenancy/root-organization-card-actions.png)

    - **Edit**: Click on the **Edit** button to navigate to the details page of the respective root organization.
    - **More**: Click on the elipsis icon to view more actions.
        - **Go to Console**: Navigate to the Console of the respective root organization.
        - **Disable** / **Enable**: Depending on the current status of the root organization, you can disable or enable it.
        - **Delete**: Delete the root organization.

3. If you want to view details of a specific root organization, click on the **Edit** button of the respective root organization. Inside the root organization details page, you can perform the following actions:

    - **Edit Admin Details**: You can update the first name, last name, email, and password of the root organization admin.
    - **Disable** / **Enable**: Depending on the current status of the root organization, you can disable or enable it.
    - **Delete**: Delete the root organization.

      ![Root Organization Details]({{base_path}}/assets/img/guides/multitenancy/root-organization-details.png)

## Filter root organizations

The root organizations page provides a powerful search and filtering feature to help you easily locate specific root organizations.

!!! note
    Please note that the search and filter feature is case-insensitive.

### Basic search

To simply search for a root organization by its `domain` name, enter the domain name in the search bar and press `Enter`.

This will do a basic search to find the root organizations that **contain** the search term in their `domain` name.

![Root Organization Search]({{base_path}}/assets/img/guides/multitenancy/root-organization-basic-search.png)

### Advanced search

To perform an advanced search, click on the **Filter** icon. This will open up a popup where you can search for root organizations based on the following parameters:

- **Filter attribute**: Search for root organizations based on an attribute.
  
    !!! note
        Currently, only the `Domain` attribute is supported.

- **Filter condition**: Choose an operator to perform the search.
    - `Starts with`: Matches starting with the entered value.
    - `Ends with`: Matches ending with the entered value.
    - `Contains`: Matches containing the entered value.
    - `Equals`: Matches containing exactly the entered value.

- **Filter value**: Enter the search value.

![Root Organization Advanced Search]({{base_path}}/assets/img/guides/multitenancy/root-organization-advanced-search.png)
