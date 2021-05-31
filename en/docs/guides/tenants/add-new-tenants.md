# Add New Tenants

## Add tenants using the management console

You can add a new tenant in the management console and then view it by
following the procedure below. In order to add a new tenant, you should
be logged in as a super user.

1.  Click **Multitenancy** > **Add New Tenant** in the **Configure** tab of your product's
    management console.

    <img src="../../../assets/img/guides/add-new-tenant.png" width="250" alt="Add a new tenant">

2.  Enter the tenant information in **Register A New Organization**
    screen as follows, and click **Save**.

    | Parameter Name                   | Description                                                                                                                                                                                                                                                                                       |
    |----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Domain**                       | The domain name for the organization, which should be unique (e.g., abc.com). This is used as a unique identifier for your domain. You can use it to log into the admin console to be redirected to your specific tenant. The domain is also used in URLs to distinguish one tenant from another. |
    | **Select Usage Plan for Tenant** | The usage plan defines limitations (such as the number of users, bandwidth etc.) for the tenant.                                                                                                                                                                                                  |
    | **First Name** / **Last Name**   | The name of the tenant admin.                                                                                                                                                                                                                                                                     |
    | **Admin Username**               | The login username of the tenant admin. The username always ends with the domain name (e.g., admin@abc.com )                                                                                                                                                                                      |
    | **Admin Password**               | The password used to log in using the admin username specified.                                                                                                                                                                                                                                   |
    | **Admin Password (Repeat)**      | Repeat the password to confirm.                                                                                                                                                                                                                                                                   |
    | **Email**                        | The email address of the admin.                                                                                                                                                                                                                                                                   |

3.  After saving, the newly added tenant appears in the **Tenants List**
    page as shown below. Click **View Tenants** in the **Configure** tab
    of the management console to see information of all the tenants that
    currently exist in the system. If you want to view only tenants of a
    specific domain, enter the domain name in the **Enter the Tenant
    Domain** parameter and click **Find**.  
    
    ![View a tenant](../../../assets/img/guides/view-tenant.png) 

!!! note
    To try out the Tenant Management REST API, refer [here](../../../develop/apis/tenant-management-rest-api).
