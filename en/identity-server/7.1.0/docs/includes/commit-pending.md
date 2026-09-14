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
