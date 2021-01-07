---
template: templates/swagger.html
---

# OAuth 2.0 Scope Management Rest API Definition - v1

The OAuth2 scope API in WSO2 Identity Server (IS) can be used to manage oauth2 scopes and scope bindings such as 
roles and permissions. Since OIDC scope is a sub category of OAuth2 scopes, these end points cannot have the same 
scope names in WSO2 IS. For information about the OIDC scope endpoint,  
see [OIDC Scope Management REST APIs](../../develop/oidc-scope-management-rest-apis.md)

??? Note "Click For Instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 IS.
    To try some APIs, a tenant needs to be created with the domain name as 'wso2.com'. 
    See [here](../administer/adding-new-tenant.md) for more details on this.
    

    [here](../administer/adding-new-tenant.md).
    
    1.  Expand the relevant API operation and click **Try It Out** button.  
    2.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    3. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2 IS. 
    
<div id="swagger-ui"></div>
<script src="../../assets/lib/swagger/swagger-ui-bundle.js"> </script>
<script src="../../assets/lib/swagger/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://raw.githubusercontent.com/wso2-extensions/identity-inbound-auth-oauth/v6.4.111/components/org.wso2.carbon.identity.oauth.scope.endpoint/src/main/resources/api.identity.oauth2.scope.endpoint.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  // End Swagger UI call region

  window.ui = ui
}
</script>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/80f948e159dd8e0a8a6a)