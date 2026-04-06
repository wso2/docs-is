The home realm identifier is a unique value that identifies a connection when routing users directly to a specific external IdP during login. When a user initiates login, your application can include this identifier as the `fidp` query parameter in the authorization request, which causes {{ product_name }} to skip the login page and route the user directly to the specified external IdP.

To configure the home realm identifier:

1. On the {{ product_name }} Console, click **Connections** and select the relevant connection.

2. Go to the **Advanced** tab of the selected connection.

3. Enter a unique identifier in the **Home Realm Identifier** field.

    ![Home realm identifier configuration]({{base_path}}/assets/img/guides/connections/home-realm-identifier.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

Once configured, use this identifier in your application's authorization request as follows:

```
https://<host_name>/t/<org_name>/oauth2/authorize?
  response_type=code
  &client_id=<client_id>
  &redirect_uri=<redirect_uri>
  &scope=openid
  &fidp=<home_realm_identifier>
```

!!! note
    When the `fidp` parameter is provided, {{ product_name }} bypasses the login page and directly initiates the authentication flow with the matching external IdP.
