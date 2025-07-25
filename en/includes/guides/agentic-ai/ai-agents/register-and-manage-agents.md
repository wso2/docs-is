In today’s rapidly evolving AI-driven environments, effective management of AI agents is essential to ensure security, compliance, and operational efficiency. AI agents act autonomously to perform various tasks, and thus require well-defined lifecycle management from creation to retirement. {{ product_name }} provides a comprehensive framework to help you create, configure, monitor, and securely manage the entire lifecycle of your AI agents.

This guide walks you through key processes involved in managing AI agents, including identity creation, credential issuance, role assignment, deployment, monitoring, and eventual deactivation or deletion. Following these best practices ensures your AI agents operate reliably within your organizational security policies and governance standards.

## AI agent lifecycle Management

- **Create Agent Identity**  

Begin by defining your AI agent’s identity. This includes setting a clear and descriptive name, a detailed description that outlines its purpose, and specifying the operational context such as the environment or systems it will interact with. A well-defined identity helps in tracking and managing agents effectively throughout their lifecycle.

- **Generate Credentials**  

Issue secure authentication credentials necessary for the AI agent to authenticate with your systems. These may include client ID and secret pairs, private key certificates, or other cryptographic credentials. Secure generation and handling of these credentials are critical to prevent unauthorized access.

- **Assign Roles and Permissions**  

Configure granular access controls by assigning appropriate roles and permissions to the agent. This step involves applying the principle of least privilege to ensure the agent only has the minimum access necessary to perform its functions, reducing potential security risks.

- **Integrate and Deploy**  

Integrate the authentication mechanism into the AI agent’s implementation code or runtime environment. Deploy the agent with the issued credentials, ensuring that it can securely authenticate and operate within the designated infrastructure.

- **Set Up Security Policies and Logging**  

Configure required security policies on resource servers that the agent accesses. This includes enforcing validation policies, access control rules, and enabling detailed audit and access logs. These logs provide traceability for agent actions and support compliance audits.

- **Monitor Agent Activities**  

Continuously monitor the agent’s activities through audit logs and monitoring dashboards. Set up alerts for any suspicious or anomalous behavior, enabling rapid detection and mitigation of potential security incidents or operational failures.

### Registering an AI agent

Registering an AI agent is the first step to bring an autonomous system into your {{ product_name }} organization for controlled access and governance.

1. On the {{ product_name }} Console, go to **Agents**.
2. Click **+ New Agent**.
3. Enter the following details:
    - **Name**: A descriptive name for your AI agent for human-readable display purposes
    - **Description** (optional): Purpose and functionality of the agent
4. Click **Create** to complete the registration.

After successful registration, the agent receives a unique Agent ID that acts as its permanent identifier within the system. A secret credential is also issued at this point and is displayed only once. Be sure to store it securely for deployment. If needed, you can generate new credentials later. For detailed information on managing credentials, refer to the [Agent Credentials]({{base_path}}/guides/agentic-ai/ai-agents/agent-credentials/) section.

### Updating agent information

Keeping your AI agent’s information current ensures smooth operation and compliance.

1. On the {{ product_name }} Console, go to **Agents**.
2. Select the AI agent to be updated from the list.
3. In the **General** tab, modify the agent’s attributes such as name, description, etc. as needed.
4. Click **Update** to save your changes.

Regular updates are recommended whenever there is a change in the agent’s role, purpose, or operational environment.

### Deactivating an agent

Deactivation is a vital security control used to temporarily suspend an AI agent’s access and functionality without deleting its data. This can be useful during maintenance windows, incident investigations, or when an agent is no longer needed temporarily.

1. On the {{ product_name }} Console, go to **Agents**.
2. Click on the AI agent you want to deactivate from the agent list.
3. In the **General** tab, scroll down to the **Danger Zone** section.
4. Turn on the toggle in **Block Agent**.
5. Confirm the action.

    !!! warning
        Deactivating an AI agent will immediately revoke all its active access tokens, rendering any existing sessions invalid. Furthermore, it prevents the agent from initiating any new authentication attempts, effectively halting its operations until it's reactivated.

### Deleting an agent

Deleting an AI agent permanently removes the agent and all associated data, including credentials and configurations. This action is irreversible and should only be performed when you are certain that the agent is no longer needed.

1. On the {{ product_name }} Console, go to **Agents**.
2. Select your AI agent from the list.
3. Scroll down to the **Danger Zone** section.
4. Click **Delete agent**.
5. Confirm the deletion when prompted.

## Best practices

- Apply the Principle of Least Privilege

Assign only the minimum permissions necessary for the agent to perform its tasks, limiting potential exposure.

- Regularly Rotate Agent Credentials

Periodically update credentials to reduce the risk of compromise and maintain a robust security posture.

- Monitor Agent Activities

Use audit logs and monitoring tools to continuously track agent actions. Regularly review the logs to identify any suspicious or unauthorized behavior and ensure the agent operates within expected parameters.

- Securely Store Agent Secrets

Treat agent credentials as sensitive information, storing them in secure vaults or secrets managers, never in plain text.

- Review Agent Access Periodically

Conduct regular audits of agent roles and permissions to ensure they remain appropriate as organizational needs evolve.
