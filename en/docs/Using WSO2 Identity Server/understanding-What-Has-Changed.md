# Understanding What Has Changed

This page provides details about the behavioral changes and
configuration changes from WSO2 Identity Server 5.7.0 to 5.8.0.

-   [Behavioral changes](#UnderstandingWhatHasChanged-Behavioralchanges)
-   [Configuration
    changes](#UnderstandingWhatHasChanged-Configurationchanges)

### Behavioral changes

This section explains the features for which the behaviour has changed,
and the impact is causes on your current implementation when you migrate
to the latest release. Go through the behavioral changes to understand
what has changed and prepare for migration impact.

<table>
<colgroup>
<col style="width: 12%" />
<col style="width: 87%" />
</colgroup>
<thead>
<tr class="header">
<th>Number</th>
<th>Change</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><div class="content-wrapper">
<p>#1</p>
<p><br />
</p>
</div></td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> By default, WSO2 IS supports a fixed set of attributes for the SCIM2 user object. These are default attributes that are defined through the SCIM2 specification. However, in reality, organizations in the industry will have their own defined attributes for users. In such cases, the Enterprise User schema extension can be used. The Enterprise User schema extension defines attributes commonly used in representing users that belong to, or act on behalf of, a business or enterprise.</p>
<p><strong>Change:</strong> In this release, the <code>               urn:ietf:params:scim:schemas:extension:enterprise:2.0:User              </code> key is used in SCIM user creation to specify the properties of a user specified in <code>               urn:ietf:params:scim:schemas:extension:enterprise:2.0:User              </code> . This behavioral change is done in order to comply with the <a href="https://tools.ietf.org/html/rfc7643#section-3.3">SCIM2 specification</a> .</p>
<p><strong>Example:</strong> For example, the SCIM2 response for the List Users API has changed as follows.</p>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-33571004" class="expand-container">
<div id="expander-control-33571004" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the example
</div>
<div id="expander-content-33571004" class="expand-content">
<div class="localtabs-macro">
<div class="aui-tabs horizontal-tabs" data-aui-responsive="true" role="application">
<ul>
<li><a href="#af5e61b6709446c888f48940d7d33eb4"><strong>5.7.0</strong></a></li>
<li><a href="#99104c25297b443097201f37d2094ebe"><strong>5.8.0</strong></a></li>
</ul>
<div id="af5e61b6709446c888f48940d7d33eb4" class="tabs-pane active-pane" data-active="true" name="5.7.0 ">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>5.7.0 Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">curl -v -k --user admin:admin https:<span class="co">//localhost:9443/scim2/Users/7d132f02-221d-4a5f-8b95-8635666e96c7</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>5.7.0 Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">{<span class="st">&quot;emails&quot;</span>:[<span class="st">&quot;kim@wso2.com&quot;</span>],<span class="st">&quot;EnterpriseUser&quot;</span>:{<span class="st">&quot;organization&quot;</span>:<span class="st">&quot;Wso2&quot;</span>},<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T06:53:03.382Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T06:57:05.730Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;Alex&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;Anderson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;7d132f02-221d-4a5f-8b95-8635666e96c7&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim3&quot;</span>}</a></code></pre></div>
</div>
</div>
</div>
<div id="99104c25297b443097201f37d2094ebe" class="tabs-pane" name="5.8.0 ">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>5.8.0 Request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">curl -v -k --user admin:admin https:<span class="co">//localhost:9443/scim2/Users/7d132f02-221d-4a5f-8b95-8635666e96c7</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>5.8.0 Response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb4-1" title="1">{<span class="st">&quot;emails&quot;</span>:[<span class="st">&quot;kim@wso2.com&quot;</span>],<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>:{<span class="st">&quot;organization&quot;</span>:<span class="st">&quot;Wso2&quot;</span>},<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T06:53:03.382Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T06:57:05.730Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:schemas:core:2.0:User&quot;</span>,<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span>],<span class="st">&quot;roles&quot;</span>:[{<span class="st">&quot;type&quot;</span>:<span class="st">&quot;default&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;Internal/everyone&quot;</span>}],<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;Alex&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;Anderson&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;7d132f02-221d-4a5f-8b95-8635666e96c7&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim3&quot;</span>}</a></code></pre></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<p><strong>Impact:</strong> When using the Enterprise User schema extension, if a client has been written based on the 5.7.0 response shown above, issues may occur from the client side as the response of the default pack has now changed.</p>
<p><strong>How to revert:</strong> To revert back to the previous behaviour, change the following attributeName back to " <code>               EnterpriseUser              </code> " in the <code>               &lt;IS_HOME&gt;/repository/conf/scim2-schema-extension.xm              </code> l file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb5" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb5-1" title="1">attributeURI<span class="st">&quot;:&quot;</span>urn:ietf:params:scim:schemas:extension:enterprise:<span class="fl">2.</span><span class="dv">0</span>:User<span class="st">&quot;,</span></a>
<a class="sourceLine" id="cb5-2" title="2"></a>
<a class="sourceLine" id="cb5-3" title="3"><span class="st">&quot;attributeName&quot;</span>:<span class="st">&quot;urn:ietf:params:scim:schemas:extension:enterprise:2.0:User&quot;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<p>#2</p>
<p><br />
</p>
</div></td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> WSO2 IS uses a configuration property to determine the private key that should be used to sign the JWTs issued by the WSO2 Identity Server.</p>
<p><strong>Change:</strong> In IS 5.7.0 the configuration property is set to 'false' by default, which means the JWTs such as <code>               Id token              </code> , <code>               Request Object              </code> , <code>               Self Contain access token              </code> etc., are signed using the private key of the authorized user's tenant domain keystore. From IS 5.8.0 onwards, the default value is set to 'true', which means that JWTs issued from WSO2 IS are signed with the private key belonging to the service provider's keystore.</p>
<p><strong>Impact:</strong> This only makes a difference if the service provider is a SaaS-enabled one; else the user’s tenant domain and the service provider’s tenant domain are the same. If the service provider is SaaS-enabled and this property is set to false, verifying the signature based on the public key of the keystore of the authorized users the signature verification can fail.</p>
<p><strong>How to revert: <strong></strong></strong> T o revert back to the previous behavior, change the following property value back to "false" in the <code style="color: rgb(36,41,46);">               &lt;IS_HOME&gt;/repository/conf/identity/identity.xm              </code> l file .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb6" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb6-1" title="1">&lt;SignJWTWithSPKey&gt;<span class="kw">true</span>&lt;/SignJWTWithSPKey&gt;</a></code></pre></div>
</div>
</div>
<p><br />
</p>
</div></td>
</tr>
<tr class="odd">
<td>#3</td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> In prior versions of WSO2 Identity Server, data publishers were implementations of the <a href="https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AbstractAuthenticationDataPublisher.java">AbstractAuthenticationDataPublisher</a> that are invoked iteratively by the <a href="https://github.com/wso2-extensions/identity-data-publisher-authentication/blob/master/components/org.wso2.carbon.identity.data.publisher.application.authentication/src/main/java/org/wso2/carbon/identity/data/publisher/application/authentication/AuthnDataPublisherProxy.java">AuthnDataPublisherProxy</a> when a session changes, such that the data publishers send events to their corresponding destinations. From WSO2 Identity Server 5.8.0 onwards, all data publishers have been migrated to act as event handlers that subscribe to authentication events.</p>
<p><strong>Impact:</strong> Custom DataPublishers that were written for previous versions will not work with the default pack as these listeners are now disabled. For information about migrating existing data publishers to event handlers, see <a href="https://docs.wso2.com/display/IS580/Migrating+Data+Publishers">Migrating Data Publishers</a> .</p>
<p><strong>How to revert:</strong> T o revert back to the previous behavior, do the following:</p>
<p>Add and enable the following event listeners in the <code>               &lt;IS_HOME&gt;/repository/conf/identity/identity.xm              </code> l file .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb7" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb7-1" title="1">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler&quot;</span>                    name=<span class="st">&quot;org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl&quot;</span> orderId=<span class="st">&quot;10&quot;</span> enable=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-2" title="2"></a>
<a class="sourceLine" id="cb7-3" title="3">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler&quot;</span> name=<span class="st">&quot;org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl&quot;</span> orderId=<span class="st">&quot;11&quot;</span> enable=<span class="st">&quot;true&quot;</span>/&gt;</a>
<a class="sourceLine" id="cb7-4" title="4"></a>
<a class="sourceLine" id="cb7-5" title="5">&lt;<span class="bu">EventListener</span> type=<span class="st">&quot;org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler&quot;</span> name=<span class="st">&quot;org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator&quot;</span> orderId=<span class="st">&quot;10&quot;</span> enable=<span class="st">&quot;true&quot;</span>/&gt;</a></code></pre></div>
</div>
</div>
<p>Set the enable parameter of the following properties to "false" in the <code>               &lt;IS_HOME&gt;/repository/conf/identity/identity-event.properties              </code> file .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb8" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb8-1" title="1">module.<span class="fu">name</span><span class="fl">.14</span>=analyticsLoginDataPublisheranalyticsLoginDataPublisher.<span class="fu">subscription</span><span class="fl">.1</span>=AUTHENTICATION_STEP_SUCCESS</a>
<a class="sourceLine" id="cb8-2" title="2">analyticsLoginDataPublisher.<span class="fu">subscription</span><span class="fl">.2</span>=AUTHENTICATION_STEP_FAILURE</a>
<a class="sourceLine" id="cb8-3" title="3">analyticsLoginDataPublisher.<span class="fu">subscription</span><span class="fl">.3</span>=AUTHENTICATION_SUCCESS</a>
<a class="sourceLine" id="cb8-4" title="4">analyticsLoginDataPublisher.<span class="fu">subscription</span><span class="fl">.4</span>=AUTHENTICATION_FAILURE</a>
<a class="sourceLine" id="cb8-5" title="5">analyticsLoginDataPublisher.<span class="fu">enable</span>=<span class="kw">false</span></a>
<a class="sourceLine" id="cb8-6" title="6"> </a>
<a class="sourceLine" id="cb8-7" title="7">module.<span class="fu">name</span><span class="fl">.15</span>=analyticsSessionDataPublisher</a>
<a class="sourceLine" id="cb8-8" title="8">analyticsSessionDataPublisher.<span class="fu">subscription</span><span class="fl">.1</span>=SESSION_CREATE</a>
<a class="sourceLine" id="cb8-9" title="9">analyticsSessionDataPublisher.<span class="fu">subscription</span><span class="fl">.2</span>=SESSION_UPDATE</a>
<a class="sourceLine" id="cb8-10" title="10"> </a>
<a class="sourceLine" id="cb8-11" title="11">analyticsSessionDataPublisher.<span class="fu">subscription</span><span class="fl">.3</span>=SESSION_TERMINATE</a>
<a class="sourceLine" id="cb8-12" title="12">analyticsSessionDataPublisher.<span class="fu">enable</span>=<span class="kw">true</span></a>
<a class="sourceLine" id="cb8-13" title="13"> </a>
<a class="sourceLine" id="cb8-14" title="14">module.<span class="fu">name</span><span class="fl">.13</span>=authenticationAuditLogger</a>
<a class="sourceLine" id="cb8-15" title="15">authenticationAuditLogger.<span class="fu">subscription</span><span class="fl">.1</span>=AUTHENTICATION_STEP_SUCCESS</a>
<a class="sourceLine" id="cb8-16" title="16">authenticationAuditLogger.<span class="fu">subscription</span><span class="fl">.2</span>=AUTHENTICATION_STEP_FAILURE</a>
<a class="sourceLine" id="cb8-17" title="17">authenticationAuditLogger.<span class="fu">subscription</span><span class="fl">.3</span>=AUTHENTICATION_SUCCESS</a>
<a class="sourceLine" id="cb8-18" title="18">authenticationAuditLogger.<span class="fu">subscription</span><span class="fl">.4</span>=AUTHENTICATION_FAILURE</a>
<a class="sourceLine" id="cb8-19" title="19">authenticationAuditLogger.<span class="fu">subscription</span><span class="fl">.5</span>=SESSION_TERMINATE</a>
<a class="sourceLine" id="cb8-20" title="20">authenticationAuditLogger.<span class="fu">enable</span>=true<span class="st">&quot;</span></a>
<a class="sourceLine" id="cb8-21" title="21"> </a>
<a class="sourceLine" id="cb8-22" title="22">module.<span class="fu">name</span><span class="fl">.16</span>=failLoginAttemptValidator</a>
<a class="sourceLine" id="cb8-23" title="23">failLoginAttemptValidator.<span class="fu">subscription</span><span class="fl">.1</span>=AUTHENTICATION_STEP_FAILURE</a>
<a class="sourceLine" id="cb8-24" title="24">failLoginAttemptValidator.<span class="fu">enable</span>=<span class="kw">true</span></a></code></pre></div>
</div>
</div>
<p><strong><strong></strong></strong></p>
</div></td>
</tr>
<tr class="even">
<td>#4</td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> The following configuration properties have been added to support f iltering users or groups only from the PRIMARY domain.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb9" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb9-1" title="1">&lt;MandateDomainForUsernamesAndGroupNamesInResponse&gt;<span class="kw">false</span>&lt;/MandateDomainForUsernamesAndGroupNamesInResponse&gt;</a>
<a class="sourceLine" id="cb9-2" title="2">&lt;MandateDomainForGroupNamesInGroupsResponse&gt;<span class="kw">false</span>&lt;/MandateDomainForGroupNamesInGroupsResponse&gt;</a></code></pre></div>
</div>
</div>
<p><strong>Change:</strong> Enabling the &lt; <code>               MandateDomainForUsernamesAndGroupNamesInResponse&gt;              </code> property prepends the "PRIMARY/" prefix in the SCIM2 response to the user names and role names (group names) that belong to the PRIMARY user store, regardless of whether the response is for the users endpoint or the groups endpoint. When the properties are set to 'false', the "PRIMARY/" prefix will not be prepended.</p>
<p><strong>Impact:</strong> When this property is enabled, the SCIM response will be different from responses received in previous versions of WSO2 IS. Therefore, if some clients have been written based on these SCIM responses, there is a possibility that this change could break those clients.</p>
<p><strong>Example:</strong> The following code blocks show the difference between the requests and responses that are recieved when this property is enabled, when it is disabled, and in versions prior to 5.8.0. Note that in previous versions, there is an inconsistency in the responses recieved (i.e., the "PRIMARY/" prefix is prepended to group names only in the groups endpoint request). This inconsistency has been fixed with the introduction of these two new properties. When the &lt; <code>               MandateDomainForUsernamesAndGroupNamesInResponse&gt;              </code> property is enabled, the "PRIMARY/" prefix is prepended to both user names and group names for both users and groups endpoint responses, and when the property is disabled, it is not prepended at all.</p>
<div class="panel" style="background-color: White;border-color: Black;border-width: 1px;">
<div class="panelContent" style="background-color: White;">
<div id="expander-129526791" class="expand-container">
<div id="expander-control-129526791" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to see the example
</div>
<div id="expander-content-129526791" class="expand-content">
<div class="localtabs-macro">
<div class="aui-tabs horizontal-tabs" data-aui-responsive="true" role="application">
<ul>
<li><a href="#e8c2ae4e223441ff9d2a251a0cbc43f7"><strong>Old behavior</strong></a></li>
<li><a href="#e46eeec34bb14e3289bd5b3491027339"><strong>Enabled</strong></a></li>
<li><a href="#d6632aef50d845b0919d8e5e7193d9a2"><strong>Disabled</strong></a></li>
</ul>
<div id="e8c2ae4e223441ff9d2a251a0cbc43f7" class="tabs-pane active-pane" data-active="true" name="Old behavior">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb10" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb10-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb11" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb11-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/Engineering&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;ann&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;Internal/system&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c9f632fa-12e9-405d-92c8-076657151104&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/admin&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/Manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}]}</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb12" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb12-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb13" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb13-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;emails&quot;</span>:[<span class="st">&quot;admin@wso2.com&quot;</span>],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;admin&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;admin&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;ann&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Engineering&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;ann&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Manager&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div>
<div id="e46eeec34bb14e3289bd5b3491027339" class="tabs-pane" name="Enabled">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb14" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb14-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb15" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb15-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/Engineering&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/ann&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;Internal/system&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c9f632fa-12e9-405d-92c8-076657151104&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/admin&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;PRIMARY/Manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}]}</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb16" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb16-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb17" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb17-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;emails&quot;</span>:[<span class="st">&quot;admin@wso2.com&quot;</span>],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;admin&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;PRIMARY/admin&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;ann&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/Engineering&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;PRIMARY/ann&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;PRIMARY/Manager&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;PRIMARY/kim&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div>
<div id="d6632aef50d845b0919d8e5e7193d9a2" class="tabs-pane" name="Disabled">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb18" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb18-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Groups&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Groups endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb19" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb19-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">4</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;Engineering&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:36.787Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;ann&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;Internal/system&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/c9f632fa-12e9-405d-92c8-076657151104&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:53.425Z&quot;</span>},<span class="st">&quot;id&quot;</span>:<span class="st">&quot;c9f632fa-12e9-405d-92c8-076657151104&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:42:52.839Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>},{<span class="st">&quot;displayName&quot;</span>:<span class="st">&quot;Manager&quot;</span>,<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>,<span class="st">&quot;location&quot;</span>:<span class="st">&quot;https://localhost:9443/scim2/Groups/12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:54.118Z&quot;</span>},<span class="st">&quot;members&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;kim&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}]}</a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint request</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb20" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb20-1" title="1">curl -v -k --user admin:admin &#39;https:<span class="co">//localhost:9443/scim2/Users&#39;</span></a></code></pre></div>
</div>
</div>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeHeader panelHeader pdl" style="border-bottom-width: 1px;">
<strong>Users endpoint response</strong>
</div>
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb21" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb21-1" title="1">{<span class="st">&quot;totalResults&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;startIndex&quot;</span>:<span class="dv">1</span>,<span class="st">&quot;itemsPerPage&quot;</span>:<span class="dv">3</span>,<span class="st">&quot;schemas&quot;</span>:[<span class="st">&quot;urn:ietf:params:scim:api:messages:2.0:ListResponse&quot;</span>],<span class="st">&quot;Resources&quot;</span>:[{<span class="st">&quot;emails&quot;</span>:[<span class="st">&quot;admin@wso2.com&quot;</span>],<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T09:12:52Z&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;givenName&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;admin&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;admin&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;bebe2740-8490-4da3-814b-fc010a92f665&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;442c1077-75f4-4327-981a-4846efff396e&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;admin&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:20.474Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;ann&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Engineering&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;abb1c935-dcd2-4e89-a633-72bf22460463&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;1ad7272f-82b5-4a44-9a86-fe1f31279b29&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;ann&quot;</span>},{<span class="st">&quot;meta&quot;</span>:{<span class="st">&quot;created&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;lastModified&quot;</span>:<span class="st">&quot;2019-05-13T03:44:06.517Z&quot;</span>,<span class="st">&quot;resourceType&quot;</span>:<span class="st">&quot;User&quot;</span>},<span class="st">&quot;name&quot;</span>:{<span class="st">&quot;familyName&quot;</span>:<span class="st">&quot;kim&quot;</span>},<span class="st">&quot;groups&quot;</span>:[{<span class="st">&quot;display&quot;</span>:<span class="st">&quot;Manager&quot;</span>,<span class="st">&quot;value&quot;</span>:<span class="st">&quot;12bf8c7a-768e-43b2-b256-14c89b086bd3&quot;</span>}],<span class="st">&quot;id&quot;</span>:<span class="st">&quot;68ef862d-6013-4bb0-87ad-9531d7a99765&quot;</span>,<span class="st">&quot;userName&quot;</span>:<span class="st">&quot;kim&quot;</span>}]}</a></code></pre></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<p><strong>How to revert:</strong> <strong><strong></strong></strong> To revert back to the previous behaviour (in versions prior to 5.8.0), set the following property value to "true" in the <code>               &lt;IS_HOME&gt;/repository/conf/identity/identity.xml              </code> file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb22" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb22-1" title="1">&lt;MandateDomainForGroupNamesInGroupsResponse&gt;<span class="kw">true</span>&lt;/MandateDomainForGroupNamesInGroupsResponse&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>#5</td>
<td><div class="content-wrapper">
<p><strong>Use case:</strong> A new configuration property <code>               &lt;ForceLocalCache&gt;              </code> has been added. For clustered nodes, enabling this property enables local cache invalidations.</p>
<p><strong>Change</strong> : In a clustered nodes setup, cache invalidation requests for any local cache of a particular node will be sent to other nodes in the cluster for each cache related operation such as cache update, delete, or add. In previous versions of WSO2 IS, these invalidation requests were not sent to other nodes in the cluster by default. Therefore, it is recommended to enable this property if the local cache is enabled in a clustered setup.</p>
<p><strong>How to revert: <strong><strong><strong></strong></strong></strong></strong> To revert back to the previous behavior, change the following property value back to "false" in the <code>               &lt;IS_HOME&gt;/repository/conf/carbon.xml              </code> file .</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb23" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb23-1" title="1">&lt;ForceLocalCache&gt;<span class="kw">true</span>&lt;/ForceLocalCache&gt;</a></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>

### Configuration changes

This section lists out the configuration changes in each configuration
file including new properties, modified properties, and deprecated
properties.

!!! tip
    
    **Note:** The configuration changes listed below will not affect the
    existing system because these configurations are applied only at first
    start up and new tenant creation.  
    If you wish to change the configurations for the existing tenants,
    configure it through the management console user interface.
    

Configuration File

Changes

`              carbon.xml             ` file stored in the
`              <IS_HOME>/repository/conf             ` directory.

The version property value has been changed to 5.8.0.

``` java
<Version>5.8.0</Version>
```

**Why?**

This property indicates the version of WSO2 IS.

`              axis2.xml             ` file stored in the
`              <IS_HOME>/repository/conf/axis2             ` directory.

The following property values have been changed to 5.8.0.

``` java
<parameter name="userAgent" locked="true">
        WSO2 Identity Server-5.8.0
</parameter>
<parameter name="server" locked="true">
    WSO2 Identity Server-5.8.0
</parameter>
```

The following property has been added.

``` java
<parameter name="forceIncludeNullElements">false</parameter>
```

**Why?**

Enabling this property forces elements that have the
`                @IgnoreNullElement               ` annotation to be
returned as well even though the value is null. The default value for
this property is 'false'.

`               Endpointconfig.properties              ` file stored in
the `               <IS_HOME>/repository/conf/identity              `
directory.

The following property has been added.

``` java
mutualSSLManagerEnabled=true
```

**Why?**

Enabling this property allows the
`                MutualSSLManager               ` to initialize the
keystores. If it is set to 'false', the
`                MutualSSLManager               ` will not initialize
the keystore.

`              application-authentication.xml             ` file stored
in the `              <IS_HOME>/repository/conf/identity             `
directory.

  

  

  

  

  

  

  

  

  

  

  

  

  

  

The following property has been added to the following authenticators
under the relevant tags.

-   BasicAuthenticator -
    `                 <AuthenticatorConfig name="BasicAuthenticator" enabled="true">                `
-   BasicAuthRequestPathAuthenticator -
    `                 <AuthenticatorConfig name="BasicAuthRequestPathAuthenticator" enabled="true">                `

``` java
<Parameter name="AuthMechanism">basic</Parameter>
```

**Why?**

This property is used to help identify the authentication mechanism used
by the authenticator.

The following parameters were added under the
`                <AuthenticatorConfig name="EmailOTP" enabled="true">               `
tag.

``` java
<Parameter name="EMAILOTPAuthenticationEndpointURL">emailotpauthenticationendpoint/emailotp.jsp</Parameter>
<Parameter name="EmailOTPAuthenticationEndpointErrorPage">emailotpauthenticationendpoint/emailotpError.jsp</Parameter>
<Parameter name="EmailAddressRequestPage">emailotpauthenticationendpoint/emailAddress.jsp</Parameter>
```

**Why?**

The following parameters make the Email OTP URLs configurable.

The `                totp               ` authenticator configurations
were uncommented and the following parameters have been added under the
`                <AuthenticatorConfig name="totp" enabled="true">               `
tag.

``` java
<Parameter name="Issuer">WSO2</Parameter>
<Parameter name="UseCommonIssuer">true</Parameter>
```

**Why?**

The added parameters make the `                totp               `
issuer configurable instead of showing the domain name.

The following parameter has been removed from the totp authenticator as
it is redundant.

``` java
<Parameter name="redirectToMultiOptionPageOnFailure">false</Parameter>
```

The following property has been added under the
`                <ApplicationAuthentication>               ` tag.
`               `

``` xml
<!--Similar to the 'AuthenticationEndpointQueryParams' above, the following section defines the parameters that should be included/excluded in the redirection responses from authentication framework. These parameters may be generated internally from the framework, handlers or authenticators. The filtered parameters will be available via the REST API for authentication framework. "removeOnConsumeFromAPI" defines whether to make the filtered parameters unavailable from the API on the first consumption. -->
<AuthenticationEndpointRedirectParams action="exclude" removeOnConsumeFromAPI="true">
    <AuthenticationEndpointRedirectParam name="loggedInUser"/>
</AuthenticationEndpointRedirectParams>
```

`                captcha-config.properties               ` file stored
in the
`                <IS_HOME>/repository/conf/identity               `
directory.

The following properties have been added.

``` java
#reCaptcha failed redirect urls
#recaptcha.failed.redirect.urls=
```

**Why?**

The properties listed above allow configuring the list of URLs that can
be used for redirection when reCaptcha fails.

`              scim2-schema-extension.config             ` file stored
in the \<IS\_HOME\>/repository/conf/ directory.

The `                EnterpriseUser               ` attribute name has
been changed from what is reflected in the 5.7.0 code block to the
configuration shown in the 5.8.0 code block.

**5.7.0**

``` java
"attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",

"attributeName":"EnterpriseUser",
```

**5.8.0**

``` java
attributeURI":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",

"attributeName":"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
```

**Why?**

This change is done in order to comply with the [SCIM2
specification](https://tools.ietf.org/html/rfc7643#section-3.3) . For
more details, see [behavioral change \#1 in the behavioral changes
table](#UnderstandingWhatHasChanged-1) given above.

`                identity-event.properties               ` file stored
in the
`                <IS_HOME>/repository/conf/identity               `
directory.

  

The password policy error message has been modified as follows.

``` java
passwordPolicy.errorMsg='Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], and one of !@#$%&* characters'
```

The following handlers have been added.

``` java
module.name.17=SAMLLogoutHandler
SAMLLogoutHandler.subscription.1=SESSION_TERMINATE
SAMLLogoutHandler.enable=true

# To delete registration code in database once the user deletion
module.name.18=confirmationCodesInvalidate
confirmationCodesInvalidate.subscription.1=POST_DELETE_USER
```

**Why?**

These handlers are introduced to support the cross-protocol logout
feature and for migration of existing data publishers to event handlers
that subscribe to authentication events. For more information about
migrating existing data publishers to event handlers, see [Migrating
Data Publishers](_Migrating_Data_Publishers_) .  

The following properties were added.

``` java
module.name.14=analyticsLoginDataPublisher
analyticsLoginDataPublisher.subscription.1=AUTHENTICATION_STEP_SUCCESS
analyticsLoginDataPublisher.subscription.2=AUTHENTICATION_STEP_FAILURE
analyticsLoginDataPublisher.subscription.3=AUTHENTICATION_SUCCESS
analyticsLoginDataPublisher.subscription.4=AUTHENTICATION_FAILURE
analyticsLoginDataPublisher.enable=false

module.name.15=analyticsSessionDataPublisher
analyticsSessionDataPublisher.subscription.1=SESSION_CREATE
analyticsSessionDataPublisher.subscription.2=SESSION_UPDATE

analyticsSessionDataPublisher.subscription.3=SESSION_TERMINATE
analyticsSessionDataPublisher.enable=true

module.name.13=authenticationAuditLogger
authenticationAuditLogger.subscription.1=AUTHENTICATION_STEP_SUCCESS
authenticationAuditLogger.subscription.2=AUTHENTICATION_STEP_FAILURE
authenticationAuditLogger.subscription.3=AUTHENTICATION_SUCCESS
authenticationAuditLogger.subscription.4=AUTHENTICATION_FAILURE
authenticationAuditLogger.subscription.5=SESSION_TERMINATE
authenticationAuditLogger.enable=true"

module.name.16=failLoginAttemptValidator
failLoginAttemptValidator.subscription.1=AUTHENTICATION_STEP_FAILURE
failLoginAttemptValidator.enable=true
```

**Why?**

The properties listed above are added to support the event listeners
that were added for migrating data publishers to event handlers. For
more details, see [behavioral change \#3 in the behavioral changes
table](#UnderstandingWhatHasChanged-3) given above.

`                identity.xml               ` file stored in the
`                <IS_HOME>/repository/conf/identity               `
directory.

  

  

  

  

  

  

  

  

  

  

  

  

  

The following property has been added to the
`                IntrospectionDataProvider               ` interface.

``` java
<Introspection>
    <EnableDataProviders>false</EnableDataProviders>
</Introspection>
```

**Why?**

This property is used to inject additional data to the introspection
response.

The default `                CleanUpPeriod               ` value has
been modified to 1440.

``` java
<CleanUpPeriod>1440</CleanUpPeriod>
```

The default value of the following property has been changed from false
to **true** .

``` java
<SignJWTWithSPKey>true</SignJWTWithSPKey>
```

**Why?**

For details about this change, see [behavioral change \#2 in the
behavioral changes table](#UnderstandingWhatHasChanged-2) given above.

The following property has been added under the
`                <SessionDataPersist>               ` tag.

``` java
<UserSessionMapping>
    <Enable>true</Enable>
</UserSessionMapping>
```

**Why?**

This property enables terminating all the active sessions of a user
during password reset, user deletion, and username renaming.

The following event listeners have been removed.

``` java
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler"                name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASLoginDataPublisherImpl" orderId="10" enable="true"/>

<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.data.publisher.application.authentication.impl.DASSessionDataPublisherImpl" orderId="11" enable="true"/>

<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityMessageHandler" name="org.wso2.carbon.identity.captcha.validator.FailLoginAttemptValidator" orderId="10" enable="true"/>
```

**Why?**

From WSO2 IS 5.8.0 onwards, data publishers are migrated to act as event
handlers that subscribe to authentication events. Hence, the event
listeners listed above have been removed by default. For more details,
see [behavioral change \#3 in the behavioral changes
table](#UnderstandingWhatHasChanged-3) given above.

The following property has been added.

``` java
<FilterUsersAndGroupsOnlyFromPrimaryDomain>false</FilterUsersAndGroupsOnlyFromPrimaryDomain>
```

**Why?**

Enabling this property filters users or groups only from the PRIMARY
user store, regardless of the Users and Groups endpoints. If it is set
to 'false' it filters users or groups across all user stores.

The following property has been added.

``` java
<MandateDomainForUsernamesAndGroupNamesInResponse>false</MandateDomainForUsernamesAndGroupNamesInResponse>
```

**Why?**

Enabling this property prepends the "PRIMARY/" prefix to the user name
and role name (group name) that belongs to the PRIMARY user store, in
the SCIM2 response regardless of the Users and Groups endpoint. When it
is set to 'false', the "PRIMARY/" prefix will not be prepended. For more
details, see [behavioral change \#4 in the behavioral changes
table](#UnderstandingWhatHasChanged-4) given above.

The following property has been added.

``` java
<MandateDomainForGroupNamesInGroupsResponse>false</MandateDomainForGroupNamesInGroupsResponse>
```

**Why?**

Enabling this property in the Groups endpoints prepends the "PRIMARY/"
prefix to the role name (group name) that belongs to the PRIMARY user
store. When it is set to 'false', the "PRIMARY/" prefix will not be
prepended. For more details, see [behavioral change \#4 in the
behavioral changes table](#UnderstandingWhatHasChanged-4) given above.

The following properties have been added under the
`                <Server>               ` tag.

``` java
<!--This configuration is used to define the Service Provider name regex in DCR and IdentityApplicationManagementService-->
    <!--<ServiceProviders>-->
        <!--<SPNameRegex>^[a-zA-Z0-9._-]*$</SPNameRegex>-->
    <!--</ServiceProviders>-->
```

The following properties have been added under the
`               <OAuth>              ` tag.

``` java
<!-- If enabled, resident Idp entity id will be honoured as the issuer location in OpenId Connect Discovery -->
        <UseEntityIdAsIssuerInOidcDiscovery>true</UseEntityIdAsIssuerInOidcDiscovery>
```

The UMA grant type has been added as a supported grant type under the
`                <SupportedGrantTypes>               ` tag.

``` java
<!-- Supported versions: IS 5.7.0 onwards.-->
<SupportedGrantType>
    <GrantTypeName>urn:ietf:params:oauth:grant-type:uma-ticket</GrantTypeName>
    <GrantTypeHandlerImplClass>org.wso2.carbon.identity.oauth.uma.grant.UMA2GrantHandler</GrantTypeHandlerImplClass>
    <GrantTypeValidatorImplClass>org.wso2.carbon.identity.oauth.uma.grant.GrantValidator</GrantTypeValidatorImplClass>
</SupportedGrantType>
```

The following properties have been added under the
`                <OAuth>               ` tag.

``` java
<!-- Configurations for JWT bearer grant. Supported versions: IS 5.8.0 onwards. -->
<JWTGrant>
    <!-- Validate issued at time (iat) of JWT token. The validity can be set using 'IATValidity' configuration.
             Default value is 'true'.
             -->
    <EnableIATValidation>true</EnableIATValidation>
    <!-- Reject the JWT if the iat of JWT is pass a certain time period. Time period is in minutes.
             'EnableIATValidation' configuration should be set to 'true' in order to make use of the validity 
             period.
             Default value is '30' minutes.
             -->
    <IATValidityPeriod>30</IATValidityPeriod>
</JWTGrant>
```

The following properties have been added under the
`                <OpenIDConnect>               ` tag.

``` java
<!-- Add tenant domain to 'realm' claim of ID Token-->
<AddTenantDomainToIdToken>false</AddTenantDomainToIdToken>
<!-- Add userstore domain to 'realm' claim of ID Token-->
<AddUserstoreDomainToIdToken>false</AddUserstoreDomainToIdToken>
```

The following properties have been added under the
`                <OAuth>               ` tag.

``` java
<!--Configuration provides the ability to renew the access token and the refresh token(where applicable) per each token request and revoke previously available active token for a matching clientid, user and scopes combination.
Not applicable for refresh token grant type and when when self-contained access tokens are used.
Default value : false
Supported versions : IS 5.8.0 onwards -->
<!--<RenewTokenPerRequest>true</RenewTokenPerRequest>-->

<!--By enabling this property, in a logout request if the opbs cookie or a valid session does not exist instead of showing the invalid request error page the user will be redirected to the successfully logged out page of the IS or if a valid id_token_hint and a valid post_logout_redirect_uri is available user will be redirected to the post_logout_redirect_uri-->
<HandleAlreadyLoggedOutSessionsGracefully>false</HandleAlreadyLoggedOutSessionsGracefully>
```

The following properties have been added under the
`                <SSOService>               ` tag.

``` java
<ArtifactResolutionEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlartresolve</ArtifactResolutionEndpoint>
<SAMLECPEndpoint>${carbon.protocol}://${carbon.host}:${carbon.management.port}/samlecp</SAMLECPEndpoint>
```

**Why?**

These properties allow adding the Artifact URL as a Resident IDP
property in the WSO2 IS management console.

The following properties have been added under the \<SCIM2\> tag.

``` java
<!--<ComplexMultiValuedAttributeSupportEnabled>true</ComplexMultiValuedAttributeSupportEnabled>-->
<!--<EnableFilteringEnhancements>true</EnableFilteringEnhancements>-->
```

**Why?**

The `                <EnableFilteringEnhancements>               `
property was introduced for the purpose of applying filtering
enhancements for SCIM2 filter results. Enabling this ensures that the Eq
filter strictly checks for a string match (in this case cross user store
search should not be performed). This configuration also enforces
consistency on the filtered attribute formats in the response when
filtering is done via different endpoints. e.g. Users and Groups
endpoints.

The following properties have been added under the
`                <Recovery>               ` tag.

``` java
 <ReCaptcha>
    <Password>
        <Enable>false</Enable>
    </Password>
    <Username>
        <Enable>false</Enable>
    </Username>
</ReCaptcha>
<CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
```

**Why?**

This configuration block is used to enable ReCaptcha verification for
password recovery and username recovery.

The following property have been added under the
`                <SelfRegistration>               ` tag.

``` java
<CallbackRegex>${carbon.protocol}://${carbon.host}:${carbon.management.port}/authenticationendpoint/login.do</CallbackRegex>
```

**Why?**

This property enables configuring a regex pattern for the callback URLs
of the account recovery and self registration APIs. The callbackURL
included in the requests is then validated with the configured regex
pattern.

The following new event listener has been added under the
`                <EventListeners>               ` tag.

``` java
<EventListener type="org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
                       name="org.wso2.carbon.identity.data.publisher.oauth.listener.OAuthTokenIssuanceLogPublisher"
                       orderId="12" enable="false">
                      <Property name="Log.Token">false</Property>
</EventListener>

<EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                       name="org.wso2.carbon.identity.mgt.listener.UserSessionTerminationListener"
                       orderId="85" enable="true"/>

<EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener"
                       name="org.wso2.carbon.user.mgt.listeners.UserClaimsAuditLogger"
                       orderId="9" enable="false"/>
```

**Why?**

`                AbstractIdentityHandler               ` - Enabling this
listener logs the audit data for OAuth token issuance and token
introspection. Adding this property allows you to disable logging, else
if this property is not present in the configuration file, logging is
enabled by default. For more information about auditing, see [OAuth
Transaction Logs](_OAuth_Transaction_Logs_) .

`                UserOperationEventListener               ` - This event
listener is used to support session termination at the point renaming
the username.

`                UserOperationEventListener               ` - This event
listener allows adding claims to the audit logs.

The following caches have been added under the
`                <CacheManager name="IdentityApplicationManagementCacheManager">               `
tag.

``` java
<Cache name="JWKSCache" enable="true" timeout="300" capacity="5000" isDistributed="false"/>
<Cache name="ServiceProviderCache.ID" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
<Cache name="ServiceProvideCache.InboundAuth" enable="true"  timeout="900" capacity="5000" isDistributed="false"/>
```

**Why?**

`                JKWSCache               ` - This property has been
added to support JWKS Endpoint Cache invalidation.

`                ServiceProviderCache.ID               ` and
`                ServiceProvideCache.InboundAuthKey               ` -
These two properties have been added in order to cache the service
provider against the ID and inboundAuth. If these new properties is not
present in the configuration file, the configuration value of the
`                ServiceProviderCache               ` is applied for
these caches.

The following resources have been added under the \<
`                ResourceAccessControl>               ` tag.

``` java
<Resource context="(.*)/api/identity/config-mgt/v1.0/search(.*)" secured="true" http-method="GET">
    <Permissions>/permission/admin/manage/identity/configmgt/list</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource-type/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="POST">
    <Permissions>/permission/admin/manage/identity/configmgt/add</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/configmgt/update</Permissions>
</Resource>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="GET"/>
<Resource context="(.*)/api/identity/config-mgt/v1.0/resource/(.*)/(.*)/(.*)" secured="true" http-method="DELETE">
    <Permissions>/permission/admin/manage/identity/configmgt/delete</Permissions>
</Resource>
```

**Why?**

These resources control access to the configuration management resources
in WSO2 IS.

The resource context
`                /scim2/ResourceType               ` to
`                /scim2/ResourceTypes               ` found under the
`                <ResourceAccessControl>               ` tag has been
modified as shown below.

``` java
<Resource context="/scim2/ResourceTypes" secured="false" http-method="all">
```

**Why?**

This change is done in order to comply with the [SCIM2
specification](https://tools.ietf.org/html/rfc7643#section-3.3) .

The following resource found under the \<
`                ResourceAccessControl>               ` tag has been
removed.

``` java
<Resource context="(.*)/api/identity/auth/(.*)" secured="true" http-method="all"/>
```

**Why?**

This change has been made in order to remove protection for the
`                /api/identity/auth/v1.2/authenticate               `
API. This is because the API itself authenticates the user.

The following resources have been added under the \<
`                ResourceAccessControl>               ` tag.

``` java
<Resource context="(.*)/api/identity/auth/v1.2/data(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/auth/v1.2/context(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/template/mgt/v1.0.0/(.*)" secured="true" http-method="all"/>
<Resource context="(.*)/api/identity/user/v1.0/update-username(.*)" secured="true" http-method="PUT">
    <Permissions>/permission/admin/manage/identity/usermgt/update</Permissions>
</Resource>
```

**Why?**

These resources have been added to secure the
`                update-username               ` API.

The following properties have been added under the
`                <Server>               ` tag..

``` java
<!--Intermediate certificate validation for certificate based requests-->
<IntermediateCertValidation enable="false">
    <IntermediateCerts>
        <!--Add intermediate certificate CN. Multiple <CertCN> elements can be used for multiple certificates.-->
        <CertCN>localhost</CertCN>
    </IntermediateCerts>
    <ExemptContext>
        <!--Add exemptable context paths. Multiple <Context> elements can be used for multiple contexts.-->
        <Context>scim2</Context>
    </ExemptContext>
</IntermediateCertValidation>
<!--This is the separator that use to separate multiple roles in the role claim value coming from IDP side-->
<FederatedIDPRoleClaimValueAttributeSeparator>,</FederatedIDPRoleClaimValueAttributeSeparator>
<!--This configuration is used for X509 Certificate based authentication. -->
<!--<X509>-->
<!--During ssl termination at LB, the X509 certificate is passed over the HTTP header. This configuration
        provides the facility to configure HTTP request header name which is configured at LB.  -->
<!--<X509RequestHeaderName>X-SSL-CERT</X509RequestHeaderName>-->
<!--</X509>-->
<!-- This configuration specifies the claims that should be logged to "audit.log" upon changes. -->
<!--<LoggableUserClaims>-->
<!--<LoggableUserClaim>http://wso2.org/claims/identity/accountLocked</LoggableUserClaim>-->
<!--<LoggableUserClaim>http://wso2.org/claims/role</LoggableUserClaim>-->
<!--</LoggableUserClaims>-->
<!--Configuration Store properties-->
<ConfigurationStore>
    <!--Set an upper limit to the database call queries. Configuration store uses dynamic query generation,
        specially for searching resources. This property will prevent any unwanted errors due to too large queries.
        Default value is the maximum packet size for MySQL 5.7 in bytes.-->
    <MaximumQueryLength>4194304</MaximumQueryLength>
</ConfigurationStore>
```

`              jaas.conf             ` file stored in the
`              <IS_HOME>/repository/conf/identity             `
directory.

The value of the following property value has been corrected from
'tfalse' to 'false'.

``` java
useKeyTab=false
```

`                Webapp-classloading-environments.xml               `
file stored in the
`                <IS_HOME>/repository/conf/               ` directory.

The following ExclusiveEnvironment has been added under the
`                <Classloading>               ` tag.

``` java
<ExclusiveEnvironments>
        <ExclusiveEnvironment>
            <Name>CXF3</Name>
            <Classpath>${carbon.home}/lib/runtimes/cxf3/*.jar;${carbon.home}/lib/runtimes/cxf3/</Classpath>
        </ExclusiveEnvironment>
    </ExclusiveEnvironments>
```

`              carbon.xml             ` file stored in the
`              <IS_HOME>/repository/conf             ` directory.

The following properties related to the tenant deletion feature have
been added under the `                <Server> <Tenant>               `
tag.

``` java
<!-- Flag to enable or disable tenant deletion. By default tenant deletion is enabled-->
<TenantDelete>true</TenantDelete>
<!-- Configurations related to listener invocation by tenant admin service-->
<ListenerInvocationPolicy>
    <!-- Flag to enable or disable listener invocation on tenant delete. This is disabled by default-->
    <InvokeOnDelete>false</InvokeOnDelete>
</ListenerInvocationPolicy>
```

The following property has been added under the
`                <Server>               ` tag.

``` java
<!--EnablePasswordTrim>false</EnablePasswordTrim--> 
```

The following property has been added.

``` java
<ForceLocalCache>true</ForceLocalCache>
```

**Why?**

Enabling this property forces all the caches to behave as local caches.
It is required to enable this in order to have cache invalidation in
between the IS nodes in a clustered enviornment. For more details, see
[behavioral change \#5 in the behavioral changes
table](#UnderstandingWhatHasChanged-6) given above.

`              claim-config.xml             ` file stored in the
`              <IS_HOME>/repository/conf             ` directory.

The AttributeID of the
`                                 http://wso2.org/claims/resourceType                               `
claim has been modified to "resourceType".

``` java
<AttributeID>resourceType</AttributeID>
```

The RegEx of the
`                                 http://wso2.org/claims/phoneNumbers                               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                urn:scim:schemas:core:1.0:phoneNumbers               `
claim has been modified as follows.  

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The AttributeID of the claim
`                urn:ietf:params:scim:schemas:core:2.0:meta.resourceType               `
claim has been modified to "resourceType" instead of "userType".

``` java
<AttributeID>resourceType</AttributeID>
```

**Why?**

The value "Ref" is reserved in open LDAPs for referrals. Therefore, this
attributeID was modified to avoid the errors when using Active Directory
open LDAPs.

The RegEx of the
`                urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The Regex of the
`                urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.mobile               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.home               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>  
```

The RegEx of the
`                urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.work               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

The RegEx of the
`                urn:ietf:params:scim:schemas:core:2.0:User:phoneNumbers.other               `
claim has been modified as follows.

``` java
<RegEx>^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$</RegEx>
```

**Why?** The d efault regular expression values for phone numbers were
modified in the claim-config.xml file in order to recognize US and
Canadian numbers with the extension code as well.

`              log4j.properties             ` file stored in the
`              <IS_HOME>/repository/conf             ` directory.

The following properties have been added.

``` java
log4j.logger.TRANSACTION_LOGGER=INFO, TRANSACTION_LOGGER

log4j.appender.TRANSACTION_LOGGER=org.apache.log4j.FileAppender
log4j.appender.TRANSACTION_LOGGER.File=${carbon.home}/repository/logs/transaction.log
log4j.appender.TRANSACTION_LOGGER.Append=true
log4j.appender.TRANSACTION_LOGGER.layout=org.apache.log4j.PatternLayout
log4j.appender.TRANSACTION_LOGGER.layout.ConversionPattern=[%d] - %m %n
log4j.appender.TRANSACTION_LOGGER.threshold=INFO
log4j.additivity.TRANSACTION_LOGGER=false


# Appender config to put correlation Log.
log4j.logger.correlation=INFO, CORRELATION
log4j.additivity.correlation=false
log4j.appender.CORRELATION=org.apache.log4j.RollingFileAppender
log4j.appender.CORRELATION.File=${carbon.home}/repository/logs/${instance.log}/correlation.log
log4j.appender.CORRELATION.MaxFileSize=10MB
log4j.appender.CORRELATION.layout=org.apache.log4j.PatternLayout
log4j.appender.CORRELATION.Threshold=INFO
log4j.appender.CORRELATION.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS}|%X{Correlation-ID}|%t|%m%n
```

`              user-mgt.xml             ` file stored in the
`              <IS_HOME>/repository/conf             ` directory.

The following properties have been added under the
`                <UserManager> <Realm> <Configuration>               `
tag.

``` java
<!-- Enable username claim retrieve from the UM_USER_NAME in JDBC datasources -->
<OverrideUsernameClaimFromInternalUsername>true</OverrideUsernameClaimFromInternalUsername
```

The following property has been under under the
`                JDBCUserStoreManager               ` configuration
block.

``` java
<Property name="LeadingOrTrailingSpaceAllowedInUserName">false</Property>
```

The value of the `                <UserNameListFilter>               `
property under the
`                ReadOnlyLDAPUserStoreManager               `
configuration block has been modified to the value given below.

``` java
(&amp;(objectClass=person)(!(sn=Service)))
```

The value of the `                <UserNameListFilter>               `
property under the
`                ActiveDirectoryUserStoreManager               ` and
`                ReadWriteLDAPUserStoreManager               `
configuration blocks has been modified as follows.

``` java
(&amp;(objectClass=user)(!(sn=Service)))
```

The following property has been added under the
`                ActiveDirectoryUserStoreManager               ` and the
`                ReadWriteLDAPUserStoreManager               `
configuration blocks.

``` java
<Property name="StartTLSEnabled">false</Property>
```
