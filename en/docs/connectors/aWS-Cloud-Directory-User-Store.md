# AWS Cloud Directory User Store

The AWS user store extension allows you to use AWS Cloud Directory as
the user store in WSO2 Identity Server. [AWS Cloud
Directory](https://docs.aws.amazon.com/clouddirectory/latest/developerguide/what_is_cloud_directory.html)
is a specialized graph-based directory store that provides a
foundational building block for developers. With AWS Cloud Directory,
you can organize directory objects into multiple hierarchies to support
many organizational pivots and relationships across directory
information.

You can use the AWS user store extension as the primary or secondary
user store in WSO2 Identity Server. The AWS user store extension uses
the
`         org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager        `
class to configure AWS user store manager.

!!! tip
    
    The AWS user store extension is compatible with WSO2 Identity Server
    5.5.0, 5.6.0 as well as 5.7.0.
    

The following topics provide information on how you can configure the
AWS user store extension with WSO2 Identity Server and then use AWS
as the primary or secondary user store in WSO2 Identity Server:

-   [Prerequisites](#AWSCloudDirectoryUserStore-Prerequisites)
-   [Adding AWS user store extension to WSO2 Identity
    Server](#AWSCloudDirectoryUserStore-addAddingAWSuserstoreextensiontoWSO2IdentityServer)
-   [Configuring AWS as the secondary user
    store](#AWSCloudDirectoryUserStore-ConfiguringAWSasthesecondaryuserstore)
-   [Configuring AWS as the primary user
    store](#AWSCloudDirectoryUserStore-ConfiguringAWSastheprimaryuserstore)
-   [AWS user store manager
    properties](#AWSCloudDirectoryUserStore-propertiesAWSuserstoremanagerproperties)

  

### Prerequisites

1.  Create a cloud directory by uploading the schema for the objects via
    the [AWS console](https://console.aws.amazon.com/console/home). You
    can take a look at following sample schema to configure the sample
    user store configuration.

    **Sample Schema**

    ``` java
    {
     "facets": {
       "ROLES": {
         "facetAttributes": {
           "RoleName": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "MemberOf": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           }
         },
         "objectType": "LEAF_NODE"
       },
       "USERS": {
         "facetAttributes": {
           "UserName": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "Password": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "Member": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           }
         },
         "objectType": "LEAF_NODE"
       }
     }
    }
    ```

    !!! note
    
        Note
    
        If you are going to maintain a set of claims such as
        `           givenName          `, `           mail          `,
        `           sn          `, and
        `           profileConfiguration          ` in the user profile, you
        need to update the sample schema above as follows:
    

    **Sample Schema**

    ``` java
    {
     "facets": {
       "ROLES": {
         "facetAttributes": {
           "RoleName": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "MemberOf": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           }
         },
         "objectType": "LEAF_NODE"
       },
       "USERS": {
         "facetAttributes": {
           "UserName": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "Password": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "REQUIRED_ALWAYS"
           },
           "Member": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           },
           "givenName": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           },
           "mail": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           },
           "sn": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           },
           "profileConfiguration": {
             "attributeDefinition": {
               "attributeType": "STRING",
               "isImmutable": false
             },
             "requiredBehavior": "NOT_REQUIRED"
           }
         },
         "objectType": "LEAF_NODE"
       }
     }
    }
    ```

2.  Obtain the following property values to use in the AWS user store
    configuration:
    -   `            DirectoryArn           `
    -   `            SchemaArn           `
    -   `            FacetNameOfUser           `
    -   `            FacetNameOfRole           `
    -   `            UserNameAttribute           `
    -   `            PasswordAttribute           `
    -   `            MembershipAttribute           `
    -   `            RoleNameAttribute           `
    -   `            MemberOfAttribute           `

### Adding AWS user store extension to WSO2 Identity Server

Follow the steps below to add the AWS user store extension to WSO2
Identity Server and confirm that you have successfully added the AWS
user store extension to WSO2 Identity Server:

1.  Go to [WSO2
    store](https://store.wso2.com/store/assets/isconnector/details/f568ff1e-d746-47ce-b8cb-85f55e1e08a7)
    and download the AWS user store extension.
2.  Copy the downloaded jar to the
    `           <IS_HOME>/repository/components/dropins          `
    directory. Now you have added the AWS user store extension to WSO2
    Identity Server.

3.  Open a terminal, navigate to the
    `           <IS_HOME>/bin          ` directory, and then execute the
    following command to start WSO2 Identity server:

    ``` java
        ./wso2server.sh
    ```

4.  Access the Management Console via
    `          https://localhost:9443/carbon/         ` .
5.  Click the **Main** tab on the Management Console, and then click
    **Add** under **User Stores**. This displays the **Add New User
    Store** screen.
6.  Click the list of items related to **User Store Manager Class**.
    You will see
    `          org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager         `
    in the list. This confirms that you have successfully added the AWS
    user store extension to WSO2 Identity Server.

Now that you have successfully added the AWS user store extension to
WSO2 Identity Server, you can go ahead and configure AWS as the
secondary user store.

### Configuring AWS as the secondary user store

Follow the steps below to configure AWS as the secondary user store.

1.  In the **Add New User Store** screen, select
    `          org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager         `
    as the **User Store Manager Class**.
2.  Enter appropriate values in the **Domain Name** and **Description**
    fields.
3.  Enter appropriate values for all the mandatory properties. For
    information on each property, see [AWS user store manager
    properties](#AWSCloudDirectoryUserStore-properties).

### Configuring AWS as the primary user store

!!! tip
    
    Configuring AWS as the secondary user store is straightforward once you
    add the AWS user store extension to WSO2 Identity Server,. However, if
    you want to use AWS as the primary user store in WSO2 Identity Server,
    there are additional configurations that you need to perform.
    

Follow the steps below to configure AWS as the primary user store in
WSO2 Identity Server:

1.  Follow steps 1 and 2 under [Adding AWS user store extension to WSO2
    Identity Server](#AWSCloudDirectoryUserStore-add).

2.  Edit the
    `           <IS_HOME>/repository/conf/user-mgt.xml          ` file
    and add the following configuration:

    !!! note
    
        Note
    
        When you add the following configuration, be sure to specify
        applicable values for the following properties:
    
        ``` java
        <Property name="AccessKeyID">xxxxxxxxxxxxxxxxxxxxxxxxx</Property>
        <Property name="SecretAccessKey">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Property>
        ```
    

    **user-mgt.xml**

    ``` java
    <UserStoreManager class="org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager">
        <Property name="TenantManager">org.wso2.carbon.user.core.tenant.JDBCTenantManager</Property>
        <Property name="AccessKeyID">xxxxxxxxxxxxxxxxxxxxxxxxx</Property>
        <Property name="SecretAccessKey">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Property>
        <Property name="Region">us-west-2</Property>
        <Property name="APIVersion">2017-01-11</Property>
        <Property name="PathToUsers">/com/users</Property>
        <Property name="PathToRoles">/com/roles</Property>
        <Property name="MembershipTypeOfRoles">link</Property>
        <Property name="DirectoryArn">arn:aws:clouddirectory:us-west-2:610968236798:directory/ASc_ZQAllU0Ot0_vpmXmwF4</Property>
        <Property name="SchemaArn">arn:aws:clouddirectory:us-west-2:610968236798:directory/ASc_ZQAllU0Ot0_vpmXmwF4/schema/userstoreSchema/1.0</Property>
        <Property name="FacetNameOfUser">USERS</Property>
        <Property name="FacetNameOfRole">ROLES</Property>
        <Property name="ReadOnly">false</Property>
        <Property name="ReadGroups">true</Property>
        <Property name="WriteGroups">true</Property>
        <Property name="Disabled">false</Property>
        <Property name="UserNameAttribute">UserName</Property>
        <Property name="PasswordAttribute">Password</Property>
        <Property name="MembershipAttribute">Member</Property>
        <Property name="RoleNameAttribute">RoleName</Property>
        <Property name="MemberOfAttribute">MemberOf</Property>
        <Property name="UserNameJavaRegEx">[a-zA-Z0-9._\-|//]{3,30}$</Property>
        <Property name="UserNameJavaScriptRegEx">^[\S]{3,30}$</Property>
        <Property name="UsernameJavaRegExViolationErrorMsg">Username pattern policy violated</Property>
        <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaScriptRegEx">^[\S]{5,30}$</Property>
        <Property name="PasswordJavaRegExViolationErrorMsg">Password pattern policy violated.</Property>
        <Property name="RoleNameJavaRegEx">[a-zA-Z0-9._-|//]{3,30}$</Property>
        <Property name="RoleNameJavaScriptRegEx">^[\S]{3,30}$</Property>
        <Property name="PasswordHashMethod">PLAIN_TEXT</Property>
        <Property name="MaxUserNameListLength">100</Property>
        <Property name="MaxRoleNameListLength">100</Property>
    </UserStoreManager>
    ```

#### Sample user store configurations and corresponding tree structures for AWS

**Scenario 1 :** Let's take a look at how to use typed links to model
relationships between different objects (i.e., `         Users        `
, `         Roles        ` ).

Following is a sample user store configuration for the scenario:

``` java
<UserStoreManager class="org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager">
   <Property name="AccessKeyID">AGBMVJTFDRGJKOGFD</Property>
   <Property name="SecretAccessKey">xxxxxxxxxxxx</Property>
   <Property name="Region">us-west-2</Property>
   <Property name="APIVersion">2017-01-11</Property>
   <Property name="PathToUsers">/org/users</Property>
   <Property name="PathToRoles">/org/roles</Property>
   <Property name="MembershipTypeOfRoles">link</Property>
   <Property name="DirectoryArn">arn:aws:clouddirectory:us-west-2:61898:directory/AVLHa3w</Property>
   <Property name="SchemaArn">arn:aws:clouddirectory:us-west-2:61898:directory/AVLHa3w/schema/schema/1.0</Property>
   <Property name="FacetNameOfUser">USERS</Property>
   <Property name="FacetNameOfRole">ROLES</Property>
   <Property name="ReadGroups">true</Property>
   <Property name="WriteGroups">true</Property>
   <Property name="Disabled">false</Property>
   <Property name="UserNameAttribute">UserName</Property>
   <Property name="PasswordAttribute">Password</Property>
   <Property name="MembershipAttribute"/>
   <Property name="RoleNameAttribute">RoleName</Property>
   <Property name="MemberOfAttribute"/>
   <Property name="UserNameJavaRegEx">[a-zA-Z0-9._\-|//]{3,30}$</Property>
   <Property name="UserNameJavaScriptRegEx">^[\S]{3,30}$</Property>
   <Property name="UsernameJavaRegExViolationErrorMsg">Username pattern policy violated.</Property>
   <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
   <Property name="PasswordJavaScriptRegEx">^[\S]{5,30}$</Property>
   <Property name="PasswordJavaRegExViolationErrorMsg">Password pattern policy violated.</Property>
   <Property name="RoleNameJavaRegEx">[a-zA-Z0-9._-|//]{3,30}$</Property>
   <Property name="RoleNameJavaScriptRegEx">^[\S]{3,30}$</Property>
   <Property name="PasswordHashMethod">PLAIN_TEXT</Property>
   <Property name="MaxUserNameListLength">100</Property>
   <Property name="MaxRoleNameListLength">100</Property>
</UserStoreManager>
```

Based on the `         MembershipTypeOfRoles        ` property in the
above configuration, an end-user should use a link to model an ownership
between the `         Users        ` object and `         Roles        `
object. Therefore, the directory structure should be similar to what is
depicted in the following diagram:

![](attachments/97561749/103326406.png){width="650"}

For example, if you assign multiple roles such as Role1 and Role2 to
User1, and you want to establish a relationship between the objects, you
have to create the following typed links:

-   User1 → Role1
-   User1 → Role2

  

**Scenario 2 :** Let's take a look at how you can maintain different
object relationship details (i.e., `         Users        `,
`         Roles        ` ) as an attribute inside the
`         Users        ` object and `         Roles        ` object.

Following is a sample user store configuration for the scenario:

``` java
<UserStoreManager class="org.wso2.carbon.aws.user.store.mgt.AWSUserStoreManager">
   <Property name="AccessKeyID">AGBMVJTFDRGJKOGFD</Property>
   <Property name="SecretAccessKey">xxxxxxxxxxx</Property>
   <Property name="Region">us-west-2</Property>
   <Property name="APIVersion">2017-01-11</Property>
   <Property name="PathToUsers">/com/example/users</Property>
   <Property name="PathToRoles">/com/example/roles</Property>
   <Property name="MembershipTypeOfRoles">attribute</Property>
   <Property name="DirectoryArn">arn:aws:clouddirectory:us-west-2:61898:directory/AVLHa3w</Property>
   <Property name="SchemaArn">arn:aws:clouddirectory:us-west-2:61898:directory/AVLHa3w/schema/schema/1.0</Property>
   <Property name="FacetNameOfUser">USERS</Property>
   <Property name="FacetNameOfRole">ROLES</Property>
   <Property name="ReadGroups">true</Property>
   <Property name="WriteGroups">true</Property>
   <Property name="Disabled">false</Property>
   <Property name="UserNameAttribute">UserName</Property>
   <Property name="PasswordAttribute">Password</Property>
   <Property name="MembershipAttribute">Member</Property>
   <Property name="RoleNameAttribute">RoleName</Property>
   <Property name="MemberOfAttribute">MemberOf</Property>
   <Property name="UserNameJavaRegEx">[a-zA-Z0-9._\-|//]{3,30}$</Property>
   <Property name="UserNameJavaScriptRegEx">^[\S]{3,30}$</Property>
   <Property name="UsernameJavaRegExViolationErrorMsg">Username pattern policy violated.</Property>
   <Property name="PasswordJavaRegEx">^[\S]{5,30}$</Property>
   <Property name="PasswordJavaScriptRegEx">^[\S]{5,30}$</Property>
   <Property name="PasswordJavaRegExViolationErrorMsg">Password pattern policy violated.</Property>
   <Property name="RoleNameJavaRegEx">[a-zA-Z0-9._-|//]{3,30}$</Property>
   <Property name="RoleNameJavaScriptRegEx">^[\S]{3,30}$</Property>
   <Property name="PasswordHashMethod">PLAIN_TEXT</Property>
   <Property name="MaxUserNameListLength">100</Property>
   <Property name="MaxRoleNameListLength">100</Property>
</UserStoreManager>
```

Based on the `         MembershipTypeOfRoles        ` property in the
above configuration, an end-user should use an attribute to keep an
ownership relationship between the `         Users        ` object and
`         Roles        ` object. Therefore, the directory structure
should be similar to what is depicted in the following diagram:

![](attachments/97561749/103326407.png){width="650"}

For example, if you assign multiple roles such as Role1 and Role2 to
User1, then the relationship between the objects should be kept as an
attribute inside the object itself (i.e., Using the
`         member        ` attribute in `         Users        ` object
and `         Memberof        ` attribute in the
`         Roles        ` object).

In the two scenarios described above, the additional attributes are kept
inside each object as follows:

-   The `          Users         ` object will include
    `          UserName         `, `          Password         ` and
    the set of claims.
-   The `          Roles         ` object will include
    `          RoleName         ` .

  

### AWS user store manager properties 

Following are the AWS user store properties that you need to set:

<table>
<thead>
<tr class="header">
<th><p>Property</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>              AccessKeyID             </code></p></td>
<td><p>The AWS access key ID.</p></td>
</tr>
<tr class="even">
<td><p><code>              SecretAccessKey             </code></p></td>
<td><p>The AWS secret access key.</p></td>
</tr>
<tr class="odd">
<td><p><code>              Region             </code></p></td>
<td><p>The region that is used to select a regional endpoint to make API requests.</p></td>
</tr>
<tr class="even">
<td><p><code>              APIVersion             </code></p></td>
<td><p>The cloud directory API version.</p></td>
</tr>
<tr class="odd">
<td><p><code>              PathToUsers             </code></p></td>
<td><p>This is a path to identify the <code>              Users             </code> object in the tree structure.</p>
<ul>
<li>A child link creates a parent–child relationship between the objects that it connects. For example, in the diagram that depicts scenario 1, the <code>               Users              </code> child link connects <code>               Org              </code> and <code>               Users              </code> objects .</li>
<li>Child links have names when they participate in defining the path of the object that the link point to. Therefore, to construct the path for the <code>               Users              </code> object, you need to use the link names from each parent–child link. Path selectors start with a slash (/) and the link names are separated by slashes (i.e., <code>               /some/path              </code> identifies the <code>               Users              </code> object based on path ).<br />
For example, if we consider the diagram that depicts scenario 1, <code>               PathToUsers              </code> will be <code>               /org/users              </code> .</li>
</ul></td>
</tr>
<tr class="even">
<td><p><code>              PathToRoles             </code></p></td>
<td><p>This is a path to identify the <code>              Roles             </code> object in the tree structure.</p>
<ul>
<li>A child link creates a parent–child relationship between the objects it connects. For example, in the diagram that depicts scenario 1, the <code>               Roles              </code> child link connects <code>               Org              </code> and <code>               Roles              </code> objects .</li>
<li>Child links have names when they participate in defining the path of the object that the link points to. Therefore, to construct the path for the <code>               Roles              </code> object, use the link names from each parent–child link. Path selectors start with a slash (/) and link names are separated by slashes (i.e., <code>               /some/path              </code> identifies the <code>               Roles              </code> object based on path ).<br />
For example, if we consider the diagram that depicts scenario 1, <code>               PathToRoles              </code> will be <code>               /org/roles              </code> .</li>
</ul></td>
</tr>
<tr class="odd">
<td><p><code>              MembershipTypeOfRoles             </code></p></td>
<td><p>Indicates how you are going to maintain user and role object relationships. Possible values are <code>              link             </code> and <code>              attribute             </code> .</p>
<ul>
<li>If you use <code>               link              </code>, you can establish a relationship between objects in Cloud Directory using typed links. You can then use these relationships to query for information. For example, to list the roles that are assigned to a particular user, to list the users who are assigned to a particular role.</li>
<li>If you use <code>               attribute              </code>, you can list the roles assigned to a particular user and list users who have a particular role. This maintains relationship between objects in an attribute inside the node using <code>               MembershipAttribute              </code> and <code>               MemberOfAttribute              </code> .</li>
</ul></td>
</tr>
<tr class="even">
<td><p><code>              DirectoryArn             </code></p></td>
<td><p>Directory in which the object will be created</p></td>
</tr>
<tr class="odd">
<td><p><code>              SchemaArn             </code></p></td>
<td><p>Schema arn of the directory</p></td>
</tr>
<tr class="even">
<td><p><code>              FacetNameOfUser             </code></p></td>
<td><p>Facet name of the user object</p></td>
</tr>
<tr class="odd">
<td><p><code>              FacetNameOfRole             </code></p></td>
<td><p>Facet name of the role object</p></td>
</tr>
<tr class="even">
<td><p><code>              ReadGroups             </code></p></td>
<td><p>Indicates whether groups should be read from the user store. Possible values are as follows:<br />
</p>
<ul>
<li><code>               true              </code> : Read groups from user store.</li>
<li><code>               false              </code> : Do not read groups from user store</li>
</ul></td>
</tr>
<tr class="odd">
<td><p><code>              WriteGroups             </code></p></td>
<td><p>Indicates whether to write groups to the user store. Possible values are as follows:</p>
<ul>
<li><code>               true              </code> : Write groups to user store.</li>
<li><code>               false              </code> : Do not write groups to user store. This means that only internal roles can be created.</li>
</ul></td>
</tr>
<tr class="even">
<td><p><code>              Disabled             </code></p></td>
<td><p>Indicates whether to deactivate the user store. If you need to temporarily deactivate a user store, you can use this property. If you disable the user store using the disable option it also will set this parameter. Possible values are as follows:</p>
<ul>
<li><code>               true              </code> : Disable user store temporarily.</li>
<li><code>               false              </code> : Do not disable user store temporarily.</li>
</ul>
<p>The default value is <code>              false             </code> .</p></td>
</tr>
<tr class="odd">
<td><p><code>              UserNameAttribute             </code></p></td>
<td><p>The name of the attribute is used to identify the user name of user entry.</p></td>
</tr>
<tr class="even">
<td><p><code>              PasswordAttribute             </code></p></td>
<td><p>The name of the attribute is used to identify the password of user entry.</p></td>
</tr>
<tr class="odd">
<td><p><code>              MembershipAttribute             </code></p></td>
<td><p>This is an optional property. If you have specified a value for <code>              MembershipTypeOfRoles             </code>, you need to set this property and define the attribute that contain the distinguished names of user objects that are in a role.</p></td>
</tr>
<tr class="even">
<td><p><code>              RoleNameAttribute             </code></p></td>
<td><p>The name of the attribute used to identify the role name of the role entry.</p></td>
</tr>
<tr class="odd">
<td><p><code>              MemberOfAttribute             </code></p></td>
<td><p>This is an optional property. If you have specified a value for <code>              MembershipTypeOfRoles             </code>, you need to set this property and define the attribute that contain the distinguished names of role objects that the user is assigned to.</p></td>
</tr>
<tr class="even">
<td><p><code>              UserNameJavaRegEx             </code></p></td>
<td><p>The regular expression used by back-end components for user name validation. By default, strings with non-empty characters that have a length of 3 to 30 are allowed. You can specify uppercase characters, lowercase characters, numbers and also ASCII values in the RegEx.</p>
<p>Default value is <code>              [a-zA-Z0-9._\-|//]{3,30}$             </code></p></td>
</tr>
<tr class="odd">
<td><p><code>              UserNameJavaScriptRegEx             </code></p></td>
<td><p>The regular expression used by front-end components for user name validation.<br />
Default value is <code>              ^[\S]{3,30}$             </code></p></td>
</tr>
<tr class="even">
<td><p><code>              UsernameJavaRegExViolationErrorMsg             </code></p></td>
<td><p>Error message when the password does not match <code>              passwordJavaRegEx             </code> .</p></td>
</tr>
<tr class="odd">
<td><p><code>              PasswordJavaRegEx             </code></p></td>
<td><p>The regular expression used by back-end components for password validation. By default, strings with non-empty characters that have a length of 5 to 30 are allowed. You can specify uppercase characters, lowercase characters, numbers and also ASCII values in the RegEx.</p>
<p>Default value is <code>              ^[\S]{5,30}$             </code></p></td>
</tr>
<tr class="even">
<td><p><code>              PasswordJavaScriptRegEx             </code></p></td>
<td><p>The regular expression used by the front-end components for password validation.<br />
Default value is <code>              ^[\S]{5,30}$             </code></p></td>
</tr>
<tr class="odd">
<td><p><code>              PasswordJavaRegExViolationErrorMsg             </code></p></td>
<td><p>Error message when the password does not match <code>              passwordJavaRegEx             </code> .</p></td>
</tr>
<tr class="even">
<td><p><code>              RoleNameJavaRegEx             </code></p></td>
<td><p>The regular expression used by back-end components for role name validation. By default, strings with non-empty characters that have a length of 3 to 30 are allowed. You can specify uppercase characters, lowercase characters, numbers and also ASCII values in the RegEx.</p>
<p>Default value is <code>              [a-zA-Z0-9._-|//]{3,30}$             </code></p></td>
</tr>
<tr class="odd">
<td><p><code>              RoleNameJavaScriptRegEx             </code></p></td>
<td><p>The regular expression used by the front-end components for role name validation.</p></td>
</tr>
<tr class="even">
<td><p><code>              PasswordHashMethod             </code></p></td>
<td><p>The password hashing algorithm used to hash passwords before storing in the user store.</p></td>
</tr>
<tr class="odd">
<td><p><code>              MaxUserNameListLength             </code></p></td>
<td><p>Controls the number of users listed in the user store. This is useful when you have a large number of users and you do not want to list them all. You can set this property to 0 to displays all users.</p>
<p>Default value is 100.</p></td>
</tr>
<tr class="even">
<td><p><code>              MaxRoleNameListLength             </code></p></td>
<td><p>Controls the number of roles listed in the user store. This is useful when you have a large number of roles and do not want to list them all. You can set this property to 0 to displays all roles.</p>
<p>Default value is 100</p></td>
</tr>
</tbody>
</table>

  

!!! note
    
    The `         listObjectChildren        ` REST API operation is used to
    get the list of users/roles. This operation does not guarantee that all
    object children of `         PathToUsers        ` or
    `         PathToRoles        ` are `         USERS        ` facet or
    `         ROLES        ` facet. This operation also maintains the link
    name of each object as object name. Therefore, to ensure that all object
    children are `         USERS        ` facet or `         ROLES        `
    facet, and to get the object name from the object instead of getting the
    link name, it is necessary to have other REST API calls with the
    `         listObjectAttributes        ` operation. The additional
    network calls result in the limitations mentioned here.
    

  
