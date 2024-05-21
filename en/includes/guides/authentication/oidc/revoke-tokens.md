# Revoke tokens

OAuth2.0 supports [token revocation](https://datatracker.ietf.org/doc/html/rfc7009){:target="_blank"} to revoke any access granted by them. This token endpoint can revoke **access tokens** and **refresh tokens**.

Confidential clients such as web apps can keep the client credentials securely. Those clients need to prove their identity when they access the revocation endpoint to revoke access tokens.

Public clients such as SPAs, mobile apps can't store credentials securely. Those apps need to submit only their client ID to identify the apps during token revocation.  


!!! note
    - Revoking a refresh token via the revocation endpoint will not revoke the respective access token.
    - Revoking an access token via the revocation endpoint will not revoke the respective refresh token.

**Token revocation endpoint**

``` 
{{ product_url_format }}/oauth2/revoke
```

## Token revocation by confidential clients

When your application is a confidential client, it needs to identify itself to the token endpoint by submitting the `client_id` as well as the `client_secret`. You can use one of the following methods:

- Use **client_secret_post**: The `client_id` and `client_secret` are both sent as body parameters in the POST message.
- Use **client_secret_basic**: The client secret is sent as an authorization header in the request (`'Authorization: Basic BASE64_ENCODE<client_id:client_secret>'`).

Apart from client authentication, the revocation request has some other parameters as well.

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
   <tr>
      <td><code>token</code><Badge text="Required" type="mandatory"/></td>
      <td>The token you want to revoke.</td>
    </tr>
  <tr>
    <td><code>token_type_hint</code><Badge text="Optional" type="optional"/></td>
    <td>The type of token. If the token is an access token, the type should be <code>access_token</code>. For a refresh token, the type should be <code>refresh_token</code>.</td>
  </tr>
</table>

### Client secret post based authentication

In this method, the app can send the `client_id` and `client_secret` as body params in the revocation request.

The sample request is given below.

=== "cURL"
    ```
    curl --location --request POST '{{ product_url_sample }}/oauth2/revoke' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'token={token}' \
    --data-urlencode 'token_type_hint={token_type}' \
    --data-urlencode 'client_id={client_id}' \
    --data-urlencode 'client_secret={client_secret}'
    ```

=== "JavaScript - jQuery"
    ```js
    var settings = {
        "url": "{{ product_url_format }}/oauth2/revoke",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "token": "{token}",
            "token_type": "{token_type}",
            "client_id": "{client_id}",
            "client_secret": "{client_secret}"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

=== "Nodejs - Axios"
    ```js
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'token': '{token}',
        'token_type_hint': '{token_type}',
        'client_id': '{client_id}',
        'client_secret': '{client_secret}',
    });
    var config = {
        method: 'post',
        url: '{{ product_url_format }}/oauth2/revoke',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```

### Client secret basic authentication

In client secret basic authentication, the application has to do base64 encoding on the client ID and client secret and pass that as a basic authorization header in the revocation request.

The authorization header should look as follows:

```
Basic BASE46_ENCODING<your_client_id:your_client_secret>
```

!!! tip
    To perform base64 encoding for the client ID and secret, you can use a tool, or you can run the below command.
    ```
    echo -n '<your_client_id:your_client_secret>' | base64
    ```

**Sample request**

=== "cURL"
    ```
    curl --location --request POST '{{ product_url_sample }}/oauth2/revoke' \
    --header 'Authorization: Basic ejhSQjZ5c2REWmhlNFFPMHpKQVF6S2JpNlA0YTp6MEM3OXpsb3B4OGk3QnlPdzhLMTVBOWRwbFlh' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'token_type_hint=access_token' \
    --data-urlencode 'token=292896cf-5525-3551-b9e2-1787f1114924'
    ```

When the token is revoked, you will get a `200 OK` response.

## Token revocation by public clients

Since public clients cannot store credentials securely and they do not need to perform authentication when revoking a token. However, they need to submit their client ID.

**Sample request**

=== "cURL"
    ```
    curl --location --request POST '{{ product_url_sample }}/oauth2/revoke' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'token={token}' \
    --data-urlencode 'token_type_hint={token_type}' \
    --data-urlencode 'client_id={client_id}'
    ```

=== "JavaScript - jQuery"
    ```js
    var settings = {
        "url": "{{ product_url_format }}/oauth2/revoke",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "token": "{token}",
            "token_type": "{token_type}",
            "client_id": "{client_id}"
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

=== "Nodejs - Axios"
    ```js
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'token': '{token}',
        'token_type_hint': '{token_type}',
        'client_id': '{client_id}'
    });
    var config = {
        method: 'post',
        url: '{{ product_url_format }}/oauth2/revoke',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```

This token revocation request for public clients takes the following parameters:

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
   <tr>
      <td><code>token</code><Badge text="Required" type="mandatory"/></td>
      <td>The token (access token or refresh token) you want to inspect.</td>
    </tr>
  <tr>
    <td><code>token_type_hint</code><Badge text="Optional" type="optional"/></td>
    <td>The type of the token. If the token is an access token, the type should be <code>access_token</code>. For a refresh token, the type should be <code>refresh_token</code>.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID of the application.</td>
  </tr>
</table>

When the token is revoked, you will get a `200 OK` response.

!!! note
    You will always get a `200 OK` response when you try to revoke an invalid token, expired, or already revoked. This helps to prevent any information leaks.