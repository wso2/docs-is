# Deployment best practices for the remote agent

Deploying the remote agent efficiently is crucial for ensuring a stable and secure connection between Asgardeo and your on-premise user store. Follow these best practices to enhance security and monitoring.

### Secure the installation token

Store the installation token securely and avoid sharing it with unauthorized users. Select the most suitable method to store the token based on your deployment environment. If you're using a containerized secured environment, you can go ahead with the environment variable method. For other instances such as virtual machines, store the token in the agent configuration file and encrypt it using the provided cipher tool.

### Encrypt sensitive information

Encrypt sensitive information such as user store credentials in the agent configuration file. Use the provided cipher tool to encrypt the secrets and configure them in the agent configuration file.

### Deploy in a local network

Deploy the agent in a local network where the actual user store resides and allow only the outbound traffic to the Asgardeo server. If required, you can also configure secure communication between the agent and the user store by configuring ldap over ssl (i.e. ldaps).

### Monitor the agent

Monitor the agent to ensure that it is running without any issues. You can configure a monitoring job by utilizing the Asgardeo remote user store API to check the status of the agent. Following is a sample curl command to check the agent status.

=== "Optimized Agent"

    ```bash
    curl --location 'https://api.asgardeo.io/t/{organization-name}/api/remote-userstore/v1/connection/{user-store-id}' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer {bearer_token}'
    ```

=== "Classic Agent"

    ```bash
    curl --location 'https://api.asgardeo.io/t/{organization-name}/api/onprem-userstore/v1/connection/{user-store-id}' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer {bearer_token}'
    ```
