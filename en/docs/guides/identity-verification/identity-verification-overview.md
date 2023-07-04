# Identity Verification

Identity verification (IDV) is a crucial component of managing user access and verifying identities in systems and platforms.
It enables organizations to confirm the identity of users through various authentication methods, such as by checking legal documents like passports, national identification cards, and driver's licenses.

IDV is a critical aspect of security and risk management, as it helps to prevent identity fraud and ensures that 
only authorized individuals have access to sensitive systems and data. By having IDV, organizations can protect 
themselves from potential threats and enhance the overall security of their systems.

## Managing Identity Verification

The WSO2 Identity Server facilitates identity verification by establishing a connection with a third-party provider through an identity verification IS connector. Within the WSO2 Identity Server, the user attribute's identity verification status is efficiently managed, along with the associated metadata from the identity verification provider.

You can use the [identity verification management API]({{base_path}}/apis/idv-rest-api.md) to add, update and delete identity verification providers

## Configuring an Identity Verification Provider

An identity verification provider (IDVP) is a third-party service used to verify a user's identity.
Through the WSO2 Identity Server, you can configure an IDVP to verify the identity of a user.

This section covers the following basic configurations of an IDVP:

- [Add a new identity verification provider](add-idvp.md)
- [Manage an identity verification provider](manage-idvp.md)
- [Onboard the UI of an identity verification provider](idvp-ui.md)