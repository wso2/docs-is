# Just-in-Time User Inbound Provisioning

This page guides you through configuring [Just-in-Time (JIT) provisioning](../../../references/concepts/jit-provisioning) for users from external identity providers into WSO2 Identity Server during federated authentication.

-----

## Pre requisites
You need to [add and configure an identity provider](../identity-federation/add-idp.md) on the Identity Server.

## Enable JIT provisioning

To enable JIT provisioning for an IdP:

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable JIT provisioning on, and click on the corresponding **Edit** link.
3. Expand the **Just-In-Time Provisioning** section and select the JIT provisioning options based on your requirement.

    ![just-in-time-provisioning](../../../assets/img/guides/just-in-time-provisioning.png)

4. Select **Always provision to User Store Domain**, and select a required userstore domain from the list of available userstore domains.

    !!! tip
        The userstore domain that you see by default is the **PRIMARY** userstore that is provided with WSO2 Identity Server.

        If you want to provision users to multiple user stores depending on the user name specified at the time of provisioning, select **As in username** from the dropdown.
                    
        If you select this option and do not specify the user name
        appropriately, the relevant user is provisioned to the
        PRIMARY userstore domain.  
        For example,
                    
        -   If you specify the username as `user`, the user is provisioned to the domain.
        -   If you specify the username as `user1`, the user is provisioned to the PRIMARY userstore domain.

        If you want to select a userstore domain other than the default primary userstore domain, you need to [configure a userstore](../../deploy/configure-the-primary-user-store.md) of your preference for it to appear in the list for you to select.

5. Select the provisioning options depending on how you want to prompt users for relevant credentials at the time of JIT provisioning. The provisioning options are as follows:

    - Prompt for username, password and consent
    - Prompt for password and consent
    - Prompt for consent
    - Provision silently

    !!! note
        By default **Provision silently** will be selected, you can change it as you wish.

6. Click **Update** to save your configurations.

!!! note
    Provisioning claims should be compatible with the policies defined in the userstore manager configuration. For example
    user name should match `UsernameJavaRegEx` and `RolenameJavaScriptRegEx` in the [userstore configuration](../../../deploy/configure-user-stores/).

## Disable JIT Provisioining

To disable JIT provisioning for an IdP:

!!! note
    JIT provisioing is disabled by default. If you have enabled JIT provisioing for the IdP, use these instructions to disable it.

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable JIT provisioning on, and click on the corresponding **Edit** link.
3. Expand the **Just-In-Time Provisioning** section and select the JIT provisioning options based on your requirement.  
4. Select **No Provisioning** and click **Update** to disable JIT provisioning.

!!! info "Related topics"

    - [JIT Provisioning Architecture](../../../get-started/provisioning-architecture).

    - [Introduction to Just-in-Time Provisioning](../../../references/concepts/jit-provisioning)

<!--For information on how to configure purposes and appropriate user
    attributes to obtain user consent at the time of JIT provisioning, see
    [Configuring Just-In-Time Provisioning Consent
    Purposes](../../learn/configuring-just-in-time-provisioning-consent-purposes).

    For information on how to customize the default user name and password
    provisioning user interfaces, see [Customizing Just-In-Time Provisioning
    User Interfaces](../../learn/customizing-just-in-time-provisioning-user-interfaces).
    
    [Guide: Outbound Just-in-Time Provisioning](TODO:link-to-guide)-->
    
