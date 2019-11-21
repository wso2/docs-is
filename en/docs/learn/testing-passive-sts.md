# Testing Passive STS

This topic lists out the steps required to configure and execute testing
of Identity Server's Passive STS.

### Prerequisites

-   WSO2 Identity Server - This can be downloaded from the [WSO2
    Identity Server product
    page](http://wso2.com/products/identity-server/) and installed by
    following the instructions in the [Installing the
    Product](../../setup/installing-the-product) topic.
-   Apache Tomcat 6/7 - To deploy the sample web application. This can
    be downloaded from the [Apache Tomcat
    website](http://tomcat.apache.org/).

### Configuring and trying the sample

1. Follow the
   [guide on how to configure `PassiveSTSSampleApp` ](../../develop/deploying-the-sample-app/#deploying-passivestssampleapp-webapp)
   to download, deploy and register the sample.

2.   On your browser,access the following link:
        
    -   to get a SAML 1.1 token:
        http://localhost:8080/PassiveSTSSampleApp/index.jsp
    -   to get a SAML 2.0 token:
        http://localhost:8080/PassiveSTSSampleApp?samlv=2-0

3.  Enter user credentials and you will be redirected to the IS Passive
    STS Service.
