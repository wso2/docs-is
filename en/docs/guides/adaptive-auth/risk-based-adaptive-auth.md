# Configure Risk-Based Adaptive Authentication

This page guides you through configuring [risk-based adaptive authentication](insertlink) for a sample web application using a sample hardware key authenticator. This tutorial demonstrates using WSO2 Stream Processor (WSO2 SP) to publish transactional data and assess an end user's risk score based on the user's transaction history in an adaptive authentication scenario. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="{{base_path}}/guides/configure-adaptive-auth"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

Consider a business use case where a bank wants to prompt an additional authentication step when a user attempts to log in to the system after after performing a transaction of above $10,000. This use case can be achieved by creating a Siddhi application in WSO2 SP and configuring a conditional authentication script in the service provider configuration of WSO2 Identity Server (WSO2 IS).

----

## Create a Siddhi application

First, create a Siddhi application as instructed below. The application has two endpoints; one to publish transactional data, and the other to get the user's risk score.

1. Download the latest version of [WSO2 Stream Processor](https://github.com/wso2/product-sp/releases).

2. Create and deploy the following Siddhi application on a WSO2 SP worker node.
    
    For detailed instructions on how to create and deploy the Siddhi application, see [Using WSO2 Stream Processor for Adaptive Authentication](using-stream-processor.md).

    ```java
    @App:name("RiskBasedLogin")
    @App:description("Description of the plan")

    @Source(type = 'http-request', source.id='testsource', basic.auth.enabled='true', parameters="'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'sslEnabledProtocols:TLSv1.1,TLSv1.2'", receiver.url="https://localhost:8280/RiskBasedLogin/InputStream", @map(type='json', @attributes(messageId='trp:messageId',username='$.event.username')))
    define stream InputStream (messageId string, username string);

    @sink(type='http-response', source.id='testsource', message.id='{{'{{messageId}}'}}', @map(type='json'))
    define stream OutputStream (messageId string, username string, riskScore int);

    define stream TempStream (messageId string, username string, sumTransactions double);

    @Source(type = 'http', receiver.url="http://localhost:8281/RiskBasedLogin/TransactionInputStream", basic.auth.enabled='false', @map(type='json', @attributes(username='$.event.username', transaction='$.event.transaction')))
    define stream TransactionInputStream (transaction double, username string);

    from TransactionInputStream#window.time(5 min)
    right outer join InputStream#window.length(1) unidirectional 
    on TransactionInputStream.username == InputStream.username
    select InputStream.messageId, InputStream.username, sum(transaction) as sumTransactions
    group by messageId, InputStream.username
    insert into TempStream;

    from TempStream
    select messageId, username, ifThenElse(sumTransactions > 10000, 1, 0) as riskScore
    insert into OutputStream;
    ```
    
----

## Configure risk-based authentication

1.  Navigate to **Main** > **Identity** > **Service Providers** > **List**.

2.  Click **Edit** on the `saml2-web-app-pickup-dispatch.com` service provider.

3.  Expand the **Local and Outbound Configuration** section.

4.  Click **Advanced Authentication**.

5.  Expand **Script Based Conditional Authentication**.

6.  Click **Templates** on the right side of the **Script Based Conditional Authentication** field and then click **Risk-Based**. 

    ![tenant based template]({{base_path}}/assets/img/samples/login-attempts-based-template.png)

7.  Click **Ok**. The authentication script and authentication steps
    are configured. 
    
    The authentication script defines a conditional step that executes the second step of authentication (the hardware key authenticator) if the riskScore is greater than 0.

8.  The authentication steps added are `TOTP` and `Security Key/Biometrics (FIDO)`. However, these are authentication steps that you would normally use in production. 

    To try out sample authenticators with the sample application, delete the two
    authenticators and add the following sample authenticators instead.

    1.  Click **Delete** to remove the `TOTP` authenticator from Step 2 (the
        second authentication step).
        
        ![delete authenticator]({{base_path}}/assets/img/samples/delete-authenticator-1.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![add new authenticator]({{base_path}}/assets/img/samples/add-new-authenticator.png)

9. Click **Update**.

----

## Try it

1.  Start the Tomcat server and access the following sample PickUp
    application URL:

    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com> 

2.  Port offset the 9443 port in WSO2 Stream Processor. This is required because WSO2 IS also runs on the 9443 port.

    1.  Open the `deployment.yaml` file found in the `<SP_HOME>/conf/worker/` folder.

    2.  Change the `Port: 9443` to **`9444`** under `listenerConfigurations` .  

        ``` java
        listenerConfigurations:
          -
		   id: "default"
		   host: "0.0.0.0"
		   port: 9090
          -
           id: "msf4j-https"
           host: "0.0.0.0"
           port: 9444
		   scheme: https
	       keyStoreFile: "${carbon.home}/resources/security/wso2carbon.jks"
		   keyStorePassword: wso2carbon
		   certPass: wso2carbon
        ```

3.  Start the WSO2 SP server in a **Worker** profile.  
    -   For Windows: `worker.bat`
    -   For Linux: ./ `worker.sh`

4.  Log in by giving username and password credentials (e.g., admin/admin). You are logged in to the application.

    Note that the user is authenticated with basic authentication only.

5.  Log out of the application.

6.  Execute the following cURL command. This command publishes an event
    about a user bank transaction exceeding $10,000.

    !!! tip
        Replace the `<username>` tag in the cURL command given below with a valid username and ensure that the WSO2 SP Worker
        profile is running.
    

    ``` java
    curl -v -X POST   http://localhost:8281/RiskBasedLogin/TransactionInputStream   -H 'Accept: application/json'   -H 'Cache-Control: no-cache'   -H 'Content-Type: application/json'   -H 'Postman-Token: 7847a682-012d-4939-88f5-6e8ec781c144'   -d '{    "event": {
            "username": "chris",
            "transaction": 12000
        }
    }' -v
    ```

7.  Log in to the sample PickUp application. You are prompted with the
    hardware key authentication after the basic authentication step.

    Before executing the cURL command given in step 4, the user had no transaction history and the user's riskScore was 0. The
    authentication script is programmed to prompt only basic authentication if the risk score is 0.

    After executing the command, a transaction event that indicates the user spending more than $10,000 is published and recorded in the
    Siddhi application. Therefore, when the user now attempts to log in again, the user's riskScore is evaluated to 1 and the user is
    prompted for an extra step of authentication.

8.  Re-enter the number given on the screen and click **Sign In**. You
    are logged into the application.


