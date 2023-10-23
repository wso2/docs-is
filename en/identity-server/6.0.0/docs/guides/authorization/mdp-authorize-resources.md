# Working with MDP Requests to Authorize Hierarchical Resources

WSO2 Identity Server supports the XACML 3.0 Multiple Decision Profile
(MDP), and also supports the hierarchical resource profile. Therefore,
you can use MDP requests to authorize hierarchical resources via WSO2
Identity Server.

Let’s take a look at a sample authorization scenario to understand
how you can work with MDP requests to authorize resources that are
organized in hierarchies.

Consider a sample scenario where a web application needs to verify the
actions that a user named `         Sam        ` is allowed to perform
on a resource named `         index.jsp        ` . Assume that the web
application sends only the root resources, and needs to filter out the
actions that are permitted in the response and allow them to the user.

### Prerequisites

-   [Download](https://wso2.com/identity-and-access-management) and run
    WSO2 Identity Server. For detailed instruction on how to install
    WSO2 Identity Server, see [Installing the
    Product]({{base_path}}/setup/installing-the-product).
-   Go to the Chrome Web Store and add the
    [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
    app.

### Procedure

Upload and publish the following sample policies to the XACML PDP in
WSO2 Identity Server as enabled policies:

-   [web-filter-policy-for-resource-1.xml](https://github.com/wso2/samples-is/blob/master/xacml/web-filter-sample/hierarchical_resources/web-filter-policy-for-resource-1.xml)
-   [web-filter-policy-for-resource-2.xml](https://github.com/wso2/samples-is/blob/master/xacml/web-filter-sample/hierarchical_resources/web-filter-policy-for-resource-2.xml)
-   [web-filter-policy-for-resource-3.xml](https://github.com/wso2/samples-is/blob/master/xacml/web-filter-sample/hierarchical_resources/web-filter-policy-for-resource-3.xml)

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
5.  Add the sample policy and click **Save Policy.** This adds the
    sample policy to the **Available Entitlement Policies** list.

6.  Click **Publish to My PDP** applicable to the sample policy that you
    added. This takes you to the **Publish Policy** screen.  
    ![publish-policy-to-pdp]({{base_path}}/assets/img/guides/publish-policy-to-pdp.png)
7.  Click **Publish**. This displays a confirmation message asking
    whether you want to continue publishing to PDP.
8.  Click **Yes**. This publishes the policy to the PDP.

After you publish all the sample policies from the given location, you
need to create and send a multiple decision request with the scope
attribute to see how the policies evaluate the request.

### Testing the authorization flow

1.  Create a XACML MDP request similar to the following:

    ``` xml
    <Request xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" CombinedDecision="false" ReturnPolicyIdList="false">
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">asela</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:2.0:resource:scope" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">Children</AttributeValue>
            </Attribute>
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">index.jsp</AttributeValue>
            </Attribute>
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:root-resource-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">index.jsp</AttributeValue>
            </Attribute>
        </Attributes>
    </Request>
    ```

    This is a multiple decision request with the scope attribute.

    !!! tip
    
        Following are a few important points to note with regard to the
        above request:
    
        -   The root resource of the XACML request is identified by the
            attribute values with the resource category (i.e
            `            urn:oasis:names:tc:xacml:3.0:attribute-category:resource           `
            ) and the default resource id (i.e
            `            urn:oasis:names:tc:xacml:1.0:resource:resource-id           `
            ).
        -   The scope element of the XACML request is identified by the
            category
            `            urn:oasis:names:tc:xacml:3.0:attribute-category:resource           `
            and attribute id
            `            urn:oasis:names:tc:xacml:2.0:resource:scope           `
            .
        -   The scope value can either be
            `             Children            ` or
            `             Descendants            ` .
            `             Descendants            ` mean all the resources
            under the root resource. `             Children            `
            mean only the level 1 descendants. However, this depends on your
            resource finder implementation.
    
        -   This request sends the root resource name as a different
            attribute (i.e., Attribute id is different. In general, 
            attribute id can be any id depending on the policy. Here, it is
            `             urn:oasis:names:tc:xacml:1.0:resource:root-resource-id            `
            ) because the polices are written that way, and the PDP expects
            it to be that way for evaluation.
    
        -   In the request, `             IncludeInResult            ` is
            important to distinguish the results of the XACML response, and
            It is specified in the root resource element so that the XACML
            response would contain all child/descendant resources.
    

2.  Use either the PEP TryIt tool to invoke the PDP, or invoke the
    `           getDecision          ` method of the PDP API using [SOAP UI](https://www.soapui.org/downloads/latest-release.html).

### Analyzing the response

You will see a response that contains authorization decisions for all
actions that the user Sam is allowed to perform. It will be similar to
the following:

``` xml
<Response>
    <Result>
        <Decision>Permit</Decision>
        <Status>
            <StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/>
        </Status>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-welcome</AttributeValue>
            </Attribute>
        </Attributes>
    </Result>
    <Result>
        <Decision>Deny</Decision>
        <Status>
            <StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/>
        </Status>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">modify-summary</AttributeValue>
            </Attribute>
        </Attributes>
    </Result>
    <Result>
        <Decision>Permit</Decision>
        <Status>
            <StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/>
        </Status>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-summary</AttributeValue>
            </Attribute>
        </Attributes>
    </Result>
    <Result>
        <Decision>Permit</Decision>
        <Status>
            <StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/>
        </Status>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">view-status</AttributeValue>
            </Attribute>
        </Attributes>
    </Result>
    <Result>
        <Decision>Deny</Decision>
        <Status>
            <StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/>
        </Status>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="true">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">modify-welcome</AttributeValue>
            </Attribute>
        </Attributes>
    </Result>
</Response>
```

If you take a look at the response, you will see multiple decisions
within the same XACML response, and you can distinguish each decision
using the attribute values that are returned.

This shows that the XACML engine extracts the child resources
corresponding to the root resources.
