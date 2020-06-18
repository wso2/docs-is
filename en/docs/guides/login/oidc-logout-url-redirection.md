# OpenID Connect Logout URL Redirection

WSO2 Identity Server allows you to construct a logout URL so that an application can redirect to a particular logout page when the relying party (RP) sends an OpenID Connect (OIDC) logout request. 

An OIDC logout request is generally a GET request (i.e., you construct a URL with the necessary parameters and perform a redirection).

However, there can be instances where you cannot use a GET request as the OIDC logout request. For example, when the generated id_token exceeds the maximum character limit of the URL, and the browser truncates the URL. In such instances, you can send the logout request as a POST request using an automatically submitting HTML form.

-----

## Sending a GET logout request

(TODO: dev-portal-fragment)

{!fragments/register-a-service-provider.md!}

3. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

4. Enter the **Callback Url**.

    !!! tip
        For more information on `Callback Url` and other advanced configurations, see [Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced).

5. Enter a logout URL along with the callback URL. 

    ```
    regexp=(callback_url|logout_url)
    ```

    You can specify multiple callback URLs using a regex pattern as shown below.

    ```tab="Sample"
    regexp=(http://localhost:8080/playground2/oauth2client|http://localhost:8080/playground2/logout)
    ```

6. Open the `deployment.toml` configuration file found in the `<IS_HOME>/repository/conf` folder. 

7. If the following configuration is set to `sp`, the JWT is signed with the application tenant key. If it is set to `user`, the tenant is decided by the subject of the id token, although the subject would not contain the tenant domain by default. 

    ```toml
    [authentication]
    sign_auth_response_with_tenant_of= "sp" #user
    ```

    If it is set to `user`, expand **Local & Outbound Authentication Configuration** on the management console service provider configuration and select **Use tenant domain in local subject identifier**. 


8. Use the following cURL command to retrieve the `id_token` using the client ID, client secret, and authorization code.

    ```tab="Request Format"
    curl -k -v --user <client_id>:<client_secret> -d "grant_type=authorization_code&code=<authorization_code>&redirect_uri=<redirect_uri>" https://localhost:9443/oauth2/token
    ```

    ``` tab="Sample Request"
    curl -k -v --user IaWVc3g4eemSnbWwekBg79xudZMa:PL9PxKPqGZxkpJ8X8u7g8pA_ruoa -d "grant_type=authorization_code&code=ac1b2e9e-d8d0-3f42-bdd4-dc7aab45b5dc&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

9. Use the retrieved `id_token` in the following URL to logout from the identity provider and redirect to a URL in the relying party (RP).

    ```tab="Format"
    https://localhost:9443/oidc/logout?id_token_hint=<id_token>&post_logout_redirect_uri=<redirect URI>&state=<state>
    ```

    ```tab="Sample"
    https://localhost:9443/oidc/logout?id_token_hint=eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoid3l2dExOU3VMbUpubV9FYVhWM183QSIsImF1ZCI6IllteEQwakRPSWZpQmtEOFRQTFlPZnhOU0lnNGEiLCJzdWIiOiJhZG1pbiIsInVwbiI6ImFkbWluIiwibmJmIjoxNTg3NTQyNDE5LCJhenAiOiJZbXhEMGpET0lmaUJrRDhUUExZT2Z4TlNJZzRhIiwiYW1yIjpbInBhc3N3b3JkIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImdyb3VwcyI6WyJBcHBsaWNhdGlvblwvVXNlciBQb3J0YWwiLCJBcHBsaWNhdGlvblwvcGlja3VwLWRpc3BhdGNoIiwiSW50ZXJuYWxcL2V2ZXJ5b25lIiwiQXBwbGljYXRpb25cL3BpY2t1cC1tYW5hZ2VyIiwiYWRtaW4iLCJBcHBsaWNhdGlvblwvbXAtand0Il0sImV4cCI6MTU4NzU0NjAxOSwiaWF0IjoxNTg3NTQyNDE5fQ.Ibguye1XxPbRgdmpMCAbHn3aNl00NWWpMubg8dKuYrO-7rP7Uh76_5LQqWdzp1dsBuPSqKATnGn95vZ4uz3yn1aB-TlsBqD6gCRc2GWO5Qk-jYfgCRZHLOrFn82f5Eaoc5p99b4lYIat6DAogS2xj3NYu_rbeo1jHDfI-CzY35X9u_w15uSLpwIxa6DPrU-0WhgSTBk_n9UGJKXdYYQipiXheVQZGAGU86IpHfMyOgd6KQrq2HTBsnFjPUSTBE0ifq2ZBGPfYKA9ESCJX2lC6h4wveqEQRkPWEsry4uYECNPyJXqbE2Kt3sLXo537W2rZpkNHL4_mWMGWv_EIdp0BQ&post_logout_redirect_uri=http://localhost:8080/playground2/logout&state=state_1
    ```
      
    For a description of the parameters included in the URL, see [logout request parameters](#logout-request-parameters).

-----

## Sending a POST logout request

Sending an OIDC logout request as a POST request is useful in certain scenarios. For example, consider a service provider that builds an HTML page with the required parameters to render a page in a browser. This scenario requires an OIDC logout request sent as a POST request to the logout endpoint.

The following sample HTML form shows the parameters you need to specify when sending an OIDC logout request as a POST request. 

```html tab="Format"
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

```html tab="Sample"
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

For a description of the parameters included in the HTML form, see [logout request parameters](#logout-request-parameters).

-----

## Logout request parameters

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

!!! info "Related Topics"
    - [Concept: Manage User Sessions and Logout](../../../concepts/authentication/session-management)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: OpenID Connect Session Management](../session-management-logout)
    - [Demo: OpenID Connect Back-Channel Logout](../../../quick-starts/oidc-backchannel-logout-sample)