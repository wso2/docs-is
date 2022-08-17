# User Management Errors Event Listener

The `UserManagementErrorEventListener` (i.e. `org.wso2.carbon.user.core.listener.UserManagementErrorEventListener`) is a new type of event listener that facilitates additional activities in the event of failures when executing user management scenarios or operations. The relevant caller class for this listener is `org.wso2.carbon.user.core.common.AbstractUserManagementErrorListener`. 
This type of event listener is similar to the [User Operation Listeners]({{base_path}}/extend/user-mgt/user-store-listeners). The registered event listeners of this type are called when there is a failure while doing user management related tasks.

---

## Operations

The `getExecutionOrderId` method returns the order ID of the relevant listener. Additionally, the following methods are exposed by this interface in order to support additional activities in an event of failure.

- `onAuthenticateFailure`
- `onAddUserFailure`
- `onUpdateCredentialFailure`
- `onUpdateCredentialByAdminFailure`
- `onDeleteUserFailure`
- `onSetUserClaimValueFailure`
- `onSetUserClaimValuesFailure`
- `onDeleteUserClaimValuesFailure`
- `onDeleteUserClaimValueFailure`
- `onAddRoleFailure`
- `onDeleteRoleFailure`
- `onUpdateRoleNameFailure`
- `onUpdateUserListOfRoleFailure`
- `onUpdateRoleListOfUserFailure`
- `onGetUserClaimValueFailure`
- `onGetUserClaimValuesFailure`
- `onUpdatePermissionsOfRoleFailure`
- `onGetUserListFailure`  

!!! note
    In order to return the order ID of a custom listener, you must override the `getExecutionOrderId` method. Specify a value greater than 0 for the custom listener as the order ID '0' is reserved for the default listener of WSO2 Identity Server.

    For more information about the purpose of each method, see the [java docs](https://github.com/wso2/carbon-kernel/tree/v4.6.1/core/org.wso2.carbon.user.core/src/main/java/org/wso2/carbon/user/core/listener/UserManagementErrorEventListener.java).
    
