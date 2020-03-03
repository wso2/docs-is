# Sending Notifications to External PEP Endpoints

You can register external PEP Endpoints in the WSO2 Identity Server. The
Identity Server sends cache invalidation notifications (JSON, XML,
EMAIL) to the pre-configured external PEP endpoints. Basic
authentication will be used as the [authentication
mechanism](../../learn/configuring-local-and-outbound-authentication-for-a-service-provider)
.

This topic describes how you can enable the XACML engine to send
invalidation notifications to these external PEP endpoints when there is
a policy update or a change in user roles, permissions or
attributes. This also clears the internal cache when user roles,
permissions or attributes are updated.

1.  If you are using EMAIL as the notification method, enable the email
    sending configurations of the WSO2 Identity Server as explained
    [here](../../setup/configuring-email-sending).

2.  Create an email template in
    `           <carbon-home>/repository/conf/email          ` directory
    as shown below. Use this template path in the below configurations.
    Here, `           entitlement-email-config.xml          ` is a
    sample template which contains the below code part.

    ``` java
    Hi {username},
    
    XACML PDP policy store has been changed..
    
    Policy Id : {targetId}
    Action : {action}
    Policy : {target}
    
    Best Regards,
    http://xacmlinfo.org
    ```

3.  To send notifications to external endpoints when
    there is a policy change, add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ``` toml
    [identity.entitlement.policy_point.pap]
    status_data_handlers = ["org.wso2.carbon.identity.entitlement.SimplePAPStatusDataHandler"] 
    ```

4.  Additionally, add the following to the
    `           deployment.toml         ` file and change
    accordingly. If you are sending notifications via email, use this
    and change the recipient email address.

    ``` toml
    #org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.1=notificationType,JSON
    #org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.1=notificationType,XML
    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.1=notificationType,EMAIL

    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.2=ignoreServerVerification,true

    #org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.3=targetUrl,http://targetUrlAddress;username;password
    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.3=emailAddress,wso2demomail@gmail.com

    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.4=pdpNotificationAction,ENABLE;DISABLE;UPDATE;DELETE

    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.5=papNotification,true

    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.6=pdpNotification,true

    org.wso2.carbon.identity.entitlement.EntitlementNotificationExtension.9=roleName, admin
    ```

    The following table lists out and describes the above attributes.

    | Attribute                                               | Description                                                                                                                                                                                                                                                                                                                                                         |
    |---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | `               notificationType              `         | This is the type of the notification supported by the module. This can be EMAIL, XML or JSON.                                                                                                                                                                                                                                                                       |
    | `               pdpNotification              `          | This attribute is for PDP notifications. This specifies whether a notification must be sent for PDP policy store changes. By default, this is enabled, but if you want to disable the policy configurations, you can disable it by configuring this property                                                                                                        |
    | `               pdpNotificationAction              `    | This attribute is for PDP notification actions. This enables notifications for specified actions. There are four actions and you can define multiple actions using the semicolon. For example, ENABLE;DISABLE;UPDATE;DELETE. By default, notifications are sent to all type of changes, but if you want to limit it, you can configure this attribute.              |
    | `               papNotification              `          | This identifies whether a notification must be sent for PAP policy store changes. By default this is disabled and you can enable it by configuring this property.                                                                                                                                                                                                   |
    | `               targetUrl              `                | The target URL is written as "target url;username;password". The ";" symbol is used as the separator.                                                                                                                                                                                                                                                               |
    | `               roleName              `                 | This attribute represents the user group. If the EMAIL notification type is used and Target URL is not defined, you can define the user group that the email must be sent to using this attribute. For example, you can use this if you need to send the email to all the members of the Administrator group.                                                       |
    | `               ignoreServerVerification              ` | This is related to SSL verification configuration. This attribute is responsible for the decision on whether to ignore or validate SSL verification for the endpoint URL, if XML and JSON are the notification types used.                                                                                                                                          |
    | `               emailTemplateFile              `        | If the EMAIL notification is used, the subject, body, and footer of the email must be defined. These can be uploaded from a separate file. There is a default format for the email that can be overridden. If you want to override it, you can configure the location to a template file using this. You need to configure the absolute path for the template file. |
    | `               emailSubject              `             | This is the subject of the email. This is necessary if you wish to change the default email support used by the module.                                                                                                                                                                                                                                             |
    | `               emailAddress              `             | The email address that you want to send the email to.                                                                                                                                                                                                                                                                                                               |

5.  In order to send notifications to external endpoints when a user
    attribute is updated, update the
    `           msg-mgt.properties          ` file in the
    `           <IS_HOME>/repository/conf/identity/          ` directory
    and add the following configurations to it. Change it according to
    your notification module. The sample below shows how email
    notification can be configured.

    ``` java
    module.name.1=email
    email.subscription.1=userOperation
    email.subscription.userOperation.template=[IS_HOME]/repository/conf/email/entitlement-email-config.xml
    email.subscription.userOperation.salutation=Admin
    email.subscription.userOperation.subject=User operation change information
    email.subscription.userOperation.endpoint.1=privateMail
    email.subscription.userOperation.endpoint.privateMail.address=wso2demomail@gmail.com
    email.subscription.userOperation.endpoint.privateMail.salutation=wso2demomail@gmail.com
    email.subscription.userOperation.endpoint.privateMail.subject= The User Operation change has occured.
    #
    email.subscription.userOperation.endpoint.2=wso2demomail@gmail.com
    email.subscription.userOperation.endpoint.officeMail.address=wso2demomail@gmail.com
    #
    email.subscription.2=policyUpdate
    email.subscription.policyUpdate.template=<full path to the carbon- home>/repository/conf/email/entitlement-email-config.xml
    email.subscription.policyUpdate.salutation=Admin
    email.subscription.policyUpdate.subject= policy update information mail
    email.subscription.policyUpdate.endpoint.1=privateMail
    email.subscription.policyUpdate.endpoint.privateMail.address=wso2demomail@gmail.com
    email.subscription.policyUpdate.endpoint.privateMail.salutation=Admin 
    email.subscription.policyUpdate.endpoint.privateMail.subject=policy update information to private wso2demomail@gmail.com
    #
    #module.name.2=json
    #json.subscription.1=userOperation
    #json.subscription.userOperation.template=templatePath/jsonTemplate
    #json.subscription.userOperation.jsonId=3232
    #json.subscription.userOperation.endpoint.1=pepEndpoint1
    #json.subscription.userOperation.endpoint.pepEndpoint1.address=https://localhost:8080/testEndpoint1
    #json.subscription.userOperation.endpoint.pepEndpoint1.username=testUsername
    #json.subscription.userOperation.endpoint.pepEndpoint2.password=testPW
    #
    #json.subscription.userOperation.endpoint.2=pepEndpoint2
    #json.subscription.userOperation.endpoint.pepEndpoint2.address=https://localhost:8080/testEndpoint2

    threadPool.size = 10
    ```

6.  It is recommended to use https to communicate with external
    endpoints. In that case, import your certificates to
    `           client-truststore.jks          `
    in the Identity Server. You can use the Java keytool command to do
    it. The following is a sample command. Note that the default
    password for `client-truststore.jks` is "wso2carbon".

    ``` java
    keytool -import -alias wso2 -file <path_to_your_certificate_file>/yourCertificate.crt -keystore <CARBON_SERVER>/repository/resources/security/client-truststore.jks
    ```
