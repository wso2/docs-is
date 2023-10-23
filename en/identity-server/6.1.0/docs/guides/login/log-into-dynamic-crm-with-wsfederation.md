# Logging in to Microsoft Dynamics CRM with WS-Federation

Microsoft Dynamics CRM supports claims based authentication using the
WS-Federation (Passive) protocol. Typically, claims are configured
with ADFS as the Service Provider to handle authentication requests with
the claims provider. Optionally, CRM can use a custom Security
Token Service (STS) in order to enable federated authentication. The
WSO2 Identity Server provides a secure token service by default. In
order to support using the Identity Server with CRM, a custom metadata
file needs to be generated and it should be accessible to the CRM claims
configuration wizard, which will give CRM the STS passive endpoint and
private key for signing of claims. Microsoft Dynamics CRM can be setup
with internal claims based authentication, or further secured for
external claims based authentication as an Internet Facing Deployment
(IFD).

Internet Facing Deployment (IFD) means that the functionality of the
application is externally exposed and is outside of your local network.
This is used by enterprises to set up their deployment to allow their
employees to access the application away from work. Using an Internet
Facing Deployment changes the URL structure CRM uses to load
organizations, and thus has an effect on the settings required in the
Identity Server.

The following must be configured to log in to Microsoft Dynamics CRM
using the WSO2 Identity Server.

## Configuring user stores

Users need to be configured within the Identity Server in order to
perform authentication. This can be done by manually adding users to the
Identity Server or connecting directly to an LDAP server. The only
requirements are that the user records represented in the Identity
Server have a username field in the format of username@domain.com or
DOMAIN\\username in order to correctly log in to CRM, and that username
field matches a username field within CRM.

### Configuring the service provider

Within WSO2, a service provider needs to be created to represent the
Microsoft Dynamics CRM server that requests for tokens. The only two
items that must be setup within the service provider configuration are
the inbound authentication WS-Federation (Passive) configuration, and
the claims configurations. If CRM is also configured for IFD, a service
provider needs to be created to represent each organization that
requests for tokens due to how CRM handles the organization's URLs.

Within the service provider, in the inbound authentication section, a
Passive STS realm must be defined under the WS-Federation (Passive)
Configuration area. This value should match the CRM server URL.
Typically, it will be in the format
`https://servername .domain.com/`
(for non-IFD) or `https://orgname.domain.com/` (for
IFD). For IFD servers, one server provider must be created for
each organization, with each one having the specific organization's URL
set as the Passive STS Realm in the Inbound WS-Federation
authentication settings. Ensure that the trailing "/" is included, as
CRM appends this by default to all its endpoints and the values must
match exactly.

1. Sign in. Enter your username and password to log on to the
    [Management
    Console]({{base_path}}/setup/getting-started-with-the-management-console)
   .
2. Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
3. Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider.
4. Expand the **Inbound Authentication Configuration** section followed
    by the **WS-Federation (Passive) Configuration** section.
5. Enter an appropriate value for the **Passive STS Realm** as
    explained above.  
    <!-- ![passive-sts-realm]({{base_path}}/assets/img/tutorials/passive-sts-realm.png) -->
6. Expand the **Claim Configuration** section. Claims must be
    configured in order to log the requester into CRM as the correct
    user. Microsoft Dynamics CRM expects two specific claims returned
    from the STS. They are as follows.

    - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`

    - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`

    In order to retrieve these values from WSO2, map the local claim
    value to the CRM value. In the **Subject Claim URI**, select the
    `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`
    claim. This example assumes that the
    `http://wso2.org/claims/logonname`
    contains the username field and the
    `https://wso2.claims/upn`
    contains a `DOMAIN\username` or
    `username@domain.com` formatted field that
    matches up to a username that exists in the CRM organization that is
    being accessed.

    <!-- ![sub-claim-uri]({{base_path}}/assets/img/tutorials/sub-claim-uri.png) -->

7. Click **Update**.

### Configure Microsoft Dynamics CRM

In order to authenticate with a security token service, CRM expects
federation metadata that contains specific details about the service.
It requires the certificate that the STS uses to sign the responses as
well as the passive STS endpoint for the WSO2 server, in addition to
the claims expected. A sample file can be found inside
`<IS_HOME>/repository/deployment/server/webapps/mex`
directory. This file needs to be hosted somewhere accessible to the CRM
server. For the purposes of testing this scenario, you can add it to the
wwwroot folder for easy access.

Once the metadata XML is in place, and assuming all the certificates
have been placed correctly on the servers if they differ between the
Identity Server and CRM, claims based authentication can be enabled from
the CRM deployment wizard. The federation metadata URL should point to
the file that was created above.

<!-- ![configure-ms-dynamics-crm]({{base_path}}/assets/img/tutorials/configure-ms-dynamics-crm.png) -->

On the next screen, select the certificate that is used to encrypt the
data sent between the STS and CRM.

<!-- ![encrypt-data-sts-crm]({{base_path}}/assets/img/tutorials/encrypt-data-sts-crm.png) -->

Continue through the wizard and apply the final settings. In this
example, an IFD CRM environment is used, so IFD needs to be re-enabled
at this point from within the CRM deployment manager. Then, perform an
IIS reset on the CRM server. Claims based authentication and IFD
should now be enabled, and if configured correctly, redirect the user to
the WSO2 logon screen when the user navigates
to https://\<orgname\>.crmdomain.com.

<!-- ![wso2-login]({{base_path}}/assets/img/tutorials/wso2-login.png) -->

!!! info "Related Topics"
    To test out WSO2 Identity Server's passive security token service
    using a sample, see [Configuring Single Sign On Using WS-Federation]({{base_path}}/guides/login/webapp-ws-federation/).
