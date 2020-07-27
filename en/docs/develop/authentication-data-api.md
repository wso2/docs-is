# Authentication Data API

Authentication Data API provides REST services that are used to retrieve
endpoint parameters provided by the authentication framework or related
services.

These parameters may not be passed in the redirect URL due to one or
many of the following reasons.

-   Sensitivity of the values passed.
-   Complexity of the values passed.
-   Length of the parameters exceeding, or has the possibility of
    exceeding the allowed limits.
-   Compliance to certain business policies.

### Configuring Authentication Data API

To make these parameters available via the Authentication Data API, we
need to configure the Identity Server as follows.

1.  Configure the following parameters in the
    `                       deployment.toml                      `
    file in
    `                       <IS_HOME>/repository/conf                    `
    as per the descriptions provided below.

    ```toml
    [authentication.endpoint.redirect_params] 
    filter_policy = "include"    
    remove_on_consume_from_api = "true"
    parameters = [sessionDataKey]
    ```

    <table>
        <thead>
            <tr>
                <th>Field Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>filter_policy</td>
                <td>Value is either <b>include</b> or <b>exclude</b>. An include indicates an allowlist value, whereas an <b>exclude</b> indicates a denylist value.</td>
            </tr>
            <tr>
                <td>remove_on_consume_from_api</td>
                <td>The decides whether to remove the parameters on a read. If set to true, parameters are deleted upon read and won’t be available for subsequent API requests, unless they are repopulated at the backend.</td>
            </tr>
            <tr>
                <td>parameters</td>
                <td>The list of parameters to be allowed/denied. The name attribute is used to specify the parameter name.</td>
            </tr>
            <tr>
                <td>sessionDataKey</td>
                <td>
                    <p>This is an identifier used by the Identity Server to maintain state information related to this particular request by the service provider.</p>
                    <p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>The 'sessionDataKey' query parameter is used to coordinate the request state across components participating in the request flow. It does not correlate with the user session. Furthermore, the request state maintained against the 'sessionDataKey' parameter value is cleared by each participating component at the end of request flow. This means that even if an external party grabs the 'sessionDataKey' they will not be able to get into the authentication sequence, as the user session is not associated with that key.</p>
                        </div> 
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

2.  Restart the server.

### Using the API

The data can be accessible at
`                 https://<IS_HOST>:<PORT>/api/identity/auth/v1.1/data/<Type>/<Key>.                `

-   <Type\> - This refers to the key type that should be used. The
    value is **AuthRequestKey** for pages which directly communicate
    with the authentication framework using
    `                  sessionDataKey,                 ` and
    **OauthConsentKey** for the Oauth consent page which uses
    `                  sessionDataKeyConsent                 ` as the
    correlation key.
-   <Key\> - The correlation key whose value is either
    **sessionDataKey** or **sessionDataKeyConsent**.

### Authenticating the API

This API can be authenticated by following the steps given
[here](../../develop/authenticating-and-authorizing-rest-apis).

Following are the sample requests and responses using cURL.

**Request-1**

``` java
curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/AuthRequestKey/7a6886ab -b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
```

**Response-1**

``` java
{"paramKey1": "paramValue1","paramKey2": "paramValue2"}
```

**Request-2**

``` java
curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/OauthConsentKey/7a6886a b-b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
```

**Response-2**

``` java
{"paramKey1":"paramValue1","paramKey2":"paramValue2"}  
```
