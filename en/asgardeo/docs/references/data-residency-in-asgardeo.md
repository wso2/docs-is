# Data residency in Asgardeo

Data residency is the geographical (or regulatory) boundary where your data is stored and processed.

![data residency in Asgardeo]({{base_path}}/assets/img/references/asgardeo-data-residency.png){: width="700"}

## Datacenters

Asgardeo uses two regional datacenters to store data:

<table>
    <tr>
        <th>
            Country
        </th>
        <th>
            Regional Datacenter
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

You can onboard to Asgardeo in your preferred region by using the relevant URL (listed below). Your data will be stored in the corresponding regional data center.

- **Asgardeo Console - US region**: https://console.asgardeo.io/
- **Asgardeo Console - EU region**: https://console.eu.asgardeo.io/

However, note that certain types of data are always exclusively stored in the US datacenter as explained below.

### Subscription data

Your subscription account is the user account that is created when you are onboarded to Asgardeo. Billing details are linked to this account. Listed below are some of the subscription data:

- Billing email
- Subscription ID
- Tier details

Data from an Asgardeo subscription account is exclusively stored in the US datacenter. That is, even if you choose the EU datacenter when you create your account, this data is always created and stored in the US datacenter at present.

### Administrator data

Users onboarded to Asgardeo as [organization administrators]({{base_path}}/guides/users/manage-administrators/) are granted access to the global WSO2 services such as billing and support. Therefore, the administrator data (including profile information and login information from the billing/support portals) are also exclusively stored in the US datacenter.

The profile information of organization administrators includes all the data that organization administrators enter in their user profiles.

### End-user data

Data of your end users are only stored in the regional datacenter you selected when onboarding to Asgardeo.

## Data sharing

Some of your data, such as logs, will be accessible outside your selected region to ensure that WSO2's global entities (currently includes the USA, Sri Lanka, and Brazil) can provide technical support and other services. For example, technical support teams outside the region will need access to this data for various support and troubleshooting purposes. However, this data is stored only in the regional
datacenter that you have selected.

Therefore, note that your organization–level logs may include personal information (such as the IP addresses and email addresses) of your end users.

## Data privacy

Learn about Asgardeo's [privacy policy](https://wso2.com/asgardeo/privacy-policy/#:~:text=Asgardeo%20doesn%27t%20store%20any,API%20Services%20User%20Data%20Policy.) to understand how your data privacy is protected.

## Get support

If you require more details or have other data residency requirements for your organizations and businesses, contact the Asgardeo support team.
