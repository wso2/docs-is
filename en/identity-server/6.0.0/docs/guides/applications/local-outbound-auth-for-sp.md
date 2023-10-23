# Configurng local and outbound authentication for a service provider

Local authenticators use locally available credentials to authenticate users. Basic authentication using username and password, [IWA (Integrated Windows Authentication)]({{base_path}}/references/concepts/integrated-windows-authentication-overview) or [FIDO (Fast IDentity Online)]({{base_path}}/guides/mfa/2fa-fido) are examples of local authenticators.

See [Architecture]({{base_path}}/references/architecture/architecture) for more information on local authenticators fit into the WSO2 IS architecture.

## Configure local and outbound authentication

To configure local and outbound authentication.

1. On the Management Console, go to **Main > Identity > Service Providers**.
2. Click **List**, select the service provider you want to configure, and click on the corresponding **Edit** link.
3. Expand **Local & Outbound Authentication Configuration**, and select the **Authentication Type**.

    ![local-outbound-config]({{base_path}}/assets/img/guides/local-outbound-config-sp.png)

    <table>
    <thead>
    <tr class="header">
    <th>Authentication Type</th>
    <th>Details</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Default</td>
    <td><div class="content-wrapper">
    <p>This is the default authenticator sequence for a configured service provider in the Identity Server.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td>Local Authentication</td>
    <td><p>In this case, Identity Server itself authenticate the user. There are six types of pre configured local authenticators available.</p>
    <ul>
    <li><strong>JWT Basic</strong> authenticator</li>
    <li><strong>Security Key/Biometrics (FIDO)</strong> authenticator</li>
    <li><strong>X509 Certificate</strong> authenticator</li>
    <li><strong>Backup Code</strong> authenticator</li>
    <li><strong>TOTP</strong> authenticator</li>
    <li><strong>basic</strong> authenticator</li>
    </ul></td>
    </tr>
    <tr class="odd">
    <td>Federated Authentication</td>
    <td>In this case, Identity Server trusts a third-party IdP to perform the authentication. These IdPs use various protocols to transfer authentication/authorization related messages.
    </tr>
    <tr class="even">
    <td>Advanced Configuration</td>
    <td>Advanced configurations enable you to add multiple options or steps in authentication. When multiple authentication steps exists, the user is authenticated based on each and every one of these steps. Learn more on how to configure advanced configurations for authenricators.</td>
    </tr>
    </tbody>
    </table>

4. Select the following options depending on your requirements: 

    | Field name    | Description   |
    |---------------|---------------|
    | Assert identity using mapped local subject identifier | Select this to use the local subject identifier when asserting the identity. It is mandatory to enable this to authorize scopes for provisioned federated users.  |
    | Always send back the authenticated list of identity providers | Select this to send back the list of identity providers used to authenticate the current user.   |
    | Use tenant domain in local subject identifier | Select this to append the tenant domain to the local subject identifier.  |
    | Use user store domain in local subject identifier | Select this to append the user store domain that the user resides to the local subject identifier.    |
    | Use user store domain in roles    | This is selected by default and appends the user store domain name to user roles. Clear the check box if you do not want to append the user store domain name to user roles. If a user role is not mapped to a service provider role, and you clear the **Use user store domain in roles** check box, the user store domain name will be removed from the role claim value unless the user store domain name is `APPLICATION`, `INTERNAL`, or `WORKFLOW`. |
    | Enable Authorization  | This option enables you to engage authorization policies for the service provider. |

5. Add a local authenticator under **Request Path Authentication Configuration** by clicking the **Add** button. The two types of local authenticators available are as follows:
    - OAuthRequestPathAuthenticator
    - BasicAuthRequestPathAuthenticator

6. Click **Update** to save the configurations.

### Configure advanced authentication
You can configure two types of multi-factor authentication in advance configurations.

1. Expand **Authentication Step Configuration** and click **Add Authentication Step**.

    !!! info
        You can add another step by clicking on **Add Authentication Step** again.

2. On the authentication step that appears, enter the following details:

    | Field name    | Description   |
    |---------------|---------------|
    | Use subject identifier from this step | Select this checkbox for the authentication step that you would like to get the subject identifier from. |
    | Use attributes from this step | Select this checkbox for the authentication step that you would like to get the attributes from.  |
    | Local Authenticators  | Select the local authenticator for authentication.  |
    | Federated Authenticators  | Select the authenticator from the list of [federated IdPs]({{base_path}}/guides/identity-federation/federated-authenticator) configured on the IS. |

#### Scenario

Consider a scenario where you configure the first step of authentication as Facebook and enable **Use subject identifier from this step**.

Then configure the second step of authentication as Google and enable **Use attributes from this step**.

Once authentication is complete subject id will be taken from the Facebook claims, and Google claims will be used as user attributes.

![mfa-with-options-configured]({{base_path}}/assets/img/guides/mfa-with-options.png)

!!! note
    If you have only one authentication step, both **Use subject identifier from this step** and **Use attributes from this step** will be obtained from the first step.


### Request path authenticators

A request path authenticator will get executed only if the initial
authentication request brings the applicable set of credentials with it.
See [Request Path Authentication]({{base_path}}/guides/request-path-auth/request-paths-overview) for more details.

!!! info "Related Topics"
    -   See [Multi-factor Authentication using FIDO]({{base_path}}/guides/mfa/2fa-fido) for more information on configuring multi-step and multi-option authentication using FIDO.
    -   See [Integrated Windows Authentication]({{base_path}}/references/concepts/integrated-windows-authentication-overview) for more information on configuring the IWA authenticator with WSO2 Identity Server.
    -   See [Request Path Authentication]({{base_path}}/guides/request-path-auth/request-paths-overview) for information on a local authenticator that is executed if the initial authentication request brings a set of credentials with it.
<!--    -   See [Try Request Path Authentication]({{base_path}}/guides/request-path-auth/) or more information on how the request path authenticator works using the WSO2 playground sample . -->
