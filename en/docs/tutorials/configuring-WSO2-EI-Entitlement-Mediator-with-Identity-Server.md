# Configuring WSO2 EI Entitlement Mediator with Identity Server

With the latest WSO2 Enterprise Integrator (EI), you can add
fine-grained XACML authorization for proxy services, using the
[entitlement
mediator](http://docs.wso2.com/enterprise-integrator/Entitlement+Mediator)
. XACML-based authorization allows you to have an extremely flexible way
of defining the rules of accessing resources based on the user, the
user's role, the environment, time and date, etc. Now, the WSO2 product
platform allows you to incorporate XACML based authorization into your
SOA deployment with the WSO2 Identity Server.

The problem in most security schemes is that it does not give you the
ability to fine-grain your authorization scheme unless a substantial
amount of work goes into implementing such a scheme from scratch. The
WSO2 product platform relieves this burden on the system architect and
allows you to integrate XACML-based authorization into a deployment and
have a full blown authorization scheme in place with minimum effort.

For more information about the WSO2 EI, please visit the [WSO2
Enterprise Integrator
Documentation](http://docs.wso2.com/enterprise-integrator).

The following sections provide more information on how to configure
this.

-   [Configure Identity Server as an XACML
    Engine](#ConfiguringWSO2EIEntitlementMediatorwithIdentityServer-ConfigureIdentityServerasanXACMLEngine)
-   [Configuring the EI entitlement
    mediator](#ConfiguringWSO2EIEntitlementMediatorwithIdentityServer-ConfiguringtheEIentitlementmediator)

### Configure Identity Server as an XACML Engine

The first step is to configure the WSO2 Identity Server to act as a
XACML engine. XACML support for fine-grained authorization comes with
WSO2 Identity Server. For this, configure your Identity Server as a
XACML engine as explained in [Identity Server as an XACML
Engine](_Identity_Server_as_an_XACML_Engine_).

### Configuring the EI entitlement mediator

The next step is to configure the entitlement mediator in the WSO2 EI.

1.  Create a Proxy Service. Under "In Sequence," create an Anonymous
    sequence to include the Entitlement, Header, and Send mediators. Add
    the Advanced/Entitlement Mediator to `          InSequence         `
    . See [Adding a Proxy
    Service](http://docs.wso2.com/enterprise-integrator/Adding+a+Proxy+Service)
    . The Entitlement Server should be the endpoint for the Identity
    Server where the entitlement engine is running
    `          https://IDENTITY_SERVER:PORT/services/         ` .
    Additionally, the user should have the login and "manage
    configuration" permissions in the Identity Server.
2.  Add the Transform/Header mediator. See [Adding a Mediator to a
    Sequence](http://docs.wso2.com/enterprise-integrator/Adding+a+Mediation+Sequence)
    and
    [Mediators](http://docs.wso2.com/enterprise-integrator/Mediators).
    Remove the "Security" header. Click on the "Namespaces" link to set
    the namespace as " `          wsse"         ` .  
    -   **Prefix** - wsse.
    -   **URI** -
        <http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd>
        .
3.  Create a Core/Send mediator, and save to return to the main flow.
4.  Add a Core/Send mediator to the "Out Sequence" as an "Anonymous"
    sequence, and save to return to the main flow to complete the
    creation of the Proxy Service.
5.  Apply the `          UsernameToken         ` security policy to the
    Proxy Service you just created as mentioned
    [here.](https://docs.wso2.com/display/EI611/Security+Implementation#SecurityImplementation-1.UsernameToken)
    The security policy is applied to the binding by the policy editor
    causes an issue with Proxy Services that must be resolved. To
    overcome the Proxy Services issue, from the service listing, select
    the Proxy Service, and then select "Policies." Remove the applied
    policies from the Binding Hierarchy, and add the security policy to
    the Service Hierarchy.
6.  You are ready to use the Proxy Service. Write a client to invoke the
    secured Proxy Service.

The client in the following example has tried to invoke the echo service
deployed in WSO2 EI through the previously created Proxy Service.

``` java
package org.apache.ws.axis2;
    import org.apache.axiom.om.OMAbstractFactory;
    import org.apache.axiom.om.OMElement;
    import org.apache.axiom.om.OMFactory;
    import org.apache.axiom.om.OMNamespace;
    import org.apache.axiom.om.impl.builder.StAXOMBuilder;
    import org.apache.axis2.Constants;
    import org.apache.axis2.addressing.EndpointReference;
    import org.apache.axis2.client.Options;
    import org.apache.axis2.client.ServiceClient;
    import org.apache.axis2.context.ConfigurationContext;
    import org.apache.axis2.context.ConfigurationContextFactory;
    import org.apache.neethi.Policy;
    import org.apache.neethi.PolicyEngine;
    import org.apache.rampart.RampartMessageData;

    public class TestClient {

    final static String ADDR_URL = "http://192.168.1.2:8280/services/echo";
    final static String TRANS_URL = "https://192.168.1.2:8243/services/test";

    public static void main(String[] args) throws Exception {
    ServiceClient client = null;
    Options options = null;
    OMElement response = null;
    ConfigurationContext context = null;
    String trustStore = null;

    // You need to import the EIs public certificate to this key store.
    trustStore = "mykeystore.jks";
    // We are accessing EI over HTTPS - so need to set trustStore parameters.
    System.setProperty("javax.net.ssl.trustStore", trustStore);
    // Password of mykeystore.jks
    System.setProperty("javax.net.ssl.trustStorePassword", "wso2carbon");

    // Create configuration context - you will have Rampart module engaged in the client.axis2.xml
    context = ConfigurationContextFactory.createConfigurationContextFromFileSystem("repo","repo/conf/client.axis2.xml");

    // This is the security policy of the proxy service applied UT.
    StAXOMBuilder builder = new StAXOMBuilder("policy.xml");
    Policy policy = PolicyEngine.getPolicy(builder.getDocumentElement());

    context = ConfigurationContextFactory.createConfigurationContextFromFileSystem("repo","repo/conf/client.axis2.xml");
    client = new ServiceClient(context, null);
    options = new Options();
    options.setAction("urn:echoString");
    // This is the addressing URL pointing to the echo service deployed in EI
    options.setTo(new EndpointReference(ADDR_URL));
    // To the EI, the proxy service
    options.setUserName("admin");
    options.setPassword("admin");
    // TRANS_URL points to proxy service
    options.setProperty(Constants.Configuration.TRANSPORT_URL, TRANS_URL);
    options.setProperty(RampartMessageData.KEY_RAMPART_POLICY, policy);
    client.setOptions(options);
    client.engageModule("addressing");
    client.engageModule("rampart");
    response = client.sendReceive(getPayload("Hello world"));
    System.out.println(response);
    }

    private static OMElement getPayload(String value) {
    OMFactory factory = null;
    OMNamespace ns = null;
    OMElement elem = null;
    OMElement childElem = null;

    factory = OMAbstractFactory.getOMFactory();
    ns = factory.createOMNamespace("http://echo.services.core.carbon.wso2.org", "ns1");
    elem = factory.createOMElement("echoString", ns);
    childElem = factory.createOMElement("in", null);
    childElem.setText(value);
    elem.addChild(childElem);
    return elem;
    }
    }
```
