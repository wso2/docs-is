# Integrating WSO2 Identity Server with Liferay

Liferay has a highly extensible architecture. You decide what you want
to override in Liferay using an extension. This topic indicates how to
delegate Liferay's authentication and authorization functionality to
WSO2 Identity Server.

![](attachments/103331140/103331141.png){width="750"}

One of the challenges you may face in this integration is the LDAP
Users/Groups import. You can connect an LDAP to Liferay, however, to
authenticate users to Liferay against the underlying LDAP, it has to
import all the users and groups to Liferay's underlying database, which
is by default running on Hypersonic.

You only need to keep the user data in a single LDAP to avoid this
duplication. However, this is not straightforward as you need to write
the complete persistence layer. Let's take a step back and see how
Authentication and Authorization work in Liferay.

Liferay has a chain of authenticators. When you enter your
username/password, the chain of authenticators are invoked. This is the
place where we plugged in the **WSO2ISAuthenticator** .

auth.pipeline.pre=org.wso2.liferay.is.authenticator.WSO2ISAuthenticator  
auth.pipeline.enable.liferay.check=false  
wso2is.auth.service.endpoint.primary= <https://localhost:9443/services/>

The above configuration (which should be in the
`         liferay_home/tomcat/webapps/ROOT/WEB-INF/classes/portal-ext.properties        `
file) tells Liferay to load our custom authenticator. Also, the second
entry indicates that once the authenticator is loaded, do not invoke the
rest in the chain. Otherwise, the default Liferay authenticator is also
invoked. Third entry points to the **AuthenticationAdmin** service
running in WSO2 Identity Server.

Now, the username and password goes into the **WSO2ISAuthenticator** and
it communicates with WSO2 Identity Server over SOAP to authenticate the
user. Once authentication is done, the control is once again passed into
the Liferay container.

Now is the tricky part. Liferay has it's own permission model which
enables you to view or add portlets depending on your permissions. For
this, it needs to find which Liferay roles are attached to the logged in
user or which Liferay roles are attached to any group the logged in user
belongs to. To get these details, it needs to communicate with the
underlying persistence layer which loads details from Liferay's
underlying database. This is why it is useful to have users imported
here from the LDAP.

Even though it is possible, it was decided not to write a persistence
layer but only to override authentication and authorization as that is
sufficient for this scenario.

Even in the case of authorization; there are two types.

1.  The authorization model governed by Liferay to display/add portlets
    to the portal.
2.  The authorization model used within the Portlet itself to display
    content within the portlet.

The first type is done by assigning portlet management permissions to a
given Liferay role and assigning members (groups/users) to that role
from the underlying LDAP. We did not want to do that as that has more to
do with the portal administration side and as a result, much more
specific to Liferay. However, the second model directly deals with the
business functions. It was decided that this is a better option and it
is used in a fine-grained manner.

Even the second model can be done with Liferay's roles and permission.
Whenever you want to render something in the portlet that requires some
restricted audience, before rendering that you need to call
`         req.isUserInRole("roleNme")        ` . This is compliant with
the JSR too. The following are the disadvantages:

1.  Our business functionalities in an SOA deployment should not be
    governed by Liferay roles. Liferay could only be a single channel to
    access the business functions.
2.  We can achieve only the role based access control with this model.

Liferay, also has it's own way of permission checking, which is within a
portlet via the **PermissionChecker** API. See
[here](http://www.liferay.com/web/joseph.shum/blog/-/blogs/960320) for
more details on the **PermissionChecker** .

Our approach was to write a utility function called
`         hasPermission()        ` . If you extend your portlet from
`         org.wso2.liferay.xacml.connector.SecuredGenericPortlet        `
then this is automatically available to you. Alternatively you can
directly call it through `         AuthzChecker.hasPermission()        `
. These functions are available from the
`         org.wso2.liferay.xacml.connector.jar        ` file.

You can find all Jar dependencies from
[here](http://cache.facilelogin.com/lib.ext.zip) and copy those to
`         liferay_home/tomcat/lib/ext        ` .

The connection between the XACML connector deployed in Liferay and WSO2
XACML engine is through Thrift.

!!! note
    
    Using thrift in XACML calls
    
    In order to use thrift in XACML calls, you must first enable the thrift
    service in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file.
    Set this to `         true        ` .
    
    ``` xml
    <EnableThriftService>true</EnableThriftService>
    ```
    

You need to add following properties to the
`         portal-ext.properties        ` file:

wso2is.auth.thrift.endpoint=localhost  
wso2is.auth.thrift.port=10500  
wso2is.auth.thrift.connection.timeout=10000  
wso2is.auth.thrift.admin.user=admin  
wso2is.auth.thrift.admin.user.password=admin  
wso2is.auth.thrift.endpoint.login= <https://localhost:9443/>

Since by default Identity Server is using a self-signed certificate,
either you have to import it's public certificate to the trust store of
Liferay or set the following two properties in the
`         portal-ext.properties        ` file pointing to the Identity
Server's key store.

wso2is.auth.thrift.system.trusstore=/wso2is-3.2.3/repository/resources/security/wso2carbon.jks  
wso2is.auth.thrift.system.trusstore.password=wso2carbon

Please note that the above configuration is tested with Liferay 6.1.1
and WSO2 Identity 3.2.3/4.0.0.
