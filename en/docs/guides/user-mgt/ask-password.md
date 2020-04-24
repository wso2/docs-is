# Creating Users Using the Ask Password and Email Verification Options

This section is about the user on-boarding flows initiated by
administrators which allow respective end users to decide their own
passwords or verify the accounts created by administrators. 

## On-boarding with Ask password

This process is initiated by the administrator when selecting **Ask
password from user** during the user creation process. This is different
from the default flow, in which the administrator decides the passwords
for users. Using the **Ask Password** option is the standard method for
user management as the administrator does not have to specify or remember passwords when creating an account for a user.

## On-boarding with email verification
There can be other cases where administrators need to on-board user
accounts to the system along with a default password (that is
communicated to the end-user via a trusted channel), and still wants the end
user to confirm that the account created for the user is correct. In
such cases administers can create users with the **Verify Email** feature.

When selecting either of these options, the administrator must enter an
**Email Address**. WSO2 Identity Server sends an email to this
  address with a redirection URL.

- In **Ask Password** flow, the URL sent in the email directs the users
  to a screen where they can provide the password for the account that
  was newly created for them by the administrator.
- In **Verify Email** flow, the URL sent in the email is a link which
  confirms the user upon access.


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
