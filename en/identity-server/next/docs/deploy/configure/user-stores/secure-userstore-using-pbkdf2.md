# PBKDF2 hashing
Password-Based Key Derivation Function 2 (PBKDF2) hashing algorithm is a modern hashing algorithm recommended by NIST. We can use the PBKDF2 hashing method to securely store user passwords in user stores. This method reduces the risk of brute-force attacks due to insecure passwords.

This guide walks you through the steps of configuring PBKDF2 as the hashing algorithm of a JDBC user store.

!!! note
    Currently, PBKDF2 supports only JDBC user stores of WSO2 Identity Server.

## Configure PBKDF2 hashing
This section guides you on how to configure PBKDF2 hashing on primary and secondary JDBC user stores.

### PBKDF2 for primary JDBC user stores

PBKDF2 is supported by [primary JDBC user stores]({{base_path}}/guides/users/user-stores/primary-user-store/configure-a-jdbc-user-store), but PBKDF2 should be enabled before the initial server startup by adding the following to the `deployment.toml` file.
    ``` js
    [user_store]
    type = "database_unique_id"
    password_digest="PBKDF2"
    ```

### PBKDF2 for secondary JDBC user stores
To configure PBKDF2 hashing on a JDBC user store:

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
            <th>Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Password Hashing Algorithm</td>
            <td><code>PBKDF2</code></td>
            <td>Name of the hashing algorithm supported by the user store.</td>
        </tr>
        <tr>
            <td>UserStore Hashing Configurations</td>
            <td><code>{pbkdf2.iteration.count:10000, pbkdf2.dkLength:256, pbkdf2.prf:PBKDF2WithHmacSHA256} </code></td>
            <td>Additional parameters required for password hashing algorithm. This should be given in JSON format. Learn more about these [configurations](#pbkdf2-parameters).</td>
        </tr>
    </table>

5. Click **Update** to save the configurations.

Successful updation of these configurations will convert the password hashing algorithm of the user store to PBKDF2.

## PBKDF2 parameters
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
</table>

!!! Note
    NIST recommends `PBKDF2WithHmacSHA256` as the pseudo-random function (prf) value, but the prf can also be changed. Some examples of possible prf values are as follows:

    - `PBKDF2WithHmacSHA512`
    - `PBKDF2WithHmacSHA256`
    - `PBKDF2WithHmacSHA1`