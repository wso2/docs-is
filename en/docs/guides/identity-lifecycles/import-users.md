# Import Users

This page guides you through importing users in bulk using either the WSO2 Identity Server admin portal, SCIM, SOAP, a .csv file, or directly plugging in an existing user store. 

-----

## Import users using SCIM
You can create users in bulk using a SCIM request as shown below. 

**Request**

```curl
curl -v -k --user [username]:[password] --data '{"failOnErrors": [value],"schemas":[],"Operations":[{"method": [request type],"path": [end point],"bulkId": [bulk id],"data": [input user details] }] }' --header "Content-Type:application/scim+json" https://localhost:9443/scim2/Bulk
```

Below is a sample request and its corresponding response using SCIM 2.0. 

```tab="Sample Request"
curl -v -k --user admin:admin --data '{"failOnErrors":1,"schemas":["urn:ietf:params:scim:api:messages:2.0:BulkRequest"],"Operations":[{"method": "POST","path": "/Users","bulkId": "qwerty","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User"],"userName": "Kris","password":"krispass"}},{"method": "POST","path": "/Users","bulkId":"ytrewq","data":{"schemas":["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],"userName":"Jesse","password":"jessepass","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{"employeeNumber": "11250","manager": {"value": "bulkId:qwerty"}}}}]}' --header "Content-Type:application/scim+json" https://localhost:9443/scim2/Bulk
```

```tab="Sample Response"
{"schemas":["urn:ietf:params:scim:api:messages:2.0:BulkResponse"],"Operations":[{"bulkId":"qwerty","method":"POST","location":"https://localhost:9443/scim2/Users/81cbba1b-c259-485d-8ba4-79afb03e5bd1","status":{"code":201}},{"bulkId":"ytrewq","method":"POST","location":"https://localhost:9443/scim2/Users/b489dacc-fc89-449c-89f6-7acc37422031","status":{"code":201}}]}
```

---

## Import users using SOAP

You can also import users from a `.csv` file by initiating a SOAP request as shown below. 

```curl
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:bulkImportUsers>
         <!--Optional:-->
         <!--Optional:-->
         <xsd:fileName>bulkUserImport.csv</xsd:fileName>
         <!--Optional:-->
         <xsd:handler>cid:133299223356</xsd:handler>
         <!--Optional:-->
         <xsd:defaultPassword>admin</xsd:defaultPassword>
      </xsd:bulkImportUsers>
   </soapenv:Body>
</soapenv:Envelope>
```
You can find a sample csv file to try this in the [product-is repo](https://github.com/wso2/product-is/blob/master/modules/integration/tests-ui-integration/src/test/resources/artifacts/IS/userMgt/bulkUserImport.csv). 

---

## Import users using CSV files

### Create a file with user attributes
You must first create a CSV file or an Excel file with the user information. It is possible to import the username and 
password directly from the CSV/Excel to the product. Other user attributes can be imported if claim URls are defined for
such attributes. Shown below are the claim URls that are defined be default in WSO2 IS. These will allow you to import 
the user's **email address, country, given name etc**. in addition to the **username** and **password**.

The **username**, **password** and **other attributes** (claim URls) that you import should be given in a CSV file as 
shown below. Note that the first line of the file will not be imported considering that it is not a username.

```
UserName,Password,Claims
name1,Password1,http://wso2.org/claims/emailaddress=name1@gmail.com,http://wso2.org/claims/country=France
name2,Password2,http://wso2.org/claims/emailaddress=name2@gmail.com,http://wso2.org/claims/country=France
name3,Password3,http://wso2.org/claims/emailaddress=name3@gmail.com,http://wso2.org/claims/country=France
```

!!! note
    [Ask Password](../invitation-workflow) option can be enabled for bulk user creation by passing a value for password and 
     setting the askPassword claim to true as shown below.
     ```
     UserName,Password,Claims
     name1,Password1,http://wso2.org/claims/emailaddress=name1@gmail.com,http://wso2.org/claims/country=France
     name2,Password2,http://wso2.org/claims/emailaddress=name2@gmail.com,http://wso2.org/claims/country=France
     name3,Password3,http://wso2.org/claims/emailaddress=name3@gmail.com,http://wso2.org/claims/country=France,http://wso2.org/claims/identity/askPassword=true
     ```
     
### Import users from the CSV/Excel file

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

### Import users by plugging in a user store

Apart from this, users can also be added by directly plugging user stores into WSO2 Identity Server. For more information on this, see [Secondary User Stores](../../../deploy/configure-secondary-user-stores/).

----
    
!!! info "Related Topics"
    - [Concept: Users](../../../concepts/user-management/users)
    - [Guide: Admin Creation Workflow](../admin-creation-workflow) 
    - [Guide: User Self Registration Workflow](../self-registration-workflow)
    - [Guide: Just in Time User Provisioning Workflow](../jit-workflow)
    - [Guide: Invitation Workflow](../invitation-workflow) 
    - [Guide: Outbound Provisioning](../outbound-provisioning)
    
