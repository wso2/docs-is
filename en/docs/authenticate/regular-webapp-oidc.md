# Enable Authentication to a web application using Authorization code grant.

< Introduction - This document contains an step by step guide on to
enable authentication for a traditional web application. >

!!! Tip 
    [Try Quick Starts](../../get-started/overview/#mobilenative-application)

## Overview
 < Explain the use case with diagrams - can be links to concepts > 
 
 < Image explaining the scenario>

## Register Application

 < Description on web app specific config >

{!authenticate/oauth-app-config-basic.md!}

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample- app  |
| Description           | This is a traditional web application  | 
| Call Back Url         | https://somehost/url  | 

{!authenticate/configure-client-regular-webapp.md!}

{!authenticate/get-user-information-to-the-application.md!}

{!authenticate/oidc-session-management.md!}

{!authenticate/oidc-logout.md!}

!!! Tip "What's Next?"

    - [Enable single sign-on with another web application]()
    - [Enable single logout with the other web application]()
    - [Check our SDKs]()