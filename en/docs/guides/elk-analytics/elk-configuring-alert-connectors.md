# Alert Connector configuration

Alert Connectors be used to receive
notifications for the same events which can be viewed from
the [Alert Dashboard](../elk-configuring-alert-dashboard). 
Alerts are sent to a given set of connectors including,

- Email : Send email from your server.
- IBM Resilient : Create an incident in IBM Resilient.
- Index : Index data into Elasticsearch.
- Jira : Create an incident in Jira.
- Microsoft Teams : Send a message to a Microsoft Teams channel.
- PagerDuty : Send an event in PagerDuty.
- ServerLog : Add a message to a Kibana log.
- ServiceNow ITSM : Create an incident in ServiceNow.
- ServiceNow SecOps : Create a security incident in ServiceNow.
- ServiceNow ITOM : Create an event in ServiceNow.
- Slack :Send a message to a Slack channel or user.
- Swimlane : Create an incident in Swimlane.
- Webhook : Send a request to a web service.

!!! tip

    **Before you begin**

    1. [Configure](../../learn/elk-configuring-alerts) ELK alerts for WSO2 IS.
    2. Skip first 2 steps if already done.

### **Configuration steps**

1. Download `kibana-8-x-alerts.ndjson` file
   from [here](https://github.com/wso2-extensions/identity-elk-integration/blob/main/kibana/saved-objects/kibana-8-x-alerts.ndjson)
   .
2. Navigate to `Stack Management > Saved Objects` and click on the import button and add the downloaded artifact file.
3. You can see the Alert Rules in the `Stack Management -> Rules and Connectors`.
   <img src="../../assets/img/learn/elk-analytics/alerting/elk-alerting-1.png" alt="Alert Connectors">
4. Create a new connector from the connectors tab. Provide the required fields and test if the connector is working.
5. Edit each Alert Rule and provide the connector. Change the alert rule and other parameters if required.
   <img src="../../assets/img/learn/elk-analytics/alerting/elk-alerting-3.png" alt="Alert Rule Connectors">