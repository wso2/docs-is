
In this section, we will focus on how to call a secure API from your JavaScript app using the other token—the access token.

For simplicity, let's assume that the APIs we’re calling are secured by the same Identity Provider (IdP) and use the same issuer— in this case, the same {{product_name}} organization. This is typical when JavaScript apps are interacting with internal APIs within the same organization.

!!! tip "Tip"

    If your app needs to call APIs secured by a different IdP, you’ll need to exchange your current access token for a new one issued by the IdP securing those APIs. This can be done using the OAuth2 token exchange grant type or other supported grant types. We will cover these scenarios in a separate guide.

## Using SDK Built-in HTTP client

You can use the `httpRequest` method of the {{product_name}} Browser SDK to make HTTP requests to these endpoints. This method sends the request with the user's access token in the `Authorization` header, so you don't need to attach it manually. If the access token has expired, it refreshes the token and retries the request.

The following is a simple example of how you might use `httpRequest` to call a protected API endpoint, such as `/scim2/Me` (to get the user profile details after signing in). In this case, the SCIM 2 endpoint is secured by the same {{product_name}} organization. {{product_name}} provides a SCIM 2 API for managing users within your organization. While user management with SCIM 2 is a topic for a different guide, we will use the API as part of our current guide.

```javascript
const requestConfig = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/scim+json"
  },
  method: "GET",
  url: "{{content.sdkconfig.baseUrl}}/scim2/Me"
};

auth.httpRequest(requestConfig).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.error(error);
});
```

!!! note "Note"

    To call {{product_name}} APIs such as `/scim2/Me`, the access token needs the `internal_login` scope. The SDK requests it by default. If you set `scopes` yourself, include it.

Note that you don’t need to manually specify the Authorization header under headers in `requestConfig`, as the `httpRequest` method attaches the access token to the network request as the Authorization header.

In the above example, the final request config sent by the `httpRequest` method would be as follows.

```javascript hl_lines="5"
const requestConfig = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/scim+json",
    "Authorization": "Bearer <access_token>"
  },
  method: "GET",
  url: "{{content.sdkconfig.baseUrl}}/scim2/Me"
};
```

In case you want to send multiple API requests in parallel, you can use the `httpRequestAll` method to simultaneously trigger parallel network requests and receive responses after all network requests are completed.

The following code snippet sends several requests in parallel. The responses contain the results for each request, as an array of responses in the same order as `requestConfigs`.

```javascript
auth.httpRequestAll(requestConfigs).then((responses) => {
  responses.forEach((response) => {
    console.log(response.data);
  });
}).catch((error) => {
  console.error(error);
});
```

## Using your own HTTP client

If you prefer your own HTTP client, read the access token with `getAccessToken` and attach it to the request yourself.

```javascript
const accessToken = await auth.getAccessToken();

const response = await fetch("{{content.sdkconfig.baseUrl}}/scim2/Me", {
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${accessToken}`
  }
});
```

!!! note "Note"

    `getAccessToken` doesn't work when `storage` is set to `webWorker`, because the token never leaves the web worker. In that case, use `httpRequest`.
