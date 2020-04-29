# Getting Started with the Management Console

The WSO2 Identity Server Management Console is a Web-based User
Interface. It allows users to interact with a running Identity Server
instance, without having to intervene with any underlying
configuration files. The controls in the Management Console are usually
self-explanatory. This page provides an overview of the User Interface of the 
management console. 

!!! Info 
    You can access the management console of the WSO2 Identity
    server at `https://<server-host>:<server-port>/carbon`. When the server
    is [running](../../setup/running-the-product/#starting-the-server)
    running in your local setup:
            
    ```
    https://localhost:9443/carbon
    ```
    The default credentials for a administrative user is as follows. It is a
    must that you change this administrator credentials in your deployment.
    
    ```java
    username = admin
    password = admin
    ```

The following screen depicts the home screen of the management console.

![server-home-management-console](../assets/img/setup/management-console/server_home_management_console.png)

The main menu items of the console appear in the left hand side of the 
home screen. Each of these menus carry a list of sub menus. These menus and subsections will 
navigate you via different configurations and features. The usable features for each
sub section will appear in the middle of the screen. 

The Management Console provides a list of tools and
features that you can use. These are divided among the following menu items.

-   Main menu
-   Monitor menu
-   Configure menu
-   Tools menu

!!! note
    The menus and sub menus of the management console may vary depending on the 
    product version and any additional feature you have installed to provision the
    server.

### **Main menu**

The main menu in the Management Console includes the main list of
features that the WSO2 Identity Server provides. The main menu is
divided into different sections.

#### Identity section

![identity-section-mgt-console](../assets/img/setup/management-console/identity-section-mgt-console.png)

!!! info "Related Links"
    Refer to the following topics for instructions to use sub menu items.
    
    -   See [Configuring Users, Roles and Permissions](../../learn/configuring-users-roles-and-permissions) 
        for configuring users and roles. 
    -   See [Configuring the Realm](../../setup/configuring-the-realm) for configuring user stores.
    -   See [Claim Management](../../learn/claim-management) for configuring claims.
    -   See [Adding and Configuring a Service Provider](../../learn/adding-and-configuring-a-service-provider) 
        for configuring service providers.
    -   See [Adding and Configuring an Identity Provider](../../learn/adding-and-configuring-an-identity-provider) 
        for configuring identity providers.


#### Entitlement section

![entitlement-section-mgt-console](../assets/img/setup/management-console/entitlement-section-mgt-console.png)

!!! info "Related links"
    Refer to the following topics for instructions to use sub menu items.
    
    -   See [Configuring the Policy Administration Point](../../learn/configuring-the-policy-administration-point) 
        for configuring the policy administration point.
    -   See [Configuring the Policy Decision Point](../../learn/configuring-the-policy-decision-point) 
        for configuring the policy decision point.

#### Manage section

![manage-section-mgt-console](../assets/img/setup/management-console/manage-section-mgt-console.png)

!!! info "Related links"  
    Refer to the following topics for instructions to use sub menu items.

    -   See [Workflow Management](../../learn/workflow-management) for information on
        working with workflows.
    -   See [Managing Challenge Questions](../../learn/managing-challenge-questions)
        for information on configuring challenge questions. Also see [Account Recovery](../../learn/user-portal/#account-recovery) for
        information on challenge questions.
    -   See [Email Templates](../../learn/customizing-automated-emails) for configuring email
        templates. Also see [Customizing Automated
        Emails](../../learn/customizing-automated-emails)
        for information on how to customize these templates.
    -   See [Creating New Keystores in the WSO2 Administration
        Guide](../../administer/creating-new-keystores)
        for configuring keystores.

### **Monitor menu**

The monitor menu includes a list of features focused on providing logs
and statistics related to the Identity Server. For more
information on these features and their usage, see the topics on
[monitoring the Identity Server](../../setup/monitoring-the-identity-server).


![monitor-section-mgt-console](../assets/img/setup/management-console/monitor-section-mgt-console.png)


### **Configure menu**

The configure menu is mainly a list of administration features which can
help you customize and configure the Identity Server to suit your
specific requirements.

![configure-section-mgt-console](../assets/img/setup/management-console/configure-section-mgt-console.png)

!!! info "Related links"
    Refer to the following topics for instructions to use sub menu items.

    -   See [Using Workflows with User
        Management](../../learn/using-workflows-with-user-management) for information
        on Workflow Engine Profiles.
    -   See [Creating and Managing Tenants](../../learn/creating-and-managing-tenants)
        for information on multitenancy.

!!! note
    `Server Roles` are used with Carbon Apps. From Identity Server 5.9.0, this feature is not available.

### **Tools menu**

The tools menu includes SAML and XACML tools. For more details on each
of these tools and their usage, see the topics on [working with tools](../../administer/using-tools).


![tools-section-mgt-console](../assets/img/setup/management-console/tools-section-mgt-console.png)
