# Securing a JDBC User Store with Hashing

WSO2 Identity Server secures user credentials by hashing passwords before storing them in JDBC user stores. By default, WSO2 Identity Server uses the SHA-256 algorithm for JDBC user stores, while also supporting other methods such as MD5, PBKDF2, and BCRYPT. Among these, PBKDF2 and BCRYPT are the recommended modern algorithms offering built-in salting, configurable computational cost, and strong resistance against brute-force and pre-computed attacks making them ideal choices for securing user credentials in production environments.

## Available Hashing Algorithms in WSO2 Identity Server
WSO2 Identity Server provides several hashing algorithms for storing user passwords. These methods are configured by setting the **PasswordDigest** property in the user store configuration. While SHA-256 is the default for JDBC user stores, modern production environments should utilize PBKDF2 or BCRYPT due to their enhanced security features.

The table below summarizes the available values for the PasswordDigest property:

<table>
    <thead>
    <tr class="header">
    <th>Password Hash Method</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>SHA</td>
    <td> Uses SHA digest method (SHA-1 or SHA-256). If you enter only SHA for the PasswordDigest property, it is interpreted as SHA-1. Note that SHA-256 is the default digest method used by WSO2 IS for JDBC user stores if no value is explicitly configured.</td>
    </tr>
    <tr class = "odd">
    <td>MD5</td>
    <td>Uses MD5 digest method</td>
    </tr>
    <tr class="even">
    <td>PLAIN_TEXT</td>
    <td>Stores passwords in plain text</td>
    </tr>
    <tr class="even">
    <td>PBKDF2</td>
    <td>A modern, NIST-recommended key derivation function that reduces brute-force attack risks.</td>
    </tr>
    <tr class="even">
    <td>BCRYPT</td>
    <td>A modern password hashing function with built-in salting and adaptive cost factor.</td>
    </tr>
        </tbody>
    </table>

## Configuring BCRYPT and PBKDF2 Password Hashing for JDBC User Stores

This section guides you on how to configure BCRYPT and PBKDF2 hashing algorithms on primary and secondary JDBC user stores.

### For primary JDBC user store

!!! note
    PBKDF2 and BCRYPT are supported by [primary JDBC user stores](https://is.docs.wso2.com/en/7.0.0/guides/users/user-stores/primary-user-store/configure-a-jdbc-user-store/) but must be enabled in the deployment.toml file before initial server startup.

1. Open the deployment.toml file located in the `<IS_HOME>/repository/conf` directory.

2. Add the following configurations under the `[user_store.properties]` section. If the section does not exist, you can add it.


**PBKDF2 Configuration**

   ```bash
   [user_store.properties]
   PasswordDigest = "PBKDF2"
   "Hash.Algorithm.Properties" = "{pbkdf2.iteration.count:10000, pbkdf2.dkLength:256, pbkdf2.prf:PBKDF2WithHmacSHA256}"
   ```

**BCRYPT Configuration**

   ```bash
   [user_store.properties]
   PasswordDigest = "BCRYPT"
   StoreSaltedPassword = "false"
   "Hash.Algorithm.Properties" = "{bcrypt.version:2a,bcrypt.cost.factor:10}"
   ```
   
### For secondary JDBC user store

To configure PBKDF2 or BCRYPT in secondary JDBC user store:

1. Login to the Identity Server management console (`https://<IS_HOST>:<PORT>/console`) and [create a JDBC user store]({{base_path}}/guides/users/user-stores/configure-secondary-user-stores).

    !!! Note "Existing user stores"
        - You may also use an existing user store which does not have any users in it. If you already have users in the user store, once the hashing algorithm is configured these users will not be able to get authenticated.
        - Such cases will impact with bad user experience as the users will not get authenticated even when they try to login using the correct credentials. Admins may use the following approaches to reset the user passwords after configuring the PBKDF2 hashing algorithm on an existing user store:
        - Ask users to [reset their own passwords]({{base_path}}/guides/user-self-service/customer-self-service-portal).
        - Trigger password reset for all accounts of the user store using [admin initiated password reset]({{base_path}}/guides/users/manage-users#reset-the-users-password).

2. Navigate to  **User Attributes & Stores** > **User Stores**, select the secondary JDBC user store you have created.
3. Navigate to the **User** tab of the user store and expand the **Show more** section.
4. Edit the following properties with the values given:
    <table>
        <tr>
            <th>Property</th>
            <th>PBKDF2 Value</th>
            <th>BCRYPT Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Password Hashing Algorithm</td>
            <td><code>PBKDF2</code></td>
            <td><code>BCRYPT</code></td>
            <td>Name of the hashing algorithm supported by the user store.</td>
        </tr>
        <tr>
            <td>Enable Salted Passwords</td>
            <td><code>N/A</code></td>
            <td><code>false</code></td>
            <td>When set to true (which is the default and recommended value for JDBC user stores), WSO2 ensures that a unique, random salt is generated and stored along with the hashed password for every user.</td>
        </tr>
        <tr>
            <td>User Store Hashing Configurations</td>
            <td><code>{pbkdf2.iteration.count:10000, pbkdf2.dkLength:256, pbkdf2.prf:PBKDF2WithHmacSHA256} </code></td>
            <td><code>{bcrypt.version:2b,bcrypt.cost.factor:12}</code></td>
            <td>Additional parameters required for password hashing algorithm. This should be given in JSON format. Learn more about these configurations in [PBKDF2](#pbkdf2-parameters) and [BCRYPT](#bcrypt-parameters).</td>
        </tr>
    </table>

5. Click **Update** to save the configurations.

### PBKDF2 Parameters

When configuring the PBKDF2 hashing algorithm the following parameters must be specified in the configurations:

<table>
    <tr>
        <th>Parameter</th>
        <th>Parameter name</th>
        <th>Recommended Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>pbkdf2.iteration.count</code></td>
        <td>Iteration count</td>
        <td><code>10000</code></td>
        <td>Number of times hashing is performed.</td>
    </tr>
    <tr>
        <td><code>pbkdf2.dkLength</code></td>
        <td>Derived Key Length</td>
        <td><code>256</code></td>
        <td>Bit length of the generated hash value.</td>
    </tr>
    <tr>
        <td><code>pbkdf2.prf</code></td>
        <td>Pseudo-Random Function </td>
        <td><code>PBKDF2WithHmacSHA256</code></td>
        <td>The key component of the PBKDF2 hashing algorithm in which the actual hashing part is done.</td>
    </tr>
</table>

!!! Note
    NIST recommends `PBKDF2WithHmacSHA256` as the pseudo-random function (prf) value, but the prf can also be changed. Some examples of possible prf values are as follows:

    - `PBKDF2WithHmacSHA512`
    - `PBKDF2WithHmacSHA256`
    - `PBKDF2WithHmacSHA1`

### BCRYPT Parameters

When configuring the BCRYPT hashing algorithm the following parameters must be specified in the configurations:

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
      <td>Version of the BCRYPT algorithm</td>
      <td><code>2b</code></td>
      <td><code>2a</code> <code>2b</code> <code>2y</code></td>
    </tr>
    <tr class="even">
      <td><code>bcrypt.cost.factor</code></td>
      <td>Cost factor of the BCRYPT algorithm</td>
      <td><code>12</code></td>
      <td><code>4 - 31</code></td>
    </tr>
  </tbody>
</table>
