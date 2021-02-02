# Configure Claims

A claim is a piece of information about a particular subject. It can be
anything that the subject is owned by or associated with, such as name,
group, preferences, etc. A claim provides a single and general notion to
define the identity information related to the subject.

A user claim is a claim that is related to a user. It can be used to
specify information that is directly related to the user, such as claims
related to the street address, username, email, first name, and more.

An identity claim is a special claim related to identity management. It
can be used to specify information about the user account or the state
of a user account such as the lastLoginTime, accountDisabled and
accountLocked claims. Identity claims are identified by the claim URI.
All identity claims have the term "identity" appended to the claim URI
as follows:
`http://wso2.org/claims/identity/accountDisabled. `

!!! note
    By default, identity claim values are stored in the JDBC datasource
    configured in the `         deployment.toml       ` file. If needed, you
    can configure WSO2 IS to store the claim values in the userstore as
    well.
    
    1.  Open the
        `           <IS_HOME>/repository/conf/deployment.toml         `
        file and do the following configuration to change the
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
        the attributes in the underlying user store. For more information on
        how to do this, see [Adding Claim Mapping](../../../guides/dialects/add-claim-mapping).
    
        -   http://wso2.org/claims/identity/accountLocked - This claim is
            used to store the status of the user's account, i.e., if it is
            locked or not.
    
        -   http://wso2.org/claims/identity/unlockTime - This is used to
            store the timestamp that the user's account is unlocked.
    
        -   http://wso2.org/claims/identity/failedLoginAttempts - This is
            used to track the number of consecutive failed login attempts.
            It is based on this that the account is locked.
    

See the following topics for information on configuring claims.

- [Add Claim Mapping](../../../guides/dialects/add-claim-mapping)
- [Edit Claim Mapping](../../../guides/dialects/edit-claim-mapping)
- [Delete Claim Mapping](../../../guides/dialects/delete-claim-mapping)

  
