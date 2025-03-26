# Recover a locked super admin account

If you are the super admin of your WSO2 Identity Server deployment, and have enforced account lockout features (such as when exceeding the maximum number of failed login attempts), there is a chance that you will be locked out of your own account.

In such a case, recovering a super admin account involves temporarily creating a new super admin account and using it to unlock or manage the original super admin account. To do so, follow the steps below.

## Step 1: Create a new super admin user

To create a new super admin user, open the `deployment.toml` file located in the `<IS_HOME>/repository/conf` directory and update the [super_admin] section with a new username and password:

```toml
[super_admin]
username = "temporary-admin"
password = "Temp@1234"
create_admin_account = true
```

!!! info
    The above configuration will create a new super admin user named `temporary-admin` on server startup.

## Step 2: Restart WSO2 Identity Server

For your new configurations to apply, restart WSO2 Identity Server using the appropriate command.

    -   On Linux/Mac OS:`sh wso2server.sh`
    -   On Windows:`wso2server.bat`

## Step 3: Manage the old super admin user account

Once the server starts, log in to the Console using the new super admin credentials. With this account you may now do the following:

- [Unlock](https://is.docs.wso2.com/en/5.9.0/learn/locking-a-specific-user-account/#lock-a-specific-user-account)the original super admin account.
- [Reset the password](https://is.docs.wso2.com/en/5.9.0/learn/forced-password-reset/) if necessary.
- Optionally, you can [assign the system role](https://is.docs.wso2.com/en/5.9.0/learn/configuring-roles-and-permissions/#adding-a-user-role) to the original super admin account to prevent future lockouts.

!!! info "Tip"
    Users assigned the `system` role are not subject to account locking policies.


## Step 4: Restore configurations

Once you recover the original account, you can continue using it as the super admin. To do so,

1. Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file and update the [super_admin] section to reflect the credentials of the original super admin account.
2. Restart WSO2 Identity Server.
3. Log in to the Console and if necessary, [delete the temporary account](https://is.docs.wso2.com/en/5.9.0/learn/configuring-users/#delete-user-using-scim) you created earlier.

!!! info "Temporary super admin accounts"

    - A temporary super admin account gets created only when you set `create_admin_account = true`. Once the recovery is complete, this temporary super admin account does not get deleted automatically.

    - If you no longer need this account, you must go to the Console and delete this user manually.

    - To prevent being locked out, make sure that at least one super admin account is always accessible before deleting any admin accounts.
