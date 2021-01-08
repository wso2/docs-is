#Account Pending Status

This feature places users in a pending status when the process of self registration, email verification 
or ask password has been initiated and the confirmation mail has been sent, but the email has not been verified yet. 
The status claim will be set depending on the flow. 

!!! Note
    - For more details on self registration, see [Self-Registration and Account Confirmation](../../learn/self-registration-and-account-confirmation). 
    - For more details on ask password, see [Creating Users Using the Ask Password Option](../../learn/creating-users-using-the-ask-password-option).
    
    
With this improvement, in all these three features, self-registration, email verification and ask password, once a 
confirmation email is sent, the users will be moved to a pending state. The status claim will be set depending on the flow.  

## Adding a new claim
In order to keep track of the users’ account states, an identity claim (http://wso2.org/claims/identity/accountState) 
is introduced. This stores the users’ account states. 

![account-state-claim](../assets/img/learn/account-pending-state.png) 

Refer this documentation on [how to add claim mapping with WSO2 Identity Server](../../learn/adding-claim-mapping).

AccountState should be a readOnly claim. It cannot be updated even by the admin user.
In the older IS versions before IS5.7.0, Identity Server used to send two mails upon user self registration, ask password
 and email verification if  Account Lock feature is also Enabled. 
    - Confirmation mail
    - Account Lock mail

With this improvement, these flows will send only confirmation mail if accountState claim is engaged and the user is in 
PENDING state (PENDING_AP, PENDING_EV,PENDING_SR).
Once the user confirms the email, the state will be moved to UNLOCKED.
 
This account status can have the following values.

    1. LOCKED
    2. PENDING_AP
    3. PENDING_EV
    4. PENDING_SR:
    5. DISABLED
    6. UNLOCKED
 
Find the description of the status

| State                 | Description                                                       | 
| --------------------- | ------------------------------------------------------------                                    | 
| LOCKED                | Account is locked and not disabled.                               |
| PENDING_AP            | Ask password email is sent and the email is not verified          | 
| PENDING_EV            | Email Verification email is sent and the email is not verified    | 
| PENDING_SR            | Self registration email is sent and the email is not verified yet | 
| DISABLED              | Account is disabled                                               | 
| UNLOCKED              | Account is neither disabled nor locked                            |
           