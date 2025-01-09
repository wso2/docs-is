# Using the Self Sign-Up REST APIs

!!! tip    
    For information on configuring self-sign up using REST APIs, see the [swagger docs on Self Registration REST APIs](https://api-docs.wso2.com/apidocs/is/is510/self-registration/).
    

!!! info "Related Links" 
    For information on self-registration via the UI instead, see [Self-Registration and Account Confirmation](../../learn/self-registration-and-account-confirmation).

## Enhance default permissions for the resend-code endpoint.

The [resend-code endpoint](https://api-docs.wso2.com/apidocs/is/is510/self-registration/#!/operations#SelfRegister#resendCodePost) of the self sign-up rest APIs is used to resend the confirmation code to an authenticated user. While no scopes are required to invoke this API by default, we recommend restricting access to this endpoint using scopes, before deploying to production.

To do so, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file


```toml
[resource.access_control]
context = "(.*)/api/identity/user/v1.0/resend-code(.*)"
secure = "true"
http_method = "all"
permissions=["/permission/admin/manage/identity/identitymgt"]
scopes=["internal_identity_mgt_view","internal_identity_mgt_update","internal_identity_mgt_create","internal_identity_mgt_delete"]
```