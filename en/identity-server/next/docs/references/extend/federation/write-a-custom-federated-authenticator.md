# Write a Custom Federated Authenticator

A custom federated authenticator can be written to authenticate a user with an external system.
The external system can be any identity provider such as Facebook, Twitter, Google, Yahoo, etc.
You can use the extension points available in WSO2 Identity Server to create custom federated authenticators.

![Federated authentication diagram]({{base_path}}/assets/img/references/extend/federated-authentication-diagram.png){: width="1000" style="display: block; margin: 0;"}

---

## Authenticator API

The following is the API used to implement a custom federated
authenticator.

??? example "Click to view the API of the Application Authenticators"
    ``` java
      /*
      *  Copyright (c) 2005-2013, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
      *
      *  WSO2 Inc. licenses this file to you under the Apache License,
      *  Version 2.0 (the "License"); you may not use this file except
      *  in compliance with the License.
      *  You may obtain a copy of the License at
      *
      *    http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing,
      * software distributed under the License is distributed on an
      * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      * KIND, either express or implied.  See the License for the
      * specific language governing permissions and limitations
      * under the License.
      */
      
      package org.wso2.carbon.identity.application.authentication.framework;
      
      import java.io.Serializable;
      import java.util.List;
      
      import javax.servlet.http.HttpServletRequest;
      import javax.servlet.http.HttpServletResponse;
      
      import org.wso2.carbon.identity.application.authentication.framework.context.AuthenticationContext;
      import org.wso2.carbon.identity.application.authentication.framework.exception.AuthenticationFailedException;
      import org.wso2.carbon.identity.application.authentication.framework.exception.LogoutFailedException;
      import org.wso2.carbon.identity.application.common.model.Property;
      
      /**
       * API of the Application Authenticators.
       *
       */
      public interface ApplicationAuthenticator extends Serializable {
      
          /**
           * Check whether the authentication or logout request can be handled by the
           * authenticator
           * 
           * @param request
           * @return boolean
           */
          public boolean canHandle(HttpServletRequest request);
          
          /**
           * Process the authentication or logout request.
           * 
           * @param request
           * @param response
           * @param context
           * @return the status of the flow
           * @throws AuthenticationFailedException
           * @throws LogoutFailedException
           */
          public AuthenticatorFlowStatus process(HttpServletRequest request,
                  HttpServletResponse response, AuthenticationContext context)
                  throws AuthenticationFailedException, LogoutFailedException;
          
          /**
           * Get the Context identifier sent with the request. This identifier is used
           * to retrieve the state of the authentication/logout flow
           * 
           * @param request
           * @return
           */
          public String getContextIdentifier(HttpServletRequest request);
          
          /**
           * Get the name of the Authenticator
           * @return name
           */
          public String getName();
          
          /**
           * @return
           */
          public String getFriendlyName();
          
          /**
           * Get the claim dialect URI if this authenticator receives claims in a standard dialect
           * and needs to be mapped to the Carbon dialect http://wso2.org/claims
           * @return boolean
           */
          public String getClaimDialectURI();
          
          /**
           * @return
           */
          public List<Property> getConfigurationProperties();
      }
    ```

---

## Write the federated authenticator

To write the federated authenticator:

1. Create a `maven` project for the custom federated authenticator. Refer the following files:
    - The [pom.xml](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/pom.xml) file used for the sample custom federated authenticator.
    - The [service component class](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/internal/CustomFederatedAuthenticatorServiceComponent.java) file to deploy in WSO2 Identity Server and register it as a federated authenticator.

2. Write the [custom federated authenticator](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java) by extending the
[AbstractApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/AbstractApplicationAuthenticator.java) class and implementing the
[FederatedApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/FederatedApplicationAuthenticator.java) class.

!!! info
    See the sample [custom federated authenticator](https://github.com/wso2/samples-is/tree/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator) for your reference.

??? "Methods in `AbstractApplicationAuthenticator` class and `FederatedApplicationAuthenticator` interface"
    | Method    | Description   |
    |-----------|---------------|
    |[**public String getName()**](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L72-L75)    | Return the name of the authenticator. |
    |[**public String getFriendlyName()**](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L66-L69) | Returns the display name for the custom federated authenticator. In this sample, we are using a custom-federated-authenticator.    |
    | [**public String getContextIdentifier(HttpServletRequest request**)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L214-L222)   | Returns a unique identifier that will map the authentication request and the response. The value returned by the invocation of the authentication request and the response should be the same.    |
    | [public boolean canHandle(HttpServletRequest request)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L59-L63)|Specifies whether this authenticator can handle the authentication response.  |
    | [protected void initiateAuthenticationRequest(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L136-L137) | Redirects the user to the login page to authenticate and in this sample, the user is redirected to the login page of the application which is configured in the partner identity server which acts as the external service. |
    | [protected void processAuthenticationResponse(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L168-L169) | Implements the logic of the custom federated authenticator.    |

---

## Deploy the authenticator

To deploy the custom federated authenticator:

1. Open a terminal, navigate to the root of your project, and compile the service by running the following command:

    ``` xml
    mvn clean install
    ```

2. Copy the generated `org.wso2.carbon.identity.custom.federated.authenticator-1.0.0.jar` file from `<Custom-federated-authenticator>/target` folder to the `<IS_HOME>/repository/components/dropins` folder.

---

## Configure the partner identity server

In this guide, the partner identity server acts as the external system. 
Therefore, it is required to run a second WSO2 Identity Server instance as the partner identity server.

### Set up partner IS
Add the following config to the `<PARTNER_IS_HOME>/repository/conf/deployment.toml` file to be able to run the partner identity server  on the same machine in a different port.

``` toml
[server]
offset=1
```

After starting that partner identity server, it will run on [localhost:9444](https://localhost:9444/console).


### Register an application

To register and configure the application on the partner IS:

1. On the WSO2 Identity Server console of the partner identity server, go to **Applications**.

2. Click **New Application** and select **Traditional Web Application**.

3. Enter the following details:

    <table>
        <tr>
            <td>Name</td>
            <td>Give a unique name to identify your application.</td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <b>OpenID Connect</b>.</td>
        </tr>
        <tr>
            <td>Authorized redirect URLs</td>
            <td>
                The URL to which the user is redirected after a successful login. Use the following URL for this sample app:
                <p><code>https://localhost:9443/commonauth</code></p>
            </td>
        </tr>
    </table>

5. Click **Register**. 

6. Go to the **Protocol** tab and take note of the **Client ID** and the **Client secret**.

!!! info "Download and configure the application"
    On the partner identity server:
    
    - Download the [sample](https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/releases/latest/download/oidc-sample-app.war) application.
    - [Configure the sample OIDC]({{base_path}}/get-started/try-samples/qsg-oidc-webapp-java-ee/#configure-the-sample) application on the partner identity server.

### Add a new user

To add a new user:

1. On the WSO2 Identity Server console of the partner identity server, go to **User Management** > **Users**.

2. Click **Add User** and provide the required details.

3. Click **Next**.

4. Add the user to a group, if necessary, and click **Next**.

5. Assign the user a role, if necessary, and click **Next**.

6. Review the summary and click **Finish**.

---

## Configure the Identity Server

This section guides you on how to configure the identity server to use the custom federated authenticator.

### Prerequisites
- You need to [set up the sample]({{base_path}}/get-started/try-samples/qsg-oidc-webapp-java-ee) application.

### Configure federated authenticator

To configure the custom fedrated authenticator:

1. On the WSO2 Identity Server console, go to **Connections**.
2. Click **Create Connection** and select **Custom Connector**.
3. Provide a unique name and a description and click **Finish**.
4. Go to **Settings** tab and click **New Authenticator**.
5. Select the custom federated authenticator added and click **Next**.
6. Enter the following details:

    | Field name    | Value |
    |---------------|-------|
    | **Client Id** | The Client Id value generated by the external application of the partner identity server.    |
    | **Client Secret** | The Client Secret value generated by the external application of the partner identity server.    |
    | **Callback URL**  | `https://localhost:9443/commonauth`   |
    | **Authorization Endpoint URL**    | `https://localhost:9444/oauth2/authorize/`    |
    | **Token Endpoint URL**    | `https://localhost:9444/oauth2/token/`    |

    ![Federated Authenticator]({{base_path}}/assets/img/references/extend/federated-authenticator.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Finish** to save the configurations.

### Configure the application with the custom federated authenticator

To configure the custom federated authenticator for the application:

1. On the WSO2 Identity Server console, go to **Applications**.

2. Select your application, go to the **Sign-in Method** tab and add the custom federated authenticator from your preferred editor:

    ---
    === "Classic Editor"
        To add custom federated authenticator using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your custom federated authenticator, and click **Add**.

            ![Add custom federated authenticator]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-federation-with-basic.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add custom federated authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your custom federated authenticator.

            ![Add custom federated authenticator using the Visual Editor]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-federation-with-visual-editor.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

3. Click **Update** to save your changes.

---

## Try it out

1. Access the application URL.

2. Click **Login**. You will be redirected to the WSO2 Identity Server login page.

3. Select the sign in option configured.

4. Enter the credentials of the the new user created in the partner identity server.

The user is successfully authenticated by the partner Identity Server.

Similarly, you can write a federated authenticator to authenticate the users using an external system.

## Contributing your connectors

{% include "../../../fragments/contributing-connectors.md" %}
