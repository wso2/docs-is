# Changing the hostname

This section guides you through changing the hostname of WSO2 Identity
Server.

1.  Change the hostname ('
    `           is.dev.wso2.com          ` ' is taken as an example) in
    `           <IS_HOME>/repository/conf/deployment.toml         ` .

    ``` toml
    [server]
    hostname = "is.dev.wso2.com"
    ```

2.  All keystores in WSO2 IS are stored in the
    `           <IS_HOME>/repository/resources/security          `
    folder. Navigate to the security folder on the command prompt and
    use the following command to create a new keystore with
    `           CN=is.dev.wso2.com          ` .

    **Format**

    ``` java
        keytool -genkey -alias <alias_name> -keyalg RSA -keysize 2048 -keystore <keystore_name>.jks -dname "CN=<hostname>, OU=<organizational_unit>,O=<organization>,L=<Locality>,S=<State/province>,C=<country_code>" -storepass <keystore_password> -keypass <confirm_keystore_password>
    ```

    Replace the values enclosed in `           <>          ` in the
    command given above with a value you prefer as shown in the sample
    command below.

    **Sample keytool command**

    ``` java
        keytool -genkey -alias newcert -keyalg RSA -keysize 2048 -keystore newkeystore.jks -dname "CN=is.dev.wso2.com, OU=Is,O=Wso2,L=SL,S=WS,C=LK" -storepass mypassword -keypass mypassword
    ```

3.  If the keystore name and password are changed, all the references to
    it within the configuration files must be updated as well. Run a
    grep command to find all the places within the WSO2 IS configuration
    files where the keystore name and password have been used.

    ``` java
        grep -i -r wso2carbon.jks .
    ```

4.  A list of configuration files that refer to "wso2carbon.jks" will be
    listed on your command prompt window. Open each file and update the
    keystore name, password, and alias values (e.g., update the keystore
    name from " `           wso2carbon.jks          ` " to  "
    `           newkeystore.jks          ` ").

5.  Export the public key from your key store .jks file using the
    following command:

    **Format**

    ``` java
        keytool -export -alias <alias_name> -keystore <keystore_name>.jks -file <public_key_name>.pem
    ```

    Replace the values enclosed in `           <>          ` in the
    command given above with a value you prefer as shown in the sample
    command below.

    **Sample keytool command**

    ``` java
        keytool -export -alias newcert -keystore newkeystore.jks -file pkn.pem
    ```

6.  Import the public key you extracted in the previous step to the
    `           client-truststore.jks          ` file using the
    following command:

    **Format**

    ``` java
        keytool -import -alias <alias_name> -file <public_key_name>.pem -keystore client-truststore.jks -storepass <keystore_password>
    ```

    Replace the values enclosed in `            <>           ` in the
    command given above with a value you prefer as shown in the sample
    command below.

    **Sample keytool command**

    ``` java
        keytool -import -alias newcert -file pkn.pem -keystore client-truststore.jks -storepass wso2carbon
    ```

    !!! note
        If you create a new client-truststore, do a search using the
        `            grep           ` command and change the name and
        passwords of the client-truststore in all the places in IS.
    

7.  Verfiy the hostname change by attempting to log into the dashboard,
    getting a token from any grant type, etc.

8.  If you are trying this out on your local machine, open the
    etc/hosts/ file and add the following entry to map the new hostname.
    "is.dev.wso2.com" is used as an example in the sample entry shown
    below.

    ``` java
    127.0.0.1       is.dev.wso2.com
    ```

Note that when you recreate the keystore in full, a new key-pair value
is created. This means that any existing encrypted data, for example
users you created before recreating the keystore, are still encrypted
using the original keystore (wso2carbon.jks). This means that older
users are not able to log in to the dashboard and need to be migrated.
You can use one of the following options in this situation:

**Option 1**

Change the hostname. The hostname is part of the Subject of the
Certificate (i.e., it is not part of the original key-pair). Therefore,
you can use the same public and private key pair to generate a new CSR
with the updated CN (subject). This can be done by adding the "-dname"
option when "-certreq" is executed. Once the CA certificate is obtained,
follow the instructions given in the [importing certificates to the
keystore](https://docs.wso2.com/display/ADMIN44x/Creating+New+Keystores#CreatingNewKeystores-Step2:Importingcertificatestothekeystore)
topic to import it correctly. By doing that, you do not need to touch
the key-pair, and any other operations performed using the same key pair
will not get affected (encryption, etc,)

**Option 2**

Another option is to create a new keystore with the instructions (as in
described in the hostname section) for the new hostname and then use
that keystore for SSL/TLS by changing Tomcat connector configuration as
described in the [Configuring Keystores in WSO2
Products](https://docs.wso2.com/display/ADMIN44x/Configuring+Keystores+in+WSO2+Products)
topic. This approach separates the keystores. The secondary keystore
with the new hostname will only be used for Tomcat SSL/TLS
communication, while the primary one is used for all other operations
(encryption, etc.). By doing this, you can make sure that the existing
encrypted data is not affected.

!!! note
    
    If you have chosen **Option 2**, you must maintain and secure the two
    keystores . Hence, option 1 is the recommended approach, unless you
    prefer the separation of keys used in SSL/TLS communication and internal
    data encryption, signing, etc.
    

Once this is done, you need to change all localhost references.  
