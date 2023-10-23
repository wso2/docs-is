# Configure a resident service provider

WSO2 Identity Server can mediate authentication requests between service providers and identity providers. At the same time, the Identity Server can act as a service provider and an identity provider. When it acts as a service provider, it is known as the resident service provider.

The Identity Server mainly acts as a resident service provider while
adding users to the system.

To configure a resident service provider:

1. On WSO2 IS Management Console, go to **Main > Identity > Service Providers > Resident**.
2. On the **Resident Service Provider** page, select the options according to your requirements:

    <table>
        <tr>
            <th>Provisioning Method</th>
            <th>Field</th>
            <th>Description</th>
        </tr>
        <tr>
            <th rowspan="2">Inbound Provisioning Configuration</th>
            <td>User Store Domain</td>
            <td>Select the user store domain to provision users and groups for inbound authentication for SCIM or SOAP requests.</td>
        </tr>
        <tr>
            <td>Enable Dumb Mode for SCIM</td>
            <td>If this is enabled users will not be provisioned to the user store.</td>
        </tr>
        <tr>
            <th>Outbound Provisioning Configuration</th>
            <td>Identity Provider</td>
            <td>Select the [outbound provisioning enabled IdP]({{base_path}}/guides/identity-federation/outbound-provisioing-idp).</td>
        </tr>
    </table>

    ![resident-sp-config]({{base_path}}/assets/img/guides/resident-sp-config.png)

3. Click **Update** to save the configurations.