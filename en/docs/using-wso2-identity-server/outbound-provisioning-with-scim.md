# Outbound Provisioning with SCIM

This topic provides instructions on how to provision users to a trusted
identity provider from the WSO2 Identity Server. A trusted identity
provider is basically an identity provider that supports inbound
provisioning. It can be Google, Salesforce, another Identity Server,
etc.

[Outbound Provisioning](../../using-wso2-identity-server/outbound-provisioning) is supported via
[SCIM](https://tools.ietf.org/html/rfc7644#section-3.2) or
[SPML](https://docs.oasis-open.org/provision/spml-2.0-cd-01/pstc-spml2-cd-01.pdfhttps://docs.oasis-open.org/provision/spml-2.0-cd-01/pstc-spml2-cd-01.pdf)
standards. There are [outbound provisioning
connectors](https://store.wso2.com/store/assets/isconnector/list) for
Google and Salesforce available by default in the Identity Server. If
you need to plug any other custom connector, you can do it by writing an
extension for that as described
[here](../../using-wso2-identity-server/writing-an-outbound-provisioning-connector). Outbound
provisioning configurations can be found under identity provider
configuration user interface of the Identity Server.

### Configuring an identity provider

First, you must configure a trusted identity provider that has the
ability to accept the provisioning request from Identity Server.

!!! tip
    
    When configuring the identity provider to provision users using SCIM,
    you must ensure that the trusted identity provider can accept SCIM
    requests. For the purpose of this example scenario, you can use another
    Identity Server as your identity provider. The configurations in this
    topic are done to reflect this.
    

The following steps provide instructions on how to create a new trusted
identity provider in the Identity Server.

1.  Log on to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    using your username and password.
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Identity Providers**.
3.  Fill in the details in the **Basic Information** section.  
    ![idp-basic-info](../../assets/img/using-wso2-identity-server/idp-basic-info.png)   
    Note the following when filling the above form.
    -   The **Identity Provider Name** should be unique.
    -   The **Home Realm Identifier** is a standard value which will
        come with the communication from the identity provider. This is
        used as an identifier.
    -   The **Alias** is the equivalent location specified in the
        identity provider.
4.  Expand the **Outbound Provisioning Connectors** section followed by
    the **SCIM Provisioning Configuration** section.
5.  Fill out the details in the form.  
    ![scim-config-form](../../assets/img/using-wso2-identity-server/scim-config-form.png)   
    Do the configurations as described in [Configuring SCIM
    provisioning](configuring-outbound-provisioning-connectors-for-an-identity-provider#configuring-scim-provisioning)
    . The following are the configurations in brief.

    -   Select **Enable Connector** to enable identity provisioning.

    -   Enter the **Username** and **Password** used in the SCIM
        application.

    -   Select the **User Endpoint** and **Group Endpoint**, which are
        SCIM endpoints.

    -   **User Store Domain** is the user store that you need to
        provision users to.

    -   **Enable Password Provisioning** lets you send a default
        password with the SCIM request and **Default Password** lets you
        specify the password.

6.  Click **Register** to save your changes.

### Configuring outbound provisioning

There are two options available to configure outbound provisioning in
the Identity Server.

#### Configuring a resident service provider

When configuring outbound provisioning for any user management operation
done via the management console, SOAP API or the SCIM API, you must
configure outbound provisioning identity providers against the resident
service provider. So, based on the outbound configuration, users added
from the management console can also be provisioned to external systems
like Salesforce and Google Apps.

1.  Log on to the [Management
    Console](../../setup/getting-started-with-the-management-console) using
    username and password.
2.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Service Providers**.
3.  In the resulting screen, expand the **Outbound Provisioning
    Configuration** section.  
    ![config-outbound-provisioning](../../assets/img/using-wso2-identity-server/config-outbound-provisioning.png) 
4.  In the **Outbound Provisioning Configuration** section, do the
    following.
    1.  Select the identity provider you added from the drop-down menu
        available and click the following sign to add it. If you have
        not added an identity provider as yet, this step is not
        possible. ![outbound-provisioning-icon](../../assets/img/using-wso2-identity-server/outbound-provisioning-icon.png)
    2.  Once added, the identity provider is displayed as an entry in a
        list. Select **scim** from the drop-down to ensure that the SCIM
        operation is used for provisioning.
    3.  The option **Blocking,** if enabled, it means that the outbound
        provisioning request must be blocked until the response is
        received. By default, the request would be non-blocking.
    4.  The option **Enable Rules**, if enabled, it means outbound
        provisioning request will be executed along with the XACML rules
        enabled.
5.  Click **Update** to save your configurations.

#### Configuring a service provider

You can configure a service provider instead of a resident service
provider if your application supports OAuth.

1.  Sign in. Enter your username and password to log on to the
    [Management
    Console](../../setup/getting-started-with-the-management-console)
    .
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
3.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. Only **Service Provider
    Name** is a required field.
4.  In the screen that appears, expand the **Outbound Provisioning
    Configuration** section.  
    ![expand-outbound-provisioning](../../assets/img/using-wso2-identity-server/expand-outbound-provisioning.png) 
5.  In the **Outbound Provisioning Configuration** section, do the
    following.
    1.  Select the identity provider you added from the drop-down menu
        available and click the following sign to add it. If you have
        not added an identity provider as yet, this step is not
        possible. ![outbound-provisioning-icon](../../assets/img/using-wso2-identity-server/outbound-provisioning-icon.png)
    2.  Once added, the identity provider is displayed as an entry in a
        list. Select **scim** from the drop-down to ensure that the SCIM
        operation is used for provisioning.
    3.  There is another option called **Blocking**. If enabled, it
        means that the outbound provisioning request must be blocked
        until the response is received. By default, the request would be
        not non-blocking.
    4.  There is another option called **Enable Rules.** If enabled, it
        means outbound provisioning request will be executed along with
        the XACML rules enabled.
    5.  You can also enable [just-in-time
        provisioning](../../using-wso2-identity-server/configuring-just-in-time-provisioning-for-an-identity-provider)
        by selecting the **Enable JIT** checkbox. Once you enable this,
        when a user is JIT provisioned to IS when authenticating from a
        federated authenticator, that user will be outbound provisioned
        to this identity provider as well.
6.  Click **Update** to save your configurations.
