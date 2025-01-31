---
template: templates/complete-guide.html
heading: Install and configure a Provider for Auth.js
read_time: 2 min
---

Auth.js is a flexible authentication library designed to streamline authentication workflows in web applications. When implementing custom authentication in a Next.js app, configuring a Credentials Provider allows you to authenticate users with custom logic, such as verifying credentials against a database or an external API.

Using a Credentials Provider in Auth.js offers several advantages over rolling out a completely custom authentication system:

- **Full Control Over Authentication Logic**: Unlike OAuth-based authentication, a Credentials Provider allows you to define exactly how users are authenticated, whether through a database lookup, API call, or even third-party services.

- **Flexible Identity Management**: A Credentials Provider can be configured to work alongside other authentication methods (e.g., OAuth, Magic Link, or Passwordless authentication), providing hybrid authentication support.

- **Session and Token Management**: Auth.js handles session management, token validation, and security best practices like CSRF protection, reducing the burden of implementing these manually.

By leveraging a Credentials Provider, you can implement custom authentication flows in a Next.js app while still benefiting from Auth.js's built-in security and session management features.

As the next step, run the following command to install Auth.js in your Next.js project:

```bash
npm install next-auth@beta

```

## Generate Auth Secret Environment Variable

The only environment variable that is mandatory is the AUTH_SECRET. This is a random value used by the library to encrypt tokens and email verification hashes. You can generate one via the [Auth.js](https://github.com/nextauthjs/cli){:target="_blank"}  CLI by running the following command;

```bash
npx auth secret

```

Running this command will add an `AUTH_SECRET` to your .env file.

As the next step, add following entries to the .env or .env.local file, and make sure to replace the placeholders in the following code with the client-id, client-secret and issuer values you copied during in **Step-3** the application registration in the Asgardeo console.

```sh title=".env.local"
    AUTH_ASGARDEO_ID="<your-app-client-id>"
    AUTH_ASGARDEO_SECRET="<your-app-client-secret>"
    AUTH_ASGARDEO_ISSUER="<your-app-issuer-url>"

```

## Create the auth.tsx Configuration File

We need to create a configuration file for Auth.js. This is where you define the behavior of the library, including custom authentication logic, specifying adapters, token handling, and more. In this file, you'll pass all the necessary options to the framework-specific initialization function and export route handlers like sign in, sign out, and any additional methods you need.
Although you're free to name and place this file wherever you want, the following conventions are recommended for better organization in Next.js.
Auth.js comes with over 80 providers pre-configured and Asgardeo is one of those providers which makes your life even easier.

First, create an `auth.tsx` file in `src/auth.tsx` directory.

```bash

touch src/auth.tsx

```

Add the following configurations for a custom `CredentialsProvider` in the `/src/auth.tsx'` file.

```javascript title="auth.ts"
import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthConfig = {
    providers: [
        CredentialsProvider({
            name: "Asgardeo OAuth2",
            credentials: {
                code: { label: "Code", type: "text" },
            },
        }),
    ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(options);

```

Note that we have only passed the `code` as the credential to the `CredentialsProvider()` function. The Client ID and the Client Secret will be automatically used by Auth.js under-the-hood. Therefore, we do not need to include them in the provider configuration.

As the next step, create a Route Handler file named `route.ts` in the `src/app/api/auth/[...nextauth]/` directory.

First, let's create the directory structure for the Route Handler.

```bash
mkdir -p src/app/api/auth/\[...nextauth\]

touch src/app/api/auth/\[...nextauth\]/route.ts

```

!!! Note
The directory `src/app/api/auth/[...nextauth]/route.ts` in a Next.js project is used to define a dynamic API route for handling authentication. The `[...nextauth]` is a catch-all route that processes multiple authentication-related requests such as sign-in, sign-out, and session management. The route.ts file specifies the logic for these operations, typically by exporting handlers for HTTP methods like GET and POST. This setup centralizes authentication logic, supports OAuth providers like Google or GitHub, and integrates seamlessly into Next.js applications for secure and scalable authentication workflows.


Then add the following code into `src/app/api/auth/[...nextauth]/route.ts` file.

```javascript title="route.ts"
import { handlers } from "@/auth" 
export const { GET, POST } = handlers
```
