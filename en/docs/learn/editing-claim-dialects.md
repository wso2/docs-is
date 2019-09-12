# Editing Claim Dialects

There are two ways to edit claim dialects in WSO2 Identity Server.


### Using the management console

You can edit existing claim dialects by clicking on any available
dialect link. Follow the instructions below to edit a claim dialect.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console)
    .
2.  Click **Main** to access the **Main** menu and click **List** under
    **Claims**.
3.  Click on any available dialect links.  
    ![dialect-links](../../assets/img/using-wso2-identity-server/dialect-links.png)
4.  From the **Claim Dialect** view, you can view the claims defined for
    that particular dialect. If you need to edit a claim, click on the
    appropriate **Edit** link.  
    ![edit-claim-link](../../assets/img/using-wso2-identity-server/edit-claim-link.png)
5.  Enter the new claim information in the required fields and click on
    the **Update** button.  
    ![new-claim-info](../../assets/img/using-wso2-identity-server/new-claim-info.png)

    | Attribute            | Description                                                                | Sample value                                                                                                                       |
    |----------------------|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
    | Display Name         | The name of the claim value which is display to the user.                  | Street Address                                                                                                                     |
    | Desciption           | A small description of the claim to help the user to understand it easily. | Address of the street                                                                                                              |
    | Claim Uri            | The URI which defines the claim.                                           | `                               http://schemas.xmlsoap.org/ws/2005/05//identity/claims/streetaddress                             ` |
    | Mapped Attribute     | The attribute which mapped to the claim.                                   | streetAddress                                                                                                                      |
    | Regular Expression   | A regular expression that helps to verify the input.                       | A street address can be an integer or a string, therefore regex can be like " ****^ \\d { 1, 45 } $**** "                         |
    | Display Order        | Order to display claims.                                                   | 1                                                                                                                                  |
    | Supported by Default | Whether the claim is displayed in the profile of the user.                 | Enabled                                                                                                                            |
    | Required             | Whether the claim is mandatory.                                            | Enabled                                                                                                                            |
    | Read-only            | Whether the claim cannot be updated later (Read only).                     | Enabled                                                                                                                            |

    !!! note
    
        When you are using [more than one user
        store](../../using-wso2-identity-server/configuring-secondary-user-stores), you must map the
        attributes correctly using claim management. Under “Mapped
        Attribute(s)” you need to follow the pattern.
    
        ``` java
        {domain_name/attribute_Name};{domain_name/attribute_Name}; {domain_name/attribute_Name};
        ```
    
        However, for the default user store, you do not need to provide the
        domain name. As an example, if you have two user stores, one is the
        default and another one with domain “LDAP” then the pattern would be
        as follows for “
        `                       http://wso2.org/claims/emailaddress                     `
        ".
    
        ``` java
            email;LDAP/mail
        ```
    

### Using the configuration file

**Alternatively,** instead of editing the dialect using the management
console, you can also edit the claim dialect by editing the
`         claim-config.xml        ` configuration file located in the
`         <IS_HOME>/repository/conf        ` folder. A sample claim
dialect is given below.

``` java
<Dialect dialectURI="http://wso2.org/SampleAppClaims">    
    <Claim>
        <ClaimURI>http://wso2.org/SampleAppClaims/givenname</ClaimURI>
        <DisplayName>First Name</DisplayName>
        <MappedLocalClaim>http://wso2.org/claims/givenname</MappedLocalClaim>
    </Claim>
    <Claim>
        <ClaimURI>http://wso2.org/SampleAppClaims/nickName</ClaimURI>
        <DisplayName>Nick Name</DisplayName>
        <MappedLocalClaim>http://wso2.org/claims/nickname</MappedLocalClaim>
    </Claim>
</Dialect>
```

!!! note
    
    Edits to the claim dialects configured in
    `                   <                  IS_HOME>/repository/conf/                   claim                  -config.xml        `
    file get applied only when you start the product for the first time, or
    for any newly created tenants. With the first startup, claim dialects
    and claims will be loaded from the file and persisted in the database.
    Any consecutive updates to the file will not be picked up and claim
    dialects and claims will be loaded from the database.
    
