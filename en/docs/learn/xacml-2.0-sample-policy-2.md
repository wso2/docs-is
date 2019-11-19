# XACML 2.0 Sample Policy - 2 

This topic demonstrates an example of a XACML policy that addresses the following authorization requirements:

1.  The operation `          getCustomers         ` in the service "
    http://localhost:8280/services/Customers " should only be accessed
    by users belonging to the `          admin_customers         `
    group.
2.  The operation `          getEmployees         ` in the service "
    http://localhost:8280/services/Customers " should only be accessed
    by users belonging to the `          admin_emps         ` group.
3.  Requests to any other service or operation should fail.

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os"  PolicyId="urn:sample:xacml:2.0:samplepolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable">
   <Description>Sample XACML Authorization Policy</Description>
   <Target></Target>
   <Rule Effect="Permit" RuleId="primary-group-customer-rule">
      <Target>
         <Resources>
            <Resource>
               <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                  <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/Customers/getCustomers</AttributeValue>
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
         <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-subset">
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
               <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin_customers</AttributeValue>
            </Apply>
            <SubjectAttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string"></SubjectAttributeDesignator>
         </Apply>
      </Condition>
   </Rule>
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
         <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-subset">
            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
               <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin_emps</AttributeValue>
            </Apply>
            <SubjectAttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string"></SubjectAttributeDesignator>
         </Apply>
      </Condition>
   </Rule>
   <Rule Effect="Deny" RuleId="deny-rule"></Rule>
</Policy>        
```

The following are a few valid requests which will result in "Permit/Not
Applicable/Deny" once evaluated against the above policy.

### Request one

-   **Resource** - http://localhost:8280/services/Customers/getCustomers
-   **User** - "admin" belongs only to the "admin\_customers" group
-   **Result** - Permit

``` xml
<Request xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <Subject>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>admin</AttributeValue>
      </Attribute>
      <Attribute AttributeId="group"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>admin_customers</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/Customers/getCustomers</AttributeValue>
      </Attribute>
     </Resource>
     <Action>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>read</AttributeValue>
      </Attribute>
     </Action>
     <Environment />
    </Request>
```

### Request two

-   **Resource** - http://localhost:8280/services/Customers/getCustomers
-   **User** - "admin" belongs only to the "admin\_emps" group
-   **Result** - Deny

``` xml
<Request xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <Subject>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>admin</AttributeValue>
      </Attribute>
      <Attribute AttributeId="group"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>admin_emps</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/Customers/getCustomers</AttributeValue>
      </Attribute>
     </Resource>
     <Action>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>read</AttributeValue>
      </Attribute>
     </Action>
     <Environment />
    </Request>
```
