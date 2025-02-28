# ELK-based Analytics Installation Guide

This guide shows you how to configure ELK-based Analytics for WSO2 Identity Server.  ELK-based Analytics solution supports ELK version 8.X.X.

## Enable Analytics in WSO2 Identity Server

Follow the steps below to enable ELK-based analytics in WSO2 Identity Server.

1. Download and install WSO2 Identity Server.

    !!! note
        For detailed information, see [Install WSO2 Identity Server]({{base_path}}/deploy/get-started/install/).

2. Open the `deployment.toml` file found in the `{IS_HOME}/repository/conf/` directory and add the following configuration.

    ```
    [analytics.elk]
    enable=true
    ```

3. Restart {{product_name}}.

## Enable Logs in WSO2 Identity Server

1. Open the `log4j2.properties` file found in the `<IS_HOME>/repository/conf` directory and add the following configurations.

    - Add `ANALYTICS_EVENT_LOGFILE` to the list of all appenders as follows: <br />
        `appenders = {other appenders} , ANALYTICS_EVENT_LOGFILE`

    - Add the following appender configurations:

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
        loggers = {other loggers}, org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter
        ```
    - Add the following logger configurations.
        ```
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.name=org.wso2.carbon.event.output.adapter.logger.LoggerEventAdapter
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.level=INFO
        logger.org-wso2-carbon-event.output-adapter-logger-LoggerEventAdapter.appenderRef.CUSTOM_LOGFILE.ref=ANALYTICS_EVENT_LOGFILE
        ```

        !!! note
            The `analytics_events.log` file will be rolled each day or when the log size reaches the limit of 1000 MB by default. Furthermore, only 10 revisions will be kept and older revisions will be deleted automatically. You can change these configurations by updating the appender configurations above.

2. Restart {{product_name}}.

## Configure ELK

Follow the guides mentioned below to install the ELK components.

### Install Elasticsearch

1. [Install Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html){:target="_blank"} according to your operating system.

2. Make sure Elasticsearch is up and running.

    !!! note
        Take note of the password generated for the `elastic` user.

### Install Filebeat
1. [Install Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation-configuration.html#installation){:target="_blank"} according to your operating system.

2. Open the **filebeat.yml** file in the root directory and add this [configuration](https://github.com/wso2-extensions/identity-elk-integration/blob/main/filebeat/filebeat.yml){:target="_blank"}.

    !!! info
        - Replace `<IS_HOME>` with the location of your WSO2 Identity Server installation.
        - To configure Filebeat to mask sensitive information in logs, follow this [guide]({{base_path}}/deploy/monitor/elk-mask-sensitive-information-in-logs).


### Install Logstash

1. [Install Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html){:target="_blank"} according to your operating system.
2. In the Logstash directory, create a file with the **.conf** extension and add these [configurations](https://github.com/wso2-extensions/identity-elk-integration/blob/main/logstash/logstash-filebeat.conf){:target="_blank"}.

    !!! info
        - [Set a password](https://www.elastic.co/guide/en/elasticsearch/reference/current/reset-password.html){: target="_blank"} for the `elastic` super user.
        - Replace `<ELASTICSEARCH_HOME>`, `<ELASTICSEARCH_USERNAME>`, `<ELASTICSEARCH_USER_PASSWORD>` with the corresponding values.

3. [Start the logstash server](https://www.elastic.co/guide/en/logstash/8.1/running-logstash-command-line.html#running-logstash-command-line){:target="_blank"} with the `-f` flag followed by the location of the configuration file you created.


### Installing Kibana
1. [Install Kibana](https://www.elastic.co/guide/en/kibana/current/install.html){:target="_blank"} according to your operating system and do this [one time configuration](https://www.elastic.co/guide/en/elasticsearch/reference/8.2/configuring-stack-security.html#stack-start-with-security){:target="_blank"}.


2. Once Kibana is running, enter its web interface using the following address:
    ```
    http://127.0.0.1:5601
    ```

## Configure ELK Analytics Dashboards

1. Navigate to the Kibana installation folder and run the following command to install the [Kibana Enhanced Table](https://github.com/fbaligand/kibana-enhanced-table){: target="_blank"} plugin.

    ```
    ./bin/kibana-plugin install https://github.com/fbaligand/kibana-enhanced-table/releases/download/vA.B.C/enhanced-table-A.B.C_X.Y.Z.zip
    ```

    !!! info
        Replace A,B,C with the plugin version and X,Y,Z with the Kibana version you have installed.

2. Restart Kibana service and log in to Kibana.

3. On the left navigation panel, under **Management** click **Stack Management**.

4. Under **Stack Management** > **Data**, click **Index Management** and go to its **Index Templates** tab.

4. Under the **Index patterns** column, if you have any index patterns created under the following names, delete them before moving to the next step.

     - wso2-iam-alert-auth*
     - wso2-iam-alert-session*
     - wso2-iam-auth-raw*
     - wso2-iam-session-raw*
     - wso2-iam-session-time-series*

5. Download the artifact file [here]({{base_path}}/assets/img/elk-analytics/kibana-8-x-auth-and-session.ndjson).

6. Under **Stack Management** > **Kibana**, click **Saved Objects**.

7. Click **Import**, add the downloaded artifact file as an import object, and click **Import**.

8. Once import is complete, click **Done**.

9. On the left navigation panel, under **Analytics**, click **Dashboards** to view the created **Auth** and **Session** dashboards.
