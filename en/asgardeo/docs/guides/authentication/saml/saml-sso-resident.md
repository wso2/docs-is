# Configure SAML Web SSO for your organization

This guide explains how to configure **SAML Web Single Sign-On (SSO)** settings for your organization using the **Login & Registration** section in the Console. These settings apply at the tenant level and control how your organization behaves as a SAML Identity Provider (IdP) during authentication flows.

!!! Note
    These settings are applicable when your organization is acting as an IdP and issuing SAML responses to service providers.

## SAML2 configurations

1. To configure SAML2 configurations:

    1. In the Console, go to **Login & Registration** from the left navigation menu.
    2. Scroll down to **Single Sign-On (SSO) Settings**.
    3. Click on **SAML2 Web SSO Configuration** and confgure.

    <img src="{{base_path}}/assets/img/guides/authentication/saml2-web-sso-resident.png" width="600" alt="SAML2 Web SSO configurations"/>

The following fields are currently configurable via the Console:

| Field                     | Description                                                                 | Sample/Default Value |
|--------------------------|-----------------------------------------------------------------------------|----------------------|
| **Enable Metadata Signing**  | This facilitates enabling or disabling metadata signing. | `false` |
| **Metadata Validity Period** | The duration (in minutes) for which the metadata will remain valid before it should be refreshed. | `60` |

!!! Note
    You can download the SAML2 metadata by accessing the URL: `https://api.asgardeo.io/t/<org_name>/identity/metadata/saml2` 
