# Step by Step guide to enable authentication for a SPA application

< Introduction - This document contains an step by Step guide on how to
enable Authentication to a SPA with Implicit Grant. >

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>
 
## Register Application

 < Description on SPA specific config >
 
{!fragments/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a SPA application  | 
| Call Back Url         | https://somehost/url  | 

{!guides/authentication/oauth-app-config-advanced.md!}

{!guides/authentication/configure-client-spa.md!}

{!fragments/get-user-information-to-the-oidc-application.md!}

{!fragments/oidc-session-management.md!}

{!fragments/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another SPA application]()
    - [Enable single logout with the other SPA application]()
    - [Check our SDKs]()

