---
template: templates/complete-guide.html
heading: Configure utility functions for app-native authentication
read_time: 5 min
---

To add the utility functions required for app-native authentication, let's first create a directory named `utils` under the `src` directory of your Next.js app. This directory will contain the utility functions that we will use to manage authentication in your app.

```shell
mkdir -p src/utils
```

Create a new file named `authUtils.tsx` inside the utils directory. This file will contain functions for handling authentication requests.

```typescript jsx title="authUtils.tsx"
const getEnvVariables = () => {
    
    const organizationName = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
    const scope = process.env.NEXT_PUBLIC_SCOPE;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const emailOtpAuthenticatorId = process.env.NEXT_PUBLIC_EMAIL_OTP_AUTHENTICATOR_ID;

    if (!organizationName || !scope || !clientId || !redirectUri || !emailOtpAuthenticatorId) {
        throw new Error("Missing required environment variables");
    }

    return {
        organizationName,
        scope,
        redirectUri,
        clientId,
        emailOtpAuthenticatorId,
    };
};

export const basicAuthentication = async (flowId: string, email: string, password: string) => {

    const authnUrl = `https://api.asgardeo.io/t/${process.env.NEXT_PUBLIC_ORGANIZATION_NAME}/oauth2/authn`;
    const requestBody = {
        flowId,
        selectedAuthenticator: {
            authenticatorId: process.env.NEXT_PUBLIC_BASIC_AUTHENTICATOR_ID, // Username & Password authenticator ID
            params: {
                username: email,
                password: password,
            },
        },
    };

    try {
        const response = await fetch(authnUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Authentication request failed:", error);
        throw new Error('Authentication request failed');
    }
};

export const initRequest = async () => {

    const { organizationName, scope, redirectUri, clientId } = getEnvVariables();

    // Construct the OAuth2 authorization URL
    const authUrl = `https://api.asgardeo.io/t/${organizationName}/oauth2/authorize?` +
        `scope=${encodeURIComponent(scope || '')}&` +
        `redirect_uri=${encodeURIComponent(redirectUri || '')}&` +
        `response_type=code&` +
        `client_id=${encodeURIComponent(clientId || '')}&` +
        `response_mode=direct`;

    try {
        // Step 1: Get the authorization code from the initial OAuth2 authorization request
        const authorizeResponse = await fetch(authUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
            },
        });
        const authorizeResponseData = await authorizeResponse.json();
        return authorizeResponseData;
    } catch (error) {
        console.error("Authorization request failed:", error);
        throw new Error('Authorization request failed');
    }
};

export const authenticateWithEmailOtp = async (flowId: string, emailOtp: string) => {

    const { organizationName, emailOtpAuthenticatorId } = getEnvVariables();

    const authnUrl = `https://api.asgardeo.io/t/${organizationName}/oauth2/authn`;
    const requestBody = {
        flowId,
        selectedAuthenticator: {
            authenticatorId: emailOtpAuthenticatorId,
            params: {
                OTPCode: emailOtp,
            },
        },
    };

    try {
        const response = await fetch(authnUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Email OTP authentication request failed:", error);
        throw new Error('Email OTP authentication request failed');
    }
};

export const fetchOAuth2Token = async (organization_name: string, client_id: string, authCode: string, redirect_uri: string) => {
    const tokenUrl = `https://api.asgardeo.io/t/${organization_name}/oauth2/token`;
    const tokenRequestBody = new URLSearchParams({
      client_id: client_id,
      code: authCode,
      grant_type: "authorization_code",
      redirect_uri: redirect_uri,
    });
  
    try {
      const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: tokenRequestBody.toString(),
      });
  
      const tokenData = await tokenResponse.json();
  
      if (tokenData.id_token) {
        // Decode the ID token (JWT) to retrieve user details
        const decodedToken = JSON.parse(Buffer.from(tokenData.id_token.split('.')[1], 'base64').toString());
  
        // Assuming the decoded JWT contains these fields
        return {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          given_name: decodedToken.given_name,
          family_name: decodedToken.family_name,
          id_token: tokenData.id_token, // Store the ID token for later use
        };
      }
      return null; // Flow incomplete or failed
    } catch (error) {
      console.error("OAuth2 Authorization failed:", error);
      throw new Error('OAuth2 Authorization failed');
    }
  };
```

The following functions are defined in the `authUtils.tsx` file:

- `getEnvVariables` - This function retrieves the environment variables required for authentication from the `.env.local` file. 
- `basicAuthentication` - Invokes the Asgardeo `/oauth2/authn` API to authenticate a user using the username and password authenticator. 
- `initRequest` - This function sends an init request to the Asgardeo `/oauth2/authorize` API to initiate the authentication flow. 
- `fetchOAuth2Token` - Invokes the Asgardeo `/oauth2/token` API to fetch an OAuth2 token using the authorization code retrieved previously.

In this guide, we will also be implementing a custom `logoutFromAsgardeo` function which we will use to trigger a logout request to Asgardeo when the user logs out from your Next.js app using the previously issued id_token as the hint. Create a file named `logoutUtils.tsx` in the `/src/utils` directory and add the following code.

```typescript jsx title="logoutUtils.tsx"
export const logoutFromAsgardeo = async (idToken: string) => {
    const organization_name = process.env.NEXT_PUBLIC_ORGANIZATION_NAME;
    const logoutUrl = `https://api.asgardeo.io/t/${organization_name}/oidc/logout`;
  
    try {
      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id_token_hint: idToken,
          response_mode: 'direct',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out from Asgardeo');
      }
    } catch (error) {
      console.error("Logout request failed:", error);
      throw new Error('Logout request failed');
    }
  };
```

These utility functions will be used to manage the authentication flow in your Next.js app. Next, we will see how username and password authentication can be enabled in your app.
