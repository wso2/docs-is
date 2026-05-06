# Remove unused tokens from the Database

As you use WSO2 Identity Server, the number of revoked, inactive, and expired tokens accumulate in the `IDN_OAUTH2_ACCESS_TOKEN` table. The database stores these tokens for logging and audit purposes, but they can degrade the server's performance over time.

To maintain optimal performance, and avoid the access token table from growing indefinitely, you can periodically clean up the database by removing unused tokens. You can do this using either of the following methods:

## Use the stored procedures for token cleanup (recommended)

You can use the provided stored procedures to run a token cleanup task periodically to remove the old and invalid tokens. Follow the instructions below to configure token cleanup using this method.

!!! tip
    Run these steps during a low-traffic period to reduce disruption to the server.

1. Disable the internal token cleanup process by configuring the following property in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ```toml
    [oauth.token_cleanup]
    enable = false
    ```

2. Depending on your database, select the appropriate token cleanup script based on the links mentioned in the sub-points below and run it on the database. This takes a backup of the necessary tables, turns off SQL updates, and cleans the database of unused tokens.

    - [DB2](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/db2/token-cleanup/){:target="_blank"}
    - [MSSQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mssql/token-cleanup/){:target="_blank"}
    - [MySQL](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/mysql/token-cleanup/){:target="_blank"}
    - [Oracle](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/oracle/token-cleanup/){:target="_blank"}
    - [PostgreSQL 9.X](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-9x/token-cleanup/){:target="_blank"}
    - [PostgreSQL 11.X to 17.X](https://github.com/wso2/carbon-identity-framework/blob/master/features/identity-core/org.wso2.carbon.identity.core.server.feature/resources/dbscripts/stored-procedures/postgresql/postgre-11x/token-cleanup/){:target="_blank"}

3. Once the cleanup is over, start the WSO2 Identity Server pointing to the cleaned-up database. You can also schedule a cleanup task that will be automatically run after a given period.

## Configure WSO2 Identity Server for token cleanup

While stored procedures are recommended, you can use the WSO2 Identity Server to trigger token cleanup during the following instances.

- New token generation
- Token refresh
- Token revocation

Enable token cleanup by configuring the following properties in the `<IS_HOME>/repository/conf/deployment.toml` file.

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
