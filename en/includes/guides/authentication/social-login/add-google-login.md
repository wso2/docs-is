# Add Google login

You can add Google login to your applications using {{ product_name }} and enable users to log in with their Google accounts.  

Follow this guide for instructions.

## Register {{ product_name }} on Google
You need to register {{ product_name }} as an OAuth2.0 application on Google.

!!! note
    For detailed instructions, you can follow the [Google documentation](https://support.google.com/googleapi/answer/6158849).

1. Go to the [Google Developer console](https://console.developers.google.com/apis/credentials), create a new project, or select an existing project.

2. If the **APIs & services** page isn't already open, do the following:

    1. Open the navigation menu and click **View all products**.

       ![View all products on the Google console]({{base_path}}/assets/img/guides/idp/google-idp/view-all-products.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    2. Under **Management**, click **APIs & Services**.

       ![Select APIs & Services]({{base_path}}/assets/img/guides/idp/google-idp/apis-and-services.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Go to the **Credentials** page, click **Create Credentials**, and select **Oauth client ID**.

    ![Select APIs & Services]({{base_path}}/assets/img/guides/idp/google-idp/google-oauth-client-id.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Configure your consent screen by clicking **Configure Consent Screen** and return to **Create OAuth client ID** screen once you are done.

    !!! note
        For more information, see [User Consent](https://support.google.com/googleapi/answer/6158849#userconsent&zippy=%2Cuser-consent)

5. Select the **Web application** as the application type.
6. Provide a name for your app and the following URL as the **Authorized Redirect URI** of the application:

    ```bash
    {{ product_url_format }}/commonauth
    ```

7. Take note of the client ID and client secret generated for the application.

## Register the Google IdP

Now, let's register the Google IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Google**.
3. Enter the following details of the Google identity provider and click **Finish**:

    ![Add Google IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/google-idp/add-google-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this Google identity provider.</td>
      </tr>
      <tr>
          <td>Client ID</td>
          <td>The client ID obtained from Google.</td>
      </tr>
      <tr>
          <td>Client secret</td>
          <td>The client secret obtained from Google.</td>
      </tr>
    </table>  

<!-- 4. If required, you can [disable JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/). -->  

??? note "Claim syncing for JIT-provisioned users"
    {{product_name}}, by default, enables Just-In-Time (JIT) user provisioning for your external identity provider.

    With JIT provisioning enabled, when a user with a local {{ product_name }} account uses the same email address to log in with an external identity provider, user attributes of the local user account are overridden by the attributes received from the external identity provider.

    You can learn more about JIT provisioning and how to enable/disable it in [configure JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/).

    You can use the [identity provider APIs]({{base_path}}/apis/idp/#tag/Provisioning/operation/getJITConfig) to customize the claim syncing behavior between the external identity provider and {{product_name}}.

After the Google identity provider is created, go to the **Settings** tab and see the list of **scopes** to which Google has granted permissions.

- **email**: Allows to view the user's email address.
- **openid**: Allows authentication using OpenID Connect and to obtain the ID token.
- **profile**: Allows to view the user's basic profile data.

!!! note
    {{ product_name }} needs these scopes to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Google to the app. You can read the [Google documentation](https://developers.google.com/identity/protocols/oauth2/openid-connect#scope-param) to learn more.

## Enable Google login

!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application, go to the **Sign-in Method** tab and add Google login from your preferred editor:

    !!! note "Recommendations"
        {{ product_name }} recommends adding your social and enterprise connections to the first authentication step, as they are used for identifying the user.

    ---
    === "Classic Editor"
        To add Google login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.
    
        2. Click **Add Authentication** on the step, select your Google identity provider, and click **Add**.

            ![Add Google login in {{product_name}}]({{base_path}}/assets/img/guides/idp/google-idp/add-google-federation-with-basic.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add Google login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.
    
        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your Google connection.

            ![dd Google login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/idp/google-idp/add-google-login-with-visual-editor.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    ---

3. Click **Update** to save your changes.

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, **Sign in with Google**.

    ![Login with Google]({{base_path}}/assets/img/guides/idp/google-idp/sign-in-with-google.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to Google with an existing user account.

!!! note
    When a user successfully logs in with Google for the first time, a **user** account is created in the {{ product_name }} Console with the Google username. This new user account will be managed by Google.

## Add groups to the connection

{% include "../../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}