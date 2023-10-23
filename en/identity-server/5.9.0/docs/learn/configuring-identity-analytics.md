# Configuring Identity Analytics

Using the WSO2 Identity Server Analytics distribution, you can view and analyze statistics related to authentication requests that go through the WSO2 Identity Server. For more information, see [Analytics](../../learn/analytics).

## Scenario

A taxi company called "Pickup" has launched a new application to be used by their customers. The Pickup developers wish to measure the performance of the authentication mechanism used for users to log into the application so that they can improve the user login experience. 

To do this, the developers need to view authentication statistics about the login attempts to the application. This tutorial demonstrates how the Pickup developers can setup WSO2 IS Analytics to view login attempts to the Pickup application. 

## Set up 

1. [Download WSO2 Identity Server](https://wso2.com/identity-and-access-management/).

2. [Download WSO2 Identity Server Analytics distribution](https://github.com/wso2/analytics-is/releases/tag/v5.8.0-rc3).

## Enable analytics

Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder and add the following event listeners to enable analytics in WSO2 Identity Server. 
 
``` toml
[[event_listener]]
id = "authn_data_publisher_proxy"
type = "org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"
name = "org.wso2.carbon.identity.data.publisher.application.authentication.AuthnDataPublisherProxy" 
order = 11
```

``` toml
[identity_mgt.analytics_login_data_publisher]
enable=true
```

```toml
[identity_mgt.analytics_session_data_publisher] 
enable=true
```

The rest of the configurations required to connect the analytics distribution with the WSO2 IS distribution have already been pre-configured for fresh distributions. To see more information about these pre-configurations, see [Prerequisites to Publish Statistics](../../learn/prerequisites-to-publish-statistics). 

If you do not need to change the default values, proceed to start the servers. 

## Start the servers

1. Navigate to `<IS_HOME>/bin` directory via a command prompt and start the WSO2 IS server by executing one of the following commands.

    ``` java tab="Linux/MacOS"
    sh wso2server.sh
    ```

    ``` java tab="Windows"
    wso2server.bat run
    ```

2. WSO2 IS Analytics has two nodes. Navigate to `<ISANALYTICS_HOME>/bin` directory and execute the following commands via a command prompt to start each node. 
    1. Start the worker node. The worker node listens to the authentication statistics from WSO2 Identity Server and then analyzes and monitors them. 
    
        ``` java tab="Linux/MacOS"
        sh worker.sh
        ```

        ``` java tab="Windows"
        worker.bat run
        ```

    2. Start the dashboard node. The dashboard node displays the processed information using the dashboard interface. 

        ``` java tab="Linux/MacOS"
        sh dashboard.sh
        ```

        ``` java tab="Windows"
        dashboard.bat run
        ```

## Try it out

Let's create some basic authentication statistics. To do this, log in to the WSO2 IS dashboard. This login attempt will be published to WSO2 IS Analytics and you will be able to view the login attempt using the WSO2 IS Analytics dashboard. 

1. Log in to the [WSO2 Identity Server User Dashboard](https://localhost:9443/dashboard/) using admin/admin credentials. 

2. Next, access the WSO2 Identity Server Analytics Dashboard at the following URL: 

    `http://<HTTPS_IS_ANALYTICS_HOST>: 9643 /portal`

3. Log in using admin/admin credentials. 

4. Click **IS Analytics**. 

    ![is-analytics](../assets/img/learn/is-analytics.png)

    Note that there is 1 successful login attempt published on the dashboard. 

    ![is-analytics-login-attempts](../assets/img/learn/is-analytics-login-attempts.png)

You have succesfully enabled WSO2 IS Analytics and published statistics to the dashboard. For more information on what you can do with IS analytics, see [Analytics](../../learn/analytics).
