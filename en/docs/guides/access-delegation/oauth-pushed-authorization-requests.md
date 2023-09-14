# Pushed Authorization Requests (PAR)

OAuth 2.0 authorization requests, typically initiated from the front-channel (e.g., a web browser), have inherent issues. These requests can sometimes be too large for browsers to handle, and there is no guarantee that an adversary won't tamper with the request before it reaches the authorization server.

The OAuth 2.0 specification introduced Pushed Authorization Requests (PAR) to mitigate these issues using the `/par` endpoint of an authorization server.

Using PAR, the authorization payload will be pushed to the `/par` endpoint from the back-channel. In response, the server will return a `request_uri`, a one-time use code which acts as a reference to the payload which can be used when initiating the usual authorization request from the front-channel.

!!! note
    The `/par` endpoint inherits the client authentication rules that are defined for the `/token` endpoint requests, including the relevant authentication methods.


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
        Take note of the generated **OAuth Client Key** and **OAuth Client Secret** for later use.

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
    --header 'Authorization: Basic -u <CLIENT_ID>:<CLIENT_SECRET>' \
    --data-urlencode 'client_id=<CLIENT_ID>'\
    --data-urlencode 'redirect_uri=<REDIRECT_URI>' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'scope=<SCOPES>'
    ```
    ---

    **Sample Request**
    ```
    curl --location 'https://localhost:9443/oauth2/par' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --header 'accept: application/json' \
    --header 'Authorization: Basic -u YWRtaW46YWRtaW4=' \
    --data-urlencode 'client_id=DUBCMGolTZQNg6mmE9GvfQ3qfq8a' \
    --data-urlencode 'redirect_uri=http://localhost:8080/playground2' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'scope=openid email'
    ```

You will receive a response with the request_uri and the time of expiry.

```json
{
"expires_in": 60,
"request_uri": "urn:ietf:params:oauth:par:request_uri:a0cf571e-fe97-411a-8f33-3c01913c0e5f"
}
```

!!! note
    - WSO2 IS uses the prefix, `urn:ietf:params:oauth:par:request_uri:` for the request_uri. The `/authorize` endpoint processes the request as initiated with PAR, only if the request_uri is of this format.

    - By default, the request_uri expires after 60 seconds. You can change the time of expiry (e.g. 90 seconds), by adding the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.

        ```json
         [oauth.par]
         expiry_time=90
        ```
