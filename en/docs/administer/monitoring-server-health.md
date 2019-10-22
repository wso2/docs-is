# Monitoring Server Health

The **Carbon Health Check API** can be used to check the health of WSO2 Identity Server. The sections below guide you through using this API.

!!! note
    
    This API is only supported for WSO2 Identity Server that 
    runs on Java 8 or a later version.
    

!!! info "Health Checkers" 
    There are three health checkers available by default:

    1.  **Data sources health checker** - This checker goes through the data
        sources that are configured in the
        `          deployment.toml         ` file and checks if the
        active connection count surpasses a healthy percentage limit (e.g.,
        80%) of the maximum allowed connections count. This checker also
        tests the connection from each data source to see whether the
        connection is successful.
    2.  **Server startup health checker** - This checker uses the
        ServerAdmin service to check if the server status is RUNNING.
    3.  **Super tenant user store health checker** - This checker iterates
        through configured user stores of the super tenant domain and
        attempts to invoke the `           isExistingUser          ` method
        to check whether a failure occurs.


### Configuring the API

This feature is disabled by default. To enable the API, set the
`         <Enable>        ` property in the
`         health-check-config.xml        ` file to **true**.  

!!! tip
    
    If the feature has not been enabled successfully, a request to the API
    will only return a 200 OK response.
    

**Sample health-check-config.xml file**

``` java
<CarbonHealthCheckConfigs>
    <Enable>true</Enable>
    <HealthCheckers>
        <HealthChecker name="DataSourceHealthChecker" orderId="97" enable="true">
            <!--<Property name="monitored.datasources">jdbc/WSO2CarbonDB,jdbc/WSO2MetricsDB,jdbc/WSO2UMDB</Property>-->
            <Property name="pool.usage.limit.percentage">80</Property>
        </HealthChecker>
        <HealthChecker name="SuperTenantUSHealthChecker" orderId="98" enable="true">
            <!--<Property name="monitored.user.stores">primary,sec</Property>-->
        </HealthChecker>
    </HealthCheckers>
</CarbonHealthCheckConfigs>
```

-   A health checker can be enabled or disabled using the
    **`           enable          `** attribute.
-   The execution order in which the health checkers are executes can be
    configured using the **`           orderId          `** attribute.
-   The properties configured under each health checker will be
    available for each heath checker at runtime.

### Invoking the API

This is an open API which should ideally be blocked at the load balancer
level. To invoke it, start the WSO2 product and send a GET request to
the health check API. A sample cURL command is shown below.

``` java
curl -k -v https://{hostname}:{port}/api/health-check/v1.0/health
```

If the request is successful, you will recieve a 200 OK response
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

-   The `           active.connection.count          ` parameter
    reflects the number of connections that are active.

-   `           ConnectivityTime          ` refers to the the duration
    of the connection. 

### **Error responses**

The following responses are possible error responses that you may
receive.

The code block below shows a sample 503 Unavailable response with an
array of errors.

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
         "message":"Error while checking health of USM with domain: SEC",
         "description":"Access denied for user 'roott'@'localhost' (using password: YES)"
      }
   ]
}
```

| Error Code | Description                                                                                                       |
|------------|-------------------------------------------------------------------------------------------------------------------|
| HC\_00001  | Data source connectivity error.                                                                                   |
| HC\_00002  | Number of connections in data source exceeds the healthy percentage.                                              |
| HC\_00003  | Error while testing connectivity to the user store using the `             isExistingUser            ` operation. |
| HC\_00004  | Server status is not running.                                                                                     |
| HC\_00005  | Error listing user stores.                                                                                        |

### Adding new health checkers

To add a new health checker, you can implement the HealthChecker API and
register the health checker as an OSGI service.  
To deploy it, copy the `         .jar        ` file to the
`         <IS_HOME>/repository/component/lib/        ` directory or
the OSGI bundle and paste it in the
`         <IS_HOME>/repository/component/dropins/        `
directory.
