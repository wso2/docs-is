# Product Administration

If you are a product administrator, the following content will provide
an overview of the administration tasks that you need to perform when
working with WSO2 Identity Server (WSO2 IS).

Administering WSO2 IS involves the following:

\[ [Upgrading from a previous
release](#ProductAdministration-Upgradingfromapreviousrelease) \] \[
[Configuring the server](#ProductAdministration-Configuringtheserver) \]
\[ [Changing the default
database](#ProductAdministration-Changingthedefaultdatabase) \] \[
[Configuring users, roles and
permissions](#ProductAdministration-Configuringusers,rolesandpermissions)
\] \[ [Configuring security](#ProductAdministration-Configuringsecurity)
\] \[ [Configuring
multitenancy](#ProductAdministration-Configuringmultitenancy) \] \[
[Configuring the
registry](#ProductAdministration-Configuringtheregistry) \] \[
[Performance tuning](#ProductAdministration-Performancetuning) \] \[
[Changing the default
ports](#ProductAdministration-Changingthedefaultports) \] \[
[Installing, uninstalling and managing product
features](#ProductAdministration-Installing,uninstallingandmanagingproductfeatures)
\] \[ [Configuring custom proxy
paths](#ProductAdministration-Configuringcustomproxypaths) \] \[
[Customizing error pages](#ProductAdministration-Customizingerrorpages)
\] \[ [Customizing the management
console](#ProductAdministration-Customizingthemanagementconsole) \] \[
[Monitoring the server](#ProductAdministration-Monitoringtheserver) \]
\[ [Monitoring logs](#ProductAdministration-Monitoringlogs) \] \[
[Monitoring with
statistics](#ProductAdministration-Monitoringwithstatistics) \] \[
[Monitoring using WSO2
metrics](#ProductAdministration-MonitoringusingWSO2metrics) \] \[
[JMX-based Monitoring](#ProductAdministration-JMX-basedMonitoring) \] \[
[Monitoring server
health](#ProductAdministration-Monitoringserverhealth) \] \[ [Enabling
mutual SSL](#ProductAdministration-EnablingmutualSSL) \]

------------------------------------------------------------------------

### Upgrading from a previous release

If you are upgrading from WSO2 IS 5.4.0 to WSO2 IS 5.5.0 version, see
the [upgrade instructions for WSO2 Identity
Server](_Upgrading_from_a_Previous_Release_).

------------------------------------------------------------------------

### Configuring the server

WSO2 Identity Server is shipped with default configurations that allow
you to download, install and get started with your product instantly.
However, when you go into production, it is recommended to change some
of the default settings to ensure that you have a robust system that is
suitable for your operational needs. Also, you may have specific use
cases that require specific configurations to the server.

Listed below are configurations for setting up your product server.

#### Changing the default database

By default, WSO2 products are shipped with an embedded H2 database,
which is used for storing user management and registry data. We
recommend that you use an industry-standard RDBMS such as Oracle,
PostgreSQL, MySQL, MS SQL, etc. when you set up your production
environment. You can change the default database configuration by simply
setting up a new physical database and updating the configurations in
the product server to connect to that database.

-   See the section on [working with
    databases](https://docs.wso2.com/display/ADMIN44x/Working+with+Databases)
    in the WSO2 product administration guide for instructions on how to
    set up and configure databases. First you need to [set up the
    database](https://docs.wso2.com/display/ADMIN44x/Setting+up+the+Physical+Database)
    and then configure it to run with WSO2 Is.  
    -   [Changing to Embedded
        Derby](https://docs.wso2.com/display/ADMIN44x/Changing+to+Embedded+Derby)
    -   [Changing to Embedded
        H2](https://docs.wso2.com/display/ADMIN44x/Changing+to+Embedded+H2)
    -   [Changing to IBM
        DB2](https://docs.wso2.com/display/ADMIN44x/Changing+to+IBM+DB2)
    -   [Changing to IBM
        Informix](https://docs.wso2.com/display/ADMIN44x/Changing+to+IBM+Informix)
    -   [Changing to
        MariaDB](https://docs.wso2.com/display/ADMIN44x/Changing+to+MariaDB)
    -   [Changing to
        MSSQL](https://docs.wso2.com/display/ADMIN44x/Changing+to+MSSQL)
    -   [Changing to
        MySQL](https://docs.wso2.com/display/ADMIN44x/Changing+to+MySQL)
    -   [Changing to
        Oracle](https://docs.wso2.com/display/ADMIN44x/Changing+to+Oracle)
    -   [Changing to Oracle
        RAC](https://docs.wso2.com/display/ADMIN44x/Changing+to+Oracle+RAC)
    -   [Changing to
        PostgreSQL](https://docs.wso2.com/display/ADMIN44x/Changing+to+PostgreSQL)
    -   [Changing to Remote
        H2](https://docs.wso2.com/display/ADMIN44x/Changing+to+Remote+H2)
-   See [Setting Up Separate Databases for
    Clustering](_Setting_Up_Separate_Databases_for_Clustering_) for
    information on how to logically separate the databases and identity
    related database scripts.
-   See the [Data Dictionary](_Data_Dictionary_) for information on the
    data tables used in WSO2 Identity Server.

####  Configuring users, roles and permissions

The user management feature in your product allows you to create new
users and define the permissions granted to each user. You can also
configure the user stores that are used for storing data related to user
management.

-   See the section on [working with users, roles and
    permissions](https://docs.wso2.com/display/ADMIN44x/Working+with+Users%2C+Roles+and+Permissions)
    in the WSO2 product administration guide for instructions on how to
    configure this feature.
-   See the topic on [role-based permissions for WSO2 Identity
    Server](_Role-based_Permissions_) for descriptions of all the
    permissions.
-   For information on how to remove references to a deleted user's
    identity, see [Removing References to Deleted User
    Identities](_Removing_References_to_Deleted_User_Identities_).  

#### Configuring security

After you install WSO2 IS, it is recommended to change the default
security settings according to the requirements of your production
environment. As WSO2 Identity Server is built on top of the WSO2 Carbon
Kernel, the main security configurations applicable to IS are inherited
from the Carbon kernel.

See the section on
[Security](https://docs.wso2.com/display/ADMIN44x/Security) in the WSO2
product administration guide for instructions on configuring security on
your server. It includes the following sections:

-   [Configuring Transport-Level
    Security](https://docs.wso2.com/display/ADMIN44x/Configuring+Transport+Level+Security)
-   [Using Asymmetric
    Encryption](https://docs.wso2.com/display/ADMIN44x/Using+Asymmetric+Encryption)
-   [Using Symmetric
    Encryption](https://docs.wso2.com/display/ADMIN44x/Using+Symmetric+Encryption)
-   [Enabling Java Security
    Manager](https://docs.wso2.com/display/ADMIN44x/Enabling+Java+Security+Manager)
-   [Securing Passwords in Configuration
    Files](https://docs.wso2.com/display/ADMIN44x/Securing+Passwords+in+Configuration+Files)
-   [Resolving Hostname
    Verification](../../admin-guide/enabling-hostname-verification)
-   [Mitigating Cross Site Request Forgery
    Attacks](https://docs.wso2.com/display/ADMIN44x/Mitigating+Cross+Site+Request+Forgery+Attacks)
-   [Mitigating Cross Site Scripting
    Attacks](https://docs.wso2.com/display/ADMIN44x/Mitigating+Cross+Site+Scripting+Attacks)
-   [Enabling or Customizing the Secure Vault
    Implementation](../../admin-guide/carbon-secure-vault-implementation)

See the section on [implementing security in the Identity
Server](_Implementing_Security_in_the_Identity_Server_) for information
and instructions on configuring security specific to the WSO2 Identity
Server. It includes the following sections:

-   [Saving Access Tokens in Separate
    Tables](_Saving_Access_Tokens_in_Separate_Tables_)
-   [Timestamp in WS-Security to Mitigate Replay
    Attacks](_Timestamp_in_WS-Security_to_Mitigate_Replay_Attacks_)
-   [Mitigating Authorization Code Interception
    Attacks](../../using-wso2-identity-server/mitigating-authorization-code-interception-attacks)
-   [Mitigating Cross Site Request Forgery (CSRF)
    Attacks](_Mitigating_Cross_Site_Request_Forgery_CSRF_Attacks_)

#### Configuring multitenancy

You can create multiple tenants in your product server, which will allow
you to maintain tenant isolation in a single server/cluster.

See the section on [working with multiple
tenants](../../admin-guide/working-with-multiple-tenants)
in the WSO2 product administration guide for information and
instructions.

#### Configuring the registry

A **registry** is a content store and a metadata repository for various
artifacts such as services, WSDLs and configuration files. In WSO2
products, all configurations pertaining to modules, logging, security,
data sources and other service groups are stored in the registry by
default.

See the section on [working with the
registry](https://docs.wso2.com/display/ADMIN44x/Working+with+the+Registry)
in the WSO2 product administration guide for information on how to set
up and configure the registry.

#### Performance tuning

You can optimize the performance of your product server by configuring
the appropriate OS settings, JVM settings etc. Most of these are
server-level settings that will improve the performance of any WSO2
product.

-   See the section on [performance
    tuning](https://docs.wso2.com/display/ADMIN44x/Performance+Tuning)
    in the WSO2 product administration guide for details.
-   See the topic on [XACML Performance in the Identity
    Server](_XACML_Performance_in_the_Identity_Server_) for performance
    tuning specific to WSO2 Identity Server.

#### Changing the default ports

When you run multiple WSO2 products, multiple instances of the same
product, or multiple WSO2 product clusters on the same server or virtual
machines (VMs), you must change their default ports with an offset value
to avoid port conflicts.

See the section on [changing the default
ports](https://docs.wso2.com/display/ADMIN44x/Changing+the+Default+Ports)
in the WSO2 product administration guide for instructions.

#### Installing, uninstalling and managing product features

Each WSO2 product is a collection of reusable software units called
features where a single feature is a list of components and/or other
feature. By default, WSO2 IS is shipped with the features that are
required for your main use cases.

See the section on [working with
features](https://docs.wso2.com/display/ADMIN44x/Working+with+Features)
in the WSO2 product administration guide for information on how you can
install new features, or remove/update an existing feature.

#### Configuring custom proxy paths

This feature is particularly useful when multiple WSO2 products (fronted
by a proxy server) are hosted under the same domain name. By a dding a
custom proxy path you can host all products under a single domain and
assign proxy paths for each product separately .

See the section on [adding a custom proxy
path](https://docs.wso2.com/display/ADMIN44x/Adding+a+Custom+Proxy+Path)
in the WSO2 product administration guide for instructions on how to
configure this feature.

#### Customizing error pages

You can make sure that sensitive information about the server is not
revealed in error messages, by customizing the error pages in your
product.

See the section on [customizing error
pages](https://docs.wso2.com/display/ADMIN44x/Customizing+Error+Pages)
in the WSO2 product administration guide for instructions.

#### Customizing the management console

Some of the WSO2 products, such as WSO2 IS consist of a web user
interface named the management console. This allows administrators to
configure, monitor, tune, and maintain the product using a simple
interface. You can customize the look and feel of the management console
for your product.

See the section on [customizing the management
console](https://docs.wso2.com/display/ADMIN44x/Customizing+the+Management+Console)
in the WSO2 product administration guide for instructions.

------------------------------------------------------------------------

### Monitoring the server

Monitoring is an important part of maintaining a product server. Listed
below are the monitoring capabilities that are available for WSO2 IS.

#### Monitoring logs

A properly configured logging system is vital for identifying errors,
security threats and usage patterns in your product server.

See the section on [monitoring
logs](https://docs.wso2.com/display/ADMIN44x/Monitoring+Logs) in the
WSO2 product administration guide for information and instructions on
how to set up and monitor the server.

#### Monitoring with statistics

The WSO2 IS is a powerful tool for collecting statistical information.

See the section on [monitoring the WSO2 Identity
Server](_Monitoring_the_Identity_Server_) in the WSO2 Identity Server
guide for more information on how to use the statistics feature.

#### Monitoring using WSO2 metrics

WSO2 IS 5.3.0 onwards is shipped with JVM Metrics, which allows you to
monitor statistics of your server using Java Metrics.

See the section on [using WSO2
metrics](https://docs.wso2.com/display/ADMIN44x/Monitoring+with+WSO2+Carbon+Metrics)
in the WSO2 product administration guide for information on how to set
up and use Carbon metrics.

#### JMX-based Monitoring

See the section on [JMX-based
monitoring](https://docs.wso2.com/display/ADMIN44x/JMX-Based+Monitoring)
in the WSO2 product administration guide for instructions.

#### Monitoring server health

See the section on [Monitoring Server
Health](https://docs.wso2.com/display/ADMIN44x/Monitoring+Server+Health)
in the WSO2 product administration guide for information on using the
Carbon Health Check API to check server health.

### Enabling mutual SSL

See the section on [Enabling Mutual SSL](_Enabling_Mutual_SSL_) to
enable SSL authentication in WSO2 Identity Server.
