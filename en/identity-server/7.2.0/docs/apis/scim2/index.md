# SCIM 2.0 API

The SCIM2 Rest APIs of {{product_name}} implements the SCIM 2.0 protocol according to the [specification](https://datatracker.ietf.org/doc/html/rfc7644){target="_blank"}. This section includes the following APIs.

## Restrict federated user access

You can restrict federated users from accessing SCIM 2.0 endpoints by adding the following configurations to the `deployment.toml` file:

```toml
[scim]
restrict_federated_user_access = true

[scim2]
restrict_federated_user_access_to_me_endpoint = true
```

When these configurations are enabled, federated users will be denied access to SCIM 2.0 API endpoints.

## APIs

- [SCIM 2.0 Users API]({{base_path}}/apis/scim2/scim2-users-rest-api/)
- [SCIM 2.0 Groups API]({{base_path}}/apis/scim2/scim2-groups-rest-api/)
- [SCIM 2.0 Patch operations]({{base_path}}/apis/scim2/scim2-patch-operations/)
- [SCIM 2.0 Bulk API]({{base_path}}/apis/scim2/scim2-bulk-rest-api/)
- [SCIM 2.0 Batch operations]({{base_path}}/apis/scim2/scim2-batch-operations/)
- [SCIM 2.0 Resource types API]({{base_path}}/apis/scim2/scim2-resource-types/)
- [SCIM 2.0 Service provider configuration API]({{base_path}}/apis/scim2/scim2-sp-config-rest-api/)