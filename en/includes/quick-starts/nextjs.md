# Next.JS Quickstart

Welcome to the Next.js Quickstart guide! In this document, you will learn to build a Next.js app, add user login and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application.**
- Select **Traditional Web Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.(*Ensure that the protocol remains set to OpenID Connect (OIDC).)* 

!!! Example
    **name:** nextjs-react

    **Authorized redirect URL:** http://localhost:3000/api/auth/callback/asgardeo

Note down the following values from the **Protocol** and **Info** tabs of the registered application. You will need them to configure the Auth.js SDK.

- **`client-id`** from the **Protocol** tab. 
- **`client-secret`** from the **Protocol** tab. 
- **`issuer`** from the **Info** tab. 

!!! Info

    The authorized redirect URL specifies where {{product_name}} should send users after they successfully log in. This is usually the web address where your application is running. For this guide, we'll use `http://localhost:3000/api/auth/callback/asgardeo` as the authorized redirect URL, as required by Auth.js.

## Create a Next.js app 

Create your new Next.js app.

=== "npm"

    ``` bash
    npx create-next-app@latest --typescript {{ product }}-nextjs

    cd {{ product }}-nextjs

    npm install

    npm run dev
    ```

=== "yarn"

    ``` bash
    yarn create next-app --typescript {{ product }}-nextjs

    cd {{ product }}-nextjs

    yarn install

    yarn dev
    ```

=== "pnpm"

    ``` bash
    pnpm create next-app --typescript {{ product }}-nextjs

    cd {{ product }}-nextjs

    pnpm install

    pnpm run dev
    ```

## Install Auth.js library

Auth.js, a lightweight JavaScript library, simplifies authentication workflows in JavaScript web applications. The [Asgardeo provider for Auth.js](https://authjs.dev/reference/core/providers/asgardeo){:target="_blank"}  offers all the components and hooks you need to integrate your app with {{product_name}}. To get started, simply add Auth.js library to the project. Make sure to stop the dev server started in the previous step.

=== "npm"

    ``` bash
    npm install next-auth@beta
    ```

=== "yarn"

    ``` bash
    yarn add next-auth@beta
    ```

=== "pnpm"

    ``` bash
    pnpm add next-auth@beta
    ```

Next, generate **`AUTH_SECRET`** environment variable. 

=== "npm"

    ``` bash
    npx auth secret

    ```
=== "yarn"

    ``` bash
    yarn dlx auth secret
    ```

=== "pnpm"

    ``` bash
    pnpm dlx auth secret
    ```

Add the following entries to the `.env` or `.env.local` file. Replace the placeholders in the following code with the **`client-id`**, **`client-secret`** and **`issuer`** values from **Step-1**.


```bash title=".env.local"
    AUTH_ASGARDEO_ID="<your-app-client-id>"
    AUTH_ASGARDEO_SECRET="<your-app-client-secret>"
    AUTH_ASGARDEO_ISSUER="<your-app-issuer-url>"

```

## Create the `auth.js` configuration File

Create a file called `src/auth.ts'`. 

```bash

touch src/auth.ts

```

Add {{product_name}} as a provider in the `src/auth.ts'` file.

```javascript title="auth.ts"
import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
})

```

Create a Route Handler file in the `src/app/api/auth/[...nextauth]/route.ts` location. 

```bash
mkdir -p src/app/api/auth/\[...nextauth\]

touch mkdir -p src/app/api/auth/\[...nextauth\]/route.ts
```

!!! Note
    The `src/app/api/auth/[...nextauth]/route.ts` file defines a dynamic API route for handling authentication-related requests through Auth.js. The `[...nextauth]` route acts as a catch-all route and handles all authentication requests such as sign-in, sign-out, and session management. The `route.ts` file specifies the logic for these operations, typically by exporting handlers for HTTP methods like GET and POST. This setup centralizes authentication logic, supports OAuth providers like Google or GitHub, and integrates seamlessly into Next.js applications for secure and scalable authentication workflows.

Update the `src/app/api/auth/[...nextauth]/route.ts` file with the following code. 

```javascript title="route.ts"
import { handlers } from "@/auth" 
export const { GET, POST } = handlers
```

Next, create `src/middleware.ts` file with the following code. 

```bash
touch mkdir -p src/middleware.ts
```

```javascript title="middleware.ts"
export { auth as middleware } from "@/auth"

```

## Add login and logout link to your app

Replace the existing content of the `page.tsx` file with following content to add login and logout features from Auth.js. 

```javascript title="page.tsx"
import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth();

  return (
    <div className="justify-items-center">
      {
        !session ? (
          <form
            action={async () => {
              "use server"
              await signIn("asgardeo")
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        ) : (
          <>
            <p> You are now signed in!</p>

            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </>
        )
      }
    </div>
  );
}
```

Visit your app's homepage at [http://localhost:3000](http://localhost:3000).

!!! Important

    You need to create a user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Update `src/auth.ts` as below to make logged in user details available in the session.

!!! Important

    Make sure to mark the user attributes used by the application has been [marked as requested in the application configuration in {{ product_name }}]({{ base_path }}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-user-attributes).

```javascript title="auth.ts" hl_lines="4-8 14-29"

import NextAuth from "next-auth"
import Asgardeo from "next-auth/providers/asgardeo"

declare module "next-auth" {
  interface User {
    username?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Asgardeo({
    issuer: process.env.AUTH_ASGARDEO_ISSUER
  })],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.username;
      }

      return token;
    },
    async session({ session, token }) {            
      if (token) {
        session.user.username = token.username as string;
      }

      return session;
    }
  }
})

```

Then, update `page.tsx` as follows to display the username of logged in user.  

```javascript title="page.tsx" hl_lines="4"

...
<>
  <p> You are now signed in!</p>
  <p> hello {session.user?.username}</p>
  <form
    action={async () => {
      "use server"
      await signOut()
    }}
  >
    <button type="submit">Sign Out</button>
  </form>
</>
...

```

[//] STEPS_END
