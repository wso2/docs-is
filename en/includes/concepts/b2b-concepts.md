# B2B setup overview

Learn the core concepts for building B2B applications with {{product_name}}. This guide walks you through organizations, hierarchy, and resource management.

!!! note "What you'll learn"
    How B2B differs from B2C, the organization hierarchy model, resource ownership patterns, inheritance rules, and the distinction between Management and Organization APIs.

---

## ① Understanding B2B vs B2C

Before diving into B2B concepts, understand when you need B2B architecture.

### B2C: Direct user management

![B2C Architecture]({{base_path}}/assets/img/guides/organization/concepts/b2c-architecture.png){: width="300" style="display: block; margin: 0;"}

You manage every user directly. Each user logs in independently.

### B2B: Organization-based management

![B2B Architecture]({{base_path}}/assets/img/guides/organization/concepts/b2b-architecture.png){: width="300" style="display: block; margin: 0;"}

You manage partner organizations. Each organization manages its own users.

### Choose B2B when you:

- Serve multiple business customers
- Need to isolate data per organization
- Want to delegate user management to organization admins
- Support different login flows per organization

!!! example "Real-world example"
    **Slack** is a B2B platform. Each company (workspace) manages its own members, but Slack manages which companies can use the platform.

---

## ② What's an organization?

An **organization** represents one business entity on your B2B platform.

![Organization Components]({{base_path}}/assets/img/guides/organization/concepts/organization-components.png){: width="600" style="display: block; margin: 0;"}

**Each organization has:**

- Its own users and groups
- Custom login pages and branding
- Dedicated administrators
- Isolated data and configurations

!!! tip
    Think of organizations as separate workspaces. Users in "Acme Corp" can't see users in "TechStart Inc."

---

## ③ Organization hierarchy

Organizations form a tree structure with parent-child relationships.

### The hierarchy structure

![Organization Hierarchy]({{base_path}}/assets/img/guides/organization/concepts/organization-hierarchy.png){: height="300" style="display: block; margin: 0;"}

### Root organization

**Your B2B platform** - The top-level organization.

What it does:

- Creates child organizations
- Builds and shares applications
- Sets platform-wide policies
- Manages API resources

!!! example
    If you build "Teamspace" (a project management SaaS), Teamspace is your root organization.

### Child organization

**Your business customers** - Organizations created under the root.

What it does:

- Manages its own users
- Customizes login experience
- Assigns app access to users
- Can create its own child organizations

!!! example
    "Acme Corp" signs up for Teamspace. You create Acme Corp as a child organization.

---

## ④ Ownership vs sharing

Root organizations **own** resources. Child organizations **access** shared resources.

![Ownership vs Sharing]({{base_path}}/assets/img/guides/organization/concepts/ownership-sharing.png){: width="700" style="display: block; margin: 0;"}

### What gets shared

When you share an application with an organization:

✅ Application access  
✅ Application roles  
✅ API permissions  

### What stays isolated

❌ Users (each org has its own)  
❌ User assignments  
❌ Organization settings  

!!! example "Sharing in action"
    You build "Expense Tracker" and share it with both Acme Corp and TechStart Inc.
    
    - **You:** Update features, control who accesses it
    - **Acme Corp:** Assigns Acme employees to roles, customizes their login
    - **TechStart Inc:** Assigns TechStart employees to roles, uses different auth

---

## ⑤ Inheritance model

Understand what child organizations automatically inherit.

![Inheritance Model]({{base_path}}/assets/img/guides/organization/concepts/inheritance-model.png){: width="700" style="display: block; margin: 0;"}

### Inherits automatically

| Resource | What happens |
|----------|--------------|
| **Applications** | Available in child org when shared |
| **Roles** | Copied with same permissions |
| **API scopes** | Same access rules apply |

### Does NOT inherit

| Resource | Why |
|----------|-----|
| **Users** | Each org manages its own |
| **Branding** | Each org customizes independently |
| **Auth flows** | Each org configures separately |

!!! tip "Why this matters"
    **Consistency:** All organizations use the same role structure.  
    **Isolation:** Each organization controls its own users.

---

## ⑥ Organization-managed resources

Child organizations control specific resources within their scope.

### What organizations CAN manage

![Organization-Managed Resources]({{base_path}}/assets/img/guides/organization/concepts/org-managed-resources.png){: width="600" style="display: block; margin: 0;"}

✅ **Users:** Add, update, remove organization users  
✅ **Groups:** Organize users into teams  
✅ **Role assignments:** Grant access to shared apps  
✅ **Branding:** Upload logos, customize login pages  

### What organizations CANNOT manage

❌ Create or modify applications  
❌ Define API resources  
❌ Change role permissions  
❌ Access other organizations' data  

---

## ⑦ Management APIs vs Organization APIs

Two API types serve different purposes.

![Management vs Organization APIs]({{base_path}}/assets/img/guides/organization/concepts/api-types-comparison.png){: width="700" style="display: block; margin: 0;"}

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
| **Scope** | All organizations | Single organization |
| **Access** | Root admins only | Org admins only |
| **Use case** | Platform management | Org user management |

---

## 🎯 Putting it all together

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
