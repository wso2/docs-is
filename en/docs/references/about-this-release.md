# About this Release

WSO2 Identity Server 6.1.0 is the latest WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 6.0.0.

## What's new in this release?

WSO2 IS 6.1.0 contains the following new features and enhancements:

-   **Google One Tap authentication** 
    
    Enabling seamless authentication with Google on authenticated Google sessions with a single tap. A personalized login button will be there for sign in/ sign up, which is enabled via the existing Google authenticator.

    [Learn more]({{base_path}}/guides/identity-federation/google/)

-   **Accessibility**
    
    The user authentication and recovery pages are now WCAG 2.1 AA compliant, enhancing the accessibility of WSO2 Identity Server to a wider audience.  

    [Learn more]({{base_path}}/references/concepts/compliance/accessibility-compliance-wso2-is/)

## What has changed in this release?

If you are moving to WSO2 Identity Server 6.1.0 from a previous version, note that several capabilities that existed previously are now improved in WSO2 IS 6.1.0.

Learn more about [upgrading to WSO2 IS 6.1.0]({{base_path}}/deploy/migrate/upgrade-wso2-is/) for details.

## Beta features

-   **React-based console application** 

    Includes developer and administrator views to manage and maintain the features offered by WSO2 Identity Server. This is an ongoing effort to improve the user experience with the product. 
    
    To try out the React-based console, start WSO2 Identity Server, and access the following URL: `https://localhost:9443/console`.

-   **Tenant-qualified URLs**
    
    Provides the option of switching to tenant-qualified endpoints, which consistently qualifies every URL/endpoint of WSO2 Identity Server with the tenant in a path parameter. This improves flexibility for tenant-wise sharding and branding compared to previous releases.

-   **Managing CORS configurations tenant-wise**

    The CORS configurations can be made at the application level and enforced at the tenant level.

## Deprecated features

The following capabilities are deprecated in WSO2 Identity Server 6.1.0, which means they will be removed in a future release. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/deploy/migrate/wso2-identity-server-feature-deprecation/).


-   On-prem WSO2 Identity Server Analytics solution (based on WSO2 Streaming Processor) 

    **Recommendation**: ELK-based analytics

## Retired features

User-managed access (UMA) will no longer be available out-of-the-box in WSO2 IS 6.1.0. It will be available as a connector on demand. [Learn more](https://github.com/wso2-extensions/identity-oauth-uma/blob/master/docs/README.md).

## Announcements

The Workflow feature that is currently available out-of-the-box in WSO2 Identity Server will be made available as a connector in the next release. This connector will be available on demand.

## Fixed issues

For a complete list of fixed issues related to this release, see [WSO2 IS Runtime - Fixed Issues](https://github.com/wso2/product-is/milestone/229?closed=1).
	
## Known issues

For a complete list of open issues related to the WSO2 Identity Server runtime, see [WSO2 IS Runtime - Open Issues](https://github.com/wso2/product-is/issues).
