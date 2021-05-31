# Just-in-Time User Inbound Provisioning

This page guides you through configuring [Just-in-Time (JIT) provisioning](../../../references/concepts/jit-provisioning) users from external identity providers into WSO2 Identity Server at the point of federated authentication. 

-----

{!fragments/register-an-identity-provider.md!}

----

## Enable JIT provisioning

1.  Expand the **Just-In-Time Provisioning** section and select the JIT
    provisioning options based on your requirement.  
    
    ![just-in-time-provisioning](../../../assets/img/guides/just-in-time-provisioning.png)   
    
    -   If you want to disable JIT provisioning, select **No
        Provisioning**. This is selected by default.
    -   If you want to always provision users to a selected userstore
        domain, select **Always provision to User Store Domain**, and
        then select a required userstore domain from the list of
        available userstore domains.

        !!! tip
        
            The userstore domain that you see by default is the **PRIMARY**
            userstore that is provided with WSO2 Identity Server.
    
            -   If you want to provision users to multiple user stores
                depending on the user name specified at the time of
                provisioning, select **As in username**.
    
            !!! note
                        
                If you select this option and do not specify the user name
                appropriately, the relevant user is provisioned to the
                PRIMARY userstore domain.  
                For example,
                        
                -   If you specify the username as `user`, the user is provisioned to the domain.
                -   If you specify the username as `user1`, the user is provisioned to the PRIMARY userstore domain.


            -   If you want to select a userstore domain other than the default primary userstore domain, you need to [configure a userstore](../../../deploy/configure-user-stores/) of your preference for it to appear in the list for you to select.


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
            defined in the userstore manager configuration. For example
            user name should match `UsernameJavaRegEx` and `RolenameJavaScriptRegEx` in the [userstore configuration](../../../deploy/configure-user-stores/).

2.  Click **Register** to add the identity provider.


!!! info "Related topics"

    - For information on the JIT provisioning architecture, see [Provisioning Architecture](../../../get-started/provisioning-architecture).

    - [Concept: Just-in-Time Provisioning](../../../references/concepts/jit-provisioning)

<!--For information on how to configure purposes and appropriate user
    attributes to obtain user consent at the time of JIT provisioning, see
    [Configuring Just-In-Time Provisioning Consent
    Purposes](../../learn/configuring-just-in-time-provisioning-consent-purposes).

    For information on how to customize the default user name and password
    provisioning user interfaces, see [Customizing Just-In-Time Provisioning
    User Interfaces](../../learn/customizing-just-in-time-provisioning-user-interfaces).
    
    [Guide: Outbound Just-in-Time Provisioning](TODO:link-to-guide)-->
    
