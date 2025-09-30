# Try a B2B use case

The following guide is a complete end-to-end use case on how to manage B2B (Business-to-Business) applications in {{ product_name }}.

## Scenario

- Happy Tails Veterinary Clinic is a veterinary institution that wants a unified platform to perform its internal operations, such as managing doctors and staff, and external operations, such as scheduling appointments and facilitating doctor channeling for pet owners.

- To meet these needs, Happy Tails uses the **Pet Care** application which has integrated {{product_name}} to fulfill its identity and access management needs.

- **Pet Care** application supports personalized experiences based on the role assigned to the user.
     - **Administrators** can manage users, assign roles, configure enterprise Identity Providers (IdPs), and customize login flows for their organization.  
    - **Doctors** can manage appointments, view pet information, update medical records, and communicate with pet owners.  
    - **Pet Owners** can book appointments, manage their pets' profiles, and view their appointment history.

    ![Organization login scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-organization-scenario.png){: width="500" style="display: block; margin: 0;"}

As an administrator of **Pet Care**, you are tasked with implementing this scenario. The following guides explain how you can use {{ product_name }} to achieve this.

{% if product_name == "Asgardeo" %}
## Prerequisites

You should [create a root organization]({{base_path}}/guides/{{root_org_description_path}}). For this example, we have created a root organization named `Pet Care`.
{% endif %}

## Onboard the organization

**Pet Care**, as the service provider, is the root organization of this business. **Happy Tails**, as a customer of Pet Care, is a child organization of Pet Care.

Follow the [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) guide and create this organization hierarchy.

## Create the API resources

**Pet Care** application uses many API resources for its functionality. Users, based on the role, should be able to perform various actions on these API resources as permitted by the role. To provide correct access control to these API resources, we need to first define these API resources and actions in {{product_name}}.

!!! note
    
    Learn more about [API authentization]({{base_path}}/guides/authorization/api-authorization/api-authorization/).

To do so,

1. On the {{product_name}} Console, go to **API Authorization**.

2. Click **New API Resource** and add the following API resources and permissions (scopes).

    <table>
      <tr>
        <th>Display Name</th>
        <th>Identifier</th>
        <th>Permissions (Scopes)</th>
      </tr>
      <tr>
        <td>Channel Service</td>
        <td><code>http://localhost:9091</code></td>
        <td>
          <ul>
            <li>list_doctors</li>
            <li>create_doctor</li>
            <li>view_doctor</li>
            <li>update_doctor</li>
            <li>delete_doctor</li>
            <li>list_bookings</li>
            <li>view_appointment</li>
            <li>view_profile</li>
            <li>create_bookings</li>
            <li>view_booking</li>
            <li>update_booking</li>
            <li>delete_booking</li>
            <li>view_org_info</li>
            <li>update_org_info</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Pet Management Service</td>
        <td><code>http://localhost:9092</code></td>
        <td>
          <ul>
            <li>list_pets</li>
            <li>create_pet</li>
            <li>view_pet</li>
            <li>update_pet</li>
            <li>delete_pet</li>
            <li>view_user_settings</li>
            <li>update_user_settings</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Personalization Service</td>
        <td><code>http://localhost:9093</code></td>
        <td>
          <ul>
            <li>create_branding</li>
            <li>update_branding</li>
            <li>delete_branding</li>
          </ul>
        </td>
      </tr>
    </table>

## Register the application

The next step is to integrate the Pet Care application with {{product_name}}. To do so,

### Step 1: Register the application

To register the application,

1. Log in to the root organization.

2. [Register a standard-based application]({{base_path}}/guides/applications/register-standard-based-app/) in your root organization with the following settings:

    <table>
        <tr>
            <th>Application Name</th>
            <td>Add a name for the application.</br>
                <code>Pet Care App</code>
            </td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>The authentication protocol to use.</br>
                <code>OpenID Connect</code>
            </td>
        </tr>
        <tr>
            <th>Authorized redirect URLs</th>
            <td>{{product_name}} sends the authorization code to this URL and once users logout, they will be redirected to this URL.</br>
                <code>http://localhost:3002/api/auth/callback/wso2isAdmin</code>
                <code>http://localhost:3002</code>
            </td>
        </tr>
    </table>

### Step 2: Share the application with organizations

When you share an application with your child organizations, **Sign In with SSO** appears as a login option in the application. Child organization users can then use this option to successfully log in to the application.

Follow the instructions in [share applications with organizations]({{base_path}}/guides/organization-management/share-applications/) and share the application with the **Happy Tails** organization.

### Step 3: Configure the application

The following configurations are essential for the application to work seamlessly with child organization logins. You can find these settings by navigating to the **Applications** section and selecting the registered application.

#### Protocol Configurations

1. Go to the **Protocol** tab of the application, and configure the following values.

    <table>
        <tr>
            <th>Allowed Grant Types</th>
            <td>Select the following grant type:
                <ul>
                    <li>Code</li>
                    <li>Refresh Token</li>
                    <li>Organization Switch</li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Authorization Redirect URLs</th>
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <ul>
                    <li><code>http://localhost:3002/api/auth/callback/wso2isAdmin</code></li>
                    <li><code>http://localhost:3002</code></li>
                </ul>
            </td>
        </tr>
        <tr>
            <th>Allowed Origins</th>
            <td>Enter the allowed origins.</br>
                <code>http://localhost:3002</code>
            </td>
        </tr>
        <tr>
            <th>Public Client</th>
            <td>Enable the application as a public client.</td>
        </tr>
        <tr>
            <th>Access Token Type</th>
            <td>Select <code>JWT</code> as the access token type.</td>
        </tr>
    </table>

2. Click **Update** and take note of the `client_id` and `client_secret` generated for your application.

#### User Attribute Configurations

1. Go to the **User Attributes** tab of the application.

2. Mark the following attributes as **mandatory** so that users are required to have values for them. If not, users are asked to enter the values during log in:

    - `Email`  
    - `First Name`  
    - `Last Name`  
    - `Roles`

3. Click **Update** to save the changes.

**Authorize API Resources**

In this step, we will provide access for the application to consume API resources. This includes the custom API resources we defined above and other standard API that is required for the functionality of the application. 

1. Go to the **API Authorization** tab of the application.

2. Click on **Authorize an API Resource**.

3. Authorize the application to consume all the API resources and permissions that we defined in the [Create the API resources](#create-the-api-resources) step.

4. Additionally, authorize the application to consume the following standard APIs and all of the corresponding permissions (scopes).

    !!! note "Important"

        Standard APIs come in two types: 
        
        - **Management APIs** govern B2C use cases.
        - **Organization APIs** govern B2B use cases.
        
        Be sure to select the corresponding **organization API** for the following APIs. Refer to the [API documentation](https://is.docs.wso2.com/en/latest/apis/) for more details.

     <table>
        <tr>
            <th>API Resource</th>
            <th>Endpoint</th>
        </tr>
        <tr>
            <td>SCIM2 Users API</td>
            <td><code>/o/scim/Users</code></td>
        </tr>
        <tr>
            <td>SCIM2 Roles API</td>
            <td><code>/o/scim2/Roles</code></td>
        </tr>
        <tr>
            <td>SCIM2 Groups API</td>
            <td><code>/o/scim2/Groups</code></td>
        </tr>
        <tr>
            <td>Identity Provider Management API</td>
            <td><code>/o/api/server/v1/identity-providers</code></td>
        </tr>
        <tr>
            <td>Application Management API</td>
            <td><code>/o/api/server/v1/applications</code></td>
        </tr>
        <tr>
            <td>Claim Management API</td>
            <td><code>/o/api/server/v1/claim-dialects</code></td>
        </tr>
        <tr>
            <td>Branding Preference Management API</td>
            <td><code>/o/api/server/v1/branding-preference</code></td>
        </tr>
        <tr>
            <td>Channel Service API</td>
            <td><code>http://localhost:9091</code></td>
        </tr>
        <tr>
            <td>Pet Management Service API</td>
            <td><code>http://localhost:9092</code></td>
        </tr>
        <tr>
            <td>Personalization Service API</td>
            <td><code>http://localhost:9093</code></td>
        </tr>
    </table>


**Role Configurations**

The application should support three distinct roles: **Administrator**, **Doctor**, and **Pet Owner**. Each role will have different levels of access to API resources, ensuring that each user receives a personalized user experience tailored to their specific use cases.

!!! note
    
    Learn more about roles in [manage roles]({{base_path}}/guides/users/manage-roles/).

To create these roles,

1. Navigate to the **Roles** tab of the application.

2. Select the **Role Audience** as **Application** and click **New Role**.

    ![Create Application Roles - Initial view]({{base_path}}/assets/img/guides/organization/manage-organizations/create-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Create the following application roles and assign the corresponding permissions (scopes):

    <table>
      <tr>
        <th>Role Name</th>
        <th>API Resource</th>
        <th>Authorized Scopes</th>
      </tr>

      <tr>
        <td rowspan="9"><code>pet-care-admin</code></td>
        <td>SCIM2 Users API</td>
        <td>All Scopes</td>
      </tr>
      <tr><td>SCIM2 Roles API</td><td>All Scopes</td></tr>
      <tr><td>SCIM2 Groups API</td><td>All Scopes</td></tr>
      <tr><td>Identity Provider Management API</td><td>All Scopes</td></tr>
      <tr><td>Application Management API</td><td>All Scopes</td></tr>
      <tr><td>Claim Management API</td><td>All Scopes</td></tr>
      <tr><td>Branding Preference Management API</td><td>All Scopes</td></tr>
      <tr>
        <td>Channel Service API</td>
        <td>
          <ul>
            <li>list_doctors</li>
            <li>view_org_info</li>
            <li>update_org_info</li>
            <li>create_doctor</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Personalization Service API</td>
        <td>
          <ul>
            <li>create_branding</li>
            <li>update_branding</li>
            <li>delete_branding</li>
          </ul>
        </td>
      </tr>

      <tr>
        <td rowspan="2"><code>pet-care-doctor</code></td>
        <td>Channel Service API</td>
        <td>
          <ul>
            <li>view_profile</li>
            <li>list_bookings</li>
            <li>view_doctor</li>
            <li>update_doctor</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Pet Management Service API</td>
        <td>
          <ul>
            <li>list_pets</li>
          </ul>
        </td>
      </tr>

      <tr>
        <td rowspan="2"><code>pet-care-pet-owner</code></td>
        <td>Channel Service API</td>
        <td>
          <ul>
            <li>list_bookings</li>
            <li>list_doctors</li>
            <li>view_doctor</li>
            <li>create_bookings</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Pet Management Service API</td>
        <td>
          <ul>
            <li>create_pet</li>
            <li>view_pet</li>
            <li>list_pets</li>
          </ul>
        </td>
      </tr>
    </table>

4. After entering the role names and assigning the appropriate API resources and scopes, click **Create**.

    ![Create Application Roles]({{base_path}}/assets/img/guides/organization/manage-organizations/application-role-api-resources.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Upon successful creation, the new application roles will appear under the **Assigned Roles** list.

    ![Created Application Role]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-application-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 4: Create a user and assign the administrator role

Now that we have configured the application and have shared the application with the **Happy Tails** organization, it is time for us to create an administrator for the **Happy Tails** child organization. This administrator is responsible for managing the **Happy Tails** organization.

To do so,

1. On the {{product_name}} Console, navigate to **Organizations** and switch to the **Happy Tails** organization.

2. On the organization Console, navigate to **User Management > Users**.

3. Click **Add User** and create a user.

    - **Username:** `admin@cityvet.com`  
    - **Email:** `admin@cityvet.com`  
    - **Password:** Set a secure password or use the autogenerated option.

4. Click **Create**.

5. From the organization Console, navigate to **User Management > Roles**.

6. Click on the `pet-care-admin` administrator role you created earlier and go to its **Users** tab.

7. Click **Assign Users**, select the created user and click **Assign**.

Now that we assigned the `pet-care-admin` role to the `admin@cityvet.com` user, this user can log in to the **Pet Care** admin portal and manage the Happy Tails organization's users, applications, and configurations.

### Step 5: Configure Branding for the organization

The Happy Tails organization administrator can now customize the login screens of the organization to align with the Pet Care application's theme.

To do so,

1. On the **Happy Tails** organization's Console, navigate to **Branding > Styles & Text**.
3. Go to the **Design** tab.
4. Expand the **Images** section and set the following:

    - **Logo URL:**  
      `https://user-images.githubusercontent.com/35829027/241967420-9358bd5c-636e-48a1-a2d8-27b2aa310ebf.png`

    - **Logo Alt Text:**  
      `Pet Care App Logo`

    - **Favicon URL:**  
      `https://user-images.githubusercontent.com/1329596/242288450-b511d3dd-5e02-434f-9924-3399990fa011.png`

5. Expand the **Color Palette** section and set:

    - **Primary Color:** `#4f40ee`

This customizes the login and self-service UIs to match the Pet Care application's branding.

## Set up the client applications

!!! note "Before you begin"
    - Install [Ballerina 2201.5.0](https://dist.ballerina.io/downloads/2201.5.0/ballerina-2201.5.0-swan-lake-macos-arm-x64.pkg)  
    - Install Node.js v16 LTS (Tested with v16.13.0)

### Step 1: Clone the repository

Clone the samples-is [GitHub repository](https://github.com/wso2/samples-is) to your local machine. The Pet Care sample application is available under the `petcare-sample` directory.

### Step 2: Deploy the API Services

Let's now run each of the services of the Pet Care application. In each of the commands below, `<SAMPLES_HOME>` refers to the root directory of the cloned repository.

To do so, run each of the following services in a separate terminal:

1. To start the **Channel Service**, navigate to the `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/channel-service` directory and run,

    ```bash
    bal run
    ```

2. To start the **Pet Management Service**, navigate to the `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/pet-management-service` directory and run,

    ```bash
    bal run
    ```

3. To start the **Personalization Service**, navigate to the  `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/personalization-service` directory and run,

    ```bash
    bal run
    ```

!!! note
    
    By default, the services store data in memory. Alternatively, you can connect them to a MySQL database. To do so, 
    
    - Create a `Config.toml` file in the root folder of each service.  
    
    - Add the following DB configurations to each of the files:

        ```toml
        dbHost = "<DB_HOST>" 
        dbUsername = "<DB_USERNAME>" 
        dbPassword = "<DB_USER_PASSWORD>" 
        dbDatabase = "<DB_NAME>" 
        dbPort = "<DB_PORT>"
        ```

    The SQL schemas are available at: `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/dbscripts`

### Step 3: Set Up the Frontend Application

To set up the frontend application,

1. Navigate to the `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/web/nextjs/apps/business-admin-app` directory.

2. Create a `.env` file and add the following environment variables to it:

    ```env
    NEXTAUTH_URL=http://localhost:3002
    BASE_URL=https://localhost:9443
    BASE_ORG_URL=https://localhost:9443/t/<PRIMARY_ORG_NAME>
    CHANNELLING_SERVICE_URL=http://localhost:9091
    PET_MANAGEMENT_SERVICE_URL=http://localhost:9092
    PERSONALIZATION_SERVICE_URL=http://localhost:9093
    HOSTED_URL=http://localhost:3002
    SHARED_APP_NAME="Pet Care App"
    CLIENT_ID=<CLIENT_ID_OF_PET_CARE_APP>
    CLIENT_SECRET=<CLIENT_SECRET_OF_PET_CARE_APP>
    NODE_TLS_REJECT_UNAUTHORIZED=0
    ```

### Step 4: Start the Application

To start the application,

1. Navigate to `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/web/nextjs` directory which is the root directory of the frontend application.

2. Run the following commands:

    ```bash
    npm install
    ```

    ```bash
    npx nx serve business-admin-app
    ```

3. Visit the application at [http://localhost:3002](http://localhost:3002)

!!! tip
    Use the following URL to directly access the login page of an organization.:  
    `http://localhost:3002?orgId=<suborg_Id>`

## Try it out

The following sections show how the application log in experience looks like and how the experience changes for users logging in with each of the three roles of the application; administrators, doctors, and pet owners.

### Try out sign-in with SSO

Follow the steps below to see how organization login works for a user in the **Happy Tails** organization when accessing the **Pet Care** application.

1. Navigate to `http://localhost:3002/` in your browser.  

    ![Pet Care Application Login]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-app-login.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Sign In** to navigate to the {{ product_name }} login screen.

3. Click **Sign In with SSO** to specify the organization to which you are signing in.

{% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}
4. Enter the **Organization Handle** of the organization and click **Submit**.
{% else %}
4. Enter **Happy Tails** as the organization name and click **Submit**.
{% endif %}

    ![Sign in with SSO]({{base_path}}/assets/img/guides/organization/manage-organizations/sign-in-with-sso.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter the username and password of a user onboarded to Happy Tails (e.g., `admin@cityvet.com` or a doctor/pet owner you created).

6. Click **Sign In** and provide the necessary consent.

You have now successfully logged into the **Pet Care** application as a user of the **Happy Tails** organization.

### Try out the administration features

When a user assigned to the `pet-care-admin` role logs in, the user has access to administration features such as.

- **Dashboard**: View a summary of the organization activity and key metrics.
- **Manage Doctors**: Onboard, view, and update doctor profiles.
- **Manage Users**: Add, remove, or update users across roles (doctors, pet owners, etc.).
- **Manage Roles**: View and assign predefined application roles like `pet-care-admin`, `pet-care-doctor`, and `pet-care-pet-owner`.
- **Personalization**: Customize the organization's branding, including logo, color palette, and taglines.
- **SSO**: Configure federated login for the organization.
- **2-Step Verification**: Enable or configure MFA options for users.

    ![Pet Care Admin View]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-admin-view.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    Learn how to build an administration portal for your B2B application in the [implement an administration portal]({{base_path}}/guides/organization-management/manage-b2b-administration/#implement-an-administration-portal) section.


### Try out the doctor experience

When a user with the `pet-care-doctor` role logs in, the user can access pages relevant to the daily veterinary tasks. These include:

- **Profile**: View and update personal details and specialty.
- **Appointments**: See upcoming appointments and manage personal schedule.
- **Assigned Pets**: Access a list of pets under the user's care, along with each pet's medical history and notes.

Doctors can view and manage information related to their appointments and the pets they treat. They don’t have access to administrative features such as user management or branding configurations.

### Try out the pet owner experience

Users with the `pet-care-pet-owner` role, typically customers of the veterinary clinic, have access to pet-related services such as:

- **Book Appointment**: Find available doctors and schedule appointments for their pets.
- **My Pets**: Add, view, and manage details about their pets, including breed, age, and health records.
- **Appointment History**: Track past and upcoming appointments.
- **Settings**: Manage account details and preferences.

Pet owners see a simplified version of the app, designed to help them easily manage their pets’ information and interact with the clinic.