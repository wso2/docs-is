# {{ product_name }} events

{{ product_name }} triggers events corresponding to the various user interactions in your {{ product_name }} organization. You can configure {{ product_name }} to publish these events to WSO2's integration platform, [Choreo](https://wso2.com/choreo/). From there, you can define custom business logic that can be executed when an event occurs.

{{ product_name }} publishes the following events under three main categories.

!!! note "Important"
    Note that all events published by {{ product_name }} are encrypted end-to-end organization-wise until Choreo processes and decrypts them.

- [Login events](#login-events): Events related to login flows.
  - [Login success event](#login-success-event): Published when a user successfully logs in to an application.

- [User operation events](#user-operation-events): Events related to user operations, profile updates, and account deletes.
  - [User account lock event](#user-account-lock-event): Published when a user account is locked.
  - [User credential update event](#user-credential-update-event): Published when a user's credentials are updated.
  - [User group update event](#user-group-update-event): Published when users are added or removed from a group.
  - [User account unlock event](#user-account-unlock-event): Published when a user account is unlocked.
  - [User delete event](#user-delete-event): Published when a user's account is deleted.
  
- [Registration events](#registration-events): Events that occur during user registration flows.
  - [Add user event](#add-user-event): Published when a user is added to the organization.
  - [Accept user invite event](#accept-user-invite-event): Published when a user accepts an invitation to an organization.
  - [Confirm self-signup event](#confirm-self-signup-event): Published when a user completes account verification during self-sign-up.

## Configure {{ product_name }} to publish events

Follow the steps below to configure event publishing for {{ product_name }}.

1. On the {{ product_name }} Console, go to **Monitoring > Events**.

2. Select the events that you wish to publish to Choreo and click **Update**.

    ![{{ product_name }} Console UI for events]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-ui.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note
        Alternatively, you can invoke the **Event Configuration Management** API to configure event publishing. See the [API Documentation]({{base_path}}/apis/event-configuration/) to learn more.

## Implement business use cases for {{ product_name }} events via Choreo

Follow the steps below to define a business logic that will trigger when an {{ product_name }} event occurs.

### Prerequisite
Choreo requires you to have a github repository to host the webhook logic. You can create the webhook from scratch or connect to an existing Ballerina repository. Visit [Choreo docs](https://wso2.com/choreo/docs/develop/components/webhook/) to learn more.

### Create a webhook

1. Navigate to [Choreo](https://console.choreo.dev/login) and create an organization with the same name as your {{ product_name }} organization, if you don't have it already.

    !!! note
        Organizations in {{ product_name }} and Choreo will synchronize based on the organization name.

2. Select the **Default Project** under **All Projects**. Alternatively, you can create a new project or use an existing project.

3. Start creating a webhook in Choreo from the list of components. Learn more about webhooks in the Choreo [documentation](https://wso2.com/choreo/docs/develop/components/webhook/#develop-a-webhook).

    !!! note
        If you already have some components in the project, click on **+Create** button in the component list view.

    ![Create a Webhook in Choreo]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-create-webhook-in-choreo.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Enter a name and a description for your webhook, select **External** as the Access Mode and click **Next**.

    ![Enter general details for the Choreo webhook]({{base_path}}/assets/img/guides/asgardeo-events/create-a-webhook-general-details.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Authorize and connect the github repository and the branch. Since the webhook code needs to be placed in the root of the repository, leave the **Path** parameter as shown.

    ![Connect Github repository to Choreo]({{base_path}}/assets/img/guides/asgardeo-events/choreo-webhook-authorize-github.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

6. Check the **Start with a sample** checkbox to create a pull request with the starter code required for the webhook and click **Next**.

7. Select **{{ product_name }}** as the **Trigger Type** and click **Next**.

    ![Select {{ product_name }} trigger type]({{base_path}}/assets/img/guides/asgardeo-events/choreo-select-asgardeo-trigger-type.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

8. Select one of the {{ product_name }} event types as the **Trigger Channel** and click **Create**. The available options are as follows:
     <table>
        <tr>
            <td><b>RegistrationService</b></td>
            <td>Listens to all [user registration events](#registration-events) in {{ product_name }}.</td>
        </tr>
        <tr>
            <td><b>UserOperationService</b></td>
            <td>Listens to all [user operation events](#user-operation-events) in {{ product_name }}.</td>
        </tr>
        <tr>
            <td><b>LoginService</b></td>
            <td>Listens to all [user login events](#login-events) in {{ product_name }}.</td>
        </tr>
        <tr>
            <td><b>NotificationService</b></td>
            <td>Listens to all notification events of the organization from {{ product_name }}.</td>
        </tr>
     </table>

    ![Select {{ product_name }} trigger type]({{base_path}}/assets/img/guides/asgardeo-events/choreo-select-trigger-channel.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

9. After the webhook is created, Choreo will create a pull request in your connected Github repository with the sample starter code. Go to your repository and merge this code to complete the setup.


### Define the business logic

Let's set up a sample business use case in which Choreo prints a log whenever a [registration event](#registration-events) is generated in {{ product_name }}.

1. [Create a webhook](#create-a-webhook) with **RegistrationService** as the **Trigger Channel**.

2. Navigate to your Github repository and open the **webhook.bal** file. Your boilerplate code may look as below.

    ``` java
    import ballerinax/trigger.asgardeo;
    import ballerina/http;

    configurable asgardeo:ListenerConfig config = ?;

    listener http:Listener httpListener = new(8090);
    listener asgardeo:Listener webhookListener =  new(config,httpListener);

    service asgardeo:RegistrationService on webhookListener {
  
        remote function onAddUser(asgardeo:AddUserEvent event ) returns error? {
        //Not Implemented
        }
        remote function onConfirmSelfSignup(asgardeo:GenericEvent event ) returns error? {
        //Not Implemented
        }
        remote function onAcceptUserInvite(asgardeo:GenericEvent event ) returns error? {
        //Not Implemented
        }
    }

    service /ignore on httpListener {}

    ```

3. Define your business logic in the **webhook.bal** file.
    
    !!! note
        The following is a sample code that prints a log in the Choreo console, when a registration event is generated in {{ product_name }}.

    ``` java
    import ballerinax/trigger.asgardeo;
    import ballerina/log;
    import ballerina/http;
    
    configurable asgardeo:ListenerConfig config = ?;
    
    listener http:Listener httpListener = new(8090);
    listener asgardeo:Listener webhookListener =  new(config,httpListener);
    
    service asgardeo:RegistrationService on webhookListener {
    
        remote function onAddUser(asgardeo:AddUserEvent event ) returns error? {
            
            log:printInfo(event.toJsonString());
        }
        
        remote function onConfirmSelfSignup(asgardeo:GenericEvent event ) returns error? {
            
            log:printInfo(event.toJsonString());
        }
        
        remote function onAcceptUserInvite(asgardeo:GenericEvent event ) returns error? {
            
            log:printInfo(event.toJsonString());
        }
    }
    
    service /ignore on httpListener {}
    
    ```

4. [Deploy your webhook](https://wso2.com/choreo/docs/webhook/#deploy-a-webhook) with the business logic that you defined above.

5. Perform an action in {{ product_name }} that will generate a [registration event](#registration-events),  such as [onboarding a user](https://wso2.com/asgardeo/docs/guides/users/manage-customers/#onboard-a-user).

6. Proceed to [observe logs](https://wso2.com/choreo/docs/observability/observability-overview/) in your integrated console in Choreo.

## Payload of an {{ product_name }} event

The payload of an {{ product_name }} event that is sent to Choreo consists of the following data objects:

- **Security Data** object - The security data object is common to all {{ product_name }} events. This contains the following security metadata about the event.

    <table>
    <thead>
        <tr>
            <th><b>Property Name</b></th>
            <th><b>Type</b></th>
            <th><b>Description</b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>iss</code></td>
            <td>String</td>
            <td>Issuer of the event</td>
        </tr>
        <tr>
            <td><code>iat</code></td>
            <td>String</td>
            <td>Event published timestamp.</td>
        </tr>
        <tr>
            <td><code>jti</code></td>
            <td>String</td>
            <td>Unique identifier for the event.</td>
        </tr>
        <tr>
            <td><code>aud</code></td>
            <td>String</td>
            <td>Audience of the event.</td>
        </tr>
    </tbody>
    </table>

    Example security data object:

    ``` js
    {
    "iss": "Asgardeo",
    "jti": "3b69b103-fa6c-424a-bbf4-a974d0c2d2a3",
    "iat": 1659732032884,
    "aud": "https://websubhub/topics/myorg/REGISTRATIONS"
    }
    ```

- **Event Data** object - The event data object contains the details of the event (or the user action). Learn more about event data in the [Event data of {{ product_name }} events](#event-data-of-{{ product_name }}-events) section.

## Event data of {{ product_name }} events

This section describes all the {{ product_name }} events that can be published to Choreo and their respective event payloads.

### Login events

These are events related to login flows. The event data objects of login events are defined below.

#### **Login success event**

When a user successfully logs in to an application, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>Group reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
    <tr>
        <td><code>serviceProvider</code></td>
        <td>String</td>
        <td>Application name</td>
    </tr>
</tbody>
</table>

Example login success event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT",
   "serviceProvider": "My Account"
}
```

### User operation events

These are events related to user operations, profile updates and deletes. The event data objects of user operation events are defined below.

#### **User account lock event**

When a user account is locked, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example user account lock event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```

#### **User credential update event**

When a user's credentials are updated, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example User account Lock event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```

#### **User group update event**

When users are added or removed from a group, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>Group reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>groupId</code></td>
        <td>String</td>
        <td>Group id</td>
    </tr>
    <tr>
        <td><code>groupName</code></td>
        <td>String</td>
        <td>Group name</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
    <tr>
        <td><code>addedUsers</code></td>
        <td>List</td>
        <td>List of added user objects. User object contains userId & userName</td>
    </tr>
    <tr>
        <td><code>removedUsers</code></td>
        <td>List</td>
        <td>List of removed user objects. User object contains userId & userName</td>
    </tr>
</tbody>
</table>

Example user group update event payload:

``` js
{
   "ref": "https://api.asg.io/t/myorg/scim2/Groups/3b47e4f0-97d0-4b11-86b5-8150105ff32f",
   "organizationId": 3,
   "organizationName": "myorg",
   "groupId": "3b47e4f0-97d0-4b11-86b5-8150105ff32f",
   "groupName": "Grouphr",
   "userStoreName": "DEFAULT",
   "addedUsers": [
     {
       "userName": "tom@gmail.com",
       "userId": "05c86c29-6e06-4743-8014-0523abd5b6d8"
     },
     {
       "userName": "smith@gmail.com",
       "userId": "06405538-49be-46da-8d04-b38da91f56d0"
     }
   ],
   "removedUsers": [
     {
       "userName": "david@gmail.com",
       "userId": "22e46698-7fa7-4497-90fc-e12864e30b77"
     }
   ]
}
```

#### **User account unlock event**

When a user account is unlocked, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example User account Lock event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```

#### **User delete event**

When a user's account is deleted, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example User account lock event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```


### Registration events

These are events related to user registration flows. The event data object of registration events are defined below.

#### **Add user event**

When a user is added to the organization, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
    <tr>
        <td><code>userOnboardMethod</code></td>
        <td>String</td>
        <td>User onboarded method (Admin Initiated, User Invite, Self Sign Up)</td>
    </tr>
    <tr>
        <td><code>roleList</code></td>
        <td>List</td>
        <td>User's Assigned Roles</td>
    </tr>
     <tr>
        <td><code>claims</code></td>
        <td>Map</td>
        <td>User Claims</td>
    </tr>
</tbody>
</table>

Example add user event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT",
   "userOnboardMethod": "SELF_SIGNUP",
   "roleList": ["Internal/selfsignup"],
   "claims": {
       "http://wso2.org/claims/created":"2022-09-19T05:20:26.346Z",
       "http://wso2.org/claims/dob":"1996-12-08",
       "http://wso2.org/claims/country":"United Arab Emirates",
       "http://wso2.org/claims/emailaddress":"john@gmail.com",
       "http://wso2.org/claims/lastname":"Doe",
       "http://wso2.org/claims/givenname":"John"
   }
}
```

#### **Accept user invite event**

When a user accepts an invitation to an organization by setting a password for the account, an event with the following data object is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example accept user invite event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```

#### **Confirm self-signup event**

When a user completes account verification during self sign-up, an event with the following data is created.

<table>
<thead>
    <tr>
        <th><b>Property Name</b></th>
        <th><b>Type</b></th>
        <th><b>Description</b></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>ref</code></td>
        <td>String</td>
        <td>User reference (Scim location)</td>
    </tr>
    <tr>
        <td><code>organizationId</code></td>
        <td>int</td>
        <td>Organization Id</td>
    </tr>
    <tr>
        <td><code>organizationName</code></td>
        <td>String</td>
        <td>Organization name</td>
    </tr>
    <tr>
        <td><code>userId</code></td>
        <td>String</td>
        <td>User id</td>
    </tr>
    <tr>
        <td><code>userName</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>userStoreName</code></td>
        <td>String</td>
        <td>User Store name</td>
    </tr>
</tbody>
</table>

Example confirm self-signup event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "userStoreName": "DEFAULT"
}
```
