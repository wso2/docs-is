# Request user information

User information is encoded inside the ID token returned along with the access token. In addition to that, OpenID Connect provides the userinfo endpoint <!-- [userinfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)--> to obtain user
information as a payload. The application should send a request with the access token to invoke the userinfo endpoint.

**Userinfo endpoint**

``` 
{{ product_url_format }}/oauth2/userinfo
```

**Sample request**

=== "cURL"
    ```bash
    curl --location --request GET '{{ product_url_format }}/oauth2/userinfo' \
    --header 'Authorization: Bearer {your_access_token}'
    ```

=== "JavaScript - jQuery"
    ```js
    var settings = {
        "url": "{{ product_url_format }}/oauth2/userinfo",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer {your_access_token}"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    ```

=== "Nodejs - Axios"
    ```js
    var axios = require('axios');

    var config = {
        method: 'get',
        url: '{{ product_url_format }}/oauth2/userinfo',
        headers: {
            'Authorization': 'Bearer {your_access_token}'
        }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    ```

**Default sample response**  
{{ product_name }} returns only the `sub` claim if there are no user attributes shared with the application.

```json
{
  "sub": "e46ffa67-100d-4329-9460-b8251d446518"
}
```

You can customize the user information in the response by [configuring user attributes]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/) on the registered application.
<br>
