# Service providers

The responsibility of the service provider configuration is to represent external service providers. The service provider configurations cover the following:

- **Define how the service provider talks to the Identity Server inbound authenticator**  
    This is via inbound authenticators. When registering a service provider, you need to associate with one or more inbound authenticators.
- **Define how to authenticate users**.  
    This can be via a local authenticator, request-path authenticator, or federated authenticator. Based on this configuration, the Identity Server knows how to authenticate the user when it receives an authentication request (via an inbound authenticator) and based on the service provider who initiates it.
- **Maintain claim mapping**.  
    This is to map the service provider's claims to the Identity Server's claims. For example, WSO2 Identity Server (WSO2 IS) has a work email claim (`http://wso2.org/claims/emails.work`), but your service provider application expects to receive a value named email. 
    Suppose the service provider application receives a value called work email. In that case, it does not recognize it as it does not recognize it.
    Therefore, to ensure that the values sent by WSO2 IS are understood and recognized by the service provider application, you can use claim mapping.
    When the authentication framework hands over a set of claims (which it gets from the local user store or an external identity provider) to the response builder of the inbound authenticator, the framework talks to the service provider configuration component and finds the claim mapping, and do the claim conversion.
    See [Configuring Inbound Authentication for a Service Provider]({{base_path}}/guides/applications/inbound-auth-for-sp) for more information about response builder. Now the response builder will receive the claims in a manner understood by the corresponding service provider. [Read more about claim management]({{base_path}}/references/concepts/claim-management).


