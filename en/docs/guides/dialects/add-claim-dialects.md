# Add Claim Dialects

A set of claims are identified as a dialect. Different dialects represent the same piece of information with different claim URIs. The following dialects are defined by default with the [Claim Management]({{base_path}}/references/concepts/claim-management) Feature in WSO2 IS.

- `http://schemas.xmlsoap.org/ws/2005/05/identity` - Default dialect for STS
- `http://wso2.org/claims` - Default dialect for WSO2 Carbon
- `http://axschema.org` - Default dialect for OpenID Attribute Exchange
- `http://schema.openid.net/2007/05/claims` - Default dialect for OpenID Simple Registration
- `http://wso2.org/oidc/claim` - Default dialect for OpenID Connect
- `urn:scim:schemas:core:1.0` - Default dialect for SCIM

---

In WSO2 Identity Server, there are two ways you can add a new dialect.

## Use the management console

Follow the instructions below to add a new dialect using the management console. 

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Go to **Main** > **Identity** > **Claims** and click **Add**.
3.  Click **Add Claim Dialect** and enter a value for the **Dialect URI**.

    !!! info 
        The Dialect URI is a unique URI identifying the dialect (for example, `http://schema.openid.net/2007/05/claims`).

    ![unique-uri]({{base_path}}/assets/img/guides/unique-uri.png)

4.  Click **Add** and the claim dialect will appear on the list as follows.

    ![claim-dialect]({{base_path}}/assets/img/guides/claim-dialect.png)

## Use the configuration file

Follow the instructions below to add a new dialect through the configuration file.

!!! note

    {!./includes/claim-config-note.md !}

1.  Open the `claim-config.xml` file found in the
    `<IS_HOME>/repository/conf/` folder.

2.  Add the following configuration to the
    file along with the new claims you want to add under the dialect.

    ```xml
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

3.  Once you have edited the `claim-config.xml` file, restart WSO2 Identity Server. 

You can now view the new dialect via the management console.
    
----

!!! info "Related topics"

    -   [Guides: Add Claim Mapping]({{base_path}}/guides/dialects/add-claim-mapping)
    -   [Concepts: Claim Management]({{base_path}}/references/concepts/claim-management/)
