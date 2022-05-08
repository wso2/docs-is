# Set Passwords using Environment Variables/System Properties

The instructions on this page explain how you can set the configuration passwords in the `         deployment.toml        `  file using values passed from environment variables and system properties. 

This is done using the $env{ENV_VAR} and the $sys{system.property} place holders as shown below

### Set passwords using Environment Variables


```
[database.shared_db]
password = "$env{ENV_VAR}"

[super_admin]
username="admin"
password="$env{ENV_VAR}"

[keystore.tls]
password = "$env{ENV_VAR}" 
alias = "$env{ENV_VAR}" 
key_password = "$env{ENV_VAR}"  

[truststore]                  
password = "$env{ENV_VAR}" 
``` 

### Set passwords using System Properties
 1.  Open the `<IS_HOME>/repository/deployment.toml` file and refer the required password value in the configuration using the `$sys{system.property}` placeholder. 
   
    ``` tab="Format"
    [super_admin]
    username="admin"
    password="$sys{system.property}"
    ```
        
    ``` tab="Example"
    [super_admin]
    username="admin"
    password="$sys{admin.password}"
    ```
    
2.  Pass the above configured system property to the runtime by using one of following options during server startup. 

    !!! info
        Note that `admin.password` has been used as the sample system property.

    - On **Linux**: `./wso2server.sh -Dadmin.password=admin`
    - On **Windows**: `./wso2server.bat -Dadmin.password=admin`