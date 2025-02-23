---
template: templates/complete-guide.html
heading: Allow required grant types
read_time: 1 min
---

To ensure seamless authentication and authorization in your B2B application, Teamspace, you must allow the necessary OAuth2 grant types in {{product_name}}. These grant types allow your app to authenticate users, retrieve access tokens, and interact with {{product_name}}’s APIs securely.

## Required Grant Types for Your B2B App

Based on the features we are expecting to implement, the following grant types are enabled:

- Authorization Code Grant – Used for user authentication and obtaining access tokens interactively.
- Client Credentials Grant – Allows the app to make API calls on behalf of the organization (used for retrieving a root organization token).
- Organization Switch Grant – Enables switching between organizations in a B2B multi-tenanted setup.

## How to Enable Grant Types

1. Navigate to your application in the {{product_name}} console.
2. Click on "Protocols" tab
3. Allow the above grant types and update

![App Grants]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image9.png){: width="600" style="display: block; margin: 0;"}  

!!! Info
    Read more on [OAuth2 grant types]({{base_path}}/references/grant-types/)
