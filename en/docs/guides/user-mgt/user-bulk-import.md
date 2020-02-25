# Importing Users From a File

WSO2 Identity Server supports importing users from a CSV file. This can be used when you have a legacy user store
 which has a proprietary schema, and you no longer need to maintain the legacy user base.
 
## Supported File Format
The user records should be in CSV format and should follow the format below,
### For users with pre-known passwords
The first value of each row should be the username, followed by password, and the list of claims. The list of claims
 should have key-value pairs, where key is the claim URI and value is the claim value. Following is an example, 
```csv
UserName,Password,claims
johndoe,j0hnd0exyz,http://wso2.org/claims/emailaddress=john@example.com,http://wso2.org/claims/givenname=John,http://wso2.org/claims/lastname=Doe
jane,j4ne321,http://wso2.org/claims/emailaddress=jane@example.com,http://wso2.org/claims/givenname=Jane,http://wso2.org/claims/lastname=David
```
 
### For users without pre-known passwords
If the passwords of the users are unknown, you may force to set a password for the users by sending an email with a
 link. To do that we need to include a special claim `http://wso2.org/claims/identity/askPassword` for each of the
  users. Note that the email claim is mandatory in this case. The rest of the format is similar to what is explained
   in previous section. Following is an example,
```csv
UserName,Password,claims
johndoe,randompass,http://wso2.org/claims/emailaddress=john@example.com,http://wso2.org/claims/givenname=John,http://wso2.org/claims/lastname=Doe
jane,randompass,http://wso2.org/claims/emailaddress=jane@example.com,http://wso2.org/claims/givenname=Jane,http://wso2.org/claims/lastname=David,http://wso2.org/claims/identity/askPassword=true
```

## Before You Begin
Before you begin importing the users to the Identity Server, there are few things to note.

* Import user functionality is not enabled by default. To enable this feature please add the configuration
 below to the deployment.toml
```toml
[user_store.properties]
is_bulk_import_supported  =  true
```

* It is recommended to upload a maximum of 500,000 users at a time. If you need to upload more users, you can upload
 them in separate batches of 500,000 each
* Update the maximum file size limit to match the size of the file you are uploading. To do that, add the
 configuration below to the deployment.toml file. Note the units are in MB.
```toml
[server.file_upload]
file_size_limit = "100"
```
* Restart the server to apply any changes you did for deployment.toml file


## Importing to Identity Server

* Log in to the management console.
* Click **Add** under **Users and Roles** in the **Main** menu.
* In the **Add Users** and **Roles** screen, click **Bulk Import Users**.
* The user stores configured for your product will be listed in the **Domain** field. Select the user store to which
 you want to import the users from the list.
* Click **Finish** to start importing.
