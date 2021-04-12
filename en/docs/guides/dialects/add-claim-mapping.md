# Add Claim Mapping

You can add new claim mapping to an existing claim dialect (see the
[Add Claim Dialects](../../../guides/dialects/add-claim-dialects) page). You can add either a new local claim, or an external claim:

-   [Add Local Claim](#add-local-claim) - Follow the
    steps in this section to add a new claim to the
    `https://wso2.org/claims` (local) claim dialect.
-   [Add External Claim](#add-external-claim) - Follow
    the steps in this section to add a new claim to any claim dialect
    other than the local (`https://wso2.org/claims`) dialect. To do this,
    map the relevant local claim from the local claim dialect (`https://wso2.org/claims`).

---

## Add local claim

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  In the **Main** > **Identity** > **Claims** > **Add**.
3.  Click **Add Local Claim** to add a new claim to the
    `https://wso2.org/claims` (local) claim dialect.

4.  Enter the required information.  

    ![local-claim-info](../../../assets/img/guides/local-claim-info.png) 

    See the following table for descriptions of these fields.

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Claim details</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Claim URI</strong></td>
    <td>This is the URI defined under the dialect, specific to the claim. There are different URIs available in the Identity Server and these equate to user attributes displayed in the profile of users. These URIs are mapped to the attributes in the underlying userstore.</td>
    </tr>
    <tr class="even">
    <td><strong>Display Name</strong></td>
    <td>This is the name of the claim displayed on the UI. This can be viewed in the user's profile by navigating to the <strong>Main</strong> tab in the management console and clicking <strong>List</strong> in <strong>Users and Roles</strong>. In the resulting page, click <strong>Users</strong> and in the list of users that are displayed, click <strong>User Profile</strong> next to the one you wish to check.</td>
    </tr>
    <tr class="odd">
    <td><strong>Description</strong></td>
    <td>This gives you the option to describe the functionality of the claim.</td>
    </tr>
    <tr class="even">
    <td><strong>Mapped Attribute</strong></td>
    <td><div class="content-wrapper">
    <p>This is the corresponding attribute name from the underlying userstore that is mapped to the Claim URI value.<br />
    <br />
    </p>
    <p>When you have multiple userstores connected to the Identity Server, this maps the equivalent attribute in all of them to the Claim URI you are configuring.<br />
    For example, if you specify the <code>                 cn                </code> attribute, this is mapped to the <code>                 cn                </code> attribute in all the connected userstores. If you want to specify the attribute in a specific userstore, you must add the domain name in addition to the mapped claim. For example, in a scenario where you have a primary userstore configured called PRIMARY and secondary userstores called AD (representing Active Directory), you can map an attribute from each of these userstores to the Claim URI value by clicking <strong>Add Attribute Mapping</strong>, selecting the respective userstore from the drop-down list, and mentioning the attribute of the userstore the attribute needs to be mapped to.<br />
    Example:<br />
    <img src="../../../assets/img/guides/map-attribute.png"/></p>
    </div></td>
    </tr>
    <tr class="odd">
    <td><strong>Regular Expression</strong></td>
    <td>This is the regular expression used to validate inputs. Example : For a claim URI like http://wso2.org/claims/email the regex should be something like " <strong>^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$</strong> ". This will validate the claim value and will not let other values except an email.</td>
    </tr>
    <tr class="even">
    <td><strong>Display Order</strong></td>
    <td>This enables you to specify the order in which the claim is displayed, among the other claims defined under the same dialect.</td>
    </tr>
    <tr class="odd">
    <td><strong>Supported by Default</strong></td>
    <td>If unchecked, this claim will not be prompted during user registration.</td>
    </tr>
    <tr class="even">
    <td><strong>Required</strong></td>
    <td>This specifies whether this claim is required for user registration.</td>
    </tr>
    <tr class="odd">
    <td><strong>Read-only</strong></td>
    <td>This specifies whether the claim is read-only or not. If the claim is read-only, it can't be updated by the user.</td>
    </tr>
    <tr class="even">
    <td><strong>Additional Properties</strong></td>
    <td>These properties are not currently used in current WSO2 Identity server. If we need to write an extension using current claims we can use these property values.</td>
    </tr>
    </tbody>
    </table>

5.  Click on the **Add** button.
6.  A new claim mapping is displayed in the list.  
    ![](../../../assets/img/guides/edit-claim-link.png)

----

## Add external claim

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Navigate to **Main** > **Claims** > **Add**.
3.  Click **Add External Claim** to add a new claim to any existing
    dialect other than the local dialect, i.e, `https://wso2.org/claims`.
4.  Select the **Dialect URI** of the dialect you want to add the claim
    to and enter the required information.  
    ![add-external-claim](../../../assets/img/guides/add-external-claim.png) 
    -   **External Claim URI:** This is the URI defined under the
        dialect, specific to the claim. There are different URIs
        available in the Identity Server and these equate to user
        attributes displayed in the profile of users. These URIs are
        mapped to local claims in the `https://wso2.org/claims` dialect
        which are in turn mapped to the the relevant attributes in the
        underlying userstore.
    -   **Mapped Local Claim:** This is the claim that is defined in the
        local claim dialect (`https://wso2.org/claims`) that is mapped
        to the relevant attribute in the underlying userstore.
5.  Click on the **Add** button.

!!! note
    
    Alternatively, you can also add a claim mapping using the
    configuration file instead of via the management console. To do this,
    
    1.  Open the `claim-config.xml` file found in the
        `<IS_HOME>/repository/conf/` folder and add the
        necessary claim mapping under the relevant claim dialect.
    
        **Sample claim mapping**
    
        ``` xml
        <Claim>
            <ClaimURI>country</ClaimURI>
            <DisplayName>Country</DisplayName>
            <AttributeID>country</AttributeID>
            <Description>Country name component</Description>
            <MappedLocalClaim>http://wso2.org/claims/country</MappedLocalClaim>
        </Claim>
        ```
    
    2.  Save the file and restart the server.
    
    !!! tip
        The claims configured in the `<IS_HOME>/repository/conf/claim-config.xml` file get applied only when you start the product for the first time, or for any newly created tenants. With the first startup, claim dialects and claims will be loaded from the file and persisted in the database. Any consecutive updates to the file will not be picked up and claim dialects and claims will be loaded from the database.
            
