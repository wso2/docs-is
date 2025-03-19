# Add LinkedIn login

You can add LinkedIn login to your applications using {{ product_name }} and enable users to log in with their LinkedIn accounts.  

Follow this guide for instructions.

## Register {{ product_name }} on LinkedIn
You need to register {{ product_name }} as an OAuth2.0 application on LinkedIn.

1. Go to the [LinkedIn Developer console](https://developer.linkedin.com/){:target="_blank"}, click on **Create app** button to create a new application.

    ![Create a new application]({{base_path}}/assets/img/guides/idp/linkedin-idp/create-app.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Provide the **App name**, **LinkedIn Page**, and **App logo** for your application. Accept the **Legal agreement** and click on **Create app** to complete the application creation process.

    ![Application create wizard]({{base_path}}/assets/img/guides/idp/linkedin-idp/create-app-wizard.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. In the **Products** tab, request access for **Sign In with LinkedIn using OpenID Connect**.

    ![Request access for sign in with LinkedIn using OpenID Connect]({{base_path}}/assets/img/guides/idp/linkedin-idp/request-access-oidc.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Navigate to the **Auth** tab and add the following URL as the **Authorized Redirect URL** for your app.

    ```bash
    {{ product_url_format }}/commonauth
    ```

    ![Authorized Redirect URL]({{base_path}}/assets/img/guides/idp/linkedin-idp/auth-redirect-url.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Take note of the client ID and client secret generated for the application from the **Auth** tab.

## Register the LinkedIn IdP

Now, let's register the LinkedIn IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **LinkedIn**.
3. Enter the following details of the LinkedIn identity provider and click **Create**:

    ![Add LinkedIn IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/linkedin-idp/add-linkedin-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

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

{% include "../../../guides/fragments/add-login/social-login/add-linkedin-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, **Sign in with LinkedIn**.

    ![Login with LinkedIn]({{base_path}}/assets/img/guides/idp/linkedin-idp/sign-in-with-linkedin.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to LinkedIn with an existing user account.

!!! note
    When a user successfully logs in with LinkedIn for the first time, a **user** account is created in the {{ product_name }} Console with the LinkedIn email. This new user account will be managed by LinkedIn.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.
