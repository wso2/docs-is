# General Data Protection Regulation

#### About GDPR compliance

The General Data Protection Regulation (GDPR) is a legal framework
formalized by the European Union (EU) in 2016. This regulation came into
effect from 25, May 2018, and affects any organization that processes
Personally Identifiable Information (PII) of individuals who live in
Europe. Organizations that fail to demonstrate GDPR compliance are
subjected to financial penalties.

WSO2 Identity Server (WSO2 IS) is designed based on privacy best
practices, and is fully compliant with GDPR. GDPR compliance in your IAM
and API security spaces can be completely fulfilled with WSO2 Identity
Server. This section outlines the major GDPR related features that WSO2
Identity Server supports, and also provides necessary references to
specific concepts within the section.

!!! Info

	  Do you want to learn more about GDPR?

	  If you are new to GDPR, we recommend that you take a look at our
	  tutorial series on *Creating a Winning GDPR Strategy*.

	  -   Part 1 - [Introduction to
    	  GDPR](https://wso2.com/library/article/2017/12/introduction-to-gdpr/)

	  -   Part 2 - [7 Steps for GDPR
  	  Compliance](https://wso2.com/library/article/2017/12/7-steps-for-gdpr-compliance/)

	  -   Part 3 - [Identity and Access Management to the
    	  Rescue](https://wso2.com/library/article/2018/2/identity-and-access-management-to-the-rescue/)

	  -   Part 4 - [GDPR Compliant Consent
    	  Design](https://wso2.com/library/articles/2018/03/creating-a-winning-gdpr-strategypart-4-gdpr-compliant-consent-design/)

	  For more resources on GDPR, see the white papers, case studies, solution
	  briefs, webinars, and talks published on our [WSO2 GDPR
	  homepage](https://wso2.com/solutions/regulatory-compliance/gdpr/). You
	  can also find the original GDPR legal text
	  [here](http://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32016R0679).

#### Privacy by design and privacy by default

As a leading open source Identity and Access Management (IAM) product,
WSO2 Identity Server has been designed and architectured based on well
known *Secure by Design* and *Privacy by Design* principles.  With the
formalization of GDPR in 2016, the product architecture of WSO2 Identity
Server has been reviewed and fine-tuned to accordingly to support
privacy principles in an efficient manner, with less overhead to product
performance and user experience. WSO2 IS provides all privacy features
enabled in the product as default options, and uses up-to-date
algorithms and frameworks for all cryptographic operations such as data
encryption, signing, and hashing etc.

#### Consent identity management

Generally, identity data are scattered over several systems within an
organization. In order to reach GDPR compliance, it is required to
review, redesign, and modify each of these systems. This is a
maintenance overhead and consumes a significant portion of annual IT
budget and requires a specialized set of skills for continuous review
and modification process.

Moving to a GDPR compliant IAM solution, so that all identity profiles
are managed centrally and share only required data with other systems in
an on-demand manner through well-known security standards such as SAML,
OpenIDConnect greatly reduces maintenance overhead discussed above and
ensures the overall system architecture more secure and
privacy-friendly. Additionally, having a centralized identity system
simplifies implementations of some of the GDPR features such as the
*right to be forgotten*, *right for data portability* etc.

  

#### Consent life cycle management

According to GDPR, the consent is defined as “ *Any freely given,
specific, informed and unambiguous indication of the data subject’s
wishes by which he or she, by a statement or by a clear affirmative
action, signifies agreement to the processing of personal data relating
to him or her* ”. WSO2 IS fully supports for consent management in the
context of IS activities and can be used to manage consents from 3rd
party applications via secure RESTful consent management API.

It also supports the following features:

1.  When IS is acting as the Identity Provider(IdP), all the user
    attributes sharing (usually as security tokens such as SAML,
    IDToken, JWT etc.) with service providers (SP) are based on user
    consent.

2.  Gets user consent when IS is storing user attribute profiles based
    on self-sign up portal or security token received from a federated
    identity provider.
3.  IS user portal facilitates users to review the already given
    consents and revoke them, if necessary.

4.  Secure RESTful consent management API can be used to integrate read,
    modify, and delete consents managed by IS.

5.  Secure RESTful consent management API facilitates using of IS as the
    consent lifecycle management solution for 3rd party applications
    such as web and mobile applications.

#### Consent receipt specification (draft)

WSO2 IS also support for Consent Receipt Specification draft from
Kantara Initiative.

#### Right to be forgotten

This is one of the most important individual rights defined in GDPR. In
simple terms, an individual can request to complete removal his/her
personal data from the processing organizations. According to GDPR,
unless there is a clear and valid legal background, processing
organizations should fulfill such *forget me* requests.

WSO2 IS provides out of a box privacy toolkit to remove all identify
data from related databases and log files. This toolkit can be run
manually by organization administrators or can be automated so that
whenever a user profile gets deleted from the system, all the related
PII data gets removed from the system.

By considering performance overhead and automation flexibility, this
privacy toolkit is run separately from IS runtime. The privacy toolkit
is not just limited to the current version of IS rather, it can be used
with any new or old WSO2 platform product. Please note that, for older
versions of WSO2 products, it is required to download WSO2 Privacy
Toolkit from
**[here](https://github.com/wso2/identity-anonymization-tool)**
separately.

When it comes to Right to be forgotten, IS supports the following
features:

-   Delete the user by “Identity Admin” of the tenant. This will remove
    the user from any underlying “Read/Write” user store (JDBC/LDAP/AD).
-   Anonymize any retained traces of the user activity.  
    -   Log Files
    -   Analytics data, related to Login, Session, Key Validation, etc.
    -   Key/Token data held at the Database layer.
-   Delete any unwanted data retained in the Database(due to performance
    reasons)
    -   Token(s) issued,
    -   Password History information.

Additionally, WSO2 Privacy Toolkit can be extended to clear privacy data
in any relational database or any textual log file, but that is out of
the scope of this document.

For more information on the topic, see [Removing References to Deleted
User
Identities](../../setup/removing-references-to-deleted-user-identities/).

####  Exercising individual rights

GDPR defines a set of strong individual rights that every data
processing organization should facilitate for their users. The Self-care
User Portal available with the WSO2 Identity Server is equipped to
exercise these individual rights by users themselves. Any organization
that deploys WSO2 IS, will have Self-care User Portal by default.

Following features are supported as part of Self-care User Portal:

-   **The right of transparency and modalities -** Personal data
    processing activities carried out by the organization, their
    purposes, and time-limits and what data are stored can be made
    transparent to users via the IS Self-care User Portal.  
<br/>     
-   **The right of access -** Via the IS Self-care User Portal, users
    can access and review what personal data are stored in the
    processing organization.  
<br/>
-   **The right to rectification -** Individuals can rectify incorrect
    data on their user profiles by themselves by logging in to the Self-care
    User Portal.  
<br/>
-   **The right to restrict processing -** Individuals can make
    restrictions on their user profiles by themselves by logging into
    Self-care User Portal. Generally, this is done through by revoking
    an already given consent but can be extended to other usages as
    well.  
<br/>
-   **The right to be forgotten -** Individuals can remove their profile
    data or can be extended to send *forget-me* requests via the
    Self-care User portal.  
<br/>
-   **The right for notification obligation -** The Self-care User
    Portal can be extended to act as the notification center for
    individuals.  
<br/>
-   **The right to data portability -** Individuals can download their
    user profile in a structured, commonly used and machine-readable
    JSON document format through the Self-care User Portal.  
<br/>
-   **The right to object -** The Self-care User Portal can be extended
    to act as a communication channel to make objections on
    processing.  
<br/>
-   **Rights in relation to automated decision making and profiling -**
    The Self-care User Portal can be extended to act as a communication
    channel to make objections on automated decision making and
    profiling.

Following additional features are also supported in IS Self-care User
portal.

-   Revoking consent for all or specific attributes
-   Giving an expiry date for a consent

#### Personal data portability

Ability to download individual’s user profile as a structured, commonly
used and a machine-readable format is a requirement of GDPR. In WSO2 IS,
it is possible to use one of the following options to download user
profile as a structured JSON document.

1.  By logging into Self-care User Portal

2.  Invoking personal data export API(secure RESTful API)

Additionally, GDPR encourages to facilitate user profile provisioning
from the data processing organization to another organization based on
individuals requests automatically. SCIM 2 API supported in WSO2 IS can
be used to fulfill this requirement.

#### Personal data protection

WSO2 IS is subjected to regular reviews and updates for latest versions
of the crypto algorithm and latest versions of crypto frameworks. These
security updates are provided as WSO2 WUM service. Additionally, a
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
people from the stuff based on “need to know” basic can access to user
profile data from individuals. Access control features supported in WSO2
IS  such as role-based access control (RBAC), attribute-based access
control can be used to cater this requirement.

!!! Info
	  For more information on Role-based Access control, Attribute-based
	  Access Control, and XACML, see [Access Control and Entitlement](../../get-started/access-control-and-entitlement-management) page.
