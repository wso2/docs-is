# Configure the tenant loading policy

In  {{ product_name }} based on Carbon 4.4.0 or later versions, you have the option of setting the required tenant loading policy by enabling either **Lazy Loading** or **Eager Loading** of tenants. Additionally, you can separately control the loading policy for web applications and axis2 services deployed in your tenants using the **GhostDeployment** setting.

!!! note
    By default, **Lazy Loading** is enabled for tenants in {{ product_name }}.

First, read the following descriptions to understand how Lazy loading and Eager loading work:

-   **Lazy Loading:** Lazy loading of tenants ensures that all tenants are not loaded at the time the server starts. Instead, the tenants are loaded on demand (upon a request sent to a particular tenant). When a tenant receives a request, the particular tenant and all tenant-specific artifacts, except **web applications** and **axis2 tenants** (including the tenant-specific artifacts) are **unloaded** from memory if the tenant remains idle for a specified amount of time. You can configure the allowed tenant idle time. See [Configure Lazy Loading](#configure-lazy-loading) for instructions.
      
-   **Eager Loading:** Unlike lazy loading, eager loading ensures that tenants will be initialized when the server starts (without any delays). You can switch to eager loading if required. Note that you also have the option of enabling eager loading for specific tenants so that only the required tenants will be loaded when the server starts.
      
    When eager loading is enabled, tenants (and the tenant-specific artifacts) are expected to remain in memory without unloading until the server shuts down. See [Configure Eager Loading](#configure-eager-loading) for instructions.

Now, see the instructions given below to configure the required tenant loading policy for your system. 


## Configure Lazy Loading

As explained above, Lazy Loading (for tenants) is enabled as the loading policy in  {{ product_name }}, by default.

### Configure the tenant unloading time (for Lazy Loading)

If you have Lazy loading enabled, you can configure the allowed tenant idle time. For example, if you set the idle time to 30 minutes, tenants that are idle for more than 30 minutes will be unloaded automatically in your system. You can configure this value using two methods.

-   Specify the tenant idle time when you configure the tenant loading policy:

    1.  Open the ` deployment.toml` file in `<IS_HOME>/repository/conf`
        location.

    2.  Set the tenant idle time using the configurations element as shown below.

        ``` toml
        [tenant_mgt]
        tenant_idle_timeout = "30"
        ```

-   Alternatively, you can specify the tenant idle time when you start the server:

    1.  Open the product startup script (. ` /wso2server.sh ` file for Linux and ` wso2server.bat ` for Windows), which is stored in the ` <IS_HOME>/bin ` directory.
    2.  Add the following system property.

        ``` java
        $JAVA_OPTS \ 
        -Dtenant.idle.time=<value_in_minutes>. \
        ```

    3.  Restart the server.

## Configure Eager Loading

Follow the instructions given below to change the tenant loading policy to eager loading.

!!! note 
    **Before you enable eager loading**, note that the server's **memory footprint will increase** depending on the number of tenants and artifacts that are loaded.
        

1.  Open the `deployment.toml` file from the `<IS_HOME>/repository/conf/` directory.

2.  Enable the `eager_loading_tenants` configuration as shown below.

    ``` java
    [tenant_mgt]
    eager_loading_tenants = "*,!foo.com,!bar.com"
    ```

3.  You can then list the specific tenant domains to which eager loading should apply, by using the above configuration. See the following examples:
    -   If the setting should apply to all tenants, add `*`.
    -   If the setting should apply to all tenants, except `foo.com` and `bar.com`, add `*,! foo.com, ! bar.com`.
    -   If the setting should apply only to `foo.com` and `bar.com`, add `foo.com,bar.com `.
