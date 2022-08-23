# Sample Scenario

You can easily try out the identity and access management (IAM) capabilities in WSO2 Identity Server (WSO2 IS) by using the scenario explained below.

## About the sample scenario

**Pickup** is a cab company that has many employees who use different
credentials to sign in to different internal enterprise applications. **Pickup** will register its users and applications in WSO2 Identity Server to fulfill its IAM [requirements](#requirements).

![qsg-overall-scenario]({{base_path}}/assets/img/get-started/qsg-overall-scenario.png)

Following are two such applications:

<table>
    <tr>
        <th>Pickup Dispatch</th>
        <td>This application helps manage the overall operations at Pickup.</td>
    </tr>
    <tr>
        <th>Pickup Manager</th>
        <td>This application helps allocate vehicles to drivers.</td>
    </tr>
</table>

Following are three users in the company:

<table>
    <tr>
        <th>Rowan</th>
        <td>The company HR manager who would define the access requirements of the company.</td>
    </tr>
    <tr>
        <th>Cameron</th>
        <td>A senior manager who needs to sign in and use both the above applications.</td>
    </tr>
    <tr>
        <th>Alex</th>
        <td>A junior manager who also needs to sign in and use both the above applications.</td>
    </tr>
</table>

### Requirements

Listed below are the organizational requirements that are addressed by WSO2 Identity Server.

- Employees need to remember multiple credentials when logging in to the many applications of **Pickup**. It is required to unify logins for employees with **single sign-on** so that employees will only have to remember a single password.

    Try out [single sign-on]({{base_path}}/get-started/sample-use-cases/single-sign-on/).

- Employee logins should be secured by making it difficult for unauthorized sources to access the applications. Therefore, it is required to apply an additional layer of security using **multi-factor authentication**.

    Try out [multi-factor authentication]({{base_path}}/get-started/sample-use-cases/multi-factor-authentication/).

- External consultants have to work on **Pickup** apps temporarily. It is a hassle to create and delete accounts for them in the database. Therefore, it is required to log them in with their accounts in an external identity provider using **federated authentication**.

    Try out [federated authentication]({{base_path}}/get-started/sample-use-cases/federated-authentication/).

- With the expansion of **Pickup**, Rowan is having a hard time creating accounts for every employee joining the organization. Let new employees create their own accounts to speed up the process using the **self sign-up** capability.

    Try out [self sign-up]({{base_path}}/get-started/sample-use-cases/self-sign-up/).

## Set up the sample apps

To try out the sample identity and access management scenarios on your WSO2 IS instance, you need to set up the required sample applications with your WSO2 IS.

!!! note "Before you begin"
    -   Open the `/etc/hosts` file and add the following entry:
    
        ``` bash
        127.0.0.1        localhost.com
        ```

        -   If you are planning to use single sign-on (SSO), do not use `localhost` as it will cause the Tomcat naked host issue. Use `localhost.com` instead. If you are using Windows, `localhost.com` is considered as `127.0.0.1`.
        -   Make sure that this is the only such entry available for this IP address in the `/etc/hosts` file to avoid any conflicts.
        
    -   [Download](https://curl.haxx.se/download.html) and install curl. Make sure you install the binary type file of the version you choose.

Follow the steps given below.

1.  Download the samples from [GitHub](https://github.com/wso2/samples-is/releases/download/v4.5.0/is-samples-distribution.zip) and unzip.

    ``` java
    unzip is-samples-distribution.zip
    ```

    !!! info
        The root folder of the samples distribution is referred to as `<IS_SAMPLE_DISTR>`.

2.  Open the `server.properties` file in the `<IS_SAMPLE_DISTR>/IS-QSG/conf/` folder and configure `wso2is.host.domain` and `wso2is.host.port` as follows:

    ``` bash
    #localhost.com is used to resolve naked hostname validation issue
    wso2is.host.domain=localhost.com
    wso2is.host.port=9443
    server.host.domain=localhost.com
    server.host.port=8080
    ```

3.  To configure and run the sample applications, open a terminal, navigate to the `<IS_SAMPLE_DISTR>/IS-QSG/bin` folder, and follow the steps given below: 

    1.  Execute one of the following commands to start the sample application:

        -   On Linux/MacOS

            ``` bash
            sh app-server.sh
            ```

        -   On Windows
        
            ``` bash
            app-server.bat
            ```

    2.  Execute the following command to start the quickstart samples accordingly.

        -   On Linux/MacOS

            ``` bash
            sh qsg.sh
            ```

        -   On Windows
        
            ``` bash
            qsg.bat
            ```

4.  When prompted, confirm the configurations.

## What's next?

Once you complete setting up the samples, you are presented with the following list of scenarios:

![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)

See the topics given below to try out each of the scenarios.

- [Single sign-on]({{base_path}}/get-started/sample-use-cases/single-sign-on/)
- [Multi-factor authentication]({{base_path}}/get-started/sample-use-cases/multi-factor-authentication/)
- [Federated authentication]({{base_path}}/get-started/sample-use-cases/federated-authentication/)
- [Self sign-up]({{base_path}}/get-started/sample-use-cases/self-sign-up/)
