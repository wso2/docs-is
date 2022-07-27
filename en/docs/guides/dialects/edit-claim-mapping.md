# Edit Claim Mapping

There are two ways to edit a claim mapping.

## Use the management console

Follow the steps given below to edit a claim mapping.

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Go to **Main** > **Identity** > **Claims** and click  **List**.
3.  Click on any available dialect.  
    ![dialect-links]({{base_path}}/assets/img/guides/dialect-links.png)
4.  From the **Claim Dialect** view, you can view the claims defined for
    that particular dialect. 
    ![claim-dialect-view]({{base_path}}/assets/img/guides/claim-dialect-view.png)
5.  Click **Edit**, enter the new claim information in the required fields, and click **Update**.

    -   If you are editing a local claim, you will see the following:

        ![update-local-claim]({{base_path}}/assets/img/guides/update-local-claim.png) 

    -   If you are editing an external claim, you will see the following:
      
        ![editing-external-claim]({{base_path}}/assets/img/guides/editing-external-claim.png)

## Use the configuration file

Alternatively, you can do this by editing claim mappings from the `claim-config.xml` file (located in the `<IS_HOME>/repository/conf/` folder).
    
!!! note
    {!./includes/claim-config-note.md !}

A sample claim mapping is given below.

``` xml
<Claim>
    <ClaimURI>country</ClaimURI>
    <DisplayName>Country</DisplayName>
    <AttributeID>country</AttributeID>
    <Description>Country name component</Description>
    <MappedLocalClaim>http://wso2.org/claims/country</MappedLocalClaim>
</Claim>
```
    
!!! info "Related topics"

    -   [Guides: Configure Claims]({{base_path}}/guides/dialects/configure-claims)
    -   [Concepts: Claim Management]({{base_path}}/references/concepts/claim-management/)
