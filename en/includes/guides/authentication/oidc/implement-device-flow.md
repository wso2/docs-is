# Implement login using the Device Authorization flow

See the instructions given below to implement login with OpenID Connect in your application by using the device authorization flow.

Refer [how the device authorization flow work]({{base_path}}/references/grant-types/#device-authorization-grant) for more information.

## Prerequisites

1. You need to have an application registered in {{ product_name }}. If you don't already have one, register a [standard-based OIDC application]({{base_path}}/guides/applications/register-standard-based-app/).

2. Create a [user account]({{base_path}}/guides/users/manage-users/).

3. (Optional) Update device flow configurations.

    ??? note "Device flow configurations"
        The device authorization grant is available by default in WSO2 Identity Server. If you need to update configurations, navigate to `<IS_HOME>/repository/conf/deployment.toml` and update the configurations in `[oauth.grant_type.device_code]` section as required.

        ```
        [oauth.grant_type.device_code]
        key_length = 7
        expiry_time = "10m"
        polling_interval = "5s"
        key_set = "BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz23456789"
        ```

        | Parameter | Description   |
        |-----------|---------------|
        | `key_length`  | The length of the user code.  |
        | `expiry_time` | The expiry time of the user code and the device code. |
        | `polling_interval`    | The minimum delay of the client between each polling request to the token endpoint.   |
        | `key_set`   | The set of characters that is used to generate the user code.   |

## Get the required codes
First, your app must initiate a login request to the authorization endpoint of {{ product_name }}. After redirecting to {{ product_name }}, the user should be prompted with a login page if the user is not authenticated.

!!! abstract ""
    **Device authorization endpoint**
    ```
    {{ product_url_format }}/oauth2/device_authorize
    ```
    ---
    **Request format**
    ``` shell
    curl -k -X POST
    -H 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<CLIENT_ID>'
    https://localhost:9443/oauth2/device_authorize

    ```
    ---
    **Request sample**
    ``` shell
    curl -k -X POST 
    -H 'Content-Type: application/x-www-form-urlencoded' 
    --data-urlencode 'client_id=bbwJEayR_OMwPkAgm9VOMzLnYLga' 
    https://localhost:9443/oauth2/device_authorize
    ```

Upon successful execution of the request, the WSO2 Identity Server returns the `user_code`, `devicce_code` and the `verification_uri` to the client device.

**Sample response**

```
{
    "user_code":"s2DqSNK",
    "device_code":"d3fe0db1-2334-48fa-b7d9-821ecfad10d5","interval":5000,"verification_uri_complete":"https://localhost:9443/authenticationendpoint/device.do?user_code=s2DqSNK",
    "verification_uri":"https://localhost:9443/authenticationendpoint/device.do",
    "expires_in":3600
}
```

## Authorize the client device

The client device shows the received codes and the verification URI to the user.

To authorize the client device:

1. The user accesses the `verification_uri` through a device with no input constraints.
2. The user enters the `user_code` on the prompted window.

    ![Enter device cpde prompt]({{base_path}}/assets/img/guides/applications/oidc/device-code-enter.jpg){: width="400" style="border: 0.3px solid lightgrey;"}

    !!! note
        The user code is for one-time use only. If your code is expired or if you have entered a wrong user code, get a new user code by following the previous steps.

3. If step 2 is successful, the user will be prompted to enter credentials. Enter credentials and click **Continue**.

Once you log in successfully, the user will be redirected to the configured callback URL of the service provider.

## Get access token

While the user reviews the authorization request, the client device keeps polling the token endpoint.

Use the following cURL to obtain an access token

!!! abstract ""
    **Token endpoint**
    ```
    {{ product_url_format }}/oauth2/token
    ```
    ---
    **Request format**
    ``` shell
    curl -k -X POST
    -H 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code'
    --data-urlencode 'client_id=<CLIENT_ID>'
    --data-urlencode 'device_code=<DEVICE_CODE>'
    https://localhost:9443/oauth2/token
    ```
    ---
    **Request sample**
    ``` shell
    curl -k -X POST
    -H 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code'
    --data-urlencode 'client_id=bbwJEayR_OMwPkAgm9VOMzLnYLga'
    --data-urlencode 'device_code=7411f395-2f3a-4cb5-8562-d7059d69c66f'
    https://localhost:9443/oauth2/token
    ```

**Sample response**

```
{
    "access_token":"74d610ab-7f4a-3b11-90e8-279d76644fc7",
    "refresh_token":"fdb58069-ecc7-3803-9b8b-6f2ed85eff19",
    "token_type":"Bearer",
    "expires_in":3042
}
```