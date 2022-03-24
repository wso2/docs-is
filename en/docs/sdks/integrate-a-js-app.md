# Integrate a JavaScript app
Follow the steps given below to authenticate users to a sample JavaScript service provider with OpenID Connect.

## Prerequisites
- Only customer users can log in to applications. [Create a user account](../../guides/identity-lifecycles/onboard-overview) if you don't already have one.

## Create a service provider

{!fragments/register-a-service-provider.md!}

## Basic OAuth/OpenID Connect configuration

{!fragments/oauth-app-config-basic.md!}

## Download the sample
Download the [sample JavaScript application](https://github.com/asgardeo/asgardeo-auth-spa-sdk/releases/latest/download/asgardeo-html-js-app.zip).

## Configure the sample
1. Open the `index.html` file located at the root of the project 
2. Scroll down to the `<script>` tag at the end of the body tag and find `authConfig` object and change the configurations with the relevant values.
    - **clientID** - Add the client id of the registered application. The client ID can be copied from **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** section of your service provider.

    - **serverOrigin** - `https://localhost:9443`

    - **scope** - The list of OIDC scopes that are used for requesting user information. The ``openid`` and the ``profile`` scopes are mandatory to get the ID token. You can add other OIDC scopes such as ``email``.
    ``` 
        {
            "clientID": "<client ID>",
            "serverOrigin": "https://localhost:9443",
            "signInRedirectURL": "https://localhost:5000",
            "signOutRedirectURL": "https://localhost:5000",
            "scope": [ "openid", "profile" ]
        }
    ``` 
## Run the sample

Run the following command at the root of the project to start up the sample application. The app will be accessible at `https://localhost:5000`. 

```
npm install && npm start
```

Log in to Identity Server management console using your user account credentials.