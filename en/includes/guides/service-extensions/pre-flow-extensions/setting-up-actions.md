# Setting up actions

This guide provides a step-by-step approach to setting up actions in {{product_name}} to customize its behavior at specific extension points.

## Prerequisites

Ensure that you have:

- Access to the {{product_name}} console.
- Facility to implement a web service or endpoint accessible to {{product_name}}.

## Create the external service

Your external web service should implement the following to successfully execute an action.

1. Expose an endpoint that accepts HTTP POST requests with JSON payloads. This endpoint should be deployed in a server accessible to {{product_name}}.

2. Ensure your service adheres to the REST API contract specified for the action type you plan to use. This includes handling request and response formats.

3. Use one of the following methods to secure the communication between your external service and {{product_name}}.

    - Basic Authentication: Use HTTP Basic authentication to secure the endpoint.
    - OAuth 2.0 Bearer Tokens: Implement OAuth 2.0 for token-based authentication.
    - API Key Header: Secure the endpoint using an API key sent in the request header.

    !!! tip
        During the development phase, you may choose to invoke your external service without security for testing purposes. However, ensure that proper security measures are implemented before deploying the service in a production environment.

## Configure an action in {{product_name}}

Follow the steps below to configure an action.

1. On the {{product_name}} Console, go to **Actions**.

2. Click on the preferred action type (e.g. Pre Issue Access Token).

    ![action-types]({{base_path}}/assets/img/guides/actions/action-types-in-ui.png){: width="650" style="display: block; margin: 0; border: 0px;"}

3. Provide the following information

    - **Action Name**: Provide a name for the action.
    - **Endpoint**: Enter the URL of the web service endpoint you created.
    - **Authentication**: Select the type of authentication required to invoke your endpoint and configure the related properties. 

        !!! note
            
            Once added, these authentication secret values will not be displayed again. You will only be able to reset them.
            
        - Basic - Provide a username and password.
        - Bearer - Provide a bearer token.
        - API Key - Provide the header name and the value.
        - No Authentication - No authentication (recommended only for testing purposes).

    Note that additional properties may be available depending on the action type being configured.

4. Click **Create** to create the action.

## Test your action

Follow the steps below to try out the created action.

1. Trigger an action by initiating the specified flow (e.g., login and get an access token, update a password).

2. Ensure that the external service receives a request with a JSON payload from {{product_name}}. Payload differs based on the type of action you have implemented.

3. Verify that your service correctly processes the request and the response is handled as intended by {{product_name}}.

## Troubleshoot issues

The following are some of the troubleshooting steps that you may take to resolve issues.

1. Ensure that your external service is up and running and that there are no connectivity issues.

2. Confirm that the request and response payloads conform to the expected formats as defined by the REST API contract.
