# Permissions Required to Invoke Admin Services

!!! warning
    Admin services are deprecated from IS 6.0.0 onwards. You can use REST-based APIs.

The following table lists the various operations that can be performed with different permission levels.

## Tenant level permissions

<table>
<tbody>
<tr style="height: 23px;">
<th style="height: 23px;">Permission Level</th>
<th style="height: 23px;">Service</th>
<th style="height: 23px;">Operations</th>
</tr>
<tr style="height: 193px;">
<td style="height: 193px;">/admin</td>
<td style="height: 193px;">UserStoreConfigAdminService</td>
<td style="height: 193px;">
<ul>
<li>addUserStore</li>
<li>changeUserStoreState</li>
<li>deleteUserStore</li>
<li>deleteUserStoresSet</li>
<li>editUserStore</li>
<li>editUserStoreWithDomainName</li>
<li>getAvailableUserStoreClasses</li>
<li>getSecondaryRealmConfigurations</li>
<li>getUserStoreManagerProperties</li>
</ul>
</td>
</tr>
<tr style="height: 373px;">
<td style="height: 488px;" rowspan="6">/admin/manage/identity</td>
<td style="height: 373px;">RemoteAuthorizationManagerService</td>
<td style="height: 373px;">
<ul>
<li>authorizeRole</li>
<li>authorizeUser</li>
<li>clearAllRoleAuthorization</li>
<li>clearAllUserAuthorization</li>
<li>clearResourceAuthorizations</li>
<li>clearRoleActionOnAllResources</li>
<li>clearRoleAuthorization</li>
<li>clearUserAuthorization</li>
<li>denyRole</li>
<li>denyUser</li>
<li>getAllowedRolesForResource</li>
<li>getAllowedUIResourcesForUser</li>
<li>getDeniedRolesForResource</li>
<li>getExplicitlyAllowedUsersForResource</li>
<li>getExplicitlyDeniedUsersForResource</li>
<li>isRoleAuthorized</li>
<li>isUserAuthorized</li>
<li>resetPermissionOnUpdateRole</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">RemoteClaimManagerService</td>
<td style="height: 23px;">
<ul>
<li>addNewClaimMapping</li>
<li>deleteClaimMapping</li>
<li>getAllClaimMappings</li>
<li>getAllClaimUris</li>
<li>getAllRequiredClaimMappings</li>
<li>getAllSupportClaimMappingsByDefault</li>
<li>getAttributeName</li>
<li>getAttributeNameFromDomain</li>
<li>getClaim</li>
<li>getClaimMapping</li>
<li>updateClaimMapping</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">RemoteProfileConfigurationManagerService</td>
<td style="height: 23px;">
<ul>
<li>addProfileConfig</li>
<li>deleteProfileConfig</li>
<li>getAllProfiles</li>
<li>getProfileConfig</li>
<li>updateProfileConfig</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">RemoteUserStoreManagerService</td>
<td style="height: 23px;">
<ul>
<li>addRole</li>
<li>addUser</li>
<li>addUserClaimValue</li>
<li>addUserClaimValues</li>
<li>authenticate</li>
<li>deleteRole</li>
<li>deleteUser</li>
<li>deleteUserClaimValue</li>
<li>deleteUserClaimValues</li>
<li>getAllProfileNames</li>
<li>getHybridRoles</li>
<li>getPasswordExpirationTime</li>
<li>getProfileNames</li>
<li>getProperties</li>
<li>getRoleListOfUser</li>
<li>getRoleNames</li>
<li>getTenantId</li>
<li>getTenantIdofUser</li>
<li>getUserClaimValue</li>
<li>getUserClaimValues</li>
<li>getUserClaimValuesForClaims</li>
<li>getUserId</li>
<li>getUserList</li>
<li>getUserListOfRole</li>
<li>isExistingRole</li>
<li>isExistingUser</li>
<li>isReadOnly</li>
<li>listUsers</li>
<li>setUserClaimValue</li>
<li>setUserClaimValues</li>
<li>updateCredential</li>
<li>updateCredentialByAdmin</li>
<li>updateRoleListOfUser</li>
<li>updateRoleName</li>
<li>updateUserListOfRole</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">SCIMConfigAdminService</td>
<td style="height: 23px;">
<ul>
<li>addGlobalProvider</li>
<li>deleteGlobalProvider</li>
<li>getAllGlobalProviders</li>
<li>getGlobalProvider</li>
<li>updateGlobalProvider</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserAdmin</td>
<td style="height: 23px;">
<ul>
<li>addInternalRole</li>
<li>addRemoveRolesOfUser</li>
<li>addRemoveUsersOfRole</li>
<li>addRole</li>
<li>bulkImportUsers</li>
<li>deleteRole</li>
<li>getAllSharedRoleNames</li>
<li>getAllUIPermissions</li>
<li>getRolePermissions</li>
<li>getRolesOfUser</li>
<li>isSharedRolesEnabled</li>
<li>listUserByClaim</li>
<li>setRoleUIPermission</li>
<li>updateRoleName</li>
<li>updateRolesOfUser</li>
<li>updateUsersOfRole</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">/admin/configure/ security/rolemgt</td>
<td style="height: 23px;">UserAdmin</td>
<td style="height: 23px;">
<ul>
<li>getUsersOfRole</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">/admin/configure/ security/usermgt</td>
<td style="height: 23px;">MultipleCredentialsUserAdmin</td>
<td style="height: 23px;">
<ul>
<li>addUserWithUserId</li>
<li>authenticate</li>
<li>deleteUserClaimValue</li>
<li>deleteUserClaimValues</li>
<li>getUserClaimValue</li>
<li>getUserClaimValues</li>
<li>getUserId</li>
<li>setUserClaimValue</li>
<li>setUserClaimValues</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 46px;" rowspan="2">/admin/configure/security/ usermgt/passwords</td>
<td style="height: 23px;">MultipleCredentialsUserAdmin</td>
<td style="height: 23px;">
<ul>
<li>addCredential</li>
<li>deleteCredential</li>
<li>getCredentials</li>
<li>updateCredential</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserAdmin</td>
<td style="height: 23px;">
<ul>
<li>changePassword</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">/admin/configure/security/ usermgt/provisioning</td>
<td style="height: 23px;">SCIMConfigAdminService</td>
<td style="height: 23px;">
<ul>
<li>addUserProvider</li>
<li>deleteUserProvider</li>
<li>getAllUserProviders</li>
<li>getUserProvider</li>
<li>updateUserProvider</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 46px;" rowspan="2">/admin/configure/security/ usermgt/users</td>
<td style="height: 23px;">MultipleCredentialsUserAdmin</td>
<td style="height: 23px;">
<ul>
<li>addUser</li>
<li>addUsers</li>
<li>deleteUser</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserAdmin</td>
<td style="height: 23px;">
<ul>
<li>addUser</li>
<li>deleteUser</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 230px;" rowspan="10">/admin/login</td>
<td style="height: 23px;">AccountCredentialMgtConfigService</td>
<td style="height: 23px;">
<ul>
<li>getEmailConfig</li>
<li>saveEmailConfig</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">EntitlementService</td>
<td style="height: 23px;">
<ul>
<li>getAllEntitlements</li>
<li>getBooleanDecision</li>
<li>getDecision</li>
<li>getDecisionByAttributes</li>
<li>getEntitledAttributes</li>
<li>XACMLAuthzDecisionQuery</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IdentityProviderAdminService</td>
<td style="height: 23px;">
<ul>
<li>addOpenID</li>
<li>extractPrimaryUserName</li>
<li>getAllOpenIDs</li>
<li>getPrimaryOpenID</li>
<li>removeOpenID</li>
<li>getAllIdPs</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IWAAuthenticator</td>
<td style="height: 23px;">
<ul>
<li>canHandle</li>
<li>login</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">LoggedUserInfoAdmin</td>
<td style="height: 23px;">
<ul>
<li>getUserInfo</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">MultipleCredentialsUserAdmin</td>
<td style="height: 23px;">
<ul>
<li>getAllUserClaimValues</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">OAuthAdminService</td>
<td style="height: 23px;">
<ul>
<li>getAppsAuthorizedByUser</li>
<li>revokeAuthzForAppsByResoureOwner</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserAdmin</td>
<td style="height: 23px;">
<ul>
<li>changePasswordByUser</li>
<li>getRolesOfCurrentUser</li>
<li>getUserRealmInfo</li>
<li>hasMultipleUserStores</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserInformationRecoveryService</td>
<td style="height: 23px;">
<ul>
<li>confirmUserSelfRegistration</li>
<li>getAllChallengeQuestions</li>
<li>getCaptcha</li>
<li>getUserChallengeQuestion</li>
<li>getUserChallengeQuestionIds</li>
<li>getUserIdentitySupportedClaims</li>
<li>registerUser</li>
<li>sendRecoveryNotification</li>
<li>updatePassword</li>
<li>verifyAccount</li>
<li>verifyConfirmationCode</li>
<li>verifyUser</li>
<li>verifyUserChallengeAnswer</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">XMPPConfigurationService</td>
<td style="height: 23px;">
<ul>
<li>addUserXmppSettings</li>
<li>editXmppSettings</li>
<li>getUserIM</li>
<li>getXmppSettings</li>
<li>hasXMPPSettings</li>
<li>isXMPPSettingsEnabled</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 598px;" rowspan="14">/admin/manage</td>
<td style="height: 23px;">ClaimManagementService</td>
<td style="height: 23px;">
<ul>
<li>addNewClaimDialect</li>
<li>addNewClaimMapping</li>
<li>getClaimMappingByDialect</li>
<li>getClaimMappings</li>
<li>removeClaimDialect</li>
<li>removeClaimMapping</li>
<li>updateClaimMapping</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">EntitlementAdminService</td>
<td style="height: 23px;">
<ul>
<li>clearAllAttributeCaches</li>
<li>clearAllResourceCaches</li>
<li>clearAttributeFinderCache</li>
<li>clearAttributeFinderCacheByAt tributes</li>
<li>clearCarbonAttributeCache</li>
<li>clearCarbonResourceCache</li>
<li>clearDecisionCache</li>
<li>clearPolicyCache</li>
<li>clearResourceFinderCache</li>
<li>doTestRequest</li>
<li>doTestRequestForGivenPolicies</li>
<li>getGlobalPolicyAlgorithm</li>
<li>getPDPData</li>
<li>getPIPAttributeFinderData</li>
<li>getPIPResourceFinderData</li>
<li>getPolicyFinderData</li>
<li>refreshAttributeFinder</li>
<li>refreshPolicyFinders</li>
<li>refreshResourceFinder</li>
<li>setGlobalPolicyAlgorithm</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">EntitlementPolicyAdminService</td>
<td style="height: 23px;">
<ul>
<li>addPolicies</li>
<li>addPolicy</li>
<li>addSubscriber</li>
<li>deleteSubscriber</li>
<li>dePromotePolicy</li>
<li>enableDisablePolicy</li>
<li>getAllPolicies</li>
<li>getAllPolicyIds</li>
<li>getEntitlementData</li>
<li>getEntitlementDataModules</li>
<li>getLightPolicy</li>
<li>getPolicy</li>
<li>getPolicyByVersion</li>
<li>getPolicyVersions</li>
<li>getPublisherModuleData</li>
<li>getStatusData</li>
<li>getSubscriber</li>
<li>getSubscriberIds</li>
<li>importPolicyFromRegistry</li>
<li>orderPolicy</li>
<li>publish</li>
<li>publishPolicies</li>
<li>publishToPDP</li>
<li>removePolicies</li>
<li>removePolicy</li>
<li>rollBackPolicy</li>
<li>updatePolicy</li>
<li>updateSubscriber</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IdentityApplicationManagementService</td>
<td style="height: 23px;">
<ul>
<li>createApplication</li>
<li>deleteApplication</li>
<li>getAllApplicationBasicInfo</li>
<li>getAllIdentityProviders</li>
<li>getAllLocalAuthenticators</li>
<li>getAllLocalClaimUris</li>
<li>getAllRequestPathAuthenticators</li>
<li>getApplication</li>
<li>getIdentityProvider</li>
<li>updateApplication</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IdentityProviderMgtService</td>
<td style="height: 23px;">
<ul>
<li>addIdP</li>
<li>deleteIdP</li>
<li>getAllFederatedAuthenticators</li>
<li>getAllLocalClaimUris</li>
<li>getAllProvisioningConnectors</li>
<li>getEnabledAllIdPs</li>
<li>getIdPByName</li>
<li>getResidentIdP</li>
<li>updateIdP</li>
<li>updateResidentIdP</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IdentitySAMLSSOConfigService</td>
<td style="height: 23px;">
<ul>
<li>addRPServiceProvider</li>
<li>getCertAliasOfPrimaryKeyStore</li>
<li>getClaimURIs</li>
<li>getServiceProviders</li>
<li>removeServiceProvider</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">IdentitySTSAdminService</td>
<td style="height: 23px;">
<ul>
<li>readCardIssuerConfiguration</li>
<li>updateCardIssueConfiguration</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">KeyStoreAdminService</td>
<td style="height: 23px;">
<ul>
<li>addKeyStore</li>
<li>addTrustStore</li>
<li>deleteStore</li>
<li>getKeyStores</li>
<li>getKeystoreInfo</li>
<li>getPaginatedKeystoreInfo</li>
<li>getStoreEntries</li>
<li>importCertToStore</li>
<li>removeCertFromStore</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">STSAdminService</td>
<td style="height: 23px;">
<ul>
<li>addTrustedService</li>
<li>getCertAliasOfPrimaryKeyStore</li>
<li>getProofKeyType</li>
<li>getTrustedServices</li>
<li>removeTrustedService</li>
<li>setProofKeyType</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">OAuth2TokenValidationService</td>
<td style="height: 23px;">
<ul>
<li>findOAuthConsumerIfTokenIsValid</li>
<li>validate</li>
<li>buildIntrospectionResponse</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">OAuthAdminService</td>
<td style="height: 23px;">
<ul>
<li>getAllOAuthApplicationData</li>
<li>getAllowedGrantTypes</li>
<li>getOAuthApplicationData</li>
<li>getOAuthApplicationDataByAppName</li>
<li>registerOAuthApplicationData</li>
<li>registerOAuthConsumer</li>
<li>removeOAuthApplicationData</li>
<li>updateConsumerApplication</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">UserIdentityManagementAdminService</td>
<td style="height: 23px;">
<ul>
<li>changeUserPassword</li>
<li>deleteUser</li>
<li>getAllChallengeQuestions</li>
<li>getAllPromotedUserChallenge</li>
<li>getAllUserIdentityClaims</li>
<li>getChallengeQuestionsOfUser</li>
<li>isReadOnlyUserStore</li>
<li>lockUserAccount</li>
<li>resetUserPassword</li>
<li>setChallengeQuestions</li>
<li>setChallengeQuestionsOfUser</li>
<li>unlockUserAccount</li>
<li>updateUserIdentityClaims</li>
<li>disableUserAccount</li>
<li>enableUserAccount</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 299px;">UserProfileMgtService</td>
<td style="height: 23px;">
<ul>
<li>associateID</li>
<li>deleteUserProfile</li>
<li>getAssociatedIDs</li>
<li>getInstance</li>
<li>getNameAssociatedWith</li>
<li>getProfileFieldsForInternalStore</li>
<li>getUserProfile</li>
<li>getUserProfiles</li>
<li>isAddProfileEnabled</li>
<li>isAddProfileEnabledForDomain</li>
<li>isReadOnlyUserStore</li>
<li>removeAssociateID</li>
<li>setUserProfile</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">ws&shy;xacml</td>
<td style="height: 23px;">
<ul>
<li>XACMLAuthzDecisionQuery</li>
</ul>
</td>
</tr>
<tr style="height: 23px;">
<td style="height: 23px;">/admin/manage/ modify/service</td>
<td style="height: 23px;">ProfilesAdminService</td>
<td style="height: 23px;">
<ul>
<li>getUserProfile</li>
<li>putUserProfile</li>
</ul>
</td>
</tr>
</tbody>
</table>

---

## Super tenant level permissions

<table>
<tbody>
<tr style="height: 23px;">
<th style="height: 23px;">Permission Level</th>
<th style="height: 23px;">Service</th>
<th style="height: 23px;">Operations</th>
</tr>
<tr style="height: 193px;">
<td style="height: 193px;">/protected/configure/components</td>
<td style="height: 193px;">ProvisioningAdminService</td>
<td style="height: 193px;">
<ul>
<li>getAllInstalledFeatures</li>
<li>getInstalledFeatureInfo</li>
<li>getInstalledFeaturesWithProperty</li>
<li>getLicensingInformation</li>
<li>getProfileHistory</li>
<li>performProvisioningAction</li>
<li>removeAllConsoleFeatures</li>
<li>removeAllServerFeatures</li>
<li>reviewProvisioningAction</li>
</ul>
</td>
</tr>
<tr style="height: 95px;">
<td style="height: 95px;">/protected/manage/modify/tenants&nbsp;</td>
<td style="height: 95px;">&nbsp;TenantMgtAdminService</td>
<td style="height: 95px;">
<ul>
<li>activateTenant</li>
<li>deactivateTenant</li>
<li>deleteTenant</li>
<li>updateTenant</li>
</ul>
</td>
</tr>
<tr style="height: 47px;">
<td style="height: 47px;">/protected/manage/monitor/tenants&nbsp;&nbsp;</td>
<td style="height: 47px;">TenantMgtAdminService&nbsp;</td>
<td style="height: 47px;"><br />
<ul>
<li>addSkeletonTenant</li>
<li>addTenant</li>
<li>getTenant</li>
<li>retrievePaginatedPartialSearchTenants</li>
<li>retrievePaginatedTenants</li>
<li>retrievePartialSearchTenants</li>
<li>retrieveTenants</li>
</ul>
</td>
</tr>
<tr style="height: 47px;">
<td style="height: 47px;" rowspan="2">/protected/tenant&shy;admin&nbsp;</td>
<td style="height: 47px;">&nbsp;RemoteTenantManagerService</td>
<td style="height: 47px;"><br />
<ul>
<li>activateTenant</li>
<li>addTenant</li>
<li>deactivateTenant</li>
<li>deleteTenant</li>
<li>getAllTenants</li>
<li>getDomain</li>
<li>getSuperTenantDomain</li>
<li>getTenant</li>
<li>getTenantId</li>
<li>isTenantActive</li>
<li>updateTenant</li>
</ul>
</td>
</tr>
<tr style="height: 47px;">
<td style="height: 47px;">&nbsp;RemoteUserRealmService</td>
<td style="height: 47px;">&nbsp;
<ul>
<li>getRealmConfiguration</li>
</ul>
</td>
</tr>
</tbody>
</table>

---

## Special cases

The following operations are special cases that require multiple permission levels to perform the operation.

<table>
<tbody>
<tr style="height: 23px;">
<th style="height: 23px;">Permission Level</th>
<th style="height: 23px;">Service</th>
<th style="height: 23px;">Operations</th>
</tr>
<tr style="height: 193px;">
<td style="height: 288px;" rowspan="2">/admin/configure/security<br />/admin/manage/modify/service</td>
<td style="height: 193px;">DirectoryServerManager</td>
<td style="height: 193px;">
<ul>
<li>addServer</li>
<li>changePassword</li>
<li>getPasswordConformanceRegularExpression</li>
<li>getServiceNameConformanceRegularExpression</li>
<li>isExistingServicePrinciple</li>
<li>isKDCEnabled</li>
<li>listServicePrinciples</li>
<li>removeServer</li>
</ul>
</td>
</tr>
<tr style="height: 95px;">
<td style="height: 95px;">KeyStoreAdminService&nbsp;</td>
<td style="height: 95px;">
<ul>
<li>getKeyStores</li>
</ul>
</td>
</tr>
<tr style="height: 47px;">
<td style="height: 47px;">
<p>/admin/configure/security/rolemgt</p>
<p>/admin/manage/modify/service&nbsp;</p>
</td>
<td style="height: 47px;">UserAdmin</td>
<td style="height: 47px;">
<ul>
<li>getAllRolesNames</li>
</ul>
</td>
</tr>
<tr style="height: 32px;">
<td style="height: 32px;">
<p>/admin/configure/security/usermgt/users</p>
<p>/admin/configure/security/usermgt/passwords</p>
<p>/admin/configure/security/usermgt/profiles</p>
</td>
<td style="height: 32px;">UserAdmin</td>
<td style="height: 32px;">
<ul>
<li>listAllUsers</li>
<li>listUsers</li>
</ul>
</td>
</tr>
</tbody>
</table>