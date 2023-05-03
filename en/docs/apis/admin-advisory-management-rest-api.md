---
template: templates/swagger.html
---
# Admin Advisory Management Rest API Definition

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server (WSO2 IS).

    1.  Expand the relevant API operation and click **Try It Out**.
    2.  Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2 IS.

<div id="swagger-ui"></div>

<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/admin-advisory-management.yaml",
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

