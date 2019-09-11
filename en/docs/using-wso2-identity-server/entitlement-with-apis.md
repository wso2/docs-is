# Entitlement with APIs

For entitlement management, WSO2 Identity server provides two APIs for
Policy Administration and Policy Evaluation.

The following section guides you on invoking the two admin service and
describes the operations available in the WSO2 Identity Server
Entitlement Mangement APIs.

!!! tip "Before you begin"
    
    As admin services are secured to prevent anonymous invocations, you
    cannot view the WSDL of the admin service by default. Follow the steps
    below to view and invoke it:
    
    1.  Set the `           <HideAdminServiceWSDLs>          ` element to
        `           false          ` in
        `           <IS_HOME>/repository/conf/carbon.xml          ` file.
    
          
    
        ``` xml
        <HideAdminServiceWSDLs>false</HideAdminServiceWSDLs>
        ```
    
    2.  Restart WSO2 Identity Server.
    3.  If you have started the server in default configurations, use the
        following URL in your browser to see the WSDL of the admin service: 
        eg:
        `https://localhost:9443/services/EntitlementService?wsdl`
    
    For more information on WSO2 admin services and how to invoke an admin
    service using either SoapUI or any other client program, see [Calling
    Admin Services](../../using-wso2-identity-server/calling-admin-services).
    

The following section guides you on entitlement management in two
different areas,

## Policy Administration API

Policy administration includes all the actions that should be done to
manage a policy. Such as adding and updating policy/policies, publishing
policies, removing policies etc. For this, WSO2 Carbon Platform has
provided an admin service called **EntitlementPolicyAdminService** to
manage policy administration stuff.

-   You can use the following URL in your browser to see the WSDL of the
    EntitlementPolicyAdminService admin service.       

    ``` java
    https://localhost:9443/services/EntitlementPolicyAdminService?wsdl
    ```

    By using any SoapUI, you can call this admin SOAP service.

      

    !!! note     
        All APIs are secured with basic authentication. Follow the steps
        below to add a basic auth header when calling these methods.
    
        1.  Build a string of the form username:password.
        2.  [Encode the string](https://www.base64encode.org/) you created
            above using Base64.
        3.  Define an authorization header with the term "
            `             Basic_            ` ", followed by the encoded
            string. For example, the basic auth authorization header using
            "admin" as both username and password is as follows:
            <code>Authorization: Basic YWRtaW46YWRtaW4=</code>
    

       

#### Operations included in the EntitlementPolicyAdminService SOAP API

The following commonly used operations are available in the
EntitlementPolicyAdminService.

  

###### addPolicy()

  

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Adds a new policy.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policy</code></pre></td>
<td>The policy that should be registered. The XACML policy should be embedded to the SOAP service as a CDATA.</td>
</tr>
<tr class="even">
<td><pre><code>version</code></pre></td>
<td>Version of the policy.</td>
</tr>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be registered.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.entitlement.identity.carbon.wso2.org/xsd">
        <soapenv:Header/>
        <soapenv:Body>
            <xsd:addPolicy>
                <!--Optional:-->
                <xsd:policyDTO>
                    <!--Optional:-->
                    <xsd1:policy><![CDATA[
                        <Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"  PolicyId="sample_policy_template" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0">
                        <Description>This policy template provides ability to authorize users to a given service provider(defined by SP_NAME) in the authentication flow based on the roles of the user (defined by ROLE_1 and ROLE_2). Users who have at least one of the given roles, will be allowed and any others will be denied.</Description>
                        <Target>
                            <AnyOf>
                                <AllOf>
                                    <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SP_NAME</AttributeValue>
                                    <AttributeDesignator AttributeId="http://wso2.org/identity/sp/sp-name" Category="http://wso2.org/identity/sp" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator>
                                    </Match>
                                </AllOf>
                            </AnyOf>
                        </Target>
                        <Rule Effect="Permit" RuleId="permit_by_roles">
                            <Condition>
                                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:or">
                                    <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
                                    <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">ROLE_1_1_1</AttributeValue>
                                    <AttributeDesignator AttributeId="http://wso2.org/claims/role" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                                    </Apply>
                                </Apply>
                            </Condition>
                        </Rule>
                        <Rule Effect="Deny" RuleId="deny_others"></Rule>
                        </Policy>       
                        ]]>
                    </xsd1:policy>
                    <!--Optional:-->
                    <xsd1:version>1.0</xsd1:version>
                    <xsd1:policyId>sample_policy_template</xsd1:policyId>
                </xsd:policyDTO>
            </xsd:addPolicy>
        </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
        ```
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Body>
            <ns:addPolicyResponse xmlns:ns="http://org.apache.axis2/xsd">
                <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
            </ns:addPolicyResponse>
        </soapenv:Body>
        </soapenv:Envelope>
        ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

###### getAllPolicyIds()   

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieve all policy names or policy Ids.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><p>None</p>
<p><br />
</p></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getAllPolicyIds>   
        </xsd:getAllPolicyIds>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getAllPolicyIdsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2340="http://dto.entitlement.identity.carbon.wso2.org/xsd" xmlns:ax2338="http://entitlement.identity.carbon.wso2.org/xsd">
            <ns:return>authn_role_based_policy_template</ns:return>
            <ns:return>authn_scope_based_policy_template</ns:return>
            <ns:return>authn_time_and_role_based_policy_template</ns:return>
            <ns:return>authn_time_and_scope_based_policy_template</ns:return>
            <ns:return>authn_time_and_user_claim_based_policy_template</ns:return>
            <ns:return>authn_time_and_user_store_based_policy_template</ns:return>
            <ns:return>authn_time_based_policy_template</ns:return>
            <ns:return>authn_user_claim_based_policy_template</ns:return>
            <ns:return>authn_user_store_based_policy_template</ns:return>
            <ns:return>provisioning_role_based_policy</ns:return>
            <ns:return>provisioning_role_based_policy_template</ns:return>
            <ns:return>provisioning_time_and_role_based_policy_template</ns:return>
            <ns:return>provisioning_time_and_user_claim_based_policy_template</ns:return>
            <ns:return>provisioning_time_based_policy_template</ns:return>
            <ns:return>provisioning_user_claim_based_policy_template</ns:return>
            <ns:return>samplePolicy</ns:return>
            <ns:return>samplePolicy1</ns:return>
            <ns:return>samplepolicy_template</ns:return>
        </ns:getAllPolicyIdsResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

  

###### getPolicy()

  

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Retrieve a pre-defined policy.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that is registered.</td>
</tr>
<tr class="even">
<td><pre><code>isPDPPolicy</code></pre></td>
<td>A boolean which tells whether the policy is published to PDP or not.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getPolicy>
            <!--Optional:-->
            <xsd:policyId>authn_time_and_user_claim_based_policy_template</xsd:policyId>
            <!--Optional:-->
            <xsd:isPDPPolicy>false</xsd:isPDPPolicy>
        </xsd:getPolicy>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getPolicyResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:type="ax2340:PolicyDTO" xmlns:ax2340="http://dto.entitlement.identity.carbon.wso2.org/xsd" xmlns:ax2338="http://entitlement.identity.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2340:active>true</ax2340:active>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#string</ax2340:attributeDataType>
                <ax2340:attributeId>http://wso2.org/identity/sp/sp-name</ax2340:attributeId>
                <ax2340:attributeValue>SP_NAME</ax2340:attributeValue>
                <ax2340:category>http://wso2.org/identity/sp</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#string</ax2340:attributeDataType>
                <ax2340:attributeId>http://wso2.org/identity/identity-action/action-name</ax2340:attributeId>
                <ax2340:attributeValue>authenticate</ax2340:attributeValue>
                <ax2340:category>http://wso2.org/identity/identity-action</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#time</ax2340:attributeDataType>
                <ax2340:attributeId>urn:oasis:names:tc:xacml:1.0:environment:current-time</ax2340:attributeId>
                <ax2340:attributeValue>09:00:00</ax2340:attributeValue>
                <ax2340:category>urn:oasis:names:tc:xacml:3.0:attribute-category:environment</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#time</ax2340:attributeDataType>
                <ax2340:attributeId>urn:oasis:names:tc:xacml:1.0:environment:current-time</ax2340:attributeId>
                <ax2340:attributeValue>17:00:00</ax2340:attributeValue>
                <ax2340:category>urn:oasis:names:tc:xacml:3.0:attribute-category:environment</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#string</ax2340:attributeDataType>
                <ax2340:attributeId>CLAIM_URI_1</ax2340:attributeId>
                <ax2340:attributeValue>CLAIM_VALUE_1</ax2340:attributeValue>
                <ax2340:category>urn:oasis:names:tc:xacml:3.0:attribute-category:resource</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:attributeDTOs xsi:type="ax2340:AttributeDTO">
                <ax2340:attributeDataType>http://www.w3.org/2001/XMLSchema#string</ax2340:attributeDataType>
                <ax2340:attributeId>CLAIM_URI_2</ax2340:attributeId>
                <ax2340:attributeValue>CLAIM_VALUE_2</ax2340:attributeValue>
                <ax2340:category>urn:oasis:names:tc:xacml:3.0:attribute-category:resource</ax2340:category>
                </ax2340:attributeDTOs>
                <ax2340:lastModifiedTime>1508817592043</ax2340:lastModifiedTime>
                <ax2340:lastModifiedUser xsi:nil="true"/>
                <ax2340:policy><![CDATA[<Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"  PolicyId="authn_time_and_user_claim_based_policy_template" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0"><Description>This template policy provides ability to authorize users to a given service provider(defined by SP_NAME) in the authentication flow based on the claim values of the user (CLAIM_URI_1=CLAIM_VALUE_1 and CLAIM_URI_2=CLAIM_VALUE_2) and the time of the day (eg. between 09:00:00 to 17:00:00). Users with the given claim values and who are logged in within the given time range will be allowed and any other users will be denied.</Description><Target><AnyOf><AllOf><Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal"><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SP_NAME</AttributeValue><AttributeDesignator AttributeId="http://wso2.org/identity/sp/sp-name" Category="http://wso2.org/identity/sp" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator></Match><Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal"><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">authenticate</AttributeValue><AttributeDesignator AttributeId="http://wso2.org/identity/identity-action/action-name" Category="http://wso2.org/identity/identity-action" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator></Match></AllOf></AnyOf></Target><Rule Effect="Permit" RuleId="permit_by_claims_and_time"><Condition><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:and"><Apply FunctionId="urn:oasis:names:tc:xacml:2.0:function:time-in-range"><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:time-one-and-only"><AttributeDesignator AttributeId="urn:oasis:names:tc:xacml:1.0:environment:current-time" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:environment" DataType="http://www.w3.org/2001/XMLSchema#time" MustBePresent="true"></AttributeDesignator></Apply><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#time">09:00:00</AttributeValue><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#time">17:00:00</AttributeValue></Apply><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-equal"><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-one-and-only"><AttributeDesignator AttributeId="CLAIM_URI_1" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator></Apply><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">CLAIM_VALUE_1</AttributeValue></Apply><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-equal"><Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-one-and-only"><AttributeDesignator AttributeId="CLAIM_URI_2" Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator></Apply><AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">CLAIM_VALUE_2</AttributeValue></Apply></Apply></Condition></Rule><Rule Effect="Deny" RuleId="deny_others"></Rule></Policy>]]></ax2340:policy>
                <ax2340:policyEditor xsi:nil="true"/>
                <ax2340:policyId>authn_time_and_user_claim_based_policy_template</ax2340:policyId>
                <ax2340:policyOrder>12</ax2340:policyOrder>
                <ax2340:policyType>Policy</ax2340:policyType>
                <ax2340:promote>false</ax2340:promote>
                <ax2340:version>1</ax2340:version>
            </ns:return>
        </ns:getPolicyResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

  

###### getPolicyVersions()   

<table>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get the version of a given policy.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name is registered.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getPolicyVersions>
            <!--Optional:-->
            <xsd:policyId>authn_time_and_user_claim_based_policy_template</xsd:policyId>
        </xsd:getPolicyVersions>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<td>Responae</td>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getPolicyVersionsResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2340="http://dto.entitlement.identity.carbon.wso2.org/xsd" xmlns:ax2338="http://entitlement.identity.carbon.wso2.org/xsd">
            <ns:return>1</ns:return>
        </ns:getPolicyVersionsResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

###### getPublisherModuleData()   

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get the details of the publisher</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><p>None</p></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getPublisherModuleData/>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getPublisherModuleDataResponse xmlns:ns="http://org.apache.axis2/xsd" xmlns:ax2340="http://dto.entitlement.identity.carbon.wso2.org/xsd" xmlns:ax2338="http://entitlement.identity.carbon.wso2.org/xsd">
            <ns:return xsi:type="ax2340:PublisherDataHolder" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2340:moduleName>Carbon Basic Auth Policy Publisher Module</ax2340:moduleName>
                <ax2340:propertyDTOs xsi:type="ax2340:PublisherPropertyDTO">
                <ax2340:displayName>Subscriber Password</ax2340:displayName>
                <ax2340:displayOrder>3</ax2340:displayOrder>
                <ax2340:id>subscriberPassword</ax2340:id>
                <ax2340:module>Carbon Basic Auth Policy Publisher Module</ax2340:module>
                <ax2340:required>true</ax2340:required>
                <ax2340:secret>true</ax2340:secret>
                <ax2340:value xsi:nil="true"/>
                </ax2340:propertyDTOs>
                <ax2340:propertyDTOs xsi:type="ax2340:PublisherPropertyDTO">
                <ax2340:displayName>Subscriber URL</ax2340:displayName>
                <ax2340:displayOrder>1</ax2340:displayOrder>
                <ax2340:id>subscriberURL</ax2340:id>
                <ax2340:module>Carbon Basic Auth Policy Publisher Module</ax2340:module>
                <ax2340:required>true</ax2340:required>
                <ax2340:secret>false</ax2340:secret>
                <ax2340:value xsi:nil="true"/>
                </ax2340:propertyDTOs>
                <ax2340:propertyDTOs xsi:type="ax2340:PublisherPropertyDTO">
                <ax2340:displayName>Subscriber User Name</ax2340:displayName>
                <ax2340:displayOrder>2</ax2340:displayOrder>
                <ax2340:id>subscriberUserName</ax2340:id>
                <ax2340:module>Carbon Basic Auth Policy Publisher Module</ax2340:module>
                <ax2340:required>true</ax2340:required>
                <ax2340:secret>false</ax2340:secret>
                <ax2340:value xsi:nil="true"/>
                </ax2340:propertyDTOs>
                <ax2340:propertyDTOs xsi:type="ax2340:PublisherPropertyDTO">
                <ax2340:displayName>Subscriber Id</ax2340:displayName>
                <ax2340:displayOrder>0</ax2340:displayOrder>
                <ax2340:id>subscriberId</ax2340:id>
                <ax2340:module>Carbon Basic Auth Policy Publisher Module</ax2340:module>
                <ax2340:required>true</ax2340:required>
                <ax2340:secret>false</ax2340:secret>
                <ax2340:value xsi:nil="true"/>
                </ax2340:propertyDTOs>
            </ns:return>
        </ns:getPublisherModuleDataResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

###### publishToPDP()   

<table style="width:100%;">
<colgroup>
<col style="width: 7%" />
<col style="width: 92%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Publish a policy to PDP</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be published to PDP.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:publishToPDP>
            <!--Zero or more repetitions:-->
            <xsd:policyIds>provisioning_user_claim_based_policy_template</xsd:policyIds>
            <!--Optional:-->
            <xsd:version>1</xsd:version>
            <!--Optional:-->
            <xsd:enabled>false</xsd:enabled>
            <!--Optional:-->
            <xsd:order>30</xsd:order>
        </xsd:publishToPDP>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:publishToPDPResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
        </ns:publishToPDPResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

###### removePolicy()   

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Remove policy from PDP</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be removed.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:removePolicy>
            <!--Optional:-->
            <xsd:policyId>authn_role_based_policy_template</xsd:policyId>
            <!--Optional:-->
            <xsd:dePromote>true</xsd:dePromote>
        </xsd:removePolicy>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:removePolicyResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
        </ns:removePolicyResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details> 
</div></td>
</tr>
</tbody>
</table>

###### updatePolicy()   

<table style="width:100%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 94%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Publish a policy to PDP</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>policyId</code></pre></td>
<td>The policy name that should be published to PDP.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.entitlement.identity.carbon.wso2.org/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:updatePolicy>
            <!--Optional:-->
            <xsd:policyDTO>
            
                <!--Optional:-->
                <xsd1:policy>
                <![CDATA[
                    <Policy xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"  PolicyId="samplepolicy_template" RuleCombiningAlgId="urn:oasis:names:tc:xacml:1.0:rule-combining-algorithm:first-applicable" Version="1.0">
                    <Description>This policy template provides ability to authorize users to a given service provider(defined by SP_NAME) in the authentication flow based on the roles of the user (defined by ROLE_1 and ROLE_2). Users who have at least one of the given roles, will be allowed and any others will be denied.</Description>
                    <Target>
                        <AnyOf>
                            <AllOf>
                                <Match MatchId="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">SP_NAME</AttributeValue>
                                <AttributeDesignator AttributeId="http://wso2.org/identity/sp/sp-name" Category="http://wso2.org/identity/sp" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="false"></AttributeDesignator>
                                </Match>
                            </AllOf>
                        </AnyOf>
                    </Target>
                    <Rule Effect="Permit" RuleId="permit_by_roles">
                        <Condition>
                            <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:or">
                                <Apply FunctionId="urn:oasis:names:tc:xacml:1.0:function:string-is-in">
                                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">myName</AttributeValue>
                                <AttributeDesignator AttributeId="http://wso2.org/claims/role" Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" DataType="http://www.w3.org/2001/XMLSchema#string" MustBePresent="true"></AttributeDesignator>
                                </Apply>
                            </Apply>
                        </Condition>
                    </Rule>
                    <Rule Effect="Deny" RuleId="deny_others"></Rule>
                    </Policy>       
                    ]]>
                </xsd1:policy>
            
                <xsd1:policyEditorData>?</xsd1:policyEditorData>
                <!--Optional:-->
                <xsd1:policyId>samplepolicy_template</xsd1:policyId>
            
            </xsd:policyDTO>
        </xsd:updatePolicy>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:updatePolicyResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
        </ns:updatePolicyResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

!!! info 
    There is no REST API available for the policy management.

##  Policy Evaluation API

Policy evaluation includes all the actions that should be done during
the policy evaluation such as getting the decision, getting all
entitlement attributes, etc. For this, WSO2 Carbon Platform has provided
an admin service called **EntitlementService** to evaluate a policy.

-   You can use the following URL in your browser to see the WSDL of the
    **EntitlementService** admin service.       

    ``` java
    https://localhost:9443/services/EntitlementService?wsdl
    ```

    By using any SoapUI, you can call this admin SOAP service.

      

    !!! note 
    
        All the APIs are secured with basic authentication. Follow the steps
        below to add a basic auth header when calling these methods.
    
        1.  Build a string of the form username:password.
        2.  [Encode the string](https://www.base64encode.org/) you created
            above using Base64.
        3.  Define an authorization header with the term "
            `             Basic_            ` ", followed by the encoded
            string. For example, the basic auth authorization header using
            "admin" as both username and password is as follows:    
            <code> Authorization: Basic YWRtaW46YWRtaW4= </code>     

      
     

#### Operations included in **EntitlementService SOAP** API

  

!!! tip "Before you begin"
    
    In order to try this EntitlementService using SOAP UI, You need to
    publish a Policy to the PDP. For this, you can use
    EntitlementPolicyAdminService or management console UI.
    
    We use the following sample policy to evaluate using EntitlementService
    admin service.
    
    ``` java
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
    


The following commonly used operations are available in the
EntitlementPolicyAdminService. A sample SOAP request and response will
be available with each of the operation.   

  

###### getDecision()   

<table style="width:100%;">
<colgroup>
<col style="width: 9%" />
<col style="width: 90%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get the decision after evaluating the request with the policy.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>request</code></pre></td>
<td>The XML request to be evaluated as a CDATA</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getDecision>
            <!--Optional:-->
            <xsd:request><![CDATA[
            <Request CombinedDecision="false" ReturnPolicyIdList="false" xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17">
    <Attributes Category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject">
        <Attribute IncludeInResult="false" AttributeId="urn:oasis:names:tc:xacml:1.0:subject:subject-id">
            <AttributeValue DataType="urn:oasis:names:tc:xacml:1.0:data-type:rfc822Name">bs@simpsons.com</AttributeValue>
        </Attribute>
    </Attributes>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:action">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:action:action-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">read</AttributeValue>
            </Attribute>
        </Attributes>
        <Attributes Category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource">
            <Attribute AttributeId="urn:oasis:names:tc:xacml:1.0:resource:resource-id" IncludeInResult="false">
                <AttributeValue DataType="http://www.w3.org/2001/XMLSchema#string">http://127.0.0.1/service/very_secure/ </AttributeValue>
            </Attribute>
        </Attributes>
    </Request>
            ]]></xsd:request>
        </xsd:getDecision>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getDecisionResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return><![CDATA[<Response xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"><Result><Decision>Permit</Decision><Status><StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/></Status></Result></Response>]]></ns:return>
        </ns:getDecisionResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

  

  

###### getBooleanDecision()   

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 85%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get the decision after evaluating the request with the policy published in a boolean format.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>subject</code></pre></td>
<td>The subject/user who is using the resource.</td>
</tr>
<tr class="even">
<td><pre style="white-space: pre-wrap;"><code>resource</code></pre></td>
<td>The resource which is accessed by the user.</td>
</tr>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>action</code></pre></td>
<td>The action performed by the user.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getBooleanDecision>
            <!--Optional:-->
            <xsd:subject>admin</xsd:subject>
            <!--Optional:-->
            <xsd:resource>http://127.0.0.1/service/very_secure/</xsd:resource>
            <!--Optional:-->
            <xsd:action>read</xsd:action>
        </xsd:getBooleanDecision>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getBooleanDecisionResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return>true</ns:return>
        </ns:getBooleanDecisionResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

  

  

###### getDecisionByAttributes()   

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 87%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get the decision by evaluating attributes with the policy.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><h6 id="EntitlementwithAPIs-Parameter">Parameter</h6></th>
<th><h6 id="EntitlementwithAPIs-Description">Description</h6></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre style="white-space: pre-wrap;"><code>subject</code></pre></td>
<td><h6 id="EntitlementwithAPIs-Thesubject/userwhoisusingtheresource.">The subject/user who is using the resource.</h6></td>
</tr>
<tr class="even">
<td><h6 id="EntitlementwithAPIs-resource" style="white-space: pre-wrap;">resource</h6></td>
<td><h6 id="EntitlementwithAPIs-Theresourcewhichisaccessedbytheuser.">The resource which is accessed by the user.</h6></td>
</tr>
<tr class="odd">
<td><h6 id="EntitlementwithAPIs-action" style="white-space: pre-wrap;">action</h6></td>
<td><h6 id="EntitlementwithAPIs-Theactionperformedbytheuser.">The action performed by the user.</h6></td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getDecisionByAttributes>
            <!--Optional:-->
            <xsd:subject>admin</xsd:subject>
            <!--Optional:-->
            <xsd:resource>http://127.0.0.1/service/very_secure/</xsd:resource>
            <!--Optional:-->
            <xsd:action>read</xsd:action>
        </xsd:getDecisionByAttributes>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getDecisionByAttributesResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return><![CDATA[<Response xmlns="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17"><Result><Decision>Permit</Decision><Status><StatusCode Value="urn:oasis:names:tc:xacml:1.0:status:ok"/></Status></Result></Response>]]></ns:return>
        </ns:getDecisionByAttributesResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>

  

###### getEntitledAttributes() 
  

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 87%" />
</colgroup>
<tbody>
<tr class="odd">
<th>Description</th>
<td>Get all the details of the entitled attributes.</td>
</tr>
<tr class="even">
<th>Input Parameters</th>
<td><div class="table-wrap">
<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>subjectName</code></pre></td>
<td>Subject/Username of the subject which access the resource.</td>
</tr>
<tr class="even">
<td><pre><code>resourceName</code></pre></td>
<td>Name of the resource which is accessed by the subject.</td>
</tr>
<tr class="odd">
<td><pre><code>subjectId</code></pre></td>
<td>XACML id of the subject</td>
</tr>
<tr class="even">
<td><pre><code>action</code></pre></td>
<td>Action which is performed by the subject.</td>
</tr>
<tr class="odd">
<td><pre><code>enableChildSearch</code></pre></td>
<td>Enable search over child attributes.</td>
</tr>
</tbody>
</table>
</div></td>
</tr>
<tr class="odd">
<th>Request</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the request</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
    <soapenv:Header/>
    <soapenv:Body>
        <xsd:getEntitledAttributes>
            <!--Optional:-->
            <xsd:subjectName>admin</xsd:subjectName>
            <!--Optional:-->
            <xsd:resourceName>http://127.0.0.1/service/very_secure/</xsd:resourceName>
            <!--Optional:-->
            <xsd:subjectId>urn:oasis:names:tc:xacml:1.0:subject:subject-id</xsd:subjectId>
            <!--Optional:-->
            <xsd:action>read</xsd:action>
            <!--Optional:-->
            <xsd:enableChildSearch>true</xsd:enableChildSearch>
        </xsd:getEntitledAttributes>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
<tr class="even">
<th>Response</th>
<td><div class="content-wrapper">
    <details class="info">
    <summary>click here to see the response</summary>
    <p>
    ```
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
    <soapenv:Body>
        <ns:getEntitledAttributesResponse xmlns:ns="http://org.apache.axis2/xsd">
            <ns:return xsi:type="ax2348:EntitledResultSetDTO" xmlns:ax2346="http://entitlement.identity.carbon.wso2.org/xsd" xmlns:ax2348="http://dto.entitlement.identity.carbon.wso2.org/xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                <ax2348:advanceResult>false</ax2348:advanceResult>
                <ax2348:entitledAttributesDTOs xsi:type="ax2348:EntitledAttributesDTO">
                <ax2348:action>read</ax2348:action>
                <ax2348:allActions>false</ax2348:allActions>
                <ax2348:allResources>true</ax2348:allResources>
                <ax2348:environment xsi:nil="true"/>
                <ax2348:resourceName xsi:nil="true"/>
                </ax2348:entitledAttributesDTOs>
                <ax2348:message xsi:nil="true"/>
                <ax2348:messageType xsi:nil="true"/>
            </ns:return>
        </ns:getEntitledAttributesResponse>
    </soapenv:Body>
    </soapenv:Envelope>
    ```
    </p>
    </details>
</div></td>
</tr>
</tbody>
</table>


!!! info "REST API" 
    WSO2 Identity Server provides a REST API and a REST endpoint for the
    policy evaluation. Please Read more about REST API from
    [here](../../using-wso2-identity-server/entitlement-with-rest-apis). 
  

  
