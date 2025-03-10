# Add LinkedIn login

You can add LinkedIn login to your applications using Asgardeo and enable users to log in with their LinkedIn accounts.  

Follow this guide for instructions.

## Register Asgardeo on LinkedIn
You need to register Asgardeo as an OAuth2.0 application on LinkedIn.

1. Go to the [LinkedIn Developer console](https://developer.linkedin.com/){:target="_blank"}, click on **Create app** button to create a new application.

    ![Create a new application]({{base_path}}/assets/img/guides/idp/linkedin-idp/create-app.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Provide the **App name**, **LinkedIn Page**, and **App logo** for your application. Accept the **Legal agreement** and click on **Create app** to complete the application creation process.

    ![Application create wizard]({{base_path}}/assets/img/guides/idp/linkedin-idp/create-app-wizard.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. In the **Products** tab, request access for **Sign In with LinkedIn using OpenID Connect**.

    ![Request access for sign in with LinkedIn using OpenID Connect]({{base_path}}/assets/img/guides/idp/linkedin-idp/request-access-oidc.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Navigate to the **Auth** tab and add the following URL as the **Authorized Redirect URL** for your app.

    ```bash
    https://api.asgardeo.io/t/{organization_name}/commonauth
    ```

    ![Authorized Redirect URL]({{base_path}}/assets/img/guides/idp/linkedin-idp/auth-redirect-url.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Take note of the client ID and client secret generated for the application from the **Auth** tab.

## Register the LinkedIn IdP

Now, let's register the LinkedIn IdP in Asgardeo.

1. On the Asgardeo Console, go to **Connections**.
2. Click **New Connections** and select **LinkedIn**.
3. Enter the following details of the LinkedIn identity provider and click **Create**:

    ![Add LinkedIn IDP in Asgardeo]({{base_path}}/assets/img/guides/idp/linkedin-idp/add-linkedin-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this LinkedIn identity provider.</td>
      </tr>
      <tr>
          <td>Client ID</td>
          <td>The client ID obtained from LinkedIn.</td>
      </tr>
      <tr>
          <td>Client secret</td>
          <td>The client secret obtained from LinkedIn.</td>
      </tr>
    </table>

## Enable LinkedIn login

!!! note "Before you begin"
    You need to [register an application with Asgardeo]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the Asgardeo Console, go to **Applications**.
2. Select your application, go to the **Login Flow** tab and add LinkedIn login from your preferred editor:

    === "Classic Editor"
        To add LinkedIn login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.
    
        2. Click **Add Authentication** on the step, select your LinkedIn identity provider, and click **Add**.

            ![Add LinkedIn login in Asgardeo]({{base_path}}/assets/img/guides/idp/linkedin-idp/add-linkedin-federation-with-basic.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add LinkedIn login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.
    
        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your LinkedIn connection.

            ![add LinkedIn login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/idp/linkedin-idp/add-linkedin-login-with-visual-editor.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

    !!! note "Recommendations"
        It is recommended to add your social and enterprise connections to the first authentication step as they are used for identifying the user.

3. Click **Update** to save your changes.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the Asgardeo login page.
3. On the Asgardeo login page, **Sign in with LinkedIn**.

    ![Login with LinkedIn]({{base_path}}/assets/img/guides/idp/linkedin-idp/sign-in-with-linkedin.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to LinkedIn with an existing user account.

!!! note
    When a user successfully logs in with LinkedIn for the first time, a **user** account is created in the Asgardeo Console with the LinkedIn email. This new user account will be managed by LinkedIn.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.
