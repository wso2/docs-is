# Attribute Mapping Configurations

(TODO: dev-portal-content)

This page lists out all the configurations you can use when mapping attributes for an application.

## Use Local attribute Dialect

When you select this option, you can pass the set of [requested attributes](insert link) to the application side without modifying the 
attribute name.

## Define Custom Dialect

When you select this option, you can pass the set of requested attributes to the application with a custom name by adding a 
name for the Service Provider attribute and choosing the corresponding Local Attribute.

## Mark as a Mandatory Claim

Marking an attribute as a Mandatory Attribute would ensure that the WSO2 IS will definitely send a value for this attribute to the 
application.  When a user logs in to this service provider, if the identity provider does not provide a value for any of
the mandatory attributes, the user will be prompted to provide them at the time of login.

## Mark as a Requested Claim

Marking an attribute as a Requested Attribute will send a value for this attribute to the application. However, WSO2 Identity Server does not 
guarantee that it will definitely send a value for this attribute. This is useful particularly in cases where there are 
hundreds of attributes and only specific ones need to be sent by the WSO2 Identity Server.

## Set as Subject Claim URI

This defines the authenticated user identifier which will be returned with the authentication response to the service 
provider.

## Set as Role Claim URI

This defines the role attribute for the service provider. This is useful if you use a different attribute as the role attribute or 
if you define custom attributes mapping for the service provider.

## Collecting consent for requested and mandatory claims

When the user is authenticated to the application, attributes that are indicated as required and/or mandatory in this attribute 
configuration form will be displayed in the consent request UI to prompt for the user’s consent.
If an attribute is indicated as a mandatory attribute, it will be indicated with a red asterix ( * ) when requesting for consent.
The user will not be able to proceed with authentication without providing consent for the mandatory attributes.

!!! info "Related Topics"
    - [Guide: Request Attributes for the Application](../request-attributes)
    - [Demo: Request Attributes for the Application](TODO:insert-link-to-sample)
