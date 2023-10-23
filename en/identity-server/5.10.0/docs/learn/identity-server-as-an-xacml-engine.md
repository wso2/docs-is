# Identity Server as a XACML Engine

WSO2 Identity Server comes with XACML support for fine-grained
authorization. It includes full support for policies based on XACML
2.0 and 3.0.

!!! info
    For more information on XACML and the concept of XACML engine, see
    [Access Control and Entitlement
    Management]({{base_path}}/get-started/access-control-and-entitlement-management).

The following steps describe how you can configure the Identity Server
as a XACML engine.

1.  Log in to the [Management
    Console]({{base_path}}/setup/getting-started-with-the-management-console) using your
    username and password.
2.  Navigate to the **Main** menu to access the **Entitlement** menu.
    Click **Policy Administration** under **PAP**. For more information
    on policy administration, see [Configuring the Policy Administration
    Point]({{base_path}}/learn/configuring-the-policy-administration-point).   
3.  Add a new policy or import external policy files to the system. Once
    you click **Add**, a  policy will be added. You can [edit a
    template
    policy]({{base_path}}/guides/authorization/customize-a-policy-template)
    it to suit your requirements, or you may [add a completely new
    policy]({{base_path}}/learn/creating-a-xacml-policy)
    .
4.  After adding you can [publish the policy to Policy Decision
    Point(PDP)]({{base_path}}/learn/publishing-a-xacml-policy)
    .
5.  Now try to evaluate the published policy by [using Try It
    tool.]({{base_path}}/guides/authorization/xacml-tryittool-overview/)

Here you can build your own XACML request to evaluate the policy you
just added. Copy and paste the following on the above screen and click
"Evaluate."

The above request means that the "admin" user is trying to access the
`         echoString        ` operation of the
`                   http://localhost:8281/services/echo                 `
service.

The template policy evaluates the above in the following manner:

Find the following section of the template policy:

``` java
<Resources>
    <Resource>
         <ResourceMatch MatchId="urn:oasis:names:tc:xacml:3.0:function:string-regexp-match">
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/echoString   </AttributeValue
                   <ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
        </ResourceMatch>
    </Resource>
</Resources>
```

In this policy, we use `         function:string-regexp-match        `
to validate the service name and operation name combination. You can
modify it to suit your own requirements.

For example, if you want to allow users to access all of the services
deployed on a certain server, then simply change it to
`                   http://localhost:8280/                 ` . Or, if
you want a user to access only a certain set of operations, you can
simply change the `         regex        ` to
`                   http://localhost:8280/services/echo/(echoString                 `
`         |echoInt)        ` .

The following code is used to evaluate the username :

``` java
<Condition>
    <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
         <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
         <SubjectAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id"
                       DataType="http://www.w3.org/2001/XMLSchema#string" SubjectCategory="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject"/>
    </Apply>
</Condition>
```

Here we validate the "admin" user.

``` java
<Request CombinedDecision="false" ReturnPolicyIdList="false" xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17">
 <Attributes Category="urn:oasis:names:tc:xacml:3.0:subject-category:access-subject">
      <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id">
         <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">admin</AttributeValue>
      </Attribute>
   </Attributes>
    <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
        <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
        </Attribute>
    </Attributes>
    <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
        <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" IncludeInResult="false">
            <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://localhost:8280/services/echo/echoString </AttributeValue>
        </Attribute>
    </Attributes>
</Request> 
```
