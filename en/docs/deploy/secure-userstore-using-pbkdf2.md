# PBKDF2 hashing
We can use Password-Based Key Derivation Function 2 (PBKDF2) hashing method to securely store user passwords in user stores. This method reduces the risk of brute-force attacks due to insecure passwords.

This guide walks you through the steps of configuring PBKDF2 as the hashing algorithm of a JDBC userstore.

!!! note
    Currently PBKDF2 supports only JDBC userstores in Asgardeo.

## Prerequisite
You should have a secondary JDBC userstore added.  [Create a JDBC user store](../configure-secondary-user-stores) if you don’t already have one.

## Configure PBKDF2 hashing
To configure PBKDF2 hashing on a JDBC user store: 

1. On Identity Server management console (`https://<IS_HOST>:<PORT>`), go to  **Manage > Userstores**.
2. Select the secondary JDBC userstore you have created.
3. Navigate to the **User** tab of the userstore and expand the **Show more** section.
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
            <td>Name of the hashing algorithm supported by the userstore.</td>
        </tr>
        <tr>
            <td>UserStore Hashing Configurations</td>
            <td><code>{pbkdf2.iteration.count:10000, pbkdf2.dkLength:256, pbkdf2.prf:PBKDF2WithHmacSHA256} </code></td>
            <td>Additional parameters required for password hashing algorithm. This should be given in JSON format. Learn more about these [configurations](#pbkdf2-parameters).</td>
        </tr>
    </table>

5. Click **Update** to save the configurations.

Successful updation of these configurations will convert the password hashing algorithm of the userstore to PBKDF2. 

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

!!! info 
    NIST recommends ```PBKDF2WithHmacSHA256``` as the pseudo-random function (prf) value, but the pfr can also be changed. Some examples of possible prf values are as follows:

    - ```PBKDF2WithHmacSHA512```
    - ```PBKDF2WithHmacSHA256```
    - ```PBKDF2WithHmacSHA1```
