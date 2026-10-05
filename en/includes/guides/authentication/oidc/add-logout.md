# Add logout with OIDC to application

OpenID Connect provides [OpenID Connect RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html){:target="_blank"} to terminate user sessions. The logout endpoint is used to terminate the user session at {{ product_name }} and to log the user out. When a user is
successfully logged out, the user is redirected to the `post_logout_redirect_uri` sent in the logout request.

!!! note
    Your application should redirect the user's browser to the logout endpoint, as {{ product_name }} uses the browser session to identify the session to terminate. To terminate user sessions from a backend service, use the [Session Management API]({% if product_name == "WSO2 Identity Server" %}{{base_path}}/apis/session-mgt-rest-api/{% else %}{{base_path}}/apis/session/{% endif %}). The application calling this API should be [authorized]({{base_path}}/guides/applications/register-machine-to-machine-app/#authorize-the-api-resources-for-the-app) to access the **Session Management API** with the `internal_session_delete` scope.

## Logout endpoint

```text
{{ product_url_format }}/oidc/logout
```

## Sample request

Redirect the user's browser to the logout endpoint with the following parameters. Make sure to URL-encode the parameter values.

```text
{{ product_url_sample }}/oidc/logout?
id_token_hint=<id_token>
&post_logout_redirect_uri=<post_logout_redirect_uri>
&state=<state>
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
    <td><code>id_token_hint</code><Badge text="Recommended" type="recommended"/></td>
    <td>The ID token that {{ product_name }} returned to the application in the token response. It gives {{ product_name }} a hint about the user's current authenticated session on the application.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Optional" type="optional"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}. This can be used instead of the <code>id_token_hint</code> parameter.</td>
  </tr>
  <tr>
    <td><code>post_logout_redirect_uri</code><Badge text="Optional" type="optional"/></td>
    <td>
    The URL to redirect the user to after logout. The value defined here should be added as one of the <a href="{{base_path}}/references/app-settings/oidc-settings-for-app/#authorized-redirect-urls">authorized redirect URLs</a>. This should be passed along with either the <code>id_token_hint</code> or the <code>client_id</code>.
    If the <code>post_logout_redirect_uri</code> parameter is not passed, the user will be routed to {{ product_name }}'s common page after logout.
    </td>
  </tr>
  <tr>
    <td><code>state</code><Badge text="Optional" type="optional"/></td>
    <td>The parameter passed from the application to {{ product_name }} to maintain state information. If an application sends this parameter, {{ product_name }} will return this information in the response.</td>
  </tr>
</table>

## Sample response

```text
http://myapp.com?state=state-param
```

If **Skip logout consent** is disabled for the application, {{ product_name }} prompts the user to confirm the logout before logging the user out. To configure this, go to **Applications** in the {{ product_name }} Console, select your application, and use the **Skip logout consent** option in its **Advanced** tab.

![Skip logout consent in {{ product_name }}]({{base_path}}/assets/img/guides/applications/attributes/skip-logout-consent.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

<br>
