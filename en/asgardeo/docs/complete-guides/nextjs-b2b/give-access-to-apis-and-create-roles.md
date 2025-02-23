---
template: templates/complete-guide.html
heading: Give access to APIs and create roles
read_time: 2 min
---

Before implementing team management features, we need to configure the necessary API resources and roles in {{product_name}}. This ensures our application has the required permissions to manage organizations, users, and their roles.

![App Permissions]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image6.png){: width="300" style="display: block; margin: auto;"}  

Let's give the created application access to the required API resources.

1. Navigate to your application in the {{product_name}} console.
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


    ![App APIs]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image7.png){: width="700" style="display: block; margin: 0;"}  

!!! Note
    copy the scopes to be added to your app’s `env.local` file once it is set up in the next steps.

Once access to the APIs is given, create the necessary roles in the application. 

1. Navigate to the “Roles” tab of your application.
2. Keep the role audience as "Application"
3. Create roles and assign permissions.

For the admin role, give the following permissions.

| API                             | Path                                 |
| ------------------------------- | ------------------------------------ |
| Application Management Api      | `/o/api/server/v1/applications`      |
| Organization Management API     | `/api/server/v1/organizations`       |
| SCIM2 Users API                 | `/scim2/Users`                       |
| SCIM2 Users API                 | `/o/scim2/Users`                     |
| SCIM2 Roles API                 | `/scim2/Roles`                       |
| SCIM2 Roles API                 | `/o/scim2/Roles`                     |
| Guest Invitation Management API | `/o/api/server/v1/guests/invitation` |

For this use case, I’ve created two roles called “Team Admin” and “Team Member”. 

- Team Admin - can add and delete users in the team
	- This role is assigned to anyone signing up to the app as well. So in addition, the permissions required to add a team (organization APIs) must be there. 
	- Roles API is required to assign the added users to roles.
	- Application API is required to get the app ID.
- Team Member - can view users in the team

!!! Note
	The name of the admin role must be copied and kept to be added to your app’s env.local file later.

![App Roles]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image8.png){: width="700" style="display: block; margin: 0;"}  

!!! Info
    Read more on [API authorization and Role Based Access Control]({{base_path}}/guides/authorization/api-authorization/api-authorization/)

In this step, we have given the application access to APIs and created roles.
