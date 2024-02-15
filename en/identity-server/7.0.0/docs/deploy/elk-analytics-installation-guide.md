# ELK-based Analytics Installation Guide

This guide shows you how to configure ELK-based Analytics for WSO2 Identity Server.  ELK-based Analytics solution supports ELK version 8.X.X.

## Enable Analytics in WSO2 Identity Server

Follow the steps below to enable ELK-based analytics in WSO2 Identity Server.

1. Download and install WSO2 Identity Server. For detailed information
   on how to install WSO2 IS, see [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install/).

2. Navigate to the `{IS_HOME}/repository/conf/` directory and open the `deployment.toml` file.

3. Add the following configuration to the `deployment.toml` file.

    ```
    [analytics.elk]
    enable=true
    ```

## Enable Logs in WSO2 Identity Server

1. Navigate to the `<IS_HOME>/repository/conf` directory and open the `log4j2.properties` file.

2. Add the following configurations to the `log4j2.properties` file.

    - Add `ANALYTICS_EVENT_LOGFILE` to the list of all appenders as follows: <br />
        `appenders = {other appenders} , ANALYTICS_EVENT_LOGFILE`

    - Add the following appender configs:

        ```
        appender.ANALYTICS_EVENT_LOGFILE.type = RollingFile
        appender.ANALYTICS_EVENT_LOGFILE.name = ANALYTICS_EVENT_LOGFILE
        appender.ANALYTICS_EVENT_LOGFILE.fileName =${sys:carbon.home}/repository/logs/analytics_events.log
        appender.ANALYTICS_EVENT_LOGFILE.filePattern = ${sys:carbon.home}/repository/logs/analytics_events-%d{MM-dd-yyyy}.%i.log
        appender.ANALYTICS_EVENT_LOGFILE.layout.type = PatternLayout
        appender.ANALYTICS_EVENT_LOGFILE.layout.pattern=TID: [%tenantId] [%appName] [%d] [%X{Correlation-ID}] %5p {% raw %}{%c}{% endraw %} — %mm%ex%n
        appender.ANALYTICS_EVENT_LOGFILE.policies.type = Policies
        appender.ANALYTICS_EVENT_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
        appender.ANALYTICS_EVENT_LOGFILE.policies.time.interval = 1
        appender.ANALYTICS_EVENT_LOGFILE.policies.time.modulate = true
        appender.ANALYTICS_EVENT_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
        appender.ANALYTICS_EVENT_LOGFILE.policies.size.size=10MB
        appender.ANALYTICS_EVENT_LOGFILE.strategy.type = DefaultRolloverStrategy
        appender.ANALYTICS_EVENT_LOGFILE.strategy.max = 20
        appender.ANALYTICS_EVENT_LOGFILE.filter.threshold.type = ThresholdFilter
        appender.ANALYTICS_EVENT_LOGFILE.filter.threshold.level = INFO
        ```

        !!! note
            To change the name of the log file and its location, change the **fileName** and **filePattern** parameters accordingly.

    - Add `org.wso2.carbon.event.output.adapter.logger.LoggerEventAdapter` to the list of all loggers as follows:
        ```
        loggers = {existing loggers}, org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter
        ```
    - Add the following logger configs
        ```
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.name=org.wso2.carbon.event.output.adapter.logger.LoggerEventAdapter
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.level=INFO
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.appenderRef.CUSTOM_LOGFILE.ref=ANALYTICS_EVENT_LOGFILE
        ```

        !!! note
            The `analytics_events.log` file will be rolled each day or when the log size reaches the limit of 1000 MB by default. Furthermore, only 10 revisions will be kept and older revisions will be deleted automatically. You can change these configurations by updating the configurations provided in step 2 given above in this. section.

## Configure ELK

### Install Elasticsearch

1. [Install Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html) according to your operating system.

2. Make sure Elasticsearch is up and running.

### Install Filebeat
1. [Install Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation-configuration.html#installation) according to your operating system.

2. Open the **filebeat.yml** file in the root directory and enter these [configurations](https://github.com/wso2-extensions/identity-elk-integration/blob/main/filebeat/filebeat.yml).

    !!! info
        - Replace `<IS_HOME>` with the location of your WSO2 Identity Server installation.
        - To configure Filebeat to mask sensitive information in logs, follow this [guide]({{base_path}}/deploy/monitor/elk-mask-sensitive-information-in-logs).


### Install Logstash
 
1. [Install Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html) according to your operating system.
2. In the Logstash directory, create a file with the **.conf** extension and add these [configurations](https://github.com/wso2-extensions/identity-elk-integration/blob/main/logstash/logstash-filebeat.conf).

3.  [Start the logstash server](https://www.elastic.co/guide/en/logstash/8.1/running-logstash-command-line.html#running-logstash-command-line) with the `-f` flag followed by the location of the configuration file you created.


### Installing Kibana
1. [Install Kibana](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-elastic-stack.html#install-kibana) according to your operating system and do this [one time configuration](https://www.elastic.co/guide/en/elasticsearch/reference/8.2/configuring-stack-security.html#stack-start-with-security).


2. Once Kibana is running, enter its web interface using the following address:
    ```
    http://127.0.0.1:5601
    ```

## Configure ELK Analytics Dashboards

1. Navigate to Kibana installation folder and run the following command to install the [Kibana Enhanced Table](https://github.com/fbaligand/kibana-enhanced-table) plugin.

    ```
    ./bin/kibana-plugin install https://github.com/fbaligand/kibana-enhanced-table/releases/download/vA.B.C/enhanced-table-A.B.C_X.Y.Z.zip
    ```

    !!! info
        Replace A,B,C with the plugin version and X,Y,Z with the Kibana version you have installed.

2. Restart Kibana service and log in to Kibana.

3. Navigate to **Stack Management** > **Index Management** and select the **Index Templates** tab.

4. Under the **Index patterns** column, if you have any index patterns created under the following names, delete them before moving to the next step.

     - wso2-iam-alert-auth*
     - wso2-iam-alert-session*
     - wso2-iam-auth-raw*
     - wso2-iam-session-raw*
     - wso2-iam-session-time-series*

5. Download the artifact file [here]({{base_path}}/assets/img/elk-analytics/kibana-8-x-auth-and-session.ndjson).

6. Navigate to **Stack Management** > **Saved Objects**.

7. Click **Import**, add the downloaded artifact file as an import object, and import.

9. Navigate to the **Dashboard** section of Kibana to view the created **Auth** and **Session** dashboards.
