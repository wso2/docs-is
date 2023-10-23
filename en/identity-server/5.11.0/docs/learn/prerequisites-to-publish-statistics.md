# Prerequisites to Publish Statistics

The following prerequisites should be fulfilled in order to set up
the Analytics Dashboard to publish the data processed by WSO2 IS.

### Step 01: Download WSO2 IS Analytics

The binary distribution contains the binary files for both MS Windows
and Linux-based operating systems.

Follow the steps below to download WSO2 IS Analytics binary
distribution.

1.  Go to the [WSO2 IS Analytics download
    page](https://wso2.com/identity-and-access-management/install/analytics/).
2.  Download the WSO2 Identity Server Analytics 5.8.0 pack.
    
    !!! Note 
        WSO2 Identity Server 5.11.0 analytics capabilities are fully
        compatible with WSO2 IS Analytics 5.8.0. Please note that **WSO2 IS
        Analytics 5.8.0 is the recommended version for WSO2 Identity Server
        5.11.0**.
    
    1.  To download the pack with updates, click **SIGN-IN & DOWNLOAD**
        .

    2.  To download the pack without updates, click **DOWNLOAD**.

    !!! note
        The installation prerequisites for WSO2 IS Analytics is as same as
        for WSO2 Stream Processor (WSO2 SP). Therefore, for detailed
        information about the supporting applications you need to install,
        see [WSO2 SP Installation
        Guide](https://docs.wso2.com/stream-processor/Installation+Guide).
    

### Step 02: Enable Analytics in WSO2 IS

Follow the steps below to enable event publishing in WSO2 IS.

1.  Open the `          deployment.toml         ` file in the
    `          <IS_HOME>/repository/conf/         ` directory.

2.  Enable the following event handlers by adding the following configurations to the same `deployment.toml` file.

    <table>
    <tbody>
    <tr class="odd">
    <td>Event Handler</td>
    <td><code>               org.wso2.carbon.identity.data.publisher.authentication.analytics.login.AnalyticsLoginDataPublishHandler              </code></td>
    </tr>
    <tr class="even">
    <td>Purpose</td>
    <td><p>Enable this handler only when you want to analyze login statistics in WSO2 IS. For more information, see <a href="../../learn/analyzing-the-local-login-attempts">Analyzing Statistics for Local Login Attempts</a> .</p></td>
    </tr>
    <tr class="odd">
    <td>Configuration</td>
    <td><div class="content-wrapper">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: toml; gutter: false; theme: Confluence">
    <pre class="sourceCode java"><code class="sourceCode java">
    <a class="sourceLine" id="cb1-1" title="1">
    [identity_mgt.analytics_login_data_publisher] </br>
    enable=true
    </a>
    </code>
    </pre>
    </div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>

    <table>
    <tbody>
    <tr class="odd">
    <td>Event Handler</td>
    <td><code>               org.wso2.carbon.identity.data.publisher.authentication.analytics.session.AnalyticsSessionDataPublishHandler              </code></td>
    </tr>
    <tr class="even">
    <td>Purpose</td>
    <td><p>Enable this handler only when you want to analyze session statistics in WSO2 IS Analytics. For more information, see <a href="../../learn/analyzing-session-statistics">Analyzing Statistics for Sessions</a> .</p></td>
    </tr>
    <tr class="odd">
    <td>Configuration</td>
    <td><div class="content-wrapper">
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: toml; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">
    [identity_mgt.analytics_session_data_publisher] </br>
    enable=true
    </a></code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>
    
    **Enable analytics for Password grant logins**
     Optionally, you can enable analytics for password grant type logins. Add the following configuration to the 
     deployment.toml file to enable this feature.
         
     ```
     [analytics]
     publish_password_grant_logins=true
     ```
     
### Step 03: Configure Event Publishers

In a fresh WSO2 IS pack, you can view all the event publishers related
to WSO2 IS Analytics in the
`         <IS_HOME>/repository/deployment/server/eventpublishers        `
directory.

!!! tip
    
    The required configurations described below are available by default.
    Thus, follow this section to understand the analytics-related
    configurations used in the process and do any modifications if required.
    

WSO2 Analytics presents the login and/or session data published by WSO2
IS. To receive these data by Analytics, you need to configure the event publishers.

Follow the steps below to configure the event publishers:

1.  Configure the login analytics and session analytics using the
    following files. Update the properties based on the description given in the below table.

    1.  **Login analytics** :
        `            <IS_HOME>/repository/deployment/server/eventpublishers/IsAnalytics-Publisher-wso2event-AuthenticationData.xml           `
    2.  **Session analytics** :
        `             <IS_HOME>/repository/deployment/server/eventpublishers/IsAnalytics-Publisher-wso2event-SessionData.xml            `

        The configurations for login analytics and session analytics are
        almost the same except for **event streams**. This is because
        the format in which the events are captured for the two
        analytics are different. For more information event streams, see
        [WSO2 SP Quick Start
        Guide](https://docs.wso2.com/stream-processor/Quick+Start+Guide).

        !!! warning
        
                The event streams that are specified for publishers should not
                be modified as that would cause errors in the default
                configuration.
        

        The common properties that can be configured for event
        publishers in the files mentioned above are as follows.

        <table>
        <thead>
        <tr class="header">
        <th>Adapter Property</th>
        <th>Description</th>
        <th>Configuration File</th>
        <th>Example</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td><strong>Receiver URL</strong></td>
        <td><div class="content-wrapper">
        <ul>
        <li><p>This captures the target receiver <code>                     URL                    </code> to which the WSO2 IS-related information are sent as events.</p></li>
        <li><p>Format:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">tpc:<span class="co">//&lt;HOSTNAME&gt;:&lt;THRIFT_PORT&gt;</span></a></code></pre></div>
        </div>
        </div></li>
        <li>When specifying the thrift port, the default port offsets done for WSO2 IS Analytics should be considered, e.g., if WSO2 IS Analytics was started with a port offset of <code>                    1                   </code>, the thrift port should be <code>                    7612                   </code> instead of <code>                    7611                   </code> .</li>
        <li><p>For high availability scenarios, multiple analytics receivers can be defined by configuring multiple comma-separated URLs with the format.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{tcp:<span class="co">//&lt;HOSTNAME&gt;:&lt;PORT&gt;,tcp://&lt;hostname&gt;:&lt;PORT&gt;,...}</span></a></code></pre></div>
        </div>
        </div></li>
        <li>As per the above configuration, events are published to all the defined receivers. For other ways of configuring the receiver URLs, see <a href="https://docs.wso2.com/stream-processor/Collecting+Events">Collecting Events</a> .</li>
        </ul>
        </div></td>
        <td><code>                 receiverURL                </code></td>
        <td><div class="content-wrapper">
        <ul>
        <li><p>For a single analytics receiver: <code>                                           tcp://localhost:7612                                         </code></p></li>
        <li><p>For multiple analytics reievers:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;property name=<span class="st">&quot;receiverURL&quot;</span>&gt;tcp:<span class="co">//al.km.wso2.com:7614,tcp://al.km.wso2.com:7615&lt;/property&gt;</span></a></code></pre></div>
        </div>
        </div></li>
        </ul>
        </div></td>
        </tr>
        <tr class="even">
        <td><br />
        </td>
        <td><div class="content-wrapper">
        <ul>
        <li>This captures the <code>                    URL                   </code> of the authenticator.</li>
        <li><p>Format:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">ssl:<span class="co">//&lt;HOSTNAME&gt;:&lt;SSL_PORT&gt;</span></a></code></pre></div>
        </div>
        </div></li>
        <li>When specifying the SSL port, the default port offsets done for WSO2 IS should be considered, e.g., if WSO2 IS was started with a port offset of <code>                    1                   </code>, the SSL port should be <code>                    7712                   </code> instead of <code>                    7711                   </code> .</li>
        <li><p>This parameter is not included in the <code>                     &lt;IS_HOME&gt;repository/deployment/server/eventpublishers/IsAnalytics-Publisher-wso2event-AuthenticationData.xml                    </code> file by default. When it is not included, the authenticator URL is derived by adding 100 to the thrift port.</p></li>
        </ul>
        </div></td>
        <td><code>                 authenticatorURL                </code></td>
        <td><div class="content-wrapper">
        <p><code>                                       ssl://localhost:7712                                     </code></p>
        <p><br />
        </p>
        </div></td>
        </tr>
        <tr class="odd">
        <td><strong>User Name</strong></td>
        <td><div class="content-wrapper">
        <p><br />
        </p>
        <ul>
        <li><p>This captures the user name of the listener.</p></li>
        <li><p>If the <code>                     EnableEmailUserName                    </code> property in the <code>                     &lt;IS_HOME&gt;/repository/conf/carbon.xml                    </code> is set to true, define the user name with the tenant domain.<br />
        Example:</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">&lt;property name=<span class="st">&quot;username&quot;</span>&gt;admin<span class="at">@wso2</span>.<span class="fu">com</span><span class="at">@carbon</span>.<span class="fu">super</span>&lt;/property&gt;</a></code></pre></div>
        </div>
        </div>
        <p>For more information, see <a href="../../learn/using-email-address-as-the-username">Using Email Address as the User Name</a> .</p></li>
        </ul>
        <p><br />
        </p>
        </div></td>
        <td><code>                 username                </code></td>
        <td><code>                 wso2event-user                </code></td>
        </tr>
        <tr class="even">
        <td><strong>Password</strong></td>
        <td><ul>
        <li><p>This captures the <code>                    password                   </code> of the listener.</p></li>
        </ul></td>
        <td><code>                 password                </code></td>
        <td><code>                 wso2event-password                </code></td>
        </tr>
        <tr class="odd">
        <td><strong>Protocol</strong></td>
        <td><ul>
        <li><p>This captures the <code>                    communication protocol                   </code> that is used to publish events.</p></li>
        </ul></td>
        <td><code>                 protocol                </code></td>
        <td><code>                 thrift/binary                </code></td>
        </tr>
        <tr class="even">
        <td><strong>Publishing Mode</strong></td>
        <td><ul>
        <li><p>This captures the <code>                    event publishing mode                   </code> .</p>
        <ul>
        <li><strong>Non-blocking</strong> : This refers to asynchronouns publishing.</li>
        <li><strong>Blocking</strong> : This refers to sychronous publishing.</li>
        </ul></li>
        </ul></td>
        <td><code>                 publishingMode                </code></td>
        <td><code>                 non-blocking/blocking                </code></td>
        </tr>
        <tr class="odd">
        <td><strong>Publishing Timeout</strong></td>
        <td><ul>
        <li><p>This captures the <code>                    timeout                   </code> for the non-blocking publishing mode that is denoted as a positive integer.</p></li>
        </ul></td>
        <td><code>                 publishTimeout                </code></td>
        <td><code>                 0                </code></td>
        </tr>
        </tbody>
        </table>

### Step 04: Change the Admin Password and Add Key-store certificates

Similar to Step 03, change the admin password and import keystore certificates.

1.  Navigate to the
    `           <IS_HOME>/repository/deployment/server/eventpublishers/IsAnalytics-Publisher-wso2event-AuthenticationData.xml          `
    configuration file and update the admin password.

    !!! note
    
        In a fresh WSO2 IS pack the password will appear in plain text. Once
        you restart the pack the password gets automatically encrypted.
    
        Example:
    
        ``` xml
        <eventPublisher
        name="IsAnalytics-Publisher-wso2event-AuthenticationData"
        statistics="disable" trace="disable" xmlns="http://wso2.org/carbon/eventpublisher">
            <from streamName="org.wso2.is.analytics.stream.OverallAuthentication" version="1.0.0"/>
            <mapping customMapping="disable" type="wso2event"/>
            <to eventAdapterType="wso2event">
                <property name="username">admin</property>
                <property name="protocol">thrift</property>
                <property name="publishingMode">non-blocking</property>
                <property name="publishTimeout">0</property>
                <property name="receiverURL">tcp://localhost:7612</property>
                <property encrypted="true" name="password">kuv2MubUUveMyv6GeHrXr9il59ajJIqUI4eoYHcgGKf/BBFOWn96NTjJQI+wYbWjKW6r79S7L7ZzgYeWx7DlGbff5X3pBN2Gh9yV0BHP1E93QtFqR7uTWi141Tr7V7ZwScwNqJbiNoV+vyLbsqKJE7T3nP8Ih9Y6omygbcLcHzg</property>
            </to>
        </eventPublisher>
        ```
    
        If you want to change the admin password, include the new password
        in plain text in WSO2 IS event publishers.
    

2.  Import the
    `           public certificate          ` of each keystore to the
    `           client­-truststore.jks          ` of the WSO2 IS using
    the following command.

    ``` java
    keytool -import -alias <alias> -file <file_name> -keystore client-truststore.jks -storepass wso2carbon
    ```

### Step 05: Run the Servers

Follow the steps below to run WSO2 IS and WSO2 IS Analytics.

1.  Run or restart WSO2 IS. For detailed instructions, see [Running the
    Product](../../setup/running-the-product).
2.  Run the WSO2 IS Analytics profiles.

    !!! note
    
        -   If you are using geolocation-based statistics, do the necessary
            configurations prior to the restart. For more information, see
            [Enabling Geolocation Based
            Statistics](../../learn/enabling-geolocation-based-statistics).
    
        <!-- -->
    
        -   If you are running WSO2 IS Analytics in a clustered setup, see
            [WSO2 Stream Processor Deployment
            Guide](https://docs.wso2.com/stream-processor/Deployment+Guide).
            The viable cluster types for WSO2 IS Analytics are [Minimum High Availability 
            Deployment](https://docs.wso2.com/display/SP440/Minimum+High+Availability+Deployment) 
            (recommended) and [Fully Distributed 
            Deployment](https://docs.wso2.com/display/SP440/Fully+Distributed+Deployment).
            For both types, database system state persistence need to be enabled and configured.
            If required, the dashboard profile can be hosted outside the cluster with
            the state persistence database of the cluster configured as a datasource.

    1.  Run the Worker node of WSO2 IS Analytics. For detailed
        instructions, see [WSO2 SP - Starting Worker
        Node](https://docs.wso2.com/stream-processor/Running+the+Product#RunningtheProduct-Startingaworkernode)
        .

    2.  Run the Dashboard node of WSO2 IS Analytics. For detailed
        instructions, see [WSO2 SP - Starting a Dashboard
        Node](https://docs.wso2.com/stream-processor/Running+the+Product#RunningtheProduct-Startingadashboardnode)
        .
