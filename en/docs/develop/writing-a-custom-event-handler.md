# Writing a Custom Event Handler

The WSO2 Identity Server eventing framework can be used to trigger events such as user operation events like `PRE_SET_USER_CLAIMS`,`POST_ADD_USER`. A full list of the sample events can be found below. The eventing framework also supports handlers which can be used to do operations upon a triggered event. For instance, an event handler can be used to validate the changed user password against previously used entries when a `PRE_UPDATE_CREDENTIAL` event is triggered. 

## What is an event handler?

An event handler is used to perform an operation based on the published events. 

For instance, an event handler can be used to send an email after a user addition. The following sequence of operations are executed while adding a user.

1. Publish the `PRE_ADD_USER` event — The subscribed handlers will be executed for the pre-add user event.
2. Execute the `AddUser` operation — The user will be persisted to the user store (LDAP or JBDC user store).
3. Publish the `POST_ADD_USER` event — The subscribed handlers will be executed for the post-add user event.

Therefore, the email can be sent through an event handler that is subscribed to the `POST_ADD_USER` event.

The following list is a list of sample events. 

- `AUTHENTICATION_STEP_SUCCESS`
- `AUTHENTICATION_STEP_FAILURE`
- `AUTHENTICATION_SUCCESS`
- `AUTHENTICATION_FAILURE`
- `PRE_AUTHENTICATION`
- `POST_AUTHENTICATION`
- `PRE_SET_USER_CLAIMS`
- `POST_SET_USER_CLAIMS`
- `PRE_ADD_USER`
- `POST_ADD_USER`

!!! info
    The other events available with WSO2 Identity Server can be found from the `Event` class [here](https://github.com/wso2/carbon-identity-framework/blob/master/components/identity-event/org.wso2.carbon.identity.event/src/main/java/org/wso2/carbon/identity/event/IdentityEventConstants.java)


## Writing an event handler

To write a new event handler, you must extend the `org.wso2.carbon.identity.event.handler.AbstractEventHandler`. 

1. Override the `getName()` method to set the name for the event handler and the `getPriority()` method can be used to set the priory of the event handler. The handlers will be executed based on the priority.

    ```
    public String getName() {
    return "customEventHandler";
    }

    @Override
    public int getPriority(MessageContext messageContext) {
        return 50;
    }
    ```

2. To execute the expected operation, override the `handleEvent()` method. The `event.getEventProperties()` method can be used to get the parameters related to the user operations. 
   The `handleEvent()` method should be called from the relevant method, which is written to execute a certain operation and the handlers will be executed once the operation is triggered.
    ```
    @Override
    public void handleEvent(Event event) throws IdentityEventException {

    Map<String, Object> eventProperties = event.getEventProperties();
    String userName = (String) eventProperties.get(IdentityEventConstants.EventProperty.USER_NAME);
    UserStoreManager userStoreManager = (UserStoreManager) eventProperties.get(IdentityEventConstants.EventProperty.USER_STORE_MANAGER);

    String tenantDomain = (String) eventProperties.get(IdentityEventConstants.EventProperty.TENANT_DOMAIN);
    String domainName = userStoreManager.getRealmConfiguration().getUserStoreProperty(UserCoreConstants.RealmConfig.PROPERTY_DOMAIN_NAME);

    String[] roleList = (String[]) eventProperties.get(IdentityEventConstants.EventProperty.ROLE_LIST);
    ```

## Registering the event handler 

Register the event handler in the service component as follows.

```
protected void activate(ComponentContext context) {
    try {
        BundleContext bundleContext = context.getBundleContext();
        bundleContext.registerService(AbstractEventHandler.
class.getName(),new SampleEventHandler(), null);
    } catch (Exception e) {
       ...
    }
```

## Configuring the event handler

Add the event handler configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. The events that need to subscribe to the handler can be listed in subscriptions.

```
[[event_handler]]
name= "customEventHandler"
subscriptions =["CUSTOM_EVENT"]
```

When you want to execute an operation related to an event, publish the event. Then, the handler that is subscribed for the relevant events will be used to execute those events. In the sample configuration given above, the `customEventHandler` handler is subscribed to the `CUSTOM_EVENT` operation.

!!! info
    The following sample event handlers are available with WSO2 Identity Server.

    - [UserEmailVerificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserEmailVerificationHandler.java)

    - [AccountConfirmationValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AccountConfirmationValidationHandler.java)

    - [AdminForcedPasswordResetHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AdminForcedPasswordResetHandler.java)

    - [UserSelfRegistrationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserSelfRegistrationHandler.java)

    - [PasswordHistoryValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.history/src/main/java/org/wso2/carbon/identity/password/history/handler/PasswordHistoryValidationHandler.java)

    - [PasswordPolicyValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.policy/src/main/java/org/wso2/carbon/identity/password/policy/handler/PasswordPolicyValidationHandler.java)

    - [AccountSuspensionNotificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.account.suspension.notification.task/src/main/java/org/wso2/carbon/identity/account/suspension/notification/task/handler/AccountSuspensionNotificationHandler.java)
