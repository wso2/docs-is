# Web Analytics Solutions

Web Analytics is used for the purpose of identifying the way users interact with web pages. {{product_name}} supports the integration of both Google Analytics and Mixpanel. Getting the Identity Service to fire events at different pages is easy enough. You can choose to enable either or both of the analytics services.

## Setting up web analytics

1. Download the [samples-is](https://github.com/wso2/samples-is/archive/master.zip) repository and extract its content.

2. Open the `config.jsp` file in the `analytics-extensions` directory and replace the relevant token string of the analytics service that needs to be enabled.

    1. Get a Google Analytics token.
        1. Create a Google Analytics project.
        2. Go to **Admin** > **Tracking Info** > **Tracking Code**.
        3. Look for the token of your project inside, 
        `gtag('config', '<TOKEN>');`.

    2. Get a Mixpanel token.
        1. Create a Mixpanel project.
        2. Go to **Settings** > **Set up Mixpanel**.
        3. Look for the token of your project inside, 
        `mixpanel.init("<TOKEN>");`.

3. Replace the following files inside the `<IS_HOME>` directory with the respective files in the `analytics-extensions` directory.

    <table>
      <tr>
        <th>Original file</th>
        <th>File to replace</th>
      </tr>
      <tr>
        <td><code>IS_HOME/repository/deployment/server/webapps/<br>authenticationendpoint/includes/localize.jsp</code></td>
        <td><code>samples-is/analytics-extensions/authenticationendpoint/localize.jsp</code></td>
      </tr>
      <tr>
        <td><code>IS_HOME/repository/deployment/server/webapps/<br>accountrecoveryendpoint/includes/localize.jsp</code></td>
        <td><code>samples-is/analytics-extensions/accountrecoveryendpoint/localize.jsp</code></td>
      </tr>
    </table>

4. Copy the `analytics.jsp` and `config.jsp` files inside the `analytics-extensions` directory to both the `authenticationendpoint/include` and `accountrecoveryendpoint/include` directories in the `<IS_HOME>` directory.

5. Run [{{product_name}}]({{base_path}}/deploy/get-started/run-the-product/) instance in the usual way and the analytics events will be fired when the users access the relevant web pages. 

## Types of analytic events

The following events are captured after enabling the analytics integration in the {{product_name}}. 

<table>
  <tr>
    <th>Event name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>wso2_generic_event</code></td>
    <td>A generic type of event that will be fired unless the event belongs to one of the types below.</td>
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

You can view the analytics events for your application through the Google Analytics and Mixpanel dashboards. 

### Google Analytics
![google-analytics]({{base_path}}/assets/img/guides/analytics/web-analytics/google-analytics.png)

### Mixpanel
![mixpanel-analytics]({{base_path}}/assets/img/guides/analytics/web-analytics/mixpanel-analytics.png)
