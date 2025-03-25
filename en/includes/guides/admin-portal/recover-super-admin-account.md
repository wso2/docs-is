# Recover a Locked Super Admin User Account

If the super admin account in {{ product_name }} becomes locked (for example, due to exceeding the maximum number of failed login attempts), follow the instructions below to recover access.

## Recovering the Super Admin User

When the super admin account is locked, you can recover access by temporarily switching to a new super admin account and using it to unlock or manage the original user.

### Step 1
Open the `deployment.toml` file located in the `<IS_HOME>/repository/conf directory` and update the [super_admin] 
section with a new username and password:

```toml
[super_admin]
username = "temporary-admin"
password = "Temp@1234"
create_admin_account = true
```

> 💡 The above configuration will create a new super admin user named `temporary-admin` on server startup.

### Step 2
Restart {{ product_name }} to apply the configuration changes and create the new admin account.

```bash
sh wso2server.sh
```

Once the server is up, log in to the Management Console using the new super admin credentials.


### Step 3
Use the new super admin account to:

- Unlock the original super admin account.
- Reset the password if necessary.
- Assign the **Internal/system** role to prevent future lockouts (optional).

> 🔒 Users assigned the `Internal/system` role are not subject to account locking policies.

### Step 4
Once the original account is recovered:

1. Revert the changes in `deployment.toml`.
2. Restart the server again.

---

## ⚠️ Important Notes

- **Do not attempt direct DB updates** in a production environment to unlock a user unless instructed by WSO2 support.
- The temporary super admin account is created only when `create_admin_account = true`. After recovery, it is recommended to disable this by setting the value to `false`.
- Ensure that at least one super admin account is always accessible to avoid such situations.

---
