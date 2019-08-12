# Configuring Active Directory User Stores for Inbound Provisioning

WSO2 Identity Server can act both as a SCIM Provider and as a SCIM
consumer at the same time. You can test the WSO2 Identity Server's SCIM
Provider API as described [here](../../using-wso2-identity-server/scim-1.1-apis). The WSO2 Identity
Server build includes the ApacheDS embedded LDAP server. The LDAP
server's schema is customized to have the mandatory SCIM attributes,
therefore SCIM implementation works by default with the WSO2 Identity
Server.

However, when the WSO2 Identity Server is connected to an external LDAP
or an Active Directory instance, they might not have these mandatory
SCIM attributes in their schema. So the option is to map the SCIM claims
to the existing attributes of the Active Directory.

Add a user with the username "john" and password "Wso2@123". Here we
have to map the **userName** (
`         urn:scim:schemas:core:1.0:userName        ` ) SCIM attribute
to an existing claim in the Active Directory (e.g.:
`         cn        ` ). Furthermore, when a user is being added in
SCIM, there are four more SCIM attributes being added behind the scene.
These are the SCIM attributes such as **location** (
`         urn:scim:schemas:core:1.0:meta.location        ` ),
**created** ( `         urn:scim:schemas:core:1.0:meta.created        `
), **lastModified** (
`         urn:scim:schemas:core:1.0:meta.lastModified        ` ) and
finally the **id** ( `         urn:scim:schemas:core:1.0:id        ` ).
So we need to map these to existing Active Directory user attributes.

When mapping claims to attributes, there are few things to be
considered. The SCIM claim dialect (
`         urn:scim:schemas:core:1.0:id        ` ) uses String type to
hold their values. So, when mapping any SCIM claim to an attribute in
the Active Directory, make sure to use the attributes which are having
the String type. You can find all Active Directory attributes
[here](http://www.kouti.com/tables/userattributes.htm). Given below is
a plausible example for claim mapping,

| CLAIM URI                                                              | MAPPED ATTRIBUTE                             |
|------------------------------------------------------------------------|----------------------------------------------|
| `             urn:scim:schemas:core:1.0:userName            `          | `             cn            `                |
| `             urn:scim:schemas:core:1.0:meta.location            `     | `             streetAddress            `     |
| `             urn:scim:schemas:core:1.0:meta.created            `      | `             homePhone            `         |
| `             urn:scim:schemas:core:1.0:meta.lastModified            ` | `             pager            `             |
| `             urn:scim:schemas:core:1.0:id            `                | `             homePostalAddress            ` |

This claim mapping can be done through the WSO2 Identity Server Claim
Management Feature.

1.  Log in to WSO2 Identity Server using your credentials.
2.  Go to the **Main** menu in the Management Console menu and click
    **List** under **Claims**.
3.  Select `          urn:scim:schemas:core:1.0         ` from the list.
4.  Choose the **Id** claim and click on **Edit**.  
    ![id-claim](../../assets/img/using-wso2-identity-server/id-claim.png) 
5.  Change the **Mapped Attribute** value to **homePostalAddress** and
    click **Update**.  
    ![update-mapped-attribute](../../assets/img/using-wso2-identity-server/update-mapped-attribute.png)
6.  Edit the other four claims in the same way.
7.  Now the basic claim mapping is done. You can now add a user using
    the following curl command.

    -   Primary Userstore Command
    
    ``` java
    curl -v -k --user admin:admin --data "{"schemas":[],"userName":"john","password":"Wso2@123"}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```
    
    -   Secondary Userstore Command

    ``` java
        curl -v -k --user admin:admin --data "{"schemas":[],"userName":'wso2.com/uresh67',"password":"Wso2@123"}" --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
    ```

    Note that the user name is preceded by the domain and is within
    single quotes 'wso2.com/uresh67'. Also note that 'wso2.com' here is
    a reference to a domain name.

    In RestClient, the following header parameters must be added and the
    double quotations must be removed from the message body.

    !!! info 
        Content-Type: application/json  
        Accept: \*/\*  
        Message body  
        {schemas:\[\],userName:'wso2.com/uresh67',password:Wso2@123}

    !!! info 
        You need to do the claim mapping for every SCIM claim you are using
        with user operations.
