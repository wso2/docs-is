# Saving Access Tokens in Separate Tables

??? warning "This feature is deprecated in WSO2 Identity Server 5.9.0"
    This feature is deprecated due to following reasons:
    <ul>
    	<li>All commercial databases support table partitioning as a first class feature.</li>
    	<li>Table partitioning should not be limited to `IDN_ACCESS_TOKEN` table, it should rather be supported for any table that requires partitioning.</li>
    	<li>Partitioning criteria can be different based on the use case and should not be limited to the user domain. Maintaing all such requirements in a product is redundant as all these requirements can be achieved from the database server itself.</li>
    	<li>Even if the product supports these features, it requires product domain knowledge to use those. On the other hand, DB admins are quite familiar with functionalities of the database that is used in their enterprise. If partitioning features are provided from the database server, an additional learning effort is not needed for DB admins to achieve this.</li>
    </ul>

You can configure the Identity Server instances to store access tokens
in different tables according to their user store domain. This is
referred to as **user token partitioning** and it ensures better
security when there are multiple user stores configured in the system.
For information on configuring user stores other than the default one,
see [Configuring Secondary User Stores](../../using-wso2-identity-server/configuring-secondary-user-stores).

To enable user token partitioning, you should change the
`         <EnableAssertions>        ` and
`         <AccessTokenPartitioning>        ` elements in the
`         <IS_HOME>/repository/conf/identity/identity.xml        ` file.

#### Enable assertions

Assertions are used to embed parameters into tokens in order to generate
a strong access token. You can also use these parameters later for
various other processing functionality. At the moment, the Identity
Server only supports UserName as an assertion.

By default, assertions are set to `         false        ` in the
`         <IS_HOME>/repository/conf/identity/identity.xml        ` file.

``` html/xml
<EnableAssertions>
        <UserName>false</UserName>
</EnableAssertions>
```

You can make it true by setting the `         <UserName>        `
element to `         true        ` . You can add a user name to an
access token when generating the key, and verify it by Base64-decoding
the retrieved access token.

#### Access token partitioning

This parameter implies whether you need to store the keys in different
tables or not. It can be used only if `         <UserName>        `
assertion is enabled. If it is, set the
`         <EnableAccessTokenPartitioning>        ` element to true in
`         <IS_HOME>/repository/conf/identity/identity.xml        ` to
store the keys in different tables.

``` xml
<EnableAccessTokenPartitioning>true</EnableAccessTokenPartitioning>
```

Also set the user store domain names and mappings to new table names.
For example,

-   if userId = foo.com/admin where 'foo.com' is the user store domain
    name, then a 'mapping:domain' combo can be defined as 'A:foo.com'.
-   'A' is the mapping for the table that stores tokens relevant to
    users coming from 'foo.com' user store.

You can provide multiple mappings separated by commas as follows. Note
that the domain names need to be specified in upper case.

``` xml
<AccessTokenPartitioningDomains>A:FOO.COM, B:BAR.COM</AccessTokenPartitioningDomains>
```

According to the information given above, change the
`         <APIKeyManager>        ` element in the identity.xml file as
shown in the following example:

``` xml tab="identity.xml"
<!-- Assertions can be used to embedd parameters into access token.-->
<EnableAssertions>
     <UserName>false</UserName>
</EnableAssertions> 

<!-- This should be set to true when using multiple user stores and keys should saved into different tables according to the user store. By default all the application keys are saved in to the same table. UserName Assertion should be 'true' to use this.-->
<AccessTokenPartitioning>
     <EnableAccessTokenPartitioning>false</EnableAccessTokenPartitioning>
     <!-- user store domain names and mappings to new table names. eg: if you provide 'A:foo.com', foo.com should be the user store domain   
     name and 'A' represent the relavant mapping of token storing table, i.e. tokens relevant to the users comming from foo.com user store     
     will be added to a table called IDN_OAUTH2_ACCESS_TOKEN_A. --> 
     <AccessTokenPartitioningDomains><!-- A:foo.com, B:bar.com --></AccessTokenPartitioningDomains>
</AccessTokenPartitioning>
```
