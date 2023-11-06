# Organization management

When you [create an account]({{base_path}}/get-started/create-asgardeo-account/) in {{ product_name }}, you define your first organization, which functions as the super organization or tenant in your {{ product_name }} subscription. From thereon, you (the account owner) or other delegated administrators can create multiple organizations via the {{ product_name }} Console and switch between them.

Listed below are the main characteristics of an organization.
- An organization contains applications, external identity providers, and user identities belonging to a single domain.
- Users or applications created in one organization cannot access the resources of another organization unless they are onboarded to that organization.
- The administrator who creates the organization is the owner of the organization.

The organizations you create in {{ product_name }} can be structured according to your business needs as follows:

**B2C organizations**

In a B2C scenario,

- you will create an organization to represent your business.

- the organization manages the identity and access management requirements of your B2C applications and the user identities of your direct consumers.

- You may create separate organizations to replicate the environments of the application development lifecycle.

**B2B organizations**

In a B2B scenario,

- you will create an organization to represent your business, which functions as your primary organization.

- you will create subordinate organizations to onboard other business organizations (partners, suppliers, customer organizations, etc.) to your platform.

- administrators of each subordinate organization manage the respective organization's user base and define login experiences for applications according to the organization's requirements.

    <!-- Learn more about how {{ product_name }} supports B2B platforms. -->
