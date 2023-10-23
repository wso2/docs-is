# Accessing Claim Aware Services using STS Secured with Non-repudiation

Usually, WSO2 Identity Server (IS) Security Token Service (STS) is
secured using **UsernameToken**. By doing so, claims related to a
particular user can be easily retrieved from a userstore.

However, there can be situations where STS is secured using
non-repudiation, in which case the users are authenticated by signing
the Request for Security Token (RST) using their private key. At the STS
side, claims should be retrieved based on the user's X.509 certificate's
Common Name (CN), if the STS trusts the user.

An extension point is used to address this scenario in WSO2 Identity
Server. A custom attribute finder for non-repudiation scenario is
written and given to IS to execute. This section discusses how to
achieve this using [WSO2 Identity
Server](https://is.docs.wso2.com/en) and [WSO2 Enterprise
Service Bus](http://docs.wso2.org/enterprise-service-bus)
. Additionally, an STS Sample is used which can be downloaded
[here](https://github.com/wso2/samples-is/tree/master/sts/sts-client)
. This sts-sample includes executables as well as the source files with
an Eclipse project that was configured using Maven.

### Configuring Key Stores

The following steps generate a key pair for the particular user you are
interested in client's key store, and add his/her certificate to IS' key
store.

You can use the key store of the sts-sample downloaded (which is located
at
`         sts-sample/src/main/resources/keystore/wso2carbon.jks        `
), and you can test this with the "admin" user.

1.  Generate a new key pair in client's key store with the CN "admin"
    (or any other, if you want to test a different user in the IS user
    store).

    ``` java
    keytool -genkey -keyalg RSA -alias admin -keypass admin123 -keystore path/to/client/wso2carbon.jks -storepass wso2carbon -dname "CN=admin"
    ```

2.  Generate a certificate from the key pair.

    ``` java
        keytool -export -alias admin -file path/to/admin.cert -keystore path/to/client/wso2carbon.jks -storepass wso2carbon
    ```

3.  Import the new certificate to
    `           {IS_HOME}/repository/resources/security/wso2carbon.jks          `
    .

    ``` java
        keytool -import -alias admin -file path/to/admin.cert -keystore path/to/server/wso2carbon.jks -storepass wso2carbon
    ```

4.  When it asks "Trust this certificate? \[no\]:" at the end of above
    command, enter **yes**.

### Running the Servers

In ESB, change the " **Offset** " value to **1** in
`         {ESB_HOME}/repository/conf/carbon.xml        ` . This allows
you to run both IS and ESB servers parallelly. IS runs on the default
port 9443 and ESB on 9444.

Start both servers by executing the following:

`           {IS_HOME}/bin/wso2server.sh          ` and
`           {ESB_HOME}/bin/wso2server.sh          ` on **Linux**.

or

`           {IS_HOME}/bin/wso2server.bat          ` and
`           {ESB_HOME}/bin/wso2server.bat          ` on **Windows**.

### Securing an Echo Service (the Relying Party) in ESB

1.  Add a custom policy to the registry.
    1.  Create a new collection (which is essentially a folder) to
        maintain custom policies.  
        ![browse-custom-policies](../assets/img/tutorials//browse-custom-policies.png)
    2.  Add the **service-policy.xml** located at '
        `            sts-sample/src/main/resources/           ` ' to
        this collection.  
        ![add-resource](../assets/img/tutorials//add-resource.png)
2.  Secure the echo service with the custom policy.  
    1.  Go to the **Services** list and click the **Unsecured** link of
        the echo service.  
        ![list-deployed-services](../assets/img/tutorials//list-deployed-services.png)
    2.  Select **Yes** in the " **Enable Security?** " option.
    3.  Give the path of the policy file we uploaded to registry, in the
        **Policy From Registry** section at the end of the page.  
        ![policy-files](../assets/img/tutorials//policy-files.png)
    4.  Click **Next**.
    5.  In the following page, select **wso2carbon.jks** as the
        **Trusted Key Store**.  
        ![trusted-key-stores](../assets/img/tutorials//trusted-key-stores.png)

The end service is successfully configured now.

### Add ESB's Echo Service as a Trusted Service of STS

1.  Start the WSO2 Identity Server .
2.  Log in as an admin to access the [management
    console](../../setup/getting-started-with-the-management-console).
3.  Navigate to the **Service Providers** section by clicking **Add** in
    the **Main** menu under **Service Providers**.
4.  Add a **Service Provider Name** and **Description** and click
    **Register**.  
    ![add-new-service-provider](../assets/img/tutorials//add-new-service-provider.png)
5.  In the resulting page, expand the **Inbound Authentication
    Configuration** and the **WS-Trust Security Token Service
    Configuration** sections. Click **Configure**.
6.  Enter the trusted relying parties and upload the public certificate
    of the trusted relying party (against its end-point).  

    **Endpoint Address** =
    `                           http://localhost:8281/services/echo                         `

    **Certificate Alias** = wso2carbon

    These relying parties will accept security tokens from the Identity
    Server. The tokens issued are encrypted using the public key of the
    trusted relying party. Accordingly, even the client who obtains the
    token to send to the RP has no visibility to the included token.

7.  Click **Apply**.

### Secure STS with Non-repudiation

1.  Click **Apply** on the above screen.
2.  Select " **Yes** " in the " **Enable Security?** " option.
3.  Select **scenario 2 - Non-repudiation**, and click **Next**.
4.  On the following page, as we did for ESB, select '
    **wso2carbon.jks** ' as the **Trusted Key Store**.
5.  Change the `           path.policy.sts property          ` to
    `           sts-policy-signonly.xml          ` in the
    client.properties file (refer code below) and save the file. (File
    path -\> sts-client/src/main/resources/client.properties)

    ``` java
        #Following paths start from the resources folder
        path.policy.sts=sts-policy-signonly.xml
    ```

### Ensure Necessary Claims are Added to the User

1.  The echo service requires first name and the email address as the
    claims (refer **service-policy.xml** ).
2.  Check the user profile of the particular user ("admin" in default
    case) to make sure the values for those claims are available.  
    ![update-admin-user-profile](../assets/img/tutorials//update-admin-user-profile.png)

Both ESB and IS are now configured.

### Testing with the STS Client

The following are the (partially clipped) sources that make up the
Client.

**Client.java** can invoke token issue binding on STS, as well as send
the request to the echo service.

``` java
public class Client {
 
    ...
     
    public static void main(String[] args) {
        Client client = new Client();
        client.run();
    }
 
    private void run() {
        try {
            loadConfigurations();
 
            // set the trust store as a system property for communication over
            // TLS.
            System.setProperty("javax.net.ssl.trustStore", keystorePath);
            System.setProperty("javax.net.ssl.trustStorePassword", keystorePwd);
 
            // create configuration context
            ConfigurationContext configCtx = ConfigurationContextFactory
                    .createConfigurationContextFromFileSystem(repoPath);
 
            // create STS client
            STSClient stsClient = new STSClient(configCtx);
            stsClient.setRstTemplate(getRSTTemplate());
 
            String action = null;
            String responseTokenID = null;
 
            action = TrustUtil.getActionValue(RahasConstants.VERSION_05_02,
                    RahasConstants.RST_ACTION_ISSUE);
            stsClient.setAction(action);
 
            // request the security token from STS.
            Token responseToken;
             
            Policy stsPolicy = loadPolicy(stsPolicyPath);
 
            // add rampart config assertion to the ws-sec policies
            RampartConfig rampartConfig = buildRampartConfig();
            stsPolicy.addAssertion(rampartConfig);
             
            responseToken = stsClient.requestSecurityToken(null, stsEPR, stsPolicy, relyingPartyEPR);
 
            // store the obtained token in token store to be used in future
            // communication.
            TokenStorage store = TrustUtil.getTokenStore(configCtx);
            responseTokenID = responseToken.getId();
            store.add(responseToken);
 
            // print token
            System.out.println(responseToken.getToken().toString());
 
            ...
 
            //Send the token to relying party
            if (enableRelyingParty) {
                /* Invoke secured service using the obtained token */
                OMElement responseElem = null;
 
                // create service client
                ServiceClient serClient = new ServiceClient(configCtx, null);
 
                // engage modules
                serClient.engageModule("addressing");
                serClient.engageModule("rampart");
 
                // load policy of secured service
                Policy sec_policy = loadPolicy(relyingPartyPolicyPath);
 
                // add rampart config to the ws-sec policies
                sec_policy.addAssertion(rampartConfig);
 
                // set in/out security policies in client opts
                serClient.getOptions().setProperty(RampartMessageData.KEY_RAMPART_POLICY,
                        sec_policy);
 
                // Set the token id as a property in the Axis2 client scope, so that
                // this will be picked up when creating the secure message to invoke
                // the endpoint.
                serClient.getOptions().setProperty(RampartMessageData.KEY_CUSTOM_ISSUED_TOKEN,
                        responseTokenID);
 
                // set action of the Hello Service to be invoked.
                serClient.getOptions().setAction("urn:echoString");
                serClient.getOptions().setTo(new EndpointReference(relyingPartyEPR));
 
                // invoke the service
                responseElem = serClient.sendReceive(getPayload(echoRequestMsg));
                // cleanup transports
                serClient.getOptions().setCallTransportCleanup(true);
 
                System.out.println(responseElem.toString());
                 
                System.exit(0);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TrustException e) {
            e.printStackTrace();
        } catch (XMLStreamException e) {
            e.printStackTrace();
        }
    }
 
    private OMElement getRSTTemplate() throws TrustException {
        OMFactory omFac = OMAbstractFactory.getOMFactory();
        OMElement element = omFac.createOMElement(SP11Constants.REQUEST_SECURITY_TOKEN_TEMPLATE);
 
        if (ClientConstants.SAML_TOKEN_TYPE_20.equals(tokenType)) {
            TrustUtil.createTokenTypeElement(RahasConstants.VERSION_05_02, element).setText(
                    RahasConstants.TOK_TYPE_SAML_20);
        } else if (ClientConstants.SAML_TOKEN_TYPE_11.equals(tokenType)) {
            TrustUtil.createTokenTypeElement(RahasConstants.VERSION_05_02, element).setText(
                    RahasConstants.TOK_TYPE_SAML_10);
        }
 
        if (ClientConstants.SUBJECT_CONFIRMATION_BEARER.equals(subjectConfirmationMethod)) {
            TrustUtil.createKeyTypeElement(RahasConstants.VERSION_05_02, element,
                    RahasConstants.KEY_TYPE_BEARER);
        } else if (ClientConstants.SUBJECT_CONFIRMATION_HOLDER_OF_KEY
                .equals(subjectConfirmationMethod)) {
            TrustUtil.createKeyTypeElement(RahasConstants.VERSION_05_02, element,
                    RahasConstants.KEY_TYPE_SYMM_KEY);
        }
 
        // request claims in the token.
        OMElement claimElement = TrustUtil.createClaims(RahasConstants.VERSION_05_02, element,claimDialect);
        // Populate the <Claims/> element with the <ClaimType/> elements
        addClaimType(claimElement, claimUris);
 
        return element;
    }
 
    private void addClaimType(OMElement parent, String[] claimUris) {
        OMElement element = null;
        // For each and every claim uri, create an <ClaimType/> elem
        for (String attr : claimUris) {
            element = parent.getOMFactory()
                    .createOMElement(
                            new QName("http://schemas.xmlsoap.org/ws/2005/05/identity",
                                    "ClaimType", "wsid"), parent);
            element.addAttribute(parent.getOMFactory().createOMAttribute("Uri", null, attr));
        }
    }
 
    private Policy loadPolicy(String policyPath) throws XMLStreamException, FileNotFoundException {
        StAXOMBuilder omBuilder = new StAXOMBuilder(policyPath);
        return PolicyEngine.getPolicy(omBuilder.getDocumentElement());
    }
 
    private RampartConfig buildRampartConfig() {
        RampartConfig rampartConfig = new RampartConfig();
        rampartConfig.setUser(username);
        rampartConfig.setEncryptionUser(encryptionUser);
        rampartConfig.setUserCertAlias(userCertAlias);
        rampartConfig.setPwCbClass(pwdCallbackClass);
 
        Properties cryptoProperties = new Properties();
        cryptoProperties.put("org.apache.ws.security.crypto.merlin.keystore.type", "JKS");
        cryptoProperties.put("org.apache.ws.security.crypto.merlin.file", keystorePath);
        cryptoProperties
                .put("org.apache.ws.security.crypto.merlin.keystore.password", keystorePwd);
 
        CryptoConfig cryptoConfig = new CryptoConfig();
        cryptoConfig.setProvider("org.apache.ws.security.components.crypto.Merlin");
        cryptoConfig.setProp(cryptoProperties);
 
        rampartConfig.setEncrCryptoConfig(cryptoConfig);
        rampartConfig.setSigCryptoConfig(cryptoConfig);
 
        return rampartConfig;
    }
 
    private OMElement getPayload(String value) {
        OMFactory factory = null;
        OMNamespace ns = null;
        OMElement elem = null;
        OMElement childElem = null;
 
        factory = OMAbstractFactory.getOMFactory();
        ns = factory.createOMNamespace("http://echo.services.core.carbon.wso2.org", "ns");
        elem = factory.createOMElement("echoString", ns);
        childElem = factory.createOMElement("in", null);
        childElem.setText(value);
        elem.addChild(childElem);
 
        return elem;
    }
     
    ...
}
```

**PasswordCBHandler.java** is used by the underlying **Rampart** module
to get the password of the key alias which is used to sign the request.

``` java
public class PasswordCBHandler implements CallbackHandler{
     
    ...
     
    public void handle(Callback[] callbacks) throws IOException, UnsupportedCallbackException {
 
        readUsernamePasswordFromProperties();
         
        WSPasswordCallback pwcb = (WSPasswordCallback) callbacks[0];
        String id = pwcb.getIdentifier();
        int usage = pwcb.getUsage();
 
        if (usage == WSPasswordCallback.USERNAME_TOKEN) {
 
           if (username.equals(id)) {
               pwcb.setPassword(password);
           }
        } else if (usage == WSPasswordCallback.SIGNATURE || usage == WSPasswordCallback.DECRYPT) {
 
            if (keyAlias.equals(id)) {
                pwcb.setPassword(keyPassword);
            }
        }
    }
     
    ...
}
```

You can configure the client by using the '
`         sts-sample/src/main/resources/client.properties        ` '
file. By default, it is configured to run the client in SAML2 and
'Bearer' subject confirmation modes using "admin" as the user.

There are scripts named **sts-client.sh** and **sts-client.bat**
included in the **sts-sample** download. By using them, you can directly
run the client without much hassle.

Upon execution, you can see an output on your console.

  
