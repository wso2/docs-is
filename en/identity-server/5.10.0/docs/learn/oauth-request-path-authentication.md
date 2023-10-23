# OAuth Request Path Authenticator

The OAuth Request Path Authenticator is engaged when an access token is
sent along with a request for authentication. If the access token is
valid, the user is authenticated by the authentication framework and the
corresponding response builder takes over. The access token can be sent
to the OAuth request path authenticator in two ways.

-   **As a header in the authentication request:**
    `          "Authorization: Bearer <access_token>"         `
-   **As a query parameter in the request URL:**
    `          "&access_token=<access_token>"         `

For more information on Request Path Authentication in general, see
[Request Path Authentication](../../learn/request-path-authentication).

!!! note
    
    Prerequisite
    
    RequestPath authentication will only skip the login page and not the consent page.
    You can skip the user consent page. 
    You can use any of the following procedure,
    
    * You can skip consent for a particular request by sending prompt attribute 
    with value `none` in the authorization request
    * You can skip the consent for a service provider by enabling the 'Skip Consent'
     in service provider
    ![](../assets/img/tutorials/skip-consent-per-sp.png)

    * You can provide "approve always" consent for the an application
    and user before sending the request.
    
    * You can configure the following `<IS_HOME>/repository/conf/deployment.toml` file
     which will disable promt consent for all service providers system wide
    ```toml
    [oauth]
    consent_prompt=false
    ```
    
### Using the authorization header

1.  Start the IS server and login to the management console.
2.  Navigate to **Service Providers\>Add**, enter a name for the new
    service provider and click **Add.**
3.  Expand the **Inbound Authentication Configuration** section, then
    the **OAuth2/OpenID Connect Configuration** and click **Configure.**
    For more information, see [Configuring OAuth/OpenID
    Connect](../../learn/configuring-oauth2-openid-connect-single-sign-on).

    Use the following **Callback URL** when configuring OAuth:
    [https://curl-app/callback](https://www.google.com/url?q=https%3A%2F%2Fcurl-app%2Fcallback&sa=D&sntz=1&usg=AFQjCNFg_ALm4TWPOaAI9WC2YYeVsjmcZA)
    .

4.  Click **Add** and take note of the **Client Key** that is generated
    as you will need this later on.  
    ![auth-header-client-key](../assets/img/using-wso2-identity-server/auth-header-client-key.png)
5.  Expand the **Local & Outbound Authentication Configuration** section
    and then the **Request Path Authentication Configuration** section.
6.  Select **oauth-bearer** from the dropdown and click **Add.**  
    ![oauth-bearer](../assets/img/using-wso2-identity-server/oauth-bearer.png)
7.  Click **Update** to save changes to the service provider.

8.  Use the following cURL command to get a valid token using password
    grant type. Replace the
    **`            <CLIENT_ID>:<CLIENT_SECRET>           `** tags with
    the client key and client secret of your service provider.

    **Request**

    ``` shell
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=USERNAME&password=PASSWORD" https://localhost:9443/oauth2/token
    ```

    **Response**

    ``` shell
    {"token_type":"Bearer","expires_in":2655,"refresh_token":"2f03de95b8e196f78c94d07c23c9ef0a","access_token":"7ee57bc28a3336ccb7818b499941e4e4"}
    ```

9.  Send a cURL request using the access token you received as a
    response for step1 in the authorization header, to the token
    endpoint. Replace the **`            <CLIENT_ID>           `** and
    **`            <REDIRECT_URI>           `** tags with the relevant
    values.

    **Request**

    ``` shell
    curl -v -X POST -H "Authorization: Bearer 7ee57bc28a3336ccb7818b499941e4e4" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid"  https://localhost:9443/oauth2/authorize
    ```

    **Response**

    ``` shell
    Location: https://curl-app/callback?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
    ```

10. Use the following cURL command to get an access token using the
    authorization code received in step2. Replace the
    **`            <CLIENT_ID>:<CLIENT_SECRET>,<CLIENT_ID>           `**
    and **`            <REDIRECT_URI>           `** tags with the
    relevant values.

      

    **Request**

    ``` shell
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET>  -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&code=37c79c505960e90d5b25f62ce760c98c&scope=openid" https://localhost:9443/oauth2/token
    ```

    **Response**

    ``` shell
    { "scope":"openid", "token_type":"Bearer", "expires_in":3600, "refresh_token":"70f202ca2e4ecf571d0b6d2e49af8f3a", "id_token":"eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NjA0NTkzMTYsImV4cCI6MTQ2MDQ2MjkxNiwic3ViIjoiYWRtaW4iLCJhenAiOiJlN2VrQldVTVBITnFTNU5WQmhxNGhmNWZqMkVhIiwiYXRfaGFzaCI6IkhCWFVKQW50LWFMV3JxQlZJcTFoV2ciLCJhdWQiOlsiZTdla0JXVU1QSE5xUzVOVkJocTRoZjVmajJFYSJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJpYXQiOjE0NjA0NTkzMTZ9.PiqVn7B2vuICHmodnn9udjQrvGqRR-PZr-M8x8Xijg0bnAvzXY4hxqZ5luaLitBH2IgQ5p0Rh_gjPI7TWcQA7AK3iBCp7c29QY78hSSqt38_iG5bC0MYWoluH-jg5f3iyJ3aQ-DPAZexCXxEv65RPF5EDNfhA0fUFcsu79cb89k", "access_token":"7d6c01fb6bfaca22f01d9a24219cce45" }
    ```

    !!! troubleshoot  
        If you haven't disabled the consent as pointed above, then the response
        for the above step 9 will be as follows:
    
        ``` shell
        Location: https://localhost:9443/authenticationendpoint/oauth2_consent.do?loggedInUser=admin&application=plagroundapp&scope=openid&sessionDataKeyConsent=a14f4a5d-16bb-4e47-9c53-5eacee9828f2&spQueryParams=
        ```
    
        This is the consent page which will require the user interaction to
        either approve or deny the authorization request. You can go to the
        above consent page url via a web browser and provide approve or
        deny.Then the url will be redirected to
        ``` shell
        https://curl-app/callback?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
        ```
        
### Using the request URL

-   To try out request path authentication by sending the access token
    as a query parameter in the request URL with the WSO2 Playground
    sample, see [Try Request Path
    Authentication](../../learn/try-request-path-authentication).
