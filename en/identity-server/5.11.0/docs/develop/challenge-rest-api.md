---
template: templates/swagger.html
---

<<<<<<<< HEAD:en/identity-server/6.0.0/docs/apis/challenge-rest-api.md
# Challenge Answers API Definition

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
========
# User's Challenge Questions and Answers API Definition - v1

??? Note "Click For Instructions"
    Do the following to try out the REST APIs with your local instance of WSO2 Identity Server. 
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/challenge-rest-api.md
    
    1.  Click **Authorize** and provide the desired values for authentication. 
    2.  Expand the relevant API operation and click the **Try It Out** button.  
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS. 
    
<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
<<<<<<<< HEAD:en/identity-server/6.0.0/docs/apis/challenge-rest-api.md
     url: "{{base_path}}/apis/restapis/challenge.yaml",
========
    url: "https://raw.githubusercontent.com/wso2/identity-api-user/v1.1.17/components/org.wso2.carbon.identity.api.user.challenge/org.wso2.carbon.identity.rest.api.user.challenge.v1/src/main/resources/challenge.yaml",
>>>>>>>> 5.11.0-docs-old:en/identity-server/5.11.0/docs/develop/challenge-rest-api.md
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5df1a9717f2e86fb0279)
