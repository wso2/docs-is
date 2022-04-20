# Importing users

In addition to manually adding individual users, you can import multiple
users in bulk if you have exported them to comma-separated values (.csv)
file or Microsoft Excel (.xls) file.

!!! info "Note the following before you use this feature"

      -   If the option to import users in bulk is not enabled in your product
         by default, you can enable it by adding the following property to
         the JDBC user store configured in the
         `            deployment.toml           ` file (stored in the
         `            <IS_HOME>/repository/conf           ` directory).
         Please see the [User Store management](../../setup/configuring-the-primary-user-store) section for more
         information.

		```toml
		[user_store.properties]
		is_bulk_import_supported  =  true
		```

      -   It is recommended to upload a maximum of 500,000 users at a time. If
         you need to upload more users, you can upload them in separate
         batches of 500,000 each.
      -   You can also specify the size of the file that you can upload to the
         product in the
         `            <IS_HOME>/repository/conf/deployment.toml           `
         file as shown below. This value is in MB.

		``` toml
		[server.file_upload]
		file_size_limit = "100"
		```

## Creating a file with users

You must first create a CSV file or an Excel file with the user
information. It is possible to import the **username** and **password**
directly from the CSV/Excel to the product. Other user attributes can be
imported if [claim URls are defined for such
attributes](../../learn/managing-user-attributes). Shown below are the
claim URls that are defined by default in WSO2 IS. These will allow you
to import the user's **email address**, **country**, **given name**
etc. in addition to the **username** and **password**.

-   http://wso2.org/claims/country
-   http://wso2.org/claims/emailaddress
-   http://wso2.org/claims/givenname
-   http://wso2.org/claims/im
-   http://wso2.org/claims/lastname
-   http://wso2.org/claims/mobile
-   http://wso2.org/claims/organization
-   http://wso2.org/claims/role
-   http://wso2.org/claims/streetaddress
-   http://wso2.org/claims/telephone
-   http://wso2.org/claims/url

The username, password and other attributes (claim URls) that you import
should be given in a CSV file as shown below. Note that the first line
of the file will not be imported considering that it is not a username.

``` java
UserName,Password,Claims
name1,Password1,http://wso2.org/claims/emailaddress=name1@gmail.com,http://wso2.org/claims/country=France
name2,Password2,http://wso2.org/claims/emailaddress=name2@gmail.com,http://wso2.org/claims/country=France
name3,Password3,http://wso2.org/claims/emailaddress=name3@gmail.com,http://wso2.org/claims/country=France
```

!!! note
    The Ask Password option can be enabled for bulk user creation by passing a value for password and setting the `askPassword` claim to true as shown below.
    
    ``` java
    UserName,Password,Claims
    name1,Password1,http://wso2.org/claims/emailaddress=name1@gmail.com,http://wso2.org/claims/country=France
    name2,Password2,http://wso2.org/claims/emailaddress=name2@gmail.com,http://wso2.org/claims/country=France     	     name3,Password3,http://wso2.org/claims/emailaddress=name3@gmail.com,http://wso2.org/claims/country=France,http://wso2.org/claims/identity/askPassword=true
    ```
    

## Importing users from the CSV/Excel file

To import users in bulk:

1.  Log in to the management console.
2.  Click **Add** under **Users and Roles** in the **Main** menu.
3.  In the **Add Users** and **Roles** screen, click **Bulk Import
    Users**.
4.  The user stores configured for your product will be listed in the
    **Domain** field. Select the user store to which you want to import
    the users from the list.
5.  Click **Choose File** to give the path to the CSV/Excel file that
    contains the users that you want to import.
6.  Click **Finish** to start importing.

!!! info
      The default password of the imported users is valid only for 24 hours.
      As the system administrator, you can resolve issues of expired passwords
      by logging in as the Admin and changing the user's password from the
      **User Management -\>** **Users** page. The 'Everyone' role will be
      assigned to the users by default.