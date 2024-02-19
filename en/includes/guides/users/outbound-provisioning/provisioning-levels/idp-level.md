# Enable IdP-level outbound provisioning

IdP-level outbound provisioning lets you provision a user to an outbound connector at the time a user logs in to an application using an external Identity Provider (IdP).

Follow the guides below to learn how to configure outbound provisioning at the IdP level.

1. On the {{ product_name }} Console, click **Connections** and click **New Connection**.

2. Click **Create Connection** and create a connection using your preferred external IdP.

    !!! note
        Learn how to create a connection and add it to the login flow of an application in [Add federated login]({{base_path}}/guides/authentication/federated-login/).

3. On the **Outbound provisioning** tab of the created connection, select **New Connector**.

4. Configure the outbound connector of your choice and click **Finish**.

    !!! note
            {{product_name}} supports the following outbound connectors. Learn how to configure the connector of your choice by following the relevant guide.
            <ul>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google">Google</a></li>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce">Salesforce</a></li>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2">SCIM2</a></li>
            </ul>

4. Switch on the toggle to enable the configured outbound connector.

     ![Configure IdP-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/configure-idp-level-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.