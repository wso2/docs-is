# Write a Custom Policy Info Point

According to the XACML reference architecture, PIP (Policy Info Point) is the system entity that acts as a source 
of attribute values. Basically if there are missing attributes in the XACML request sent by PEP (Policy Enforcement Point), 
PIP would find them for the PDP (Policy Decision Point) to evaluate the policy.

This topic provides instructions on how to write a simple PIP attribute finder module to plug in to the WSO2 Identity 
Server. There are two ways that you can write a PIP attribute finder module.

1. **By implementing the `PIPAttributeFinder` interface** - You can find the latest interface 
   [here](https://github.com/wso2/carbon-identity/blob/master/components/entitlement/org.wso2.carbon.identity.entitlement/src/main/java/org/wso2/carbon/identity/entitlement/pip/PIPAttributeFinder.java).

2. **By extending the `AbstractPIPAttributeFinder` abstract class** -  You can find the latest abstract class 
   [here](https://github.com/wso2/carbon-identity/blob/master/components/entitlement/org.wso2.carbon.identity.entitlement/src/main/java/org/wso2/carbon/identity/entitlement/pip/AbstractPIPAttributeFinder.java).

Out of the methods mentioned above, it would be easier to extend the `AbstractPIPAttributeFinder` abstract class 
and write a PIP attribute finder module.

---

## Scenario

Permission details of users are stored externally and a PIP attribute finder is developed to retrieve those user 
permission attributes. These attributes can be view, edit, etc. This sample project can be downloaded 
[here](https://github.com/wso2/samples-is/tree/master/xacml/sample-entitlement-service).

### Implement the custom PIP

1. Write a PIP module by extending  `AbstractPIPAttributeFinder`. Download the  `SampleAttributeFinder`  class 
   [here](https://github.com/wso2/samples-is/tree/master/xacml/sample-entitlement-service/src/main/java/org/wso2/carbon/identity/entitlement/samples/service/pip/SampleAttributeFinder.java).
    The following are the methods you need to implement in order to write this module.

    1. **init (Properties properties)** :  Here you can write the logic to initialize your module. Any properties that 
       are defined for the custom module in the deployment.toml can be accessed in this method.

    2. **getAttributeValues (String subject, String resource, String action, String environment, String attributeId, URI issuer)** :
        Here you can write the logic to find your attribute value.
        -   The subject –\> attribute value can be identified by the
            following attribute value in the request:  
            `urn:oasis:names:tc:xacml:1.0:subject:subject-id`
        -   The resource –\> attribute value can be identified by the
            following attribute value in the request:  
            `urn:oasis:names:tc:xacml:1.0:resource:resource-id`
        -   The action –\> attribute value can be identified by the
            following attribute value in the request:  
            `urn:oasis:names:tc:xacml:1.0:action:action-id`
        -   The environment –\> attribute value can be identified by the
            following attribute value in the request:  
            `urn:oasis:names:tc:xacml:1.0:environment:environment-id`
        -   The attributeId –\> attribute id value is defined in the
            policy and must be resolved
        -   The issuer –\> issuer value is related to the attributeId
            and must be resolved

    3. **getSupportedAttributes()** : Here you can define all the attribute IDs supported by your custom module.
       Our sample PIP module will support retrieving permissions of the user and the attribute is given the 
       ID https://sample.com/claims/permission.

    4. **getModuleName()** : The name of the module.

### Deploy the custom PIP

1. When the implementation is done, go to the project home(sample-entitlement-service) and run the command,

    ```
    mvn clean install
    ```
2. Copy the created `org.wso2.carbon.identity.entitlement.samples.service.pip-1.0.0.jar` to the 
   <IS_HOME>/repository/components/lib directory.

3. Add the following configurations to the deployment.toml file located in <IS_HOME>/repository/conf/ 
   folder to register the custom module.

    ```
    [identity.entitlement.policy_point.pip]
    attribute_designators = [
    "org.wso2.carbon.identity.entitlement.pip.DefaultAttributeFinder",
    "org.wso2.carbon.identity.application.authz.xacml.pip.AuthenticationContextAttributePIP",
    "org.wso2.carbon.identity.entitlement.samples.service.pip.SampleAttributeFinder"
    ]
    ```
   
4. If you have properties required by the custom module, you need to add the following configs to the deployment.toml.
   These properties can be accessed in init() method.
    ```
    [[identity.entitlement.extension]]
    name = "org.wso2.carbon.identity.entitlement.samples.service.pip.SampleAttributeFinder"
    [identity.entitlement.extension.properties]
    // You can add required properties here.
    sampleProperty=”property value”
    ```
   
5. Restart the server.

----

## Test the sample PIP module

Use the following steps to check the PIP module.

1. Restart the WSO2 Identity Server and log in to the [management console](TODO:{{base_path}}/setup/getting-started-with-the-management-console).

2. Go to the **Main** menu of the management console and click **Extension** under **PDP**.

3. You can see that PIP attribute finder has been registered successfully and is visible under the **Attribute Finder Extensions** list. You can re-initialize this at run time.

4. To test this attribute finder, you can use [this](https://github.com/wso2/samples-is/tree/master/xacml/sample-entitlement-service/src/main/resources/sample-policy.xml) 
   policy and [this](https://github.com/wso2/samples-is/tree/master/xacml/sample-entitlement-service/src/main/resources/sample-request.xml) request.

5. [Upload the policy](TODO:{{base_path}}/learn/creating-a-xacml-policy) into the WSO2 Identity Server, then publish it to PDP and enable it.

6. You can then [try out the policy with TryIt PEP](TODO:{{base_path}}/administer/using-the-xacml-tryit-tool).

    !!! info "About debugging the sample code"
        This sample code can be debugged by starting the WSO2 Identity
        Server in the debug mode as follows.

        **UNIX** : `  wso2server.sh –debug 5005 `

        **Windows** : `  wso2server.bat –debug 5005 `

        Then you can clearly see how methods in the
        “SampleAttributeFinder” are called by the PDP.
