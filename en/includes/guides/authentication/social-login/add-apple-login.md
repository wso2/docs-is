# Add Apple login
You can add Apple login to your applications using {{ product_name }} and enable users to log in with their Apple IDs.

Follow this guide for instructions.

## Register {{ product_name }} on Apple

!!! note "Before you begin"
    You need a paid subscription to get access to an Apple developer account.

To register {{ product_name }} on Apple, you need to create the following components on Apple's Developer Portal:

??? note "Step 1: Register an App ID"
    To register an App ID:

    1. On the [Apple Developer portal](https://developer.apple.com/){:target="_blank"}, go to **Program resources** > **Certificates, Identifiers & Profiles** > **Identifiers**.
        
        ![Add Apple identifiers]({{base_path}}/assets/img/guides/idp/apple-idp/add-apple-identifiers.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2. Click `+` to register an **App ID**.
    3. Select **App IDs** and click **Continue**.
    4. Select **App** as the type and click **Continue**.
    5. Enter the values for the following parameters.
        
        <table>
            <tr>
                <th>Parameter</th>
                <th>Definition</th>
            </tr>
            <tr>
                <td>Description</td>
                <td>A description for the services ID.</td>
            </tr>
            <tr>
                <td>Bundle ID</td>
                <td>A unique identifier for the application. It is usually a string of characters in reverse domain name notation. <br> <b>Example</b>: <code>com.domainname.appname</code></td>
            </tr>
        </table>
        
        ![Register an App ID]({{base_path}}/assets/img/guides/idp/apple-idp/register-an-app-id.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    6. Under the **Capabilities** tab, select **Sign in with Apple**.
    7. Click **Continue** and then click **Register**.

??? note "Step 2: Register a Services ID"
    To register a services ID:

    1. On the [Apple Developer portal](https://developer.apple.com/){:target="_blank"}, go to **Program resources** > **Certificates, Identifiers & Profiles** > **Identifiers**.
        
        ![Add Apple identifiers]({{base_path}}/assets/img/guides/idp/apple-idp/add-apple-identifiers.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2. Click `+` and select **Services IDs** and click **Continue**.
    3. Enter values for the following parameters:

        <table>
            <tr>
                <th>Parameter</th>
                <th>Definition</th>
            </tr>
            <tr>
                <td><b>Description</b></td>
                <td>A description for the services ID.</td>
            </tr>
            <tr>
                <td><b>Identifier</b></td>
                <td>A unique identifier for the application. It is usually a string of characters in reverse domain name notation. This value is considered the client ID of the application.<br> <b>Example</b>: <code>com.domainname.appname</code></td>
            </tr>
        </table>

    4. Click **Continue** and then click **Register**.
    5. Go back to the **Identifiers** section and click on the **Services ID** you created.
    6. Enable **Sign in with Apple** and click **Configure**.
    7. Under **Web Authentication Configuration**, select the **App ID** you created as the **Primary App ID**.
    8. Enter the following values under **Register Website URLs**.
        
        <table>
            <tr>
                <th>Parameter</th>
                <th>Value</th>
            </tr>
            <tr>
                <td><b>Domain</b></td>
                <td><code>{{ product_domain }}</code></td>
            </tr>
            <tr>
                <td><b>Return URL</b></td>
                <td><code>{{ product_url_format }}/commonauth</code></td>
            </tr>
        </table>

        {{ localhost_warning_note }}

    9. Click **Continue** and then click **Save**.

??? note "Step 3: Register a new key"
    To register a new key:

    1. On [Apple Developer portal](https://developer.apple.com/){:target="_blank"}, go to **Program resources** > **Certificates, Identifiers & Profiles** > **Keys**.
        
        ![Add Apple keys]({{base_path}}/assets/img/guides/idp/apple-idp/register-a-new-key.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    2. Click `+` to register a new key.
    3. Enter a name for the key, enable **Sign in with Apple**, and click **Configure**.
    4. Under **Configure Keys**, select the App ID you created previously and click Save. Then click Continue.
    5. Click **Register**.

        !!! note
            You will now see that your app's **Private key** is ready to be downloaded. Download and save it securely, as you cannot download it again.
            Also, take note of the **Key ID** that is displayed on this page.

    6. Click **Done**.

    Note down the **Team ID** displayed in the top right corner under your name.

You can follow the [Apple documentation](https://developer.apple.com/documentation/sign_in_with_apple/configuring_your_environment_for_sign_in_with_apple){:target="_blank"} for detailed instructions.

!!! tip
        A client secret is required to integrate the Apple application with {{ product_name }}. Usually, the external IdP generates a client secret, but in this scenario, Apple expects {{ product_name }} to generate the client secret.

## Register the Apple IdP
Now, let's register the Apple IdP in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **New Connections** and select **Apple**.
3. Enter the following details of the Apple identity provider and click **Finish**:

    ![Add Apple IDP in {{ product_name }}]({{base_path}}/assets/img/guides/idp/apple-idp/add-apple-idp.png){: width="600" style="border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name for this Apple identity provider.</td>
      </tr>
      <tr>
          <td>Services ID</td>
          <td>The services ID obtained from Apple..</td>
      </tr>
      <tr>
          <td>Team ID</td>
          <td>Apple developer team ID obtained from Apple.</td>
      </tr>
      <tr>
          <td>Key ID</td>
          <td>Key identifier of the private key generated for the app.</td>
      </tr>
      <tr>
          <td>Private Key</td>
          <td>Private key generated for the app.</td>
      </tr>
    </table>  

After creating the Apple identity provider, go to the **Settings** tab and see the list of **scopes** to which Apple has granted permissions.

- **email**: Allows to view the user's email address.
- **name**: Allows to view the user's name fields.

!!! note
    {{ product_name }} needs these scopes to get user information. {{ product_name }} checks the attribute configurations of the application and sends the relevant attributes received from Apple to the app. You can read the [Apple documentation](https://developer.apple.com/documentation/sign_in_with_apple/clientconfigi/3230955-scope){:target="_blank"} to learn more.

??? note "Update the client secret validity period"
    {{ product_name }} generates a client secret for the IdP. This client secret has the default maximum validity period of six months.

    If you wish to reduce the validity period:

    1. On the {{ product_name }} Console, go to **Connections**.
    2. Click **Setup** on your Apple IdP.
    3. On the **Settings** tab update the value of the **Client Secret Validity Period**.

## Enable Apple login

{% include "../../../guides/fragments/add-login/social-login/add-apple-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, click **Sign in with Apple**.

    ![Login with Apple]({{base_path}}/assets/img/guides/idp/apple-idp/sign-in-with-apple.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in to Apple with an existing Apple ID.

!!! note
    When a user successfully logs in with Apple for the first time,

    - Apple will prompt you to create an account for the Apple IDP application.
    - A user account is created in the {{ product_name }} Console with the Apple username. Apple will manage this new user account.

## Configure connection

To learn more about other configurations available for the connection, refer to the [add federated login]({{base_path}}/guides/authentication/federated-login/) documentation.