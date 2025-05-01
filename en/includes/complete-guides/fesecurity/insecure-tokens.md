

When handling tokens such as the ID tokens and access tokens that we looked at in the previous section, there’s a risk of manipulation, such as replaying or tampering with a JWT token to elevate privileges or exploiting JWT invalidation. Due to this reason, it’s important to validate the ID token before using any information from it or storing it in the browser. Let’s look at how you can validate the ID token here because we use the ID token to establish the logged-in user context at the application level.

The ID token is a JWT (JSON Web Token) consisting of a header, payload, and signature, each encoded in Base64 and separated by dots. Here's an example of a decoded JWT token:




```json

{
  "x5t": "C2wu7Amo4wsyJgLt5Td1l7dpztc",
  "kid": "OTMyNmUwMjAxNWE0ODFiZTI5NzIxYTJhOTgxYTI4NjA4ZmUzNWUyZDhlNWI4MzQ3ZWU5OTUxYTU3YTczNjcxMA_RS256",
  "alg": "RS256"
}
{
  ...
  "iss": "https://api.asgardeo.io/t/mifrazmurthaja/oauth2/token",
  "sid": "eefd4513-e01c-44a3-ae8b-e59cc11c64e1",
  "aud": "sq4ktPY4lnEDBj8u5kImfHi4nSca",
  "nbf": 1724261085,
  "azp": "sq4ktPY4lnEDBj8u5kImfHi4nSca",
  "exp": 1724264685,
  "iat": 1724261085,
  ...
}
{
<SIGNATURE>
}

```

The header typically contains certificate information and the signature algorithm, while the payload includes user attributes and other crucial data. To validate an ID token,

1. **Validate the signature of the ID token.**
2. **Verify key attributes such as issuer (iss), audience (aud), issued-at time (iat), and expiration time (exp).**

Refer to the Validate ID Tokens [documentation]({{ base_path }}/guides/authentication/oidc/validate-id-tokens){:target="_blank"}  for more details on these attributes and the validation process.

Again you don’t need to attend the token validation by yourself, following the security best practices, the Asgardeo SDK enables ID token validation by default, using the JWKS (JSON Web Key Set) endpoint of {{product_name}} to validate the signature. The SDK constructs the JWKS and other necessary endpoints based on the baseUrl, so providing the baseUrl is typically sufficient. To give you an idea about what happens behind the scenes, the Asgardeo React SDK retrieves the public key of your {{product_name}} organization through the JWKS endpoint and uses it to verify whether the token has been signed by the private key of the {{product_name}} . If required, you can modify the JWKS endpoint and other parameters. 

```javascript title="src/main.jsx" hl_lines="9-11"

import { AuthProvider } from "@asgardeo/auth-react";

const authConfig = {
    clientID: "YOUR_CLIENT_ID",
    signInRedirectURL: "http://localhost:3000",
    signOutRedirectURL: "http://localhost:3000",
    baseUrl: "https://api.asgardeo.io/t/{org_name}",
    scope: [ "openid","profile"],
    endpoints: {jwksUri: "https://api.asgardeo.io/t/{org_name}/oauth2/token"}
    validateIDToken: true,
    clockTolerance: 60,
    ...
};


```

The Asgardeo React SDK also validates other attributes such as the issuer and expiration period, with a default clock tolerance of 60 seconds.

Once you have validated the ID token and the access token received from the IdP,  it's crucial to store them securely in the browser making sure the token can not be stolen from the storage to maintain the user state. 

There are several storage mechanisms available in the browser, such as Session Storage, Local Storage, Web Workers, and Browser Memory. By default, the Asgardeo SDK stores session information, including the access token, in Session Storage. However, this can be configured as per your requirements. Here is an example using Asgardeo React SDK.

```javascript title="src/main.jsx" hl_lines="9"
import { AuthProvider } from "@asgardeo/auth-react";

const authConfig = {
    clientID: "YOUR_CLIENT_ID",
    signInRedirectURL: "http://localhost:3000",
    signOutRedirectURL: "http://localhost:3000",
    baseUrl: "https://api.asgardeo.io/t/{org_name}",
    scope: [ "openid","profile"],
    storage: "sessionStorage"
    ...
};



```

The available storage options of Asgardeo React SDK includes localStorage, sessionStorage, webWorker, and browserMemory. WebWorker is the recommended storage option as it operates in a separate thread, providing better security by isolating the stored data from the main browser thread. This isolation makes it less vulnerable to cross-site scripting (XSS) attacks. However, the downside is that WebWorker storage is cleared when the page is reloaded, meaning the data doesn't persist across page reloads or browser sessions. As a result, the SDK will initiate a new authentication request to the IDP every time the page reloads. You may analyze the pros and cons of each storage type to determine the most suitable option for storing session information, including the access token. Striking a balance between user experience and security based on your application's needs is essential.
