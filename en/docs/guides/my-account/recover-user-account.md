# Recover User Account

The account recovery feature implemented in WSO2 IS helps to recover the user account if the user has forgotten the username or password. This recovery process is also secured with captcha verification.

The main part of account recovery is setting up security or challenge questions for user accounts. With the WSO2 IS, users can set up challenge questions in different languages.

**My Account** allows users to add and update their challenge questions and update the email address that they can use to recover their accounts when required. Follow the instructions given below to use the account recovery options available in **My Account** more effectively.

## Add security questions

1.  Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2.  Click **Security tab** on the side panel.
3.  Under the **Account recovery** sub section, click on the **add** button aligning with the **security questions** section.
    
    !!! note 
        For a user to handle password recovery based on security questions via the **My Account** application, the admin should have previously enabled the **Security question based password recovery** option in the Managament Console. Follow the instructions given below if you cannot view the **Account recovery** option in **My Account**. 

        1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).
        2.  Navigate to **Main** > **Identity** > **Identity Providers** > **Resident**. 
        3.  Expand **Account Management** > **Account Recovery**. 
        4.  Enable **Security question based password recovery**. 
        5.  Click **Update**.

4.  Select two questions from the sets questions given in the dropdown list and enter a unique answer only known to you. Make sure to remember these answers as they will be used to recover the account when required.
5.  Click on **Save** to submit the configured questions and answers.

## Update security questions

1. Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2. Click the **Security** tab on the side panel.
3. Under the **Account recovery** sub section, click on the edit icon aligning with the security question that needs to be updated.
4. Select a new question and add an answer, or just update the answer to the question that was previously chosen and click on **Save**.

## Add recovery email

1.  Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2.  Click the **Security** tab on the side panel.
3.  Click on the edit button aligning with the **Email recovery** section.
    
    !!! note 
        For a user to handle email reecovery via the **My Account** application, the admin should have previously enabled the **Notification based password recovery** option in the Managament Console. Follow the instructions given below if you cannot view the **Email recovery** option in **My Account**. 

        1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).
        2.  Navigate to **Main** > **Identity** > **Identity Providers** > **Resident**. 
        3.  Expand **Account Management** > **Account Recovery**. 
        4.  Enable **Notification based password recovery**. 
        5.  Click **Update**.

4. Enter a preferred email address as the recovery email and click **update**.

    !!! info
        This will be added as the email address in user profile.

## Update recovery email

1. Access **My Account** (https://<IS_HOST>:<PORT>/myaccount).
2. Click the **Security** tab on the side panel.
3. Click on the **edit** button with the pencil icon aligning with the **Email recovery** section.
4. Edit the email address that is already used as the recovery mail and click on the **update** button.

    !!! info
        This will update the email address in the profile as well.