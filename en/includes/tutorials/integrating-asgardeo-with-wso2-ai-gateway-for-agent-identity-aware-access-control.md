# Integrating Asgardeo with WSO2 AI Gateway for Agent Identity Management

In this tutorial, we explore how enterprises can securely scale multi-agent AI systems using **Asgardeo** and the **WSO2 AI Gateway**. As AI adoption grows, organizations often rely on multiple AI agents, some optimized for speed and cost, others designed for deep reasoning and critical decision-making. Without proper governance, this can quickly lead to security risks, runaway costs, and uncontrolled model access. By combining **Asgardeo’s identity and access management** for non-human agents with the **WSO2 AI Gateway’s intelligent routing**, scope-based authorization, and token-aware rate limiting, teams gain precise control over who can access which AI models and at what cost.

Let’s dive in and see how this architecture brings security, efficiency, and confidence to enterprise-grade AI deployments.

## The use case: Enterprise support system

Imagine a global software provider facing a **40% year-over-year increase in support tickets**. To scale without bloating the budget, they have deployed a **Multi-Agent AI System**. Instead of a single general-purpose agent, they use multiple specialized agents:

- **The Coordinator Agent**: A fast, cost-effective agent that classifies incoming tickets.
- **The Expert Agent**: A "deep thinking" agent reserved for critical, complex infrastructure outages.

### The agents in action

| **Agent**              | **Model**          | **Role**               | **Primary Goal**                |
|------------------------|--------------------|------------------------|----------------------------------|
| The Coordinator Agent  | OpenAI GPT-4o mini | Support-Coordinator    | Instant triage and categorization. |
| The Expert Agent       | OpenAI GPT-5       | Technical-Specialist   | Deep reasoning and code fixing. |

#### Example scenario

1. **Intake & Triage**: A customer reports "Server down, error 503." The application invokes the **Coordinator Agent**. The agent authenticates via **Asgardeo**, receiving a token with the `Support-Coordinator` role. **WSO2 AI Gateway** validates this role and the specific rate limit before routing the request to the cheaper mini model.
2. **Escalation & Reasoning**: Identifying a "Critical" flag, the system wakes up the **Expert Agent**. This agent authenticates as a `Technical-Specialist`. **WSO2 AI Gateway** verifies the role and applies a strict rate limit to prevent recursive loops from draining the cloud budget on the expensive reasoning model.

Below is a high-level conceptual overview of the architecture we plan to explore.

![Architecture]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\flow.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Part 1: Asgardeo configuration

We begin by establishing the **"Digital Identities"** for our non-human agents. **WSO2 Asgardeo** handles the authentication, issuing secure tokens that define exactly what each agent is allowed to do.

### Step 1: Register an application

1. Log in to the **Asgardeo Console**.
2. Go to **Applications > New Application**.
3. Select **Standard-Based Application**.
4. Configure the application:
   - **Name**: `Enterprise Support System`
   - **Protocol**: OpenID Connect.
   - Tick **Allow AI agents to sign into this application**.
5. In the **Protocol** tab:
   - Add **Allowed grant types**: Password.
   - Enable the **public client** in Client Authentication.
   - Set the **Access Token type** to JWT and add roles to Access Token Attributes.

### Step 2: Create the scopes

1. Navigate to **Resources > API Resources**.
2. Click **+ New API Resources**.
3. Configure the resource:
   - **Identifier**: `https://agenttype` (Doesn't need to be publicly accessible, just an identifier).
   - **Display Name**: `agenttype`.
4. In the **Scopes**, add:
   - `Technical-Specialist`
   - `Support-Coordinator`
5. Click **Next** and **Create**.
6. Go to the `Enterprise Support System` application you created and navigate to the **API Authorization** tab.
7. Click **Authorize API resource**, search for the `agenttype` resource you created, and select all scopes.
8. Click **Finish**.

### Step 3: Create the roles

1. Navigate to **User Management > Roles**.
2. Click **+ New Role**.
3. Configure the role:
   - **Role Name**: `Support-Coordinator`
   - Assign application: `Enterprise Support System`.
   - In **Permission Selection**, select the `agenttype` resource and the `Support-Coordinator` scope.
4. Click **Finish**.
5. Repeat the process for the `Technical-Specialist` role.

### Step 4: Register AI agents

Since these are autonomous agents, we create **"Service Accounts"** for them. **Asgardeo Agent Identity** is a great way to do this.

1. Go to **Agents**.
2. Create the **Coordinator Agent**:
   - **Name**: `coordinator-agent`
   - Make a note of the **Agent ID** and **Agent Secret**.
   - Go to **User Management > Roles** and assign this agent to the `Support-Coordinator` role.
3. Create the **Expert Agent**:
   - **Name**: `expert-agent`
   - Make a note of the **Agent ID** and **Agent Secret**.
   - Go to **User Management > Roles** and assign this agent to the `Technical-Specialist` role.

## Part 2: WSO2 AI Gateway configuration

Now we configure the **AI Gateway**. **WSO2 AI Gateway** will sit in front of the AI models, checking the ID cards (tokens) issued by Asgardeo and routing traffic to the correct model.

### Step 1: Create an AI API Proxy in Bijira

1. Log in to **WSO2 Bijira**.
2. Create a project and then create a new AI API by selecting:
   - **API Proxy → Third Party APIs (Egress) → AI APIs**.
3. After creation, configure it and deploy it to **Development** and **Production Environments**.
   - For a detailed guide, refer to the [Docs-ai-apis](https://wso2.com/bijira/docs/create-api-proxy/third-party-apis/ai-apis/).

![Create_an_AI_API_Proxy]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Create_an_AI_API_Proxy.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

For this tutorial, we create two API proxies using **Azure OpenAI Service API** and deploy them.

- `gpt-4o mini`
- `gpt-5`

![AI_API_Proxy_Overview]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\AI_API_Proxy_Overview.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Make sure you configure them and Deploy both proxies to development and Production Environments.

### Step 2: Add Asgardeo as an external IdP in Bijira

Go to the **Organization level** and in the left navigation menu, click **Admin > Settings**.

![Add_Asgardeo_as_an_external_IdP]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Add_Asgardeo_as_an_external_IdP.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

1. Click the **Application Security** tab and then the **Identity Providers** tab.
2. To add an identity provider, click **+ Identity Provider**.
3. Select **Asgardeo**.
4. In the dialog that opens, specify:

- **Name** and **Description** for the IdP.
- **Well-Known URL**: Paste the well-known URL from your Asgardeo instance.

![Asgardeo_instance_Well-Known_URL]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Asgardeo_instance_Well-Known_URL.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Leave the **Apply to all environments** checkbox selected. This allows you to use the tokens generated via this IdP to invoke APIs across all environments. Then click **Next** and **Add**.

### Step 3: Configure permissions (scopes) policy

Following your deployment in Step 1, we need to restrict access to the specific AI API proxies.

1. Select one API proxy you created.
2. In the left navigation menu, click **Develop > Policy**.
3. In the **API Proxy Contract** view, locate your available resources.
4. For each specific AI resource (e.g., `/chat/completions`):
   - Click the **Edit Resource-Level Policies** icon.

![Configure_Permissions]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Configure_Permissions.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

- Select **Attach Policy** in the **Request Flow** and go to **Permissions (Scopes)**.
- For **OpenAI gpt-4o Proxy**, add the `Support-Coordinator` permission.
- For **OpenAI gpt-5 Proxy**, add the `Technical-Specialist` permission.

![Add_Permissions]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Add_Permissions.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Make sure you select the permissions and save the changes in the policy tab and **redeploy** to apply them.

### Step 4: Configure token-based rate limiting policy

In this step, you will implement Token-Based Rate Limiting. Unlike standard APIs that limit by request count, AI Gateways allow you to control usage based on actual token consumption (input and output), which is essential for managing LLM costs and preventing overload.

In the **Policy** tab, select **Add API-level Policies**.

![Configure_Token-Based_Rate_Limiting]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Configure_Token-Based_Rate_Limiting.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

1. Select **Attach Policy** in the **Request Flow** and go to **Token-Based Rate Limiting**.
2. Configure the fields based on your requirements.

![Add_Token-Based_Rate_Limiting]({{base_path}}\assets\img\tutorials\integrating-asgardeo-with-wso2-ai-gateway-for-agent-identity-aware-access-control\Add_Token-Based_Rate_Limiting.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Save the changes and redeploy to apply them.

After configuring your security and rate-limiting policies, verify that your AI gateway is functioning correctly using the built-in testing tools in the **Bijira Console**.

For a comprehensive list of additional AI Guardrails and to customize your own, refer to the [AI Guardrails documentation](https://wso2.com/bijira/docs/create-api-proxy/third-party-apis/guardrails/).

## Part 3: Trying out the AI Gateway

Once you have successfully completed the configuration steps outlined above, you can try out your AI gateway interactions by cloning this [sample repository](https://github.com/wso2/iam-ai-samples/tree/main/asgardeo-agent-identity-with-ai-gateway).
