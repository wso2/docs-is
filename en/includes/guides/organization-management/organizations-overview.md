# Organizations overview

Learn the core concepts for managing organizations with {{product_name}}. This guide walks you through organizations, hierarchy, and resource management.

!!! tip "What you'll learn"
    Before you start, familiarize yourself with these core organization terms:

    - **Root organization** - The top-level organization. You create and manage all organizations from here.
    - **Parent organization** - An organization that creates and manages child organizations below it in the hierarchy.
    - **Child organization** - Organizations or sub-units. They can manage their own resources and have an immediate parent above them.
    - **Shared resources** - Resources owned by a parent organization that a child organization can access.
    - **Inherited resources** - Resources automatically available to child organizations from their immediate parent.
    - **Organization-owned resources** - Resources that each organization manages independently.

---

## ① What's an organization?

An **organization** represents one entity in your system.

Each organization has its own applications, roles, APIs, and users. Organizations can customize login pages, branding, and have dedicated administrators with isolated data and configurations.

![Organization Components]({{base_path}}/assets/img/guides/organization/organizations-overview/organization-components.png){: width="600" style="display: block; margin: 0;"}

---

## ② Organization hierarchy

Organizations form a tree structure with parent-child relationships.

### The hierarchy structure

![Organization Hierarchy]({{base_path}}/assets/img/guides/organization/organizations-overview/organization-hierarchy.png){: width="600" style="display: block; margin: 0;"}

### Root organization

**The top-level organization** - This is where you start.

What it does:

- Creates their own child organizations.
- Builds and shares applications.
- Sets hierarchy-vise policies.

### Parent organization

**Organizations that create child organizations** - Any organization within the hierarchy that has children below it.

What it does:

- Creates and manages child organizations.
- Shares resources down the hierarchy.
- Controls access policies for children.

!!! note
    The root organization acts as the top-level parent. Child organizations can also become parents by creating their own children, forming multi-level hierarchies.

### Child organization

**Organizations created under a parent** - Each child has one **immediate parent** in the hierarchy.

What it does:

- Manages its own applications, roles, and users.
- Customizes login experience.
- Assigns roles to users.
- Can create its own child organizations.

---

## ③ Resource behavior across the hierarchy

Use this table to see resource behavior across the hierarchy.

| | Share from parent | Organization can create | Organization inherits |
|---|---|---|---|
| **Definition** | Resources a parent explicitly shares with child organizations. | Resources an organization creates and manages on its own. | Resources automatically available from the immediate parent. |
| **Resources** | Applications, Roles (with shared apps), Users | Connections (IdPs), Users, Applications, Groups, Roles, Branding, Templates, Workflows, Userstores, User attributes, Flows, Login and registration customizations, Actions, Adaptive scripts | API resources, Parent branding (when the organization doesn't configure branding), Login and registration settings, Custom claims and OIDC scopes |

---

## ④ Management APIs vs Organization APIs

Two API types serve different purposes.

![Management vs Organization APIs]({{base_path}}/assets/img/guides/organization/organizations-overview/api-types-comparison.png){: width="400" style="display: block; margin: 0;"}

### Management APIs

**Who uses them:** Root organization admins

**What they do:**

- Create and delete organizations
- Share apps with organizations
- Configure hierarchy-wide resources

**Example:**

```http
POST https://api.example.com/management/v1/organizations
```

### Organization APIs

**Who uses them:** Organization admins

**What they do:**

- Manage organization users
- Assign roles within the organization
- Configure organization settings

**Example:**

```http
POST https://api.example.com/o/{org-id}/users
```

### Quick comparison

| Feature | Management API | Organization API |
|---------|----------------|------------------|
| **Access** | Root admins only | Org admins only |
| **Use case** | Platform management | Org user management |

---

## ⑤ Putting it all together

Here's how everything connects with organizations:

![B2B Complete Flow]({{base_path}}/assets/img/guides/organization/organizations-overview/b2b-complete-flow.png){: width="800" style="display: block; margin: 0;"}

**The organization flow:**

1. **You:** Build an app in your root organization
2. **You:** Share it with child organizations
3. **Organizations:** Add their users
4. **Organizations:** Assign roles to control access
5. **End users:** Log in through their organization

## Next steps

Ready to build? Start here:

- [Create and manage organizations]({{base_path}}/guides/organization-management/manage-organizations/)
- [Share applications with organizations]({{base_path}}/guides/organization-management/share-applications/)
- [Set up organization administration]({{base_path}}/guides/organization-management/manage-b2b-administration/)
- [Try a complete organization use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/)
