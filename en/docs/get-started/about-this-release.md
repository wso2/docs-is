# About this release

### What is new in this release

**WSO2 Identity Server 5.9.0** is the **latest WSO2 Identity Server release** and is the successor of **WSO2 Identity Server 5.8.0**. It contains the following new features and enhancements:


- 	**Passwordless authentication**: This feature is supported using the FIDO2 protocol. For more information, see [Configuring Passwordless Authentication](../../learn/configuring-passwordless-authentication). 

-	**Cross protocol single logout**: This feature enables single logout applications that communicate using different SSO protocols such as OIDC and SAML. For more information, see [Single Logout](../../get-started/cross-protocol-single-logout).

-	**Adaptive authentication using function library**: WSO2 Identity Server already supports script-based adaptive authentication. This feature supports easily manageable function libraries that can be imported to the authentication scripts. For more information, see [Adaptive Authentication with Function Libraries](../../learn/adaptive-authentication-with-function-librabry). 

-	**New REST APIs**: This release includes new REST APIs for end users as well as for administrative users.
	<table>
		<tr>
			<th>For end users</th>
			<td>
				<ul>
					<li>[Manage challenge question answers](../../develop/challenge-rest-api)</li>
					<li>[View Authorized OAuth applications and revoke authorization from applications](../../develop/authorized-apps-rest-api)</li>
					<li>[Manage associated accounts](../../develop/association-rest-api)</li>
					<li>[View and revoke login sessions](../../develop/session-mgt-rest-api)</li>
					<li>[Manage pending approvals](../../develop/approvals-rest-api) </li>
				</ul>
			</td>				
		</tr>
		<tr>
			<th>For administrative users</th>
			<td>
				<ul>
					<li>[Manage challenge questions](../../develop/challenge-rest-api)</li>
				</ul>
			</td>				
		</tr>
	</table> 

-	**New Configuration model**: Previous WSO2 Identity Server versions supported multiple configuration files such as `carbon.xml`, `identity.xml`, and `axis2.xml`. With the new configuration model in WSO2 Identity Server 5.9.0, configurations are handled by the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. 


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
