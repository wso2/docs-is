# Customizing Just-In-Time Provisioning User Interfaces

If necessary, you can customize the default user interfaces that are
displayed to prompt for credentials at the time of j ust-in-time
provisioning. To customize the user interfaces depending on your
requirement, add the following configuration in the
`         <IS_Home>/repository/conf/deployment.toml        ` file.

``` java
[authentication.jit_provisioning]
username_provisioning_url= "/accountrecoveryendpoint/register.do"
password_provisioning_url= "/accountrecoveryendpoint/signup.do"
```

-   If you want to customize the user interface that is displayed when
    you select **Prompt for username, password and consent** as the
    provisioning option, change the value of
    `          username_provisioning_url         ` .
-   If you want to customize the user interface that is displayed when
    you select either **Prompt for password and consent** or **Prompt
    for consent** as the provisioning option, change the value of
    `          password_provisioning_url         ` .
