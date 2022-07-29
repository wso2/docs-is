# Authentication Data API

Authentication Data API provides REST services that are used to retrieve
endpoint parameters provided by the authentication framework or related
services.

These parameters may not be passed in the redirect URL due to one or
many of the following reasons.

- Sensitivity of the values passed.
- Complexity of the values passed.
- Length of the parameters exceeding, or has the possibility to exceed the allowed limits.
- Compliance to certain business policies.

These parameters will be made available via the Authentication Data API.

## Configure Authentication Data API

To configure the Authentication Data API:

1. Open the **deployment.toml** file found in the **IS_HOME/repository/conf** directory.

2. Add the following configurations.

    ```toml
    [authentication.endpoint.redirect_params] 
    filter_policy = "include"    
    remove_on_consume_from_api = "true"
    parameters = ["sessionDataKey"]
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
                <td>The value is either <b>include</b> or <b>exclude</b>. An include indicates an allowlist value, whereas an <b>exclude</b> indicates a denylist value.</td>
            </tr>
            <tr>
                <td>remove_on_consume_from_api</td>
                <td>This decides whether to remove the parameters on a read. If set to true, parameters are deleted upon read and won’t be available for subsequent API requests, unless they are repopulated in the backend.</td>
            </tr>
            <tr>
                <td>parameters</td>
                <td>The list of parameters to be allowed/denied. The name attribute is used to specify the parameter name.</td>
            </tr>
            <tr>
                <td>sessionDataKey</td>
                <td>
                    <p>This is an identifier used by the Identity Server to maintain state information about this particular request from the service provider.</p>
                    <p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>The <b>sessionDataKey</b> query parameter is used to coordinate the request state across components participating in the request flow. <br />
                        <br/>
                        The <b>sessionDataKey</b> does not correlate with the user session and at the end of the request flow, the request state maintained against it is cleared by each participating component.
                        <br/>
                        <br/>
                        This means that even if an external party grabs the <b>sessionDataKey</b> they will not be able to get into the authentication sequence.
                        </div>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

2. Restart the server.

---

## Use the API

The authentication data is accessible at: <br/>
**https://{IS_HOST}:{PORT}/api/identity/auth/v1.1/data/{Type}/{Key}**

-   **{Type}** - One of the following key types.
    <table>
        <tr>
            <td><b>AuthRequestKey</b></td>
            <td>For pages which directly communicate with the authentication framework using `sessionDataKey`</td>
        </tr>
        <tr>
            <td><b>OauthConsentKey</b></td>
            <td>For Oauth consent pages which use `sessionDataKeyConsent` as the correlation key</td>
        </tr>
    </table>
    
-   **{Key}** - The correlation key which is either the **sessionDataKey** or **sessionDataKeyConsent**.

Following are the sample requests and responses of the API using cURL.
!!! info
    To authenticate to the API, pass the Authorization header as **Basic Base64(username:password)**

!!! abstract ""
    **Request**
    ``` curl
    curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/AuthRequestKey/7a6886ab -b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
    ```
    ---
    **Response**
    ``` curl
    {"paramKey1": "paramValue1","paramKey2": "paramValue2"}
    ```

!!! abstract ""
    **Request**
    ```curl
    curl -k -X GET "https://localhost:9443/api/identity/auth/v1.1/data/OauthConsentKey/7a6886a b-b02f-424f-9cd4-adf5e92f0798" -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "accept: application/json"
    ```
    ---
    **Request**
    ``` curl
    {"paramKey1":"paramValue1","paramKey2":"paramValue2"}  
    ```
