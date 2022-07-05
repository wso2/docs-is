# Customize JIT Provisioning User Interfaces

You can customize the default user interface that is displayed to prompt for credentials at the time of just-in-time provisioning.

To customize the user interfaces depending on your requirement, add the following configuration in the `deployment.toml` file.

``` java
[authentication.jit_provisioning]
username_provisioning_url= "/accountrecoveryendpoint/register.do"
password_provisioning_url= "/accountrecoveryendpoint/signup.do"
```

- Update `username_provisioning_url`, if you have selected **Prompt for username, password and consent** as the provisioning option.

- Update `password_provisioning_url`, if you have selected **Prompt for password and consent** or **Prompt for consent** as the provisioning option.

!!! note
    Learn more about [configuring the provisioning methods](../identity-federation/jit-workflow.md).