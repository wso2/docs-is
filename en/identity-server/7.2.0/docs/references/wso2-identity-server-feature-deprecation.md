# WSO2 Identity Server Feature Deprecation

## Reasons for feature deprecation

Features/APIs in the server can be deprecated for several reasons such as

*   New specification versions have been released
*   Standard alternatives available OOTB
*   Security risks involved

## Feature deprecation life-cycle

While deprecated features can still be available and support for existing users, they will not be further enhanced, nor recommended for use. Removal of deprecated capabilities will occur over a deprecation window, in which the feature will undergo several phases in the deprecation life-cycle. 

![feature-deprecation-life-cycle]({{base_path}}/assets/img/references/feature-deprecation-life-cycle.png){: width="600" style="display: block; margin: 0;"}

The following terms refer to the different phases of the feature deprecation life cycle.

1. **Planned**

    Any feature in the planned phase, will be deprecated and removed in future releases. However, the feature is available for use in the current release.

2. **Deprecated**

    In the deprecated phase, we no longer recommend using the feature. While deprecated classes and methods remain available, they are tagged as deprecated and disabled by default in the product, as they will be removed in future releases. This approach facilitates a smooth transition for existing users who still use the deprecated features. Avoid using them for new use cases or extensions. We encourage you to upgrade existing code written using deprecated features during this phase.

3. **Retired**

    At this phase, we decide not to incorporate the feature with new releases. For versions released, until the respective version goes end of license, feature maintenance and security updates will be provided for subscriptions

## Support / SLA for deprecated features

Refer EOL dates of a product at [WSO2 Product Support Lifecycle](https://wso2.com/products/support-matrix/){:target="_blank"}.

Contact [WSO2 Support](https://support.wso2.com/support){:target="_blank"} for details on this.
