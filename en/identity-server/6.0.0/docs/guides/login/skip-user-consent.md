# Skip User Consent

The user's [consent]({{base_path}}/references/concepts/consent-management/) is required by default for an application to access the attributes configured. 

!!! info "Important"
    As explained below, consent management can be disabled globally and per service provider. If consent management is disabled globally, the service provider configuration will be skipped.

## Disable consent per service provider

Configure service provider to skip user consent:

1. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).

2. Navigate to the **Service Providers** tab listed under the **Identity** section and click **List**.

3. Click **Edit** adjacent to the service provider for which you want to skip the consent step.  

3. Expand **Local & Outbound Authentication Configuration**. 

4.  Enable **Skip Login consent**. 
    ![skip login consent]({{base_path}}/assets/img/guides/skip-login-consent.png)
    
5.  Click **Update** to save the changes.

## Disable consent globally
  
You can disable consent management for the product using the following global configuration (applies to all tenants). Once consent management is disabled, the user will not be prompted to provide consent during authentication.

Open the `deployment.toml` file found in the in `<IS_HOME>/repository/conf/` directory and add the following configuration.

``` toml
[authentication.consent] 
prompt= false
```


!!! info "Related topics"
    - [Concept: Consent Management]({{base_path}}/references/concepts/consent-management/)
    - [Guide: Request Attributes for the Application]({{base_path}}/guides/login/request-attributes/)