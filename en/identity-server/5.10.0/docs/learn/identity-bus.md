# Identity Bus

[Federation Silos and Spaghetti
Identity](../../get-started/identity-anti-patterns-and-the-identity-bus) are two
anti-patterns directly addressed by the Identity Bus pattern in the WSO2
Identity Server. With Identity Bus, a given service provider is not
coupled to a given identity provider and also not coupled to a given
federation protocol. A user should be able to log into a service
provider that accepts only SAML 2.0 tokens with an identity provider
that issues only OpenID Connect tokens. The Identity Bus acts as a
middle-man, or an Identity Broker, that mediates and transforms identity
tokens between heterogeneous identity protocols.

!!! info 
    **ID token** : The ID Token is a security token that contains Claims
    about the Authentication of an End-User by an Authorization Server when
    using a Client, and potentially other requested Claims. It resembles the
    concept of an identity card, in a standard JWT format, signed by the
    OpenID Provider (OP). To obtain one the client needs to send the user to
    their OP with an authentication request.

The following are some of the benefits of using the Identity Bus
pattern.

1.  **Introducing a new service provider is extremely easy.** You only
    need to register the service provider in the Identity Bus and pick
    which identity providers it trusts. It is not necessary to add the
    service provider configuration to each and every identity
    provider. Similarly, removing an existing service provider is
    extremely easy. You only need to remove the service provider from
    the Identity Bus. It is not necessary to remove the service provider
    from each and every identity provider.
2.  **Introducing a new identity provider is extremely easy.** You only
    need to register the identity provider in the Identity Bus. It will
    be available for any service provider. Similarly, removing an
    existing identity provider is extremely easy. You only need to
    remove the identity provider from the Identity Bus.
3.  **Enforcing new authentication protocols is extremely easy.**
    Consider a scenario where you need to authenticate users with both
    the username and password and also Duo Security (SMS based
    authentication). To do this, you only need to add that capability to
    the Identity Bus and pick the required set of authentication
    protocols against a given service provider at the time of service
    provider registration. In the Identity Bus, each service provider
    can be configured based on how it authenticates users.
4.  **Claim transformations.** Your service provider may read user's
    email address from the " http://sp1.org/claims/email " attribute
    id - but the identity provider of the user may send it as "
    http://idp1.org/claims/emai ". Identity bus can transform the
    claims it receives from the identity provider to the format expected
    by the service provider.
5.  **Role mapping.** Your service provider needs to authorize users
    once they are logged in. What the user can do at the identity
    provider is different from what the same user can do at the service
    provider. Users' roles from the identity provider define what they can
    do at the identity provider. Service provider's roles define the
    things a user can do at the service provider. Identity bus is
    capable of mapping identity provider's roles to the service
    provider's roles. For example, users may bring idp-admin roles from
    their identity providers - in a SAML response - then the identity bus
    will find the mapped service provider role corresponding to these,
    say sp-admin, and will add that into the SAML response returning
    back to the service provider from the identity bus.
6.  **Just-in-time provisioning.** Since identity bus is at the middle
    of all identity transactions - it can provision all external user
    identities to an internal user store.
7.  **Centralized monitoring and auditing.**
8.  **Introducing a new federation protocol needs minimal changes.** If
    you have a service provider or an identity provider, which supports
    a proprietary federation protocol, then you only need to add that
    capability to the identity bus. No need to implement it at each and
    every identity provider or service provider.

The following topics provide instructions on the various functionality
available in the identity bus of the WSO2 Identity Server.

