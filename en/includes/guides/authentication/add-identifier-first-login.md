# Add Identifier First login

Identifier first login separates the authentication flow into two steps. The first step prompts the user to enter a unique identifier, such as an email address, and the second step involves authentication.

This allows you to personalize the experience for users based on their unique identifier. For example, based on the domain name of a user's email address, you can redirect the user to an external identity provider.

## Prerequisites
To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

## Enable Identifier First for an app

Follow the steps below to enable **Identifier First** as an authenticator in the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application, go to its **Login Flow** tab and create an Identifier First based authentication flow as described below.

    ---
    === "Classic Editor"
        To add Identifier First using the classic editor:

        1. In the first step, click **Add Authentication** and select **Identifier First**.
            
            !!! note
                - If you haven't already configured an authentication flow, click **Start with default configuration** to begin.
                - Remove the **Username & Password** authenticator from the first step as it cannot co-exist with Identifier First in the same step.

        2. Add a second authentication step by clicking the **+** icon and add your preferred authenticators to this step.
            
            ![Add Identifier First login in {{ product_name }}]({{base_path}}/assets/img/guides/identifier-first/add-identifier-first-login.png){: width="600" style="display: block; margin: 0;"}

        3. Use conditional authentication to [customize the authentication flow](#customize-the-authentication-flow).
            
            !!! note
                Be sure to pick the user identifier and attributes from the first step only if you have enabled the `ValidateUsername` parameter in your conditional authentication script.

    === "Visual Editor"
        To add Identifier First using the visual editor:
  
        1. Switch to the **Visual Editor** tab.

        2. In the first step, click `+ Add Sign In Option` and select **Identifier First**.

            !!! note
                Remove the **Username & Password** authenticator from the first step as it cannot co-exist with Identifier First in the same step.

        3. Add a second authentication step by clicking the **+** icon and add your preferred authenticators to this step.

            ![Add Identifier First login in {{ product_name }}]({{base_path}}/assets/img/guides/identifier-first/add-identifier-first-loin-with-visual-editor.png){: width="600" style="display: block; margin: 0;"}

        4. Use conditional authentication to [customize the authentication flow](#customize-the-authentication-flow).
        
            !!! note
                Be sure to pick the user identifier and attributes from the first step only if you have enabled the `ValidateUsername` parameter in your conditional authentication script.

    ---

3. Click **Update** to save your changes.

## Customize the authentication flow

Identifier First login allows you to customize the authentication flow based on the user identifier.

For example, let's say that you want users whose user identifiers end in <code>gmail.com</code> to log in with Google and for the other users to use basic authentication.

Follow the steps below to implement this logic.

1. [Enable Identifier First for your application](#enable-identifier-first-for-an-app).

2. Add the following conditional authentication script.

    !!! note
        Learn how to [enable conditional authentication]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/#enable-conditional-authentication)

    ```js
    var domain = '@gmail.com';

    var onLoginRequest = function (context) {
        executeStep(1, {
            onSuccess: function (context) {
                var userIdf = context.steps[1].subject.username;
                if (userIdf.endsWith(domain)) {
                    Log.info("executing externally");
                    executeStep(2, {
                        authenticatorParams: {
                            common: {
                                'login_hint_value': userIdf  // This is where we resolve the dynamic query param.
                            }
                        },
                        authenticationOptions: [{
                            idp: 'Google' // Name of the OIDC idp.
                        }]
                    }, {});
                } else {
                    Log.info("executing internally");
                    executeStep(2, {
                        authenticationOptions: [{ authenticator: 'BasicAuthenticator' }]
                    }, {});
                }
            }
        });
    };
    ```

    Let's look at how this script works.

    1. The `onSuccess` parameter checks whether the username entered in the first step ends with the specified domain, in this example, `@gmail.com`, and redirects the user to the relevant identity provider.

    2. The user is redirected to the identity provider specified in the `authenticationOptions` parameter. If the username does not end with `@gmail.com`, the user is taken to the `username & password` authenticator.

    3. The `login_hint_value` parameter passes the username to the external authenticator. In this example, it is set as the Google ID.

    !!! note "Additional Parameters"

        Listed below are other parameters that are associated with Identifier First login. </br></br>

        **skipIdentifierPreProcess** </br>
        When set to true, the authentication flow skips basic username validations and pre-processings that are performed on the user identifier.

        ``` java
        ...
        executeStep(1, {
        authenticatorParams: {
            common: {
                'skipIdentifierPreProcess': "true",
            }
        }
        }
        ...
        ```
        </br>

        **ValidateUsername** </br>
        When set to true, the authentication flow checks if a user has an existing account associated with the user identifier. This functionality is disabled by default.


        ```java
        ....
        executeStep(1, {
        authenticatorParams: {
        common: {
            'ValidateUsername': "true",
            }
        }
        }
        ....
        ```

        !!! warning
            You cannot enable this parameter if you have an IdP discovery flow in your logic similar to what we have implemented in this guide.


3. Click **Update** to confirm.

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. Enter a user identifier that does not end with `@gmail.com`. You will be redirected to the basic authenticator.

    ![Login with a non gmail username to identifier first]({{base_path}}/assets/img/guides/identifier-first/identifier-first-non-gmail.png){: width="800" style="display: block; margin: 0;"}

4. Enter a user identifier that ends with `@gmail.com`. You will be redirected to the Google authenticator.

    ![Login with a non gmail username to identifier first]({{base_path}}/assets/img/guides/identifier-first/identifier-first-gmail.png){: width="800" style="display: block; margin: 0;"}