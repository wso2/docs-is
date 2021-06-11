# Write a Custom Federated Authenticator

A custom federated authenticator can be written to authenticate a user with an external system.
The external system can be any identity provider such as Facebook, Twitter, Google, Yahoo, etc.
You can use the extension points available in WSO2 Identity Server to create custom federated authenticators.

![Federated authentication diagram](../../../assets/img/extend/federated-authentication-diagram.png)

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

## Writing a custom federated authenticator

1. First, create a maven project for the custom federated authenticator. Refer the [pom.xml](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/pom.xml) 
   file used for the sample custom federated authenticator.
2. Refer the [service component class](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/internal/CustomFederatedAuthenticatorServiceComponent.java) 
   as well since the authenticator is written as an OSGI service to deploy in WSO2 Identity Server and register 
   it as a federated authenticator.
3. The [custom federated authenticator](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java) 
   should be written by extending the [AbstractApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/AbstractApplicationAuthenticator.java) class. 
   and implementing the [FederatedApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/FederatedApplicationAuthenticator.java) class.
4. You can find a custom federated authenticator [here](https://github.com/wso2/samples-is/tree/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator) for your reference.

The important methods in the `AbstractApplicationAuthenticator` class, and the `FederatedApplicationAuthenticator` interface are listed as follows.

| Method                                       | Description                                                                                                                                                                                                                                                       |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
|[public String getName()](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L73-L77)|Return the name of the authenticator.|                                                                                                          
|[public String getFriendlyName()](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L67-L71)|Returns the display name for the custom federated authenticator. In this sample we are using custom-federated-authenticator.|
|[public String getContextIdentifier(HttpServletRequest request)](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L215-L224)|Returns a unique identifier that will map the authentication request and the response. The value returned by the invocation of authentication request and the response should be the same.|
|[public boolean canHandle(HttpServletRequest request)](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L60-L65)|Specifies whether this authenticator can handle the authentication response.|
|[protected void initiateAuthenticationRequest(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L138-L139)|Redirects the user to the login page in order to authenticate and in this sample, the user is redirected to the login page of the application which is configured in the partner identity server which acts as the external service.|
|[protected void processAuthenticationResponse(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.federated.authenticator/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L169-L171)|Implements the logic of the custom federated authenticator.|

---

## Deploy the custom federated authenticator in WSO2 IS

1. Once the implementation is done, navigate to the root of your project and run the following command to compile the service.
    ``` xml
    mvn clean install
    ```
2. Navigate to the generated `<Custom-federated-authenticator>/target` folder.
3. Copy the **org.wso2.carbon.identity.custom.federated.authenticator-1.0.0.jar** file to the `<IS_HOME>/repository/components/dropins` folder.

---

## Configure the partner identity server

In this guide, the partner identity server acts as the external system. 
Therefore, it is required to run a second identity server instance as the partner identity server. 
The partner identity server will be running on the same machine in a different port 
by adding the following config to the `<PARTNER_IS_HOME>/repository/conf/deployment.toml` file.

```
[server]
offset=1
```

After starting that partner identity server, it will run on [localhost:9444](https://localhost:9444/carbon).

### Register a service provider

1. Access the management console (`https://<PARTNER_IS_HOST>:<PARTNER_IS_PORT>/carbon`) of the partner identity server.

2. Navigate to **Main** > **Identity** > **Service Providers** > **Add**.

    <img src="../../../../assets/img/fragments/add-service-provider.png" width="300" alt="Service provider option in Main menu" />
    
3. Enter a **Service Provider Name**. Optionally, enter a **Description**.

    <img src="../../../../assets/img/fragments/register-service-provider.png" width="600" alt="Add new service provider basic information" />
    
4. Click **Register**.    
   
5. In the next view, expand **Inbound Authentication Configuration** > **OAuth/OpenID Connect Configuration** and click **Configure**.

6. Enter the **Callback Url** as `https://localhost:9443/commonauth`. 

7. Click **Add**. Note the **OAuth Client Key** and **OAuth Client Secret** that appear. 

    !!! tip
        To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced). 

### Create a user

1. Access the management console (`https://<PARTNER_IS_HOST>:<PARTNER_IS_PORT>/carbon`) of the partner identity server.

2. Navigate to **Main** > **Identity** > **Users and Roles** > **Add**.

3. Click **Add New User** and create a new user by providing a username and password.

4. Click **Finish**.

---

## Configure federated authenticator

1. Access the management console (`https://<IS_HOST>:<IS_PORT>/carbon`) of the identity server.

2. Navigate to **Main** > **Identity** > **Identity Providers** > **Add**.

    <img src="../../../../assets/img/fragments/add-identity-provider.png" width="300" alt="Add an identity provider option in Main menu" />

3. Provide the **Identity Provider Name**  as `Partner-Identity-Server`.

    ![Partner idp config](../../../assets/img/extend/partner-idp-config.png)

4. Click **Federated Authenticators** and expand **Custom-federated-authenticator configurations**. 
   Configure it as follows.

    - Select the **Enable** and **Default** check boxes.
    - **Client Id** - The Client Id value generated by the external service provider of the partner identity server.
    - **Client Secret** - The Client Secret value generated by the external service provider of the partner identity server.
    - **Callback URL** - `https://localhost:9443/commonauth` (this is the callback URL provided when creating the external service provider of the partner identity server)
    - **Authorization Endpoint URL** - `https://localhost:9444/oauth2/authorize/`
    - **Token Endpoint URL** - `https://localhost:9444/oauth2/token/`

    ![Federated Authenticator](../../../assets/img/extend/federated-authenticator.png)

5. Click **Register**.

---

## Configure an application with the custom federated authenticator

{!fragments/register-a-service-provider.md!}

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration** > **OAuth/OpenID Connect Configuration** and click **Configure**.

2. Enter the **Callback Url**. 

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Add**. Note the **OAuth Client Key** and **OAuth Client Secret** that appear. 

    !!! tip
        To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../../guides/login/oauth-app-config-advanced). 


5. Expand the **Local & Outbound Authentication Configuration** section. 

6. Select **Federated Authentication** and select the configured federated authenticator.

   ![Partner identity provider](../../../assets/img/extend/partner-identity-provider.png)

7. Click **Update** to save the configurations.

---

## Try out the scenario

1. Access application URL of the [service provider](#configure-an-application-with-the-custom-federated-authenticator) created in the identity server and attempt to log in.
   
2. This will redirect to the login page of the application which is configured in the partner identity server which acts as the external service. 
   
3. Enter the credentials of the [user](#create-a-user) created in the partner identity server. 
   
4. Now the user is authenticated by the partner Identity Server.

Similarly, you can write a federated authenticator to authenticate the users using an external system.
