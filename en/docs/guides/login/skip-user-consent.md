# Skip User Consent

The user's [consent]({{base_path}}/references/concepts/consent-management/) is required by default for an application to access the attributes configured. 

!!! info "Important"
    As explained below, consent management can be disabled globally and per service provider. If consent management is disabled globally, the service provider configuration will be skipped.

----

## Disable consent per service provider

Configure service provider to skip user consent:

{!includes/skip-user-consent.md!}

## Disable consent globally
  
You can disable consent management for the product using the following global configuration (applies to all tenants). Once consent management is disabled, the user will not be prompted to provide consent during authentication.

Open the `deployment.toml` file found in the in `<IS_HOME>/repository/conf/` directory and add the following configuration.

``` toml
[authentication.consent] 
prompt= false
```


!!! info "Related topics"
    - [Concept: Consent Management]({{base_path}}/references/concepts/consent-management/)
    - [Guide: Request Attributes for the Application]({{base_path}}/request-attributes/)