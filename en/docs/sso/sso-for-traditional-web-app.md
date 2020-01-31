# Enable Authentication to a web application using Authorization code grant in WSO2 IS.

< Introduction - This document contains an step by Step guide on to enable authentication
for a traditional web application. >

!!! Tip 
    [Try Quick Starts](../../get-started/overview)

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>

## Register Application

 < Description on web app specific config >

{!sso/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a traditional web application  | 
| Call Back Url         | https://somehost/url  | 

{!sso/oauth-app-config-advance.md!}

{!sso/configure-traditional-client-web-app.md!}

{!sso/get-user-information-to-the-application.md!}

{!sso/oidc-session-management.md!}

{!sso/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another web application]()
    - [Enable single logout with the other web application]()
    - [Check our SDKs]()