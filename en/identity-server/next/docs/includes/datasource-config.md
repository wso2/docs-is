A datasource is used to establish the connection to a database. By
default, `WSO2_IDENTITY_DB` and `WSO2_SHARED_DB` datasources are used to connect
to the default H2 database. 

- `WSO2_SHARED_DB` - The datasource which stores registry and user management
                     data.
- `WSO2_IDENTITY_DB` - The datasource specific to the identity server which stores
                       identity related data.