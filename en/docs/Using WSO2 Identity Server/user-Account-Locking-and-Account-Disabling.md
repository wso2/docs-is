# User Account Locking and Account Disabling

Account locking and account disabling are security features in WSO2
Identity Server (IS) that can be used to prevent users from logging in
to their account and from authenticating themselves using their WSO2 IS
account. The account locking feature is used to **temporarily** block a
user from logging in , for example, in instances where there have been
many consecutive, unsuccessful login attempts. Account disabling is a
more of a **long-term** security measure, which disables the account for
a significant amount of time.

The following pages describe various ways the account can be locked and
disabled:

-   [Account Locking by Failed Login
    Attempts](_Account_Locking_by_Failed_Login_Attempts_)
-   [Locking a Specific User Account](_Locking_a_Specific_User_Account_)
-   [Account Disabling](_Account_Disabling_)  
      

**Related Topics**

-   See [Enable last login and last password modified
    timestamps](Configuring-Users_103330327.html#ConfiguringUsers-Enablelastloginandlastpasswordmodifiedtimestamps)
    for more information on how to customize a user's profile to enable
    viewing of timestamps for the last time the user logged in and last
    time the user modified the password.
-   By default, the claim values of the identity claims used in this
    feature are stored in the JDBC datasource configured in the
    `            identity.xml           ` file. See [Configuring
    Claims](https://docs.wso2.com/display/IS540/Configuring+Claims) for
    more information on how to store the claim values in the user store.
