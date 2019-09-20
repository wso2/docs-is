# Adding Claim Dialects

In WSO2 Identity Server, there are two ways of adding a claim dialect.
They are:

### Using the management console

You can define a new claim dialect by clicking on the " **Add New Claim
Dialect** " link. Follow the instructions below to add a new claim
dialect.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console)
    .
2.  From the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect**. Enter the **Dialect URI.**

    !!! info 
        The Dialect URI is a unique URI identifying the dialect (for
        example,
        `                                                      http://schema.openid.net/2007/05/claims                                                  `
        ).

    ![unique-uri](../assets/img/using-wso2-identity-server/unique-uri.png)

4.  Click on the **Add** button. The claim dialect you added will appear
    on the list as follows.

    ![claim-dialect](../assets/img/using-wso2-identity-server/claim-dialect.png)

### Using the configuration file

Follow the instructions below to add a new claim dialect through the
configuration file. Note that you can only do this **before the first
start up** of the WSO2 Identity Server instance.

1.  Open the `          claim-config.xml         ` file found in the
    `          <IS_HOME>/repository/conf/         ` folder.
2.  To add a new claim dialect, add the following configuration to the
    file along with the new claims you want to add under the dialect.
    For this example, the new claim dialect is named
    `           SampleAppClaims          ` .

    ``` xml
    <Dialect dialectURI="http://wso2.org/SampleAppClaims">
        <Claim>
            <ClaimURI>http://wso2.org/SampleAppClaims/givenname</ClaimURI>
            <DisplayName>First Name</DisplayName>
            <MappedLocalClaim>http://wso2.org/claims/givenname</MappedLocalClaim>
        </Claim>
        <Claim>
            <ClaimURI>http://wso2.org/SampleAppClaims/nickName</ClaimURI>
            <DisplayName>Nick Name</DisplayName>
            <MappedLocalClaim>http://wso2.org/claims/nickname</MappedLocalClaim>
        </Claim>
    </Dialect>
    ```

3.  Once you have edited the `           claim-config.          ` xml
    file, start WSO2 Identity Server. The configurations will be applied
    and you can view the new claim dialect via the management console.

    !!! note
    
        The claim dialects configured in
        `                       <                      IS_HOME>/repository/conf/claim-config.xml          `
        file get applied only when you start the product for the first time,
        or for any newly created tenants. With the first startup, claim
        dialects and claims will be loaded from the file and persisted in
        the database. Any consecutive updates to the file will not be picked
        up and claim dialects and claims will be loaded from the database.
    

**Related Links**

For information on how to add an external claim to this claim dialect,
or add a local claim to the wso2 local claim dialect, see [Adding Claim
Mapping](../../learn/adding-claim-mapping).
