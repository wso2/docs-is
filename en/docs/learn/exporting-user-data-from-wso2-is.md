#Exporting User Data from WSO2 Identity Server

1. Download **scim-bulk-user-export-tool** from [here]().
2. Extract the downloaded .zip file.
3. Run the `start.sh` script inside the extracted directory.

    `sh start.sh`

4. First you will be prompted to provide the host address of the WSO2 Identity Server instance.

    !!! Note
        
        If you’re getting user data from the super-tenant you only need to provide the host address of the instance 
        
        (E.g. For a local instance `https://localhost:9443`). 
        
        If you’re getting data from a tenant you need append `t/<tenant-domain>` to host address 
        
        (E.g. For a local instance `https://localhost:9443/t/wso2`).
    
5. Then you will be prompted to provide user credentials of a user with required permissions to call SCIM 2.0 `/users` 
endpoint.
6. Then you will be prompted for the location of the CSV file you need to create. This is an optional parameter and 
by default, the tool will create **users.csv** in the tool directory.
7. Then you will be prompted to provide attributes that need to be filtered. If you specify the attributes here. 
Created CSV will only have the attributes specified. This is also an **optional** input.
8. Next, you will be prompt for the attributes you need to exclude when creating the CSV. 
So, those attributes won’t be in the CSV. This is also an **optional** input.
