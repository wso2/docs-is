---
template: templates/swagger.html
---

# User's Session Management API Definition

??? Note "Click for instructions"
    Before invoking the session management REST APIs, create some sessions for the user. You can create active
    sessions for the users as follows.
    
       1. [Register a service provider](../guides/applications/register-sp.md) in the WSO2 Identity Server so that the authentication for the application will
        be handled by the Identity Server.
       2. Login to the application with valid credentials.
       
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
       1.  Click **Authorize** and provide the desired values for authentication. 
       2.  Expand the relevant API operation and click the **Try It Out** button.  
       3.  Fill in relevant sample values for the input parameters and click **Execute**. 
            You will receive a sample curl command with the sample values you filled in. 
       4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
         IS. 

!!! Note

    - From WSO2 IS 6.0.0 onwards, access tokens that are mapped with the session via REST API can be revoked. 
      This is applicable for authorization code grant, implicit flow, refresh token grant, and hybrid flow. 
    - If a session is terminated via the API and the same access token is used by multiple sessions,
      the other sessions will then lose their tokens. Therefore, it is recommended to use sso-session binding if 
      you wish to retain the capability to revoke the access token when the session is terminated via REST API.
    - WSO2 Identity Server sends SAML/OIDC back-channel logouts also when session is terminated via API. To support 
      this, the application should be configured to enable back-channel logout.

<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/session.yaml",
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
    layout: "StandaloneLayout",
  })
  // End Swagger UI call region
  window.ui = ui
</script>