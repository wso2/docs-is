# User Account Locking and Account Disabling

Account locking and account disabling are security features in WSO2
Identity Server (IS) that can be used to prevent users from logging in
to their account and from authenticating themselves using their WSO2 IS
account. The account locking feature is used to **temporarily** block a
user from logging in, for example, in instances where there have been
many consecutive, unsuccessful login attempts. Account disabling is a
more of a **long-term** security measure, which disables the account for
a significant amount of time.

Next pages describe various ways the account can be locked and
disabled.
      

!!! info "Related Topics"

    -   See [Enable last login and last password modified
        timestamps](../../learn/configuring-users)
        for more information on how to customize a user's profile to enable
        viewing of timestamps for the last time the user logged in and last
        time the user modified the password.
    -   See [Configuring
        Claims](../../learn/configuring-claims) for
        more information on how to store the claim values in the user store.
