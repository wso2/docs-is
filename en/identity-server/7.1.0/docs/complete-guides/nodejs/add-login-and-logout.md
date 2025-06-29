---
template: templates/complete-guide.html
heading: Add login and logout to your app
read_time: 2 min
---

{% include "../../../../../includes/complete-guides/nodejs/add-login-and-logout.md" %}

!!! tip "Tip"

    In WSO2 Identity Server, the default certificate is a self signed certificate. This certificate needs to be added to the runtime path in order to avoid SSL errors.

    Excute the below commands before running `npm start`

    Naviate to the {IS_HOME}/repository/resources/security directory and execute the following

    ```bash
    keytool -export -alias wso2carbon -file carbon_public2.crt -keystore wso2carbon.p12 -storetype PKCS12 -storepass wso2carbon
    ```

    Convert the certificate to X509 format.

    ```bash
    openssl x509 -in carbon_public2.crt -inform der -outform pem -out certificate.pem
    ```

    Navigate to the passport-wso2-sample home and execute the following
    ```bash
    export NODE_EXTRA_CA_CERTS=./<PATH_TO_CERTIFICATE_FILE>/certificate.pem
    ```
