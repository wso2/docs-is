Once the user signs in, call APIs that require their access token in one of two ways.

## Use the SDK's HTTP client

`httpRequest()` sends a request with the user's access token in the `Authorization` header.

```javascript
import { AsgardeoSPAClient } from "@asgardeo/browser";

const auth = AsgardeoSPAClient.getInstance();

const response = await auth.httpRequest({
  headers: {
    Accept: "application/json"
  },
  method: "GET",
  url: "{{content.sdkconfig.baseUrl}}/scim2/Me"
});

console.log(response.data);
```

To send several requests in parallel, use `httpRequestAll()` with an array of request configurations.

!!! note
    If you set `storage` to `webWorker`, the access token stays inside the web worker and `httpRequest()` is the only way to call protected APIs. It only sends the token to `baseUrl` and the URLs listed in `allowedExternalUrls`.

## Use your own HTTP client

With any other storage option, read the access token with `getAccessToken()` and add it to your requests.

```javascript
const accessToken = await auth.getAccessToken();

const response = await fetch("https://api.example.com/orders", {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
```

!!! tip
    To call {{product_name}} APIs such as `/scim2/Me`, the access token needs the `internal_login` scope. The SDK requests it by default. If you set `scopes` yourself, include it.
