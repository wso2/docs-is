# Identity Verification

Identity verification(IDV), is a crucial component of managing user access and verifying identities in systems and platforms. 
It enables organizations to confirm the identity of users through various authentication methods, such as by 
checking legal documents, like passports, national identification cards, and driver's licenses.

IDV is a critical aspect of security and risk management, as it helps to prevent identity fraud and ensures that 
only authorized individuals have access to sensitive systems and data. By having IDV, organizations can protect 
themselves from potential threats and enhance the overall security of their systems.

## Managing Identity Verification

The user identity verification data are handled in WSO2 Identity Server and identity verification is primarily handled by the WSO2 Identity Server. 
- [Identity verification management API](../../apis/idv-rest-api.md)

## Configuring an Identity Verification Provider

An identity verification provider (IDVP) is a third-party service that is used to verify the identity of a user. 
Through Identity Server, you can configure an IDVP to verify the identity of a user. In order to onboard IDVP connectors,
you have to deploy the required IDVP connectors from the connector store.

In order to onboard an IDVP to WSO2 Identity Server, you need to deploy the identity verification connector artifacts .

This section covers the basic configurations of an IDVP. Following are the configurations covered in this section:

- [Add a new identity verification provider](add-idvp.md)
- [Manage an identity verification provider](manage-idvp.md)
- [Onboarding the UI of an identity verification provider](idvp-ui.md)
