---
template: templates/swagger.html
---

# Keystore Management API Definition

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    To try some APIs, a tenant needs to be created with the domain name 'wso2.com'. See [Add a new tenant]({{base_path}}/guides/tenants/tenant-mgt) for more information.
    
    1.  Expand the relevant API operation and click **Try It Out**.  
    2.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    3.  Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2 IS. 
    
<div id="swagger-ui"></div>

<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/keystore.yaml",
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
</script>
