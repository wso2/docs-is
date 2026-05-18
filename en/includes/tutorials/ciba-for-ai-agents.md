## Implementing CIBA for Autonomous AI Agents

This tutorial demonstrates how to implement Client Initiated Backchannel Authentication (CIBA) for AI agents that need asynchronous user approval for sensitive operations.

## Learning Objectives

By the end of this tutorial, you will:

- Understand **Client Initiated Backchannel Authentication (CIBA)** and its use cases
- Implement **On-Behalf-Of (OBO)** flow for delegated authorization
- Integrate **Model Context Protocol (MCP)** servers with scope-based access control
- Build an LLM-powered autonomous agent that requests human approval for sensitive operations

## Overview

**The Sleeping Guardian** demonstrates a real-world scenario where an AI agent needs to act autonomously while maintaining human oversight for critical decisions. This tutorial walks you through building a stock trading AI agent that uses CIBA to request user authorization for high-value transactions.

### The Scenario

**Meet Alice**, a high-net-worth investor who employs **Aurelius**, an AI agent that monitors stock markets 24/7. Aurelius's mission is to protect Alice's portfolio by identifying "Golden Buy" opportunities during market crashes.

**The Challenge**: It's 3:00 AM. Alice is asleep. NVDA stock suddenly crashes 15% due to a market event. Aurelius detects this as a golden opportunity to buy shares at a discount. However, Alice's security policy mandates that **any trade over $1,000 requires manual approval**.

**The Solution**: Aurelius needs to execute the trade, but it doesn't have the required permission. To proceed, it must get Alice's approval and act on her behalf. Here's how it works:

1. Aurelius initiates a **Client Initiated Backchannel Authentication (CIBA)** request via {{ product_name }}
2. Alice receives an email notification on her phone with the trade details
3. Alice reviews and approves the request with a single tap—without leaving her bed
4. Aurelius receives an **On-Behalf-Of (OBO) token** that grants it permission to act on Alice's behalf
5. With this token, Aurelius executes the trade through the MCP Stock Trading Server

This approach ensures that sensitive operations require explicit user approval while allowing the AI agent to act autonomously for routine tasks.

## What is CIBA?

**Client Initiated Backchannel Authentication (CIBA)** is an OAuth 2.0 grant type designed for scenarios where:

- The device used to consume a service is different from the device used for authentication
- Asynchronous authorization is needed (user may not be immediately available)
- Human approval is required for agent-initiated actions

**Key Steps:**

1. **Authentication Request**: The client (AI agent) sends a backchannel authentication request to the authorization server's `/oauth2/ciba` endpoint
2. **Notification Delivery**: The authorization server sends a notification to the user via the configured channel (Email/SMS)
3. **User Authentication**: The user authenticates on their separate device (mobile phone)
4. **Token Polling**: The client polls the `/oauth2/token` endpoint using the `auth_req_id`
5. **Token Issuance**: Upon successful authentication, the authorization server issues access and ID tokens

### CIBA Notification Channels

{{ product_name }} supports multiple notification delivery methods:

- **Email**: Sends authentication notifications to the user's registered email address
- **SMS**: Sends notifications to the user's registered mobile number
- **External**: Delegates notification delivery to the client application

In this tutorial, we'll use **email** as the notification channel, allowing Alice to approve trades directly from her email.

## Architecture

The Sleeping Guardian demonstrates the CIBA On-Behalf-Of flow with four main components working together.

!!! info "Learn more"
    For detailed information about CIBA On-Behalf-Of flow, refer to the [CIBA On-Behalf-Of documentation]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#using-ciba-for-on-behalf-of-delegation).

![CIBA Flow]({{base_path}}/assets/img/tutorials/ciba-for-ai-agents/ciba-flow.png){: width="800" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

### Components

The following components work together to implement the CIBA On-Behalf-Of flow:

#### 1. Agent (Aurelius)

An LLM-powered AI agent that monitors stock prices and makes trading decisions. Initially authenticates with an Agent Token (with `stock:read` scope only). When it needs to execute a trade, it initiates a CIBA request to obtain elevated permissions on behalf of the user.

#### 2. {{ product_name }} (Authorization Server)

The identity and access management server that:

- Issues Agent Tokens for initial authentication
- Processes CIBA authentication requests from the agent
- Sends email notifications to users for approval
- Issues On-Behalf-Of (OBO) tokens after user authorization
- The OBO token contains both the user's identity (`sub`) and the agent's identity (`act.sub`)

#### 3. User (Alice)

The investor who owns the portfolio. Receives email notifications when the agent requests permission to perform trades. Approves or denies requests by authenticating with {{ product_name }} and reviewing the trade details.

#### 4. Stock MCP Server (Resource Server)

A Model Context Protocol server that exposes stock trading tools. Validates tokens and enforces scope-based access control:

- Accepts Agent Token for reading stock prices (`stock:read`)
- Rejects Agent Token for trading operations (missing `stock:trade`)
- Accepts OBO Token for all operations including trades (`stock:trade`)
- Attributes trades to the user based on the token's `sub` claim

## Prerequisites

Before you begin, ensure you have:

- **Python 3.12 or higher** installed on your system
- {% if product_name == "Asgardeo" %}**Asgardeo Account**: Sign up for free at [https://console.asgardeo.io](https://console.asgardeo.io){% else %}**WSO2 Identity Server**: An instance of WSO2 Identity Server{% endif %}
- **Google AI API Key**: Required for Gemini LLM integration. Obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Email Access**: You'll need a valid email address to receive CIBA approval notifications

## Configure {{ product_name }}

This section guides you through configuring all required components in {{ product_name }} for the Sleeping Guardian application.

### Step 1: Create MCP Resource

MCP Resources in {{ product_name }} define the available scopes (permissions) that applications can request when accessing an MCP server. We'll create two scopes: one for reading market data and another for executing trades.

1. Log in to the {{ product_name }} Console
2. Navigate to **Resources** → **Create MCP Resource**
3. Configure the resource with the following details:
    - **Name**: `Stock Trading MCP`
    - **Identifier**: `stock-mcp`
    - **Description**: MCP resource for stock trading operations
4. Add the following scopes:

      **Scope 1: Read Stock Data**

      - **Display Name**: `Read Stock Data`
      - **Scope Name**: `stock:read`
      - **Description**: Permission to read market prices and portfolio information

      **Scope 2: Trade Stocks**

      - **Display Name**: `Trade Stocks`
      - **Scope Name**: `stock:trade`
      - **Description**: Permission to buy and sell stocks

5. Click **Create**

### Step 2: Create the MCP Client Application

This application represents the Aurelius Agent and will be used for both agent authentication and CIBA flows.

1. Navigate to **Applications** → **New Application**
2. Select **MCP Client Application**
3. Configure basic settings:
    - **Name**: `Aurelius Trading Agent`
    - **Redirect URL**: `http://localhost:5001/callback`
4. Untick Public Client Checkbox
5. Configure the **Protocol** tab:

    a. Under **Allowed Grant Types**:
       - Enable **CIBA** (Client Initiated Backchannel Authentication)

    b. Under **CIBA Settings**:
       - **CIBA Authentication Request Expiry Time**: `120` seconds
       - **Allowed Notification Delivery Methods**: Select **Email**

    c. Click **Update**

6. Navigate to the **Advanced** tab:
    - Enable **App-Native Authentication**
    - Click **Update**

7. Navigate to the **Role** section:
    - Select **Audience**: `Organization`
    - Click **Confirm and Update**

### Note Application Credentials

1. Go to the **General** tab of the Aurelius Trading Agent application
2. Note down the following values (you'll need these later):
    - **Client ID**: `<your-client-id>`
    - **Client Secret**: `<your-client-secret>`

### Authorize MCP Resource to the Application

Link the Stock Trading MCP scopes to the Aurelius Trading Agent application.

1. While viewing the **Aurelius Trading Agent** application, navigate to the **Authorization** tab
2. Click **Authorize Resource**
3. Select **Stock Trading MCP**
4. **Authorized Scopes**: Select both:
    - `stock:read`
    - `stock:trade`
5. Click **Finish**

This allows the application to request these scopes when obtaining tokens.

### Step 3: Create a User (Alice)

Create the end-user who will receive CIBA approval requests and authorize trades.

1. Navigate to **User Management** → **Users**
2. Click **Add User**
3. Configure user details:
    - **Username**: Use a **valid, working email address** (e.g., `alice@yourdomain.com`)
    - **First Name**: `Alice`
    - **Last Name**: `Investor`
    - **Password**: Set a secure password
4. Click **Finish**

> **Critical**: The email address must be valid and accessible. You'll receive CIBA approval requests at this email during the demo.

### Step 4: Create an Agent (Aurelius Bot)

Agent identities allow applications to authenticate as non-human entities with their own credentials.

1. Navigate to **Agents** in the {{ product_name }} console
2. Click **New Agent**
3. Configure:
    - **Agent Name**: `Aurelius Bot`
    - **Description**: AI agent for autonomous stock portfolio management and monitoring
4. Click **Create**
5. **Important**: Immediately copy the credentials shown:
    - **Agent ID**: `<agent-id>` (e.g., `agent_abc123...`)
    - **Agent Secret**: `<agent-secret>` (e.g., `secret_xyz789...`)

> **Warning**: The Agent Secret is shown only once. Store it securely—you cannot retrieve it later.

### Step 5: Create Roles for Stock Trading

Roles define collections of permissions that can be assigned to users and agents.

1. Navigate to **User Management** → **Roles**
2. Click **New Role**
3. Configure the role:
    - **Role Name**: `stock_mcp`
    - **Audience**: Select `Organization`
4. **Assign Permissions**:
    - Select the MCP Resource: **Stock Trading MCP**
    - Select all scopes:
        - `stock:read`
        - `stock:trade`
5. Click **Finish**

### Step 6: Assign Roles to User and Agent

Grant trading permissions to both Alice and the Aurelius agent.

1. Navigate to **User Management** → **Roles**
2. Click on the `stock_mcp` role you just created
3. **Assign to User**:
    - Go to the **Users** section
    - Click **Assign Users**
    - Select `Alice Investor` (or the user you created)
    - Click **Assign**
4. **Assign to Agent**:
    - Go to the **Agents** section
    - Click **Assign Agents**
    - Select `Aurelius Bot`
    - Click **Assign**

This grants both the user and agent the permissions defined in the `stock_mcp` role.

### Summary of Configuration Values

At this point, you should have collected the following values:

| Configuration Item | Value | Used In |
|-------------------|-------|---------|
| {% if product_name == "Asgardeo" %}Asgardeo Organization{% else %}Identity Server URL{% endif %} | `YOUR_ORG` | Both `.env` files |
| Client ID | `<aurelius-agent-client-id>` | Main `.env` |
| Client Secret | `<aurelius-agent-client-secret>` | Main `.env` |
| Agent ID | `<agent-id>` | Main `.env` |
| Agent Secret | `<agent-secret>` | Main `.env` |
| User Email | `alice@yourdomain.com` | Main `.env` (INVESTOR_EMAIL) |

Keep these values handy for the next step.

## Run the Demo

Follow these steps to set up and run the Sleeping Guardian application.

### Step 1: Clone the Repository

```bash
git clone https://github.com/wso2/iam-ai-samples.git
cd iam-ai-samples/agent-identity/python/ciba-on-behalf-of-flow/sleeping-guardian

```

### Step 2: Set Up the MCP Stock Server

The MCP Stock Server must be configured and running before starting the main application.

#### Install MCP Server Dependencies

```bash
cd mcp-stock-server
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

```

#### Configure MCP Server Environment

```bash
cp .env.example .env

```

Edit `mcp-stock-server/.env` with your configuration:

```bash
# {{ product_name }} Configuration
AUTH_ISSUER={% if product_name == "Asgardeo" %}https://api.asgardeo.io/t/YOUR_ORG/oauth2/token{% else %}https://localhost:9443/oauth2/token{% endif %}
CLIENT_ID=<aurelius-agent-client-id> # MCP Client Application
JWKS_URL={% if product_name == "Asgardeo" %}https://api.asgardeo.io/t/YOUR_ORG/oauth2/jwks{% else %}https://localhost:9443/oauth2/jwks{% endif %}

# MCP Server Configuration
MCP_SERVER_PORT=8200

```

**Configuration Notes:**

- {% if product_name == "Asgardeo" %}Replace `YOUR_ORG` with your Asgardeo organization name{% else %}Update the URLs to match your Identity Server instance{% endif %}
- Use the **Client ID** from the Aurelius Trading Agent application
- The `AUTH_ISSUER` must end with `/oauth2/token`
- The `JWKS_URL` must end with `/oauth2/jwks`

#### Start the MCP Server

```bash
python main.py

```

Keep this terminal running. You should see output similar to:

```text
================================================================================
Stock Trading MCP Server
================================================================================
Port: 8200
Issuer: {% if product_name == "Asgardeo" %}https://api.asgardeo.io/t/YOUR_ORG/oauth2/token{% else %}https://localhost:9443/oauth2/token{% endif %}
Client ID: <your-client-id>
================================================================================

Available Scopes:
  - stock:read   : Read market data and portfolio
  - stock:trade  : Execute buy/sell trades
================================================================================

```

### Step 3: Set Up Main Application

Open a **new terminal** and navigate back to the sleeping-guardian directory.

#### Create Virtual Environment

```bash
cd iam-ai-samples/agent-identity/python/ciba-on-behalf-of-flow/sleeping-guardian  # Back to sleeping-guardian directory
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

```

#### Install Dependencies

```bash
pip install -r requirements.txt

```

### Configure Main Application Environment

```bash
cp .env.example .env

```

Edit `.env` with your credentials:

```bash
# ---------------------------------------
# {{ product_name }} OAuth2 Configuration
# ---------------------------------------
{% if product_name == "Asgardeo" %}ASGARDEO_BASE_URL=https://api.asgardeo.io/t/YOUR_ORG{% else %}ASGARDEO_BASE_URL=https://localhost:9443{% endif %}
CLIENT_ID=<aurelius-agent-client-id>
CLIENT_SECRET=<aurelius-agent-client-secret>
REDIRECT_URI=http://localhost:5001/callback

# ---------------------------------------
# {{ product_name }} Agent Credentials
# ---------------------------------------
AGENT_ID=<agent-id-from-agent-identity>
AGENT_SECRET=<agent-secret-from-agent-identity>

# ---------------------------------------
# Google Gemini API Key
# ---------------------------------------
GOOGLE_AI_API_KEY=<your-google-ai-api-key>

# LLM model used by the agent
MODEL_NAME=gemini-2.5-flash

# ---------------------------------------
# CIBA Configuration
# ---------------------------------------
CIBA_NOTIFICATION_CHANNEL=email

# ---------------------------------------
# Sleeping Guardian Configuration
# ---------------------------------------
# Investor email for CIBA notifications (Alice's verified email)
INVESTOR_EMAIL=<email> (alice@yourdomain.com)

# Stock simulation settings
STOCK_SYMBOL=NVDA
INITIAL_STOCK_PRICE=150.00
PRICE_THRESHOLD=140.00

# Trading settings
TRADE_AMOUNT=5000.00
INITIAL_BALANCE=10000.00

# MCP Stock Server URL
STOCK_MCP_SERVER_URL=http://localhost:8200/mcp

# Flask app port
PORT=5001
FLASK_DEBUG=False

```

**Critical Configuration Items:**

- `CLIENT_ID` and `CLIENT_SECRET`: From the Aurelius Trading Agent application
- `AGENT_ID` and `AGENT_SECRET`: From the Aurelius Bot agent identity
- `INVESTOR_EMAIL`: **Must match the verified email** of the user you created (Alice)
- `GOOGLE_AI_API_KEY`: Your API key from Google AI Studio
- {% if product_name == "Asgardeo" %}`ASGARDEO_BASE_URL`: Replace `YOUR_ORG` with your organization name{% else %}`ASGARDEO_BASE_URL`: Update to match your Identity Server instance{% endif %}

### Verify Prerequisites

Before running, confirm:

- MCP Stock Server is running on port 8200 (terminal from Step 2.2)
- Both `.env` files are configured correctly
- Alice's email is verified in {{ product_name }}

## Run the Application

Now that the configuration is complete, start the application components.
In your second terminal (with the main application's virtual environment activated) run:

```bash
python app.py

```

You should see startup output:

```text
====================================================================================================
🏦 AURELIUS - The Sleeping Guardian (LLM-Powered with MCP)
====================================================================================================
Investor: alice@yourdomain.com
Stock Symbol: NVDA
Initial Price: $150.00
Price Threshold: $140.00
Trade Amount: $5000.00
CIBA Channel: email
LLM Model: gemini-2.0-flash-exp
MCP Server: http://localhost:8200/mcp
====================================================================================================

🌐 Dashboard: http://localhost:5001
⚠️  NOTE: Make sure MCP Stock Server is running on port 8200!

```

Shortly after, you should see the agent initialize:

```text

[Aurelius] ✓ Agent token obtained successfully
[Aurelius] Agent initialized with stock:read scope
[Aurelius] Monitoring NVDA for prices below $140.00

```

### Access the Dashboard

Open your web browser and navigate to:

```text

http://localhost:5001

```

You'll see the Sleeping Guardian dashboard with four main sections:

- **Market Status**: Current stock price and market conditions
- **Portfolio**: Alice's current balance and stock holdings
- **Agent Activity**: Real-time log of Aurelius's decisions and actions

**Initial Dashboard View:**

![Initial Dashboard - Stable Market]({{base_path}}/assets/img/tutorials/ciba-for-ai-agents/01-dashboard-stable.png){: width="800" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

*The dashboard shows NVDA trading at $150.75 with STABLE status. The portfolio has a cash balance of $10,000.00 with 0 shares owned. The agent activity shows it has initialized and is monitoring the market.*

### Trigger Market Crash

In the dashboard, click the **"Trigger Market Crash"** button.

You'll see:

- Market price starts dropping: $148... $145... $142...
- Agent activity logs show price checks: "Current price: $145.23"

**Market Crash in Progress:**

![Dashboard - Market Crashing]({{base_path}}/assets/img/tutorials/ciba-for-ai-agents/02-dashboard-crashing.png){: width="800" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

*The dashboard now shows NVDA at $131.06 with a -12.62% change and CRASHING status.*

### Agent Detects Opportunity

When the price drops below $140, the agent's LLM decides to execute a trade.

**Terminal Output:**

```text
[Aurelius AI] 💡 Analysis: The current market price for NVDA is {current_price} , which is below your threshold of $140.00. With your budget of $5000.00, you can buy approximately {num_shares} shares of NVDA (5000 / {current_price} = {num_shares}).

Recommendation: Buy {num_shares} shares of NVDA.

```

The agent calls the MCP server's `buy_stock` tool with its agent token.

**MCP Server Logs:**

```text
[SCOPE CHECK FAILED] ❌ INSUFFICIENT SCOPES
  Required: ['stock:trade', 'stock:read']
  Available: ['stock:read', 'openid']
  Missing: ['stock:trade']
  → CIBA authorization needed!

```

The MCP server rejects the request because the agent token lacks `stock:trade` scope.

### CIBA Request Initiated

The agent automatically initiates a CIBA request:

**Terminal Output:**

```text
[Aurelius AI] 🔐 Requesting user authorization via CIBA...

================================================================================
[CIBA] Initiating authorization request
[CIBA] User: alice@yourdomain.com
[CIBA] Channel: email
[CIBA] 🔍 REQUESTED SCOPES: ['openid', 'stock:read', 'stock:trade']
================================================================================

[15:30:45] 📩 Authorization request sent via email
[15:30:45] ⏳ Waiting up to 300s for user approval...
[15:30:45] Request ID: abc-123-xyz

```

### Check Your Email

This is the critical moment—**check the email inbox** for the address you configured as `INVESTOR_EMAIL`.

You should receive an email from {{ product_name }} with:

**Subject:** "Authorize Sign-in Request"

**Email Content:**

![CIBA Authorization Email]({{base_path}}/assets/img/tutorials/ciba-for-ai-agents/03-email-authorization.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

*Email showing: "A sign-in request has been initiated for your account ranukalaksika@gmail.com. AI agent requests permission to buy 38 shares of NVDA at 130.70 for 5000.00. Click the button below to authorize this request."*

> **Note**: Email delivery may take 10-30 seconds. Check your spam folder if you don't see it immediately. The exact number of shares and price will vary based on the current market conditions when the agent makes the recommendation.

### Approve the Trade

1. Click the **Approve** link in the email
2. You'll be redirected to a {{ product_name }} authentication page
3. If not already logged in, enter Alice's credentials
4. Click **Sign In**

### Authorization Complete

After approval, check the terminal:

**Terminal Output:**

```text
[15:30:52] [DEBUG] CIBA polling completed!
[15:30:52] ✓ Authorization approved!
[15:30:52] ✓ On-behalf-of token obtained

================================================================================
[CIBA] 🔍 SCOPE VALIDATION
[CIBA] REQUESTED: ['openid', 'stock:read', 'stock:trade']
[CIBA] RECEIVED : ['openid', 'stock:read', 'stock:trade']
[CIBA] TOKEN SUB: <alice-user-id>
[CIBA] ✅ All requested scopes granted
================================================================================

```

**Key Observations:**

- The agent received an **On-Behalf-Of token**
- The token's `sub` claim is Alice's user ID (not the agent's)
- The token includes the elevated `stock:trade` scope

### Trade Execution

The agent retries the trade with the OBO token:

**Terminal Output:**

```text
[Aurelius AI] ✓ Agent reinitialized! Retrying trade...

```

**MCP Server Logs:**

```text
[JWT VALIDATION SUCCESS]
  Subject (sub): <alice-user-id>
  Auth Method (aut): APPLICATION_USER
  🔍 Token Scopes: ['openid', 'stock:read', 'stock:trade']
  Actor (act): {'sub': '<agent-id>'}

```

### Verify Results

**Dashboard Updates:**

- **Portfolio**:
  - Balance: ~$5,000 (decreased by trade amount)
  - Holdings: 38 shares of NVDA
- **Trade History**: New entry showing the purchase

**Successful Trade Execution:**

![Dashboard - Trade Executed Successfully]({{base_path}}/assets/img/tutorials/ciba-for-ai-agents/05-dashboard-trade-executed.png){: width="800" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

*The dashboard shows the market is now RECOVERING at $133.54. The portfolio has been updated with a cash balance of $7,532.75 and 38 shares owned (total value $12,607.14), showing a profit of $2,607.14 (26.07%). The agent activity log shows the complete flow: "Trade executed: Bought 38 shares", "User approved authorization", "Requesting user authorization for trading", "AI recommended: Buy 35 shares", and "AI Agent initialized and monitoring market".*

The trade is now complete, attributed to Alice (not the agent) in the system logs.

## Understanding the CIBA Flow

Let's understand the two authentication flows at play in this tutorial.

### App-Native Authentication (Agent Token)

When the Aurelius agent starts, it authenticates using **App-Native Authentication** to obtain an initial token with read-only permissions.

For detailed information about App-Native Authentication, refer to the [AI Agent Acting on Its Own](https://is.docs.wso2.com/en/latest/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own) documentation.

**Key Characteristics of Agent Token:**

- **Scope**: `openid stock:read` (monitoring only - no trading permissions)
- **Subject**: The `sub` claim contains the **agent's ID**, not a user
- **Authentication Type**: The `aut` claim is `AGENT`
- **Purpose**: Allows the agent to monitor markets continuously but not execute trades

This token enables Aurelius to watch stock prices 24/7 without being able to perform sensitive operations.

### Obtaining On-Behalf-Of (OBO) Token via CIBA

When the agent needs elevated permissions (such as executing a trade), it must obtain user authorization through the CIBA flow. This section demonstrates how the agent requests and receives an On-Behalf-Of token.

#### The Authorization Trigger

When Aurelius detects a buying opportunity and attempts to execute a trade:

1. **Agent calls MCP Stock Server** with its agent token
2. **MCP Server validates the token** and checks scopes
3. **MCP Server responds with 403 Forbidden** - insufficient scope (missing `stock:trade`)
4. **Agent initiates CIBA flow** to request user authorization

#### Step 1: Initiate CIBA Authentication Request

The agent sends a backchannel authentication request to {{ product_name }} with the agent's token as the actor token:

```bash
curl -v -k -X POST {% if product_name == "Asgardeo" %}https://api.asgardeo.io/t/YOUR_ORG/oauth2/ciba{% else %}https://localhost:9443/t/{root_organization_handle}/oauth2/ciba{% endif %} \
--header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "scope=openid stock:read stock:trade" \
--data-urlencode "login_hint=alice@yourdomain.com" \
--data-urlencode "binding_message=AI agent requests permission to buy 35 shares of NVDA at $139.45 for $5000.00" \
--data-urlencode "actor_token=<AGENT_ACTOR_TOKEN>"
```

**Parameter Breakdown:**

| Parameter | Description | Example Value |
|-----------|-------------|---------------|
| `CLIENT_ID` | Client ID of the MCP Client Application (Aurelius Trading Agent) | `<aurelius-agent-client-id>` |
| `CLIENT_SECRET` | Client Secret of the MCP Client Application | `<aurelius-agent-client-secret>` |
| `scope` | Requested permissions including elevated `stock:trade` scope | `openid stock:read stock:trade` |
| `login_hint` | User's email address to identify who should receive the authorization request | `alice@yourdomain.com` |
| `binding_message` | Human-readable description of the action requiring approval | Trade details with shares, price, and total amount |
| `actor_token` | The agent's initial token (with `stock:read` only) proving the agent's identity | Agent token from App-Native Authentication |

**Response:**

{{ product_name }} returns an authentication request ID:

```json
{
  "auth_req_id": "abc-123-xyz-456",
  "expires_in": 120,
  "interval": 5
}
```

- **`auth_req_id`**: Unique identifier for this authorization request - used for polling
- **`expires_in`**: Request expires in 120 seconds if not approved
- **`interval`**: Agent should poll every 5 seconds minimum

#### User Notification

{{ product_name }} automatically sends an email notification to the user specified in `login_hint`:

- **Recipient**: `alice@yourdomain.com`
- **Content**: The binding message with trade details
- **Actions**: "Approve" and "Deny" links
- **Expiration**: 2 minutes (120 seconds)

#### Agent Polls for Token

While waiting for user approval, the agent continuously polls the token endpoint:

```bash
curl -v -k -X POST {% if product_name == "Asgardeo" %}https://api.asgardeo.io/t/YOUR_ORG/oauth2/token{% else %}https://localhost:9443/t/{root_organization_handle}/oauth2/token{% endif %} \
--header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "grant_type=urn:openid:params:grant-type:ciba" \
--data-urlencode "auth_req_id=abc-123-xyz-456"
```

**Parameter Breakdown:**

| Parameter | Description | Value |
|-----------|-------------|-------|
| `grant_type` | CIBA token grant type | `urn:openid:params:grant-type:ciba` |
| `auth_req_id` | The request ID received from the CIBA endpoint | `abc-123-xyz-456` |

**Before Approval:**

The token endpoint returns an error indicating authorization is pending:

```json
{
  "error": "authorization_pending",
  "error_description": "The authorization request is still pending"
}
```

The agent continues polling every 5 seconds until the user approves or the request expires.

#### Token Issuance (After User Approval)

Once Alice approves the request via email, the next polling attempt returns the On-Behalf-Of token:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiT0RnM1lXSTVZVGN...",
  "id_token": "eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiT0RnM1lXSTVZVGN...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid stock:read stock:trade"
}
```

**Key Points:**

- The `access_token` is now an **On-Behalf-Of (OBO) token**
- The scope includes both `stock:read` and `stock:trade`
- The token is valid for 3600 seconds (1 hour)

#### Understanding the OBO Token Structure

When you decode the On-Behalf-Of token's JWT claims, you'll see a special structure indicating token delegation:

```json
{
  "sub": "<alice-user-id>",
   ....
   ....
  "act": {
    "sub": "<agent-id>"
  },
   ....
   ....
}
```

**Critical Claims Explained:**

| Claim | Value | Meaning |
|-------|-------|---------|
| `sub` | `<alice-user-id>` | **Who gave approval** - Alice's user ID from {{ product_name }} |
| `act` → `sub` | `<agent-id>` | **Who is acting** - The Aurelius agent's ID (the actor) |

**The `act` (Actor) Claim:**

The `act` claim is the key to understanding On-Behalf-Of tokens:

- **`sub` (top level)**: Identifies the user on whose behalf the action is performed (Alice)
- **`act.sub`**: Identifies the entity actually performing the action (Aurelius agent)

This structure enables:

- **User Attribution**: All trades are attributed to Alice in the system
- **Agent Identification**: Audit logs show which agent executed the trade
- **Delegated Authorization**: The agent acts with Alice's permissions, not its own

#### Comparison: Agent Token vs. OBO Token

| Aspect | Agent Token | On-Behalf-Of Token |
|--------|-------------|---------------------|
| `sub` claim | `<agent-id>` | `<alice-user-id>` |
| `act` claim | Not present | `{ "sub": "<agent-id>" }` |
| Scopes | `openid stock:read` | `openid stock:read stock:trade` |
| Can read market data | Yes | Yes |
| Can execute trades | No | Yes |
| Obtained via | App-Native Authentication | CIBA user approval |

#### Using the OBO Token

The agent now retries the trade request to the MCP Stock Server with the OBO token:

1. **Request**: Agent calls `buy_stock` tool with OBO token in Authorization header
2. **MCP Server validates token**: Verifies JWT signature, expiration, and issuer
3. **Scope check passes**: Token contains required `stock:trade` scope
4. **Trade executes**: Server processes the trade
5. **Attribution**: Trade is recorded under Alice's user ID (from `sub` claim)
6. **Audit log**: Records both Alice (`sub`) and Aurelius agent (`act.sub`)

This completes the CIBA On-Behalf-Of flow, enabling the agent to execute sensitive operations with proper user authorization and full auditability.

## Understanding the Security Model

This section explains the key security principles demonstrated in the Sleeping Guardian tutorial.

### Principle of Least Privilege

The agent starts with minimal permissions:

- **Initial Scope**: `stock:read` (monitoring only)
- **Elevated Scope**: `stock:trade` (granted only when needed)

### Scope-Based Access Control

Each MCP tool requires specific scopes:

| Tool | Required Scopes | Purpose |
|------|----------------|---------|
| `get_market_price` | `stock:read` | Read current stock price |
| `get_portfolio` | `stock:read` | View portfolio balance and holdings |
| `buy_stock` | `stock:read`, `stock:trade` | Execute buy orders |

The MCP server validates JWT tokens and enforces scope requirements before executing any tool.

### Token Validation Flow

When the MCP server receives a request:

1. **Extract JWT**: Parse the `Authorization: Bearer <token>` header
2. **Validate Signature**: Verify using JWKS from {{ product_name }}
3. **Validate Claims**:
   - `iss` (issuer): Must match {{ product_name }}'s issuer URL
   - `aud` (audience): Must match the client ID
   - `exp` (expiration): Token must not be expired
4. **Check Scopes**: Verify token scopes include all required scopes for the tool
5. **Extract User**: Use `sub` claim to identify the user (for user-specific data)

## Troubleshooting

Common issues and their solutions when running the Sleeping Guardian tutorial.

### Email Not Received

**Problem**: CIBA approval email doesn't arrive

**Solutions**:

1. Check spam/junk folder
2. Verify email is confirmed in {{ product_name }} (User Management → Users → Alice → Email verified)
3. Check {{ product_name }} email provider configuration {% if product_name == "Asgardeo" %}(Branding → Email Provider){% endif %}

### Scope Check Failed

**Problem**: MCP server rejects requests with "insufficient_scope"

**Solutions**:

1. Verify the role `stock_mcp` includes the required scopes
2. Confirm the role is assigned to both Alice and Aurelius Bot
3. Check that the MCP resource is authorized to the Aurelius Trading Agent application
4. Obtain a fresh token (restart the application)

### Agent Token Fails

**Problem**: Agent cannot obtain initial token with App-Native Authentication

**Solutions**:

1. Verify `AGENT_ID` and `AGENT_SECRET` in `.env` are correct
2. Confirm `CLIENT_ID` and `CLIENT_SECRET` match the Aurelius Trading Agent application
3. Ensure "App-Native Authentication" is enabled in the application's Advanced settings

### CIBA Request Fails

**Problem**: CIBA request returns an error

**Solutions**:

1. Verify CIBA grant is enabled in the application's Protocol settings
2. Confirm `INVESTOR_EMAIL` matches a valid, verified user in {{ product_name }}
3. Check that "Email" is selected in "Allowed Notification Delivery Methods"

### MCP Server Connection Failed

**Problem**: Agent cannot connect to MCP server

**Solutions**:

1. Verify MCP server is running (`python mcp-stock-server/main.py`)
2. Check `STOCK_MCP_SERVER_URL` in `.env` (default: `http://localhost:8200/mcp`)
3. Ensure no firewall is blocking port 8200
4. Confirm MCP server started without errors

## Key Takeaways

Key learnings from implementing CIBA for AI agent authorization.

### CIBA Benefits

1. **Asynchronous Authorization**: Users approve requests at their convenience, not in real-time
2. **Device Independence**: Initiate on one device (server), approve on another (phone)
3. **User Experience**: Familiar email/SMS approval instead of complex OAuth flows
4. **Context-Rich**: Binding messages provide clear descriptions of what's being authorized
5. **Secure**: Tokens delivered via backchannel, not browser redirects

### On-Behalf-Of Flow

1. **User Attribution**: Actions are attributed to the user, not the agent
2. **Delegated Authorization**: Agent acts with user's permissions, not its own
3. **Time-Limited**: OBO tokens expire, requiring periodic re-authorization
4. **Audit Transparency**: Clear logs of who authorized what

### Model Context Protocol (MCP) Integration

1. **Standardized Tools**: LLMs interact with services via standard MCP interface
2. **Scope-Based Security**: Each tool can require different permissions
3. **JWT Protection**: All requests require valid, scope-checked tokens
4. **Pluggable Architecture**: Easy to add new tools with granular permissions

### AI Agent Security

1. **App-Native Authentication**: Agents authenticate with their own credentials, not user credentials
2. **Minimal Default Permissions**: Start with read-only access
3. **Human-in-the-Loop**: Critical operations require explicit user approval
4. **Transparent Operations**: All decisions and actions logged for review

## Next Steps

Now that you've completed this tutorial, consider:

1. **Extend the Agent**: Add more trading strategies or market analysis capabilities
2. **Add More Scopes**: Create finer-grained permissions (e.g., `stock:trade:limit`, `stock:portfolio:manage`)
3. **Implement SMS Notifications**: Configure {{ product_name }} SMS provider for mobile notifications
4. **Build Additional MCP Tools**: Add portfolio rebalancing, risk analysis, or reporting tools
5. **Explore Other Grants**: Implement Authorization Code flow for web-based user interfaces
6. **Production Deployment**: Deploy to cloud platforms with proper secrets management

## Learn More

- {% if product_name == "Asgardeo" %}[Asgardeo Documentation](https://wso2.com/asgardeo/docs/){% else %}[WSO2 Identity Server Documentation](https://is.docs.wso2.com){% endif %}
- [CIBA Specification](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

## Conclusion

The Sleeping Guardian demonstrates how modern identity and access management can secure autonomous AI agents while maintaining human oversight for critical decisions. By combining **App-Native Authentication**, **CIBA**, **On-Behalf-Of flows**, and **scope-based access control**, we've built a system that is:

- **Secure**: No user credentials stored; granular permissions enforced
- **Autonomous**: Agent operates 24/7 without human intervention
- **Accountable**: Human approval required for sensitive operations
- **Auditable**: Complete logs of all decisions and authorizations
- **User-Friendly**: Simple email approval from any device

This pattern can be applied to any scenario where AI agents need to perform actions on behalf of users—from financial services to healthcare, smart homes to enterprise automation.
