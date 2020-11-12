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
- `PRE_UPDATE_CREDENTIAL`
- `POST_UPDATE_CREDENTIAL`
- `PRE_UPDATE_CREDENTIAL_BY_ADMIN`
- `POST_UPDATE_CREDENTIAL_BY_ADMIN`
- `PRE_DELETE_USER`
- `POST_DELETE_USER`
- `PRE_SET_USER_CLAIMS`
- `POST_SET_USER_CLAIMS`
- `PRE_GET_USER_CLAIM`
- `POST_GET_USER_CLAIMS`
- `POST_GET_USER_CLAIM`
- `PRE_DELETE_USER_CLAIMS`
- `POST_DELETE_USER_CLAIMS`
- `PRE_DELETE_USER_CLAIM`
- `POST_DELETE_USER_CLAIM`
- `PRE_ADD_ROLE`
- `POST_ADD_ROLE`
- `PRE_DELETE_ROLE`
- `POST_DELETE_ROLE`
- `PRE_UPDATE_ROLE`
- `POST_UPDATE_ROLE`
- `PRE_UPDATE_USER_LIST_OF_ROLE`
- `POST_UPDATE_USER_LIST_OF_ROLE`
- `PRE_UPDATE_ROLE_LIST_OF_USER`
- `POST_UPDATE_ROLE_LIST_OF_USER`
- `POST_REVOKE_ACESS_TOKEN`
- `POST_REVOKE_CODE`
- `POST_REVOKE_ACESS_TOKEN_BY_ID`
- `POST_REVOKE_CODE_BY_ID`
- `POST_REFRESH_TOKEN`
- `POST_ISSUE_CODE`
- `POST_ISSUE_ACCESS_TOKEN`
- `SESSION_CREATE`
- `SESSION_UPDATE`
- `SESSION_EXPIRE`
- `SESSION_TERMINATE`
- `TRIGGER_NOTIFICATION`
- `UPDATE_GOVERNANCE_CONFIGURATION`


## Writing an event handler

To write a new event handler, you must extend the `org.wso2.carbon.identity.event.handler.AbstractEventHandler`. 

1. Override the `getName()` method to set the name for the event handler and the `getPriority()` method can be used to set the priory of the event handler. The handlers will be executed based on the priority.

    ```
    public String getName() {
    return "emailSender";
    }

    @Override
    public int getPriority(MessageContext messageContext) {
        return 50;
    }
    ```

2. To execute the expected operation, override the `handleEvent()` method. The `event.getEventProperties()` method can be used to get the parameters related to the user operations. 

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
name= "emailSender"
subscriptions =["POST_ADD_USER"]
```

When you want to execute an operation related to an event, publish the event. Then, the handler that is subscribed for the relevant events will be used to execute those events. In the sample configuration given above, the `emailSender` handler is subscribed to the `POST_ADD_USER` operation.

!!! info
    The following sample event handlers are available with WSO2 Identity Server.

    - [UserEmailVerificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserEmailVerificationHandler.java)

    - [AccountConfirmationValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AccountConfirmationValidationHandler.java)

    - [AdminForcedPasswordResetHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AdminForcedPasswordResetHandler.java)

    - [UserSelfRegistrationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserSelfRegistrationHandler.java)

    - [PasswordHistoryValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.history/src/main/java/org/wso2/carbon/identity/password/history/handler/PasswordHistoryValidationHandler.java)

    - [PasswordPolicyValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.policy/src/main/java/org/wso2/carbon/identity/password/policy/handler/PasswordPolicyValidationHandler.java)

    - [AccountSuspensionNotificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.account.suspension.notification.task/src/main/java/org/wso2/carbon/identity/account/suspension/notification/task/handler/AccountSuspensionNotificationHandler.java)
