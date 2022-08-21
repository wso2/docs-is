# Configure Username Recovery

The user account recovery feature implemented in the WSO2 Identity Server (WSO2 IS) helps to recover the username of the account if the user has forgotten it. This recovery process is also secured with captcha verification.

The service caller can define any number of claims that should be used in the user details verification. The first claim can be the email address and others can be the required attributes in the user registration such as first name or last name. This is helpful to search for a user if the system accepts multiple accounts with the same email address. Upon the successful verification of the user details, the user account ID is sent to the user by email.For this to be possible, the user needs to fill the details in their respective user profile such as email, first name, last name and any other required attributes.

!!! note
	WSO2 IS validates whether the user account is locked or disabled prior to account recovery. In addition, if any customization prior to account recovery such as checking the eligibility of the user for account recovery by validating certain conditions/ user claims is needed, WSO2 Identity Server provides an extension for that.

	WSO2 IS triggers the `PRE_ACCOUNT_RECOVERY` event prior to user account recovery using the WSO2 IS eventing framework. A custom event handler can be written upon which the `PRE_ACCOUNT_RECOVERY` event is triggered. For more information on how to write a custom handler and trigger an event, see [Writing a custom handler]({{base_path}}/develop/writing-a-custom-event-handler).

## Prerequisites

-   If you have migrated from a previous IS version, ensure that the `IdentityMgtEventListener` with the ` orderId=50 ` is set to **false** and that the Identity Listeners with ` orderId=95 ` and `orderId=97 ` are set to **true** in the `<IS_HOME>/repository/conf/deployment.toml ` file.
    
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

-   [Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

    !!! tip
        The **AccountConfirmation** template is used to send email notifications.

        You can edit and customize the email template. For more information on how to do this, see [Customizing Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails/).

## Enable username recovery

There are two ways to enable account recovery in WSO2 Identity Server.

### Enable username recovery for a specific tenant

1.	On the **Main** > **Identity** menu of the Management Console, click **Identity Providers** > **Resident**.

	<img src="{{base_path}}/assets/img/fragments/resident-menu-item.png" alt="Resident menu-item" width="200" style="border:1px solid grey">  

2.	Under the **Account Management** section, click **Account Recovery**.	

3.	Select the following checkboxes:
	-	**Username Recovery**
	-	**Manage notifications sending internally**

	<img src="{{base_path}}/assets/img/fragments/user-name-recovery-options.png" alt="User Name Recover options" width="600" style="border:1px solid grey">  	

4.	Click **Update**. 

### Enable username recovery globally

1. Open the `deployment.toml` file in the `IS_HOME/repository/conf` folder and add the following configuration:

    !!! tip
        To avoid any configuration issues, do this before starting the WSO2 Identity Server product instance.
        
    ``` toml
    [identity_mgt.username_recovery.email] 
    enable_username_recovery= true
    ```

    !!! note
        If you want to enable reCAPTCHA for username recovery, you can set `enable_recaptcha` true. See [Setting Up reCAPTCHA]({{base_path}}/deploy/configure-recaptcha) for more information.

        ``` toml
        [identity_mgt.username_recovery.email] 
        ...
        enable_recaptcha=true
        ...
        ```

2. You have now successfully configured reCAPTCHA for the username recovery flow.

## Try it out

### Recover username using the My Account application

1. Access the WSO2 Identity Server My Account (`https://<HOST>:<PORT>/myaccount`) application.

    !!! tip
        If you have changed the port offset or modified the hostname, change the port or hostname accordingly.

2.	Click **Username**.

    ![forgot-username]({{base_path}}/assets/img/using-wso2-identity-server/register-now-option.png)

3.	Enter the first name of the user and the tenant domain (use `carbon.super` as default).

    ![proceed-to-username-recovery]({{base_path}}/assets/img/using-wso2-identity-server/username-recovery.png)
    
4.	Click **Submit**. 

5.  Log in to the email account you provided in the user profile of the user you created above. You will see a new email with a username reset request.
    
6.  Follow the link provided in the email to reset the username. You can
    now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application
    successfully as the user you created above using the new username.

### Recover username using the REST API

You can use the following CURL command to recover a username using REST API.

####Request

```curl
curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '[{"uri": "http://wso2.org/claims/givenname","value": "[USERNAME]"},{"uri": "[CLAIM URI]", "value": "[CLAIM VALUE]"},{"uri": "[CLAIM2 URI]","value": "[CLAIM2 VALUE]" }]' "https://localhost:9443/api/identity/recovery/v0.9/recover-username/"
```

!!! abstract ""
    **Sample Request**
    ```curl -X POST -H "Authorization: Basic YWRtaW46YWRtaW4=" -H "Content-Type: application/json" -d '[{"uri": "http://wso2.org/claims/givenname","value": "kim"},{"uri": "http://wso2.org/claims/emailaddress", "value": "kim.anderson@gmail.com"},{"uri": "http://wso2.org/claims/lastname","value": "Anderson" }]' "https://localhost:9443/api/identity/recovery/v0.9/recover-username/"```
    ---
    **Sample Response**
    ```"HTTP/1.1 202 Accepted"```

---

!!! info "Related topics"
    [Concept: Users]({{base_path}}/references/concepts/user-management/users/)


