# About this Release

WSO2 Identity Server 7.0.0 is the latest WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 6.1.0.

## What's new in this release?

WSO2 IS 7.0.0 contains the following new features and enhancements:

- **Refreshing look and feel for the console UI**

- **Productized support for B2B CIAM use cases**

    Identity Server now enables secure access for your B2B business customers with flexible organization management capabilities. B2B CIAM is the identity foundation that helps organizations that work with business customers, franchises, distributors and suppliers get their apps and services to market quickly and securely.

- **Authentication API that facilitates implementing app-native authentication**

- **Pushed Authorization Requests**

- **FAPI 1.0 compliant**

- **Securing API resources**

- **GitOps & change management**

- **FIPS compliance**

- **Passwordless login with HYPR**


## What has changed in this release?

If you are moving to WSO2 Identity Server 7.0.0 from a previous version, note that several capabilities that existed previously are now improved in WSO2 IS 7.0.0.

Learn more about [upgrading to WSO2 IS 7.0.0]({{base_path}}/deploy/upgrade/upgrade-wso2-is/) for details.

## Beta features

- **React-based console application**

    Includes developer and administrator views to manage and maintain the features offered by WSO2 Identity Server. This is an ongoing effort to improve the user experience with the product.

    To try out the React-based console, start WSO2 Identity Server, and access the following URL: `https://localhost:9443/console`.

- **Tenant-qualified URLs**

    Provides the option of switching to tenant-qualified endpoints, which consistently qualifies every URL/endpoint of WSO2 Identity Server with the tenant in a path parameter. This improves flexibility for tenant-wise sharding and branding compared to previous releases.

- **Managing CORS configurations tenant-wise**

    The CORS configurations can be made at the application level and enforced at the tenant level.

<!-- TODO ## Removed features

The following features are removed from WSO2 Identity Server 7.0.0.

- H2 Console
- Embedded LDAP user store
- Carbon metrics
- Yahoo authenticator
- reCAPTCHA v2 "I'm not a robot" Checkbox -->

## Deprecated features

The following capabilities are deprecated in WSO2 Identity Server 7.0.0, which means they will be removed in a future release. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

- Management Console

    **Recommendation**: Use WSO2 Identity Server Console

- Identity provider based Email and SMS OTP implementation

    **Recommendation**: New Email and SMS OTP implementation

- Password expiry connector

    **Recommendation**: In-built password expiry feature

- Userstore level username/password patterns

    **Recommendation**: Tenant level username/password patterns

- XACML editor in management console UI

    **Recommendation**:

- Workflows

    **Recommendation**:

- Challenge questions

    **Recommendation**: Use the connector available in the [connector store](https://store.wso2.com/store/assets/isconnector/list)

- SOAP Services

    **Recommendation**: Use REST APIs

- Lite User Registration

    **Recommendation**: Manage accounts that don't serve authentication and user account management outside the Identity Server.

- Idle account notification and suspension

    **Recommendation**: Use the idle account identification API to create an integration with an external scheduler such as [Azure logic apps](https://learn.microsoft.com/en-us/azure/logic-apps/concepts-schedule-automated-recurring-tasks-workflows) or [Choreo scheduled integration](https://wso2.com/choreo/docs/develop-components/develop-integrations/develop-a-scheduled-integration/).

- User Account Recovery v1 API

    **Recommendation**: Use user Account Recovery v2 API

- Consent purpose management and prompting consents at sign up

    **Recommendation**:

- SaaS Application configuration

    **Recommendation**: Productized B2B capabilities

- Request path authentication

    **Recommendation**: Authentication API that facilitates implementing app-native authentication

## Announcements

The following features currently available out-of-the-box in WSO2 Identity Server will be made available as connectors in the next release. These connectors will be available on demand.
- Workflow engine
- User managed access (UMA)

The on-prem WSO2 Identity Server Analytics solution (based on WSO2 Streaming Processor) will be deprecated with the next immediate WSO2 Identity Server release. In WSO2 IS 7.0.0, ELK-based analytics is introduced as the alternative analytics solution.

## Fixed issues

For a complete list of fixed issues related to this release, see [WSO2 IS Runtime - Fixed Issues](https://github.com/wso2/product-is/milestone/229?closed=1).

## Known issues

For a complete list of open issues related to the WSO2 Identity Server runtime, see [WSO2 IS Runtime - Open Issues](https://github.com/wso2/product-is/issues).
