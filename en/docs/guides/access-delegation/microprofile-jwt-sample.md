# Configure Microprofile JWT

This page guides you through configuring [microprofile JWT (MP-JWT)](../../references/concepts/authentication/microprofile-jwt/) for an OAuth/OpenID Connect web application. This is demonstrated using a sample application and describes how to generate JWT tokens by invoking the endpoints.

## Pre-requisites

- [Maven 3.x](https://maven.apache.org/download.cgi)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html)
- [xmllint](http://xmlsoft.org/xmllint.html)
    
----

## Set up the sample

First, let's configure the sample. Follow the steps given below:

1.  Clone [https://github.com/wso2/samples-is.git](https://github.com/wso2/samples-is.git).

2.  Navigate to `<SAMPLE_HOME>/microprofile/microprofile-jwt/src/main/liberty/config` and open `server.xml`.

3.  Replace `${CARBON_HOME}` with the directory where WSO2 Identity Server is installed on your machine.

4.  Navigate back to `<SAMPLE_HOME>/microprofile/microprofile-jwt` and open `pom.xml`. 
    
5.  Uncomment the following section:

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

6.  Now, build the sample using the following command:

    ``` xml
    mvn clean install
    ```

    This will generate a `microprofile-jwt-<VERSION>-resources.zip` in the target folder.

7.  Unzip the `microprofile-jwt-<VERSION>-resources.zip` and navigate to the `sample-configuration-resources` folder.
    
8.  Now run the following command to do the necessary configurations.

    !!! info 
        Make sure you have [xmllint](http://www.xmlsoft.org/downloads.html) installed to avoid errors due to unformatted responses.

    ``` xml
    sh configure_sample.sh
    ```

    This configuration script will add the following configurations to
    the Identity Server:

    -   **Add three roles** - Debtor, Creditor, and ViewBalance

    -   **Add three users** - Cameron, Alex, and John

    -   **Assign roles to users:**
        Cameron -\> Debtor  
        Alex -\> Creditor  
        John -\> ViewBalance

    -   **Create a service provider** named `microprofile_jwt_sample` with the necessary configurations to generate an MP-JWT-compatible JWT Token.

----

## Run the sample

1.  Navigate to the target folder which was generated when the sample
    was built.

2.  Run the following command to start the wallet service written using
    Eclipse Microprofile Framework:

    ``` java
    java -jar secure-wallet-service.jar
    ```

    This sample service creates the following endpoints:

    -   **`/wallet/balance`** which sends the current balance.

    -   **`/wallet/credit?amount=<amount>`** which adds the given amount to the current balance.

    -   **`/wallet/debit?amount=<amount>`** which subtracts the given amount from the current balance.

    These three endpoints are secured with MP-JWT as follows:

    -   /balance endpoint can be called by users that are assigned one of the following roles: admin, ViewBalance, Debtor

    -   /credit endpoint can be called by users that are assigned one of the following roles: admin, Creditor

    -   /debit endpoint can be called by users that are assigned one of the following roles: admin, Debtor

-----

## Invoke the endpoints

You can generate the JWT tokens for each user by executing the cURL
command given below using the following credentials:

| User    | Username | Password   |
|---------|----------|------------|
| Cameron | cameron  | cameron123 |
| Alex    | alex     | alex123    |
| John    | john     | john123    |

``` xml
curl -H "Authorization: Basic bGk2Sk1ialc2V0RNS1RXc1JuR2NqcDV6Y0doaTpOTUIzRUFmeGg0WXZTVHFiYjNpTWtvbmdBSGpX" -H "Content-Type: application/x-www-form-urlencoded" -k -d "grant_type=password&username=<username>&password=<password>&scope=openid" https://localhost:9443/oauth2/token
```

**Now you can invoke the endpoints using a REST client such as Postman.**

You need to provide the obtained JWT token in the authorization header as a bearer token.

If you try to invoke the endpoints without an authorization header, you will receive an `HTTP 401 Unauthorized` response.

If you invoke an endpoint with a token obtained for a user that has no access, you will receive an `HTTP 403 Forbidden` response. For instance, if you try to invoke the /debit endpoint while you only have the Creditor role, you will get the `HTTP 403 Forbidden` response.

---

!!! info "Related topics"
    - [Concept: Microprofile JWT 1.0](../../references/concepts/authentication/microprofile-jwt/)
    - [Guide: Configure Microprofile JWT](../../guides/access-delegation/microprofile-jwt/)