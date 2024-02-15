# Configure the email sending module

This document explains the steps to configure WSO2 Identity Server to send emails during multiple email-related customer identity and access management tasks such as [email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/), email notifications, and account recovery.

## Configure the email sender (globally)

Follow the steps given below to enable the email sender globally for all tenants in your WSO2 IS.

1. Shut down the server if it is running.
2. Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

    ```toml
    [output_adapter.email]
    from_address= "wso2iamtest@gmail.com"
    username= "wso2iamtest"
    password= "Wso2@iam70"
    hostname= "smtp.gmail.com"
    port= 587
    enable_start_tls= true
    enable_authentication= true
    signature = "ABC.com"
    ```
    <table>
      <tr>
        <th>Property</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>from_address</code></td>
        <td>This is the mail address from where you want to send the notification. It can be any working mail address.</td>
      </tr>
      <tr>
        <td><code>username</code></td>
        <td>Provide the username of the SMTP account. <br/> Username of the mail you have provided in <strong>from_address</strong>.</td>
      </tr>
      <tr>
        <td><code>password</code></td>
        <td>Provide the password of the SMTP account. <br/> Password of the mail you have provided in <strong>from_address</strong>.</td>
      </tr>
      <tr>
        <td><code>host</code></td>
        <td>The SMTP server to connect to.</td>
      </tr>
      <tr>
        <td><code>port</code></td>
        <td>This is the SMTP server port to connect to if the connect() method does not explicitly specify one. Defaults to 25.</td>
      </tr>
      <tr>
        <td><code>enable_start_tls</code></td>
        <td>If true, this enables using the <code>STARTTLS</code> command (if enabled before issuing any login commands. Note that an appropriate trust store must be configured so that the client will trust the server's certificate. Defaults to <code>false</code>.</td>
      </tr>
      <tr>
        <td><code>enable_authentication</code></td>
        <td>If true, attempt to authenticate the user using the AUTH command. Defaults to <code>false</code>.</td>
      </tr>
      <tr>
        <td><code>signature</code></td>
        <td>Signature of the sender account.</td>
      </tr>
    </table>

    !!! Tip
        For information about the SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).

    !!! info
        - If you use a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1).
        After you get an **App Password** from Google, update the `password`.
        - If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
        ```toml
        password= "<![CDATA[xxxx]]>"
        ```

3. Save the configurations and start the server.

<!-- TODO 
Reason for commenting: Tenant configs are not promoted in IS 7

## Configure the email sender (per tenant)

Follow the steps given below to enable the email sender per tenant.

1.  Configure the [Configuration Management REST API]({{base_path}}/apis/use-the-configuration-management-rest-apis/). 
2.  Execute the following curl command to create a resource type named `Publisher`. 

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1.0/resource-type" -H "accept: 
    application/json" -H 
    "Content-Type: application/json" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d "{ \"name\": \"Publisher\", \"description\": \"Publisher Configurations\"}"
    ```

3.  Execute the following curl command for creating a resource named `EmailPublisher`. 

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1.0/resource/Publisher" -H "accept: 
    application/json" -H "Content-Type: application/json" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d "{ \"name\": \"EmailPublisher\", \"attributes\": [ { \"key\": \"email\", \"value\": \"string\" } ]}"
    ```
	
4.  Execute the following curl command for creating a file named `EmailPublisher`. 

    !!! info
        This `EmailPublisher.xml` file will be used as the tenant's email publisher file. Configure the tenant-wise email configurations in the `EmailPublisher.xml` file.

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1
    .0/resource/Publisher/EmailPublisher/file" -H "accept: application/json" -H 
    "Content-Type: multipart/form-data" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -F "resourceFile=@EmailPublisher.xml;type=text/xml" -F "fileName=EmailPublisher"
    ```
    
5.  Open the `EmailPublisher.xml` file and configure the parameters given below.

    !!! note
        -   Only one `EmailPublisher.xml` file with the name `EmailPublisher` should be added to a tenant.
        -   You do not need to configure all the configurable parameters. If a parameter has not been configured in the `EmailPublisher.xml` file, configurations in the `output-event-adapters.xml` will be used instead.
    
    <table>
    <thead>
    <tr class="header">
    <th><p>Property name</p></th>
    <th><p>Description</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>             mail.smtp.user            </code></td>
    <td>User Name for the sender smtp server</td>
    </tr>
    <tr class="even">
    <td><code>             mail.smtp.password            </code></td>
    <td><p>Password for the sender smtp server</p></td>
    </tr>
    <tr class="odd">
    <td><code>             mail.smtp.port            </code></td>
    <td><p>Port of the sender smtp server</p></td>
    </tr>
    <tr class="even">
    <td><code>             mail.smtp.from            </code></td>
    <td>From email address of the smtp server</td>
    </tr>
    <tr class="odd">
    <td><code>             mail.smtp.host            </code></td>
    <td>Host name of the smtp server</td>
    </tr>
    <tr class="even">
    <td><code>             mail.smtp.auth           </code></td>
    <td>Password hash method to use when storing user entries in the user store.</td>
    </tr>
    <tr class="odd">
    <td><code>             mail.smtp.starttls.enable           </code></td>
    <td>Property to enable STARTTLS support for JavaMail</td>
    </tr>
    <tr class="even">
    <td><code>             mail.smtp.replyTo           </code></td>
    <td>Reply to address of smtp server</td>
    </tr>
    <tr class="odd">
    <td><code>             mail.smtp.signature           </code></td>
    <td>Signature for the sender account</td>
    </tr>
    </tbody>
    </table>
    
    Following is a sample configuration for the `EmailPublisher.xml` file. 
    
    ``` xml
    <?xml version="1.0" encoding="UTF-8"?>
    <eventPublisher name="EmailPublisher" statistics="disable"
        trace="disable" xmlns="http://wso2.org/carbon/eventpublisher">
        <from streamName="id_gov_notify_stream" version="1.0.0"/>
        <mapping customMapping="enable" type="text">
        <inline>{{'{{body}}'}}{{'{{footer}}'}}</inline>
        </mapping>
        <to eventAdapterType="email">
        <property name="email.address">{{'{{send-to}}'}}</property>
        <property name="email.type">{{'{{content-type}}'}}</property>
        <property name="email.subject">{{'{{subject}}'}}</property>
        <property name="mail.smtp.password">xxxxx</property>
        <property name="mail.smtp.from">resourcesiam@gmail.com</property>
        <property name="mail.smtp.user">resourcesiam</property>
        </to>
    </eventPublisher>
    ```  

5.	Since these configurations will be applicable during the tenant loading process, [configure tenant loading and 
unloading for your tenant]({{base_path}}/guides/tenants/configure-the-tenant-loading-policy).-->
