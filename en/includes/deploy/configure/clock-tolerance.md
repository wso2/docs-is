# Configure clock tolerance for My Account and Console

The `clockTolerance` parameter can be configured for both the Console and the My Account portal to manage slight clock mismatches between {{product_name}} and clients. This setting helps avoid issues in scenarios where the system’s time is not perfectly aligned.

To configure clock tolerance, add the following configurations to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

- For the **Console**,

    ```yaml
    [console]
    idp_configs.clockTolerance = <value_in_seconds>
    ```

- For the **My Account** portal,

    ```yaml
    [myaccount]
    idp_configs.clockTolerance = <value_in_seconds>
    ```

!!! note "Important"
    
    It is strongly recommended to synchronize the clocks of the servers or virtual machines (VM) running {{product_name}} with a Network Time Protocol (NTP) server. Time discrepancies across servers can cause issues with authentication, token validation, session expiration, and other time-sensitive operations.