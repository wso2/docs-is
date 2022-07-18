!!! tip "Before you begin" 

    1.  Download the client application zip file named `saml-query-profile-client.zip` from [this GitHub location](https://github.com/wso2/samples-is/tree/master/saml-query-profile-target) extract and open it using an IDE. Hereafter, the root directory of the extracted zip will be referred to as `<CLIENT_HOME>` in this document.

    2.  To build the client application, navigate to the `<CLIENT_HOME>` directory in a command prompt and execute the following command.

        ``` java
        mvn clean install
        ```

    3.  Install a SAML Tracer (plugin/application) that enables searching assertions.

    !!! note
            If you are using a product version of **5.9.0 or below** then, you should replace the `wso2carbon.jks` keystore
            located at `<CLIENT_HOME>/src/main/resources/` with the `wso2carbon.jks` keystore located at `<PRODUCT_HOME>/repository/resources/security`.
            