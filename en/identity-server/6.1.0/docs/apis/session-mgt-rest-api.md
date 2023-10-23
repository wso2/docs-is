---
template: templates/swagger.html
---

# User's Session Management API Definition

??? Note "Click for instructions"
    Before invoking the session management REST APIs, create some sessions for the user. You can create active sessions for the users as follows.
    
       1. [Register a service provider]({{base_path}}/guides/applications/register-sp) in the WSO2 Identity Server so that the Identity Server will handle the authentication for the application.
       2. Log in to the application with valid credentials.
       
    Follow the steps below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
       1. If you are using OAuth-based authentication, [obtain an access token]({{base_path}}/apis/overview/#how-to-access-the-apis) for your organization using the scope specified in the relevant API operation. Skip this step if you are using basic authentication to invoke the API.
       2. Expand the relevant API operation and select the required authentication method from the **Examples** list.
       3. Copy the sample cURL command provided under the examples, update the relevant variables, and add the `-k` header to the curl command.
       4. Run the curl command on the terminal with a running instance of WSO2 IS. 

!!! Note

    - From WSO2 IS 6.0.0 onwards, access tokens mapped with the session via REST API can be revoked. 
      This is applicable for authorization code grant, implicit flow, refresh token grant, and hybrid flow. 
    - If a session is terminated via the API and the same access token is used by multiple sessions, the other sessions will lose their tokens. Therefore, it is recommended to use sso-session binding if you wish to retain the capability to revoke the access token when the session is terminated via the REST API.
    - WSO2 Identity Server also sends SAML/OIDC back-channel logouts when the session is terminated via the API. To support this, you should configure the application to enable back-channel logout.

<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/session.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    validatorUrl: null,
    supportedSubmitMethods: [],
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