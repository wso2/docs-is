# Configure SAML 2.0 Front Channel Logout 

This page guides you through configuring [SAML 2.0 front channel logout](TODO:insert-link-to-concept). This is demonstrated using two versions of a sample application called Spring SAML application. 

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../../guides/login/saml-front-channel-logout"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

The user is required to log in to two different applications, `application1` and `application2`. For convenience and security, the user should be logged out of both the applications when the user attempts to logout from either one of them. 

----

## Download SAML metadata 

TODO: dev-portal-fragment

----

## Configure the sample

1.  Download the latest version of the Spring SAML application from [here](https://repo.spring.io/list/release/org/springframework/security/extensions/spring-security-saml/) and unzip it. This unzipped directory will be referred to as `<SAMPLE_HOME>`.
2.  Rename the downloaded metadata file obtained from the above step as `wso2_abc.xml`.
3.  Copy it to `<SAMPLE_HOME>/sample/src/main/resources/metadata`.
4.  Open the `<SAMPLE_HOME>/sample/src/main/webapp/WEB-INF/securityContext.xml` file. 
5.  Search for **bean id** with the tag as metadata (`bean id=”metadata”`). 
6.  Under the `list` tag of the `metadata bean id` add the following xml configuration and save the file. Note that this has the link to the metadata file,`wso2_abc.xml`, that we generated and renamed. 

    ```xml 
    <bean class="org.springframework.security.saml.metadata.ExtendedMetadataDelegate">
    <constructor-arg>
    <bean class="org.opensaml.saml2.metadata.provider.ResourceBackedMetadataProvider">          
    <constructor-arg>             
    <bean class="java.util.Timer" />          
    </constructor-arg>          
    <constructor-arg>             
    <bean class="org.opensaml.util.resource.ClasspathResource">                
    <constructor-arg value="/metadata/wso2_abc.xml" />             
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

## Deploy the sample application

1.  Open a terminal from the `<SAMPLE_HOME>/sample` location and run the following command.

    ```xml
    mvn clean install
    ```
2.  Once the sample has built successfully, the `spring-security-saml2-sample.war` file can be found in the `<SAMPLE_HOME>/sample/target` directory. 

3.  Make a copy of this file and rename it as `spring-security-saml2-sample2.war` such that there are two webapps available.

4.  Deploy the two webapps in the Tomcat server.

---

## Register two applications in WSO2 Identity Server

TODO: dev-portal-fragment

---

## Try it out

1.  Access the URL of the first application, <http://localhost:8080/spring-security-saml2-sample>.

2.  Select **localhost** and click on **Start single sign-on**.

    ![choose-localhost](../../assets/img/samples/choose-localhost.png)

3.  Log in as the admin. You will be directed to the page with authenticated user information. 

    <img src="../../assets/img/samples/sample1-1.png" alt="alt text" width="500" height="500" class="center">

    <img src="../../assets/img/samples/sample1-2.png" alt="alt text" width="500" height="500" class="center">

4.  Open a new tab on the browser and log into the second application, <http://localhost:8080/spring-security-saml2-sample2>.

5.  Similar to the first application, select **localhost**, click on **Start single sign-on**, and sign in as the admin. 

     <img src="../../assets/img/samples/sign-in-sample.png" alt="alt text" width="300" height="400" class="center">

6.  On any one of the applications click **Global Logout**.

7.  You will be successfully logged out of both the applications.

    ![spring-logout](../../assets/img/samples/spring-logout.png)
    
!!! info "Related Topics"
    -   [Concept: Configuring SAML Front Channel Logout](TODO:insert-link-to-concept)
    -   [Guide: Configure SAML 2.0 Front Channel Logout](../../../guides/login/saml-front-channel-logout)
