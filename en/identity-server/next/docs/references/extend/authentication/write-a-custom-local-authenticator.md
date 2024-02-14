# Write a Custom Local Authenticator

A local authenticator in WSO2 identity server authenticates users, who are stored in the local database, using a defined authentication logic.

The default local authenticator in WSO2 identity server is the `Username & Password` authenticator.
It authenticates end users stored in a connected user store using the provided username and password.

WSO2 identity server supports extensibility in local authentication so that you can implement a different authentication logic by writing a custom local authenticator.
You can implement custom authentication logic tailored to your requirement, as follows:

1. Authenticating users only if they belong to a particular role.
2. Authenticating based on any claim, such as the user's telephone number or employee registration number.
3. Calling another API to authenticate the user.

---

## Scenario

You have a sample app to which you want users to log in with their telephone numbers instead of usernames. Once a user enters a telephone number, your authentication logic should identify the user and validate the user's credentials.

The following guide shows you how to write a custom local authenticator to implement this authentication logic.

---

## Write the local authenticator

To write the local authenticator:

1. Create a `maven` project for the custom local authenticator. Refer the following files:
    - The [pom.xml](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/pom.xml) file used for the sample custom local authenticator.
    - The [service component class](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/internal/SampleLocalAuthenticatorServiceComponent.java) file to deploy in WSO2 Identity Server and register it as a local authenticator.

2. Write the [custom local authenticator](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java) by extending the
[AbstractApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v7.0.12/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/AbstractApplicationAuthenticator.java) class and implementing the
[LocalApplicationAuthenticator](https://github.com/wso2/carbon-identity-framework/blob/v7.0.12/components/authentication-framework/org.wso2.carbon.identity.application.authentication.framework/src/main/java/org/wso2/carbon/identity/application/authentication/framework/LocalApplicationAuthenticator.java) class.

!!! info
    See the sample [custom local authenticator](https://github.com/wso2/samples-is/tree/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator) for your reference.

??? "Methods in `AbstractApplicationAuthenticator` class and `LocalApplicationAuthenticator` interface"
    | Method    | Description   |
    |-----------|---------------|
    |[**public String getName()**](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L159)    | Return the name of the authenticator.<p>In the sample project, we have used this method to return the name SampleLocalAuthenticator.</p> |
    |[**public String getFriendlyName()**](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L165) | Returns the display name for the custom local authenticator. <p>In the sample project, we have returned the name sample-local-authenticator.</p>    |
    | [**public String getContextIdentifier(HttpServletRequest request**)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L153)   | Returns a unique identifier that will map the authentication request and the response. The value returned by the invocation of the authentication request and the response should be the same.    |
    | [public boolean canHandle(HttpServletRequest request)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L58-L63)|<p>This method checks whether the authentication request is valid, according to the custom authenticator’s requirements. The user will be authenticated if the method returns 'true'. This method also checks whether the authentication or logout request can be handled by the authenticator.</p><p>In our sample project, we used this method to check if the username and password are 'not null' in the authentication request. If that succeeds, the authentication flow will continue.</p>  |
    | [protected void initiateAuthenticationRequest(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L66-L67) | <p>This method is used to redirect the user to the login page to authenticate. You can redirect the user to a custom login URL using this method or you can use the default WSO2 Identity Server login page.</p> |
    | [protected void processAuthenticationResponse(HttpServletRequest request,HttpServletResponse response, AuthenticationContext context)](https://github.com/wso2/samples-is/blob/v4.5.6/authenticators/components/org.wso2.carbon.identity.sample.local.authenticator/src/main/java/org/wso2/carbon/identity/sample/local/authenticator/SampleLocalAuthenticator.java#L89-L90) | <p>Implementation of custom authentication logic happens inside this method. For example, you can call any API that can do authentication and authenticate the user or you can authenticate the user against the underlying user store. Then you can also do any other custom logic after authenticating the user such as, you can check if a user belongs to a particular role and allowing authentication accordingly.</p><p>In the sample project, we used this method to authenticate the user with the user's telephone number and password, and make the authentication successful.</p>    |
    | public AuthenticatorFlowStatus process(HttpServletRequest request, HttpServletResponse response, AuthenticationContext context) | <p>This method is used to process or carry out the user authentication process. It calls the processAuthenticationResponse() method in the custom authenticator class to execute the custom authentication logic.</p><p>In the sample project, we call the super.process(), so that the super class process method will handle the authentication process, instead of implementing our own process method.</p>
    | protected boolean retryAuthenticationEnabled(AuthenticationContext context) | <p>This method returns a boolean value. If the authentication fails due to some issue like invalid credentials, this method will be called to know whether to retry the authentication flow. If this method returns 'true', the authentication flow will be retried. If returns 'false', the flow is stopped with an exception thrown.</p><p>You need to override this method if you are calling the <strong>super.process()</strong> method. But if you are writing your own <strong>process()</strong> method, you can handle all the retrying logic accordingly within the method.</p> |

---

## Deploy the authenticator

To deploy the custom local authenticator:

1. Open a terminal, navigate to the root of your project, and compile the service by running the following command:

    ``` xml
    mvn clean install
    ```

2. Copy the generated `org.wso2.carbon.identity.sample.local.authenticator-1.0.0.jar` file from `<Sample-local-authenticator>/target` folder to the `<IS_HOME>/repository/components/dropins` folder.
3. Add the following config to the deployment.toml file in the `<IS_HOME>/repository/conf` folder. The name should be the authenticator name returned by the `getName()` method in the authenticator class.

    ``` toml
    [authentication.authenticator.sample_authenticator]
    name = "SampleLocalAuthenticator"
    enable = true
    ```
     
---

## Configure the Identity Server

This section guides you on how to configure the identity server to use the custom local authenticator.

### Prerequisites
- You need to [set up the sample]({{base_path}}/get-started/try-samples/qsg-oidc-webapp-java-ee) application.

### Configure the application with the custom local authenticator

To configure the custom local authenticator for the application:

1. On the WSO2 Identity Server console, go to **Applications**.

2. Select your application, go to the **Sign-in Method** tab and add the custom local authenticator from your preferred editor:

    ---
    === "Classic Editor"
        To add custom local authenticator using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Remove the existing **Username & Password** authenticator and click **Add Authentication** on the step, select your custom local authenticator, and click **Add**.

            ![Add custom federated authenticator]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-local-authenticator-with-classic-editor.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add custom local authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Remove the existing **Username & Password** authenticator and click on `+ Add Sign In Option` to add a new authenticator to the same step and select your custom local authenticator.

            ![Add custom local authenticator using the Visual Editor]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-local-authenticator-with-visual-editor.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

3. Click **Update** to save your changes.

---

### Add a new user

To add a new user:

1. On the WSO2 Identity Server console, go to **User Management** > **Users**.

2. Click **Add User** and provide the required details.

3. Add a telephone number to the **Mobile** field and click **Next**.

5. Add the user to a group, if necessary, and click **Next**.

6. Assign the user a role, if necessary, and click **Next**.

7. Review the summary and click **Finish**.

---
## Try it out

1. Access the application URL.

2. Click **Login**. You will be redirected to the WSO2 Identity Server login page.

3. Enter the user's **telephone number** as the identifier and enter the user's password, and click **Continue**.

The user will be successfully authenticated.

---

## Contributing your connectors

{% include "../../../fragments/contributing-connectors.md" %}
