# Remove Unused Tokens from the Database

As you use WSO2 Identity Server (WSO2 IS), the number of revoked, inactive, and expired tokens accumulate in the `IDN_OAUTH2_ACCESS_TOKEN` table. These tokens are kept in the database for logging and audit purposes but they can have a negative impact on the server's performance over time.
Therefore, it is recommended to clean them periodically in order to enhance the token lookup and to avoid a growing access token table.

You can use one of the following methods for token cleanup.

!!! note
    We recommend using stored procedures instead of the WSO2 Identity Server to clean up tokens.

## Use the store procedure for token cleanup

You can use the provided stored procedures to run a token cleanup task periodically to remove the old and invalid tokens.
Follow the instructions below to configure token cleanup using this method.

!!! tip
    It is safe to run these steps in read-only mode or during a time when traffic on the server is low, but it is not mandatory.

1. Disable the internal token cleanup process by configuring the following property in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ```toml
    [oauth.token_cleanup]
    enable = false
    ```

2. Depending on your database, select the appropriate token cleanup script based on the links mentioned in the sub-points below and run it on the database. This takes a backup of the necessary tables, turns off SQL updates, and cleans the database of unused tokens.
    - [DB2](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/db2/token-cleanup/)
    - [MSSQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mssql/token-cleanup/)
    - [MySQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mysql/token-cleanup/)
    - [Oracle](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/oracle/token-cleanup/)
    - [PostgreSQL 9.X](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-9x/token-cleanup/)
    - [PostgreSQL 11.X](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-11x/token-cleanup/)

3. Once the cleanup is over, start the WSO2 Identity Server pointing to the cleaned-up database. You can also schedule a cleanup task that will be automatically run after a given period.

## Configure WSO2 Identity Server for token cleanup

Alternatively, you can use the WSO2 Identity Server, which triggers token cleanup during the following instances.

- New token generation
- Token refresh
- Token revocation

Enable token cleanup by configuring the following properties in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

```toml
[oauth.token_cleanup]
enable = true
retain_access_tokens_for_auditing = true
```

<table>
    <thead>
        <tr class="header">
            <th>Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr class="odd">
            <td><code>enable</code></td>
            <td>
                <p>Set this property to <code>true</code> to enable token cleanup.</p>
                <p>Set it to <code>false</code> to disable token cleanup.</p>
            </td>
        </tr>
        <tr class="even">
            <td><code>retain_access_tokens_for_auditing</code></td>
            <td>
                <p>Set this property to <code>true</code> to move the old, invalid tokens to the Audit table when token cleaning is enabled.</p>
                <p>Set it to <code>false</code> if you do not wish to store old tokens in the Audit table.</p>
            </td>
        </tr>
    </tbody>
</table>