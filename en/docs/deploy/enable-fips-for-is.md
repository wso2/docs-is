# Enable FIPS 140-2-compliant mode

The [FIPS 140-2 standard](https://csrc.nist.gov/publications/detail/fips/140/2/final) is a standard created by the National Institute of Standards and Technology’s (NIST’s) Computer Security Division. It defines the requirements for cryptographic modules used to protect sensitive information in computer and telecommunication systems.
See [FIPS 140-2 compliance reference]({{base_path}}/references/concepts/compliance/fips) for more information.

From IS 6.2.0 release onwards, the Identity server supports running in a FIPS 140-2-compliant mode. When setting up in FIPS 140-2-compliant mode, the identity server uses the [Bouncy Castle FIPS Java API](https://www.bouncycastle.org/fips-java/).

FIPS 140-2-compliant mode is turned off by default on the Identity Server.

To enable FIPS 140-2 compliant mode on the Identity Server:

1. Shut down the Identity Server instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder,  and execute the following one of the following commands:
    
    ``` java tab="Linux/MacOS"
    sh fips.sh
    ```

    ``` java tab="Windows"
    fips.bat run
    ```

3. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [jce_provider]
    provider_name = "BCFIPS"
    ```

4. Restart the WSO2 Identity Server.

!!! info "Disable FIPS 140-2 compliant mode"
    If you need to disable the FIPS 140-2 compliant mode after enabling it:

    1. Shut down the Identity Server instance if it's running.
    2. Open a terminal, navigate to `<IS_HOME>/bin/` folder,  and execute the following one of the following commands:

        ``` java tab="Linux/MacOS"
        sh fips.sh DISABLE
        ```

        ``` java tab="Windows"
        fips.bat DISABLE
        ```
    3. In the `<IS_HOME>/repository/conf/deployment.toml` file, perform any of the following actions:
        - Remove the `[jce_provider]` configuration, which was added when enabling this feature.
        - Add the following configuration to `<IS_HOME>/repository/conf/deployment.toml` file instead of removing the configuration.

            ``` toml
            [jce_provider]
            provider_name = "BC"
            ```
            
    4. Restart the WSO2 Identity Server.