# Add iProov login

[iProov](https://www.iproov.com/) is a passwordless authentication method that allows users to log in to applications using facial biometrics. 
iProov's patented Flashmark biometric technology ensures that the user is a real person and not a spoof or a replay. 

This guide explains how you can use iProov to add passwordless login to applications registered in your Asgardeo organization.

## Prerequisites

You need to configure the iProov environment and have access to the iProov portal. Reach out to [iProov](https://www.iproov.com/about-us/contact-us) to get started.

## Register service providers in iProov

Follow the steps below to register your service provider in the iPortal.

::: info
You can follow the [iProov documentation](https://docs.iproov.com/docs/Content/ImplementationGuide/iportal/create-service-providers.htm) for detailed instructions.
:::

1. Log into [iPortal](https://portal.iproov.com/) and click **Service providers**.

2. Click **Create a service provider**.

3. Click **Create a service provider**.

4. Enable a value for **Service provider name**.

5. Complete the service provider details form and click **Create** to create the service provider.

7. Select your application from the **Choose an App** menu and note down the App ID.

8. After you create the service provider, you will receive the following details:
    - **OAuth username**
    - **OAuth password**
    - **API key**
    - **API secret**

## Register iProov in Asgardeo as a connection

Follow the steps below to register HYPR as a connection in Asgardeo.

1. On the Asgardeo Console, go to **Connections**.

2. Click **Create Connection** and select **iProov**.

3. Enter the following details and click **Finish**:

    <table>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>A unique name to identify the connection.</td>
      </tr>
      <tr>
          <td>Base URL</td>
          <td>Provide the Base URL of your iProov server deployment.</td>
      </tr>
      <tr>
          <td>OAuth Username</td>
          <td>Provide the OAuth Username from the service provider created in iProov.</td>
      </tr>
      <tr>
          <td>OAuth Password</td>
          <td>Provide the OAuth Password from the service provider created in iProov.</td>
      </tr>
      <tr>
          <td>API Key</td>
          <td>Provide the API Key from the service provider created in iProov.</td>
      </tr>
      <tr>
          <td>API Secret</td>
          <td>Provide the API Secret from the service provider created in iProov.</td>
      </tr>
      <tr>
          <td>Enable Progressive Enrollment</td>
          <td>Enable progressive enrollment to allow users to enroll with iProov during login.</td>
      </tr>
    </table>

## Enable iProov login

::: info Before you begin
You need to <a :href="$withBase('/guides/applications/')">register an application with Asgardeo</a>. You can register your own application or use one of the <a :href="$withBase('/get-started/try-samples/')">sample applications</a> provided.
:::

To enable iProov login for your application:
1. On the Asgardeo Console, go to **Applications**.

2. Go to the **Sign-in Method** tab of the application and add iProov login from your preferred editor:

   ::: details Using the Classic Editor
   - If you don't have a customized login flow, you can click **Start with default configuration**.

     This opens the customized login flow with username & password as the first step. You can add a new authentication step add iProov as the authenticator.:

   - If you have an already customized login flow, you can add a second step and add iProov as the authenticator.

   :::

   ::: details Using the Visual Editor
   To add iProov login using the Visual Editor:
   
   1. Switch to the **Visual Editor** tab. 
   
   2. Add a second authentication step by clicking the **+** icon and add your iProov connection to this step.

3. Click **Update** to save the sign-in flow.

## Try it out

Follow the steps given below:

1. Access the application URL.

2. Click **Login** to open the Asgardeo login page.

3. Complete the preceding authentication steps.

4. Grant Camera Access to use iProov.

5. Click on **Scan Face** button.

6. Complete the iProov authentication process.