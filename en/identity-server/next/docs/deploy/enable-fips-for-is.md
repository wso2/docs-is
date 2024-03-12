# Enable FIPS 140-2-compliant mode

The [FIPS 140-2 standard](https://csrc.nist.gov/publications/detail/fips/140/2/final) is a standard created by the National Institute of Standards and Technology’s (NIST’s) Computer Security Division. It defines the requirements for cryptographic modules used to protect sensitive information in computer and telecommunication systems.
See [FIPS 140-2 compliance reference]({{base_path}}/deploy/compliance/fips) for more information.

From IS 7.0.0 release onwards, the Identity server supports running in a FIPS 140-2-compliant mode. When setting up in FIPS 140-2-compliant mode, the identity server uses the [Bouncy Castle FIPS Java API](https://www.bouncycastle.org/fips-java/).

FIPS 140-2-compliant mode is turned off by default on the Identity Server.

To enable FIPS 140-2 compliant mode on the Identity Server:

1. Shut down the Identity Server instance if it's running.
2. Open a terminal, navigate to `<IS_HOME>/bin/` folder,  and execute the following one of the following commands:
    
    === "Linux/MacOS"
        ```
        sh fips.sh
        ```

    === "Windows"
        ```
        fips.bat run
        ```

    !!! note "Important"
            You should run the `fips.sh` script everytime you take an update of the WSO2 Identity Server.

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

        === "Linux/MacOS"
            ```
            sh fips.sh DISABLE
            ```

        === "Windows"
            ```
            fips.bat DISABLE
            ```

    3. In the `<IS_HOME>/repository/conf/deployment.toml` file, perform any of the following actions to disable the FIPS compliant mode:
        
        - Remove the `[jce_provider]` configuration, which was added when enabling this feature.
        - Add the following configuration to `<IS_HOME>/repository/conf/deployment.toml` file instead of removing the configuration.

            ``` toml
            [jce_provider]
            provider_name = "BC"
            ```
            
    4. Restart the WSO2 Identity Server.


!!! note "Running the fips.sh script"
    You can use the `fips.sh` script with the following arguments according to your requirements:

    - Without parameters
        - Without arguments
            - Command - `sh fips.sh`
            - Running the script without arguments will download the `bc-fips` and `bcpkix-fips` jars from the public maven repository.
        - With `-f` argument
            - Command - `sh fips.sh -f {file_path_to_fips_jars}`
            - If you have already downloaded the `bc-fips` and `bcpkix-fips` jars to a local directory, you can run the script with `-f` followed by the local directory path for the script to obtain the jars.
        - With `-m` argument
            - Command - `sh fips.sh -m {base_path_to_local_maven}`
            - Running the script with `-m` followed by the base path to the local maven directory will download the `bc-fips` and `bcpkix-fips` jars from the local maven repository.
    - With parameters
        - `VERIFY` parameter
            - Command - `sh fips.sh VERIFY`
            -  Using the verify parameter you can check whether the product pack is FIPS compliant or not.
        - `DISABLE` parameter
            - Command - `sh fips.sh DISABLE`
            - Using the disable parameter, you can disable the FIPS-compliant mode.