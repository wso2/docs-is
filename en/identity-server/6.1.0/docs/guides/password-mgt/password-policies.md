# Password Policies

WSO2 Identity Server enables configuring password policies to enhance user password strength using the following features. You can configure any or all of them as you see fit. 

-	[Password Patterns](#configure-password-patterns)
-	[Password History](#validate-password-history)
-   [Password Expiry](#configure-password-expiry)

----

## Configure password patterns

WSO2 Identity Server (IS) allows you to define custom password policies and enforce them at the point of user creation. This topic guides you through configuring a simple custom password policy and enforcing it. You can also have a different password policy for each tenant in a multi-tenant environment.

1.  Start the WSO2 IS server and log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Click **Resident** under **Identity Providers** found in the **Main**.

3.  Expand the **Password Policies** tab.

4.  Expand the **Password Patterns** tab and select **Validate passwords based on a policy pattern**. Update the default values and click **Update**.
    
    ![password-policies]({{base_path}}/assets/img/guides/password-policies.png) 

    !!! note "Configuring password policies for multiple tenants"
        To configure this separately for different tenants in a
        multi-tenant environment, first login with Tenant A credentials and
        configure the password policy. Next, logout and login again with
        Tenant B credentials to configure a different policy for Tenant B.
    

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Default Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Minimum number of characters</td>
    <td>This value specifies the minimum length allowed for a password.</td>
    <td>6</td>
    </tr>
    <tr class="even">
    <td>Maximum number of characters</td>
    <td>This value specifies the maximum length allowed for a password.</td>
    <td>12</td>
    </tr>
    <tr class="odd">
    <td>Password pattern regex</td>
    <td>This is a Java based regular expression (regex) that defines a character sequence for the password to follow.</td>
    <td><div class="content-wrapper">
    <p>^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&amp;*])).{0,100}$</p>
    <div>
    <div class="admonition info">
    <p class="admonition-title">Info</p>
    <p>For more information on the password pattern characters and the different patterns you can use, see <a href="https://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html">Java Regex Pattern</a> .</p></div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td>Error message on pattern violation</td>
    <td>This value specifies the error message that will appear if the password policy is violated at the point of user creation.</td>
    <td>'Password pattern policy violated. Password should contain a digit[0-9], a lower case letter[a-z], an upper case letter[A-Z], one of !@#$%&amp;* characters'</td>
    </tr>
    </tbody>
    </table>

!!! warning "Ask Password and JIT Provisioning"

    When registering users with [Password Entry (ask password)]({{base_path}}/guides/identity-lifecycles/invitation-workflow/) or [JIT Provisioning]({{base_path}}/get-started/provisioning-architecture/#jit-provisioning), temporary passwords are automatically generated and validated against a predefined PasswordJavaRegEx regular expression in the user store configurations. For complex regex patterns, the password validation could fail causing an unsuccessful user registration.

    Follow the steps below to resolve this issue:  

    **JIT Provisioning**
    
    Follow the steps below to generate passwords that align with the regex pattern that is defined in the user store configurations: 

    a.  Create a custom provisioning handler by extending the `DefaultProvisioninghandler`.

    ??? note "Click to view a sample custom handler"
        
        ```java 
            package com.identity.application.proviosioning;
            import org.apache.commons.lang.RandomStringUtils;
            import org.apache.commons.lang.StringUtils;
            import org.apache.commons.logging.Log;
            import org.apache.commons.logging.LogFactory;
            import org.wso2.carbon.CarbonConstants;
            import org.wso2.carbon.CarbonException;
            import org.wso2.carbon.context.PrivilegedCarbonContext;
            import org.wso2.carbon.core.util.AnonymousSessionUtil;
            import org.wso2.carbon.core.util.PermissionUpdateUtil;
            import org.wso2.carbon.identity.application.authentication.framework.exception.FrameworkException;
            import org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.ProvisioningHandler;
            import org.wso2.carbon.identity.application.authentication.framework.internal.FrameworkServiceComponent;
            import org.wso2.carbon.identity.application.authentication.framework.util.FrameworkUtils;
            import org.wso2.carbon.identity.core.util.IdentityUtil;
            import org.wso2.carbon.identity.user.profile.mgt.UserProfileAdmin;
            import org.wso2.carbon.identity.user.profile.mgt.UserProfileException;
            import org.wso2.carbon.registry.core.service.RegistryService;
            import org.wso2.carbon.user.core.UserCoreConstants;
            import org.wso2.carbon.user.core.UserRealm;
            import org.wso2.carbon.user.core.UserStoreException;
            import org.wso2.carbon.user.core.UserStoreManager;
            import org.wso2.carbon.user.core.service.RealmService;
            import org.wso2.carbon.user.core.util.UserCoreUtil;
            import org.wso2.carbon.utils.multitenancy.MultitenantUtils;
            
            import java.security.SecureRandom;
            import java.util.ArrayList;
            import java.util.Arrays;
            import java.util.Collection;
            import java.util.HashMap;
            import java.util.List;
            import java.util.Map;
            
            
            public class CustomProvisioningHandler implements ProvisioningHandler {
            
                private static final Log log = LogFactory.getLog(CustomProvisioningHandler.class);
                private static final String ALREADY_ASSOCIATED_MESSAGE = "UserAlreadyAssociated";
                private static volatile org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.impl.DefaultProvisioningHandler instance;
                private SecureRandom random = new SecureRandom();
            
                public static org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.impl.DefaultProvisioningHandler getInstance() {
                    if (instance == null) {
                        synchronized (org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.impl.DefaultProvisioningHandler.class) {
                            if (instance == null) {
                                instance = new org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.impl.DefaultProvisioningHandler();
                            }
                        }
                    }
                    return instance;
                }
            
                @Override
                public void handle(List<String> roles, String subject, Map<String, String> attributes,
                                String provisioningUserStoreId, String tenantDomain) throws FrameworkException {
            
                    RegistryService registryService = FrameworkServiceComponent.getRegistryService();
                    RealmService realmService = FrameworkServiceComponent.getRealmService();
            
                    try {
                        int tenantId = realmService.getTenantManager().getTenantId(tenantDomain);
                        UserRealm realm = AnonymousSessionUtil.getRealmByTenantDomain(registryService,
                                realmService, tenantDomain);
            
                        String username = MultitenantUtils.getTenantAwareUsername(subject);
            
                        String userStoreDomain;
                        UserStoreManager userStoreManager;
                        if (IdentityConstants.AS_IN_USERNAME_USERSTORE_FOR_JIT
                                .equalsIgnoreCase(provisioningUserStoreId)) {
                            String userStoreDomainFromSubject = UserCoreUtil.extractDomainFromName(subject);
                            try {
                                userStoreManager = getUserStoreManager(realm, userStoreDomainFromSubject);
                                userStoreDomain = userStoreDomainFromSubject;
                            } catch (FrameworkException e) {
                                log.error("User store domain " + userStoreDomainFromSubject + " does not exist for the tenant "
                                        + tenantDomain + ", hence provisioning user to "
                                        + UserCoreConstants.PRIMARY_DEFAULT_DOMAIN_NAME);
                                userStoreDomain = UserCoreConstants.PRIMARY_DEFAULT_DOMAIN_NAME;
                                userStoreManager = getUserStoreManager(realm, userStoreDomain);
                            }
                        } else {
                            userStoreDomain = getUserStoreDomain(provisioningUserStoreId, realm);
                            userStoreManager = getUserStoreManager(realm, userStoreDomain);
                        }
                        username = UserCoreUtil.removeDomainFromName(username);
            
                        if (log.isDebugEnabled()) {
                            log.debug("User: " + username + " with roles : " + roles + " is going to be provisioned");
                        }
            
                        // If internal roles exists convert internal role domain names to pre defined camel case domain names.
                        List<String> rolesToAdd = convertInternalRoleDomainsToCamelCase(roles);
            
                        // addingRoles = rolesToAdd AND allExistingRoles
                        Collection<String> addingRoles = getRolesAvailableToAdd(userStoreManager, rolesToAdd);
            
                        String idp = attributes.remove(IdentityConstants.IDP_ID);
                        String subjectVal = attributes.remove(IdentityConstants.ASSOCIATED_ID);
            
                        Map<String, String> userClaims = prepareClaimMappings(attributes);
            
                        if (userStoreManager.isExistingUser(username)) {
            
                            if (roles != null && !roles.isEmpty()) {
                                // Update user
                                List<String> currentRolesList = Arrays.asList(userStoreManager
                                        .getRoleListOfUser(username));
                                // addingRoles = (newRoles AND existingRoles) - currentRolesList)
                                addingRoles.removeAll(currentRolesList);
            
                                Collection<String> deletingRoles = retrieveRolesToBeDeleted(realm, currentRolesList, rolesToAdd);
            
                                // TODO : Does it need to check this?
                                // Check for case whether superadmin login
                                handleFederatedUserNameEqualsToSuperAdminUserName(realm, username, userStoreManager, deletingRoles);
            
                                updateUserWithNewRoleSet(username, userStoreManager, rolesToAdd, addingRoles, deletingRoles);
                            }
            
                            if (!userClaims.isEmpty()) {
                                userClaims.remove(IdentityConstants.PASSWORD);
                                userStoreManager.setUserClaimValues(UserCoreUtil.removeDomainFromName(username), userClaims, null);
                            }
            
                            UserProfileAdmin userProfileAdmin = UserProfileAdmin.getInstance();
            
                            if (StringUtils.isEmpty(userProfileAdmin.getNameAssociatedWith(idp, subjectVal))) {
                                // Associate User
                                associateUser(username, userStoreDomain, tenantDomain, subjectVal, idp);
                            }
                        } else {
                            String password = generatePassword();
                            String passwordFromUser = userClaims.get(IdentityConstants.PASSWORD);
                            if (StringUtils.isNotEmpty(passwordFromUser)) {
                                password = passwordFromUser;
                            }
                            userClaims.remove(IdentityConstants.PASSWORD);
                            userStoreManager
                                    .addUser(username, password, addingRoles.toArray(new String[addingRoles.size()]), userClaims,
                                            null);
                            // Associate User
                            associateUser(username, userStoreDomain, tenantDomain, subjectVal, idp);
            
                            if (log.isDebugEnabled()) {
                                log.debug("Federated user: " + username
                                        + " is provisioned by authentication framework with roles : "
                                        + Arrays.toString(addingRoles.toArray(new String[addingRoles.size()])));
                            }
                        }
            
                        PermissionUpdateUtil.updatePermissionTree(tenantId);
            
                    } catch (org.wso2.carbon.user.api.UserStoreException | CarbonException | UserProfileException e) {
                        throw new FrameworkException("Error while provisioning user : " + subject, e);
                    } finally {
                        IdentityUtil.clearIdentityErrorMsg();
                    }
                }
            
                protected void associateUser(String username, String userStoreDomain, String tenantDomain, String subject,
                                            String idp) throws FrameworkException {
            
                    String usernameWithUserstoreDomain = UserCoreUtil.addDomainToName(username, userStoreDomain);
                    try {
                        // start tenant flow
                        FrameworkUtils.startTenantFlow(tenantDomain);
                        PrivilegedCarbonContext.getThreadLocalCarbonContext().setUsername(usernameWithUserstoreDomain);
            
                        if (!StringUtils.isEmpty(idp) && !StringUtils.isEmpty(subject)) {
                            UserProfileAdmin userProfileAdmin = UserProfileAdmin.getInstance();
                            userProfileAdmin.associateID(idp, subject);
            
                            if (log.isDebugEnabled()) {
                                log.debug("Associated local user: " + usernameWithUserstoreDomain + " in tenant: " +
                                        tenantDomain + " to the federated subject : " + subject + " in IdP: " + idp);
                            }
                        } else {
                            throw new FrameworkException("Error while associating local user: " + usernameWithUserstoreDomain +
                                    " in tenant: " + tenantDomain + " to the federated subject : " + subject + " in IdP: " + idp);
                        }
                    } catch (UserProfileException e) {
                        if (isUserAlreadyAssociated(e)) {
                            log.info("An association already exists for user: " + subject + ". Skip association while JIT " +
                                    "provisioning");
                        } else {
                            throw new FrameworkException("Error while associating local user: " + usernameWithUserstoreDomain +
                                    " in tenant: " + tenantDomain + " to the federated subject : " + subject + " in IdP: " + idp, e);
                        }
                    } finally {
                        // end tenant flow
                        FrameworkUtils.endTenantFlow();
                    }
                }
            
                private boolean isUserAlreadyAssociated(UserProfileException e) {
                    return e.getMessage() != null && e.getMessage().contains(ALREADY_ASSOCIATED_MESSAGE);
                }
            
                private void updateUserWithNewRoleSet(String username, UserStoreManager userStoreManager, List<String> rolesToAdd,
                                                    Collection<String> addingRoles, Collection<String> deletingRoles)
                        throws UserStoreException {
                    if (log.isDebugEnabled()) {
                        log.debug("Deleting roles : "
                                + Arrays.toString(deletingRoles.toArray(new String[deletingRoles.size()]))
                                + " and Adding roles : "
                                + Arrays.toString(addingRoles.toArray(new String[addingRoles.size()])));
                    }
                    userStoreManager.updateRoleListOfUser(username, deletingRoles.toArray(new String[deletingRoles
                                    .size()]),
                            addingRoles.toArray(new String[addingRoles.size()]));
                    if (log.isDebugEnabled()) {
                        log.debug("Federated user: " + username
                                + " is updated by authentication framework with roles : "
                                + rolesToAdd);
                    }
                }
            
                private void handleFederatedUserNameEqualsToSuperAdminUserName(UserRealm realm, String username,
                                                                            UserStoreManager userStoreManager,
                                                                            Collection<String> deletingRoles)
                        throws UserStoreException, FrameworkException {
                    if (userStoreManager.getRealmConfiguration().isPrimary()
                            && username.equals(realm.getRealmConfiguration().getAdminUserName())) {
                        if (log.isDebugEnabled()) {
                            log.debug("Federated user's username is equal to super admin's username of local IdP.");
                        }
            
                        // Whether superadmin login without superadmin role is permitted
                        if (deletingRoles
                                .contains(realm.getRealmConfiguration().getAdminRoleName())) {
                            if (log.isDebugEnabled()) {
                                log.debug("Federated user doesn't have super admin role. Unable to sync roles, since" +
                                        " super admin role cannot be unassigned from super admin user");
                            }
                            throw new FrameworkException(
                                    "Federated user which having same username to super admin username of local IdP," +
                                            " trying login without having super admin role assigned");
                        }
                    }
                }
            
                private Map<String, String> prepareClaimMappings(Map<String, String> attributes) {
                    Map<String, String> userClaims = new HashMap<>();
                    if (attributes != null && !attributes.isEmpty()) {
                        for (Map.Entry<String, String> entry : attributes.entrySet()) {
                            String claimURI = entry.getKey();
                            String claimValue = entry.getValue();
                            if (!(StringUtils.isEmpty(claimURI) || StringUtils.isEmpty(claimValue))) {
                                userClaims.put(claimURI, claimValue);
                            }
                        }
                    }
                    return userClaims;
                }
            
                private Collection<String> getRolesAvailableToAdd(UserStoreManager userStoreManager, List<String> roles)
                        throws UserStoreException {
            
                    List<String> rolesAvailableToAdd = new ArrayList<>();
                    rolesAvailableToAdd.addAll(roles);
            
                    String[] roleNames = userStoreManager.getRoleNames();
                    if (roleNames != null) {
                        rolesAvailableToAdd.retainAll(Arrays.asList(roleNames));
                    }
                    return rolesAvailableToAdd;
                }
            
                private UserStoreManager getUserStoreManager(UserRealm realm, String userStoreDomain)
                        throws UserStoreException, FrameworkException {
                    UserStoreManager userStoreManager;
                    if (userStoreDomain != null && !userStoreDomain.isEmpty()) {
                        userStoreManager = realm.getUserStoreManager().getSecondaryUserStoreManager(
                                userStoreDomain);
                    } else {
                        userStoreManager = realm.getUserStoreManager();
                    }
            
                    if (userStoreManager == null) {
                        throw new FrameworkException("Specified user store is invalid");
                    }
                    return userStoreManager;
                }
            
                /**
                * Compute the user store which user to be provisioned
                *
                * @return
                * @throws UserStoreException
                */
                private String getUserStoreDomain(String userStoreDomain, UserRealm realm)
                        throws FrameworkException, UserStoreException {
            
                    // If the any of above value is invalid, keep it empty to use primary userstore
                    if (userStoreDomain != null
                            && realm.getUserStoreManager().getSecondaryUserStoreManager(userStoreDomain) == null) {
                        throw new FrameworkException("Specified user store domain " + userStoreDomain
                                + " is not valid.");
                    }
            
                    return userStoreDomain;
                }
            
                /**
                * remove user store domain from names except the domain 'Internal'
                *
                * @param names
                * @return
                */
                private List<String> removeDomainFromNamesExcludeInternal(List<String> names, int tenantId) {
                    List<String> nameList = new ArrayList<String>();
                    for (String name : names) {
                        String userStoreDomain = IdentityUtil.extractDomainFromName(name);
                        if (UserCoreConstants.INTERNAL_DOMAIN.equalsIgnoreCase(userStoreDomain)) {
                            nameList.add(name);
                        } else {
                            nameList.add(UserCoreUtil.removeDomainFromName(name));
                        }
                    }
                    return nameList;
                }
            
                /**
                * Check for internal roles and convert internal role domain names to camel case to match with predefined
                * internal role domains.
                *
                * @param roles roles to verify and update
                * @return updated role list
                */
                private List<String> convertInternalRoleDomainsToCamelCase(List<String> roles) {
            
                    List<String> updatedRoles = new ArrayList<>();
            
                    if (roles != null) {
                        // If internal roles exist, convert internal role domain names to case sensitive predefined domain names.
                        for (String role : roles) {
                            if (StringUtils.containsIgnoreCase(role, UserCoreConstants.INTERNAL_DOMAIN + CarbonConstants
                                    .DOMAIN_SEPARATOR)) {
                                updatedRoles.add(UserCoreConstants.INTERNAL_DOMAIN + CarbonConstants.DOMAIN_SEPARATOR +
                                        UserCoreUtil.removeDomainFromName(role));
                            } else if (StringUtils.containsIgnoreCase(role, IdentityConstants.APPLICATION_DOMAIN + CarbonConstants.DOMAIN_SEPARATOR)) {
                                updatedRoles.add(IdentityConstants.APPLICATION_DOMAIN + CarbonConstants.DOMAIN_SEPARATOR + UserCoreUtil
                                        .removeDomainFromName(role));
                            } else if (StringUtils.containsIgnoreCase(role, IdentityConstants.WORKFLOW_DOMAIN + CarbonConstants.DOMAIN_SEPARATOR)) {
                                updatedRoles.add(IdentityConstants.WORKFLOW_DOMAIN + CarbonConstants.DOMAIN_SEPARATOR + UserCoreUtil
                                        .removeDomainFromName(role));
                            } else {
                                updatedRoles.add(role);
                            }
                        }
                    }
            
                    return updatedRoles;
                }
            
                /**
                * Retrieve the list of roles to be deleted.
                *
                * @param realm            user realm
                * @param currentRolesList current role list of the user
                * @param rolesToAdd       roles that are about to be added
                * @return roles to be deleted
                * @throws UserStoreException When failed to access user store configuration
                */
                protected List<String> retrieveRolesToBeDeleted(UserRealm realm, List<String> currentRolesList,
                                                                List<String> rolesToAdd) throws UserStoreException {
            
                    List<String> deletingRoles = new ArrayList<String>();
                    deletingRoles.addAll(currentRolesList);
            
                    // deletingRoles = currentRolesList - rolesToAdd
                    deletingRoles.removeAll(rolesToAdd);
            
                    // Exclude Internal/everyonerole from deleting role since its cannot be deleted
                    deletingRoles.remove(realm.getRealmConfiguration().getEveryOneRoleName());
            
                    return deletingRoles;
                }
            
                /**
                * Generates (random) password for user to be provisioned
                *
                * @return
                */
                private String generatePassword() {
                    //generate password alighn with regex pattern
                    return RandomStringUtils.randomNumeric(12);
                }
            
            } 

        ```
    b.  Implement this logic within the `generatePassword()` method. 
    
    c.  Build the OSGI bundle of the custom handler and place the .jar file in `<IS_HOME>/repository/components/dropins` directory. 
    
    d.  Open the `deployment.toml` file in the '<IS_HOME>/repository/conf/' directory and add the following configuration.

    ```toml
    [authentication.framework.extensions] 
    provisioning_handler="org.wso2.carbon.identity.application.authentication.framework.handler.provisioning.impl.CustomProvisioning"
    ```

    e.  Restart WSO2 Identity Server. 

    **Password entry (ask password)**

    Follow the steps below to generate passwords that align with the regex pattern that is defined in the user store configurations: 

    a.  Create a custom operation listener by overriding the `doPreAddUser()` method in `UserOperationsEventListener`. 
        
    ??? note "Click to view a sample user operation event listener"

        ```java
            package org.wso2.carbon.sample.user.operation.event.listener;
            import org.apache.commons.lang.RandomStringUtils;
            import org.apache.commons.lang.StringUtils;
            import org.apache.commons.logging.Log;
            import org.apache.commons.logging.LogFactory;
            import org.wso2.carbon.CarbonConstants;
            import org.wso2.carbon.context.CarbonContext;
            import org.wso2.carbon.user.api.Permission;
            import org.wso2.carbon.user.core.UserStoreException;
            import org.wso2.carbon.user.core.UserStoreManager;
            import org.wso2.carbon.user.core.common.AbstractUserOperationEventListener;
            
            import java.util.HashMap;
            import java.util.List;
            import java.util.Map;
            
            public class SampleUserOperationEventListener extends AbstractUserOperationEventListener {
            
                //private static Log log = LogFactory.getLog(SampleUserOperationEventListener.class);
            
                private static final Log log =LogFactory.getLog(SampleUserOperationEventListener.class);
                private static String ASK_PASSWORD_CLAIM="http://wso2.org/claims/identity/askPassword";
            
                @Override
                public int getExecutionOrderId() {
            
                    //This listener should execute before the IdentityMgtEventListener
                    //Hence the number should be < 1357 (Execution order ID of IdentityMgtEventListener)
                    return 1356;
                }
            
            
                @Override
                public boolean doPreAuthenticate(String userName, Object credential, UserStoreManager userStoreManager) throws UserStoreException {
                    log.info( "doPreAuthenticate"+ userName);
                    return true;
                }
            
                @Override
                public boolean doPostAuthenticate(String userName, boolean authenticated, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostAuthenticate(userName, authenticated, userStoreManager);
                }
            
                @Override
                public boolean doPreAddUser(String userName, Object credential, String[] roleList, Map<String, String> claims, String profile, UserStoreManager userStoreManager) throws UserStoreException {
            
                    String askPasswordValue="";
            
                    if (StringUtils.isNotEmpty(claims.get(ASK_PASSWORD_CLAIM))) {
                        askPasswordValue =claims.get(ASK_PASSWORD_CLAIM);
                    }
                    if (askPasswordValue.equals("true")) {
                        String password = generatePassword();
                        ((StringBuffer) credential).setLength(0);
                        ((StringBuffer) credential).append(password);
                    }
                    return true;
            
                }
            
                @Override
                public boolean doPostAddUser(String userName, Object credential, String[] roleList, Map<String, String> claims, String profile, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostAddUser(userName, credential, roleList, claims, profile, userStoreManager);
            
            
                }
            
                @Override
                public boolean doPreUpdateCredential(String userName, Object newCredential, Object oldCredential, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreUpdateCredential(userName, newCredential, oldCredential, userStoreManager);
                }
            
                @Override
                public boolean doPostUpdateCredential(String userName, Object credential, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostUpdateCredential(userName, credential, userStoreManager);
                }
            
                @Override
                public boolean doPreUpdateCredentialByAdmin(String userName, Object newCredential, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreUpdateCredentialByAdmin(userName, newCredential, userStoreManager);
                }
            
                @Override
                public boolean doPostUpdateCredentialByAdmin(String userName, Object credential, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostUpdateCredentialByAdmin(userName, credential, userStoreManager);
                }
            
                @Override
                public boolean doPreDeleteUser(String userName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreDeleteUser(userName, userStoreManager);
                }
            
                @Override
                public boolean doPostDeleteUser(String userName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostDeleteUser(userName, userStoreManager);
                }
            
                @Override
                public boolean doPreSetUserClaimValue(String userName, String claimURI, String claimValue, String profileName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreSetUserClaimValue(userName, claimURI, claimValue, profileName, userStoreManager);
                }
            
                @Override
                public boolean doPostSetUserClaimValue(String userName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostSetUserClaimValue(userName, userStoreManager);
                }
            
                @Override
                public boolean doPreSetUserClaimValues(String userName, Map<String, String> claims, String profileName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreSetUserClaimValues(userName, claims, profileName, userStoreManager);
                }
            
                @Override
                public boolean doPostSetUserClaimValues(String userName, Map<String, String> claims, String profileName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostSetUserClaimValues(userName, claims, profileName, userStoreManager);
                }
            
                @Override
                public boolean doPreDeleteUserClaimValues(String userName, String[] claims, String profileName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreDeleteUserClaimValues(userName, claims, profileName, userStoreManager);
                }
            
                @Override
                public boolean doPostDeleteUserClaimValues(String userName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostDeleteUserClaimValues(userName, userStoreManager);
                }
            
                @Override
                public boolean doPreDeleteUserClaimValue(String userName, String claimURI, String profileName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreDeleteUserClaimValue(userName, claimURI, profileName, userStoreManager);
                }
            
                @Override
                public boolean doPostDeleteUserClaimValue(String userName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostDeleteUserClaimValue(userName, userStoreManager);
                }
            
                @Override
                public boolean doPreAddRole(String roleName, String[] userList, Permission[] permissions, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreAddRole(roleName, userList, permissions, userStoreManager);
                }
            
                @Override
                public boolean doPostAddRole(String roleName, String[] userList, Permission[] permissions, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostAddRole(roleName, userList, permissions, userStoreManager);
                }
            
                @Override
                public boolean doPreDeleteRole(String roleName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreDeleteRole(roleName, userStoreManager);
                }
            
                @Override
                public boolean doPostDeleteRole(String roleName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostDeleteRole(roleName, userStoreManager);
                }
            
                @Override
                public boolean doPreUpdateRoleName(String roleName, String newRoleName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreUpdateRoleName(roleName, newRoleName, userStoreManager);
                }
            
                @Override
                public boolean doPostUpdateRoleName(String roleName, String newRoleName, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostUpdateRoleName(roleName, newRoleName, userStoreManager);
                }
            
                @Override
                public boolean doPreUpdateUserListOfRole(String roleName, String[] deletedUsers, String[] newUsers, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreUpdateUserListOfRole(roleName, deletedUsers, newUsers, userStoreManager);
            
                }
            
                @Override
                public boolean doPostUpdateUserListOfRole(String roleName, String[] deletedUsers, String[] newUsers, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostUpdateUserListOfRole(roleName, deletedUsers, newUsers, userStoreManager);
                }
            
                @Override
                public boolean doPreUpdateRoleListOfUser(String userName, String[] deletedRoles, String[] newRoles, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPreUpdateRoleListOfUser(userName, deletedRoles, newRoles, userStoreManager);
                }
            
                @Override
                public boolean doPostUpdateRoleListOfUser(String userName, String[] deletedRoles, String[] newRoles, UserStoreManager userStoreManager) throws UserStoreException {
                    return super.doPostUpdateRoleListOfUser(userName, deletedRoles, newRoles, userStoreManager);
                }
            
                @Override
                public boolean doPreGetUserClaimValue(String userName, String claim, String profileName, UserStoreManager storeManager) throws UserStoreException {
                    return super.doPreGetUserClaimValue(userName, claim, profileName, storeManager);
                }
            
                @Override
                public boolean doPreGetUserClaimValues(String userName, String[] claims, String profileName, Map<String, String> claimMap, UserStoreManager storeManager) throws UserStoreException {
                    return super.doPreGetUserClaimValues(userName, claims, profileName, claimMap, storeManager);
                }
            
                @Override
                public boolean doPostGetUserClaimValue(String userName, String claim, List<String> claimValue, String profileName, UserStoreManager storeManager) throws UserStoreException {
                    return super.doPostGetUserClaimValue(userName, claim, claimValue, profileName, storeManager);
                }
            
                @Override
                public boolean doPostGetUserClaimValues(String userName, String[] claims, String profileName, Map<String, String> claimMap, UserStoreManager storeManager) throws UserStoreException {
                    return super.doPostGetUserClaimValues(userName, claims, profileName, claimMap, storeManager);
                }
            
                /**
                * Get the logged in user's username who is calling the operation
                * @return username
                */
            
                private String getUser() {
                    return CarbonContext.getThreadLocalCarbonContext().getUsername() + "@" +
                            CarbonContext.getThreadLocalCarbonContext().getTenantDomain();
                }
            
                private String generatePassword()
                {
                    //implement logic to generate password align with regex pattern
                    return RandomStringUtils.randomNumeric(12);
                }
        
            }
        ```
    
    b.  Implement this logic within the `generatePassword()` method. 
      
    c.  Build the OSGI bundle of the custom handler and place the .jar file in the `<IS_HOME>/repository/components/dropins` directory.

    d.  Restart WSO2 Identity Server.

----

## Validate password history

Recording user password history can provide better security for user accounts. Through the WSO2 Identity Server, you can keep a history of the user's past passwords according to a preconfigured count. This enables you to prevent users from using passwords they have used in the recent past. For example, if you configure a count of 5 passwords, users will be prevented from reusing their last 5 passwords as the current password. Follow the steps below to configure the count.

1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`).
2.  Click **Resident** under **Identity Providers** in the **Main**.
3.  Expand the **Password Policies** tab.
4.  Expand the **Password History** tab and select **Validate password history**. Specify the **Password History Validation Count** and click **Update**.

    !!! note
    
        To configure this separately for different tenants in a multi-tenant environment, first login with Tenant A credentials and configure the password policy. Next, logout and login again with Tenant B credentials to configure a different policy for Tenant B.
      
    ![password-history-validation]({{base_path}}/assets/img/guides/password-history-validation.png) 

----

## Configure password expiry

WSO2 Identity Server supports configuring a password expiry policy to prompt users to change their password after a defined time period. This is supported via a connector. For more information and instructions on how to set this up, see [Connector Documentation: Configuring Password Policy](https://github.com/wso2-extensions/identity-outbound-auth-passwordPolicy/blob/master/docs/config.md). 

----

!!! info "Related topics"
    - [Guide: Configure Claims]({{base_path}}/guides/dialects/configure-claims)
    <!---   To test a global password policy that applies to all tenants, you can write a custom password policy using the configuration file instead of through the management console. For more information, see [Writing a Custom Password Validator]({{base_path}}/develop/extend/user-mgt/write-a-custom-password-validator).-->



