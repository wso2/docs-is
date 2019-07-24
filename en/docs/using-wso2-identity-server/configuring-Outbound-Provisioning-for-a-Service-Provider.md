# Configuring Outbound Provisioning for a Service Provider

You might want to outbound provision users that self-register to your
applications (service provider) to other entities, such as Google or
Salesforce. This section guides you on how to configure [outbound
provisioning](_Outbound_Provisioning_) for a service provider.

Scenario

For example, your organization has a registration portal to add new
employees and a registration portal to add customers to your system.
WSO2 Identity Server acts as your Identity Provider. You want the newly
added users to be provisioned to Google and Salesforce because Gmail and
Salesforce are used for day to day activities in the organization. The
customer details only need to be stored in the WSO2 Identity Server's
user store. Therefore, you configure the Service Provider that was
created for the employees' registration application to handle outbound
provisioning too.

Do the following to configure outbound provisioning.

1.  Expand the **Outbound Provisioning Configuration**. For this
    section to be configurable, you should already have added an
    identity provider and enabled an outbound provisioning connector
    (Google, Salesforce, SCIM, SPML, etc.).
2.  Choose the identity provider you require from the drop-down
    and click  
    ![]( ../../assets/img/103329864/103329866.png)  .

3.  Click **Update** to save your changes.  
    ![]( ../../assets/img/103329864/103329865.png) 

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
        Provisioning](https://docs.wso2.com/display/IS530/Configuring+Just-In-Time+Provisioning+for+an+Identity+Provider)
        .
    -   If you select **Enable Rules**, the users are provisioned based
        on the pre-defined XACML rules. For more information, see [Rule
        Based
        Provisioning](https://docs.wso2.com/display/IS530/Rule+Based+Provisioning)
        .
    -   Click the **Delete** button to remove the identity provider you
        added.

**Related Topics**

-   See [Outbound Provisioning](_Outbound_Provisioning_) for more
    information on configuring user stores and service providers for
    outbound provisioning.
