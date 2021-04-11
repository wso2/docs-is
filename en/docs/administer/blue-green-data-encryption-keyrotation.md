# Blue-Green Data Encryption Key Rotation

This section contains the complete process you need to follow in order to perform symmetric data encryption key rotation on a WSO2 Identity Sever(5.11.0 and above).

Key rotation can be defined as retiring an encryption key and replacing it with a new key. Data is encrypted using a key known as Data Encryption Key(DEK) and the DEK is then encrypted with another key called Key Encryption Key(KEK), this is known as envelope encryption. Frequent rotations of these encryption keys are considered as industry best practices by PCI DSS and NIST standards. 

## Why should you rotate encryption keys?

*   A cryptoperiod is the time span during which a specific key is authorized for use. [NIST SP 800-57](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf) recommends different cryptoperiods for different encryption key types. 
    *   Symmetric Data Encryption Keys
        *   OUP recommended for large volumes of data is about a day or a week
        *   OUP recommended for smaller volumes of data is about 2 years
    *   Symmetric Key, Wrapping Keys
        *   OUP recommended for a key that wraps a large number of keys is about a day or a week
        *   OUP recommended for key that wraps smaller number of keys is upto 2 years
*   Security compliance requirements
*   Security breach requirements
!!! note
    _Originator Usage Period(OUP) is the time period during which encryption is applied to data_

!!! note
    _The above mentioned cryptoperiods can vary based on other factors like the sensitivity of data and the amount of data we have etc._

## Background

WSO2 Identity Server has the following key usages for signing/encrypting data and each of these types will have different key rotation requirements

1.  TLS Connection
2.  Signing and encryption of data (JWT assertions, payloads) shared with external parties (SP, IdP)
3.  Encryption of sensitive runtime level configuration secrets/user data persisted in datastores and userstores
4.  Encryption of sensitive deployment level configuration data in configuration files

With WSO2 IS 5.11.0 onwards symmetric encryption mechanism is used to encrypt (3) above. The DEK used to encrypt these data are configured in the `deployment.toml` file and it is protected by a KEK. Secure vault is being utilized as of now to protect this DEK. Here we will consider only the rotation of the Data Encryption Key configured in the `deployment.toml` file. 

## DEK rotation frequency

In the case of a security compliance requirement we can see that symmetric DEK rotation can be done in 2 years or less based on the volume of data we have.

In a security breach scenario we must rotate the DEK immediately and re-encrypt all the data to the new DEK.

## Tables that support re-encryption 

At the moment below tables are supported for re-encryption

??? info "Tables that support re-encryption"

    | **Table**                                | **Fields**                                                                      |
    |------------------------------------------|---------------------------------------------------------------------------------|
    | IDN_IDENTITY_USER_DATA                   | TOTP secretKey and verifiedSecretKey claims                                     |
    | IDN_OAUTH2_AUTHORIZATION_CODE            | OAuth2 authorization codes                                                      | 
    | IDN_OAUTH2_ACCESS_TOKEN                  | OAuth2 access and refresh tokens                                                | 
    | IDN_OAUTH_CONSUMER_APPS                  | Consumer secrets                                                                | 
    | WF_BPS_PROFILE                           | BPS profile password                                                            | 
    | WF_REQUEST                               | WF request credentials                                                          |   
    | REG_PROPERTY                             | Keystore passwords, Keystore privatekeyPass and Entitlement subscriberPasswords | 

## Configuration files that support re-encryption

At the moment below configuration files are supported for re-encryption

??? info "Configuration files that support re-encryption"
    
    | **Configuration file**            | **Path**                                                          | **Property** |
    |-----------------------------------|-------------------------------------------------------------------|--------------|
    | Event publishers                  | `/repository/deployment/server/eventpublishers` files             | Password     | 
    | Super tenant secondary userstores | `/repository/deployment/server/userstores/<userstore>` files      | Password     | 
    | Tenant secondary userstores       | `/repository/tenants/<tenant_id>/userstores/<userstore>` files    | Password     |      
    
## Tables that support syncing

At the moment below tables are supported to be synced during key rotation from the old setup to the new setup. Any other data won’t be persisted in the new setup.

??? info "Tables that support syncing"

    | **Table**                     | **Purpose**                                             | **Recommendation**                                                                                                                                                       |
    |-------------------------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | IDN_IDENTITY_USER_DATA        | Identity claims when the identity data store is enabled | Usually recommended to sync if identity management features are enabled in the system.                                                                                   |
    | IDN_OAUTH2_ACCESS_TOKEN       | OAuth 2.0 tokens                                        | Need to sync if the tokens created during the key rotation period needs to be valid after key rotation.                                                                         |
    | IDN_OAUTH2_ACCESS_TOKEN_SCOPE | OAuth 2.0 scopes                                        | If the IDN_OAUTH2_ACCESS_TOKEN is synced, this table also needs to be synced.                                                                                            |
    | IDN_OAUTH2_AUTHORIZATION_CODE | OAuth 2.0 authorization codes                           | Need to sync if the authorization codes created during the key rotation period need to be valid after key rotation. |
    
## Performing blue-green key rotation

1.  Block all privileged user flows and allow only end user flows.

    !!! note
        For the privileged user flows, block all admin services from the load balancer and the management console as well. For end user flows the above [tables](../../administer/blue-green-data-encryption-keyrotation/#tables-that-support-syncing) will be synced to the new setup, so only these end user data flows should be allowed to generate in the old setup.

2.  Execute the `old<Identity-DB-Type>.sql` script in the existing identity database to create temp tables and triggers

3.  Create a copy of the existing IS pack(new IS pack) and dump existing identity and registry databases and create the new databases

4.  Drop the temp tables and triggers in the new identity database using the `new<Identity-DB-Type>.sql` script

    !!! note
        The scripts can be found inside the zipped folder [here](https://drive.google.com/drive/folders/1EnEZUhpMqZu1RG-Gc6qL4r8kUoPeaMgy?usp=sharing). Extract the zipped folder content to a location.

5.  Open the properties.yaml file inside the extracted zipped folder and edit the configurations accordingly   

    *   oldSecretKey - The symmetric encryption key used in the current IS pack
    !!! note
        If the key is encrypted using cipher tool decrypt it back as shown [here](https://shagihan.medium.com/decrypt-encrypted-text-with-the-wso2-cipher-tool-15b67624620a)
    *   newSecretKey - The new symmetric encryption key
    !!! tip
        Generate using a tool like openssl using the command, `openssl rand -hex 16`
    *   newISHome - The absolute path of the new IS pack(The created copy from the existing IS pack in step 3)
    *   oldIdnDBUrl - Old IS pack identity database URL
    *   oldIdnUsername - Old IS pack identity database username
    *   oldIdnPassword - Old IS pack identity database password 
    !!! note
        Encode the old identity database plaintext password in [base64](https://www.base64encode.org/) and insert here
    *   newIdnDBUrl - New IS pack identity database URL
    *   newIdnUsername - New IS pack identity database username
    *   newIdnPassword - New IS pack identity database password 
    !!! note
        Encode the new identity database plaintext password in [base64](https://www.base64encode.org/) and insert here
    *   newRegDBUrl - New IS pack registry database URL
    *   newRegUsername - New IS pack registry database username
    *   newRegPassword - New IS pack registry database password 
    !!! note
        Encode the new registry database plaintext password in [base64](https://www.base64encode.org/) and insert here
    *   enableDBMigrator - Enable/disable re-encryption for the identity and registry databases
    !!! note
        Keep this to always **true** to avoid unnecessary issues
    *   enableConfigMigrator - Enable/disable re-encryption for the configuration files
    !!! note
        Keep this to always **true** to avoid unnecessary issues
    *   enableSyncMigrator - Enable/disable syncing mechanism
    !!! note
        You only need to set this to true, if you have opted in for blue-green key rotation with zero downtime for the end user flows

    ??? tip "Sample configuration written for the properties.yaml file"
            
        ```
        oldSecretKey: AFA27B44D43B02A9FEA41D13CEDC2E40
        newSecretKey: 1fc0bc7a3805b42afa5f5af07a595f56
        newISHome: /home/geesa/Desktop/IS/copy/mysql/wso2is-5.11.0
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

6.  Run the tool using `./keyrotation.sh keyrotation-tool-<version>-SNAPSHOT.jar properties.yaml` command inside the extracted zipped folder location

7.  Edit the copied IS pack(new IS) deployment.toml file having the new configured databases and the new key 

8.  Start the new IS pack once existing DB and config file data re-encryption completes

9.  When no new entries are being synced in the logs, route traffic to the new setup and enable all load balancer API endpoints(privileged and end user flows)

!!! note
    _Do not stop the tool at once, let it sync any remaining data in the temp tables after routing the traffic_

## Verifying the key rotation

*   Check the output.logs file to verify if re-encryption happened successfully for the 7 identity and registry database tables. Check below logs for successful/failed re-encryption counts of OAuth2 access and refresh tokens

    ```tab="DB log sample"
    Successfully updated OAuth2 access and refresh tokens data records in IDN_OAUTH2_ACCESS_TOKEN: 897
    Failed OAuth2 access and refresh tokens data records in IDN_OAUTH2_ACCESS_TOKEN: 0
    ```

!!! note
    _If the key rotation task is successful there should be 0 as the failed logs count for all the tables_

*   Check the output.logs file to verify if re-encryption happened successfully for the 3 configuration files. Check below logs for successful/failed re-encryption counts of event publisher configuration files

    ```tab="Config file log sample"
    Updated event publisher configuration files: 8
    Failed event publisher configuration files: 0
    ```

!!! note
    _If the key rotation task is successful there should be 0 as the failed logs count for all the configuration files_

*   Check the output.logs file to verify if transformation of the synced data happened successfully for the 4 tables. Check below logs for successful/failed transfromation of `IDN_IDENTITY_USER_DATA` table

    ```tab="Synced log sample"
    Successfully transformed totp data records in IDN_IDENTITY_USER_DATA_TEMP: 2
    Transformation failed totp data records in IDN_IDENTITY_USER_DATA_TEMP: 0
    ```

!!! note
    _If the synced task is successful there should be 0 as the failed logs count for all the synced tables_

*   Check for any errors in the output.log file and carefully analyse through the logs, if the error can be ignored proceed with other steps otherwise check what has caused the error.

## Recovering from any failure

If the key rotation task stops midway, we have to follow the blue green key rotation user guide steps again.

If there are errors logged in the output.logs file carefully go through the errors and find what has caused the error.