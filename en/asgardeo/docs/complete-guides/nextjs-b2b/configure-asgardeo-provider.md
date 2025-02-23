---
template: templates/complete-guide.html
heading: Install and configure Auth.js with Asgardeo Provider
read_time: 2 min
---

## Install Auth.js

Auth.js (formerly NextAuth.js) is a complete authentication solution for Next.js applications. When integrating with Asgardeo, it provides a robust, type-safe authentication layer with built-in session management.

![Authjs Asgardeo]({{base_path}}/complete-guides/nextjs-b2b/assets/img/image11.png){: width="650" style="display: block; margin: auto;"}

As the next step, run the following command to install auth.js

```bash
npm install next-auth@beta

```

## Generate Auth Secret Environment Variable

The only environment variable that is mandatory is the AUTH_SECRET. This is a random value used by the library to encrypt tokens and email verification hashes. You can generate one via the [Auth.js](https://github.com/nextauthjs/cli){:target="\_blank"} CLI running the following command;

```bash
yarn dlx auth secret

```

Running this command will add an AUTH_SECRET to your .env file.

## Setup Environment Variables

Now using the information available in the Quick Start tab of the application you created in Asgardeo (in **Step-3**), let’s copy the Client ID and Client Secret and include them in the .env (or .env.local) file as follows. As the name implies, Client Secret is a secret and should always be kept as an environment variable or using any other secure storage mechanism.

```bash title=".env.local"

AUTH_SECRET={GENERATED_SECRET}
AUTH_ASGARDEO_ID={CLIENT_ID}
AUTH_ASGARDEO_SECRET={CLIENT_SECRET}

```

It is also important to configure the **issuer** and **logout URL** which can be found in the Info tab of the application you created.


```bash title=".env.local"

AUTH_ASGARDEO_ISSUER="https://api.asgardeo.io/t/{ORG_NAME}/oauth2/token"
ASGARDEO_LOGOUT_URL="https://api.asgardeo.io/t/{ORG_NAME}/oidc/logout"

```

Add the scopes and roles copied in **step 4** and add it to the env.local file as follows.

```bash title=".env.local"

AUTH_SCOPE={SCOPES}
B2B_ADMIN_ROLE_NAME="Team Admin"

```

Our final `env.local` file will look something like this.

```bash title=".env.local"
AUTH_SECRET={GENERATED_AUTH_SECRET)
AUTH_ASGARDEO_ID={CLIENT_ID}
AUTH_ASGARDEO_SECRET={CLIENT_SECRET}
HOSTED_URL="http://localhost:3000"
ASGARDEO_BASE_URL="https://api.asgardeo.io/t/{ORG_NAME}"
ASGARDEO_LOGOUT_URL="https://api.asgardeo.io/t/{ORG_NAME}/oidc/logout"
AUTH_SCOPE={SCOPES}
AUTH_ASGARDEO_ISSUER="https://api.asgardeo.io/t/{ORG_NAME}/oauth2/token"
APP_NAME="Next App"
B2B_ADMIN_ROLE_NAME="Team Admin"
```

## Create the auth.ts Configuration File

We need to create a configuration file for auth.js. This is where you define the behavior of the library, including custom authentication logic, specifying adapters, token handling, and more. In this file, you'll pass all the necessary options to the framework-specific initialization function and export route handlers like sign in, sign out, and any additional methods you need.
Although you're free to name and place this file wherever you want, the following conventions are recommended for better organization in Next.js.

Auth.js comes with over 80 providers pre-configured and Asgardeo is one of those providers which makes your life even easier.

First, create an `auth.ts` file in `src/auth.ts` directory.

```bash

touch /src/auth.ts

```

Add {{product_name}} as a provider in the `/src/auth.ts'` file.

```javascript title="auth.ts"
import NextAuth from "next-auth";
import Asgardeo from "next-auth/providers/asgardeo";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Asgardeo({
      issuer: process.env.AUTH_ASGARDEO_ISSUER,
    }),
  ],
});
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
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

We can optionally create Middleware to keep the session alive, this will update the session expiry every time it's called.

Next, create `src/middleware.ts` file with the following code.

```bash

touch mkdir -p src/middleware.ts

```

```javascript title="middleware.ts"
export { auth as middleware } from "@/auth";
```

Let’s wrap the app with the SessionProvider which is a React Context provider used to make session data available anywhere in the app.

!!! Note
    We have used the [Material UI](https://mui.com/material-ui/all-components/) component library for styling and UI design

```javascript title="layout.tsx" hl_lines="10-18"
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
```
