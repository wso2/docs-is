# Scope-based Authorization for Internal REST APIs

WSO2 Identity Server supports API authentication using 
OAuth2 common flows, where users can obtain a token using an 
oauth2 flow dand use it to invoke the API.

Authorization for the APIs in WSO2 Identity Server is enforced
at the endpoint level using **permissions**. Each secured endpoint
has a predefined minimum level of permission that is required to be
able to consume the endpoint. In order to access a particular endpoint,
the user has to belong to a **role** that includes the defined
permissions. WSO2 Identity Server now supports scope-based API
authorization for internal REST APIs.

When obtaining a token to consume the API, you can define the scope
corresponding to the permission required to consume the API.

For example, let's assume that a user whose username is Alex, wants to 
retrieve the challenges available by calling the **/{user-id}/challenges** GET API available in [Challenge Question](../../develop/challenge-rest-api) REST API. This requires the user-id as an input. 
To retrieve the challenges, Alex requires `/permission/admin/manage/identity/identitymgt/view`
permission and `internal_identity_mgt_view` scope. Hence, Alex can invoke the following 
cURL command with `scope=internal_identity_mgt_view` and obtain a token.

``` java tab="Request"
curl -v -X POST -H "Authorization: Basic <base64encoded clientId:clientSecrect>" -k -d "grant_type=password&username=alex&password=alex123&scope=somescope" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` java tab="Sample Request"
curl -k -X POST -H "Authorization: Basic MUxGVzl5NERkYzZxaHVGQnBLX1JyOHA0WU1FYTpDUGl5V0hTeVp6VmJmRTFzanFNc2Vrc053Szhh" -k -d "grant_type=password&username=alex&password=alex123&scope=internal_identity_mgt_view" -H "Content-Type: application/x-www-form-urlencoded" 'https://localhost:9443/oauth2/token'
```

When the above cURL command is called, a token of the following format
will be generated. If the user that requests the token has sufficient
permissions to the scope defined in the request, the response will contain
the scope specified in the above command. 


``` java tab="Sample Response"
{"access_token":"bf01d540-fa67-314f-9ff3-3ed5ef9fa5bd",
"Refresh_token":"dc3906cc-34f9-376c-a6f4-1c2e6b9626c7",
"Scope":"internal_identity_mgt_view",
"token_type":"Bearer",
"expires_in":3600}
```

If the response with the generated token contains the scope specified in the
cURL request, the received access token can be used to consume the API that
requires the particular scope.

!!! note
    If you want to obtain a token with all the scopes corresponding to the permissions assigned to the user, 
    you can use **scope=SYSTEM**. It will generate a token with all the scopes corresponding to the permissions of the user.   
   
!!! info "Related Links"
    -   See [Scopes Corresponding to Permissions Required to Invoke API Calls](../../references/scopes-corresponding-to-api-permissions) 
    for a list of scopes corresponding to the permissions required for different REST APIs.
    -   You can find the permissions and scopes required for each REST API under API description in the corresponding
    API Documentation in the [REST APIs](../../develop/rest-apis) section.
