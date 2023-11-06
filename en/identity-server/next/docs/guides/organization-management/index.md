{% set product_name = "WSO2 Identity Server" %}
# Organization management

Listed below are the main characteristics of an organization(root).

- An organization(root) contains applications, external identity providers, and user identities belonging to a single domain.
- Users or applications created in one organization(root) cannot access the resources of another organization(root) unless they are onboarded to that organization(root).
- The administrator who creates the organization(root) is the owner of the organization(root).

The organizations you create in {{ product_name }} can be structured according to your business needs as follows:

**B2C organizations**

In a B2C scenario,

- the organization(root) represents your business.

- the organization(root) manages the identity and access management requirements of your B2C applications and the user identities of your direct consumers.

**B2B organizations**

In a B2B scenario,

- the organization(root) represents your business.

- you will create subordinate organizations to onboard other business organizations (partners, suppliers, customer organizations, etc.) to your platform.

- administrators of each subordinate organization manage the respective organization's user base and define login experiences for applications according to the organization's requirements.

    <!-- Learn more about how {{ product_name }} supports B2B platforms. -->
