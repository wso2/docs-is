# Working with MDP Requests in JSON Format

WSO2 Identity Server [supports the JSON
format]({{base_path}}/references/concepts/authorization/access-control)
in addition to the default XML format when you work with XACML 3.0
requests and responses. Therefore, you can send XACML Multiple Decision
Profile (MDP) requests in JSON format, and can also recieve MDP
responses in the JSON format in an authorization flow in WSO2 Identity
Server. For a list of key points you need to keep in mind when you work
with XACML 3.0 JSON requests and responses, see [JSON Support with XACML
.

Let’s take a look at a sample scenario to understand how you can work
with MDP requests and responses in JSON format using WSO2 Identity
Server.

Consider a sample scenario where a user requests authorization to a
resource registered in WSO2 Identity Server. When WSO2 Identity
Server receives the request, the Policy Decision Point (PDP) performs
policy evaluation and provides the authorization decision response.
Here, we will look at a single request that contains multiple requests
to be evaluated by the PDP.

### Prerequisites

-   [Download](https://wso2.com/identity-and-access-management) and run
    WSO2 Identity Server. For detailed instrction on how to install WSO2
    IS, see [Installing the
    .
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
7.  Click **Publish**. This displays a confirmation message asking
    whether you want to continue publishing to PDP.
8.  Click **Yes**. This publishes the policy to the PDP.

Now that you have published the policy, you can send a sample request
and see how the policy evaluates the request.

### Testing the authorization flow

!!! tip
    
    You can use any REST client to send a sample request. In this tutorial
    we are going to use Google Chrome Postman app as the REST client .
    

Send the following as the sample JSON request:

!!! note
    
    Ensure that you specify the following when you send the sample request
    using the REST client :
    
    -   Request type should be `           POST          ` .
    
    -   Authorization method should be basic Base64Encoded username and
        password.
    
    -   Content-Type should be `           application/json          ` .
    
    -   Endpoint URL should be
        `           https://{wso2-is-host}:{wso2-is-port}/api/identity/entitlement/decision/pdp          `
        .
    

``` java
{
   "Request": {
      "http://wso2.org/identity/user": [
      {
         "Attribute": [
            {
               "AttributeId": "http://wso2.org/identity/user/username",
               "Value": "adminUser",
                "IncludeInResult": true,
                "DataType": "string"
            }
         ]
      },{
         "Attribute": [
            {
               "AttributeId": "http://wso2.org/identity/user/username",
               "Value": "publicUser",
                "IncludeInResult": true,
                "DataType": "string"
            }
         ]
      }  ],
     
      "Resource": {
         "Attribute": [
            {
               "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
               "Value": "index.jsp",
                "IncludeInResult": true,
                "DataType": "http://www.w3.org/2001/XMLSchema#string"
            }
         ]
      },
      "Action": [{
            "Attribute": [{
                    "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                    "Value": "view-welcome",
                     "IncludeInResult": true,
                     "DataType": "http://www.w3.org/2001/XMLSchema#string"
                }
            ]
        },{
            "Attribute": [{
                    "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                    "Value": "view-status",
                     "IncludeInResult": true,
                     "DataType": "http://www.w3.org/2001/XMLSchema#string"
                }
            ]
        },{
            "Attribute": [{
                    "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                    "Value": "view-summary",
                     "IncludeInResult": true,
                     "DataType": "http://www.w3.org/2001/XMLSchema#string"
                }
            ]
        },{
            "Attribute": [{
                    "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                    "Value": "modify-welcome",
                     "IncludeInResult": true,
                     "DataType": "http://www.w3.org/2001/XMLSchema#string"
                }
            ]
        } ] 
   }
}
```

This request contains the
`                   http://wso2.org/identity/user                 `
category with `         adminUser        ` and
`         publicUser        ` as attributes. And also contains the
`         Action        ` category with `         view-welcome        `
, `         view-status        `, `         view-summary        ` and
`         modify-welcome        ` as attributes. Here, the two users,
`         adminUser        ` and `         publicUser        ` are
trying to access the `         index.jsp        ` resource. Therefore,
the PEP should create eight different requests to grant both
`         adminUser        ` and `         publicUser        `
permission to access the `         index.jsp        ` resource to
perform the following four actions:

-   `          view-welcome         `
-   `          view-status         `
-   `          view-summary         `
-   `          modify-welcome         `

### Analyzing the response

You will see a JSON response similar to the following:

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
            ],
            "Resource": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
                        "Value": "index.jsp",
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
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-status",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        },
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
            ],
            "Resource": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
                        "Value": "index.jsp",
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
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-summary",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        },
        {
            "Decision": "Permit",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
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
            },
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
                        "Value": "publicUser",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        },
        {
            "Decision": "Permit",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
            },
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-summary",
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
            },
            "http://wso2.org/identity/user": {
                "Attribute": [
                    {
                        "AttributeId": "http://wso2.org/identity/user/username",
                        "Value": "publicUser",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        },
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
            ],
            "Resource": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
                        "Value": "index.jsp",
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
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-welcome",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        },
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
            ],
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "view-status",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            },
            "http://wso2.org/identity/user": {
                "Attribute": [
                    {
                        "AttributeId": "http://wso2.org/identity/user/username",
                        "Value": "publicUser",
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
        },
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
            ],
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "modify-welcome",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            },
            "http://wso2.org/identity/user": {
                "Attribute": [
                    {
                        "AttributeId": "http://wso2.org/identity/user/username",
                        "Value": "publicUser",
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
        },
        {
            "Decision": "Permit",
            "Status": {
                "StatusCode": {
                    "Value": "urn:oasis:names:tc:xacml:1.0:status:ok"
                }
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
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "urn:oasis:names:tc:xacml:1.0:action:action-id",
                        "Value": "modify-welcome",
                        "IncludeInResult": "true",
                        "DataType": "http://www.w3.org/2001/XMLSchema#string"
                    }
                ]
            }
        }
    ]
}
```

You will see that the response has 8 decisions for the 8 requests.

Now that you understand how to work with MDP requests and responses in
JSON format using WSO2 Identity Server, you can send XACML MDP requests
in JSON format, and recieve MDP responses in the JSON format depending
on your requirement in an authorization flow.