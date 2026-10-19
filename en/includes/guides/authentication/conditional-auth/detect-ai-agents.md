# Detect AI agents in login flows

AI agents can sign in to applications on behalf of users, either by driving a browser or by calling endpoints directly. {{ product_name }} lets you detect these requests with a conditional authentication script and then block them or require a human to complete the sign-in.

{{ product_name }} provides two built-in conditional authentication templates in the **AI Agents** category of the script editor.

<table>
    <thead>
        <tr>
            <th>Template</th>
            <th>Behavior</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>AI Agent Blocking</b></td>
            <td>Denies the sign-in when an AI agent is detected. Otherwise, the application's login steps run as usual.</td>
        </tr>
        <tr>
            <td><b>AI Agent Human-in-the-Loop</b></td>
            <td>Runs the first login step, which an agent may complete, and then requires a human-only verification step when an AI agent is detected.</td>
        </tr>
    </tbody>
</table>

Both templates detect agents that identify themselves with [Web Bot Auth](#web-bot-auth). To detect other agents, extend the `detectAgent()` function with the [methods below](#ways-to-identify-ai-agents).

## Prerequisites

- You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- Make sure your load balancers and proxies forward the Web Bot Auth headers (`Signature`, `Signature-Input` and `Signature-Agent`) to {{ product_name }}.

- To use the **AI Agent Human-in-the-Loop** template, users must be able to complete the [human-only verification step](#choose-a-human-only-verification-step), for example with a registered passkey.

## Apply a template

1. On the {{ product_name }} Console, click **Applications**.

2. Select the relevant application and go to its **Login Flow** tab.

3. Add the template using your preferred editor:

    {% if product_name == "WSO2 Identity Platform" %}
    === "Classic Editor"
        1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

        2. Turn on **Conditional Authentication** by switching the toggle on.

        3. Select the **AI Agents > AI Agent Blocking** or **AI Agents > AI Agent Human-in-the-Loop** template.

    === "Visual Editor"
        1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **AI Agents**.

        2. Click **+ ADD** next to **AI Agent Blocking** or **AI Agent Human-in-the-Loop**.

        3. Click **Confirm** to replace any existing script with the selected predefined script.
    {% else %}
    1. Go to **Predefined Flows** > **Conditional Login Flows**.

    2. Click **AI Agents** > **AI Agent Blocking** or **AI Agent Human-in-the-Loop** > **ADD** to add the script.

    3. Click **Confirm** to replace any existing script with the selected predefined script.
    {% endif %}

{{asgardeo_auth_script_warning}}

4. Extend `detectAgent()` if needed, and click **Update** to confirm.

## How it works

Both templates call `detectAgent(context)` in `onLoginRequest`. The default `detectAgent()` returns `true` when the request has a `Signature-Agent` header, or a `Signature-Input` header that contains `web-bot-auth`:

```js
var detectAgent = function (context) {
    // Header names are lower-case.
    var headers = context.request.headers;
    var signatureInput = String(headers['signature-input'] || '');
    return !!headers['signature-agent'] || signatureInput.indexOf('web-bot-auth') >= 0;
};
```

**AI Agent Blocking** denies the sign-in with the message in the `errorMessage` parameter. For API-based (app-native) requests, the template fails the flow instead of showing an error page.

**AI Agent Human-in-the-Loop** runs step 1 for every user. When an AI agent is detected, it then runs step 2, so the sign-in can't continue until a human completes it.

### Choose a human-only verification step

Step 1 is your application's usual sign-in, and an agent may complete it. Step 2 must be a factor that only the user can complete, on their own device or with biometrics. The template uses a passkey by default.

<table>
    <thead>
        <tr>
            <th>Step 2 option</th>
            <th>Suitability</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="{{base_path}}/guides/authentication/mfa/add-push-auth-login/">Push notification</a></td>
            <td>Recommended. The user approves the sign-in on their own mobile device, wherever the agent runs.</td>
        </tr>
        <tr>
            <td><a href="{{base_path}}/guides/authentication/mfa/add-passkey-login/">Passkey</a></td>
            <td>Recommended. The user verifies with biometrics or a device PIN on their own device.</td>
        </tr>
        <tr>
            <td>TOTP, email OTP or SMS OTP</td>
            <td>Not recommended. An agent with access to the user's authenticator, mailbox or messages can complete it.</td>
        </tr>
    </tbody>
</table>

!!! warning
    Don't enable progressive enrollment for the step 2 factor in this flow. An agent that holds the user's password could enroll its own device.

!!! note
    Find out more about the scripting language in the [Conditional Authentication API Reference]({{base_path}}/references/conditional-auth/api-reference/).

## Ways to identify AI agents

No single signal identifies every AI agent. Add the checks that fit your application inside `detectAgent()`, above the final `return` statement. Header names in `context.request.headers` are lower-case.

### Web Bot Auth

**Recommended. Built into both templates.**

Web Bot Auth uses HTTP Message Signatures ([IETF draft-ietf-webbotauth-httpsig-protocol](https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/)) so that an agent can prove who it is. A signed agent sends the `Signature`, `Signature-Input` (with `tag="web-bot-auth"`) and `Signature-Agent` headers, and publishes its public keys at `<origin>/.well-known/http-message-signatures-directory`.

Declaring itself as an agent is enough to deny a request or require a step-up. It doesn't prove identity, because any client can send these headers. Authentication scripts can't verify HTTP signatures, so verify them at the edge (your WAF, CDN or reverse proxy) before you trust or allow-list an agent. Configure the edge to verify the signature against the signer's key directory, add a trusted header such as `x-verified-agent`, and strip that header from all incoming client requests. The script then reads the trusted header:

```js
// Add near the other top-level variables.
var trustedAgents = ['https://agent.example.com'];

// Add inside detectAgent(), above the declared-agent check.
var verifiedAgent = context.request.headers['x-verified-agent'];
if (verifiedAgent) {
    // A verified agent is an agent, unless you trust it explicitly.
    return trustedAgents.indexOf(String(verifiedAgent)) < 0;
}
```

### User agent markers

Known agents and browser automation tools often put a marker in the `User-Agent` header.

```js
// Add near the other top-level variables.
var agentUserAgents = ['HeadlessChrome', 'ChatGPT', 'Claude', 'Google-Agent', 'Perplexity', 'Playwright', 'Puppeteer', 'Selenium'];

// Add inside detectAgent().
var userAgent = String(context.request.headers['user-agent'] || '');
for (var i = 0; i < agentUserAgents.length; i++) {
    if (userAgent.indexOf(agentUserAgents[i]) >= 0) {
        return true;
    }
}
```

!!! warning
    Clients can set any `User-Agent` value, so this check is easy to spoof. Prefer [Web Bot Auth](#web-bot-auth) for agents that sign their requests.

### Agent provider IP ranges

Some AI agent providers publish the IP ranges their agents use. Get the current lists from each provider's documentation, and match `context.request.ip` against them. Copy the `convertIpToLong`, `getIpAddrInLong` and `isCorporateIP` functions from the built-in [IP-Based template]({{base_path}}/guides/authentication/conditional-auth/ip-based-template/) into your script.

```js
// Add near the other top-level variables. Replace with the ranges published by the providers.
var agentIpRanges = ['203.0.113.0/24', '198.51.100.0/24'];

// Add inside detectAgent().
if (isCorporateIP(context.request.ip, agentIpRanges)) {
    return true;
}
```

!!! note
    The helper functions handle IPv4 only. `context.request.ip` honors the `X-Forwarded-For` header, so configure your load balancer to overwrite this header with the real client address.

## Limitations

- Request signals such as headers and IP addresses can be spoofed. Verify cryptographic signals at the edge.

- Agents that operate the user's own browser send normal browser headers and can't be told apart from the user by request signals.
