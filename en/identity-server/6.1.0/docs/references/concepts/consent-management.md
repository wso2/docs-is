# Consent Management

Consent management refers to the practice of prompting, collecting, and
managing user approval for collecting or sharing the user's personal
information. "Consent" itself is granting permission or agreement for a
specified action to take place. This page guides you through consent
management concepts and how they are supported in WSO2 Identity Server.

---

## Privacy by Design

Privacy by Design (PbD) is a well-known privacy design practice
consisting of seven principles originally developed by the Information &
Privacy Commissioner Ontario, Canada. Respect for user privacy and
design user-centric experience is one of the important principles of
PbD. User consent is the main implementation solution that supports
user privacy and user-centric principle.

It is mandatory to collect an individual’s free and specific consent
during collection, use, or disclosure of personal information, except
where otherwise permitted by law. The user should be allowed to withdraw
consent at a later time if they wish to do so.

---

## Consent with EU GDPR

Consent is one of the six lawful bases for processing of personal
information by an organization but in most cases, consent is the most
common lawful base.  According to the General Data Protection Regulation
(GDPR), processing organizations should offer a free and a clear choice for
individuals to make a decision on whether the organization should
process personal data that belongs to the individual. Furthermore,
personal data processing purposes should be transparent to individuals
and the organization must enable individuals to review and revoke
already given consents as well.

!!! tip
    
    The GDPR definition of consent is as follows:
    
    “Any freely given, specific, informed and unambiguous indication of the
    data subject's wishes by which he or she, by a statement or by a clear
    affirmative action, signifies agreement to the processing of personal
    data relating to him or her”.
    

The main points extracted from this definition are:

-   A consent should be freely given and should offer a genuine choice.

-   A consent should be specific about its purpose.

-   A consent should be clearly informed, and the processing
    organization should ensure that the subject understands what exactly
    is being shared and for what purpose, especially children.

-   A consent should be given by a statement or by a clear affirmative
    action such as through an electronic form submission.

---

## Consent management with WSO2 Identity Server

WSO2 IS provides a comprehensive consent management solution that can be
used to manage consents related to Customer Identity and Access Management (CIAM)
and also to manage consents that belong to third party applications.
The WSO2 IS consent management module consists of the following key
features.

-   RESTful consent APIs to manage consents remotely. For more
    information, see [Consent Management REST
    APIs]({{base_path}}/apis/use-the-consent-management-rest-apis/).
-   Consent portal for individuals to review, modify, and revoke already
    given consents. For more information, see [Consent management]({{base_path}}/guides/my-account/manage-consent-my-account).
-   Support for organizations to define and manage consent,
    data processing purposes, and user attributes per consent. <!-- For more
    information, see [Managing Consent
    Purposes](TO-DO:{{base_path}}/learn/managing-consent-purposes).-->
-   Consent collection during single sign-on (SSO) before sharing the
    user attributes with external applications. <!-- For more information,
    see [Consent Management with
    Single-Sign-On](TO-DO:{{base_path}}/learn/consent-management-with-single-sign-on).-->
-   Support for the Kantara consent receipt specification. For more
    information, see the [Kantara Consent Receipt
    Specification](https://kantarainitiative.org/download/7902/).

---

## Consent management use cases

### Handle consent when creating a new user profile

According to most privacy standards, it is mandatory to inform
individuals about the purpose of processing personal data and to state
what kind of data will be shared in a clear and transparent manner at
the time of data collection. Furthermore, the processing organizations
should get active consent from an individual for each of the data
processing purposes before data collection takes place. The following
points give a high level description of how this use case is supported in
WSO2 IS.

-   The identity administrator of an organization can define personal
    data processing purposes and a list of user attributes used for each
    of the processing purposes via admin console or via the consent REST
    API.

-   During the self sign-up process, the data processing purposes (reason
    for collecting consent) along with the user attributes for each
    purpose will be shown to users as consents. The users can
    selectively opt-in/opt-out on each of the purposes.

-   Users can review or revoke already given consent by logging in to
    WSO2 IS My Account (self-care portal).

-   Personal data processing applications can check for consent of each
    user through the consent REST API before carrying out any data
    processing activities.

!!! tip
    For more information and instructions for setting up this use case, see
    [Configuring self-registration consent
    purposes]({{base_path}}/guides/identity-lifecycles/self-registration-workflow/).
    

### Handle consent when sharing user attributes

According to privacy best practices and privacy standards, sharing user
attributes to external parties should be based on clear and active
consent (unless there is clear legal background support for information
sharing). WSO2 IS shares user attributes with other applications in the
form of security tokens such as SAML2, OpenID Connect ID token, or JWT
and all of this user information sharing is based on consent. The
following points give a high level description of how this use case is
supported in WSO2 IS.

-   The identity administrator of an organization can define purposes
    and user attributes for each purpose on a service provider (SP)
    basis using the WSO2 IS admin console or via WSO2 remote APIs.

-   When sharing the user attributes during flows such as SAML SSO and
    OpenID Connect SSO, WSO2 IS prompts the consent screen for users.
    The sharing of user attributes through security tokens is based on
    the consent that the user approves at this point.

-   Users can review or revoke already given consent by logging in to
    the WSO2 IS My Account (self-care portal).

<!--
!!! tip
    
    For more information and instructions for setting up this use case, see
    [Consent Management with
    Single-Sign-On](TO-DO:{{base_path}}/learn/consent-management-with-single-sign-on).
-->

### Manage consents that belong to third party applications

WSO2 IS can be used to manage consents that belong to third party
applications and services. To do this, third party applications can
integrate with WSO2 IS using the consent REST APIs and other admin APIs
provided by WSO2 IS. Note that generating and handling consent UIs for
third party applications can not be supported in WSO2 IS as it is
considered the responsibility of the relevant third party application to
provide consent management UI facilities for their end users.

#### Support for Kantara consent receipt (draft) specification

A consent receipt is a representation of the consent provided by a
person at the point he/she agrees to share the personal information with
an external party. WSO2 IS consent REST APIs support the specification
provided in the Kanatara consent receipt 1.1.0 (7th draft) version. For
more information, see the [Kantara Consent Receipt
Specification](https://kantarainitiative.org/confluence/display/infosharing/Consent+Receipt+Specification).

!!! tip
    
    For more information and instructions for setting up this use case, see
    [Consent Management REST
    APIs]({{base_path}}/apis/use-the-consent-management-rest-apis/).
    
