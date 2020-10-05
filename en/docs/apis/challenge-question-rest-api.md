---
template: templates/swagger.html
---

# User's Challenge Questions and Answers API Definition - v1

!!! Note 
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server (WSO2 IS). 
    
    1.  Click **Authorize** and provide desired values for authentication. 
    2.  Expand the relevant API operation and click the **Try it Out** button.  
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2 IS. 

<div id="swagger-ui"></div>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "../../apis/restapis/challenge.yaml",
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
}
</script>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4bc7377da85b9dcd0516).