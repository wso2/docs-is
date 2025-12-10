{% set wso2_is_console_access_note = "
## Accessing the WSO2 Identity Server Console

To access the WSO2 Identity Server Console, you need to have the required permissions and the URL of the Console. This can be achieved by navigating to the console through a web browser using the following URL format:

   ```
   https://<hostname>:<port>/console
   ```

For example, if you are using the default host and port, the URL will be `https://localhost:9443/console`.

Upon navigating to this URL, you will be presented by the login screen of the WSO2 Identity Server. Use your credentials to log in to the Console.

!!! note
    The default credentials for an administrative user is as follows. It is crucial to change these default credentials before deploying the server in any production environment. Using default login information can pose a significant security risk, making the system vulnerable to unauthorized access. Learn more about [changing the super admin password](../../../deploy/security/maintain-logins-and-passwords/#change-the-super-admin-password)
    ```    
    Username: admin
    Password: admin
    ```
" %}

{% include "../../../../../includes/guides/admin-portal/manage-console-access.md" %}