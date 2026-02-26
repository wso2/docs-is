## Allow required grant types

To ensure seamless authentication and authorization in the Teamspace application, you must allow the necessary OAuth2 grant types in {{product_name}}. These grant types allow your app to authenticate users, retrieve access tokens, and interact with {{product_name}}’s APIs securely.

### Required Grant Types for Teamspace

Based on the features we are expecting to implement, the following grant types are enabled:

- **Authorization Code Grant** – Used for user authentication and obtaining access tokens interactively.
- **Client Credentials Grant** – Allows the app to make API calls on behalf of the organization (used for retrieving a root organization token).
- **Organization Switch Grant** – Enables switching between organizations.

### How to Enable Grant Types

1. Navigate to your application in the {{product_name}} console.
2. Click on "Protocols" tab
3. Allow the above grant types and update

![App Grants]({{base_path}}/assets/img/complete-guides/nextjs-b2b/image9.png){: width="800" style="display: block; margin: 0;"}  

!!! Info
    Read more on [OAuth2 grant types]({{base_path}}/references/grant-types/){:target="\_blank"}
