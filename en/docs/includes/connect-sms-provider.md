## Connect the SMS provider

1.  Download the certificate of the SMS provider by going to the SMS
    providers website on your browser, and clicking the HTTPS trust icon
    on the address bar.  
    
    !!! example
        If you wish to have NEXMO as your SMS provider, navigate to
        [https://www.nexmo.com](https://www.nexmo.com/), and click the
        padlock next to the URL on Chrome and download the certificate.
        
2.  Navigate to the
    `           <IS_HOME>/repository/resources/security          `
    directory via the terminal and import the downloaded certificate
    into the WSO2 IS client keystore.

    ``` java
    keytool -importcert -file <CERTIFICATE_FILE_PATH> -keystore client-truststore.jks -alias "Nexmo" 
    ```

3.  You are prompted to enter the keystore password. The default
    `           client-truststore.jks          ` password is
    **`            wso2carbon           `**.
    