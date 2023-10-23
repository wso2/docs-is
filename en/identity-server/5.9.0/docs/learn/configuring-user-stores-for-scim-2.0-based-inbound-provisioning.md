# Configuring User Stores for SCIM 2.0 based inbound provisioning

WSO2 Identity server supports inbound provisioning based on both SCIM 1.1 and SCIM 2.0. This document provides the additional steps that need to be followed if you're using **SCIM 2.0** for inbound provisioning. If you need more information on SCIM 2.0 APIs, see [SCIM 2.0 APIs](../../develop/using-the-scim-2.0-rest-apis/).

When a user or a group is created with SCIM 2.0, there are set of mandatory claim values that need to be saved along with the user or group. Some of these values are as follows.

-   urn:ietf:params:scim:schemas:core:2.0:meta.location 
-   urn:ietf:params:scim:schemas:core:2.0:meta.resourceType 
-   urn:ietf:params:scim:schemas:core:2.0:meta.version 
-   urn:ietf:params:scim:schemas:core:2.0:meta.created 
-   urn:ietf:params:scim:schemas:core:2.0:id 
-   urn:ietf:params:scim:schemas:core:2.0:meta.lastModified 
-   urn:ietf:params:scim:schemas:core:2.0:User:userName

Unless your user store is a JDBC user store or the embedded LDAP (that comes with IS), you need to map how these values are stored in your user store. This mapping can be done using the claim mapping setup in the Identity Server. This mapping can be done in the claim mapping setup in the Identity Server. You can find Active directory specific claim configuration in [Configuring Active Directory User Stores for Inbound Provisioning](../../learn/configuring-active-directory-user-stores-for-scim-2.0-based-inbound-provisioning).

Now let's assume you have an AD user store as the primary user store and you have done the claim mappings for the SCIM attributes. Then you need to add a secondary user store and this will be an OpenLDAP. In this scenario, claim mappings done for AD may not be suited for OpenLDAP attributes. Therefore it should be possible to map claim attributes to the secondary user store. For this, you need to change the "Mapped Attribute" value as indicated below.

1.  Log in to the WSO2 Identity Server and access the [management console](../../setup/getting-started-with-the-management-console/).

2.  In the **Main** menu of the management console, click **List** under **Claims**. For more information on configuring claims, see [Claim Management](../../learn/claim-management). Click on either **urn:ietf:params:scim:schemas:core:2.0:User** or **urn:ietf:params:scim:schemas:core:2.0** claim dialect (depending on which SCIM claim you need to update) and find the mapped local claim of the SCIM claim that you need to edit. 

![claim-list-scim2](../assets/img/learn/claim-list-scim2.png)

3.  Once you found the Mapped Local Claim, select that claim under **http://wso2.org/claims**.
4.  Click Edit and modify the Mapped Attribute field in the resulting page.
    
    !!! note 
        Here we have configured a claim attribute mapping for a primary user store. If you have a secondary user store, you need to add another mapping for those as well. To do that just click on Add Attribute Mappings and set the corresponding values for user store domain name and mapped attribute.
        ![update-local-claim-scim2.png](../assets/img/learn/update-local-claim-scim2.png)

!!! info 
    For information about Local Claim Dialect attributes, click [here](../../learn/adding-claim-mapping).

You can see the sample cURL commands for all SCIM 2.0 operations [here](../../develop/using-the-scim-2.0-rest-apis). 
