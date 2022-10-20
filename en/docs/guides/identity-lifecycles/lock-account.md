# Configuring Admin-Initiated Account Locking

WSO2 Identity Server enables privileged users to temporarily lock suspicious user accounts and prevent the users from logging in. These locked user accounts can only be unlocked by privileged users. 

## Scenario

**Pickup** is a cab company that has many employees who use different credentials to sign in to different internal enterprise applications. While **Sam** is an administrator at Pickup, **Larry** is a new recruit. Due to suspicious user activity, Sam wants to lock Larry's account.  

Let's learn how Sam can lock Larry's user account!

### Prerequisites
- You need to [add a user]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow/) named `Larry` with login permissions. Do not assign any roles to this user.

### Set up WSO2 IS

Follow the steps below to configure admin-initiated account locking in WSO2 Identity Server.

1. On the `<IS_HOME>/repository/conf/deployment.toml` file, check whether the following listener configs are in place.

      ``` toml
      [event.default_listener.identity_mgt]
      priority= "50"
      enable = false
      [event.default_listener.governance_identity_mgt]
      priority= "95"
      enable = true
      ```

2. Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to configure the email server to send emails requesting a password reset. 

      ```toml tab="Format"
      [output_adapter.email]
      from_address= ""
      username= ""
      password= ""
      hostname= "smtp.gmail.com"
      port= 587
      enable_start_tls= true
      enable_authentication= true
      ```

      ```toml tab="Sample"
      [output_adapter.email]
      from_address= "wso2iamtest@gmail.com"
      username= "wso2iamtest"
      password= "Wso2@iam70"
      hostname= "smtp.gmail.com"
      port= 587
      enable_start_tls= true
      enable_authentication= true
      ```

      **Note**
      
      - If you are using a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1). After you get an **App Password** from Google, update the `password`.
      - If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
      ```toml
      password= "<![CDATA[xxxx]]>"
      ```
      - For more information on configuring the email sending module, refer [Configure Email Sender]({{base_path}}/deploy/configure-email-sending/).

3. Save the configurations and restart WSO2 Identity Server.

### Configure account locking

To configure the account locking requirements:

1. On the **Management Console**, go to **Identity > Identity Providers > Resident**.

2. Expand **Login Attempt Security > Account Lock**.

3. Enable account locking by selecting the **Lock user accounts on maximum failed attempts** checkbox.

      <img src="{{base_path}}/assets/img/guides/account-locking-form-admin-initiated.png" alt="Account Locking form" width="700" style="border:1px solid grey">

4. Click **Update** to save the configurations.

### Configure account locking claims
To enable the account locking claim:

1. On the Management Console, go to  **Claims > List**.

2. Click **http://wso2.org/claims**.

3. Under **Account Locked** claim, click **Edit**.

4. Select **Supported by Default**.

      <img src="{{base_path}}/assets/img/guides/account-locked-claim-supported-by-default.png" alt="Account Locked claim's Suppported by Default option" width="700" style="border:1px solid grey">

5. Click **Update** to save the configurations.

## Try it out

Let us try out locking and unlocking a user profile.

### Lock a user account
To lock Larry's user account:

1. On the Management Console, go to **Users and Roles > List > Users**.

2. Click **User Profile** for Larry.

3. Select **default**, enter Larry's email address, and select the **Account Locked** checkbox.

      <img src="{{base_path}}/assets/img/guides/user-locked.png" alt="User Email option" width="700" style="border:1px solid grey">

4. Click **Update** to save the configurations.

      An email will be sent to Larry's email address informing him about the locking of the user account.

      <img src="{{base_path}}/assets/img/guides/account-locked-email.png" alt="Account Locked email" width="700" style="border:1px solid grey">

5. Access the WSO2 Identity Server's **My Account** portal at `https://localhost:9443/myaccount`.

6. Try to log in with Larry's credentials. Note that an error message appears.

7. Wait for 15 minutes and try to log in again. The WSO2 Identity Server's **My Account** home screen appears.  

### Unlock a user account

To unlock Larry's user account:

1. On the Management Console, go to **Users and Roles > List > Users**.

2. Click **User Profile** for Larry.

3. Deselect the **Account Locked** checkbox.

4. Click **Update** to save the configurations.

      An email will be sent to Larry's email address informing him about unlocking the user account.

      <img src="{{base_path}}/assets/img/guides/account-unlocked-email.png" alt="Account Unlocked email" width="700" style="border:1px solid grey">

5. Try to log in to the WSO2 Identity Server's **My Account** with Larry's credentials. The WSO2 Identity Server **My Account** home screen appears.

Larry will be able to successfully log in.