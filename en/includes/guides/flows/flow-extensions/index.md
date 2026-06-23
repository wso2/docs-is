# Flow extensions

A **flow extension** lets you call your own external service from within a flow. This allows you to inject custom business logic, such as validation, enrichment, or risk evaluation, into a user journey without building it into the flow itself.

!!! note

    Flow extensions are currently supported only in the **Self Registration** flow.

## How it works

A flow extension follows a simple request-response cycle:

1. A user reaches the step in the flow where the extension is placed.
2. {{product_name}} sends a request to your endpoint, **exposing** the attributes you have marked as readable (for example, the user's email address and the application ID).
3. Your service runs its logic and responds with the attributes you have marked as writable.
4. {{product_name}} writes the returned values back into the flow as user attributes (claims) and continues to the next step.

Because the logic runs entirely in your own service, you control the data sources and business rules without embedding them into the flow itself.

## What's next

- [Flow extension configuration]({{base_path}}/guides/flows/flow-extension-configuration/) - Register your external service as a flow extension, map the attributes it reads and writes, and add it to a flow.
- [Implement an external service for flow extension]({{base_path}}/guides/flows/flow-extension-external-service/) - Build the endpoint that {{product_name}} calls, including the request and response contract it must follow.
