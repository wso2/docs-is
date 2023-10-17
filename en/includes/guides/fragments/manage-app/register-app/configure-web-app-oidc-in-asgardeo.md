<!-- markdownlint-disable-next-line -->
1. In the {{ product_name }} Console, Select the **Applications**.
2. Select **New Application** and select **Traditional Web Application** type.

   ![Select app type]({{base_path}}/assets/img/guides/applications/select-app-type.png)

3. Provide the following details.

   - **Name:** A unique name to identify your application.
   - **Protocol:** The access configuration protocol which will be used to log in to the application using SSO. Select **OpenID Connect** since we need to secure the app with OIDC.
   - **Authorized Redirect URLs:** The authorized redirect URLs determine where the authorization code is sent to once the user is authenticated.

      ![Create a new web app]({{base_path}}/assets/img/guides/applications/create-new-web-app.png)

4. Click **Register** .
