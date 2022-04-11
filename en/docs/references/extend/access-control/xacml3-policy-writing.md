# Introduction to XACML 3.0 Policies

XACML policies consist of header information, an optional text
description of the policy, a target, one or more rules and an optional
set of obligation expressions.

``` xml
<Policy PolicyId="urn:oasis:names:tc:xacml:3.0:example:SimplePolicy"
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable"
xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" Version="1.0">

    <Description>Sample XACML Authorization Policy.</Description>

    <Target>...</Target>

    <Rule>...</Rule>

</Policy>
```

The legacy combining algorithms are defined in previous versions of
XACML, and are retained for compatibility reasons. It is recommended
that the new combining algorithms are used instead of the legacy
combining algorithms for new use.

```
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:deny-overrides
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:ordered-deny-overrides
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:permit-overrides
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:ordered-permit-overrides
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit
urn:oasis:names:<zero-width space>tc:xacml:3.0:rule-combining-algorithm:permit-unless-deny
urn:oasis:names:<zero-width space>tc:xacml:1.0:rule-combining-algorithm:first-applicable
urn:oasis:names:<zero-width space>tc:xacml:1.0:policy-combining-algorithm:only-one-applicable
```

The deny overrides combining algorithm is intended for those cases where
a deny decision should have priority over a permit decision. This
algorithm has the following behavior.

-   The behavior of ordered algorithm is identical to that of the
    `Deny-overrides` rule-combining algorithm with one exception. The
    order in which the collection of rules is evaluated matchs the order
    as listed in the policy.
-   The permit overrides combining algorithm is intended for those cases
    where a permit decision should have priority over a deny decision.
-   The behavior of ordered algorithm is identical to that of the
    `Permit-overrides` rule-combining algorithm with one exception. The
    order in which the collection of rules is evaluated shall match the
    order as listed in the policy
-   The `Deny-unless-permit` combining algorithm is intended for those
    cases where a permit decision should have priority over a deny
    decision, and an `Indeterminate` or `NotApplicable` must never be
    the result.
-   The `Permit-unless-deny` combining algorithm is intended for those
    cases where a deny decision should have priority over a permit
    decision, and an `Indeterminate` or `NotApplicable` must never be
    the result.

Each rule shall be evaluated in the order in which it is listed in the
policy. For a particular rule, if the target matches and the condition
evaluates to "True", then the evaluation of the policy halts and the
corresponding effect of the rule is the result of the evaluation of the
policy (i.e., `Permit` or `Deny`).

In the entire set of policies in the policy set, if no policy is
considered applicable by virtue of its target, then the result of the
policy-combination algorithm is `NotApplicable`. If more than one policy
is considered applicable by virtue of its target, then the result of the
policy-combination algorithm is `Indeterminate`.

``` xml
<Policy PolicyId="urn:oasis:names:tc:xacml:3.0:example:SimplePolicy"
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable"
xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" Version="1.0">
    <Description>Sample XACML Authorization Policy.</Description>
        <Target>
            <AnyOf>
                <AllOf>
                    <Match>
                        <AttributeValue/>
                        <AttributeDesignator/>
                    </Match>
                </AllOf>
            </AnyOf>
        </Target>
        <Rule>...</Rule>
</Policy>
```

### Scenario one

A policy will be picked for a request having any Subject, Action, or
Resource: <http://localhost:8280/services/echo/> .

``` xml
<Policy PolicyId="urn:oasis:names:tc:xacml:3.0:example:SimplePolicy"
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable"
xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" Version="1.0">
    <Description>Sample XACML Authorization Policy.</Description>
    <Target>
        <AnyOf>
            <AllOf>
                <Match
                    MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/</AttributeValue>
                    <AttributeDesignator
                        MustBePresent="false"
                        Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                        AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                        DataType="http://www.w3.org/2001/XMLSchema#string"/>
                </Match>
            </AllOf>
        </AnyOf>
    </Target>
    <Rule>...</Rule>
</Policy>
```

### Scenario two

``` xml
<Policy PolicyId="urn:oasis:names:tc:xacml:3.0:example:SimplePolicy"
RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable"
xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" Version="1.0">
    <Description>Sample XACML Authorization Policy.</Description>
    <Target/>
    <Rule
        RuleId= "urn:oasis:names:tc:xacml:3.0:example:SimpleRule1"
        Effect="Permit">
        <Description>
            Sample XACML Authorization Policy.
        </Description>
        <Target>
            <AnyOf>
                <AllOf>
                    <Match
                        MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/</AttributeValue>
                        <AttributeDesignator
                        MustBePresent="false"
                        Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"
                        AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                        DataType="http://www.w3.org/2001/XMLSchema#string"/>
                    </Match>
                </AllOf>
            </AnyOf>
        </Target>
    </Rule>
</Policy>
```
