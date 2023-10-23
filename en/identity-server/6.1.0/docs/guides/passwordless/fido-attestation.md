# FIDO2 Attestation Validations

FIDO2 attestation validations allow you to further validate the FIDO2 authenticator data during the security key registration. WSO2 identity server provides two means of validating the authenticator data during the security key registration.

- **Advanced validations**: WSO2 identity server will perform some advanced validations for the device registration data. Examples include attestation type specific validations, certificate related validations, etc.
- **Security Key/Biometrics (FIDO) metadata based validations**: WSO2 identity server will validate the device registration data against the FIDO alliance’s metadata.

!!!info "What is Attestation?"
    - Attestation and assertion are two terms that are frequently used during Security Key/Biometrics (FIDO) flows. Attestation occurs during security key registration and assertion occurs during the authentication.
    - Attestation is a key pair that is specific to a device model and can be used to cryptographically prove the genuineness of a device model. Attestation keys are associated with attestation certificates which are chained to a root certificate that the server trusts.

By default, only the advanced validations are enabled for a given organization. Proceed with the next section of the documentation to learn more about these configurations.

## FIDO2 Metadata Service (MDS)

WSO2 identity server FIDO2 metadata service allows you to validate the security status of the FIDO2 security keys during device registration. MDS validations verify the genuineness of the device model as well as check for the device certification status and found security issues. This allows validating the authenticator attestation against the metadata statements published at the FIDO alliance’s metadata service (MDS).

Moreover, FIDO2 metadata service can be configured to validate the authenticator attestation against a set of manually provided metadata statements. You need to manually provide metadata statements to trust specific security key models. For example, if your organization distributes security keys to members for their internal login, and you need to allow registering those keys, you can enable FIDO2 metadata service and upload the relevant metadata statements.

## Prerequisites

- Open the <IS_HOME>/repository/conf/deployment.toml file and add the following configurations to enable FIDO2 metadata service.

    ```toml
    [fido.metadata_service]
    enable = true
    mds_endpoints = [
        “<url>”
    ]
    ```

    !!! info
        - The `<url>` can be obtained from the FIDO alliance’s website https://fidoalliance.org/metadata/.
        - Please note that enabling this service will require internet access to this URL. If you’re hosting the identity server in an offline setup, you may have to host the metadata BLOB file internally and provide the necessary means to update it regularly.

- Additionally, the following configuration can be added to delay initializing the fido2 metadata service. The default value is set to 0.

    ```toml
    mds_scheduler_initial_delay = 30    # in seconds
    ```

- Create the required folder structure and upload the `mds3` root certificate to `<IS_HOME>/repository/resources/identity/fido2/security/MDS3ROOT.crt` in order to trust metadata blob endpoints.

- If you are manually providing additional metadata statements, upload them into `<IS_HOME>/repository/resources/identity/fido2/metadataStatements/` as `json` files.

- You are required to invoke management APIs to configure FIDO2 attestation validations. To access management APIs, first, you need to [create a management application]({{base_path}}/guides/applications/register-sp/) and obtain an access token from your organization with the below scopes.
    ```
    internal_config_mgt_update internal_config_mgt_view
    ```

The token obtained in this step will be referred to as the `<access_token>` in the next sections.

!!! info "Management Application"
    Identity Server exposes all the management capabilities as REST APIs. These APIs are protected by OAuth2 access tokens and other API authentication mechanisms. The applications which are marked as management applications can only be used to access these management APIs in the OAuth2 flow.
    This can be configured when creating the application only.

## Configure FIDO2 attestation validations in your organization

By default, only the advanced validations are enabled for a given organization. Use the following cURL command format in your request to enable metadata based attestation validations.
    ```
    curl -X PUT \
    https://localhost:9443/t/<org_name>/api/identity/config-mgt/v1.0/resource/fido-config \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>" \
    -D '{
        "name": "fido2-validations",
        "attributes": [
            {
                "key": "MDSValidation.Enable",
                "value": "true"
            },
            {
                "key": "AttestationValidation.Enable",
                "value": "true"
            }
        ]
    }'
    ```

By sending this request you are creating a resource named `fido2-validations` with the given attribute values to store attestation validation configurations of your organization. 

You are required to use the above `cURL` command when configuring FIDO2 attestation validations for the first time. There onwards you can use the following `cURL` command format in your request to update the individual configurations.

- To update metadata based validations:
    ```
    curl -X PUT \
    https://localhost:9443/t/<org_name>/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>" \
    -D '{
                "key": "MDSValidation.Enable",
                "value": "true"
    }'
    ```

- To update advanced validations:
    ```
    curl -X PUT \
    https://localhost:9443/t/<org_name>/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>" \
    -D '{
                "key": "AttestationValidation.Enable",
                "value": "true"
    }'
    ```


Use the following cURL command format in your request to view the attestation validation configurations of your organization.
    ```
    curl -X GET \
    https://localhost:9443/t/<org_name>/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>"
    ```
