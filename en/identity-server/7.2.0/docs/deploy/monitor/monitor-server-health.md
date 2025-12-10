# Monitor Server Health

The **Carbon Health Check API** can be used to check the health of the WSO2 Identity Server. The sections below guide you through using this API.

!!! info "Health Checkers"
    There are three health checkers available by default.

    1. **Data sources health checker** - This checker goes through the data sources that are configured in the `deployment.toml` file and checks if the active connection count surpasses a healthy percentage limit (e.g., 80%) of the maximum allowed connections count. This checker also tests the connection from each data source to see whether the connection is successful.
    2. **Server startup health checker** - This checker uses the `ServerAdmin` service to check if the server status is RUNNING.
    3. **Super tenant user store health checker** - This checker iterates through configured user stores of the super tenant domain and attempts to invoke the `isExistingUser` method to check whether a failure occurs.

## Configure the API

This feature is disabled by default. To enable the API, add the following configurations to the `deployment.toml` file in `<IS_HOME>/repository/conf`.

```toml
[carbon_health_check]
enable= true
```

!!! tip
    If the feature has not been enabled successfully, a request to the API
    will only return a `200 OK` response.

Two health checkers will be enabled when you enable health checkers using the above global configuration.

- DataSource Health Checker
- UserStore Health Checker

## DataSource health checker

This health checker returns the status of the data sources available in the system.
You can configure the data sources to be monitored by adding the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

```toml
[carbon_health_check.health_checker.data_source_health_checker.properties]
'monitored.datasources' = "jdbc/WSO2CarbonDB,jdbc/WSO2UM_DB,jdbc/SHARED_DB"
```

To indicate the data source connection pool usage, use the following configuration in the `deployment.toml` file.

```toml
[carbon_health_check.health_checker.data_source_health_checker]
pool_usage_limit_percentage = "20"
```

## Userstore health checker

This health checker returns the status of the user stores available in the system.
You can configure the user stores to be monitored by adding the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

```toml
[carbon_health_check.health_checker.super_tenant_health_checker.properties]
'monitored.user.stores' = "primary" 
```

## Invoke the API

This is an open API that should ideally be blocked at the load balancer
level. To invoke it, start the WSO2 Identity Server and send a GET request to
the health check API. A sample cURL command is shown below.

``` java
curl -k -v https://{hostname}:{port}/api/health-check/v1.0/health
```

If the request is successful, you will receive a `200 OK` response
(similar to the one shown below) with a list of health check results.

``` java
{  
   "health":[  
      {  
         "key":"jdbc/WSO2CarbonDB.active.connection.count",
         "value":"1"
      },
      {  
         "key":"bpsds.active.connection.count",
         "value":"1"
      },
      {  
         "key":"jdbc/WSO2MetricsDB.connectivityTime.ms",
         "value":"81"
      },
      {  
         "key":"jdbc/WSO2MetricsDB.active.connection.count",
         "value":"1"
      },
      {  
         "key":"jdbc/WSO2CarbonDB.connectivityTime.ms",
         "value":"0"
      },
      {  
         "key":"bpsds.connectivityTime.ms",
         "value":"0"
      }
   ]
}
```

- The `active.connection.count` parameter reflects the number of active connections.

- `ConnectivityTime` refers to the duration of the connection.

## Error responses

The following responses are possible error responses that you may receive.

The code block below shows a sample `503 Unavailable` response with an array of errors.

``` java
{  
   "errors":[  
      {  
         "code":"HC_00001",
         "message":"Error while getting database connection for datasource: jdbc/DISCONNECTED",
         "description":"Network is unreachable (connect failed)"
      },
      {  
         "code":"HC_00003",
         "message":"Error while checking the health of USM with domain: SEC",
         "description":"Access denied for user 'roott'@'localhost' (using password: YES)"
      }
   ]
}
```

| Error Code | Description |
|------------|-------------|
| HC\_00001  | Data source connectivity error.  
| HC\_00002  | The Number of connections in the data source exceeds the healthy percentage. |
| HC\_00003  | Error while testing connectivity to the user store using the `isExistingUser` operation. |
| HC\_00004  | Server status is not running. |
| HC\_00005  | Error listing user stores. |


- A health checker can be enabled or disabled using the `enable` attribute of each health checker.

    ```toml
    [carbon_health_check.health_checker.data_source_health_checker]
    enable =false
    
    [carbon_health_check.health_checker.super_tenant_health_checker]
    enable =false
    ```

- The execution order in which the health checkers are executed can be configured using the ` order ` attribute.

    ```toml
    [carbon_health_check.health_checker.data_source_health_checker]
    order = "97"
    
    [carbon_health_check.health_checker.super_tenant_health_checker]
    order = "98"
    ```  

- The properties configured under each health checker will be available for each health checker at runtime.

### Add new health checkers

To add a new health checker, you can implement the HealthChecker API and register the health checker as an OSGI service. To deploy it, copy the `.jar` file to the `<IS_HOME>/repository/component/lib/` directory or
the OSGI bundle and paste it in the `<IS_HOME>/repository/component/dropins/` directory.

Then register the new health checker as shown below in the `deployment.toml` file if needed.

```toml
[[health_checker]]
name = "customChecker" 
order="87" 
[health_checker.properties] 
property1 = "property-1-value"
property2 = "property-2-value" 
```

??? Tip "Click to see sample health checker configuration"
   A sample configuration section of `deployment.toml` related to health checkers is shown below.

   ```toml 
   [carbon_health_check]
   enable = true

   [carbon_health_check.health_checker.data_source_health_checker]
   pool_usage_limit_percentage = "20"
   enable = true
   order = "99"

   [carbon_health_check.health_checker.super_tenant_health_checker]
   enable = true
   order = "88"

   [carbon_health_check.health_checker.data_source_health_checker.properties]
   'monitored.datasources' = "jdbc/WSO2CarbonDB,jdbc/WSO2UM_DB,jdbc/SHARED_DB"

   [carbon_health_check.health_checker.super_tenant_health_checker.properties]
   'monitored.user.stores' = "primary"

   [[health_checker]] 
   name = "customChecker" 
   order = "87"
   [health_checker.properties] 
   property1 = "property-1-value" 
   property2 = "property-2-value" 
   ```
