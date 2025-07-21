Learn how to register new AI agents and manage their identity lifecycle in {{ product_name }} and integrate them securely into the business infrastructure.

## Manage AI agent lifecycle

- Create Agent Identity - Define the agent's basic information, including name, description, and operational context.
- Generate Credentials - Issue authentication credentials such as client ID/secret pairs or private key certificates.
- Assign Roles and Permissions - Configure the agent's access rights, roles, and permitted operations within your organization.
- Integrate and Deploy - Integrate authentication into the agent implementation and deploy the agent with its credentials.
- Set up required security policies, audit and access logs, and validation policies at the resource servers as required.
- Monitor - Monitor its activities through audit logs

## Register an AI agent

Registering a New Agent
To register an AI agent in your {{ product_name }} organization:
On the {{ product_name }} Console, go to Agents.
Click + New Agent.
Enter the following details:
Name: A descriptive name for your AI agent for human-readable display purposes
Description: Purpose and functionality of the agent
Click Register.

Each agent receives a unique Agent ID for identification within the system, along with a secret for authentication. This agent secret is displayed only once, so it must be stored securely for agent deployment. A new secret can be generated for the agent later if needed. Refer Credentials section for more information.

## Updating Agent Information

Maintaining accurate and up-to-date information for your AI agents is crucial for their seamless operation and security. Follow these steps to modify an agent's details:
On the {{ product_name }} Console, go to Agents.
Select your AI agent from the list.
In the General tab, update the attributes of the agents as needed.
Click Update to save your changes.

## Deactivating an Agent

Deactivating an AI agent is a critical security measure that temporarily disables its functionality and revokes its access. This action is often taken when an agent is no longer actively in use or requires a temporary suspension.

1. On the {{ product_name }} Console, go to **Agents**.
2. Click on the AI agent you want to deactivate from the agent list.
3. In the **General** tab, scroll down to the **Danger Zone** section.
4. Turn on the toggle in **Block Agent**.
5. Confirm the action.

    !!! note
    
    Deactivating an AI agent will immediately revoke all its active access tokens, rendering any existing sessions invalid. Furthermore, it prevents the agent from initiating any new authentication attempts, effectively halting its operations until it is reactivated.

## Deleting an Agent

Deleting an AI agent is an irreversible action that permanently removes the agent and all its associated data. This action should be performed with extreme caution, as it cannot be undone.

1. On the {{ product_name }} Console, go to **Agents**.
2. Select your AI agent from the list.
3. Scroll down to the **Danger Zone** section.
4. Click **Delete agent**.
5. Confirm the deletion when prompted.

    !!! warning
    
    Deleting an agent is a permanent and irreversible action. Once an agent is deleted, all its associated credentials, configurations, and audit logs are permanently lost and cannot be recovered. Exercise extreme caution and double-check your selection before proceeding.

## Best Practices

- Apply the principle of least privilege when assigning permissions
- Regularly rotate agent credentials
- Monitor agent activities and set up alerts for anomalous behavior
