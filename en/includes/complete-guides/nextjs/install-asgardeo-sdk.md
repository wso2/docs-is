

## Install Asgardeo provider for Auth.js

Auth.js is a lightweight JavaScript library designed for simplifying authentication workflows in web application. The Asgardeo provider for Auth.js offers all the components and hooks you need to integrate your app with {{product_name}}. 

When integrating {{product_name}} with your Next.js app, using a library like auth.js offers significant benefits over building a custom SDK.

- **No Vendor Lock-in:** One of the most significant advantages of using Auth.js is its flexibility to integrate with various Identity Providers (IdPs), not just {{product_name}}. This avoids vendor lock-in and future-proofs your application, giving you the freedom to choose the best provider for your evolving needs.

- **Simplified, Secure Authentication:** Auth.js simplifies the implementation of complex authentication flows like token validation, session management, and token refresh, allowing you to handle these processes securely with minimal code. 

- **Community Support and Documentation:** Auth.js has a large, active community and comprehensive documentation. If you encounter any issues or need to extend functionality, there are plenty of resources available.

As the next step, run the following command to install the React SDK from the npm registry.

```bash
npm install next-auth@beta

```

## Generate Auth Secret Environment Variable

The only environment variable that is mandatory is the AUTH_SECRET. This is a random value used by the library to encrypt tokens and email verification hashes. You can generate one via the [Auth.js](https://github.com/nextauthjs/cli){:target="_blank"}  CLI running the following command;

```bash
yarn dlx auth secret

```

Running this command will add an AUTH_SECRET to your .env file.

As the next step, add following entries to the .env or .env.local file, and make sure to replace the placeholders in the following code with the client-id, client-secret and issuer values you copied during in **Step-3** the application registration in the {{product_name}} console.

```baproperties sh title=".env.local"
    AUTH_ASGARDEO_ID="<your-app-client-id>"
    AUTH_ASGARDEO_SECRET="<your-app-client-secret>"
    AUTH_ASGARDEO_ISSUER="<your-app-issuer-url>"

```


## Create the auth.ts Configuration File

We need to create a configuration file for auth.js. This is where you define the behavior of the library, including custom authentication logic, specifying adapters, token handling, and more. In this file, you'll pass all the necessary options to the framework-specific initialization function and export route handlers like sign in, sign out, and any additional methods you need.
Although you're free to name and place this file wherever you want, the following conventions are recommended for better organization in Next.js. 
Auth.js comes with over 80 providers pre-configured and {{product_name}} is one of those providers which makes your life even easier.

First, create an `auth.ts` file in `src/auth.ts` directory.

```bash

touch /src/auth.ts

```

Add {{product_name}} as a provider in the `/src/auth.ts'` file.

```javascript title="auth.ts"
import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
})

```
Note that we have only passed the issuer (AUTH_ASGARDEO_ISSUER) to the Asgardeo() function from the environment variables. The Client ID and the Client Secret will be automatically used by auth.js under-the-hood. Therefore, we do not need to include them in the provider configuration.

As the next step, create a Route Handler file in the `src/app/api/auth/[...nextauth]/route.ts` location. 

First, let's create the directory structure. 

```bash
mkdir -p src/app/api/auth/\[...nextauth\]

touch mkdir -p src/app/api/auth/\[...nextauth\]/route.ts

```

!!! Note
    The directory `src/app/api/auth/[...nextauth]/route.ts` in a Next.js project is used to define a dynamic API route for handling authentication. The `[...nextauth]` is a catch-all route that processes multiple authentication-related requests such as sign-in, sign-out, and session management. The route.ts file specifies the logic for these operations, typically by exporting handlers for HTTP methods like GET and POST. This setup centralizes authentication logic, supports OAuth providers like Google or GitHub, and integrates seamlessly into Next.js applications for secure and scalable authentication workflows.


Then add the following code into `src/app/api/auth/[...nextauth]/route.ts` file. 

```javascript title="route.ts"
import { handlers } from "@/auth" 
export const { GET, POST } = handlers
```


We can optionally create Middleware to keep the session alive, this will update the session expiry every time it's called. 

Next, create `src/middleware.ts` file with the following code. 

```bash

touch mkdir -p src/middleware.ts

```


```javascript title="middleware.ts"
export { auth as middleware } from "@/auth"

```