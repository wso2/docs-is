# Managing Consent Purposes

This section guides you through adding consent purposes and defining
attributes of personal user information that need to be collected and
shared by WSO2 Identity Server. The purposes defined through the
management console will be used to prompt the user to provide consent
during self sign up in WSO2 Identity Server. It can be configured
tenant-wise in which case the user will be prompted to provide consent
for the purposes and attributes relevant to the user's specific tenant
domain.

  

!!! note
    
    -   For more information on how the consent purpose is used within the
        self registration flow, see [Configuring self-registration consent
        purposes](Self-Registration-and-Account-Confirmation_103330519.html#Self-RegistrationandAccountConfirmation-selfRegConsent)
        .
    -   For definitions on the consent receipt, purposes, and PII
        categories, expand the section below.
    
        ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here to see definitions
    
        -   **Personally Identifiable Information (PII)**  
            Any information that can be used to identify the PII Principal
            to whom the information relates to.
    
        <!-- -->
    
        -   **PII Principal  
            ** The natural person to whom the personally identifiable
            information (PII) relates to.
    
        <!-- -->
    
        -   **Consent  
            ** A Personally identifiable information (PII) Principal’s
            freely given, specific and informed agreement to the processing
            of their PII.
    
        <!-- -->
    
        -   **Purpose**  
            The business, operational or regulatory requirement for the
            collection, use and/or disclosure of a PII Principal's data. In
            other words, it is the reason personal information is collected
            by the entity.
    

-   [Adding a consent
    purpose](#ManagingConsentPurposes-Addingaconsentpurpose)
-   [List consent
    purposes](#ManagingConsentPurposes-Listconsentpurposes)

### Adding a consent purpose

The following steps describe how you can add a consent purpose using the
management console.

Before adding the consent purposes using the Management Console, make
sure you have the following permissions set:

-   `            /permission/admin/manage/identity/consentmgt/add           `

-   `            /permission/admin/manage/identity/claimmgt/metadata/view           `

1.  Log into the [Management
    Console](_Getting_Started_with_the_Management_Console_) .  
    To add a consent purpose within a specific tenant domain, login
    using tenant credentials.
2.  Navigate to Home\> Manage\> Consent Purposes and click **Add** .  
    ![](attachments/103330607/103330612.png){width="220" height="569"}  
    The following window will be displayed.

    ![](attachments/103330607/103330611.png){width="1000" height="308"}

3.  Add a **Purpose Name** and a **Description** .

    1.  **Purpose Name:** A short name for the requirement of why the
        PII item is required.

    2.  **Description:** A short, clear explanation of why the PII item
        is required.

    3.  **PII Categories:** In WSO2 Identity Server context, PII
        categories are the user claims. Users can give consent to share
        claims (PII categories) for different reasons. These PII
        Categories can be defined by clicking **Add PII Category** and
        selecting the relevant claim.

    Sample Purpose

    -   **Purpose Name:** Marketing

    -   **Description:** For marketing purposes

    -   **PII Categories:**
        -   -   http://wso2.org/claims/fullname
            -   http://wso2.org/claims/dob
            -   http://wso2.org/claims/emailaddress
            -   http://wso2.org/claims/phonenumber

4.  Click **Finish** to save the purpose.The following screen will be
    displayed:

    ![](attachments/103330607/103330609.png){width="1001" height="305"}

### List consent purposes

The following steps describe how you can list consent purposes using the
management console.

Before listing consent purposes using the Management Console, make sure
you have the following permissions set:

-   `            /permission/admin/manage/identity/consentmgt/list           `

-   `            /permission/admin/manage/identity/consentmgt/view                       `

1.  Log into the [Management
    Console](_Getting_Started_with_the_Management_Console_) .
2.  Navigate to Home\> Manage\> Consent Purposes and click **List** .  
    ![](attachments/103330607/103330610.png){width="220" height="513"}

3.  The following window will be displayed.

    !!! tip The **DEFAULT** purpose listed at the top is used by the
        WSO2 IS resident identity provider (IdP) when sharing user
        attributes with external applications for the single sign-on (SSO)
        authentication flow. Basically, it is used when WSO2 IS acts as the
        IdP for SSO authentication. This **DEFAULT** purpose includes all
        the PII categories. For more information about consent management
        with single sign on, see [Consent Management with

    ![](attachments/103330607/103330609.png){width="1001" height="305"}

4.  You can delete a purpose by clicking **Delete** . You can also view
    the PII categories associated with the **Purpose** by clicking
    **View PII Categories** in the **Action** column. The following
    window will be displayed when you click **View PII Categories.**

    **![](attachments/103330607/103330608.png){width="1005"
    height="223"}**

    !!! tip
    
        Delete PII Category
    
        To delete a specific PII cateogry, use the consent management
        [Delete PII Category REST
        API](https://docs.wso2.com/display/IS550/apidocs/Consent-management-apis/index.html#!/operations#PIICategory#consentsPiiCategoriesPiiCategoryIdDelete)
        . Note that you can not delete a PII category that is already
        associated with a consent receipt.
    
