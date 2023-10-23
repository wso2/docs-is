# Access Management  / Entitlement Management
Entitlement management is a technology that grants, resolves, enforces,
revokes and administers fine-grained access privileges. The Entitlement Management
component of WSO2 Carbon facilitates the management and control of policies
defined in XACML.

## XACML Policies

At the root of all XACML policies is a **Policy** or a **PolicySet**.

A **Policy** represents a single access control policy, expressed through
a set of rules.

A **PolicySet** is a container that can hold other
Policies or PolicySets, as well as references to policies found in
remote locations.

Each XACML policy document contains exactly one Policy
or PolicySet root XML tag.

WSO2 Identity Server XACML support provides two methods to create a XACML policy.

- [Create a XACML policy from the UI]({{base_path}}/guides/authorization/create-a-policy)

- [Customize a policy template]({{base_path}}/guides/authorization/customize-a-policy-template)


## The Policy Administration Point
The Policy Administration Point (PAP) is the system entity that creates
a policy or a set of policies and manages them. WSO2 Identity Server can act as
a PAP that provides comprehensive support for managing policies.

A XACML policy has a clearly identifiable life cycle inside a PAP.

The following illustration shows the life cycle of a policy within WSO2
Identity Server.

![policy-life-cycle]({{base_path}}/assets/img/guides/policy-life-cycle.png)

1.  Create XACML policies using the provided editors.
2.  Evaluate the policies for expected behavior with sample requests without
    putting the policy into action.
3.  Make necessary amendments to the policies. The
    Identity Server will automatically keep versioning the policy so
    that you can revert to a previous version if necessary.
4.  Once the policies are tested throughly, publish them to the [Policy Decision Point (PDP)](#the-policy-decision-point).
5.  View available policies in PDP and enable them as desired.

## The Policy Decision Point

The Policy Decision Point (PDP) is the system entity that evaluates an
applicable policy and returns an authorization decision. All PDP configurations have been exposed via an API as a web service. The following
diagram shows the components of the PDP.
.

![policy-decision-point]({{base_path}}/assets/img/guides/policy-decision-point.png)

Explore the following topics to learn how to configure the PAP.

- [Create a policy]({{base_path}}/guides/authorization/create-a-policy)

- [Edit a policy]({{base_path}}/guides/authorization/edit-a-policy)

- [Policy version controlling]({{base_path}}/guides/authorization/version-control)

- [Publish a policy]({{base_path}}/guides/authorization/publish-a-policy)

- [View status of a policy]({{base_path}}/guides/authorization/view-status)

- [Enable and Disable a policy]({{base_path}}/guides/authorization/enable-disable-policy)

- [Clear cache]({{base_path}}/guides/authorization/clear-cache)