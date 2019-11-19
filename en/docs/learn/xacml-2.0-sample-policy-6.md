# XACML 2.0 Sample Policy - 6

This topic demonstrates an example of a XACML policy that addresses the following authorization requirements.

1. The operations `         getVersion1        ` and
`         getVersion2        ` in the service "http://localhost:8280/services/Customers" should be accessed by any
user.  

2. Requests to any other service or operation should only be accessed by
users belonging to the group(s) `         admin_emps        ` and/or
`         admin        ` .

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os"  PolicyId="urn:sample:xacml:2.0:samplepolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable">
   <Description>Sample XACML Authorization Policy</Description>
   <Target></Target>
   <Rule Effect="Permit" RuleId="primary-resource-rule">
      <Target></Target>
      <Condition>
         <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
            <ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"></ResourceAttributeDesignator>
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
               <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers/getVersion1</AttributeValue>
               <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers/getVersion2</AttributeValue>
            </Apply>
         </Apply>
      </Condition>
   </Rule>
   <Rule Effect="Permit" RuleId="primary-group-emps-rule">
      <Target>
         <Actions>
            <Action>
               <ActionMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                  <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                  <ActionAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"></ActionAttributeDesignator>
               </ActionMatch>
            </Action>
         </Actions>
      </Target>
      <Condition>
         <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
            <SubjectAttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string"></SubjectAttributeDesignator>
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
