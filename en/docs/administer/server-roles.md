# Server Roles

A server role is a parameter that is mentioned in
`         <PRODUCT_HOME>/repository/conf/carbon.xml        ` file of all
WSO2 products. Each product has a different default ServerRoles property
as follows:

-   WSO2 Application Server - `ApplicationServer`
-   WSO2 Business Activity Monitor - `BusinessActivityMonitor`
-   WSO2 Business Process Server - `BusinessProcessServer`
-   WSO2 Business Rules Server - `BusinessRulesServer`
-   WSO2 Data Services Server - `DataServicesServer`
-   WSO2 Enterprise Service Bus - `EnterpriseServiceBus`
-   WSO2 Gadget Server - `GadgetServer`
-   WSO2 Governance Registry - `GovernanceRegistry`
-   WSO2 Identity Server - `IdentityServer`
-   WSO2 Mashup Server - `MashupServer`

You can specify a ServerRole for each artifact in the C-App. For
example, say you are developing an Axis2 service and planning to deploy
all your services in a single Application Server instance in the
production setup. You can set the ServerRole as
`         appserver1        ` .

The following methods can be used to set the ServerRole property:

-   [Using the management console to set the ServerRole
    property](#using-the-management-console-to-set-the-serverrole-property)
-   [Using carbon.xml file to set the ServerRole
    property](#using-carbonxml-file-to-set-the-serverrole-property)
-   [Using a system property to set the ServerRole
    property](#using-a-system-property-to-set-the-serverrole-property)

#### Using the management console to set the ServerRole property

This is the recommended way to configure server roles because the
changes done through the console cannot be overridden by the other
methods. Server roles are stored in the registry when they are
configured through the management console. Values in the registry are
always given priority over others.

1.  Log in to the management console of your product and click **Server
    Roles** menu under the **Configure** menu.
2.  Click **Add New Server Role**, e nter the Role Name and click
    **Add.** You can add any textual name as a server role without
    special characters except underscore.  
    ![Add custom server role form]( ../../assets/img/using-wso2-identity-server/add-custom-server-role-form.png)
3.  The newly added server role is displayed in the server roles list.  
    ![Server roles list]( ../../assets/img/using-wso2-identity-server/server-roles-list.png)  
    You can delete the server role using the **Delete** icon associated
    with it.

    !!! info
        You cannot undo a deletion once performed. Users can even delete a default server role. Once deleted, the server role manager will not pick up the deleted server role from the `            carbon.xml           ` file, next time the server starts.

#### Using carbon.xml file to set the ServerRole property

Change the ServerRoles element in
`         <PRODUCT_HOME>/repository/conf/carbon.xml        ` file as
follows:  

``` java
<ServerRoles>
     <Role>DataServicesServer</Role>
</ServerRoles>
```

You can also specify multiple roles for the server. For example,

``` java
<ServerRoles>
     <Role>appserver1</Role>
     <Role>dataservices1</Role>
</ServerRoles>
```

In the above example, before setting the two ServerRole properties,
ensure that the server has capability to deploy both Axis2 services and
data services. When you deploy a C-App, only the artifacts that have the
above two server roles are deployed on the current instance. Others are
ignored.

#### Using a system property to set the ServerRole property

You can use the system property `         ServerRoles        ` to
specify the roles of the current server. When you start the server, pass
the ServerRoles as a comma separated list. For example,

``` java
sh wso2server.sh -DserverRoles=appserver1,dataservices1
```
