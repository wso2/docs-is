## Create a new certificate

1.  Follow the steps below to create a public certificate:  
    1.  Execute the following command from the
        `             <IS_HOME>/repository/resources/security            `
        directory to create a new keystore:

        ``` java
        keytool -genkey -alias wso2carbon -keyalg RSA -keysize 2048 -keystore testkeystore.jks -dname "CN=*.test.com,OU=test,O=test,L=MPL,ST=MPL,C=FR" -storepass wso2carbon -keypass wso2carbon -validity 10950
        ```

    2.  Execute the following command to export the public key of the
        new keystore to a file, named with the client-id of the OAuth
        application.

        ``` java
        keytool -export -alias wso2carbon -file testPublicCert.crt -keystore testkeystore.jks
        ```

        This prompts for the keystore password.

    3.  Enter `             wso2carbon            ` as the password.

    4.  Execute the following command to retrieve the certificate in
        X509 format:

        ``` java
        keytool -printcert -rfc -file testPublicCert.crt
        ```

        You will see the public certificate in X509 format on the
        terminal.

    5.  Copy the content of the certificate.