# OpenID Connect Dynamic Client Registration (DCR)

[Dynamic Client Registration (DCR)](https://tools.ietf.org/html/rfc7591) allows clients to register with {{product_name}} dynamically without manual intervention. DCR suits scenarios where you have many clients or clients that require frequent creation and deletion.

You can register clients dynamically in two ways:

- A client registers itself dynamically by sending a request to the client registration endpoint of {{product_name}}.

- An admin or system registers a client using the {{product_name}} DCR REST API and manages the client via the Dynamic Client Registration Management (DCRM) REST APIs.

This guide explains how both methods work.

## How does DCR work?

In the self-registration flow, the client initiates its own registration. The process consists of the following steps:

### Self-registration of clients

The DCR self-registration process consists of the following steps:

1. Using WebFinger, the client discovers the client registration endpoint of the authorization server. Refer to [OpenID Connect Discovery]({{base_path}}/guides/authentication/oidc/discover-oidc-configs/) for more information on WebFinger.

2. The client sends an HTTP POST request to the client registration endpoint, including any client metadata parameters it chooses to specify during registration.

3. {{product_name}} issues a unique client identifier (client ID) to the client and, optionally, a client secret.

4. {{product_name}} links the metadata provided in the request to the issued client ID.

5. The client can now use the issued client ID and secret to request access tokens from the authorization server.

### Register clients programmatically

Administrators or automated systems can register clients programmatically using the {{product_name}} DCR REST API. Once a client is registered, it can be managed using DCRM REST APIs.

[Dynamic Client Registration Management (DCRM)](https://tools.ietf.org/html/rfc7592){: target="_blank"} was introduced as an extension to DCR that defines RESTful APIs to manage already registered clients. Using DCRM APIs, you can:

- Read: Retrieve information about an already registered client.

- Update: Modify the metadata of an existing client.

- Delete: Remove a registered client from the system.

!!! note "{{product_name}} DCR REST APIs"

    For a comprehensive guide on using DCR REST APIs in {{product_name}}, see [Dynamic Client Registration (DCR) REST APIs]({{base_path}}/apis/dynamic-client-registration-rest-api/).
