# Share claims with applications

A service provider may need access to certain user claims to be able to provide its services to users. You can allow this by enabling the required claims for your service provider configuration in WSO2 Identity Server.

Enabling claims for the service provider involves enabling **local claims** in WSO2 IS as **requested claims**. Some of the requested claims can also be flagged as **mandatory** for the service provider.

!!! info
    See the [Identity Server Architecture](../../get-started/architecture) for more information on how claim mapping fits in to the overall scheme of things.

- **Local Claim** list includes a set of standard claim values which are local to the WSO2 Identity Server. When
adding a service provider, it is necessary to map the values of the claims local to the service provider with those
provided in this drop-down list which are local to the Identity Server. This should be done for all values in the
service provider unless they use the same claim name.

- **Requested Claim**: These are the would ensure that the Identity Server sends this claim to the service provider if the requested claim value is available. However, the user will not be prompted to enter the values if the Requested Claim values cannot be
provided by the identity provider. Requested Claims are useful particularly in cases where there are hundreds of claims and only specific ones need to
be sent to the service provider.

- **Mandatory Claim** would ensure that
the WSO2 IS will definitely send a value for this claim to
the service provider.  When a user logs into this service
provider, if the identity provider does not provide a value
for any of the mandatory claims, the user will be prompted
to provide them at the time of login.

## Register the service provider

{!fragments/register-a-service-provider.md!}

## Configure claims

Expand the **Claim Configuration** section and enable the claims required by the service provider.

### Option 1: Use local claims

If you want to enable an existing local claims, follow the steps given below.

1.  Select **Use Local Claim Dialect** to start.
2.  Click **Add Claim URI** and specify the following details:
    1. Select a claim from the **Local Claim** list. 
    2. Select the **Mandatory Claim** checkbox, if the claim should be mandatory for the service provider.

    ![mandatory-claim](../assets/img/using-wso2-identity-server/mandatory-claim.png)

### Option 2: Use custom claims

If you want to define custome claims and enable them for the service provider, follow the steps given below.

1.  Select **Define Custom Claim Dialect** to start.
2.  Click **Add Claim URI** to start mapping custom claims to local claims:
    1.  Add the **Service Provider Claim** and choose the corresponding **Local Claim** from the list. 
    2.  Select **Requested Claim** if you want to allow the new claim to be used by shared with the service provider.
    3.  Select the **Mandatory Claim** checkbox, if the claim should be mandatory for the service provider.

    ![mandatory-claim](../assets/img/using-wso2-identity-server/mandatory-claim.png)

3.  Select the **Subject Claim URI** from the list.

    !!! info 
        This is the authenticated user identifier, which will return the authentication response to the service provider.

4.  If you are using a custom claim, select the **Role Claim URI** from the list of claims that you mapped.

    !!! info
        This is useful if you use a different claim as the role claim or if you define a custom claim mapping for the service provider.
            
    ??? note "Custom claims for an OIDC service provider"
        When mapping custom claims for a service provider
        configured with OpenID Connect, ensure to map the custom
        claims in the SP configuration as seen in the screenshot
        above **AND** also add the custom claims to a scope value in
        the **oidc** file.

        Learn about [mapping oidc scopes and claims](../login/oidc-scopes-claims.md)

            
    ??? note "Custom claims for an SAML2 service provider"
        When mapping custom claims for a service provider configured with SAML2, be sure to select both **Enable Attribute Profile** and **Include Attributes in the Response Always** from the SAML2 service provider configuration as follows:
    
        ![enable-attribute-profile](../assets/img/using-wso2-identity-server/enable-attribute-profile.png)
    
        This is required since Identity Server include user claims in the SAML2 response only if SAML2 attribute profile is enabled.

## Caching service provider claims
If you want to cache claim data, add a cache configuration
similar to the following in the `<IS_HOME>/repository/conf/deployment.toml` file:

``` toml
[[cache.manager]]
name = "LocalClaimInvalidationCache"
timeout = "300"
capacity = "5000"
```

Here, you need to specify values as follows:

-   ` timeout ` : The cache timeout value in seconds.
-   ` capacity ` : The maximum cache size.

## Get user consent to share claims

When a user attempts to log in to the service provider, the user will be prompted to consent
sharing the claims (or user information) that was configured for the service provider.

The user will not be able to proceed with the authenticaiton without providing consent.

Learn more about [manage user consent](../consent-mgt/manage-user-consent).

!!! info "Related Topics"
    See [Logging in to Salesforce with Facebook](../../learn/logging-in-to-salesforce-with-facebook) for a sample of claim mapping for a service provider.