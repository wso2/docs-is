---
template: templates/swagger.html
---

# SCIM 2.0 API Definition

## Restrict federated user access

You can restrict federated users from accessing SCIM 2.0 endpoints by adding the following configurations to the `deployment.toml` file:

```toml
[scim]
restrict_federated_user_access = true

[scim2]
restrict_federated_user_access_to_me_endpoint = true
```

When these configurations are enabled, federated users will be denied access to SCIM 2.0 API endpoints.

---

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server.
    
    1.  Click **Authorize** and provide the desired values for authentication. 
    2.  Expand the relevant API operation and click **Try It Out**.  
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS. 
    
<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "{{base_path}}/apis/restapis/scim2.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f6c4c6b80e9d412754d7)


