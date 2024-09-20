# Add X login

You can add X login to your applications using {{ product_name }} and enable users to log in with their X accounts.

## Register {{product_name}} on X

1. Log in to the [X Developer Portal](https://developer.twitter.com/){:target="_blank"} using your X credentials.

2. Navigate to **Projects & Apps**, click **Add project** and provide details of your project.

3. Either during project creation, or by navigating to your created project in **Projects & Apps**, click **Add App**.

    1. Provide an **App name**.
       ![Set X app_name]({{base_path}}/assets/img/guides/idp/x-idp/x-app-name.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2. Take note of the **API Key** and **API Key Secret** of the application.
       ![Set X app_name]({{base_path}}/assets/img/guides/idp/x-idp/x-key-token.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **App Settings** at the bottom of the page.

5. Click **Set up** under **User Authentication Settings** and do the following.

   1. Under **Type of App** select **Web App, Automated App or Bot**.

   2. Fill in the user authentication details with the following values.

      - Callback URI / Redirect URL - `{{product_url_format}}/commonauth`
      - Website URL - `http://localhost.com:8080/pickup-dispatch/home.jsp`

   3. Click **Save**.

    !!! note
        The **App Client ID** and **App client secret** presented at this moment is not required for this guide.

## Register the X IdP

Now, let's register the Microsoft IdP in {{product_name}}.

1. On the {{ product_name }} Console, go to **Connections**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

      ![Create a custom connector]({{base_path}}/assets/img/guides/idp/x-idp/x-custom-connector.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. On the created custom connector, go to the **Settings** tab.

5. Click **New Authenticator**, select **Twitter** and click **Next**.

6. Enter the following details and click **Finish**.

      ![Configure the X connector]({{base_path}}/assets/img/guides/idp/x-idp/x-configure-connector.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

      <table>
         <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
         <tr>
            <td>API Key</td>
            <td>The <code>API key</code> generated when registering {{product_name}} in X.<br>
               e.g. <code>wuerRmdgwlqX0oE1WNDdsh17o</code></td>
         </tr>
         <tr>
            <td>API Secret</td>
            <td>The <code>API Key Secret</code> generated when registering {{product_name}} in X.
            <br>
               e.g. <code>771tqnkpcbRyTBSCRQvVud1x8j1uQlCDpNZo3hRG0s4cEtsFky</code></td>
         </tr>
         <tr">
            <td>Callback URL</td>
            <td><p>The Callback URL you entered when registering {{product_name}} in X. This is the URL to which the browser should be redirected after the authentication is successful.</p>
            e.g. <code>{{product_url_format}}/commonauth</code></td>
       </tr>
       </table>

{% include "../../../guides/fragments/manage-connection/jit-provisioning.md" %}

## Enable X login

{% include "../../../guides/fragments/add-login/social-login/add-x-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with X**.

    ![Login with X]({{base_path}}/assets/img/guides/idp/x-idp/sign-in-with-x.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to X with an existing user account.

!!! note
    When a user successfully logs in with X for the first time, a **user** account is created in the {{ product_name }} Console with the X username. This new user account will be managed by X.

## Configure user attributes

{% include "../../fragments/manage-connection/manage-attributes.md" %}

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.