# Enable Login for a WS-Federation Web Application

This page guides you through enabling login for a WS-Federation based web application. 

!!! info 
    WSO2 Identity Server's passive security token service (Passive STS) is used as the WS-Federation implementation. 
    The Passive STS is capable of issuing SAML 1.1 and 2.0 security tokens.
	To request a SAML 2.0 security token, the Request Security Token (RST) should be sent to the passive STS endpoint 
	with the TokenType `SAMLV2.0` when sending the token request. If there is no RST specified, WSO2 Identity Server 
	will issue a SAML 1.1 token by default.

## Create a service provider

{!fragments/register-a-service-provider.md!}

{!fragments/ws-fed-app-config.md!}

