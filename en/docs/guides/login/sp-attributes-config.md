# Which configuration should I use?

This page lists out all the configurations you can use when configuring attribute mappings of any service provider

### Use Local attribute Dialect

When you select this option you can pass the set of [requested attributes](insert link) to the application side without modifying the 
attribute name.

### Define Custom Dialect

When you select this option you can pass the set of requested attributes to the application with a custom name by adding a 
name for Service Provider attribute and choosing the corresponding Local Attribute.

### Mark as a Mandatory Claim

Marking a attribute as a Mandatory Attribute would ensure that the WSO2 IS will definitely send a value for this attribute to the 
application.  When a user logs in to this service provider, if the identity provider does not provide a value for any of
the mandatory attributes, the user will be prompted to provide them at the time of login.

### Mark as a Requested Claim

Marking a attribute as a Requested Attribute will send a value for this attribute to the application. But Identity Server does not 
guarantee that it will definitely send a value for this attribute. This is useful particularly in cases where there are 
hundreds of attributes and only specific ones need to be sent by the Identity Server.

### Set as Subject Claim URI

This defines the authenticated user identifier which will return with the authentication response to the service 
provider.

### Set as Role Claim URI

This defines the role attribute for the service provider. This is useful if you use a different attribute as the role attribute or 
if you define a custom attributes mapping for the service provider.

## Collecting consent for requested and mandatory claims

When the user is authenticated to the application, attributes that are indicated as required and/or mandatory in this attribute 
configuration form will be displayed in the consent request UI to prompt for the user’s consent.
If a attribute is indicated as a mandatory attribute, it will be indicated with a red color asterix ( * ) when requesting consent.
The user will not be able to proceed with authentication without providing consent for the mandatory attributes.
