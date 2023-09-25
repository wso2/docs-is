<!-- markdownlint-disable-next-line -->
If this configuration is selected, the applications can use `plain` algorithm. i.e,`code_challenge = code_verifier`. But this is not recommended due to security best practises.

 ``` 
https://api.asgardeo.io/t/bifrost/oauth2/authorize?response_type=code&client_id=Wsoq8t4nHW80gSnPfyDvRbiC__Ea&scope=openidprofile&redirect_uri=http%3A%2F%2Flocalhost%3A5000&code_challenge_method=plain&code_challenge=nAkA5m0EKlFbHFvF_V53Icig9gSnqr-HxH44Lvkne2c
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
--data-urlencode 'code_verifier=nAkA5m0EKlFbHFvF_V53Icig9gSnqr-HxH44Lvkne2c' \
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

