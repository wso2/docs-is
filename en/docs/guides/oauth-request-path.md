# Authenticate with OAuth Request Path Authenticator

This page guides you through using the request path authenticator for [token-based authentication](TODO:insert-link-to-concept). 
The OAuth Request Path Authenticator is engaged when an access token is sent along with a request for authentication.

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../quick-starts/oauth-request-path-sample" rel="nofollow noopener">Try it with the sample</a>


----

(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

----

{!fragments/local-outbound-for-request-path-oauth.md!}

----

## Configure the client application
Send the following requests via your application to connect your application to WSO2 IS.

1. Use the following cURL command to get a valid token using password grant type. Replace the `<CLIENT_ID>`:`<CLIENT_SECRET>` tags with the client key and client secret of your service provider.

    ```tab="Request Format"
        curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET> -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=USERNAME&password=PASSWORD" https://localhost:9443/oauth2/token
    ```

    ```tab="Response Format"
       {"token_type":"Bearer","expires_in":2655,"refresh_token":"2f03de95b8e196f78c94d07c23c9ef0a","access_token":"7ee57bc28a3336ccb7818b499941e4e4"}
    ```

2. Send a cURL request using the access token you received as a response for step1 in the authorization header, to the token endpoint. Replace the `<CLIENT_ID>` and `<REDIRECT_URI>` tags with the relevant values.

    ```tab="Request Format"
       curl -v -X POST -H "Authorization: Bearer 7ee57bc28a3336ccb7818b499941e4e4" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&scope=openid"  https://localhost:9443/oauth2/authorize
    ```

    ```tab="Response Format"
       Location: https://curl-app/callback?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
    ```
    
3. Use the following cURL command to get an access token using the authorization code received in step2. Replace the `<CLIENT_ID>`:`<CLIENT_SECRET>`,`<CLIENT_ID>` and `<REDIRECT_URI>` tags with the relevant values.

    ```tab="Request Format"
    curl -v -X POST --basic -u <CLIENT_ID>:<CLIENT_SECRET>  -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&client_id=<CLIENT_ID>&redirect_uri=<REDIRECT_URI>&code=37c79c505960e90d5b25f62ce760c98c&scope=openid" https://localhost:9443/oauth2/token
    ```
 
    ```tab="Response Format"
    { "scope":"openid", "token_type":"Bearer", "expires_in":3600, "refresh_token":"70f202ca2e4ecf571d0b6d2e49af8f3a", "id_token":"eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NjA0NTkzMTYsImV4cCI6MTQ2MDQ2MjkxNiwic3ViIjoiYWRtaW4iLCJhenAiOiJlN2VrQldVTVBITnFTNU5WQmhxNGhmNWZqMkVhIiwiYXRfaGFzaCI6IkhCWFVKQW50LWFMV3JxQlZJcTFoV2ciLCJhdWQiOlsiZTdla0JXVU1QSE5xUzVOVkJocTRoZjVmajJFYSJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJpYXQiOjE0NjA0NTkzMTZ9.PiqVn7B2vuICHmodnn9udjQrvGqRR-PZr-M8x8Xijg0bnAvzXY4hxqZ5luaLitBH2IgQ5p0Rh_gjPI7TWcQA7AK3iBCp7c29QY78hSSqt38_iG5bC0MYWoluH-jg5f3iyJ3aQ-DPAZexCXxEv65RPF5EDNfhA0fUFcsu79cb89k", "access_token":"7d6c01fb6bfaca22f01d9a24219cce45" }
    ```
 
    !!! Troubleshooting Tip 
            If you have not disabled consent, the response will be as follows.
        
            ``` 
            Location: https://localhost:9443/authenticationendpoint/oauth2_consent.do?loggedInUser=admin&application=plagroundapp&scope=openid&sessionDataKeyConsent=a14f4a5d-16bb-4e47-9c53-5eacee9828f2&spQueryParams=
            ```
        
            The consent page URL given in the response is the consent page that requires user interaction to either approve
            or deny the authorization request. You can access the consent page URL via a web browser and either approve or
            deny consent. The URL will then be redirected to the following page.
            
            ```
            https://curl-app/callback?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
            ```
------

!!! info "Related Links"
     -   [Concept: Token-Based Authentication](TODO:link-to-concept)
     -   [Demo: Authentication with OAuth Request Path Authenticator](../../quick-starts/oauth-request-path-sample)
     -   [Guide: Authenticate with Basic Auth Request Path Authenticator](../..guides/basic-auth-request-path)
     -   [Demo: Enable Authentication with Basic Auth Request Path Authenticator](../../quick-starts/basic-auth-request-path-sample)

           