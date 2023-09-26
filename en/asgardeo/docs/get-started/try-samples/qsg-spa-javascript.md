# JavaScript sample SPA

By following this guide, you will be able to deploy a Javascript single-page application locally and secure it with OpenID Connect.

## Prerequisites

- **npm with Node.js**

  If you don't have it, [install npm and node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) in your local environment.

- **A user account in Asgardeo**

  If you don't already have one, [create a user account]({{base_path}}/get-started/create-asgardeo-account/#create-a-user) in Asgardeo.

## Register the app

Follow the steps given below to register the sample Javascript SPA in Asgardeo.

1. On the [Asgardeo Console](https://console.asgardeo.io/login), go to **Applications**.

2. Click **New Application** and select **Single-Page Application**.

3. Enter the following details:

    ![Create a new SPA]({{base_path}}/assets/img/guides/applications/create-new-spa.png)

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
            <td>Allow sharing with sub-organizations</td>
            <td>Enable this to share the new application with all or any selected suborganizations that belong to your root organization.</td>
        </tr>
    </table>

4. Click **Register** to complete the registration.
5. Go to the **Protocol** tab and take note of the **Client ID**. You will need it to configure the application later.

    ![Client ID]({{base_path}}/assets/img/guides/applications/spa-client-id.png)
!!! note
        To provide a better experience for the user, **it is recommended to configure an access URL** for the application. You can set an access URL for the application from the General tab. (For this sample application, the access URL is <code>https://localhost:3000</code>).

??? note "Why do we recommend this?"
        - It will be used in the application catalog and discovery flows.
        - We will use it to redirect the user back to the application in the following scenarios.
            - If the login page times out
            - After a password reset
            - After self sign-up verification
        - If the login flow is failed, we will provide an option for the user to re-initiate the login flow using this URL.

## Download the sample

Click the button below to download the sample. You can also choose to view the source before doing so.

<Button
    buttonType='grey-outlined-icon'
    displayType='inline-button'
    buttonText='Download sample'
    startIconPath='images/technologies/javascript-logo.svg'
    endIconPath='icons/downloadIcon.svg'
    externalLink='https://github.com/asgardeo/asgardeo-auth-spa-sdk/releases/latest/download/asgardeo-html-js-app.zip'
    v-bind:openInNewTab='true'
/>
<Button
    buttonType='grey-outlined-icon'
    displayType='inline-button'
    buttonText='View source'
    endIconPath='images/technologies/github-logo.svg'
    externalLink='https://github.com/asgardeo/asgardeo-auth-spa-sdk/tree/main/samples/asgardeo-html-js-app'
    v-bind:openInNewTab='true'
/>

## Configure the sample

Follow the steps given below to configure the sample app.

1. Unzip the application folder and open the `index.html` file located at the root of the project in a text editor.
2. Scroll down towards the end of the body and find the `<script>` tag with the `authConfig` object.
3. Update the following in the `authConfig` object:

    !!! note
        Replace <code>{organization_name}</code> with the name of your organization and apply the client ID that was generated when you registered the application in Asgardeo.

    ``` 
    const authConfig = {
        clientID: "{client ID}",
        signInRedirectURL: "https://localhost:3000",
        baseUrl: "https://api.asgardeo.io/t/{organization_name}",
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
            The client id that you received when you registered the application in Asgardeo.
        </td>
      </tr>
      <tr>
        <td>
            <code>baseUrl</code>
        </td>
        <td>
            <p>All authentication requests that the client application makes to Asgardeo will be appended to this base URL.:</p>
            <code>https://api.asgardeo.io/t/{organization_name}</code>
        </td>
      </tr>
      <tr>
        <td>
            <code>scope</code>
        </td>
        <td>
            <p>The list of OIDC scopes that are used for requesting user information. You can add OIDC scopes such as <code>profile</code> and <code>email</code> in a comma-separated list as follows: </p>
            <code>"scope": ["profile", "email"]</code>
            <p>Learn more about [OIDC scopes in Asgardeo]({{base_path}}/guides/users/attributes/manage-scopes/).</p>
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

    ![Javascript SPA login]({{base_path}}/assets/img/guides/applications/js-app-login.jpg)

3. Click **Login**. You will be redirected to the Asgardeo login page.

    ![Asgardeo Sign in page]({{base_path}}/assets/img/guides/applications/sign-in-asgardeo.png)

4. Enter the credentials of your user account and click **Sign In**.

    !!! note "Extend your login session"
        By default, the user login session is active for only `15 minutes`. You can extend the session to `14 days` by selecting the **Remember me on this computer** option provided at the login screen of your application.