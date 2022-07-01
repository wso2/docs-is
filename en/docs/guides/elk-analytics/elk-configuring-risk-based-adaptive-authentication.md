# Configuring Risk-Based Adaptive Authentication

ELK Analytics allows you to collect events, analyze them in real-time,
identify patterns, map their impacts, and communicate the results within milliseconds.

This tutorial demonstrates using ELK Analytics to publish transactional data and assess an end user's risk score based
on the user's transaction history in an adaptive authentication scenario. Consider a business use case where a bank
wants to prompt an additional authentication step when a user attempts to log in to the system after doing a transaction
of over $10,000. This use case can be achieved by creating an index in ELK Analytics and configuring a conditional
authentication script in the service provider configuration of the WSO2 Identity Server (WSO2 IS).

------------------------------------------------------------------------

### Risk profiling flow

The diagram below shows how the connection between the client applications, ELK Analytics, and WSO2 Identity Server
works to assess risk and provide adaptive authentication to users.

![risk-based-adaptive-authentication](../../assets/img/learn/elk-analytics/risk-based-adaptive-authentication/risk-based-adaptive-authentication-1.png)

1. The user performs bank transactions through different applications.
2. Transactional data from all these applications are published to the ELK Analytics via “transaction” index.
3. The user attempts to access a service provider application that uses WSO2 IS as the identity provider.
4. The service provider sends an authentication request to WSO2 IS.
5. The user is prompted to log in and WSO2 IS authenticates the user using basic authentication (username/password
   credentials).
6. WSO2 IS publishes an event to the ELK, which computes the user's risk score based on the user's transaction history
   using the data received in step 2. If the user has made transactions that total to over $10,000 spent within the last
   five minutes, the risk score is 1. Else, the risk score is 0.
7. If the risk score is 1, WSO2 IS prompts an additional step of authentication for the user (i.e. entering a hardware
   key number) before allowing the user to access the service provider application.

### Configuring ELK Analytics

ELK has two duties to fulfill in this scenario. Capture the transaction data into an index and calculate the risk score.

1. [Configure](../../learn/using-elk-analytics-for-adaptive-authentication) ELK Analytics for Adaptive Authentication.
2. Create an index named `transaction` to store transaction data.

    ``` curl tab="Request"
    curl -L -X PUT 'https://{ELASTICSEARCH_HOST}/transaction' -H 'Authorization: Basic {ELASTICSEARCH_BASIC_AUTH_HEADER}'
    ```

    ``` curl tab="Sample Request"
    curl -L -X PUT 'https://localhost:9200/transaction' -H 'Authorization: Basic d3NvMnVzZXI6Y2hhbmdlbWU='
    ```

    ``` json tab="Response"
    {
     "acknowledged": true,
     "shards_acknowledged": true,
     "index": "transaction"
    }
    ```

### Configuring WSO2 Identity Server

Next, configure WSO2 IS to communicate with the ELK.

!!! tip "Before you begin"

    -   Set up the service provider and sample application for adaptive
        authentication. For instructions on how to do this, see [Configuring
        a Service Provider for Adaptive Authentication](../../learn/configuring-a-service-provider-for-adaptive-authentication).
    -   For more information about adaptive authentication with WSO2
        Identity Server, see [Adaptive
        Authentication](../../learn/adaptive-authentication).

1. Login to the management console and create a new user called "Alex"
   with login permission.
2. Navigate to **Service Providers\>List** and click **Edit** on the
   [saml2-web-app-pickup-dispatch.com](http://saml2-web-app-pickup-dispatch.com)
   service provider.
3. Expand the **Local and Outbound Configuration** section and click
   **Advanced Authentication**.
4. Click on **Templates** on the right side of the **Script Based
   Conditional Authentication** field and then click **ELK-Risk-Based**.
   ![template-for-risk-based-authentication](../assets/img/learn/elk-analytics/risk-based-adaptive-authentication/risk-based-adaptive-authentication-2.png)
5. Click **Ok**. The authentication script and authentication steps
   are configured. The authentication script defines a conditional step
   that executes the second step of authentication (the hardware key
   authenticator) if the `          riskScore         ` is greater
   than 0.
6. The second authentication step that is added is
   `          totp.         ` However, `          totp         ` is an
   authentication step that you would normally use in production. To
   try out this scenario sample authenticators with the sample
   application, delete the `          totp         ` authenticator and
   add the following sample authenticator instead.
7. Click **Delete** to remove the `            totp           `
   authenticator from Step 2 (the second authentication step).  
   ![second-step-risk-based-authentication](../assets/img/tutorials/second-step-risk-based-authentication.png)
8. Select **Sample Hardware Key Authenticator** and click
   **Add**.  
   ![sample-hardware-key-authenticator](../assets/img/tutorials/sample-hardware-key-authenticator.png)

9. Save the service provider configurations.

10. Restart WSO2 Identity Server.

### Trying it out

1. Start the Tomcat server and access the following sample PickUp
   application URL:
   <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com> .

2. Log in by giving username and password credentials. You are logged
   in to the application.

    !!! note 
        The user is authenticated with basic authentication only.

3. Log out of the application.

4. Execute the following cURL command. This command publishes an event
   about a user bank transaction exceeding $10,000.

    ``` curl tab="Request"
    curl -L -X POST 'https://{ELASTICSEARCH_HOST}/transaction/_doc' -H 'Authorization: Basic {ELASTICSEARCH_BASIC_AUTH_HEADER}' -H 'Content-Type: application/json' --data-raw '{
    "@timestamp":"{CURRENT_TIMESTAMP}",
    "username":"{USERNAME}",
    "amount": {TRANSACTION_AMOUNT}
    }'
    ```

    ``` curl tab="Sample Request"
    curl -L -X POST 'https://localhost:9200/transaction/_doc' -H 'Authorization: Basic d3NvMnVzZXI6Y2hhbmdlbWU=' -H 'Content-Type: application/json' --data-raw '{
    "@timestamp":"{{currenttimestamp}}",
    "username":"Alex",
    "amount": 12000
    }'
    ```

    ``` json tab="Response"
    {
    "_index": "transaction",
    "_id": "_75YR4EBPqDnJYiU7W_A",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
    }
    ```

5. Log in to the sample PickUp application. You are prompted with the
   hardware key authentication after the basic authentication step.

    !!! info 
        Before executing the cURL command given in step 4, the user had no
        transaction history and the user's riskScore was 0. The
        authentication script is programmed to prompt only basic
        authentication if the risk score is 0.

        After executing the command, a transaction event that indicates the
        user spending more than $10,000 is published and recorded in the
        Siddhi application. Therefore, when the user now attempts to log in
        again, the user's riskScore is evaluated to 1 and the user is
        prompted for an extra step of authentication.

6. Re-enter the number given on the screen and click **Sign In**. You
   are logged into the application.