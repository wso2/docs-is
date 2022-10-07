# Resource Owner Password Credentials Grant Type

The resource owner password credentials grant type is suitable in cases where the resource owner has a trust relationship
with the client (e.g., a service’s own mobile client) and in situations where the client can obtain the resource owner’s
credentials.

---

## How does it work?

Instead of redirecting the user to the authorization server, the client itself will prompt the user for the resource
owner's username and password. The client will then send these credentials to the authorization server along with the
client’s own credentials.

![Password grant flow]({{base_path}}/assets/img/concepts/password-grant-flow.png)

One of the following cURL commands can be used to try this grant type.

!!! abstract ""
    **Request 1**
    ``` java
    curl -v -X POST -H "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" -H "Content-Type:application/x-www-form-urlencoded" <TOKEN_ENDPOINT>
    ```
    ---
    **Request 2**
    ``` java
    curl -u <CLIENT_ID>:<CLIENT_SECRET> -k -d "grant_type=password&username=<USERNAME>&password=<PASSWORD>" -H "Content-Type:application/x-www-form-urlencoded" <TOKEN_ENDPOINT>
    ```
    ---
    You will receive a response similar to the format below.

    **Response**

    ```
    {
        "token_type":"Bearer",
        "expires_in":2510,
        "refresh_token":"5ba3dedc77581df5f84f9b228eef0b91",
        "access_token":"ca19a540f544777860e44e75f605d927"
    }
    ```

!!! info "Support for refresh token grant"
	This grant type issues a refresh token which can be used to obtain new access tokens using the [refresh token grant]({{base_path}}/references/concepts/authorization/refresh-token-grant).

!!! info "Related topics"
        - [Guide: Password Grant]({{base_path}}/guides/access-delegation/password-playground/)