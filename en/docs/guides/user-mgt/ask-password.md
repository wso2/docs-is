# Creating Users Using the Ask Password and Email Verification Options

This section is about the user on-boarding flows initiated by
administrators which allow respective end users to decide their own
passwords or verify the accounts created by administrators. For more information, see [Ask Password and Email Verification](insert-link-concepts)

## Configuring the feature

Follow the instructions given below to configure the ask password
feature.

??? Warning "Click to see instructions specific for a migrated deployment" 
    If you have migrated from a previous IS version, ensure that
    the `IdentityMgtEventListener` with the ` orderId=50 ` is set to
    **false** and that the Identity Listeners with ` orderId=95 ` and `orderId=97 ` are set to **true** in the `<IS_HOME>/repository/conf/deployment.toml ` file.
       
    !!! Note 
        If there are no such entries for `event.default_listener.xxx` in `deployment.toml`, you can skip this configuration. 
        
    ``` toml
    [event.default_listener.identity_mgt]
    priority= "50"
    enable = false
    [event.default_listener.governance_identity_mgt]
    priority= "95"
    enable = true
    [event.default_listener.governance_identity_store]
    priority= "97"
    enable = true
    ```
---

## Enable the ask password feature using the admin portal

{!fragments/xxx!}

---

## Enable the ask password feature using SCIM

You can use both the **Ask Password** and **Verify Email** features when
creating a user using SCIM 2.0.

### Ask Password
    
Set the **askPassword** attribute under the`
urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to
true in the SCIM2 user create request. 

```java
"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}
```
    
!!! Example "A sample curl command is given below:"
    ``` java
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Paul"},"userName":"Paul","password":"password","emails":[{"primary":true,"value":"paul@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```

### Verify Email
    
Set the **verifyEmail** attribute under the`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to
true in the SCIM2 user create request. 

```java
"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}
```
    
!!! Example "A sample curl command is given below:"
    ``` java
    curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Peter"},"userName":"Peter","password":"password","emails":[{"primary":true,"value":"peter@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```
    
!!! info "Related Links"
    -   For information on how to edit an existing email template, see [Email Templates](insert-email-templates).
    -   See [Configuring Claims](insert-configuring-claims) for more information on how to store
        the claim values in the user store.
