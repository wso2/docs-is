# About this release

### What is new in this release

**WSO2 Identity Server 5.9.0** is the **latest WSO2 Identity Server release** and is the successor of WSO2 Identity Server 5.8.0. It contains the following new features and enhancements:


<ul>
    <li><b>Passwordless authentication</b>: This feature is supported using the FIDO2 protocol. For more information, see <a href="../../learn/configuring-passwordless-authentication">Configuring Passwordless Authentication</a>.</li>
    <li><b>Cross protocol single logout</b>: This feature enables single logout applications that communicate using different SSO protocols such as OIDC and SAML. For more information, see <a href="../../get-started/cross-protocol-single-logout">Single Logout</a>.</li>
    <li><b>Adaptive authentication using function library</b>: WSO2 Identity Server already supports script-based adaptive authentication. This feature supports easily manageable function libraries that can be imported to the authentication scripts. For more information, see <a href="../../learn/adaptive-authentication-with-function-librabry">Adaptive Authentication with Function Libraries</a>.</li>
    <li><b>New REST APIs</b>: This release includes new REST APIs for end users who can be authenticated to the system to manage their user account related activities.        	
		<ul>
						<li><a href="../../develop/challenge-rest-api">Manage challenge question answers</a></li>
						<li><a href="../../develop/authorized-apps-rest-api">View Authorized OAuth applications and revoke authorization from applications</a></li>
						<li><a href="../../develop/association-rest-api">Manage associated accounts</a></li>
						<li><a href="../../develop/session-mgt-rest-api">View and revoke login sessions</a></li>
						<li><a href="../../develop/approvals-rest-api">Manage pending approvals</a></li>
					</ul>
	</li>
	<li><b>New Configuration model</b>: Previous WSO2 Identity Server versions supported multiple configuration files such as <code>carbon.xml</code>, <code>identity.xml</code>, and <code>axis2.xml</code>. With the <a href="../../references/new-configuration-model">new configuration model</a> in WSO2 Identity Server 5.9.0, configurations are handled by the <code>deployment.toml</code> file in the <code><IS_HOME>/repository/conf/</code> directory.</li> 
</ul>


### What has changed in this release

#### Removed features and functionalities

-	Logging Monitor UI
 

#### Deprecated features and functionalities

-	Writing Password Policiy validators 


### Compatible versions

For information on the Carbon platform version and Carbon Kernel version
of WSO2 Identity Server 5.9.0, see the [Release
Matrix](https://wso2.com/products/carbon/release-matrix/).

All WSO2 products that are based on a specific Carbon Kernel version are
expected to be compatible with each other. If you come across any
compatibility issue, [contact team WSO2](https://wso2.com/contact/).

### Fixed issues

For a complete list of improvements and bug fixes available with this
release, see [here](https://github.com/wso2/product-is/milestone/83?closed=1).

### Known issues

-   For a complete list of open issues related to the WSO2 Identity
    Server runtime, see [WSO2 IS Runtime - Open
    Issues](https://github.com/wso2/product-is/issues).
-   For a complete list of open issues related to the WSO2 Identity
    Server analytics, see [WSO2 IS Analytics - Open
    Issues](https://github.com/wso2/analytics-is/issues)
