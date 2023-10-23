# Exporting User Data from WSO2 Identity Server

1. Download **scim-bulk-user-export-tool** from [here](https://maven.wso2.org/nexus/content/groups/public/org/wso2/samples/is/scim.bulk.user.export.tool/4.3.2/scim.bulk.user.export.tool-4.3.2.zip).
2. Extract the downloaded .zip file.
3. Run the `start.sh` script inside the extracted directory.

    `sh start.sh`

4. Provide the host address of the WSO2 Identity Server instance.

    !!! Note
        
        If you are getting data from the super-tenant, you only need to provide the host address of the instance 
        
        (E.g. For a local instance `https://localhost:9443`). 
        
        If you are getting data from a tenant, you need to append `t/<tenant-domain>` to the host address. 
        
        (E.g. For a local instance `https://localhost:9443/t/wso2`).
    
5. Provide the user credentials of a user with the required permissions to call SCIM 2.0 `users` endpoint.
6. Provide the location of the CSV file you need to create. This is an **optional** parameter and by default, 
the tool will create `users.csv` in the tool directory.
7. Select the attributes that need to be filtered. Only the chosen attributes will be specified in the CSV file.
This is also an **optional** input.
8. Provide the attributes that you need to exclude when creating the CSV file. These attributes will not be included in 
the CSV file. This is also an **optional** input.
