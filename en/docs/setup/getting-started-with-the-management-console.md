# Getting Started with the Management Console

The WSO2 Identity Server Management Console is a Web-based user
interface. It allows users to interact with a running Identity Server
instance, without having to directly interfere with any underlying
configuration files. The controls in the Management Console are usually
self-explanatory. However, this page provides some additional insight on
what can be configured here. The product documentation provides further
information about the technology and offers guidance on using the
features and configurations.

The Management Console makes use of the default HTTPS servlet transport,
which is configured in the **catalina-server.xml** file in the
`         <IS_HOME>/repository/conf/tomcat        ` directory. It is
essential for this transport to be properly configured in this file for
the Management Console to be accessible to users. For information on how
to access the management console, see [Running the
Product](../../setup/running-the-product).

!!! warning
    
    If you are using Mac OS with High Sierra, you may encounter the
    following warning message when logging in to the management console due
    to a compression issue that exists in the High Sierra SDK.
    
    ``` java
    WARN {org.owasp.csrfguard.log.JavaLogger} -  potential cross-site request forgery (CSRF) attack thwarted (user:<anonymous>, ip:xxx.xxx.xx.xx, method:POST, uri:/carbon/admin/login_action.jsp, error:required token is missing from the request)
    ```
    
    To avoid this issue, open the `         <IS_HOME>/        `
    `         repository/conf/tomcat/catalina-server.xml        ` file and
    change the `         compression="on"        ` to
    `         compression="off"        ` in the HTTPS connector
    configuration, and restart WSO2 IS.
    

The following screen depicts the full overview of the management
console.

![](attachments/103328985/103328992.png) 

The console's menu items appear in the left hand side of the Identity
Server screen and the useable features appear in the center of the
screen and depend on the menu item you select from the left menu. The
Management Console of the Identity Server provides a list of tools and
features that you can use. These are divided among the following.

-   [Main menu](#GettingStartedwiththeManagementConsole-Mainmenu)
-   [Monitor menu](#GettingStartedwiththeManagementConsole-Monitormenu)
-   [Configure
    menu](#GettingStartedwiththeManagementConsole-Configuremenu)
-   [Tools menu](#GettingStartedwiththeManagementConsole-Toolsmenu)

While these menu items are usually divided into **Main**, **Monitor**,
**Configure** and **Tools**, additional menus may appear depending on
the availability of features. Each of these menus carry a list of sub
menus. A product's menus and sub menus may vary depending on the product
version and any additional feature you have installed to provision the
server.

### Main menu

The main menu in the Management Console includes the main list of
features that the WSO2 Identity Server provides. The main menu is
divided into different sections.

#### Identity section

![](attachments/103328985/103328990.png)

**Related links**

See the following topics for instructions on how to use each of these
menu items.

-   See [Configuring Users, Roles and
    Permissions](Configuring_Users_Roles_and_Permissions) for
    configuring users and roles.
-   See [Configuring the Realm](../../learn/configuring-the-realm) for configuring
    user stores.
-   See [Claim Management](../../learn/claim-management) for configuring claims.
-   See [Adding and Configuring a Service
    Provider](../../learn/adding-and-configuring-a-service-provider) for
    configuring service providers.
-   See [Adding and Configuring an Identity
    Provider](../../learn/adding-and-configuring-an-identity-provider) for
    configuring identity providers.

#### Entitlement section

![](attachments/103328985/103328991.png)

**Related links**

See the following topics for instructions on how to use each of these
menu items.

-   See [Configuring the Policy Administration
    Point](../../learn/configuring-the-policy-administration-point) for
    configuring the policy administration point.
-   See [Configuring the Policy Decision
    Point](Configuring_the_Policy_Decision_Point) for configuring the
    policy decision point.

#### Manage section

![](attachments/103328985/103328986.png)

**Related links**

See the following topics for instructions on how to use each of these
menu items.

-   See [Workflow Management](../../learn/workflow-management) for information on
    working with workflows.
-   See [Managing Challenge Questions](Managing_Challenge_Questions)
    for information on configuring challenge questions. Also see [Using
    the End User Dashboard](../../learn/using-the-end-user-dashboard) for
    information on challenge questions.
-   See [Email Templates](Email_Templates) for configuring email
    templates. Also see [Customizing Automated
    Emails](https://docs.wso2.com/display/IS530/Customizing+Automated+Emails)
    for information on how to customize these templates.
-   See [Creating New Keystores in the WSO2 Administration
    Guide](https://docs.wso2.com/display/ADMIN44x/Creating+New+Keystores)
    for configuring keystores.

### Monitor menu

The monitor menu includes a list of features focused on providing logs
and statistics related to monitoring the Identity Server. For more
information on these features and their usage, see the topics on
[monitoring the Identity Server](Monitoring_the_Identity_Server).

![](attachments/103328985/103328987.png)

### Configure menu

The configure menu is mainly a list of administration features which can
help you customize and configure the Identity Server to suit your
specific requirements.

![](attachments/103328985/103328988.png)

**Related links**

See the following topics for instructions on how to use each of these
menu items.

-   See [Features](#){.unresolved} in the WSO2 Product Administration
    Guide for instructions on how to use features.
-   See [Logging](#){.unresolved} in the WSO2 Product Administration
    Guide for information on logging.
-   See [Server Roles](Server_Roles) for information on server roles.
-   See [Using Workflows with User
    Management](Using_Workflows_with_User_Management) for information
    on Workflow Engine Profiles.
-   See [Creating and Managing Tenants](Creating_and_Managing_Tenants)
    for information on multitenancy.

### Tools menu

The tools menu includes SAML and XACML tools. For more details on each
of these tools and their usage, see the topics on [working with
tools](Using_Tools).

![](attachments/103328985/103328989.png)
