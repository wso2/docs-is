# Running the MP-JWT Sample

This section describes how to configure and run the MP-JWT sample. It
also describes how to generate JWT tokens by invoking the endpoints.

## Configuring the sample

!!! note "Pre-requisites" 
    Before running the samples, make sure you have [maven
    3.x](https://maven.apache.org/download.cgi) installed.
    

First, let's configure the sample. Follow the steps given below:

1.  Navigate to
    `          <SAMPLE_HOME>/microprofile/microprofile-jwt/         `
    `          src/main/liberty/config         ` and open
    `          server.xml         ` .
2.  Replace `          ${CARBON_HOME}         ` with the directory where
    the Identity Server is installed.
3.  Navigate back to
    `           <SAMPLE_HOME>/microprofile/microprofile-jwt          `
    and open `           pom.xml          `. 
    Uncomment the following section:

    ``` xml
    <!--<executions>-->
       <!--<execution>-->
            <!--<id>install-server</id>-->
            <!--<phase>prepare-package</phase>-->
            <!--<goals>-->
                <!--<goal>install-server</goal>-->
                <!--<goal>create-server</goal>-->
                <!--<goal>install-feature</goal>-->
            <!--</goals>-->
       <!--</execution>-->
       <!--<execution>-->
                <!--<id>package-server-with-apps</id>-->
                <!--<phase>package</phase>-->
                <!--<goals>-->
                    <!--<goal>install-apps</goal>-->
                    <!--<goal>package-server</goal>-->
                <!--</goals>-->
       <!--</execution>-->
    <!--</executions>-->
    ```

4.  Now, build the sample using the following command:

    ``` xml
    mvn clean install
    ```

    This will generate a
    `           microprofile-jwt-<VERSION>-resources.zip          ` in
    the target folder.

5.  Unzip the
    `           microprofile-jwt-<VERSION>-resources.zip          ` and
    navigate to `           sample-configuration-resources          `.
    Now run the following command to do the necessary configurations.

    ``` xml
    sh configure_sample.sh
    ```

    This configuration script will add the following configurations to
    the Identity Server:

    -   Add three roles - Debtor, Creditor, and ViewBalance

    -   Add three user - Cameron, Alex, and John

    -   Assign roles to users:
        Cameron -\> Debtor  
        Alex -\> Creditor  
        John -\> ViewBalance

    -   Create a service provider named
        `             microprofile_jwt_sample            ` with the
        necessary configurations to generate an MP-JWT-compatible JWT
        Token

## Running the sample

1.  Navigate to the target folder which was generated when the sample
    was built.
2.  Run the following command to start the wallet service written using
    Eclipse Microprofile Framework:

    ``` java
    java -jar secure-wallet-service.jar
    ```

    This sample service creates following endpoints:

    -   **`              /wallet/balance             `** which will send
        the current balance

    -   **`              /wallet/credit?amount=<amount>             `**
        which adds the given amount to the current balance

    -   **`              /wallet/debit?amount=<amount>             `**
        which subtracts the given amount from the current balance

    These three endpoints are secured with MP-JWT as follows:

    -   /balance endpoint is allowed to call by users that are assigned one of
        the following roles: admin, ViewBalance, Debtor

    -   /credit endpoint is allowed to call by users that are assigned one of
        the following roles: admin, Creditor

    -   /debit endpoint is allowed to call by users that are assigned one of the 
        following roles: admin, Debtor

## Invoking the endpoints

You can generate the JWT tokens for each user executing the cURL
command given below using the following credentials:

| User    | Username | Password   |
|---------|----------|------------|
| Cameron | cameron  | cameron123 |
| Alex    | alex     | alex123    |
| John    | john     | john123    |

``` xml
curl -H "Authorization: Basic bGk2Sk1ialc2V0RNS1RXc1JuR2NqcDV6Y0doaTpOTUIzRUFmeGg0WXZTVHFiYjNpTWtvbmdBSGpX" -H "Content-Type: application/x-www-form-urlencoded" -k -d "grant_type=password&username=<username>&password=<password>&scope=openid" https://localhost:9443/oauth2/token
```

Now you can invoke the endpoints using a REST client such as Postman.
You need to provide the obtained JWT token in the authorization header
as a bearer token.

If you try to invoke the endpoints without an authorization header, you
will receive an HTTP 401 Unauthorized response.

If you invoke an endpoint with a token obtained for a user that has no access, you can observe an HTTP 403 Forbidden response. For
instance, if you try to invoke the /debit endpoint while you only have
the Creditor role, you will get HTTP 403 response.
