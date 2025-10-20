1.	Navigate to either one of the following locations based on your OS.

    === "Linux/Mac OS"
		``` json 
		<IS_HOME>/bin/wso2server.sh/
		```

	=== "Windows"
		``` json 
		<IS_HOME>\bin\wso2server.bat
		```

2.	Add the following JVM option:

    ``` java
    -Dndatasource.disable.rollbackOnReturn=true \
    ```

3. 	Navigate to the
    `               <IS_HOME>/repository/conf/deployment.toml              `
    file.

4.	Disable the `               defaultAutoCommit              ` property by defining it as `false`.

5. 	Add the `                commitOnReturn               ` property and set it to `true`.
                        
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
            