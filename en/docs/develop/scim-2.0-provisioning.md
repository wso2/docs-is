# Provisioning with SCIM 2.0 

### About SCIM 2.0
 
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
    
### Extending the SCIM 2.0 API 

If you want to add any custom attributes, you can use the user schema
extension in addition to core user schema. To add attributes with the
user schema extension, do the following:
    
1.  Define the extension by adding attributes in the following format in
    the `           scim2-schema-extension.config          ` file that
    you placed in the `           <IS_HOME>/repository/conf/          `
    folder.

    ``` java
        {
        "attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:askPassword",
        "attributeName":"askPassword",
        "dataType":"boolean",
        "multiValued":"false",
        "description":"Enable password change required notification in the user creation.",
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

2.  Add the attribute names of the attributes that you added to the
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
        "subAttributes":"askPassword employeeNumber costCenter organization division department manager",
        "canonicalValues":[],
        "referenceTypes":["external"]
        }
    ```

3.  Define a new claim dialect for the extension schema with the dialect
    URI you used in defining the extension. For more information on how
    to do this, see [Adding Claim
    Dialects](../../learn/adding-claim-dialects)
    .  
    The following code block shows an example of a claim dialect for the
    custom attributes given above.

    ``` java
        urn:ietf:params:scim:schemas:extension:enterprise:2.0:User
    ```

4.  Once you add a custom attribute, add a claim mapping for the custom
    attribute.  
    To do this, open the `           claim-config.xml          ` file
    found in the `           <IS_HOME>/respository/conf          `
    folder, and add the claim with the relevant property values. The
    code block below shows an example of a claim mapping.

    ``` java
        <Claim>
            <ClaimURI>urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:askPassword</ClaimURI>
            <DisplayName>Ask Password</DisplayName>
            <AttributeID>postOfficeBox</AttributeID>
            <Description>Temporary claim to invoke email ask Password feature</Description>
            <Required />
            <DisplayOrder>1</DisplayOrder>
            <SupportedByDefault />
            <MappedLocalClaim>http://wso2.org/claims/identity/askPassword</MappedLocalClaim>
        </Claim>
    ```

5.  Next, add the claim mapping in the relevant tenant through the
    management console. To do this, login using tenant credentails and
    map the claim.  
    For more information on adding a claim mapping through the
    management console, see [Adding Claim
    Mapping](../../learn/adding-claim-mapping#add-external-claim)
    .

    !!! info 
        It is recommended to configure through both the management console
        and the `            claim-config.xml           ` file because the
        configuration made in the config file will ensure that this claim is
        available for all tenants created in future but it needs to be
        mapped in the management console in order to map the claim for
        exisiting tenants.
        
### Try it out

Once you have successfully configured the SCIM 2.0 extensions with WSO2
Identity Server, you can test any SCIM 2.0 REST call with WSO2 Identity
Server using CURL commands in the
[SCIM 2.0 API document](../../develop/using-the-scim-2.0-rest-apis).
