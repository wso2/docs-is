# XACML 2.0 Sample Policy - 4

This topic demonstrates an example of a XACML policy that addresses the following authorization requirements.

1. The operation `         getEmployees        ` in the service "http://localhost:8280/services/Customers" should only be accessed by
users belonging to the group(s) `         admin_emps        ` and/or
`         admin        ` .  

2. Requests to any other service or operation should fail.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<Policy PolicyId="urn:sample:xacml:2.0:samplepolicy"
      RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os">
      <Description>Sample XACML Authorization Policy</Description>
      <Target>
      </Target>
      <Rule Effect="Permit" RuleId="primary-group-emps-rule">
        <Target>
          <Resources>
            <Resource>
              <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers/getEmployees</AttributeValue>
                <ResourceAttributeDesignator
                  AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
              </ResourceMatch>
            </Resource>
          </Resources>
          <Actions>
            <Action>
              <ActionMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                <ActionAttributeDesignator
                  AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
              </ActionMatch>
            </Action>
          </Actions>
        </Target>
        <Condition>
          <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
            <SubjectAttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string"/>
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
              <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin_emps</AttributeValue>
              <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
            </Apply>
          </Apply>
        </Condition>
      </Rule>
      <Rule Effect="Deny" RuleId="deny-rule"/>
    </Policy>
```
