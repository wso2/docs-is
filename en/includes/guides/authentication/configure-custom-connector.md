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

{% include "../../guides/fragments/add-login/configure-custom-connector.md" %}

## Try it out

1. Access the application URL.

2. Click **Login** to open the {{ product_name }} login page.

3. On the {{ product_name }} login page, select the sign in option configured.

    ![Login with custom connector]({{base_path}}/assets/img/guides/idp/custom-connector/sign-in-with-custom-connector.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Log in using an existing account in the authenticator selected (e.g. Google, Facebook, custom federated authenticator etc.)

5. The user is now redirected to the application and logged in.

## Map groups with {{ product_name }}

{% include "../fragments/manage-connection/add-groups.md" %}

## Delete a connection

{% include "../fragments/manage-connection/delete-connection.md" %}
