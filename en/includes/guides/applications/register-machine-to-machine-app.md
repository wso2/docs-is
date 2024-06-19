# Register a Machine-to-Machine (M2M) application

To integrate your machine-to-machine (M2M) application with {{ product_name }}, you need to first register your application from the {{ product_name }} Console. 
Then you can authorize your M2M applications to access management APIs of {{ product_name }} or your business APIs.
A client ID and client secret are issued to the application upon registration.

Follow the instructions given below.

## Register the app

To register the app:

1. On the {{ product_name }} Console, click **Applications**.

    ![Select app type]({{base_path}}/assets/img/guides/applications/select-app-type.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **New Application** and select **M2M Application**.

3. In the **Name** field, enter a unique name to identify your application.

4. Click **Register** to complete the registration.

5. [Enable the application]({{base_path}}/guides/applications/#enabledisable-an-application) when it is ready for use.

## Authorize the API resources for the app

You can authorize your M2M applications to access APIs and their scopes(permissions) from **API Authorization** tab of the application, as shown below.

![Authorize API]({{base_path}}/assets/img/guides/applications/authorize-api-to-m2m.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Learn more about [API authorization]({{base_path}}/guides/api-authorization/).

## Get the client ID and secret

When you register your M2M application, a client ID and client secret are generated. Your M2M application will identify itself to {{ product_name }} with these credentials.

You can get this client ID and client secret from the **Protocol** tab of the application, as shown below.

![Get client ID and secret of M2M app]({{base_path}}/assets/img/guides/applications/client-id-secret-m2m.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## What's Next?

- [Obtain an M2M token using client credential grant]({{base_path}}/references/grant-types/#client-credentials-grant)
