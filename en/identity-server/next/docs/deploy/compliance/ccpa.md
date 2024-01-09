# California Consumer Privacy Act

The California Consumer Privacy Act (CCPA) is a bill passed by the California State Legislature, that came into effect on January 1, 2020. The act ensures that consumers are given more power and control over their personal data. Accordingly, CCPA compliance is a must for any organization that collects and processes the personal information (PI) of California residents.
According to the CCPA, “Personal information means information that identifies, relates to, describes, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household.".
This includes a broader spectrum of identifiers such as purchase events or download actions of a user as opposed to the Personally Identifiable Information (PII) which includes only aspects unique to the user such as the user's email address or social security number. 

## Main clauses in CCPA and how WSO2 Identity Server complies with it

1. **The right to access Personal Information (PI)**
    This clause insists that California residents have the right to know the categories of personal information a business collects and sells to third parties.
    The business should also be ready to disclose details regarding the **categories of third parties** with whom this personal information has been shared.
    Moreover, the consumer can request specific information about them that has been collected and shared, and the business should ensure that the detail requested is shared with the customer.

    Users who have given their PIs to the system should be able to:

    - Remove sections of the information
    - Modify information
    - Download any kind of information stored in the system in a human-readable manner

    To facilitate this, WSO2 Identity Server published an API that can be used to download profile details of consumers stored in the server, in a well-structured and machine-readable JSON format. Consumers can download their profiles by logging into the self-care portal called **My Account**.
    Any organization can integrate this capability into existing applications and portals with the help of the RESTful personal data export API exposed by the WSO2 Identity Server. For more information, refer to [Personal Information Export REST APIs](https://api-docs.wso2.com/apidocs/is/is511/user-export-v5.11.0/).

2. **The right to have PI deleted**
    The customers have the right to request the business to delete their personal information available with the business.
    This requires the complete removal of any kind of PI that is related to the requested user from the system.
    This includes logs, audit records, and any stored media, which will eventually keep contextless data in the system.

    WSO2 IS uses anonymization and pseudonymization to support the right to erasure, as specified in the CCPA.
    By anonymizing data stored in a system, after an erasure, it ensures that there won’t be any information left in the system to identify PI.
    Pseudonymization helps the system to keep the context related to the operation without keeping the actual PI.

    WSO2 Identity Server provides a privacy toolkit that can be used to delete all identifiable data from the data storage and log files whenever required.

    This privacy toolkit provides the following functionalities.

    1. Delete the user by “Identity Admin” of the tenant. This will remove the user from any underlying “Read/Write” user store (JDBC/LDAP/AD).
    2. Anonymize any retained traces of user activity
         - Log files
         - Analytics data and information related to logins, sessions, key validations, etc
         - Key/token data held at the database layer

    3. Delete any unwanted data retained in the database
         - Token(s) issued
         - Password history information

    Additionally, the WSO2 Privacy Toolkit can be extended to clear personal data in any relational database or any textual log file.
    For further information on the WSO2 privacy toolkit, refer to [Remove References to Deleted User Identities]({{base_path}}/deploy/configure/databases/remove-references-to-deleted-user-identities/).

3. **The right of disclosure**
    Companies collecting consumers’ personal information for commercial purposes (sell or disclose to a third party) should disclose the categories of PI collected, the sources through which the PI was collected, the purpose for the collection, the entities which the PI was shared with or sold to, and the specific pieces of PI that were collected or sold.

4. **The right to opt-out and opt-in**
    The customers have the right to deny the sales of their personal details by informing the business that holds their PI.  

5. **The right to non-discrimination**
    All consumers have the right to not be discriminated against exercising any of the rights provided by the CCP.

## Consent management

A CCPA-compliant system first needs a mechanism to manage the user consent of those from whom the business collects information. Consent lifecycle management plays a key role when complying with the CCPA clauses mentioned above.

In the following instances, the system should obtain user consent.

- User self-registration
- User provisioning to third-party systems or from third-party systems
- Sharing user attributes through single sign-on (SSO)
- Federating identities

The user should have the following capabilities.

- Review given consent
- Modify given consent
- Revoke given consent

Currently, there is an open standard regarding [Consent Receipt Management](https://kantarainitiative.org/confluence/display/infosharing/Consent+Receipt+Specification) from the Kantara initiative. An IAM provider who supports such open standards will provide leverage over proprietary protocols when adopting such capabilities to a system.

WSO2 Identity Server comes with an extensive consent management solution that enables users to conveniently manage the consents of their consumers and third-party applications. WSO2 Identity Server’s consent management module consists of the following key features.

- Has RESTful consent APIs to manage consents remotely. For more information on consent management, refer to [Consent Management]({{base_path}}/apis/use-the-consent-management-rest-apis).

- Provides an admin portal support for organizations to define and manage consent, data processing purposes, and user attributes per consent.

- Supports the Kantara consent receipt specification. For more information, see the [Kantara Consent Receipt Specification](https://kantarainitiative.org/confluence/display/infosharing/Consent+Receipt+Specification).

- Any self-care user profile creation, user provisioning to other systems, sharing of user attributes through SSO and identity federation is fully based on user consent.

- Users can review, modify, and revoke previously given consent via the self-care My Account, **My Account**, or RESTful Consent API.

- Consent APIs can also be used to integrate the WSO2 Identity Server’s consent management capabilities with existing applications.

- WSO2 Identity Server can be used to manage the consent of any third-party application via the RESTful Consent API.
