---
template: templates/swagger.html
---

# TOTP API Definition

??? note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
      
     1.  Click **Authorize** and provide the desired values for authentication. 
     2.  Expand the relevant API operation and click the **Try It Out** button.  
     3.  Fill in relevant sample values for the input parameters and click **Execute**. 
         You will receive a sample curl command with the sample values you filled in. 
     4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
      IS. 
      
<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/totp.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    validatorUrl: null,
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
