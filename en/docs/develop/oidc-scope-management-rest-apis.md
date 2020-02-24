---
template: templates/swagger.html
---
# OpenID Connect Scope Management Rest API Definition - v1

The OIDC scope API in WSO2 Identity Server can be used to manage OIDC scopes and scope claim mapping. OIDC scope is a
sub set of OAuth2 scopes. Refer OAUTH2 Scope endpoint [here](oauth2-scope-management-rest-apis.md). 
Hence Identity Server won't allow same scope name across these two (OAUTH2 Scopes & OIDC Scopes) endpoints.

??? Note "Click For Instructions"
    Do the following to try out the REST APIs with your local instance of WSO2 Identity Server. 
    To try some APIs, a tenant need to be created with the domain name as 'wso2.com'. Please refer 
    [here](../administer/adding-new-tenant.md).
    
    1.  Expand the relevant API operation and click the **Try It Out** button.  
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
    url: "../../develop/restapis/oidc-scope-management.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/dccba59b82856b637ba0)