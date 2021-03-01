# Start enable Authentication for SpringBoot App

!!! Tip 
    [Try Our Sample](../java-sample)
    
---

## Overview
This showcases the capability to integrate your spring-boot application with  WSO2 Identity Server for
 secure authentication using OpenID Connect standard.

---

## Register application

{! fragments/register-a-spring-boot-app.md !}                        

### Add dependencies 

Add the following dependencies in the pom file in your spring-boot-project.

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

---

## Configurations

You need to add configurations related to WSO2 Identity Server and the application in order to make the authentication secure.

1.  Create a `application.yml` file inside `src/main/resources` folder.

2.  Copy the following configurations.

    ```yaml
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
                issuer-uri: ${provider.host}/oauth2/oidcdiscovery

      thymeleaf:
        cache: false

      
    ```

    **Example**:

    ```yaml
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
                issuer-uri: ${provider.host}/oauth2/oidcdiscovery

      thymeleaf:
        cache: false
    ```

---

## Login

### Use the Default “/login” endpoint
- Spring Boot generates a default login page for us. All the endpoint of the application is secured except this /login
 page. 
- If you try to access any page of your application, it will redirect to WSO2 Identity Server login page since all the
 pages are secured. 

- If you go to `/login` endpoint, you can get the default login page of the spring-boot application.


### Remove the default “/login” page and redirect directly to IS login page.

1. Create a ConfigSecurity class and Extend the WebSecurityConfigurerAdapter.

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

2. When the application tries to call `/login` endpoint, add redirection to ```/oauth2/authorization/wso2``` in your
 Controller. Then that would skip the login page.

	```java

	@GetMapping("/login")
	public String getLoginPage(Model model) {

	return "redirect:/oauth2/authorization/wso2";
	}

	```

### Customize the login page and use another login endpoint

Even Though SpringBoot generates a default login page for us, we can define our own customized page.

1. Add a `ConfigSecurity` class by extending `WebSecurityConfigurerAdapter`

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

2. Have a Login Controller Class and render your Login page when the browser is redirected to /oauth-login. 

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

#### Have an oidc-login.html page inside the resources/templates folder

Create a template at `src/main/resources/oidc-login.html` to display the Login option.

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

---

## Logout

## Use the default /logout endpoint

By default, spring-boot provides `/logout` endpoint to provide logout capability. You can use that default endpoint. 

Also you need to have a `postlogout` uri configured. 

1. Have a `ConfigSecurity` class by extending `WebSecurityConfigurerAdapter`.
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

2. Create a template at `src/main/resources/login.html` to display the Logout option and have a logout button. Add the `/logout` redirection when user clicks the Logout button. 

	```html
	<div style="float:right">
	<form method="post" th:action="@{/logout}"  class="navbar-form navbar-right">
		<button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
	</form>
	</div>

	```

### Customize the logout endpoint

If you wish to customize the logout endpoint, follow the steps below. 

Have a ConfigSecurity class by extending WebSecurityConfigurerAdapter and configure the logoutUrl
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

###  Have a Logout button and redirect to custom logout (“/applogout”) url
 
1. Create a template at `src/main/resources/login.html` to display the Logout option and have a logout button.

2.	Add the `/applogout` redirection when user clicks `Logout` button.  
	```html

	<div style="float:right">
	<form method="post" th:action="@{/applogout}"  class="navbar-form navbar-right">
		<button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
	</form>
	</div>

	```

---

## Read User Information

You can get the user information from `org.springframework.security.core.Authentication`, 
`org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser` classes.

1. Add a method to handle redirection to `/userinfo` endpoint. Add a method in your controller class to get 
 information from id token.

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

2. Create another template  `userinfo.html` at `src/main/resources/templates` to display the idtoken claims.

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


!!! Tip "What's Next?"

    To try out a sample, refer [Run Spring-boot sample](../../../quick-starts/java-sample).