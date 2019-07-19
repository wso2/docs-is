# Working with XACML

XACML is an XML-based language for access control that has been
standardized by the Technical Committee of the OASIS consortium. XACML
is very popular as a fine grained authorization method among the
community.  Fine-grained authorization specifies the requirements and
variables in an access control policy that is used to authorize access
to a resource. However, there are plenty of other aspects of XACML other
than it being just a fine grained authorization mechanism.

For more information about XACML, see [Access Control and Entitlement
Management](Access-Control-and-Entitlement-Management_103329208.html#AccessControlandEntitlementManagement-IntroducingXACML)
.

We generally uses the HTTPS transport for calling the Web Service API
that has been exposed by the PDP.  With WSO2 Identity Server, we can
also use **Thrift** protocal to communicate with PDP.  It is said that
thrift is more faster than the HTTP.  Therefore we hope that we can get
more performance and less response time by using thrift protocol with
WSO2 Identity Server.

  

!!! note
    
    Using thrift in XACML calls
    
    In order to use thrift in XACML calls, you must first enable the thrift
    service in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file.
    Set this to `         true        ` .
    
    ``` xml
    <Server xmlns="http://wso2.org/projects/carbon/carbon.xml">
        ...
        <EntitlementSettings>
            ...
            <ThirftBasedEntitlementConfig>
                <EnableThriftService>true</EnableThriftService>
                ...
            </ThirftBasedEntitlementConfig>
        </EntitlementSettings>
    </Server>
    ```
    

The following topics provide information and instructions on how to use
XACML to perform various access control related functions.

-   [Configuring WSO2 EI Entitlement Mediator with Identity
    Server](_Configuring_WSO2_EI_Entitlement_Mediator_with_Identity_Server_)
-   [Enabling REST Notifications For XACML Policy
    Updates](_Enabling_REST_Notifications_For_XACML_Policy_Updates_)
-   [Identity Server as an XACML
    Engine](_Identity_Server_as_an_XACML_Engine_)
-   [Working with XACML Multiple Decision Profile
    Requests](_Working_with_XACML_Multiple_Decision_Profile_Requests_)
-   [Fine-grained Authorization using XACML Requests in JSON
    Format](_Fine-grained_Authorization_using_XACML_Requests_in_JSON_Format_)
-   [Improving XACML PDP Performance with Caching
    Techniques](_Improving_XACML_PDP_Performance_with_Caching_Techniques_)
-   [Integrating WSO2 Identity Server with
    Liferay](_Integrating_WSO2_Identity_Server_with_Liferay_)
-   [Writing XACML2.0 Policies in WSO2 Identity
    Server](_Writing_XACML2.0_Policies_in_WSO2_Identity_Server_)
-   [Writing XACML3 Policies in WSO2 Identity
    Server](_Writing_XACML3_Policies_in_WSO2_Identity_Server_)
-   [Sending Notifications to External PEP
    Endpoints](_Sending_Notifications_to_External_PEP_Endpoints_)
-   [Writing an XACML 3.0 Policy Using
    XPath](_Writing_an_XACML_3.0_Policy_Using_XPath_)
