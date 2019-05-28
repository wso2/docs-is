# Configuring Local and Outbound Authentication for a Service Provider

The responsibility of the local authenticators is to authenticate the
user with locally available credentials. This can be either
username/password or even [IWA (Integrated Windows
Authentication)](_Integrated_Windows_Authentication_) or [FIDO (Fast
IDentity Online)](_Multi-factor_Authentication_using_FIDO_) . Local
authenticators are decoupled from the Inbound Authenticators. Once the
initial request is handed over to the authentication framework from an
inbound authenticator, the authentication framework talks to the service
provider configuration component to find the set of local authenticators
registered with the service provider corresponding to the current
authentication request.

Once the local authentication is successfully completed, the local
authenticator will notify the framework. The framework will now decide
no more authentication is needed and hand over the control to the
corresponding response builder of the inbound authenticator. See
[Architecture](_Architecture_) for more information on this.

You can configure the following for local and outbound authentication.

1.  Expand **Local & Outbound Authentication Configuration** .  
    ![](attachments/103329813/103329814.png){width="700"}  
    -   **Assert identity using mapped local subject identifier** :
        Select this to use the local subject identifier when asserting
        the identity.
    -   **Always send back the authenticated list of identity
        providers** : Select this to send back the list of identity
        providers that the current user is authenticated by.
    -   **Use tenant domain in local subject identifier** : Select this
        to append the tenant domain to the local subject identifier.
    -   **Use user store domain in local subject identifier** : Select
        this to append the user store domain that the user resides to
        the local subject identifier.
    -   **Use user store domain in roles** : This is selected by
        default, and appends the userstore domain name to user roles. If
        you do not want to append the userstore domain name to user
        roles, clear the check box.

        !!! note
        
                Note
        
                If a user role is not mapped to a service provider role, and you
                clear the **Use user store domain in roles** check box, the
                userstore domain name will be removed from the role claim value
                unless the userstore domain name is APPLICATION, INTERNAL, or
                WORKFLOW.
        

    -   **Enable Authorization** : This option enables you to e ngage
        authorization policies for the service provider. For more
        information, see [Configuring Access Control Policy for a
        Service
        Provider](_Configuring_Access_Control_Policy_for_a_Service_Provider_)
        .

2.  Select the **Authentication Type** you require from the available
    options. This is a required field.  
    -   If you choose **Local Authentication** , you need to select the
        local authentication option from the dropdown list.
    -   If you choose **Federated Authentication** , you need to select
        the identity provider from the dropdown list.
    -   If you choose **Advanced Configurations** , you can configure
        additional authentication steps and additional authentication
        options.  
        ![](attachments/103329813/103329818.png){width="750"}
        1.  There are two types of multi-factor authentication that can
            be configured here.
            1.  **Multi-step authentication** : Click **Add
                Authentication Step** . Clicking this again will enable
                you to create another authentication step. Once this is
                done you can configure a Local or Federated
                authenticator for the step by selecting one from the
                dropdown and clicking **Add Authenticator** .
            2.  **Multi-option authentication** : Click **Add
                Authenticator** to add either a Local or Federated
                authenticator after selecting it from the dropdown.
                Adding more than one of these within a single step
                enables multi-option authentication.
        2.  Select whether to **Use subject identifier from this step**
            , **Use attributes from this step** or both. In the case of
            multiple steps, you can have only one step to use subject
            identifier from this step and one to use attributes from
            this step.  
            For example lets say, We configure 1st step as Facebook and
            enable **Use subject identifier from this step** . Then
            configure Google for 2nd step and enable **Use attributes
            from this step** . Once authentication is complete subject
            id will be taken from the Facebook claims and Google claims
            will be used as users attributes.
        3.  Click **Add Authenticator** to add a **Local Authenticator**
            . You can choose the type of authenticator using the
            dropdown. Clicking **Add Authenticator** again will enable
            you to add a second local authenticator. Basic
            authentication allows you to authenticate users from the
            enterprise user store.
        4.  Click **Add Authenticator** to add a **Federated
            Authenticator** . You can choose the type of authenticator
            using the dropdown. Clicking **Add Authenticator** again
            will enable you to add a second federated authenticator.
        5.  Click the **Update** button. This will return you to the
            previous screen with your newly configured authentication
            steps.
3.  Add a local authenticator under **Request Path Authentication
    Configuration** by clicking the **Add** button. Clicking the **Add**
    button again enables you to add another local authenticator. The two
    types of local authenticators available are as follows.
    -   OAuthRequestPathAuthenticator
    -   BasicAuthRequestPathAuthenticator

Look through the following for more details on the various
authentication types.

<table>
<thead>
<tr class="header">
<th>Authentication Type</th>
<th>Details</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Default</td>
<td><div class="content-wrapper">
<p>This is the default authenticator sequence for a configured service provider in the Identity Server. This sequence can be modified by updating following section in the <code>               &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.              </code> xml file.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Sequences&gt;</span></a>
<a class="sourceLine" id="cb1-2" title="2">    <span class="co">&lt;!-- Default Sequence. This is mandatory --&gt;</span></a>
<a class="sourceLine" id="cb1-3" title="3">    <span class="kw">&lt;Sequence</span><span class="ot"> appId=</span><span class="st">&quot;default&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-4" title="4">        <span class="kw">&lt;Step</span><span class="ot"> order=</span><span class="st">&quot;1&quot;</span><span class="kw">&gt;</span></a>
<a class="sourceLine" id="cb1-5" title="5">            <span class="kw">&lt;Authenticator</span><span class="ot"> name=</span><span class="st">&quot;BasicAuthenticator&quot;</span><span class="kw">/&gt;</span></a>
<a class="sourceLine" id="cb1-6" title="6">        <span class="kw">&lt;/Step&gt;</span></a>
<a class="sourceLine" id="cb1-7" title="7">    <span class="kw">&lt;/Sequence&gt;</span></a>
<a class="sourceLine" id="cb1-8" title="8"><span class="kw">&lt;/Sequences&gt;</span></a></code></pre></div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>Local Authentication</td>
<td><p>In this case, Identity Server itself authenticate the user. There are three types of local authenticators OOTB in a fresh Identity Server pack.</p>
<ul>
<li>The <strong>basic</strong> authenticator is used to authenticate the user using the credentials available in the Identity Server.</li>
<li><strong>IWA</strong> stands for Integrated Windows Authentication and involves automatically authenticating users using their Windows credentials.</li>
<li><strong>FIDO</strong> authenticator is a local authenticator that comes with the WSO2 Identity Server. This will handle FIDO authentication requests related key validation against stored keys, the public key, keyhandler, and the counter, attestation certificate of FIDO registered users.</li>
</ul></td>
</tr>
<tr class="odd">
<td>Federated Authentication</td>
<td>In this case, Identity Server trust third-party Identity provider to perform the user authentication. These Identity providers use various protocols to transfer authentication/authorization related messages. Currently, the Identity Server only supports the following federated authenticators OOTB.
<ul>
<li>SAML2 Web SSO</li>
<li>OAuth2/OpenID Connect</li>
<li>WS-Federation (Passive)</li>
<li>Facebook</li>
<li>Microsoft (Hotmail, MSN, Live)</li>
<li>Google</li>
<li>SMS OTP</li>
<li>Email OTP</li>
<li>Twitter</li>
<li>Yahoo</li>
<li>IWA Kerberos</li>
<li>Office365</li>
</ul></td>
</tr>
<tr class="even">
<td>Advanced Configuration</td>
<td>Advanced configurations enable you to add multiple options or steps in authentication. When multiple authentication steps exists, the user is authenticated based on each and every one of these steps. If only one step is added then the user is only authenticated based on the local and/or federated authenticators added in a single step. However, in the case of local and/or federated authenticators, the authentication happens based on any one of the available authenticators.</td>
</tr>
</tbody>
</table>

#### Request path authenticators

A request path authenticator will get executed only if the initial
authentication request brings the applicable set of credentials with it.
See [Request Path Authentication](_Request_Path_Authentication_) for
more details.

**Related Topics**

-   See [Multi-factor Authentication using
    FIDO](_Multi-factor_Authentication_using_FIDO_) for more information
    on configuring multi-step and multi-option authentication using
    FIDO.
-   See [Integrated Windows
    Authentication](_Integrated_Windows_Authentication_) and
    [Configuring IWA Single-Sign-On](_Configuring_IWA_Single-Sign-On_)
    for more information on configuring the IWA authenticator with WSO2
    Identity Server.
-   See [Request Path Authentication](_Request_Path_Authentication_) for
    information on a local authenticator that is executed if the initial
    authentication request brings a set of credentials with it.
-   See [Try Request Path
    Authentication](https://docs.wso2.com/display/IS530/Try+Request+Path+Authentication)
    for more information on how the request path authenticator works
    using the WSO2 playground sample .
