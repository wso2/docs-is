# Using the Self Sign-Up REST APIs

!!! tip    
    For information on configuring self-sign up using REST APIs, see the [swagger docs on Self Registration REST APIs](https://api-docs.wso2.com/apidocs/is/is511/selfregister-v5.11.0/).
    

!!! info "Related Links" 
    For information on self-registration via the UI instead, see [Self-Registration and Account Confirmation](../../learn/self-registration-and-account-confirmation).

## Enhance the default permission for the resend-code endpoint.

Update the default permission for the resend-code endpoint in the Self-Sign-up API to utilize identity management permissions prior to production deployment.

Add the following properties to the `deployment.toml` file.

```toml
[resource.access_control]
context = "(.*)/api/identity/user/v1.0/resend-code(.*)"
secure = "true"
http_method = "all"
permissions=["/permission/admin/manage/identity/identitymgt"]
scopes=["internal_identity_mgt_view","internal_identity_mgt_update","internal_identity_mgt_create","internal_identity_mgt_delete"]
```