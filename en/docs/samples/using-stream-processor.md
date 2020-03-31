# Using Stream Processor for Adaptive Authentication

This page guides you through configuring a [Siddhi application](insertlink) using [WSO2 Stream Processor (WSO2 SP)](insertlink) to publish transactional data and assess an end user's risk score based on the user's transaction history in an adaptive authentication scenario. This Siddhi application can be used for risk-based adaptive authentication.

WSO2 SP has 4 main runtimes. This tutorial demonstrates the use of the **Editor** runtime to create a Siddhi application and the **Worker** runtime to run the script.

----

## Creating a Siddhi application

1.  Download the latest version of [WSO2 Stream Processor](https://github.com/wso2/product-sp/releases).

2.  Extract the downloaded zip and navigate to the `<SP_HOME>/bin` directory (`<SP_HOME>` is the extracted directory).

3.  Issue one of the following commands to start the WSO2 Stream
    Processor Studio.
    -   For Windows: `editor.bat`
    -   For Linux: ./ `editor.sh`
    
4.  Access the Stream Processor Studio through the following URL: 

    http://\<HOST\_NAME\>:\<EDITOR\_PORT\>/editor.

    !!! info 
        The default URL is: <http://localhost:9390/editor>.

    The Stream Processor Studio opens.

5.  Click **New** to start creating a new Siddhi application.

6.  Enter a name for your Siddhi application. In this scenario, let's name the application `RiskBasedLogin` as shown below.

    ``` java
    @App:name("RiskBasedLogin")
    ```

    ![sp-risk-based-login](../assets/img/samples/sp-risk-based-login.png)

7.  Add the following HTTP source to the Siddhi application.

	!!! info 
		Siddhi sources are usually asynchronous, which means you will receive an acknowledgement with a `200 OK` response when you publish an event to a source. The code block given below shows the sample HTTP source used in this tutorial. For more information, see [HTTP sources](https://siddhi-io.github.io/siddhi-io-http/).

    ``` java tab="Sample HTTP Source"
	@Source(type = 'http', receiver.url="http://localhost:8281/RiskBasedLogin/TransactionInputStream", basic.auth.enabled='false', @map(type='json', @attributes(username='$.event.username', transaction='$.event.transaction')))
	define stream TransactionInputStream (transaction double, username string);
    ```

    ![http-source-in-siddhi](../assets/img/samples/http-source-in-siddhi.png)

    For information about streams, sources, and sinks, see [Siddhi application](insertlink). 

	In this tutorial, the source you just created is considered as the stream used to publish events about the transaction that a user has
	made.

8.  Click on **File > Save** to save the application.

9.  Click **Run** or the play button
    ![sp-play](../assets/img/samples/sp-play.png) to run the script using the
    editor. If the application starts successfully, you will see the following log in the Stream Processor Studio console.

    ![sp-studio-console.png](../assets/img/samples/sp-studio-console.png)

10. Run the following cURL command on a new terminal window to test the source.  

    Replace the `<username>` tag in the cURL command given below with the username of the user you have added in WSO2 Identity
    Server.

    ``` java tab="Request"
    curl -kv -X POST -u admin:admin \
      http://localhost:8281/RiskBasedLogin/TransactionInputStream \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/json' \
      -d '{
        "event": {
            "username": "<username>",
            "transaction": 12000
        }
    }'
    ```

    ``` java tab="Response"
	< HTTP/1.1 200 OK
	< content-length: 0
	< server: wso2-http-transport
	< date: Wed, 6 Jun 2018 14:20:53 +0530
    ```
    
	!!! info 
		Since all sources in Siddhi are asynchronous, the client does not receive any data from events that are published to the source
		streams (i.e., the only response to the client is a `200 OK` message). In this tutorial, the user's risk score needs to be calculated based on transactions that the user has made over the last five minutes. To achieve this, you must use an HTTP-request source and an HTTP-response sink. The HTTP-request source and HTTP-response sink always comes in pairs.

		The difference between the normal HTTP source and an HTTP-request source is that the HTTP-request source sends a response event to the
		request using the matching HTTP-response sink.

11. Add the following HTTP-request source and HTTP-response sink.

    ``` java tab="HTTP-request Source"
	@Source(type = 'http-request', source.id='testsource', basic.auth.enabled='true', parameters="'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'sslEnabledProtocols:TLSv1.1,TLSv1.2'", receiver.url="https://localhost:8280/RiskBasedLogin/InputStream", @map(type='json', @attributes(messageId='trp:messageId',username='$.event.username')))
	define stream InputStream (messageId string, username string);
    ```
    
    /

    ``` java tab="HTTP-response Sink"
	@sink(type='http-response', source.id='testsource', message.id='{{messageId}}', @map(type='json'))
	define stream OutputStream (messageId string, username string, riskScore int)
    ```

    !!! tip 
        Note the following in the HTTP-request source and HTTP-response sink code blocks.
    
        -   The `source.id` in the source streamand the sink stream is used to bridge one input stream to one output stream, and should be matching and unique in pair.
    
        -   In the source, you must have an attribute similiar to the ` messageId` shown in the code blocks above (the name of the attribute can be different). The attribute must be of type string and the value should be selected from `trp:messageId`.
    
        -   Maintain the ` messageId` attribute throughout the whole flow. The ` messageId` attribute should also be available in the sink stream.
    
        -   The HTTP-response type sink should have the option `message.id` and the value should be the above mentioned ` messageId.`
    

12. Add the following Siddhi query that is used to pass data from the source to the sink.

    ``` java
	define stream TempStream (messageId string, username string, sumTransactions double);

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

13. The final Siddhi application is as follows.

    ``` java
	@App:name("RiskBasedLogin")
	@App:description("Description of the plan")

	@Source(type = 'http', receiver.url="http://localhost:8281/RiskBasedLogin/TransactionInputStream", basic.auth.enabled='false', @map(type='json', @attributes(username='$.event.username', transaction='$.event.transaction')))
	define stream TransactionInputStream (transaction double, username string);

	@Source(type = 'http-request', source.id='testsource', basic.auth.enabled='true', parameters="'ciphers:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', 'sslEnabledProtocols:TLSv1.1,TLSv1.2'", receiver.url="https://localhost:8280/RiskBasedLogin/InputStream", @map(type='json', @attributes(messageId='trp:messageId',username='$.event.username')))
	define stream InputStream (messageId string, username string);

	@sink(type='http-response', source.id='testsource', message.id='{{messageId}}', @map(type='json'))
	define stream OutputStream (messageId string, username string, riskScore int);

	define stream TempStream (messageId string, username string, sumTransactions double);

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

You have successfully created the Siddhi application. Use the instructions given in the next section to test it out.

----

## Testing the Siddhi application

1.  Run the Siddhi application from the **Editor**.

2.  Execute the following cURL command on a terminal window to calculate the user's risk score.

    ``` java
	curl -X POST  https://localhost:8280/RiskBasedLogin/InputStream -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{
		"event": {
			"username": "admin"
		}
	}' -kv -u admin:admin
    ```

    You will see a response similar to the response given below.

    ``` java
    {"event":{"messageId":"6ec82e38-8c8a-47dd-b5e2-da3c55975766","username":"admin","riskScore":0}
    ```

3.  Execute the following cURL command to send an event about a transaction made by the user.

    ``` java
	curl -kv -X POST http://localhost:8281/RiskBasedLogin/TransactionInputStream -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{
		"event": {
			"username": "admin",
			"transaction": 12000
		}
	}'
    ```

4.  Next, execute the same cURL command you executed in step 1 to re-evaluate the risk score after a new transaction was added.

    ``` java tab="Request"
	curl -X POST  https://localhost:8280/RiskBasedLogin/InputStream -H 'Accept: application/json' -H 'Content-Type: application/json'   -d '{
		"event": {
			"username": "admin"
		}
	}' -kv -u admin:admin
    ```

    ``` java tab="Response"
    "event":{"messageId":"6ec82e38-8c8a-47dd-b5e2-da3c55975766","username":"admin","riskScore":1}}
    ```

    Note that the user's risk score has now changed to 1.

----

## Configuring the analytics engine in WSO2 IS

This section demonstrates how to configure the analytics engine in WSO2 Identity Server that establishes the connection between WSO2 Identity
Server and WSO2 Stream Processor.

1.  Start the WSO2 Identity Server and log in to the management console using admin/admin credentials.

2.  Click **Identity Providers > Resident** and expand **Adaptive Engine > Analytics Engine**.

3.  Configure the following properties accordingly. For this scenario, you can leave the default configurations as they are. 

    ![analytics-engine-properties](../assets/img/samples/analytics-engine-properties.png)

    <table>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Target Host</td>
    <td>The target hostname and target port for the WSO2 SP endpoint.</td>
    </tr>
    <tr class="even">
    <td>Enable Basic Authentication</td>
    <td>Select to enable authentication with username and password credentials.</td>
    </tr>
    <tr class="odd">
    <td>User ID</td>
    <td>The username of the WSO2 SP admin.</td>
    </tr>
    <tr class="even">
    <td>Secret</td>
    <td>The password of the WSO2 SP admin.</td>
    </tr>
    <tr class="odd">
    <td>HTTP Connection Timeout</td>
    <td>The connection timeout interval in milliseconds. If the endpoint does not respond within this time, the connection attempt has failed.</td>
    </tr>
    <tr class="even">
    <td>HTTP Read Timeout</td>
    <td>The timeout interval in milliseconds for each call of <code>               read()              </code> on the <code>               InputStream              </code> . If the server does not respond with data within this time, the connection is terminated.</td>
    </tr>
    <tr class="odd">
    <td>HTTP Connection Request Timeout</td>
    <td>The timeout interval in milliseconds for requesting a connection with WSO2 SP.</td>
    </tr>
    <tr class="even">
    <td>Hostname Verification</td>
    <td>Possible values are: STRICT or ALLOW_ALL.<br />
    <strong>STRICT</strong> - When this mode is enabled, hostnames will be strictly verified against the hostname specified in the product's SSL certificate. For example, if "*. <a href="http://foo.com/">foo.com</a> " is specified as the hostname in the certificate, only this specific hostname is authorized by the server. That is, subdomains such as " <a href="http://a.b.foo.com/">a.b.foo.com</a> " or ip addresses such as "127.10.11.1" will <strong>not</strong> be authorized. <strong>ALLOW_ALL</strong> - This option turns off hostname verification for the server. Note that this is not recommended in a production setup and should only be used for demonstrations and testing.</td>
    </tr>
    </tbody>
    </table>

4.  An HTTP connection is used to communicate between WSO2 IS and WSO2 SP. Therefore, you must add the certificate of WSO2 SP to WSO2 IS.
    Follow the steps given below to import the certificate from WSO2 SP to WSO2 IS. This example uses the default keystores and certificates.

    1.  Navigate to the `<SP_HOME>/resources/security` directory on a new terminal window and run the following
        command.

        ``` java
        keytool -export -alias wso2carbon -keystore wso2carbon.jks -file sp.pem
        ```

    2.  Navigate to the `<IS_HOME>/repository/resources/security` directory and run the following command.

        !!! info 
			Replace the `<SP_HOME>` placeholder in the command with the filepath location of your `<SP_HOME>` folder.

        ``` java
        keytool -import -alias certalias -file <SP_HOME>/resources/security/sp.pem -keystore client-truststore.jks -storepass wso2carbon
        ```

----

## Deploying the Siddhi application

You have successfully created the Siddhi application and tested the functionality using the **Editor**. The **Editor** is useful for
testing purposes. However, you must deploy the application properly in WSO2 SP to use it in production. Follow these instructions to deploy the
application.

1.  On the Editor, click **File > Export File**.

2.  A file named `RiskBasedLogin.siddhi` is downloaded onto your machine. Place it in the `<SP_HOME>/deployment/siddhi-files` directory.

3.  Port offset the 9443 port in WSO2 Stream Processor. This is required because WSO2 IS also runs on the 9443 port.

    1.  Open the ` deployment.yaml` file found in the ` <SP_HOME>/conf/worker/` folder.

    2.  Change the ` Port: 9443` to `  9444` under `listenerConfigurations`.

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

4.  Stop the **Editor** and start WSO2 Stream Processor in a **Worker** profile.  
    -   For Windows: `worker.bat`
    -   For Linux: ./ `worker.sh`

----

Now that you have successfully deployed a Siddhi application for risk-based login, you can configure WSO2 Identity Server to receive data from this Siddhi application and set up rules for adaptive authentication. Follow the [Risk-Based Adaptive Authentication tutorial(risk-based-apative-auth.md) to set this up.