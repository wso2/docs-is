# Web Analytics Solutions

Web Analytics are used to analyze web traffic and user interactions on a website. {{product_name}} supports integrating [Google Analytics](https://marketingplatform.google.com/about/analytics/){target="_blank"} and [Mixpanel](https://mixpanel.com/){target="_blank"} as analytics solutions and allows you to enable either one or both of them.

## Set up web analytics

Follow the steps below to configure a web analytics solution for {{product_name}}.

1. Create an analytics project and obtain the relevant token.

    - For Google analytics:
      
        1. Follow the Google analytics [documentation](https://developers.google.com/analytics/devguides/collection/ga4){target="_blank"} and create an analytics project.
      
        2. Navigate to **Admin** > **Tracking Info** > **Tracking Code**, and look for the token of your project in `gtag('config', '<TOKEN>');`.

    - For Mixpanel:
      
        1. Follow the Mixpanel [documentation](https://docs.mixpanel.com/docs/what-is-mixpanel){taget="_blank"} and create an analytics project.
      
        2. Navigate to **Settings** > **Set up Mixpanel**, and look for the token of your project in `mixpanel.init("<TOKEN>");`.

2.  Download the [samples-is](https://github.com/wso2/samples-is/archive/master.zip){:target="_blank"} repository and extract its content.

3. In the samples-is root directory, go to `analytics-extensions` and open the `config.jsp` file. Add the token/s obtained in step 1 above to the relevant line of the file.

    ```java
    // Insert your Google Analytics token here.
    private static final String GOOGLE_ANALYTICS_TOKEN = "<GOOGLE_ANALYTICS_TOKEN>";

    // Insert your Mixpanel token here.
    private static final String MIXPANEL_TOKEN = "<MIXPANEL_TOKEN>";
    ```

4. Copy the `analytics.jsp` and `config.jsp` files found in `analytics-extensions` and paste them in both `<IS_HOME>/authenticationendpoint/include` and `<IS_HOME>/accountrecoveryendpoint/include` directories.

5. Find the `header.jsp` file located in both `<IS_HOME>/authenticationendpoint/include` and `<IS_HOME>/accountrecoveryendpoint/include` directories and add the following line to the end of the files.

    ```java
    <%-- Include analytics --%>
    <jsp:directive.include file="/includes/analytics.jsp"/>
    ```

6. [Run {{product_name}}]({{base_path}}/deploy/get-started/run-the-product/) instance and the analytics events will be fired when users access the relevant web pages. 

## Types of analytic events

The following are the events that are captured when analytics are enabled in {{product_name}}.

<table>
  <tr>
    <th>Event name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>wso2_generic_event</code></td>
    <td>A generic event that will be fired unless the event belongs to one of the types below.</td>
  </tr>
  <tr>
    <td><code>wso2_error</code></td>
    <td>An error has occurred.</td>
  </tr>
  <tr>
    <td><code>wso2_login</code></td>
    <td>The login page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_login_failure</code></td>
    <td>Login has failed.</td>
  </tr>
  <tr>
    <td><code>wso2_sign_up_username</code></td>
    <td>Self sign up username page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_sign_up_details</code></td>
    <td>Self sign up user detail collection page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_sign_up_request_complete</code></td>
    <td>A request for a self sign up has been completed.</td>
  </tr>
  <tr>
    <td><code>wso2_sign_up_process_complete</code></td>
    <td>A sign up flow has been completed including the confirmation.</td>
  </tr>
  <tr>
    <td><code>wso2_username_recovery</code></td>
    <td>Username recovery page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_password_recovery</code></td>
    <td>Password recovery page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_recovery_request_complete</code></td>
    <td>Request for a username/password recovery is complete.</td>
  </tr>
  <tr>
    <td><code>wso2_password_recovery_reset</code></td>
    <td>Password reset page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_password_recovery_complete</code></td>
    <td>A password recovery flow has been successfully completed.</td>
  </tr>
  <tr>
    <td><code>wso2_privacy_policy</code></td>
    <td>Privacy policy page has been visited.</td>
  </tr>
  <tr>
    <td><code>wso2_cookie_policy</code></td>
    <td>Cookie policy page has been visited.</td>
  </tr>
</table>

## View analytics

You can view the analytics events from the dashboards of Google Analytics and Mixpanel. The following are sample views.

### Google Analytics
![google-analytics]({{base_path}}/assets/img/guides/analytics/web-analytics/google-analytics.png)

### Mixpanel
![mixpanel-analytics]({{base_path}}/assets/img/guides/analytics/web-analytics/mixpanel-analytics.png)
