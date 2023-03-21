# Configuring WS-Trust Security Token Service

WSO2 Identity Server uses the security token service (STS) as the [WS-Trust]({{base_path}}/references/concepts/authentication/intro-ws-trust/) implementation.

The STS is capable of issuing SAML 1.1 and 2.0 security tokens and has a SOAP/XML API for token issuance.

## Download the STS connector
WS-Trust authentication is no longer supported by default from IS 5.11.0 upwards and has been introduced as a connector. In order to use WS-Trust authentication, first, you should download the connector from the WSO2 Connector Store.

To download and install the WS-Trust connector:

1. Download the [WS-Trust Authenticator](https://store.wso2.com/store/assets/isconnector/details/417e7ef2-76fb-424f-92b3-d5eb58e2efe6) from the WSO2 connector store.
2. Copy and paste the downloaded `.zip` file to the home directory of your WSO2 Identity Server and extract the `.zip` file.
3. Open a terminal, navigate to the home of the extracted directory and execute the following commands.
    ```bash
    chmod u+r+x setup_sts.sh
    ./setup_sts.sh 
    ```
The connector is successfully installed. Now you can delete the extracted directory.

## Secure the Security Token Service

According to the trust-brokering model defined in the WS-Trust specification, the users should authenticate themselves to the STS before obtaining a token. STS may use this authentication information when constructing the security token.

For example, STS may populate the required claims based on the username provided by the user. Therefore, the STS service needs to be secured.

To secure the Security Token Service:

1. On the Management Console, go to **Identity Providers \> Resident**.

2. Enter the required values as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Home Realm Identifier</strong></td>
    <td>This is the domain name of the identity provider. If you do not enter a value here, the user will be prompted to specify a domain, when an authentication request comes to WSO2 Identity Server. You can enter multiple identifiers as a comma-separated list.</td>
    <td><code>localhost</code></td>
    </tr>
    <tr class="even">
    <td><strong>Idle Session Time Out</strong></td>
    <td>This is the duration in minutes for which an SSO session can be idle. If WSO2 Identity Server receives no SSO authentication requests for the given duration, a session time-out occurs. The default value is <code>15</code> .</td>
    <td><code>15</code></td>
    </tr>
    <tr class="odd">
    <td><strong>Remember Me Period</strong></td>
    <td><div class="content-wrapper">
    <p>This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that the <strong>Remember Me</strong> option is selected in the WSO2 Identity Server login screen.</p>
    <p>The default value is <code>2</code> weeks.</p>
    </div></td>
    <td><code>2</code></td>
    </tr>
    </tbody>
    </table>

3. Expand **Inbound Authentication Configuration** > **Security Token Service Configuration** and click **Apply Security Policy**.
    
    ![apply security policy]({{base_path}}/assets/img/guides/ws-trust-apply-policy.png)

4. Select **Yes** from the **Enable Security?** list and select a pre-configured security scenario according to your requirements.
We will be using `UsernameToken` under the **Basic Scenarios** section for this tutorial.

    !!! note
        You can find further details about security policy scenarios from the **view scenario** option.

        ![enable-security]({{base_path}}/assets/img/guides/ws-trust-view-scenario.png)

5. Click **Next** and provide the required details as follows:

    !!! info
        The next steps may vary per the security scenario you have chosen under point (5) above. Given below are the steps for the **UsernameToken** scenario.

    1. Select `ALL-USER-STORE-DOMAINS` as the domain.
    2. Select the role you created to grant permission to access a secured service. In this example, the `admin` role is used.
        ![select-domain]({{base_path}}/assets/img/guides/ws-trust-select-domain.png)

        !!! note
            The **Select Domain** drop-down lists the available domains. The listed **User Groups** can vary depending on the domain selected from the drop-down.

6. Click **Finish**.
7. Click **Ok** on the confirmation dialog window that appears.
8. Click **Update** to save and complete the process.

Now STS is configured and secured with a username and password. Only users with the Admin role can consume the service.

The next step is to add a service provider to consume the STS.

## Configure the service provider

The steps in this section should be followed if you are using **Holder-of-Key** as the [subject confirmation method]({{base_path}}/references/concepts/authentication/intro-ws-trust/#subject-confirmation).

<!-- For more information, see [how to configure STS for obtain tokens with Holder-Of-Key subject confirmation]({{base_path}}/learn/configuring-sts-for-obtaining-tokens-with-holder-of-key-subject-confirmation). -->

!!! Tip "Before you begin"
    You must first [register a service provider]({{base_path}}/guides/applications/register-sp/).

1. On the Management Console, go to **Service Providers** > **List** and select your service provider.
2. Expand **Inbound Authentication Configuration** > **WS-Trust Security Token Service Configuration** and click **Configure**.
3. Enter the required details as given below.
    <table>
        <thead>
            <tr class="header">
                <th>Field</th>
                <th>Description</th>
                <th>Sample Value</th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd">
                <td><strong>Endpoint Address</strong></td>
                <td>
                    <div class="content-wrapper">
                    <div>
                        Enter the trusted relying party's <strong>endpoint address</strong>, which is the endpoint address of the Security Token Service.
                        <p>The endpoint must be used as the service URL to which the token gets delivered by the STS client. Then select the public certificate imported. Tokens issued are encrypted using the public certificate of the trusted relying party. Therefore, the consumer who obtains this token to invoke the RP service will not be able to see the token.</p>
                        <div class="admonition note">
                            <p class="admonition-title">Note</p>
                            Make sure to upload the certificate of the relying party to the trust store. For instructions, see <a href="https://is.docs.wso2.com/en/latest/deploy/security/create-new-keystores/#add-ca-signed-certificates-to-keystores">adding CA-signed certificates to keystores</a>.
                        </div>
                        <br/>
                    </div>
                    </div>
                </td>
                <td><code>https://localhost:9444/services/echo</code></td>
            </tr>
            <tr class="even">
                <td><strong>Certificate Alias</strong></td>
                <td>This is the alias of the certificate.</td>
                <td><code>wso2carbon</code></td>
            </tr>
        </tbody>
    </table>

    ![add-new-trusted-service]({{base_path}}/assets/img/guides/ws-trust-sts-config.png)

4. Click **Update** to save your changes.

{!./includes/running-an-sts-client.md!}