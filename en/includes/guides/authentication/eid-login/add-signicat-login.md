# Add Signicat login

[Signicat’s](https://www.signicat.com/) eID Hub simplifies digital identity verification and authentication by connecting your platform to more than 30 electronic identities (eIDs) from across Europe, all through one streamlined integration.

By integrating Signicat, you can authenticate users and prove their identity easily using trusted eIDs, whether for onboarding, access control, or compliance needs.

You can add Signicat login to your applications using {{ product_name }} and enable users to log in with their eIDs.

Follow this guide for instructions.

## Prerequisites
- A Signicat account. If you don't have one, you can [sign up for free](https://developer.signicat.com/docs/){:target="_blank"}.

## Register {{ product_name }} on Signicat

You need to register {{ product_name }} as an OIDC app on Signicat.

!!! note
    You can follow the [Signicat documentation](https://developer.signicat.com/docs/){:target="_blank"} for detailed instructions.

1. Log in to [Signicat Dashboard](https://dashboard.signicat.com){:target="_blank"}, and click .
2. On the left panel, Click **Products** and select **eID Hub**.
3. Under **eID Hub**, click **OIDC Clients**.

    ![Register OIDC app in Signicat]({{base_path}}/assets/img/guides/idp/signicat-idp/signicat-register-app.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Give the application a name and the following URLs:

    - **Authorization callback URL**
        ```bash
        {{ product_url_format }}/commonauth
        ```

    ![Enter Signicat app details]({{base_path}}/assets/img/guides/idp/signicat-idp/signicat-app-info.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Create**.
6. Click **Add Secret** and Generate a new client secret.
7. Take note of the **Client ID** and **Client secret**.
8. To add required eIDs, Click **eIDs** in the left panel (under **eID Hub**), and click **Add new**.
   ![Add new eID]({{base_path}}/assets/img/guides/idp/signicat-idp/signicat-add-eid.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

9. Select the eIDs you want to add and click **Add**.

## Register the Signicat Connection

Now, let's register the Signicat IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Signicat**.
3. Enter the following details and click **Finish**:

    ![Add Signicat Connection in {{ product_name }}]({{base_path}}/assets/img/guides/idp/signicat-idp/add-signicat-idp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this Signicat identity provider.</td>
      </tr>
      <tr>
          <td>Client ID</td>
          <td>The client ID obtained from Signicat.</td>
      </tr>
      <tr>
          <td>Client secret</td>
          <td>The client secret obtained from Signicat.</td>
      </tr>
       <td>Authorised redirect URL</td>
          <td>Provide the Authorised redirect URL of your Signicat organization. For example https://{your_signicat_domain}/auth/open/connect/authorize..</td>
      </tr>
      <tr>
          <td>Token Endpoint URL</td>
          <td>Provide the Token endpoint URL of your Signicat organization. For example https://{your_signicat_domain}/auth/open/connect/token.</td>
      </tr>
    </table>

## Enable Signicat login

{% include "../../../guides/fragments/add-login/eid-login/add-signicat-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, **Sign in with Signicat**.

    ![Login with Signicat]({{base_path}}/assets/img/guides/idp/signicat-idp/sign-in-with-signicat.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to the eIDs configured in Signicat.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.