# Configure Keystores

!!! info "Before you begin"

    1. Make sure to go through the [recommendations for setting up keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption#recommendations-for-setting-up-keystores) to understand the various keystores you will need.

    2. If you have not already created the keystores required for your system, see [creating new keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores).


## Configure default keystore and truststore

WSO2 Identity Server provides default keystore and truststore files:

- `wso2carbon.jks`: The default keystore that includes a private key and a self-signed certificate.
- `client-truststore.jks`: The default truststore containing CA certificates and the self-signed certificate from wso2carbon.jks.

{% include "../../../../../../includes/guides/encryption/configure-keystores.md" %}
