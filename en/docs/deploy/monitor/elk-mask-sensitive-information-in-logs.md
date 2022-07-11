# Mask Sensitive Information in Logs

There can be business sensitive information that are added to logs in
the product console and/or Carbon log files. When these logs
are shipped to ELK via Filebeat, the information is exposed to those who check.

To avoid this potential security pitfall, users can mask sensitive
information from the log file at the time of shipping via Filebeat. In this feature,
you can define patterns that need to be masked from the logs. This is
particularly useful in the cases of credit card numbers, access tokens
etc.

To configure this feature, follow the instructions given below.

## Configure Filebeat

1. Open `filebeat.yml` file located at `{FILEBEAT_HOME}/filebeat.yml`.

2. Add the following configuration after input section.

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
3. Edit the function `process(event)` to mask the fields inside the event. Sample is given to replace `username` field
   in the event to the word `MASKED`. This is done
   through [JavaScript replace() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

!!! note    
      There can be a performance impact when using this
      feature with many masking patterns since each log line is matched with
      each of the patterns. Hence, it is recommended to only use the most necessary patterns.
    
