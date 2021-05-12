# Delete Claim Dialects

There are two ways you can use to delete claim dialects in WSO2 Identity Server.

## Use the management console

Follow the steps given below to remove the claim dialects using the
admin console.

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  In **Main** tab click **List** under **Claims** menu.
3.  Locate the claim dialect you want to delete and click on the
    **Delete** link next to the dialect.  
    ![claim-dialect-delete-link](/assets/img/guides/claim-dialect-delete-link.png)
4.  Confirm your request in the dialog window by clicking **Yes**.  
    ![confirm-claim-deletion](/assets/img/guides/confirm-claim-deletion.png)

---

## Use the configuration file

Alternatively, you can also delete the claim dialect by deleting the relevant claim configuration
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
    
    {! fragments/claim-config-note.md !}    
    
!!! info "Related Topics"

    -   [Concepts: Claim Management](../../../references/concepts/claim-management/)