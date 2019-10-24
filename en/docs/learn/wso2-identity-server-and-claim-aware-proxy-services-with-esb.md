# WSO2 Identity Server and Claim Aware Proxy Services with ESB

You can learn more about the WSO2 ESB from the [WSO2 Enterprise Service
Bus
documentation](https://docs.wso2.com/display/ESB451/Enterprise+Service+Bus+Documentation)
.

### Scenario

Consider the following scenario:

A proxy service created in the WSO2 ESB requires a security token issued
by the WSO2 Identity Server (IS) for authentication. At the same time,
the security policy of the proxy service specifies that it requires a
given set of claim values with the security token. The WSO2 Identity
Server is connected to an LDAP user store, and all user attributes
reside there. The user needs to authenticate via WSO2 IS first and
obtain the security token with claims. The user then needs to send it to
the WSO2 ESB Proxy Service.

``` xml
<sp:RequestSecurityTokenTemplate xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust">
    <t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>
    <t:KeyType>http://schemas.xmlsoap.org/ws/2005/02/trust/SymmetricKey</t:KeyType>
    <t:KeySize>256</t:KeySize>
    <t:Claims Dialect="http://wso2.org/claims" xmlns:ic="http://schemas.xmlsoap.org/ws/2005/05/identity">
        <ic:ClaimType Uri="http://wso2.org/claims/givenname" />
    </t:Claims>
</sp:RequestSecurityTokenTemplate>
```

Follow the instructions below to achieve this.

1.  Set up the LDAP server. Find instructions
    [here](http://blog.facilelogin.com/2009/04/setting-apache-directory-studio-as-ldap.html)
    .
2.  Configure WSO2 Identity Server to communicate with the LDAP Server
    and do the claim mapping.
3.  Configure WSO2 Identity Server STS.
    [This](https://docs.wso2.com/display/IS510/Configuring+WS-Trust+STS)
    resource explains the steps you need to take.  
    1.  Get the public certificate (
        `            wso2carbon.cert.cert)           ` of the ESB.
    2.  Login to the Identity Server as an admin, and click on **Add**
        under **Keystores** in the **Main** tab.  Import the above
        certificate to `             wso2carbon.jks.            `

        WSO2 ESB and Identity Server use two different key stores.

    3.  Select `            wso2carbon.cert           ` as the
        **Certificate Alias** when adding the trusted **Endpoint
        Address**.
    4.  When applying the security policy to the STS, make sure you
        select the group that LDAP users ("ldapuserole") belong to.

4.  Create and apply security for the proxy service. To do this, follow
    the steps found
    [here](http://blog.facilelogin.com/2009/05/accessing-proxy-services-in-wso2-esb.html)
    . However, you should use a different security policy (
    `          service.policy.xml)         ` when you are overriding.

### The client code

You may also need to download Java Cryptography Extension (JCE)
Unlimited Strength Jurisdiction Policy Files 5.0 from
[here](http://www.oracle.com/technetwork/java/archive-139210.html), and
copy the two .jar files from the extracted `         jce        `
directory ( `         local_policy.jar        ` and
`         US_export_policy.jar        ` ) to
`         $JAVA_HOME/jre/lib/security        ` . For JDK 6, it is found
[here](https://www.oracle.com/technetwork/java/javase/downloads/index.html).

-   Perform the above actions on both the client side as well as on the
    server side if you are running it on two machines.
-   While running the client code, make sure the [bouncycastle.jar](../../assets/attachments/bcprov-jdk15-132.jar) file
    is in the `           classpath          ` .

A sample of the code can be seen below.

``` java
package org.apache.ws.axis2;

import java.util.Properties;
import javax.xml.namespace.QName;
import org.apache.axiom.om.OMAbstractFactory;
import org.apache.axiom.om.OMElement;
import org.apache.axiom.om.OMFactory;
import org.apache.axiom.om.OMNamespace;
import org.apache.axiom.om.impl.builder.StAXOMBuilder;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.client.ServiceClient;
import org.apache.axis2.context.ConfigurationContext;
import org.apache.axis2.context.ConfigurationContextFactory;
import org.apache.neethi.Policy;
import org.apache.neethi.PolicyEngine;
import org.apache.rahas.RahasConstants;
import org.apache.rahas.Token;
import org.apache.rahas.TokenStorage;
import org.apache.rahas.TrustUtil;
import org.apache.rahas.client.STSClient;
import org.apache.rampart.RampartMessageData;
import org.apache.rampart.policy.model.RampartConfig;
import org.apache.rampart.policy.model.CryptoConfig;
import org.apache.ws.secpolicy.Constants;
import org.opensaml.XML;
 
public class IdentitySTSClient {
    /**
     * @param args
     */
    final static String RELYING_PARTY_SERVICE_EPR = "http://localhost:8280/services/echo";
    final static String ESB_TRANS_EPR = "http://localhost:8280/services/test";
    final static String STS_EPR = "https://localhost:9443/services/wso2carbon-sts";
    /**
     * @param args
     * @throws Exception
     */

    public static void main(String[] args) throws Exception {
        ConfigurationContext confContext = null;
        Policy stsPolicy = null;
        STSClient stsClient = null;
        Policy servicePolicy = null;
        Token responseToken = null;
        String trustStore = null;
        // You need to import the Identity Server, public certificate to this key store.
        // By default it's there - if you use wso2carbon.jks from [ESB_HOME]\resources\security
        trustStore = "wso2carbon.jks";
        // We are accessing STS over HTTPS - so need to set trustStore parameters.
        System.setProperty("javax.net.ssl.trustStore", trustStore);
        System.setProperty("javax.net.ssl.trustStorePassword", "wso2carbon");
        // Create configuration context - you will have Rampart module engaged in the
        // client.axis2.xml
        confContext = ConfigurationContextFactory.createConfigurationContextFromFileSystem("repo",
            "repo/conf/client.axis2.xml");
        stsClient = new STSClient(confContext);
        stsClient.setRstTemplate(getRSTTemplate());
        stsClient.setAction(RahasConstants.WST_NS_05_02 + RahasConstants.RST_ACTION_SCT);
        // This is the security policy we applied to Identity Server STS.
        // You can see it by https://[IDENTITY_SERVER]/services/wso2carbon-sts?wsdl
        stsPolicy = loadSTSPolicy("sts.policy.xml");
        // This is the security of the relying party web service.
        // This policy will accept a security token issued from Identity Server STS
        servicePolicy = loadServicePolicy("service.policy.xml");
        responseToken = stsClient.requestSecurityToken(servicePolicy, STS_EPR, stsPolicy,
            RELYING_PARTY_SERVICE_EPR);
        System.out.println(responseToken.getToken());
        TokenStorage store = TrustUtil.getTokenStore(confContext);
        store.add(responseToken);
        ServiceClient client = new ServiceClient(confContext, null);
        Options options = new Options();
        options.setAction("urn:echoString");
        options.setTo(new EndpointReference(RELYING_PARTY_SERVICE_EPR));
        options.setProperty(org.apache.axis2.Constants.Configuration.TRANSPORT_URL, ESB_TRANS_EPR);
        options.setProperty(RampartMessageData.KEY_RAMPART_POLICY, servicePolicy);
        options.setProperty(RampartMessageData.KEY_CUSTOM_ISSUED_TOKEN, responseToken.getId());
        client.setOptions(options);
        client.engageModule("addressing");
        client.engageModule("rampart");
        OMElement response = client.sendReceive(getPayload("Hello world1"));
        System.out.println("Response  : " + response);
    }

    private static Policy loadSTSPolicy(String xmlPath) throws Exception {
        StAXOMBuilder builder = null;
        Policy policy = null;
        RampartConfig rc = null;
        builder = new StAXOMBuilder(xmlPath);
        policy = PolicyEngine.getPolicy(builder.getDocumentElement());
        rc = new RampartConfig();
        // User from the LDAP user store
        rc.setUser("prabath");
        // You need to have password call-back class to provide the user password
        rc.setPwCbClass(PWCBHandler.class.getName());
        policy.addAssertion(rc);
        return policy;
    }

    private static Policy loadServicePolicy(String xmlPath) throws Exception {
        StAXOMBuilder builder = null;
        Policy policy = null;
        RampartConfig rc = null;
        CryptoConfig sigCryptoConfig = null;
        String keystore = null;
        Properties merlinProp = null;
        CryptoConfig encrCryptoConfig = null;
        builder = new StAXOMBuilder(xmlPath);
        policy = PolicyEngine.getPolicy(builder.getDocumentElement());
        rc = new RampartConfig();
        rc.setUser("wso2carbon");
        rc.setEncryptionUser("wso2carbon");
        // You need to have password call-back class to provide the user password
        rc.setPwCbClass(PWCBHandler.class.getName());
        keystore = "wso2carbon.jks";
        merlinProp = new Properties();
        merlinProp.put("org.apache.ws.security.crypto.merlin.keystore.type", "JKS");
        merlinProp.put("org.apache.ws.security.crypto.merlin.file", keystore);
        merlinProp.put("org.apache.ws.security.crypto.merlin.keystore.password", "wso2carbon");
        sigCryptoConfig = new CryptoConfig();
        sigCryptoConfig.setProvider("org.apache.ws.security.components.crypto.Merlin");
        sigCryptoConfig.setProp(merlinProp);
        encrCryptoConfig = new CryptoConfig();
        encrCryptoConfig.setProvider("org.apache.ws.security.components.crypto.Merlin");
        encrCryptoConfig.setProp(merlinProp);
        rc.setSigCryptoConfig(sigCryptoConfig);
        rc.setEncrCryptoConfig(encrCryptoConfig);
        policy.addAssertion(rc);
        return policy;
    }

    private static OMElement getRSTTemplate() throws Exception {
        OMFactory fac = OMAbstractFactory.getOMFactory();
        OMElement element = null;
        OMElement elem = fac.createOMElement(Constants.RST_TEMPLATE);
        TrustUtil.createTokenTypeElement(RahasConstants.VERSION_05_02, elem).setText(XML.SAML_NS);
        TrustUtil.createKeyTypeElement(RahasConstants.VERSION_05_02, elem,
            RahasConstants.KEY_TYPE_SYMM_KEY);
        TrustUtil.createKeySizeElement(RahasConstants.VERSION_05_02, elem, 256);
        element = TrustUtil.createClaims(RahasConstants.VERSION_05_02, elem, "http://wso2.org");
        addClaimType(element, "http://wso2.org/claims/givenname");
        return elem;
    }

    private static void addClaimType(OMElement parent, String uri) {
        OMElement element = null;
        element = parent.getOMFactory().createOMElement(new QName("http://schemas.xmlsoap.org/ws/2005/05/identity", "ClaimType", "wsid"),
            parent);
        element.addAttribute(parent.getOMFactory().createOMAttribute("Uri", null, uri));
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

``` java
package org.apache.ws.axis2;

import org.apache.ws.security.WSPasswordCallback;
import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;

public class PWCBHandler implements CallbackHandler {
    public void handle(Callback[] callbacks) throws UnsupportedCallbackException {
        WSPasswordCallback cb = (WSPasswordCallback) callbacks[0];
        if ("prabath".equals(cb.getIdentifier())) {
            cb.setPassword("prabath");
        } else {
            cb.setPassword("wso2carbon");
        }
    }
}
```
