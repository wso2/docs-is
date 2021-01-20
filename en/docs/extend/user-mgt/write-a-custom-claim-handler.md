# Write a Custom Claim Handler

WSO2 Identity Server (WSO2 IS) supports SAML authentication and single sign-on capabilities where WSO2 IS can act as the identity provider for a relying party application (i.e., service provider). When SAML single sign-on is used in an enterprise system, it is through the SAML response that the relying party gets to know whether a user is authenticated or not. At this point the relying party application is not aware of the attributes of an authenticated user, which would be required for certain business and authorization purposes. You can use WSO2 IS to provide these attribute details to the relying party application, by configuring WSO2 IS to send user claims in a SAML response using the service provider claim configuration. For information on how to configure WSO2 IS to send user claims in a SAML response, see [Configuring Claims for a Service Provider](TODO:insert-link).

The claims that you can send using the service provider claim configuration are default user claims, which can be read from the underlying user store.However, there can be scenarios where you want to send claims that need to be read from an external data source (i.e., custom claims) based on certain user attributes requested by a relying party application. If you want to add such custom claims to a SAML response, you need to write a custom claim handler to extend WSO2 IS.

Let’s look at how to add custom claims to a SAML response using a sample scenario where you need to provide several local attributes of a user, which are stored in user store, together with a few additional attributes that should be read from an external data source.

---

## Introduction

The SAML response that should be sent from WSO2 IS to the relying party application is as follows:

``` java
<?xml version="1.0"?>
<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:xs="http://www.w3.org/2001/XMLSchema" Destination="https://localhost:9444/acs" ID="faibaccbcepemkackalbbjkihlegenhhigcdjbjk" InResponseTo="kbedjkocfjdaaadgmjeipbegnclbelfffbpbophe" IssueInstant="2014-07-17T13:15:05.032Z" Version="2.0">
<saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">localhost
    </saml2:Issuer>
<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        ..........
    </ds:Signature>
<saml2p:Status>
    <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
</saml2p:Status>
<saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xs="http://www.w3.org/2001/XMLSchema" ID="phmbbieedpcfdhcignelnepkemobepgaaipbjjdk" IssueInstant="2014-07-17T13:15:05.032Z" Version="2.0">
<saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">localhost</saml2:Issuer>
<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            .........
        </ds:Signature>
<saml2:Subject>
    <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">Administrator</saml2:NameID>
    <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml2:SubjectConfirmationData InResponseTo="kbedjkocfjdaaadgmjeipbegnclbelfffbpbophe" NotOnOrAfter="2014-07-17T13:20:05.032Z" Recipient="https://localhost:9444/acs"/>
    </saml2:SubjectConfirmation>
</saml2:Subject>
<saml2:Conditions NotBefore="2014-07-17T13:15:05.032Z" NotOnOrAfter="2014-07-17T13:20:05.032Z">
    <saml2:AudienceRestriction>
        <saml2:Audience>carbonServer2</saml2:Audience>
    </saml2:AudienceRestriction>
</saml2:Conditions>
<saml2:AuthnStatement AuthnInstant="2014-07-17T13:15:05.033Z">
    <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</saml2:AuthnContextClassRef>
    </saml2:AuthnContext>
</saml2:AuthnStatement>
<saml2:AttributeStatement>
    <saml2:Attribute Name="http://wso2.org/claims/role" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
    <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                        Internal/carbonServer2,Internal/everyone
                    </saml2:AttributeValue>
</saml2:Attribute>
<saml2:AttributeStatement>
    <saml2:Attribute Name="http://test.org/claims/keplerNumber" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
    <saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                            E90836W19881010
                        </saml2:AttributeValue>
</saml2:Attribute>
<saml2:Attribute Name="http://test.org/claims/status" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
<saml2:AttributeValue xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">
                        active
                    </saml2:AttributeValue>
</saml2:Attribute>
</saml2:AttributeStatement>
</saml2:AttributeStatement>
</saml2:Assertion>
</saml2p:Response>
```

This response has one local attribute named `role`, and two external attributes as follows:

-   `http://test.org/claims/keplerNumber`
-   `http://test.org/claims/status`

The external attributes can be read from either a database, or a file, or via any other mechanism depending on your requirement.

To retrieve the external attributes in this response, you need to write
a custom claim handler.

---

## Write the custom claim handler

Follow the steps below:

-   Implement the custom logic to retrieve external claims. When you
    implement the custom logic, keep the following in mind:

    -   The custom implementation should either implement the `org.wso2.carbon.identity.application.authentication.framework.handler.claims.ClaimHandler`
        interface, or should extend the default implementation of the `org.wso2.carbon.identity.application.authentication.framework.handler.claims.impl.DefaultClaimHandler` interface.
    -   The map that returns at the `public Map<String, String> handleClaimMappings`method should contain all the attributes that you want to add to
        the SAML response.

        Following is a sample custom claim handler that implements the `org.wso2.carbon.identity.application.authentication.framework.handler.claims.ClaimHandler` interface:

        ``` java
        public class CustomClaimHandler implements ClaimHandler {

            private static final Log log = LogFactory.getLog(CustomClaimHandler.class);
            private static volatile CustomClaimHandler instance;
            private String connectionURL = null;
            private String userName = null;
            private String password = null;
            private String jdbcDriver = null;
            private String sql = null;


            public static CustomClaimHandler getInstance() {
                if (instance == null) {
                    synchronized (CustomClaimHandler.class) {
                        if (instance == null) {
                            instance = new CustomClaimHandler();
                        }
                    }
                }
                return instance;
            }

            public Map<String, String> handleClaimMappings(StepConfig stepConfig,
                                                            AuthenticationContext context, Map<String, String> remoteAttributes,
                                                            boolean isFederatedClaims) throws FrameworkException {

                String authenticatedUser = null;

                if (stepConfig != null) {
                    //calling from StepBasedSequenceHandler
                    authenticatedUser = stepConfig.getAuthenticatedUser();
                } else {
                    //calling from RequestPathBasedSequenceHandler
                    authenticatedUser = context.getSequenceConfig().getAuthenticatedUser();
                }

                Map<String, String> claims = handleLocalClaims(authenticatedUser, context);
                claims.putAll(handleExternalClaims(authenticatedUser));

                return claims;
            }


            /**
                * @param context
                * @return
                * @throws FrameworkException
                */
            protected Map<String, String> handleLocalClaims(String authenticatedUser,
                                                            AuthenticationContext context) throws FrameworkException {
            ....
            }

            private Map<String, String> getFilteredAttributes(Map<String, String> allAttributes,
                                                                Map<String, String> requestedClaimMappings, boolean isStandardDialect) {
            ....
            }

            protected String getDialectUri(String clientType, boolean claimMappingDefined) {
            ....
            }

            /**
                * Added method to retrieve claims from external sources. The results will be merged to the local claims when
                * returning the final claim list to be added to the SAML response that is sent back to the SP.
                *
                * @param authenticatedUser : The user for whom we require claim values
                * @return
                */
            private Map<String, String> handleExternalClaims(String authenticatedUser) throws FrameworkException {
                Map<String, String> externalClaims = new HashMap<String, String>();
                externalClaims.put("http://test.org/claims/keplerNumber","E90836W19881010");
                externalClaims.put("http://test.org/claims/status","active");
                return externalClaims;
            }
        }
        ```

        After you write the custom claim handler, and register the class as an OSGI bundle, you can deploy the OSGi bundle in WSO2 IS.

---

## Deploy the custom claim handler

Follow the steps below to deploy the custom claim handler that you implemented:

1.  Add the compiled OSGi bundle to the `IS_HOME/repository/components/dropins` directory.

2.  Open the ` deployment.toml ` file in ` IS_HOME/repository/conf` folder and add the custom claim handler package name under the `[authentication.framework.extensions]` tag as shown below.   
    
    ```toml
        [authentication.framework.extensions] 
        claim_handler="com.wso2.sample.claim.handler.CustomClaimHandler" 
    ```
    
This allows you to use the new custom claim implementation with WSO2 IS.
