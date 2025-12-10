# Validate FIDO2 attestations

FIDO2 attestation is used to verify the authenticity of the authenticator, such as the hardware key or the biometric device, the user registers with the server.

{{product_name}} provides two means of validating the authenticator data during registration.

- **Advanced validations**: {{product_name}} performs attestation type specific validations, certificate related validations etc.
- **FIDO metadata based validations**: {{product_name}} validates the device registration data against FIDO alliance’s metadata.

Advanced validations are enabled, by default, for the organization. The following guide explains how you can enable further attestation validations in {{product_name}}.

## FIDO2 Metadata Service (MDS)

FIDO2 Metadata Service (MDS) is a repository that can be used by {{product_name}} to validate the authenticity of the authenticators during device registration. MDS validations verify the genuineness of the device model as well as check for the device certification status and found security issues.

Moreover, FIDO2 metadata service can be configured to validate the authenticator attestation against a set of manually provided metadata statements. For example, if your organization distributes hardware keys to members, to allow registering those keys, you can enable FIDO2 metadata service and upload the relevant metadata statements.

Follow the steps below to enable MDS validations.

## Prerequisites

1. Open the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory and add the following configurations as necessary.

    - Enable FIDO2 MDS by adding the following configuration.

        ```toml
        [fido.metadata_service]
        enable = true
        mds_endpoints = [
            “<url>”
        ]
        ```

        !!! info
            - Obtain the `<url>` from the FIDO alliance’s [website](https://fidoalliance.org/metadata/){: target="#"}.
            - Enabling this service requires internet access to this URL. If you’re hosting {{product_name}} in an  offline setup, you may have to host the metadata BLOB file internally and provide the necessary means to     update it regularly.

    - Add the following configuration if you wish to delay initializing FIDO2 MDS. The default value is set to 0.

        ```toml
        mds_scheduler_initial_delay = 30    # in seconds
        ```

2. Create the following folder structure and upload the `mds3` root certificate to `<IS_HOME>/repository/resources/identity/fido2/security/MDS3ROOT.crt` in order to trust the metadata BLOB endpoints.

3. If you are manually providing additional metadata statements, upload them into `<IS_HOME>/repository/resources/identity/fido2/metadataStatements/` as `json` files.

4. [Obtain an access token]({{base_path}}/apis/#oauth-based-authentication) with the below scopes.
        ```
        internal_config_mgt_update internal_config_mgt_view
        ```

    The token obtained in this step will be referred to as the `<access_token>` in the following sections.

## Configure FIDO2 attestation validations

You can use the following cURL command format in your request to enable metadata based attestation validations.
    ```
    curl -X PUT \
    https://localhost:9443/api/identity/config-mgt/v1.0/resource/fido-config \
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

Use the above `cURL` command when configuring FIDO2 attestation validations for the first time. Use the following `cURL` commands in your request to update configurations for each attestation method.

- To update metadata based validations:
    ```
    curl -X PUT \
    https://localhost:9443/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
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
    https://localhost:9443/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>" \
    -D '{
                "key": "AttestationValidation.Enable",
                "value": "true"
    }'
    ```

## View FIDO2 attestation validations

Use the following cURL command in your request to view the attestation validation configurations.
    ```
    curl -X GET \
    https://localhost:9443/api/identity/config-mgt/v1.0/resource/fido-config/fido2-validations \
    -H 'Accept: */*' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <access_token>"
    ```
