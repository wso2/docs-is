# Configure Kerberos Grant

This page guides you through the flow involved in exchanging a Kerberos ticket for an OAuth2 token. To learn more, see [Kerberos grant](insertlink).

----

## Enable kerberos grant

1.  Download the [kerberos grant.jar](../../assets/attachments/kerberos-grant-1.0.0.jar) file.

2.  Copy the JAR into the `<IS_HOME>/repository/components/lib` directory.

3.  Add the following entry to the `<IS_HOME>/repository/conf/deployment.toml` file. 

    ``` toml
    [oauth.grant_type.kerberos_grant]
    enable = true
    ```

-----

{!fragments/self-contained-access-tokens.md!}

----

{!fragments/register-a-service-provider.md!}

3.  Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

4. Click **Configure**.   

5. Select **Kerberos** from the **Allowed Grant Types** list.
        
6. Enter the **Callback Url**.

    !!! tip
        For more information on the `Callback Url` field and other advanced configurations, see [Advanced OpenID Connect Configurations](../../guides/login/oauth-app-config-advanced).
        
7.  Click **Add**. 

    Note that the **OAuth Client Key** and **Client Secret** are generated. You will need these values later on when sending the request to the authorization endpoint.

8.  Click **Register**.

----

{!fragments/register-an-identity-provider.md!}

4. Configure the **Alias**. 

    ```tab="Format"
    https://<host>:<port>/oauth/token
    ```

    ```tab="Sample"
    https://localhost:9443/oauth/token
    ```

5. Expand the **Federated Authenticators** tab, and then the **IWA Kerberos Configuration** tab. Enter the required details as follows.  
       
    -   **Server Principal Name** : <HTTP/idp.example.com@EXAMPLE.COM>
    -   **Server Principal Password:** <password\>

        ![configure-kerberos](../../assets/img/guides/configure-kerberos.png)

----

## Generate the kerberos token

1.  Git clone the `KerbClientProject`.

    ``` java
    git clone https://github.com/erandacr/KerbClientProject
    ```

2.  Run `KerbClient.cs` using an IDE.  

    !!! tip 
        You can run it using Visual Studio by downloading and installing the following libraries and programs.

        -   [Visual Studio sdk](https://www.microsoft.com/net/download/visual-studio-sdks)(.NET Core 2.1)

        -   [Microsoft Visual Studio](https://visualstudio.microsoft.com/downloads/)(Professional Edition)

        -   Install `System.Net.Http.dll` and define the path in the `KerbClientProject.csproj` file.

        Note that you can also use any other IDE to run this project.
    
3.  Configure the following parameters in the project according to your setup.

    ``` java
    // Service Name goes here
    static string serviceName = "HTTP/apimserver.example.com@EXAMPLE.COM";
    // Token endpoint URL
    static string URI = "https://idp.example.com:9443/oauth2/token";
    // Client ID
    static string username = "1ouL2fO6SxlfD2LDw125cTo0vQka";
    // Client Secret
    static string password = "uUEtm89tY6QZuZUmqZfL92BDFeAa";
    // Kerberos realm name
    static string realm_Name = "example.com";
    ```

4.  Run the project by selecting the **Start without Debugging** option on the Visual Studio editor.

    This project generates a Kerberos ticket and a kerberos token is generated using the ticket. The generated token can be used to get the OAuth token.


----

## Invoke the token endpoint

Use one of the following curl commands to request for the OAuth token using the kerberos token.

``` java tab="Request 1"
curl -v -X POST -H "Authorization: Basic <base64 encoded client id:client secret value>" -k -d "grant_type=kerberos&kerberos_realm=<kerberos realm>&kerberos_token=<kerberos token>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` java tab="Request 2"
curl -u <client id>:<client secret> -k -d "grant_type=kerberos&kerberos_realm=<kerberos realm>&kerberos_token=<kerberos token>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive the following response.

``` java
POST /oauth2/token HTTP/1.1
Host: idp.example.com:9443
Content-Type: application/x-www-form-urlencoded
Authorization: Basic MW91TDJmTzZTeGxmRDJMRHcxMjVjVG8wdlFrYTp1VUV0bTg5dFk2UVp1WlVtcVpmTDkyQkRGZUFh
grant_type=kerberos&kerberos_realm=example.com&kerberos_token=YII1…
```

The Kerberos client receives the OAuth2 token. 

The Kerberos Grant then validates the received token with the provided Identity Provider (IDP) credentials and if it is a valid token, it issues an OAuth2 token to the client.

``` java tab="Example"
{  
    "access_token":"636ce45f-c7f6-3a95-907f-d1f8aca28403",
    "refresh_token":"831271d9-16ba-3bad-af18-b9f6592a8677",
    "scope":"my_scope",
    "token_type":"Bearer",
    "expires_in":521
}
```

