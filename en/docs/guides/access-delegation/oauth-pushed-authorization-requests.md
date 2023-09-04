# Pushed Authorization Requests (PAR)

Pushed Authorization Request (PAR) is an OAuth 2.0 specification that secures the way of initiating an authorization flow.

The PAR specification defines the `/par` endpoint in the authorization server, and enables an OAuth client to push the payload of an authorization request directly to this endpoint. The endpoint in response, will return a one-time use `request_uri` which acts as a reference to the registered authorization request.

When making the authorization request to the authorization endpoint, it is sufficient to send the `request_uri` instead of sending the complete authorization payload thus protecting the payload from being exposed to the user agent via query parameters.

Learn more about [Pushed authorization requests]({{base_path}}/references/concepts/authorization/pushed-authorization-requests).

## Register a service provider

{!./includes/register-a-service-provider.md!}

---

## Configure the service provider

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Add**.

    !!! note
        - Note the generated **OAuth Client Key** and **OAuth Client Secret**.

## Invoke the PAR endpoint

You can invoke the PAR endpoint by making a request to the following endpoint:

  ``` https://<IS_HOST>:<IS_PORT>/oauth2/par ```

The following example depicts an authorization code flow initiated with PAR:

!!! abstract ""

    **Request Format**
    ```
    curl --location 'https://<IS_HOST>:<IS_PORT>/oauth2/par' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'accept: application/json' \
    --header 'Authorization: Basic -u <CLIENT_ID>:<CLIENT_SECRET> \
    --data-urlencode 'client_id=<CLIENT_ID>\
    --data-urlencode <REDIRECT_URI> \
    --data-urlencode 'response_type=code' \
    --data-urlencode <SCOPES>
    ```
    ---

    **Sample Request**
    ```
    curl --location 'https://localhost:9443/oauth2/par' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'accept: application/json' \
    --header 'Authorization: Basic -u dZZXliQkdDVmZMeFBtUzB6NjZXTk1mZnlNYTpXWWZ3SFVzYnNFdnd0cW1ETHVheEZfVkNRSndh' \
    --data-urlencode 'client_id=DUBCMGolTZQNg6mmE9GvfQ3qfq8a\
    --data-urlencode http://localhost:8080/playground2 \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'openid email'
    ```

You will receive a response with the request_uri and the time of expiry.

```
{
"expires_in": 60,
"request_uri": "urn:ietf:params:oauth:request_uri:a0cf571e-fe97-411a-8f33-3c01913c0e5f"
}
```


