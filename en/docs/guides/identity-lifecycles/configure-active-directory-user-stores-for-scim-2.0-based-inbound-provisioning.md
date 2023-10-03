# Configure Active Directory Userstores for SCIM 2.0 based Inbound Provisioning

WSO2 Identity Server can act both as a SCIM Provider and a SCIM consumer at the same time. You can test the WSO2 Identity Server's SCIM 2.0 Provider API as described here.

When the WSO2 Identity Server is connected to an external LDAP or an Active Directory instance, they might not have these mandatory SCIM attributes in their schema. So the option is to map the SCIM claims to the existing attributes of the Active Directory.

Add a user with the username "Alex" and password "Wso2@123". Here we have to map the **userName** (urn:ietf:params:scim:schemas:core:2.0:User) SCIM attribute to an existing claim in the Active Directory (e.g.: cn). Furthermore, when a user is being added in SCIM, there are four more SCIM attributes being added behind the scene including **location** (urn:ietf:params:scim:schemas:core:2.0), **created** (urn:ietf:params:scim:schemas:core:2.0), **lastModified** (urn:ietf:params:scim:schemas:core:2.0), and **id** (urn:ietf:params:scim:schemas:core:2.0). These attributes need to be mapped to the existing Active Directory user attributes as well.

The SCIM claim dialect (urn:ietf:params:scim:schemas:core:2.0:User and urn:ietf:params:scim:schemas:core:2.0) uses `String` type to hold their values. So, when mapping any SCIM claim to an attribute in the Active Directory, make sure to use the attributes of `String` type. You can find all Active Directory attributes [here](https://docs.microsoft.com/en-us/windows/win32/adschema/attributes-all).

When a user or a group is created with SCIM 2.0, there are a set of mandatory SCIM 2.0 claim values that need to be saved along with the user or group. Some of these values are as follows.

-   urn:ietf:params:scim:schemas:core:2.0:meta.location 
-   urn:ietf:params:scim:schemas:core:2.0:meta.resourceType 
-   urn:ietf:params:scim:schemas:core:2.0:meta.version 
-   urn:ietf:params:scim:schemas:core:2.0:meta.created 
-   urn:ietf:params:scim:schemas:core:2.0:id 
-   urn:ietf:params:scim:schemas:core:2.0:meta.lastModified 
-   urn:ietf:params:scim:schemas:core:2.0:User:userName

This claim mapping can be done through the WSO2 Identity Server Claim Management Feature.

## Step 1: Set up the secondary user store

You need to configure the secondary user store. This can be done in the following methods:

- [Using the management console]({{base_path}}/deploy/configure-secondary-user-stores/#configure-using-the-management-console)

    For this usecase you can select any one of the following **Userstore Manager Class** from the list:

    - `org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager` <sup><b>RECOMMENDED</b></sup>
    - `org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager`

- [Manually]({{base_path}}/deploy/configure-secondary-user-stores/#configure-manually)

    If you are using `org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager` class to configure the user store, use the following user store file configuration.

    ??? note "User store file configuration"
        ```xml
        <?xml version=”1.0" encoding=”UTF-8"?><UserStoreManager class=”org.wso2.carbon.user.core.ldap.ActiveDirectoryUserStoreManager”>
        <Property name=”ConnectionURL”>***************</Property>
        <Property name=”ConnectionName”>CN=ADMIN,CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”ConnectionPassword”>*************</Property>
        <Property name=”UserSearchBase”>CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”UserEntryObjectClass”>user</Property>
        <Property name=”UserNameAttribute”>cn</Property>
        <Property name=”UserNameSearchFilter”>(&amp;(objectClass=user)(cn=?))</Property>
        <Property name=”UserNameListFilter”>(objectClass=user)</Property>
        <Property name=”UserDNPattern”/>
        <Property name=”DisplayNameAttribute”/>
        <Property name=”Disabled”>false</Property>
        <Property name=”ReadGroups”>true</Property>
        <Property name=”WriteGroups”>true</Property>
        <Property name=”GroupSearchBase”>CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”GroupEntryObjectClass”>group</Property>
        <Property name=”GroupNameAttribute”>cn</Property>
        <Property name=”GroupNameSearchFilter”>(&amp;(objectClass=group)(cn=?))</Property>
        <Property name=”GroupNameListFilter”>(objectcategory=group)</Property>
        <Property name=”RoleDNPattern”/>
        <Property name=”MembershipAttribute”>member</Property>
        <Property name=”MemberOfAttribute”>memberOf</Property>
        <Property name=”BackLinksEnabled”>true</Property>
        <Property name=”Referral”>follow</Property>
        <Property name=”UserNameJavaRegEx”>[a-zA-Z0–9._-|//]{3,30}$</Property>
        <Property name=”UserNameJavaScriptRegEx”>^[\S]{3,30}$</Property>
        <Property name=”UsernameJavaRegExViolationErrorMsg”>Username pattern policy violated.</Property>
        <Property name=”PasswordJavaRegEx”>^[\S]{5,30}$</Property>
        <Property name=”PasswordJavaScriptRegEx”>^[\S]{5,30}$</Property>
        <Property name=”PasswordJavaRegExViolationErrorMsg”>Password pattern policy violated.</Property>
        <Property name=”RoleNameJavaRegEx”>^[a-zA-Z0–9._-|//]{3,30}$</Property>
        <Property name=”RoleNameJavaScriptRegEx”>^[\S]{3,30}$</Property>
        <Property name=”BulkImportSupported”>true</Property>
        <Property name=”EmptyRolesAllowed”>true</Property>
        <Property name=”PasswordHashMethod”>PLAIN_TEXT</Property>
        <Property name=”MultiAttributeSeparator”>,</Property>
        <Property name=”isADLDSRole”>false</Property>
        <Property name=”userAccountControl”>512</Property>
        <Property name=”MaxUserNameListLength”>100</Property>
        <Property name=”MaxRoleNameListLength”>100</Property>
        <Property name=”kdcEnabled”>false</Property>
        <Property name=”defaultRealmName”>WSO2.ORG</Property>
        <Property name=”UserRolesCacheEnabled”>true</Property>
        <Property name=”ConnectionPoolingEnabled”>false</Property>
        <Property name=”LDAPConnectionTimeout”>5000</Property>
        <Property name=”ReadTimeout”>5000</Property>
        <Property name=”RetryAttempts”>0</Property>
        <Property name=”CountRetrieverClass”/>
        <Property name=”java.naming.ldap.attributes.binary”>objectGuid</Property>
        <Property name=”ClaimOperationsSupported”>true</Property>
        <Property name=”transformObjectGUIDToUUID”>true</Property>
        <Property name=”MembershipAttributeRange”>1500</Property>
        <Property name=”UserCacheExpiryMilliseconds”/>
        <Property name=”UserDNCacheEnabled”>true</Property>
        <Property name=”StartTLSEnabled”>false</Property>
        <Property name=”EnableMaxUserLimitForSCIM”>false</Property>
        <Property name=”ImmutableAttributes”>objectGuid,whenCreated,whenChanged</Property>
        <Property name=”TimestampAttributes”>whenChanged,whenCreated</Property>
        <Property name=”DomainName”>abc</Property>
        <Property name=”Description”/>
        </UserStoreManager>

        Use below user store configurations if you are using the UniqueIDActiveDirectoryUserStoreManager.

        <?xml version=”1.0" encoding=”UTF-8"?><UserStoreManager class=”org.wso2.carbon.user.core.ldap.UniqueIDActiveDirectoryUserStoreManager”>
        <Property name=”ConnectionURL”>***************</Property>
        <Property name=”ConnectionName”>CN=ADMIN,CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”ConnectionPassword”>*************</Property>
        <Property name=”UserSearchBase”>CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”UserEntryObjectClass”>user</Property>
        <Property name=”UserNameAttribute”>cn</Property>

        <Property name=”UserIDAttribute”>objectGuid</Property>

        <Property name=”UserIdSearchFilter”>(&amp;(objectClass=user)(objectGuid=?))</Property>
        <Property name=”UserNameSearchFilter”>(&amp;(objectClass=user)(cn=?))</Property>
        <Property name=”UserNameListFilter”>(objectClass=user)</Property>
        <Property name=”UserDNPattern”/>
        <Property name=”DisplayNameAttribute”/>
        <Property name=”Disabled”>false</Property>
        <Property name=”ReadGroups”>true</Property>
        <Property name=”WriteGroups”>true</Property>
        <Property name=”GroupSearchBase”>CN=Users,DC=abc,DC=abcd</Property>
        <Property name=”GroupEntryObjectClass”>group</Property>
        <Property name=”GroupNameAttribute”>cn</Property>
        <Property name=”GroupNameSearchFilter”>(&amp;(objectClass=group)(cn=?))</Property>
        <Property name=”GroupNameListFilter”>(objectcategory=group)</Property>
        <Property name=”RoleDNPattern”/>
        <Property name=”MembershipAttribute”>member</Property>
        <Property name=”MemberOfAttribute”>memberOf</Property>
        <Property name=”BackLinksEnabled”>true</Property>
        <Property name=”Referral”>follow</Property>
        <Property name=”UserNameJavaRegEx”>[a-zA-Z0–9._-|//]{3,30}$</Property>
        <Property name=”UserNameJavaScriptRegEx”>^[\S]{3,30}$</Property>
        <Property name=”UsernameJavaRegExViolationErrorMsg”>Username pattern policy violated.</Property>
        <Property name=”PasswordJavaRegEx”>^[\S]{5,30}$</Property>
        <Property name=”PasswordJavaScriptRegEx”>^[\S]{5,30}$</Property>
        <Property name=”PasswordJavaRegExViolationErrorMsg”>Password pattern policy violated.</Property>
        <Property name=”RoleNameJavaRegEx”>^[a-zA-Z0–9._-|//]{3,30}$</Property>
        <Property name=”RoleNameJavaScriptRegEx”>^[\S]{3,30}$</Property>
        <Property name=”BulkImportSupported”>true</Property>
        <Property name=”EmptyRolesAllowed”>true</Property>
        <Property name=”PasswordHashMethod”>PLAIN_TEXT</Property>
        <Property name=”MultiAttributeSeparator”>,</Property>
        <Property name=”isADLDSRole”>false</Property>
        <Property name=”userAccountControl”>512</Property>
        <Property name=”MaxUserNameListLength”>100</Property>
        <Property name=”MaxRoleNameListLength”>100</Property>
        <Property name=”kdcEnabled”>false</Property>
        <Property name=”defaultRealmName”>WSO2.ORG</Property>
        <Property name=”UserRolesCacheEnabled”>true</Property>
        <Property name=”ConnectionPoolingEnabled”>false</Property>
        <Property name=”LDAPConnectionTimeout”>5000</Property>
        <Property name=”ReadTimeout”>5000</Property>
        <Property name=”RetryAttempts”>0</Property>
        <Property name=”CountRetrieverClass”/>
        <Property name=”java.naming.ldap.attributes.binary”>objectGuid</Property>
        <Property name=”ClaimOperationsSupported”>true</Property>
        <Property name=”transformObjectGUIDToUUID”>true</Property>
        <Property name=”MembershipAttributeRange”>1500</Property>
        <Property name=”UserCacheExpiryMilliseconds”/>
        <Property name=”UserDNCacheEnabled”>true</Property>
        <Property name=”StartTLSEnabled”>false</Property>
        <Property name=”EnableMaxUserLimitForSCIM”>false</Property>
        <Property name=”ImmutableAttributes”>objectGuid,whenCreated,whenChanged</Property>
        <Property name=”TimestampAttributes”>whenChanged,whenCreated</Property>
        <Property name=”DomainName”>abc</Property>
        <Property name=”Description”/>
        </UserStoreManager>
        ```

## Step 2: Import the user store certificate

To import the user store certificate to the WSO2 Identity Server trust store, navigate to `<IS_HOME>repository/resources/security` folder and execute the following command:

``` shell
keytool -import -alias certalias -file <certificate>.pem -keystore client-truststore.jks -storepass wso2carbon
```

## Step 3: Configure claim mappings

1. On the WSO@ Identity Server Management Console go t0 **Identity** > **Claims** > **List**.
2. Select `http://wso2.org/claims` from the list.
3. Choose the Location claim and click on **Edit**.

    ![location-claim-scim2]({{base_path}}/assets/img/guides/location-claim-scim2.png)

4. Change the Mapped Attribute value to `homePostalAddress` and click **Update**.

    ![mapped-attribute-scim2]({{base_path}}/assets/img/guides/mapped-attribute-scim2.png)

5. Edit the other four claims in the same way.

Now the basic claim mapping is done. You can now add a user using the curl commands [here]({{base_path}}/apis/scim2-rest-apis).

In RestClient, the following header parameters must be added and the double quotations must be removed from the message body.

```
Content-Type: application/json
Accept: */*
Message body
{schemas:[],userName:'wso2.com/uresh67',password:Wso2@123}
```

!!! info 
    You need to do the claim mapping for every SCIM claim you are using with user operations.

!!! info "Related topics" 
    -   [Concepts: Provisioning Framework]({{base_path}}/references/concepts/provisioning-framework/#inbound-provisioning)
    