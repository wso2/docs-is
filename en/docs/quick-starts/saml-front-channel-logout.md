# Configure SAML 2.0 Front-Channel Logout 

This page guides you through configuring [SAML 2.0 front channel logout](../../references/concepts/authentication/saml-front-channel/). This is demonstrated using two versions of a sample application called Spring SAML application. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/login/saml-front-channel-logout"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

The user is required to log in to two different applications, `application1` and `application2`. For convenience and security, the user should be logged out of both the applications when the user attempts to logout from either one of them. 

----

## Set up the sample application
 
### Download the SAML metadata file

1. Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main** > **Identity Providers** > **Resident Identity Provider**.

3. Expand the **Inbound Authentication Configuration** section.

4. Select **SAML2 Web SSO Configuration** and **Download SAML Metadata**.

    ![Download SAML metadata](../../assets/img/samples/download-saml-metadata.png)


### Configure the sample

1.  Download the latest version of the Spring SAML application from [here](https://repo.spring.io/list/release/org/springframework/security/extensions/spring-security-saml/) and unzip it. This unzipped directory will be referred to as `<SAMPLE_HOME>`.
2.  Copy the downloaded SAML metadata file to `<SAMPLE_HOME>/sample/src/main/resources/metadata`.
3.  Open the `<SAMPLE_HOME>/sample/src/main/webapp/WEB-INF/securityContext.xml` file. 
4.  Search for **bean id** with the tag as metadata (`bean id=”metadata”`). 
5.  Under the `list` tag of the `metadata bean id` add the following xml configuration and save the file. Note that this has the link to the metadata file,`wso2.xml`, that we downloaded. 

    ```xml 
    <bean class="org.springframework.security.saml.metadata.ExtendedMetadataDelegate">
    <constructor-arg>
    <bean class="org.opensaml.saml2.metadata.provider.ResourceBackedMetadataProvider">          
    <constructor-arg>             
    <bean class="java.util.Timer" />          
    </constructor-arg>          
    <constructor-arg>             
    <bean class="org.opensaml.util.resource.ClasspathResource">                
    <constructor-arg value="/metadata/wso2.xml" />             
    </bean>          
    </constructor-arg>          
    <property name="parserPool" ref="parserPool" />       
    </bean>    
    </constructor-arg>    
    <constructor-arg>       
    <bean class="org.springframework.security.saml.metadata.ExtendedMetadata" />    
    </constructor-arg> 
    </bean>
    ```

### Deploy the sample application

1.  Open a terminal from the `<SAMPLE_HOME>/sample` location and run the following command.

    ```xml
    mvn clean install
    ```
2.  Once the sample has built successfully, the `spring-security-saml2-sample.war` file can be found in the `<SAMPLE_HOME>/sample/target` directory. 

3.  Make a copy of this file and rename it as `spring-security-saml2-sample2.war` such that there are two webapps available.

4.  Deploy the two webapps in the Tomcat server.

---

## Register two applications in WSO2 Identity Server

Create two service providers for the two sample applications we deployed. Follow the steps given below to create a service provider and configure SAML2 front-channel logout on WSO2 IS.

{!fragments/register-a-service-provider.md!}

1.   Expand **Inbound Authentication Configuration** > **SAML2 Web SSO Configuration** and click **Configure**.

2.   Add the following configurations and click **Register**.

     -    Issuer: `http://localhost:8080/spring-security-saml2-sample/saml/metadata`
     -    Assertion Consumer URLs: `http://localhost:8080/spring-security-saml2-sample/saml/SSO`
     -    Select **Enable Response Signing**.
     -    Untick **Enable Signature Validation in Authentication Requests and Logout Requests**.
     -    Select **Enable Single Logout**.
     -    SLO Response URL: `http://localhost:8080/spring-security-saml2-sample/saml/SingleLogout`
     -    SLO Request URL: `http://localhost:8080/spring-security-saml2-sample/saml/SingleLogout`
     -    Logout Method: Select Front-Channel Logout (HTTP Redirect Binding) or Front-Channel Logout (HTTP POST Binding)
     -    Select **Enable Attribute Profile**.
     -    Select **Include Attributes in the Response Always**.

     ![SAML service provider configurations](../../assets/img/samples/spring-security.png)

Follow the same steps and change the values for sample2 and register another service provider.

---

## Try it out

1.  Access the URL of the first application, `http://localhost:8080/spring-security-saml2-sample`.

2.  Select **localhost** and click on **Start single sign-on**.

    ![IdP selection page](../../assets/img/samples/choose-localhost.png)

3.  Log in as the admin. You will be directed to the page with authenticated user information. 

    <img src="../../assets/img/samples/sample1-1.png" alt="Authenticated user information" width="600" class="center">

    <img src="../../assets/img/samples/sample1-2.png" alt="Authenticated user information" width="600" class="center">

4.  Open a new tab on the browser and log into the second application, `http://localhost:8080/spring-security-saml2-sample2`.

5.  Similar to the first application, select **localhost**, click on **Start single sign-on**, and sign in as the admin. 

    ![WSO2 Identity Server sign in page](../../assets/img/samples/sign-in-sample.png)

6.  On any one of the applications click **Global Logout**.

7.  You will be successfully logged out of both the applications.
    
    <img src="../../assets/img/samples/spring-logout.png" alt="Spring SAML sample application logout" width="500" class="center">

---
    
!!! info "Related topics"
    -   [Concept: Configuring SAML Front-Channel Logout](../../references/concepts/authentication/saml-front-channel)
    -   [Guide: Configure SAML 2.0 Front-Channel Logout](../../guides/login/saml-front-channel-logout)
