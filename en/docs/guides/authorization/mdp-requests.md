# Working with XACML Multiple Decision Profile Requests

In general, access control scenarios that the Policy Enforcement Point
(PEP) has to handle are complicated and can contain a large number of
attributes in each of the categories. Some of the attributes can have
multiple values, and PEPs may often need to ask multiple access control
questions, which can have overlapping attributes and corresponding
values.

To handle such scenarios, WSO2 Identity Server supports [XACML Multiple
Decision
Profile]({{base_path}}/references/access-control-and-entitlement-management#mdp)
(MDP) requests.

MDP allows you to group multiple decisions as a single response after
evaluating multiple requests. Here, the XACML Policy Decision Point
(PDP) performs policy evaluation and provides an authorization dec ision
response as a single `         <Result>        ` element in the response
context. A Policy Enforcement Point (PEP) can send a single request that
can provide multiple requests to be evaluated by the PDP.

WSO2 Identity Server supports working with XACML MDP requests created
either by repeating attribute categories, or by using hierarchical
resources.

-   If you have a scenario where every access control question needs to
    be obtained by repeating categories in a request, you need to create
    a multiple decision request by repeating attribute categories. For a
    tutorial that walks you through a scenario that requires sending a
    MDP request with repeated attribute categories, see [Working with
    MDP Requests by Repeating Attribute
    Categories]({{base_path}}/learn/working-with-mdp-requests-by-repeating-attribute-categories)
    .
-   If you have a scenario where you need to provide access control to a
    set of hierarchical resources stored in a repository, depending on
    the user attributes or roles, you need to create a multiple decision
    request to authorize the hierarchical resources. For a tutorial that
    walks you through an authorization scenario that requires sending a
    MDP request to authorize the hierarchical resources, see [Working
    with MDP Requests to Authorize Hierarchical
    Resources]({{base_path}}/learn/working-with-mdp-requests-to-authorize-hierarchical-resources)
    .

-   You can also work with XACML MDP requests and responses in JSON format
    using WSO2 Identity Server. For a tutorial that walks you through how to
    work with MDP requests and responses in JSON format using WSO2 Identity
    Server, see [Working with MDP Requests in JSON
    Format]({{base_path}}/learn/working-with-mdp-requests-in-json-format).


- [MDP requests with repeating attribute catergories]({{base_path}}/guides/authorization/mdp-repeating-attr)
- [MDP requests to authorize hierachical resources]({{base_path}}/guides/authorization/mdp-authorize-resources)
- [MDP requests and response - JSON format]({{base_path}}/guides/authorization/mdp-req-and-response)
