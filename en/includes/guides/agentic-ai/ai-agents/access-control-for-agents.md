{{ product_name }} allows for the creation of distinct roles, each with a predefined set of permissions. These roles can then be assigned to AI agents based on their operational responsibilities. For instance, an "AI Customer Support Agent" role might have permissions to access customer databases and knowledge bases, while an "AI Data Analysis Agent" role would have permissions to access data lakes and analytical tools.

### Assigning a role to an agent

1. On the {{ product_name }} Console, go to **Roles**.
2. Select the role that you need to assign to the agent.
3. Navigate to **Agents** tab.
4. Click **+ Assign Agent**.
5. Select the Agent/s that you need to assign the role.
6. Click Save.

### View assigned roles of an Agent

1. On the {{ product_name }} Console, go to **Agents**.
2. Click on the agent you want to view details.
3. In the **Roles** tab, you can see the roles assigned to the agent.

## Attribute Based Access Control (ABAC)

{{ product_name }} currently facilitates the control of agent authentication to applications through an attribute-based access control (ABAC) model, mirroring the capabilities available for user authentication. This is achieved via conditional authentication policies, which allow administrators to define rules based on various attributes associated with an agent, such as their role, department, location, or time of access.

For instance, an organization can configure a policy that only allows agents from the "Support" department to access a specific application during business hours.

Future developments will focus on comprehensive access control for authorization, enabling fine-grained control over agent actions within applications. Enhancements may include hierarchical attribute structures, policy-based access control (PBAC), and real-time attribute evaluation using external data, aiming for a robust and flexible authorization framework.
