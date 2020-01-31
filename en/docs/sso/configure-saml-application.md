# Configure SAML Application for SSO

SAML (Security Assertion Markup Language) is a popular XML based protocol among the traditional web apps. You can
 refer more about how SAML works from [here](../concepts/saml.md).
 
 
## Registering a Service Provider SAML Application
 
 Each application is represented as a service provider within the WSO2 identity server. To start with, we will create
  a service provider to represent our SAML application. To do that in the identity server,
 
 {!sso/includes/register-service-provider.md!}
 
## Configuring SAML for the Service Provider
 
 {!sso/includes/register-saml-basic.md!}
  
 
## Configuring the Client Application
 In the application's SAML Configuration, make sure that you have set the following
* IdP URL
* IdP entity Id
 
 
## What's Next
 * [Configure Strong Authentication](strong-authentication.md)
 * [Configure Adaptive Authentication](adaptive-authentication.md)
 * [Transform Claims](claim-mapping.md)