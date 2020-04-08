# Tenant-Wise Email Sender Configuration

This page guides you demonstrates how to setup the email notification configurations tenant-wise. 

!!! warning
    To use this feature, apply the **0174** and **0196** WUM updates for WSO2 Identity Server 5.9.0 using the WSO2 Update Manager (WUM). To deploy a WUM update into production, you need to have a paid subscription. If you do not have a paid subscription, you can use this feature with the next version of WSO2 Identity Server when it is released. For more information on updating WSO2 Identity Server using WUM, see Updating WSO2 Products

When handling notifications such as the ones given below, the email-sender configuration needs to be changed in `<IS-HOME>/repository/conf/deployment.toml`. 

- [EmailOTP](../../learn/configuring-email-otp)
- [Password Recovery](../../learn/password-recovery)
- [Username Recovery](../../learn/username-recovery)
- [Creating Users using the Ask PasswordOption](../../learn/creating-users-using-the-ask-password-option)


**Email configurations**

 ``` toml
 [output_adapter.email]
 from_address= "wso2iamtest@gmail.com"
 username= "wso2iamtest"
 password= "Wso2@iam70"
 hostname= smtp.gmail.com
 port= 587
 enable_start_tls= true
 enable_authentication= true
 ```
 However, this configuration will apply to all the tenants. If you wish to configure them tenant-wise follow the instructions given below instead. 
 
1. Configure the [Configuration Management REST API](../../develop/using-the-configuration-management-rest-apis). 
2. Execute the following curl command for creating a resource type named `Publisher`. 

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1.0/resource-type" -H "accept: 
    application/json" -H 
    "Content-Type: application/json" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d "{ \"name\": \"Publisher\", \"description\": \"Publisher Configurations\"}"
    ```
3. Execute the following curl command for creating a resource named `EmailPublisher`. 

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1.0/resource/Publisher" -H "accept: 
    application/json" -H "Content-Type: application/json" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -d "{ \"name\": \"EmailPublisher\", \"attributes\": [ { \"key\": \"email\", \"value\": \"string\" } ]}"
    ```
4. Execute the following curl command for creating a file named `EmailPublisher`. 

    **Sample Request**
    ``` java 
    curl -X POST "https://localhost:9443/t/{tenant-domain}/api/identity/config-mgt/v1
    .0/resource/Publisher/EmailPublisher/file" -H "accept: application/json" -H 
    "Content-Type: multipart/form-data" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -F "resourceFile=@EmailPublisher.xml;type=text/xml" -F "file-name=EmailPublisher"
    ```
    This `EmailPublisher.xml` file will be used as the tenant's email publisher file. We can configure the tenant 
    wise email configurations here. 
    
    Configurable parameters are given below. 
    
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
    
    ??? info "Sample Email Publisher"
        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <eventPublisher name="EmailPublisher" statistics="disable"
          trace="disable" xmlns="http://wso2.org/carbon/eventpublisher">
          <from streamName="id_gov_notify_stream" version="1.0.0"/>
          <mapping customMapping="enable" type="text">
            <inline>{{body}}{{footer}}</inline>
          </mapping>
          <to eventAdapterType="email">
            <property name="email.address">{{send-to}}</property>
            <property name="email.type">{{content-type}}</property>
            <property name="email.subject">{{subject}}</property>
            <property name="mail.smtp.password">xxxxx</property>
            <property name="mail.smtp.from">resourcesiam@gmail.com</property>
            <property name="mail.smtp.user">resourcesiam</property>
          </to>
        </eventPublisher>
        ``` 
        
    !!! note
        You do not need to configure all the configurable parameters. If a parameter has not been configured in the `EmailPublisher.xml` file, configurations in the `output-event-adapters.xml` will be used instead. 
    
5. Since these configurations will be applicable during the tenant loading process, [Configure tenant loading and 
unloading for your tenant](../../administer/configuring-the-tenant-loading-policy). 

    !!! tip
        Only one `EmailPublisher.xml` file with the name `EmailPublisher` should be added for a tenant.

    
