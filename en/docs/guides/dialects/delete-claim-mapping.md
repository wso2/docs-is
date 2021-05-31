# Delete Claim Mapping

If you want to remove a claim from your list, you can easily do so from
the Management Console. Refer to the steps below for detailed
instructions.

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Navigate **Main** > **Identity** > **Claims** > **List**.
3.  Click on any available dialect links.  
    ![dialect-links.png](../../../assets/img/guides/dialect-links.png)
4.  From the **Claim Dialect** view, you can view the claims defined for
    that particular dialect.  
    ![claim-dialect-view](../../../assets/img/guides/claim-dialect-view.png)
5.  Click the **Delete** link to remove the
    appropriate claim mapping.

!!! note
    
    Alternatively, you also can do this by deleting claim mappings from the `claim-config.xml` located in the `<IS_HOME>/repository/conf/` folder.

    !!! tip 
        {! fragments/claim-config-note.md !}
    
!!! info "Related topics"
    -   [Concepts: Claim Management](../../../references/concepts/claim-management/)