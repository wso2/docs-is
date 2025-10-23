# Set up

The following guide explains how you can install and set up Onfido in {{product_name}}.

## Prerequisites

- You need to have an Onfido account. To create one, [contact](https://onfido.com/signup/){: target="_blank"} the Onfido team.

- Ensure comparison checks are enabled in your Onfido account. For more details, refer to the [Onfido comparison checks documentation](https://documentation.onfido.com/api/latest/#data_comparison){: target="_blank"}.

## Step 1: Install the Onfido connector

Installing Onfido in {{product_name}} involves two main steps, installing the connector file and installing the web application and resources that handle identity verification requests and responses from Onfido.

1. To install the connector file,

    - From the WSO2 Identity Server [Connector Store](https://store.wso2.com/connector/identity-verification-onfido){: target="_blank"}, download `org.wso2.carbon.identity.verification.onfido.connector-<version>.jar`.

    - Copy the `jar` file into the `<IS_HOME>/repository/components/dropins` directory of your WSO2 Identity Server installation.

2. To install the web application and resources,

    - Download the `artifacts.zip` file from the WSO2 Identity Server [Connector Store](https://store.wso2.com/connector/identity-verification-onfido){: target="_blank"}.

    - Extract the downloaded zip file.

    - From the extracted folder, copy the `idv#onfido.war` file and paste it into the `<IS_HOME>/repository/deployment/server/webapps` directory.

    - In the same extracted folder, copy the `onfido` directory and paste it into the `<IS_HOME>/repository/resources/identity/extensions/identity-verification-providers` directory.

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

## Step 2: Register Onfido account in {{product_name}}

Now that you have installed the Onfido connector, you need to integrate your Onfido account in {{product_name}}. To do so,

1. On the {{product_name}} Console, go to **Connections** and click **New Connections**.

2. In the list of templates, find the **Onfido** card and click **Create** to add it.

3. Enter a name for the Onfido connector and the necessary configurations:

     - **API Token**: The API token generated via the Onfido dashboard.
     - **Workflow ID**: The unique identifier for the Workflow created using Onfido Studio. For more information refer   [Onfido Workflow Setup Guide](onfido-setup-guide.md){: target="_blank"}.
     - **Base URL**: The regional base URL for Onfido API calls.
  
4. Click **Create** to create the Onfido connector.

5. You will be redirected to the setup guide for the newly created Onfido connector. Follow the instructions displayed:
   - Log in to your Onfido dashboard and navigate to the Webhook configuration section. Generate a Webhook token by 
   providing the displayed URL and selecting only the `workflow_run.completed` event.
   - Return to the WSO2 console and navigate to the **Settings** tab of the newly created Onfido connector. 
   Enter the obtained token in the Webhook Token field, then click `Update` to finish the setup.
6. Now that you have created a connection for Onfido, ensure that the attributes used in Onfido are correctly mapped to 
the attributes in Identity Server. To do this:
   - Navigate to the **Attributes** tab of the newly created Onfido connector.
   - Verify that first name and last name are already configured as mandatory attributes. 
   - To add other attribute mappings, click **Add Attribute Mapping**. 
   - Enter the attribute name used in Onfido. 
   - Select the corresponding Identity Server Claim URI. 
   - Click **Add Attribute Mapping** and then **Update**.
1. After completing the configuration and attribute mapping, your Onfido connector will be ready for use with WSO2 
Identity Server. You can now integrate Onfido's identity verification process into your applications.

> **Note :**
> 
> In WSO2 Identity Server 7.0, the steps differ slightly. To create a new Identity Verification Provider:
> 1. Log in to the WSO2 Identity Server console using your admin credentials.
> 2. Navigate to Identity Verification Providers in the left-hand menu.
> 3. Click + New Identity Verification Provider.
> 4. Follow steps 4-9 as listed above to complete the setup process.
