

Let's now implement login and logout functionality using the Auth.js library in your Next.js app. Auth.js provides convenient methods to handle login (signIn) and logout (signOut), which can be directly invoked in your components to manage user sessions.
You can find a reference in auth.js documentation [here](https://authjs.dev/getting-started/session-management/login){:target="_blank"}.

The `next-auth.d.ts` file is used to extend and customize the TypeScript types provided by the next-auth library. By default, Auth.js comes with its own type definitions, but sometimes you may need to add additional properties to the User or other interfaces to match your application's requirements. This file allows you to declare additional properties and ensure that TypeScript understands these customizations. Let's create a directory to place this file with the following command.

```shell 
mkdir src/app/types
```

Now create a file named `next-auth.d.ts` under the `/src/app/types` directory using the following commands

```shell
touch src/app/types/next-auth.d.ts
```

Then add the following code to extend the User interface with additional properties.

```typescript title="next-auth.d.ts"
import { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
    interface User {
        id_token?: string;
        given_name?: string;
        family_name?: string;
        username?: string;
        name?: string;
    }
}
```

Next navigate to the `globals.css` file under the `/src/app` directory and add the following simple styles which we will be utilizing to display the bare minimum UI for the application.

```css title="globals.css"
.error {
  color: red;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  color: black;
}

.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.signout-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Create a directory named `components` under the `/src` directory to store the components that we will be creating for the login and logout functionality.

```shell
mkdir src/components
```

Now create a file named `Home.tsx`.

```shell
touch src/components/Home.tsx
```

Then add the following code.

```shell title="Home.tsx"

"use client";

import { useSession } from "next-auth/react";
import Link from 'next/link';

const HomeComponent: React.FC = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
                {
                    !session ? (
                        // Show Sign In Button if user is not logged in
                        <Link href="/auth/signin">
                            <button
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                                type="button"
                                rel="noopener noreferrer"
                            >
                                Sign In
                            </button>
                        </Link>
                    ) : (
                        // Show Sign Out Button and user's name if logged in
                        <>
                        <div className='signout-div'>
                        <p className="text-center mb-3">
                            Welcome, {`${session?.user?.given_name} ${session?.user?.family_name}`}
                        </p> <br />
                        </div>
                    </>
                    )
                }
            </div>
        </>
    );
};

export default HomeComponent;
```

In the above code snippet, we have used the `useSession()` hook from the `next-auth/react` package to access the user session data. The `session` object contains the user's information, such as the user's name, email, and other details. We have used this information to display a welcome message to the user when they are logged in. If the user is not logged in, a "Sign In" button is displayed, which redirects the user to the sign-in page when clicked.

Also notice the Link component from the `next/link` package, which is used to navigate to the sign-in page using the route `/auth/signin` (which we will be looking into later in this guide) when the `Sign In` button is clicked.

Since we are using the `useSession()` hook, we need to ensure that the `SessionProvider` is available at the root level of the application. To do this, we need to update the `layout.tsx` file under the `/src/app` directory as follows.

```shell title="layout.tsx" hl_lines="4 31 33"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

Let's create a sign-out button component to allow users to sign out of the application. Create a file named `SignOutButton.tsx` under the `/src/components` directory using the following command.

```shell
touch src/components/SignOutButton.tsx
```

Then add the following code.

```shell title="SignOutButton.tsx"
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutButton: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Log the user out of NextAuth and redirect them to the {{product_name}} logout API
      await signOut({ redirect: false });

      // Redirect the user to the custom signout route where we handle {{product_name}} logout
      router.push("/api/auth/signout");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
      <div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Sign Out
        </button>
      </div>
  );
};

export default SignOutButton;
```

Now we can add the `SignOutButton` component to the `Home.tsx` file. Update the `Home.tsx` file as shown below.

```shell title="Home.tsx" hl_lines="4 32"
"use client";

import { useSession } from "next-auth/react";
import SignOutButton from "@/components/SignOutButton";
import Link from 'next/link';

const HomeComponent: React.FC = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
                {
                    !session ? (
                        // Show Sign In Button if user is not logged in
                        <Link href="/auth/signin">
                            <button
                                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                                type="button"
                                rel="noopener noreferrer"
                            >
                                Sign In
                            </button>
                        </Link>
                    ) : (
                        // Show Sign Out Button and user's name if logged in
                        <>
                            <div className='signout-div'>
                                <p className="text-center mb-3">
                                    Welcome, {`${session?.user?.given_name} ${session?.user?.family_name}`}
                                </p> <br />
                                <SignOutButton />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default HomeComponent;
```

Now that we have completed the home page of the application, we need to make sure that this page is displayed at the root path of the application. We will now import the `HomeComponent` to the `page.tsx` file under the `/src/app` directory. Navigate to this file and remove the existing content before adding the following code.

```shell title="page.tsx"
import HomeComponent from "@/components/Home";

export default async function Home() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <HomeComponent />
        </main>
      </div>
  );
}
```

You will now see the `Sign In` button on the home page when you run the application using `npm run dev`. Clicking this button will show you a 404 not found page as we have not told the application what to do when a user is redirected to `/auth/signin`.

![Sign In Button]({{base_path}}/assets/img/complete-guides/app-native/image10.png){: width="800" style="display: block; margin: 0;"}

In order to handle the sign-in process, we will create a login form where the user can provide their username and password in order to authenticate via {{product_name}} app-native authentication APIs.

First, let's create a new file named `FormContainer.tsx` under the `/src/components` directory using the following command

```shell
touch src/components/FormContainer.tsx
```

Then add the following code. This will contain a basic `div` element with a border that we can utilize for any form in the application.

```shell title="FormContainer.tsx"
import React from 'react';

interface FormContainerProps {
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
    return (
        <div className="form-container">
            {children}
        </div>
    );
};

export default FormContainer;
```

We will now create a component for the submit button. Create a file named `SubmitButton.tsx` under the `/src/components` directory using the following command.

```shell
touch src/components/SubmitButton.tsx
```

Now add the following code.

```shell title="SubmitButton.tsx"
import React from 'react';

interface SubmitButtonProps {
    label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
    return (
        <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            {label}
        </button>
    );
};

export default SubmitButton;
```

Now let's create a login form component for the user to enter their username and password. Create a file named `UserNamePasswordForm.tsx` under the `/src/components` directory with the following command.

```shell
touch src/components/UsernamePasswordForm.tsx
```

Add the following code to the created file.

```shell title="UsernamePasswordForm.tsx"
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { basicAuthentication } from '../utils/authUtils';
import { signIn } from 'next-auth/react';
import SubmitButton from './SubmitButton';

interface UsernamePasswordFormProps {
    flowId: string;
    setError: (error: string) => void;
}

const UsernamePasswordForm: React.FC<UsernamePasswordFormProps> = ({ flowId, setError }) => {
    
    const [credentials, setCredentials] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!credentials.email || !credentials.password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            // Step 2: Authenticate the user with credentials and get the authorization code
            const authnResponseData = await basicAuthentication(flowId, credentials.email, credentials.password);

            if (authnResponseData.flowStatus === "SUCCESS_COMPLETED") {
                const code = authnResponseData.authData.code;
                // Call NextAuth to handle the login process
                const result = await signIn("credentials", {
                    redirect: false,
                    code
                });

                if (result?.error) {
                    setError("Invalid username or password");
                } else {
                    // Redirect to dashboard on successful login
                    router.push('/');
                }
            } else {
                setError("Authentication failed.");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            setError("An error occurred during authentication.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email Address:</label>
                <input
                    type="email"
                    id="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                    autoComplete="username"
                    className="input-field"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    autoComplete="current-password"
                    className="input-field"
                />
            </div>
            <div className='flex justify-center'>
                <SubmitButton label="Submit" />
            </div>
        </form>
    );
};

export default UsernamePasswordForm;
```

Now let's create the API callback handler for the `/auth/signin` route. Create a directory named `signin` under the `src/app/auth` directory using the following command. 

```shell
mkdir -p src/app/auth/signin
```

Create a file named `page.tsx` in this directory using the following command.

```shell
touch src/app/auth/signin/page.tsx
```

Then add the following code.

```shell title="page.tsx"
"use client"

import { useState, useEffect } from 'react';
import { initRequest } from '../../../utils/authUtils';
import FormContainer from '../../../components/FormContainer';
import UsernamePasswordForm from '../../../components/UsernamePasswordForm';

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
                    <div key={authenticator.authenticatorId}>
                        <UsernamePasswordForm flowId={sessionStorage.getItem('flowId') as string} setError={setError} />
                    </div>
                ) : null
            ))}
        </FormContainer>
    );
};

export default Login;
```

Next, we need to create a custom sign-out route to handle the sign-out process. Create a directory named `signout` under the `src/app/auth` directory using the following command.

```shell
mkdir -p src/app/auth/signout
```

Create a file named `route.tsx` in this directory using the command given below.

```shell
touch src/app/auth/signout/route.tsx
```

Now add the following code.

```shell title="route.tsx"
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Clear the session cookies
    const res = NextResponse.redirect(new URL('/', req.url));
    res.cookies.set('next-auth.session-token', '', { maxAge: 0, path: '/' });
    res.cookies.set('next-auth.csrf-token', '', { maxAge: 0, path: '/' });
    return res;
  } catch (error) {
    console.error("Sign-out error:", error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}
```

Navigate to the `auth.tsx` file under the `src/` directory and add the following code in order to define the custom sign in and sign out routes that we created in addition to performing the final API invocation to the {{product_name}} `/oauth2/token` API to fetch the OAuth2 token using given authorization code.

```shell title="auth.tsx"
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
      },
      async authorize(credentials, req) {
        let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
        if (!redirect_uri) {
          throw new Error("Missing required environment variables");
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

Now you can run the server via the `npm run dev` command and navigate to [http://localhost:3000](http://localhost:3000){:target="_blank"} to see the home page. Click the `Sign In` button to navigate to the login form where you can enter your username and password to authenticate.

![Sign In Page]({{base_path}}/assets/img/complete-guides/app-native/image11.png){: width="800" style="display: block; margin: 0;"}
