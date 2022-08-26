# Map OpenID Connect Scopes and Claims

This page guides you through mapping [OpenID Connect (OIDC) scopes and claims]({{base_path}}/references/concepts/authentication/scopes-claims).

This means that when you request for an OIDC token, you can specify a single scope value that is bound to a set of multiple claims. When that OIDC token is sent to the UserInfo endpoint, only the claims which are common in **both** the OIDC scope config file and the SP claim configuration (i.e., the intersection of claims in both these configurations) will be returned.

-----
## Add scopes

1. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`). 

2. Under **Manage**, click **OIDC Scopes > Add**. 

3. Enter a **Scope Name**. 

4. Click **Add OIDC Claim** and select claims from the dropdown of available OIDC claims.

    ![add-oidc-scope]({{base_path}}/assets/img/guides/add-oidc-scope.png)

5. Click **Finish** to add the new scope claim mapping.

-----

## Edit or list scopes

1. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`). 

2. Under **Manage**, click **OIDC Scopes > List**. 

    ![oidc-scope-list]({{base_path}}/assets/img/guides/oidc-scope-list.png)

3.  Select one of the following actions.

    - Click **Add claims** to add claims to a scope.
    - Click **Update** to remove claims from a scope. 
    - Click **Delete** to delete the scope mapping. 
    
----

## Add custom claims to OIDC scope

When the existing claim mappings are not enough for your requirement and if you need to add a custom OIDC claim to a scope, then follow the steps below.

1. [Add a custom claim]({{base_path}}/guides/dialects/add-claim-mapping/#add-local-claim) to the local dialect (https://wso2.org/claims)
2. [Add an external claim]({{base_path}}/guides/dialects/add-claim-mapping/#add-external-claim) to the `http://wso2.org/oidc/claim` dialect referring the local claim created in step 1. 

3. Click **OIDC Scopes > List** and add the new OIDC claim under the desired scope. 

!!! tip     
    For a sample use case, see [Handling Custom OIDC Claims.](https://medium.com/identity-beyond-borders/handling-custom-claims-with-openid-connect-in-wso2-identity-server-56d3b6e4319b)

## Handling claims that are JSON objects

OIDC considers `address` as a JSON object. Therefore, if you want to pass an address using a different claim other than the address claim that is already available, you can do it using any of the following methods:

!!! Info
    The values do not have to be added in complex object format.

-   Without using the `address.` prefix. 
    1. Register a scope named `address` in the WSO2 Identity Server's registry.
    2. Add the value as the street or lane or any preferred value.

-   Create a new external claim using the `address` prefix.
    1.  Click **Add** under **Claims**.
    2.  Click **Add External Claim**.
    3.  Select ` http://wso2.ord/oidc/claim ` as the value for **Dialect URI**.
    4.  Enter `   address.street    ` as the value for **External Claim URI**.

        !!! Info
            You can enter any value with the prefix `address.`, such as `address.country`, `address.lane`, and much more.

    5.  Map the claim you are creating to any claim within WSO2 Identity server.  
        
        !!! Info
            For example, you can map it to ` http://wso2.org/claims/location `.

Now you can see the claim you created being listed. It is created as a JSON object in WSO2 Identity Server.

-----  

!!! Note "About oidc-scope-config.xml"
    The `oidc-scope-config.xml` file enables grouping of claims that are bound to a scope value in OpenID Connect (OIDC). 
    By default, the `oidc-scope-config.xml` file is located inside the `<IS_HOME>/repository/conf/identity` directory. 
    In the very first server start-up, the scopes and claims values defined in this file will be stored in the database. 
    Thereafter the changes made to this file will not be applicable.


!!! info "Related topics"
    - [Concept: OpenID Connect Scopes and Claims]({{base_path}}/references/concepts/authentication/scopes-claims)
    - [Guide: OpenID Connect Authentication]({{base_path}}/guides/login/webapp-oidc/)
