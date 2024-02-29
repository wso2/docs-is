# Add Facebook login

You can add Facebook login to your applications using {{ product_name }} and enable users to log in with their Facebook accounts.

Follow this guide for instructions.

## Register {{ product_name }} on Facebook
You need to register {{ product_name }} as an app on Facebook.

!!! note
    You can follow the [Facebook Documentation](https://developers.facebook.com/docs/development/create-an-app) for detailed instructions.

To register an app on Facebook:

1. Log in to the [Facebook developer portal](https://developers.facebook.com/apps) and click **Create App**.

    ![Log on to Facebook developer portal]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-developer-portal.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Select **Consumer** as the app type and click **Next**.

    ![Create Facebook consumer app]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-type.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Provide **Display Name** and click **Create App** to create an application.

    ![Provide information to Facebook app]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-info.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Under **Add products to your app**, click **Set up** on the **Facebook Login** card.

    ![Add Facebook login]({{base_path}}/assets/img/guides/idp/facebook-idp/add-facebook-login.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Select **Web** type and provide the following **Site URL** with your organization name:

    ```bash
    {{ product_url_format }}
    ```

    ![Add Facebook app url]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-url.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Save the changes and click **Continue**.

7. On the left panel, under **Facebook Login**, go to **Settings** and add the following as the **Valid OAuth Redirect URIs**:

    ```bash
    {{ product_url_format }}/commonauth
    ```

8. Enable **Client OAuth Login** and **Web OAuth Login** (these are enabled by default) and save the changes.

    ![Add Facebook settings]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-settings.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

9. On the main panel, go to **App settings > basic** and take note of the **App ID** and **App Secret**.

    ![Get AppID and Secret from Facebook]({{base_path}}/assets/img/guides/idp/facebook-idp/app-id-secret-from-facebook.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Register the Facebook IdP

Now, let's register the Facebook IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **Create Connection** and select **Facebook**.
3. Enter the following details of the Facebook identity provider and click **Finish**:

    ![Add Facebook IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/facebook-idp/add-facebook-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>A unique name for this Facebook identity provider.</td>
        </tr>
        <tr>
            <td>App ID</td>
            <td>App ID obtained from Facebook.</td>
        </tr>
        <tr>
            <td>App Secret</td>
            <td>The app secret obtained from Facebook.</td>
        </tr>
    </table>

<!-- 4. If required, you can [disable JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/). -->

{% include "../../../guides/fragments/manage-connection/jit-provisioning.md" %}

After the Facebook identity provider is created, go to the **Settings** tab and see the list of permissions granted by Facebook to {{ product_name }}.

- **email**: Grants read access to a user's primary email address.
- **public_profile**: Grants read access to a user's default public profile details.  

!!! note
    {{ product_name }} needs these permissions to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Facebook to the app. You can read the [Facebook documentation](https://developers.facebook.com/docs/permissions/reference) to learn more.

## Enable Facebook login

{% include "../../../guides/fragments/add-login/social-login/add-facebook-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, click **Sign in with Facebook**.

    ![Login with Facebook]({{base_path}}/assets/img/guides/idp/facebook-idp/sign-in-with-facebook.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to Facebook with an existing user account.

5. The user is now redirected to the application and logged in.

!!! note
    When a user successfully logs in with Facebook for the first time, a **user** account is created in the {{ product_name }} Console with the Facebook username. This new user account will be managed by Facebook.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login) documentation.
