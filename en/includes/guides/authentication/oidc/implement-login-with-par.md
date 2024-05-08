# Implement login using Pushed Authorization Requests (PAR)

OAuth 2.0 authorization requests, typically initiated from the front-channel (e.g., a web browser), have inherent issues. These requests can sometimes be too large for browsers to handle, and there is no guarantee that an adversary won't tamper with the request before it reaches the authorization server.

The OAuth 2.0 specification introduced Pushed Authorization Requests (PAR) to mitigate these issues. Using PAR, the authorization payload will be pushed to the `/par` endpoint of the authorization server from the back-channel. In response, the server will return a `request_uri`, a one-time use identifier which acts as a reference to the payload.

You can use the `request_uri` instead of the authorization payload when initiating the authorization request from the front-channel.

!!! note
    The `/par` endpoint inherits the client authentication rules that are defined for the `/token` endpoint requests, including the relevant authentication methods. Learn more about [Pushed Authorization Requests]({{base_path}}/references/pushed-authorization-requests/).

## Prerequisites

To get started, you need to have an application registered in {{product_name}}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/) and take note of its client ID and secret.

## Get a request_uri

The `request_uri` functions as a reference to your authorization payload. You can receive a `request_uri` by invoking the following endpoint in {{product_name}}.

```
{{par_endpoint}}
```

The following example shows how you can initiate an authorization code flow using the `/par` endpoint.

**Request format**

```bash
curl --location '{{par_endpoint}}'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --header 'accept: application/json'
    --header 'Authorization: Basic <Base64Encoded(ClientID:ClientSecret)>'
    --data-urlencode 'client_id={CLIENT_ID}'
    --data-urlencode 'redirect_uri={REDIRECT_URI}'
    --data-urlencode 'response_type=code'
    --data-urlencode 'scope=<SCOPES>'
```

**Sample request**

```bash
curl --location '{{par_endpoint}}'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --header 'accept: application/json'
    --header 'Authorization: Basic YWRtaW46YWRtaW4='
    --data-urlencode 'client_id=DUBCMGolTZQNg6mmE9GvfQ3qfq8a'
    --data-urlencode 'redirect_uri=http://localhost:8080/playground2'
    --data-urlencode 'response_type=code'
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
    - {{product_name}} uses the prefix, `urn:ietf:params:oauth:par:request_uri:` for the request_uri. The `/authorize` endpoint processes the request as initiated with PAR, only if the request_uri is of this format.
    - By default, the request_uri expires after 60 seconds. You can change the time of expiry (e.g. 90 seconds), by adding the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` directory.
    ```json
     [oauth.par]
     expiry_time=90
    ```

## Start the authorization flow

You can use the `request_uri` that you received above, along with the client ID of the application to start the authorization flow using the following URL.

**Request Format**

``` json
{{ product_url_format }}/oauth2/authorize?
client_id={CLIENT_ID}&request_uri={request_uri}
```

**Sample Request**

``` json
{{ product_url_sample }}/oauth2/authorize?
client_id=DUBCMGolTZQNg6mmE9GvfQ3qfq8a
&request_uri=urn:ietf:params:oauth:par:request_uri:a0cf571e-fe97-411a-8f33-3c01913c0e5f
```
