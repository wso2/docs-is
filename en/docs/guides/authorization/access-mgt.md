# Access Management  / Entitlement Management

# Configuring the Policy Administration Point

Entitlement management is a technology that grants, resolves, enforces, 
revokes and administers fine-grained access privileges. The Entitlement Management 
component of WSO2 Carbon facilitates the management and control of policies 
defined in XACML.

The Policy Administration Point (PAP) is the system entity that creates
a policy or policy set and manages them. WSO2 Identity Server can act as
a PAP that provides comprehensive support on managing policies.

A XACML policy has a clearly identifiable life cycle inside a PAP.

The following illustration shows the life cycle of a policy within WSO2
Identity Server.

![policy-life-cycle](../assets/img/tutorials/policy-life-cycle.png)

1.  We can create XACML policies using the provided editors.
2.  Once we are satisfied with the policy we have written, we can
    evaluate that for expected behavior with sample requests without
    putting the policy into action in Policy Decision Point (PDP).
3.  Any corrections can be made at this stage. At this point the
    Identity Server will automatically keep versioning the policy so
    that we can go back to a previous version of the policy.
4.  Once above cycle comes to an end with a policy that is throughly
    tested and cater for expected behavior, we can publish it to PDP.
5.  Then we can view the available policies in PDP and enable them as
    desired.

!!! info
	For more information on XACML, see [Access Control and Entitlement
	Management](../../get-started/access-control-and-entitlement-management).

The following topics provide instructions on how to configure the PAP.

# The Policy Decision Point

The Policy Decision Point (PDP) is the system entity that evaluates an
applicable policy and returns an authorization decision. The following
diagram shows the components in the PDP. For more details about PDP
archtecture, [Read
this](../../get-started/access-control-and-entitlement-management)
.

![policy-decision-point](../assets/img/tutorials/policy-decision-point.png)

All PDP configurations have been exposed via this API as a Web service.
The following topics provide instructions on how to configure the PDP,
once the policy is published to PDP by the user.

Related guides:
- [Create a policy](../authorization/create-a-policy.md)
- [Edit a policy](../authorization/edit-a-policy.md)
- [Policy version controlling](../authorization/version-control.md)
- [Publish a policy](../authorization/publish-a-policy.md)
- [View status of a policy](../authorization/view-status.md)
- [Enable and Disable a policy](../authorization/enable-disable-policy.md)
- [Clear cache](../authorization/clear-cache.md)