# Just-in-Time User Inbound Provisioning

This page guides you through configuring [Just-in-Time (JIT) provisioning](../../../references/concepts/jit-provisioning) for users from external identity providers into WSO2 Identity Server during federated authentication.

-----

## Prerequisites
You need to [add and configure an identity provider](../identity-federation/add-idp.md) on the Identity Server.

## Enable JIT provisioning

To enable JIT provisioning for an IdP:

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable JIT provisioning on, and click on the corresponding **Edit** link.
3. Expand the **Just-In-Time Provisioning** section and select the JIT provisioning options based on your requirement.

    ![just-in-time-provisioning](../../../assets/img/guides/just-in-time-provisioning.png)

4. Select **Always provision to User Store Domain**, and select a required user store domain from the list of available user store domains.

    !!! tip
        The user store domain that you see by default is the **PRIMARY** user store that is provided with WSO2 Identity Server.

        If you want to provision users to multiple user stores depending on the user name specified at the time of provisioning, select **As in username** from the dropdown.
                    
        If you select this option and do not specify the user name
        appropriately, the relevant user is provisioned to the
        PRIMARY user store domain.  
        For example,
                    
        -   If you specify the username as `user`, the user is provisioned to the domain.
        -   If you specify the username as `user1`, the user is provisioned to the PRIMARY user store domain.

        Suppose you want to select a user store domain other than the default primary user store domain. In that case, you need to [configure a userstore](../../deploy/configure-the-primary-user-store.md) of your preference for it to appear in the list for you to select.

5. Select the provisioning options depending on how you want to prompt users for relevant credentials at the time of JIT provisioning. The provisioning options are as follows:

    - Prompt for username, password and consent
    - Prompt for password and consent
    - Prompt for consent
    - Provision silently

    !!! note
        By default **Provision silently** will be selected, you can change it as you wish.

6. Click **Update** to save your configurations.

!!! note
    Provisioning claims should be compatible with the policies defined in the userstore manager configuration. For example
    user name should match `UsernameJavaRegEx` and `RolenameJavaScriptRegEx` in the [userstore configuration](../../../deploy/configure-user-stores/).

## Disable JIT Provisioning

To disable JIT provisioning for an IdP:

!!! note
    JIT provisioning is disabled by default. If you have enabled JIT provisioning for the IdP, use these instructions to disable it.

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable JIT provisioning on, and click on the corresponding **Edit** link.
3. Expand the **Just-In-Time Provisioning** section and select the JIT provisioning options based on your requirement.  
4. Select **No Provisioning** and click **Update** to disable JIT provisioning.

!!! info "Related topics"

    - [JIT Provisioning Architecture](../../references/architecture/provisioning-architecture.md/#jit-provisioning).

    - [Introduction to Just-in-Time Provisioning](../../../references/concepts/jit-provisioning)
    
    - [Configuring Just-In-Time Provisioning Consent Purposes](../identity-federation/jit-consent-purposes.md).

    - [Customizing Just-In-Time Provisioning User Interfaces](../identity-federation/jit-user-interfaces.md).

<!-- [Guide: Outbound Just-in-Time Provisioning](TODO:link-to-guide) -->

## Enhanced Feature (Optional)

Add the following configuration to deployment.toml in the `/conf` directory.

```xml
[authentication.jit_provisioning]
enable_enhanced_feature = "true"
```

With the JIT provisioned enhanced feature, the following capabilities will be available.

- A Federated unique user id will be set as the username of the JIT provisioned user.
- Second-factor authenticators (Ex:- TOTP, Email OTP) will be able to configure for federated users when JIT provisioning is enabled
- When an IDP is deleted, all provisioned users from that IDP will be deleted.
- Editing JIT-provisioned user’s attributes will not be allowed.
- Ability to lock JIT provisioned user accounts based on social identity.


