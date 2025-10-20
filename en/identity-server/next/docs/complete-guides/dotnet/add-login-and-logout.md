---
template: templates/complete-guide.html
heading: Add login and logout to your app
read_time: 10 min
---

{% include "../../../../../includes/complete-guides/dotnet/add-login-and-logout.md" %}

!!! tip "Tip"

    In WSO2 Identity Server, the default certificate is a self signed certificate. This certificate needs to be added to your OS System Trust to allow the .NET application to connect to the Identity Server

    To obtain the certificate naviate to the {IS_HOME}/repository/resources/security directory and execute the following

    ```bash
    keytool -export -alias wso2carbon -file carbon_public2.crt -keystore wso2carbon.p12 -storetype PKCS12 -storepass wso2carbon
    ```

    Convert the certificate to X509 format.

    ```bash
    openssl x509 -in carbon_public2.crt -inform der -outform pem -out certificate.pem
    ```
    Now you can add this certificate to your OS System Trust.
