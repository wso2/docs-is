---
template: templates/swagger.html
---
??? note "Note: Click to view"
    Do the following to try out the REST APIs with your local instance of WSO2 Identity Server. 
      
      1. [Add a new workflow definition](https://is.docs.wso2.com/en/5.9.0/learn/adding-a-new-workflow-definition/) 
      and [engage the workflow in an operation](https://is.docs.wso2.com/en/5.9
      .0/learn/engaging-a-workflow-in-an-operation/)
      2. Perfom few related operations to generate few human task approvals.
      3. Click on **Authorize** button and provide desired values for authentication.
      4. Expand the relevant API operation and click the **Try It Out** button.  
      5. Fill in relevant sample values for the input parameters and click **Execute**. 
      You will receive generated sample curl command with the sample values you filled in. 
      6.  Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of 
      WSO2 IS. 

<div id="swagger-ui"></div>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "../../develop/restapis/approvals.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5756659f9134b101dd64)