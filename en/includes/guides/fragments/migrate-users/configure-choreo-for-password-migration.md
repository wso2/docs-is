### Step 1: Develop the authentication service

In this section, we will develop an authentication service that will communicate with the legacy IdP to authenticate users.

{% if product_name == "Asgardeo" %}

!!! note
    You may find a sample Ballerina authentication service [here](https://github.com/wso2/samples-is/tree/master/user-migration-samples/asgardeo/external-authentication-service){target="_blank"}.

{% else %}

!!! note
    You may find a sample Ballerina authentication service [here](https://github.com/wso2/samples-is/tree/master/user-migration-samples/is/external-authentication-service){target="_blank"}.

{% endif %}

1. Create a new Ballerina package. Learn how to do so in the [Ballerina documentation](https://ballerina.io/learn/get-started/){target="_blank"}.

2. Write a [RESTful service](https://ballerina.io/learn/write-a-restful-api-with-ballerina/){target="_blank"} that communicates with the legacy authentication system to perform user authentication. Your service should expose the following REST API endpoints.

    !!! tip
        
        External authentication may require additional processing time depending on the legacy IdP and network delays. Therefore it is recommended to perform the external authentication asynchronously without holding an active connection until the external authentication completes.

    - **Start authentication endpoint** - to initiate the authentication process with the legacy system. This endpoint should accept the request, return a response with a unique random identifier (preferably a UUID) and then start the external authentication process.

    - **Authentication status endpoint** - to retrieve and return the completed authentication result.

    - **Polling endpoint** - to return the completion status of the external authentication task. This should be an open endpoint that doesn’t require any authentication.

    !!! warning "Adding logs"

        We highly recommend adding sufficient logging when developing the REST service. However, ensure no sensitive information or Personally Identifiable Information (PII) are included in the logs.

3. Commit your changes and push the code to your remote Github repository.

### Step 2: Create and deploy the RESTful service in Choreo

We will now deploy the developed authentication service in [Choreo](https://wso2.com/choreo/){target="_blank"}, WSO2's integration platform. To do so,

{% if product_name == "Asgardeo" %}

1. Go to the [Choreo Console](https://console.choreo.dev/login){target="_blank"} and login with the SAME email address you used to create your Asgardeo organization.

    !!! note

        An organization with the same name as your Asgardeo organization will be created for you in Choreo.

{% else %}

1. Go to the [Choreo Console](https://console.choreo.dev/login){target="_blank"} and login to your account or create an account if you don't have one already.

{% endif %}

2. On the top of the Console, create a new project or select an existing one.

3. On the left panel, select **Components** and click **Create**.

4. On the **Select a type** tab, select **Service**.

    ![Select a type of component]({{base_path}}/assets/img/guides/users/migrate-users/create-a-component.png)

    !!! note

        Learn more about service components in the [Choreo documentation](https://wso2.com/choreo/docs/develop-components/develop-services/service-component-overview/){target="_blank"}

5. Enter a name and description for your service.

6. Click **Authorize with Github** and connect the relevant organization, repository and the branch for the developed authentication service in step 1.

7. Select **Ballerina** to be the buildpack and select the Ballerina project directory from your Github repository.

    ![Enter details of the service component]({{base_path}}/assets/img/guides/users/migrate-users/service-details.png)

8. Click **Create**.

9. Build and deploy the service. See [Choreo documentation](https://wso2.com/choreo/docs/develop-components/develop-services/develop-a-service/#step-2-build-and-deploy){target="_blank"} for instructions.

    !!! note

        If you are using the sample authentication service, be sure to provide values for the necessary configurations before you deploy the service.

10. As discussed earlier, the polling endpoint should be an open endpoint. Follow the steps below to configure this.

    1. Go to **Deployment** and in the **Set up** card, click **Endpoint Configurations**.

    2. In the window that appears, under **Permissions**, expand the polling endpoint and turn the **Security** toggle off. 

        ![Make the polling endpoint open]({{base_path}}/assets/img/guides/users/migrate-users/polling-make-open-endpoint.png)

    3. Click **Apply** to save the changes.

11. On the left navigation, go to **Manage** > **Lifecycle** and click **Publish**.

### Step 3: Create a Choreo application to consume the APIs

After the RESTful service is deployed, follow the steps below to create an application in Choreo and subscribe it to the REST API. This application will later be used to integrate the REST APIs with the {{ product_name }} application.

1. Sign in to the [Choreo Developer Portal](https://devportal.choreo.dev/){target="_blank"} with the same email address you used to log in to the Choreo Console in step 2.

2. On the top navigation, go to **Applications** and click **Create Application**.

3. Provide a name and a description for the application and click **Create**.

4. On the left navigation, go to **Credentials** and click **Generate Credentials**.

5. Take note of the generated consumer key and consumer secret as you will need it later.

6. On the left navigation, go to **Subscriptions** and click **Add APIs**.

7. Click **Add** corresponding to the API that you created in step 2.

!!! note

    To learn more about applications in Choreo, refer to the [Choreo documentation](https://wso2.com/choreo/docs/consuming-services/manage-application/#create-an-application){target="_blank"}.
