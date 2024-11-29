# Migrate passwords to {{ product_name }}

You may use one of the following two ways to migrate user passwords to {{ product_name }}.

## Migrate with password reset

This method involves the least administrative effort but causes the most friction for users. With a password reset, users will receive an email prompting them to set a password for their new {{ product_name }} accounts. Until they set a password, their user accounts will remain locked to prevent unauthorized access. Additionally, this method allows you to immediately terminate operations on your previous IdP once the user accounts are successfully migrated to {{ product_name }}.

{% if product_name == "Asgardeo" %}

If you wish to migrate user passwords using this method, inform the Asgardeo team along with your request to [migrate users]({{base_path}}/guides/users/migrate-users/migrate-users/).

{% endif %}

## Migrate with on-demand silent migration

Compared to the password reset method above, on-demand silent password migration involves more effort to set up but provides the user with a seamless password migration experience. The following are the high level steps involved with this method.

1. The user attempts to log in to the application.

2. The application redirects the user to the {{ product_name }} login screen.

3. The user enters the usual credentials for the legacy IdP.

4. If user's password is already migrated, the user is logged in. If not, {{ product_name }} makes an authentication request to the legacy IdP with the user provided credentials.

5. {{ product_name }} redirects the user to a waiting page until the legacy IdP completes the authentication.

6. Once the process is complete, the user is redirected back to the application and {{ product_name }} silently migrates the password for the user.

7. The user is successfully logged in and may now continue using the usual credentials to log in to the application with {{ product_name }}.

!!! note

    If you wish to migrate users with this method, it is crucial to note the following:

     - The legacy IdP should run for a set period to facilitate user migration.
     - Have a contingency plan to migrate any accounts that were not migrated while the legacy IdP is active.
     - Users who were not migrated must contact the administrators to initiate a password reset process, facilitating a smooth and complete transition.

The following guides go into detail on implementing on-demand silent password migration.

### How it works

The following diagram provides a general idea on the components involved with the on-demand silent password migration.

![On-demand silent user password migration]({{base_path}}/assets/img/guides/users/migrate-users/silent-user-migration.png)

Let's look at the diagram in detail:

1. The user starts the authentication by entering the credentials used for the legacy IdP.
2. If {{ product_name }} has not already migrated the user account,

    - User's login fails.
    - {{ product_name }} attempts to find a user corresponding to the provided login identifier.
    - If found, {{ product_name }} then checks for the user's migration status value which is stored in a user attribute.

3. If user's migration status is not set to true,
    
    - {{ product_name }} starts authentication with the legacy IdP by invoking the **start authentication API**.
    - This API responds with a unique ID for the process called the `contextID`.
    - The user is redirected to a waiting page until external authentication completes.

{% if product_name == "Asgardeo" %}

    !!! note
        
        This API is part of an authentication service deployed in [Choreo](https://wso2.com/choreo/){target="_blank"}, WSO2's integration platform. The service is designed to facilitate authentication against the legacy IdP.

{% else %}

    !!! note
        
        This API is part of an authentication service that should be deployed in an external system such as [Choreo](https://wso2.com/choreo/){target="_blank"}, WSO2's integration platform. The service is designed to facilitate authentication against the legacy IdP.

{% endif %}

4. The authentication service will then interact with the legacy IdP and attempt to authenticate the user. A result will be returned once authentication is complete.
5. In the meantime, **the polling API**, another API of the authentication service, keeps polling to check if the authentication process is complete. This API uses the `contextID` returned in 3 to track the specific process.
6. Once 4 completes, the polling API in 5 stops and the user is redirected back to the login page.
7. {{ product_name }} then calls the **authentication status endpoint**, the third API of the authentication service, to retrieve the authentication result.
8. If the result is a success, this means the user was successfully authenticated against the external IdP. Hence, {{ product_name }} will

    - migrate the user's password to {{ product_name }}.
    - set the migration status attribute of the user to true.
    - authenticate the user to the application.

9. The user is seamlessly logged into the application without being prompted to enter the credentials again.

### Prerequisites

Before you begin, ensure the following are fulfilled.

- [Migrate user accounts to {{ product_name }}]({{base_path}}/guides/users/migrate-users/migrate-users/).
- Ensure your legacy IdP provides means to perform basic user authentication (i.e. username and password authentication). For example, a SCIM2/Me REST API endpoint that could be authenticated with username and password.

{% if product_name == "Asgardeo" %}

- You need to have a Github repository to host the authentication service.
- Download [Ballerina](https://ballerina.io/downloads/){target="_blank"}, the programming language used to define the external authentication service.

{% endif %}

{% if product_name == "Asgardeo" %}

{% include "../../../guides/fragments/migrate-users/configure-choreo-for-password-migration.md" %}

{% else %}

### Step 1: Develop and deploy the external authentication service

On-demand silent password migration requires an external authentication service that communicates with the legacy IdP to authenticate users. This service can be developed using any programming language and can be deployed in an external system such as [Choreo](https://wso2.com/choreo/){target="_blank"}, WSO2's integration platform.

Your service should expose the following REST API endpoints.

!!! tip
    
    External authentication may require additional processing time depending on the legacy IdP and network delays. Therefore it is recommended to perform the external authentication asynchronously without holding an active connection until the external authentication completes.

- **Start authentication endpoint** - to initiate the authentication process with the legacy system. This endpoint should accept the request, return a response with a unique random identifier (preferably a UUID) and then start the external authentication process.

- **Authentication status endpoint** - to retrieve and return the completed authentication result.

- **Polling endpoint** - to return the completion status of the external authentication task. This should be an open endpoint that doesn’t require any authentication.

!!! warning "Adding logs"

    We highly recommend adding sufficient logging when developing the external authentication service. However, ensure no sensitive information or Personally Identifiable Information (PII) are included in the logs.

!!! note
    Learn how to [configure the external authentication service in Choreo]({{base_path}}/references/tutorials/configure-choreo-for-password-migration/).

{% endif %}

{% if product_name == "Asgardeo" %}

### Step 4: Configure an attribute in {{ product_name }} to hold the migration status

{% else %}

### Step 2: Configure an attribute in {{ product_name }} to hold the migration status

{% endif %}

{{ product_name }} should have means to check whether a user's password is migrated or not. This can be achieved by creating a user attribute in {{ product_name }} to hold the migration status. To do so,

1. On the {{ product_name }} Console, go to **User Attributes & Stores** > **Attributes** and click on **Attributes**.

2. Click **New Attribute** and enter the following details: 

    <table>
        <tr>
            <td><b>Attribute name</b></td>
            <td>is_migrated</td>
        </tr>
        <tr>
            <td><b>Attribute Display Name</b></td>
            <td>Password migration status</td>
        </tr>
    </table>

3. Click **Finish** to create the attribute.

{% if product_name == "Asgardeo" %}

### Step 5: Configure the login flow of the {{ product_name }} application

{% else %}

### Step 3: Configure the login flow of the {{ product_name }} application

{% endif %}

You are now ready to configure your application for on-demand silent password migration. To do so,

1. On the {{ product_name }} Console, click **Applications**.

2. Select the application and go to its **Login Flow** tab.

{% if product_name == "Asgardeo" %}

3. Configure the login flow using your preferred editor:

    === "Classic Editor"

        To configure the login flow using the classic editor:

        1. Click **Start with default configuration** or add the **Username & Password** authenticator to the first step of the flow.
        
        2. Turn on Conditional Authentication by switching on the toggle.

            ![Configure with classic editor]({{base_path}}/assets/img/guides/users/migrate-users/migrate-users-classic.png)

        3. Replace any existing code with this [conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/on-demand-silent-password-migration-template/).

    === "Visual Editor"

        To configure the login flow using the visual editor:

        1. Switch to the Visual Editor tab.

        2. If **Username & Password** authentication is not set, go to **Predefined flows** > **Basic Login Flows** > **Add Basic Login** and select it to add to the login flow.

        3. Turn on Conditional Authentication by switching on the toggle.

             ![Configure with visual editor]({{base_path}}/assets/img/guides/users/migrate-users/migrate-users-visual.png){: width="500"}

        4. Replace any existing code with this [conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/on-demand-silent-password-migration-template/).

{% else %}

    1. Go to **Predefined Flows** > **Basic Login Flows** and select **Username & Password** under **Add Basic Login**.

    2. Turn on Conditional Authentication by switching on the toggle.

        ![Configure with visual editor]({{base_path}}/assets/img/guides/users/migrate-users/migrate-users-visual.png){: width="500"}

    4. Replace any existing code with this [conditional authentication script]({{base_path}}/guides/authentication/conditional-auth/on-demand-silent-password-migration-template/).

{% endif %}

4. Click **Update** to save the changes.

### Try it out

Follow the steps below to try out on-demand silent password migration for a migrated user account.

1. Access the application URL.

2. Log in to {{ product_name }} with the user credentials used for the legacy IdP.

3. If the user's password is not yet migrated, you'll be redirected to a waiting page as follows.

    ![Wait page]({{base_path}}/assets/img/guides/users/migrate-users/wait-page.png){: width="400"}

4. {{ product_name }} will migrate the password and log the user in once the external authentication is successful.
