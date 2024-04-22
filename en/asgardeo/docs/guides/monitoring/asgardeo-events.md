# Asgardeo events

Asgardeo triggers events corresponding to the various user interactions in your Asgardeo organization. You can configure Asgardeo to publish these events to WSO2's integration platform, [Choreo](https://wso2.com/choreo/){:target="_blank"}. From there, you can define custom business logic that can be executed when an event occurs.

Asgardeo publishes the following events under three main categories.

!!! Important
    All events published by Asgardeo are end-to-end encrypted until Choreo processes and decrypts them.


- <a href="#login-events">**Login events**</a> - Events related to login flows.

    - **[Login success event](#login-success-event)**: Published when a user successfully logs in to an application.

    - **[Login failed event](#login-success-event)**: Published when a user fails to log in to an application.

- <a href="#user-operation-events">**User operation events**</a> - Events related to user operations, profile updates, and account deletes.
    - **[User account lock event](#user-account-lock-event)**: Published when a user account is locked.

    - **[User credential update event](#user-credential-update-event)**: Published when a user's credentials are updated.

    - **[User group update event](#user-group-update-event)**: Published when users are added or removed from a group.

    - **[User account unlock event](#user-account-unlock-event)**: Published when a user account is unlocked.

    - **[User delete event](#user-delete-event)**: Published when a user's account is deleted.
  
- <a href="#registration-events">**Registration events**</a> - Events that occur during user registration flows.
    - **[Add user event](#add-user-event)**: Published when a user is added to the organization.

    - **[Accept user invite event](#accept-user-invite-event)**: Published when a user accepts an invitation to an organization.

    - **[Confirm self-signup event](#confirm-self-signup-event)**: Published when a user completes account verification during self-sign-up.

## Configure Asgardeo to publish events

Follow the steps below to configure event publishing for Asgardeo.

1. On the Asgardeo Console, go to **Monitoring** > **Events**.

2. Select the events that you wish to publish to Choreo and click **Update**.

    ![Asgardeo Console UI for events]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-ui.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! info
        Alternatively, you can invoke the **Event Configuration Management** API to configure event publishing. See the <a :href="$withBase('/apis/event-configuration/')">API Documentation</a> to learn more.

## Implement business use cases for Asgardeo events

Follow the steps below to define a business logic that will trigger when an Asgardeo event occurs.

### Prerequisite
- You need to have a Github repository to host the business logic.

- Download [Ballerina](https://ballerina.io/downloads/){:target="_blank"}, the programming language used to define business logic for Asgardeo events.


### Define the business logic

Let's set up a sample business use case such that whenever a <a href="#registration-events">registration event</a> is generated in Asgardeo, it gets logged in the Choreo console.

Follow the steps below to programmatically define the business logic.

1. Create a new Ballerina package. Learn how to do so in the [Ballerina documentation](https://ballerina.io/learn/get-started/){:target="_blank"}.

2. Navigate to the **Ballerina.toml** file and rename the organization name to that of your Asgardeo organization.

3. Navigate to your **main.bal** file and define the business logic.

    <div class="admonition note">
    <p class="admonition-title">New to Ballerina?</p>
    <p>Learn more about the **Asgardeo trigger** module and how to program business logic for different types of events in the <a href="https://central.ballerina.io/ballerinax/trigger.asgardeo/latest" target="_blank">Ballerina documentation</a>.</p>
    </div>


    The following is a sample code that logs the event in the Choreo console, when a registration event is generated in Asgardeo.

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

4. Commit your changes and push the code to your remote Github repository.


### Create a webhook in Choreo

Follow the steps below to create and deploy a webhook in Choreo.

1. Navigate to [Choreo](https://console.choreo.dev/login){:target="_blank"} and if you don't have one already, create an organization with the same name and email address you used to create your Asgardeo organization.

    !!! info
        Organizations in Asgardeo and Choreo synchronize based on their names.


2. Select a project from the **Project** dropdown.

3. Go to **Components**, and click **Create**.

4. Under the **Select a Type** tab, select **Webhook**. Learn more about webhooks in the Choreo [documentation](https://wso2.com/choreo/docs/develop/components/webhook/#develop-a-webhook){:target="_blank"}.

    ![Create a Webhook in Choreo]({{base_path}}/assets/img/guides/asgardeo-events/asgardeo-events-create-webhook-in-choreo.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a name and a description for your webhook.

5. Click **Authorize with Github** and connect the relevant organization, repository and the branch of the Github repository you created in the above section.

6. Select **Ballerina** to be the Buildpack and select the **Ballerina Project Directory** from your Github repository.

7. Select the **Access Mode** as External and click **Create**.

    ![Connect Github repository to Choreo]({{base_path}}/assets/img/guides/asgardeo-events/choreo-webhook-authorize-github.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

8. Follow the Choreo documentation and [deploy your webhook](https://wso2.com/choreo/docs/develop-components/develop-a-webhook/#step-2-deploy){:target="_blank"}.

    !!! note
        If the callback URL fails to populate, it is advised to manually copy the invoke URL and paste it into the designated field. This step ensures seamless continuity in the process.

### Try it out

Once the webhook is deployed in Choreo, follow the steps below to try it out.

1. Login to the Asgardeo Console and go to **User Management** > **Users**.

2. Click **Add User** and create a new user.

    !!! info
        Creating a new user triggers an **add user** event.

3. Go to the Choreo Console, and click **Observability** on the left navigation menu.

4. Find the **Logs** tab and filter for the logged add user event.

    ![Choreo logs for Asgardeo events]({{base_path}}/assets/img/guides/asgardeo-events/choreo-logs-for-asgardeo-events.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


## Payload of an Asgardeo event

The payload of an Asgardeo event that is sent to Choreo consists of the following data objects:
- **Security Data** object - The security data object is common to all Asgardeo events. This contains the following security metadata about the event.

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

- **Event Data** object - The event data object contains the details of the event (or the user action). Learn more about event data in the <a href="#event-data-of-asgardeo-events">Event data of Asgardeo events</a> section.

## Event data of Asgardeo events

This section describes all the Asgardeo events that can be published to Choreo and their respective event payloads.

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
        <td>Group reference (SCIM location)</td>
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
        <td><code>initiatorType</code></td>
        <td>String</td>
        <td>Initiator of the event.
        <ul>
        <li><code>admin</code> : Indicates that an administrative action initiated the event</li>
        <li><code>user</code> : Indicates that an end-user action initiated the event</li>
        </ul> </td>
    </tr>
     <tr>
        <td><code>action</code></td>
        <td>String</td>
        <td>Action taken by the initiator.
        <ul>
        <li><code>update</code> : Indicates a credential update.</li>
        <li><code>reset</code> : Indicates a credential reset; either initiated by the admin as a forced credential update request or by the user initiating a forgot password flow.</li>
        </ul></td>
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
    <tr>
        <td><code>authSteps</code></td>
        <td>List</td>
        <td>List of authentication steps used for log in. Each authentication step object contains the step number, identity provider and the name of the authenticator</td>
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
   "authSteps": [
    {
        "step": 1,
        "idp": "Google",
        "authenticator": "GoogleOIDCAuthenticator"
    }
    ]
}
```

#### **Login failed event**

When a user fails to log in to an application, an event with the following data is created.

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
        <td>Group reference (SCIM location)</td>
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
        <td><code>authenticatingUser</code></td>
        <td>String</td>
        <td>username</td>
    </tr>
    <tr>
        <td><code>serviceProvider</code></td>
        <td>String</td>
        <td>Application name</td>
    </tr>
    <tr>
        <td><code>failedStep</code></td>
        <td>Object</td>
        <td> The step at which the fail event occurred. Contains the step number, identity provider and the name of the authenticator</td>
    </tr>
</tbody>
</table>

Example login failed event payload:

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "authenticatingUser": "john@gmail.com",
   "serviceProvider": "My Account",
   "failedStep": {
        "step": 1,
        "idp": "Google",
        "authenticator": "GoogleOIDCAuthenticator"
    }
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
        <td>User reference (SCIM location)</td>
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

A user's credential (password) update event with the following data is generated when a user credential is updated by one of the methods below.

- an administrator resets them through the Console.
- an administrator forces a reset.
- the user changes them from the My Account self-service portal.
- the user initiates a forgot password sequence and updates them.

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
        <td>User reference (SCIM location)</td>
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

Example User credential update event payload:
Consider a scenario where an administrator resets the user credential through the Console.

``` js
{
   "ref": "https://asgardeo.io/t/myorg/scim2/Users/72774617-8dff-472e-90b5-67069d94d299",
   "organizationId": 3,
   "organizationName": "myorg",
   "userId": "72774617-8dff-472e-90b5-67069d94d299",
   "userName": "john@gmail.com",
   "initiatorType":"admin",
   "action":"update",
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
        <td>Group reference (SCIM location)</td>
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
        <td>User reference (SCIM location)</td>
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

Example User account unlock event payload:

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
        <td>User reference (SCIM location)</td>
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
        <td>User reference (SCIM location)</td>
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
        <td>User’s Assigned Roles</td>
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
        <td>User reference (SCIM location)</td>
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
        <td>User reference (SCIM location)</td>
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