# Try it

You can use the following sample scenario along with the sample application to try out Onfido identity verification with {{product_name}}.

## Sample scenario

An insurance company called Guardio Life has a Single Page Application (SPA) that lets users browse and select insurance plans. Before selecting a plan, users should verify their identity and age.

The process goes as follows:

- The SPA displays the available insurance plans. Until a user verifies their identity and age, the insurance plans remain greyed and not clickable.

- The application prompts the user for identity and age verification using Onfido.

- User submits the documents to Onfido to perform verification.

- Once the verification completes, the insurance plans become active and clickable.

- Users can then proceed to select their desired insurance plan.

## Deploy the sample application

In the following sections, you will run the Guardio Life SPA, register it with {{product_name}}, and integrate it with Onfido for identity verification.

### Prerequisites

- [Set up Onfido]({{base_path}}/connectors/onfido/set-up/) in your {{product_name}} installation.

- Install Node.js (version 10 or above) in your system. Refer to [Node documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){: target="_blank"} for instructions.

### Step 1: Configure the required attributes in the Onfido connection

The Onfido connection, by default, only validates the first name and last name of the user. Since Guardio Life wants to confirm the age of users, you need to add date of birth as an attribute to be validated. To do so,

1. On the {{product_name}} Console, go to **Connections** and go to your created Onfido connection.

2. Go to its **Attributes** tab and click **Add Attribute Mapping**.

3. Add any missing attribute mappings:

    - first_name - `http://wso2.org/claims/givenname` (available by default)
    - last_name - `http://wso2.org/claims/lastname` (available by default)
    - dob - `http://wso2.org/claims/dob`

4. Click **Update** to save the changes.

### Step 2: Register application in {{product_name}}

To register your application as a Single Page Application,

1. On the {{product_name}} Console, go to **Applications** > **New Application**.

2. Click **Single-Page Application** and provide the following details:

    - Name - A name for your application.
    - Authorized Redirect URLs  - `https://localhost:3000`

3. Click **Create** to create the application.

4. In the created application, go to the **Protocol** tab and do the following:

    - Take note of the Client ID of the application.
    - Make sure `https://localhost:3000` is listed under **Allowed Origins**.

### Step 3: Configure and run application

Follow the steps below to run the sample application in your system.

1. Clone the [identity-verification-onfido](https://github.com/wso2-extensions/identity-verification-onfido.git){: target="_blank"} repository. The sample application can be found in the `/samples/react-sample-app/` directory. For clarity, this directory will be referred to as `<HOME>` in the instructions below.

2. Open the `<HOME>/public/runtime-config.json` file and add the following configurations.

    ```
    {
    "clientID": "<CLIENT_ID>",
    "baseUrl": "https://localhost:9443",
    "signInRedirectURL": "https://localhost:3000",
    "signOutRedirectURL": "https://localhost:3000",
    "userPortalURL": "https://localhost:9443/myaccount",
    "scope": [ "openid", "profile", "internal_login"],
    "identityVerificationProviderId": "<ONFIDO_IDVP_ID>"
    }
    ```

    !!! note

        - Replace `<CLIENT_ID>` with the client ID you copied from Step 2.

        - Replace `<ONFIDO_IDVP_ID>` with the ID of your Onfido connector. To find it,
            - On the {{product_name}} Console, go to **Connections** and select your Onfido connector.
            - Copy the ID from the **Setup Guide** of the Onfido connection.

3. To run the application, return to the `<HOME>` directory and execute the following command.

    ```
    npm install && npm start
    ```

!!! note "Change the server port of the application"

    To change the port on which the application runs,

    1. Open the `.env` file in the `<HOME>` directory and change the `PORT` value.

    2. Open the `<HOME>/public/runtime-config.json` file and change the `signInRedirectURL` and the `signOutRedirectURL` to match your updated port value.

    3. On the {{product_name}} Console go to **Connections**, select the Onfido connection and in its **Protocol** tab, update the following to match your port value:
        - Authorized Redirect URL.
        - Allowed Origins.
