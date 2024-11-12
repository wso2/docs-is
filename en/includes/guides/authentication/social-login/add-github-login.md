# Add Github login

You can add Github login to your applications using {{ product_name }} and enable users to log in with their Github accounts.

Follow this guide for instructions.

## Register {{ product_name }} on Github

You need to register {{ product_name }} as an OAuth app on GitHub.

!!! note
    You can follow the [Github documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app){:target="_blank"} for detailed instructions.

1. Log in to [Github](https://github.com/){:target="_blank"}, click your profile icon, and click **Settings**.
2. On the left panel of the **Settings** page, click **Developer settings**.
3. Under **OAuth apps**, click **Register a new application**.

    ![Register oauth2 app in Github]({{base_path}}/assets/img/guides/idp/github-idp/github-register-app.jpg){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Give the application a name and the following URLs:
    
    - **Homepage URL**
        ```bash 
        {{ product_url_format }}
        ```
    
    - **Authorization callback URL**
        ```bash
        {{ product_url_format }}/commonauth
        ```

    ![Enter Github app details]({{base_path}}/assets/img/guides/idp/github-idp/github-app-info.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Register application**.
6. Generate a new client secret and take note of the **Client ID** and **Client secret**.

## Register the Github IdP

Now, let's register the Github IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Github**.
3. Enter the following details and click **Finish**:

    ![Add Github IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/github-idp/add-github-idp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this Github identity provider.</td>
      </tr>
      <tr>
          <td>Client ID</td>
          <td>The client ID obtained from Github.</td>
      </tr>
      <tr>
          <td>Client secret</td>
          <td>The client secret obtained from Github.</td>
      </tr>
    </table>

4. Go to the **Settings** tab and see the list of **scopes** to which Github has granted permissions.

    - **email**: Grants read access to a user's primary email address.
    - **public_profile**: Grants read access to a user's default public profile details.  

    !!! note
    
        {{ product_name }} needs these scopes to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Github to the app. You can read the [Github Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps){:target="_blank"} to learn more.

## Enable GitHub login

{% include "../../../guides/fragments/add-login/social-login/add-github-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with Github**.

    ![Login with Github]({{base_path}}/assets/img/guides/idp/github-idp/sign-in-with-github.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to GitHub with an existing user account.

!!! note
    When a user successfully logs in with Github for the first time, a **user** account is created in the {{ product_name }} Console with the Github username. This new user account will be managed by GitHub.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.