---
template: templates/swagger.html
---
<<<<<<<< HEAD:en/identity-server/6.0.0/docs/apis/oauth2-scope-management-rest-apis.md

# OAuth 2.0 Scope Management Rest API Definition

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 IS.
    To try some APIs, a tenant needs to be created with the domain name as 'wso2.com'.
    See [here]({{base_path}}/guides/tenants/tenant-mgt) for more details on this.
========
# Tenant Management API Definition - V1

??? Note "Click For Instructions"
    Do the following to try out the REST APIs with your local instance of WSO2 Identity Server. 
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/tenant-management-rest-api.md
    
    1.  Expand the relevant API operation and click **Try It Out** button.  
    2.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    3. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2 IS. 
    
<div id="swagger-ui"></div>

<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
<<<<<<<< HEAD:en/identity-server/6.0.0/docs/apis/oauth2-scope-management-rest-apis.md
     url: "{{base_path}}/apis/restapis/oauth2-scope-endpoint.yaml",
========
    url: "https://raw.githubusercontent.com/wso2/identity-api-server/v1.0.190/components/org.wso2.carbon.identity.api.server.tenant.management/org.wso2.carbon.identity.api.server.tenant.management.v1/src/main/resources/tenant-management.yaml",
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/tenant-management-rest-api.md
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

<<<<<<<< HEAD:en/identity-server/6.0.0/docs/apis/oauth2-scope-management-rest-apis.md
   window.ui = ui
</script>
========
  window.ui = ui
}
</script>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/4b7454af08aaa3c5de3c)
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/tenant-management-rest-api.md
