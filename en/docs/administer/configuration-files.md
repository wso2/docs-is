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
`         <IS_HOME>/repository/conf        ` directory and
sub-directories of your product pack.

| File Name  | Location |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| [carbon.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/carbon.xml) | `<PRODUCT_HOME>/repository/conf` |
| [registry.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/registry.xml) | `<PRODUCT_HOME>/repository/conf` |
| [user-mgt.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/user-mgt.xml) | `<PRODUCT_HOME>/repository/conf` |
| [log4j.properties](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/log4j.properties) | `<PRODUCT_HOME>/repository/conf` |
| [catalina-server.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/tomcat/catalina-server.xml) | `<PRODUCT_HOME>/repository/conf/tomcat` |
| [tomcat-users.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/tomcat/tomcat-users.xml) | `<PRODUCT_HOME>/repository/conf/tomcat` |
| [web.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/tomcat/web.xml) | `<PRODUCT_HOME>/repository/conf/tomcat` |
| [context.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/tomcat/carbon/META-INF/context.xml) | `<PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF` |
| [web.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/tomcat/carbon/WEB-INF/web.xml) | `<PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF` |
| [Owasp.CsrfGuard.Carbon.properties](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/security/Owasp.CsrfGuard.Carbon.properties) | `<PRODUCT_HOME>/repository/conf/security` |
| [authenticators.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/security/authenticators.xml) | `<PRODUCT_HOME>/repository/conf/security` |
| [xss-patterns.properties](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/security/xss-patterns.properties) | `<PRODUCT_HOME>/repository/conf/security` |
| [master-datasources.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/datasources/master-datasources.xml) | `<PRODUCT_HOME>/repository/conf/datasources` |
| [axis2.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/axis2/axis2.xml) | `<PRODUCT_HOME>/repository/conf/axis2` |
| [axis2_client.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/axis2/axis2_client.xml) | `<PRODUCT_HOME>/repository/conf/axis2` |
| [tenant-axis2.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/axis2/tenant-axis2.xml) | `<PRODUCT_HOME>/repository/conf/axis2` |
| [config-validation.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/etc/config-validation.xml) | `<PRODUCT_HOME>/repository/conf/etc` |
| [email-admin-config.xml](https://github.com/wso2/carbon-kernel/blob/v4.4.6/distribution/kernel/carbon-home/repository/conf/email/email-admin-config.xml) | `<PRODUCT_HOME>/repository/conf/email` |

See the following topics for more information on configuration files:

-   Configuring catalina-server.xml
-   Configuring master-datasources.xml
-   Configuring registry.xml
-   Configuring user-mgt.xml
-   Configuring config-validation.xml
