# Identity Verification

Identity verification (IDV) is a crucial component of managing user access and verifying identities in systems and platforms. It enables organizations to confirm the identity of users through various authentication methods, such as by checking legal documents, like passports, national identification cards, and driver's licenses.

IDV is a critical aspect of security and risk management, as it helps to prevent identity fraud and ensures that only authorized individuals have access to sensitive systems and data. By having IDV, organizations can protect themselves from potential threats and enhance the overall security of their systems.

## Managing Identity Verification

The {{ product_name }} facilitates identity verification by establishing a connection with a third-party provider through an identity verification connector. Within the {{ product_name }}, the user attribute's identity verification status is efficiently managed, along with the associated metadata from the identity verification provider.

You can use the [Identity Verification Provider management API](../../apis/identity-verification-providers.md) to add, update and delete identity verification providers.

## Configuring an Identity Verification Provider

An identity verification provider (IDVP) is a third-party service that is used to verify the identity of a user. Through {{ product_name }}, you can configure an IDVP to verify the identity of a user.

- [Create a new Identity Verification Provider](add-identity-verification-provider.md)
- [Manage created Identity Verification Providers](manage-identity-verification-provider.md)