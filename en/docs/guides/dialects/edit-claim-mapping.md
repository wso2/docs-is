# Edit Claim Mapping

You can edit existing claims by clicking on any available claim link.
Follow the instructions below to edit a claim.

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Navigate to **Main** > **Identity** > **Claims** >  **List**.
3.  Click on any available dialect links.  
    ![dialect-links](/assets/img/guides/dialect-links.png)
4.  From the **Claim Dialect** view, you can view the claims defined for
    that particular dialect. Click on the appropriate **Edit** link.  
    ![claim-dialect-view](/assets/img/guides/claim-dialect-view.png)
5.  Enter the new claim information in the required fields and click on
    the **Update** button.

    1.  If you are editing a local claim, you will see the following
        screen.

        ![update-local-claim](/assets/img/guides/update-local-claim.png) 

    2.  If you are editing an external claim, you will see the following
        screen.  
        ![editing-external-claim](/assets/img/guides/editing-external-claim.png)

!!! note    
    Alternatively, you can edit the file configuration in
    `<IS\_HOME\>/repository/conf/claim-config.xml` and start the server
    to view the changed claims. 
    
    !!! tip 
        {! fragments/claim-config-note.md !}
    
!!! info "Related Topics"

    -   [Guides: Configure Claims](../../../guides/dialects/configure-claims)
    -   [Concepts: Claim Management](../../../references/concepts/claim-management/)
