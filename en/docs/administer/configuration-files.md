# Configuration Files

Given below is an overview of the configuration files that are shipped
with WSO2 Carbon Kernel. All WSO2 products that are based on Carbon
Kernel 4.4.x will inherit the configurations given below. While most of
the configurations in these files are common across the Carbon 4.4.x
platform, some configurations may only be used for specific features
used by certain products.

We have listed below all the configuration files that are shipped with
Carbon 4.4.x. You can follow the link to view the contents in each
configuration file from the [Carbon 4.4.7 project
in github](https://github.com/wso2/carbon-kernel/tree/v4.4.7/distribution/kernel/carbon-home/repository/conf)
. You will also find descriptions of the elements included in the files.

If you are using a WSO2 product that is based on Carbon 4.4.x, you will
find all these configuration files stored in the
`         <PRODUCT_HOME>/repository/conf        ` directory and
sub-directories of your product pack.

File Name

Location

`                           carbon.xml                         `

`             <PRODUCT_HOME>/repository/conf            `

`                           registry.xml                         `

`                           user-mgt.xml                         `

`                           log4j.properties                         `

`                           catalina-server.xml                         `

`             <PRODUCT_HOME>/repository/conf/tomcat            `

`                           tomcat-users.xml                         `

`                           web.xml                         `

`                           context.xml                         `

`             <PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF            `

`                           web.xml                         `

`                           Owasp.CsrfGuard.Carbon.properties                         `

`             <PRODUCT_HOME>/repository/conf/security            `

`                           authenticators.xml                         `

`                           xss-patterns.properties                         `

`                           master-datasources.xml                         `

`             <PRODUCT_HOME>/repository/conf/datasources            `

`                           axis2.xml                         `

`             <PRODUCT_HOME>/repository/conf/axis2            `

`                           axis2_client.xml                         `

`                           tenant-axis2.xml                         `

`                           config-validation.xml                         `

`             <PRODUCT_HOME>/repository/conf/etc            `

`                           email-admin-config.xml                         `

`             <PRODUCT_HOME>/repository/conf/email            `

See the following topics for more information on configuration files:

-   [Configuring catalina-server.xml](_Configuring_catalina-server.xml_)
-   [Configuring
    master-datasources.xml](_Configuring_master-datasources.xml_)
-   [Configuring registry.xml](_Configuring_registry.xml_)
-   [Configuring user-mgt.xml](_Configuring_user-mgt.xml_)
-   [Configuring
    config-validation.xml](_Configuring_config-validation.xml_)
