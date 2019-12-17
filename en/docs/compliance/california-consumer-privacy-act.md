# California Consumer Privacy Act

The California Consumer Privacy Act (CCPA) is a bill passed by the California State Legislature, that will come into effect on January 1, 2020. The act ensures that consumers are given more power 
and control over their personal data. Accordingly, CCPA compliance will be a must for any organization that collects and processes personal information (PI) of California residents. 

One of the most prominent solutions of WSO2 Identity Server, Consumer Identity and Access Management(CIAM), 
is already GDPR (General Data Protection Regulation) compliant. 
This made it easier to validate and ensure that WSO2 Identity Server abides by all the rights emphasized in the CCPA compliance.  

## Main Clauses in CCPA

1.  **The Right to Access Personal Information (PI)**
    This clause insists that California residents have the right to know the categories of personal information a business collects and sells to third parties. 
    The business should also be ready to disclose details regarding the **categories of third parties** with whom this personal information has been shared. 
    Moreover, the consumer can request for specific information about them that has been collected and shared, and the business should ensure that the detail 
    requested is hence shared with the customer. 

    Any user who has given his or her PI to the system should have the following capabilities:

    -   Remove sections of the information
    -   Modify information
    -   Download any kind of information stored in the system in a human-readable manner
    
    An IAM provider should have at least the above capabilities to provide CCPA compliance. 
    Ideally, an IAM solution should also provide a self-care portal to end-users, capabilities to modify PI 
    without impacting existing processes, and the ability to download PI through it or via separate APIs.

    In order to facilitate this, WSO2 Identity Server published an API that can be used to download profile details of consumers 
    stored in the server, in a well structured and machine-readable JSON format. Consumers can download their profiles by logging into the self-care 
    user portal. Any organization can integrate this capability to existing applications and portals with the help of the RESTful personal data export 
    API exposed by WSO2 Identity Server. For more information, refer [Using the Personal Information Export REST APIs](../../develop/using-the-personal-information-export-rest-apis).

2.  **The Right to Have PI Deleted**
    The customers have the right to request the business to delete their personal information available with the business. 
    This requires the complete removal of any kind of PI that is related to the requested user from the system. 
    This includes logs, audit records, and any stored media, which will eventually keep contextless data in the system.
    
    An IAM provider should use Anonymization and Pseudonymization to support the right to erasure, as specified in the CCPA. 
    By anonymizing data stored in a system, after an erasure, there won’t be any information left in the system to identify PI. 
    Pseudonymization helps the system to keep the context related to the operation without keeping the actual PI.

    WSO2 Identity Server introduced a privacy tool kit that can be used to delete all identifiable data from the data storage and log files whenever required. 
    
    This privacy toolkit provides the following functionalities.

    1.   Delete the user by “Identity Admin” of the tenant. This will remove the user from any underlying “Read/Write” user store (JDBC/LDAP/AD).
    2.   Anonymize any retained traces of user activity
         -  Log files.
         -  Analytics data and information related to logins, sessions, key validations, etc.
         -  Key/token data held at the database layer.

    3.   Delete any unwanted data retained in the database
         -  Token(s) issued.
         -  Password history information.

    Additionally, WSO2 Privacy Toolkit can be extended to clear personal data in any relational database or any textual log file. 
    For further information on the WSO2 privacy toolkit, refer [Removing References to Deleted User Identities](../../setup/removing-references-to-deleted-user-identities).

3.  **The Right of Disclosure**
    Companies collecting consumers’ personal information for commercial purposes (sell or disclose to a third party) should 
    disclose the categories of PI collected, the sources through which the PI was collected, the purpose for the collection, 
    the entities which the PI was shared with or sold to, and the specific pieces of PI that was collected or sold.

4.  **The Right to Opt-out and Opt-in**
    The customers have the right to deny the sales of their personal details by informing the business that holds their PI.   

5.  **The Right to Non-discrimination**
    All consumers have the right to not be discriminated against exercising any of the rights provided by the CCP.

## Consent Management
A CCPA-compliant system first needs a mechanism to manage user consent of those that the business collects
 information on. Consent lifecycle management plays a key role when complying with the CCPA clauses mentioned above.

In the following instances, the system should obtain user consent.

-   User self-registration
-   User provisioning to third party systems or from third party systems
-   Sharing user attributes through single sign-on (SSO)
-   Federating identities

The user should have the following capabilities.

-   Review given consent
-   Modify given consent
-   Revoke given consent

Currently, there is an open standard regarding [Consent Receipt Management](https://kantarainitiative.org/confluence/display/infosharing/Consent+Receipt+Specification) from the Kantara initiative. 
An IAM provider who supports such open standards will provide leverage over proprietary protocols when adopting such capabilities to a system.

WSO2 Identity Server comes with an extensive consent management solution that enables users to conveniently 
manage consents of their consumers and third-party applications. WSO2 Identity Server’s consent management module consists of the following key features.

-   Has RESTful consent APIs to manage consents remotely. For more information on consent management, please refer to our documentation [here](../../learn/consent-management).
-   Provides an admin portal support for organizations to define and manage consent, data processing purposes, and user attributes per consent.
-   Supports the Kantara consent receipt specification. For more information, see the 
[Kantara Consent Receipt Specification](https://kantarainitiative.org/confluence/display/infosharing/Consent+Receipt+Specification).
-   Any self-care user profile creation, user provisioning to other systems, sharing of user attributes through SSO, and identity federation is fully based on user consent.
-   Users can review, modify, and revoke previously given consent via the self-care user portal or RESTful Consent API.
-   Consent APIs can also be used to integrate WSO2 Identity Server’s consent management capabilities with existing applications.
-   WSO2 Identity Server can be used to manage the consent of any third-party application via the RESTful Consent API.
