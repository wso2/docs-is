# Create an agent in an organization

Organization administrators can register and manage AI agents directly within their organizations, in the same way agents are managed in the root organization. An agent created in an organization is a first-class identity of that organization. It can log in to the organization's applications, be assigned roles of the organization, and act on behalf of the organization's users.

!!! note "Organization agents vs. shared agents"
    An agent created in an organization belongs to that organization only. If you instead want an agent defined in the root organization to operate in organizations lower in the hierarchy, see [share agents with organizations]({{base_path}}/guides/organization-management/share-agents/).

!!! note "Before you begin"

    - Make sure you have created an organization in {{ product_name }} and onboarded an administrator. See how to [create an organization]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) and [onboard admins]({{base_path}}/guides/organization-management/onboard-org-admins/).
    - The steps below are performed in the organization's Console. Learn how to [switch to an organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-to-an-organization).

## Manage agents in an organization

1. On the {{ product_name }} Console, go to **Organizations** and switch to the required organization.

2. In the organization, go to **Agents**.

3. Register, update, deactivate, and delete agents as described in [register and manage agents]({{base_path}}/guides/agentic-ai/ai-agents/register-and-manage-agents/).

Agents created in an organization are visible and manageable only within that organization. They are not shared with the parent organization or with other organizations in the hierarchy.

## Assign roles to organization agents

Organization agents are assigned roles in the same way as agents of the root organization, using the roles available in the organization.

1. In the organization's Console, go to **Roles** and select the role you want to assign to the agent.

2. Go to the **Agents** tab and click **+ Assign Agent**.

3. Select the agents that need the role and click **Save**.

Learn more about the role types available in an organization in [configure roles to consume authorized APIs]({{base_path}}/guides/organization-management/organization-roles/), and about agent permissions in [access control for agents]({{base_path}}/guides/agentic-ai/ai-agents/access-control-for-agents/).

## Authenticate organization agents

An organization agent authenticates with its **Agent ID** and **Agent Secret** against the organization's endpoints, which include the organization ID in the path.

```bash
{{ root_org_url }}/o/<ORG_ID>/oauth2/authorize
{{ root_org_url }}/o/<ORG_ID>/oauth2/token
```

Apart from the endpoint, the flow is the same as the one described in [authenticating AI agents]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/).

### Acting on its own

The agent uses its Agent ID and Agent Secret to obtain an access token from the organization's token endpoint, and uses that token to access resources of the organization. See [AI agent acting on its own]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own).

### Acting on behalf of a user

The agent can act on behalf of a user of the same organization through the On-Behalf-Of (OBO) flow, using the organization's endpoints. The user authenticates and consents in the organization, and the issued token represents both the user and the agent acting on their behalf. See [AI agent acting on behalf of a user]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-behalf-of-a-user).

!!! note
    Acting on behalf of an organization user is supported only when the application uses the root organization issuer. Learn more about [selecting the token issuer]({{base_path}}/guides/organization-management/select-token-issuer-for-organization-apps/) for organization applications.

??? note "What's next?"
    Learn how to [share agents with organizations]({{base_path}}/guides/organization-management/share-agents/) if an agent of the parent organization needs to operate in organizations lower in the hierarchy.
