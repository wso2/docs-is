# Manage User Sessions and Logout

This page guides you through [managing user sessions and logout]((../../../concepts/authentication/session-management)) for OpenID Connect applications with WSO2 Identity Server. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/oidc-session-management" rel="nofollow noopener">Try it with the sample</a>

----

{!fragments/register-a-service-provider.md!}
{!fragments/oauth-app-config-basic.md!}
{!fragments/local-outbound.md!}

----
!!! info "How to keep the user session live in Identity Server"
    In WSO2 Identity Server, you can use an authorization endpoint to
    increase the session idle time.

    To do this, add an iframe to the service provider application which
    sends a `          prompt=none         ` call to the OAuth2
    authorization endpoint after each iteration of n minutes and refreshes
    the user session at the server-end. A sample iframe is shown below.

    ``` xml
    <iframe id="refresh_iframe" src="#" style="width:0;height:0;border:0; border:none;"></iframe><script>setInterval(function(){document.getElementById('refresh_iframe').src
    ="https://localhost:9443/oauth2/authorize prompt=none&scope=openid&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Fprompt-none callback.jsp&client_id=7x72byIYC40dlCuu6bovOTdK2MMa";},300000);</script>
    ```
    
----
!!! note
        **Alternatively,** to sign the ID token with the service provider's
        tenant domain, open the `           deployment.toml          ` file
        found in the
        `           <IS_HOME>/repository/conf          ` folder and
        set the following property to true.
    
        ```toml
        [oauth.oidc.id_token]
        sign_with_sp_key=true
        ```
   
        
!!! info "Related Topics"
    - [Manage User Sessions and Logout](../../../quick-starts/oidc-session-management)
    - [OpenID Connect Back-Channel Logout](../../../guides/login/oidc-backchannel-logout)
    - [Configure OpenID Connect Back-Channel Logout](../../../quick-starts/oidc-backchannel-logout-sample)

