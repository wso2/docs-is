# Claim Management

A claim is a piece of information about a particular subject. It can be
anything that the subject is owned by or associated with, such as name,
group, preferences, etc. A claim provides a single and general notion to
define the identity information related to the subject. Claim-based
identity is a common way for any application to acquire identity
information. It provides a consistent approach for all applications by
hiding the lower level implementation. Claims are also used in identity
propagation which is the replication of authenticated identities,
by packaging the claims into one or more tokens (such as SAML). These
tokens are then issued by an issuer (eg., [security token service]({{base_path}}/references/concepts/authentication/intro-ws-trust/).

A user claim is a claim that is related to a user. It can be used to
specify information that is directly related to the user, such as claims
related to the street address, username, email, first name, and more.

An identity claim is a special claim related to identity management. It
can be used to specify information about the user account or the state
of a user account such as the `lastLoginTime`, `accountDisabled`, and
`accountLocked` claims. Identity claims are identified by the claim URI.
All identity claims have the term "identity" appended to the claim URI
as follows:
`http://wso2.org/claims/identity/accountDisabled`

The Claim Management component of WSO2 Carbon
allows you to map a set of attributes from the underlying userstore to
a set of defined claims. The underlying userstore can either be an
internal or external JDBC userstore, Active Directory, or LDAP user
store. You can [configure the primary userstore]({{base_path}}/deploy/configure-the-primary-user-store#set-up-the-primary-userstore) 
using the `deployment.toml` file. 
Each claim can be uniquely identified within the claim dialect by the
Claim URI. Claim URIs are independent of the userstore and each claim
URI can be mapped into any desired attribute in the userstore.
Therefore, at the application level we would know about the claims, but
not the attribute of the userstore. An advantage of this is that we do
not need to be concerned about the userstore level when we develop an
application as it is hidden by the claim management.

!!! info 
    In the case of every tenant startup, including the super tenant, the claim
    configurations are read directly from the
    the `<IS_HOME>/repository/conf/claim-config.xml` file. So
    claims mapped for SCIM in the super tenant's [management
    console]({{base_path}}/deploy/get-started/get-started-with-the-management-console) are not seen by
    a newly created tenant as the [User
    Realm]({{base_path}}/deploy/configure-the-system-administrator) is always built using the
    configuration found in the `claim-config.xml` file. So the recommended
    approach is to do the claim mapping in the
    `<IS_HOME>/repository/conf/claim-config.xml` file.
    However, you must note that the `claim-config.xml` file is only read
    during the first startup of the server. Any modifications made to this
    file after the first startup would not have any effect.

    For more information on SCIM, click
    [here]({{base_path}}/references/concepts/identity-provisioning-intro/).

A set of claims is identified as a dialect. Different dialects represent
the same piece of information with different claim URIs.

With the help of the Claim Management feature, different claims can be
mapped with the attributes of the user that are associated with their
profile.
