# Migrating Data Publishers

In prior versions of WSO2 Identity Server, data publishers were
implementations of the
[AbstractAuthenticationDataPublisher](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AbstractAuthenticationDataPublisher.java)
which were invoked iteratively by the
[AuthnDataPublisherProxy](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AuthnDataPublisherProxy.java)
when a session changes, such that the data publishers send events to
their corresponding destinations. From WSO2 Identity Server 5.8.0
onwards, all data publishers have been migrated to act as event handlers
that subscribe to authentication events.

One of the main reasons for this is because the current implementation
causes the _DASSessionDataPublisherImpl, AuthenticationAuditLogger_ and
_DASLoginDataPublisherImpl_ classes to unnecessarily implement all the
methods of the
[AbstractAuthenticationDataPublisher](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AbstractAuthenticationDataPublisher.java). 
This change provides the capability for the data publishers to
subscribe only to the relevant events of interest and act upon them.

The new design approach is as follows:

-   When a session changes, the identity-framework publishes an event to
    the `AuthnDataPublisherProxy`.

-   `AuthnDataPublisherProxy` uses the `IdentityEventService` in
    the identity framework to invoke corresponding handlers to handle
    the event.

-   These event handlers extend the
    [AbstractEventHandler](https://github.com/wso2/carbon-identity-framework/blob/master/components/identity-event/org.wso2.carbon.identity.event/src/main/java/org/wso2/carbon/identity/event/handler/AbstractEventHandler.java)
    and override its `handleEvent` method.

The following diagrams illustrate the difference between the design
approach in the versions prior to WSO2 IS 5.8.0 and the new design approach.

-   **Old design approach**
    ![<Old design approach>](../assets/img/setup/old-design-approach.png)
-   **New design approach**
    ![<New design approach>](../assets/img/setup/new-design-approach.png)


The following section will guide you through migrating an existing data publisher to
an event handler.

## Migrating data publisher to event handler

For the purposes of demonstrating this using an example, the steps given
in this tutorial demonstrate deprecating the
[DASSessionDataPublisherImpl](https://github.com/wso2-support/identity-data-publisher-authentication/blob/support-5.1.7/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/impl/DASSessionDataPublisherImpl.java)
and migrating it to use the
[AnalyticsSessionDataPublishHandler](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/AnalyticsSessionDataPublishHandler.java)
instead.

1.  If you have enabled `org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl`
    in `<OLD_IS_HOME>/repository/conf/identity.xml` do not enable it in
    the WSO2 Identity Server 5.11.0 configurations. Simply, skip
    migrating this particular configuration and it will disable the old
    event listener.
    
    !!! note 
        For the new configuration model introduced from WSO2 Identity Server onwards, see 
        [New Configuration Model](../../references/new-configuration-model) for more information.
        
        If you already have a [WSO2 subscription](https://wso2.com/subscription), reach out to our support team through 
        your [support account](https://support.wso2.com/jira/secure/Dashboard.jspa) for assiatance.

2.  In order to support backward compatibility, override the `isEnabled`
    method in the event handler class that extends the
    `AbstractEventHandler`, such that if the listener property is not
    defined in the `deployment.toml` (previously in `identity.xml`) it
    will return false.

    ``` java
        @Override
        public boolean isEnabled(MessageContext messageContext) {
           IdentityEventListenerConfig identityEventListenerConfig = IdentityUtil.readEventListenerProperty
                   (AbstractIdentityMessageHandler.class.getName(), this.getClass().getName());
    
           if (identityEventListenerConfig == null) {
               return false;
           }
    
           return Boolean.parseBoolean(identityEventListenerConfig.getEnable());
        }
    ```

3.  To enable the new event handler, add handler and relevant property
    to the `deployment.toml` file found in the 
    `<NEW_IS_HOME>/repository/conf` folder. For example, following
    property is added to enable the
    [AnalyticsSessionDataPublishHandler](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/AnalyticsSessionDataPublishHandler.java)
    .

    ``` toml
    [identity_mgt.events.schemes.analyticsSessionDataPublisher.properties]
    enable = true
    ```
    
    !!! note 
        For more information on new configurations, see 
        [New Configuration Model](../../references/new-configuration-model).

4.  Add the following method to the event handler in order to verify
    that the handler is enabled properly. Adjust the code according to
    the relevant handler.

    ``` java
        private boolean isAnalyticsSessionDataPublishingEnabled(Event event) throws IdentityEventException {
    
           boolean isEnabled = false;
    
           String handlerEnabled = this.configs.getModuleProperties().getProperty(SessionDataPublisherConstants.
                   ANALYTICS_SESSION_DATA_PUBLISHER_ENABLED);
           isEnabled = Boolean.parseBoolean(handlerEnabled);
    
           return isEnabled;
        }
    ```

5.  One of the main reasons to deprecate the implementation of data
    publishers is that these data publishers override all the methods of
    `           AbstractAuthenticationDataPublisher          ` . Due to
    this redundancy, this implementation has been changed such that
    these publishers get subscribed only to their relevant event. Adjust
    the implementation accordingly as shown in the example below.

    ``` java
        @Override
        public void publishAuthenticationStepSuccess(HttpServletRequest request, AuthenticationContext context,
                                                    Map<String, Object> params) {
           // This method is overridden to do nothing since this is a session data publisher.
        }
    
        @Override
        public void publishAuthenticationStepFailure(HttpServletRequest request, AuthenticationContext context,
                                                    Map<String, Object> params) {
           // This method is overridden to do nothing since this is a session data publisher.
        }
    
        @Override
        public void publishAuthenticationSuccess(HttpServletRequest request, AuthenticationContext context, Map<String,
               Object> params) {
           // This method is overridden to do nothing since this is a session data publisher.
        }
    
        @Override
        public void publishAuthenticationFailure(HttpServletRequest request, AuthenticationContext context, Map<String,
               Object> params) {
           // This method is overridden to do nothing since this is a session data publisher.
        }
    
        @Override
        public void doPublishAuthenticationStepSuccess(AuthenticationData authenticationData) {
           // This method is not implemented since there is no usage of it in session publishing
        }
    
        @Override
        public void doPublishAuthenticationStepFailure(AuthenticationData authenticationData) {
           // This method is not implemented since there is no usage of it in session publishing
        }
    
        @Override
        public void doPublishAuthenticationSuccess(AuthenticationData authenticationData) {
           // This method is not implemented since there is no usage of it in session publishing
        }
    
        @Override
        public void doPublishAuthenticationFailure(AuthenticationData authenticationData) {
           // This method is not implemented since there is no usage of it in session publishing
        }
    
        @Override
        public void doPublishSessionCreation(SessionData sessionData) {
           if (LOG.isDebugEnabled()) {
               LOG.debug("Publishing session creation to DAS");
           }
           publishSessionData(sessionData, AuthPublisherConstants.SESSION_CREATION_STATUS);
        }
    
        @Override
        public void doPublishSessionTermination(SessionData sessionData) {
           if (LOG.isDebugEnabled()) {
               LOG.debug("Publishing session termination to DAS");
           }
           publishSessionData(sessionData, AuthPublisherConstants.SESSION_TERMINATION_STATUS);
    
        }
    
        @Override
        public void doPublishSessionUpdate(SessionData sessionData) {
           if (LOG.isDebugEnabled()) {
               LOG.debug("Publishing session update to DAS");
           }
           publishSessionData(sessionData, AuthPublisherConstants.SESSION_UPDATE_STATUS);
        }
    ```

6.  Override the `           handleEvent          ` method as seen in
    the example below.  
    For example, as seen in the implementation of the
    [DASSessionDataPublisherImpl](https://github.com/wso2-support/identity-data-publisher-authentication/blob/support-5.1.7/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/impl/DASSessionDataPublisherImpl.java)
    shown above, it publishes data only for the following three events.

    -   Session Create

    -   Session Terminate

    -   Session Update

    This means that the the event handler written for this data
    publisher should only handle the events mentioned above. Therefore,
    the
    [AnalyticsSessionDataPublishHandler](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/AnalyticsSessionDataPublishHandler.java)
    is implemented to override the `           handleEvent          `
    method as follows.

    ``` java
        @Override
        public void handleEvent(Event event) throws IdentityEventException {
    
           boolean isEnabled = isAnalyticsSessionDataPublishingEnabled(event);
    
           if (!isEnabled) {
               return;
           }
    
           SessionData sessionData = SessionDataPublisherUtil.buildSessionData(event);
           if (IdentityEventConstants.EventName.SESSION_CREATE.name().equals(event.getEventName())) {
               doPublishSessionCreation(sessionData);
           } else if (IdentityEventConstants.EventName.SESSION_TERMINATE.name().equals(event.getEventName())) {
               doPublishSessionTermination(sessionData);
           } else if (IdentityEventConstants.EventName.SESSION_UPDATE.name().equals(event.getEventName())) {
               doPublishSessionUpdate(sessionData);
           } else {
               LOG.error("Event " + event.getEventName() + " cannot be handled");
           }
        }
    ```

    !!! note
        As shown above, in order to invoke the corresponding publishing
        method, you must first verify whether the handler is enabled or not.
        The `            buildSessionData           ` method of the
        [SessionDataPublisherUtil](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/SessionDataPublisherUtil.java)
        is introduced to create a session data object to populate the
        payload of the relevant event.

7.  Next, populate the event payload of the event handler and publish it
    to the Analytics Engine. In this example, similar to the
    implementation of the
    [DASSessionDataPublisherImpl](https://github.com/wso2-support/identity-data-publisher-authentication/blob/support-5.1.7/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/impl/DASSessionDataPublisherImpl.java)
    , the event payload of the
    [AnalyticsSessionDataPublishHandler](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/AnalyticsSessionDataPublishHandler.java)
    is populated and published. The final implementation of the
    [AnalyticsSessionDataPublishHandler](https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.authentication.analytics.session/src/main/java/org/wso2/carbon/identity/data/publisher/authentication/analytics/session/AnalyticsSessionDataPublishHandler.java)
    class is as follows.

    ``` java
        public class AnalyticsSessionDataPublishHandler extends AbstractEventHandler {
    
           private static final Log LOG = LogFactory.getLog(AnalyticsSessionDataPublishHandler.class);
    
           @Override
           public String getName() {
    
               return SessionDataPublisherConstants.ANALYTICS_SESSION_PUBLISHER_NAME;
           }
    
           @Override
           public void handleEvent(Event event) throws IdentityEventException {
    
               boolean isEnabled = isAnalyticsSessionDataPublishingEnabled(event);
    
               if (!isEnabled) {
                   return;
               }
    
               SessionData sessionData = SessionDataPublisherUtil.buildSessionData(event);
               if (IdentityEventConstants.EventName.SESSION_CREATE.name().equals(event.getEventName())) {
                   doPublishSessionCreation(sessionData);
               } else if (IdentityEventConstants.EventName.SESSION_TERMINATE.name().equals(event.getEventName())) {
                   doPublishSessionTermination(sessionData);
               } else if (IdentityEventConstants.EventName.SESSION_UPDATE.name().equals(event.getEventName())) {
                   doPublishSessionUpdate(sessionData);
               } else {
                   LOG.error("Event " + event.getEventName() + " cannot be handled");
               }
           }
    
           protected void doPublishSessionCreation(SessionData sessionData) {
    
               publishSessionData(sessionData, SessionDataPublisherConstants.SESSION_CREATION_STATUS);
           }
    
           protected void doPublishSessionTermination(SessionData sessionData) {
    
               publishSessionData(sessionData, SessionDataPublisherConstants.SESSION_TERMINATION_STATUS);
    
           }
    
           protected void doPublishSessionUpdate(SessionData sessionData) {
    
               publishSessionData(sessionData, SessionDataPublisherConstants.SESSION_UPDATE_STATUS);
           }
    
           protected void publishSessionData(SessionData sessionData, int actionId) {
    
               SessionDataPublisherUtil.updateTimeStamps(sessionData, actionId);
               try {
                   Object[] payloadData = createPayload(sessionData, actionId);
                   publishToAnalytics(sessionData, payloadData);
    
               } catch (IdentityRuntimeException e) {
                   if (LOG.isDebugEnabled()) {
                       LOG.error("Error while publishing session information", e);
                   }
               }
    
           }
    
           private void publishToAnalytics(SessionData sessionData, Object[] payloadData) {
    
               String[] publishingDomains = (String[]) sessionData.getParameter(AuthPublisherConstants.TENANT_ID);
               if (publishingDomains != null && publishingDomains.length > 0) {
                   try {
                       FrameworkUtils.startTenantFlow(MultitenantConstants.SUPER_TENANT_DOMAIN_NAME);
                       for (String publishingDomain : publishingDomains) {
                           Object[] metadataArray = AuthnDataPublisherUtils.getMetaDataArray(publishingDomain);
                           org.wso2.carbon.databridge.commons.Event event =
                                   new org.wso2.carbon.databridge.commons.Event(SessionDataPublisherConstants.
                                           SESSION_DATA_STREAM_NAME, System.currentTimeMillis(),
                                           metadataArray, null, payloadData);
                           SessionDataPublishServiceHolder.getInstance().getPublisherService().publish(event);
                           if (LOG.isDebugEnabled() && event != null) {
                               LOG.debug("Sending out to publishing domain:" + publishingDomain + " \n event : "
                                       + event.toString());
                           }
                       }
                   } finally {
                       FrameworkUtils.endTenantFlow();
                   }
               }
           }
    
           private Object[] createPayload(SessionData sessionData, int actionId) {
    
               Object[] payloadData = new Object[15];
               payloadData[0] = AuthnDataPublisherUtils.replaceIfNotAvailable(AuthPublisherConstants.CONFIG_PREFIX +
                       AuthPublisherConstants.SESSION_ID, sessionData.getSessionId());
               payloadData[1] = sessionData.getCreatedTimestamp();
               payloadData[2] = sessionData.getUpdatedTimestamp();
               payloadData[3] = sessionData.getTerminationTimestamp();
               payloadData[4] = actionId;
               payloadData[5] = AuthnDataPublisherUtils.replaceIfNotAvailable(AuthPublisherConstants.CONFIG_PREFIX +
                       AuthPublisherConstants.USERNAME, sessionData.getUser());
               payloadData[6] = AuthnDataPublisherUtils.replaceIfNotAvailable(AuthPublisherConstants.CONFIG_PREFIX +
                       AuthPublisherConstants.USER_STORE_DOMAIN, sessionData.getUserStoreDomain());
               payloadData[7] = sessionData.getRemoteIP();
               payloadData[8] = AuthPublisherConstants.NOT_AVAILABLE;
               payloadData[9] = sessionData.getTenantDomain();
               payloadData[10] = sessionData.getServiceProvider();
               payloadData[11] = sessionData.getIdentityProviders();
               payloadData[12] = sessionData.isRememberMe();
               payloadData[13] = sessionData.getUserAgent();
               payloadData[14] = System.currentTimeMillis();
    
               if (LOG.isDebugEnabled()) {
                   LOG.debug("The created payload :" + Arrays.asList(payloadData));
               }
               return payloadData;
           }
    
           @Override
           public boolean isEnabled(MessageContext messageContext) {
               IdentityEventListenerConfig identityEventListenerConfig = IdentityUtil.readEventListenerProperty
                       (AbstractIdentityMessageHandler.class.getName(), this.getClass().getName());
    
               if (identityEventListenerConfig == null) {
                   return false;
               }
    
               return Boolean.parseBoolean(identityEventListenerConfig.getEnable());
           }
    
           private boolean isAnalyticsSessionDataPublishingEnabled(Event event) throws IdentityEventException {
    
               boolean isEnabled = false;
    
               String handlerEnabled = this.configs.getModuleProperties().getProperty(SessionDataPublisherConstants.
                       ANALYTICS_SESSION_DATA_PUBLISHER_ENABLED);
               isEnabled = Boolean.parseBoolean(handlerEnabled);
    
               return isEnabled;
           }
        }
    ```

8.  Register the service to the OSGi runtime using the following code.

    ``` java
        BundleContext bundleContext = context.getBundleContext();
        bundleContext.registerService(AbstractEventHandler.class, new AnalyticsSessionDataPublishHandler(), null);
    ```
