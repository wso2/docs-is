# Invoke the OAuth Introspection Endpoint

The OAuth introspection endpoint is:

``` bash
https://<IS_HOST>:<IS_PORT>/oauth2/introspect
```

This guide explains how to invoke the [OAuth Introspection Endpoint]({{base_path}}/references/concepts/authorization/introspection).

-----

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

{!./includes/oauth-app-config-basic.md!}

{!./includes/oauth-app-config-advanced-tip.md!}

!!! info
    If subject identifier in the token validation response needs to adhere to the " Use tenant domain in local subject identifier" and " Use user store domain in local subject identifier" configurations in service provider, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file .

    ``` toml
    [oauth]
    validation_response_subject_identifier_format= "app_configured"
    ```

    -   Default value of this property is false.
    -   If the value is false, subject identifier will be set as the fully
        qualified username.

----

## Invoking the endpoint for the super tenant

Use the cURL commands given in the following sections to invoke the OAuth introspection endpoint for the super tenant users.

### Prerequisites

Note the following before you begin.

-   Token validation requests sent to the introspection endpoint can be authenticated using basic authentication or client credentials.

    !!! Info "Important"
        Basic authentication is enabled by default. However, it is recommended to use client credentials for authenticating to the introspection endpoint as it improves server performance. 
        
        To enable token validation using client credentials, apply the following configurations to the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf` directory).

        ``` toml
        [[resource.access_control]]
        context="(.*)/oauth2/introspect(.*)"
        http_method = "all"
        secure = true
        allowed_auth_handlers="BasicClientAuthentication"
        ```

-   For token validation requests that require `CLIENT_ID:CLIENT_SECRET`, use the client ID and client secret of the OAuth service provider you configured above.

-   For token validation requests that require `USERNAME:PASSWORD`, you can use credentials of any user with `/permission/admin/manage/identity/applicationmgt/view` permissions. If you want to allow users with other permissions to send token validation requests, add the permissions to the `<IS_HOME>/repository/conf/deployment.toml` file as shown below and restart the server.

    ``` toml
    [resource_access_control.introspect]
    permissions = ["/permission/admin/manage/identity/applicationmgt/view","/permission/admin/login"]
    ```

### Get a valid token (without scopes)

First, you need to get a valid access token as follows:

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' https://localhost:9443/oauth2/token
    ```

You will receive the access token as follows:

```
{"token_type":"Bearer","expires_in":3600,"access_token":"fbc4e794-23db-3394-b1e5-f2c3e511d01f"}
```

### Get a valid token (with scopes)

First, you need to get a valid access token as follows:

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials&scope=<scope 1> <scope 2>' https://<IS_HOST>:<IS_PORT>/oauth2/token
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials&scope=test1 test2' https://localhost:9443/oauth2/token
    ```

You will receive the access token as follows:

```
{"access_token":"34060588-dd4e-36a5-ad93-440cc77a1cfb","scope":"test1 test2","token_type":"Bearer","expires_in":3600}
```

### Validate the token

You can send a token validation request using one of the following authentication methods:

-   Using basic authentication:

    !!! abstract ""
        **Request Format**
        ```curl
        curl -k -u <USERNAME>:<PASSWORD> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<ACCESS_TOKEN>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=fbc4e794-23db-3394-b1e5-f2c3e511d01f' https://localhost:9443/oauth2/introspect
        ```

    Note that you can pass the token type as an optional parameter in the request (e.g., `token_type_hint=access_token` or `token_type_hint=refresh_token`).

-   Using authentication with client credentials:

    !!! Tip
        Note that authentication using client credentials should be enabled for the server. See the [prerequisites](#invoking-the-endpoint-for-the-super-tenant) for instructions.

    !!! abstract ""
        **Request Format**
        ```curl
        curl -k -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<ACCESS_TOKEN>' https://<IS_HOST>:<IS_PORT>/oauth2/introspect
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=fbc4e794-23db-3394-b1e5-f2c3e511d01f' https://localhost:9443/oauth2/introspect
        ```

You will receive one of the following responses:

-   If the access token did not request scopes:

    ```curl
    {"exp":1464161608,"username":"admin@carbon.super","active":true,"token_type":"Bearer","client_id":"rgfKVdnMQnJSSr_pKFTxj3apiwYa","iat":1464158008}
    ```

-   If the access token requested scopes:

    ```curl
    {"exp":1464161560,"username":"admin@carbon.super","scope":"test1 test2","active":true,"token_type":"Bearer","client_id":"rgfKVdnMQnJSSr_pKFTxj3apiwYa","iat":1464157960}
    ```

### Invalid token

If the token that you used is invalid, you get the following response:

``` java
{'active':false}
```

### Empty token

If you leave the token parameter empty as shown below, you get the 
following response :

<table>
<tbody>
<tr class="odd">
<td>Request</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb1-1" title="1"><span class="ex">curl</span> -k -u <span class="op">&lt;</span>USERNAME<span class="op">&gt;</span>:<span class="op">&lt;</span>PASSWORD<span class="op">&gt;</span> -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://<span class="op">&lt;</span>IS_HOST<span class="op">&gt;</span>:<span class="op">&lt;</span>IS_PORT<span class="op">&gt;</span>/oauth2/introspect</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Sample cURL</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: bash; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: bash; gutter: false; theme: Confluence"><pre class="sourceCode bash"><code class="sourceCode bash"><a class="sourceLine" id="cb2-1" title="1"> <span class="ex">curl</span> -k -u admin:admin -H <span class="st">&#39;Content-Type: application/x-www-form-urlencoded&#39;</span> -X POST --data <span class="st">&#39;token=&#39;</span> https://localhost:9443/oauth2/introspect</a></code></pre></div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Response</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">{&#39;error&#39;: &#39;Invalid input&#39;}</a></code></pre></div>
</div>
</div></td>
</tr>
</tbody>
</table>

-----

## Invoking the endpoint for tenants

Use the following cURL commands given in the following sections to
invoke the OAuth introspection endpoint for tenant users.

### Prerequisites

Note the following before you begin.

-   Token validation requests sent to the introspection endpoint can be authenticated using basic authentication or client credentials.

    !!! Info "Important"
        Basic authentication is enabled by default. However, it is recommended to use client credentials for authenticating to the introspection endpoint as it improves server performance. 
        
        To enable token validation using client credentials, apply the following configurations to the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf` directory) and restart the server.

        ``` toml
        [[resource.access_control]]
        context="(.*)/oauth2/introspect(.*)"
        http_method = "all"
        secure = true
        allowed_auth_handlers="BasicClientAuthentication"
        ```

-   For token validation requests that require `CLIENT_ID:CLIENT_SECRET`, use the client ID and client secret of the OAuth service provider you configured above.

-   For token validation requests that require `USERNAME:PASSWORD`, you can use credentials of any user with `/permission/admin/manage/identity/applicationmgt/view` permissions. If you want to allow users with other permissions to send token validation requests, add the permissions to the `<IS_HOME>/repository/conf/deployment.toml` file as shown below and restart the server.

    ``` toml
    [resource_access_control.introspect]
    permissions = ["/permission/admin/manage/identity/applicationmgt/view","/permission/admin/login"]
    ```

-   Token introspection across tenant domains is disabled by default. To allow cross tenant token validation, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server.

    ``` toml
    [oauth.introspect]
    allow_cross_tenant = true
    ```

### Get a valid token (without scopes)

First, you need to get a valid access token as follows:

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/token
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials' https://localhost:9443/t/foo.com/oauth2/token
    ```

You will receive the access token as follows:

```
{"token_type":"Bearer","expires_in":3600,"access_token":"fbc4e794-23db-3394-b1e5-f2c3e511d01f"}
```

### Get a valid token (with scopes)

First, you need to get a valid access token as follows:

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials&scope=test1 test2' https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/token
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' -k -d 'grant_type=client_credentials&scope=test1 test2' https://localhost:9443/t/foo.com/oauth2/token
    ```

You will receive the access token as follows:

```curl
{"access_token":"34060588-dd4e-36a5-ad93-440cc77a1cfb","scope":"test1","token_type":"Bearer","expires_in":3600}
```

### Validate the token

You can send a token validation request using one of the following authentication methods:

-   Using basic authentication:

    !!! abstract ""
        **Request Format (method 1)**
        ```curl
        curl -k -u <USERNAME>@<TENAND_DOMAIN>:<PASSWORD> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<ACCESS_TOKEN>' https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/introspect
        ```
        ---
        **Request Format (method 2)**
        ```curl
        curl -v -k -H 'Authorization: Basic <BASE64ENCODED(USERNAME@TENAND_DOMAIN:PASSWORD)>' -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<ACCESS_TOKEN>' https://localhost:9443/t/<TENANT_DOMAIN>/oauth2/introspect
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -u admin@foo.com:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=fbc4e794-23db-3394-b1e5-f2c3e511d01f' https://localhost:9443/t/foo.com/oauth2/introspect
        ```

    Note that you can pass the token type as an optional parameter in the request (e.g., `token_type_hint=access_token` or `token_type_hint=refresh_token`).

-   Using authentication with client credentials:

    !!! Tip
        Note that authentication using client credentials should be enabled for the server. See the [prerequisites](#invoking-the-endpoint-for-tenants) for instructions.

    !!! abstract ""
        **Request Format**
        ```curl
        curl -k -u <CLIENT_ID>:<CLIENT_SECRET> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=<ACCESS_TOKEN>' https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/introspect
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -u rgfKVdnMQnJSSr_pKFTxj3apiwYa:BRebJ0aqfclQB9v7yZwhj0JfW0ga -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=fbc4e794-23db-3394-b1e5-f2c3e511d01f' https://localhost:9443/t/foo.com/oauth2/introspect
        ```

You will receive one of the following responses:

-   If the access token did not request scopes:

    ```curl
    {"active":true,"token_type":"Bearer","exp":1517922556,"iat":1517918956,"client_id":"okaN2IXAsLx5SBH9Los1C6zX1RIa","username":"admin@foo.com”}
    ```

-   If the access token requested scopes:

    ```curl
    {"scope":"1 test","active":true,"token_type":"Bearer","exp":1517922663,"iat":1517919063,"client_id":"okaN2IXAsLx5SBH9Los1C6zX1RIa","username":"admin@foo.com"}
    ```

### Invalid token

If the token that you used is invalid, you get the following response:


**Response**

``` java
{'active':false}
```

### Empty token

If you leave the token parameter empty as shown below, you get the following response:

!!! abstract ""
    **Request Format**
    ```curl
    curl -k -u <USERNAME>@<TENANT_DOMAIN>:<PASSWORD> -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=' https://<IS_HOST>:<IS_PORT>/t/<TENANT_DOMAIN>/oauth2/introspect
    ```
    ---
    **Sample Request**
    ```curl
    curl -k -u admin:admin -H 'Content-Type: application/x-www-form-urlencoded' -X POST --data 'token=' https://localhost:9443/oauth2/introspect
    ```
    ---
    **Response**
    ```curl
    {'error': 'Invalid input'}
    ```

The samples given above only demonstrate how to validate a token obtained for the client credentials grant using the **introspect endpoint**. Similarly, you can [invoke introspection endpoint](#validate-the-token) with a token obtained from any other grant type as well.

----

!!! info "Related topics"
    [Concept: OAuth Introspection Endpoint]({{base_path}}/references/concepts/authorization/introspection)