# Add Facebook login

You can add Facebook login to your applications using {{ product_name }} and enable users to log in with their Facebook accounts.

Follow this guide for instructions.

## Register {{ product_name }} on Facebook
You need to register {{ product_name }} as an app on Facebook.

!!! note
    You can follow the [Facebook Documentation](https://developers.facebook.com/docs/development/create-an-app){:target="_blank"} for detailed instructions.

To register an app on Facebook:

1. Go to the [My Apps](https://developers.facebook.com/apps) page in **Meta for developers**.

2. Click **Create App**.

    ![Facebook developer portal]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-developer-portal.jpg){: width="600" style="border: 0.3px solid lightgrey;"}

3. Select the use case as **Authenticate and request data from users with Facebook Login** and click **Next**.

    ![Create Facebook consumer app]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-type.jpg){: width="600" style="border: 0.3px solid lightgrey;"}

4. Select the login type out of the options and click **Next**.

    ![Choose login type]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-choose-login-type.png){: width="600" style="border: 0.3px solid lightgrey;"}

5. Provide **Display Name** and click **Create App** to create an application.

    ![Provide information to Facebook app]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-info.jpg){: width="600" style="border: 0.3px solid lightgrey;"}

6. While in the created application, select **Use cases** from the left navigation.

7. Under **Use cases** > **Authentication and account creation**, click **Customize**.

8. Under **Facebook Login** > **Quickstart**, click **Go to quickstart**.

9. Select **Web** as the platform for this app and provide the following **Site URL** and click **Save**.

    ```bash
    {{ product_url_format }}
    ```

10. Return to the **Use cases** > **Customize** section and under **Facebook login** > **Settings**, click **Go to settings**.

11. Add the following as the **Valid OAuth Redirect URIs** and click **Save changes**.

    ```bash
    {{ product_url_format }}/commonauth
    ```

12. Enable **Client OAuth Login** and **Web OAuth Login** (these are enabled by default) and save the changes.

    ![Add Facebook settings]({{base_path}}/assets/img/guides/idp/facebook-idp/facebook-app-settings.jpg){: width="600" style="border: 0.3px solid lightgrey;"}

13. On the left navigation panel, go to **App settings** > **Basic** and take note of the **App ID** and **App Secret**.

    ![Get AppID and Secret from Facebook]({{base_path}}/assets/img/guides/idp/facebook-idp/app-id-secret-from-facebook.png){: width="600" style="border: 0.3px solid lightgrey;"}

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

5. Go to the **Settings** tab and see the list of permissions granted by Facebook to {{ product_name }}.

    - **email**: Grants read access to a user's primary email address.
    - **public_profile**: Grants read access to a user's default public profile details.  

    !!! note
        
        {{ product_name }} needs these permissions to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Facebook to the app. You can read the [Facebook documentation](https://developers.facebook.com/docs/permissions/reference){:target="_blank"} to learn more.

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

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.
