# Log Claims in Audit Logs

This feature enables to specify the required claims to be logged in audit logs.

Follow the steps given below in order to configure this feature.

Make the following changes in the `deployment.toml` file in `<IS_HOME>/repository/conf/` to enable the audit logger.

1. Add the following configuration to the  `deployment.toml` file.

    ``` toml
    [event.default_listener.user_claim_audit_logger]     
    priority = 9
    enable = true
    ```

2. Add the following entry to define the claims that should be logged into the
    audit log.

    ```toml
    [audit.log.loggable_user_claim]
    claim1 = "http://wso2.org/claims/identity/accountLocked"
    claim2 = "http://wso2.org/claims/role"
    ```

    !!! note
        In the above configuration, you can define any claim available in
        the `<http://wso2.org/claims>` dialect as a
        `LoggableUserClaim` . The **accountLocked** and
        **role** claims have been used here only as examples.

3. Add the following configuration to the `deployment.toml` file to configure the `"LogUpdatedClaimsOnly"` property.

   ```
   [event.default_listener.user_claim_audit_logger]     
   priority = 9
   enable = true
   LogUpdatedClaimsOnly = true
   ```

   On making the above-mentioned changes, claims will be logged into the `audit.log` file in `<IS_HOME>/repository/log`.



  

  
