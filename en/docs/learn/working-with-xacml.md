# Working with XACML

XACML is an XML-based language for access control that has been
standardized by the Technical Committee of the OASIS consortium. XACML
is very popular as a fine grained authorization method among the
community.  Fine-grained authorization specifies the requirements and
variables in an access control policy that is used to authorize access
to a resource. However, there are plenty of other aspects of XACML other
than it being just a fine grained authorization mechanism.

!!! info
    For more information about XACML, see [Access Control and Entitlement
    Management](../../get-started/access-control-and-entitlement-management#introducing-xacml).

We generally uses the HTTPS transport for calling the Web Service API
that has been exposed by the PDP.  With WSO2 Identity Server, we can
also use **Thrift** protocal to communicate with PDP.  It is said that
thrift is more faster than the HTTP.  Therefore we hope that we can get
more performance and less response time by using thrift protocol with
WSO2 Identity Server.

  

!!! note
    
    Using thrift in XACML calls
    
    In order to use thrift in XACML calls, you must first enable the thrift
    service. To do this, set the following property to true in the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.
    
    ``` toml
    [entitlement.thrift] 
    enable=true
    ```
    

The following topics provide information and instructions on how to use
XACML to perform various access control related functions.

-   [Enabling REST Notifications For XACML Policy
    Updates](../../learn/enabling-rest-notifications-for-xacml-policy-updates)
-   [Identity Server as a XACML
    Engine](../../learn/identity-server-as-an-xacml-engine)
-   [Working with XACML Multiple Decision Profile
    Requests](../../learn/working-with-xacml-multiple-decision-profile-requests)
-   [Fine-grained Authorization using XACML Requests in JSON
    Format](../../learn/fine-grained-authorization-using-xacml-requests-in-json-format)
-   [Improving XACML PDP Performance with Caching
    Techniques](../../learn/improving-xacml-pdp-performance-with-caching-techniques)
-   [Integrating WSO2 Identity Server with
    Liferay](../../learn/integrating-wso2-identity-server-with-liferay)
-   [Writing XACML2.0 Policies in WSO2 Identity
    Server](../../learn/writing-xacml2.0-policies-in-wso2-identity-server)
-   [Writing XACML3 Policies in WSO2 Identity
    Server](../../learn/introduction-to-xacml-3.0-policies)
-   [Sending Notifications to External PEP
    Endpoints](../../learn/sending-notifications-to-external-pep-endpoints)
-   [Writing a XACML 3.0 Policy Using
    XPath](../../learn/writing-a-xacml-3.0-policy-using-xpath)
