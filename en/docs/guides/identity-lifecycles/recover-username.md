# Recover Username

## Recover username using the user portal 

{!insert-fragment!}

---

## Recover username using the REST API

You can use the following CURL command to recover a username using REST API. 

**Request**

```curl 
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '[{"uri": "http://wso2.org/claims/givenname","value": "[USERNAME]"},{"uri": "[CLAIM URI]", "value": "[CLAIM VALUE]"},{"uri": "[CLAIM2 URI]","value": "[CLAIM2 VALUE]" }]' "https://localhost:9443/api/identity/recovery/v0.9/recover-username/"
```

```curl tab="Sample Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '[{"uri": "http://wso2.org/claims/givenname","value": "kim"},{"uri": "http://wso2.org/claims/emailaddress", "value": "kim.anderson@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Anderson" }]' "https://localhost:9443/api/identity/recovery/v0.9/recover-username/"
```

```curl tab="Sample Response"
"HTTP/1.1 202 Accepted" 
```

