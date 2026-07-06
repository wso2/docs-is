# Data residency in WSO2 Identity Platform

Data residency is the geographical (or regulatory) boundary where your data is stored and processed.

![data residency in WSO2 Identity Platform]({{base_path}}/assets/img/references/asgardeo-data-residency.png){: width="700"}

## Data centers

WSO2 Identity Platform uses two regional data centers to store data:

<table>
    <tr>
        <th>
            Country
        </th>
        <th>
            Regional Data center
        </th>
        <th>
            Location
        </th>
    </tr>
    <tr>
        <td>
            United States (US)
        </td>
        <td>
            East US
        </td>
        <td>
            Virginia
        </td>
    </tr>
    <tr>
        <td>
            Europe (EU)
        </td>
        <td>
            Northern Europe
        </td>
        <td>
            Ireland
        </td>
    </tr>
</table>

You can onboard to WSO2 Identity Platform in your preferred region by using the relevant URL (listed below). Your data will be stored in the corresponding regional data center.

- **WSO2 Identity Platform Console - US region**: https://console.asgardeo.io/
- **WSO2 Identity Platform Console - EU region**: https://console.eu.asgardeo.io/

Effective June 27, 2025, all applicable user and service-related data are stored in the selected regional data center (US or EU), replacing the previous approach of storing some data types only in the US.

### Subscription data

Your subscription account is the user account that's created when you are onboarded to WSO2 Identity Platform. Billing details are linked to this account. Listed below are some of the subscription data:

- Billing email
- Subscription ID
- Tier details

!!! note "Update"

    Effective June 27, 2025, subscription data is stored in the regional data center (US or EU) selected during onboarding, replacing the previous approach of storing it exclusively in the US.

### Administrator data

Users onboarded to WSO2 Identity Platform as [organization administrators]({{base_path}}/guides/users/manage-administrators/) are granted access to the global WSO2 services such as billing and support. Therefore, the administrator data (including profile information and login information from the billing/support portals) was previously stored exclusively in the US datacenter.

The profile information of organization administrators includes all the data that organization administrators enter in their user profiles.

!!! note "Update"

    Effective June 27, 2025, administrator data is stored in the selected regional data center (US or EU), replacing the previous approach of storing it exclusively in the US.

### End-user data

Data of your end users are only stored in the regional datacenter you selected when onboarding to WSO2 Identity Platform.

## Analytics data

WSO2 Identity Platform uses [Moesif](https://www.moesif.com/){:target="_blank"} — an analytics platform in the WSO2 product family — to power the identity [Insights](https://wso2.com/identity-platform/docs/guides/insights/){:target="_blank"} available in the Console and to support WSO2's product, onboarding, subscription, and usage analytics. To do this, WSO2 Identity Platform publishes both end-user and administrator data to Moesif for the purposes described below.

Analytics data is published to the Moesif workspace in the **same region you selected during onboarding** — data from US organizations is published to Moesif US, and data from EU organizations is published to Moesif EU. Your analytics data therefore remains within your selected regional boundary. By default, analytics data is retained for **3 months**.

### End-user data published for analytics

WSO2 Identity Platform's built-in [Insights](https://wso2.com/identity-platform/docs/guides/insights/){:target="_blank"} publishes your organization's identity events to Moesif to build the analytics dashboards shown in the **Insights** section of the Console.

**Purpose:** to provide you with identity analytics for your organization — such as logins, sessions, token issuance, registrations, registration/recovery funnels, and organization switches.

**Types of data published:** identity events and their contextual attributes, which may include personal data of your end users such as their **email address, login identifiers** (for example, mobile number or NIC where used as login attributes), **IP address,** and **user agent,** in addition to identifiers such as user ID, organization, application, and connection.

### Administrator data published for analytics

In addition to end-user data, WSO2 Identity Platform publishes certain administrator and organization data to Moesif for WSO2's own product and business analytics.

**Purpose:** to help WSO2 understand organization onboarding and administrator adoption, track subscription and tier changes for billing and business analytics, and measure product usage across organizations.

**Types of data published:**

- **Organization details** — organization ID, organization name/handle, region, activation status, and current subscription tier.
- **Administrator and owner identity** — administrator/owner user ID, email address, and name, along with organization ownership and association details.
- **Subscription data** — current subscription tier and subscription/tier-change activity.
- **Usage data** — aggregated identity activity per organization (such as counts of authentications, registrations, and token issuance) used for usage and metering analytics.

When an organization or an administrator is deleted from WSO2 Identity Platform, the corresponding profile and analytics records are removed from Moesif as part of the deletion process.

## Data sharing

Some of your data, such as logs, will be accessible outside your selected region to ensure that WSO2's global entities (currently includes the USA, Sri Lanka, and Brazil) can provide technical support and other services. For example, technical support teams outside the region will need access to this data for various support and troubleshooting purposes. However, this data is stored only in the regional
datacenter that you have selected.

Therefore, note that your organization–level logs may include personal information (such as the IP addresses and email addresses) of your end users.

## Data privacy

Learn about WSO2 Identity Platform's [privacy policy](https://wso2.com/identity-platform/privacy-policy/#:~:text=Asgardeo%20doesn%27t%20store%20any,API%20Services%20User%20Data%20Policy.) to understand how your data privacy is protected.

## Get support

If you require more details or have other data residency requirements for your organizations and businesses, contact the WSO2 Identity Platform support team.
