# Notification Senders configurations

The RESTful API for managing notification sender configurations in WSO2 Identity Server supports Email and SMS as the notification channels.

The following section provides the instructions to contruct requests for each notification sender type.<br>

!!! warning "Important"

    * The email notification sender configuration is not supported for carbon.super tenant via this API.

        Refer [email sending module configuration]({{base_path}}/deploy/configure/email-sending-module/) to setup email notification sender for carbon.super tenant.
        Underlying, the event publishers in `IS_HOME/repository/deployment/server/eventpublishers` will send the notifications.
        For more information on writing an event publisher, see [Event Publisher Types](https://wso2docs.atlassian.net/wiki/spaces/DAS300/pages/52462033/Event+Publisher+Types){:target="_blank"}.

    * The following properties are used for internal operations. Therefore, avoid using these properties when configuring notification senders.

        | Property | Purpose |
        | ------- | -------|
        | streamName   | The name of the event stream where events are picked for notification sending |
        | version   | The version of the event stream |
        | type | Type of the notification sender (email/sms) |

??? "Email Sender Configuration"

    * If you want to add properties related to email adaptor configurations (eg: SMTP configurations),
    define property keys with the exact names given in the [Email Event Publisher](https://wso2docs.atlassian.net/wiki/spaces/DAS300/pages/52462036/Email+Event+Publisher){:target="_blank"} documentation. 

??? "SMS Sender Configuration"

    1. Some SMS providers’ SMS sending API payloads are templated in the 
    `IS_HOME/repository/conf/sms/sms-providers-api-body-templates.xml` file.
    2. You can add new SMS providers’ payloads, or modify the existing SMS provider payloads by adding new attributes.
    3. Attribute values that need to be replaced by the **POST /notification-senders/sms** API’s input should be templated with 
    a prefix, **“$”**. For example,
        
        ```
        $sender will be replaced by the input value of the “sender” attribute.
        $body.routingGroup will be replaced by the input value of the property defined with key - “body.routingGroup”.
        ```

    **Properties in POST /notification-senders/sms request**

    1. Properties that need to be included in SMS provider API’s body should be defined with the prefix, **”body.”**.
    2. If the property named **“body”** is present, the corresponding value will be used as the SMS provider API’s body.
    3. If you want to add properties related to HTTPOutputEventAdaptor, define keys with the exact names defined in the 
    [HTTP Event Publisher](https://docs.wso2.com/display/DAS300/HTTP+Event+Publisher){:target="_blank"} documentation.

        Example:

        * Let's assume you change the `Bulksms` template as follows.
        ```
            <configuration provider="Bulksms">
                <body>
                    [{ "from": $sender, "to": {{'{{mobile}}'}}, "body": {{'{{body}}'}}, "routingGroup": $body.routingGroup}]
                </body>
            </configuration>
        ```

        * The POST /notification-senders/sms request should have a property with a key named “body.routingGroup”.
        ```
            {
                "provider": "Bulksms",
                "providerURL": "https://webhook.site/9b79bebd-445a-4dec-ad5e-622b856fa184",
                "key": "123",
                "secret": "1234",
                "sender": "073923902",
                "properties": [
                    {
                        "key": "body.routingGroup",
                        "value": "ECONOMY"
                    }
                ]
            }
        ```