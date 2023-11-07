# Blue-Green Data Encryption Key Rotation

This section contains the complete process you need to follow in order to perform symmetric data encryption key rotation in WSO2 Identity Sever(WSO2 IS version 5.11.0 and above).

Key rotation can be defined as retiring an encryption key and replacing it with a new key. Data is encrypted using a key known as a Data Encryption Key(DEK) and the DEK is then encrypted with another key called Key Encryption Key(KEK). This is known as envelope encryption. Frequent rotations of these encryption keys are considered as an industry best practice by PCI DSS and NIST standards.

## Why should you rotate encryption keys?

!!! note
    Originator Usage Period(OUP) is the time period during which encryption is applied to data.

- A cryptoperiod is the time span during which a specific key is authorized for use. [NIST SP 800-57](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf) recommends different cryptoperiods for different encryption key types.

    - Symmetric Data Encryption Keys
        
        - OUP recommended for large volumes of data is about a day or a week.
        - OUP recommended for smaller volumes of data is about 2 years.

    - Symmetric Key, Wrapping Keys
    
        - OUP recommended for a key that wraps a large number of keys is about a day or a week.
        - OUP recommended for a key that wraps a smaller number of keys is up to 2 years.

- Security compliance requirements
- Security breach requirements

!!! note
    The above-mentioned cryptoperiods can vary based on other factors like the sensitivity of data and the amount of data we have.

## Background

WSO2 Identity Server has the following key usages for signing/encrypting data and each of these types will have different key rotation requirements.

- TLS Connection
- Signing and encryption of data (JWT assertions, payloads) shared with external parties (SP, IdP).
- Encryption of sensitive runtime level configuration secrets/user data persisted in datastores and user stores.
- Encryption of sensitive deployment-level configuration data in configuration files.

From WSO2 IS 5.11.0 onwards, symmetric encryption is used to encrypt the internal sensitive runtime data above. The DEK used to encrypt these data is configured in the `deployment.toml` file and it is protected by a KEK. The secure vault is utilized as of now to protect this DEK. Here, only the rotation of the Data Encryption Key configured in the `deployment.toml` file is considered.

## DEK rotation frequency

In the case of a security compliance requirement, we can see that symmetric DEK rotation can be done in 2 years or less based on the volume of data present.

In a security breach scenario, we must rotate the DEK immediately and re-encrypt all the data to the new DEK.

## Key Rotation Approach

WSO2 IS has introduced an external tool that re-encrypts internal data after rotation of the configured symmetric data encryption key. Here, the re-encryption of the identity and registry databases and some configuration files is considered. Apart from that, the tool syncs end-user data that gets generated in the live system to the new setup.

The external Java client that performs the above tasks can be created by following the steps [here](#how-to-create-the-key-rotation-tool).

## Tables that support re-encryption

At the moment, the tables given below are supported for re-encryption.

!!! info "Tables that support re-encryption"

    | **Table** | **Fields**    |
    |-----------|---------------|
    | IDN_IDENTITY_USER_DATA    | TOTP secretKey and verifiedSecretKey claims   |
    | IDN_OAUTH2_AUTHORIZATION_CODE | OAuth2 authorization codes    | 
    | IDN_OAUTH2_ACCESS_TOKEN   | OAuth2 access and refresh tokens  | 
    | IDN_OAUTH_CONSUMER_APPS   | Consumer secrets   
    | WF_BPS_PROFILE    | BPS profile password  | 
    | WF_REQUEST    | WF request credentials    |   
    | REG_PROPERTY  | Keystore passwords, Keystore privatekeyPass, and Entitlement subscriberPasswords | 

## Configuration files that support re-encryption

At the moment, the configuration files given below are supported for re-encryption.

!!! info "Configuration files that support re-encryption"

    | **Configuration file**    | **Path**  | **Property** |
    |---------------------------|-----------|--------------|
    | Event publishers  | `/repository/deployment/server/eventpublishers` files | Password  | 
    | Super tenant secondary user stores | `/repository/deployment/server/userstores/<userstore>` files  | Password  | 
    | Tenant secondary userstores   | `/repository/tenants/<tenant_id>/userstores/<userstore>` files    | Password  |      

## Tables that support syncing

At the moment, the tables given below can be synced during key rotation from the old setup to the new setup. Any other data will not be persisted in the new setup.

!!! info "Tables that support syncing"

    | **Table** | **Purpose**   | **Recommendation**    |
    |-----------|---------------|-----------------------|
    | IDN_IDENTITY_USER_DATA    | Identity claims when the identity data store is enabled | Usually recommended to sync if identity management features are enabled in the system   |
    | IDN_OAUTH2_ACCESS_TOKEN   | OAuth 2.0 tokens  | Need to sync if the tokens created during the key rotation period need to be valid after key rotation    |
    | IDN_OAUTH2_ACCESS_TOKEN_SCOPE | OAuth 2.0 scopes  | If the IDN_OAUTH2_ACCESS_TOKEN is synced, this table also needs to be synced  |
    | IDN_OAUTH2_AUTHORIZATION_CODE | OAuth 2.0 authorization codes | Need to sync if the authorization codes created during the key rotation period need to be valid after key rotation    |

!!! note
    In this section, `<OLD_IS_HOME>` is the directory where the current Identity Server resides, and `<NEW_IS_HOME>` is the directory where the copy of the current Identity Server resides. `<KEY_ROTATION_REPO>` refers to the location [here](https://github.com/wso2/identity-tools/components/org.wso2.carbon.identity.keyrotation) and the `<KEY_ROTATION_TOOL>` refers to the location of the external tool.

## How To Create The Key Rotation Tool

1. Clone the repository, [identity-tools](https://github.com/wso2/identity-tools).

2. Build it using maven by running the command `mvn clean install`.

3. Go to the `<KEY_ROTATION_REPO>/target` folder and copy the `keyrotation-tool-<version>-SNAPSHOT.jar` file and the `<KEY_ROTATION_REPO>/target/lib` folder to `<KEY_ROTATION_TOOL>`. Get the `properties.yaml` file, `keyrotation.sh` file, and the `triggers` folder from `<KEY_ROTATION_REPO>/src/main/resources` and copy them to the same `<KEY_ROTATION_TOOL>` location.

## Performing blue-green key rotation

1. Block all privileged user flows and allow only end-user flows.

    !!! note
        For the privileged user flows, block all admin services from the load balancer and the management console as well. For end user flows, the above [tables]({{base_path}}/deploy/security/symmetric-encryption/blue-green-data-encryption-keyrotation/#tables-that-support-re-encryption) will be synced to the `<NEW_IS_HOME>`, so only these end user data flows should be allowed to generate in `<OLD_IS_HOME>`.

2. Execute the `old<identity-db-type>.sql` script in the `<OLD_IS_HOME>` identity database to create temp tables and triggers.

    !!! note
        The triggers can be found inside the `<KEY_ROTATION_TOOL>/triggers` folder.

3. Create a copy of the `<OLD_IS_HOME>`(This copied directory will be referred to as the `NEW_IS_HOME`) and dump `<OLD_IS_HOME>` identity and registry databases and create the new databases.

4. Drop the temp tables and triggers in the `<NEW_IS_HOME>` identity database using the `new<identity-db-type>.sql` script.

    !!! note
        The triggers can be found inside the `<KEY_ROTATION_TOOL>/triggers` folder.

5. Open the `properties.yaml` file in `<KEY_ROTATION_TOOL>` and edit the configurations accordingly.

    - oldSecretKey - The symmetric encryption key used in the `<OLD_IS_HOME>`.

        !!! note
            If the key is encrypted using cipher tool, decrypt it back as shown [here](https://shagihan.medium.com/decrypt-encrypted-text-with-the-wso2-cipher-tool-15b67624620a).

    - newSecretKey - The new symmetric encryption key.

        !!! tip
            Generate using a tool like openssl using the command, `openssl rand -hex 16`.

    - newISHome - The absolute path of the `<NEW_IS_HOME>`.
    - oldIdnDBUrl - `<OLD_IS_HOME>` identity database URL.
    - oldIdnUsername - `<OLD_IS_HOME>` identity database username.
    - oldIdnPassword - `<OLD_IS_HOME>` identity database password.

        !!! note
            Encode the `<OLD_IS_HOME>` identity database plaintext password in [base64](https://www.base64encode.org/) and insert it here.

    - newIdnDBUrl - `<NEW_IS_HOME>` identity database URL.
    - newIdnUsername - `<NEW_IS_HOME>` identity database username.
    - newIdnPassword - `<NEW_IS_HOME>` identity database password.

        !!! note
            Encode the `<NEW_IS_HOME>` identity database plaintext password in [base64](https://www.base64encode.org/) and insert it here.

    - newRegDBUrl - `<NEW_IS_HOME>` registry database URL.
    - newRegUsername - `<NEW_IS_HOME>` registry database username.
    - newRegPassword - `<NEW_IS_HOME>` registry database password.

        !!! note
            Encode the `<NEW_IS_HOME>` registry database plaintext password in [base64](https://www.base64encode.org/) and insert it here.

    - enableDBMigrator - Enable/disable re-encryption for the identity and registry databases.

        !!! note
            Keep this always **true** to avoid unnecessary issues.

    - enableConfigMigrator - Enable/disable re-encryption for the configuration files.

        !!! note
            Keep this always **true** to avoid unnecessary issues.

    - enableSyncMigrator - Enable/disable syncing mechanism.
        !!! note
            You only need to set this to **true**, if you have opted in for blue-green key rotation with zero downtime for the end user flows.

    - chunkSize - Size of the record chunks being retrieved from the database tables for syncing.

    ??? tip "Sample configuration written for the properties.yaml file"

        ```
        oldSecretKey: AFA27B44D43B02A9FEA41D13CEDC2E40
        newSecretKey: 1fc0bc7a3805b42afa5f5af07a595f56
        newISHome: /home/IS/wso2is-5.12.0
        oldIdnDBUrl: jdbc:mysql://localhost:3306/regdb?useSSL=false
        oldIdnUsername: root
        oldIdnPassword: cm9vdA==
        newIdnDBUrl: jdbc:mysql://localhost:3306/regdb1?useSSL=false
        newIdnUsername: root
        newIdnPassword: cm9vdA==
        newRegDBUrl: jdbc:mysql://localhost:3306/regdb1?useSSL=false
        newRegUsername: root
        newRegPassword: cm9vdA==
        enableDBMigrator: true
        enableConfigMigrator: true
        enableSyncMigrator: true
        chunkSize: 2
        ```

    ??? tip "Sample configuration written for H2 DB type URL"

        ```
        jdbc:h2:~/Desktop/IS/copy/wso2is-5.11.0-beta5-SNAPSHOT/repository/database/WSO2IDENTITY_DB
        ```

    ??? tip "Sample configuration written for MySQL DB type URL"

        ```
        jdbc:mysql://localhost:3306/idndb?useSSL=false
        ```

    ??? tip "Sample configuration written for DB2 DB type URL"

        ```
        jdbc:db2://localhost:50000/idndb
        ```

    ??? tip "Sample configuration written for PostgreSQL DB type URL"

        ```
        jdbc:postgresql://localhost:5432/idndb
        ```

    ??? tip "Sample configuration written for MSSQL DB type URL"

        ```
        jdbc:sqlserver://localhost:1433;databaseName=idndb
        ```

    ??? tip "Sample configuration written for Oracle DB type URL"

        ```
        jdbc:oracle:thin:@localhost:1521/ORCLCDB.LOCALDOMAIN
        ```

6. Run the tool using the `./keyrotation.sh keyrotation-tool-<version>-SNAPSHOT.jar` command from `<KEY_ROTATION_TOOL>`.

7. Edit the `<NEW_IS_HOME>` `deployment.toml` file having the new configured databases and the new key.

8. Start `<NEW_IS_HOME>` once the re-encryption for the existing DB and config file is done.

9. When no new entries are being synced in the logs, route traffic to `<NEW_IS_HOME>` and enable all load balancer API endpoints(privileged and end-user flows).

!!! note
    Do not stop the tool at once, let it sync any remaining data in the temp tables after routing the traffic.

## Verifying the key rotation

- Check the log files to verify if re-encryption happened successfully for the 7 identity and registry database tables. Check the logs given below for the successful/failed re-encryption counts of OAuth2 access and refresh tokens.

    !!! note "DB log sample"
        ```
        Successfully updated OAuth2 access and refresh tokens data records in IDN_OAUTH2_ACCESS_TOKEN: 897
        Failed OAuth2 access and refresh tokens data records in IDN_OAUTH2_ACCESS_TOKEN: 0
        ```

    !!! note
        If the key rotation task is successful, the failed logs count should be `0` for all the tables.

- Check the log files to verify if re-encryption happened successfully for the 3 configuration files. Check the logs given below for the successful/failed re-encryption counts of event publisher configuration files.

    !!! note "Config file log sample"
        ```
        Updated event publisher configuration files: 8
        Failed event publisher configuration files: 0
        ```

    !!! note
        If the key rotation task is successful, the failed logs count should be `0` for all the configuration files.

- Check the log files to verify if the transformation of the synced data happened successfully for the 4 tables. Check the logs given below for the successful/failed transformation counts of `IDN_IDENTITY_USER_DATA` table.

    !!! note "Synced log sample"
        ```
        Successfully transformed totp data records in IDN_IDENTITY_USER_DATA_TEMP: 2
        Transformation failed totp data records in IDN_IDENTITY_USER_DATA_TEMP: 0
        ```

    !!! note
        If the synced task is successful, the failed logs count should be `0` for all the synced tables.

- Check for any errors in the log files and carefully analyze the logs if the error can be ignored and other steps can be proceeded with. Otherwise, check what has caused the error.

## Recovering from any failure

If the key rotation task stops midway, follow the blue green key rotation user guide steps again.

If there are errors logged in the log files, carefully go through the errors and find what has caused the error.