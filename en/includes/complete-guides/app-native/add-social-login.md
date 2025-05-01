

To enable social login in your app, you need to register your application with the social login provider and configure the necessary settings. This step will walk you through the process of adding social login to your app using the app-native authentication APIs in {{product_name}}. For the purpose of this guide we will use Google as the social login option.

First, follow the guidance provided in our [documentation]({{ base_path }}/guides/authentication/social-login/add-google-login/) to configure Google as a connection in {{product_name}} while taking a note of the values to be configured as provided below. 

- **Authorized JavaScript origins**: `http://localhost:3000`
- **Authorized Redirect URI**:  `http://localhost:3000/api/auth/callback/google`

We need to configure the above values (make sure they contain the hostname/port combination utilized in your application) instead of the values suggested in the documentation because we are using app-native authentication and require the application to handle the callback from Google first before redirecting to the {{product_name}} APIs.

Let's now set up Google as an option as the first authentication step in your {{product_name}} application as given below.

- Navigate to the {{product_name}} Console and select your application under the **Applications** tab.
- Click on the **Login Flow** tab.
- Click on the **Add Sign In Option** button as shown below and add the Google connection from the popup prompt.
  ![Visual Editor]({{base_path}}/assets/img/complete-guides/app-native/image14.png){: width="800" style="display: block; margin: 0;"}
- Click on the **Update** button to save the changes.

Once this is added to the login flow as one of the first factor options, we can proceed to integrate it into our Next.js application.

When there are multiple authentication options in a given authentication step, it is required to invoke a separate `/oauth2/authn` API call to retrieve additional details about a given authenticator as mentioned in the [documentation]({{ base_path }}/references/app-native-authentication/).

Navigate to the `authUtils.tsx` file under the `/src/components` directory and add the following function to retrieve the Google authenticator details.

```shell title="authUtils.tsx"
export const selectAuthenticator = async (flowId: string, authenticatorId: string) => {

    const authnUrl = `https://api.asgardeo.io/t/${process.env.NEXT_PUBLIC_ORGANIZATION_NAME}/oauth2/authn`;
    const requestBody = {
        flowId,
        selectedAuthenticator: {
            authenticatorId,
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
        console.debug("Auth request response: ", data);

        return data;
    } catch (error) {
        console.error("Authentication request failed:", error);
        throw new Error('Authentication request failed');
    }
};
```

Next, create a file named `cookieUtils.tsx` in the `/src/utils` directory using the following command.

```shell
touch src/utils/cookieUtils.tsx
```

This file will contain a function invoked for managing cookies, especially the `flowId` attribute utilized in the {{product_name}} app-native authentication APIs in your Next.js app.

```shell title="cookieUtils.tsx"
export const setFlowIdCookie = async (flowId: string) => {
    try {
        document.cookie = `flowId=${flowId}; path=/; secure; HttpOnly`;

        // Call the API endpoint to set the flowId cookie with HttpOnly flag
        const response = await fetch('/api/set-flowid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ flowId }),
        });

        if (!response.ok) {
            throw new Error('Failed to set flowId cookie');
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error setting flowId cookie:', error);
    }
};
```

We should also implement the API endpoint that sets the `flowId` cookie. Create a directory named `set-flowid` in the `/src/app/api` directory

```shell
mkdir -p src/app/api/set-flowid
```

Create a new file named `route.tsx` using the command given below.

```shell
touch src/app/api/set-flowid/route.tsx
```

Now add the following code snippet.

```shell title="set-flowid.tsx"
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { flowId } = await req.json();
    
    if (!flowId) {
        return NextResponse.json({ error: 'Missing flowId' }, { status: 400 });
    }

    // Set the flowId into a cookie with HttpOnly flag
    const response = NextResponse.json({ message: 'FlowId cookie set' });
    response.cookies.set('flowId', flowId, { httpOnly: true, path: '/' });
    return response;
}
```

Now that the utility functions are added, we can proceed to create a component for the social login button component for Google.

Create a new file named `SignInWithGoogle.tsx` in the `/src/components` directory using the following command.

```shell
touch src/components/SignInWithGoogle.tsx
```

Then add the following code snippet.

```shell title="SignInWithGoogle.tsx"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { initRequest, selectAuthenticator } from '../utils/authUtils';
import { setFlowIdCookie } from '../utils/cookieUtils';

const SignInWithGoogle: React.FC = () => {
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
        if (!redirectUri) {
            setError("Redirect URI is missing.");
            return;
        }

        try {
            const authorizeResponseData = await initRequest(redirectUri);
            const flowId = authorizeResponseData.flowId;
            sessionStorage.setItem('flowId', flowId);
            try {
                // Set the flowId into a cookie
                await setFlowIdCookie(flowId);
            } catch (error) {
                console.error('Error setting flowId cookie:', error);
            }
            const googleAuthenticatorId = process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATOR_ID;
            // Step 2: Make a POST request to the {{product_name}} API
            if (!googleAuthenticatorId) {
                setError("A problem was encountered with the application configuration for Google sign-in.");
                return;
            }
            const authnResponseData = await selectAuthenticator(flowId, googleAuthenticatorId);

            if (authnResponseData.flowStatus === "INCOMPLETE" && authnResponseData.nextStep.authenticators[0].metadata.promptType === "REDIRECTION_PROMPT") {
                const redirectUrl = authnResponseData.nextStep.authenticators[0].metadata.additionalData.redirectUrl;
                // Step 3: Redirect the user to the Google authorization URL
                window.location.href = redirectUrl;
            } else {
                setError("Google authentication failed.");
            }
        } catch (error) {
            console.error("Google sign-in failed:", error);
            setError("An error occurred during Google sign-in.");
        }
    };

    return (
        <div className='flex justify-center'>
            {error && <p className="error">{error}</p>}
            <button onClick={handleGoogleSignIn} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInWithGoogle;
```

We will now utilize this component in the login page of our Next.js application. Navigate to the `page.tsx` file under the `/src/app/auth/signin` directory and add the following code to include the Google sign-in button.

```shell title="page.tsx" hl_lines="7 45-50"
"use client"

import { useState, useEffect } from 'react';
import { initRequest } from '../../../utils/authUtils';
import FormContainer from '../../../components/FormContainer';
import UsernamePasswordForm from '../../../components/UsernamePasswordForm';
import SignInWithGoogle from '../../../components/SignInWithGoogle';

const Login = () => {
    const [error, setError] = useState<string>('');
    const [authenticators, setAuthenticators] = useState<any[]>([]);

    useEffect(() => {
        // Code logic to be invoked on page load
        const fetchAuthenticators = async () => {
            try {
                // Step 1: Get the authorization code from the initial OAuth2 authorization request
                const authorizeResponseData = await initRequest(process.env.NEXT_PUBLIC_REDIRECT_URI as string);
                
                if (authorizeResponseData.flowStatus === "INCOMPLETE") {
                    // Store flowId in session storage to avoid showing it to the user
                    const flowId = authorizeResponseData.flowId;
                    sessionStorage.setItem('flowId', flowId);
                    // Set authenticators to state
                    setAuthenticators(authorizeResponseData.nextStep.authenticators);
                }
            } catch (error) {
                console.error("Authorization failed:", error);
                setError("An error occurred during authorization.");
            }
        };

        fetchAuthenticators();
    }, []);

    return (
        <FormContainer>
            <h2 className='flex justify-center'>Sign In</h2>
            {error && <p className="error">{error}</p>}
            {authenticators.map(authenticator => (
                authenticator.authenticatorId === process.env.NEXT_PUBLIC_BASIC_AUTHENTICATOR_ID ? (
                        <UsernamePasswordForm flowId={sessionStorage.getItem('flowId') as string} key={authenticator.authenticatorId} setError={setError} />
                ) : null
            ))}
            <br />
            {authenticators.map(authenticator => (
                authenticator.authenticatorId === process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATOR_ID ? (
                    <SignInWithGoogle key={authenticator.authenticatorId} />
                ) : null
            ))}
        </FormContainer>
    );
};

export default Login;
```

Once the user clicks the `Sign in with Google` button, the user will be redirected to the Google sign-in page. After the user successfully signs in with Google, the user will be redirected back to the application with the necessary details to complete the authentication flow.

Since we need to do additional processing after the Google sign-in, we need to handle the callback URL in the application. Create a new directory named `google` in the `src/app/api/auth/callback/` directory. 

```shell
mkdir -p src/app/api/auth/callback/google
```

Create a file named `route.tsx` using the following command

```shell
touch src/app/api/auth/callback/google/route.tsx
```

Add the following code snippet.

```shell title="route.tsx"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    // Read the code and state from query parameters
    const code = req.nextUrl.searchParams.get('code');
    const state = req.nextUrl.searchParams.get('state');

    if (!code || !state) {
        return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
    }

    // Read the flowId from cookies
    const flowId = req.cookies.get('flowId');
    if (!flowId) {
        return NextResponse.json({ error: 'Flow ID is missing.' }, { status: 400 });
    }

   const authnUrl = `https://api.asgardeo.io/t/${process.env.NEXT_PUBLIC_ORGANIZATION_NAME}/oauth2/authn`;
    const requestBody = {
        flowId: flowId?.value,
        selectedAuthenticator: {
            authenticatorId: process.env.NEXT_PUBLIC_GOOGLE_AUTHENTICATOR_ID,
            params: {
                code,
                state,
            },
        },
    };
    try {
        // Make a POST request to the {{product_name}} API with the code and state
        const authnResponse = await fetch(authnUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const authnResponseData = await authnResponse.json();

        if (authnResponseData.flowStatus === "SUCCESS_COMPLETED") {
            // Redirect to a client-side route with the necessary data
            const redirectUrl = new URL('/auth/callback', req.url);
            redirectUrl.searchParams.set('code', authnResponseData.authData.code);
            return NextResponse.redirect(redirectUrl.toString());
        } else if (authnResponseData.flowStatus === "INCOMPLETE" && authnResponseData.nextStep.authenticators[0].authenticatorId === process.env.NEXT_PUBLIC_EMAIL_OTP_AUTHENTICATOR_ID) {
            // Redirect to a client-side route with the necessary data
            const redirectUrl = new URL('/auth/emailotp', req.url);
            redirectUrl.searchParams.set('isGoogleAuthenticator', 'true');
            return NextResponse.redirect(redirectUrl.toString());
        } else {
            // Clear the cookies if authentication fails
            const response = NextResponse.json({ error: 'Authentication failed.' }, { status: 400 });
            response.cookies.set('auth-code', '', { maxAge: 0, path: '/' });
            response.cookies.set('auth-state', '', { maxAge: 0, path: '/' });
            response.cookies.set('flowId', '', { maxAge: 0, path: '/' });
            return response;
        }
    } catch (error) {
        console.error("Google sign-in failed:", error);
        // Clear the cookies if an error occurs
        const response = NextResponse.json({ error: 'An error occurred during Google sign-in.' }, { status: 500 });
        response.cookies.set('auth-code', '', { maxAge: 0, path: '/' });
        response.cookies.set('auth-state', '', { maxAge: 0, path: '/' });
        response.cookies.set('flowId', '', { maxAge: 0, path: '/' });
        return response;
    }
}
```

Since we are utilizing a separate redirect URI for Google sign-in, which consists of the API callback we created, we also need to pass the correct redirect URI to the `/oauth2/token` endpoint. Add the following code in the `src/auth.tsx` file to perform this validation and pass in the correct redirect URI.

```shell title="auth.tsx" hl_lines="12 19-21"
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchOAuth2Token } from './utils/authUtils';
import { logoutFromAsgardeo } from './utils/logoutUtils';

const options: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Asgardeo OAuth2",
      credentials: {
        code: { label: "Code", type: "text" },
        isGoogleAuthenticator: { label: "Google Authenticator", type: "boolean" },
      },
      async authorize(credentials, req) {
        let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
        if (!redirect_uri) {
          throw new Error("Missing required environment variables");
        }
        if (credentials.isGoogleAuthenticator === 'true') {
          redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
        }
        try {
          // Step 3: Use the authorization code to get the access token and user details
          const authCode = credentials.code as string;

          const tokenData = await fetchOAuth2Token(authCode, redirect_uri as string);

          if (tokenData) {
            return {
              id: tokenData.id,
              name: tokenData.name,
              email: tokenData.email,
              given_name: tokenData.given_name,
              family_name: tokenData.family_name,
              id_token: tokenData.id_token, // Store the ID token for later use
            };
          }

          return null; // Flow incomplete or failed
        } catch (error) {
          console.error("OAuth2 Authorization failed:", error);
          return null; // Return null in case of any error
        }
      }
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT to manage the session
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    signOut: '/auth/signout',
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.given_name = user.given_name;
        token.family_name = user.family_name;
        token.id_token = user.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.given_name = token.given_name as string;
        session.user.family_name = token.family_name as string;
        session.user.id_token = token.id_token as string;
      }
      return session;
    },
  },
  events: {
    async signOut(message) {

      if ('token' in message && message.token?.id_token) {
        try {
          await logoutFromAsgardeo(message.token.id_token as string);
        } catch (error) {
          console.error("Error during sign-out:", error);
        }
      } else {
        console.warn('No ID token available for logout');
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(options);
```

In order to retrieve the `code` and `state` parameters that are returned to the callback by Google, we can utilize the middleware function in Auth.js so that we can extract these parameters from the request and modify the response with cookies set to the respective values. Create a new file named `middleware.tsx` under the `/src` directory using the following command.

```shell
touch src/middleware.tsx
```

Now add the following.

```shell title="middleware.tsx"
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const { nextUrl } = req;

    // Check if the request is already for the callback URL
    if (nextUrl.pathname === '/api/auth/callback/google') {
        return NextResponse.next();
    }

    if (nextUrl.searchParams.get('code') && nextUrl.searchParams.get('state')) {
        // Call NextAuth to handle the login process
        const code = nextUrl.searchParams.get('code');
        const state = nextUrl.searchParams.get('state');

        // Set the code and state into cookies
        const response = NextResponse.next();
        response.cookies.set('auth-code', code || '', { httpOnly: true, path: '/' });
        response.cookies.set('auth-state', state || '', { httpOnly: true, path: '/' });
        
        // Construct the callback URL
        const callbackUrl = new URL(nextUrl.pathname, req.url);
        callbackUrl.searchParams.set('code', code || '');
        callbackUrl.searchParams.set('state', state || '');

        // Redirect to the callback URL
        return NextResponse.redirect(callbackUrl);
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

Now update the `src/app/auth/emailotp/page.tsx` file to include the necessary logic to set the correct redirect URI for a Google sign-in flow.

```shell title="page.tsx" hl_lines="22-24 44 51"
"use client"

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { authenticateWithEmailOtp } from '../../../utils/authUtils';
import SubmitButton from '../../../components/SubmitButton';
import FormContainer from '../../../components/FormContainer';

const EmailOTP = () => {
    const searchParams = useSearchParams();
    const [emailOtp, setEmailOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const [flowId, setFlowId] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve flowId from sessionStorage
        const storedFlowId = sessionStorage.getItem('flowId');
        setFlowId(storedFlowId);

        // Set isGoogleAuthenticator in sessionStorage
        const isGoogleAuthenticator = searchParams.get('isGoogleAuthenticator') === 'true';
        sessionStorage.setItem('isGoogleAuthenticator', isGoogleAuthenticator.toString());
    }, [searchParams]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!emailOtp) {
            setError('Please enter your Email OTP value.');
            return;
        }

        if (!flowId) {
            setError('Flow ID is missing.');
            return;
        }

        const authnResponseData = await authenticateWithEmailOtp(flowId, emailOtp);

        if (authnResponseData.flowStatus === "SUCCESS_COMPLETED") {

            const isGoogleAuthenticator = sessionStorage.getItem('isGoogleAuthenticator');

            const code = authnResponseData.authData.code;
            // Call NextAuth to handle the login process
            const result = await signIn("credentials", {
                redirect: false,
                code,
                isGoogleAuthenticator: isGoogleAuthenticator
            });

            if (result?.error) {
                setError("Invalid Email OTP token");
            } else {
                // Redirect to dashboard on successful login
                router.push("/");
            }
        }
    };

    return (
        <FormContainer>
            <h2 className='flex justify-center'>Enter Email OTP</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="emailOtp">Email OTP Value:</label>
                    <input
                        type="text"
                        id="emailOtp"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className='flex justify-center'>
                    <SubmitButton label="Submit" />
                </div>
            </form>
        </FormContainer>
    );
};

export default EmailOTP;
```

You should now be able to successfully sign in with Google in your Next.js application. After clicking on the `Sign In With Google` button, the user will be redirected to the Google sign-in page, and upon successful sign-in, the user will be redirected back to the application to complete the second authentication step (i.e. in this case email OTP) before being redirected to the home page. After signing in you should be able to see the relevant user's first and last name along with the `Sign Out` button.

![Sign In With Google Button]({{base_path}}/assets/img/complete-guides/app-native/image15.png){: width="800" style="display: block; margin: 0;"}
