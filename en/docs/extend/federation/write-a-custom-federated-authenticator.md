# Write a Custom Federated Authenticator

It is possible to use the extension points available in WSO2 Identity Server to create custom federated authenticators.

---

## Authenticator API

The following is the API used to implement a custom federated authenticator.

``` java
/*
*  Copyright (c) 2005-2013, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

package org.wso2.carbon.identity.application.authentication.framework;

import java.io.Serializable;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.wso2.carbon.identity.application.authentication.framework.context.AuthenticationContext;
import org.wso2.carbon.identity.application.authentication.framework.exception.AuthenticationFailedException;
import org.wso2.carbon.identity.application.authentication.framework.exception.LogoutFailedException;
import org.wso2.carbon.identity.application.common.model.Property;

/**
 * API of the Application Authenticators.
 *
 */
public interface ApplicationAuthenticator extends Serializable {

    /**
     * Check whether the authentication or logout request can be handled by the
     * authenticator
     * 
     * @param request
     * @return boolean
     */
    public boolean canHandle(HttpServletRequest request);
    
    /**
     * Process the authentication or logout request.
     * 
     * @param request
     * @param response
     * @param context
     * @return the status of the flow
     * @throws AuthenticationFailedException
     * @throws LogoutFailedException
     */
    public AuthenticatorFlowStatus process(HttpServletRequest request,
            HttpServletResponse response, AuthenticationContext context)
            throws AuthenticationFailedException, LogoutFailedException;
    
    /**
     * Get the Context identifier sent with the request. This identifier is used
     * to retrieve the state of the authentication/logout flow
     * 
     * @param request
     * @return
     */
    public String getContextIdentifier(HttpServletRequest request);
    
    /**
     * Get the name of the Authenticator
     * @return name
     */
    public String getName();
    
    /**
     * @return
     */
    public String getFriendlyName();
    
    /**
     * Get the claim dialect URI if this authenticator receives claims in a standard dialect
     * and needs to be mapped to the Carbon dialect http://wso2.org/claims
     * @return boolean
     */
    public String getClaimDialectURI();
    
    /**
     * @return
     */
    public List<Property> getConfigurationProperties();
}
```

This API can be used to configure a custom authenticator. As an example, a Twitter authenticator is configured using the above API.

---

### Write a custom authenticator for Twitter

WSO2 Identity Server comes with several built in authenticators like Facebook, Google, OpenID, and SAML. This topic provides instructions on how to authenticate users via Twitter using the SAML configurations available in WSO2 Identity Server.

!!! info "Related links"
    -   See [here](https://dev.twitter.com/web/sign-in/desktop-browser) for
        information on browser sign in flow. This information is useful when
        working with websites and applications that are able to open or
        embed a web browser.
    -   See [here](https://dev.twitter.com/web/sign-in/implementing) for
        information on implementing the sign in functionality using Twitter.
    -   If you are doing this using Java, there is a library you can use
        called [twitter4j](http://twitter4j.org/en/index.html). See the link for code samples on signing
        in with Twitter.

The following code block represents the structure of an authenticator **pom.xml**. Authenticators are basically OSGi (Open Service Gateway initiative)bundles, which are units of modularization that are comprised of Java classes and other resources that provide functions to end users. The **pom.xml** includes the dependencies for the project.

Other than the twitter4j dependency, other dependencies are mandatory.

??? info "Click here to view the code block"
    ``` xml
    <?xml version="1.0" encoding="utf-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    
        <groupId>org.emojotFoundation</groupId>
        <modelVersion>4.0.0</modelVersion>
        <artifactId>authenticator-twitter</artifactId>
        <packaging>bundle</packaging>
        <version>1.0.0</version>
    
        <dependencies>
    
            <dependency>
                <groupId>org.wso2.carbon</groupId>
                <artifactId>org.wso2.carbon.logging</artifactId>
                <version>4.2.0</version>
            </dependency>
    
            <dependency>
                <groupId>org.wso2.carbon</groupId>
                <artifactId>org.wso2.carbon.identity.application.authentication.framework</artifactId>
                <version>4.2.2</version>
            </dependency>
    
            <dependency>
                <groupId>org.wso2.carbon</groupId>
                <artifactId>org.wso2.carbon.ui</artifactId>
                <version>4.2.0</version>
            </dependency>
    
            <dependency>
                <groupId>org.apache.amber.wso2</groupId>
                <artifactId>amber</artifactId>
                <version>0.22.1358727.wso2v4</version>
            </dependency>
    
            <dependency>
                <groupId>org.wso2.carbon</groupId>
                <artifactId>org.wso2.carbon.identity.application.common</artifactId>
                <version>4.2.0</version>
            </dependency>
    
            <dependency>
                <groupId>org.twitter4j</groupId>
                <artifactId>twitter4j-core</artifactId>
                <version>[4.0,)</version>
            </dependency>
        </dependencies>
    
        <repositories>
            <repository>
                <id>wso2-nexus</id>
                <name>WSO2 Internal Repository</name>
                <url>http://maven.wso2.org/nexus/content/groups/wso2-public/</url>
                <releases>
                    <enabled>true</enabled>
                    <updatePolicy>daily</updatePolicy>
                    <checksumPolicy>ignore</checksumPolicy>
                </releases>
            </repository>
            <repository>
                <id>twitter4j.org</id>
                <name>twitter4j.org Repository</name>
                <url>http://twitter4j.org/maven2</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>true</enabled>
                </snapshots>
            </repository>
        </repositories>
    
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.felix</groupId>
                    <artifactId>maven-scr-plugin</artifactId>
                    <version>1.7.4</version>
                    <executions>
                        <execution>
                            <id>generate-scr-scrdescriptor</id>
                            <goals>
                                <goal>scr</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
                <plugin>
                    <groupId>org.apache.felix</groupId>
                    <artifactId>maven-bundle-plugin</artifactId>
                    <extensions>true</extensions>
                    <configuration>
                        <instructions>
                            <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
                            <Bundle-Name>${project.artifactId}</Bundle-Name>
                            <Private-Package>org.emojotFoundation.authenticator.twitter.internal</Private-Package>
                            <Import-Package>org.twitter4j.*;
                                version="[4.0,)",
                                org.apache.axis2.*;
                                version="[1.6.1.wso2v1, 1.7.0)",
                                org.apache.axiom.*;
                                version="[1.2.11.wso2v2, 1.3.0)",
                                org.wso2.carbon.ui.*,
                                org.apache.commons.logging.*; version="1.0.4",
                                org.osgi.framework,
                                org.wso2.carbon.identity.application.authentication.framework.*,
                                javax.servlet;version="[2.6.0,3.0.0)",
                                javax.servlet.http;version="[2.6.0,3.0.0)",
                                *;resolution:=optional
                            </Import-Package>
                            <Export-Package>!org.emojotFoundation.authenticator.twitter.internal,
                                org.emojotFoundation.authenticator.twitter.*
                            </Export-Package>
                            <DynamicImport-Package>*</DynamicImport-Package>
                        </instructions>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </project>
    ```

As the project is an OSGi bundle, you must add this class to define the bundle activate method and deactivate method.

??? info "Click here to view the class used to define the bundle activate method and deactivate method"
    ``` java
    package org.emojotFoundation.authenticator.twitter.internal;
    
    import java.util.Hashtable;
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.osgi.service.component.ComponentContext;
    import org.wso2.carbon.identity.application.authentication.framework.ApplicationAuthenticator;
    import org.emojotFoundation.authenticator.twitter.TwitterAuthenticator;
    
    /**
    * @scr.component name="authenticator.twitter" immediate="true"
    */
    
    public class TwitterAuthenticatorServiceComponent {
    
        private static final Log LOGGER = LogFactory.getLog(TwitterAuthenticatorServiceComponent.class);
    
        protected void activate(ComponentContext ctxt) {
            try {
                TwitterAuthenticator twitterAuthenticator = new TwitterAuthenticator();
                Hashtable<String, String> props = new Hashtable<String, String>()
                ctxt.getBundleContext().registerService(ApplicationAuthenticator.class.getName(),twitterAuthenticator, props); 
    
                LOGGER.info("----Twitter Authenticator bundle is activated----");
    
            } catch (Throwable e) {
                LOGGER.fatal("----Error while activating Twitter authenticator----", e);
            }
        }
    
        protected void deactivate(ComponentContext ctxt) {
            LOGGER.info("----Twitter Authenticator bundle is deactivated----");
        }
    }
    ```

After adding this to your project, you are in a position to write your authenticator. Authenticators are defined by extending the
`AbstractApplicationAuthenticator` class and implementing the `FederatedApplicationAuthenticator` interface. The important methods in the `AbstractApplicationAuthenticator` class and the `FederatedApplicationAuthenticator` interface are listed as follows.

-   `public String getName()`
-   `public String getFriendlyName()`
-   `public String getContextIdentifier(HttpServletRequest request`) -
    Returns a unique identifier that will map the authentication request
    and the response. The value returned by the invocation of
    authentication request and the response should be the same.
-   `public boolean canHandle(HttpServletRequest request)` - Specifies
    whether this authenticator can handle the authentication response.
-   `protected void initiateAuthenticationRequest(HttpServletRequest
    request,HttpServletResponse response, AuthenticationContext context)`
-   `protected void processAuthenticationResponse(HttpServletRequest
    request,HttpServletResponse response, AuthenticationContext context)`

Use the following steps to write the Twitter authenticator.

1.  Implement the `canHandle()` method using the above methods. When Twitter sends the OAuth response, it sends the parameters `oauth_token` and `oauth_verifier` in the request. This is a notification to identify that this response can be handled by the authenticator.

    ??? example "Click here to view a sample canHandle() method"
        ``` java
        public boolean canHandle(HttpServletRequest request) {
                if (request.getParameter("oauth_token")!=null && request.getParameter("oauth_verifier")!=null) {
                    return true;
                }
                return false;
        }
        ```

2.  For each authentication request that comes into the Identity Server, there is unique value that comes along as a parameter. That parameter is the `sessionDataKey` . Store this in the Twitter authentication redirection session to facilitate the requirement where `getContextIdentifier` gives the same value for authentication request and its response.

    !!! note
        The `sessionDataKey` query parameter is used to coordinate the request state across components participating in the request flow. It does not correlate with the user session. Furthermore, the request state maintained against the 'sessionDataKey' parameter value is cleared by each participating component at the end of request flow. This means that even if an external party grabs the 'sessionDataKey' they will not be able to get into the authentication sequence, as the user session is not associated with that key.

    ??? info "Click here to view getContextIdentifier()"
        ``` java
        public String getContextIdentifier(HttpServletRequest request) {
                if(request.getSession().getAttribute("contextIdentifier")==null){ 
                    request.getSession().setAttribute("contextIdentifier",request.getParameter("sessionDataKey"));
                    return request.getParameter("sessionDataKey");
                }else{
                    return (String) request.getSession().getAttribute("contextIdentifier");
                }
        }
        ```

3.  Next, implement the `initiateAuthenticationRequest` method and the `processAuthenticationResponse` method as follows.

    ??? info "Click here to view the initiateAuthenticationRequest method and processAuthenticationResponse method"
        ``` java
        protected void initiateAuthenticationRequest(HttpServletRequest request, HttpServletResponse response, AuthenticationContext context) throws AuthenticationFailedException {       
            
                String apiKey= resourceBundle.getString("API_Key");
                String apiSecret= resourceBundle.getString("API_Secret");
            
                Twitter twitter = new TwitterFactory().getInstance();
                twitter.setOAuthConsumer(apiKey, apiSecret);
                
                try {
                    String callbackURL = resourceBundle.getString("Call_Back_URL");
                    RequestToken requestToken = twitter.getOAuthRequestToken(callbackURL.toString());
                    request.getSession().setAttribute("requestToken",requestToken);
                    request.getSession().setAttribute("twitter",twitter);
                    response.sendRedirect(requestToken.getAuthenticationURL());
            
                } catch (TwitterException e) {
                    LOGGER.error("Exception while sending to the Twitter login page.", e);
                    throw new AuthenticationFailedException(e.getMessage(), e);
                } catch (IOException e) {
                    LOGGER.error("Exception while sending to the Twitter login page.", e);
                    throw new AuthenticationFailedException(e.getMessage(), e);
                }
                return;
        }
            
        protected void processAuthenticationResponse(HttpServletRequest request, HttpServletResponse response, AuthenticationContext context) throws AuthenticationFailedException {
                Twitter twitter = (Twitter) request.getSession().getAttribute("twitter");
                RequestToken requestToken = (RequestToken) request.getSession().getAttribute("requestToken");
                String verifier = request.getParameter("oauth_verifier");
                try {
                    AccessToken token=twitter.getOAuthAccessToken(requestToken, verifier);
                    request.getSession().removeAttribute("requestToken");
                    User user= twitter.verifyCredentials();
                    buildClaims(user,context);
                } catch (TwitterException e) {
                    LOGGER.error("Exception while obtaining OAuth token form Twitter", e);
                    throw new AuthenticationFailedException("Exception while obtaining OAuth token form Twitter",e);
                }
        }
            
        public void buildClaims(User user, AuthenticationContext context) {
            
                    context.setSubject(String.valueOf(user.getId()));
                    Map<ClaimMapping, String> claims = new HashMap<ClaimMapping, String>();
                    claims.put(ClaimMapping.build("name", "name", null,false), user.getName());
                    claims.put(ClaimMapping.build("screen_name", "screen_name", null,false), user.getScreenName());
                    claims.put(ClaimMapping.build("url", "url", null,false), user.getURL());
            
                    context.setSubjectAttributes(claims);
        }
        ```

4.  The `buildClaims` method saves the retrieved user attributes to the authenticated context in the Identity Server. That is needed to map the claims to the built in claims of IS.

5.  After implementing these methods you can build your bundle. After building it you have to put that into the `<IS_HOME>/repository/components/dropins`
    directory.

6.  Restart WSO2 Identity Server to use the Twitter authenticator in IS.

---

## Write a custom authenticator for Facebook

This section includes the code used to write the custom authenticator for Facebook.

1.  Download the source code from [here](https://svn.wso2.org/repos/wso2/people/isura/org.wso2.carbon.identity.application.authenticator.social/) using the following command on your terminal.

    ``` java
    $ svn checkout https://svn.wso2.org/repos/wso2/people/isura/org.wso2.carbon.identity.application.authenticator.social/ 
    ```

2.  Navigate to the folder you just downloaded, which contains the `pom.xml` file and build the source code by running the following command on your terminal.

    ``` java
    $ mvn clean install
    ```

3.  Copy the `org.wso2.carbon.identity.application.authenticator.social.facebook2-5.0.0.jar         ` file found inside the **target** folder and paste it in the `<IS_HOME>/repository/components/dropins` folder.

    ??? info "Click here to view the source code"
        ``` java
        /*
        * Copyright (c) 2014, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.social.facebook2;
        import org.apache.commons.lang.StringUtils;
        import org.apache.commons.logging.Log;
        import org.apache.commons.logging.LogFactory;
        import org.apache.oltu.oauth2.client.request.OAuthClientRequest;
        import org.apache.oltu.oauth2.client.response.OAuthAuthzResponse;
        import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
        import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
        import org.apache.oltu.oauth2.common.utils.JSONUtils;
        import org.wso2.carbon.identity.application.authentication.framework.AbstractApplicationAuthenticator;
        import org.wso2.carbon.identity.application.authentication.framework.FederatedApplicationAuthenticator;
        import org.wso2.carbon.identity.application.authentication.framework.context.AuthenticationContext;
        import org.wso2.carbon.identity.application.authentication.framework.exception.ApplicationAuthenticatorException;
        import org.wso2.carbon.identity.application.authentication.framework.exception.AuthenticationFailedException;
        import org.wso2.carbon.identity.application.authentication.framework.model.AuthenticatedUser;
        import org.wso2.carbon.identity.application.authentication.framework.util.FrameworkConstants;
        import org.wso2.carbon.identity.application.authentication.framework.util.FrameworkUtils;
        import org.wso2.carbon.identity.application.common.model.ClaimMapping;
        import org.wso2.carbon.identity.application.common.model.Property;
        import org.wso2.carbon.identity.application.common.util.IdentityApplicationConstants;
        import org.wso2.carbon.identity.base.IdentityConstants;
        import org.wso2.carbon.identity.core.util.IdentityUtil;
        import org.wso2.carbon.identity.core.util.IdentityIOStreamUtils;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;
        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.net.MalformedURLException;
        import java.net.URL;
        import java.net.URLConnection;
        import java.nio.charset.Charset;
        import java.util.*;
        public class FacebookCustomAuthenticator extends AbstractApplicationAuthenticator implements
        FederatedApplicationAuthenticator {
        private static final Log log = LogFactory.getLog(FacebookCustomAuthenticator.class);
        private static final long serialVersionUID = ­1465329490183756028 L;
        private String tokenEndpoint;
        private String oAuthEndpoint;
        private String userInfoEndpoint;
        /**
        * initiate tokenEndpoint
        */
        private void initTokenEndpoint() {
        this.tokenEndpoint =
            getAuthenticatorConfig().getParameterMap().get(FacebookCustomAuthenticatorConstants
            .FB_TOKEN_URL);
        if (StringUtils.isBlank(this.tokenEndpoint)) {
            this.tokenEndpoint = IdentityApplicationConstants.FB_TOKEN_URL;
        }
        }
        /**
        * initiate authorization server endpoint
        */
        private void initOAuthEndpoint() {
        this.oAuthEndpoint =
            getAuthenticatorConfig().getParameterMap().get(FacebookCustomAuthenticatorConstants
            .FB_AUTHZ_URL);
        if (StringUtils.isBlank(this.oAuthEndpoint)) {
            this.oAuthEndpoint = IdentityApplicationConstants.FB_AUTHZ_URL;
        }
        }
        /**
        * initiate userInfoEndpoint
        */
        private void initUserInfoEndPoint() {
        this.userInfoEndpoint =
            getAuthenticatorConfig().getParameterMap().get(FacebookCustomAuthenticatorConstants
            .FB_USER_INFO_URL);
        if (StringUtils.isBlank(this.userInfoEndpoint)) {
            this.userInfoEndpoint = IdentityApplicationConstants.FB_USER_INFO_URL;
        }
        }
        /**
        * get the tokenEndpoint.
        * @return tokenEndpoint
        */
        private String getTokenEndpoint() {
        if (StringUtils.isBlank(this.tokenEndpoint)) {
            initTokenEndpoint();
        }
        return this.tokenEndpoint;
        }
        /**
        * get the oAuthEndpoint.
        * @return oAuthEndpoint
        */
        private String getAuthorizationServerEndpoint() {
        if (StringUtils.isBlank(this.oAuthEndpoint)) {
            initOAuthEndpoint();
        }
        return this.oAuthEndpoint;
        }
        /**
        * get the userInfoEndpoint.
        * @return userInfoEndpoint
        */
        private String getUserInfoEndpoint() {
        if (StringUtils.isBlank(this.userInfoEndpoint)) {
        initUserInfoEndPoint();
        }
        return this.userInfoEndpoint;
        }
        @Override
        public boolean canHandle(HttpServletRequest request) {
        log.trace("Inside FacebookAuthenticator.canHandle()");
        if (request.getParameter(FacebookCustomAuthenticatorConstants.OAUTH2_GRANT_TYPE_CODE) != null &&
        request.getParameter(FacebookCustomAuthenticatorConstants.OAUTH2_PARAM_STATE) != null &&
        FacebookCustomAuthenticatorConstants.FACEBOOK_LOGIN_TYPE.equals(getLoginType(request))) {
        return true;
        }
        return false;
        }
        @Override
        protected void initiateAuthenticationRequest(HttpServletRequest request,
        HttpServletResponse response, AuthenticationContext context)
        throws AuthenticationFailedException {
        try {
        Map authenticatorProperties = context.getAuthenticatorProperties();
        String clientId = authenticatorProperties.get(FacebookCustomAuthenticatorConstants.CLIENT_ID);
        String authorizationEP = getAuthorizationServerEndpoint();
        String scope = authenticatorProperties.get(FacebookCustomAuthenticatorConstants.SCOPE);
        if (StringUtils.isEmpty(scope)) {
            scope = FacebookCustomAuthenticatorConstants.EMAIL;
        }
        String callbackUrl = IdentityUtil.getServerURL(FrameworkConstants.COMMONAUTH, true, true);
        String state = context.getContextIdentifier() + "," +
            FacebookCustomAuthenticatorConstants.FACEBOOK_LOGIN_TYPE;
        OAuthClientRequest authzRequest =
            OAuthClientRequest.authorizationLocation(authorizationEP)
            .setClientId(clientId)
            .setRedirectURI(callbackUrl)
            .setResponseType(FacebookCustomAuthenticatorConstants.OAUTH2_GRANT_TYPE_CODE)
            .setScope(scope).setState(state)
            .buildQueryMessage();
        response.sendRedirect(authzRequest.getLocationUri());
        } catch (IOException e) {
        log.error("Exception while sending to the login page.", e);
        throw new AuthenticationFailedException(e.getMessage(), e);
        } catch (OAuthSystemException e) {
        log.error("Exception while building authorization code request.", e);
        throw new AuthenticationFailedException(e.getMessage(), e);
        }
        return;
        }
        @Override
        protected void processAuthenticationResponse(HttpServletRequest request,
        HttpServletResponse response,
        AuthenticationContext context)
        throws AuthenticationFailedException {
        log.trace("Inside FacebookAuthenticator.authenticate()");
        try {
        Map authenticatorProperties = context.getAuthenticatorProperties();
        String clientId = authenticatorProperties.get(FacebookCustomAuthenticatorConstants.CLIENT_ID);
        String clientSecret =
            authenticatorProperties.get(FacebookCustomAuthenticatorConstants.CLIENT_SECRET);
        String userInfoFields =
            authenticatorProperties.get(FacebookCustomAuthenticatorConstants.USER_INFO_FIELDS);
        String tokenEndPoint = getTokenEndpoint();
        String fbauthUserInfoUrl = getUserInfoEndpoint();
        String callbackUrl = IdentityUtil.getServerURL(FrameworkConstants.COMMONAUTH, true, true);
        String code = getAuthorizationCode(request);
        String token = getToken(tokenEndPoint, clientId, clientSecret, callbackUrl, code);
        if (!StringUtils.isBlank(userInfoFields)) {
            if (context.getExternalIdP().getIdentityProvider().getClaimConfig() != null && !StringUtils.isBlank(context.getExternalIdP().getIdentityProvider().getClaimConfig().getUserClaimURI())) {
            String userClaimUri = context.getExternalIdP().getIdentityProvider().getClaimConfig()
            .getUserClaimURI();
            if (!Arrays.asList(userInfoFields.split(",")).contains(userClaimUri)) {
            userInfoFields += ("," + userClaimUri);
            }
            } else {
            if (!Arrays.asList(userInfoFields.split(",")).contains(FacebookCustomAuthenticatorConstants
            .DEFAULT_USER_IDENTIFIER)) {
            userInfoFields += ("," + FacebookCustomAuthenticatorConstants.DEFAULT_USER_IDENTIFIER);
            }
            }
        }
        Map userInfoJson = getUserInfoJson(fbauthUserInfoUrl, userInfoFields, token);
        buildClaims(context, userInfoJson);
        } catch (ApplicationAuthenticatorException e) {
        log.error("Failed to process Facebook Connect response.", e);
        throw new AuthenticationFailedException(e.getMessage(), e);
        }
        }
        private String getAuthorizationCode(HttpServletRequest request) throws ApplicationAuthenticatorException {
        OAuthAuthzResponse authzResponse;
        try {
        authzResponse = OAuthAuthzResponse.oauthCodeAuthzResponse(request);
        return authzResponse.getCode();
        } catch (OAuthProblemException e) {
        throw new ApplicationAuthenticatorException("Exception while reading authorization code.", e);
        }
        }
        private String getToken(String tokenEndPoint, String clientId, String clientSecret,
        String callbackurl, String code) throws ApplicationAuthenticatorException {
        OAuthClientRequest tokenRequest = null;
        String token = null;
        try {
        tokenRequest =
            buidTokenRequest(tokenEndPoint, clientId, clientSecret, callbackurl,
            code);
        token = sendRequest(tokenRequest.getLocationUri());
        if (token.startsWith("{")) {
            throw new ApplicationAuthenticatorException("Received access token is invalid.");
        }
        } catch (MalformedURLException e) {
        if (log.isDebugEnabled()) {
            log.debug("URL : " + tokenRequest.getLocationUri());
        }
        throw new ApplicationAuthenticatorException(
            "MalformedURLException while sending access token request.",
            e);
        } catch (IOException e) {
        throw new ApplicationAuthenticatorException("IOException while sending access token request.", e);
        }
        return token;
        }
        private OAuthClientRequest buidTokenRequest(
        String tokenEndPoint, String clientId, String clientSecret, String callbackurl, String code)
        throws ApplicationAuthenticatorException {
        OAuthClientRequest tokenRequest = null;
        try {
        tokenRequest =
            OAuthClientRequest.tokenLocation(tokenEndPoint).setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRedirectURI(callbackurl).setCode(code)
            .buildQueryMessage();
        } catch (OAuthSystemException e) {
        throw new ApplicationAuthenticatorException("Exception while building access token request.", e);
        }
        return tokenRequest;
        }
        private String getUserInfoString(String fbAuthUserInfoUrl, String userInfoFields, String token)
        throws ApplicationAuthenticatorException {
        String userInfoString;
        try {
        if (StringUtils.isBlank(userInfoFields)) {
            userInfoString = sendRequest(String.format("%s?%s", fbAuthUserInfoUrl, token));
        } else {
            userInfoString = sendRequest(String.format("%s?fields=%s&%s", fbAuthUserInfoUrl, userInfoFields,
            token));
        }
        } catch (MalformedURLException e) {
        if (log.isDebugEnabled()) {
            log.debug("URL : " + fbAuthUserInfoUrl, e);
        }
        throw new ApplicationAuthenticatorException(
            "MalformedURLException while sending user information request.",
            e);
        } catch (IOException e) {
        throw new ApplicationAuthenticatorException(
            "IOException while sending sending user information request.",
            e);
        }
        return userInfoString;
        }
        private void setSubject(AuthenticationContext context, Map jsonObject)
        throws ApplicationAuthenticatorException {
        String authenticatedUserId = (String)
        jsonObject.get(FacebookCustomAuthenticatorConstants.DEFAULT_USER_IDENTIFIER);
        if (StringUtils.isEmpty(authenticatedUserId)) {
        throw new ApplicationAuthenticatorException("Authenticated user identifier is empty");
        }
        AuthenticatedUser authenticatedUser =
        AuthenticatedUser.createFederateAuthenticatedUserFromSubjectIdentifier(authenticatedUserId);
        context.setSubject(authenticatedUser);
        }
        private Map getUserInfoJson(String fbAuthUserInfoUrl, String userInfoFields, String token)
        throws ApplicationAuthenticatorException {
        String userInfoString = getUserInfoString(fbAuthUserInfoUrl, userInfoFields, token);
        if (log.isDebugEnabled() && IdentityUtil.isTokenLoggable(IdentityConstants.IdentityTokens.USER_ID_TOKEN)) {
        log.debug("UserInfoString : " + userInfoString);
        }
        Map jsonObject = JSONUtils.parseJSON(userInfoString);
        return jsonObject;
        }
        public void buildClaims(AuthenticationContext context, Map jsonObject)
        throws ApplicationAuthenticatorException {
        if (jsonObject != null) {
        Map claims = new HashMap();
        for (Map.Entry entry: jsonObject.entrySet()) {
            claims.put(ClaimMapping.build(entry.getKey(), entry.getKey(), null,
            false), entry.getValue().toString());
            if (log.isDebugEnabled() &&
            IdentityUtil.isTokenLoggable(IdentityConstants.IdentityTokens.USER_CLAIMS)) {
            log.debug("Adding claim mapping : " + entry.getKey() + " <> " + entry.getKey() + " : " + entry.getValue());
            }
        }
        if (StringUtils.isBlank(context.getExternalIdP().getIdentityProvider().getClaimConfig().getUserClaimURI())) {
            context.getExternalIdP().getIdentityProvider().getClaimConfig().setUserClaimURI(FacebookCustomAuthenticatorConstants.EMAIL);
        }
        String subjectFromClaims = FrameworkUtils.getFederatedSubjectFromClaims(
            context.getExternalIdP().getIdentityProvider(), claims);
        if (subjectFromClaims != null && !subjectFromClaims.isEmpty()) {
            AuthenticatedUser authenticatedUser =
            AuthenticatedUser.createFederateAuthenticatedUserFromSubjectIdentifier(subjectFromClaims);
            context.setSubject(authenticatedUser);
        } else {
            setSubject(context, jsonObject);
        }
        context.getSubject().setUserAttributes(claims);
        } else {
        if (log.isDebugEnabled()) {
            log.debug("Decoded json object is null");
        }
        throw new ApplicationAuthenticatorException("Decoded json object is null");
        }
        }
        @Override
        public String getContextIdentifier(HttpServletRequest request) {
        log.trace("Inside FacebookAuthenticator.getContextIdentifier()");
        String state = request.getParameter(FacebookCustomAuthenticatorConstants.OAUTH2_PARAM_STATE);
        if (state != null) {
        return state.split(",")[0];
        } else {
        return null;
        }
        }
        private String sendRequest(String url) throws IOException {
        BufferedReader in = null;
        StringBuilder b = new StringBuilder();
        try {
        URLConnection urlConnection = new URL(url).openConnection(); in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),
            Charset.forName("utf­8")));
        String inputLine = in .readLine();
        while (inputLine != null) {
            b.append(inputLine).append("\n");
            inputLine = in .readLine();
        }
        } finally {
        IdentityIOStreamUtils.closeReader( in );
        }
        return b.toString();
        }
        private String getLoginType(HttpServletRequest request) {
        String state = request.getParameter(FacebookCustomAuthenticatorConstants.OAUTH2_PARAM_STATE);
        if (state != null) {
        return state.split(",")[1];
        } else {
        return null;
        }
        }
        @Override
        public String getFriendlyName() {
        return "Custom­Facebook";
        }
        @Override
        public String getName() {
        return FacebookCustomAuthenticatorConstants.AUTHENTICATOR_NAME;
        }
        @Override
        public List getConfigurationProperties() {
        List configProperties = new ArrayList();
        Property clientId = new Property();
        clientId.setName(FacebookCustomAuthenticatorConstants.CLIENT_ID);
        clientId.setDisplayName("Client Id");
        clientId.setRequired(true);
        clientId.setDescription("Enter Facebook client identifier value");
        configProperties.add(clientId);
        Property clientSecret = new Property();
        clientSecret.setName(FacebookCustomAuthenticatorConstants.CLIENT_SECRET);
        clientSecret.setDisplayName("Client Secret");
        clientSecret.setRequired(true);
        clientSecret.setConfidential(true);
        clientSecret.setDescription("Enter Facebook client secret value");
        configProperties.add(clientSecret);
        Property scope = new Property();
        scope.setName(FacebookCustomAuthenticatorConstants.SCOPE);
        scope.setDisplayName("Scope");
        scope.setDescription("Enter Facebook scopes");
        scope.setDefaultValue("id");
        scope.setRequired(false);
        configProperties.add(scope);
        Property userIdentifier = new Property();
        userIdentifier.setName(FacebookCustomAuthenticatorConstants.USER_INFO_FIELDS);
        userIdentifier.setDisplayName("User Identifier Field");
        userIdentifier.setDescription("Enter Facebook user identifier field");
        userIdentifier.setDefaultValue("id");
        userIdentifier.setRequired(false);
        configProperties.add(userIdentifier);
        return configProperties;
        }
        }
        /*
        * Copyright (c) 2014, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.social.facebook2;
        public class FacebookCustomAuthenticatorConstants {
        public static final String AUTHENTICATOR_NAME = "FacebookAuthenticator­Custom";
        public static final String FACEBOOK_LOGIN_TYPE = "facebook";
        public static final String OAUTH2_GRANT_TYPE_CODE = "code";
        public static final String OAUTH2_PARAM_STATE = "state";
        public static final String EMAIL = "email";
        public static final String SCOPE = "Scope";
        public static final String USER_INFO_FIELDS = "UserInfoFields";
        public static final String DEFAULT_USER_IDENTIFIER = "id";
        public static final String CLIENT_ID = "ClientId";
        public static final String CLIENT_SECRET = "ClientSecret";
        public static final String FB_AUTHZ_URL = "AuthnEndpoint";
        public static final String FB_TOKEN_URL = "AuthTokenEndpoint";
        public static final String FB_USER_INFO_URL = "UserInfoEndpoint";
        private FacebookCustomAuthenticatorConstants() {}
        }
        /*
        * Copyright (c) WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.social.internal;
        import org.apache.commons.logging.Log;
        import org.apache.commons.logging.LogFactory;
        import org.osgi.service.component.ComponentContext;
        import org.wso2.carbon.identity.application.authentication.framework.ApplicationAuthenticator;
        import org.wso2.carbon.identity.application.authenticator.social.facebook2.FacebookCustomAuthenticator;
        import java.util.Hashtable;
        /**
        * @scr.component name="identity.application.authenticator.facebook.component"
        * immediate="true"
        */
        public class FacebookCustomAuthenticatorServiceComponent {
        private static final Log LOGGER = LogFactory.getLog(FacebookCustomAuthenticatorServiceComponent.class);
        protected void activate(ComponentContext ctxt) {
        try {
        FacebookCustomAuthenticator facebookAuthenticator = new FacebookCustomAuthenticator();
        Hashtable props = new Hashtable();
        ctxt.getBundleContext().registerService(ApplicationAuthenticator.class.getName(),
            facebookAuthenticator, props);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Facebook Custome Authenticator bundle is activated");
        }
        } catch (Throwable e) {
        LOGGER.fatal(" Error while activating Facebook authenticator ", e);
        }
        }
        protected void deactivate(ComponentContext ctxt) {
        if (LOGGER.isDebugEnabled()) {
        LOGGER.debug("Facebook Custom Authenticator bundle is deactivated");
        }
        }
        }
        ```

--- 
## Write a custom authenticator for Google

This section includes the code used to write the custom authenticator for Google.

1.  Download the source code from [here](https://svn.wso2.org/repos/wso2/people/thanuja/org.wso2.carbon.identity.application.authenticator.social/)
    using the following command on your terminal.

    ``` java
    $ svn checkout https://svn.wso2.org/repos/wso2/people/thanuja/org.wso2.carbon.identity.application.authenticator.social/
    ```

2.  Navigate to the folder you just downloaded, which contains the `pom.xml` file and build the source code by running the following command on your terminal.

    ``` java
    $ mvn clean install
    ```

3.  Copy the `org.wso2.carbon.identity.application.authenticator.custom.google­5.0.0.jar` file found inside the `target` folder and paste it in the `<IS_HOME>/repository/components/dropins` folder.

    ??? info "Click here to view the source code"
        ``` java
        /*
        * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.custom.google;
        import org.apache.commons.lang.StringUtils;
        import org.apache.oltu.oauth2.client.response.OAuthClientResponse;
        import org.wso2.carbon.identity.application.authentication.framework.context.AuthenticationContext;
        import org.wso2.carbon.identity.application.authenticator.oidc.OIDCAuthenticatorConstants;
        import org.wso2.carbon.identity.application.authenticator.oidc.OpenIDConnectAuthenticator;
        import org.wso2.carbon.identity.application.common.model.Property;
        import org.wso2.carbon.identity.application.common.util.IdentityApplicationConstants;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.Map;
        public class GoogleCustomOAuth2Authenticator extends OpenIDConnectAuthenticator {
        private static final long serialVersionUID = ­4154255583070524011 L;
        private String tokenEndpoint;
        private String oAuthEndpoint;
        private String userInfoURL;
        /**
        * initiate tokenEndpoint
        */
        private void initTokenEndpoint() {
        this.tokenEndpoint =
            getAuthenticatorConfig().getParameterMap().get(GoogleCustomOAuth2AuthenticationConstant
            .GOOGLE_TOKEN_ENDPOINT);
        if (StringUtils.isBlank(this.tokenEndpoint)) {
            this.tokenEndpoint = IdentityApplicationConstants.GOOGLE_TOKEN_URL;
        }
        }
        /**
        * initiate authorization server endpoint
        */
        private void initOAuthEndpoint() {
        this.oAuthEndpoint =
            getAuthenticatorConfig().getParameterMap().get(GoogleCustomOAuth2AuthenticationConstant
            .GOOGLE_AUTHZ_ENDPOINT);
        if (StringUtils.isBlank(this.oAuthEndpoint)) {
            this.oAuthEndpoint = IdentityApplicationConstants.GOOGLE_OAUTH_URL;
        }
        }
        /**
        * Initialize the Yahoo user info url.
        */
        private void initUserInfoURL() {
        userInfoURL = getAuthenticatorConfig()
            .getParameterMap()
            .get(GoogleCustomOAuth2AuthenticationConstant.GOOGLE_USERINFO_ENDPOINT);
        if (userInfoURL == null) {
            userInfoURL = IdentityApplicationConstants.GOOGLE_USERINFO_URL;
        }
        }
        /**
        * Get the user info endpoint url.
        * @return User info endpoint url.
        */
        private String getUserInfoURL() {
        if (userInfoURL == null) {
            initUserInfoURL();
        }
        return userInfoURL;
        }
        /**
        * Get Authorization Server Endpoint
        *
        * @param authenticatorProperties this is not used currently in the method
        * @return oAuthEndpoint
        */
        @Override
        protected String getAuthorizationServerEndpoint(Map < String, String > authenticatorProperties) {
        if (StringUtils.isBlank(this.oAuthEndpoint)) {
            initOAuthEndpoint();
        }
        return this.oAuthEndpoint;
        }
        /**
        * Get Token Endpoint
        *
        * @param authenticatorProperties this is not used currently in the method
        * @return tokenEndpoint
        */
        @Override
        protected String getTokenEndpoint(Map < String, String > authenticatorProperties) {
        if (StringUtils.isBlank(this.tokenEndpoint)) {
            initTokenEndpoint();
        }
        return this.tokenEndpoint;
        }
        /**
        * Get Scope
        *
        * @param scope
        * @param authenticatorProperties
        * @return
        */
        @Override
        protected String getScope(String scope,
        Map < String, String > authenticatorProperties) {
        return GoogleCustomOAuth2AuthenticationConstant.GOOGLE_SCOPE;
        }
        @Override
        protected String getAuthenticateUser(AuthenticationContext context, Map < String, Object > jsonObject,
        OAuthClientResponse token) {
        if (jsonObject.get(OIDCAuthenticatorConstants.Claim.EMAIL) == null) {
            return (String) jsonObject.get("sub");
        } else {
            return (String) jsonObject.get(OIDCAuthenticatorConstants.Claim.EMAIL);
        }
        }
        /**
        * Get google user info endpoint.
        * @param token OAuth client response.
        * @return User info endpoint.
        */
        @Override
        protected String getUserInfoEndpoint(OAuthClientResponse token, Map < String, String > authenticatorProperties) {
        return getUserInfoURL();
        }
        @Override
        protected String getQueryString(Map < String, String > authenticatorProperties) {
        return
        authenticatorProperties.get(GoogleCustomOAuth2AuthenticationConstant.ADDITIONAL_QUERY_PARAMS);
        }
        /**
        * Get Configuration Properties
        *
        * @return
        */
        @Override
        public List < Property > getConfigurationProperties() {
        List < Property > configProperties = new ArrayList < Property > ();
        Property clientId = new Property();
        clientId.setName(OIDCAuthenticatorConstants.CLIENT_ID);
        clientId.setDisplayName("Client Id");
        clientId.setRequired(true);
        clientId.setDescription("Enter Google IDP client identifier value");
        clientId.setDisplayOrder(1);
        configProperties.add(clientId);
        Property clientSecret = new Property();
        clientSecret.setName(OIDCAuthenticatorConstants.CLIENT_SECRET);
        clientSecret.setDisplayName("Client Secret");
        clientSecret.setRequired(true);
        clientSecret.setConfidential(true);
        clientSecret.setDescription("Enter Google IDP client secret value");
        clientSecret.setDisplayOrder(2);
        configProperties.add(clientSecret);
        Property callbackUrl = new Property();
        callbackUrl.setDisplayName("Callback Url");
        callbackUrl.setName(IdentityApplicationConstants.OAuth2.CALLBACK_URL);
        callbackUrl.setDescription("Enter value corresponding to callback url.");
        callbackUrl.setDisplayOrder(3);
        configProperties.add(callbackUrl);
        Property scope = new Property();
        scope.setDisplayName("Additional Query Parameters");
        scope.setName("AdditionalQueryParameters");
        scope.setValue("scope=openid email profile");
        scope.setDescription("Additional query parameters. e.g: paramName1=value1");
        scope.setDisplayOrder(4);
        configProperties.add(scope);
        return configProperties;
        }
        /**
        * Get Friendly Name
        *
        * @return
        */
        @Override
        public String getFriendlyName() {
        return GoogleCustomOAuth2AuthenticationConstant.GOOGLE_CONNECTOR_FRIENDLY_NAME;
        }
        /**
        * GetName
        *
        * @return
        */
        @Override
        public String getName() {
        return GoogleCustomOAuth2AuthenticationConstant.GOOGLE_CONNECTOR_NAME;
        }
        }
        /*
        * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.custom.google;
        public class GoogleCustomOAuth2AuthenticationConstant {
        private GoogleCustomOAuth2AuthenticationConstant() {}
        public static final String GOOGLE_AUTHZ_ENDPOINT = "GoogleAuthzEndpoint";
        public static final String GOOGLE_TOKEN_ENDPOINT = "GoogleTokenEndpoint";
        public static final String GOOGLE_USERINFO_ENDPOINT = "GoogleUserInfoEndpoint";
        public static final String GOOGLE_CONNECTOR_FRIENDLY_NAME = "Custom Google Authenticator";
        public static final String GOOGLE_CONNECTOR_NAME = "CustomGoogleOAUth2OpenIDAuthenticator";
        public static final String GOOGLE_SCOPE = "openid email profile";
        public static final String CALLBACK_URL = "Google­callback­url";
        public static final String ADDITIONAL_QUERY_PARAMS = "AdditionalQueryParameters";
        }
        /*
        * Copyright (c) WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        *
        * WSO2 Inc. licenses this file to you under the Apache License,
        * Version 2.0 (the "License"); you may not use this file except
        * in compliance with the License.
        * You may obtain a copy of the License at
        *
        * http://www.apache.org/licenses/LICENSE­2.0
        *
        * Unless required by applicable law or agreed to in writing,
        * software distributed under the License is distributed on an
        * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        * KIND, either express or implied. See the License for the
        * specific language governing permissions and limitations
        * under the License.
        */
        package org.wso2.carbon.identity.application.authenticator.custom.internal;
        import org.apache.commons.logging.Log;
        import org.apache.commons.logging.LogFactory;
        import org.osgi.service.component.ComponentContext;
        import org.wso2.carbon.identity.application.authentication.framework.ApplicationAuthenticator;
        import org.wso2.carbon.identity.application.authenticator.custom.google.GoogleCustomOAuth2Authenticator;
        import java.util.Hashtable;
        /**
        * @scr.component name="identity.application.authenticator.custom.google.component" immediate="true"
        */
        public class GoogleCustomAuthenticatorServiceComponent {
        private static final Log LOGGER = LogFactory.getLog(GoogleCustomAuthenticatorServiceComponent.class);
        protected void activate(ComponentContext context) {
        try {
        GoogleCustomOAuth2Authenticator googleAuthenticator = new GoogleCustomOAuth2Authenticator();
        Hashtable < String, String > props = new Hashtable < String, String > ();
        context.getBundleContext().registerService(ApplicationAuthenticator.class.getName(),
            googleAuthenticator, props);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("Google custom authenticator bundle is activated");
        }
        } catch (Exception e) {
        LOGGER.fatal(" Error while activating Google authenticator ", e);
        }
        }
        protected void deactivate(ComponentContext context) {
        if (LOGGER.isDebugEnabled()) {
        LOGGER.debug("Google custom authenticator bundle is deactivated");
        }
        }
        } 
         
        <?xml version="1.0" encoding="utf­8" ?>
        <!­­
        ~ Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
        ~
        ~ Licensed under the Apache License, Version 2.0 (the "License");
        ~ you may not use this file except in compliance with the License.
        ~ You may obtain a copy of the License at
        ~
        ~ http://www.apache.org/licenses/LICENSE­2.0
        ~
        ~ Unless required by applicable law or agreed to in writing, software
        ~ distributed under the License is distributed on an "AS IS" BASIS,
        ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        ~ See the License for the specific language governing permissions and
        ~ limitations under the License.
        >
        <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema­instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven­v4_0_0.xsd">
            <parent>
                <groupId>org.wso2.carbon.identity</groupId>
                <artifactId>application­authenticators</artifactId>
                <version>5.0.7</version>
            </parent>
            <modelVersion>4.0.0</modelVersion>
            <artifactId>org.wso2.carbon.identity.application.authenticator.custom.google</artifactId>
            <packaging>bundle</packaging>
            <version>5.0.0</version>
            <repositories>
                <!­­ Before adding ANYTHING in here, please start a discussion on the dev list.
        Ideally the Axis2 build should only use Maven central (which is available
        by default) and nothing else. We had troubles with other repositories in
        the past. Therefore configuring additional repositories here should be
        considered very carefully. ­­>
                <repository>
                    <id>wso2­nexus</id>
                    <name>WSO2 internal Repository</name>
                    <url>http://maven.wso2.org/nexus/content/groups/wso2­public/</url>
                    <releases>
                        <enabled>true</enabled>
                        <updatePolicy>daily</updatePolicy>
                        <checksumPolicy>ignore</checksumPolicy>
                    </releases>
                </repository>
                <repository>
                    <id>wso2.releases</id>
                    <name>WSO2 internal Repository</name>
                    <url>http://maven.wso2.org/nexus/content/repositories/releases/</url>
                    <releases>
                        <enabled>true</enabled>
                        <updatePolicy>daily</updatePolicy>
                        <checksumPolicy>ignore</checksumPolicy>
                    </releases>
                </repository>
                <repository>
                    <id>wso2.snapshots</id>
                    <name>WSO2 Snapshot Repository</name>
                    <url>http://maven.wso2.org/nexus/content/repositories/snapshots/</url>
                    <snapshots>
                        <enabled>true</enabled>
                        <updatePolicy>daily</updatePolicy>
                    </snapshots>
                    <releases>
                        <enabled>false</enabled>
                    </releases>
                </repository>
            </repositories>
            <dependencies>
                <dependency>
                    <groupId>org.wso2.carbon</groupId>
                    <artifactId>org.wso2.carbon.logging</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon.identity</groupId>
                    <artifactId>org.wso2.carbon.identity.application.authentication.framework</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon</groupId>
                    <artifactId>org.wso2.carbon.ui</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.orbit.org.apache.oltu.oauth2</groupId>
                    <artifactId>oltu</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon.identity</groupId>
                    <artifactId>org.wso2.carbon.identity.application.common</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon.identity</groupId>
                    <artifactId>org.wso2.carbon.identity.application.authenticator.openid</artifactId>
                </dependency>
                <dependency>
                    <groupId>org.wso2.carbon.identity</groupId>
                    <artifactId>org.wso2.carbon.identity.application.authenticator.oidc</artifactId>
                </dependency>
            </dependencies>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.felix</groupId>
                        <artifactId>maven­scr­plugin</artifactId>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.felix</groupId>
                        <artifactId>maven­bundle­plugin</artifactId>
                        <extensions>true</extensions>
                        <configuration>
                            <instructions>
                                <Bundle­SymbolicName>${project.artifactId}</Bundle­SymbolicName>
                                <Bundle­Name>${project.artifactId}</Bundle­Name>
                                <Private­Package>
                                    org.wso2.carbon.identity.application.authenticator.custom.internal
                                </Private­Package>
                                <Import­Package>
                                    javax.servlet.http; version="${imp.pkg.version.javax.servlet}", org.apache.oltu.oauth2.*; version="${oltu.package.import.version.range}", org.apache.commons.lang; version="${commons­lang.wso2.osgi.version.range}", org.apache.commons.logging; version="${commons­logging.osgi.version.range}", org.apache.commons.codec.binary; version="${commons­codec.wso2.osgi.version.range}", org.osgi.framework; version="${osgi.framework.imp.pkg.version.range}", org.osgi.service.component; version="${osgi.service.component.imp.pkg.version.range}", org.wso2.carbon.identity.application.authentication.framework.*; version="${carbon.identity.package.import.version.range}", org.wso2.carbon.identity.application.common.model; version="${carbon.identity.package.import.version.range}", org.wso2.carbon.identity.core.util; version="${carbon.identity.package.import.version.range}", org.wso2.carbon.ui; version="${carbon.kernel.package.import.version.range}", org.wso2.carbon.identity.application.authenticator.oidc; version="[5.0.7, 5.1.0)"
                                </Import­Package>
                                <Export­Package>
                                    !org.wso2.carbon.identity.application.authenticator.custom.internal, org.wso2.carbon.identity.application.authenticator.custom.google.*; version="5.0.0"
                                </Export­Package>
                            </instructions>
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </project>
        ```
