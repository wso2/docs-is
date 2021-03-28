# Writing a Custom Federated Authenticator

A custom federated authenticator can be written to authenticate a user with an external system. 
So the external system can be any Identity provider such as Facebook, Twitter, Google and Yahoo. 
It is possible to use the extension points available in the WSO2 Identity Server to create custom 
federated authenticators.

![Federated authentication diagram](../assets/img/using-wso2-identity-server/federated-authentication-diagram.png)

### Authenticator API

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

This API can be used to configure a custom authenticator. As an example,
a Twitter authenticator is configured using the above API.

### Writing a custom federated authenticator

1. First create a maven project for the custom federated authenticator. Refer the [pom.xml](https://github.com/GANGANI/custom-federated-authenticator/blob/main/pom.xml) 
   file used for the sample custom federated authenticator.
2. Refer the [service component class](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/internal/CustomFederatedAuthenticatorServiceComponent.java) 
   as well since the authenticator is written as an OSGI service to deploy in the WSO2 Identity Server and register 
   it as a federated authenticator
3. The [custom federated authenticator](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java) 
   should be written by extending the [AbstractApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/AbstractApplicationAuthenticator.java) class 
   and implementing the [FederatedApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v5.18.187/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/LocalApplicationAuthenticator.java) class.
4. You can find a custom federated authenticator from [here](https://github.com/GANGANI/custom-federated-authenticator) for your reference

The important methods in the AbstractApplicationAuthenticator class, and the FederatedApplicationAuthenticator interface are listed as follows.

*   **[public String getName()](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L72-L76)**

Return the name of the authenticator

*   **[public String getFriendlyName()](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L66-L70)**

Returns the display name for the custom federated authenticator. In this sample we are using custom-federated-authenticator

*   **[public String getContextIdentifier(HttpServletRequest request)](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L209-L218)**

Returns a unique identifier that will map the authentication request and the response. The value returned by the invocation of authentication request and the response should be the same.

*   **[public boolean canHandle(HttpServletRequest request)](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L60-L64)** -

Specifies whether this authenticator can handle the authentication response.

*   **[protected void initiateAuthenticationRequest(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L134-L163)**

Redirects the user to the login page in order to authenticate and in this sample, the user is redirected to the login page of the application which is configured in the partner identity server which acts as the external service.

*   **[protected void processAuthenticationResponse(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/GANGANI/custom-federated-authenticator/blob/main/src/main/java/org/wso2/carbon/identity/custom/federated/authenticator/CustomFederatedAuthenticator.java#L166)**

Implements the logic of the custom federated authenticator.

### Deploy the custom federated authenticator in WSO2 IS

1. Once the implementation is done, navigate to the root of your project and run the following command to compile the service
2. Copy the compiled jar file insider _<Custom-federated-authenticator>/target._
3. Copy the jar file **org.wso2.carbon.identity.custom.federated.authenticator-1.0.0.jar** file to the _<IS_HOME>/repository/components/dropins._

### Configure the partner identity server

In this sample the partner identity server acts as the external system. 
Therefore, that partner identity server will be running on the same machine in a different port 
by adding the following config to the deployment.toml file.

```
[server]
offset=1
```

After starting that partner identity server, it will run on [localhost:9444](https://localhost:9444/carbon).

1. Access the Management console of the partner identity server.
2. Then go to the Service Providers under the main tab. 
   Then add Service Provider Name and register it. 
   Let’s use the playground app and refer to [this](https://is.docs.wso2.com/en/latest/learn/deploying-the-sample-app/#deploying-the-playground2-webapp) to configure the playground app.
3. Then List the Service Providers and edit the service provider by navigation to the** 
   OAuth/OpenID Configuration** under **Inbound Authentication Configuration** and add 
   [https://localhost:9443/commonauth](https://localhost:9443/commonauth) as the callback URL.
4. Create a user **Alex** in the partner identity server.

### Configure Federated Authenticator

To configure the federated authenticator, click the add button under **Identity Providers** and add an IDP name as 
**Partner-Identity-Server** and register the new IDP.

![Partner idp config](../assets/img/using-wso2-identity-server/partner-idp-config.png)

Click on the **Federated Authenticators** and expand the **custom-federated-authenticator configurations** 
and configure it as follows.

Here, the Client Id and Client Secret are the values of external service provider from the Partner-Identity-Server.

*   _Enable / Default - You can **enable** and set to **default**_
*   _Authorization Endpoint UR - [https://localhost:9444/oauth2/authorize/](https://localhost:9444/oauth2/authorize/)_
*   _Token Endpoint URL - [https://localhost:9444/oauth2/token/](https://localhost:9444/oauth2/token/)_
*   _Client Id - The value generated by the service provider of the partner IS_
*   _Client Secret - The value generated by the service provider of the partner IS_

![Federated Authenticator](../assets/img/using-wso2-identity-server/federated-authenticator.png)

### Configure an application with the custom federated authenticator

1. Start the server and log in to the WSO2 IS Management Console.

2. Then go to the Service Providers under the main tab. Then add Service Provider name and register it. Let’s use the 
   playground app and refer [this](https://is.docs.wso2.com/en/latest/learn/deploying-the-sample-app/#deploying-the-playground2-webapp) 
   to configure playground app.

3. Then List the Service Providers and edit the service provider as follows by navigation to the** OAuth/OpenID Configuration** under **Inbound Authentication Configuration **as explained above.

4. Then click Configure and add[ http://localhost:8080/playground2/oauth2client](http://localhost:8080/playground2/oauth2client) as the call back URL. Click Update.

5. Navigate to **Local & Outbound Authentication Configuration** as follows, and you can find Authentication Type. 
   Select **Federated Authentication** and select the configured federated authenticator and update to save the changed 
   configurations.

![Partner identity provider](../assets/img/using-wso2-identity-server/partner-identity-provider.png)

### Try the scenario

1. Access the playground app by using[ http://localhost:8080/playground2](http://localhost:8080/playground2). 
   
2. Then it will redirect to the login page of the application which is configured in the partner identity server which acts as the external service. 
   
3. Give Alex's username and password (The user was created, in the partner identity server). 
   
4. Then the federated authentication can be experienced since the Alex is authenticated from the partner Identity Server.

Similarly, you can write a federated authenticator to authenticate the users using an external system.
