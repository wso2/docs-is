# Fine-grained Authorization using XACML Requests in JSON Format

WSO2 Identity Server (WSO2 IS) can be used to create and enforce
policies in an authorization flow to ensure fine-grained authorization.

Let's take a look at a sample scenario to understand how WSO2 IS
supports fine-grained authorization using XACML requests and responses
in JSON format via REST calls.

Consider a sample scenario where a user requests authorization to a
resource registered in WSO2 IS. When WSO2 IS recieves the request, an
enforced policy will be evaluated and the Policy Decision Point (PDP) in
WSO2 Identity Server decides whether or not to grant the user access to
the resource.

### Prerequisites

-   [Download](https://wso2.com/identity-and-access-management) and run
    WSO2 Identity Server. For detailed instrction on how to install WSO2
    IS, see [Installing the Product]({{base_path}}/setup/installing-the-product).
-   Go to the Chrome Web Store and add the
    [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
    app.

### Procedure

Follow the steps below to publish a sample policy to the PDP in WSO2
Identity Server:

1.  Access the WSO2 IS Management Console via
    <https://localhost:9443/carbon/>, and sign in using
    `          admin         ` / `          admin         ` as
    credentials.
2.  Click the **Main** tab on the Management Console, go to
    **Entitlement** -\> **PAP** and then click **Policy Administration**
    . The **Policy Administration** screen appears.
3.  Click **Add New Entitlement Policy**. This displays the available
    policy creation methods.
4.  Click **Write Policy in XML**. This allows you to write a XACML
    policy based on your requirement using the XML editor.
5.  Add the following sample policy and click **Save Policy** :

    ``` java
    <Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"  PolicyId="web-filter-policy-1" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0">
       <Target>
          <AnyOf>
             <AllOf>
                <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">index.jsp</AttributeValue>
                   <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                </Match>
             </AllOf>
          </AnyOf>
       </Target>
       <Rule Effect="Permit" RuleId="Rule_for_all_groups">
          <Target>
             <AnyOf>
                <AllOf>
                   <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">publicUser</AttributeValue>
                      <AttributeDesignator AttributeId="http://wso2.org/identity/user/username" Category="http://wso2.org/identity/user" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                   </Match>
                </AllOf>
             </AnyOf>
          </Target>
          <Condition>
             <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-welcome</AttributeValue>
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-summary</AttributeValue>
                </Apply>
                <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
             </Apply>
          </Condition>
       </Rule>
       <Rule Effect="Permit" RuleId="Rule_for_all_internal_user_group">
          <Target>
             <AnyOf>
                <AllOf>
                   <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">internalUser</AttributeValue>
                      <AttributeDesignator AttributeId="http://wso2.org/identity/user/username" Category="http://wso2.org/identity/user" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                   </Match>
                </AllOf>
             </AnyOf>
          </Target>
          <Condition>
             <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-status</AttributeValue>
                </Apply>
                <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
             </Apply>
          </Condition>
       </Rule>
       <Rule Effect="Permit" RuleId="Rule_for_all_admin_user_group">
          <Target>
             <AnyOf>
                <AllOf>
                   <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">adminUser</AttributeValue>
                      <AttributeDesignator AttributeId="http://wso2.org/identity/user/username" Category="http://wso2.org/identity/user" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                   </Match>
                </AllOf>
             </AnyOf>
          </Target>
          <Condition>
             <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-at-least-one-member-of">
                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-bag">
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">modify-welcome</AttributeValue>
                   <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">modify-summary</AttributeValue>
                </Apply>
                <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
             </Apply>
          </Condition>
       </Rule>
       <Rule Effect="Deny" RuleId="Rule_deny_all"></Rule>
       <ObligationExpressions>
          <ObligationExpression FulfillOn="Deny" ObligationId="fail_to_permit">
             <AttributeAssignmentExpression AttributeId="obligation-id">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">You can not access the resource index.jsp</AttributeValue>
             </AttributeAssignmentExpression>
          </ObligationExpression>
       </ObligationExpressions>
    </Policy>
    ```

    This adds the sample policy to the **Available Entitlement
    Policies** list.

6.  Click **Publish to My PDP** applicable to the sample policy that you
    added. This takes you to the **Publish Policy** screen.  
    ![publish-policy-to-pdp]({{base_path}}/assets/img/guides/publish-policy-to-pdp.png)
7.  Click **Publish**. This displays a confirmation message asking
    whether you want to continue publishing to PDP.
8.  Click **Yes**. This publishes the policy to the PDP.

Now that you have published the policy, you can send a sample request to
see how the policy evaluates the request.

### Testing the authorization flow

!!! tip 
    You can use any REST client to send a sample request. In this tutorial
    we are going to use the Google Chrome Postman app.
    

  
First, send a sample request that the policy can evaluate and provides a
response with the decision as deny.

!!! note 
    Ensure that you specify the following when you send the sample request
    using the REST client:
    
    -   Request type should be `          POST         ` .
    -   Endpoint URL should be
        `          https://<wso2-is-host>:<port>/api/identity/entitlement/decision/pdp         `
        .
    -   Authorization should be basic base64Encoded username and password.
    -   Content type should be `          application/json         ` .

<a name="request1"></a>
You can send the following as the first sample request:

``` java
{
   "Request": {
      "http://wso2.org/identity/user": {
         "Attribute": [
            {
               "AttributeId": "http://wso2.org/identity/user/username",
               "Value": "adminUser",
               "DataType": "string",
               "IncludeInResult": true
            }
         ]
      },
     
      "Resource": {
         "Attribute": [
            {
               "AttributeId": "resource-id",
               "Value": "index.jsp",
               "DataType": "string",
               "IncludeInResult": true
            }
         ]
      },
      "Action": {
            "Attribute": [{
                    "AttributeId": "action-id",
                    "Value": "view-welcome",
                    "DataType": "string",
                    "IncludeInResult": true
                }
            ]
        }
        
   }
}
```

Here,
`                   http://wso2.org/identity/user                 ` is a
custom XACML category in WSO2 Identity Server. This category has
`                   http://wso2.org/identity/user/username                 `
as a custom attribute Id.

In the above request since the `         IncludeInResult        `
property of each attribute is set to `         true        `, each
attribute will be included in the the response. If you do not want each
attribute to be included in the response you can set the
`         IncludeInResult        ` property of each attribute to
`         false        ` . Then the response will be short.

Next, send a sample request that the policy can evaluate and provides a
response with the decision as `         Deny        ` .<a name="request2"></a>

You can send the following as the sample request:


``` java
{
   "Request": {
      "http://wso2.org/identity/user": {
         "Attribute": [
            {
               "AttributeId": "http://wso2.org/identity/user/username",
               "Value": "adminUser",
               "DataType": "string",
               "IncludeInResult": false
            }
         ]
      },
     
      "Resource": {
         "Attribute": [
            {
               "AttributeId": "resource-id",
               "Value": "index.jsp",
               "DataType": "string",
               "IncludeInResult": false
            }
         ]
      },
      "Action": {
            "Attribute": [{
                    "AttributeId": "action-id",
                    "Value": "modify-welcome",
                    "DataType": "string",
                    "IncludeInResult": false
                }
            ]
        }
        
   }
}
```

###  Analyzing the response

You will see the following response whe you send the first sample
request given
[above](#request1)
:

``` java
{
    "Response": [
        {
            "Decision": "Deny",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
            },
            "Obligations": [
                {
                    "Id": "fail_to_permit",
                    "AttributeAssignments": [
                        {
                            "AttributeId": "obligation-id",
                            "Value": "You can access the resource index.jsp",
                            "DataType": "http://www.w3.org/2001/XMLSchema#string"
                        }
                    ]
                }
            ],
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-welcome",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            },
            "http://wso2.org/identity/user": {
                "Attribute": [
                    {
                        "AttributeId": "http://wso2.org/identity/user/username",
                        "Value": "adminUser",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            },
            "Resource": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
                        "Value": "index.jsp",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        }
    ]
}
```

The response that you get when you set the
`         IncludeInResult        ` property of each attribute to
`         false        ` in the request is as follows:

``` java
{
    "Response": [
        {
            "Decision": "Deny",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
            },
            "Obligations": [
                {
                    "Id": "fail_to_permit",
                    "AttributeAssignments": [
                        {
                            "AttributeId": "obligation-id",
                            "Value": "You can not access the resource index.jsp",
                            "DataType": "http://www.w3.org/2001/XMLSchema#string"
                        }
                    ]
                }
            ]
        }
    ]
}
```

You will see that the response is comparatively short.

You will see the following response when you send the second sample
request given
[above](#request2)
.

``` java
{
    "Response": [
        {
            "Decision": "Permit",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
            }
        }
    ]
}
```

You see this response with the decision as `         Permit        ` for
the second sample request because the sample policy specifies to print
the obligation only if the decision is `         Deny        ` .
