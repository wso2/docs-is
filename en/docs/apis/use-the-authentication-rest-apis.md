# Authentication REST APIs

<div id="swagger-ui"></div>
<script src="../../../assets/lib/swagger/swagger-ui-bundle.js"> </script>
<script src="../../../assets/lib/swagger/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://github.com/wso2-extensions/identity-local-auth-api/blob/5ad032a0d01c9037e48554a0c555322ff9657dd6/components/org.wso2.carbon.api.server.local.auth.api/src/main/resources/api.identity.local.auth.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/51139ad1cff6875115a1)

    
