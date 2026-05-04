// Curated sidebar matching en/asgardeo mkdocs.yml nav structure.
// Paths are relative to .generated-docs, without the .md extension.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    { type: 'doc', id: 'index', label: 'Home', className: 'sidebar-icon-home' },
    {
      type: 'category',
      label: 'Get started',
      className: 'sidebar-icon-rocket',
      link: { type: 'doc', id: 'get-started/index' },
      items: [
        { type: 'doc', id: 'get-started/create-asgardeo-account', label: 'Create Account' },
        {
          type: 'category',
          label: 'Connect App',
          items: [
            {
              type: 'category',
              label: 'React',
              className: 'sidebar-icon-ca-react',
              items: [
                { type: 'doc', id: 'quick-starts/react', label: 'Quickstart' },
                { type: 'doc', id: 'complete-guides/react/introduction', label: 'Complete Guide' },
              ],
            },
            {
              type: 'category',
              label: 'Vue',
              className: 'sidebar-icon-ca-vue',
              items: [
                { type: 'doc', id: 'quick-starts/vue', label: 'Quickstart' },
              ],
            },
            {
              type: 'category',
              label: 'Nuxt',
              items: [
                { type: 'doc', id: 'quick-starts/nuxt', label: 'Quickstart' },
              ],
            },
            {
              type: 'category',
              label: 'Angular',
              className: 'sidebar-icon-ca-angular',
              items: [
                { type: 'doc', id: 'quick-starts/angular', label: 'Quickstart' },
                { type: 'doc', id: 'complete-guides/angular/introduction', label: 'Complete Guide' },
              ],
            },
            {
              type: 'category',
              label: 'Javascript',
              className: 'sidebar-icon-ca-js',
              items: [
                { type: 'doc', id: 'quick-starts/javascript', label: 'Quickstart' },
                { type: 'doc', id: 'complete-guides/javascript/introduction', label: 'Complete Guide' },
              ],
            },
            {
              type: 'category',
              label: 'Next.js',
              items: [
                { type: 'doc', id: 'quick-starts/nextjs', label: 'Quickstart' },
                { type: 'doc', id: 'complete-guides/nextjs/introduction', label: 'Complete Guide (Redirect)' },
                { type: 'doc', id: 'complete-guides/app-native/introduction', label: 'Complete Guide (App-Native)' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/introduction', label: 'Complete Guide (B2B)' },
              ],
            },
            {
              type: 'category',
              label: 'Express.js',
              items: [
                { type: 'doc', id: 'complete-guides/expressjs/introduction', label: 'Complete Guide' },
              ],
            },
            {
              type: 'category',
              label: '.NET',
              items: [
                { type: 'doc', id: 'complete-guides/dotnet/introduction', label: 'Complete Guide' },
              ],
            },
            {
              type: 'category',
              label: 'Spring Boot',
              items: [
                { type: 'doc', id: 'quick-starts/springboot', label: 'Quickstart' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Try for a sample app',
          items: [
            { type: 'doc', id: 'get-started/try-samples/index', label: 'Try for a sample app' },
            {
              type: 'category',
              label: 'Single Page apps',
              items: [
                { type: 'doc', id: 'get-started/try-samples/qsg-spa-react', label: 'React' },
                { type: 'doc', id: 'get-started/try-samples/qsg-spa-javascript', label: 'JavaScript' },
              ],
            },
            {
              type: 'category',
              label: 'Web apps',
              items: [
                { type: 'doc', id: 'get-started/try-samples/qsg-oidc-webapp-java-ee', label: 'OIDC Java EE' },
                { type: 'doc', id: 'get-started/try-samples/qsg-saml-webapp-java-ee', label: 'SAML Java EE' },
                { type: 'doc', id: 'get-started/try-samples/ws-federation-webapp', label: 'WS-Federation' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Secure MCP Servers',
          items: [
            { type: 'doc', id: 'quick-starts/mcp-auth-server', label: 'TypeScript' },
            { type: 'doc', id: 'quick-starts/mcp-auth-server-py', label: 'Python' },
            { type: 'doc', id: 'quick-starts/cloudflare-mcp-server', label: 'Cloudflare Quickstart' },
          ],
        },
        {
          type: 'category',
          label: 'Secure Your AI Agents',
          items: [
            { type: 'doc', id: 'quick-starts/agent-auth-py', label: 'Python' },
            { type: 'doc', id: 'quick-starts/agent-auth-ts', label: 'TypeScript' },
          ],
        },
      ],
    },
    { type: 'html', value: '<hr class="sidebar-divider" />' },
    {
      type: 'category',
      label: 'Guides',
      className: 'sidebar-icon-book',
      items: [
        { type: 'doc', id: 'guides/index', label: 'Guides - Overview' },
        {
          type: 'category',
          label: 'Applications',
          items: [
            { type: 'doc', id: 'guides/applications/index', label: 'Applications' },
            { type: 'doc', id: 'guides/applications/register-single-page-app', label: 'Register an SPA' },
            { type: 'doc', id: 'guides/applications/register-oidc-web-app', label: 'Register web app with OIDC' },
            { type: 'doc', id: 'guides/applications/register-saml-web-app', label: 'Register web app with SAML' },
            { type: 'doc', id: 'guides/applications/register-standard-based-app', label: 'Register a standard-based app' },
            { type: 'doc', id: 'guides/applications/register-mobile-app', label: 'Register a mobile app' },
            { type: 'doc', id: 'guides/applications/register-machine-to-machine-app', label: 'Register a machine-to-machine app' },
            { type: 'doc', id: 'guides/applications/register-a-fapi-compliant-app', label: 'Register a FAPI-compliant app' },
            { type: 'doc', id: 'guides/applications/register-react-app', label: 'Register a React app' },
            { type: 'doc', id: 'guides/applications/register-nextjs-app', label: 'Register a Next.js app' },
          ],
        },
        {
          type: 'category',
          label: 'Authentication',
          items: [
            { type: 'doc', id: 'guides/authentication/index', label: 'Authentication' },
            {
              type: 'category',
              label: 'Add login to apps',
              items: [
                { type: 'doc', id: 'guides/authentication/add-login-to-apps', label: 'Add login to apps' },
                { type: 'doc', id: 'guides/authentication/add-login-to-single-page-app', label: 'Add login to an SPA' },
                { type: 'doc', id: 'guides/authentication/add-login-to-web-app', label: 'Add login to a web app' },
                { type: 'doc', id: 'guides/authentication/add-login-to-mobile-app', label: 'Add login to a mobile app' },
              ],
            },
            {
              type: 'category',
              label: 'Add login to SaaS apps',
              items: [
                { type: 'doc', id: 'guides/authentication/sso-integrations/index', label: 'Add SSO login to SaaS apps' },
                { type: 'doc', id: 'guides/authentication/sso-integrations/add-google-workspace-template', label: 'Google Workspace' },
                { type: 'doc', id: 'guides/authentication/sso-integrations/add-salesforce-template', label: 'Salesforce' },
                { type: 'doc', id: 'guides/authentication/sso-integrations/add-microsoft-365-template', label: 'Microsoft 365' },
                { type: 'doc', id: 'guides/authentication/sso-integrations/add-zoom-template', label: 'Zoom' },
                { type: 'doc', id: 'guides/authentication/sso-integrations/add-slack-template', label: 'Slack' },
              ],
            },
            {
              type: 'category',
              label: 'Add passwordless login',
              items: [
                { type: 'doc', id: 'guides/authentication/passwordless-login/index', label: 'Add passwordless login' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-magic-link', label: 'Add login with Magic link' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-passkey', label: 'Add login with Passkey' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-hypr', label: 'Add login with HYPR' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-email-otp', label: 'Add login with Email OTP' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-sms-otp', label: 'Add login with SMS OTP' },
                { type: 'doc', id: 'guides/authentication/passwordless-login/add-passwordless-login-with-push-notification', label: 'Add login with Push Notification' },
              ],
            },
            {
              type: 'category',
              label: 'Enable user attributes',
              items: [
                { type: 'doc', id: 'guides/authentication/user-attributes/index', label: 'Enable user attributes' },
                { type: 'doc', id: 'guides/authentication/user-attributes/enable-attributes-for-oidc-app', label: 'Enable attributes for OIDC apps' },
                { type: 'doc', id: 'guides/authentication/user-attributes/enable-attributes-for-saml-app', label: 'Enable attributes for SAML apps' },
              ],
            },
            { type: 'doc', id: 'guides/authentication/manage-consent-for-attributes', label: 'Manage consent for user attributes' },
            {
              type: 'category',
              label: 'Add federated login',
              items: [
                { type: 'doc', id: 'guides/authentication/federated-login/index', label: 'Add federated login' },
                {
                  type: 'category',
                  label: 'Add social login',
                  items: [
                    { type: 'doc', id: 'guides/authentication/social-login/index', label: 'Add social login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-facebook-login', label: 'Add Facebook login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-github-login', label: 'Add GitHub login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-google-login', label: 'Add Google login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-microsoft-login', label: 'Add Microsoft login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-apple-login', label: 'Add Apple login' },
                    { type: 'doc', id: 'guides/authentication/social-login/add-linkedin-login', label: 'Add LinkedIn login' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Add decentralized login',
                  items: [
                    { type: 'doc', id: 'guides/authentication/decentralized-login/index', label: 'Add decentralized login' },
                    { type: 'doc', id: 'guides/authentication/decentralized-login/sign-in-with-ethereum', label: 'Sign-in with Ethereum' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Add eID login',
                  items: [
                    { type: 'doc', id: 'guides/authentication/eid-login/add-signicat-login', label: 'Add Signicat login' },
                    { type: 'doc', id: 'guides/authentication/eid-login/add-france-connect-login', label: 'Add FranceConnect login' },
                    { type: 'doc', id: 'guides/authentication/eid-login/add-swiss-id-login', label: 'Add SwissID login' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Add standard-based login',
                  items: [
                    { type: 'doc', id: 'guides/authentication/standard-based-login/index', label: 'Add standard-based login' },
                    { type: 'doc', id: 'guides/authentication/standard-based-login/add-oidc-idp-login', label: 'Add login with OIDC IdP' },
                    { type: 'doc', id: 'guides/authentication/standard-based-login/add-saml-idp-login', label: 'Add login with SAML IdP' },
                  ],
                },
              ],
            },
            { type: 'doc', id: 'guides/authentication/add-identifier-first-login', label: 'Add identifier first login' },
            {
              type: 'category',
              label: 'Add multi-factor authentication',
              items: [
                { type: 'doc', id: 'guides/authentication/mfa/index', label: 'Add multi-factor authentication' },
                { type: 'doc', id: 'guides/authentication/mfa/add-totp-login', label: 'Add TOTP' },
                { type: 'doc', id: 'guides/authentication/mfa/add-emailotp-login', label: 'Add Email OTP' },
                { type: 'doc', id: 'guides/authentication/mfa/add-smsotp-login', label: 'Add SMS OTP' },
                { type: 'doc', id: 'guides/authentication/mfa/add-push-auth-login', label: 'Add Push Notification' },
                { type: 'doc', id: 'guides/authentication/mfa/add-passkey-login', label: 'Add Passkey' },
                { type: 'doc', id: 'guides/authentication/mfa/add-iproov-login', label: 'Add iProov' },
                { type: 'doc', id: 'guides/authentication/mfa/add-duo-login', label: 'Add Duo' },
                { type: 'doc', id: 'guides/authentication/mfa/user-preferred-mfa-login', label: 'Add user-preferred MFA' },
              ],
            },
            {
              type: 'category',
              label: 'Add conditional authentication',
              items: [
                { type: 'doc', id: 'guides/authentication/conditional-auth/index', label: 'Add conditional authentication' },
                { type: 'doc', id: 'guides/authentication/conditional-auth/configure-conditional-auth', label: 'Set up conditional authentication' },
                {
                  type: 'category',
                  label: 'Add access control',
                  items: [
                    { type: 'doc', id: 'guides/authentication/conditional-auth/access-control', label: 'Add access control' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/user-age-based-template', label: 'User Age-based access' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/group-based-template-access-control', label: 'Group-based access' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/concurrent-session-based-template', label: 'Concurrent session-based access' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Add adaptive MFA',
                  items: [
                    { type: 'doc', id: 'guides/authentication/conditional-auth/adaptive-mfa', label: 'Add adaptive MFA' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/group-based-template', label: 'MFA based on user group' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/sign-in-option-based-template', label: 'MFA based on sign-in option' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/new-device-based-template', label: 'MFA based on user device' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/ip-based-template', label: 'MFA based on IP address' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/add-authentications-based-on-api-calls', label: 'MFA based on advanced conditions (using WSO2 Choreo)' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Specialized scenarios',
                  items: [
                    { type: 'doc', id: 'guides/authentication/conditional-auth/passkey-progressive-enrollment-based-template', label: 'Add passkey progressive enrollment' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/push-device-progressive-enrollment-based-template', label: 'Add push notification device progressive enrollment' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/on-demand-silent-password-migration-template', label: 'Add on-demand silent password migration' },
                    { type: 'doc', id: 'guides/authentication/conditional-auth/otp-retry-resend-limits', label: 'OTP Retry and Resend Limits' },
                  ],
                },
                { type: 'doc', id: 'guides/authentication/conditional-auth/write-your-first-script', label: 'Write a custom authentication script' },
              ],
            },
            {
              type: 'category',
              label: 'App-native authentication',
              items: [
                { type: 'doc', id: 'guides/authentication/app-native-authentication/index', label: 'App-native authentication' },
                { type: 'doc', id: 'guides/authentication/app-native-authentication/add-app-native-authentication', label: 'Add app-native authentication' },
                { type: 'doc', id: 'guides/authentication/app-native-authentication/secure-app-native-authentication-flows', label: 'Secure app-native authentication flows' },
                { type: 'doc', id: 'guides/authentication/app-native-authentication/handle-advanced-login-scenarios', label: 'Handle advanced login scenarios' },
              ],
            },
            { type: 'doc', id: 'guides/authentication/login-flow-ai', label: 'Login Flow AI' },
            {
              type: 'category',
              label: 'Configure OIDC flows',
              items: [
                { type: 'doc', id: 'guides/authentication/oidc/index', label: 'Configure OIDC flows' },
                { type: 'doc', id: 'guides/authentication/oidc/discover-oidc-configs', label: 'Discover OIDC endpoints' },
                { type: 'doc', id: 'guides/authentication/oidc/oauth-dynamic-client-registration', label: 'Dynamic Client Registration (DCR)' },
                {
                  type: 'category',
                  label: 'Login flows',
                  items: [
                    { type: 'doc', id: 'guides/authentication/oidc/implement-auth-code', label: 'Authorization code flow' },
                    { type: 'doc', id: 'guides/authentication/oidc/implement-auth-code-with-pkce', label: 'Authorization code flow and PKCE' },
                    { type: 'doc', id: 'guides/authentication/oidc/implement-oidc-hybrid-flow', label: 'Hybrid flow' },
                    { type: 'doc', id: 'guides/authentication/oidc/implement-login-with-par', label: 'Pushed Authorization Requests (PAR)' },
                    { type: 'doc', id: 'guides/authentication/oidc/jarm', label: 'JWT Secured Authorization Response Mode (JARM) for OAuth 2.0' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Grant types',
                  items: [
                    { type: 'doc', id: 'guides/authentication/configure-jwt-bearer-grant', label: 'JWT Bearer Grant' },
                    { type: 'doc', id: 'guides/authentication/configure-ciba-grant', label: 'CIBA Grant' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Client authentication methods',
                  items: [
                    { type: 'doc', id: 'guides/authentication/oidc/private-key-jwt-client-auth', label: 'Private key JWT' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Tokens and validation',
                  items: [
                    { type: 'doc', id: 'guides/authentication/oidc/token-validation-resource-server', label: 'Validate tokens at a resource server' },
                    { type: 'doc', id: 'guides/authentication/oidc/validate-jwt-with-jwks', label: 'Validate JWT with JWKS' },
                    { type: 'doc', id: 'guides/authentication/oidc/validate-id-tokens', label: 'Validate ID tokens' },
                    {
                      type: 'category',
                      label: 'Encrypt ID tokens',
                      items: [
                        { type: 'doc', id: 'guides/authentication/oidc/encrypt-decrypt-id-tokens', label: 'Encrypt and decrypt ID tokens' },
                        { type: 'doc', id: 'guides/authentication/oidc/id-token-encryption-reference', label: 'ID token encryption reference' },
                      ],
                    },
                    { type: 'doc', id: 'guides/authentication/oidc/request-user-info', label: 'Request user information' },
                    { type: 'doc', id: 'guides/authentication/oidc/revoke-tokens', label: 'Revoke tokens' },
                    { type: 'doc', id: 'guides/authentication/configure-token-exchange', label: 'Configure token exchange' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Logout',
                  items: [
                    { type: 'doc', id: 'guides/authentication/oidc/add-logout', label: 'Front-channel logout' },
                    { type: 'doc', id: 'guides/authentication/oidc/add-back-channel-logout', label: 'Back-channel logout' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Configure SAML flows',
              items: [
                { type: 'doc', id: 'guides/authentication/saml/index', label: 'Configure SAML flows' },
                { type: 'doc', id: 'guides/authentication/saml/discover-saml-configs', label: 'Discover SAML endpoints and settings' },
                { type: 'doc', id: 'guides/authentication/saml/saml-federated-idp-initiated-sso', label: 'Implement SAML federated IdP-initiated SSO' },
                { type: 'doc', id: 'guides/authentication/saml/saml-back-channel-logout', label: 'SAML back-channel logout' },
              ],
            },
            { type: 'doc', id: 'guides/authentication/jit-user-provisioning', label: 'Configure Just-in-Time user provisioning' },
          ],
        },
        {
          type: 'category',
          label: 'Authorization',
          items: [
            { type: 'doc', id: 'guides/authorization/index', label: 'Authorization' },
            {
              type: 'category',
              label: 'API authorization',
              items: [
                { type: 'doc', id: 'guides/authorization/api-authorization/api-authorization', label: 'Role-based access control' },
              ],
            },
            {
              type: 'category',
              label: 'User impersonation',
              items: [
                { type: 'doc', id: 'guides/authorization/user-impersonation/index', label: 'User impersonation' },
                { type: 'doc', id: 'guides/authorization/user-impersonation/via-console', label: 'via Console' },
                { type: 'doc', id: 'guides/authorization/user-impersonation/via-business-application', label: 'via business application (advanced)' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Identity Verification',
          items: [
            { type: 'doc', id: 'guides/identity-verification/index', label: 'Identity Verification' },
            { type: 'doc', id: 'guides/identity-verification/configure-identity-verification-provider', label: 'Configure an Identity Verification Provider' },
            { type: 'doc', id: 'guides/identity-verification/add-identity-verification-with-onfido', label: 'Identity Verification with Onfido' },
          ],
        },
        {
          type: 'category',
          label: 'User management',
          items: [
            { type: 'doc', id: 'guides/users/index', label: 'User management' },
            { type: 'doc', id: 'guides/users/manage-administrators', label: 'Manage administrators' },
            {
              type: 'category',
              label: 'Users',
              items: [
                { type: 'doc', id: 'guides/users/onboard-users', label: 'Onboard users' },
                { type: 'doc', id: 'guides/users/manage-users', label: 'Manage users' },
              ],
            },
            { type: 'doc', id: 'guides/users/manage-groups', label: 'Manage groups' },
            { type: 'doc', id: 'guides/users/manage-roles', label: 'Manage roles' },
            { type: 'doc', id: 'guides/users/manage-sessions', label: 'Manage active sessions' },
            {
              type: 'category',
              label: 'Outbound provisioning',
              items: [
                { type: 'doc', id: 'guides/users/outbound-provisioning/outbound-provisioning-overview', label: 'Overview' },
                { type: 'doc', id: 'guides/users/outbound-provisioning/setup-outbound-provisioning', label: 'Set up outbound provisioning' },
                { type: 'doc', id: 'guides/users/outbound-provisioning/group-based-provisioning', label: 'Group-based provisioning' },
                {
                  type: 'category',
                  label: 'Configure an outbound connector',
                  items: [
                    { type: 'doc', id: 'guides/users/outbound-provisioning/outbound-connectors/scim2', label: 'SCIM2' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Migrate users to Asgardeo',
              items: [
                { type: 'doc', id: 'guides/users/migrate-users/index', label: 'Migrate users to Asgardeo' },
                { type: 'doc', id: 'guides/users/migrate-users/migrate-users-guide', label: 'Migrate user accounts' },
                { type: 'doc', id: 'guides/users/migrate-users/migrate-passwords', label: 'Migrate user passwords' },
              ],
            },
            {
              type: 'category',
              label: 'Manage attributes and mappings',
              items: [
                { type: 'doc', id: 'guides/users/attributes/index', label: 'Manage attributes and mappings' },
                {
                  type: 'category',
                  label: 'User attributes',
                  items: [
                    { type: 'doc', id: 'guides/users/attributes/user-attributes/manage-attributes', label: 'Manage attributes' },
                    { type: 'doc', id: 'guides/users/attributes/user-attributes/configure-attributes', label: 'Configure attributes' },
                    { type: 'doc', id: 'guides/users/attributes/user-attributes/attribute-configurations-reference', label: 'Configurations reference' },
                  ],
                },
                { type: 'doc', id: 'guides/users/attributes/manage-oidc-attribute-mappings', label: 'OIDC attribute mappings' },
                { type: 'doc', id: 'guides/users/attributes/manage-scopes', label: 'OIDC scopes' },
                { type: 'doc', id: 'guides/users/attributes/manage-scim2-attribute-mappings', label: 'SCIM2 attribute mappings' },
                { type: 'doc', id: 'guides/users/attributes/configure-unique-attributes', label: 'Configure unique attributes' },
                { type: 'doc', id: 'guides/users/attributes/configure-multi-valued-contact-attributes', label: 'Configure multi-valued contact attributes' },
                {
                  type: 'category',
                  label: 'Verification and notification settings for attribute updates',
                  items: [
                    { type: 'doc', id: 'guides/users/attributes/user-attribute-change-verification', label: 'Configure settings' },
                    {
                      type: 'category',
                      label: 'Try it out',
                      items: [
                        { type: 'doc', id: 'guides/users/attributes/email-verification-on-update', label: 'Email address update verification' },
                        { type: 'doc', id: 'guides/users/attributes/mobile-verification-on-update', label: 'Mobile number update verification' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Manage user stores',
              items: [
                { type: 'doc', id: 'guides/users/user-stores/index', label: 'Manage user stores' },
                { type: 'doc', id: 'guides/users/user-stores/configure-a-user-store', label: 'Connect a remote user store' },
                { type: 'doc', id: 'guides/users/user-stores/configure-high-availability', label: 'Configure high availability' },
                { type: 'doc', id: 'guides/users/user-stores/update-user-stores', label: 'Manage remote user stores' },
                { type: 'doc', id: 'guides/users/user-stores/deployment-best-practices', label: 'Deployment best practices' },
                { type: 'doc', id: 'guides/users/user-stores/advanced-configurations-for-the-agent', label: 'Advanced configuration for the agent' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Workflows',
          items: [
            { type: 'doc', id: 'guides/workflows/index', label: 'Workflows' },
            { type: 'doc', id: 'guides/workflows/approval-workflows', label: 'Approval workflows' },
            { type: 'doc', id: 'guides/workflows/workflow-rules', label: 'Approval workflow rules' },
            { type: 'doc', id: 'guides/workflows/workflow-requests', label: 'Workflow requests' },
          ],
        },
        {
          type: 'category',
          label: 'Account configurations',
          items: [
            { type: 'doc', id: 'guides/account-configurations/index', label: 'Account configurations' },
            {
              type: 'category',
              label: 'Login security',
              items: [
                { type: 'doc', id: 'guides/account-configurations/login-security/login-attempts', label: 'Login attempts' },
                { type: 'doc', id: 'guides/account-configurations/login-security/password-validation', label: 'Password validation' },
                { type: 'doc', id: 'guides/account-configurations/login-security/bot-detection', label: 'Bot detection' },
                { type: 'doc', id: 'guides/account-configurations/login-security/sift-fraud-detection', label: 'Fraud detection' },
                { type: 'doc', id: 'guides/account-configurations/login-security/session-management', label: 'Session management' },
              ],
            },
            {
              type: 'category',
              label: 'Account recovery',
              items: [
                { type: 'doc', id: 'guides/account-configurations/account-recovery/password-recovery', label: 'Password recovery' },
                { type: 'doc', id: 'guides/account-configurations/account-recovery/admin-initiated-password-reset', label: 'Admin Initiated Password Reset' },
              ],
            },
            {
              type: 'category',
              label: 'User onboarding',
              items: [
                { type: 'doc', id: 'guides/account-configurations/user-onboarding/self-registration', label: 'Self-registration' },
                { type: 'doc', id: 'guides/account-configurations/user-onboarding/self-registration-flow', label: 'Self-registration flow' },
                { type: 'doc', id: 'guides/account-configurations/user-onboarding/invite-user-to-set-password', label: 'Invite user to set password' },
              ],
            },
            {
              type: 'category',
              label: 'Manage login identifiers',
              items: [
                { type: 'doc', id: 'guides/account-configurations/account-login/username-validation', label: 'Configure username validation' },
                { type: 'doc', id: 'guides/user-accounts/account-login/configure-login-identifiers', label: 'Configure alternative login identifiers' },
              ],
            },
            { type: 'doc', id: 'guides/account-configurations/account-disabling', label: 'Account disabling' },
          ],
        },
        {
          type: 'category',
          label: 'Flows',
          items: [
            { type: 'doc', id: 'guides/flows/index', label: 'Flows' },
            { type: 'doc', id: 'guides/flows/build-a-flow', label: 'Get Started' },
            { type: 'doc', id: 'guides/flows/self-registration', label: 'Self Registration' },
            { type: 'doc', id: 'guides/flows/password-recovery', label: 'Password Recovery' },
            { type: 'doc', id: 'guides/flows/invited-user-registration', label: 'Invited User Registration' },
            { type: 'doc', id: 'guides/flows/flow-ai', label: 'Flow AI' },
            { type: 'doc', id: 'guides/flows/flow-execution-api', label: 'Use the Flow Execution API' },
            { type: 'doc', id: 'guides/flows/flow-execution-components', label: 'Understand Flow Execution Components' },
            { type: 'doc', id: 'guides/flows/troubleshooting', label: 'Troubleshooting' },
          ],
        },
        {
          type: 'category',
          label: 'User self-service',
          items: [
            { type: 'doc', id: 'guides/user-self-service/index', label: 'User self-service' },
            {
              type: 'category',
              label: 'Self-service portal',
              items: [
                { type: 'doc', id: 'guides/user-self-service/configure-self-service-portal', label: 'Configure the self-service portal' },
                { type: 'doc', id: 'guides/user-self-service/update-profile-info', label: 'Update profile information' },
                { type: 'doc', id: 'guides/user-self-service/change-password', label: 'Change password' },
                { type: 'doc', id: 'guides/user-self-service/manage-linked-accounts', label: 'Manage linked social accounts' },
                { type: 'doc', id: 'guides/user-self-service/export-profile-information', label: 'Export profile information' },
                { type: 'doc', id: 'guides/user-self-service/manage-consents', label: 'Manage consents' },
                { type: 'doc', id: 'guides/user-self-service/manage-login-sessions', label: 'Manage login sessions' },
                { type: 'doc', id: 'guides/user-self-service/self-register', label: 'Self-register' },
                { type: 'doc', id: 'guides/user-self-service/register-passkey', label: 'Register passkeys' },
                { type: 'doc', id: 'guides/user-self-service/register-push-notification-device', label: 'Register Push Notification Device' },
                { type: 'doc', id: 'guides/user-self-service/user-password-recovery', label: 'Password recovery' },
                { type: 'doc', id: 'guides/user-self-service/enable-totp', label: 'Enroll TOTP' },
                { type: 'doc', id: 'guides/user-self-service/manage-backup-codes', label: 'Manage backup codes' },
                { type: 'doc', id: 'guides/user-self-service/discover-applications', label: 'Discover applications' },
                { type: 'doc', id: 'guides/user-self-service/manage-approvals', label: 'Manage approvals' },
              ],
            },
            { type: 'doc', id: 'guides/user-self-service/build-self-service-capabilities', label: 'Build self-service capabilities' },
          ],
        },
        {
          type: 'category',
          label: 'Organizations',
          items: [
            { type: 'doc', id: 'guides/organization-management/index', label: 'Organizations' },
            {
              type: 'category',
              label: 'Getting started',
              items: [
                { type: 'doc', id: 'guides/organization-management/organizations-overview', label: 'Overview' },
              ],
            },
            { type: 'doc', id: 'guides/organization-management/manage-organizations', label: 'Set up organizations' },
            {
              type: 'category',
              label: 'Delegate administration',
              items: [
                { type: 'doc', id: 'guides/organization-management/manage-b2b-administration', label: 'Set up administration portal' },
                {
                  type: 'category',
                  label: 'Onboard administrators',
                  items: [
                    { type: 'doc', id: 'guides/organization-management/onboard-org-admins/index', label: 'Onboard administrators' },
                    { type: 'doc', id: 'guides/organization-management/onboard-org-admins/sales-led-approach', label: 'Sales-led approach' },
                    { type: 'doc', id: 'guides/organization-management/onboard-org-admins/self-service-approach', label: 'Self-service approach' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Configure organization applications',
              items: [
                { type: 'doc', id: 'guides/organization-management/share-applications', label: 'Share applications' },
                {
                  type: 'category',
                  label: 'Organization applications',
                  items: [
                    { type: 'doc', id: 'guides/organization-management/organization-applications', label: 'Create applications' },
                    { type: 'doc', id: 'guides/organization-management/select-token-issuer-for-organization-apps', label: 'Select token issuer' },
                  ],
                },
                { type: 'doc', id: 'guides/organization-management/manage-conflicts-in-organizations', label: 'Manage conflicts in organizations' },
              ],
            },
            {
              type: 'category',
              label: 'Authorize API resources',
              items: [
                { type: 'doc', id: 'guides/organization-management/api-authorization-overview', label: 'Overview' },
                { type: 'doc', id: 'guides/organization-management/api-authorization-for-b2b', label: 'Authorize applications to API resources' },
                { type: 'doc', id: 'guides/organization-management/organization-roles', label: 'Configure roles to consume authorized APIs' },
                { type: 'doc', id: 'guides/organization-management/generate-tokens-for-organization-apps', label: 'Generate tokens for organization applications' },
              ],
            },
            {
              type: 'category',
              label: 'Manage organization users',
              items: [
                { type: 'doc', id: 'guides/organization-management/onboard-users', label: 'Onboard users' },
                { type: 'doc', id: 'guides/organization-management/share-user-profiles', label: 'Share users' },
              ],
            },
            {
              type: 'category',
              label: 'Customize organizations',
              items: [
                {
                  type: 'category',
                  label: 'Organization settings',
                  items: [
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/index', label: 'Organization settings' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/login-registration-inheritance', label: 'Login and registration settings' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/ui-branding-inheritance', label: 'UI branding' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/email-sms-templates-inheritance', label: 'Email and SMS templates' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/attribute-inheritance', label: 'User attributes' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/oidc-scope-inheritance', label: 'OIDC scopes' },
                    { type: 'doc', id: 'guides/organization-management/inheritance-in-organizations/flow-inheritance', label: 'Flows' },
                  ],
                },
                { type: 'doc', id: 'guides/organization-management/service-extensions/service-extensions', label: 'Extend with service extensions' },
              ],
            },
            {
              type: 'category',
              label: 'Offboard organizations',
              items: [
                { type: 'doc', id: 'guides/organization-management/disable-delete-organizations', label: 'Disable or delete an organization' },
              ],
            },
            { type: 'doc', id: 'guides/organization-management/try-a-b2b-use-case', label: 'Try a B2B use case' },
          ],
        },
        {
          type: 'category',
          label: 'Notification Channels',
          items: [
            { type: 'doc', id: 'guides/notification-channels/configure-email-provider', label: 'Configure Email Provider' },
            { type: 'doc', id: 'guides/notification-channels/configure-sms-provider', label: 'Configure SMS Provider' },
            { type: 'doc', id: 'guides/notification-channels/configure-push-provider', label: 'Configure Push Provider' },
          ],
        },
        {
          type: 'category',
          label: 'Customizations',
          items: [
            {
              type: 'category',
              label: 'Customize branding',
              items: [
                { type: 'doc', id: 'guides/branding/index', label: 'Customize branding' },
                { type: 'doc', id: 'guides/branding/configure-ui-branding', label: 'Configure UI branding' },
                { type: 'doc', id: 'guides/branding/customize-layouts-with-editor', label: 'Customize layouts' },
                { type: 'doc', id: 'guides/branding/branding-ai', label: 'Branding AI' },
                { type: 'doc', id: 'guides/branding/configure-custom-domains', label: 'Configure custom domains' },
                { type: 'doc', id: 'guides/branding/customize-email-templates', label: 'Customize email templates' },
                { type: 'doc', id: 'guides/branding/customize-sms-templates', label: 'Customize SMS templates' },
                { type: 'doc', id: 'guides/branding/localization', label: 'Localization in Asgardeo' },
              ],
            },
            {
              type: 'category',
              label: 'Extend with service extensions',
              items: [
                { type: 'doc', id: 'guides/service-extensions/understanding-service-extensions', label: 'Understanding service extensions' },
                {
                  type: 'category',
                  label: 'In-flow extensions',
                  items: [
                    { type: 'doc', id: 'guides/service-extensions/in-flow-extensions/custom-authentication', label: 'Custom authentication' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Pre-flow extensions (Actions)',
                  items: [
                    { type: 'doc', id: 'guides/service-extensions/pre-flow-extensions/setting-up-actions', label: 'Setting up an action' },
                    { type: 'doc', id: 'guides/service-extensions/pre-flow-extensions/pre-issue-access-token-action', label: 'Pre issue access token action' },
                    { type: 'doc', id: 'guides/service-extensions/pre-flow-extensions/pre-issue-id-token-action', label: 'Pre issue ID token action' },
                    { type: 'doc', id: 'guides/service-extensions/pre-flow-extensions/pre-update-password-action', label: 'Pre update password action' },
                    { type: 'doc', id: 'guides/service-extensions/pre-flow-extensions/pre-update-profile-action', label: 'Pre update profile action' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Integrate with webhooks',
              items: [
                { type: 'doc', id: 'guides/webhooks/understanding-webhooks', label: 'Understanding webhooks' },
                { type: 'doc', id: 'guides/webhooks/setup-webhooks', label: 'Setup webhooks' },
                { type: 'doc', id: 'guides/webhooks/webhook-events-and-payloads', label: 'Webhook events and payloads' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Your Asgardeo',
          items: [
            { type: 'doc', id: 'guides/your-asgardeo/index', label: 'Your Asgardeo' },
            { type: 'doc', id: 'guides/your-asgardeo/manage-root-organizations', label: 'Manage root organizations' },
            {
              type: 'category',
              label: 'Manage environments',
              items: [
                { type: 'doc', id: 'guides/your-asgardeo/manage-environments/index', label: 'Manage environments' },
                { type: 'doc', id: 'guides/your-asgardeo/manage-environments/promote-configurations', label: 'Promote configurations across environments' },
              ],
            },
            { type: 'doc', id: 'guides/your-asgardeo/asgardeo-self-service', label: 'Self-service' },
            { type: 'doc', id: 'guides/your-asgardeo/recover-password', label: 'Recover your password' },
            { type: 'doc', id: 'guides/your-asgardeo/delete-your-user-account', label: 'Delete your user account' },
            {
              type: 'category',
              label: 'Subscribe to Asgardeo',
              items: [
                { type: 'doc', id: 'guides/your-asgardeo/subscribe-to-asgardeo/index', label: 'Subscribe to Asgardeo' },
                { type: 'doc', id: 'guides/your-asgardeo/subscribe-to-asgardeo/subscribe-via-billing-portal', label: 'via Billing Portal' },
                { type: 'doc', id: 'guides/your-asgardeo/subscribe-to-asgardeo/subscribe-via-azure-marketplace', label: 'via Azure Marketplace' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Asgardeo logs',
          items: [
            { type: 'doc', id: 'guides/asgardeo-logs/index', label: 'Asgardeo logs' },
            { type: 'doc', id: 'guides/asgardeo-logs/diagnostic-logs', label: 'Diagnostic logs' },
            {
              type: 'category',
              label: 'Audit logs',
              items: [
                { type: 'doc', id: 'guides/asgardeo-logs/audit-logs/index', label: 'Audit logs' },
                { type: 'doc', id: 'guides/asgardeo-logs/audit-logs/audit-log-catalog', label: 'Audit log catalog' },
              ],
            },
            { type: 'doc', id: 'guides/asgardeo-logs/remote-log-publish', label: 'Remote log publish' },
          ],
        },
        {
          type: 'category',
          label: 'Monitoring',
          items: [
            { type: 'doc', id: 'guides/monitoring/index', label: 'Monitoring' },
            { type: 'doc', id: 'guides/monitoring/pii-in-asgardeo-logs', label: 'PII in Asgardeo logs' },
            { type: 'doc', id: 'guides/monitoring/asgardeo-events', label: 'Asgardeo events' },
            { type: 'doc', id: 'guides/organization-insights', label: 'Organization insights' },
          ],
        },
        {
          type: 'category',
          label: 'Agentic AI',
          items: [
            {
              type: 'category',
              label: 'MCP Authorization',
              items: [
                { type: 'doc', id: 'guides/agentic-ai/mcp/index', label: 'MCP Authorization' },
                { type: 'doc', id: 'guides/agentic-ai/mcp/mcp-server-authorization', label: 'Securing MCP Servers' },
                { type: 'doc', id: 'guides/agentic-ai/mcp/register-mcp-client-app', label: 'Setting up MCP Clients' },
              ],
            },
            {
              type: 'category',
              label: 'Identity for AI Agents',
              items: [
                { type: 'doc', id: 'guides/agentic-ai/ai-agents/index', label: 'Identity for AI agents' },
                { type: 'doc', id: 'guides/agentic-ai/ai-agents/register-and-manage-agents', label: 'Register and manage agents' },
                { type: 'doc', id: 'guides/agentic-ai/ai-agents/agent-credentials', label: 'Agent credentials' },
                { type: 'doc', id: 'guides/agentic-ai/ai-agents/access-control-for-agents', label: 'Access control for agents' },
                { type: 'doc', id: 'guides/agentic-ai/ai-agents/agent-authentication', label: 'Agent authentication' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Verifiable Credentials',
          items: [
            { type: 'doc', id: 'guides/verifiable-credentials/index', label: 'Overview' },
            { type: 'doc', id: 'guides/verifiable-credentials/issue-vc', label: 'Issue verifiable credentials to a digital wallet' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      className: 'sidebar-icon-graduation',
      link: { type: 'doc', id: 'tutorials/index' },
      items: [
        { type: 'doc', id: 'tutorials/auth-users-into-android-apps', label: 'Authenticate users into Android applications' },
        { type: 'doc', id: 'tutorials/auth-users-into-flutter-apps', label: 'Authenticate users into Flutter applications' },
        { type: 'doc', id: 'tutorials/connect-asgardeo-with-ms-entra', label: 'Connect Asgardeo as an OIDC attribute provider (with Microsoft Entra Verified ID)' },
        { type: 'doc', id: 'tutorials/connect-asgardeo-with-mattr', label: 'Connect Asgardeo as an OIDC attribute provider (with MATTR)' },
        { type: 'doc', id: 'tutorials/secure-spring-boot-api', label: 'Secure Spring Boot API with Asgardeo' },
        { type: 'doc', id: 'tutorials/smart-on-fhir', label: 'Integrate Asgardeo with Smart on FHIR healthcare apps' },
        { type: 'doc', id: 'tutorials/secure-agentic-ai-systems', label: 'Secure Agentic AI Systems with Asgardeo' },
        { type: 'doc', id: 'tutorials/end-to-end-mcp-authorization-with-asgardeo', label: 'Implement End-to-End Authorization for MCP servers' },
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      className: 'sidebar-icon-cube',
      link: { type: 'doc', id: 'sdks/index' },
      items: [
        {
          type: 'category',
          label: 'React SDK',
          items: [
            { type: 'doc', id: 'sdks/react/overview', label: 'Overview' },
            {
              type: 'category',
              label: 'APIs',
              items: [
                {
                  type: 'category',
                  label: 'Contexts',
                  items: [
                    { type: 'doc', id: 'sdks/react/contexts/asgardeo-provider', label: '<AsgardeoProvider />' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Components',
                  items: [
                    {
                      type: 'category',
                      label: 'Action Components',
                      items: [
                        { type: 'doc', id: 'sdks/react/components/action-components/sign-in-button', label: '<SignInButton />' },
                        { type: 'doc', id: 'sdks/react/components/action-components/sign-out-button', label: '<SignOutButton />' },
                        { type: 'doc', id: 'sdks/react/components/action-components/sign-up-button', label: '<SignUpButton />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Control Components',
                      items: [
                        { type: 'doc', id: 'sdks/react/components/control-components/signed-in', label: '<SignedIn />' },
                        { type: 'doc', id: 'sdks/react/components/control-components/signed-out', label: '<SignedOut />' },
                        { type: 'doc', id: 'sdks/react/components/control-components/loading', label: '<Loading />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'User Self-care Components',
                      items: [
                        { type: 'doc', id: 'sdks/react/components/user-selfcare-components/user-dropdown', label: '<UserDropdown />' },
                        { type: 'doc', id: 'sdks/react/components/user-selfcare-components/user-profile', label: '<UserProfile />' },
                        { type: 'doc', id: 'sdks/react/components/user-selfcare-components/user', label: '<User />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Organization Components (B2B)',
                      items: [
                        { type: 'doc', id: 'sdks/react/components/organization-components/create-organization', label: '<CreateOrganization />' },
                        { type: 'doc', id: 'sdks/react/components/organization-components/organization-profile', label: '<OrganizationProfile />' },
                        { type: 'doc', id: 'sdks/react/components/organization-components/organization-switcher', label: '<OrganizationSwitcher />' },
                        { type: 'doc', id: 'sdks/react/components/organization-components/organization-list', label: '<OrganizationList />' },
                        { type: 'doc', id: 'sdks/react/components/organization-components/organization', label: '<Organization />' },
                        { type: 'doc', id: 'sdks/react/components/organization-components/organization-context', label: '<OrganizationContext />' },
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'hooks',
                  items: [
                    { type: 'doc', id: 'sdks/react/hooks/use-asgardeo', label: 'useAsgardeo()' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Guides',
              items: [
                { type: 'doc', id: 'sdks/react/guides/accessing-protected-apis', label: 'Accessing Protected APIs' },
                { type: 'doc', id: 'sdks/react/guides/protecting-routes', label: 'Protecting Routes' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Next.js SDK',
          items: [
            { type: 'doc', id: 'sdks/nextjs/overview', label: 'Overview' },
            {
              type: 'category',
              label: 'APIs',
              items: [
                {
                  type: 'category',
                  label: 'Contexts',
                  items: [
                    { type: 'doc', id: 'sdks/nextjs/contexts/asgardeo-provider', label: '<AsgardeoProvider />' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Middleware',
                  items: [
                    { type: 'doc', id: 'sdks/nextjs/middleware/asgardeo-middleware', label: 'asgardeoMiddleware()' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Components',
                  items: [
                    {
                      type: 'category',
                      label: 'Action Components',
                      items: [
                        { type: 'doc', id: 'sdks/nextjs/components/action-components/sign-in-button', label: '<SignInButton />' },
                        { type: 'doc', id: 'sdks/nextjs/components/action-components/sign-out-button', label: '<SignOutButton />' },
                        { type: 'doc', id: 'sdks/nextjs/components/action-components/sign-up-button', label: '<SignUpButton />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Control Components',
                      items: [
                        { type: 'doc', id: 'sdks/nextjs/components/control-components/signed-in', label: '<SignedIn />' },
                        { type: 'doc', id: 'sdks/nextjs/components/control-components/signed-out', label: '<SignedOut />' },
                        { type: 'doc', id: 'sdks/nextjs/components/control-components/loading', label: '<Loading />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Authentication Components',
                      items: [
                        { type: 'doc', id: 'sdks/nextjs/components/authentication/sign-in', label: '<SignIn />' },
                        { type: 'doc', id: 'sdks/nextjs/components/authentication/sign-up', label: '<SignUp />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'User Self-care Components',
                      items: [
                        { type: 'doc', id: 'sdks/nextjs/components/user-selfcare-components/user-dropdown', label: '<UserDropdown />' },
                        { type: 'doc', id: 'sdks/nextjs/components/user-selfcare-components/user-profile', label: '<UserProfile />' },
                        { type: 'doc', id: 'sdks/nextjs/components/user-selfcare-components/user', label: '<User />' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Organization Components (B2B)',
                      items: [
                        { type: 'doc', id: 'sdks/nextjs/components/organization-components/create-organization', label: '<CreateOrganization />' },
                        { type: 'doc', id: 'sdks/nextjs/components/organization-components/organization-profile', label: '<OrganizationProfile />' },
                        { type: 'doc', id: 'sdks/nextjs/components/organization-components/organization-switcher', label: '<OrganizationSwitcher />' },
                        { type: 'doc', id: 'sdks/nextjs/components/organization-components/organization-list', label: '<OrganizationList />' },
                        { type: 'doc', id: 'sdks/nextjs/components/organization-components/organization', label: '<Organization />' },
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'hooks',
                  items: [
                    { type: 'doc', id: 'sdks/nextjs/hooks/use-asgardeo', label: 'useAsgardeo()' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Guides',
              items: [
                { type: 'doc', id: 'sdks/nextjs/guides/accessing-protected-apis', label: 'Accessing Protected APIs' },
                { type: 'doc', id: 'sdks/nextjs/guides/protecting-routes', label: 'Protecting Routes' },
              ],
            },
          ],
        },
      ],
    },
    { type: 'doc', id: 'sdks/asgardeo-mcp-server', label: 'Asgardeo MCP Server' },
    {
      type: 'category',
      label: 'APIs',
      className: 'sidebar-icon-code',
      link: { type: 'doc', id: 'apis/index' },
      items: [
        {
          type: 'category',
          label: 'Management APIs',
          items: [
            { type: 'doc', id: 'apis/action-management-rest-api', label: 'Action Management API' },
            { type: 'doc', id: 'apis/scim2-agents-rest-apis', label: 'Agent Management API' },
            { type: 'doc', id: 'apis/api-resource-management-rest-api', label: 'API resource management API' },
            { type: 'doc', id: 'apis/application-management', label: 'Application management API' },
            { type: 'doc', id: 'apis/app-native-authentication-api', label: 'App-native authentication API' },
            { type: 'doc', id: 'apis/attribute-management', label: 'Attribute management API' },
            { type: 'doc', id: 'apis/authenticators', label: 'Authenticators API' },
            { type: 'doc', id: 'apis/branding-preference-rest-api', label: 'Branding Preferences API' },
            { type: 'doc', id: 'apis/consent-management', label: 'Consent management API' },
            { type: 'doc', id: 'apis/email-template', label: 'Email templates API' },
            { type: 'doc', id: 'apis/event-configuration', label: 'Event configuration API' },
            { type: 'doc', id: 'apis/identity-governance', label: 'Identity governance API' },
            { type: 'doc', id: 'apis/idp', label: 'Identity provider API' },
            { type: 'doc', id: 'apis/identity-verification-providers', label: 'Identity verification provider API' },
            { type: 'doc', id: 'apis/idle-account-identification', label: 'Idle account identification API' },
            { type: 'doc', id: 'apis/notification-sender-v2-rest-api', label: 'Notification sender API' },
            { type: 'doc', id: 'apis/notification-templates', label: 'Notification templates management API' },
            { type: 'doc', id: 'apis/dynamic-client-registration-rest-api', label: 'OAuth Dynamic Client Registration API' },
            { type: 'doc', id: 'apis/organization-discovery', label: 'Organization discovery API' },
            { type: 'doc', id: 'apis/organization-discovery-config-mgt-rest-api', label: 'Organization discovery configuration management API' },
            { type: 'doc', id: 'apis/organization-management', label: 'Organization management API' },
            {
              type: 'category',
              label: 'Role management',
              items: [
                { type: 'doc', id: 'apis/role-management/roles', label: 'Role management (SCIM 2.0) API' },
              ],
            },
            { type: 'doc', id: 'apis/rule-metadata-rest-api', label: 'Rule Metadata API' },
            { type: 'doc', id: 'apis/end-user-credential-management-rest-api', label: 'User credential management API' },
            { type: 'doc', id: 'apis/vc-template-management-rest-api', label: 'Verifiable Credential Template Management API' },
            {
              type: 'category',
              label: 'User management',
              items: [
                {
                  type: 'category',
                  label: 'SCIM 2.0 API',
                  items: [
                    { type: 'doc', id: 'apis/scim2/index', label: 'SCIM 2.0 API' },
                    { type: 'doc', id: 'apis/scim2/scim2-users-rest-api', label: 'SCIM 2.0 Users API' },
                    { type: 'doc', id: 'apis/scim2/scim2-groups-rest-api', label: 'SCIM 2.0 Groups API' },
                    { type: 'doc', id: 'apis/scim2/scim2-patch-operations', label: 'SCIM 2.0 Patch operations' },
                    { type: 'doc', id: 'apis/scim2/scim2-bulk-rest-api', label: 'SCIM 2.0 Bulk API' },
                    { type: 'doc', id: 'apis/scim2/scim2-schema-rest-api', label: 'SCIM 2.0 Schema API' },
                    { type: 'doc', id: 'apis/scim2/scim2-batch-operations', label: 'SCIM 2.0 Batch Operations' },
                    { type: 'doc', id: 'apis/scim2/scim2-resource-types-rest-api', label: 'SCIM 2.0 Resource types API' },
                    { type: 'doc', id: 'apis/scim2/scim2-service-provider-configs-rest-api', label: 'SCIM 2.0 Service provider configs API' },
                    { type: 'doc', id: 'apis/scim2/build-scim2-user-creation-payload', label: 'SCIM 2.0 Build user creation payload' },
                  ],
                },
                { type: 'doc', id: 'apis/association-management-by-admin', label: 'User account associations API' },
                { type: 'doc', id: 'apis/user-account-recovery', label: 'Account Recovery API' },
                { type: 'doc', id: 'apis/offline-user-onboard', label: 'Offline user onboard management API' },
                { type: 'doc', id: 'apis/verification-code-management-rest-api', label: 'Verification Code Management API' },
                { type: 'doc', id: 'apis/admin-identity-verification', label: 'Identity verification API' },
              ],
            },
            {
              type: 'category',
              label: 'User sessions',
              items: [
                { type: 'doc', id: 'apis/session', label: 'Session management API' },
                { type: 'doc', id: 'apis/extend-sessions', label: 'Session extension API' },
              ],
            },
            {
              type: 'category',
              label: 'User sharing management APIs',
              items: [
                { type: 'doc', id: 'apis/organization-user-share-rest-api', label: 'V1 (deprecated)' },
                { type: 'doc', id: 'apis/organization-user-share-v2-rest-api', label: 'V2' },
              ],
            },
            { type: 'doc', id: 'apis/user-store', label: 'User store management API' },
            { type: 'doc', id: 'apis/validation', label: 'Validation API' },
            { type: 'doc', id: 'apis/webhook-management-rest-api', label: 'Webhook Management API' },
            { type: 'doc', id: 'apis/webhook-metadata-rest-api', label: 'Webhook Metadata API' },
            { type: 'doc', id: 'apis/workflow-rest-api', label: 'Workflow Management API' },
          ],
        },
        {
          type: 'category',
          label: 'Organization APIs',
          items: [
            { type: 'doc', id: 'apis/organization-apis/index', label: 'Organization APIs' },
            { type: 'doc', id: 'apis/organization-apis/authentication', label: 'Get access for organization APIs' },
            { type: 'doc', id: 'apis/organization-apis/action-management-rest-api', label: 'Action Management API' },
            { type: 'doc', id: 'apis/organization-apis/api-resource-management-rest-api', label: 'API resource management API' },
            {
              type: 'category',
              label: 'Application management API',
              items: [
                { type: 'doc', id: 'apis/organization-apis/shared-application-management', label: 'Application management API (Shared Applications)' },
                { type: 'doc', id: 'apis/organization-apis/organization-application-mgt', label: 'Application management API' },
              ],
            },
            { type: 'doc', id: 'apis/organization-apis/org-authenticators', label: 'Authenticators API' },
            { type: 'doc', id: 'apis/organization-apis/org-branding-management', label: 'Branding API' },
            { type: 'doc', id: 'apis/organization-apis/org-claim-management', label: 'Claim management API' },
            { type: 'doc', id: 'apis/organization-apis/org-idp', label: 'Identity provider management API' },
            { type: 'doc', id: 'apis/organization-apis/org-account-recovery', label: 'Identity recovery API' },
            { type: 'doc', id: 'apis/organization-apis/org-idle-account-identification', label: 'Idle account identification API' },
            { type: 'doc', id: 'apis/organization-apis/organization-user-invitation', label: 'Invite parent organization\'s users API' },
            { type: 'doc', id: 'apis/organization-apis/notification-sender-v2-rest-api', label: 'Notification sender API' },
            { type: 'doc', id: 'apis/organization-apis/organization-discovery', label: 'Offline user onboard management API' },
            { type: 'doc', id: 'apis/organization-apis/org-management', label: 'Organization management API' },
            { type: 'doc', id: 'apis/organization-apis/org-role-mgt', label: 'Role management API' },
            { type: 'doc', id: 'apis/organization-apis/rule-metadata-rest-api', label: 'Rule Metadata API' },
            { type: 'doc', id: 'apis/organization-apis/end-user-credential-management-rest-api', label: 'User credential management API' },
            {
              type: 'category',
              label: 'User management',
              items: [
                { type: 'doc', id: 'apis/organization-apis/scim2/index', label: 'User management' },
                { type: 'doc', id: 'apis/organization-apis/scim2/scim2-org-user-mgt', label: 'SCIM 2.0 Users API' },
                { type: 'doc', id: 'apis/organization-apis/scim2/scim2-org-group-mgt', label: 'SCIM 2.0 Groups API' },
                { type: 'doc', id: 'apis/organization-apis/scim2/scim2-org-bulk', label: 'SCIM 2.0 Bulk API' },
                { type: 'doc', id: 'apis/organization-apis/org-association-rest-api', label: 'User Account Association API' },
                { type: 'doc', id: 'apis/organization-apis/verification-code-management-rest-api', label: 'Verification Code Management API' },
              ],
            },
            { type: 'doc', id: 'apis/organization-apis/organization-user-share', label: 'User sharing management API' },
            { type: 'doc', id: 'apis/organization-apis/organization-user-share-v2', label: 'User sharing management API V2' },
            { type: 'doc', id: 'apis/organization-apis/org-user-store', label: 'User store management API' },
          ],
        },
        {
          type: 'category',
          label: 'End User APIs',
          items: [
            { type: 'doc', id: 'apis/scim2-me', label: 'SCIM 2.0 Me API' },
            { type: 'doc', id: 'apis/register-mfa/backup-code', label: 'Backup codes API' },
            { type: 'doc', id: 'apis/register-mfa/export-user-info', label: 'Export user information API' },
            { type: 'doc', id: 'apis/register-mfa/password-recovery', label: 'Password recovery API' },
            { type: 'doc', id: 'apis/register-mfa/totp', label: 'TOTP API' },
            { type: 'doc', id: 'apis/push-notification-device-rest-api', label: 'Push Notification Device API' },
            { type: 'doc', id: 'apis/association-management-by-user', label: 'User account associations API' },
            { type: 'doc', id: 'apis/export-user-info', label: 'Export user information API' },
            { type: 'doc', id: 'apis/user-identity-verification', label: 'Identity Verification' },
            { type: 'doc', id: 'apis/user-organization-api', label: 'Organization Me API' },
            { type: 'doc', id: 'apis/self-password-update-rest-api', label: 'Self password update API' },
            { type: 'doc', id: 'apis/verification-code-management-me-api', label: 'Verification Code Management Me API' },
            { type: 'doc', id: 'apis/approvals-rest-api', label: 'Approval API' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'References',
      className: 'sidebar-icon-external-link',
      link: { type: 'doc', id: 'references/index' },
      items: [
        { type: 'doc', id: 'references/operational-policies', label: 'Operational policies' },
        { type: 'doc', id: 'references/asgardeo-outbound-ip-addresses', label: 'Asgardeo outbound IP addresses' },
        { type: 'doc', id: 'references/user-management/user-roles', label: 'Asgardeo user roles' },
        { type: 'doc', id: 'references/user-management/add-scim2-custom-user-schema-support', label: 'SCIM2 Custom User Schema Support' },
        {
          type: 'category',
          label: 'App configurations',
          items: [
            { type: 'doc', id: 'references/app-settings/index', label: 'App configurations' },
            { type: 'doc', id: 'references/app-settings/oidc-settings-for-app', label: 'OIDC configurations' },
            { type: 'doc', id: 'references/app-settings/saml-settings-for-app', label: 'SAML configurations' },
          ],
        },
        {
          type: 'category',
          label: 'IdP configurations',
          items: [
            { type: 'doc', id: 'references/idp-settings/index', label: 'IdP configurations' },
            { type: 'doc', id: 'references/idp-settings/oidc-settings-for-idp', label: 'OIDC configurations' },
            { type: 'doc', id: 'references/idp-settings/saml-settings-for-idp', label: 'SAML configurations' },
          ],
        },
        {
          type: 'category',
          label: 'Conditional authentication',
          items: [
            { type: 'doc', id: 'references/conditional-auth/api-reference', label: 'Conditional auth - API' },
          ],
        },
        { type: 'doc', id: 'references/remote-user-store/remote-user-store-properties', label: 'Remote agent properties' },
        { type: 'doc', id: 'references/authorization-policies-for-apps', label: 'Authorization policies for apps' },
        { type: 'doc', id: 'references/email-templates', label: 'Email templates' },
        { type: 'doc', id: 'references/sms-templates', label: 'SMS templates' },
        {
          type: 'category',
          label: 'Service extensions',
          items: [
            {
              type: 'category',
              label: 'In-flow extensions',
              items: [
                {
                  type: 'category',
                  label: 'Custom authentication',
                  items: [
                    { type: 'doc', id: 'references/service-extensions/in-flow-extensions/custom-authentication/api-contract', label: 'API contract to implement' },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Pre-flow extensions (Actions)',
              items: [
                {
                  type: 'category',
                  label: 'Pre issue access token action',
                  items: [
                    {
                      type: 'category',
                      label: 'Version 1.x',
                      items: [
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/pre-issue-access-token-action-v1.0', label: 'API v1.0 contract to implement' },
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/pre-issue-access-token-action-v1.1', label: 'API v1.1 contract to implement' },
                      ],
                    },
                    { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/sample-success-responses', label: 'Sample success reponses' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Pre issue ID token action',
                  items: [
                    {
                      type: 'category',
                      label: 'Version 1.x',
                      items: [
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-issue-id-token-action/pre-issue-id-token-action-v1.0', label: 'API v1.0 contract to implement' },
                      ],
                    },
                    { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-issue-id-token-action/sample-success-responses', label: 'Sample success responses' },
                  ],
                },
                {
                  type: 'category',
                  label: 'Pre update password action',
                  items: [
                    {
                      type: 'category',
                      label: 'Version 1.x',
                      items: [
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-update-password-action/pre-update-password-action-v1.0', label: 'API v1.0 contract to implement' },
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-update-password-action/pre-update-password-action-v1.1', label: 'API v1.1 contract to implement' },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Version 2.x',
                      items: [
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-update-password-action/pre-update-password-action-v2.0', label: 'API v2.0 contract to implement' },
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Pre update profile action',
                  items: [
                    {
                      type: 'category',
                      label: 'Version 1.x',
                      items: [
                        { type: 'doc', id: 'references/service-extensions/pre-flow-extensions/pre-update-profile-action/pre-update-profile-action-v1.0', label: 'API v1.0 contract to implement' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { type: 'doc', id: 'references/accessibility', label: 'Accessibility compliance' },
        { type: 'doc', id: 'references/data-residency-in-asgardeo', label: 'Data residency in Asgardeo' },
        { type: 'doc', id: 'references/mcp-tool-api-resource-access', label: 'API resources and scopes required for MCP tools' },
        {
          type: 'category',
          label: 'Production checklist',
          items: [
            { type: 'doc', id: 'references/production-checklist/index', label: 'Production checklist' },
            { type: 'doc', id: 'references/production-checklist/readiness-check', label: 'Readiness check' },
            { type: 'doc', id: 'references/production-checklist/security-check', label: 'Security check' },
            { type: 'doc', id: 'references/production-checklist/best-practices', label: 'Best practices' },
          ],
        },
        { type: 'doc', id: 'references/rate-limits', label: 'Asgardeo rate limits' },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            { type: 'doc', id: 'references/tutorials/build-your-own-push-authenticator-app', label: 'Build your own push authenticator app' },
          ],
        },
        {
          type: 'category',
          label: 'IAM concepts',
          items: [
            { type: 'doc', id: 'references/grant-types', label: 'OAuth2 grant types' },
            { type: 'doc', id: 'references/pushed-authorization-requests', label: 'OAuth2 Pushed Authorization Requests' },
            {
              type: 'category',
              label: 'Token binding',
              items: [
                { type: 'doc', id: 'references/token-binding/index', label: 'Token binding' },
                { type: 'doc', id: 'references/token-binding/client-request', label: 'Client-request' },
              ],
            },
            { type: 'doc', id: 'references/financial-grade-api', label: 'Financial-grade API' },
            { type: 'doc', id: 'references/app-native-authentication', label: 'App-native authentication' },
            { type: 'doc', id: 'references/push-notification-based-authentication', label: 'Push Notification based authentication' },
            { type: 'doc', id: 'references/oid4vci', label: 'OpenID for verifiable credential issuance (OID4VCI)' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Technology Guides',
      items: [
        {
          type: 'category',
          label: 'Actions',
          items: [
            { type: 'doc', id: 'complete-guides/actions/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/actions/prerequisite', label: 'Prerequisite' },
            { type: 'doc', id: 'complete-guides/actions/pre-issue-access-token-action-use-case', label: 'Pre-Issue Access Token Action Use Case' },
            { type: 'doc', id: 'complete-guides/actions/pre-issue-access-token-action-in-choreo', label: 'Configure Pre-Issue Access Token Action with Choreo' },
            { type: 'doc', id: 'complete-guides/actions/pre-issue-access-token-action-in-vercel', label: 'Configure Pre-Issue Access Token Action with Vercel' },
            { type: 'doc', id: 'complete-guides/actions/pre-issue-access-token-action-in-aws-lambda', label: 'Configure Pre-Issue Access Token Action with AWS Lambda' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-password-action-use-case', label: 'Pre-Update Password Action Use Case' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-password-action-in-choreo', label: 'Configure Pre-Update Password Action with Choreo' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-password-action-in-vercel', label: 'Configure Pre-Update Password Action with Vercel' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-password-action-in-aws-lambda', label: 'Configure Pre-Update Password Action with AWS Lambda' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-profile-action-use-case', label: 'Pre-Update Profile Action Use Case' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-profile-action-in-choreo', label: 'Configure Pre-Update Profile Action with Choreo' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-profile-action-in-vercel', label: 'Configure Pre-Update Profile Action with Vercel' },
            { type: 'doc', id: 'complete-guides/actions/pre-update-profile-action-in-aws-lambda', label: 'Configure Pre-Update Profile Action with AWS Lambda' },
          ],
        },
        {
          type: 'category',
          label: 'React',
          items: [
            { type: 'doc', id: 'complete-guides/react/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/react/prerequisite', label: 'Prerequisite' },
            { type: 'doc', id: 'complete-guides/react/register-an-application', label: 'Configure an application' },
            { type: 'doc', id: 'complete-guides/react/create-a-react-app', label: 'Create a React app' },
            { type: 'doc', id: 'complete-guides/react/install-asgardeo-sdk', label: 'Configure Asgardeo SDK' },
            { type: 'doc', id: 'complete-guides/react/add-login-and-logout', label: 'Add login and logout' },
            { type: 'doc', id: 'complete-guides/react/display-logged-in-user-details', label: 'Display user details' },
            { type: 'doc', id: 'complete-guides/react/securing-routes-within-the-app', label: 'Securing Routes' },
            { type: 'doc', id: 'complete-guides/react/accessing-protected-api', label: 'Accessing protected API' },
            { type: 'doc', id: 'complete-guides/react/manage-tokens-in-React-apps', label: 'Manage tokens in React' },
            { type: 'doc', id: 'complete-guides/react/next-steps', label: 'Next Steps' },
          ],
        },
        {
          type: 'category',
          label: 'Next.js',
          items: [
            {
              type: 'category',
              label: 'B2B',
              items: [
                { type: 'doc', id: 'complete-guides/nextjs-b2b/introduction', label: 'Introduction' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/prerequisite', label: 'Prerequisites' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/register-an-application', label: 'Register an application' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/give-access-to-apis-and-create-roles', label: 'Give access to APIs and create roles' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/create-app', label: 'Create a Next.js app' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/configure-app-for-login', label: 'Configure app for login' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/add-user-sign-up', label: 'Add user sign up' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/add-login-and-logout', label: 'Add login and logout' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/manage-teams', label: 'Manage teams' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/switch-to-a-team', label: 'Switch to a team' },
                { type: 'doc', id: 'complete-guides/nextjs-b2b/manage-team-members', label: 'Manage team members' },
              ],
            },
            {
              type: 'category',
              label: 'Redirect-Based',
              items: [
                { type: 'doc', id: 'complete-guides/nextjs/introduction', label: 'Introduction' },
                { type: 'doc', id: 'complete-guides/nextjs/prerequisite', label: 'Prerequisite' },
                { type: 'doc', id: 'complete-guides/nextjs/register-an-application', label: 'Register an application' },
                { type: 'doc', id: 'complete-guides/nextjs/create-app', label: 'Create a Next.js app' },
                { type: 'doc', id: 'complete-guides/nextjs/install-asgardeo-sdk', label: 'Configure Asgardeo SDK' },
                { type: 'doc', id: 'complete-guides/nextjs/add-login-and-logout', label: 'Add login and logout' },
                { type: 'doc', id: 'complete-guides/nextjs/display-logged-in-user-details', label: 'Display user details' },
                { type: 'doc', id: 'complete-guides/nextjs/securing-routes-within-the-app', label: 'Securing Routes' },
                { type: 'doc', id: 'complete-guides/nextjs/accessing-protected-api', label: 'Accessing protected API' },
                { type: 'doc', id: 'complete-guides/nextjs/manage-tokens-in-apps', label: 'Manage tokens in Next.js' },
                { type: 'doc', id: 'complete-guides/nextjs/next-steps', label: 'Next Steps' },
              ],
            },
            {
              type: 'category',
              label: 'App-Native',
              items: [
                { type: 'doc', id: 'complete-guides/app-native/introduction', label: 'Introduction' },
                { type: 'doc', id: 'complete-guides/app-native/prerequisites', label: 'Prerequisites' },
                { type: 'doc', id: 'complete-guides/app-native/register-an-application', label: 'Register an application' },
                { type: 'doc', id: 'complete-guides/app-native/create-app', label: 'Create an app for app-native authentication' },
                { type: 'doc', id: 'complete-guides/app-native/configure-provider', label: 'Configure Asgardeo SDK' },
                { type: 'doc', id: 'complete-guides/app-native/add-login-and-logout', label: 'Add login and logout' },
                { type: 'doc', id: 'complete-guides/app-native/add-mfa', label: 'Add MFA using app-native APIs' },
                { type: 'doc', id: 'complete-guides/app-native/add-social-login', label: 'Add Social Login using app-native APIs' },
                { type: 'doc', id: 'complete-guides/app-native/manage-tokens-in-apps', label: 'Manage tokens in app-native apps' },
                { type: 'doc', id: 'complete-guides/app-native/next-steps', label: 'Next Steps' },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Express.js',
          items: [
            { type: 'doc', id: 'complete-guides/expressjs/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/expressjs/prerequisite', label: 'Prerequisite' },
            { type: 'doc', id: 'complete-guides/expressjs/register-an-application', label: 'Configure an application' },
            { type: 'doc', id: 'complete-guides/expressjs/create-an-expressjs-app', label: 'Create an Express.js app' },
            { type: 'doc', id: 'complete-guides/expressjs/install-passport-asgardeo', label: 'Configure Passport Asgardeo' },
            { type: 'doc', id: 'complete-guides/expressjs/add-login-and-logout', label: 'Add login and logout' },
            { type: 'doc', id: 'complete-guides/expressjs/persist-user-sessions', label: 'Persist user sessions' },
            { type: 'doc', id: 'complete-guides/expressjs/display-logged-in-user-details', label: 'Display user details' },
            { type: 'doc', id: 'complete-guides/expressjs/securing-routes-within-the-app', label: 'Securing Routes' },
            { type: 'doc', id: 'complete-guides/expressjs/accessing-protected-api', label: 'Accessing protected API' },
            { type: 'doc', id: 'complete-guides/expressjs/next-steps', label: 'Next Steps' },
          ],
        },
        {
          type: 'category',
          label: 'Angular',
          items: [
            { type: 'doc', id: 'complete-guides/angular/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/angular/prerequisite', label: 'Prerequisite' },
            { type: 'doc', id: 'complete-guides/angular/register-an-application', label: 'Register an application' },
            { type: 'doc', id: 'complete-guides/angular/create-app', label: 'Create an Angular app' },
            { type: 'doc', id: 'complete-guides/angular/install-asgardeo-sdk', label: 'Configure Asgardeo provider' },
            { type: 'doc', id: 'complete-guides/angular/add-login-and-logout', label: 'Add login and logout' },
            { type: 'doc', id: 'complete-guides/angular/display-logged-in-user-details', label: 'Display user details' },
            { type: 'doc', id: 'complete-guides/angular/securing-routes-within-the-app', label: 'Securing Routes' },
            { type: 'doc', id: 'complete-guides/angular/accessing-protected-api', label: 'Accessing protected API' },
            { type: 'doc', id: 'complete-guides/angular/manage-tokens', label: 'Manage tokens in Angular' },
            { type: 'doc', id: 'complete-guides/angular/next-steps', label: 'Next Steps' },
          ],
        },
        {
          type: 'category',
          label: 'Javascript',
          items: [
            { type: 'doc', id: 'complete-guides/javascript/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/javascript/prerequisite', label: 'Prerequisite' },
            { type: 'doc', id: 'complete-guides/javascript/register-an-application', label: 'Register an application' },
            { type: 'doc', id: 'complete-guides/javascript/create-app', label: 'Create a JavaScript app' },
            { type: 'doc', id: 'complete-guides/javascript/install-asgardeo-sdk', label: 'Configure Asgardeo SDK' },
            { type: 'doc', id: 'complete-guides/javascript/add-login-and-logout', label: 'Add login and logout' },
            { type: 'doc', id: 'complete-guides/javascript/display-logged-in-user-details', label: 'Display user details' },
            { type: 'doc', id: 'complete-guides/javascript/accessing-protected-api', label: 'Accessing protected API' },
            { type: 'doc', id: 'complete-guides/javascript/manage-tokens-in-apps', label: 'Manage tokens in JavaScript' },
            { type: 'doc', id: 'complete-guides/javascript/next-steps', label: 'Next Steps' },
          ],
        },
        {
          type: 'category',
          label: '.NET',
          items: [
            { type: 'doc', id: 'complete-guides/dotnet/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/dotnet/prerequisites', label: 'Prerequisites' },
            { type: 'doc', id: 'complete-guides/dotnet/register-an-application', label: 'Register an application' },
            { type: 'doc', id: 'complete-guides/dotnet/create-a-dotnet-app', label: 'Create a .NET app' },
            { type: 'doc', id: 'complete-guides/dotnet/configure-authentication-properties', label: 'Configure auth properties' },
            { type: 'doc', id: 'complete-guides/dotnet/add-login-and-logout', label: 'Add login and logout' },
            { type: 'doc', id: 'complete-guides/dotnet/securing-routes-within-the-app', label: 'Securing Routes' },
            { type: 'doc', id: 'complete-guides/dotnet/display-logged-in-user-details', label: 'Display user details' },
            { type: 'doc', id: 'complete-guides/dotnet/protected-api', label: 'Accessing protected API' },
            { type: 'doc', id: 'complete-guides/dotnet/manage-tokens-in-dotnet-apps', label: 'Manage tokens in .NET' },
            { type: 'doc', id: 'complete-guides/dotnet/next-steps', label: 'Next Steps' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Best Practice Guides',
      items: [
        {
          type: 'category',
          label: 'Frontend Security',
          items: [
            { type: 'doc', id: 'complete-guides/fesecurity/introduction', label: 'Introduction' },
            { type: 'doc', id: 'complete-guides/fesecurity/login-options', label: 'In-app vs IdP-based login' },
            { type: 'doc', id: 'complete-guides/fesecurity/public-clients', label: 'Public clients' },
            { type: 'doc', id: 'complete-guides/fesecurity/insecure-tokens', label: 'Insecure token handling' },
            { type: 'doc', id: 'complete-guides/fesecurity/weak-access-control', label: 'Weak access control' },
            { type: 'doc', id: 'complete-guides/fesecurity/unauthorized-privilege-gain', label: 'Unauthorized access' },
            { type: 'doc', id: 'complete-guides/fesecurity/weak-mfa', label: 'Weak MFA' },
            { type: 'doc', id: 'complete-guides/fesecurity/partial-user-logouts', label: 'Partial user logouts' },
            { type: 'doc', id: 'complete-guides/fesecurity/misconfiguration', label: 'Product misconfiguration' },
            { type: 'doc', id: 'complete-guides/fesecurity/xss', label: 'Cross-Site Scripting (XSS)' },
            { type: 'doc', id: 'complete-guides/fesecurity/csrf', label: 'Cross-Site Request Forgery (CSRF)' },
            { type: 'doc', id: 'complete-guides/fesecurity/next-steps', label: 'Next Steps' },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
