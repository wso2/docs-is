# Sample JavaScript SPA

By following this guide, you will be able to deploy a Javascript single-page application locally and secure it with OpenID Connect.

## Prerequisites

- **npm with Node.js**

    If you don't have it, [install npm and node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){target="_blank"} in your local environment.

- **A user account in the WSO2 Identity Server**

    If you don't already have one, create a user account in the WSO2 Identity Server.

## Register the app

Follow the steps given below to register the sample Javascript SPA in the WSO2 Identity Server.

1. On the WSO2 Identity Server Console, go to **Applications**.

2. Click **New Application** and select **Single-Page Application**.

3. Enter the following details:

    ![Create a new SPA]({{base_path}}/assets/img/guides/applications/create-new-spa.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
        <tr>
            <td>Name</td>
            <td>Give a unique name to identify your application.</td>
        </tr>
        <tr>
            <td>Authorized redirect URLs</td>
            <td>
                <p>The URL to which the user is redirected after a successful login. Use the following URL for this sample app:</p>
                <code>https://localhost:3000</code>
            </td>
        </tr>
        <tr>
            <td>Allow sharing with organizations</td>
            <td>Enable this to share the new application with all or any selected organizations that belong to your organization (root).</td>
        </tr>
    </table>

4. Click **Register** to complete the registration.
5. Go to the **Protocol** tab and take note of the **Client ID**. You will need it to configure the application later.

    ![Client ID]({{base_path}}/assets/img/guides/applications/spa-client-id.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! tip
    To provide a better experience for the user, it is recommended to configure an access URL for the application. You can set an access URL from the **General** tab of the application. (For this sample application, the access URL is <code>https://localhost:3000</code>).

    The access URL is used,

    - in the application catalog and discovery flows.
    - to redirect the user back to the application in the following scenarios.
        - if the login page times out
        - after a password reset
        - after the self sign-up verification
    - to re-initiate the login flow if the login flow fails.

## Download the sample

Click the button below to download the sample. You can also choose to view the source before doing so.

<div class="centered-container">
  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/javascript-logo.svg" alt="JavaScript" width=50><br>
    <a href="https://github.com/asgardeo/asgardeo-auth-spa-sdk/releases/latest/download/asgardeo-html-js-app.zip" target="_blank">Download sample</a>
  </div>

  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/github-logo.svg" alt="Github" width=50><br>
    <a href="https://github.com/asgardeo/asgardeo-auth-spa-sdk/tree/main/samples/asgardeo-html-js-app" target="_blank">View source</a>
  </div>
</div>


## Configure the sample

Follow the steps given below to configure the sample app.

1. Unzip the application folder and open the `index.html` file located at the root of the project in a text editor.
2. Scroll down towards the end of the body and find the `<script>` tag with the `authConfig` object.
3. Update the following in the `authConfig` object:

    ``` 
    const authConfig = {
        clientID: "{client ID}",
        signInRedirectURL: "https://localhost:3000",
        baseUrl: "https://localhost:9443",
        scope: [ "profile" ]
    };
    ```

    <table>
    <thead>
      <tr>
         <th>Configuration</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
        <td>
            <code>clientID</code>
        </td>
        <td>
            The client id that you received when you registered the application in the {{ product_name }}.
        </td>
      </tr>
      <tr>
        <td>
            <code>baseUrl</code>
        </td>
        <td>
            <p>All authentication requests that the client application makes to the {{ product_name }} will be appended to this base URL.:</p>
            <code>https://localhost:9443</code>
        </td>
      </tr>
      <tr>
        <td>
            <code>scope</code>
        </td>
        <td>
            <p>The list of OIDC scopes that are used for requesting user information. You can add OIDC scopes such as <code>profile</code> and <code>email</code> in a comma-separated list as follows: </p>
            <code>"scope": ["profile", "email"]</code>
            <p>Learn more about [OIDC scopes in the {{ product_name }}]({{base_path}}/guides/users/attributes/manage-scopes/).</p>
        </td>
      </tr>
    </tbody>
    </table>

## Run the sample

Follow the steps given below to run the sample.

1. On your terminal, navigate to the **root** of the project and run the command given below to start the sample application:

    ```bash 
    npm install && npm start
    ```

2. Once the app is successfully compiled, it is accessible at `https://localhost:3000`.

3. Click **Login**. You will be redirected to the {{ product_name }} login page.

    ![{{ product_name }} sign in page]({{base_path}}/assets/img/guides/applications/sign-in-is.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter the credentials of your user account and click **Sign In**.

    !!! note "Extend your login session"
        By default, the user login session is active for only `15 minutes`. You can extend the session to `14 days` by selecting the **Remember me on this computer** option provided at the login screen of your application.