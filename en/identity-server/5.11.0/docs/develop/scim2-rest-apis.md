---
template: templates/swagger.html
---

<<<<<<<< HEAD:en/identity-server/6.1.0/docs/apis/challenge-questions.md
# Challenge Questions API Definition

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
    1.  Click **Authorize** and provide the desired values for authentication. 
    2.  Expand the relevant API operation and click the **Try It Out** button.  
========
# SCIM 2.0 API Definition

??? Note "Click to view"
    Follow the instructions given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
    1.  Click **Authorize** and provide the desired values for authentication. 
    2.  Expand the relevant API operation and click **Try It Out**.  
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/scim2-rest-apis.md
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS. 
    
<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
<<<<<<<< HEAD:en/identity-server/6.1.0/docs/apis/challenge-questions.md
     url: "{{base_path}}/apis/restapis/challenge-questions.yaml",
========
    url: "../../develop/restapis/scim2.yaml",
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/scim2-rest-apis.md
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
<<<<<<<< HEAD:en/identity-server/6.1.0/docs/apis/challenge-questions.md
========

>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/scim2-rest-apis.md
