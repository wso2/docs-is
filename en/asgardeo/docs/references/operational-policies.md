# Operational policies

## 1. Introduction

We at WSO2, are dedicated to delivering reliable, secure, and efficient services to our customers. To achieve this, we have established a comprehensive set of operational policies that define our procedures and standards across various service aspects. These policies ensure transparency, regulatory compliance, and the highest levels of customer satisfaction. They encompass everything from billing and data protection to load and penetration testing, providing clear guidelines and processes for our customers and internal teams.

### 1.1 Asgardeo

Asgardeo is a cloud-native, developer-centric identity-as-a-service (IDaaS) solution managed by WSO2. It is designed to simplify and enhance identity and access management for applications. This solution is hosted on cloud infrastructure operated by WSO2.

Asgardeo’s operational policies provide a robust framework to ensure the efficient, secure, and consistent management of its cloud-native identity and access management platform. These policies are designed based on the following governing areas to align with Asgardeo's core principles of delivering developer-friendly, enterprise-grade identity solutions, while upholding the highest standards of security, scalability, and compliance.

### 1.2 Governing areas

The operational policies are structured around the following areas:

- Asgardeo Endpoints
- Data Residency
- Load Testing
- Penetration Testing
- Rate Limits
- Billing
- Support


## 2. Asgardeo endpoints

### 2.1 Asgardeo URLs

Asgardeo currently operates in two regions, the US and EU, providing a localized and seamless experience for customers. You can access Asgardeo services through the following region-specific URLs: 

#### US Region
- Asgardeo Console - [https://console.asgardeo.io](https://console.asgardeo.io){target="_blank"}
- My Account Portal - [https://myaccount.asgardeo.io](https://myaccount.asgardeo.io){target="_blank"}
- API - [https://api.asgardeo.io](https://api.asgardeo.io){target="_blank"}

#### EU Region
- Asgardeo Console - [https://console.eu.asgardeo.io](https://console.eu.asgardeo.io){target="_blank"}
- My Account Portal - [https://myaccount.eu.asgardeo.io](https://myaccount.eu.asgardeo.io){target="_blank"}
- API - [https://api.eu.asgardeo.io](https://api.eu.asgardeo.io){target="_blank"}

### 2.2 Asgardeo endpoints

Asgardeo provides a comprehensive set of REST APIs, organized into the following categories to streamline usage while ensuring security and efficiency.

- **Management APIs** allow applications that use Asgardeo as their Identity Provider to perform operations such as user, group, role, application management and authentication.

- **Organization APIs** enable the management of organizational hierarchies and  resources associated with organizations.

- **End User APIs** allow authenticated users to manage their profiles, preferences, and sessions.

Customers can refer to the [Asgardeo documentation](https://wso2.com/asgardeo/docs/apis/){target="_blank"} for detailed instructions on accessing these APIs. By following these guidelines, customers can seamlessly integrate Asgardeo’s capabilities into their systems.


## 3. Data residency

Data residency refers to the geographical or regulatory boundaries where data is stored and processed.

### 3.1 Data residency in Asgardeo

The following diagram shows how data is stored in Asgardeo and how different entities interact with it.

![data residency in Asgardeo]({{base_path}}/assets/img/references/data-residency-diagram.png){: width="600px"}

### 3.2 Data centers

Asgardeo uses two regional data centers to store data:

- United States (US)
- Europe (EU)

You can onboard to Asgardeo in your preferred region by using the relevant URL below. Your data will be stored in the corresponding regional data center.

- Asgardeo Console - US region: [https://console.asgardeo.io/](https://console.asgardeo.io/){target="_blank"}
- Asgardeo Console - EU region: [https://console.eu.asgardeo.io/](https://console.eu.asgardeo.io/){target="_blank"}

However, certain types of data are always exclusively stored in the US data center as explained in section 3.3.

### 3.3 Data types

This section outlines the different types of data stored in Asgardeo and their respective storage locations.

#### 3.3.1 Subscription data

When you onboard to Asgardeo, the user account created will automatically function as your subscription account. Billing details are linked to this account and will contain subscription data such as:
- Billing email
- Subscription ID
- Tier details

Data associated with an Asgardeo subscription account is exclusively stored in the US data center. Even if you choose the EU data center during account creation, this data is still created and stored exclusively in the US data center.

#### 3.3.2 Administrator data

Users onboarded to Asgardeo as organization administrators are granted access to the global WSO2 services such as billing and support. Therefore, the administrator data (including profile information and login information from the billing/support portals) are also exclusively stored in the US datacenter.

The profile information of organization administrators includes all the data that organization administrators enter in their user profiles.

#### 3.3.3 End-user data

Data of your end users are only stored in the regional datacenter you selected when onboarding to Asgardeo.

### 3.4 Data sharing

Some of your data, such as logs, will be accessible outside your selected region to ensure that WSO2's global entities can provide technical support and other services. For example, technical support teams outside the region will need access to this data for various support and troubleshooting purposes. However, this data is stored only in the regional datacenter that you have selected.

Therefore, note that your organization–level logs may include personal information (such as the IP addresses and email addresses) of your end users.

### 3.5 Data privacy
Learn about [Asgardeo's privacy policy](https://wso2.com/asgardeo/privacy-policy/){target="_blank"} to understand how your data privacy is protected.

### 3.6 Get support

If you require more details or have other data residency requirements for your organizations and businesses, contact the Asgardeo support team.


## 4. Load testing

### 4.1 Load Testing in Asgardeo

WSO2 recognizes that customers may occasionally need to perform load tests against its production cloud service. To ensure a successful test and maintain a high quality of service for all customers, WSO2 has established the following guidelines. Any load testing in Asgardeo must be conducted in accordance with this policy.

### 4.2 Eligibility

Only customers with an **Enterprise subscription are permitted to conduct load testing**. Customers with this subscription may request one load test (with up to two repeats) per year against one of their Asgardeo production tenants.

### 4.3 Approval Process

All performance and load testing require Asgardeo's prior written approval. Once approved, testing can only target tenants that Asgardeo has approved. The approval process includes the following steps:

- **Submission**: Customers must submit a load testing request through the Asgardeo support portal at least **14 days** prior to the desired test date.

- **Information Required**: The request must include detailed information about the test, including the specific dates and times, scope, purpose, IP addresses, tools to be used, and expected request rates.

- **Review**: Asgardeo will review the request to ensure it aligns with service capacity and does not disrupt other customers.

### 4.4 Testing Guidelines

To maintain service integrity and performance, the following guidelines must be adhered to during load testing:

- **Timing**: Load tests should be scheduled during **off-peak hours** to minimize impact on other customers.

- **Rate Limits**: Testing must comply with Asgardeo's published rate limits and any specific limits set during the approval process.

- **Notification**: Customers must notify Asgardeo immediately if any issues arise during the test.

### 4.5 Restrictions

Please note that any un-informed load testing on Asgardeo will lead to blocking of the traffic originated. And moreover certain types of testing too are restricted to protect the integrity and performance of Asgardeo’s services:

- **Denial of Service (DoS) Testing**: Denial of Service and other disruptive tests are not permitted.

- **Scope**: Testing must be confined to the customer's own tenant and must not impact other tenants or services.

- **Tools and Methods**: Only approved tools and methods may be used for testing.

### 4.6 Non-Compliance

Failure to comply with this policy may result in temporary or permanent restrictions on the customer’s ability to conduct future tests. WSO2 reserves the right to take immediate action to protect service availability, including suspending the offending test.

### 4.7 Support and Assistance

For any questions or support related to load testing, customers can contact Asgardeo support through our support portal or designated support channels. Our team is available to assist with planning and executing load tests to ensure compliance and success.

## 5. Penetration Testing

### 5.1 Penetration Testing in Asgardeo

WSO2 recognizes that customers may occasionally need to perform penetration tests against Asgardeo, their Identity and access management solution. Asgardeo will not lower any of the existing security measures implemented during the approved pentest engagement period. All security measures will adhere to Asgardeo’s standard incident handling process, regardless of the attack source. Any penetration testing in Asgardeo must be conducted in accordance with this policy.

### 5.2 Eligibility

Only customers with an **Enterprise subscription** are permitted to conduct penetration  testing.

### 5.3 Approval Process

All penetration testing requires Asgardeo's prior written approval. Once approved, testing can only target tenants that Asgardeo has approved. The approval process includes the following steps:

- **Submission** - Customers must submit a penetration testing request through the Asgardeo support portal at least 14 days prior to the desired test date.

- **Information Required** - The request must include detailed information about the Specific dates, times of the test, and timezone.

    - Organization name and region.
    - Scope and purpose of the test.
    - Source IP address(es) for the test.
    - Tools intended to be used during the test.
    - Contact details of two individuals (including phone numbers and email addresses) available during the testing period for immediate communication.

- **Review** - Asgardeo team will review the request to ensure it aligns with service capacity and does not disrupt other customers.

### 5.4 Testing guidelines

To maintain service integrity and performance, the following guidelines must be adhered to during load testing:

**Timing** - Penetration tests should be scheduled during off-peak hours to minimize impact on other customers.

**Rate Limits** - Testing must comply with Asgardeo's published rate limits and any specific limits set during the approval process.

**Notification** - Customers are required to report all identified vulnerabilities to the Asgardeo support portal immediately.
Disclosed vulnerabilities should remain confidential until further notice from Asgardeo.

### 5.5 Restrictions

Please note that any un-informed penetration testing on Asgardeo will lead to blocking of the traffic originated. And moreover certain types of testing too are restricted to protect the integrity and performance of Asgardeo’s services:

- Customers are strictly prohibited from performing load tests or Denial-of-Service (DoS) attacks.
- Any actions outside the approved scope require prior consent from Asgardeo.

### 5.6 Non-Compliance

Failure to comply with this policy may result in temporary or permanent restrictions on the customer’s ability to conduct future tests. Any unauthorized actions will prompt Asgardeo to take protective measures, which may include suspending or blocking the offending tenant and/or the source of intrusion traffic. WSO2 reserves the right to take immediate action to protect service availability, including suspending the offending test.

### 5.7 Support and Assistance

For any questions or support related to load testing, customers can contact Asgardeo support through our support portal or designated support channels. Our team is available to assist with planning and executing penetration tests to ensure compliance and success. 

## 6. Limits and Constraints

### 6.1 Rate limits

Asgardeo endpoints are subjected to rate limits to maintain smooth and reliable processing of requests, preventing system failures and slowdowns. These rate limits are applied globally across all tiers of Asgardeo subscriptions. Rate limits are calculated on a per IP address basis. Exceeding the rate limit results in a 429 `Too Many Requests` error code.

Refer [Asgardeo rate limits](https://wso2.com/asgardeo/docs/references/rate-limits/) for more information regarding the rate limits.

### 6.2 Entity limit

This discusses the entity limits that constraints the usage of Asgardeo free of charge.
Asgardeo is free of charge but it constrains certain entities with limiting the usage. And any asgardeo user might encounter such warnings while they try to create entities (can be applications, connections) more than the allowed amount.

![Maximum allowed apps limit]({{base_path}}/assets/img/references/max-allowed-apps-reached.png)

[https://wso2.com/asgardeo/pricing/](https://wso2.com/asgardeo/pricing/){target="_blank"} provides the details on the entity limits and by upgrading the tier or by contacting asgardeo support to increase the limit on certain entities.

## 7. Billing

Organization owners can access the billing portal from the **Asgardeo Console** by clicking the profile picture in the top right corner and selecting **Billing Portal**.

### 7.1 Billing cycle
Asgardeo organization owners can choose to be billed monthly or annually for your subscription. However, note that the monthly active users (MAUs) count that exceeds the allowed limit is always charged monthly. Billing cycles start on the 1st day of every month. Depending on the day of the month in which you subscribe, you will be charged a prorated fee for the first month.

### 7.2 Subscription

Asgardeo is available to use for free, however, it comes with certain limitations like the number of applications, the MAU count, and the connections that can be created. For higher limits on resources, it is necessary to subscribe to a higher-tier plan. Subscribing to a higher-tier plan can be done either through the Asgardeo billing portal or through Azure marketplace. 

Refer this guideline below for more on [subscription](https://wso2.com/asgardeo/docs/guides/your-asgardeo/subscribe-to-asgardeo/){target="_blank"}.

### 7.3 Subscription Upgrade

Asgardeo organization owners can upgrade the curent tier of their organizations using the billing portal accessible from the **Asgardeo Console**. This [document](https://wso2.com/asgardeo/docs/guides/your-asgardeo/subscribe-to-asgardeo/subscribe-via-billing-portal/){target="_blank"} provides more insight on how to upgrade tiers. 

### 7.4 Subscription Downgrade

Contact the Asgardeo support team at asgardeo-help@wso2.com for subscription downgrades and cancellations.

### 7.5 Invoices

Asgardeo organization owners have the capability to view the invoices for the payments made for the subscriptions in the billing portal.

## 8. Support

Asgardeo provides support services to ensure the smooth operation of your organization's identity and access management needs. The level of support varies based on the subscription tier. The support portal is accessible from the [https://cloud-support.wso2.com/](https://cloud-support.wso2.com/) URL.

### 8.1 Support tiers

Asgardeo offers multiple support tiers, including community support for free-tier users and Commercial support for paid subscribers. Commercial support provides faster response times, prioritized issue resolution, and access to dedicated support engineers.

### 8.2 Support channels

- Free-tier users can seek assistance via community forums and public documentation.
- Paid subscribers can reach out to WSO2’s support team through the Asgardeo Support Portal, ensuring a structured approach to issue resolution.
- Critical production issues can be escalated for faster resolution based on the support plan.

### 8.3 Support availability

- Support is available based on the response times and SLAs defined in your subscription plan.
- Higher-tier subscriptions come with enhanced SLA guarantees to ensure faster resolution.

### 8.4 Reporting an Issue

To report an issue, follow these steps:

- Navigate to the Asgardeo Support Portal and submit a support ticket.
- Provide detailed information, including error logs, reproduction steps, and impact assessment.
- For urgent matters, use priority escalation as per the SLA in your plan.

Refer to the [Asgardeo Support Policy](https://wso2.com/asgardeo-support-policy/){target="_blank"} for more details on available support plans, SLAs, and escalation procedures.

## 9. Monitoring

Monitoring is a critical aspect of maintaining a business-critical application like Asgardeo. It ensures the application performs as expected without outages, identifies trends for operational insights, and supports capacity planning through system metrics. Monitoring also plays a key role in promptly notifying relevant parties if the application fails to meet expected performance levels.

### 9.1 Asgardeo Monitoring

Asgardeo ensures high availability, security, and performance through continuous system monitoring and automated alerting. We maintain a 99.99% SLA, with real-time service status and uptime metrics available at Asgardeo Status Page. Refer to [https://status.asgardeo.io/](https://status.asgardeo.io/){target="_blank"}.

Our infrastructure, application, and security monitoring ensure early detection of potential issues, enabling rapid incident response to minimize disruptions. For details on our incident management and support process, refer to our Support Policy. Refer to [https://wso2.com/asgardeo-support-policy/](https://wso2.com/asgardeo-support-policy/){target="_blank"}.

### 9.2 Organization Monitoring

Asgardeo provides support to monitor organization for any of the changes done in their organization through audit logs. Refer to the [documentation](https://wso2.com/asgardeo/docs/guides/asgardeo-logs/audit-logs/) for more information.

And diagnostic logs will help admins to monitor what has happened during authentication flows  [https://wso2.com/asgardeo/docs/guides/asgardeo-logs/diagnostic-logs/](https://wso2.com/asgardeo/docs/guides/asgardeo-logs/diagnostic-logs/){target="_blank"}.

Similarly Asgardeo provides capability to check on organization insights on the user registration and logins. Refer to [https://wso2.com/asgardeo/docs/guides/organization-insights/](https://wso2.com/asgardeo/docs/guides/organization-insights/){target="_blank"}.

Asgardeo generates events for various user activities. You can publish these events to WSO2's Choreo platform and trigger custom use cases. Learn more in the [Asgardeo events documentation](https://wso2.com/asgardeo/docs/guides/monitoring/asgardeo-events/){target="_blank"}.

## 10. Product life cycle & Migrations

### 10.1 Product Delivery

Asgardeo, as a cloud offering, adheres to agile principles and emphasizes delivering features and fixes iteratively. We strive to deploy updates to production on a daily basis, ensuring faster delivery of new features, enhancements, and critical improvements. Our primary focus is addressing customer concerns, resolving pain points, and introducing enhancements that improve developer-friendliness while also delivering exciting new features. The changelog provides a comprehensive list of updates, innovations, and improvements introduced to the product. Explore the latest changes here: [https://wso2.com/asgardeo/changelog/](https://wso2.com/asgardeo/changelog/){target="_blank"}.

### 10.2 New Features

Asgaardeo thrives to introduce new features and explicitly adds ‘New’ tag to those features so that interested parties can try those new features.

### 10.3 Beta Features

To continuously refine the product and gather valuable customer feedback, we often introduce new features in Beta. This approach enables us to collaborate closely with our customers, identify areas for improvement, and ensure the final feature meets the highest standards of quality and usability before its general availability.

### 10.4 Migration

Asgardeo’s cloud architecture enables us to onboard new features, changes, and improvements efficiently. While implementing these updates, we run silent migrations to ensure a seamless experience for customers. These migrations are designed to be non-intrusive, causing no disruptions to customer engagement with the product or their end users' behavior.

In most cases, migrations do not require downtime, as we carefully plan and execute them in a way that maintains the platform's continuous availability. However, in rare scenarios where downtime is necessary, the following steps are taken:

- Customers are informed in advance, with clear communication about the timing and duration.
- Downtime is scheduled during off-peak hours to minimize the impact on customers who rely on Asgardeo.
- The team ensures the process is completed as quickly and efficiently as possible to restore full service promptly.

Transparency is a key part of our migration process. Customers are kept informed of planned updates and any potential impact through multiple communication channels, including Emails and notifications.

By prioritizing communication and careful planning, we ensure that migrations enhance the product without disrupting its reliability or customer trust.

## 11. Unsupported requests

The Asgardeo Team is committed to providing the best possible assistance. However, we regret to inform you that we are currently unable to accommodate the following requests:

- Restore any deleted information in an organization, including
    - Database connections and their users and passwords
    - Users, their profile information, metadata, and role memberships
    - Roles and Groups
    - Application
    - Connections
    - Email templates
    - Organization logs once the standard retention time has passed

- Providing PII information of other customers and consumer details of the given customer.
- Asgardeo infrastructure architecture diagrams and component details.


 






