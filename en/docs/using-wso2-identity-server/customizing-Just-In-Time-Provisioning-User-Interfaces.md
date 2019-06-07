# Customizing Just-In-Time Provisioning User Interfaces

If necessary, you can customize the default user interfaces that are
displayed to prompt for credentials at the time of j ust-in-time
provisioning. To customize the user interfaces depending on your
requirement, you can configure appropriate values under the
`         <JITProvisioning>        ` element in the
`         <IS_Home>/repository/conf/identity/identity.xml        ` file.

``` java
<JITProvisioning> 
<UserNameProvisioningUI>/accountrecoveryendpoint/register.do</UserNameProvisioningUI>   <PasswordProvisioningUI>/accountrecoveryendpoint/signup.do</PasswordProvisioningUI>
</JITProvisioning>
```

-   If you want to customize the user interface that is displayed when
    you select **Prompt for username, password and consent** as the
    provisioning option, change the value of
    `          <UserNameProvisioningUI>         ` .
-   If you want to customize the user interface that is displayed when
    you select either **Prompt for password and consent** or **Prompt
    for consent** as the provisioning option, change the value of
    `          <PasswordProvisioningUI>         ` .
