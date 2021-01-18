---
template: templates/swagger.html
---

# User's Session Management API Definition - v1

??? Note "Click for instructions"
    Before invoking the session management REST APIs, create some sessions for the user. You can create active 
    sessions for the users as follows.
       1. Register a service provider in the WSO2 Identity Server so that the authentication for the application will
        be handled by the Identity Server.
       2. Login to the application with valid credentials.
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
       1.  Click on **Authorize** button and provide desired values for authentication. 
       2.  Expand the relevant API operation and click the **Try It Out** button.  
       3.  Fill in relevant sample values for the input parameters and click **Execute**. 
            You will receive a sample curl command with the sample values you filled in. 
       4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
         IS. 
         
<div id="swagger-ui"></div>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://raw.githubusercontent.com/wso2/identity-api-user/v1.1.17/components/org.wso2.carbon.identity.api.user.session/org.wso2.carbon.identity.api.user.session.v1/src/main/resources/session.yaml",
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
