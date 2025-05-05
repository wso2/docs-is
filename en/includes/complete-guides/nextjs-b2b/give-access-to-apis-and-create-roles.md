

Before implementing team management features, we need to configure the necessary API resources and roles in {{product_name}}. This ensures that Teamspace has the required permissions to manage organizations, users, and their roles.

![App Permissions]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image6.png){: width="300" style="display: block; margin: auto;"}  

Let's give the application access to the required API resources.

1. Navigate to the application in the {{product_name}} console.
2. Click on "API Authorization" tab
3. Give access to the following APIs.

    | API                             | Path                                 | Scopes               |
    | ------------------------------- | ------------------------------------ | -------------------- |
    | Application Management API      | `/api/server/v1/applications`        | view                 |
    | Application Management Api      | `/o/api/server/v1/applications`      | view                 |
    | Organization Management API     | `/api/server/v1/organizations`       | view, create         |
    | SCIM2 Users API                 | `/scim2/Users`                       | view, create         |
    | SCIM2 Users API                 | `/o/scim2/Users`                     | view, create, delete |
    | SCIM2 Roles API                 | `/scim2/Roles`                       | view, update         |
    | SCIM2 Roles API                 | `/o/scim2/Roles`                     | view, update         |
    | Guest Invitation Management API | `/o/api/server/v1/guests/invitation` | create               |


    ![App APIs]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image7.png){: width="700" style="display: block; margin: 0;"}  

!!! Note
    copy the scopes to be added to your app’s `env.local` file once it is set up in the next steps.

Once access to the APIs is given, create the necessary roles in the application. 

1. Navigate to the “Roles” tab of your application.
2. Keep the role audience as "Application"
3. Create roles and assign permissions.

For Teamspace, we can create two roles as follows:

- **TEAM_ADMIN** - can manage teams and users
	- This role is assigned to anyone signing up to the app as well. Therefore, the permissions required to add teams and users must be there. 
	- Roles API is required to assign the added users to roles.
	- Application API is required to get the app ID.
- **TEAM_MEMBER** - can view users in the team

For the TEAM_ADMIN role, give the following permissions.

| API                             | Path                                 |
| ------------------------------- | ------------------------------------ |
| Application Management Api      | `/o/api/server/v1/applications`      |
| Organization Management API     | `/api/server/v1/organizations`       |
| SCIM2 Users API                 | `/scim2/Users`                       |
| SCIM2 Users API                 | `/o/scim2/Users`                     |
| SCIM2 Roles API                 | `/scim2/Roles`                       |
| SCIM2 Roles API                 | `/o/scim2/Roles`                     |
| Guest Invitation Management API | `/o/api/server/v1/guests/invitation` |

!!! Note
	The name of the admin role, TEAM_ADMIN, must be noted to be added to your app’s `env.local` file later.

![App Roles]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image8.png){: width="700" style="display: block; margin: 0;"}  

!!! Info
    - Read more on [role creation]({{base_path}}/guides/users/manage-roles/#create-a-role){:target="\_blank"}
    - Read more on [API authorization and Role Based Access Control]({{base_path}}/guides/authorization/api-authorization/api-authorization/){:target="\_blank"}
