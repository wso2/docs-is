# OpenID Connect Logout URL Redirection

WSO2 Identity Server allows you to construct a logout URL so that an
application can redirect to a particular logout page when the relying
party (RP) sends an OpenID Connect (OIDC) logout request.

Follow the steps below to send an OIDC logout request:

!!! tip
    An OIDC logout request is generally a GET request (i.e., you construct a
    URL with the necessary parameters and perform a redirection).
    
    However, there can be instances where you cannot use a GET request as
    the OIDC logout request. For example, when the generated
    `         id_token        ` exceeds the maximum character limit of the
    URL, and the browser truncates the URL. In such instances, you can send
    the logout request as a POST request using an automatically submitting
    HTML form.
    
    To understand how you can send an OIDC logout request as a POST request,
    see [Sending a POST request as the OIDC logout
    request](#sending-a-post-request-as-the-oidc-logout-request).
    

1.  Download and install WSO2 Identity Server. For detailed information
    on how to install WSO2 IS, see [Installing the
    Product](../../setup/installing-the-product).

2.  Access the Management Console via
    `           https://localhost:9443/carbon/          ` .

3.  Navigate to **Service Providers \> List** and **Edit** the service
    provider that you created for the OAuth2 application.
4.  Edit the **Callback URL** field and enter a logout URL along with
    the callback URL that you defined when you created the service
    provider.

    ``` java
    regexp=(callback_url|logout_url)
    ```

    You can specify multiple callback URLs using a regex pattern as
    follows:

    Example

    ``` java
    regexp=(http://localhost:8080/playground2/oauth2client|http://localhost:8080/playground2/logout)
    ```

5.  If the `           SignJWTWithSPKey          ` property is set to
    `           true          ` in the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file, JWT is signed with the application tenant key. If the property
    is set to `           false          `, the tenant is decided by
    the subject of the id token, although the subject would not contain
    the tenant domain by default. Therefore, you need to enable, **Use
    tenant domain in local subject identifier** in Service Provider
    configuration.

6.  Use the following cURL command to retrieve the
    `           id_token          ` using the client id, client secret,
    and authorization code:

    ``` java
    curl -k -v --user <client_id>:<client_secret> -d "grant_type=authorization_code&code=<authorization_code>&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

    Example

    ``` java
    curl -k -v --user IaWVc3g4eemSnbWwekBg79xudZMa:PL9PxKPqGZxkpJ8X8u7g8pA_ruoa -d "grant_type=authorization_code&code=ac1b2e9e-d8d0-3f42-bdd4-dc7aab45b5dc&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

7.  Use the retrieved `           id_token          ` in the following
    URL to logout from the identity provider and redirect to a URL in
    the RP.

    ``` java
    https://localhost:9443/oidc/logout?id_token_hint=<id_token>&post_logout_redirect_uri=<redirect URI>&state=<state>
    ```
      
    Following are the parameters you need to specify in the URL:
    <a name="parameters"></a>
    <table>
    <thead>
    <tr class="header">
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>               idp_url              </code></td>
    <td>The OIDC logout endpoint URL.</td>
    <td>Yes</td>
    </tr>
    <tr class="even">
    <td><code>               id_token_hint              </code></td>
    <td>The <code>               id_token              </code> returned by the identity provider.</td>
    <td>Yes</td>
    </tr>
    <tr class="odd">
    <td><code>               post_logout_redirect_uri              </code></td>
    <td><div class="content-wrapper">
    <p>The URL to be redirected to when logging out. The value defined here should be the same as the <code>                 callbackURI                </code> of the client application.</p>
    <div class="admonition note">
	<p class="admonition-title">Note</p>
    <p>If you do not specify a value for the <code>                 post_logout_redirect_uri                </code> parameter, users are redirected to the default logout success page of WSO2 Identity Server.</p>
    </div>
    </div></td>
    <td>Yes</td>
    </tr>
    <tr class="even">
    <td><code>               state              </code></td>
    <td>The parameter passed from the application to the identity provider to maintain any state information. This is used to correlate the logout requests and responses. If the state parameter is defined as <code>               state_1              </code>, the logout request and response both have <code>               state_1              </code> in them. This makes it easy for the client to identify the request and responses.</td>
    <td>No</td>
    </tr>
    </tbody>
    </table>

    Example

    ``` java
    https://localhost:9443/oidc/logout?id_token_hint=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiWVZwM3JsX21vOThvVURveUMyNVJQZyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIklhV1ZjM2c0ZWVtU25iV3dla0JnNzl4dWRaTWEiXSwiYXpwIjoiSWFXVmMzZzRlZW1TbmJXd2VrQmc3OXh1ZFpNYSIsImF1dGhfdGltZSI6MTUwNDU5NDUyNCwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNTA0NTk4MTUxLCJpYXQiOjE1MDQ1OTQ1NTF9.KfLa7_QkhJ3yZ1gfv6ZVh6bNkeQB1wUVp914Ek4MVnS-kXkJvBBqe6wqamp3RezNgRxsW59M-GKJUymJjalBGHPu3IglyssiubWOlXlAtkAL13n3B1tpWYwbkgkarI5elmxTwRU4yqsCRbu4T77sWmiIhTtnPEEyBMkhuQioU68&post_logout_redirect_uri=http://localhost:8080/playground2/logout&state=state_1
    ```

### Sending a POST request as the OIDC logout request

Let's take a look at a sample scenario to understand how to send an OIDC
logout request as a POST request.

Consider a scenario where a service provider builds an HTML page with
the required parameters to render a page in a browser. This scenario
requires an OIDC logout request sent as a POST request to the logout
endpoint.

Following is a sample HTML form with the parameters you need to specify
when you send an OIDC logout request as a POST request:

``` xml
<html>
    <body>
            <p>OIDC_LOGOUT_POST</p>
            <form method='post' action='$idp_url'>
                    <input type='hidden' name='id_token_hint' value='$id_token'/>
                    <input type='hidden' name='post_logout_redirect_uri' value='$callback'/>
                    <input type='hidden' name='state' value='$state'/>
                <button type='submit'>POST</button>
            </form>
            <script type='text/javascript'>
                document.forms[0].submit();
            </script>
        </body>
</html>
```

For descriptions of all the parameters that you need to specify in the
POST request, see the [parameter descriptions given above.](#parameters)
The following code block shows a sample HTML form with sample parameter values to render
the page in a browser:

``` java
<html>
    <body>
            <p>OIDC_LOGOUT_POST</p>
            <form method='post' action='https://localhost:9443/oidc/logout'>
                <p>
                       <input type='hidden' name='id_token_hint' value='eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZG1pbiIsImF1ZCI6WyJuNUFndEFqRmhUZXVybjE4MzhqaTMwbWhUbUFhIl0sImF6cCI6Im41QWd0QWpGaFRldXJuMTgzOGppMzBtaFRtQWEiLCJhdXRoX3RpbWUiOjE1MjIwNTI4NDYsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUyMjA1NjQ0Nywibm9uY2UiOiIxMjMzNDIzNCIsImlhdCI6MTUyMjA1Mjg0N30.g2oSoC_D88XBjN81Lgx0DmOFELO_lXVXTu2YwbZOQGiCJyJLCjwW_Q0UJimBG-ZZIJo5sPj5yrHi5wB9r-Dkr_9QOsgQc7YpiZ0hGw3x53tttxaA655kHuZCsFSJDY7nIsfH-d9Yhi-p4arfdwrrMpcvkwVoLwca1M3-1j9v3LU'/>
                    <input type='hidden' name='post_logout_redirect_uri' value='https://localhost/callback'/>
                    <input type='hidden' name='state' value='zzdfdsfdfdfd'/>
                    <button type='submit'>POST</button>
                 </p>
            </form>
            <script type='text/javascript'>
                document.forms[0].submit();
            </script>
        </body>
</html>
```
