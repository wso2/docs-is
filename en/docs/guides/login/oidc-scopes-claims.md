# Map OpenID Connect Scopes and Claims

This page guides you through mapping [OpenID Connect (OIDC) scopes and claims](../../../concepts/authentication/scopes-claims). 

    
-----
## Add scopes

(TODO: dev-portal-fragment)

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Under **Manage**, click **OIDC Scopes > Add**. 

3. Enter a **Scope Name**. 

4. Click **Add OIDC Claim** and select claims from the dropdown of available OIDC claims.

    ![add-oidc-scope](../../assets/img/guides/add-oidc-scope.png)

5. Click **Finish** to add the new scope claim mapping.

-----

## Edit or list scopes

(TODO: dev-portal-fragment)

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Under **Manage**, click **OIDC Scopes > List**. 

    ![oidc-scope-list](../../assets/img/guides/oidc-scope-list.png)

3. Click **Add claims** to add claims to a scope.
   
   Click **Update** to remove claims from a scope. 

   Click **Delete** to delete the scope mapping. 
    
----

## Add custom claims to OIDC scope

(TODO: dev-portal-fragment)

When the existing claim mappings are not enough for your requirement and if you need to add a custom OIDC claim to a scope, then follow the steps below.

1. [Add a custom claim to the local dialect (https://wso2.org/claims)](insertlink).

2. [Add an external claim](insertlink) to the `http://wso2.org/oidc/claim` dialect referring the local claim created in step 1. 

3. Click **OIDC Scopes > List** and add the new OIDC claim under the desired scope. 

!!! tip     
    For a sample use case, see [Handling Custom OIDC Claims.](https://medium.com/identity-beyond-borders/handling-custom-claims-with-openid-connect-in-wso2-identity-server-56d3b6e4319b)

-----  

**About oidc-scope-config.xml**

The `oidc-scope-config.xml` file enables grouping of claims that are bound to a scope value in OpenID Connect (OIDC). 
By default, the oidc-scope-config.xml file is located inside the `<IS_HOME>/repository/conf/identity` directory. 
In the very first server start-up the scopes and claims values defined in this file , will be stored in the database. 
Thereafter the changes which we do to this file wont be applicable.

----

!!! info "Related Topics"
    - [Concept: OpenID Connect Scopes and Claims](../../../concepts/authentication/scopes-claims)
    - [Guide: OpenID Connect Authentication](../webapp-oidc)