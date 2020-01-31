# Enable Authentication to a mobile application using Authorization code grant with PKCE

< Intro - Step by Step guide to enable authentication for a
mobile/native application>

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Register Application

 < Description on mobile app specific config >

{!sso/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a mobile application  | 
| Call Back Url         | https://somehost/url  | 

{!sso/oauth-app-config-advance.md!}

{!sso/configure-mobile-app.md!}

{!sso/get-user-information-to-the-application.md!}

{!sso/oidc-session-management.md!}

{!sso/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another mobile application]()
    - [Enable single logout with the other mobile application]()
    - [Check our SDKs]()