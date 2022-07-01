# Configuring Alerts

Let's configure alerts in ELK.

!!! tip

    **Before you begin**

    [Configure](../elk-analytics-installation-guide) ELK-based analytics in WSO2 IS.

### Alert transform configuration

[Elasticsearch transforms](https://www.elastic.co/guide/en/elasticsearch/reference/current/transforms.html) are used to
capture the alert events from the raw event data. Execute the following cURL commands to create the ELK transforms.

- Long session alert

    ```curl tab="Request"
    curl -L -X PUT 'https://{ELASTICSEARCH_HOST}/_transform/wso2-iam-alert-long-session' -H 'Authorization: Basic {ELASTICSEARCH_BASIC_AUTH_HEADER}' -H 'Content-Type: application/json' --data-raw '{"source":{"index":["wso2-iam-session-raw*"],"runtime_mappings":{"time_elapsed":{"type":"long","script":"def retval = 0;def current_time = new Date().getTime(); def termination = doc['\''event.payloadData.terminationTimestamp'\''].value; def start = doc['\''event.payloadData.startTimestamp'\''].value; def action = doc['\''event.payloadData.action'\''].value; if (current_time > termination || action == 0) {retval = (termination - start) / (1000 * 60);} else if (action == 1 || action == 2){retval = (current_time - start) / (1000 * 60);} emit(retval);"},"isActive":{"type":"long","script":"def current_time = new Date().getTime();if(doc['\''event.payloadData.terminationTimestamp'\''].value > current_time){emit(1);} else {emit(0);}"}},"query":{"bool":{"must":[{"range":{"@timestamp":{"gte":"now-7d"}}},{"match":{"event.payloadData.rememberMeFlag":true}}]}}},"dest":{"index":"wso2-iam-alert-session"},"sync":{"time":{"field":"@timestamp","delay":"60s"}},"pivot":{"group_by":{"username":{"terms":{"field":"event.payloadData.username.keyword"}},"tenant_domain":{"terms":{"field":"event.payloadData.tenantDomain.keyword"}}},"aggregations":{"latest_session":{"top_metrics":{"metrics":[{"field":"time_elapsed"}],"sort":{"@timestamp":"desc"}}},"active":{"top_metrics":{"metrics":[{"field":"isActive"}],"sort":{"isActive":"desc"}}},"latest_timestamp":{"top_metrics":{"metrics":[{"field":"@timestamp"}],"sort":{"@timestamp":"desc"}}},"time_elapsed_avg":{"avg":{"field":"time_elapsed"}},"is_long":{"bucket_script":{"buckets_path":{"duration_avg":"time_elapsed_avg","duration":"latest_session.time_elapsed","active_status":"active.isActive"},"script":"if((params.duration > (params.duration_avg * {PERCENTAGE} / 100) || params.duration > {DURATION}) && params.active_status == 1) return 1; else return 0;"}}}}}'
    ```

    ``` curl tab="Sample Request"
    curl -L -X PUT 'https://localhost:9200/_transform/wso2-iam-alert-long-session' -H 'Authorization: Basic d3NvMnVzZXI6Y2hhbmdlbWU=' -H 'Content-Type: application/json' --data-raw '{"source":{"index":["wso2-iam-session-raw*"],"runtime_mappings":{"time_elapsed":{"type":"long","script":"def retval = 0;def current_time = new Date().getTime(); def termination = doc['\''event.payloadData.terminationTimestamp'\''].value; def start = doc['\''event.payloadData.startTimestamp'\''].value; def action = doc['\''event.payloadData.action'\''].value; if (current_time > termination || action == 0) {retval = (termination - start) / (1000 * 60);} else if (action == 1 || action == 2){retval = (current_time - start) / (1000 * 60);} emit(retval);"},"isActive":{"type":"long","script":"def current_time = new Date().getTime();if(doc['\''event.payloadData.terminationTimestamp'\''].value > current_time){emit(1);} else {emit(0);}"}},"query":{"bool":{"must":[{"range":{"@timestamp":{"gte":"now-7d"}}},{"match":{"event.payloadData.rememberMeFlag":true}}]}}},"dest":{"index":"wso2-iam-alert-session"},"sync":{"time":{"field":"@timestamp","delay":"60s"}},"pivot":{"group_by":{"username":{"terms":{"field":"event.payloadData.username.keyword"}},"tenant_domain":{"terms":{"field":"event.payloadData.tenantDomain.keyword"}}},"aggregations":{"latest_session":{"top_metrics":{"metrics":[{"field":"time_elapsed"}],"sort":{"@timestamp":"desc"}}},"active":{"top_metrics":{"metrics":[{"field":"isActive"}],"sort":{"isActive":"desc"}}},"latest_timestamp":{"top_metrics":{"metrics":[{"field":"@timestamp"}],"sort":{"@timestamp":"desc"}}},"time_elapsed_avg":{"avg":{"field":"time_elapsed"}},"is_long":{"bucket_script":{"buckets_path":{"duration_avg":"time_elapsed_avg","duration":"latest_session.time_elapsed","active_status":"active.isActive"},"script":"if((params.duration > (params.duration_avg * 150 / 100) || params.duration > 15) && params.active_status == 1) return 1; else return 0;"}}}}}'
    ```

    ```json tab="Response"
    {"acknowledged": true}
    ```

- Suspicious login alert

    ```curl tab="Request"
    curl -L -X PUT 'https://{ELASTICSEARCH_HOST}/_transform/wso2-iam-alert-suspicious-login' -H 'Authorization: Basic {ELASTICSEARCH_BASIC_AUTH_HEADER}' -H 'Content-Type: application/json' --data-raw '{"source":{"index":["wso2-iam-auth-raw*"]},"dest":{"index":"wso2-iam-alert-auth"},"sync":{"time":{"field":"@timestamp","delay":"60s"}},"pivot":{"group_by":{"event.payloadData.username":{"terms":{"field":"event.payloadData.username.keyword"}},"event.payloadData.tenantDomain":{"terms":{"field":"event.payloadData.tenantDomain.keyword"}},"event.payloadData.userStoreDomain":{"terms":{"field":"event.payloadData.userStoreDomain.keyword"}},"@timestamp":{"date_histogram":{"field":"@timestamp","fixed_interval":"5m"}}},"aggregations":{"filter_success":{"filter":{"bool":{"must":[{"match":{"event.payloadData.authStepSuccess":true}}]}}},"filter_failed":{"filter":{"bool":{"must":[{"match":{"event.payloadData.authStepSuccess":false}}]}}},"is_sus":{"bucket_script":{"buckets_path":{"failed":"filter_failed._count","success":"filter_success._count"},"script":"if(params.success >= {SUCCESS_COUNT} && params.failed >= {FAILURE_COUNT} && params.failed > params.success) return 1; else return 0;"}}}}}'
    ```

    ``` curl tab="Sample Request"
    curl -L -X PUT 'https://localhost:9200/_transform/wso2-iam-alert-suspicious-login' -H 'Authorization: Basic d3NvMnVzZXI6Y2hhbmdlbWU=' -H 'Content-Type: application/json' --data-raw '{"source":{"index":["wso2-iam-auth-raw*"]},"dest":{"index":"wso2-iam-alert-auth"},"sync":{"time":{"field":"@timestamp","delay":"60s"}},"pivot":{"group_by":{"event.payloadData.username":{"terms":{"field":"event.payloadData.username.keyword"}},"event.payloadData.tenantDomain":{"terms":{"field":"event.payloadData.tenantDomain.keyword"}},"event.payloadData.userStoreDomain":{"terms":{"field":"event.payloadData.userStoreDomain.keyword"}},"@timestamp":{"date_histogram":{"field":"@timestamp","fixed_interval":"5m"}}},"aggregations":{"filter_success":{"filter":{"bool":{"must":[{"match":{"event.payloadData.authStepSuccess":true}}]}}},"filter_failed":{"filter":{"bool":{"must":[{"match":{"event.payloadData.authStepSuccess":false}}]}}},"is_sus":{"bucket_script":{"buckets_path":{"failed":"filter_failed._count","success":"filter_success._count"},"script":"if(params.success >= 1 && params.failed >= 2 && params.failed > params.success) return 1; else return 0;"}}}}}'
    ```

    ```json tab="Response"
    {"acknowledged": true}
    ```

Login to kibana as administrator and navigate to `Stack Management > Transforms`. There should be newly created
transforms named **wso2-iam-alert-suspicious-login** and **wso2-iam-alert-long-session**. Click on `Actions` and press
`Start` for both.

<img src="../../../assets/img/elk-analytics/alerting/elk-alerting-4.png" alt="Alert transform configuration">