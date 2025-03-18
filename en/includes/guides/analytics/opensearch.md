# Analyze carbon logs with OpenSearch

{{product_name}} supports integrating with log management and analytics solutions to enhance observability and monitoring. This guide walks you through setting up {{product_name}} to send carbon logs to OpenSearch using Fluent Bit.

!!! note "What are carbon logs?"

    Carbon logs, written to the `<IS_HOME>/repository/logs/wso2carbon.log` file, capture all log entries related to the product's management features. Learn more about {{product_name}} logs in the [monitor logs]({{base_path}}/deploy/monitor/monitor-logs/) documentation.
    

## Install Fluent Bit

Fluent Bit is a lightweight and efficient log processor and forwarder that enables real-time log streaming to various destinations. To install it, follow one of the guides below based on your operating system.

- If you are a Linux user, follow this [guide](https://docs.fluentbit.io/manual/installation/linux/ubuntu){: target="_blank"}

- If you are a MacOS user, follow this [guide](https://docs.fluentbit.io/manual/installation/macos){: target="_blank"}.

Once you have finished installing Fluent Bit, follow the next section for instructions on installing OpenSearch.

## Install OpenSearch

If you already have OpenSearch installed in your system, you may skip this step. If not, follow the guides below to install it.

By sending {{product_name}} carbon logs to OpenSearch, you can efficiently store, search, and analyze log data for better insights. To install,

- the **OpenSearch cluster**, follow the [OpenSearch installation guide](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/index){: target="_blank"}.

- the **OpenSearch dashboards**, follow the [OpenSearch dashboard installation guide](https://opensearch.org/docs/latest/install-and-configure/install-dashboards/index/){: target="_blank"}.

!!! note "Important"
    
    Review the following configurations for installing OpenSearch and make sure your system meets these requirements.

    - [Network requirements](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/index/#network-requirements){: target="_blank"}
    - [System settings](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/index/#important-settings){: target="_blank"}
    - [System properties](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/index/#important-system-properties){: target="_blank"}

## Configure Fluent Bit

After installing Fluent Bit and OpenSearch, create a Fluent Bit configuration file (`flunet-bit.conf`) with the following attributes to direct {{product_name}} carbon logs to the OpenSearch cluster. You can attach this configuration file when running Fluent Bit later.

!!! note
    In the configurations below, update **Path**, **DB** and **HTTP_Passwd** attributes to meet your requirements. Learn more about [configuring Fluent Bit](http://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file){: target="_blank"}.

```config

[SERVICE]
# Basic FluentBit service settings
Flush               1
Daemon              Off
Log_Level           info


[INPUT]
# Input configuration to tail log files
Name                tail
Path                <path to carbon log file>
Tag                 local_logs
Refresh_Interval    5
Buffer_Chunk_Size   32KB
Buffer_Max_Size     2MB
Mem_Buf_Limit       256MB
Read_from_Head      true
DB                  <your local path>/tail-file-status.db

[FILTER]
# Filter configuration to parse multiline logs (Java)
name                multiline
match               local_logs
multiline.key_content log
multiline.parser    java


[OUTPUT]
# Output configuration for sending logs to OpenSearch
Name                opensearch
Host                127.0.0.1                        
HTTP_Passwd         <your opensearch admin password>
HTTP_User           admin
Logstash_Format     On
Logstash_DateFormat %Y-%m-%d
Logstash_Prefix     wso2is-carbon-logs
Match               *
Port                9200
Replace_Dots        On
Suppress_Type_Name  On
tls                 On
tls.verify          Off
Trace_Error         On

```

## View logs from OpenSearch dashboard

Now that you have installed and configured Fluent Bit and OpenSearch, the following guide explains how you can view carbon logs from the OpenSearch dashboard.

1. Start the OpenSearch cluster and dashboards. Once started you can access the Opensearch dashboard at `http://0.0.0.0:5601`.

2. Start Fluent Bit using the following command:

    ```curl
    fluent-bit -c <created_configuration_file>
    ```

    Once FluentBit service is up and running you will see a log stream similar to the following:

    ```log
    [2025/02/20 12:58:43] [ info] [fluent bit] version=3.2.5, commit=, pid=12951
    [2025/02/20 12:58:43] [ info] [storage] ver=1.5.2, type=memory, sync=normal, checksum=off, max_chunks_up=128
    [2025/02/20 12:58:43] [ info] [simd    ] disabled
    [2025/02/20 12:58:43] [ info] [cmetrics] version=0.9.9
    [2025/02/20 12:58:43] [ info] [ctraces ] version=0.5.7
    [2025/02/20 12:58:43] [ info] [input:tail:tail.0] initializing
    [2025/02/20 12:58:43] [ info] [input:tail:tail.0] storage_strategy='memory' (memory only)
    [2025/02/20 12:58:43] [ info] [input:tail:tail.0] db: delete unmonitored stale inodes from the database: count=1
    [2025/02/20 12:58:43] [ info] [filter:multiline:multiline.0] created emitter: emitter_for_multiline.0
    [2025/02/20 12:58:43] [ info] [input:emitter:emitter_for_multiline.0] initializing
    [2025/02/20 12:58:43] [ info] [input:emitter:emitter_for_multiline.0] storage_strategy='memory' (memory only)
    [2025/02/20 12:58:43] [ info] [sp] stream processor started
    [2025/02/20 12:58:43] [ info] [filter:multiline:multiline.0] created new multiline stream for tail.0_local_logs
    ```

3. Go to the OpenSearch dashboard, select **Discover** from the left side menu, and create an index to view the logs. To see all logs sent to OpenSearch, use `*` as a wildcard selection when creating the index.

    ![View Opensearch logs]({{base_path}}/assets/img/guides/analytics/opensearch/opensearch-logs.png)





