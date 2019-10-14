# User Store Listeners

WSO2 Carbon User Stores provide the ability to customize user store
operations by registering an event listener for these operations. The
listeners are executed at a fixed point in the user store operation, and
the users are free to create a listener which implements their desired
logic to be executed at these fixed points. Listener is an extension to
extend the user core functions. Any number of listeners can be plugged
with the user core and they would be called one by one. By using a
listener, you are not overriding the user store implementation, which is
good since you are not customizing the existing implementations.

The following diagram demonstrates a typical flow of execution of the
user store operation, along with the listener's methods. The 'operation'
method (here, representative of any user store operation) first calls
the `         listener.doPreOperation        ` which is implemented in
the listener, then calls the `         doOperation        `, which is
implemented in the subclass extending the
`         org.wso2.carbon.user.core.common.AbstractUserStoreManager        `
(the abstract class which implements the
`         UserStoreManager        ` interface). After this, the
`         listener.doPostOperation        ` method is called. However,
this flow will change depending on the implementation (for instance in
the carbon authorization flow, there is only one listener method that is
being called).

![User store operations](../assets/img/using-wso2-identity-server/user-store-operations.png)

### How listeners work

Every time when the user core method is called, all the listeners that
are registered with that method are called. Listeners can be registered
before or after the actual method is called. Consider this example; in
the user core there is a method called
`                   addUser()                 ` . When a user is created
in WSO2 Identity Server, the
`                   addUser()                 ` method is called. You
can register a listener before the actual execution of
`                   addUser()                 ` method and also, you can
register a listener after the actual execution of
`                   addUser()                 ` method.

The `                   addUser()                 ` method can be seen
as follows.

``` java
addUser() {
    preAddUser(); // you can implement this using listener
    actualAddUser();
    postAddUser(); // you can implement this using listener
}
```

Both `                   preAddUser()                 ` and
`                   postAddUser()                 ` method can be
customized as you want. This means you can do some customizations before
the user is added or after the user is added. **All the methods in the
user core** have been implemented as above. You can customize them both
before and after.

Consider the following simple scenario: When a user is authenticated
with an LDAP, there is a requirement to add the authenticated time as an
attribute of the user. For this requirement, you need to write some
custom code after successful user authentication happened. The following
is the custom listener implementation for this. The
`                   doPostAuthenticate()                 ` method would
be called after actual user authentication is done.

``` java
package org.soasecurity.user.mgt.custom.extension;
 
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.user.core.UserStoreException;
import org.wso2.carbon.user.core.UserStoreManager;
import org.wso2.carbon.user.core.common.AbstractUserOperationEventListener;
 
/**
*
*/
public class MyUserMgtCustomExtension extends AbstractUserOperationEventListener {
 
private static final Log log = LogFactory.getLog(MyUserMgtCustomExtension.class);
 
@Override
public int getExecutionOrderId() {
return 9883;
}
@Override
public boolean doPreAuthenticate(String userName, Object credential,
UserStoreManager userStoreManager) throws UserStoreException {
 
// just log
log.info("doPreAuthenticate method is called before authenticating with user store");
 
return true;
}
 
@Override
public boolean doPostAuthenticate(String userName, boolean authenticated, UserStoreManager userStoreManager) throws UserStoreException {
// just log
log.info("doPreAuthenticate method is called after authenticating with user store");
 
// custom logic
 
// check whether user is authenticated
if(authenticated){
 
// persist user attribute in to user store
// "http://wso2.org/claims/lastlogontime" is the claim uri which represent the LDAP attribute
// more detail about claim management from here http://soasecurity.org/2012/05/02/claim-management-with-wso2-identity-server/
 
userStoreManager.setUserClaimValue(userName, "http://wso2.org/claims/lastlogontime",
Long.toString(System.currentTimeMillis()), null);
 
}
 
return true;
 
}
 
}
```

Likewise, you can add custom extensions to any method of the user core.

!!! tip
    
    Make note of the following.
    
    1.  The `                     getExecutionOrderId()                   `
        method can return any random value. This is important when there is
        more than one listener in the Identity Server and you need to
        consider the execution order of them
    2.  All the methods return a `          boolean         ` value. This
        value is mentioned regardless of whether you want to execute the
        next listener or not.
    

The following are the steps to configure the custom implementation.

1.  Listeners are registered as OSGI components. Therefore you need to
    register this class in an OSGI framework. You can go through
    **[this](https://svn.wso2.org/repos/wso2/people/asela/user-mgt/custom-listener/)
   ,** which is the complete sample project.
2.  Copy the OSGI bundle file in to the
    `          <IS_HOME>/repository/components/dropins         `
    directory.
3.  Restart the server.

### Interfaces

In WSO2 Carbon products that use the standard user manager kernel, there
are multiple interfaces with which you can implement User Store
Listeners.

| Listener Interface                                                                                                                                                                                                                                      | Operation Type                     | Caller Class                                                                                                                                                                                                                            | Remarks                                                                                             |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [org.wso2.carbon.<br>user.core.listener.<br>AuthorizationManagerListener](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/AuthorizationManagerListener.java)                   | doPreOperation                     | [org.wso2.carbon.<br>user.core.authorization.<br>JDBCAuthorizationManager](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/authorization/JDBCAuthorizationManager.java) | Only one listener method <br>which gets called <br>before each implemented <br>operation logic                  |
| [org.wso2.carbon.<br>user.core.listener.<br>ClaimManagerListener](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/ClaimManagerListener.java)                                   | doPreOperation                     | [org.wso2.carbon.<br>user.core.claim.<br>DefaultClaimManager](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/claim/DefaultClaimManager.java)                           | Only one listener method<br> which gets called <br>before each implemented <br>operation logic                  |
| [org.wso2.carbon.<br>user.core.listener.<br>UserOperationEventListener](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/UserOperationEventListener.java)                       | doPreOperation and doPostOperation | [org.wso2.carbon.<br>user.core.common.<br>AbstractUserStoreManager](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/common/AbstractUserStoreManager.java)               | pre and post operations<br> that get called <br>before and after <br>(respectively) implemented <br>operation logic |
| [org.wso2.carbon.<br>user.core.listener.<br>UserStoreManagerConfigurationListener](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/UserStoreManagerConfigurationListener.java) | doPreOperation                     | [org.wso2.carbon.<br>user.core.common.<br>AbstractUserStoreManager](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/common/AbstractUserStoreManager.java)               | One listener method <br>which is executed<br> before the implemented<br> logic                                  |
| [org.wso2.carbon.<br>user.core.listener.<br>UserStoreManagerListener](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/UserStoreManagerListener.java)                           | doPreOperation                     | [org.wso2.carbon.<br>user.core.common.<br>AbstractUserStoreManager](https://github.com/wso2/carbon-kernel/blob/4.4.x/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/common/AbstractUserStoreManager.java)               | One listener method <br> which is executed <br>before the implemented <br>logic                                  |

!!! note    
    It is recommended to extend the existing abstract implementation of
    these interfaces rather than implementing from scratch. For example,
    `org.wso2.carbon.user.core.listener.UserOperationEventListener`
    is implemented in the
    `         org.wso2.carbon.user.core.common.AbstractUserOperationEventListener        `
    abstract class.
    
