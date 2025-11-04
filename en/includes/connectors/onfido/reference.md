# Reference

This reference provides a complete, end-to-end overview of how to integrate Onfido for identity verification with {{product_name}} and use it within your applications.

![Onfido technical integration diagram]({{base_path}}/assets/img/connectors/onfido/onfido-technical-workflow.png)

The process involves the following general steps:

## Administrator tasks

- The administrator logs into the Onfido dashboard and,

    - Creates an Onfido workflow that defines the verification steps and requirements.

    - Generates credentials such as the API token and the workflow ID.

- The adminsitrator logs into the {{product_name}} Console and,

    - Creates an identity verification provider (IdVP) for Onfido using the API credentials obtained from Onfido.

    - Sets up user roles and permissions to control access to Onfido verification features.


