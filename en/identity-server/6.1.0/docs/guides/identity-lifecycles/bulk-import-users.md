# Bulk Import Users

This page guides you through importing users in bulk using the WSO2 Identity Server admin portal, SCIM, SOAP, a .csv file, or directly plugging in an existing userstore. 

## Prerequisites

-   If the option to import users in bulk is not enabled in your product
    by default, you can enable it by adding the following property to
    the JDBC user store configured in the
    `            deployment.toml           ` file (stored in the
    `            <IS_HOME>/repository/conf           ` directory).
    Please see the [User Store management]({{base_path}}/deploy/configure-the-primary-user-store) section for more
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

## Use the SCIM2 API
You can create users in bulk using a SCIM request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"failOnErrors": [value],"schemas":[],"Operations":[{"method": [request type],"path": [end point],"bulkId": [bulk id],"data": [input user details] }] }' --header "Content-Type:application/scim+json" https://localhost:9443/scim2/Bulk
```

Below is a sample request and its corresponding response using SCIM 2.0. 

!!! abstract ""
    **Sample Request**
    ```
    curl -v -k --user admin:admin --data '{"failOnErrors":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],"Operations":[{"method": "POST","path": "/Users","bulkId": "qwerty","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName": "Kris","password":"krispass"}},{"method": "POST","path": "/Users","bulkId":"ytrewq","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"userName":"Jesse","password":"jessepass","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber": "11250","manager": {"value": "bulkId:qwerty"}}}}]}' --header "Content-Type:application/scim+json" https://localhost:9443/scim2/Bulk
    ```
    ---
    **Sample Response**
    ```
    {
        "schemas":["urn:ietf:params:scim:api:messages:2.0:BulkResponse"],
        "Operations":[
            {
                "bulkId":"qwerty",
                "method":"POST",
                "location":"https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1",
                "status":{"code":201}
            },
            {
                "bulkId":"ytrewq",
                "method":"POST",
                "location":"https://localhost:9443/scim2/Users/b489dacc-fc89-449c-89f6-7acc37422031",
                "status":{"code":201}
            }
        ]
    }
    ```

## Use CSV files

In addition to manually adding individual users, you can import multiple
users in bulk if you have exported them to comma-separated values (.csv)
file or Microsoft Excel (.xls) file.

### Create a file with users

You must first create a CSV file or an Excel file with the user
information. It is possible to import the **username** and **password**
directly from the CSV/Excel to the product. Other user attributes can be
imported if [claim URls are defined for such
attributes]({{base_path}}/guides/identity-lifecycles/manage-user-attributes). Shown below are the
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

### Import the CSV/Excel file

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
----

## Plug in a user store

Apart from this, users can also be added by directly plugging userstores into WSO2 Identity Server. For more information on this, see [Secondary User Stores]({{base_path}}/deploy/configure-secondary-user-stores/).

!!! info "Related topics"
    - [Concept: Users]({{base_path}}/references/concepts/user-management/users)
    - [Guide: Admin Creation Workflow]({{base_path}}/guides/identity-lifecycles/admin-creation-workflow) 
    - [Guide: User Self Registration Workflow]({{base_path}}/guides/identity-lifecycles/self-registration-workflow)
    - [Guide: Invitation Workflow]({{base_path}}/guides/identity-lifecycles/invitation-workflow) 
    - [Guide: Outbound Provisioning]({{base_path}}/guides/identity-lifecycles/outbound-provisioning)
    
