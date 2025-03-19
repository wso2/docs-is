# Write a custom authentication script

Follow this guide to write a conditional authentication script from scratch and to understand its internals.

!!! note
    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
    - **ECMAScript Compliance**: Adaptive scripts currently comply with ECMAScript 2022 (ES13). 
    {% endif %}
    - **Limitations**: Adaptive scripts do not support loops, `Log.warn` logs, or stringifying Java objects using 
    `JSON.stringify()`.

## Scenario

Let's consider the following simplified set of requirements for your business application:

- User tries to log in to an application with **username and password** authentication.
- If the user belongs to the **manager** or **employee** group, they can access the application. Other users should not be allowed to access the application.

![Authentication flow with Group based Access control]({{base_path}}/assets/img/guides/conditional-auth/conditional-auth-flow-diagram-condition-flow.png)

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Customize the login flow in your application and enable `Username and Password` authentication.

- Create two user groups named `manager` and `employee` and assign user accounts to them. For instructions, see the following:

    - [Managing groups]({{base_path}}/guides/users/manage-groups/)
    - [Managing users]({{base_path}}/guides/users/manage-groups/)

## Start with the default script

To start off, [configure conditional authentication]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/) for your application and check the default script once you enable the two steps authentication.

```js
var onLoginRequest = function(context) {
    executeStep(1);
};
```
The above scripts do not have any conditional authentication. It allows all users to access the application after successful authentication through `username and password`.

## Implement onSuccess callback

Now, let's implement what happens when **username and password** authentication is successful. You can use the [onSuccess]({{base_path}}/references/conditional-auth/api-reference/) eventCallback.

```js
var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Implement what to do when Step 1 authentication is success.
        }
    });
};
```

## Get user object

If **username and password** authentication is successful, let's get the [user]({{base_path}}/references/conditional-auth/api-reference/#user) from the [context]({{base_path}}/references/conditional-auth/api-reference/#context). You can use `context.currentKnownSubject`.

```js
var groups = ['employee', 'manager'];

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting authenticated user from the first step.
            var user = context.currentKnownSubject;
        }
    });
};
```

## Check membership of the user

Now, let's check whether the user is a member of `manager` or `employee`. You can use the [isMemberOfAnyOfGroups(user, groups) utility function]({{base_path}}/references/conditional-auth/api-reference/#check-group-membership).

Refer the [inbuilt functions]({{base_path}}/references/conditional-auth/api-reference/#utility-functions) to get to know more existing functions.

```js
var groups = ['employee', 'manager'];

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting authenticated user from the first step.
            var user = context.currentKnownSubject;
            // Checking if the user is assigned to one of the given groups.
            var isMember = isMemberOfAnyOfGroups(user, groups);           
        }
    });
};
```

## Fail authentication

If the user is not a member, fail the authentication and redirect the user to the application with some error code.

```js
var groups = ['employee', 'manager'];
var errorCode = 'access_denied';
var errorMessage = 'You do not have access to login to this app';

var onLoginRequest = function (context) {
    executeStep(1, {
        onSuccess: function (context) {
            // Extracting authenticated user from the first step.
            var user = context.currentKnownSubject;
            // Checking if the user is assigned to one of the given groups.
            var isMember = isMemberOfAnyOfGroups(user, groups);
            if (!isMember) {
               fail({'errorCode': errorCode, 'errorMessage': errorMessage});
            }  
        }
    });
};
```

You have now written a conditional authentication script for the group-based access control scenario.

Similarly, you can build your own scripts to handle many scenarios using the [API references]({{base_path}}/references/conditional-auth/api-reference/).