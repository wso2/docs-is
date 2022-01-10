# Configuring Just-In-Time Provisioning for an Identity Provider

**Just-in-time provisioning** is about how to provision users to the
Identity Server at the time of federated authentication. A service
provider initiates the authentication request, the user gets redirected
to the Identity Server, and then the Identity Server redirects the user
to an external identity provider for authentication. Just-in-time
provisioning gets triggered in such a scenario when the Identity Server
receives a positive authentication response from the external identity
provider. The Identity Server will provision the user to its internal
user store with the user claims from the authentication response.

You configure JIT provisioning against an identity provider – not
against service providers. Whenever you associate an identity provider
with a service provider for outbound authentication, if the JIT
provisioning is enabled for that particular identity provider, then the
users from the external identity provider will be provisioned into the
Identity Server's internal user store. In the JIT provisioning
configuration, you can also select the provisioning user store.

JIT provisioning happens in the middle of an authentication flow. You
can create users on the fly, without having to create user accounts in
advance. For example, if you recently added a user to your application,
you do not need to manually create the user in Identity Server or in the
underlying user store. The provisioning can happen in a blocking mode or
in a non-blocking mode. In the blocking mode, the authentication flow is
blocked until the provisioning happens while in the non-blocking mode,
provisioning happens in a different thread. If you want to allow a user
to access your application only if the user is authenticated and
provisioned, then you should use blocking mode.

### Configuring JIT provisioning for an identity provider

To configure JIT provisioning for an identity provider, follow the steps
below:

1.  Start WSO2 Identity Server and access the Management Console via
    `                     https://localhost:9443/carbon/`. 
    For detailed instructions on starting WSO2 Identity Server, see
    [Running the Product](../../setup/running-the-product).
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Identity Providers**.
3.  Click the **Main** tab on the Management Console, navigate to
    **Identity Providers** under the **Identity** menu, and then click
    **Add**. This displays the **Add New Identity Provider** screen.
4.  Enter appropriate values for all required fields in the **Basic
    Information** section.

5.  Expand the **Just-In-Time Provisioning** section and select the JIT
    provisioning options based on your requirement.  
    ![just-in-time-provisioning](../assets/img/using-wso2-identity-server/just-in-time-provisioning.png)   
    -   If you want to disable JIT provisioning, select **No
        Provisioning**. This is selected by default.
    -   If you want to always provision users to a selected user store
        domain, select **Always provision to User Store Domain**, and
        then select a required user store domain from the list of
        available user store domains.

        !!! tip
        
            The user store domain that you see by default is the **PRIMARY**
            user store that is provided with WSO2 Identity Server.
    
            -   If you want to provision users to multiple user stores
                depending on the user name specified at the time of
                provisioning, select **As in username**.
    
            !!! note
                        
                If you select this option and do not specify the user name
                appropriately, the relevant user is provisioned to the
                PRIMARY user store domain.  
                For example,
                        
                -   If you specify the user name as user is provisioned to the domain.
                -   If you specify the user name as `                user1               `, the user is provisioned to the PRIMARY user store domain.


            -   If you want to select a user store domain other than the default primary user store domain, you need to [configure a user store](../../setup/configuring-user-stores) of your preference for it to appear in the list for you to select.


    -   When you select **Always provision to User Store Domain**, you
        should also select one of the following provisioning
        options depending on how you want to prompt users for relevant
        credentials at the time of JIT provisioning. The default
        selection is **Provision silently**.

        -   **Prompt for username, password and consent**
        -   **Prompt for password and consent**
        -   **Prompt for consent**
        -   **Provision silently**

        !!! note
        
            Provisioning claims should be compatible with the policies
            defined in the user store manager configuration. For example
            user name should match
            `             UsernameJavaRegEx            ` and  
            `             RolenameJavaScriptRegEx            ` in the [user
            store
            configuration](../../setup/configuring-user-stores)
            .

        !!! note

            To associate any user having the same JIT provisioned username with the local user having the same username, 
            add the following configuration to `<IS-HOME>/repository/conf/deployment.toml`.

            ``` toml
            [authentication]
            jit_provisioning.associating_to_existing_user = true
            ```

            Note that if this is enabled, there's a risk of unauthorized profile update.

            This configuration is available as an update in WSO2 IS 5.11.0 from update level 69 onwards 
            (Updates 2.0 model). If you don't already have this update, see the instructions on 
            [updating your product](https://updates.docs.wso2.com/en/latest/updates/overview/).
            Previous update levels have this behavior by default.

6.  Click **Register** to add the identity provider.

!!! info "Related Topics"

    For information on the JIT provisioning architecture, see [Provisioning
    Architecture](../../get-started/architecture).

    For information on how to configure purposes and appropriate user
    attributes to obtain user consent at the time of JIT provisioning, see
    [Configuring Just-In-Time Provisioning Consent
    Purposes](../../learn/configuring-just-in-time-provisioning-consent-purposes).

    For information on how to customize the default user name and password
    provisioning user interfaces, see [Customizing Just-In-Time Provisioning
    User
    Interfaces](../../learn/customizing-just-in-time-provisioning-user-interfaces).
    
### Configuring JIT Provisioning Enhanced Feature (Optional)

Add the following configuration to `deployment.toml` in the <IS_HOME>/conf directory.

```toml
[authentication.jit_provisioning]
enable_enhanced_feature = "true"
```

With the the JIT provisioned enhanced feature, the following capabilities will be available.

-   A Federated unique user id will be set as the username of the JIT provisioned user.
-   Second-factor authenticators(Ex:- TOTP, Email OTP) will be able to configure for federated users when JIT provisioing is enabled
-   When an IDP is deleted, all provisioned users from that IDP will be deleted.
-   Editing JIT provisioned user’s attributes will not be allowed.
-   Ability to lock JIT provisioned user accounts based on social identity.
