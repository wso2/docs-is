# Configure FIDO for 2-Factor Authentication

This page guides you through configuring [two-factor authentication](../../../concepts/authentication/intro-authentication#two-factor-authentication) for a web application using [FIDO](insertlink) as the second factor. 

----

## Prerequisites

Certain changes made to the chrome u2f extension are causing the FIDO device to not register properly as an authentication factor. Additionally, Firefox no longer supports the u2f extension. WSO2 Identity Server resolves this by using the WebAuthn API to enable FIDO-based authentication. The WebAuthn API is already supported by the following browser versions:

-   Chrome(CHROME 67) 
-   Firefox (FIREFOX 60)
-   Edge (EDGE 17723)

!!! info
    See [browser support for FIDO](#browser-support-for-fido) for more information. 

Follow the steps given below to define the set of origin URLs where the WSO2 Identity Server User Portal will be hosted (e.g., `https://localhost:9443`). 

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
2. Add the following configuration.
    ```toml
    [fido.trusted]
    origins=["https://localhost:9443"]
    ``` 

Follow the steps given below if you are using a reverse proxy enabled setup to configure the relevant server URL as the AppID.

1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
2. Add the following configuration.
    ```toml
    [authentication.authenticator.fido.parameters]
    app_id="https://hostname"
    ```

----

{!fragments/register-a-service-provider.md!}

4. Expand the **Local & Outbound Authentication Configuration** section.

5. Click the **Advanced Configuration** radio button. 

6. Add the following authentication steps. 
    - **Step 1**
        1. Click **Add Authentication Step**.

        2. Select `basic` under **Local Authenticators** and click **Add Authenticator** to add the basic authentication as the first step.

            Adding basic authentication as a first step ensures that the first step of authentication will be done using the user's credentials that are configured with the WSO2 Identity Server.

    - **Step 2**
        1. Click **Add Authentication Step**.

        2. Select `fido` under **Local Authenticators** and click **Add Authenticator** to add FIDO authentication as the second step.

            Adding FIDO as a second step adds another layer of authentication and security.
    
        <img name='fido-authentication-steps' src='../../../assets/img/guides/fido-authentication-steps.png' class='img-zoomable'/>
    
    !!! warning
        The FIDO authenticator can be configured only after a local authenticator is configured in one of the previous steps. It cannot be configured as the first step and cannot be configured if a federated authenticator is set as the subject identifier.

7. Click **Update** to save the changes.

You have successfully configured FIDO as the second factor of authentication. To test this out, see the [user portal help](insertlink).

----

## Disable FIDO authenticator

The SMS OTP authenticator is enabled by default.

You can disable the FIDO authenticator by adding the following configuration to the `deployment.toml` file in the
`<IS_HOME>/repository/conf` folder.

```toml
[authentication.authenticator.fido]
enable=false
```

----

## Customize the FIDO login page

Optionally, you can customize the FIDO authentication page and configure WSO2 Identity Server to redirect to your own login page. To do this,  add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.fido.parameters]
authentication_page_url= "/authenticationendpoint/fido-auth.jsp"
```

----

## Browser support for FIDO

The <https://demo.yubico.com/u2f> site can be used to check the browser support for FIDO devices.

As for now, Google Chrome (version 38 or later) has support for FIDO devices. Firefox does not support FIDO natively. An add-on must be added to Firefox to support FIDO devices. You can download and install the add-on from [here](https://addons.mozilla.org/en-US/firefox/addon/u2f-support-add-on/).