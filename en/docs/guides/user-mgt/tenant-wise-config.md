# Manage Tenant-Wise Email Sender Configurations 

When handling notifications such as the ones given below, the email-sender configuration needs to be changed in `<IS-HOME>/repository/conf/deployment.toml`. 

- [EmailOTP](insert-link-admin-portal)
- [Password Recovery](insert-link-admin-portal)
- [Username Recovery](insert-link-admin-portal)
- [Creating Users using the Ask PasswordOption](../../guides/user-mgt/ask-password)

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
 However, this configuration will apply to all the tenants. If you wish to configure them tenant-wise, follow the instructions given below. 
 
1. Configure the [Configuration Management REST API](insert-rest-api-link). 
2. Execute the following curl command to create a resource type named `Publisher`. 

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
    "Content-Type: multipart/form-data" -H 'Authorization: Basic YWRtaW46YWRtaW4=' -F "resourceFile=@EmailPublisher.xml;type=text/xml" -F "fileName=EmailPublisher"
    ```
    This `EmailPublisher.xml` file will be used as the tenant's email publisher file. Configure the tenant-wise email configurations in the 'EmailPublisher.xml' file.
    
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
unloading for your tenant](insert-link). 

    !!! tip
        Only one `EmailPublisher.xml` file with the name `EmailPublisher` should be added for a tenant.

    
