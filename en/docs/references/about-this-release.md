# About this Release

WSO2 Identity Server 6.1.0 is the latest WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 6.0.0.

## What's new in this release?

WSO2 IS 6.1.0 contains the following new features and enhancements:

-   **Google One Tap authentication** 
    
    Enabling seamless authentication with Google on authenticated Google sessions with a single tap. A personalized login button will be there for sign in/ sign up, which is enabled via the existing Google authenticator.

-   **Accessibility**
    
    The user authentication and recovery pages are now WCAG 2.1 AA compliant, enhancing the accessibility of WSO2 Identity Server to a wider audience.  

## What has changed in this release?

If you are moving to WSO2 Identity Server 6.1.0 from a previous version, note that several capabilities that existed previously are now improved in WSO2 IS 6.1.0.

Learn moe about [upgrading to WSO2 IS 6.1.0]({{base_path}}/deploy/migrate/upgrade-wso2-is/) for details.

## Beta features

-   **React-based console application** 

    Includes developer and administrator views to manage and maintain the features offered by WSO2 Identity Server. This is an ongoing effort to improve the user experience with the product. 
    
    To try out the React-based console, start WSO2 Identity Server, and access the following URL: `https://localhost:9443/console`.

-   **Tenant-qualified URLs**
    
    Provides the option of switching to tenant-qualified endpoints, which consistently qualifies every URL/endpoint of WSO2 Identity Server with the tenant in a path parameter. This improves flexibility for tenant-wise sharding and branding compared to previous releases.

-   **Managing CORS configurations tenant-wise**

    The CORS configurations can be made at the application level and enforced at the tenant level.

## Deprecated features

The following capabilities are deprecated in WSO2 Identity Server 6.0.0, which means they will be removed in a future release. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/deploy/migrate/wso2-identity-server-feature-deprecation/).

-   SCIM 1 inbound provisioning 

    **Recommendation**: Use SCIM 2.0 inbound provisioning

-   SCIM 1 outbound provisioning 

    **Recommendation**: Use SCIM 2.0 outbound provisioning 

-   SOAP APIs

    **Recommendation**: Use REST-based APIs

-   Legacy DCR endpoint implementation (/identity/register)

    **Recommendation**: Use /identity/oauth2/dcr/v1.1

## Announcements

The following features currently available out-of-the-box in WSO2 Identity Server will be made available as connectors in the next release. These connectors will be available on demand.
-   Workflow engine 
-   User managed access (UMA)

The on-prem WSO2 Identity Server Analytics solution (based on WSO2 Streaming Processor) will be deprecated with the next immediate WSO2 Identity Server release. In WSO2 IS 6.0.0, ELK-based analytics is introduced as the alternative analytics solution.

## Fixed issues

For a complete list of fixed issues related to this release, see [WSO2 IS Runtime - Fixed Issues](https://github.com/wso2/product-is/milestone/229?closed=1).
	
## Known issues

For a complete list of open issues related to the WSO2 Identity Server runtime, see [WSO2 IS Runtime - Open Issues](https://github.com/wso2/product-is/issues).
