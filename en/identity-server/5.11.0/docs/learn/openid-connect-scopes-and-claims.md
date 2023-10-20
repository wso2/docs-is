# OpenID Connect Scopes and Claims

The [OpenID Connect specification](http://openid.net/developers/specs/)
includes a variety of scopes. Scopes are a form of delegated access
control that specify the scope of an access request. From an OpenID
Connect (OIDC) perspective, scopes allow an application to request for
additional user details that are sent in the form of claims.

In WSO2 Identity Server, the mapping between scopes and claims are
persisted in the database layer.

### How does OpenID Connect scope-claim mapping work?

The default OIDC scope claim mappings can be found in the
`         <IS_HOME>/repository/conf/identity/oidc-scope-config.xml        `
file. In the very first server startup, scopes and claims defined in
this file are stored in the database and the same data is displayed in
the [management console](../../setup/getting-started-with-the-management-console)
UI.

When working with tenants, the data that is defined in the
aforementioned file is stored in the database against the tenant ID.
After the very first server start up and the tenant creation, any
changes made to the `         oidc-scope-config.xml        ` file will
not have any effect. So adding, removing, and editing OIDC scopes should
be done through the management console UI from this point onwards.

### Adding, editing, and viewing scopes

In the management console, the **OIDC Scopes** section can be viewed
under **Manage**. Click **Add** to add a new scope mapping or click
**List** to view a list of existing scopes.

-   When adding scopes, you can assign claims to a scope by entering a
    **Scope Name** and assigning an available OIDC claim to that scope
    from the dropdown that appears once you click the **Add OIDC Claim**
    button as indicated below. Click **Finish** to add the new scope
    claim mapping.  
    ![oidc-claims]( ../assets/img/using-wso2-identity-server/oidc-claims.png)
-   Listing the scopes can be done clicking on the **List** button. You
    can add and remove claims from the scope by using the **Add claims**
    and **Update** buttons respectively. You can also delete a scope
    claim mapping.
    ![oidc-scope-list](../assets/img/using-wso2-identity-server/oidc-scope-list.png)
    
!!! Tip 
    To add custom claims to any OIDC scope:
    
    1.  Add [a custom claim to the local dialect](../../learn/adding-claim-mapping/#add-local-claim), `https://wso2.org/claims`
    2.  Add [an external claim](../../learn/adding-claim-mapping/#add-external-claim) into the `http://wso2.org/oidc/claim` dialect referring the local claim created in step1.
    3.  In the **OIDC Scopes** section, add the newly added OIDC claim under the desired *scopes*.
    
    For a sample use case, see [Handling Custom OIDC Claims.](https://medium.com/identity-beyond-borders/handling-custom-claims-with-openid-connect-in-wso2-identity-server-56d3b6e4319b)
    
### Database structure for OIDC scope claim mapping

Two new tables and a new index have been introduced to persist scope
claim mapping as indicated below.

??? Abstract "Click to view table structure"
    ``` sql
    CREATE TABLE IF NOT EXISTS IDN_OIDC_SCOPE (
                ID INTEGER NOT NULL AUTO_INCREMENT,
                NAME VARCHAR(255) NOT NULL,
                TENANT_ID INTEGER DEFAULT -1,
                PRIMARY KEY (ID)
    );
    
    
    CREATE TABLE IF NOT EXISTS IDN_OIDC_SCOPE_CLAIM_MAPPING (
                ID INTEGER NOT NULL AUTO_INCREMENT,
                SCOPE_ID INTEGER,
                EXTERNAL_CLAIM_ID INTEGER,
                PRIMARY KEY (ID),
                FOREIGN KEY (SCOPE_ID) REFERENCES IDN_OIDC_SCOPE(ID) ON DELETE CASCADE,
                FOREIGN KEY (EXTERNAL_CLAIM_ID) REFERENCES IDN_CLAIM(ID) ON DELETE CASCADE
    );
    
    
    CREATE INDEX IDX_AT_SI_ECI ON IDN_OIDC_SCOPE_CLAIM_MAPPING(SCOPE_ID, EXTERNAL_CLAIM_ID);
    ```
