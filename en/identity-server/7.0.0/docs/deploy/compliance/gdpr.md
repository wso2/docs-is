# General Data Protection Regulation

The General Data Protection Regulation (GDPR) is a legal framework formalized by the European Union (EU) in 2016. This regulation came into effect on 25, May 2018, and affects any organization that processes Personally Identifiable Information (PII) of individuals who live in Europe.
PII can be any information that can uniquely identify an individual, such as the social security number, phone number, or email address. Organizations that fail to demonstrate GDPR compliance are subjected to financial penalties. This regulation is critical to comply with due to both the heavy penalties and the fact that non-compliance puts the organization's reputation and integrity at stake.

GDPR affects organizations that are located in places within the EU, organizations that are located in places where the EU laws are followed, or when the clients of these organizations are EU citizens. Apart from these, there are special cases that do not fall under any of the previous scenarios but need to comply with the regulation nevertheless.

For more information on the fundamentals of this regulation, see [Defining a Winning GDPR Strategy](https://wso2.com/library/article/2017/12/introduction-to-gdpr/).

## How is a specialized IAM solution better at complying with regulations?

Generally, identity data are scattered over several systems within an organization. To reach GDPR compliance, it is required to review, redesign, and modify each of these systems. This is a maintenance overhead that consumes a significant portion of the annual IT budget and requires a specialized set of skills for continuous review
and modification processes. Considering the amount of data available within an organization and the intensity of adverse impact on the organization in case of failure to comply with GDPR, skilled staff working in a centralized, secure environment for data processing is vital.

A GDPR-compliant IAM solution ensures that all identity profiles are managed centrally and shares only required data with other systems in an on-demand manner through well-known security standards such as SAML and OpenID Connect <!-- TODO: IAM Topics[SAML]({{base_path}}/references/concepts/authentication/intro-saml) and [OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc)-->.
Any efficient IAM solution supports anonymization to remove PII data from datasets, and pseudonymization to set artificial identifiers to uniquely identify the user, instead of their personal data. This mitigates the risk of exposing the personal data of individuals to compromised environments.

## Ensure compliance

WSO2 Identity Server (WSO2 IS) is designed based on privacy best practices and is fully compliant with GDPR. GDPR compliance in IAM and API security spaces can be completely fulfilled with WSO2 IS.

WSO2 IS has been designed and architectured based on well-known *Secure by Design* and *Privacy by Design* principles.  With the formalization of GDPR in 2016, the product architecture of the WSO2 Identity Server has been reviewed and fine-tuned accordingly to support privacy principles efficiently, with less overhead for product performance and user experience.

WSO2 IS provides all privacy features enabled in the product as default options, and uses up-to-date algorithms and frameworks for all cryptographic operations such as data encryption, signing, and hashing.

WSO2 IS is subjected to regular reviews and updates for the latest versions of the crypto algorithm and the latest versions of crypto frameworks. These security updates are provided as WSO2 updates. Additionally, several data encryption and protection features are supported by WSO2 IS.

Following are the encryption features supported for personal data.

- OAuth 2.0 access token

- OAuth 2.0 refresh token

- OAuth 2.0 authorization

- ID tokens

- SAML responses

Following is the hashing feature supported for personal data.

- User credentials

GDPR also mandates processing organizations to make sure only authorized
people on a need-to-know basis can access the user profile data of other individuals. Access control features supported in WSO2
IS such as role-based access control (RBAC) and attribute-based access control can be used to cater to this requirement.

## Individual right in GDPR

GDPR defines a set of strong individual rights that every data processing organization should facilitate for its users. The **My Account** application available with the WSO2 IS is equipped to exercise these individual rights by users themselves. Any organization
that deploys WSO2 IS will have the **My Account** application by default.

The following features are supported as part of **My Account**:

- **The right of transparency and modalities -** Personal data processing activities carried out by the organization, their purposes and time limits, and what data stored can be made transparent to users via the WSO2 IS **My Account** application.  

- **The right of access -** Via the WSO2 IS **My Account** application, users can access and review what personal data is stored in the processing organization.  

- **The right to rectification -** Individuals can rectify incorrect data on their user profiles by themselves by logging in to the **My Account** application.

- **The right to restrict processing -** Individuals can make restrictions on their user profiles by themselves by logging into the **My Account** application. Generally, this is done by revoking an already given consent but can be extended to other usages as well.  

- **The right to be forgotten -** This is one of the most important individual rights defined in GDPR. In simple terms, an individual can request to completely remove their personal data from the processing organizations. According to GDPR, unless there is a clear and valid legal background, processing organizations should fulfill such *forget me* requests.

    WSO2 IS provides an out-of-the-box privacy toolkit to remove all identifying data from related databases and log files. This toolkit can be run manually by organization administrators or can be automated so that whenever a user profile gets deleted from the system, all the related PII data gets removed from the system.

    By considering performance overhead and automation flexibility, this privacy toolkit is run separately from WSO2 IS runtime. For older versions of WSO2 IS, it is required to download the WSO2 Privacy Toolkit from [here](https://github.com/wso2/identity-anonymization-tool) separately.

    When it comes to **Right to be forgotten**, WSO2 IS supports the following features.

    - Delete the user by “Identity Admin” of the tenant. This will remove the user from any underlying “Read/Write” user store (JDBC/LDAP/AD).

    - Anonymize any retained traces of the user activity.  

        - Log files
        - Analytics data, related to login, session, key validation, etc.
        - Key/token data held at the database layer.

    - Delete any unwanted data retained in the database (due to performance reasons)

        - Token(s) issued,
        - Password History information.

    <!-- TODO: DATASTORES For more information on the topic, see [Remove References to Deleted User Identities]({{base_path}}/deploy/remove-references-to-deleted-user-identities).-->

- **The right for notification obligation -** The **My Account** application can be extended to act as the notification center for individuals.  

- **The right to data portability -** Individuals can download their user profile in a structured, commonly used, and machine-readable JSON document format through the **My Account** application. In WSO2 IS it is possible to use one of the following options to download the user profile as a structured JSON document.

1. Logging in to the **My Account** application.

2. Invoking personal data export API (secure RESTful API)

Additionally, GDPR encourages facilitating user profile provisioning from the data processing organization to another organization automatically based on individuals' requests. SCIM 2.0 API supported in WSO2 IS can be used to fulfill this requirement.

- **The right to object -** The **My Account** application can be extended to act as a communication channel to make objections on processing.  

- **Rights in relation to automated decision-making and profiling -** The **My Account** application can be extended to act as a communication channel to make objections on automated decision-making and profiling.

The following additional features are also supported in the **My Account** application.

- Revoking consent for all or specific attributes
- Giving an expiry date for consent

## What is consent?

GDPR defines six lawful means of processing individual data.

- Consent from an individual
- Contract with the individual
- Compliance with a legal obligation
- Vital interests
- A public task
- Legitimate interests

Out of these, consent from an individual is considered the most crucial since it is a data processing law that applies to a wide spectrum of business activities. For more information on lawful data processing, see [Defining a Winning GDPR Strategy Part 2 - 7 Steps for GDPR Compliance](https://wso2.com/library/article/2017/12/7-steps-for-gdpr-compliance/).

According to GDPR, consent is defined as “ *Any freely given, specific, informed and unambiguous indication of the data subject’s wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her* ”.

### Consent management in WSO2 IS

WSO2 IS fully ensures precise consent management and can be used to manage consents from third
party applications via secure RESTful consent management API.

It also supports the following features.

1. When WSO2 IS is acting as the Identity Provider (IdP), all the user attributes shared (usually security tokens such as SAML, ID token, JWT, etc.) with service providers (SP) are based on user consent.

2. When WSO2 IS is storing user attribute profiles based on **My Account** or security token received from a federated identity provider, consent is obtained.

3. **My Account** facilitates users to review the already given consents and revoke them if necessary.

4. Secure RESTful consent management API can be used to integrate read, modify, and delete consents managed by WSO2 IS.

5. Secure RESTful consent management API facilitates the use of WSO2 IS as the consent lifecycle management solution for third-party applications such as web and mobile applications.

!!! note
    WSO2 IS also supports the Consent Receipt Specification draft from Kantara Initiative. For more information on this draft, see  [Proposing a global consent receipt standard](https://kantarainitiative.org/proposing-a-global-consent-receipt-standard/).


!!! info "Related topics"
    To understand GDPR more elaborately, take a look at this tutorial series on *Creating a Winning GDPR Strategy*.

    -   Part 1 - [Introduction to
        GDPR](https://wso2.com/library/article/2017/12/introduction-to-gdpr/)

    -   Part 2 - [7 Steps for GDPR
    Compliance](https://wso2.com/library/article/2017/12/7-steps-for-gdpr-compliance/)

    -   Part 3 - [Identity and Access Management to the
        Rescue](https://wso2.com/library/article/2018/2/identity-and-access-management-to-the-rescue/)

    -   Part 4 - [GDPR Compliant Consent
        Design](https://wso2.com/library/articles/2018/03/creating-a-winning-gdpr-strategypart-4-gdpr-compliant-consent-design/)

    For more resources on GDPR, see the white papers, case studies, solution briefs, webinars, and talks published on the [WSO2 GDPR homepage](https://wso2.com/solutions/regulatory-compliance/gdpr/). See the original GDPR legal text [here](http://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32016R0679).
