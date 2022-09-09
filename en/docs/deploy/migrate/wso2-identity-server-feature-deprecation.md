# WSO2 Identity Server Feature Deprecation

## Reasons for feature deprecation

Features/APIs in the server can be deprecated for several reasons such as

*   New specification versions have been released
*   Standard alternatives available OOTB
*   Security risks involved

---

## Feature deprecation life-cycle

While deprecated features can still be available and support for existing users, they will not be further enhanced, nor recommended for use. Removal of deprecated capabilities will occur over a deprecation window, in which the feature will undergo several phases in the deprecation life-cycle. 

![feature-deprecation-life-cycle]({{base_path}}/assets/img/deploy/migrate/feature-deprecation-life-cycle.png)

The following terms refer to the different phases of the feature deprecation life cycle.

1. **Planned**

    Any feature in the planned phase, will be deprecated and removed in future releases. However, the feature is available for use in the current release.

2. **Deprecated**

    In the deprecated phase, we no longer recommend using the feature. While deprecated classes and methods are still available, they are tagged deprecated and are disabled by default in the product, because they will be removed in future releases. This is done to facilitate the phasing-out for any existing user that still uses the deprecated features for their use-cases. It is not recommended to use them for implementing any new use cases/extensions. We encourage you to start upgrading any existing code written using the deprecated features during this phase.

3. **Retired**

    At this phase, we decide not to incorporate the feature with new releases. For versions released, until the respective version goes end of license, feature maintenance and security updates will be provided for subscriptions

<!--

## Feature deprecation matrix

Feature deprecation matrix keeps track of the WSO2 Identity Server Feature Deprecation timelines with their respective EOL versions in accordance with the IAM feature maintenance policy. Users are advised to review if they make use of the feature in their current deployment, and make plans to change their implementation. Refer the matrix to identify the target timelines of feature removal from the product and EOL for maintenance, in order to plan your environment and projects accordingly.

The matrix includes the product release versions that each feature will be deprecated or retired from. **FUTURE** tag is used to indicate deprecation/retired timelines which are not yet finalized and **FUTURE** on Deprecated In column indicate that the feature is in **Planned** phase, and the deprecated timeline is not yet finalized.

<table>
  <tr>
   <td><strong>Feature / API</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Deprecated In</strong>
   </td>
   <td><strong>Retired In</strong>
   </td>
  </tr>
  <tr>
   <td>OpenID Connect Dynamic Client Registration
   </td>
   <td>This is the old implementation of OIDC DCR endpoint (/identity/connector/dcr)
<p>
The deprecated DCR endpoint is currently disabled in the product and can be enabled by adding the following config to `deployment.toml`. It will be removed in the near future.

    ```toml
    [[legacy_feature]]
    id = "identity/connect/dcr"
    enable = true
    ```
<p>
Our recommendation is to migrate to identity/oauth2/dcr/v1.1
   </td>
   <td>5.11.0
   </td>
   <td>FUTURE
   </td>
  </tr>
  <tr>
   <td>OAuth 1.0
   </td>
   <td>
   OAuth 1.0 implementation has been deprecated in the product as the new version of the spec (2.0) is already supported and widely-used.
<p>
This feature is currently disabled in the product and can be enabled by adding the following config to `deployment.toml`. However, it will be removed in the near future.

    ```toml
    [[legacy_feature]]
    id = "identity/connect/dcr"
    enable = true
    ```
<p>
Our recommendation is to migrate to OAuth 2.0
   </td>
   <td>5.11.0
   </td>
   <td>FUTURE
   </td>
  </tr>
  <tr>
   <td>SCIM 1.1
   </td>
   <td>New version of the spec (2.0) is already supported and widely-used
   </td>
   <td>FUTURE
   </td>
   <td>FUTURE
   </td>
  </tr>
  <tr>
   <td>Yahoo Connector
   </td>
   <td>Obsolete connector
   </td>
   <td>5.12.0
   </td>
   <td>FUTURE
   </td>
  </tr>
</table>
-->

---

## Support / SLA for deprecated features

Refer EOL dates of a product at [WSO2 Product Support Lifecycle](https://wso2.com/products/support-matrix/).

Contact [WSO2 Support](https://support.wso2.com/jira/secure/Dashboard.jspa) for details on this.
