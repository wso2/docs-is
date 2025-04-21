# Spring Boot Quickstart

Welcome to the Spring Boot Quickstart guide! In this document, you will learn to build a Spring Boot web app, add user login and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application.**
- Select **Traditional Web Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.(*Ensure that the protocol remains set to OpenID Connect (OIDC).)* 

!!! Example
    Name : asgardeo-springboot

    Authorized redirect URL: http://localhost:8080/login/oauth2/code/asgardeo


!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use ` http://localhost:8080/login/oauth2/code/asgardeo`, as the authorized redirect URL .
  

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them during the **Step 4**

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **`issuer`** from from the **Info** tab.

## Create a Spring Boot app using Spring Initializr

Follow these steps to generate pre-initialized project.

1. Navigate to [https://start.spring.io](https://start.spring.io){:target="_blank"}  
2. Choose either Gradle or Maven. 
3. Click Dependencies and select **Spring Web**, **Thymeleaf** and **Spring Boot DevTools**.
4. Click Generate.

Download the resulting ZIP file, extract and open the project using your favorite IDE.

Create a Spring MVC Controller by adding `GreetingController.java`.   

```java title="GreetingController.java"

package com.example.asgardeo.springboot;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GreetingController {

    @GetMapping("/")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
            Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

}

```

Create Thymeleaf template to generate the view for GreetingController in the `src/main/resources/templates/` location.   


```html title="greeting.html"

<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>
    <p th:text="|Hello, ${name}!|" />
</body>

</html>


```

Run the application and verify that it is working properly by accessing the [greeting page](http://localhost:8080){:target="_blank"}.

=== "Maven"

    ``` bash
    
    ./mvnw spring-boot:run

    ```

=== "Gradle"

    ``` bash

    ./gradlew bootRun

    ```



## Install Spring OAuth2 Client

To auto-configure Spring Security OAuth2 Client in your project, add spring-boot-starter-oauth2-client as a dependency.

=== "Maven"

    ``` xml

    	<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-oauth2-client</artifactId>
		</dependency>
        <dependency>
			<groupId>org.thymeleaf.extras</groupId>
			<artifactId>thymeleaf-extras-springsecurity6</artifactId>
		</dependency>
    ```

=== "Gradle"

    ``` groovy
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity6'

    ```


## Configure Spring OAuth2 Client

Add the following configuration parameters to `application.properties` file. 

Add following configuration parameters to `application.properties` file, and make sure to replace the placeholders in the following code with the **`client-id`**, **`client-secret`** and **`issuer`** values you copied in **Step-1** during the application registration in the {{product_name}} console. 



```properties

spring.security.oauth2.client.registration.asgardeo.client-name=Asgardeo
spring.security.oauth2.client.registration.asgardeo.client-id=<your-app-client-id>
spring.security.oauth2.client.registration.asgardeo.client-secret=<your-app-client-secret>
spring.security.oauth2.client.registration.asgardeo.redirect-uri=http://localhost:8080/login/oauth2/code/asgardeo
spring.security.oauth2.client.registration.asgardeo.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.asgardeo.scope=openid,profile
spring.security.oauth2.client.provider.asgardeo.issuer-uri=<your-app-issuer>

```

## Add login and logout link to your app

Spring Security automatically generates a default login page that lists {{product_name}} as a login option.

To add the logout link modify `greeting.html` page as given below.  

```html title="greeting.html" hl_lines="11-15"

<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>

    <div sec:authorize="isAuthenticated()">
        <form th:action="@{/logout}" method="post">
            <input type="submit" value="Logout" />
        </form>
    </div>

    <p th:text="|Hello, ${name}!|" />
</body>

</html>

```

## Display logged in user details

Modified the code as below to see logged in user details.

```html title="greeting.html" hl_lines="18"

<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>

    <div sec:authorize="isAuthenticated()">
        <form th:action="@{/logout}" method="post">
            <input type="submit" value="Logout" />
        </form>
    </div>
      
    {% raw %}
    <p th:text="|Hello, ${#authentication.principal.attributes['username']}!|" />
    {% endraw %}  
</body>

</html>

```

[//] STEPS_END
