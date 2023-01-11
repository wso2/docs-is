---
template: templates/swagger.html
---

# Authentication REST APIs

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server.

    1.  Expand the relevant API operation and click **Try It Out**.  
    2.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    3. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS. 

??? Note "Instructions for the /data endpoint"
    To configure the Authentication Data API add the following configuration to the **deployment.toml** file found in the **IS_HOME/repository/conf** directory and restart the IS server.
    ```toml
    [authentication.endpoint.redirect_params]
    filter_policy = "include"
    remove_on_consume_from_api = "true"
    parameters = ["sessionDataKey"]
    ```

    <table>
        <thead>
            <tr>
                <th>Field Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>filter_policy</td>
                <td>The value is either <b>include</b> or <b>exclude</b>. An include indicates an allowlisvalue,    whereas an <b>exclude</b> indicates a denylist value.</td>
            </tr>
            <tr>
                <td>remove_on_consume_from_api</td>
                <td>This decides whether to remove the parameters on a read. If set to true, parameters ardeleted     upon read and won’t be available for subsequent API requests, unless they arrepopulated in the    backend.</td>
            </tr>
            <tr>
                <td>parameters</td>
                <td>The list of parameters to be allowed/denied. The name attribute is used to specify thparameter    name.</td>
            </tr>
            <tr>
                <td>sessionDataKey</td>
                <td>
                    <p>This is an identifier used by the Identity Server to maintain state information abouthis     particular request from the service provider.</p>
                    <p>
                        <div class="admonition note">
                        <p class="admonition-title">Note</p>
                        <p>The <b>sessionDataKey</b> query parameter is used to coordinate the request statacross     components participating in the request flow. <br />
                        <br/>
                        The <b>sessionDataKey</b> does not correlate with the user session and at the end othe    request flow, the request state maintained against it is cleared by eacparticipating    component.
                        <br/>
                        <br/>
                        This means that even if an external party grabs the <b>sessionDataKey</b> they will nobe    able to get into the authentication sequence.
                        </div>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>

<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/authentication.yaml",
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

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e3cb44d6e7031639576b)
