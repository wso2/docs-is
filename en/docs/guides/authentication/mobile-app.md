# Enable Authentication to a mobile application using Authorization code grant with PKCE

< Intro - Step by Step guide to enable authentication for a
mobile/native application>

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Register Application

 < Description on mobile app specific config >

{!guides/authentication/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a mobile application  | 
| Call Back Url         | https://somehost/url  | 

{!guides/authentication/oauth-app-config-advanced.md!}

{!guides/authentication/configure-mobile-app.md!}

{!guides/authentication/get-user-information-to-the-application.md!}

{!guides/authentication/oidc-session-management.md!}

{!guides/authentication/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another mobile application]()
    - [Enable single logout with the other mobile application]()
    - [Check our SDKs]()