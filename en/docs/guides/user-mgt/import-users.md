# Import Users

## Import users using the admin portal

{insert-fragment}

---

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


!!! note
    Apart from this, users can also be added by directly plugging user stores into WSO2 Identity Server. For more information on this, see [Secondary User Stores](insert-admin-portal-link).