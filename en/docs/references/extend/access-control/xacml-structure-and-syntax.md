### XACML policy language structure and syntax

In order to render an authorization decision, it is possible to combine
the two separate policies to form the single policy applicable to the
request.

XACML defines three top-level policy elements:

-   Element that contains a *boolean* expression that can be
    evaluated in isolation, but that is not intended to be accessed in
    isolation by a PDP. So, it is not intended to form the basis of an
    authorization decision by itself. It is intended to exist in
    isolation only within a XACML PAP, where it may form the basic
    unit of management.  
-   Element that contains a set of elements and a specified procedure
    for combining the results of their evaluation. It is the basic unit
    of policy used by the PDP, and so it is intended to form the basis
    of an authorization decision.  
-   Element that contains a set of or other elements and a specified
    procedure for combining the results of their evaluation. It is the
    standard means for combining separate policies into a single
    combined policy.

As XACML is used in Attribute-based Access Controlling, in XACML all the
attributes are categorized into the following four main categories: But
from XACML 3.0, custom categories are also supported.

-   Subject
-   Resource
-   Action
-   Environment

A Rule is the most elementary unit of policy. It may exist in
isolation only within one of the major actors of the XACML domain. The
main components of a Rule are as follows:

-   <<zero-width space>Target<zero-width space>>- This defines the set of requests to which the rule is intended to
    apply in the form of a logical expression on attributes in the
    request.
-   <<zero-width space>Effect<zero-width space>>- The effect of the rule indicates the rule-writer's intended
    consequence of a "True" evaluation of the rule. Two values are allowed: "Permit" and "Deny".
-   <<zero-width space>Condition<zero-width space>>- A Boolean expression that refines the applicability of the rule
    beyond the predicates implied by its target. Therefore, it may be
    absent.
-   <<zero-width space>ObligationExpressions<zero-width space>>- Obligation expressions may be added by the writer of the policy.
    When a PDP evaluates a policy containing obligation expressions, it
    evaluates the obligation expressions into obligations and returns
    certain of those obligations to the PEP in the response context.
-   <<zero-width space>AttributeSelector<zero-width space>>- This allows the
    policy to specify an attribute with given identifier, category and
    data type. The AttributeSelector on the other hand, provides a mean
    to lookup the value of attributes using a XPath query by specifying
    the data type and XPath expression. Attribute selectors are then
    executed against the XML content that may have been sent along in
    the initial XACML request.

A sample XACML 3.0 policy is as follows:

``` xml
<Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" PolicyId="samplePolicy" RuleCombiningAlgId="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-overrides" Version="1.0">
    <Target>
        <AnyOf>
            <AllOf>
                <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
                    <AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"/>
                </Match>
            </AllOf>
        </AnyOf>
    </Target>
    <Rule Effect="Permit" RuleId="permit"/>
</Policy>
```

###  Improvements in XACML 3.0

The XACML 3.0 core specification highlights the following main changes
in comparison with XACML 2.0.

#### Custom attribute categories

Custom attribute categories can be defined with XACML 3.0. However, in
XACML 2.0, attributes have been organized into subject, resource,
environment or action. For instance, lets's say that you want to create
an attribute category called “foo” in your policy and request. You can
do it with XACML 3.0 easily. According to the XACML 3.0 policy schema,
the category of XACML element is identified by a XML attribute called “
`         Category        ` ”.

In XACML 2.0 Policy, you can define the attribute designator element as
follows, However, it must be a pre-defined category such as subject,
resource, environment or action.

``` java
<ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
```

In a XACML 3.0 Policy, you can define it as follows.
`         Category        ` can be anything as it is defined as an
attribute of the `         AttributeDesignator        ` element.

``` java
<AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" Category="resource" DataType="http://www.w3.org/2001/XMLSchema#string"/>
```

#### Improvements in `         Obligation        `

In general, obligations can have the following:

-   An Obligation has an identifier, which is used to distinguish
    different types of obligations
-   An Obligation can have arguments
-   Obligations apply to Permit (or Deny) decisions only

A PDP will return, as part of a Permit or Deny response, a (possibly
empty) subset of the obligations that appear in the policy.

There are several improvements with Obligations in XACML 3.0 when
compared to 2.0.

One of the main improvements is the introduction of **Obligation
Expressions**. This adds dynamic expressions into the obligation
statements. For a more in-depth understanding, see the following
example:

Let's assume that you want to do following with the Obligation: “On
deny, inform the PEP to send an email to the user”.

In XACML 2.0, you need to define the obligation element with the user
email statically.

``` java
<Obligation ObligationId="send-email" FulfillOn="Deny">
    <AttributeAssignment AttributeId="email" DataType="http://www.w3.org/2001/XMLSchema#string">user@foo.com</AttributeAssignment>
</Obligation>
```

However, the user may not be same for each XACML request that is
evaluated. Therefore it is not possible to configure the email
statically in the `         Obligation        ` element. Obligation can
only inform PEP to send an email to user (it lets the PEP figure out the
value of user’s email).

``` java
<Obligation ObligationId="send-email" FulfillOn="Deny">
    <AttributeAssignment AttributeId="text" DataType="http://www.w3.org/2001/XMLSchema#string">please send email to user</AttributeAssignment>
</Obligation>
```

However, in XACML 3.0, the email of each user can be retrieved using PIP
in dynamically as we can define an expression element inside the
`         ObligationExpression        ` . Therefore, obligation can
inform PEP to send an email to <user@foo.com> address.

``` java
<ObligationExpression ObligationId="send-email" FulfillOn="Deny">
    <AttributeAssignmentExpression AttributeId="email" DataType="http://www.w3.org/2001/XMLSchema#string">
        <AttributeDesignator AttributeId="email" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"/>
    </AttributeAssignmentExpression>
</ObligationExpression>
```

In XACML 2.0, obligations can only be added to policies and policy sets.
However, with XACML 3.0, rules can also contain obligations. At the root
of all XACML policies, is a policy or a policy set . A policy represents
a single access control policy, expressed through a set of rules. A
policy set is a container that can hold other policies or policy sets,
as well as references to policies found in remote locations.

#### Introducing `         Advice        `

`         Advice        ` is a newly introduced feature with XACML 3.0.
Advice is similar to obligations and it shares much of its syntax. The
difference is contractual: the PEP can disregard any advice it receives.
PEPs do not have to comply with advice statements; PEPs can consider or
discard the statement. A common scenario is to explain why something was
denied: “User, Alex is denied because Alex does not have a valid email”.

The XACML specification says that any advice returned with a decision
can be safely ignored by compliant PEPs. This means that PEPs should
work as described in the previous section, regardless of what the PEP
does with the advice it may receive. For example, a PEP must allow
access if it receives a Permit decision with no obligations, regardless
of any advice in the decision.

#### Improvements in `         Target        `

Since it is possible to define custom attribute categories, there are
improvements in some related elements in the XACML 3.0 policy, when
compared to 2.0. With XACML 3.0, the `         Target        ` element
can be used to define more complex authorization logic within itself
when compared with 2.0.

In XACML 2.0, the `         Target        ` element contains the OR and
AND relationship between the same category. However, in XACML 3.0,
`         AllOf        ` and `         AnyOf        ` elements have been
introduced to `         Target        ` element. That clearly helps to
define the OR and AND relationship between different categories.

As an example, let's look at a `         Target        ` element. In
XACML 2.0, we have an `         AND        ` relationship between
**foo1** and **foo2** resources and an `         OR        `
relationship between **bar1** and **bar2** actions. However, we cannot
create an `         OR        ` relationship between a **foo1** resource
and **bar1** action. so we cannot define something such as “Target would
be matched when Alex can access the **foo** resource or do a **bar**
action” by using the `         Target        ` element.

``` java
<Target>
     <Resources>
         <Resource>
             <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">foo1</AttributeValue>
                 <ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </ResourceMatch>
             <ResourceMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">foo2</AttributeValue>
                 <ResourceAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </ResourceMatch>
         </Resource>
     </Resources>
     <Actions>
         <Action>
             <ActionMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">bar1</AttributeValue>
                 <ActionAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </ActionMatch>
         </Action>
         <Action>
             <ActionMatch MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">bar2</AttributeValue>
                 <ActionAttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </ActionMatch>
         </Action>
     </Actions>
</Target>
```

XACML 3.0 has an `AND` relationship between “ **foo** ”
resource and **bar1** role and an `OR` relationship
between **bar2** action. So we cannot define something as “Target
would be matched, when Alex can access **foo** resource and do **bar1**
action or do **bar2** action”.

``` java
<Target>
     <AnyOf>
         <AllOf>
             <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-regexp-match">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">foo</AttributeValue>
                 <AttributeDesignator MustBePresent="false" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </Match>
             <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">bar1</AttributeValue>
                 <AttributeDesignator MustBePresent="false" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
 AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </Match>
         </AllOf>
         <AllOf>
             <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                 <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">bar2</AttributeValue>
                 <AttributeDesignator MustBePresent="false" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action"
 AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" DataType="http://www.w3.org/2001/XMLSchema#string"/>
             </Match>
         </AllOf>
     </AnyOf>
</Target>
```

#### More Functions and Algorithms

XACML3 has introduced new String functions such as:

-   `            urn:oasis:names:tc:xacml:3.0:function:string-starts-with           `
-   `            urn:oasis:names:tc:xacml:3.0:function:string-ends-with           `
-   `            urn:oasis:names:tc:xacml:3.0:function:string-contains           `
-   `            urn:oasis:names:tc:xacml:3.0:function:string-substring           `

Some improvements to other functions such as:

-   `            urn:oasis:names:tc:xacml:3.0:function:dayTimeDuration-equal           `
-   `            urn:oasis:names:tc:xacml:3.0:function:yearMonthDuration-equal           `
-   `            urn:oasis:names:tc:xacml:3.0:function:dateTime-add-dayTimeDuration           `

Also improvements to existing combine algorithms (deny-overrides,
permit-overrides, ordered-deny-overrides and ordered-permit-overrides)
and new two combine algorithms for policy and rule combining.

-   `            urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit           `
-   `            urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:deny-unless-permit           `
-   `            urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:permit-unless-deny           `
-   `            urn:oasis:names:tc:xacml:3.0:policy-combining-algorithm:permit-unless-deny           `

#### Improvements in XPath

New XPath data type is introduced with XACML 3.0. In XACML 2.0, XPath is
defined as a String and cannot define the context that the namespace
prefix is going to resolve. Also XPath based multiple decisions scheme
is introduced with XACML 3.0.

#### Improvement in XACML Request and Response

As it is possible to define custom attribute categories, many types of
attribute categories can be in the XACML 3.0 request. XACML 2.0 request
can contain only subject, resource, environment or action categories.

The XACML Response can contain additional data such as:

-   Request attributes that are defined in the XACML response.
-   Applicable policy ids for a given XACML request are defined in the
    XACML response.

#### XACML 3.0 Multiple Decision Profile

This is a useful profile that allows you to request more than one access
control decision in a single XACML request context, and also allows you
to request a single combined decision based on multiple individual
decisions.

The [XACML 3.0 Multiple Decision
Profile](http://docs.oasis-open.org/xacml/3.0/xacml-3.0-multiple-v1-spec-cd-03-en.html)
(MDP) is particularly useful in scenarios where the PEP needs to request
decisions for multiple requests in one XACML request, and provides a
considerable improvement in performance between the PEP and the PDP in
such scenarios.

For a set of tutorials that demonstrate how to work with XACML MDP
requests in WSO2 Identity Server, see [Working with XACML Multiple
Decision Profile
Requests](../../learn/working-with-xacml-multiple-decision-profile-requests)
.

#### XACML 3.0 JSON Profile

This is a new profile that provides a standardized interface between
the PEP and the PDP using JSON. The decision request and response
structure is specified in the core XACML specification.

With the introduction of the [XACML 3.0 JSON
profile](http://docs.oasis-open.org/xacml/xacml-json-http/v1.0/xacml-json-http-v1.0.html)
, WSO2 Identity Server supports the JSON format in addition to the
default XML format with regard to XACML 3.0 requests and responses.

!!! tip
    
    WSO2 Identity Server also supports [working with XACML MDP requests and
    responses in JSON
    format](../../learn/working-with-mdp-requests-in-json-format)
    .
    

  
Following are some of the key points to keep in mind when you work with
XACML 3.0 JSON requests and responses via WSO2 Identity Server:

-   Certain parts of JSON requests and responses have default values to
    avoid bloating. For example, the default value of the data-type of
    an attribute should be
    [string](https://www.w3.org/2001/XMLSchema#string).

-   The name of the XACML XML attribute element has changed to the
    category object in JSON so that it is possible to call the parent
    element.

-   The `          <AttributeValue>         ` element in the XML
    representation no longer exists. Instead a value property is
    introduced to the attribute object.
-   The `          AdviceId         ` and the
    `          ObligationId         ` attributes of
    `          <Advice/>         ` and
    `          <Obligation/>         ` XML elements are renamed to
    `          Id         ` in JSON.
-   The order of objects and values in the serialized form (JSON) does
    not matter in XACML.
-   You can use the short name of identifiers instead of the URI.
    Following are the supported identifier URIs and the short name for
    each:

    | Identifier URI                                                                         | Short name          |
    |----------------------------------------------------------------------------------------|---------------------|
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:resource             | Resource            |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:action               | Action              |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:environment          | Environment         |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:access-subject       | AccessSubject       |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:recipient-subject    | RecipientSubject    |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:intermediary-subject | IntermediarySubject |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:codebase             | Codebase            |
    | urn:oasis:names:<zero-width space>tc:xacml:3.0:attribute-category:requesting-machine   | RequestingMachine   |

-  <a name="shortnames"></a>The JSON format supports the fully qualified XACML data-type URI, and also supports the short name of the data-type.

    | XACML data type identifier                                                                                                               | JSON shorthand type code | Mapping/inference rule                                                                                                 |
    |------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|------------------------------------------------------------------------------------------------------------------------|
    | `                                                http://www.w3.org/2001/XMLSchema#string                                             `   | string                   | JSON "String"                                                                                                          |
    | `                                                http://www.w3.org/2001/XMLSchema#boolean                                             `  | boolean                  | JSON "Boolean"                                                                                                         |
    | `                                                http://www.w3.org/2001/XMLSchema#integer                                             `  | integer                  | JSON "Number" without a fractional portion, and within the integer range defined by the XML schema in \[XMLDatatypes\] |
    | `                                                http://www.w3.org/2001/XMLSchema#double                                             `   | double                   | JSON "Number" with a fractional portion, or out of the integer range defined by the XML schema in \[XMLDatatypes\]     |
    | `                                                http://www.w3.org/2001/XMLSchema#time                                             `     | time                     | None. Inference must fail.                                                                                             |
    | `                                                http://www.w3.org/2001/XMLSchema#date                                             `     | date                     | None. Inference must fail.                                                                                             |
    | `                                                http://www.w3.org/2001/XMLSchema#dateTime                                             ` | dateTime                 | None. Inference must fail.                                                                                             |
    | `                                                http://www.w3.org/2001/XMLSchema\#dayTimeDuration`                                      | dayTimeDuration          | None. Inference must fail.                                                                                             |
    | `												   http://www.w3.org/2001/XMLSchema\#yearMonthDuration`                                    | yearMonthDuration        | None. Inference must fail.                                                                                             |
    | `												   http://www.w3.org/2001/XMLSchema\#anyURI`                                               | anyURI                   | None. Inference must fail.                                                                                             |
    | `												   http://www.w3.org/2001/XMLSchema\#hexBinary`                                            | hexBinary                | None. Inference must fail.                                                                                             |
    | `												   http://www.w3.org/2001/XMLSchema\#base64Binary`                                         | base64Binary             | None. Inference must fail.                                                                                             |
    | urn:oasis:names:<zero-width space>tc:xacml:1.0:data-type:rfc822Name                                                                                        | rfc822Name               | None. Inference must fail.                                                                                             |
    | urn:oasis:names:<zero-width space>tc:xacml:1.0:data-type:x500Name                                                                                          | x500Name                 | None. Inference must fail.                                                                                             |
    | urn:oasis:names:<zero-width space>tc:xacml:1.0:data-type:ipAddress                                                                                         | ipAddress                | None. Inference must fail.                                                                                             |
    | urn:oasis:names:<zero-width space>tc:xacml:1.0:data-type:dnsName                                                                                           | dnsName                  | None. Inference must fail.                                                                                             |
    | urn:oasis:names:<zero-width space>tc:xacml:1.0:data-type:xpathExpression                                                                                   | xpathExpression          | None. Inference must fail.                                                                                             |

-   `           xpathExpression          ` data-type values are
    represented as JSON objects, and each object contains the following
    properties:

    | Attribute     | Type                            | Required                                                                                                                         | Default value |
    |---------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------|
    | XPathCategory | URI                             | Yes. You can use the [short names defined for identifier URIs](#shortnames) as values here. | None          |
    | Namespaces    | Array of namespace declarations | No                                                                                                                               | None          |
    | XPath         | String                          | Yes                                                                                                                              | None          |

-   The namespaces property should contain the following properties:

    | Attribute | Type   | Required | Default value |
    |-----------|--------|----------|---------------|
    | Prefix    | String | No       | None          |
    | Namespace | URI    | Yes      | None          |

      
    Following is a sample JSON attribute format that contains the fully
    qualified XACML data-type URI:

    ``` java
    {
        "Attribute": {
           "AttributeId": "urn:oasis:names:tc:xacml:3.0:content-selector",
           "DataType": "xpathExpression",
           "Value": {
                   "XPathCategory": "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
                   "Namespaces": [{
                           "Namespace":   "urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"
                           }, {
                           "Prefix": "md",
                           "Namespace":   "urn:example:med:schemas:record"
                               }],
                   "XPath":"md:record/md:patient/md:patientDoB"
            }
       }
    }
    ```

-   The `          MultiRequests         ` object is optional in the
    JSON representation of XACML. The purpose of the
    `          MultiRequests         ` object is to support the XACML
    multiple decision profile.
-   The JSON attribute object contains an array of attribute objects.
    The attribute object contains the following properties:

    | Property name   | Type                                                                                                                                                                                                                                                                                         | Required | Default value                                                                                                                                                                                                                |
    |-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | AttributeId     | URI                                                                                                                                                                                                                                                                                          | Yes      | None. The identifier used in the XML representation of a XACML attribute will be used in its JSON representation                                                                                                             |
    | Value           | Either string, boolean, number (this maps to either a XACML integer or double as defined in supported data types), object, array of strings, array of boolean, Array of number, array of object, or a mixed array of string and number where the string values represents a numerical value. | Yes      | None.                                                                                                                                                                                                                        |
    | Issuer          | String                                                                                                                                                                                                                                                                                       | No       | Null                                                                                                                                                                                                                         |
    | Data Type       | URI                                                                                                                                                                                                                                                                                          | No       | The data type value can be omitted in the JSON representation. The default value is `                                                http://www.w3.org/2001/XMLSchema#string                                             ` . |
    | IncludeInResult | Boolean                                                                                                                                                                                                                                                                                      | No       | False                                                                                                                                                                                                                        |

-   The results of the JSON request is represented by the decision
    object in the form of a JSON Object. This can have following
    properties:

    | Property name | Type   | Required                                                             | Default value |
    |---------------|--------|----------------------------------------------------------------------|---------------|
    | Decision      | String | Yes. Possible values are: Permit, Deny, NotApplicable, Indeterminate | None.         |

-   The results can have the `          status         `,
    `          obligations         `,
    `          associatedAdvice         `,
    `          category         `, and
    `          policyIdentifierList         `, which are optional.

Following is a sample JSON request that you can try out with WSO2
Identity Server:

``` java
{
   "Request": {
      "AccessSubject": {
         "Attribute": [
            {
               "AttributeId": "subject-id",
               "Value": "sam",
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
                    "Value": "modify-welcome",
                    "DataType": "string",
                    "IncludeInResult": true
                }
            ]
        }
        
   }
}
```

  
Following is a sample XACML JSON response that you will get for the
above request:

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
            "AccessSubject": {
                "Attribute": [
                    {
                        "AttributeId": "subject-id",
                        "Value": "dinali",
                        "IncludeInResult": "true",
                        "DataType": "string"
                    }
                ]
            },
            "Resource": {
                "Attribute": [
                    {
                        "AttributeId": "resource-id",
                        "Value": "index.jsp",
                        "IncludeInResult": "true",
                        "DataType": "string"
                    }
                ]
            },
            "Action": {
                "Attribute": [
                    {
                        "AttributeId": "action-id",
                        "Value": "modify-welcome",
                        "IncludeInResult": "true",
                        "DataType": "string"
                    }
                ]
            }
        }
    ]
}
```

For a tutorial that demonstrate how WSO2 IS supports fine-grained
authorization using XACML requests in JSON format, see [Fine-grained
Authorization using XACML Requests in JSON
Format](../../learn/fine-grained-authorization-using-xacml-requests-in-json-format).

#### Administrative Delegation Profile

This is also a new profile that comes with XACML 3.0. This allows you to
define policies about who can write policies about what. For
example, "Alex may issue a policy but only about resources in department
X”.

### XACML 2.0 and XACML 3.0 samples

The biggest difference between XACML 2.0 and XACML 3.0 for your client
app is that the structure of the attributes in the authentication
request has changed significantly in XACML 3.0.

In XACML 2.0, attributes were organized into subject, resource,
environment, or action categories using XML element tags:

``` xml
<Request  xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="urn:oasis:names:tc:xacml:2.0:context:schema:os  access_control-xacml-2.0-context-schema-os.xsd">
        <Subject>
            <Attribute
                  AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id"
                  DataType="http://www.w3.org/2001/XMLSchema#string">
                <AttributeValue>Julius Hibbert</AttributeValue>
            </Attribute>
        </Subject>
        <Resource>
            <Attribute
                  AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"
                  DataType="http://www.w3.org/2001/XMLSchema#anyURI">
                <AttributeValue>http://medico.com/record/patient/BartSimpson</AttributeValue>
            </Attribute>
        </Resource>
        <Action>
            <Attribute
                  AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"
                  DataType="http://www.w3.org/2001/XMLSchema#string">
                <AttributeValue>read</AttributeValue>
            </Attribute>
        </Action>
        <Environment/>
</Request>
```

In XACML 3.0, these categories are indicated using XML attributes
instead of XML element tags:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<Request xsi:schemaLocation="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17 http://docs.oasis-open.org/xacml/3.0/xacml-core-v3-schema-wd-17.xsd" ReturnPolicyIdList="false" CombinedDecision="false" xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
    <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Julius Hibbert</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
    <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#anyURI">http://medico.com/record/patient/BartSimpson</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
    <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id">
      <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
    </Attribute>
  </Attributes>
  <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:environment" />
</Request>
```

The `<Subject>` element in XACML 2.0 becomes
`         <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">        `
in XACML 3.0, for example. This is the same for the resource,
environment, and action categories.
