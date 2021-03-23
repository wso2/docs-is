
## Configure back-channel single logout

1. Navigate to **Identity > Service Providers > List**

2. Click **Edit** to edit the OIDC service provider you created.

3. Expand **Inbound Authentication Configuration** and then expand **OAuth/OpenID Connect Configuration**. 

4. Click **Edit**.

5. Select **Enable OIDC Backchannel Logout** and enter the Logout URL.

    !!! info
        The **Logout URL** is the service provider's back-channel logout endpoint URL to which the logout token is sent to.

6. Click **Update** to save the changes.
