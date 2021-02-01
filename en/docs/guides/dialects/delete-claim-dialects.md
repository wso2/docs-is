# Delete Claim Dialects

There are two ways you can use to delete claim dialects in WSO2 Identity Server.

## Use the management console

Follow the steps given below to remove the claim dialects using the
admin console.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../../deploy/get-started/get-started-with-the-management-console).
2.  In **Main** tab click **List** under **Claims** menu.
3.  Locate the claim dialect you want to delete and click on the
    **Delete** link next to the dialect.  
    ![claim-dialect-delete-link](../../assets/img/guides/claim-dialect-delete-link.png)
4.  Confirm your request in the dialog window by clicking **Yes**.  
    ![confirm-claim-deletion](../../assets/img/guides/confirm-claim-deletion.png)

---

## Use the configuration file

**Alternatively,** instead of using the management console, you can also
delete the claim dialect by deleting the relevant claim configuration
code block in the `         claim-config.xml        ` configuration file
located in the `         <IS_HOME>/repository/conf        ` folder. A
sample claim dialect is given below.

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
    
    Edits to the claim dialects configured in `<IS_HOME>/repository/conf/claim-config.xml` file get applied only when you start the product for the first time, or for any newly created tenants. With the first startup, dialects and claims will be loaded from the file and persisted in the database. Any consecutive updates to the file will not be picked up and dialects and claims will be loaded from the database.
    
