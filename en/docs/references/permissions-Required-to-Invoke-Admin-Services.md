# Permissions Required to Invoke Admin Services

The following table lists out the various operations that can be
performed with different permission levels.

Permission level

Service

Operations

**Tenant level permissions**

/admin

UserStoreConfigAdminService

-   addUserStore
-   changeUserStoreState
-   deleteUserStore
-   deleteUserStoresSet
-   editUserStore
-   editUserStoreWithDomainName
-   getAvailableUserStoreClasses
-   getSecondaryRealmConfigurations
-   getUserStoreManagerProperties

/admin/configure/security

RemoteAuthorizationManagerService

-   authorizeRole
-   authorizeUser
-   clearAllRoleAuthorization
-   clearAllUserAuthorization
-   clearResourceAuthorizations
-   clearRoleActionOnAllResources
-   clearRoleAuthorization
-   clearUserAuthorization
-   denyRole
-   denyUser
-   getAllowedRolesForResource
-   getAllowedUIResourcesForUser
-   getDeniedRolesForResource
-   getExplicitlyAllowedUsersForResource
-   getExplicitlyDeniedUsersForResource
-   isRoleAuthorized
-   isUserAuthorized
-   resetPermissionOnUpdateRole

RemoteClaimManagerService

-   addNewClaimMapping
-   deleteClaimMapping
-   getAllClaimMappings
-   getAllClaimUris
-   getAllRequiredClaimMappings
-   getAllSupportClaimMappingsByDefault
-   getAttributeName
-   getAttributeNameFromDomain
-   getClaim
-   getClaimMapping
-   updateClaimMapping

RemoteProfileConfigurationManagerService

-   addProfileConfig
-   deleteProfileConfig
-   getAllProfiles
-   getProfileConfig
-   updateProfileConfig

RemoteUserStoreManagerService

-   addRole
-   addUser
-   addUserClaimValue
-   addUserClaimValues
-   authenticate
-   deleteRole
-   deleteUser
-   deleteUserClaimValue
-   deleteUserClaimValues
-   getAllProfileNames
-   getHybridRoles
-   getPasswordExpirationTime
-   getProfileNames
-   getProperties
-   getRoleListOfUser
-   getRoleNames
-   getTenantId
-   getTenantIdofUser
-   getUserClaimValue
-   getUserClaimValues
-   getUserClaimValuesForClaims
-   getUserId
-   getUserList
-   getUserListOfRole
-   isExistingRole
-   isExistingUser
-   isReadOnly
-   listUsers
-   setUserClaimValue
-   setUserClaimValues
-   updateCredential
-   updateCredentialByAdmin
-   updateRoleListOfUser
-   updateRoleName
-   updateUserListOfRole

SCIMConfigAdminService

-   addGlobalProvider
-   deleteGlobalProvider
-   getAllGlobalProviders
-   getGlobalProvider
-   updateGlobalProvider

UserAdmin

-   addInternalRole
-   addRemoveRolesOfUser
-   addRemoveUsersOfRole
-   addRole
-   bulkImportUsers
-   deleteRole
-   getAllSharedRoleNames
-   getAllUIPermissions
-   getRolePermissions
-   getRolesOfUser
-   isSharedRolesEnabled
-   listUserByClaim
-   setRoleUIPermission
-   updateRoleName
-   updateRolesOfUser
-   updateUsersOfRole

/admin/configure/security/rolemgt

UserAdmin

-   getUsersOfRole

/admin/configure/security/usermgt

MultipleCredentialsUserAdmin

-   addUserWithUserId
-   authenticate
-   deleteUserClaimValue
-   deleteUserClaimValues
-   getUserClaimValue
-   getUserClaimValues
-   getUserId
-   setUserClaimValue
-   setUserClaimValues

/admin/configure/security/usermgt/passwords

MultipleCredentialsUserAdmin

-   addCredential
-   deleteCredential
-   getCredentials
-   updateCredential

UserAdmin

-   changePassword

/admin/configure/security/usermgt/provisioning

SCIMConfigAdminService

-   addUserProvider
-   deleteUserProvider
-   getAllUserProviders
-   getUserProvider
-   updateUserProvider

/admin/configure/security/usermgt/users

MultipleCredentialsUserAdmin

-   addUser
-   addUsers
-   deleteUser

UserAdmin

-   addUser
-   deleteUser

/admin/login

AccountCredentialMgtConfigService

-   getEmailConfig
-   saveEmailConfig

EntitlementService

-   getAllEntitlements
-   getBooleanDecision
-   getDecision
-   getDecisionByAttributes
-   getEntitledAttributes
-   XACMLAuthzDecisionQuery

IdentityProviderAdminService

-   addOpenID
-   extractPrimaryUserName
-   getAllOpenIDs
-   getPrimaryOpenID
-   removeOpenID
-   getAllIdPs

IWAAuthenticator

-   canHandle
-   login

LoggedUserInfoAdmin

-   getUserInfo

MultipleCredentialsUserAdmin

-   getAllUserClaimValues

OAuthAdminService

-   getAppsAuthorizedByUser
-   revokeAuthzForAppsByResoureOwner

UserAdmin

-   changePasswordByUser
-   getRolesOfCurrentUser
-   getUserRealmInfo
-   hasMultipleUserStores

UserInformationRecoveryService

-   confirmUserSelfRegistration
-   getAllChallengeQuestions
-   getCaptcha
-   getUserChallengeQuestion
-   getUserChallengeQuestionIds
-   getUserIdentitySupportedClaims
-   registerUser
-   sendRecoveryNotification
-   updatePassword
-   verifyAccount
-   verifyConfirmationCode
-   verifyUser
-   verifyUserChallengeAnswer

XMPPConfigurationService

-   addUserXmppSettings
-   editXmppSettings
-   getUserIM
-   getXmppSettings
-   hasXMPPSettings
-   isXMPPSettingsEnabled

/admin/manage

ClaimManagementService

-   addNewClaimDialect
-   addNewClaimMapping
-   getClaimMappingByDialect
-   getClaimMappings
-   removeClaimDialect
-   removeClaimMapping
-   updateClaimMapping

EntitlementAdminService

-   clearAllAttributeCaches
-   clearAllResourceCaches
-   clearAttributeFinderCache
-   clearAttributeFinderCacheByAt tributes
-   clearCarbonAttributeCache
-   clearCarbonResourceCache
-   clearDecisionCache
-   clearPolicyCache
-   clearResourceFinderCache
-   doTestRequest
-   doTestRequestForGivenPolicies
-   getGlobalPolicyAlgorithm
-   getPDPData
-   getPIPAttributeFinderData
-   getPIPResourceFinderData
-   getPolicyFinderData
-   refreshAttributeFinder
-   refreshPolicyFinders
-   refreshResourceFinder
-   setGlobalPolicyAlgorithm

EntitlementPolicyAdminService

-   addPolicies
-   addPolicy
-   addSubscriber
-   deleteSubscriber
-   dePromotePolicy
-   enableDisablePolicy
-   getAllPolicies
-   getAllPolicyIds
-   getEntitlementData
-   getEntitlementDataModules
-   getLightPolicy
-   getPolicy
-   getPolicyByVersion
-   getPolicyVersions
-   getPublisherModuleData
-   getStatusData
-   getSubscriber
-   getSubscriberIds
-   importPolicyFromRegistry
-   orderPolicy
-   publish
-   publishPolicies
-   publishToPDP
-   removePolicies
-   removePolicy
-   rollBackPolicy
-   updatePolicy
-   updateSubscriber

IdentityApplicationManagementService

-   createApplication
-   deleteApplication
-   getAllApplicationBasicInfo
-   getAllIdentityProviders
-   getAllLocalAuthenticators
-   getAllLocalClaimUris
-   getAllRequestPathAuthenticators
-   getApplication
-   getIdentityProvider
-   updateApplication

IdentityProviderMgtService

-   addIdP
-   deleteIdP
-   getAllFederatedAuthenticators
-   getAllLocalClaimUris
-   getAllProvisioningConnectors
-   getEnabledAllIdPs
-   getIdPByName
-   getResidentIdP
-   updateIdP
-   updateResidentIdP

IdentitySAMLSSOConfigService

-   addRPServiceProvider
-   getCertAliasOfPrimaryKeyStore
-   getClaimURIs
-   getServiceProviders
-   removeServiceProvider

IdentitySTSAdminService

-   readCardIssuerConfiguration
-   updateCardIssueConfiguration

KeyStoreAdminService

-   addKeyStore
-   addTrustStore
-   deleteStore
-   getKeyStores
-   getKeystoreInfo
-   getPaginatedKeystoreInfo
-   getStoreEntries
-   importCertToStore
-   removeCertFromStore

STSAdminService

-   addTrustedService
-   getCertAliasOfPrimaryKeyStore
-   getProofKeyType
-   getTrustedServices
-   removeTrustedService
-   setProofKeyType

OAuth2TokenValidationService

-   findOAuthConsumerIfTokenIsValid
-   validate
-   buildIntrospectionResponse

OAuthAdminService

-   getAllOAuthApplicationData
-   getAllowedGrantTypes
-   getOAuthApplicationData
-   getOAuthApplicationDataByAppName
-   registerOAuthApplicationData
-   registerOAuthConsumer
-   removeOAuthApplicationData
-   updateConsumerApplication

UserIdentityManagementAdminService

-   changeUserPassword
-   deleteUser
-   getAllChallengeQuestions
-   getAllPromotedUserChallenge
-   getAllUserIdentityClaims
-   getChallengeQuestionsOfUser
-   isReadOnlyUserStore
-   lockUserAccount
-   resetUserPassword
-   setChallengeQuestions
-   setChallengeQuestionsOfUser
-   unlockUserAccount
-   updateUserIdentityClaims
-   disableUserAccount
-   enableUserAccount

UserProfileMgtService

-   associateID
-   deleteUserProfile
-   getAssociatedIDs
-   getInstance
-   getNameAssociatedWith
-   getProfileFieldsForInternalStore
-   getUserProfile
-   getUserProfiles
-   isAddProfileEnabled
-   isAddProfileEnabledForDomain
-   isReadOnlyUserStore
-   removeAssociateID
-   setUserProfile

ws­xacml

-   XACMLAuthzDecisionQuery

/admin/manage/modify/service

ProfilesAdminService

-   getUserProfile
-   putUserProfile

**Super tenant level permissions**

/protected/configure/components

ProvisioningAdminService

-   getAllInstalledFeatures
-   getInstalledFeatureInfo
-   getInstalledFeaturesWithProperty
-   getLicensingInformation
-   getProfileHistory
-   performProvisioningAction
-   removeAllConsoleFeatures
-   removeAllServerFeatures
-   reviewProvisioningAction

/protected/manage/modify/tenants

TenantMgtAdminService

-   activateTenant
-   deactivateTenant
-   deleteTenant
-   updateTenant

/protected/manage/monitor/tenants

TenantMgtAdminService

-   addSkeletonTenant
-   addTenant
-   getTenant
-   retrievePaginatedPartialSearchTenants
-   retrievePaginatedTenants
-   retrievePartialSearchTenants
-   retrieveTenants

/protected/tenant­admin

RemoteTenantManagerService

-   activateTenant
-   addTenant
-   deactivateTenant
-   deleteTenant
-   getAllTenants
-   getDomain
-   getSuperTenantDomain
-   getTenant
-   getTenantId
-   isTenantActive
-   updateTenant

RemoteUserRealmService

-   getRealmConfiguration

**Special cases: These operations require multiple permission levels**

/admin/configure/security

/admin/manage/modify/service

DirectoryServerManager

-   addServer
-   changePassword
-   getPasswordConformanceRegularExpression
-   getServiceNameConformanceRegularExpression
-   isExistingServicePrinciple
-   isKDCEnabled
-   listServicePrinciples
-   removeServer

KeyStoreAdminService

-   getKeyStores

/admin/configure/security/rolemgt

/admin/manage/modify/service

UserAdmin

-   getAllRolesNames

/admin/configure/security/usermgt/users

/admin/configure/security/usermgt/passwords

/admin/configure/security/usermgt/profiles

UserAdmin

-   listAllUsers
-   listUsers
