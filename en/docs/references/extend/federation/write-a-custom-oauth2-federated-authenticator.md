# Write a Custom OAuth2 Federated Authenticator

A custom OAuth2 authenticator can be written to authenticate a user with an external system. The external system can be
any Identity provider supporting OAuth2 including Facebook, Kakao, Naver, etc. You can use the `OAuth2GenericAuthenticator`
available in WSO2 Identity Server to create custom OAuth2 authenticators.

## Write a custom OAuth2 federated authenticator

1. Create a maven project for the custom OAuth2 authenticator. Refer to the following files:

> - the [pom.xml](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.oauth2.federated.authenticator/pom.xml) file used for the Custom authenticator.
> - The [service component class](https://github.com/wso2/samples-is/blob/master/authenticators/components/org.wso2.carbon.identity.sample.oauth2.federated.authenticator/src/main/java/org/wso2/carbon/identity/sample/oauth2/federated/authenticator/internal/OAuth2CustomAuthenticatorServiceComponent.java) to deploy in WSO2 Identity Server and register it as a federated authenticator.
2. The custom authenticator should be written by extending the `OAuth2GenericAuthenticator` class.
3. You can find a [Kakao custom authenticator](https://github.com/wso2-extensions/identity-outbound-auth-kakao) here for
   your reference.

The important methods in the `OAuth2GenericAuthenticator` class are listed as follows:

| Method                                       | Description                                                                                                                                                                                                                                                      |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
|[public String getName()](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L503-L506)|Return the name of the authenticator.|                                                                                                          
|[public String getFriendlyName()](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L497-L500)|Returns the display name for the custom authenticator. In this sample we are using “KAKAO”.|
|[public String getContextIdentifier(HttpServletRequest request)](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L476-L488)|Returns a unique identifier that will map the authentication request and the response. The value returned by the invocation of the authentication request and the response should be the same.|
|[public boolean canHandle(HttpServletRequest request)](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L470-L473)|Specifies whether this authenticator can handle the authentication response.|
|[protected void initiateAuthenticationRequest(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L76-L113)|Redirects the user to the login page in order to authenticate and in this sample, the user is redirected to the login page of the Kakao.|
|[protected void processAuthenticationResponse(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L116-L145)|Implements the logic of the custom federated authenticator.|
|[protected void buildClaims(AuthenticationContext context, String userInfoString)](https://github.com/wso2-extensions/identity-outbound-auth-oauth2/blob/75745516bb81f3b93b47075da720cd2fbc194217/components/org.wso2.carbon.identity.application.authenticator.oauth2/src/main/java/org.wso2.carbon.identity.application.authenticator.oauth2/Oauth2GenericAuthenticator.java#L147-L183)|Implements the logic for extracting the subject from claims and for other claim mappings.|

---

## Deploy the custom OAuth2 federated authenticator in WSO2 IS
To deploy the custom OAuth2 federated authenticator:
1. Open a terminal, navigate to the root of your project, and compile the service by running the following command:
    ``` xml
    mvn clean install
    ```
2. Copy the compiled `jar` file inside `/target` folder and paste it to the `<IS_HOME>/repository/components/dropins`.

---

## Configure custom OAuth2 federated authenticator

1. To configure the custom authenticator, click the Add button under Identity Providers and add an IDP name to register the new IDP.
2. Click Federated Authenticators and expand `Custom OAuth2 Authenticator Configuration`. Configure it as follows.

    - Select the **Enable** and **Default** check boxes.
    - **Client Id** - The client ID value generated by the external OAuth2 IdP.
    - **Client Secret** - The client secret value generated by the external OAuth2 IdP.
    - **Callback Url** - https://localhost:9443/commonauth
    - **Authorization Endpoint URL** - https://kauth.kakao.com/oauth/authorize
    - **Token Endpoint URL** - https://kauth.kakao.com/oauth/token
    - **User Information Endpoint URL** - https://kapi.kakao.com/v2/user/me


    !!!info
         Here, the Client Id and Client Secret are the values of Kakao.

   ![Federated Oauth2 Authenticator]({{base_path}}/assets/img/extend/federated-oauth2-authenticator.png)

---

## Configure an application with the custom federated authenticator

1. Start the server and log in to the WSO2 IS Management Console.
2. Navigate to `Main > Identity > Service Providers > Add`.
3. Add a Service Provider name and optionally, add a description.
4. Click `Register`. (Let’s use the playground app and refer this to configure the playground app.
5. List the Service Providers and edit the service provider as follows by navigating to the `OAuth/OpenID Configuration` section under `Inbound Authentication Configuration` as explained above.
6. Click Configure and add `http://localhost:8080/playground2/oauth2client` as the call back URL. Click Update.
7. Navigate to `Local & Outbound Authentication Configuration` and you can find the Authentication Type. Select `Federated Authentication` and select the configured authenticator and update to save the changed configurations.

---

## Try it out

1. Access the playground app by using [http://localhost:8080/playground2](http://localhost:8080/playground2).
2. This will redirect to the login page of Kakao.
3. Enter the email address and password for Kakao.

You will be successfully logged into the application.

Similarly, you can write a custom authenticator to authenticate the users from different external systems.
