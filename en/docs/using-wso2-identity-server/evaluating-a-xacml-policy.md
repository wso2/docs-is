# Evaluating a XACML Policy

The XACML TryIt Tool allows users to test their policies easily, without
creating and sending authorization requests to Identity Server. It is a
UI tool through which authorization requests can be created and
evaluated against available policies in the system. Users can create
simple authorization requests using the web UI of the TryIt Tool. By
switching to “Create Request Using Editor” mode, you can write complex
XACML 3.0 requests in XML format and try them.

!!! tip "Before you begin"
    
    Prior to creating a basic XACML 3.0 request for evaluation you need to
    [create a policy](../../tutorials/creating-a-xacml-policy).
    

Follow the instructions below to create a basic XACML 3.0 request for
Evaluation. You can create a request using one of the following methods.

#### Create request using editor

1.  Sign in. Enter your user name and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console).
2.  Click **Tools** to access the **XACML** menu.
3.  Click **TryIt**.
4.  Click on the **Create Request Using Editor** link.  
    ![Create request using editor](../../assets/img/using-wso2-identity-server/create-request-using-editor.png)
5.  Use the "Toggle editor" to create a request in XML. The default
    elements are as follows:

    -   `            <Resource>           `
    -   `            <Subject>           `
    -   `            <Action>           `
    -   `            <Attribute>           `
    -   `            <Attribute AttributeId>           `
    -   `            <AttributeValue/>           `
    -   `            <Environment>                       `

    ![Evaluate entitlement policy](../../assets/img/using-wso2-identity-server/evaluate-entitlement-policy.png) 

    Refer to [XACML 2.0/3.0 specification](http://docs.oasis-open.org/xacml/) for more
    information on XACML authorization requests.

    !!! note "A sample XACML XML request"
        ```
        \<Request xmlns="urn:oasis:names:tc:xacml:2.0:context:schema:os"  
        xmlns:xsi=" <http://www.w3.org/2001/XMLSchema-instance> "\>  
        \<Subject\>  
        \<Attribute
        AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id"  
        DataType=" <http://www.w3.org/2001/XMLSchema#string> "\>  
        \<AttributeValue\>admin\</AttributeValue\>  
        \</Attribute\>  
        \</Subject\>  
        \<Resource\>  
        \<Attribute
        AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id"  
        DataType=" <http://www.w3.org/2001/XMLSchema#string> "\>  
        \<AttributeValue\>
        http://localhost:8280/services/echo/echoString \>  
        \</Attribute\>  
        \</Resource\>  
        \<Action\>  
        \<Attribute
        AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id"  
        DataType=" <http://www.w3.org/2001/XMLSchema#string> "\>  
        \<AttributeValue\>read\</AttributeValue\>  
        \</Attribute\>  
        \</Action\>  
        \</Request\>
        ```    

6.  Click on the **Evaluate With PDP** button to complete the process.
    You will receive a response to the authorization request.

  

#### Create request using UI

1.  Sign in. Enter your user name and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console).
2.  Click **Tools** to access the **XACML** menu.
3.  Click **TryIt**.
4.  Fill in the following fields and click the **Create Request**
    button.  

    -   **Multiple Request** - This enables you to evaluate multiple
        requests in order to make multiple decisions on multiple
        actions.
    -   **Return Policy List** - Returns a list of all fully applicable
        policies and policy sets that were used in the decision .
    -   **Resource** - Represents the resource that the user has
        requested to access.
    -   **Subject Name** - Identifies the user who is accessing the
        resources.
    -   **Action Name** - Action the user is trying to perform.
    -   **Environment Name** - Provides additional information to
        evaluate the request, such as the current date and time, etc.

    ![Create request using UI](../../assets/img/using-wso2-identity-server/create-request-using-ui.png)

    Refer to [XACML 2.0/3.0
    specification](http://docs.oasis-open.org/xacml/) for more
    information on XACML authorization requests.

5.  The generated request will appear on the editor. You can further
    edit the request if required.
6.  Click on the **Evaluate With PDP** button to complete the process.
    You will receive a response to the authorization request.
