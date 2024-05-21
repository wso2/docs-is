# Implement login using the Authorization Code flow and PKCE

See the instructions given below to implement login with OpenID Connect in your application by using the authorization code flow and PKCE. This method is most suitable for public clients, which are applications that cannot keep the client credentials securely.

[Single-page applications]({{base_path}}/guides/applications/register-single-page-app/) and [mobile applications]({{base_path}}/guides/applications/register-mobile-app/) are some examples for public clients.

For public clients, it is recommended to use [PKCE](https://datatracker.ietf.org/doc/html/rfc7636){:target="_blank"} along with the authorization code grant to mitigate code interception attacks.

The following diagram explains how this flow works with {{ product_name }}.

![Authorization code flow with PKCE]({{base_path}}/assets/img/guides/applications/oidc/auth_code_flow_with_pkce.png){: width="700" style="border: 0.3px solid lightgrey;"}

As shown above, you need to configure your application to get the authorization code from {{ product_name }}, and then exchange it for the required tokens.

## Prerequisites

To get started, you need to have an application registered in {{ product_name }}. If you don't already have one, register a [single-page application]({{base_path}}/guides/applications/register-single-page-app/#register-app) or [mobile application]({{base_path}}/guides/applications/register-mobile-app/#register-app).

!!! note
    Note that only users can log in to business applications. Therefore, to test login on your application, you need a [user account]({{base_path}}/guides/users/manage-users/).

## Get authorization code

First, your app must initiate a login request to {{ product_name }}. After redirecting to {{ product_name }}, the user is prompted with a login page if the user is not already authenticated.

**Authorization endpoint**

```bash 
{{ product_url_format }}/oauth2/authorize
```

**Request format**

```bash   
{{ product_url_format }}/oauth2/authorize?scope={scope}&response_type=code&redirect_uri={redirect_uri}&client_id={client_id}&code_challenge=<code_challenge>&code_challenge_method=<code_challenge_method>
```

**Sample request**

```bash   
{{ product_url_sample }}/oauth2/authorize?scope=openid&response_type=code&redirect_uri=https://localhost:5000&client_id=fv_LScHaB83PN4VPX1cHufphtHQa&code_challenge_method=S256&code_challenge=IMbNq8j9HZBlbLuZ4nHcYOv1ZkRF5TVNAfVIGyeUsi0
```

<br>

This authorization request takes the following parameters.

!!! note
    See <!-- [Authentication Request with Authorization code](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) and --> [Authorization Request with PKCE](https://datatracker.ietf.org/doc/html/rfc7636#page-9){:target="_blank"} for details.

<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>response_type</code><Badge text="Required" type="mandatory"/></td>
    <td>The required grant type. Use <code>code</code> to represent the authorization code grant type.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID that was generated when registering the application in {{ product_name }}.</td>
  </tr>
  <tr>
    <td><code>scope</code><Badge text="Required" type="mandatory"/></td>
    <td>For OpenId Connect login, use <code>openid</code> as one of the scopes. There can be additional scopes as well. Scopes should be space separated. Example: <code>openid email profile</code></td>
  </tr>
  <tr>
    <td><code>code_challenge</code><Badge text="Required" type="mandatory"/></td>
    <td>The client creates and records a secret cryptographical random string (<code>code_verifier</code>), which is then encoded using URL safe base64 encoding to transform it into the <code>code_challenge</code>. The <code>code_challenge</code> is required for the authorization code flow with PKCE.  
    You can use some [tools](https://tonyxu-io.github.io/pkce-generator/){:target="_blank"} to generate the <code>code_challenge</code> and <code>code_verifier</code>.</td>
  </tr>
  <tr>
    <td><code>code_challenge_method</code><Badge text="Required" type="mandatory"/></td>
    <td>This is the method used for transforming the <code>code_verifier</code> into the <code>code_challenge</code>. {{ product_name }} supports <code>S256</code> and <code>plain</code>. This is required for the authorization code flow with PKCE.</td>
  </tr>
</table>

When the user is authenticated, {{ product_name }} redirects to the `redirect_uri` with the authorization code.


**Sample response**

``` 
https://localhost:5000/?code=60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d&session_state=a0c3bc89849ba0f236791f7fe76a837b7b4422fdc9aca16db394d19a28724a29.wQc7eSHSRrGNfECJRMhSAw
```


## Get tokens

After receiving the authorization code, the application has to exchange it to get the below tokens:

- `access_token`
- `id_token`
- `refresh_token` (only if the `refresh_token` grant type is enabled for the application registered in {{ product_name }})

**Token endpoint**

```bash 
{{ product_url_format }}/oauth2/token
```

**Token request**

=== "cURL"
    ```bash
    curl --location --request POST '{{ product_url_format }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code={authorization_code}' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'redirect_uri={redirect_uri}' \
    --data-urlencode 'code_verifier={pkce_code_verifier}' \
    --data-urlencode 'client_id={client_id}'
    ```

=== "JavaScript - jQuery"
    ```js
    var settings = {
        "url": "{{ product_url_sample }}/oauth2/token",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "code": "{authorization_doe}",
            "grant_type": "authorization_code",
            "redirect_uri": "{redirect_uri}",
            "code_verifier": "{pkce_code_verifier}",
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
        'code': '{authorization_doe}',
        'grant_type': 'authorization_code',
        'redirect_uri': '{redirect_uri}',
        'code_verifier': '{pkce_code_verifier}',
        'client_id': '{client_id}'
    });
    var config = {
        method: 'post',
        url: '{{ product_url_sample }}/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };
    
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```

**Sample token request**

=== "cURL"
    ```bash 
    curl --location --request POST '{{ product_url_sample }}/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'code=60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'redirect_uri=https://localhost:5000' \
    --data-urlencode 'code_verifier=zYYoWc9LNIahfonUKyKZcpDc0oWV0zGbn-gTkrr4lkw' \
    --data-urlencode 'client_id=fv_LScHaB83PN4VPX1cHufphtHQa'
    ```

This token request takes the following parameters.

!!! note
    See <!-- [Token request with authorization code](https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest){:target="_blank"} and--> [Token request with PKCE](https://datatracker.ietf.org/doc/html/rfc7636#page-10){:target="_blank"} for details.

<br>
<table>
  <tr>
    <th>Request Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>grant_type</code><Badge text="Required" type="mandatory"/></td>
    <td>The grant type. Here we are using the authorization_code grant.</td>
  </tr>
  <tr>
    <td><code>redirect_uri</code><Badge text="Required" type="mandatory"/></td>
    <td>This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps.</td>
  </tr>
  <tr>
    <td><code>code</code><Badge text="Required" type="mandatory"/></td>
    <td>The authorization code received from the authorization request.</td>
  </tr>
  <tr>
    <td><code>code_verifier</code><Badge text="Required" type="mandatory"/></td>
    <td>The plain text cryptographical random string that was used to generate the <code>code_challenge</code>. This is required for the authorization code flow with PKCE.</td>
  </tr>
  <tr>
    <td><code>client_id</code><Badge text="Required" type="mandatory"/></td>
    <td>The client ID obtained when registering the application in {{ product_name }}.</td>
  </tr>
</table>


**Sample response:**

```json 
{
  "access_token": "54bd024f-5080-3db5-9422-785f5d610605",
  "refresh_token": "7024af0f-9216-3b8f-a249-edf6db7f72ab",
  "scope": "openid",
  "id_token": "eyJ4NXQiOiJZemM1T1Rnd1pURTNNV1F6TVdFek5ERm1OelZoTTJOaU9UQmxOamN3TlRJNU9HTTBNbVExWWprd1lqZzJNVEl3WldNd056TTRNemcxWkdJeVpEZzNaQSIsImtpZCI6Ill6YzVPVGd3WlRFM01XUXpNV0V6TkRGbU56VmhNMk5pT1RCbE5qY3dOVEk1T0dNME1tUTFZamt3WWpnMk1USXdaV013TnpNNE16ZzFaR0l5WkRnM1pBX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJlYzU2N2M1YmE4NmM3NmJiYjY2ZGNiZTM5YzYzNGFlNTNhNTNiNzgwNjM1OGQwY2ZjMzE4YWNiYmFlZWIyOTRmIiwiYXRfaGFzaCI6IkpvV0hGOEExemYxcG9pUlB3aTU0TWciLCJhdWQiOiJmdl9MU2NIYUI4M1BONFZQWDFjSHVmcGh0SFFhIiwiY19oYXNoIjoiaVRqd0NIblM5aTNTOHhPdTFzbFBidyIsInN1YiI6InVzZXIxQGJpZnJvc3QuY29tIiwibmJmIjoxNjE4ODE2NzI1LCJhenAiOiJmdl9MU2NIYUI4M1BONFZQWDFjSHVmcGh0SFFhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvYWNjb3VudHMuYXNnYXJkZW8uaW9cL3RcL2JpZnJvc3RcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTg4MjAzMjUsImlhdCI6MTYxODgxNjcyNSwic2lkIjoiMGI2ZjE5M2MtNWEyOS00OGYxLThmYzAtYWNkOWU5NGQ3ODQ1In0.aWin4g0qi-KuE3UGInKun5z-0R2mEP3S-lrWhAijylNJocTgYpStgrm2nH_mI6WR4PN_e9ClVjx40EGUOdSqNlJq4OvWdGT9N6x9ei6D0IkFNcd-ad5ZKgWbJNjejcTfBgRJCa_XbCpntFvwYbrOiCm9ivdUTafMx1lL8ihl-5c04UOsZe7iwb44xTWtFj1WfrVCXiCdcu5NyNn5SKICCUeO9p1sqjLXsbGRwN6TN0H7oVBoK7Q6o9R6gYPWR_hBk9uxpt3CyKej1uCVsmxcoGGqPXMQugIz5sU2wwo685XNAv6Q9TlTEqFBWpbSpYZ0g73YjnhTvaaaHdasgE1VCw",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

<br>

To get a refresh token, you need to enable the `Refresh Token` grant type for the application. By default, it is enabled for the single-page application template.
