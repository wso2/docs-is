# Migrate users to Asgardeo

Owners of organizations in Asgardeo may need to migrate users from an existing identity provider (IdP) to the Asgardeo user store. This guide explains why you may need user migration and how to get it done.

## When is user migration required?

You may need to migrate users from an external IdP to Asgardeo if the organization requires:

* To combine users from multiple systems to one IdP for proper user management.
* To reorganize, restructure, and simplify data storage.
* To combine user data storages for centralized user management during company acquisitions and mergers.
* To move or separate identity data due to geopolitical, data protection, compliance, and regulatory reasons.
* Effective identity management that can provide additional protection over user data storage, scalability in IAM, and minimal maintenance costs.

## How to migrate users to Asgardeo?

You can contact the Asgardeo team at **asgardeo-help@wso2.com** for guidance on migrating your existing user base from your current IdP to your Asgardeo user store.

!!! note
    Make sure you use your owner account or an administrator account to send the request.

Alternatively, you can use traditional approaches to user migration. However, these methods run with challenges as listed in the section below.

## Challenges of traditional user migration

Identity providers generally support various automatic user migration methods, which help administrators import user records (including group details, attributes, and other characteristics) from external systems.

These traditional methods come with various challenges as explained below, which become an operational overhead for administrators and provide a bad user experience:

* **Credential transition**

    Identity providers use hashing algorithms to store user passwords securely. The password policies and hashing mechanisms vary across different IdPs. Due to this, a hashed password on one system will not be usable on another.

* **Schema matching**

    The schemas of one system might not match the schemas of the other system to which the organization is migrating. In such scenarios, the administrators will experience the overhead of matching the schemas one-to-one.

* **End-user experience**

    Due to the challenge of credential transition, when migrating users in bulk, the following methods are used to activate the user accounts:
  
    * Setting a temporary password for each user.
    * Sending an invitation email with a password reset link.

    The invitation emails may be missed out or ignored by the users, and users may even try to use the old password on the new systems. This causes user dissatisfaction with the organization.

!!! note
    All the challenges mentioned above are handled by the Asgardeo team during user migration. This reduces the operational overhead on administrators and provides end-users with a better user experience.