# Self Registration 

## Self register using the user portal 

TODO: user-portal-fragment

---

TODO : Add details on SCIM ME endpoint

## Self register using REST APIs

The following CURL command can be used to self register.  

### Register user

**Request**

```curl 
curl -X POST -H "Authorization: Basic <Base64Encoded_username:password>" -H "Content-Type: application/json" -d '{"user": {"username": "<username>","realm": "<user_store>", "password": "<password>","claims": [{"uri": "<claim_URI>","value": "<claim_value>" },{"uri": "<claim_URI2>","value": "<claim_value2>"},{"uri": "<claim_URI3>","value": "<claim_value3>"},{"uri": "<claim_URI4>","value": "<claim_value4>"} ] },"properties": []}' "https://localhost:9443/api/identity/user/v1.0/me"
```

```curl tab="Sample Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user": {"username": "kim","realm": "PRIMARY", "password": "Password12!","claims": [{"uri": "http://wso2.org/claims/givenname","value": "kim" },{"uri": "http://wso2.org/claims/emailaddress","value": "kim.anderson@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Anderson"},{"uri": "http://wso2.org/claims/mobile","value": "+947721584558"} ] },"properties": [{"key":"callback","value": "https://localhost:9443/authenticationendpoint/login.do"}]}' "https://localhost:9443/api/identity/user/v1.0/me"
```

```curl tab="Sample Response"
"HTTP/1.1 201 Created"
``` 

!!! info 
    - [Self Register](TODO:insert-link-to-rest-apis)
    - [Admin Creation Workflow](TODO: dev-portal-fragment) 
    - [Invitation Workflow](../../onboard/ask-password) 
    - [Just in Time User Provisioning Workflow](../../onboard/user-account-overview)
    - [Bulk Import Users](../../onboard/import-users)
    - [Outbound Provisioning](../../out-prov/outbound-provisioning) 