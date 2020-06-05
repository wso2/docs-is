# Writing a Custom Event Handler

The WSO2 Identity Server eventing framework can be used to trigger some events such as user operations. The eventing framework also supports handlers which can be used to do some operations based on the published events.

## What is an event handler?

An event handler is used to perform an operation based on the published events. 

For instance, an event handler can be used to send an email after a user addition. The following sequence of operations are executed while adding a user.

1. Publish the `PRE_ADD_USER` event — The subscribed handlers will be executed for the pre-add user event.
2. Execute the `AddUser` operation — The user will be persisted to the user store (LDAP or JBDC user store).
3. Publish the `POST_ADD_USER` event — The subscribed handlers will be executed for the post-add user event.

Therefore, the email can be sent through an event handler that is subscribed to the `POST_ADD_USER` event.

The following list is a list of sample events. 

- PRE_AUTHENTICATION
- POST_AUTHENTICATION
- PRE_SET_USER_CLAIMS
- POST_SET_USER_CLAIMS
- PRE_ADD_USER
- POST_ADD_USER
- PRE_UPDATE_CREDENTIAL
- POST_UPDATE_CREDENTIAL
- PRE_UPDATE_CREDENTIAL_BY_ADMIN
- POST_UPDATE_CREDENTIAL_BY_ADMIN
- PRE_DELETE_USER
- POST_DELETE_USER
- PRE_SET_USER_CLAIM
- PRE_GET_USER_CLAIM
- POST_GET_USER_CLAIMS
- POST_GET_USER_CLAIM
- POST_SET_USER_CLAIM
- PRE_DELETE_USER_CLAIMS
- POST_DELETE_USER_CLAIMS
- PRE_DELETE_USER_CLAIM
- POST_DELETE_USER_CLAIM
- PRE_ADD_ROLE
- POST_ADD_ROLE
- PRE_DELETE_ROLE
- POST_DELETE_ROLE
- PRE_UPDATE_ROLE
- POST_UPDATE_ROLE
- PRE_UPDATE_USER_LIST_OF_ROLE
- POST_UPDATE_USER_LIST_OF_ROLE
- PRE_UPDATE_ROLE_LIST_OF_USER
- POST_UPDATE_ROLE_LIST_OF_USER
- UPDATE_GOVERNANCE_CONFIGURATION
- TRIGGER_NOTIFICATION

## Writing an event handler

To write a new event handler, you must extend the `org.wso2.carbon.identity.event.handler.AbstractEventHandler`. 

1. Initialize the events in the [Events class](https://github.com/wso2/carbon-identity-framework/blob/0cdd0641a6dd4ece47c79ada5acc05a5d7f9bbe0/components/identity-event/org.wso2.carbon.identity.event/src/main/java/org/wso2/carbon/identity/event/IdentityEventConstants.java#L47) as follows.

    ```
    public static final String PRE_SET_EVENT = "PRE_SET_EVENT";
    public static final String POST_SET_EVENT = "POST_SET_EVENT";
    ```

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

3. To execute the expected operation, override the `handleEvent()` method. The `event.getEventProperties()` method can be used to get the parameters related to the user operations. 

    ```
    @Override
    public void handleEvent(Event event) throws IdentityEventException {
    Map<String, Object> eventProperties =event.getEventProperties();
    String userName = (String) eventProperties.get(IdentityEventConstants.EventProperty.USER_NAME);
    UserStoreManager userStoreManager = (UserStoreManager) eventProperties.get(IdentityEventConstants.EventProperty.USER_STORE_MANAGER);
    String tenantDomain = (String) eventProperties.get(IdentityEventConstants.EventProperty.TENANT_DOMAIN);
    String domainName = userStoreManager.getRealmConfiguration().getUserStoreProperty(UserCoreConstants.RealmConfig.PROPERTY_DOMAIN_NAME);
    String eventName = event.getEventName();
    if (IdentityEventConstants.Event.PRE_SET_EVENT.equals(eventName)) {//Do the operation on PRE_SET_EVENT.}
    if(IdentityEventConstants.Event.POST_SET_EVENT.equals(eventName)) {//Do the operation on POST_SET_EVENT.}
    }
    ```

## Using the event handler to perform an operation

Write a method within the product runtime(in an already deployed class file) to trigger an event. In the method, you can publish an event along with event properties such as `USER_NAME`, `TENANT_DOMAIN`, and `USER_STORE_DOMAIN` as shown in the following code block via the `handleEvent()` method in the eventing framework.

```
private void triggerSampleEvent (User user, ... ,String eventName)  
          throws IdentityRecoveryException {

   HashMap<String, Object> properties = new HashMap<>();
  
   properties.put(IdentityEventConstants.EventProperty.USER_NAME, user.getUserName());
   properties.put(IdentityEventConstants.EventProperty.
TENANT_DOMAIN, user.getTenantDomain());
   properties.put(IdentityEventConstants.EventProperty.
USER_STORE_DOMAIN, user.getUserStoreDomain());
  
   Event sampleEvent = new Event(eventName, properties);
   try {
     IdentityRecoveryServiceDataHolder.getInstance(). getIdentityEventService().handleEvent(sampleEvent);
   } catch (IdentityEventException e) {
     throw Utils.handleServerException(ERROR_CODE_TRIGGER_EVENT, e);
}
```

The `handleEvent()` method in the handler class will check for the published event and execute the operation accordingly.

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
name= "customEvent"
subscriptions =["PRE_SET_EVENT","POST_SET_EVENT"]
```

When you want to execute an operation related to an event, publish the event. Then, the handler that is subscribed for the relevant events will be used to execute those events. In the sample configuration given above, the `customEvent` handler is subscribed to `PRE_SET_EVENT` and `POST_SET_EVENT` operations.

!!! info
    The following sample event handlers are available with WSO2 Identity Server.

    - [UserEmailVerificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserEmailVerificationHandler.java)

    - [AccountConfirmationValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AccountConfirmationValidationHandler.java)

    - [AdminForcedPasswordResetHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/AdminForcedPasswordResetHandler.java)

    - [UserSelfRegistrationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.recovery/src/main/java/org/wso2/carbon/identity/recovery/handler/UserSelfRegistrationHandler.java)

    - [PasswordHistoryValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.history/src/main/java/org/wso2/carbon/identity/password/history/handler/PasswordHistoryValidationHandler.java)

    - [PasswordPolicyValidationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.password.policy/src/main/java/org/wso2/carbon/identity/password/policy/handler/PasswordPolicyValidationHandler.java)

    - [AccountSuspensionNotificationHandler](https://github.com/wso2-extensions/identity-governance/blob/master/components/org.wso2.carbon.identity.account.suspension.notification.task/src/main/java/org/wso2/carbon/identity/account/suspension/notification/task/handler/AccountSuspensionNotificationHandler.java)
