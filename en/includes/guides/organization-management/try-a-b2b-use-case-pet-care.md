# Try a B2B use case

The following guide is a complete end-to-end use case on how to manage B2B (Business-to-Business) applications in {{ product_name }}.

## Scenario

- You are an administrator of the **Pet Care** application, a platform that offers specialized digital services to support veterinary institutions.

- **Happy Tails** Veterinary Clinic is a veterinary institution that wants a unified platform to streamline its internal operations and customer services. This includes administrative tasks like managing doctors and staff, as well as customer-facing services such as scheduling appointments and facilitating doctor channeling for pet owners.

- To meet these needs, Happy Tails adopts the **Pet Care** application as their digital platform for day-to-day business operations.

- Behind the scenes, the Pet Care application uses {{ product_name }} to simplify identity and access management.

- Pet Care shares the following platform with Happy Tails Veterinary Clinic:

  - **Pet Care Application** – A unified platform that supports different user experiences based on roles.  
    - **Administrators** can manage users, assign roles, configure enterprise Identity Providers (IdPs), and customize login flows for their organization.  
    - **Doctors** can manage appointments, view pet information, update medical records, and communicate with pet owners.  
    - **Pet Owners** can book appointments, manage their pets' profiles, and view their appointment history.

    ![Organization login scenario]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-organization-scenario.png){: width="700" style="display: block; margin: 0;"}

The following guides explain how Pet Care can use {{ product_name }} to implement the above scenario.

{% if product_name == "Asgardeo" %}
## Prerequisites

You should [create a root organization]({{base_path}}/guides/{{root_org_description_path}}). For this example, we have created a root organization named `Pet Care`.
{% endif %}

## Onboard the organization

Pet Care, as the service provider, functions as the root organization. Happy Tails Veterinary Clinic should be set up as a child organization under Pet Care.

Follow the [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) guide and create an organization under the name `Happy Tails`.

## Register the application

The next step is to configure the applications that need to be shared with your child organizations.

Follow the steps given below to register the Pet Care application with {{ product_name }}.

### Step 1: Register the application

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
            <td>The URLs to which the authorization code is sent upon authentication and where the user is redirected upon logout.</br>
                <code>http://localhost:3002/api/auth/callback/wso2isAdmin</code>
                <code>http://localhost:3002</code>
            </td>
        </tr>
    </table>

### Step 2: Share the application with organizations

Share the <b>Pet Care App</b> with the `Happy Tails Veterinary Clinic` organization. See instructions on how to [share applications with organizations]({{base_path}}/guides/organization-management/share-applications/).

!!! note

    When the application is shared with at least one organization, **Sign In with SSO** will be added as a login option in the application login screen, which organization users can use to log in.

### Step 3: Configure the application on {{ product_name }}

To configure the registered application on {{ product_name }}:

On the {{ product_name }} Console, go to **Applications** and select the application you registered.

**Protocol Configurations**

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

    Take note of the `client_id` and `client_secret` generated for your application.

2. Click **Update** to save your configurations.

**User Attribute Configurations**

1. Go to the **User Attributes** tab of the **Pet Care App**.

2. Mark the following attributes as **mandatory**:

    - `Email`  
    - `First Name`  
    - `Last Name`  
    - `Roles`

3. Click **Update** to save the changes.

**Create Custom API Resources**

Before proceeding with API authorization, you need to create the required business API resources.

1. Navigate to the **API Resources** section in the {{ product_name }} Console.

2. Click on **New API Resource** and create the following resources:

<table>
  <tr>
    <th>Display Name</th>
    <th>Identifier</th>
    <th>Permissions</th>
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

After creating these API resources, proceed to authorize them for the application in the next step.

**API Authorization**

1. Navigate to the **API Authorization** tab of the application.

2. Click on **+ Authorize an API Resource**.

3. Authorize the following API resources for the application. Select **all available scopes** for each API.

    !!! note
        When subscribing or authorizing APIs, make sure to select **Organizational APIs** — not **Management APIs**.  
        Refer to the [API documentation](https://is.docs.wso2.com/en/latest/apis/) for more details.

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

4. After authorizing all the required APIs, click **Update** to save your changes.

**Role Configurations**

1. Navigate to the **Roles** tab in the Pet Care application.

2. Select **Application** as Role Audience and click **+ New Role**.

    ![Create Application Roles - Initial view]({{base_path}}/assets/img/guides/organization/manage-organizations/create-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Create the following application roles:

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

4. After entering the role name and assigning the appropriate API resources and scopes, click **Create**.

    ![Create Application Roles]({{base_path}}/assets/img/guides/organization/manage-organizations/application-role-api-resources.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Upon successful creation, the new application roles will appear under the **Assigned Roles** list.

    ![Created Application Role]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-application-roles.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Step 4: Create a Sub-organization Admin User and Assign Role

After configuring roles, the next step is to create an administrator account for the sub-organization and assign them the `pet-care-admin` role.

#### 1. Switch to the Sub-organization

In the {{ product_name }} Console, switch from the root organization (**Pet Care**) to the sub-organization (**Happy Tails**).

#### 2. Create the Admin User

1. Navigate to **User Management > Users**.
2. Click on **+ Add User**.
3. Fill in the user details:

    - **Username:** `admin@cityvet.com`  
    - **Email:** `admin@cityvet.com`  
    - **Password:** Set a secure password or use the autogenerated option.

4. Click **Create**.

#### 3. Assign the Role to the User

1. Navigate to **User Management > Roles**.
2. Find the `pet-care-admin` role in the list and click on it.
3. Go to the **Users** tab.
4. Click **+ Assign Users**, then search for and select `admin@cityvet.com`.
5. Click **Assign**.

Now, `admin@cityvet.com` has the `pet-care-admin` role and can log in to the **Pet Care Admin Portal** to manage their organization's users, applications, and configurations.

### Step 5: Configure Branding in the Sub-organization

Once the application is registered and shared, you can customize the branding to reflect your organization’s identity.

To configure branding for the sub-organization:

1. Switch to the **sub-organization** (e.g., **Happy Tails Veterinary Clinic**) in the {{ product_name }} Console.
2. Navigate to **Branding > Styles & Text**.
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
    - Clone the [samples-is GitHub repository](https://github.com/wso2/samples-is)  
    - The Pet Care sample will be available under the `petcare-sample` directory.

### Step 1: Deploy the API Services

Run the following services in separate terminals:

1. **Channel Service**  
    Navigate to:
    ```
    <SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/channel-service
    ```
    Start the service:
    ```bash
    bal run
    ```

2. **Pet Management Service**  
    Navigate to:
    ```
    <SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/pet-management-service
    ```
    Start the service:
    ```bash
    bal run
    ```

3. **Personalization Service**  
    Navigate to:
    ```
    <SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/apis/ballerina/personalization-service
    ```
    Start the service:
    ```bash
    bal run
    ```

!!! note
    By default, the services store data in-memory. You can connect them to a MySQL database.  
    - Create a `Config.toml` file in the root folder of each service.  
    - Add the following DB configurations:

    ```toml
    dbHost = "<DB_HOST>" 
    dbUsername = "<DB_USERNAME>" 
    dbPassword = "<DB_USER_PASSWORD>" 
    dbDatabase = "<DB_NAME>" 
    dbPort = "<DB_PORT>"
    ```

    - SQL schemas are available at:  
      `<SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/dbscripts`

### Step 2: Set Up the Frontend Application

1. Navigate to:
    ```
    <SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/web/nextjs/apps/business-admin-app
    ```

2. Create a `.env` file and add the following environment variables:

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

---

### Step 3: Start the Application

1. Navigate to the frontend root directory:
    ```
    <SAMPLES_HOME>/petcare-sample/b2b/web-app/petvet/web/nextjs
    ```

2. Run the following commands:

    ```bash
    npm install
    ```

    ```bash
    npx nx serve business-admin-app
    ```

3. Visit the application at [http://localhost:3002](http://localhost:3002)

!!! tip
    To directly access the sub-organization login, visit:  
    `http://localhost:3002?orgId=<suborg_Id>`

## Try it out

The following sections explain how users from a sub-organization — such as administrators, doctors, and pet owners — log in to the **Pet Care** application.  
All users access the same application, and pages are dynamically shown based on their roles.

### Try out Sign In with SSO

Follow the steps below to see how organization login works for a user in the **Happy Tails Veterinary Clinic** organization when accessing the **Pet Care Services App**.

1. Open the application by copying the following URL to your browser:  
   `http://localhost:3002/`

    ![Pet Care Application Login]({{base_path}}/assets/img/guides/organization/manage-organizations/pet-care-app-login.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Sign In** to navigate to the {{ product_name }} login screen.

3. Click **Sign In with SSO** to specify the organization to which you are signing in.

4. Enter **Happy Tails Veterinary Clinic** as the organization name and click **Submit**.

    ![Sign in with SSO]({{base_path}}/assets/img/guides/organization/manage-organizations/sign-in-with-sso.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter the username and password of a user onboarded to Happy Tails (e.g., `admin@cityvet.com` or a doctor/pet owner you created).

6. Click **Sign In** and approve the requested permissions.

    You have successfully logged into the **Pet Care Services App** as a user of the **Happy Tails** organization.

### Try out the administration features

If you log in as an admin user (e.g., `admin@cityvet.com`):
You will have access to administration features such as:

- **Dashboard**: View a summary of organization activity and key metrics.
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

When a user with the `pet-care-doctor` role logs in, they will see pages relevant to their day-to-day veterinary work. These include:

- **Profile**: View and update personal details and specialty.
- **Appointments**: See upcoming appointments and manage their schedule.
- **Assigned Pets**: Access a list of pets under their care, along with medical notes and visit history.

Doctors can view and manage information related to their appointments and the pets they treat. They don’t have access to administrative features like user management or branding configurations.

### Try out the pet owner experience

Users with the `pet-care-pet-owner` role — typically customers of the veterinary clinic — have access to pet-related services such as:

- **Book Appointment**: Find available doctors and schedule appointments for their pets.
- **My Pets**: Add, view, and manage details about their pets, including breed, age, and health records.
- **Appointment History**: Track past and upcoming appointments.
- **Settings**: Manage account details and preferences.

Pet owners see a simplified version of the app, designed to help them easily manage their pets’ information and interact with the clinic.
