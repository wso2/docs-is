# SMART on FHIR

Follow the tutorial below to learn about how you can leverage Asgardeo to implement a robust authentication and authorization mechanism for your healthcare applications built on SMART on FHIR.

## What is FHIR?

[FHIR](https://hl7.org/fhir/R4/index.html){target="_blank"} (Fast Healthcare Interoperability Resources) is a standard introduced by HL7 for securely exchanging healthcare data. The standard defines a set of structured data formats for key healthcare resources such as patients, practitioners, diagnostics and medications. This ensures that regardless of how the data are stored in one system, they can be understood and processed by another system even if it is running on a different technology.

## What is SMART on FHIR?

[SMART ON FHIR](https://hl7.org/fhir/smart-app-launch/index.html){target="_blank"} is a framework that extends FHIR and allows third-party developers to create applications that seamlessly integrate with Electronic Health Records (EHR) systems. There are two main advantages of using SMART ON FHIRE for building healthcare apps:

- Interoperability - As the framework provides a standardized method to access healthcare data, developers can build applications that work across different EHR systems, irrespective of the underlying technology.

- Security - The framework uses open standards such as OAuth2 and OpenID Connect for authorization and authentication to ensure EHR systems are accessed securely and in compliance with privacy regulations such as HIPAA.

## How can Asgardeo help?

Asgardeo, a cloud-native Identity and Access Management (IAM) solution, is equipped with support for open standards such as OpenID Connect and Oauth 2.0 that developers can simply integrate right into their SMART on FHIR applications. This helps developers to safeguard patient information, comply with privacy regulations, and manage access to FHIR resources based on user roles.

Asgardeo simplifies and automates identity and permission management, making it an ideal solution for integrating third-party applications securely within the healthcare ecosystem.

## How do I integrate Asgardeo into my app?

This guide outlines the steps to configure Asgardeo to work with your SMART on FHIR app. A Postman collection is provided to automate the process, enhancing efficiency and ensuring consistent configurations that can be quickly set up. This guide also explains how to effectively use the Postman script to configure Asgardeo with your app.

### Prerequisite

You need to have an account. If you do not have one, create one for free in Asgardeo(https://asgardeo.io/signup){target="_blank"}. Follow the [documentation]({{base_path}}/get-started/) to learn how to get started.

### Step 1: Register your application in Asgardeo

Follow the steps below to register your application in Asgardeo.

1. Log in to the [Asgardeo Console](https://console.asgardeo.io/){target="_blank"} and go to **Applications**.

2. Click **New Application** and select **Standard-Based Application**.

3. Provide a name, select **OAuth 2.0/OpenID Connect** as the protocol and click **Create**.

4. On the **Protocol** tab of the created application, do the following:

    - Take note of the **Client ID** and **Client secret**. You will need them later.
    
    - Under **Allowed grant types**, ensure the **Client Credential** grant is selected.

### Step 2: Authorize application to access REST APIs

Now that you have registered your application in Asgardeo, the next thing to be done is to provide your application authorization to perform the following actions on the listed REST APIs,

<table>
    <thead>
        <th>API Resource</th>
        <th>Authorized Scopes</th>
    </thead>
    <tbody>
        <tr>
            <td>OAuth DCR API</td>
            <td>
                <ul>
                    <li>Create DCR</li>
                    <li>Delete DCR</li>
                    <li>View DCR</li>
                    <li>Update DCR</li>  
                </ul>
            </td>
        </tr>
        <tr>
            <td>SCIM2 Users API</td>
            <td>
                <ul>
                    <li>Create User</li>
                    <li>List Users</li>
                    <li>View User</li>
                    <li>Delete User</li>
                    <li>Update User</li>
                </ul>
        </tr>
        <tr>
            <td>Application Management API</td>
            <td>
                <ul>
                    <li>Create Application</li>
                    <li>Delete Application</li>
                    <li>Update Application</li>
                    <li>View Application</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Shared Application Management API</td>
            <td>
                <ul>
                    <li>Create Shared Application</li>
                    <li>View Shared Application</li>
                    <li>Delete Shared Application</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>OIDC Scope Management API</td>
            <td>
                <ul>
                    <li>Update OIDC Scopes</li>
                    <li>Delete OIDC Scopes</li>
                    <li>Create OIDC Scopes</li>
                    <li>View OIDC Scopes</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Claim Management API</td>
            <td>
                <ul>
                    <li>Delete Claim</li>
                    <li>Update Claim</li>
                    <li>Create Claim</li>
                    <li>View Claim</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>API Resource Management API</td>
            <td>
                <ul>
                    <li>Delete API Resource</li>
                    <li>Update API Resource</li>
                    <li>Create API Resource</li>
                    <li>View API Resource</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

To do so,

1. On the [Asgardeo Console](https://console.asgardeo.io/), go to **Applications**.

2. Select the created application and go to its **API Authorization** tab.

3. Do the following for all the REST APIs listed on the above table.

    1. Click on **Authorize an API Resource** and do the following:
    
    2. Select the resource from the **API Resource** dropdown.

        !!! note

            Be sure to select the API resources listed under **Management API**.

    2. Under **Authorized Scopes**, select the relevant scopes. Since the application requires all scopes of the API resource, click **Select All** to collectively add all scopes.

    3. Click **Finish**.

    ![Authorize app to consume API]({{base_path}}/assets/img/tutorials/smart-on-fhir/fhir-authorize-app-for-api.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 3: Configure the Postman collection

Now that you have registered and configured your application in Asgardeo, you are able to use its credentials to retrieve an access token with the right permissions to access Asgardeo's REST APIs. Next, you need to provide information about your application to the Postman collection. To do so,

1. Download the Postman collection from [Github](https://github.com/wso2-enterprise/open-healthcare/blob/main/scripts/postman-collections/smartonfhir-asgardeo.postman_collection.json){target="_blank"} and import it to Postman.

2. In the Postman collection named **Asgardeo**, go to the **Authorization** tab and do the following:

    1. Under **Auth Type**, select **Basic Auth**.

    2. Enter the client ID and client secret of your application as username and password respectively.

    ![Configure Postman authentication]({{base_path}}/assets/img/tutorials/smart-on-fhir/fhir-configure-postman-auth.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Go to the **Variables** tab and provide the following values:

    <table>
        <tr>
        <td>applicationName</td>
        <td>Provide any name and this is the DCR application that will be created through the Postman script.</td>
        </tr>
        <tr>
        <td>organization</td>
        <td>Provide your organization name. You may find it in your Console URL. For example, if it is `https://console.asgardeo.io/t/healthcare36/app/getting-started`, the organization name is `healthcare36`.
        </td>
        </tr>
        <tr>
        <td>username</td>
        <td></td>
        </tr>
    </table>












