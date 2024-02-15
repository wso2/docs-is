# Add MFA based on ELK-risk

The following guide shows you how to prepare the WSO2 Identity server for adaptive authentication using ELK analytics.

## Prerequisite

[Configure ELK Analytics]({{base_path}}/deploy/elk-analytics-installation-guide/) in WSO2 Identity Server.

## Configure the analytics engine in WSO2 IS

Follow the steps below to configure the analytics engine in WSO2 Identity Server that establishes the connection between WSO2 Identity Server and ELK.

1. On the WSO2 Identity Server Console, click **Analytics**.

2. Configure the following properties.
   ![elk-analytics-engine-properties]({{base_path}}/assets/img/elk-analytics/risk-based-adaptive-authentication/risk-based-adaptive-authentication-4.png){: width="800" style="display: block; margin-left: 0;"}
  
      <table>
      <thead>
      <tr class="header">
      <th>Property</th>
      <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr class="odd">
      <td>Host URL</td>
      <td>The target hostname and target port for Elasticsearch.</td>
      </tr>
      <tr class="even">
      <td>Enable Basic Authentication</td>
      <td>Turn the toggle on to enable authentication with username and password credentials.</td>
      </tr>
      <tr class="odd">
      <td>Elasticsearch Username</td>
      <td>The username of the Elasticsearch admin user.</td>
      </tr>
      <tr class="even">
      <td>Elasticsearch Password</td>
      <td>The password of the Elasticsearch admin user.</td>
      </tr>
      <tr class="odd">
      <td>HTTP Connection Timeout</td>
      <td>The connection timeout interval in milliseconds. If the endpoint does not respond within this time, the   connection attempt fails.</td>
      </tr>
      <tr class="even">
      <td>HTTP Read Timeout</td>
      <td>The timeout interval in milliseconds for each <code>read()</code> call on the <code>               InputStream</code> . If the server does not respond with data within this time, the connection is terminated.</td>
      </tr>
      <tr class="odd">
      <td>HTTP Connection Request Timeout</td>
      <td>The timeout interval in milliseconds for requesting a connection with Elasticsearch.</td>
      </tr>
      <tr class="even">
      <td>Hostname Verification</td>
      <td>Possible values are: STRICT or ALLOW_ALL.<br />
      <strong>STRICT</strong> - When this mode is enabled, hostnames will be strictly verified against the hostname   specified in the product's SSL certificate. For example, if `*.foo.com` is specified as the hostname in the certificate, only this specific hostname is authorized by the server. That is, subdomains such as `a.b.foo.com`" or ip addresses such as `127.10.11.1` will  <strong>not</strong> be authorized. <br /><strong>ALLOW_ALL</strong> - This option turns off hostname verification    for the server. Note that this is not recommended in a production setup and should only be used for demonstrations    and testing.</td>
      </tr>
      </tbody>
      </table>

3. Click **Update** to save the changes.

## Add Elasticsearch certificate to WSO2 Identity Server

 An HTTPS connection is used to communicate between WSO2 IS and Elasticsearch. Therefore the Elasticsearch certificate needs to be imported to the WSO2 IS.

To import the certificate, open a terminal window and run the following command.

 ```
   keytool -trustcacerts -keystore {IS_HOME}/repository/resources/security/client-truststore.jks -storepass wso2carbon -importcert -alias elk -file {ELASTICSEARCH_HOME}/config/certs/http_ca.crt
 ```

!!! info
      This example uses the default keystores and certificates. Replace {IS_HOME} and {ELASTICSEARCH_HOME} accordingly. The default keystore password is `wso2carbon`.

## What's Next?

Now that you have prepared WSO2 Idenity server for adaptive authentication using ELK analytics, [try an ELK-based adaptive authentication scenario]({{base_path}}/guides/authentication/conditional-auth/elk-risk-based-template).
