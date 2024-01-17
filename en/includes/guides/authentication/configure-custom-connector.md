# Configure a custom connector

You can add login to your applications using a custom connector in {{ product_name }} and enable users to log in with the configured connector. This custom connector can be any identity provider such as Facebook, Twitter, Google, Yahoo or a [custom federared authenticator]({{base_path}}/references/extend/federation/write-a-custom-federated-authenticator).

Follow this guide for instructions.

## Register the custom connector

1. On the {{ product_name }} Console, go to **Connections**.
2. Click **Create Connection** and select **Custom Connector**.
3. Enter a unique name and a description and click **Finish**.
4. Go to **Settings** tab and click **New Authenticator**.
5. Select the authenticator you want to add and click **Next**.

    !!! note 
        You can configure predefined authenticators as well as the custom federated authenticators. See [Write a custom federated authenticator]({{base_path}}/references/extend/federation/write-a-custom-federated-authenticator) for more information.

6. Enter the requested details depending on the selected authenticator and click **Finish**.

!!! tip
    You can add multiple authenticators to the custom connetor and select one authenticator as the default.

## Enable login using the custom connector

!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the WSO2 Identity Server console, go to **Applications**.

2. Select your application, go to the **Sign-in Method** tab and add the custom connector from your preferred editor:

    ---
    === "Classic Editor"
        To add custom connector using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your custom connector, and click **Add**.

            ![Add custom connector]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-federation-with-basic.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add custom connector using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your custom connector.

            ![Add custom connector using the Visual Editor]({{base_path}}/assets/img/guides/idp/custom-connector/add-custom-federation-with-visual-editor.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        You can select an authenticator from the list of authenticators when you hover on the custom connector.

3. Click **Update** to save your changes.

---

## Try it out

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, select the sign in option configured.

    ![Login with custom connector]({{base_path}}/assets/img/guides/idp/custom-connector/sign-in-with-custom-connector.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in using an existing account in the authenticator selected (e.g. Google, Facebook, custom federated authenticator etc.)

5. The user is now redirected to the application and logged in.

## Add groups to the connection

{% include "../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../fragments/manage-connection/delete-connection.md" %}
