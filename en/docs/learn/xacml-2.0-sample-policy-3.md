# XACML 2.0 Sample Policy - 3

This topic demonstrates an example of a XACML policy that addresses the following authorization requirements.

1.  The operation `          getEmployees         ` in the service "
    http://localhost:8280/services/Customers " should only be accessed
    by users belonging to both the `          admin_emps         ` and
    `          admin         ` groups.
2.  If the user belongs to a group other than
    `          admin_emps         ` or `          admin         `, the
    request should fail.
3.  Requests to any other service or operation should fail.

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os"  PolicyId="urn:sample:xacml:2.0:samplepolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable">
   <Description>Sample XACML Authorization Policy</Description>
   <Target></Target>
   <Rule Effect="Permit" RuleId="primary-group-emps-rule">
      <Target>
         <Resources>
            <Resource>
               <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                  <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers/getEmployees</AttributeValue>
                  <ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"></ResourceAttributeDesignator>
               </ResourceMatch>
            </Resource>
         </Resources>
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
         <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-set-equals">
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
