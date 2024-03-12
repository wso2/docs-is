# Configure Log Masking with Filebeat

Log files and the product console may contain business-sensitive information. To avoid such information being exposed, users can mask sensitive information through Filebeat.

In Filebeat, you can define data patterns that need to be masked in logs. This is particularly useful if your logs contain sensitive information such as credit card numbers and access tokens.

Follow the instructions given below to configure Filebeast to masksensitive info:

1. Navigate to the home directory of your Filebeat installation and open the **filebeat.yml** file.
2. Add the following configuration after the **filebeat.inputs** section. Change the masking rules to fit your requirements.

    !!! info
        The given sample replaces the value in the **username** field in the event to **MASKED**. This is done
        with the [replace() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) in Javascript.

    ```
    filebeat.inputs:
        ...
    processors:
      - script:
          lang: javascript
          source: >
            function process(event) {
                var msg = event.Get("message");
                msg = msg.replace(/\"username\":\"(.*?)\"/, "\"username\":\"MASKED\"");
                event.Put("message",msg);
            }
          tag_on_exception: true
    output.logstash:
        ...
    ```

!!! note
    As the number of masking patterns increases, performance will be affected since each log line is matched with each pattern. It is recommended to only use the most necessary patterns.
