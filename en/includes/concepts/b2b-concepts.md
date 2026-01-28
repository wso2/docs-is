# B2B setup overview

Learn the core concepts for building B2B applications with {{product_name}}. This guide walks you through organizations, hierarchy, and resource management.

!!! tip "What you'll learn"
    Before you start, familiarize yourself with these core B2B terms:

    - **Root organization** - Your B2B platform. You create and manage all business customers from here.
    - **Parent organization** - An organization that creates and manages child organizations below it in the hierarchy.
    - **Child organization** - Business customers or sub-units. They can manage their own resources.
    - **Organization hierarchy** - The tree structure showing parent-child relationships between organizations.
    - **Shared resources** - Resources owned by a parent organization that a child organization can access.
    - **Inherited resources** - Resources automatically available to child organizations from their parents.
    - **Organization-owned resources** - Resources that each organization manages independently.

---

## ① Understanding B2B vs B2C

Before diving into B2B concepts, understand when you need B2B architecture.

| **B2C: Direct user management** | **B2B: Organization-based management** |
|---|---|
| ![B2C Architecture]({{base_path}}/assets/img/guides/organization/concepts/b2c-architecture.png){: width="200" style="display: block; margin: 0;"} | ![B2B Architecture]({{base_path}}/assets/img/guides/organization/concepts/b2b-architecture.png){: width="200" style="display: block; margin: 0;"} |
| You manage every user directly. Each user logs in independently. | You manage partner organizations. Each organization manages its own users. |

### Choose B2B when you [Need to be updated]

- Serve multiple business customers.
- Need to isolate resources per organization.
- Want to delegate user management to organization admins.
- Support different login flows per organization.

!!! example "Real-world example"
    **Slack** is a B2B platform. Each company (workspace) manages its own members, but Slack manages which companies can use the platform.

---

## ② What's an organization?

An **organization** represents one business entity on your B2B platform.

![Organization Components]({{base_path}}/assets/img/guides/organization/concepts/organization-components.png){: width="300" style="display: block; margin: 0;"}

**Each organization has:**

- Its own applications, roles, APIs, and users.
- Custom login pages and branding.
- Dedicated administrators.
- Isolated data and configurations.

---

## ③ Organization hierarchy

Organizations form a tree structure with parent-child relationships.

### The hierarchy structure

![Organization Hierarchy]({{base_path}}/assets/img/guides/organization/concepts/organization-hierarchy.png){: width="600" style="display: block; margin: 0;"}

### Root organization

**Your B2B platform** - The top-level organization.

What it does:

- Creates their own child organizations.
- Builds and shares applications.
- Sets heirarchy-vise policies.

### Parent organization

**Organizations that create sub-organizations** - Any organization within the hierarchy that has children below it.

What it does:

- Creates and manages child organizations.
- Shares resources down the hierarchy.
- Controls access policies for children.

!!! note
    The root organization acts as the top-level parent. Child organizations can also become parents by creating their own children, forming multi-level hierarchies.

### Child organization

**Your business customers** - Organizations created under the root.

What it does:

- Manages its own application, roles, and users.
- Customizes login experience.
- Assigns app access to users.
- Can create its own child organizations.

---

## ④ How resources behave in B2B

Use this table to see resource behavior across the hierarchy.

| Share from parent | Organization can create | Organization inherits |
|---|---|---|
| Applications • Roles (with shared apps) • Users | - Connections (IdPs)<br>- Users<br>- Applications<br>- Groups<br>- Roles<br>- Branding<br>- Templates<br>- Workflows<br>- Userstores<br>- User attributes<br>- Flows<br>- Login and registration customizations<br>- Actions<br>- Adaptive scripts | - API resources<br>- Parent branding (when the organization does not configure branding)<br>- Login and registration settings<br>- Custom claims and OIDC scopes |

---

## ⑤ Management APIs vs Organization APIs

Two API types serve different purposes.

![Management vs Organization APIs]({{base_path}}/assets/img/guides/organization/concepts/api-types-comparison.png){: width="400" style="display: block; margin: 0;"}

### Management APIs

**Who uses them:** Root organization admins

**What they do:**

- Create and delete organizations
- Share apps with organizations
- Configure platform-wide resources

**Example:**
```
POST https://api.example.com/management/v1/organizations
```

### Organization APIs

**Who uses them:** Organization admins

**What they do:**

- Manage organization users
- Assign roles within the organization
- Configure organization settings

**Example:**
```
POST https://api.example.com/o/{org-id}/users
```

### Quick comparison

| Feature | Management API | Organization API |
|---------|----------------|------------------|
| **Access** | Root admins only | Org admins only |
| **Use case** | Platform management | Org user management |

---

## ⑥ Putting it all together [Need to be updated]

Here's how everything connects in a B2B setup:

![B2B Complete Flow]({{base_path}}/assets/img/guides/organization/concepts/b2b-complete-flow.png){: width="800" style="display: block; margin: 0;"}

**The B2B flow:**

1. **You:** Build an app in your root organization
2. **You:** Share it with partner organizations
3. **Partners:** Add their employees as users
4. **Partners:** Assign roles to control access
5. **End users:** Log in through their organization

## Next steps

Ready to build? Start here:

- [Create and manage organizations]({{base_path}}/guides/organization-management/manage-organizations/)
- [Share applications with organizations]({{base_path}}/guides/organization-management/share-applications/)
- [Set up B2B administration]({{base_path}}/guides/organization-management/manage-b2b-administration/)
- [Try a complete B2B use case]({{base_path}}/guides/organization-management/try-a-b2b-use-case/)
