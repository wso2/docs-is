# Add logout with OIDC to application

OpenID Connect provides [OpenID Connect RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html){:target="_blank"} to terminate user sessions. The logout endpoint is used to terminate the user session at {{ product_name }} and to log the user out. When a user is
successfully logged out, the user is redirected to the `post_logout_redirect_uri` sent in the logout request.

**Logout endpoint**

``` 
{{ product_url_format }}/oidc/logout
```

**Sample request**

``` curl
curl -X POST "{{ product_url_sample }}/oidc/logout" \
--data-urlencode "client_id=<client_id_of_the_application>" \
--data-urlencode "post_logout_redirect_uri=<redirect URI>" \
--data-urlencode "state=<state>"
```

The logout request has the following parameters:

!!! note
    See [RP-initiated logout request](https://openid.net/specs/openid-connect-rpinitiated-1_0.html#RPLogout){:target="_blank"} for more details.

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Recommended" type="recommended"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}.</td>
  </tr>
  <tr>
    <td><code>id_token_hint</code><Badge text="Optional" type="optional"/></td>
    <td>The ID token returned by {{ product_name }} (in response to the token request) is passed to the logout endpoint with a hint about the user's current authenticated session on the application. This can be used instead of the <code>client_id</code> parameter.</td>
  </tr>
  <tr>
    <td><code>post_logout_redirect_uri</code><Badge text="Optional" type="optional"/></td>
    <td>
    The URL to be redirected to during user logout. The value defined here should be added as one of the [authorized redirect URLs]({{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls). This should be passed along with the <code>id_token_hint</code>.
    If the <code>post_logout_redirect_uri</code> parameter is not passed, the user will be routed to {{ product_name }}'s common page after logout.
    </td>
  </tr>
  <tr>
    <td><code>state</code><Badge text="Optional" type="optional"/></td>
    <td>The parameter passed from the application to {{ product_name }} to maintain state information. If an application sends this parameter, {{ product_name }} will return this information in the response.</td>
  </tr>
</table>

**Sample response**

``` 
http://myapp.com?state=state-param
```

<br>
