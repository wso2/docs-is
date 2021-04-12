# Configure Claims

For information on claims, see [Claim Management](../../../references/concepts/claim-management)

By default, identity claim values are stored in the JDBC datasource
configured in the `         deployment.toml       ` file. If needed, you
can configure WSO2 IS to store the claim values in the userstore as
well.

1.  Open the
    `           <IS_HOME>/repository/conf/deployment.toml         `
    file and add the following configuration to change the
    `           data_store          ` property value to
    `           UserStoreBasedIdentityDataStore          ` .

    ``` toml
    [event.default_listener.governance_identity_mgt]
    priority= "95"
    enable = true
    [event.default_listener.governance_identity_store]
    priority= "97"
    enable = true
    data_store = "org.wso2.carbon.identity.governance.store.UserStoreBasedIdentityDataStore"
    ```

2.  The identity claims mentioned below should be mapped correctly to
    the attributes in the underlying userstore. For more information on
    how to do this, see [Adding Claim Mapping](../../../guides/dialects/add-claim-mapping).

    -   `http://wso2.org/claims/identity/accountLocked` - This claim is
        used to store the status of the user's account, i.e., if it is
        locked or not.

    -   `http://wso2.org/claims/identity/unlockTime` - This is used to
        store the timestamp that the user's account is unlocked.

    -   `http://wso2.org/claims/identity/failedLoginAttempts` - This is
        used to track the number of consecutive failed login attempts.
        It is based on this that the account is locked.

        
!!! info "Related Topics"

    - [Guides: Add Claim Mapping](../../../guides/dialects/add-claim-mapping)
    - [Guides: Edit Claim Mapping](../../../guides/dialects/edit-claim-mapping)
    - [Guides: Delete Claim Mapping](../../../guides/dialects/delete-claim-mapping)
    - [Concepts: Claim Management](../../../references/concepts/claim-management)

  
