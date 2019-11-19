
# XACML 2.0 Sample Policy - 1 

This topic demonstrates an example of a XACML policy that addresses the following
requirement: a given resource can be accessed only by a user belonging
to a particular role, and all requests to access any other resource
should fail.

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:2.0:policy:schema:os"  PolicyId="urn:sample:xacml:2.0:samplepolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable">
   <Description>Sample XACML Authorization Policy</Description>
   <Target></Target>
   <Rule Effect="Permit" RuleId="primary-group-rule">
      <Target>
         <Resources>
            <Resource>
               <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                  <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/</AttributeValue>
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
               <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
            </Apply>
            <SubjectAttributeDesignator AttributeId="group" DataType="http://www.w3.org/2001/XMLSchema#string"></SubjectAttributeDesignator>
         </Apply>
      </Condition>
   </Rule>
   <Rule Effect="Deny" RuleId="deny-rule"></Rule>
</Policy>        
```

The following are a few valid example requests which will result in "Permit/Not
Applicable/Deny" once evaluated against the above policy.

### Request one

-   **Resource** - http://localhost:8280/services/echo/
-   **User** - "admin" belongs only to the "admin" group
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
       <AttributeValue>admin</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/echo/</AttributeValue>
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

-   **Resource** - http://localhost:8280/services/echo/
-   **User** - "admin" belongs to the "admin" group and the "business"
    group
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
       <AttributeValue>admin</AttributeValue>
      </Attribute>
      <Attribute AttributeId="group"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>business</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/echo/</AttributeValue>
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

### Request three

-   **Resource** - http://localhost:8280/services/test/
-   **User** - "admin" belongs to the "admin" group
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
       <AttributeValue>admin</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/test/</AttributeValue>
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

### Request four

-   **Resource** - http://localhost:8280/services/echo/
-   **User** - "admin" belongs to the "business" group
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
       <AttributeValue>business</AttributeValue>
      </Attribute>
     </Subject>
     <Resource>
      <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
       DataType="http://www.w3.org/2001/XMLSchema#string">
       <AttributeValue>http://localhost:8280/services/echo/</AttributeValue>
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
