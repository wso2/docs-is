1. Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file and uncomment the `[output_adapter.email]` configuration block.

    ```toml
    [output_adapter.email]
    from_address= "wso2iam@outlook.com"
    username= "wso2iam@outlook.com"
    password= "xxxx"
    hostname= "smtp.office365.com"
    port= 587
    ```

2. Update the sample values with your email adapter configurations.

    !!! info
        Refer [configure email sending module](../../../deploy/configure-email-sending) for the complete list of email adapter configurations.

2. Save the configurations and restart the server.
