# Introduction to XACML 2.0 Policies

This page guides you through writing XACML policies for WSO2 Identity
Server.

!!! note "Before you begin"
    
    If you are a beginner, follow the documentation given below to gain a better 
    understanding of XACML architecture, XACML language, and syntax before you start writing XACML policies. 
    
    -   [Why we need XACML and the XACML
        architecture](../../get-started/access-control-and-entitlement-management#why-xacml)
    -   [XACML Policy language and
        Syntax](../../get-started/access-control-and-entitlement-management#xacml-policy-language-structure-and-syntax)
  

A policy has an identifier, a rule-combining algorithm, a description, a
target, and a set of rules.

``` xml
<Policy PolicyId="urn:sample:xacml:2.0:samplepolicy" 
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" 
xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os">

  <Description>Sample XACML Authorization Policy.</Description>

  <Target>...</Target>

  <Rule>...</Rule>

</Policy>
```

A policy may contain multiple "Rules" - each of which may evaluate to
different access control decisions. XACML needs some way of reconciling
the decisions each rule makes.

This reconciliation is achieved through a collection of "Combining
Algorithms."

Each algorithm represents a different way of combining multiple
decisions that are evaluated through different rules, into a single decision.

The following rule-combining algorithms are defined in XACML 2.0.

``` xml
urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:deny-overrides
urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:permit-overrides
urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable
urn:oasis:names:tc:xacml:1.1:rule-combining-algorithm:ordered-denyoverrides
urn:oasis:names:tc:xacml:1.1:rule-combining-algorithm:ordered-permitoverrides
```

When
`         urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable        `
is the rule-combining algorithm, it will pick the first applicable rule
from the defined set of Rules.

Once a XACML request is received at the PDP, it needs to find a policy
that applies to the corresponding request.

To do this, XACML uses the element `         Target        ` .

A `         Target        ` is a set of simplified conditions for the
`         Subject        `, `         Resource,        ` and
`         Action        ` which must be met for a
`         Policy        ` or `         Rule        ` to apply to a given
request.

Once a `         Target        ` is directly defined under the
`         Policy        ` element, it defines the set of conditions that
must be met to pick that `         Policy        ` .

``` xml
<Policy PolicyId="urn:sample:xacml:2.0:samplepolicy" 
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" 
xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os">

  <Description>Sample XACML Authorization Policy.</Description>

  <Target>

    <Subjects>...</Subjects>
    <Resources>...</Resources>
    <Actions>...</Actions>

  </Target>

  <Rule>...</Rule>

</Policy>
```

Study the examples given below.

### Scenario one

A policy will be picked for a request having any
`         Subject        `, `         Action,        ` or
`         Resource:        `
`                   http://localhost:8280/services/echo/                 `
.

``` xml
<Policy PolicyId="urn:sample:xacml:2.0:samplepolicy" 
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" 
xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os">

  <Description>Sample XACML Authorization Policy.</Description>

  <Target>

    <Subjects> <AnySubject/> </Subjects>

    <Resources>
      <Resource>
        <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/</AttributeValue>
        <ResourceAttributeDesignator
          AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
          DataType="http://www.w3.org/2001/XMLSchema#string"/>
        </ResourceMatch>
      </Resource>
    </Resources>

    <Actions> <AnyAction/> </Actions>

  </Target>

  <Rule>...</Rule>

</Policy>
```

For now, let's not worry too much about the
`         <Resources/>        ` element.

------------------------------------------------------------------------

### Scenario two

Here, the `         Target        ` is applied to the
`         Rule        `, not to the entire `         Policy        ` .

``` xml
<Policy PolicyId="urn:sample:xacml:2.0:samplepolicy" 
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" 
xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os">

  <Description>Sample XACML Authorization Policy.</Description>

  <Rule Effect="Permit" RuleId="primary-access-rule">

    <Target>

      <Subjects> <AnySubject/> </Subjects>

      <Resources>
        <Resource>
          <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
          <AttributeValue
            DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/</AttributeValue>
          <ResourceAttributeDesignator
            AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
            DataType="http://www.w3.org/2001/XMLSchema#string"/>
          </ResourceMatch>
        </Resource>
      </Resources>

      <Actions> <AnyAction/> </Actions>

    </Target>

  </Rule>

</Policy>
```

------------------------------------------------------------------------

##### The "Rule" element

Let's move on to the `         <Rule/>        ` element. There can be
multiple `         Rule        ` elements per any given
`         Policy        ` .

The way that the Sun XACML engine determines whether a rule is
applicable to an incoming request is by evaluating the
`         Target        ` and the optional `         Condition        `
(if it exists).

These are ANDed together and the rule's effect is achieved if the ANDed
value is `         TRUE        ` .

``` xml
<Rule Effect="Permit" RuleId="primary-access-rule">

  <Target>...</Target>
  <Condition>...</Condition>

</Rule>
```

A policy contains one or more Rules. Each rule has a
`         RuleId        ` and an `         Effect        ` .

An `         Effect        ` is the intended consequence of a satisfied
rule, which can be either `         Deny        ` or
`         Permit        ` . This means that if the rule is deemed
applicable to an incoming service request and the rule's conditions
evaluate to `         TRUE        `, then the specified effect should
be enforced.

------------------------------------------------------------------------

##### The "Condition" element

A `         Condition        ` is a predicate that must be satisfied for
a rule to be assigned its effect.

While `         Targets        ` are appealing as frame-like
expressions, they have a constrained logic which isn't always expressive
enough to narrow down whether a policy is applicable to a service
request.

Hence, the need for the `         Condition        ` element arises. If
either the `         Policy        ` `         Target        ` or the
`         Rule        ` `         Target        ` is not able to
adequately express a constraint, a `         Condition        ` can be
added to a `         Rule        ` .

A `         Condition        ` can only be present within a
`         Rule        ` . If a `         Condition        ` is intended
to be applicable to an entire `         Policy        `, then the
`         Condition        ` must be repeated in every
`         Rule        ` in that `         Policy        ` .

### Scenario three

Let's say you need to restrict users based on their attributes. For
example, a given user has an `         accessList        ` attribute and
you want to restrict access to a given resource based on the
`         accessList        ` .

``` xml
<Condition>
  <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
    <SubjectAttributeDesignator AttributeId="accessList" DataType="http://www.w3.org/2001/XMLSchema#string"/>
    <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">nurses</AttributeValue>
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">doctors</AttributeValue>
    </Apply>
  </Apply>
</Condition>
```

##### The "Apply" element

The "Apply" element uses the string-bag function on two attributes. This
bag function wraps a set of possible values for the attribute defined
under the `         <SubjectAttributeDesignator/>        ` element. In
this case, possible values for the attribute
`         accessList        ` should be either `         nurses        `
or `         doctors        ` .

The outer-most `         <Apply/>        ` element uses the
`         string-at-least-one-member-of function        ` which will be
applied to the results of the inner function. In other words, the final
condition says: "If you want to access the resource, you have to be a
member of `         doctors        ` or `         nurses        ` ."

Now that you have a clearer idea of what a XACML request is and the
elements of a XACML request, you can easily write a XACML policy
using the policy editors available in WSO2 Identity Server. For instructions, see 
[Creating a XACML
Policy](../../learn/creating-a-xacml-policy).
