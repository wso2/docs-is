# Add Claim Dialects

A set of claims are identified as a dialect. Different dialects represent the same piece of information with different claim URIs. The following dialects are defined by default with the WSO2 Claim Management Feature.

- http://schemas.xmlsoap.org/ws/2005/05/identity - Default dialect for STS
- http://wso2.org/claims - Default dialect for WSO2 Carbon
- http://axschema.org - Default dialect for OpenID Attribute Exchange
- http://schema.openid.net/2007/05/claims - Default dialect for OpenID Simple Registration
- http://wso2.org/oidc/claim - Default dialect for OpenID Connect
- urn:scim:schemas:core:1.0 - Default dialect for SCIM

---

## Add a new dialect

In WSO2 Identity Server, there are two ways you can use to add a new dialect.

### Use the management console

Follow the instructions below to add a new dialect.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../../deploy/get-started/get-started-with-the-management-console).
2.  From the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect**. Enter the **Dialect URI.**

    !!! info 
        The Dialect URI is a unique URI identifying the dialect (for example, `http://schema.openid.net/2007/05/claims`).

    ![unique-uri](../../assets/img/guides/unique-uri.png)

4.  Click on the **Add** button. The claim dialect you added will appear on the list as follows.

    ![claim-dialect](../../assets/img/guides/claim-dialect.png)

### Use the configuration file

Follow the instructions below to add a new  dialect through the configuration file. Note that you can only do this **before the first
start up** of the WSO2 Identity Server instance.

1.  Open the `claim-config.xml` file found in the
    `<IS_HOME>/repository/conf/` folder.
2.  To add a new dialect, add the following configuration to the
    file along with the new claims you want to add under the dialect.
    For this example, the new dialect is named
    `SampleAppClaims` .

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

3.  Once you have edited the `claim-config.` xml file, start WSO2 Identity Server. The configurations will be applied
    and you can view the new dialect via the management console.

    !!! note
    
        The dialects configured in `<IS_HOME>/repository/conf/claim-config.xml` file get applied only when you start the product for the first time, or for any newly created tenants. With the first startup, dialects and claims will be loaded from the file and persisted in the database. Any consecutive updates to the file will not be picked up and dialects and claims will be loaded from the database.
    
----

!!! info "Related Links"

    For information on how to add an external claim to this dialect, or add a local claim to the wso2 local dialect, see [Adding Claim Mapping](TODO:../../../guides/dialects/add-claim-mapping).
