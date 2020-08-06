# Using the .NET SDK

This page guides you through implementing authentication for a .NET client application using the OpenID Connect authentication APIs with WSO2 Identity Server.

----

## Get started

To use the SDK in your client application project, you can either build from source or use the Nuget package manager. 

**Build from source**

1. Clone the .NET sdk git repository using the following command. 
    ```
    git clone https://github.com/wso2-extensions/identity-sdks-dotnet.git
    ```

2. Open the solution using Visual Studio.

3. Build the project. 

4. Add the `org.wso2.identity.sdk.oidc.dll` file to your client application project. 

**Use Nuget package manager**

1. Open the Nuget package manger.

2. Search for `org.wso2.identity.sdk.oidc` or navigate to [this link](https://www.nuget.org/packages/org.wso2.identity.sdk.oidc/).

3. Include it with the suggested required dependencies. 

Alternatively, you can also run the following command in the package manager CLI as shown below. 

```
Install-Package org.wso2.identity.sdk.oidc -Version 1.0.0
```

----

## Using the SDK

Below explained key API methods that is available in the OIDC SDK and how to use them.

## Set up login

1. Use the following code snippet to log a user in. 
   
   Currently, all configurations are supported only via the `app.config` file. To add the necessary
 configurations, create a file as shown below and place it in the application path.

    ```xml
    <configuration>
        <appSettings>
            <add key="ClientId" value="fXZNpFBa3aNOCQ6rKU8ldsxT_WAa" />
            <add key="ClientSecret" value="6x2fQgrT_Ov2R2OMbzfJ5yQjvVEa" />
            <add key="AuthorizationEndpoint" value="https://localhost:9443/oauth2/authorize" />
            <add key="TokenEndpoint" value="https://localhost:9443/oauth2/token" />
            <add key="UserInfoEndpoint" value="https://localhost:9443/oauth2/userinfo" />
            <add key="LogoutEndpoint" value="https://localhost:9443/oidc/logout" />
            <add key="RedirectURI" value="http://localhost:8080/callback/" />
            <add key="PostLogoutRedirectURI" value="http://localhost:8080/postlogout/" />
            <add key="ClientSettingsProvider.ServiceUri" value="" />
    </appSettings>
    </configuration>
    ```

2. Use the code given below to authenticate a user. 

    ```csharp
    readonly AuthenticationHelper authenticationHelper = new AuthenticationHelper();
    await authenticationHelper.Login();
    var accessToken = authenticationHelper.AccessToken;
    ```

---

## Set up logout

Use the following code to log out an already logged in user. 

```c#
await authenticationHelper.Logout(accessToken);
var request = authenticationHelper.Request;
```

----

## Get user info

Use the following code to retrieve the user info.

```c#
readonly AuthenticationHelper authenticationHelper = new AuthenticationHelper();
await authenticationHelper.Login();
var userInfo = authenticationHelper.UserInfo;
dynamic json = JsonConvert.DeserializeObject(userInfo);
var subject = json.sub;
```
