# Extending SCIM 2.0 User Schemas

## About SCIM 2.0
 
The System for Cross-domain Identity Management (SCIM) is a
specification that is designed to manage user identities in cloud-based
applications and services in a standardized way to enable
interoperability, security, and scalability. It is an emerging open
standard which provides RESTful APIs for easier, cheaper, and faster way
for creating, provisioning, and maintaining identities. The latest
version SCIM 2.0 was released as IETF RFC in September 2015.

!!! Note 
    SCIM 2.0 is supported by default in WSO2 Identity Server
    version 5.4.0 onwards. If you are using WSO2 Identity Server 5.4.0 or a
    later version, see
    [SCIM 2.0 REST     APIs](../../develop/using-the-scim-2.0-rest-apis) for
    instructions on how to use SCIM 2.0 OOTB.
    
## Extending the SCIM 2.0 API 

The SCIM 2.0 (System for Cross-Domain Identity Management) specification defines a [fixed set of default attributes](http://tools.ietf.org/html/draft-ietf-scim-core-schema-01#section-11.2) for the user object. This set is defined to ensure the interoperability and it can cater to most of the industry's identity management requirements. However, in reality, organizations have their own attributes defined for their users which have already been used in their LDAP schemas. Therefore, SCIM is extensible enough to cope with custom attributes and uses the [Enterprise User Extension](https://tools.ietf.org/html/draft-ietf-scim-core-schema-01#section-11.3) to support extra attributes for the SCIM user object.

WSO2 Identity Server allows users to define their own user schema in addition to the core user schema. These configured schema are then used while creating or validating user objects. This means that custom user attributes can be passed using SCIM for identity management requirements. Follow the steps given below to add a custom attribute. 
    
1. Open the `scim2-schema-extension.config` file located in the `<IS_HOME>/repository/conf/` folder.

2. Define the extension by adding attributes in the following format before the last element of the JSON array in
    the `scim2-schema-extension.config` file. 

    ``` java
        {
        "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:customClaim",
        "attributeName":"customClaim",
        "dataType":"boolean",
        "multiValued":"false",
        "description":"customClaim",
        "required":"false",
        "caseExact":"false",
        "mutability":"readwrite",
        "returned":"default",
        "uniqueness":"none",
        "subAttributes":"null",
        "canonicalValues":[],
        "referenceTypes":[]
        }
    ```

3.  Add the attribute names of the attributes that you added to the
    `           scim2-schema-extension.config          ` file as
    `                       subAttributes                     ` of the
    `           wso2Extension          ` attribute as seen in the code
    block below.

    ``` java
        {
        "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
        "attributeName":"EnterpriseUser",
        "dataType":"complex",
        "multiValued":"false",
        "description":"Enterprise User",
        "required":"false",
        "caseExact":"false",
        "mutability":"readWrite",
        "returned":"default",
        "uniqueness":"none",
        "subAttributes":"employeeNumber costCenter organization division department manager customClaim",
        "canonicalValues":[],
        "referenceTypes":["external"]
        }
    ```

3. Save the file and restart WSO2 Identity Server. 

## Add the custom claim

1. Log in to the [management console](https://localhost:9443/carbon/) using admin/admin credentials. 

2. Click **Add** under **Claims**. 

3. Click **Add Local Claim** and enter the following values. 
    - **Claim URI**: http://wso2.org/claims/customclaim
    - **Display Name**: Custom Claim
    - **Description**: Custom Claim
    - **Mapped Attribute(s**):
        - **User Store Domain Name**: PRIMARY
        - **apped Attribute**: customClaim
    - **Supported By Default**: True

    ![add-scim-local-custom-claim](../assets/img/learn/add-scim-local-custom-claim.png)

4. Click **Add**. 

!!! note
    Note the following:

    - You can use the word "customClaim" (or any other preferred word) as the **Mapped Attribute** only when using a JDBC user store because JDBC user stores will automatically create a new attribute if it does not already exist in the user store. However, If you are using LDAP or Active Directory, you will have to use an attribute that exists in the user store already.

    - The configuration above is valid when using the PRIMARY user store. If you have a secondary user store configured, make sure to add another attribute mapping by clicking Add Attribute Mapping and selecting the secondary user store as well.

## Map the custom claim

1. Click **Add** under **Claims**.

2. Click **Add External Claim** and enter the following values.
    - **Dialect URI**: urn:ietf:params:scim:schemas:extension:enterprise:2.0:User
    - **External Claim URI**: urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:customClaim
    - **Mapped Local Claim**: http://wso2.org/claims/customclaim

    ![add-scim-external-claim](../assets/img/learn/add-scim-external-claim.png)

3. Click **Add**. 

## Try it out

1. Click **Add** under **Users and Roles**.  

2. Click **Add New User** and give the user a username and password. 

3. Click **List** under **Users and Roles** and then go to the **User Profile** of the user you just created. 

4. Add a value for the **Custom Claim** field and click **Save**. 

5. Retrieve the user using SCIM and ensure that the custom claim value is present. 

    ```bash tab="SCIM Request"
    curl -v -k --user admin:admin https://localhost:9443/scim2/Users
    ```

    ``` bash tab="SCIM Response"
    {"totalResults":2,"startIndex":1,"itemsPerPage":2,
    "schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    "Resources":[{"emails":["admin@wso2.com"],
    "meta":{"created":"2020-01-21T16:52:11Z",
    "lastModified":"2020-01-21T16:52:11Z"},"roles":[{"type":"default",
    "value":"Internal/everyone,admin"}],"name":{"givenName":"admin",
    "familyName":"admin"},"id":"54779523-8677-48bc-bce6-1764b7439f64",
    "userName":"admin"},{"emails":[{"type":"home","value":"testvalue"},
    "alex@gmail.com"],"meta":{"created":"2020-01-21T16:56:56Z",
    "lastModified":"2020-01-21T17:02:43Z","resourceType":"User"},
    "EnterpriseUser":{"customClaim":"testvalue"},"roles":[{"type":"default",
    "value":"Internal/everyone"}],"name":{"givenName":"Alex",
    "familyName":"alex"},"id":"c91b5f1c-08c7-44d3-89c4-34ea9440dea5","userName":"alex"}]}
    ```

You can also try out updating the Custom Claim value using the following SCIM command and checking if the value is updated by accessing the user profile on the management console. 

```curl
curl -k -X PATCH \
  https://localhost:9443/scim2/Users/be8f8562-7661-44a9-b6f4-d6d94dac914f \
  -H 'Authorization: Basic dmloYW5nYTphZG1pbg==' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 3cbbfd68-7f1f-4ce4-8b5e-ffb4b88c4171' \
  -d '{
   "schemas":[
      "urn:ietf:params:scim:api:messages:2.0:PatchOp"
   ],
   "Operations":[
      {
         "op":"replace",
         "value":{
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                 "customClaim": "new value"
            }
         }
      }
   ]
}'
```