# Bcrypt Hashing

Bcrypt is recognized as a password hashing function that is designed to protect sensitive data through generating strong, non-reversible hashes. Salting and an adjustable cost factor are utilized to resist brute-force and pre-computed attacks. This makes it an ideal choice for securely storing credentials in user stores.

> [!NOTE]
> * Currently, Bcrypt supports only JDBC user stores of WSO2 Identity Server.
> * It should be noted that in WSO2 Identity Server version 7.1.0, this connector is supported specifically at update levels 24 and above.

## Configure Bcrypt hashing

This section guides you on how to configure Bcrypt hashing on primary and secondary JDBC user stores.
* Place the `org.wso2.carbon.identity.hash.provider.bcrypt-*.*.*.jar` file into the`<IS_HOME>/repository/components/dropins` directory. You can download the connector from the [WSO2 Store](https://store.wso2.com/connector/identity-hash-provider-bcrypt).
### Bcrypt for primary JDBC user store

> [!NOTE]
> Bcrypt is supported by
[primary JDBC user stores](https://is.docs.wso2.com/en/7.0.0/guides/users/user-stores/primary-user-store/configure-a-jdbc-user-store/) but must be enabled in the deployment.toml file before initial server startup. Since Bcrypt automatically generates a unique, cryptographically strong salt for each password, you must also disable the user store's external salt handling for it to function correctly .

1. Open the deployment.toml file located in the `<IS_HOME>/repository/conf` directory.

2. Add the following configurations under the `[user_store.properties]` section. If the section does not exist, you can add it.

   ```bash
     [user_store.properties]
     PasswordDigest = "BCRYPT"
     StoreSaltedPassword = "false"
    "Hash.Algorithm.Properties" = "{bcrypt.version:2a,bcrypt.cost.factor:10}"
   ```
3. Restart the WSO2 Identity Server.

* The `Hash.Algorithm.Properties` [configuration](#bcrypt-parameters) is optional and may be omitted if the default values are sufficient for the deployment.

* If Bcrypt is not defined during the initial server startup, existing passwords will not be hashed using Bcrypt. In such cases, administrators will need to [reset user passwords](https://is.docs.wso2.com/en/latest/guides/account-configurations/account-recovery/password-recovery/) after enabling Bcrypt.

### Bcrypt for secondary JDBC user stores

1. Login to the Identity Server management console (`https://<IS_HOST>:<PORT>/console`) and [create a JDBC user store](https://is.docs.wso2.com/en/7.0.0/guides/users/user-stores/configure-secondary-user-stores/).

2. Navigate to **User Attributes & Stores > User Stores**, select the secondary JDBC user store you have created.

3. Navigate to the **User** tab of the user store and expand the **Show more** section.

5. Edit the following properties with the values given:

   <table>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Password Hashing Algorithm</td>
    <td><code>BCRYPT</code></td>
    <td>Name of the hashing algorithm supported by the user store.</td>
    </tr>
    <tr class = "odd">
    <td>Enable Salted Passwords</td>
    <td><code>false</code></td>
    <td>Determines whether passwords are stored with an additional salt. For bcrypt, this should be set to false.</td>
    </tr>
    <tr class="even">
    <td>UserStore Hashing <a href="#bcrypt-parameters">Configurations</a> (optional)</td>
    <td><code>{bcrypt.version:2b,bcrypt.cost.factor:12}</code></td>
    <td>Additional parameters required for password hashing algorithm. This should be given in JSON format.</td>
        </tbody>
    </table>

5. Click **Update** to save the configurations.

   Successful updation of these configurations will convert the password hashing algorithm of the user store to Bcrypt.

> [!NOTE]
>  **Existing user stores**
> - You may also use an existing user store which does not have any users in it. If you already have users in the user store, once the hashing algorithm is configured these users will not be able to get authenticated.
>
> - In such cases users will not get authenticated even when they try to login using the correct  credentials. Admins may use the following approaches to reset the user passwords after configuring the Bcrypt hashing algorithm on an existing user store:
    >   - Ask users to reset their own passwords.
>   - Trigger password reset for all accounts of the user store using [admin initiated password reset](https://is.docs.wso2.com/en/7.0.0/guides/users/manage-users/#reset-the-users-password).

### Bcrypt parameters

When configuring the Bcrypt hashing algorithm the following parameters must be specified in the configurations:

   <table>
  <thead>
    <tr class="header">
      <th >Parameter Name</th>
      <th>Description</th>
      <th>Default Value</th>
      <th>Possible Values</th>
    </tr>
  </thead>
  <tbody>
    <tr class="odd">
      <td><code>bcrypt.version</code></td>
      <td>Version of the Bcrypt algorithm</td>
      <td><code>2b</code></td>
      <td><code>2a</code> <code>2b</code> <code>2y</code></td>
    </tr>
    <tr class="even">
      <td><code>bcrypt.cost.factor</code></td>
      <td>Cost factor of the Bcrypt algorithm</td>
      <td><code>12</code></td>
      <td><code>4 - 31</code></td>
    </tr>
  </tbody>
</table>

>[!NOTE]
>Passwords must be 72 characters or fewer when using the Bcrypt hashing algorithm. For guidance on updating password policy, refer to the [documentation](https://is.docs.wso2.com/en/7.1.0/guides/account-configurations/login-security/password-validation/#password-input-validation).
   