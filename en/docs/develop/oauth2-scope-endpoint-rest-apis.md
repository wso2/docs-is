---
template: templates/swagger.html
---
# OAuth 2.0 Scope Endpoint Rest API Definition - v1

??? Note "Note: Click to view"
    Do the following to try out the REST APIs with your local instance of WSO2 Identity Server.

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
    url: "../../develop/restapis/oauth2-scope-endpoint.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2f9364b8550b3adf6c04)