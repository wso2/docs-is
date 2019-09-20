# Configuring Outbound Provisioning for a Service Provider

You might want to outbound provision users that self-register to your
applications (service provider) to other entities, such as Google or
Salesforce. This section guides you on how to configure [outbound
provisioning](../../learn/outbound-provisioning) for a service provider.

!!! info "Scenario"

    For example, your organization has a registration portal to add new
    employees and a registration portal to add customers to your system.
    WSO2 Identity Server acts as your Identity Provider. You want the newly
    added users to be provisioned to Google and Salesforce because Gmail and
    Salesforce are used for day to day activities in the organization. The
    customer details only need to be stored in the WSO2 Identity Server's
    user store. Therefore, you configure the Service Provider that was
    created for the employees' registration application to handle outbound
    provisioning too.

To register a service provider, do the following.

1.  Sign in. Enter your username and password to log on to the Management Console. 
2.  Navigate to the Main menu to access the Identity menu. Click Add under Service Providers.
3.  Fill in the Service Provider Name and provide a brief Description of the service provider. Only Service Provider Name is a required field.
4.  Click Register to add the new service provider.

Do the following to configure outbound provisioning.

1.  Expand the **Outbound Provisioning Configuration**. For this
    section to be configurable, you should already have added an
    identity provider and enabled an outbound provisioning connector
    (Google, Salesforce, SCIM, SPML, etc.).
2.  Choose the identity provider you require from the drop-down
    and click  
    ![outbound-provisioning-icon](../assets/img/using-wso2-identity-server/outbound-provisioning-icon.png).

3.  Click **Update** to save your changes.  
    ![save-idp-config](../assets/img/using-wso2-identity-server/save-idp-config.png)

    !!! info 
        -   If you select **Blocking**, the authentication flow is blocked
            until the provisioning finishes. If **Blocking** is not
            selected, provisioning happens in a different thread. In the
            blocking mode, the authentication flow will be blocked till the
            provisioning finishes while in the non-blocking mode,
            provisioning happens in a different thread. If you want to allow
            a user to access your application only if the user is
            authenticated as well as provisioned then you have to use
            blocking mode, in other words, if you don't care whether the
            user gets provisioned or not in order to access your application
            you can use non-blocking mode.

        -   If you select **Enable JIT Outbound**, the users are
            provisioned to the WSO2 IS user store on-the-fly as and when
            they are authenticated using just-in-time provisioning. To
            enable this, you need to configure JIT provisioning for the
            Identity Provider. For more information, see [Configuring
            Just-In-Time
            Provisioning](../../learn/configuring-just-in-time-provisioning-for-an-identity-provider)
            .
        -   If you select **Enable Rules**, the users are provisioned based
            on the pre-defined XACML rules. For more information, see [Rule
            Based
            Provisioning](../../learn/rule-based-provisioning)
            .
        -   Click the **Delete** button to remove the identity provider you
            added.

!!! info "Related Topics" 

    -   See [Outbound Provisioning](../../learn/outbound-provisioning) for more
        information on configuring user stores and service providers for
        outbound provisioning.
