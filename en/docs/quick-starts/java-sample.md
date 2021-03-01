# Run Spring-boot Sample

## Overview
This sample showcases how to integrate a spring-boot application with WSO2 Identity Server for secure authentication using OpenID Connect standard.

---

## Register Application

{!fragments/register-a-spring-boot-app.md!}      

---
                                                
## Run the sample
 
1.	Download the `spring-boot-sample.war` file from [here](https://wso2.org/jenkins/job/identity-extensions/job/identity-samples-spring-boot/lastSuccessfulBuild/artifact/target/spring-boot-sample.war).
2.	Deploy the sample in Tomcat and start the Tomcat server.
3.	Access the `http://localhost:8080/spring-boot-sample/login` URL if your tomcat is running in port 8080.

---

## Configure the Sample
  
You need to add configurations related to WSO2 Identity Server and application in order to make secure authentication.

1.	Explode the war file. 
2.	Open the `application.yml` file located in `spring-boot-sample/WEB-INF/classes` 
3.	Update the following configuration. Please note that you should not change any other configurations
  
	```yaml
	provider:
		host: <server-host-name> #Change the host
	
	client:
		client-id: <application-client-id> #Change client-id
		client-secret: <application-client-secret> # Change client-secret
		post-logout-uri: <base-url>/spring-boot-sample/login
		scope: openid
		authorization-grant-type: authorization_code
	
	```

	**Example**:

	```yaml
	provider:
	host: https://localhost:9443 #Change the host

	client:
	client-id: 	LQTLEgDFil5Tyf0wS5KWUShkMDEa #Change client-id
	client-secret: ZuFwLrbBKhp74NWT1zBIjXuXuYUa # Change client-secret
	post-logout-uri: http://localhost:8080/spring-boot-sample/login
	scope: openid
	authorization-grant-type: authorization_code
	
	```

!!! info "Related Topics" 

	[Enable Authentication for Spring Boot App](../../../extend/sdks/spring-boot/)