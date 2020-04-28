# Resend Account Recovery Confirmation Email

## Resend confirmation Email using the admin portal 

{!insert-fragment!} 

---

## Resend confirmation Email using REST APIs

The following curl command can be used to resend the confirmation code. 

```curl     
curl -X POST -H "Authorization: Basic <Base64Encoded_username:password>" -H "Content-Type: application/json" -d '{"user":{"username": "<username>","realm": "<user_store_name>"},"properties": []}' "https://localhost:9443/api/identity/user/v1.0/resend-code"
```

```curl tab="Sample Request"
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '{"user":{"username": "kim","realm": "PRIMARY"},"properties": []}' "https://localhost:9443/api/identity/user/v1.0/resend-code"
```

```curl tab="Sample Response"
"HTTP/1.1 201 Created"
```

