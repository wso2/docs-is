# General Data Protection Regulation

## About GDPR compliance

The General Data Protection Regulation (GDPR) is a legal framework formalized by the European Union (EU) in 2016. This regulation came into effect from 25, May 2018, and affects any organization that processes Personally Identifiable Information (PII) of individuals who live in Europe. Organizations that fail to demonstrate GDPR compliance are
subjected to financial penalties.

WSO2 Identity Server (WSO2 IS) is designed based on privacy best practices, and is fully compliant with GDPR. GDPR compliance in IAM and API security spaces can be completely fulfilled with WSO2 IS. This section outlines the major GDPR-related features that WSO2 IS supports, and also provides necessary references to specific concepts within the section.

!!! Info
    To understand GDPR more elaborately, take a look at this tutorial series on *Creating a Winning GDPR Strategy*.

    -   Part 1 - [Introduction to
        GDPR](https://wso2.com/library/article/2017/12/introduction-to-gdpr/)

    -   Part 2 - [7 Steps for GDPR
    Compliance](https://wso2.com/library/article/2017/12/7-steps-for-gdpr-compliance/)

    -   Part 3 - [Identity and Access Management to the
        Rescue](https://wso2.com/library/article/2018/2/identity-and-access-management-to-the-rescue/)

    -   Part 4 - [GDPR Compliant Consent
        Design](https://wso2.com/library/articles/2018/03/creating-a-winning-gdpr-strategypart-4-gdpr-compliant-consent-design/)

    For more resources on GDPR, see the white papers, case studies, solution
    briefs, webinars, and talks published on our [WSO2 GDPR homepage](https://wso2.com/solutions/regulatory-compliance/gdpr/). See the original GDPR legal text
    [here](http://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32016R0679).

## Privacy by design and privacy by default

As a leading open source Identity and Access Management (IAM) product,
WSO2 IS has been designed and architectured based on well
known *Secure by Design* and *Privacy by Design* principles.  With the
formalization of GDPR in 2016, the product architecture of WSO2 Identity
Server has been reviewed and fine-tuned accordingly to support
privacy principles in an efficient manner, with less overhead to product
performance and user experience. WSO2 IS provides all privacy features
enabled in the product as default options, and uses up-to-date
algorithms and frameworks for all cryptographic operations such as data
encryption, signing, and hashing.

## Consent identity management

Generally, identity data are scattered over several systems within an
organization. In order to reach GDPR compliance, it is required to
review, redesign, and modify each of these systems. This is a
maintenance overhead and consumes a significant portion of annual IT
budget and requires a specialized set of skills for continuous review
and modification process.

Moving to a GDPR-compliant IAM solution, so that all identity profiles
are managed centrally and share only required data with other systems in
an on-demand manner through well-known security standards such as SAML and 
OpenIDConnect greatly reduces the maintenance overhead discussed above and
ensures that the overall system architecture is more secure and
privacy-friendly. Additionally, having a centralized identity system
simplifies implementations of some of the GDPR features such as the
*right to be forgotten* and the *right for data portability*.


## Consent life cycle management

According to GDPR, the consent is defined as “ *Any freely given,
specific, informed and unambiguous indication of the data subject’s
wishes by which he or she, by a statement or by a clear affirmative
action, signifies agreement to the processing of personal data relating
to him or her* ”. WSO2 IS fully supports for consent management in the
context of IS activities and can be used to manage consents from 3rd
party applications via secure RESTful consent management API.

It also supports the following features:

1.  When WSO2 IS is acting as the Identity Provider(IdP), all the user
    attributes shared (usually security tokens such as SAML,
    IDToken, JWT etc.) with service providers (SP) are based on user
    consent.

2.  When WSO2 IS is storing user attribute profiles based
    on **My Account** or security token received from a federated
    identity provider, consent is obtained.

3.  **My Account** facilitates users to review the already given
    consents and revoke them if necessary.

4.  Secure RESTful consent management API can be used to integrate read,
    modify, and delete consents managed by WSO2 IS.

5.  Secure RESTful consent management API facilitates using of WSO2 IS as the
    consent lifecycle management solution for 3rd party applications
    such as web and mobile applications.

## Consent receipt specification (draft)

WSO2 IS also supports Consent Receipt Specification draft from
Kantara Initiative.

## Right to be forgotten

This is one of the most important individual rights defined in GDPR. In
simple terms, an individual can request to complete remove their
personal data from the processing organizations. According to GDPR,
unless there is a clear and valid legal background, processing
organizations should fulfill such *forget me* requests.

WSO2 IS provides out of a box privacy toolkit to remove all identify
data from related databases and log files. This toolkit can be run
manually by organization administrators or can be automated so that
whenever a user profile gets deleted from the system, all the related
PII data gets removed from the system.

By considering performance overhead and automation flexibility, this
privacy toolkit is run separately from WSO2 IS runtime. For older
versions of WSO2 IS, it is required to download WSO2 Privacy
Toolkit from
**[here](https://github.com/wso2/identity-anonymization-tool)**
separately.

When it comes to **Right to be forgotten**, WSO2 IS supports the following
features:

-   Delete the user by “Identity Admin” of the tenant. This will remove
    the user from any underlying “Read/Write” userstore (JDBC/LDAP/AD).
-   Anonymize any retained traces of the user activity.  
    -   Log Files
    -   Analytics data, related to login, session, key validation, etc.
    -   Key/token data held at the database layer.
-   Delete any unwanted data retained in the database(due to performance
    reasons)
    -   Token(s) issued,
    -   Password History information.

For more information on the topic, see [Removing References to Deleted User Identities](TO-DO: insert-extend-link).

##  Exercising individual rights

GDPR defines a set of strong individual rights that every data
processing organization should facilitate for their users. The **My Account** application available with the WSO2 IS is equipped to
exercise these individual rights by users themselves. Any organization
that deploys WSO2 IS will have the **My Account** application by default.

Following features are supported as part of **My Account**:

-   **The right of transparency and modalities -** Personal data
    processing activities carried out by the organization, their
    purposes, and time-limits and what data stored can be made
    transparent to users via the WSO2 IS **My Account** application.  
<br/>     
-   **The right of access -** Via the WSO2 IS **My Account** application, users
    can access and review what personal data is stored in the
    processing organization.  
<br/>
-   **The right to rectification -** Individuals can rectify incorrect
    data on their user profiles by themselves by logging in to the **My Account** application.
<br/>
-   **The right to restrict processing -** Individuals can make
    restrictions on their user profiles by themselves by logging into
    the **My Account** application. Generally, this is done by revoking
    an already given consent but can be extended to other usages as
    well.  
<br/>
-   **The right to be forgotten -** Individuals can remove their profile
    data or can be extended to send *forget-me* requests via the
    **My Account** application.  
<br/>
-   **The right for notification obligation -** The **My Account** application can be extended to act as the notification center for
    individuals.  
<br/>
-   **The right to data portability -** Individuals can download their
    user profile in a structured, commonly used and machine-readable
    JSON document format through the **My Account** application.  
<br/>
-   **The right to object -** The **My Account** application can be extended
    to act as a communication channel to make objections on
    processing.  
<br/>
-   **Rights in relation to automated decision making and profiling -**
    The **My Account** application can be extended to act as a communication
    channel to make objections on automated decision making and
    profiling.

The following additional features are also supported in the **My Account** application.

-   Revoking consent for all or specific attributes
-   Giving an expiry date for a consent

## Personal data portability

Ability to download individual’s user profile as a structured, commonly
used in machine-readable format is a requirement of GDPR. In WSO2 IS,
it is possible to use one of the following options to download user
profile as a structured JSON document.

1.  By logging in to the **My Account** application. 

2.  Invoking personal data export API(secure RESTful API)

Additionally, GDPR encourages to facilitate user profile provisioning
from the data processing organization to another organization automatically based on
individuals' requests. SCIM2 API supported in WSO2 IS can
be used to fulfill this requirement.

## Personal data protection

WSO2 IS is subjected to regular reviews and updates for latest versions
of the crypto algorithm and latest versions of crypto frameworks. These
security updates are provided as WSO2 WUM services. Additionally, a
number of data encryption and protection features are supported by WSO2
IS.

Supported encryption features for personal data:

-   OAuth2 Access token

-   OAuth2 Refresh token

-   OAuth2 Authorization

-   ID Tokens

-   SAML Responses

Supported hashing features for personal data:

-   User credentials

GDPR also mandates processing organizations to make sure only authorized
people on a “need to know” basic can access user profile data of other individuals. Access control features supported in WSO2
IS such as role-based access control (RBAC) and  attribute-based access
control can be used to cater this requirement.