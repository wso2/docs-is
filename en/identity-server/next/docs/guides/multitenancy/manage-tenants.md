# Manage Root Organizations (Tenants)

!!! Note
    From now on, **Tenants** will be referred to as **Root Organizations**.

    This change is to ensure consistency across our documentation and to better reflect the hierarchical structure of our organization system.

By default, {{ product_name }} is configured with a single root organization named `carbon.super`. If you have the required permissions, you can configure more root organizations and maintain multiple isolated user bases on a single server/cluster at the same time.

!!! Info
    Learn more about [multi-tenancy]({{base_path}}/guides/multitenancy/).

## Add new root organizations

Follow the steps given below to add a new root organization from the {{ product_name }} Console.

!!! Note
    You can access the {{ product_name }} Console using the following URL: `https://<IS_HOST>:<PORT>/console`.

1.  Sign in to the super tenant on the {{ product_name }} Console.

    !!! info 
        To add and manage tenants using the {{ product_name }} Console, you need to be signed in as a super admin user.

2.  Open the **Root Organizations** dropdown from the left top corner and click **Manage Root Organizations**.

    ![Root Organizations Dropdown]({{base_path}}/assets/img/guides/multitenancy/root-organizations-dropdown.png)

3.  On the **Root Organizations** page, click on the **New Root Organization** button.

    !!! info
        If you have already created root organizations, you will see this button on the right top corner of the page.

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
          <td>The domain name (e.g., abc.com), which is used as a unique identifier for your domain. You can `https://<IS_HOST>:<PORT>/t/<DOMAIN>/console` format to access the root organization's dedicated Console. The domain is also used in URLs to distinguish one root organization from another.</td>
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
          <td>The sign-in username of the root organization admin. The username always ends with the domain name (e.g., admin@abc.com).</td>
        </tr>
        <tr>
          <td><code>Email</code></td>
          <td>The email address of the admin.</td>
        </tr>
        <tr>
          <td><code>Password</code></td>
          <td>The password used to sign in using the admin username specified.</td>
        </tr>
      </tbody>
    </table>

4. Once a new root organization is created, it will be listed in the the **Root Organization** listing page as shown below.

![Root Organization Listing]({{base_path}}/assets/img/guides/multitenancy/root-organizaiton-listing.png)

## View root organization details

To view the details of the root organization, follow the steps given below.

1. Sign in to the super tenant on the {{ product_name }} Console.
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

!!! note
    To try out the Tenant Management REST API, refer [here]({{base_path}}/apis/tenant-management-rest-api/).
