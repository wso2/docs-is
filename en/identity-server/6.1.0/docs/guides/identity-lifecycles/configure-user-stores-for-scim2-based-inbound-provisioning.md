# Configure userstores for SCIM 2.0-Based Inbound Provisioning 

When a user or a group is created with SCIM 2.0, there are set of mandatory claim values that need to be saved along with the user or group. Some of these values are as follows.

-   urn:ietf:params:scim:schemas:core:2.0:meta.location 
-   urn:ietf:params:scim:schemas:core:2.0:meta.resourceType 
-   urn:ietf:params:scim:schemas:core:2.0:meta.version 
-   urn:ietf:params:scim:schemas:core:2.0:meta.created 
-   urn:ietf:params:scim:schemas:core:2.0:id 
-   urn:ietf:params:scim:schemas:core:2.0:meta.lastModified 
-   urn:ietf:params:scim:schemas:core:2.0:User:userName

Unless your user store is a JDBC user store, you need to map how these values are stored in your user store. This mapping can be done using the claim mapping setup in WSO2 Identity Server. You can find Active directory specific claim configurations when you [configure Active Directory user stores for inbound provisioning]({{base_path}}/guides/identity-lifecycles/configure-active-directory-user-stores-for-scim-2.0-based-inbound-provisioning/).

Now let's assume you have an AD userstore as the primary userstore and you have done the claim mappings for the SCIM attributes. 

Now suppose you need to add a secondary userstore, OpenLDAP. In this scenario, claim mappings done for AD may not be the same for OpenLDAP attributes. Therefore, it should be possible to map the claim attributes to the secondary userstore as well. Follow the instructions given below to do this.

---

## Configure claim mappings to use SCIM 2.0 for inbound provisioning 

1.  Log in to the WSO2 Identity Server and access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Navigate to **Main** >  **Identity** > **Claims** > **List**. For more information on configuring claims, see [Configure Claims]({{base_path}}/guides/dialects/configure-claims). Click on either **urn:ietf:params:scim:schemas:core:2.0:User** or **urn:ietf:params:scim:schemas:core:2.0** claim dialect (depending on which SCIM claim you need to update) and find the mapped local claim of the SCIM claim that you need to edit. 

    ![List of claims available for SCIM dialect]({{base_path}}/assets/img/guides/claim-list-scim2.png)

3.  Once you find the Mapped Local Claim, select that claim under **http://wso2.org/claims**.
4.  Click **Edit** and modify the **Mapped Attribute** field in the resulting page.
    
    !!! note 
        Here we have configured a claim attribute mapping for a primary userstore. If you have a secondary userstore, you need to add another mapping for those as well. To do that just click on **Add Attribute Mappings** and set the corresponding values for **userstore domain name** and **mapped attribute**.
        ![update-local-claim-scim2.png]({{base_path}}/assets/img/guides/update-local-claim-scim2.png)


!!! info "Related topics"
    -   For information about Local Claim Dialect attributes, click [here]({{base_path}}/guides/dialects/add-claim-mapping/).
    -	You can see the sample cURL commands for all SCIM 2.0 operations [here]({{base_path}}/apis/scim2-rest-apis). 
