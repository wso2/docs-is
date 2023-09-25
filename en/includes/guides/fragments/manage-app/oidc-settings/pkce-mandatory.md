<!-- markdownlint-disable-next-line -->
By enabling this option, {{ product_name }} mandates an application to use [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) with the [authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/#get-tokens). The application has to send a `code challenge` in the authorization request and the corresponding `code verifier` in the token request. {{ product_name }} supports `SHA-256` and `plain`.

_Sample authorization request_
```  
https://api.asgardeo.io/t/bifrost/oauth2/authorize?scope=openid&response_type=code&redirect_uri=<redirect_uri>&client_id=<client_id>&code_challenge=<code_challenge>&code_challenge_method=<code_challenge_method>
```

_Sample token request_:

<CodeGroup>
<CodeGroupItem title="cURL" active>

```bash
curl --location --request POST 'https://api.asgardeo.io/t/bifrost/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'code=60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'redirect_uri=https://localhost:5000' \
--data-urlencode 'code_verifier=WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOyBRrvA8ZTgCG7MlQcY9mfamCM8SWnGgO' \
--data-urlencode 'client_id=fv_LScHaB83PN4VPX1cHufphtHQa'
```

</CodeGroupItem>

<CodeGroupItem title="JavaScript - jQuery">

```js
var settings = {
    "url": "https://api.asgardeo.io/t/bifrost/oauth2/token",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "code": "60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d",
        "grant_type": "authorization_code",
        "redirect_uri": "https://localhost:5000",
        "code_verifier": "WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOyBRrvA8ZTgCG7MlQcY9mfamCM8SWnGgO",
        "client_id": "fv_LScHaB83PN4VPX1cHufphtHQa"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

</CodeGroupItem>

<CodeGroupItem title="Nodejs - Axios">

```js
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
    'code': '60cb4ba7-b7b2-3f2f-8319-58122f1b2f5d',
    'grant_type': 'authorization_code',
    'redirect_uri': 'https://localhost:5000',
    'code_verifier': 'WAOqjmxMpCnjME0mRpd8pDZNT8bEIpCdHgMKFqxoAVtEb4LhJ0KSg8Rl0z0O3pySx4HGp53R87bckxOxrXk2oNav0fgWzFdOyBRrvA8ZTgCG7MlQcY9mfamCM8SWnGgO',
    'client_id': 'fv_LScHaB83PN4VPX1cHufphtHQa'
});
var config = {
    method: 'post',
    url: 'https://api.asgardeo.io/t/bifrost/oauth2/token',
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

</CodeGroupItem>
</CodeGroup>
