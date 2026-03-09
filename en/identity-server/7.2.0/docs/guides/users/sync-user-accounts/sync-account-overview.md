# Exporting User Data from WSO2 Identity Server

This guide explains how you can export user data available in {{product_name}} consistently across a variety of platforms such as customer relationship management (CRM) platforms and other applications.

This is achieved by uploading a properly formatted `.csv` file containing all the user data to the relevant platform. You can easily generate a CSV file of the user data in {{product_name}} by following the steps below.

1. Download **scim-bulk-user-export-tool** from [here](https://maven.wso2.org/nexus/content/groups/public/org/wso2/samples/is/scim.bulk.user.export.tool/4.6.2/scim.bulk.user.export.tool-4.6.2.zip).

2. Extract the downloaded .zip file.
3. Run the `start.sh` script inside the extracted directory.

    `sh start.sh`

4. Provide the host address of the WSO2 Identity Server instance.

    !!! Note
        
        If you are getting data from an organization, you need to append `t/<organization-domain>` to the host address. 
        
        (E.g. For a local instance `https://localhost:9443/t/wso2`).

5. Provide the user credentials of a user with the required permissions to call SCIM 2.0 Users endpoint.

6. Provide the location of the CSV file you need to create. This is an **optional** parameter and by default,
the tool will create `users.csv` in the tool directory.

7. Select the attributes that need to be filtered. Only the chosen attributes will be specified in the CSV file.
This is also an **optional** input.

8. Provide the attributes that you need to exclude when creating the CSV file. These attributes will not be included in the CSV file. This is also an **optional** input.

9. Provide the userstore domain to be filtered to have users from the specified userstore in the created CSV file. This is an **optional** input.

10. Provide the start index to retrieve the users. The default is set to 1.

11. Provide the batch count to retrieve the users. The default is set to 100.

12. Provide the maximum count of users to be retrieved. The default is set to unlimited.

## What's Next?

Now that you have created the `users.csv` file, follow the guide of the relevant platform to upload the user data to it.

- [Hubspot]({{base_path}}/guides/users/sync-user-accounts/sync-with-hubspot/)
- [Salesforce]({{base_path}}/guides/users/sync-user-accounts/sync-with-salesforce/)
- [Pipedrive CRM]({{base_path}}/guides/users/sync-user-accounts/sync-with-pipedrive/)
- [Sendgrid]({{base_path}}/guides/users/sync-user-accounts/sync-with-sendgrid/)
- [Zoho CRM]({{base_path}}/guides/users/sync-user-accounts/sync-with-zoho/)
