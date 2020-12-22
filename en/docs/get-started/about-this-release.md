# About this release

WSO2 Identity Server 5.11.0 is the **latest** WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 5.10.0. 

## What's new in this release

### New features and enhancements

WSO2 IS 5.11.0 contains the following new features and enhancements:

- Enhanced **My Account** application (known as "User Portal" in 5.10.0) for users to manage their account-related preferences. For more information, see [My Account](../../learn/my-account).

- Switched to symmetric key encryption as the default encryption method for data protection. For more information, see [Symmetric Key Encryption Overview](../../administer/symmetric-overview).

- Separated 'user groups' and 'roles', and introduced new role management APIs. For more information, see [SCIM 2.0 REST APIs](../../develop/scim2-rest-apis) and [What Has Changed: Group and role separation](../../setup/migrating-what-has-changed/#group-and-role-separation).

- Introduced CORS management APIs. For more information, see [CORS management APIs](../../develop/cors-rest-api).

- Upgraded to OpenSAML 3

- Introduced Software Development Kits (SDKs) for Java, .Net, and Android for simple and quick integration with simple configurations. For more information, see [Using SDKs](../../develop/sdk-overview).

- Integrated with HashiCorp Vault to protect and govern secrets such as database passwords, key store passwords etc.

- Improvements to CIAM (Customer Identity and Access Management) functionality:
    - [Trigger email validation upon email address change](../../develop/enable-email-account-verification-for-an-updated-email-address)
    - [Trigger SMS-based verification upon mobile number change](../../develop/enable-verification-for-updated-mobile-number)
    - Enforcing uniqueness and regex validation for challenge question answers to avoid risks due to weaker answers 
    - Auto log in the user upon successful password recovery
    - [Revoke session-bounded tokens upon logout and session expiry events](../../setup/migrating-what-has-changed/#revoke-access-tokens-on-logoutsession-expiry)

### Beta features

- **React-based console application** with developer and administrator views to manage and maintain the features offered by WSO2 Identity Server. This is an ongoing effort to improve the user experience with the product.

- **Tenant-qualified URLs** with the option of switching to tenant qualified endpoints, which consistently qualifies every URL/endpoint of WSO2 Identity Server with the tenant in a `path` parameter. This improves flexibility for tenant-wise sharding and branding compared to previous releases.

- **Managing CORS configurations tenant-wise** is possible with this release as the CORS configurations can now be made at application level and enforced at tenant level. 


## Deprecated Features

- /identity/connect/register API
- OAuth 1.0

For more information, see [What Has Changed:Deprecated Features](../../setup/migrating-what-has-changed/#deprecated-features) and [WSO2 Identity Server Feature Deprecation](../../setup/wso2-identity-server-feature-deprecation/).

## Fixed issues

Refer below for the improvements and bug fixes available with this
release.

* [5.11.0-RC Fixes](https://github.com/wso2/product-is/milestone/110?closed=1)
* [5.11.0-Beta5 Fixes](https://github.com/wso2/product-is/milestone/154?closed=1)
* [5.11.0-Beta4 Fixes](https://github.com/wso2/product-is/milestone/147?closed=1)
* [5.11.0-Beta3 Fixes](https://github.com/wso2/product-is/milestone/146?closed=1)
* [5.11.0-Beta2 Fixes](https://github.com/wso2/product-is/milestone/145?closed=1)
* [5.11.0-Beta Fixes](https://github.com/wso2/product-is/milestone/139?closed=1)
* [5.11.0-Alpha3 Fixes](https://github.com/wso2/product-is/milestone/148?closed=1)
* [5.11.0-Alpha2 Fixes](https://github.com/wso2/product-is/milestone/144?closed=1)
* [5.11.0-Alpha Fixes](https://github.com/wso2/product-is/milestone/131?closed=1)
* [5.11.0-M35 Fixes](https://github.com/wso2/product-is/milestone/143?closed=1)
* [5.11.0-M34 Fixes](https://github.com/wso2/product-is/milestone/142?closed=1)
* [5.11.0-M32 Fixes](https://github.com/wso2/product-is/milestone/140?closed=1)
* [5.11.0-M30 Fixes](https://github.com/wso2/product-is/milestone/138?closed=1)
* [5.11.0-M29 Fixes](https://github.com/wso2/product-is/milestone/137?closed=1)
* [5.11.0-M28 Fixes](https://github.com/wso2/product-is/milestone/130?closed=1)
* [5.11.0-M27 Fixes](https://github.com/wso2/product-is/milestone/129?closed=1)
* [5.11.0-M26 Fixes](https://github.com/wso2/product-is/milestone/128?closed=1)
* [5.11.0-M25 Fixes](https://github.com/wso2/product-is/milestone/127?closed=1)
* [5.11.0-M24 Fixes](https://github.com/wso2/product-is/milestone/126?closed=1)
* [5.11.0-M23 Fixes](https://github.com/wso2/product-is/milestone/125?closed=1)
* [5.11.0-M22 Fixes](https://github.com/wso2/product-is/milestone/124?closed=1)
* [5.11.0-M21 Fixes](https://github.com/wso2/product-is/milestone/123?closed=1)
* [5.11.0-M20 Fixes](https://github.com/wso2/product-is/milestone/122?closed=1)
* [5.11.0-M19 Fixes](https://github.com/wso2/product-is/milestone/121?closed=1)
* [5.11.0-M18 Fixes](https://github.com/wso2/product-is/milestone/120?closed=1)
* [5.11.0-M17 Fixes](https://github.com/wso2/product-is/milestone/119?closed=1)
* [5.11.0-M16 Fixes](https://github.com/wso2/product-is/milestone/118?closed=1)
* [5.11.0-M18 Fixes](https://github.com/wso2/product-is/milestone/120?closed=1)
* [5.11.0-M17 Fixes](https://github.com/wso2/product-is/milestone/119?closed=1)
* [5.11.0-M16 Fixes](https://github.com/wso2/product-is/milestone/118?closed=1)
* [5.11.0-M15 Fixes](https://github.com/wso2/product-is/milestone/117?closed=1)
* [5.11.0-M14 Fixes](https://github.com/wso2/product-is/milestone/116?closed=1)
* [5.11.0-M13 Fixes](https://github.com/wso2/product-is/milestone/115?closed=1)
* [5.11.0-M12 Fixes](https://github.com/wso2/product-is/milestone/114?closed=1)
* [5.11.0-M11 Fixes](https://github.com/wso2/product-is/milestone/113?closed=1)
* [5.11.0-M10 Fixes](https://github.com/wso2/product-is/milestone/112?closed=1)
* [5.11.0-M9 Fixes](https://github.com/wso2/product-is/milestone/111?closed=1)
* [5.11.0-M4 Fixes](https://github.com/wso2/product-is/milestone/133?closed=1)


## Known issues

For a complete list of open issues related to the WSO2 Identity Server runtime, see [WSO2 IS Runtime - Open Issues](https://github.com/wso2/product-is/issues).
