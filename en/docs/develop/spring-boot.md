# Enable Authentication for Spring Boot App

!!! Tip 
    To try this out, see [Run Spring-boot Sample](https://github.com/wso2-extensions/identity-samples-spring-boot).
    

This page guides you through integrating a spring-boot application with WSO2 Identity Server for secure authentication using OpenID Connect.

## Register application

1. Access the WSO2 Identity Server Management Console. 

2. Enter a **Service Provider Name**. Optionally, enter a description. 

3. Click **Register**. 

4. Expand **Inbound Authentication Configuration**. 

5. Expand **OAuth/OpenID Connect Configuration** and click **Configure**. 

6. Enter `http://localhost:8080/spring-boot-sample/login/oauth2/code/wso2 ` as the **Callback Url**. 
   
    !!! tip
        The **Callback URL** is the exact location of the service provider's application to which the authorization code should be sent. 
        This should always be `{baseUrl}/login/oauth2/code/wso2`.
      
7. Select **Enable OIDC Backchannel Logout** if you wish to configure a logout URL. 

8. Enter `http://localhost:8080/spring-boot-app/login` as the **Backchannel Logout Url**.

9. Select **Add**.

10. Note the **Client ID** and **Client Secret** that appear.

    | Field                 | Value                               | Sample Value                                                 |
    | --------------------- | ------------------------------      | -------------------------------------------                  |
    | Service Provider Name | your-application-name               | sample-app                                                   |
    | Description           | This is a spring-boot application   | This is a spring-boot application                            |
    | CallBack Url          | {baseUrl}/login/oauth2/code/wso2    | http://localhost:8080/sprinb-boot-app/login/oauth2/code/wso2 |
    | Logout Url            | {baseUrl}/login                     | http://localhost:8080/spring-boot-app                        |
                        

### Add the dependency 

Add the following dependencies to the pom file in the spring-boot-project.

```xml
<dependencies>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-oauth2-client</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-thymeleaf</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
</dependencies>
```

## Add configurations

Add the following configurations related to WSO2 Identity Server and the application in order to make the authentication process secure.

1. Create the `application.yml` file in the `src/main/resources` folder.

2. Copy the following configurations.

   ```yaml tab="Configuration"
   provider:
     host: <is-host-name> #Change the host

    spring:
      security:
        oauth2:
          client:
            registration:
              wso2:
                client-name : WSO2 Identity Server
                client-id: <application-client-id> #Change client-id
                client-secret: <application-client-secret> # Change client-secret
                authorization-grant-type: authorization_code
                scope: openid
            provider:
              wso2:
                issuer-uri: ${provider.host}/oauth2/token
      thymeleaf:
        cache: false
   ```

   ```yaml tab="Example"
    provider:
        host: https://localhost:9443 #Change the host
        
    spring:
        security:
        oauth2:
            client:
            registration:
                wso2:
                client-name : WSO2 Identity Server
                client-id: LQTLEgDFil5Tyf0wS5KWUShkMDEa #Change client-id
                client-secret: uFwLrbBKhp74NWT1zBIjXuXuYUa # Change client-secret
                authorization-grant-type: authorization_code
                scope: openid
            provider:
                wso2:
                issuer-uri: ${provider.host}/oauth2/token

        thymeleaf:
        cache: false
   ```

## Login

### Use the default `/login` endpoint

Spring Boot generates a default login page. All the endpoints of the application are secured except the `/login` page. 

Try to access any of the application pages. It will redirect to WSO2 Identity Server login page since all the pages are secured. If the `/login` endpoint is accessed, it redirects to the default login page of the spring-boot application.

### Remove the default “/login” page and redirect directly to the WSO2 IS login page

1. Create a `ConfigSecurity` class and extend `WebSecurityConfigurerAdapter`.

    ```java
    @EnableWebSecurity
    public class ConfigSecurity extends WebSecurityConfigurerAdapter {

       protected void configure(HttpSecurity http) throws Exception {

           http.authorizeRequests()
                   .antMatchers("/login")
                   .permitAll()
                   .anyRequest()
                   .authenticated()
                   .and()
                   .oauth2Login().loginPage("/login");
       }
    }
    ```

2. When the application tries to call the `/login` endpoint, add redirection to `"/oauth2/authorization/wso2"` in the Controller. This will skip the login page.
    
    ```java
    @GetMapping("/login")
    public String getLoginPage(Model model) {

        return "redirect:/oauth2/authorization/wso2";
    }
    ```

### Customize the login page and use another login endpoint

Even though Spring Boot generates a default login page, follow the instructions given below to customize the page as required.

1. Add a `ConfigSecurity` class by extending `WebSecurityConfigurerAdapter`.

    ```java
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

    @EnableWebSecurity
    public class ConfigSecurity extends WebSecurityConfigurerAdapter {

       protected void configure(HttpSecurity http) throws Exception {

           http.authorizeRequests()
                   .antMatchers("/oidc-login")
                   .permitAll()
                   .anyRequest()
                   .authenticated()
                   .and()
                   .oauth2Login().loginPage("/oidc-login");
       }
    }
    ```

2. Create a `Login Controller Class` and render the login page when the browser is redirected to `/oauth-login`. 

    ```java
    @Controller
    public class LoginController {

       private static String authorizationRequestBaseUri
               = "oauth2/authorization";
       Map<String, String> oauth2AuthenticationUrls
               = new HashMap<>();

       @Autowired
       private ClientRegistrationRepository clientRegistrationRepository;

       @GetMapping("/oidc-login")
       public String getLoginPage(Model model) {

            Iterable<ClientRegistration> clientRegistrations = null;
           ResolvableType type = ResolvableType.forInstance(clientRegistrationRepository)
                   .as(Iterable.class);
           if (type != ResolvableType.NONE &&
                   ClientRegistration.class.isAssignableFrom(type.resolveGenerics()[0])) {
               clientRegistrations = (Iterable<ClientRegistration>) clientRegistrationRepository;
           }

           clientRegistrations.forEach(registration ->
                   oauth2AuthenticationUrls.put(registration.getClientName(),
                           authorizationRequestBaseUri + "/" + registration.getRegistrationId()));
           model.addAttribute("urls", oauth2AuthenticationUrls);

           return "oidc-login";
       }
    }
    ```

3. Create a template at `src/main/resources/templates/oidc-login.html` to display the login option.

    ```html
    <!DOCTYPE html>
    <html lang="en" xmlns:th="http://www.w3.org/1999/xhtml">
    <head>
    <meta charset="UTF-8">
    <title>Title</title>
    </head>
    <body>
    <h3>Login with:</h3>
    <p th:each="url : ${urls}">
    <a th:text="${url.key}" th:href="${url.value}">Client</a>
    </p>
    </body>
    </html>
    ```

## Logout

### Use the default/logout endpoint

By default, Spring Boot provides the `/logout` endpoint to provide the logout capability. 

Follow the instructions given below to configure the post logout URI. 

1. Configure a `ConfigSecurity` class by extending `WebSecurityConfigurerAdapter`.
    
    ```java
    @EnableWebSecurity
    public class ConfigSecurity extends WebSecurityConfigurerAdapter {

       protected void configure(HttpSecurity http) throws Exception {

           http.authorizeRequests()
                        .antMatchers("/login")
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                   .oauth2Login()
                        .loginPage("/login")
                   .and()
                   .logout()
                        .logoutSuccessHandler(oidcLogoutSuccessHandler());

       }

       @Autowired
       private ClientRegistrationRepository clientRegistrationRepository;

       private LogoutSuccessHandler oidcLogoutSuccessHandler() {
           OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
                   new OidcClientInitiatedLogoutSuccessHandler(
                           this.clientRegistrationRepository);

           oidcLogoutSuccessHandler.setPostLogoutRedirectUri(
                   URI.create("http://localhost:8080/oauth-login")); //Need to give the post-rediret-uri here

           return oidcLogoutSuccessHandler;
       }
    }
    ```
    
2. Create a template at `src/main/resources/login.html` to display the logout option and have a logout button.


3.  Add the `/logout` redirection when user clicks the **Logout** button. 

    ```html
    <div style="float:right">
       <form method="post" th:action="@{/logout}"  class="navbar-form navbar-right">
           <button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
       </form>
    </div>

    ```

### Customize the logout endpoint

To customize the logout endpoint, create a `ConfigSecurity` class by extending `WebSecurityConfigurerAdapter`, and configure the `logoutUrl`.
    
```java
@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers("/login")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and().oauth2Login().loginPage("/login")
                .and().logout().logoutUrl("/applogout)
                .logoutSuccessHandler(oidcLogoutSuccessHandler());

    }
@Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    private LogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
                new OidcClientInitiatedLogoutSuccessHandler(
                        this.clientRegistrationRepository);

        oidcLogoutSuccessHandler.setPostLogoutRedirectUri(
                URI.create("http://localhost:8080/sprinb-boot-app"));

        return oidcLogoutSuccessHandler;
    }

}

```
####  Add a logout button and redirect to custom logout (“/applogout”) url
 
1. Create a template at `src/main/resources/login.html` to display the Logout option and have a logout button.

2. Add the `/applogout` redirection when user clicks the `Logout` button.  

    ```html
    <div style="float:right">
    <form method="post" th:action="@{/applogout}"  class="navbar-form navbar-right">
        <button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
    </form>
    </div>
    ```

## Read user information

You can get the user information from `org.springframework.security.core.Authentication` and  `org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser` classes.

1. Add a method to handle redirection to the `/userinfo` endpoint. Add a method in your controller class to get information from the id token.
 
    ```java
    @GetMapping("/userinfo")
        public String getUser(Authentication authentication, Model model) {

            model.addAttribute("userName", userName);
            model.addAttribute("idtoken", user.getClaims());
            LOGGER.log(Level.INFO, "UserName : " + userName);
            LOGGER.log(Level.INFO, "User Attributes: " + user.getClaims());
            return "userinfo";
        }
    ```
  
2. Create another template `userinfo.html` at `src/main/resources/templates` to display the idtoken claims.

    ```html
    <div>
        <table class="details">
            <tr th:each="instance : ${idtoken}">
                <td style="text-align:left;width:100px" th:text="${instance.key}">keyvalue</td>
                <td style="text-align:left" th:text="${instance.value}">num</td>
            </tr>
        </table>
    </div>

    ```
