# Set Passwords using Environment Variables/System Properties

The instructions on this page explain how you can set the configuration passwords in the ei.toml file using values passed from environment variables and system properties. 

This is done using the $env{ENV_VAR} and the $sys{system.property} place holders as shown below

```
[database.shared_db]
password = "$env{ENV_VAR}"

[super_admin]
username="admin"
password="$env{ENV_VAR}"

[keystore.tls]
password = "$env{ENV_VAR}" 
alias = "$env{ENV_VAR}" 
key_password = "$$env{ENV_VAR}"  

[truststore]                  
password = "$env{ENV_VAR}" 
``` 
