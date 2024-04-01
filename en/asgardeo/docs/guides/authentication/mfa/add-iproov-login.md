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
   <img :src="$withBase('/assets/img/guides/mfa/iproov/iproov-service-provider.png')" alt="iProov service provider">

2. Click **Create a service provider**.

3. Click **Create a service provider**.

4. Enable a value for **Service provider name**.

5. Complete the service provider details form and click **Create** to create the service provider.

6. Select your application from the **Choose an App** menu and note down the App ID.

7. After you create the service provider, you will receive the following details:
    - **OAuth username**
    - **OAuth password**
    - **API key**
    - **API secret**

## Register iProov in Asgardeo as a connection

Follow the steps below to register HYPR as a connection in Asgardeo.

1. On the Asgardeo Console, go to **Connections**.

2. Click **Create Connection** and select **iProov**.
   <img :src="$withBase('/assets/img/guides/mfa/iproov/iproov-add-connection.png')" alt="Create iproov connection">

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
          <td>Provide the base URL of your iProov server deployment.</td>
      </tr>
      <tr>
          <td>OAuth Username</td>
          <td>Provide the OAuth Username from the service provider created in iProov.</td>
      </tr>
      <tr>
          <td>OAuth Password</td>
          <td>Provide the OAuth password from the service provider created in iProov.</td>
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
   - If you haven't already configured an authentication flow,
     1. Click **Start with default configuration** to begin.
     2. Add a second authentication step by clicking the **+** icon and add your iProov connection to this step.

   - If you have an already customized login flow, you can add a second authentication step by clicking the **+** icon and add your iProov connection to this step.
     <img :src="$withBase('/assets/img/guides/mfa/iproov/customize-steps.png')" alt="Customize login flow">

   :::

   ::: details Using the Visual Editor
      To add iProov login using the Visual Editor:
   
      1. Switch to the **Visual Editor** tab. 
   
      2. Add a second authentication step by clicking the **+** icon and add your iProov connection to this step.
         <img :src="$withBase('/assets/img/guides/mfa/iproov/iproov-login-flow-with-visual-editor.png')" alt="Customize login flow">

3. Click **Update** to save the sign-in flow.

## Try it out

Follow the steps given below:

1. Access the application URL.

2. Click **Login** to open the Asgardeo login page.

3. Complete the preceding authentication steps.

4. Grant camera access for iProov to authenticate the user.
   <img :src="$withBase('/assets/img/guides/mfa/iproov/grant-camera-access.png')" alt="Grant camera access for iProov">

5. Click **Scan Face**.
   <img :src="$withBase('/assets/img/guides/mfa/iproov/scan-face-with-iproov.png')" alt="Scan face with iProov">

6. Complete the iProov authentication process by starting the face scan.
   <img :src="$withBase('/assets/img/guides/mfa/iproov/initiate-scan-face.png')" alt="Initiate face scan">
