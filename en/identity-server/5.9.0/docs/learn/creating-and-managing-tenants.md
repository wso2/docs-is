# Creating and Managing Tenants

The goal of multitenancy is to maximize resource sharing by allowing multiple users (tenants) to log in and use a single server/cluster at the same time, in a tenant-isolated manner. That is, each user is given the experience of using his/her own server, rather than a shared environment. Multitenancy ensures optimal performance of the system's resources such as memory and hardware and also secures each tenant's personal data.

You can register tenant domains using WSO2 Identity Server [Management Console](../../setup/getting-started-with-the-management-console).

### About tenants in the Identity Server

-   Tenant admin details are saved by default into an internal H2 database. This is configurable to point to an external database if preferred. This can then be scaled appropriately. The tenants can
    have their own multiple directories set up and these configurations can be dynamically configured via the Management Console. 
-   The super admin or tenant admin can add user stores to their own domain. Dynamic configurations are possible only for secondary user stores and the 'primary' user store is not configurable at run time. This is because primary user stores are available for all tenants and allowing changes to the configuration at run time can lead to instability of the system. So the primary user store is treated as a     static property in the implementation and must be configured prior to run time.

!!! info 
    When multitenancy is enabled and a tenant becomes inactive for a long
    period of time, the tenant is unloaded from the server's memory. By
    default, the time period is 30 minutes. After that, the tenant has to
    log in again before sending requests to the server.

    You can change the default time period allowed for tenant inactiveness
    by adding `          -Dtenant.idle.time=<time_in_minutes>         ` Java
    property to the product's startup script (
    `          wso2server.sh         ` file for Linux and
    `          wso2server.bat         ` for Windows) as shown below:

    

    ``` java
    JAVA_OPTS \
        -Dtenant.idle.time=30 \
    ```

!!! tip
    In order to manage tenants, you need to be logged in as a super tenant.

### Creating a tenant

To create a new tenant, take the following steps:

1.  Use admin as the username and password to log in as a super tenant.
2.  On the **Configure** tab of the Management Console, click **Add New
    Tenant**.
3.  Enter the information about this tenant as follows:  
    -   **Domain** -  The domain name for the organization, which should
        be a unique name (e.g., abc.com). This is used as a unique
        identifier for your domain. You can use it to log into the admin
        console to be redirected to your specific tenant. The domain is
        also used in URLs to distinguish one tenant from another.
    -   **Usage plan for the tenant** - The usage plan defines
        limitations (such as number of users, bandwidth, etc.) for the
        tenant. The Identity Server comes with a predefined list, and
        you can add your item and/or tailor to the existing items. For
        on-premises deployment, there is only one default plan, i.e.,
        Demo.  
    -   **First Name** - First name of the tenant admin.
    -   **Last Name** - Last name of the tenant admin.
    -   **Admin Username** - The username the tenant admin will use to
        log in. The username must always end with the domain name (e.g.,
        <admin@abc.com> ).
    -   **Email** - The email address of the admin.  
        ![creating-a-tenant](../assets/img/using-wso2-identity-server/creating-a-tenant.png)

Once you have added a tenant, you can log out of the Identity Server and
log back in using the newly created tenant. Now, any settings you may do
using that tenant will be unique to your tenant alone. You can now
deploy, manage and test applications on this tenant, using the specific
tenant URL.

### Viewing tenants

To view existing tenants, on the **Configure** tab in WSO2 Identity
Server Management Console, click **View Tenants**.

!!! info "Related Links"

    The following topics provide more information on various tenant related
    aspects of the WSO2 Identity Server.

    -   See [Configuring a SP and IdP Using Configuration
        Files](../../setup/configuring-a-sp-and-idp-using-configuration-files) for
        more information on configuring an identity provider that can be
        shared across multiple tenants.
    -   See [Working with Multiple
        Tenants](../../administer/working-with-multiple-tenants)
        for more information on multitenancy and its architecture.
    -   See [Managing Tenants with APIs](../../develop/managing-tenants-with-apis) for
        more information on using APIs to manage tenants.
