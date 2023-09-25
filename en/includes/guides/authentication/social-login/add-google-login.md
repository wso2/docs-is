# Add Google login

You can add Google login to your applications using {{ product_name }} and enable users to log in with their Google account.  

Follow this guide for instructions.

## Register {{ product_name }} on Google
You need to register {{ product_name }} as an OAuth2.0 application on Google.

!!! note
    For detailed instructions, you can follow the [Google documentation](https://support.google.com/googleapi/answer/6158849).

1. Go to the [Google Developer console](https://console.developers.google.com/apis/credentials), create a new project, or select an existing project.

2. If the **APIs & services** page isn't already open, do the following:

    1. Open the navigation menu and click **View all products**.

       ![View all products on the Google console](../../../assets/img/guides/idp/google-idp/view-all-products.png){: width="600"}

    2. Under **Management**, click **APIs & Services**.

       ![Select APIs & Services](../../../assets/img/guides/idp/google-idp/apis-and-services.png){: width="600"}

3. Go to the **Credentials** page, click **Create Credentials**, and select **Oauth client ID**.

    ![Select APIs & Services](../../../assets/img/guides/idp/google-idp/google-oauth-client-id.png){: width="600"}

4. Configure your consent screen by clicking **Configure Consent Screen** and return to **Create OAuth client ID** screen once you are done.

    !!! note
        For more information, see [User Consent](https://support.google.com/googleapi/answer/6158849#userconsent&zippy=%2Cuser-consent)

5. Select the **Web application** as the application type.
6. Provide a name for your app and the following URL as the **Authorized Redirect URI** of the application:

    ```bash
    https://api.asgardeo.io/t/{organization_name}/commonauth
    ```

7. Take note of the client ID and client secret generated for the application.

## Register the Google IdP

Now, let's register the Google IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Google**.
3. Enter the following details of the Google identity provider and click **Finish**:

    ![Add Google IDP in {{ product_name }}](../../../assets/img/guides/idp/google-idp/add-google-idp.png){: width="600"}

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

<!-- 4. If required, you can [disable JIT user provisioning](../../guides/authentication/jit-user-provisioning/). -->  

??? note "Claim syncing for JIT-provisioned users"
    [JIT user provisioning](../../guides/authentication/jit-user-provisioning/) is enabled by default for your external identity provider. If required, you can [disable JIT user provisioning](../../guides/authentication/jit-user-provisioning/#disable-jit-user-provisioning).

    When a user with a local {{ product_name }} account uses the same email address to log in through an external identity provider, {{ product_name }} syncs the claims from the JIT-provisioned user account and the local account.

    According to the default behavior of {{ product_name }}, when JIT user provisioning is enabled, the user claims of the local user account are overridden by the user claims received from the external identity provider.

    You can use {{ product_name }}'s [identity provider APIs](../../apis/idp/#/operations/getJITConfig) to configure claim syncing between the external identity provider and the local user accounts. This gives you the flexibility to customize the claim syncing behavior according to your specific requirements.

After the Google identity provider is created, go to the **Settings** tab and see the list of **scopes** to which Google has granted permissions.

- **email**: Allows to view the user's email address.
- **openid**: Allows authentication using OpenID Connect and to obtain the ID token.
- **profile**: Allows to view the user's basic profile data.

!!! note
    {{ product_name }} needs these scopes to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Google to the app. You can read the [Google documentation](https://developers.google.com/identity/protocols/oauth2/openid-connect#scope-param) to learn more.

## Enable Google login

!!! note Before you begin
    You need to [register an application with {{ product_name }}](../../guides/applications/). You can register your own application or use one of the [sample applications](../../get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.
2. Open your application from the list and go to the **Sign-in Method** tab.
3. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.
4. Click **Add Authentication** on the step, select your Google identity provider, and click **Add**.

    !!! note Recommendations
        {{ product_name }} recommends adding your social and enterprise connections to the first authentication step, as they are used for identifying the user.

    ![Add Google login in {{ product_name }}](../../../assets/img/guides/idp/google-idp/add-google-federation-with-basic.png){: width="600"}

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, **Sign in with Google**.

    ![Login with Google](../../../assets/img/guides/idp/google-idp/sign-in-with-google.png){: width=300"}

4. Log in to Google with an existing user account.

!!! note
    When a user successfully logs in with Google for the first time, a **user** account is created in the {{ product_name }} Console with the Google username. This new user account will be managed by Google.

## Add groups to the connection

{% include "../../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../../fragments/manage-connection/delete-connection.md" %}