# Cross Protocol Single Logout

WSO2 Identity Server supports Single Sign-On (SSO) for multiple 
applications that are using different authentication protocols. 
Just like Single Sign-On, Single Logout (SLO) allows you to logout 
all apps in the current browser session when one application performs 
a logout. Although SSO is commonly supported across different 
protocols, e.g., SAML and OIDC, SLO used to be supported only within 
the protocol of the application that initiates the logout. WSO2 
Identity Server now supports SLO across different protocols. 

For example, suppose you have logged in to two applications that use 
two different authentication protocols (OIDC and SAML) from the same 
browser using SSO. With cross-protocol logout, when you log out from 
one of these two applications, you will be automatically logged out 
from the other application despite the protocol difference. As of 
now, WSO2 Identity Server supports cross-protocol logout over SAML 
and OIDC protocols.


!!! Note
    In relation to SAML applications, cross-protocol logout is only 
    supported for SAML applications that use backchannel logout.
