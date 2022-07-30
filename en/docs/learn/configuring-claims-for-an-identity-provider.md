# Configuring Claims for an Identity Provider

Configuring claims for an identity provider involves mapping the claims
available in the identity provider to claims that are local to the WSO2
Identity Server. This is done so that the Identity Server can identify
the user attributes in the response sent from the identity provider. As
an example, Facebook IdP will return authenticated user email as 'email'
and identity server will map it to the '
http://wso2.org/claims/emailaddress ' using the IdP claim mapping. See
the [Identity Server Architecture](../../get-started/architecture) topic for more
information on how claim mapping fits into the identity provider
scenario.

In the **Claim Configuration** form, there are two sub forms.

-   Basic claim
    configuration - This involves a straightforward mapping of the claim that is used on
    the identity provider side with the claims local to the Identity Server.
-   Advanced claim configuration - This involves more advanced mapping, where the mapped claims can
    have specific default values.

!!! Note

    To define a custom claim dialect, the configuration given below is required in the 
    `<IS_HOME>/repository/conf/deployment.toml` file of your WSO2 Identity Server. Otherwise the protocol-specific claim 
    dialect such as the OIDC dialect is always used.

    ```toml
    [authentication.endpoint]
    enable_custom_claim_mappings = true
    ```

Let's get started!

To view the claim configuration section, expand the **Claim
Configuration** form.

### Configuring basic claims

Select the claim mapping dialect by either choosing to use a local
claim dialect (i.e., a claim dialect local to the Identity Server) or
define your own custom claim dialect (i.e., a claim dialect which exists
in the identity provider that must be mapped to the Identity Server).

-   If you choose to **Use Local Claim Dialect**, select the claim you
    require from the **User ID Claim URI** dropdown that includes a list
    of all the claims defined in the Identity Server.  
    ![user-id-claim-uri](../assets/img/using-wso2-identity-server/user-id-claim-uri.png)   
-   You can alternatively choose the **Define Custom Claim Dialect**
    option.  
    ![custom-claim-dialect](../assets/img/using-wso2-identity-server/custom-claim-dialect.png)   
    For custom claim dialects, you must map the attributes of the user
    in the identity provider to the claims that are local to the
    Identity Server. These claims can be part of the response that is
    sent from the identity provider to the Identity Server. This can
    also be used when provisioning users from the Identity Server to an
    external identity provider. These claim values are sent as part of
    the outbound provisioning request. Do the following to configure
    this.  
    1.  Click the **Add Claim Mapping** button under **Identity Provider
        Claim URIs**. Clicking this button again enables you to perform
        more claim mapping.
    2.  Map the value of the corresponding claim in the identity
        provider to the claim in the Identity Server. Click the
        **Delete** button to remove the claim mapping.  
        ![delete-claim-mapping](../assets/img/using-wso2-identity-server/delete-claim-mapping.png)

        | Property                    | Description                                         | Sample Value                          |
        |-----------------------------|-----------------------------------------------------|---------------------------------------|
        | Identity Provider Claim URI | Claim identifier used in the Identity Provider side | emailID                               |
        | Local Claim URI             | Claim identifier used in the WSO2 Identity Server   | http://wso2.org/claims/emailaddress |

    3.  Select the **User ID Claim URI** from the dropdown that includes
        the list of identity provider claims you defined. This is used
        to uniquely identify the user in the response sent by the
        identity provider. This is also used to identify the user in
        provisioning requests.
    4.  Select the **Role ID Claim URI** from the dropdown that includes
        the list of identity provider claims you defined. This is used
        to uniquely identify the role of the user in the response sent
        by the identity provider. This is also used to identify the role
        in provisioning requests.  

### Configuring advanced claims

You can make advanced claim configurations based on the basic
configurations you have made.

??? note "Click here for more information on when advanced claims are useful"

    !!! info "Provisioning scenario where advanced claims can be useful"

        The following scenario encompasses two different scenarios where
        provisioning happens. For both these scenarios, advanced claims are very
        useful.

        ![provisioning-scenarios](../assets/img/using-wso2-identity-server/provisioning-scenarios.png)

        In the above scenario, Google Apps is configured as an identity provider
        in the Identity Server and you would configure the Google provisioning
        connector for provisioning requests. When a user is added to the
        management console of the Identity Server, it is assumed in this
        scenario that the Identity Server acts as a resident service provider.
        This user is provisioned to Google Apps using the Google Apps identity
        provider configuration in the Identity Server. So when configuring
        claims for this scenario, we would have multiple local claim URIs
        associated to the user. For example,
        http://wso2.org/claims/emailaddress, http://wso2.org/claims/title, etc.
        From these claims, only some may be required to provision to Google
        Apps. This is where the **Provisioning Claim Filter** comes into play.

        The next scenario is for Just-In-Time (JIT) provisioning. Salesforce is
        the service provider and Facebook is the identity provider configured in
        the Identity Server. When JIT provisioning is configured in the service
        provider configuration, the user is provisioned to the user store
        configured in the Identity Server. What happens here is that the
        authentication request is sent from Salesforce to the Identity Server,
        which sends it along to Facebook for authentication. Once authentication
        is done, the response is sent back to the Identity Server, and this is
        when JIT provisioning happens. So basically, JIT provisioning happens
        while in the middle of an authentication flow.

        If the same user store is configured in the Google Apps identity
        provider configuration and JIT provisioning is enabled, the user is
        provisioned there as well. Once again, the **Provisioning Claim Filter**
        is vital to map only the required claims for the specific identity
        provider.

        !!! note
            
            **Note** : The provisioning can happen in a blocking mode or in a
            non-blocking mode. In the blocking mode, the authentication flow will be
            blocked until the provisioning finishes - while in the non-blocking
            mode, provisioning happens in a different thread. This can be specified
            in the [service provider
            configuration](../../learn/adding-and-configuring-a-service-provider).
            

        In both these scenarios, only some specific user attributes must be
        configured for provisioning as the claims are different for both
        Facebook and Google Apps and must be mapped to the claims in the
        Identity Server.

Use the following instructions to configure advanced claims.

-   If you chose to **Use Local Claim Dialect** in the **Basic Claim
    Configuration**, do the following.
    1.  When you send provisioning requests from the Identity Server to
        the external identity provider, it may not be necessary to send
        all the requests. So, you can use the **Provisioning Claim
        Filter** to filter out the user attributes you need to send from
        the other available attributes. To use the **Provisioning Claim
        Filter**, select the claims that exist in the Identity Server
        from the dropdown list and click **Add Claim**. Clicking this
        button again enables you to add a new entry.  
        ![Advanced Claim for local
        claims](../assets/img/using-wso2-identity-server/advanced-claim-for-local-claim.png) 
    2.  Enter a **Default Value** for your claim. This value is the
        default value used when provisioning this claim. This value will
        be used in all instances of this field, e.g., if all users are
        from one organization, you can specify the name of the
        organization as a default value using this field. Clicking the
        **Delete** button will remove this advanced claim.
-   If you chose to **Define Custom Claim Dialect** in the **Basic Claim
    Configuration**, do the following.
    1.  Select the **Identity Provider Claim URI** you defined from the
        dropdown list and click **Add Claim**. Clicking this button
        again will add a new entry.  
        ![Advanced Claim for custom
        claims](../assets/img/using-wso2-identity-server/advanced-claim-for-custom-claims.png) 
    2.  Enter a **Default Value** for your claim. This value is the
        default value used when provisioning this claim. This value will
        be used in all instances of this field, e.g., if all users are
        from one organization, you can specify the name of the
        organization as a default value using this field. Clicking the
        **Delete** button will remove this advanced claim.

### Mapping configured claims to an OpenID Connect claim

!!! info "Do this only,"

    If your IDP is using OIDC claims and your newly added OIDC claims are
    not available in WSO2 OIDC claim dialect, you need to map those new OIDC
    claims to an existing unused OpenID Connect(OIDC) claim in WSO2 Identity
    Server. For that follow the below steps.

Once you create a claim definition, you need to map that newly added
claim to an OpenID Connect (OIDC) claim. To do this, do the following:

1.  Select **Home** -\> **Identity** -\> **Claims** -\> **List** -\>
    http://wso2.org/oidc/claim
2.  In the list select a claim that you do not use and map that to the
    newly added claim.

See the following topics for samples of claim mapping for an identity
provider.

-   [Logging in to your application via Identity Server using Facebook
    Credentials](../../learn/logging-in-to-your-application-via-identity-server-using-facebook-credentials)
-   [Logging in to Salesforce with
    Facebook](../../learn/logging-in-to-salesforce-with-facebook)
-   [Outbound Provisioning with
    Salesforce](../../learn/outbound-provisioning-with-salesforce)
