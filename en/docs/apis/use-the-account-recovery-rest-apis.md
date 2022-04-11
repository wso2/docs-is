# Account Recovery REST APIss

<div id="swagger-ui"></div>
<script src="../../../assets/lib/swagger/swagger-ui-bundle.js"> </script>
<script src="../../../assets/lib/swagger/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://github.com/wso2-extensions/identity-governance/blob/v1.5.69/components/org.wso2.carbon.identity.api.user.recovery/src/main/resources/api.identity.recovery.yaml",
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
