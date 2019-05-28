# Configuring the Policy Administration Point

The Policy Administration Point (PAP) is the system entity that creates
a policy or policy set and manages them. WSO2 Identity Server can act as
a PAP that provides comprehensive support on managing policies.

A XACML policy has a clearly identifiable life cycle inside a PAP.

Following illustartion shows the life cycle of a policy within WSO2
Identity Server.

![](attachments/103331168/103331169.png){width="700"}

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

The following topics provide instructions on how to configure the PAP.

-   [Creating a XACML Policy](_Creating_a_XACML_Policy_)
-   [Editing a XACML Policy](_Editing_a_XACML_Policy_)
-   [Managing the Version of a XACML
    Policy](_Managing_the_Version_of_a_XACML_Policy_)
-   [Publishing a XACML Policy](_Publishing_a_XACML_Policy_)
-   [Viewing the Status of a XACML
    Policy](_Viewing_the_Status_of_a_XACML_Policy_)
-   [Writing a XACML Policy using a Policy
    Template](_Writing_a_XACML_Policy_using_a_Policy_Template_)

<!-- -->

-   [Evaluating an XACML policy](_Evaluating_a_XACML_Policy_)

For more information on XACML, see [Access Control and Entitlement
Management](https://docs.wso2.com/display/IS540/Access+Control+and+Entitlement+Management)
.
