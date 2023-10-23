# Mask Sensitive Information in Logs

There can be business sensitive information that are added to logs in 
the product console and/or Carbon log files. When these logs
are analyzed, the information is exposed to those who check this.

To avoid this potential security pitfall, users can mask sensitive
information.

---

## Mask Sensitive Information in Logs with Log4j

Users can mask sensitive information from the log file at the time of logging. 
In this feature, you can define patterns that need to be masked from the logs. 
This is particularly useful in the cases of credit card numbers, access tokens,
etc.

see, [Configure log masking with Log4j]({{base_path}}/deploy/monitor/log4j-mask-sensitive-information-in-logs)

---

## Mask Sensitive Information in Logs with Filebeat

Users can mask sensitive information from the logs at the time of shipping with Filebeat.
In this feature, you can define patterns that need to be masked from the logs and it
will be masked at the Filebeat level and shipped. However, the log file itself
will contain the sensitive information. 

see, [Configure log masking with Filebeat]({{base_path}}/deploy/monitor/elk-mask-sensitive-information-in-logs)
