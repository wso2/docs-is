# Implement login using the Authorization Code flow

See the instructions given below to implement login with OpenID Connect in your application by using the authorization code flow. This method is suitable for confidential clients such as traditional web applications.

The following diagram explains how this flow works with {{ product_name }}:

![Authorization code flow]({{base_path}}/assets/img/guides/applications/oidc/auth_code_flow.png){: width="700" style="border: 0.3px solid lightgrey;"}

As shown above, you need to configure your application to get the authorization code from {{ product_name }}, and then exchange it for the required tokens.

## Prerequisites

To get started, you need to have an application registered in {{ product_name }}. If you don't already have one, [register a web app with OIDC]({{base_path}}/guides/applications/register-oidc-web-app/).

!!! note
    Note that only users can log in to business applications. Therefore, to test login on your application, you need a [user account]({{base_path}}/guides/users/manage-users/).

## Get the authorization code
First, your app must initiate a login request to the authorization endpoint of {{ product_name }}. After redirecting to {{ product_name }}, the user should be prompted with a login page if the user is not authenticated.

!!! abstract ""
    **Authorization endpoint**
    ```
    {{ product_url_format }}/oauth2/authorize
    ```
    ---
    **Request format**
    ``` shell
    {{ product_url_format }}/oauth2/authorize?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id={client_id}&login_hint={email-address-passed-as-a-hint}
    ```
    ---
    **Request sample**
    ``` shell
    {{ product_url_sample }}/oauth2/authorize?response_type=code&client_id=z8RB6ysdDZhe4QO0zJAQzKbi6P4a&scope=openid&redirect_uri=http://localhost:3000&login_hint=johnd@bifrost.com
    ```

<!-- >!!! note
  See [Authentication Request with  Authorization code](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) for details.
::: -->

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>response_type</code><Badge text="Required" type="mandatory"/></td>
    <td>Required grant type. Use <code>code</code> to represent the authorization code grant type.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}.</td>
  </tr>
  <tr>
    <td><code>scope</code><Badge text="Required" type="mandatory"/></td>
    <td>For OpenId Connect login, use <code>openid</code> as one of the scopes. There can be additional scopes as well. Scopes should be space separated. Example: <code>openid email profile</code></td>
  </tr>
  <tr>
    <td><code>login_hint</code><Badge text="Optional" type="optional"/></td>
    <td>The email address of the user can be passed as a query parameter. This will trigger a prompt for the user to input their password directly, streamlining the authentication process. <br> Note that the functionality of this query parameter is only valid if the basic authenticator is used as the first step in the sign-in flow.</td>
  </tr>
</table>

Once the user is successfully authenticated, {{ product_name }} redirects the user to the `redirect_uri` with the authorization code.

**Sample response**

``` 
https://localhost:3000/?code=97c85a59-a758-3a56-95cd-e71a505b493d&session_state=a0c3bc89849ba0f236791f7fe76a837b7b4422fdc9aca16db394d19a28724a29.wQc7eSHSRrGNfECJRMhSAw
```

## Get tokens

After receiving the authorization code, the application has to exchange it to get the tokens given below:

- `access_token`
- `id_token`
- `refresh_token` (only if the `refresh_token` grant type is enabled for the application registered in {{ product_name }})

**Token endpoint**

```bash 
{{ product_url_format }}/oauth2/token
```

**Token request**

When your application is a confidential client, it needs to identify itself to the token endpoint by submitting its credentials. There are several ways to implement client authentication at the token endpoint:

!!! note
    See the list of client authentication methods in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication){:target="_blank"}.

- Use **client_secret_post**: The `client_id` and `client_secret` are both sent as body parameters in the POST message. See the example given below.

    === "cURL"
        ```bash
        curl --location --request POST '{{ product_url_format }}/oauth2/token' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'code={authorization_code}' \
        --data-urlencode 'grant_type=authorization_code' \
        --data-urlencode 'client_id={client_id}' \
        --data-urlencode 'client_secret={client_secret}' \
        --data-urlencode 'redirect_uri={redirect_uri}'
        ```

    === "JavaScript - jQuery"
        ```js
        var settings = {
            "url": "{{ product_url_format }}/oauth2/token",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "code": "{authorization_code}",
                "grant_type": "authorization_code",
                "client_id": "{client_id}",
                "client_secret": "{client_secret}",
                "redirect_uri": "{redirect_uri}"
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
            'code': '{authorization_code}',
            'grant_type': 'authorization_code',
            'client_id': '{client_id}',
            'client_secret': '{client_secret}',
            'redirect_uri': '{redirect_uri}'
        });
        var config = {
            method: 'post',
            url: '{{ product_url_format }}/oauth2/token',
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

- Use **client_secret_basic**: The client secret is sent as an authorization header in the request (`Authorization: Basic BASE46_ENCODING<client_id:client_secret>`). See the example given below.

    ```bash
    curl --location --request POST '{{ product_url_sample }}/oauth2/token' \
    --header 'Authorization: Basic ejhSQjZ5c2REWmhlNFFPMHpKQVF6S2JpNlA0YTp6MEM3OXpsb3B4OGk3QnlPdzhLMTVBOWRwbFlh' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code=97c85a59-a758-3a56-95cd-e71a505b493d' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'redirect_uri=https://myfirstwebapp.io/login'
    ```

- Use a **private key JWT**: A secured JWT assertion with the data required for client authentication is sent in the token request. See the example given below.

    !!! note
        Learn more about [private key JWT client authentication]({{base_path}}/guides/authentication/oidc/private-key-jwt-client-auth/) in {{ product_name }}.

    ```bash
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code={authorization_code}' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode     'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer'\
    --data-urlencode 'client_assertion={jwt_assertion}' \
    --data-urlencode 'redirect_uri={redirect_uri}'
    ```

The token request has the following parameters in addition to the credentials for authentication:

<!-- >!!! note
 See [Token request with authorization code](https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest).
::: -->

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
   <tr>
      <td><code>code</code><Badge text="Required" type="mandatory"/></td>
      <td>The authorization code received from the authorization request.</td>
    </tr>
  <tr>
    <td><code>grant_type</code><Badge text="Required" type="mandatory"/></td>
    <td>The grant type. Here we are using the <code>authorization_code</code> grant.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process.</td>
  </tr>
  <tr>
    <td><code>client_assertion_type</code></td>
    <td>This parameter is only used for client authentication using a private JWT key.</td>
  </tr>
</table>

Sample response will be as follows:

```json 
{
  "access_token": "54bd024f-5080-3db5-9422-785f5d610605",
  "scope": "openid",
  "id_token": "eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiI4ZTQyYjgzOTQzYWViYTkwMGU3MjJkMWI5NzU3Nzc3OTAyOGRhM2NiZWJmZjhhZTQxMDVhZTA5OTRiZjU5ZDYxIiwiYXRfaGFzaCI6IlZETXZUaWFsbjRRWEk4VUlJUjVlbnciLCJhdWQiOiJ6OFJCNnlzZERaaGU0UU8wekpBUXpLYmk2UDRhIiwiY19oYXNoIjoiOXRMaHJvQnV6Z0I4aDlIWWV6cTBpZyIsInN1YiI6InVzZXIxQGJpZnJvc3QuY29tIiwibmJmIjoxNjIwNzAzODA5LCJhenAiOiJ6OFJCNnlzZERaaGU0UU8wekpBUXpLYmk2UDRhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuYXNnYXJkZW8uaW9cL3RcL2JpZnJvc3RcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MjA3MDc0MDksImlhdCI6MTYyMDcwMzgwOSwic2lkIjoiYWQ3M2NlZGMtMzM3Ny00NDU3LWExYjUtNTZjODgyMTg1MzZmIn0.RSSL3InOFlvt_xQWFDKZY4FjKFFxh8rqGAlm1vKxleP6dKVlDAT4E0sudCJV5paJ-HdxVMd8MveWwpxrIL5NJw9XCa_sCEfso2fsMgRzQyEn1gjKLmr6Fj8Up3BoPnzPzn1cqVd-pKeXomzciM_ZDwsLr8qAEgVp663D4fg_F6pjVdDr17JRCUgO96yyjHRC5Eiqd7MP20Xhb-ZCMe0OhAlJlCmXB0FZV3nOTbza-jGvG8e_k80g3KVPFO7USek2Px3dCYfcbcA3k3cVzbTN8r8PIY3CEIIHtu5RyO_m1v3A0fjKvSaatfN0K2sndnlRpXFtOosIKQDYsy94wGnWkQ",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

To get a refresh token, you need to enable the **Refresh Token** grant type for the application. By default, it is enabled for traditional web application templates.
