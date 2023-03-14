## Run a sample STS Client

The following sample demonstrates the steps to run a Security Token Service (STS) client. The STS issues a security token to authenticate a user for your client application using WS-Trust protocols.

!!! note "Before you begin"
    You need to [configure WS-Trust]({{base_path}}/guides/identity-federation/configure-ws-trust/) for WSO2 Identity Server.

To run the STS client:

1. Clone the [Identity Server samples](https://github.com/wso2/samples-is) repository.

2. Open a terminal and navigate to `SAMPLES-IS/sts/sts-client` in the cloned directory.  

    !!! info
        The **sts-client** sample sends the username and password defined in the `SAMPLES-IS/sts/sts-client/src/main/resources/client.properties` file. WSO2 Identity Server authenticates if the user is in the system, and if the user is in the system, a token is sent to the requesting party, which is the **sts-client** application in this case.

        The default username and password are that of the default super administrator, and you can change it accordingly.

        ``` java
        ut.username=admin
        ut.password=admin
        ```

3. Build the client using `mvn install`.

4. Once the client is built successfully, run the `sts-client.sh` file in Unix or `sts-client.bat` in Windows.

You can see that the SAML token issued from the STS is being printed by the client.

    !!! note
        The `connection refused` error occurs when the STS client attempts to send the received SAML token to a service that is not running in this case.
