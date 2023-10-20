# XACML 3.0 Sample Policy - 3

This article addresses the following authorization requirements.

1.  The operation `          getEmployees         ` in the service "http://localhost:8280/services/Customers" should only be accessed
    by users belonging to both the `          admin_emps         ` and
    `          admin         ` groups.

2.  If the user belongs to a group other than
    `          admin_emps         ` or `          admin         `, the
    request should fail.
    
3.  Requests to any other service or operation should fail.

**Request**

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" PolicyId="testAnd" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0">
    <Description>Test And</Description>
    <Target></Target>
    <Rule Effect="Permit" RuleId="primary-group-emps-rule">
        <Target>
            <AnyOf>
                <AllOf>
                    <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers</AttributeValue>
                        <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                    </Match>
                    <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                        <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                        <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                    </Match>
                </AllOf>
            </AnyOf>
        </Target>
        <Condition>
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-set-equals">
                <AttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string" Category="urn:oasis:names:tc:xacml:3.0:example-group" MustBePresent="true"></AttributeDesignator>
                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin_emps</AttributeValue>
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
                </Apply>
            </Apply>
        </Condition>
    </Rule>
    <Rule Effect="Deny" RuleId="deny-rule"></Rule>
</Policy>
```

**Response** : Permit

``` xml
<Request xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" CombinedDecision="false" ReturnPolicyIdList="false">
    <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
        <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
        </Attribute>
    </Attributes>
    <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
        <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
        </Attribute>
    </Attributes>
    <Attributes Category="urn:oasis:names:tc:xacml:3.0:example-group">
        <Attribute AttributeId="group" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin_emps</AttributeValue>
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
        </Attribute>
    </Attributes>
    <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
        <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers</AttributeValue>
        </Attribute>
    </Attributes>
</Request>
```
