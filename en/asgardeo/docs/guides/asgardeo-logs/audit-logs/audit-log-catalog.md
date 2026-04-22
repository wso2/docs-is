# Audit log catalog

The audit log catalog provides detailed information about all audit log action keys used in Asgardeo. This guide helps you understand the structure and content of each audit log type along with sample audit logs for reference.

## Action management

??? note "`activate-action` - An action was activated."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "System",
      "targetType": "Action",
      "action": "activate-action",
      "data": {
        "ActionId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
        "ActionType": "preIssueAccessToken"
      }
    }
    ```

??? note "`add-action` - A new action was added."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "System",
      "targetType": "Action",
      "action": "add-action",
      "data": {
        "ActionName": "Pre update password action",
        "ActionId": "e5f6a7b8-c9d0-1234-efab-234567890123",
        "ActionType": "PRE_UPDATE_PASSWORD",
        "EndpointConfiguration": {
          "AuthenticationScheme": "NONE",
          "EndpointUri": "https://example.com/webhook"
        },
        "Properties": {
          "passwordSharingFormat": "a*********************a",
          "attributes": "a*********************a"
        },
        "ActionStatus": "INACTIVE"
      }
    }
    ```

??? note "`deactivate-action` - An action was deactivated."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "System",
      "targetType": "Action",
      "action": "deactivate-action",
      "data": {
        "ActionId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "ActionType": "preIssueAccessToken"
      }
    }
    ```

??? note "`delete-action` - An action was deleted."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "System",
      "targetType": "Action",
      "action": "delete-action",
      "data": {
        "ActionId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "ActionType": "preIssueAccessToken"
      }
    }
    ```

??? note "`update-action` - An action was updated."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "System",
      "targetType": "Action",
      "action": "update-action",
      "data": {
        "ActionId": "d4e5f6a7-b8c9-0123-defa-123456789012",
        "ActionType": "PRE_UPDATE_PASSWORD",
        "Properties": {
          "certificate": "a*********************a"
        },
        "ActionStatus": "INACTIVE"
      }
    }
    ```

## Application management

??? note "`create-application` - A new application was created."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Application",
      "action": "create-application",
      "data": {
        "spProperties": [
          {
            "displayName": "Is API Based Authentication Enabled",
            "name": "isAPIBasedAuthenticationEnabled",
            "value": "false"
          },
          {
            "displayName": "Is Management Application",
            "name": "isManagementApp",
            "value": "false"
          },
          "..."
        ],
        "inboundAuthenticationConfig": {
          "inboundAuthenticationRequestConfigs": [
            {
              "inboundAuthKey": "sampleOAuthConsumerKey00001a",
              "inboundAuthType": "oauth2",
              "config": {
                "scopeValidators": [],
                "idTokenExpiryTime": 3600.0,
                "bypassClientCredentials": true,
                "type": "oAuthAppDO",
                "refreshTokenExpiryTime": 86400.0,
                "subjectType": "public",
                "tokenRevocationWithIDPSessionTerminationEnabled": true,
                "fapiConformanceEnabled": false,
                "subjectTokenEnabled": false,
                "tlsClientCertificateBoundAccessTokens": false,
                "allowedOrigins": [
                  "https://localhost:3000"
                ],
                "callbackUrl": "https://localhost:3000",
                "pkceSupportPlain": false,
                "tokenBindingValidationEnabled": false,
                "id": 1000001.0,
                "state": "ACTIVE",
                "renewRefreshTokenEnabled": "true",
                "oauthConsumerSecret": "a*********************a",
                "applicationName": "My-Sample-Application",
                "userAccessTokenExpiryTime": 3600.0,
                "oauthVersion": "OAuth-2.0",
                "hybridFlowEnabled": false,
                "subjectTokenExpiryTime": 180.0,
                "grantTypes": "authorization_code refresh_token",
                "idTokenEncryptionEnabled": false,
                "accessTokenClaims": [],
                "applicationAccessTokenExpiryTime": 3600.0,
                "requirePushedAuthorizationRequests": false,
                "pkceMandatory": true,
                "requestObjectSignatureValidationEnabled": false,
                "tokenBindingType": "sso-session",
                "oauthConsumerKey": "sampleOAuthConsumerKey00001a",
                "tokenType": "Default"
              }
            }
          ]
        },
        "templateId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
        "applicationResourceId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "apibasedAuthenticationEnabled": false
      }
    }
    ```

??? note "`create-oauth-application` - A new OAuth application was created."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Application",
      "action": "create-oauth-application",
      "data": {
        "scopeValidators": [],
        "type": "oAuthAppDO",
        "backChannelLogoutUrl": "https://api.asgardeo.io/t/myorg/identity/oidc/slo",
        "subjectType": "public",
        "tlsClientCertificateBoundAccessTokens": false,
        "callbackUrl": "https://api.asgardeo.io/t/myorg/commonauth",
        "pkceSupportPlain": false,
        "id": 1000002.0
      }
    }
    ```

??? note "`delete-application` - An application was deleted."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Application",
      "action": "delete-application"
    }
    ```

??? note "`update-application` - An application was updated."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Application",
      "action": "update-application",
      "data": {
        "outboundProvisioningConfig": {
          "provisioningIdentityProviders": []
        },
        "jwksUri": "",
        "spProperties": [
          {
            "displayName": "Is API Based Authentication Enabled",
            "name": "isAPIBasedAuthenticationEnabled",
            "value": "false"
          },
          {
            "displayName": "Is Management Application",
            "name": "isManagementApp",
            "value": "false"
          },
          "..."
        ],
        "inboundAuthenticationConfig": {
          "inboundAuthenticationRequestConfigs": [
            {
              "inboundAuthKey": "sampleOAuthConsumerKey00001a",
              "inboundAuthType": "oauth2"
            }
          ]
        },
        "requestPathAuthenticatorConfigs": [],
        "templateId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
        "applicationResourceId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "permissionAndRoleConfig": {
          "permissions": [],
          "idpRoles": [],
          "roleMappings": []
        },
        "apibasedAuthenticationEnabled": false,
        "applicationID": 1000003.0,
        "applicationName": "My-Sample-Application",
        "applicationVersion": "v3.0.0",
        "owner": {
          "loggableMaskedUserId": "a*********************a",
          "userStoreDomain": "PRIMARY",
          "loggableUserId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "userName": "a***********************************a",
          "tenantDomain": "myorg"
        },
        "clientAttestationMetaData": {
          "androidPackageName": "",
          "appleAppId": "",
          "attestationEnabled": false
        },
        "associatedRolesConfig": {
          "roles": [],
          "allowedAudience": "application"
        },
        "managementApp": false,
        "tenantDomain": "myorg",
        "b2BSelfServiceApp": false,
        "applicationEnabled": true,
        "localAndOutBoundAuthenticationConfig": {
          "enableAuthorization": false,
          "useTenantDomainInLocalSubjectIdentifier": false,
          "subjectClaimUri": "http://wso2.org/claims/username",
          "skipLogoutConsent": true,
          "skipConsent": false,
          "alwaysSendBackAuthenticatedListOfIdPs": false,
          "authenticationSteps": [],
          "useUserstoreDomainInRoles": true,
          "useExternalConsentPage": false,
          "useUserstoreDomainInLocalSubjectIdentifier": false,
          "authenticationType": "default"
        },
        "discoverable": false,
        "templateVersion": "",
        "inboundProvisioningConfig": {
          "dumbMode": false,
          "provisioningEnabled": false
        },
        "claimConfig": {
          "localClaimDialect": true,
          "alwaysSendMappedLocalSubjectId": false,
          "mappedLocalSubjectMandatory": false,
          "claimMappings": [
            {
              "requested": true,
              "remoteClaim": {
                "claimUri": "http://wso2.org/claims/country",
                "claimId": 0.0
              },
              "localClaim": {
                "claimUri": "http://wso2.org/claims/country",
                "claimId": 0.0
              },
              "mandatory": true
            },
            {
              "requested": true,
              "remoteClaim": {
                "claimUri": "http://wso2.org/claims/displayName",
                "claimId": 0.0
              },
              "localClaim": {
                "claimUri": "http://wso2.org/claims/displayName",
                "claimId": 0.0
              },
              "mandatory": false
            }
          ],
          "idpClaims": [],
          "spClaimDialects": []
        },
        "saasApp": false
      }
    }
    ```

## Application sharing

??? note "`processing-share-application-with-all-orgs` - An application was shared with all organizations."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "targetType": "Application",
      "action": "processing-share-application-with-all-orgs",
      "data": {
        "parentAppId": "d4e5f6a7-b8c9-0123-defa-123456789012",
        "sharedTenantDomains": "[e5f6a7b8-c9d0-1234-efab-234567890123]"
      }
    }
    ```

??? note "`processing-share-application-with-selected-orgs` - An application was shared with selected organizations."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Application",
      "action": "processing-share-application-with-selected-orgs",
      "data": {
        "parentAppId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
        "sharedTenantDomains": "[d4e5f6a7-b8c9-0123-defa-123456789012]"
      }
    }
    ```

??? note "`processing-unshare-application-from-all-orgs` - An application was unshared from all organizations."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Application",
      "action": "processing-unshare-application-from-all-orgs",
      "data": {
        "parentAppId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "sharedTenantDomains": "[]"
      }
    }
    ```

??? note "`processing-unshare-application-from-selected-orgs` - An application was unshared from selected organizations."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "initiatorType": "User",
      "targetId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "targetType": "Application",
      "action": "processing-unshare-application-from-selected-orgs",
      "data": {
        "parentAppId": "e5f6a7b8-c9d0-1234-efab-234567890123",
        "sharedTenantDomains": "[b2c3d4e5-f6a7-8901-bcde-f12345678901]"
      }
    }
    ```

## Connections

??? note "`Add-IDP` - A new connection was added."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Add-IDP",
      "target": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "data": {
        "Changed-State": {
          "Name": "GoogleIDP",
          "Display Name": "Google",
          "Resource ID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
          "Description": "Login users with existing Google accounts."
        }
      },
      "result": "Success"
    }
    ```

??? note "`Delete-IDP` - A connection was deleted."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Delete-IDP",
      "target": "GoogleIDP",
      "data": {
        "Changed-State": null
      },
      "result": "Success"
    }
    ```

??? note "`Update-IDP` - A connection was updated."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Update-IDP",
      "target": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "data": {
        "Changed-State": {
          "Name": "GoogleIDP",
          "Resource ID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
          "Description": "Login users with existing Google accounts."
        }
      },
      "result": "Success"
    }
    ```

## Flow management

??? note "`update-flow-config-INVITED_USER_REGISTRATION` - The invited user registration flow configuration was updated."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "initiatorType": "User",
      "targetId": "INVITED_USER_REGISTRATION",
      "targetType": "Flow",
      "action": "update-flow-config-INVITED_USER_REGISTRATION"
    }
    ```

??? note "`update-flow-config-PASSWORD_RECOVERY` - The password recovery flow configuration was updated."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "PASSWORD_RECOVERY",
      "targetType": "Flow",
      "action": "update-flow-config-PASSWORD_RECOVERY"
    }
    ```

??? note "`update-flow-config-REGISTRATION` - The registration flow configuration was updated."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "REGISTRATION",
      "targetType": "Flow",
      "action": "update-flow-config-REGISTRATION"
    }
    ```

??? note "`update-flow-INVITED_USER_REGISTRATION` - The invited user registration flow was updated."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "initiatorType": "User",
      "targetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "targetType": "Flow",
      "action": "update-flow-INVITED_USER_REGISTRATION"
    }
    ```

??? note "`update-flow-PASSWORD_RECOVERY` - The password recovery flow was updated."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Flow",
      "action": "update-flow-PASSWORD_RECOVERY"
    }
    ```

??? note "`update-flow-REGISTRATION` - The registration flow was updated."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Flow",
      "action": "update-flow-REGISTRATION"
    }
    ```

## Organization management

??? note "`add-organization` - A new organization was added."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "initiatorType": "User",
      "targetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "targetType": "Organization",
      "action": "add-organization",
      "data": {
        "Status": "ACTIVE",
        "Type": "TENANT",
        "CreatedTime": "2025-08-20T06:40:00.000000Z",
        "ParentOrganizationId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "LastModifiedTime": "2025-08-20T06:40:00.000000Z",
        "Attributes": {
          "creator.id": "1**********************************1",
          "creator.email": "a**********************a",
          "creator.username": "a************************************a"
        },
        "Id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        "Creator": {
          "Email": "a**********************a",
          "Username": "a************************************a",
          "Id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e"
        },
        "Name": "myorg"
      }
    }
    ```

??? note "`delete-organization` - An organization was deleted."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "targetType": "Organization",
      "action": "delete-organization",
      "data": {
        "Id": "d4e5f6a7-b8c9-0123-defa-123456789012"
      }
    }
    ```

??? note "`update-organization` - An organization was updated."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "targetType": "Organization",
      "action": "update-organization",
      "data": {
        "Replaced": {
          "Name": "sample-sub-org-updated"
        },
        "Id": "b2c3d4e5-f6a7-8901-bcde-f12345678901"
      }
    }
    ```

## Role management

??? note "`add-role` - A new role was created."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "Role",
      "action": "add-role",
      "data": {
        "Permissions": [
          "internal_user_impersonate",
          "internal_org_user_impersonate"
        ],
        "RoleName": "Impersonator",
        "Audience": "application"
      }
    }
    ```

??? note "`delete-role` - A role was deleted."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "initiatorType": "User",
      "targetId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "targetType": "Role",
      "action": "delete-role"
    }
    ```

??? note "`get-users-of-role` - Users of a role were retrieved."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Role",
      "action": "get-users-of-role",
      "data": {}
    }
    ```

??? note "`update-groups-of-role` - Groups of a role were updated."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "targetType": "Role",
      "action": "update-groups-of-role",
      "data": {
        "AddedGroups": [
          "b2c3d4e5-f6a7-8901-bcde-f12345678901"
        ]
      }
    }
    ```

??? note "`update-permissions-of-role` - Permissions of a role were updated."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Role",
      "action": "update-permissions-of-role",
      "data": {
        "Audience": "application",
        "DeletedPermissions": [
          "test_api_perm_3"
        ]
      }
    }
    ```

??? note "`update-role-name` - A role name was updated."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "initiatorType": "User",
      "targetId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "targetType": "Role",
      "action": "update-role-name",
      "data": {
        "RoleName": "SampleRoleUpdated"
      }
    }
    ```

??? note "`update-users-of-role` - Users of a role were updated."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "targetType": "Role",
      "action": "update-users-of-role",
      "data": {
        "AddedUsers": [
          "e5f6a7b8-c9d0-1234-efab-234567890123"
        ]
      }
    }
    ```

??? note "`Update users list of role by id` - Users list of a role was updated by ID."

    ```json
    {
      "initiatorId": "a***************************a",
      "action": "Update users list of role by id",
      "target": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "data": {
        "Tenant Domain": "myorg"
      },
      "result": "Success"
    }
    ```

## Session management

??? note "`TerminateSession` - A user session was terminated."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "TerminateSession",
      "data": {
        "traceId": "20250820T123456Z-samplereqid",
        "sessionContextId": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
        "AuthenticatedUserTenantDomain": "myorg",
        "AuthenticatedUser": "a***************************a",
        "TerminatedTimestamp": 1755000000000
      }
    }
    ```

## System operations

??? note "`Kill-All-Agents-In-Tenant` - All agents in a tenant were terminated."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Kill-All-Agents-In-Tenant",
      "target": "RemoteConnectionMgtService",
      "data": {
        "TenantUUID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c"
      },
      "result": "Success"
    }
    ```

??? note "`Kill-All-Agents-In-User-Store` - All agents in a user store were terminated."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Kill-All-Agents-In-User-Store",
      "target": "HubServiceConnectionHandler",
      "data": {
        "UserStoreDomainId": "c2FtcGxlVXNlclN0b3Jl",
        "TenantUUID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c"
      },
      "result": "Success"
    }
    ```

??? note "`resource-creation-via-impersonation` - A resource was created via impersonation."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e@myorg",
      "action": "resource-creation-via-impersonation",
      "target": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c@myorg",
      "data": {
        "ResourcePath": "/t/myorg/o/api/server/v1/identity-governance/preferences",
        "clientId": "MY_ACCOUNT",
        "subject": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c@myorg",
        "scope": "internal_login internal_org_user_impersonate openid"
      }
    }
    ```

## Tenant management

??? note "`Add-Tenant` - A new tenant was added."

    ```json
    {
      "initiatorId": "a***************************a",
      "action": "Add-Tenant",
      "target": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "data": {
        "TenantDomain": "myorg",
        "TenantId": 12345,
        "TenantAdmin": "a***************************a"
      },
      "result": "Success"
    }
    ```

## Token management

??? note "`Generate-Access-Token-For-Remote-User-Store` - An access token was generated for a remote user store."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Generate-Access-Token-For-Remote-User-Store",
      "target": "RemoteTokenMgtService",
      "data": {
        "UserStoreDomainId": "c2FtcGxlVXNlclN0b3Jl",
        "TenantUUID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c"
      },
      "result": "Success"
    }
    ```

??? note "`issue-access-token` - An access token was issued."

    ```json
    {
      "logId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": {
        "seconds": 1755421321,
        "nanos": 635198000
      },
      "requestId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "resultStatus": "SUCCESS",
      "resultMessage": "Access token issued for the application.",
      "actionId": "issue-access-token",
      "componentId": "oauth-inbound-service",
      "input": {
        "client id": "SAMPLE_ASG_API_GRANT_CLIENT",
        "token expiry time (s)": 1800,
        "authorized scopes": "console:actions console:administrators console:apiResources ...",
        "user id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
      }
    }
    ```

??? note "`ISSUE-SYSTEM-TOKEN` - A system token was issued."

    ```json
    {
      "initiatorId": "SAMPLE_SYSTEM_APP_GRANT_CLIENT",
      "action": "ISSUE-SYSTEM-TOKEN",
      "target": "12345",
      "data": {
        "Token Exchanged Org Name": "myorg",
        "Issued Scopes": "internal_api_resource_create internal_application_mgt_create internal_application_mgt_view"
      }
    }
    ```

??? note "`PostTokenIssue` - A token was issued via the password grant."

    ```json
    {
      "initiatorId": "a***************************a",
      "action": "PostTokenIssue",
      "target": "PasswordGrantAuditLogger",
      "data": {
        "AuthenticatedUser": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
        "AuthenticatedUserStoreDomain": "DEFAULT",
        "AuthenticatedUserTenantDomain": "myorg",
        "ServiceProvider": "My App",
        "RequestType": "oidc",
        "RelyingParty": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
      }
    }
    ```

??? note "`Revoke-All-Access-Tokens-For-Remote-User-Store` - All access tokens for a remote user store were revoked."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Revoke-All-Access-Tokens-For-Remote-User-Store",
      "target": "RemoteTokenMgtService",
      "data": {
        "UserStoreDomainId": "c2FtcGxlVXNlclN0b3Jl",
        "TenantUUID": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c"
      },
      "result": "Success"
    }
    ```

??? note "`validate-scope` - OAuth scope validation was performed."

    ```json
    {
      "logId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": {
        "seconds": 1755421321,
        "nanos": 566995000
      },
      "requestId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "resultStatus": "SUCCESS",
      "resultMessage": "OAuth scope validation is successful.",
      "actionId": "validate-scope",
      "componentId": "oauth-inbound-service",
      "input": {
        "client id": "SAMPLE_ASG_API_GRANT_CLIENT",
        "authorized scopes": [
          "internal_org_session_view",
          "internal_org_config_update",
          "internal_organization_discovery_delete",
          "..."
        ],
        "requested scopes": [
          "SYSTEM",
          "openid"
        ]
      }
    }
    ```

## User management

??? note "`Account Disable` - A user account was disabled."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Account Disable",
      "target": "a***sample***a",
      "data": {
        "ServiceProviderName": "Console",
        "modifiedStatus": true,
        "UserStoreDomain": "DEFAULT"
      },
      "result": "Success"
    }
    ```

??? note "`Account Enable` - A user account was enabled."

    ```json
    {
      "initiatorId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "action": "Account Enable",
      "target": "a***sample***a",
      "data": {
        "ServiceProviderName": "Console",
        "modifiedStatus": false,
        "UserStoreDomain": "DEFAULT"
      },
      "result": "Success"
    }
    ```

??? note "`add-group` - A new group was added."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Group",
      "action": "add-group",
      "data": {
        "GroupName": "Sample-Manager-Group"
      }
    }
    ```

??? note "`add-user` - A new user was added."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "targetType": "User",
      "action": "add-user",
      "data": {
        "Claims": {
          "http://wso2.org/claims/username": "a**********************************************m",
          "http://wso2.org/claims/userid": "e5f6a7b8-c9d0-1234-efab-234567890123",
          "http://wso2.org/claims/created": "2025-08-20T06:40:00.000000Z",
          "http://wso2.org/claims/modified": "2025-08-20T06:40:00.000000Z",
          "http://wso2.org/claims/emailaddress": "a**********************************************m",
          "http://wso2.org/claims/location": "a***...***ab",
          "http://wso2.org/claims/lastname": "",
          "http://wso2.org/claims/resourceType": "User",
          "http://wso2.org/claims/givenname": ""
        }
      }
    }
    ```

??? note "`create-federated-user-association` - A federated user association was created."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "initiatorType": "User",
      "targetId": "A*********************2",
      "targetType": "User",
      "action": "create-federated-user-association"
    }
    ```

??? note "`credential-update-by-administrator` - User credentials were updated by an administrator."

    ```json
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "targetType": "User",
      "action": "credential-update-by-administrator"
    }
    ```

??? note "`credential-update-by-user` - User credentials were updated by the user."

    ```json
    {
      "id": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "initiatorType": "User",
      "targetId": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "targetType": "User",
      "action": "credential-update-by-user"
    }
    ```

??? note "`delete-group` - A group was deleted."

    ```json
    {
      "id": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "targetType": "Group",
      "action": "delete-group"
    }
    ```

??? note "`delete-user` - A user was deleted."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "targetType": "User",
      "action": "delete-user"
    }
    ```

??? note "`delete-user-claim-value` - A user claim value was deleted."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "User",
      "action": "delete-user-claim-value"
    }
    ```

??? note "`set-user-claim-value` - A user claim value was set."

    ```json
    {
      "id": "d4e5f6a7-b8c9-0123-defa-123456789012",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "initiatorId": "System",
      "initiatorType": "System",
      "targetId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "targetType": "User",
      "action": "set-user-claim-value"
    }
    ```

??? note "`set-user-claim-values` - Multiple user claim values were set."

    ```json
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "e5f6a7b8-c9d0-1234-efab-234567890123",
      "targetType": "User",
      "action": "set-user-claim-values",
      "data": {
        "Claims": {
          "http://wso2.org/claims/modified": "2025-08-20T06:40:00.000000Z",
          "profileConfiguration": "d*****t"
        }
      }
    }
    ```

??? note "`update-group-name` - A group name was updated."

    ```json
    {
      "id": "3c0dd3b7-f7f6-4e47-b6fc-3ea3cdbc6a4e",
      "recordedAt": "2025-08-20T06:40:00.000000Z",
      "requestId": "20250820T123456Z-samplereqid",
      "initiatorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "initiatorType": "User",
      "targetId": "6f7a91c2-4d5e-4b8a-9c1f-2e3d4f5a6b7c",
      "targetType": "Group",
      "action": "update-group-name",
      "data": {
        "GroupName": "Sample-Updated-Manager-Group"
      }
    }
    ```
