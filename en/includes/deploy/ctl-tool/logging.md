## Logging

IAM-CTL uses a unified logging system that provides structured, filterable log output with resource context and an end-of-run summary after every export or import operation.

### Log configuration

Add a `LOGS` block to your `toolConfig.json` to configure logging behavior:

=== "toolConfig.json"

    ```json
    {
        "LOGS": {
            "LOG_LEVEL": "INFO",
            "LOG_REQUEST_PAYLOADS": false
        }
    }
    ```

| Property               | Values                           | Default | Description                                                                                    |
| ---------------------- | -------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `LOG_LEVEL`            | `DEBUG`, `INFO`, `WARN`, `ERROR` | `INFO`  | Minimum log level to print. Messages below this level are suppressed.                          |
| `LOG_REQUEST_PAYLOADS` | `true`, `false`                  | `false` | When set to `true`, HTTP request bodies are logged at `DEBUG` level for POST and PUT requests. |

!!! warning "Sensitive data in request payloads"
    Request bodies may contain sensitive credentials (client secrets, passwords, access tokens). Enabling `LOG_REQUEST_PAYLOADS` will write these values to your log output. Only enable this option in secure, non-production environments, and ensure log files are adequately protected.
