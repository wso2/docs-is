## Role-based access control

{{ product_name }} enables the creation of well-defined roles, each encapsulating a specific set of permissions tailored to different operational responsibilities. These roles provide a streamlined way to manage access rights by grouping relevant permissions, which administrators can assign to AI agents based on their function within your organization.

For example,

- An AI Customer Support Agent role may include permissions to access customer databases, knowledge bases, and support ticket systems.

- An AI Data Analysis Agent role might include access to data lakes, analytical tools, and reporting dashboards.

This role-based approach simplifies permission management, enhances security, and ensures that agents operate within their designated scope.

### Assign a role to an agent

To assign a role to an AI agent in {{ product_name }},

1. On the {{ product_name }} Console, go to **Roles**.
2. Select the role that you need to assign to the agent.
3. Navigate to **Agents** tab.
4. Click **+ Assign Agent**.
5. Select the Agent/s that you need to assign the role.
6. Click Save.

### View assigned roles of an agent

1. On the {{ product_name }} Console, go to **Agents**.
2. Click on the agent you want to view details.
3. In the **Roles** tab, you can see the roles assigned to the agent.

## Attribute-based access control

{{ product_name }} supports controlling agent authentication to applications through an Attribute-Based Access Control (ABAC) model, providing flexible and dynamic access decisions based on agent attributes. This model aligns with the attribute-driven controls used for user authentication, enabling consistent security policies across all identities.

Using [conditional authentication]({{base_path}}/references/conditional-auth/api-reference/), administrators can define granular access rules for agents authenticating into their applications by evaluating attributes such as:

- Agent role or function
- Department or business unit
- Geographic location or IP range
- Time of day or day of the week
- Device or network context

For example, you can enforce a policy that permits only agents belonging to the “Support” department to access a particular application during standard business hours, enhancing both security and compliance.

### Future enhancements

Looking ahead, {{ product_name }} will expand its capabilities to include comprehensive authorization control for AI agents, enabling fine-grained, attribute-based access control within applications. Planned improvements include,

- Support for hierarchical and multi-dimensional attribute structures

- Policy-Based Access Control (PBAC) that combines composite policies for nuanced authorization decisions

- Enhanced audit and compliance reporting for agent access and actions

These enhancements aim to build a robust, adaptable framework that provides both security and operational flexibility as AI agents become integral parts of enterprise ecosystems.
