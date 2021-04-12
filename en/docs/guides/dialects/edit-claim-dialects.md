# Edit Claim Dialects

There are two ways you can use to edit dialects in WSO2 Identity Server.

## Use the management console

You can edit existing dialects by clicking on any available dialect link. Follow the instructions below to edit a dialect.

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Navigate to **Main** > **Identity** > **Claims** > **List**. 
3.  Click on any available dialect links.  
    ![dialect-links](../../../assets/img/guides/dialect-links.png)
4.  From the **Claim Dialect** view, you can view the claims defined for
    that particular dialect. If you need to edit a claim, click on the
    appropriate **Edit** link.  
    ![edit-claim-link](../../../assets/img/guides/edit-claim-link.png)
5.  Enter the new claim information in the required fields and click on
    the **Update** button.  
    ![update-local-claim](../../../assets/img/guides/update-local-claim.png) 

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
    
---

## Use the configuration file

Alternatively, you can also modify the claim dialects by editing the
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
    
    {! fragments/claim-config-note.md !}
    
!!! info "Relqted Topics" 

    - [Guides: Add Claim Dialects](../../../guides/dialects/add-claim-dialects)
    - [Concepts: Claim Management](../../../references/concepts/claim-management)