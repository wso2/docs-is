# Configure WS-Federation Single Sign-On

This page guides you through enabling [single sign-on](../../../references/concepts/single-sign-on) (SSO) for a WS-Federation based application using WSO2 Identity Server.

!!! info 
    WSO2 Identity Server's passive security token service (Passive STS) is used as the WS-Federation implementation. 
    The Passive STS is capable of issuing SAML 1.1 and 2.0 security tokens.
	To request a SAML 2.0 security token, the Request Security Token (RST) should be sent to the passive STS endpoint 
	with the TokenType `SAMLV2.0` when sending the token request. If there is no RST specified, WSO2 Identity Server 
	will issue a SAML 1.1 token by default.

## Create a service provider

{!fragments/register-a-service-provider.md!}

{!fragments/ws-fed-app-config.md!}

!!! info "Related Topics"
    - [Concept: Single Sign-On](../../../references/concepts/single-sign-on)
