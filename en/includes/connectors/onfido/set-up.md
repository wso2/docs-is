# Set up

The following guide explains how you can install and set up Onfido in {{product_name}}.

## Prerequisites

- You need to have an Onfido account. To create one, [contact](https://onfido.com/signup/){: target="_blank"} the Onfido team.

- Ensure comparison checks are enabled in your Onfido account. For more details, refer to the [Onfido comparison checks documentation](https://documentation.onfido.com/api/latest/#data_comparison){: target="_blank"}.

## Step 1: Install the Onfido connector

Installing Onfido in {{product_name}} involves two main steps, installing the connector file and installing the web application and resources that handle identity verification requests and responses from Onfido.

1. To install the connector file,

    1. From the WSO2 Identity Server [Connector Store](https://store.wso2.com/connector/identity-verification-onfido){: target="_blank"}, download `org.wso2.carbon.identity.verification.onfido.connector-<version>.jar`.

    2. Copy the `jar` file into the `<IS_HOME>/repository/components/dropins` directory of your WSO2 Identity Server installation.

2. To install the web application and resources,

    1. Download the `artifacts.zip` file from the WSO2 Identity Server [Connector Store](https://store.wso2.com/connector/identity-verification-onfido){: target="_blank"}.

    2. Extract the downloaded zip file.

    3. From the extracted folder, copy the `idv#onfido.war` file and paste it into the `<IS_HOME>/repository/deployment/server/webapps` directory.

    4. In the same extracted folder, copy the `onfido` directory and paste it into the `<IS_HOME>/repository/resources/identity/extensions/identity-verification-providers` directory.

3. Once you have copied the necessary files, configure the access control for Onfido by adding the following configuration the the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [[resource.access_control]]
    context = "(.*)/idv/onfido/v1/(.*)/verify"
    secure = "false"
    http_method = "POST"

    [tenant_context]
    enable_tenant_qualified_urls = "true"
    enable_tenanted_sessions = "true"
    rewrite.custom_webapps = ["/idv/onfido/"]
    ```

4. Restart {{product_name}}.

## Step 2: Integrate your Onfido account with {{product_name}}

Now that you have installed the Onfido connector, follow the steps below to integrate your Onfido account with {{product_name}}.

1. Connect your Onfido account with {{product_name}}.

    1. On the {{product_name}} Console, go to **Connections** and click **New Connections**.

    2. In the list of templates, find the **Onfido** card and click **Create** to add it.

    3. Enter a name for the Onfido connector and the necessary configurations:

        - **API Token**: The API token generated via the Onfido dashboard.
        - **Workflow ID**: The unique identifier for the Workflow created using Onfido Studio. For more information refer  to the [Onfido Workflow Setup Guide](onfido-setup-guide.md){: target="_blank"}.
        - **Base URL**: The regional base URL for Onfido API calls.
  
    4. Click **Create** to create the Onfido connector.

    5. On the created connection, note the URL displayed under the **Setup Guide**.

2. Generate a webhook token in Onfido and register it in {{product_name}}.

    1. Log in to your Onfido dashboard and navigate to the Webhook configuration section. 

    2. Generate a Webhook token by providing the displayed URL and selecting only the `workflow_run.completed` event.

    3. On the {{product_name}} Console, return to the created connection and navigate to its **Settings** tab.

    4. Enter the obtained token in the Webhook Token field, then click **Update** to finish the setup.

3. Map the Onfido attributes with {{product_name}}.

    1. Open the created **Onfido** connection and go to its Attributes tab.

    2. Update the mandatory first name and last name attribute mappings to match your Onfido configuration.

    3. To add additional attributes,

        1. Click **Add Attribute Mapping**.
        2. Enter the external attribute and select the corresponding local user attribute.

    4. Click **Update** to save the changes.

You have now successfully installed the Onfido connector and integrated your Onfido account with {{product_name}}.
