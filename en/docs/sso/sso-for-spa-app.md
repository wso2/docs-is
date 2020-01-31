# Step by Step guide to enable authentication for a SPA application

< Introduction - This document contains an step by Step guide on how to
enable Authentication to a SPA with Implicit Grant. >

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Register Application

 < Description on SPA specific config >
 
{!sso/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a SPA application  | 
| Call Back Url         | https://somehost/url  | 

{!sso/oauth-app-config-advance.md!}

{!sso/configure-client-spa.md!}

{!sso/get-user-information-to-the-application.md!}

{!sso/oidc-session-management.md!}

{!sso/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another SPA application]()
    - [Enable single logout with the other SPA application]()
    - [Check our SDKs]()

