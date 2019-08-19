# 2-legged OAuth for Securing a RESTful Service

This page consists of the procedure to secure a RESTful service with
2-legged OAuth using WSO2 Identity Server and WSO2 ESB.

1.  Download [WSO2 Identity
    Server](http://wso2.com/products/identity-server) and [WSO2
    ESB](http://wso2.com/products/enterprise-service-bus).
2.  Extract the WSO2 Identity Server and WSO2 ESB ZIP files into a
    directory in your file system. Call them IS\_HOME and ESB\_HOME
    respectively.
3.  Start WSO2 Identity Server and WSO2 ESB by running **wso2server.sh**
    (in unix) or **wso2server.bat** (in windows) which can be found in
    `           IS_HOME/bin          ` and
    `           ESB_HOME/bin          ` directories respectively.

    If both servers are running in localhost, change the default ports.
    For example, change the WSO2 ESB https port to 9445 and http port to
    9765 (default 9443 and 9763 respectively) by configuring
    `            <Ports><Offset>           ` in **carbon.xml** which can
    be found in `            ESB_HOME/repository/conf           ` .

4.  Go to WSO2 IS Management Console by pointing your browser to
    `                     https://localhost:9443/carbon/                   `
    .
5.  [Register a user with WSO2 Identity Server](../../using-wso2-identity-server/configuring-users) by
    providing a username and password.
6.  Download sample OAuth client source code from following SVN
    location:  
    `                     https://svn.wso2.org/repos/wso2/carbon/platform/branches/turing/components/identity/org.wso2.carbon.identity.samples.oauth/                   `
7.  Login using your preferred ID and add the Jars in the
    `          IS_HOME/repository/components/plugins         ` directory
    to a sample project class path.
8.  Go to the ESB Management Console by entering the following your
    browser:
    `                     https://localhost:9445/carbon/                   `
    .
9.  Sign-in as an admin by providing a username and password.
10. Create a proxy service in WSO2 ESB by adding following configuration
    in to the service bus configuration which can be found under
    **Manage \> Service Bus \> Source View**. Alternatively, simply
    update the synapse configuration of ESB with the content in
    `           org.wso2.carbon.identity.samples.oauth/src/main/resources/synapse.xml          `
    .

    ``` html/xml
    <proxy name="OAuthProxy" transports="https http" startOnLoad="true" trace="disable">
            <target>
                <inSequence>
                    <oauthService remoteServiceUrl="https://localhost:9443/services/"/>
                    <send>
                        <endpoint>
                            <address uri="http://localhost:8280/services/echo" format="rest"/>
                        </endpoint>
                    </send>
                </inSequence>
                <outSequence>
                    <send/>
                </outSequence>
            </target>
    </proxy>
    ```

    Please note that **remoteServiceUrl** contains the host name and the
    port that WSO2 Identity Server is running.

11. Run the sample client. Make sure to update variables:
    IDENTITY\_SERVER, ESB\_SERVER, USER\_NAME and PASSWORD, according to
    your configurations.
    1.  Create a new project on an IDE such as Eclipse.
    2.  Add the dependent .jar files from
        `             <IS_HOME>/repository/components/plugins            `
        to the new project.

    3.  Open the file named TwoLeggedOAuthDemo.java from the path
        similar to the following:
        `             org.wso2.carbon.identity.samples.oauth/src/main/java/org/wso2/carbon/identity/samples/oauth            `

    4.  Update the following `             IDENTITY_SERVER            `
       , `             ESB_SERVER            `,
        `             USER_NAME            ` and
        `             PASSWORD            ` according to your
        configurations.

    5.  Also update the following property.

        ``` java
                System.setProperty("javax.net.ssl.trustStore", "[I_HOME]/repository/resources/security/wso2carbon.jks");
        ```

The following steps iterate what is occurring during this process:

1.  The user is registered with WSO2 Identity Server.
2.  The consumer secret is registered with WSO2 Identity Server.  
    ![]( ../../assets/img/29920248/29898645.png)  
    1.  Invoke the **AuthenticationAdmin** service and the user is
        authenticated with the WSO2 IS entity server
    2.  Invoke the **OAuthAdminService** service and register the
        consumer secret.
3.  The consumer key is set as the username of the user.
4.  Generate OAuth Authorization header and sign it with the OAuth
    Consumer Secret.
5.  Invoke the proxy service which is deployed in ESB.
6.  OAuth mediator in ESB invokes the OAuthService in WSO2 Identity
    Server to verify that the consumer is valid.
7.  Verify consumer key (check if the user is a valid user) and verify
    the **oauth\_signature** value using the consumer secret which has
    been registered by the user.
8.  If signature verification is done, the request is authenticated and
    sent to the RESTful service  
    ![]( ../../assets/img/29920248/29898644.png)
