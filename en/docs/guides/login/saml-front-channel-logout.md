# Configure SAML 2.0 Front-Channel Logout

This page guides you through configuring [SAML 2.0 front-channel logout]({{base_path}}/references/concepts/authentication/saml-front-channel/) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications.

## Scenario

The user is required to log in to two different applications, `application1` and `application2`. For convenience and security, the user should be logged out of both the applications when the user attempts to logout from either one of them. 

----

## Register two applications in WSO2 Identity Server

{!./includes/register-a-service-provider.md!}

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

     ![SAML service provider configurations]({{base_path}}/assets/img/samples/spring-security.png)

3.  Follow the same steps and change the values for sample2 and register another service provider.

---
## SAML Configurations 

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
       
3. Enter the **Assertion Consumer URL** and click **Add**. 
    
    !!! info 
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.
    
4. Select **Enable Single Logout**. Enter the **SLO Response URL** and **SLO Request URL**.

5. Select **Front-Channel Logout (HTTP Redirect Binding)** or **Front-Channel Logout (HTTP POST Binding)** as the **Logout Method**.

6. Click **Register**.

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced). 

## Download the SAML metadata file

1. Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main** > **Identity Providers** > **Resident Identity Provider**.

3. Expand the **Inbound Authentication Configuration** section.

4. Select **SAML2 Web SSO Configuration** and **Download SAML Metadata**.

    ![Download SAML metadata]({{base_path}}/assets/img/samples/download-saml-metadata.png)

## Try it

### Configure the sample

1.  Download the latest version of the Spring SAML application from [here](https://repo.spring.io/list/release/org/springframework/security/extensions/spring-security-saml/) and unzip it. This unzipped directory will be referred to as `<SAMPLE_HOME>`.
2.  Copy the downloaded SAML metadata file to `<SAMPLE_HOME>/sample/src/main/resources/metadata`.
3.  Open the `<SAMPLE_HOME>/sample/src/main/webapp/WEB-INF/securityContext.xml` file. 
4.  Search for **bean id** with the tag as metadata (`bean id=”metadata”`). 
5.  Under the `list` tag of the `metadata bean id`, add the following xml configuration and save the file. Note that this has the link to `metadata.xml`, which we downloaded. 

    ```xml 
    <bean class="org.springframework.security.saml.metadata.ExtendedMetadataDelegate">
    <constructor-arg>
    <bean class="org.opensaml.saml2.metadata.provider.ResourceBackedMetadataProvider">          
    <constructor-arg>             
    <bean class="java.util.Timer" />          
    </constructor-arg>          
    <constructor-arg>             
    <bean class="org.opensaml.util.resource.ClasspathResource">                
    <constructor-arg value="/metadata/metadata.xml" />             
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

### Deploy the sample

1.  Open a terminal from the `<SAMPLE_HOME>/sample` location and run the following command.

    ```xml
    mvn clean install
    ```
2.  Once the sample has built successfully, the `spring-security-saml2-sample.war` file can be found in the `<SAMPLE_HOME>/sample/target` directory. 

3.  Make a copy of this file and rename it as `spring-security-saml2-sample2.war` such that there are two webapps available.

4.  Deploy the two webapps in the Tomcat server.

--- 

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications. 

### Log out

1.  Access the URL of the first application, `http://localhost:8080/spring-security-saml2-sample`.

2.  Select **localhost** and click on **Start single sign-on**.

    ![IdP selection page]({{base_path}}/assets/img/samples/choose-localhost.png)

3.  Log in as the admin. You will be directed to the page with authenticated user information. 

    <img src="{{base_path}}/assets/img/samples/sample1-1.png" alt="Authenticated user information" width="600" class="center">

    <img src="{{base_path}}/assets/img/samples/sample1-2.png" alt="Authenticated user information" width="600" class="center">

4.  Open a new tab on the browser and log into the second application, `http://localhost:8080/spring-security-saml2-sample2`.

5.  Similar to the first application, select **localhost**, click on **Start single sign-on**, and sign in as the admin. 

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/samples/sign-in-sample.png)

6.  On any one of the applications click **Global Logout**.

7.  You will be successfully logged out of both the applications.
    
    <img src="{{base_path}}/assets/img/samples/spring-logout.png" alt="Spring SAML sample application logout" width="500" class="center">

!!! info "Related topics"
    -   [Concept: SAML 2.0 Front-Channel Logout]({{base_path}}/references/concepts/authentication/saml-front-channel/)
    -   [Quick Start: Configure SAML 2.0 Front-Channel Logout]({{base_path}}/quick-starts/saml-front-channel-logout)
