# Configuring User Stores for SCIM 1.1 based inbound provisioning

For this inbound provisioning WSO2 Identity server supports for SCIM 1.1
and SCIM 2.0 this document we provide the additional steps that need to
follow when you used SCIM 1.1 as inbound provisioning mechanism.  And if
you need more information on SCIM see [SCIM
APIs](../../using-wso2-identity-server/scim-1.1-apis)

When a user or a group is created with SCIM, there are set of mandatory
SCIM  claim values that need to be saved along with the user or group.
Some of these values are as follows.

-   `          urn:scim:schemas:core:1.0:userName         `
-   `          urn:scim:schemas:core:1.0:meta.location         `
-   `          urn:scim:schemas:core:1.0:meta.created         `
-   `          urn:scim:schemas:core:1.0:meta.lastModified         `
-   `          urn:scim:schemas:core:1.0:id         `

Unless your user store is a JDBC user store or the embedded LDAP (that
comes with IS), you need to map how these values are stored in your user
store. This mapping can be done using the claim mapping setup in the
Identity Server. This mapping can be done in the claim mapping setup in
the Identity Server. You can find Active directory specific claim
configuration in [Configuring Active Directory User Stores for Inbound
Provisioning](../../using-wso2-identity-server/configuring-active-directory-user-stores-for-inbound-provisioning)
.

Now let's assume you have an AD user store as the primary user store and
you have done the claim mappings for the SCIM attributes. Then you need
to add a secondary user store and this will be an OpenLDAP. In this
scenario, claim mappings done for AD may not be suited for OpenLDAP
attributes. Therefore it should be possible to map claim attributes to
the secondary user store. For this, you need to change the "Mapped
Attribute" value as indicated below.

1.  Log in to the WSO2 Identity Server and access the [management
    console](../../setup/getting-started-with-the-management-console).
2.  In the **Main** menu of the management console, click **List** under
    **Claims**. For more information on configuring claims, see [Claim
    Management](../../using-wso2-identity-server/claim-management).
3.  Click on **urn:scim:schemas:core:1.0** claim dialect and find the
    mapped local claim to the SCIM claim that you need to edit. You can
    alternatively [Add a New Claim](../../using-wso2-identity-server/adding-claim-mapping) if the claim
    you wish to modify is not available.
4.  Once you found the Mapped Local Claim, select theat claim under
    **http://wso2.org/claims**
5.  Click **Edit** and modify the Mapped Attribute field in the
    resulting page.  
    ![mapped-attribute](../../assets/img/using-wso2-identity-server/mapped-attribute.png) 

Here we have configure a claim attribute mapping for primary user store,
if you have a secondary user store you need to add another mapping for
those as well. To do that just click Add, Attribute Mappings and set
values for user store domain name and mapped attribute.

!!! info 
    For information about Local Claim Dialect attributes, click
    [here](../../using-wso2-identity-server/adding-claim-mapping).

Now you can perform SCIM operations, See the samples cURL commands used
to secondary user store as below. Here, **demo** is the secondary user
store used in the examples.

**User Creation -** This will create user in the mentioned user store
domain.

**Request**

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"schemas":[],"name":{"familyName":"{LAST_NAME","givenName":"{FIRST_NAME"},"userName":"{SECONDARY_USER_STORE}/{USERNAME}","password":"{PASSWORD}","emails":"{EMAILS}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Users
```

**Request: Sample**

``` java
curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"demo/hasinitg","password":"hasinitg","emails":[{"primary":true,"value":"hasini_home.com","type":"home"},{"value":"hasini_work.com","type":"work"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users
```

**Update User** - This will update the user with a given SCIM user Id.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X PUT -d '{"schemas":[],"name":{"familyName":"{LAST_NAME","givenName":"{FIRST_NAME"},"userName":"{SECONDARY_USER_STORE}/{USERNAME}","password":"{PASSWORD}","emails":"{NEW_EMAILS}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Users/{SCIM_USER_ID}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X PUT -d '{"schemas":[],"name":{"familyName":"gunasinghe","givenName":"hasinitg"},"userName":"demo/hasinitg","emails":[{"value":"hasini@wso2.com","type":"work"},{"value":"hasi7786@gmail.com","type":"home"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Users/c5f05468-ce9e-445f-9dbc-4d719926bc30
```

**Filter User -** This will filter out a list of users that equate to a
specific parameter. Currently, we support only the equal operation.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} https://{IS_IP}:{IS_PORT}/wso2/scim/Users?filter={PARAMETER}+Eq+%22{PARAMETER_VALUE}%22
```

**Request: Sample**

``` java
curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Users?filter=userName+Eq+%22demo/hasinitg%22
```

**List Users -** List all the users available.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} https://{IS_IP}:{IS_PORT}/wso2/scim/Users
```

**Request: Sample**

``` java
curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Users
```

**Create Group -** This will create a group under a given user store
domain.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} --data '{"displayName": "{USERSTORE_DOMAIN}/{GROUP_NAME}","members": [{MEMEBERS_OF_THE_USERSTORE_DOMAIN}]}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups
```

**Request: Sample**

``` java
curl -v -k --user admin:admin --data '{"displayName": "demo/SoftwareEngineer","members": [{"value":"c5f05468-ce9e-445f-9dbc-4d719926bc30","display": "demo/hasinitg"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups
```

**Update Group -** This will update a given group of the specific
user-store domain.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X PUT -d '{"displayName": "{USERSTORE_DOMAIN}/{GROUP_NAME}","members": [{MEMBERS}}}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{SCIM_GROUP_ID}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X PUT -d '{"displayName": "demo/SoftwareEngineer","members": [{"value":"c5f05468-ce9e-445f-9dbc-4d719926bc30","display": "demo/hasinitg"}, {"value":"p09okhyt-5e68-4594-8mkj-356ade12we34","display": "testUser"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/574dd322-adf5-4dee-8b03-27130fb5cece
```

**Filter Group -** This will filter the groups that are equal to a given
display name.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD}  https://{IS_IP}:{IS_PORT}/wso2/scim/Groups?filter={PARAMETER}Eq{VALUE_TO_BE_EQUAL}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin https://localhost:9443/wso2/scim/Groups?filter=displayNameEqdemo/SoftwareEngineer
```

**Delete  Group -** This will delete a group with a given SCIM group id.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X DELETE https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{SCIM_GROUP_ID} -H "Accept: application/json"
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X DELETE https://localhost:9443/wso2/scim/Groups/574dd322-adf5-4dee-8b03-27130fb5cece -H "Accept: application/json"
```

!!! note
    
    If a mapped attribute matches with the secondary user store, then it is
    not necessary to repeat the attribute value in the claim mapping for the
    secondary domain.
    

**Add a new member to a group -** This will add a new member to a group
with a specific SCIM group id of a user-store domain.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD}  -X PATCH -d '{"displayName": "{USERSTORE_DOMAIN}/{GROUP_NAME}","members": [{NEW_MEMBER_TO_ADD}]}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/{SCIM_GROUP_ID}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"displayName": "demo/secEngineer","members": [{"value":"4a0fcb2b-efff-4dc2-ad2d-a25f0a814bd3","display": "demo/secUser1"}]}' --header "Content-Type:application/json" https://{IS_IP}:{IS_PORT}/wso2/scim/Groups/574dd322-adf5-4dee-8b03-27130fb5cece
```

**Delete a member from a group -** This will delete a member from a
given group of a user-store domain.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X PATCH -d '{"displayName": "{USERSTORE_DOMAIN}/{GROUP_NAME}","members": [{MEMBER_TO_DELETE}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/{SCIM_GROUP_ID}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"displayName": "demo/secEngineer","members": [{"value":"4a0fcb2b-efff-4dc2-ad2d-a25f0a814bd3","display": "demo/secuser1","operation":"delete"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/574dd322-adf5-4dee-8b03-27130fb5cece
```

**Add a new member and delete a member at the same time -** This will
add a new member and delete a member from the group at the same time in
a specific user-store domain.

``` java
curl -v -k --user {IS_USERNAME}:{IS_PASSWORD} -X PATCH -d '{"displayName": "{USERSTORE_DOMAIN}/{GROUP_NAME}","members": [{MEMBER},{"value":"{SCIM_USER_ID","display": "{USER_DISPLAY_NAME","operation":"delete"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/{SCIM_GROUP_ID}
```

**Request: Sample**

``` java
curl -v -k --user admin:admin -X PATCH -d '{"displayName": "demo/secEngineer","members": [{"value":"4a0fcb2b-efff-4dc2-ad2d-a25f0a814bd3","display": "demo/secuser1"},{"value":"b2f5182d-ebfc-4b74-b0db-537e8dba38c3","display": "US2/secuser5","operation":"delete"}]}' --header "Content-Type:application/json" https://localhost:9443/wso2/scim/Groups/574dd322-adf5-4dee-8b03-27130fb5cece
```
