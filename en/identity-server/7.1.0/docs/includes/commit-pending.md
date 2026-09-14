1. 	Navigate to the
    `               <IS_HOME>/repository/conf/deployment.toml              `
    file.

2.	Disable the `               defaultAutoCommit              ` property by defining it as `false`.

3. 	Add the `                commitOnReturn               ` property and set it to `true`.
                        
    - `WSO2_IDENTITY_DB` related configurations that should be added to the `<IS_HOME>/repository/conf/deployment.toml` file.
        
        ``` toml
        [database.identity_db.pool_options]
        defaultAutoCommit="false"
        commitOnReturn="true"
        ```
        
    - `WSO2_SHARED_DB` related configurations that should be added to the `<IS_HOME>/repository/conf/deployment.toml` file.
            
        ``` toml
        [database.shared_db.pool_options]
        defaultAutoCommit="false"
        commitOnReturn="true"
        ```

!!! note
    The connection pool no longer rolls back pending transactions on connection return by default, so no JVM option is required to disable that behavior. If you are upgrading from a release older than WSO2 Identity Server 5.10.0, you can safely remove `-Dndatasource.disable.rollbackOnReturn=true` from `wso2server.sh`/`wso2server.bat`; it has had no effect since then.
