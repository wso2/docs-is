---
template: templates/swagger.html
---

# Notification Senders API Definition

This is the RESTful API for managing notification sender configurations in WSO2 Identity Server. 
It supports Email and SMS as the notification channels. 
The following section provides the instructions to contruct requests for each notification sender type.<br>

!!! warning "Important"

    * This API is not supported for notification sender configuration for carbon.super tenant.

        If you want to configure event publishers in carbon.super tenant, add or modify event publishers in 
        `IS_HOME/repository/deployment/server/eventpublishers`.
        For more information on writing an event publisher, see [Event Publisher Types](https://docs.wso2.com/display/DAS300/Event+Publisher+Types).

    * The following properties are used for internal operations. Therefore, avoid using these properties when configuring notification senders.

        | Property | Purpose |
        | ------- | -------|
        | streamName   | The name of the event stream where events are picked for notification sending |
        | version   | The version of the event stream |
        | type | Type of the notification sender (email/sms) |

??? "Email Sender Configuration"

    * If you want to add properties related to email adaptor configurations (eg: SMTP configurations),
    define property keys with the exact names given in the [Email Event Publisher](https://docs.wso2.com/display/DAS300/Email+Event+Publisher) documentation. 

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
    [HTTP Event Publisher](https://docs.wso2.com/display/DAS300/HTTP+Event+Publisher) documentation.

        Example:

        * Let’s assume you change the `Bulksms` template as follows.
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
    
<div id="swagger-ui"></div>
<script>
    // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/notification-senders.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    validatorUrl: null,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
  })
  // End Swagger UI call region
  window.ui = ui
</script>
