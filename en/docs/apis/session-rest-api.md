---
template: templates/swagger.html
---

# User's Session Management API Definition - v1

!!! Note 
    Before invoking the session management REST APIs, create some sessions for the user. You can create active 
    sessions for the users as follows.
       1. Register a service provider in WSO2 Identity Server (WSO2 IS) so that the authentication for the application will
        be handled by WSO2 IS.
       2. Log in to the application with valid credentials.

    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server (WSO2 IS). 
    
       1.  Click **Authorize** and provide desired values for authentication. 
       2.  Expand the relevant API operation and click **Try it Out**.  
       3.  Fill in relevant sample values for the input parameters and click **Execute**. 
            You will receive a sample curl command with the sample values you filled in. 
       4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
         IS. 
         
<div id="swagger-ui"></div>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "../../apis/restapis/session.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/fc9461875e367a944219)
