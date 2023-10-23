# Enabling REST Notifications For XACML Policy Updates

This topic provides instructions on how to enable notifications for
XACML policy changes.

1.  Register `           EntitlementNotificationListener          ` in
    order to get notifications on XACML policy changes. To do this, add
    the following entries to the
    `           <PRODUCT_HOME>/repository/conf/identity/entitlement.properties          `
    file.

    !!! note
    
        **Note** : If you already have a
        `           PAP.Status.Data.Handler.2          ` configured, then
        you must add this extension as
        `           PAP.Status.Data.Handler.3          ` .
    

    ``` java
    PAP.Status.Data.Handler.2=org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension
    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.1=pdpNotificationAction,ENABLE;DISABLE;UPDATE;DELETE
    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.2=papNotification,true
    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.3=pdpNotification,true
    ```

2.  Configure the
    `           <PRODUCT_HOME>/repository/conf/identity/msg-mgt.properties          `
    file with your desired destination configurations and template
    configurations. The following is a sample configuration for sending
    JSON content to an endpoint when there is a XACML policy change.

    ``` java
        module.name.1=json
        json.subscription.1=policyUpdate
        json.subscription.policyUpdate.jsonContentTemplate=/media/user/notification/templates/entitlement
        json.subscription.policyUpdate.endpoint.1=pepEndpoint1
        json.subscription.policyUpdate.endpoint.pepEndpoint1.address=https://localhost:9443/restEndpoint
        json.subscription.policyUpdate.endpoint.pepEndpoint1.AuthenticationRequired=true
        json.subscription.policyUpdate.endpoint.pepEndpoint1.username=admin
        json.subscription.policyUpdate.endpoint.pepEndpoint1.password=admin
        json.subscription.policyUpdate.jsonId=3232
    
        json.subscription.policyUpdate.endpoint.pepEndpoint1.address=https\://localhost\:9443/wso2/scim/Users
    ```

    The following table lists out the properties and their description
    (click on the table to scroll through the description).

    <table>
    <colgroup>
    <col style="width: 20%" />
    <col style="width: 80%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>               module.name.1=json              </code></td>
    <td>By defining this property we register the JSON sending module in the Notification-Mgt framework, so that the JSON sending module acts as a listener.</td>
    </tr>
    <tr class="even">
    <td><code>               json.subscription.1=policyUpdate              </code></td>
    <td><p>The first subscription by the email module is ' <code>                policyUpdate               </code> '. So when a policy change happens (update, create or delete) an event is triggered from the system. Using this configuration, the JSON module is made to subscribe for that particular event and send a REST call on events.</p>
    <p>This subscription is defined as <code>                policyUpdate               </code> (this value must be used since this is the name of the event that is published by the publishing party) and from this point onwards you must use <code>                email.subscription.policyUpdate               </code> as the prefix for properties relevant to this subscription.</p></td>
    </tr>
    <tr class="odd">
    <td><code>               json.subscription.policyUpdate.jsonContentTemplate=/media/user/notification/templates/entitlement              </code></td>
    <td><p>This is the template for the REST call. You can configure your template such that it has placeholders. These placeholders are replaced with dynamic values that come from the event or you can define values for these placeholders through your configurations.</p>
    <p>The following is a sample REST message with place holders.</p>
    <div class="panel" style="background-color: White;border-width: 1px;">
    <div class="panelContent" style="background-color: White;">
    <p>{"TargetID":"(targetId)","Username":"(username)", "Target":"(target)","Action":"(action)"}</p>
    </div>
    </div>
    <div class="admonition note">
               <p class="admonition-title">Note</p>
               <p> The dynamic data that comes to the <code>                policyUpdate               </code> event can be of the following types.</p>
        <p>    - operation<br />
               - targetId<br />
               - username<br />
               - target<br />
               - action</p> 
        </p>
    </div>
    </tr>
    <tr class="even">
    <td><code>               json.subscription.policyUpdate.endpoint.1=pepEndpoint1              </code></td>
    <td>This is the first endpoint definition for the <code>               policyUpdate              </code> event subscription. From this point onwards, you are defining properties that are relevant to this endpoint. You can define the name of the first endpoint as <code>               pepEndpoint1              </code> (provide any name). From this point onwards you must use <code>               email.subscription.userOperation.endpoint.pepEndpoint1              </code> as the prefix for properties relevant to this endpoint.</td>
    </tr>
    <tr class="odd">
    <td><code>               json.subscription.policyUpdate.endpoint.pepEndpoint1.address=                               https://localhost:9443/restEndpoint                             </code></td>
    <td>This is an endpoint configuration that is used to define the address to which the content will be posted.</td>
    </tr>
    <tr class="even">
    <td><code>               json.subscription.policyUpdate.endpoint.pepEndpoint1.AuthenticationRequired=true              </code></td>
    <td>This is an optional property that you can use to authenticate to the rest endpoint you are calling using basic auth. If you set this property to <code>               true              </code>, it is essential to have the username and password defined for your endpoint.</td>
    </tr>
    <tr class="odd">
    <td><code>               json.subscription.policyUpdate.endpoint.pepEndpoint1.username=admin              </code></td>
    <td>The username to access the endpoint.</td>
    </tr>
    <tr class="even">
    <td><code>               json.subscription.policyUpdate.endpoint.pepEndpoint1.password=admin              </code></td>
    <td>The password required to access the endpoint.</td>
    </tr>
    <tr class="odd">
    <td><code>json.subscription.policyUpdate.jsonId=3232</code></td>
    <td></td>
    </tr>
    <tr class="even">
    <td><code>json.subscription.policyUpdate.endpoint.pepEndpoint1.address=https\://localhost\:9443/wso2/scim/Users</code></td>
    <td>This is an endpoint configuration that is used to define the address to which the content will be posted.</td>
    </tr>
    </tbody>
    </table>
